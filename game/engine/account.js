/* =========================================================
   engine/account.js — 성좌 = 게임 계정 = 세이브 칸 (2026-10-24 사용자 결정, data/stars.js)
   localStorage 'khl.stars.v1' = {slots:[성좌|null × BAL_STAR.slots]}
   성좌 = {id, name, trait, reason, domain, color, sigil, known, coin, ach:{업적ID:시각}, unlocks:{키:true}, created, hunter:{created,name,alive}|null}
   - 성좌 하나는 헌터 한 명만 키운다 (그 헌터가 죽거나 은퇴해야 새 헌터). 세이브 = 'star-<칸>' 하나
   - 업적 · 코인 · 해금은 성좌에 남는다 (헌터가 죽어도). 한 번 받은 업적은 다시 못 받는다
   - 한 번 만든 성좌는 고칠 수 없다 (지우고 새로 만들 수만 있다)
   새 게임 흐름: 타이틀 › 성좌 고르기/만들기 → 내 헌터 설정(커마) → 시작 전 확인 → 플레이
   ========================================================= */
const STARACC = (() => {
  const KEY = 'khl.stars.v1';
  const B = () => DB.balance.BAL_STAR;
  const load = () => { const a = store.get(KEY, null) || { slots: [] }; while (a.slots.length < (B().slots || 3)) a.slots.push(null); return a; };
  const save = a => store.set(KEY, a);
  const saveKey = slot => 'star-' + slot;
  const at = slot => load().slots[slot] || null;
  /* 지금 성좌: 게임 중이면 G.star.slot, 만들기 중이면 UI.starSlot */
  const curSlot = () => (typeof G !== 'undefined' && G && G.star && G.star.slot != null) ? G.star.slot : (UI.starSlot ?? null);
  const cur = () => { const s = curSlot(); return s == null ? null : at(s); };
  function update(slot, fn) { const a = load(), s = a.slots[slot]; if (!s) return null; fn(s); save(a); return s; }

  function create(slot, f) {
    const a = load(); if (a.slots[slot]) return null;
    const st = { id: 'STAR_' + Date.now().toString(36), name: (f.name || '').trim() || '이름 없는 성좌', trait: f.trait, reason: f.reason, domain: f.domain, color: f.color, sigil: f.sigil,
      known: f.known || 'SKN_NO', coin: DB.starStarts[f.start || 'SST_1']?.coin ?? 0, ach: {}, unlocks: {}, created: Date.now(), hunter: null };
    a.slots[slot] = st; save(a); return st;
  }
  function remove(slot) { const a = load(); a.slots[slot] = null; save(a); if (typeof deleteSave === 'function') deleteSave(saveKey(slot)); }
  /* 새 헌터를 만든 직후: 이 성좌에 묶는다. 코인은 성좌 지갑에서 */
  function attach(slot) {
    const s = at(slot); if (!s || !G) return;
    G.star = { slot, id: s.id }; G.coin = s.coin;
    update(slot, x => { x.hunter = { created: G.created, name: G.player.name, alive: true }; });
  }
  /* 게임 → 성좌: 코인 · 헌터 생사 (저장할 때 · 하루마다 · 죽을 때) */
  function sync() {
    if (!G || !G.star) return; const s = at(G.star.slot); if (!s || s.id !== G.star.id) return;
    update(G.star.slot, x => { x.coin = Math.max(0, Math.round(G.coin || 0)); if (x.hunter && x.hunter.created === G.created) { x.hunter.alive = !G.dead; x.hunter.name = G.player.name; } });
  }
  const unlocked = k => !!cur()?.unlocks?.[k];

  /* 업적: 이루면 코인 (성좌마다 한 번) */
  function measure(a) {
    const h = G.player, S = G.stats || {};
    switch (a.measure) {
      case 'raids': return (S.raids || 0) >= a.n;
      case 'cleared': return (S.cleared || 0) >= a.n;
      case 'rank': return (DB.ranks[h.rank]?.lv ?? 20) <= a.n;
      case 'level': return (h.level || 1) >= a.n;
      case 'money': return (G.money || 0) >= a.n;
      case 'days': return G.day - (G.startDay ?? G.day) >= a.n;
      case 'gifts': return (G.starGifts?.length || 0) >= a.n;
      case 'rels': return (G.relations || []).length >= a.n;
    } return false;
  }
  function checkAch() {
    if (!G || G.dead || !G.star) return []; const s = cur(); if (!s) return []; const got = [];
    vals('achievements').forEach(a => { if (s.ach[a.id] || !measure(a)) return; got.push(a); });
    if (!got.length) return got;
    update(G.star.slot, x => got.forEach(a => { x.ach[a.id] = Date.now(); if (a.unlock) x.unlocks[a.unlock] = true; }));
    got.forEach(a => { G.coin = (G.coin || 0) + (a.coin || 0); if (typeof STORY !== 'undefined') STORY.add('event', `업적 「${a.name}」 — ${a.desc ? a.desc + '. ' : ''}성좌에게 코인 ◈${a.coin || 0}.`, 2); });
    sync(); return got;
  }
  /* 잠재력 엿보기 (성좌의 힘 — 화면은 성좌 탭 만들 때). lv 1 = 대략, 2 = 전부. 업적 해금이 있으면 공짜 */
  function peek(lv) {
    if (!G || !G.star) return false; G.peek = G.peek || 0; if (G.peek >= lv) return true;
    const cost = unlocked('peekPotential') ? 0 : (B().peekCost || [300, 1500])[lv - 1] || 0; if ((G.coin || 0) < cost) return false;
    G.coin -= cost; G.peek = lv; sync(); return true;
  }

  /* ---------- 화면: 타이틀의 성좌 칸 ---------- */
  const T = (tb, id) => DB[tb]?.[id];
  const badge = s => `<span class="star-sig" style="--sc:${T('starColors', s.color)?.hex || '#e0b341'}">${esc(T('starSigils', s.sigil)?.mark || '✦')}</span>`;
  function slotsHTML() {
    const a = load(), saves = typeof listSaves === 'function' ? listSaves() : [];
    return `<div class="t-panel"><div class="ph">성좌 고르기 <button class="more" data-tpanel="">닫기</button></div><div class="pb" style="display:grid;gap:8px">
      <p class="dim" style="margin:0;font-size:12px">성좌는 계정이자 세이브 칸이야. 업적 · 코인 · 해금이 성좌에 쌓이고, 성좌 하나는 헌터 한 명만 키워. 한 번 만든 성좌는 고칠 수 없어.</p>
      ${a.slots.map((s, i) => {
        if (!s) return `<div class="slot star-slot"><div class="star-sig empty">+</div><div class="info"><b>빈 칸 ${i + 1}</b><span>새 성좌를 만들 수 있어</span></div><button class="btn pri" data-starnew="${i}">새 성좌</button></div>`;
        const sv = saves.find(x => x.slot === saveKey(i)), alive = s.hunter?.alive && sv && !sv.dead, nAch = Object.keys(s.ach || {}).length;
        return `<div class="slot star-slot">${badge(s)}<div class="info"><b>${esc(s.name)}</b><span>${esc(T('starTraits', s.trait)?.name || '')} · ${esc(T('starDomains', s.domain)?.name || '')} · ◈ ${(s.coin || 0).toLocaleString()} · 업적 ${nAch}</span>
          <span>${alive ? `${esc(sv.name)} ${rkBadge(sv.rank)} · 게임 내 ${sv.when}` : s.hunter ? `${esc(s.hunter.name)} — 이야기가 끝났어` : '아직 키우는 헌터가 없어'}</span></div>
          <span class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">${alive ? `<button class="btn pri" data-starplay="${i}">이어 가기</button>` : `<button class="btn pri" data-starhunter="${i}">새 헌터</button>`}
          <button class="btn" data-stardel="${i}">${UI.starDelArm === i ? '정말 지우기' : '지우기'}</button></span></div>`;
      }).join('')}
      <div class="row" style="justify-content:flex-end"><button class="btn sm" data-load="SC_BDEMO">데모로 둘러보기</button></div></div></div>`;
  }

  /* ---------- 화면: 성좌 만들기 (프리셋 고르고 고치기 · 직접 만들기) ---------- */
  const rnd = L => L[Math.floor(Math.random() * L.length)];
  function genName() { const P = DB.starNameParts; return `${rnd(P.SNP_PRE.list)} ${rnd(P.SNP_POST.list)}`; }
  function blank() { const f = (tb) => vals(tb)[0]?.id; return { preset: null, name: '', trait: f('starTraits'), reason: f('starReasons'), domain: f('starDomains'), color: f('starColors'), sigil: f('starSigils'), start: 'SST_1', known: 'SKN_NO' }; }
  function openMake(slot) { UI.starSlot = slot; UI.sm = blank(); UI.mode = 'starmake'; document.getElementById('root').innerHTML = ''; render(); }
  function seg(key, tb, label, fmt) { const f = UI.sm; return `<div class="sm-row"><div class="sub">${label}</div><div class="seg sm-seg" role="group" aria-label="${label}">${vals(tb).map(x => `<button data-smset="${key}|${x.id}" aria-pressed="${f[key] === x.id}" ${x.desc ? `title="${esc(x.desc)}"` : ''}>${fmt ? fmt(x) : esc(x.name)}</button>`).join('')}</div></div>`; }
  function cardHTML(f) {
    const col = T('starColors', f.color)?.hex || '#e0b341', dsc = T('starReasons', f.reason)?.desc || '';
    return `<div class="star-card" style="--sc:${col}"><div class="star-card-sig">${esc(T('starSigils', f.sigil)?.mark || '✦')}</div><div class="star-card-name">${esc((f.name || '').trim() || '이름 없는 성좌')}</div>
      <div class="star-card-sub">${esc(T('starTraits', f.trait)?.name || '')} 성좌 · ${esc(T('starDomains', f.domain)?.name || '')}의 영역</div>
      <p class="star-card-why">“${esc(dsc)}”</p>
      <div class="star-card-kv"><span>이유</span><b>${esc(T('starReasons', f.reason)?.name || '')}</b><span>시작 코인</span><b>◈ ${(DB.starStarts[f.start]?.coin ?? 0).toLocaleString()}</b><span>헌터가 성좌를</span><b>${esc(T('starKnown', f.known)?.name || '')}</b></div></div>`;
  }
  function makeHTML() {
    const f = UI.sm;
    return `<div class="cc"><div class="cc-top"><span class="t">성좌 만들기</span><span class="sub">성좌 칸 ${UI.starSlot + 1}</span><span style="margin-left:auto" class="row"><button class="btn" data-smcancel="1">타이틀로</button></span></div>
      <div class="cc-body sm-body">
        <nav class="steps sm-presets" aria-label="프리셋">${vals('starPresets').map(p => `<button data-smpreset="${p.id}" ${f.preset === p.id ? 'aria-current="step"' : ''}><span class="n" style="color:${T('starColors', p.color)?.hex}">${esc(T('starSigils', p.sigil)?.mark || '✦')}</span><span class="sn">${esc(p.name)}</span></button>`).join('')}
          <button data-smpreset="" ${!f.preset ? 'aria-current="step"' : ''}><span class="n">+</span><span class="sn">직접 만들기</span></button></nav>
        <div class="cc-main" id="smmain"><h2>당신은 어떤 성좌입니까</h2><p class="lead">프리셋을 고르고 고치거나, 직접 만들어. 한 번 정하면 바꿀 수 없어.</p>
          <div class="sm-row"><div class="field"><label for="sm-name">이름</label><div class="row" style="gap:6px;flex-wrap:nowrap"><input id="sm-name" maxlength="24" placeholder="이름 없는 성좌" value="${esc(f.name)}" data-smname="1" style="flex:1"><button class="btn" data-smgen="1">자동 생성</button></div></div></div>
          ${seg('trait', 'starTraits', '성향')}${seg('reason', 'starReasons', '이 세계에서 헌터를 키우는 이유')}${seg('domain', 'starDomains', '영역 · 상징', x => `${esc(x.sigil || '')} ${esc(x.name)}`)}
          ${seg('color', 'starColors', '색', x => `<i class="sm-sw" style="background:${x.hex}"></i>${esc(x.name)}`)}${seg('sigil', 'starSigils', '문양', x => esc(x.mark))}
          ${seg('start', 'starStarts', '시작 코인', x => `${esc(x.name)} ◈${x.coin.toLocaleString()}`)}${seg('known', 'starKnown', '헌터가 성좌를')}
        </div>
        <aside class="cc-side" aria-label="미리보기">${cardHTML(f)}</aside></div>
      <div class="cc-foot"><span class="dim" style="font-size:12px">한 번 정한 성좌는 고칠 수 없어 (지우고 새로 만들 수만 있어).</span><button class="btn pri" data-smok="1">${UI.smArm ? '이 성좌로 정하기 — 확인' : '이 성좌로 정하기'}</button></div></div>`;
  }
  /* 시작 전 확인에 쓰는 작은 카드 */
  const cardOf = s => s ? cardHTML({ ...s, start: null }) .replace(/<span>시작 코인<\/span><b>[^<]*<\/b>/, `<span>코인</span><b>◈ ${(s.coin || 0).toLocaleString()}</b>`) : '';

  /* ---------- 클릭 ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-starnew],[data-starplay],[data-starhunter],[data-stardel],[data-smpreset],[data-smset],[data-smgen],[data-smok],[data-smcancel],[data-titlestars]'); if (!t) return;
    const d = t.dataset; e.preventDefault(); e.stopImmediatePropagation();
    if (d.titlestars != null) { UI.panel = UI.panel === 'stars' ? null : 'stars'; render(); return; }
    if (d.starnew != null) { openMake(+d.starnew); return; }
    if (d.stardel != null) { const i = +d.stardel; if (UI.starDelArm !== i) { UI.starDelArm = i; render(); return; } UI.starDelArm = null; remove(i); toast('성좌를 지웠어.'); render(); return; }
    if (d.starhunter != null) { UI.starSlot = +d.starhunter; startIntro(); return; }
    if (d.starplay != null) { const i = +d.starplay, k = saveKey(i); if (!loadGame(k)) { toast('세이브를 읽을 수 없어.'); return; } UI.starSlot = i; SIM.load(k).then(r => { if (r === 'regen') toast('세계 인구 데이터를 찾지 못해 처음 상태로 다시 만들었어.'); enterGame(); }); return; }
    if (UI.mode !== 'starmake') return;
    const f = UI.sm; if (!d.smok) UI.smArm = false;
    if (d.smpreset != null) { if (!d.smpreset) { UI.sm = blank(); } else { const p = DB.starPresets[d.smpreset]; UI.sm = { ...f, preset: p.id, name: p.name, trait: p.trait, reason: p.reason, domain: p.domain, color: p.color, sigil: p.sigil }; } render(); return; }
    if (d.smset) { const [k, v] = d.smset.split('|'); f[k] = v; if (k === 'domain' && !f.preset) { const sg = vals('starSigils').find(x => x.mark === DB.starDomains[v]?.sigil); if (sg) f.sigil = sg.id; } render(); return; }
    if (d.smgen) { f.name = genName(); render(); return; }
    if (d.smcancel) { UI.sm = null; UI.starSlot = null; goTitle(); return; }
    if (d.smok) { if (!UI.smArm) { UI.smArm = true; render(); return; } UI.smArm = false; const s = create(UI.starSlot, f); if (!s) { toast('이미 성좌가 있는 칸이야.'); return; } UI.sm = null; toast(`성좌 「${esc(s.name)}」 — 깨어났어.`); startIntro(); return; }
  }, true);
  document.addEventListener('input', e => { if (e.target.dataset?.smname && UI.sm) { UI.sm.name = e.target.value.slice(0, 24); UI.smArm = false; const c = document.querySelector('.cc-side'); if (c) c.innerHTML = cardHTML(UI.sm); } });

  return { load, at, cur, curSlot, saveKey, create, remove, attach, sync, unlocked, checkAch, peek, slotsHTML, makeHTML, cardOf, genName };
})();
