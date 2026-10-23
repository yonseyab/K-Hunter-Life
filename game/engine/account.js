/* =========================================================
   engine/account.js — 성좌 = 게임 계정 = 세이브 칸 (2026-10-24 사용자 결정, data/stars.js)
   localStorage 'khl.stars.v1' = {slots:[성좌|null × BAL_STAR.slots]}
   성좌 = {id, name, trait, domain, color(#hex), sigil(글자), speech, preset(정해진 성좌 ID 또는 null), coin, ach:{업적ID:시각}, unlocks:{키:true}, created, hunter:{created,name,alive}|null}
   - 성좌 하나는 헌터 한 명만 키운다 (그 헌터가 죽거나 은퇴해야 새 헌터). 세이브 = 'star-<칸>' 하나
   - 업적 · 코인 · 해금은 성좌에 남는다 (헌터가 죽어도). 한 번 받은 업적은 다시 못 받는다
   - 한 번 만든 성좌는 고칠 수 없다 (지우고 새로 만들 수만 있다). 시작 코인은 0. 헌터는 처음엔 성좌를 모른다 (G.starKnown, 일상 중 무작위로 알아챔)
   새 게임 흐름: 타이틀 › 성좌 칸 › (새 성좌) 성좌 인트로 → 정해진 성좌 / 나만의 성좌 → 헌터 인트로 → 내 헌터 설정(커마) → 시작 전 확인 → 플레이
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
    const st = { id: 'STAR_' + Date.now().toString(36), name: (f.name || '').trim() || '이름 없는 성좌', trait: f.trait, domain: f.domain, color: f.color, sigil: f.sigil, speech: f.speech || null,
      preset: f.preset || null, coin: B().startCoin ?? 0, ach: {}, unlocks: {}, created: Date.now(), hunter: null };
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
  const badge = s => `<span class="star-sig" style="--sc:${colOf(s)}">${esc(markOf(s))}</span>`;
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

  /* 헌터가 성좌를 알아채기: 처음엔 모른다. 하루마다 BAL_STAR.revealPerDay 확률로 */
  function revealRoll() {
    if (!G || !G.star || G.starKnown || G.dead) return false; if (Math.random() >= (B().revealPerDay || 0)) return false;
    G.starKnown = true; const s = cur();
    if (typeof STORY !== 'undefined') STORY.add('event', `어느 밤, 잠들기 직전 머릿속에 낯선 기척이 스친다. 누군가 아주 먼 곳에서 지켜보고 있다 — ${s ? `「${s.name}」. 그 이름이 저절로 떠오른다.` : '그런 확신이 든다.'}`, 1);
    return true;
  }

  /* ---------- 새 성좌: 인트로 → 고르기(정해진 성좌 / 나만의 성좌) → 만들기 ---------- */
  const rnd = L => L[Math.floor(Math.random() * L.length)];
  const colOf = s => (s && (DB.starColors?.[s.color]?.hex || (/^#[0-9a-f]{6}$/i.test(s.color || '') ? s.color : null))) || '#e0b341';
  const markOf = s => (s && (DB.starSigils?.[s.sigil]?.mark || s.sigil)) || '✦';
  function genName() { const P = DB.starNameParts; return `${rnd(P.SNP_PRE.list)} ${rnd(P.SNP_POST.list)}`; }
  function blank() { const f = tb => vals(tb)[0]?.id; return { name: '', trait: f('starTraits'), domain: f('starDomains'), color: vals('starColors')[0]?.hex || '#e0b341', sigil: vals('starSigils')[0]?.mark || '✦', speech: f('ccSpeech') }; }
  function randomAll() { const d = rnd(vals('starDomains')); return { name: genName(), trait: rnd(vals('starTraits')).id, domain: d.id, color: rnd(vals('starColors')).hex, sigil: d.sigil || rnd(vals('starSigils')).mark, speech: rnd(vals('ccSpeech')).id }; }
  const go = mode => { UI.mode = mode; UI.smConfirm = false; const r = document.getElementById('root'); if (r) r.innerHTML = ''; render(); };
  const sceneList = () => vals('starIntroScenes').sort((a, b) => a.ord - b.ord);
  function begin(slot) { UI.starSlot = slot; if (SETTINGS.intro !== false && sceneList().length) { sceneList().forEach(x => { const im = new Image(); im.src = `assets/star_intro/${x.img}.webp`; }); UI.sintro = { i: 0, t: Date.now() }; go('starintro'); } else go('starpick'); }

  function introHTML() {
    const L = sceneList(), I = UI.sintro, s = L[I.i], sp = { calm: '.9s', warm: '.9s', tense: '.6s', ominous: '1.4s' }[s?.mood] || '.9s';
    return `<div class="intro" data-sintro="next" style="--fd:${sp}"><div class="in-stage"><img class="in-img" src="assets/star_intro/${s.img}.webp" alt="" draggable="false" onerror="this.style.visibility='hidden'">
      <div class="in-cap"><div class="in-head">${esc(s.head)}</div><p class="in-text">${esc(s.text)}</p><div class="in-hint">${esc(introTxt('IT_NEXT'))}</div></div></div>
      <div class="in-bar"><div class="in-dots">${L.map((x, k) => `<i class="${k <= I.i ? 'on' : ''}"></i>`).join('')}</div><button class="btn sm" data-sintro="skip">${esc(introTxt('IT_SKIP') || '건너뛰기')}</button></div></div>`;
  }
  function pickHTML() {
    return `<div class="star-pick"><div class="star-pick-in"><h1 class="h1">어떤 별로 눈을 뜰까</h1><p class="muted">성좌 칸 ${UI.starSlot + 1}</p>
      <div class="star-pick-opts">
        <button class="star-pick-opt" data-spick="preset"><b>정해진 성좌로 깨어나기</b><span>이야기와 성격이 갖춰진 성좌 중 하나를 골라 바로 시작해. 고유 클래스와 고유 스킬을 가진 성좌도 있어.</span></button>
        <button class="star-pick-opt" data-spick="make"><b>나만의 성좌 빚기</b><span>이름부터 성향 · 영역 · 색 · 문양 · 말투까지 직접 정해.</span></button>
      </div></div>
      <div class="cc-foot"><button class="btn" data-sback="title">◂ 뒤로</button><span></span></div></div>`;
  }
  function presetHTML() {
    const L = vals('starPresets'), sel = L.find(p => p.id === UI.spSel) || L[0];
    const info = sel ? `<div class="sp-info"><div class="sp-img"><img src="assets/stars/${esc(sel.img || sel.id)}.webp" alt="" onerror="this.remove()"><span class="sp-img-sig" style="color:${colOf(sel)}">${esc(markOf(sel))}</span></div>
        <div class="sp-text"><h2 style="color:${colOf(sel)}">${esc(sel.name)}</h2><div class="sub">${esc(DB.starTraits[sel.trait]?.name || '')} 성좌 · ${esc(DB.starDomains[sel.domain]?.name || '')}의 영역 · ${esc(DB.ccSpeech?.[sel.speech]?.name || '')}</div>
        <p class="sp-intro">${esc(sel.intro || '')}</p>
        <dl class="kv"><dt>고유 클래스</dt><dd>${esc(DB.classes[sel.cls]?.name || '없음')}</dd><dt>고유 스킬</dt><dd>${(sel.skills || []).map(id => esc(DB.skills[id]?.name || id)).join(' · ') || '없음'}</dd><dt>코인</dt><dd>◈ 0</dd></dl></div></div>`
      : `<div class="sp-empty muted">아직 정해진 성좌가 없어. 곧 채워질 거야.</div>`;
    return `<div class="cc"><div class="cc-top"><span class="t">정해진 성좌</span><span class="sub">성좌 칸 ${UI.starSlot + 1}</span></div>
      <div class="cc-body sp-body"><nav class="steps sp-list" aria-label="정해진 성좌">${L.map(p => `<button data-spsel="${p.id}" ${sel && sel.id === p.id ? 'aria-current="step"' : ''}><span class="n" style="color:${colOf(p)}">${esc(markOf(p))}</span><span class="sn">${esc(p.name)}</span></button>`).join('') || '<div class="muted" style="padding:14px">비어 있음</div>'}</nav>
      <div class="cc-main">${info}</div></div>
      <div class="cc-foot"><button class="btn" data-sback="pick">◂ 뒤로</button><button class="btn pri" data-spgo="1" ${sel ? '' : 'disabled'}>이 성좌로 깨어나기</button></div>${confirmHTML(sel ? sel.name : '')}</div>`;
  }
  /* 나만의 성좌: '기본 정보' 커마와 같은 왼쪽 항목 · 오른쪽 선택지 */
  const ITEMS = [['name', '이름'], ['trait', '성향'], ['domain', '영역 · 상징'], ['color', '색'], ['sigil', '문양'], ['speech', '말투']];
  function valTxt(k, f) {
    if (k === 'name') return f.name ? esc(f.name) : '<span class="dim">미정</span>';
    if (k === 'trait') return esc(DB.starTraits[f.trait]?.name || '');
    if (k === 'domain') return esc(DB.starDomains[f.domain]?.name || '');
    if (k === 'color') return `<i class="sm-sw" style="background:${colOf(f)}"></i>${esc(vals('starColors').find(c => c.hex.toLowerCase() === String(f.color).toLowerCase())?.name || f.color)}`;
    if (k === 'sigil') return esc(markOf(f));
    if (k === 'speech') return esc(DB.ccSpeech?.[f.speech]?.name || '');
  }
  const tiles = (rows, key, cur, fmt) => `<div class="lk-tiles">${rows.map(o => `<button class="lk-tile" data-smset="${key}|${esc(o.v)}" aria-pressed="${String(cur) === String(o.v)}" ${o.desc ? `title="${esc(o.desc)}"` : ''}>${fmt ? fmt(o) : ''}<span class="choice-label">${esc(o.n)}</span></button>`).join('')}</div>`;
  function panelHTML(k, f) {
    const head = `<div class="lk-head"><div><h3>${ITEMS.find(x => x[0] === k)[1]}</h3></div><div class="lk-cur">${valTxt(k, f)}</div></div>`;
    if (k === 'name') return head + `<div class="field" style="margin-top:14px;max-width:420px"><label for="sm-name">성좌 이름</label><div class="row" style="gap:6px;flex-wrap:nowrap"><input id="sm-name" maxlength="24" placeholder="이름 없는 성좌" value="${esc(f.name)}" data-smname="1" style="flex:1"><button class="btn" data-smgen="1">자동 생성</button></div><div class="fx">"새벽을 기다리는 자"처럼 수식어 + 존재로 지으면 성좌다워.</div></div>`;
    if (k === 'trait') return head + tiles(vals('starTraits').map(x => ({ v: x.id, n: x.name, desc: x.desc })), 'trait', f.trait);
    if (k === 'domain') return head + tiles(vals('starDomains').map(x => ({ v: x.id, n: x.name, s: x.sigil })), 'domain', f.domain, o => `<span class="sm-tile-sig">${esc(o.s || '')}</span>`);
    if (k === 'color') return head + tiles(vals('starColors').map(x => ({ v: x.hex, n: x.name })), 'color', String(f.color).toLowerCase(), o => `<span class="swb" style="background:${o.v}"></span>`).replace(/data-smset="color\|([^"]+)" aria-pressed="[^"]*"/g, (m, v) => `data-smset="color|${v}" aria-pressed="${v.toLowerCase() === String(f.color).toLowerCase()}"`)
      + `<div class="field" style="margin-top:14px"><label for="sm-color">직접 고르기</label><input id="sm-color" type="color" value="${colOf(f)}" data-smcolor="1" style="width:64px;height:34px;padding:2px"></div>`;
    if (k === 'sigil') return head + tiles(vals('starSigils').map(x => ({ v: x.mark, n: x.mark })), 'sigil', f.sigil)
      + `<div class="field" style="margin-top:14px;max-width:220px"><label for="sm-sigil">직접 넣기 (글자 1~2개)</label><input id="sm-sigil" maxlength="2" value="${esc(f.sigil)}" data-smsigil="1"></div>`;
    if (k === 'speech') return head + tiles(vals('ccSpeech').map(x => ({ v: x.id, n: x.name })), 'speech', f.speech);
  }
  function cardHTML(f) {
    const col = colOf(f);
    return `<div class="star-card" style="--sc:${col}"><div class="star-card-sig">${esc(markOf(f))}</div><div class="star-card-name">${esc((f.name || '').trim() || '이름 없는 성좌')}</div>
      <div class="star-card-sub">${esc(DB.starTraits[f.trait]?.name || '')} 성좌 · ${esc(DB.starDomains[f.domain]?.name || '')}의 영역</div>
      <div class="star-card-kv"><span>말투</span><b>${esc(DB.ccSpeech?.[f.speech]?.name || '')}</b><span>코인</span><b>◈ ${(f.coin ?? 0).toLocaleString()}</b><span>헌터는</span><b>아직 성좌를 모른다</b></div></div>`;
  }
  function confirmHTML(name) {
    if (!UI.smConfirm) return '';
    return `<div class="sm-confirm" role="dialog" aria-modal="true" aria-label="확인"><div class="sm-confirm-box"><b>「${esc(name || '이름 없는 성좌')}」로 정할까?</b><p class="muted">한 번 정한 성좌는 고칠 수 없어. 지우고 새로 만들 수만 있어.</p>
      <div class="row" style="justify-content:center;gap:8px"><button class="btn" data-smno="1">더 고칠래</button><button class="btn pri" data-smyes="1">이 성좌로 정하기</button></div></div></div>`;
  }
  function makeHTML() {
    const f = UI.sm, k = UI.smSel || 'name';
    return `<div class="cc"><div class="cc-top"><span class="t">나만의 성좌</span><span class="sub">성좌 칸 ${UI.starSlot + 1}</span></div>
      <div class="cc-body sm-body"><div class="cc-main" id="smmain"><div class="sm-title"><div><h2>당신은 어떤 성좌입니까</h2><p class="lead">왼쪽에서 항목을 고르고 오른쪽에서 정해. 시작 코인은 0이고, 헌터는 처음엔 당신을 몰라.</p></div><button class="btn" data-smrand="1">모두 무작위</button></div>
        <div class="lk"><div class="lk-left"><nav class="lk-items" aria-label="성좌 항목">${ITEMS.map(([id, n]) => `<button class="lk-item" data-smitem="${id}" aria-current="${k === id}"><span class="k">${n}</span><span class="v"><span class="tx">${valTxt(id, f)}</span></span></button>`).join('')}</nav></div>
        <section class="lk-panel">${panelHTML(k, f)}</section></div></div>
        <aside class="cc-side" aria-label="미리보기">${cardHTML(f)}</aside></div>
      <div class="cc-foot"><button class="btn" data-sback="pick">◂ 뒤로</button><button class="btn pri" data-smok="1">이 성좌로 정하기</button></div>${confirmHTML(f.name)}</div>`;
  }
  /* 시작 전 확인에 쓰는 카드 */
  const cardOf = s => s ? cardHTML(s) : '';
  function finish(form) { const s = create(UI.starSlot, form); if (!s) { toast('이미 성좌가 있는 칸이야.'); return; } UI.sm = null; UI.smConfirm = false; toast(`성좌 「${esc(s.name)}」 — 깨어났어.`); startIntro(); }

  /* ---------- 클릭 ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-starnew],[data-starplay],[data-starhunter],[data-stardel],[data-titlestars],[data-sintro],[data-spick],[data-sback],[data-spsel],[data-spgo],[data-smitem],[data-smset],[data-smgen],[data-smrand],[data-smok],[data-smyes],[data-smno]'); if (!t) return;
    const d = t.dataset; e.preventDefault(); e.stopImmediatePropagation();
    if (d.titlestars != null) { UI.panel = UI.panel === 'stars' ? null : 'stars'; render(); return; }
    if (d.starnew != null) { begin(+d.starnew); return; }
    if (d.stardel != null) { const i = +d.stardel; if (UI.starDelArm !== i) { UI.starDelArm = i; render(); return; } UI.starDelArm = null; remove(i); toast('성좌를 지웠어.'); render(); return; }
    if (d.starhunter != null) { UI.starSlot = +d.starhunter; startIntro(); return; }
    if (d.starplay != null) { const i = +d.starplay, k = saveKey(i); if (!loadGame(k)) { toast('세이브를 읽을 수 없어.'); return; } UI.starSlot = i; SIM.load(k).then(r => { if (r === 'regen') toast('세계 인구 데이터를 찾지 못해 처음 상태로 다시 만들었어.'); enterGame(); }); return; }
    if (d.sintro) { const I = UI.sintro; if (!I) return; if (d.sintro === 'skip') { UI.sintro = null; go('starpick'); return; } if (Date.now() - I.t < 250) return; I.t = Date.now(); if (I.i < sceneList().length - 1) { I.i++; render(); } else { UI.sintro = null; go('starpick'); } return; }
    if (d.spick) { if (d.spick === 'make') { UI.sm = blank(); UI.smSel = 'name'; go('starmake'); } else go('starpreset'); return; }
    if (d.sback) { if (d.sback === 'title') { UI.starSlot = null; goTitle(); UI.panel = 'stars'; render(); } else go('starpick'); return; }
    if (d.spsel) { UI.spSel = d.spsel; render(); return; }
    if (d.spgo) { UI.smConfirm = true; render(); return; }
    if (d.smno) { UI.smConfirm = false; render(); return; }
    if (d.smyes) { if (UI.mode === 'starpreset') { const p = DB.starPresets[UI.spSel] || vals('starPresets')[0]; if (p) finish({ name: p.name, trait: p.trait, domain: p.domain, color: colOf(p), sigil: markOf(p), speech: p.speech, preset: p.id }); } else finish(UI.sm); return; }
    if (UI.mode !== 'starmake') return;
    const f = UI.sm;
    if (d.smitem) { UI.smSel = d.smitem; render(); return; }
    if (d.smset) { const i = d.smset.indexOf('|'), k = d.smset.slice(0, i), v = d.smset.slice(i + 1); f[k] = v; if (k === 'domain') { const sg = DB.starDomains[v]?.sigil; if (sg) f.sigil = sg; } render(); return; }
    if (d.smgen) { f.name = genName(); render(); return; }
    if (d.smrand) { UI.sm = randomAll(); render(); return; }
    if (d.smok) { UI.smConfirm = true; render(); return; }
  }, true);
  /* 성좌 인트로: Space · Enter · → 로 넘기고 Esc 로 건너뛰기 (헌터 인트로와 같게) */
  document.addEventListener('keydown', e => {
    if (UI.mode !== 'starintro' || !UI.sintro) return;
    if ([' ', 'Enter', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); document.querySelector('.in-stage')?.click(); }
    else if (e.key === 'Escape') { e.preventDefault(); UI.sintro = null; go('starpick'); }
  });
  document.addEventListener('input', e => {
    const d = e.target.dataset || {}; if (!UI.sm) return;
    if (d.smname) UI.sm.name = e.target.value.slice(0, 24);
    else if (d.smcolor) UI.sm.color = e.target.value;
    else if (d.smsigil) UI.sm.sigil = e.target.value.slice(0, 2) || '✦';
    else return;
    const c = document.querySelector('.cc-side'); if (c) c.innerHTML = cardHTML(UI.sm);
    const it = document.querySelector(`[data-smitem="${UI.smSel}"] .tx`); if (it) it.innerHTML = valTxt(UI.smSel, UI.sm);
  });

  return { revealRoll, load, at, cur, curSlot, saveKey, create, remove, attach, sync, unlocked, checkAch, peek, slotsHTML, makeHTML, introHTML, pickHTML, presetHTML, cardOf, genName, begin, colOf, markOf };
})();
