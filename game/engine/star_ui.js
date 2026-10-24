/* =========================================================
   star_ui.js — 좌측 '성좌' 탭 화면: 내 정보 · 상점 · 성좌 경매장 · 업적 (2026-10-24 마무리)
   - 내 정보: 성좌 카드 · 요약 · 해금 · 잠재력 엿보기(STARACC.peek, 대략 → 전부) · 지난 헌터들(성좌 계정 past) · 고유 클래스 · 스킬
   - 상점: 매일 바뀌는 진열 + 늘 파는 물건 (STAR.shopList · shopBuy). 산 물건은 바로 헌터에게 선물
   - 성좌 경매장: STAR.auctionView
   - 업적: data/stars.js achievements · 진행 막대(STARACC.progress) · 숨은 업적은 이루기 전 ???
   ========================================================= */
const STAR_UI = (() => {
  const STAT = { atk: '공격', mag: '마공', def: '방어', res: '마법 저항', acc: '명중', eva: '회피', crit: '치명' };
  const coinBox = () => `<div class="su-coin"><span>보유 코인</span><b>${coinTxt(G.coin || 0)}</b></div>`;
  const head = (title, sub) => `<div class="su-head"><div><h1 class="h1">${title}</h1><div class="sub">${sub}</div></div>${coinBox()}</div>`;
  const panel = (title, body, extra = '') => `<section class="panel"><div class="ph"><span>${title}</span>${extra ? `<span class="dim" style="font-weight:400">${extra}</span>` : ''}</div><div class="pb">${body}</div></section>`;
  const gradeChip = it => { const g = GEAR.gradeOf(it); return g ? `<span class="su-grade" style="--gc:${g.color}">${esc(g.name)}</span>` : ''; };
  const statTxt = it => Object.entries(it.stat || {}).map(([k, v]) => `${STAT[k] || k} +${v}`).join(' · ');

  /* ---------- 내 정보 ---------- */
  function potHTML() {
    const h = G.player, pot = h.pot, lv = G.peek || 0, cost = STARACC.unlocked('peekPotential') ? [0, 0] : (DB.balance.BAL_STAR.peekCost || [300, 1500]);
    if (!pot) return '<div class="dim">이 헌터는 잠재력 기록이 없다.</div>';
    const btn = (n, label) => `<button class="btn ${n === 2 ? 'pri' : ''}" data-speek="${n}" ${lv >= n || (G.coin || 0) < cost[n - 1] ? 'disabled' : ''}>${label} ${cost[n - 1] ? coinTxt(cost[n - 1]) : '<span class="good">무료</span>'}</button>`;
    let body;
    if (lv >= 2) {
      const sum = ablSum(h), lvp = Math.round(h.level / pot.level * 100), capp = Math.round(sum / pot.cap * 100);
      body = `<div class="su-pot"><div><span>레벨 한계</span><b class="num">Lv.${pot.level}</b><div class="bar"><i style="width:${lvp}%"></i></div><small>지금 Lv.${h.level} · ${lvp}%</small></div>
        <div><span>세부 능력 합계 상한</span><b class="num">${pot.cap}</b><div class="bar"><i style="width:${capp}%"></i></div><small>지금 ${sum} · ${capp}%</small></div></div>`;
    } else if (lv >= 1) {
      const r = rng(h.id + '|peek'), a = Math.max(h.level, pot.level - 3 - Math.round(r() * 5)), b = Math.min(DB.balance.BAL_GROWTH.levelMax, pot.level + 3 + Math.round(r() * 5)), left = pot.level - h.level;
      body = `<div class="su-pot"><div><span>레벨 한계 (대략)</span><b class="num">Lv.${a} ~ ${b}</b><small>${left > 40 ? '아직 한참 더 클 수 있다.' : left > 15 ? '갈 길이 남아 있다.' : left > 0 ? '벽이 머지않았다.' : '이미 벽에 닿았다.'}</small></div>
        <div><span>재능의 폭</span><b>${pot.cap >= 1000 ? '드물게 넓다' : pot.cap >= 800 ? '넓은 편' : pot.cap >= 600 ? '보통' : '좁은 편'}</b><small>세부 능력이 얼마나 자랄 수 있는지</small></div></div>`;
    } else body = `<div class="dim">헌터 본인도 모르는 그릇의 크기. 성좌의 힘으로 엿볼 수 있다.</div>`;
    return `${body}<div class="row" style="gap:6px;margin-top:10px">${lv < 1 ? btn(1, '대략 엿보기') : ''}${lv < 2 ? btn(2, '전부 엿보기') : '<span class="dim">모두 보았다.</span>'}</div>`;
  }
  function pastHTML(s) {
    const L = s.past || [];
    if (!L.length) return '<div class="dim">아직 끝난 이야기가 없다. 헌터가 은퇴하거나 쓰러지면 여기에 남는다.</div>';
    return `<table class="su-past"><thead><tr><th>헌터</th><th>최고 등급</th><th class="r">레벨</th><th class="r">산 날</th><th class="r">클리어</th><th>마지막</th></tr></thead><tbody>${L.slice(0, 20).map(p => `<tr><td><b>${esc(p.name)}</b> <span class="dim">${esc(DB.classes[p.cls]?.name || '')}</span></td><td>${rkBadge(p.rank)}</td><td class="r num">${p.level}</td><td class="r num">${p.days}일</td><td class="r num">${p.cleared}</td><td class="${p.kind === 'retire' ? '' : 'bad'}">${p.kind === 'retire' ? '은퇴' : '사망'}${p.cause ? ` <span class="dim">${esc(p.cause)}</span>` : ''}</td></tr>`).join('')}</tbody></table>`;
  }
  function uniqueHTML(s) {
    const pr = s.preset ? DB.starPresets?.[s.preset] : null, c = pr?.cls && DB.classes[pr.cls], sk = (pr?.skills || []).map(id => DB.skills[id]).filter(Boolean);
    const held = Object.entries(G.uniqueHeld || {}).filter(([, hid]) => hid === G.player.id).map(([cid]) => DB.classes[cid]).filter(Boolean);
    if (!c && !sk.length && !held.length) return `<div class="dim">${s.preset ? '이 성좌에게는 고유 클래스 · 스킬이 없다.' : '나만의 성좌는 고유 클래스 · 스킬 없이 시작한다. 고유 클래스북을 손에 넣으면 헌터에게 내려 줄 수 있다.'}</div>`;
    return `<div class="su-uq">${c ? `<div><span>고유 클래스</span><b>${esc(c.name)}</b><small>${esc(c.desc || '')}</small></div>` : ''}${sk.map(k => `<div><span>고유 스킬</span><b>${esc(k.name)}</b><small>${esc(k.desc || '')}</small></div>`).join('')}
      ${held.map(x => `<div class="on"><span>헌터가 지닌 고유 클래스</span><b>${esc(x.name)}</b></div>`).join('')}</div>`;
  }
  function info() {
    const s = STARACC.cur();
    if (!s) return head('내 정보', '성좌 정보') + `<div class="panel pb dim">성좌 계정이 없는 게임이다 (데모 · 옛 세이브). 새 게임에서 성좌를 만들면 여기에 보인다.</div>`;
    const T = (tb, id) => DB[tb]?.[id]?.name || '—', col = STARACC.colOf(s), A = vals('achievements'), achN = Object.keys(s.ach || {}).length;
    const UNL = [['pickClass', '클래스 직접 고르기'], ['pickStats', '능력치 직접 고르기'], ['pickPotential', '잠재력 직접 고르기'], ['peekPotential', '잠재력 엿보기 무료']];
    const how = id => A.find(a => a.unlock === id);
    const days = G.day - (G.startDay ?? G.day) + 1, R = G.starRel || {};
    return head('내 정보', '성좌는 게임 계정 — 업적 · 코인 · 해금은 헌터가 바뀌어도 남는다') + `<div class="su-info">
      <section class="su-card" style="--sc:${col}"><div class="su-card-sig">${esc(STARACC.markOf(s))}</div><div class="su-card-name">${esc(s.name)}</div>
        <div class="sub">${esc(T('starTraits', s.trait))} 성좌 · ${esc(T('starDomains', s.domain))}의 영역</div>
        <dl class="su-kv"><dt>말투</dt><dd>${esc(T('ccSpeech', s.speech))}</dd><dt>깨어난 날</dt><dd>${s.created ? new Date(s.created).toLocaleDateString('ko-KR') : '—'}</dd><dt>지켜본 헌터</dt><dd>${(s.past || []).length + (G.dead ? 0 : 1)}명</dd></dl>
        ${s.preset ? '' : '<div class="dim su-note">한 번 만든 성좌는 고칠 수 없다</div>'}</section>
      <div class="su-col">
        <div class="su-stats">${[['지켜보는 헌터', esc(G.player.name)], ['함께한 날', days + '일'], ['헌터가 성좌를', G.starKnown ? '안다' : '모른다'], ['보낸 선물', (G.starGifts || []).length + '번'], ['성좌에게 물은 일', G.starKnown ? (R.asked || 0) + '번' : '—'], ['업적', `${achN} / ${A.length}`]].map(([k, v]) => `<div class="su-stat"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
        ${panel('해금', `<div class="su-unl">${UNL.map(([k, n]) => { const a = how(k); return `<div class="${STARACC.unlocked(k) ? 'on' : ''}"><span>${STARACC.unlocked(k) ? '✓' : '🔒'}</span><div>${n}${a ? `<small>업적 「${esc(a.hidden && !s.ach?.[a.id] ? '???' : a.name)}」</small>` : ''}</div></div>`; }).join('')}</div>`, '업적으로 열린다 · 다음 헌터를 만들 때 적용')}
        ${panel('잠재력 엿보기', potHTML(), '성좌의 힘 · 헌터는 모른다')}
        ${panel('고유 클래스 · 고유 스킬', uniqueHTML(s))}
        ${panel('지난 헌터들', pastHTML(s), '이 성좌가 지켜본 이야기')}
      </div></div>`;
  }

  /* ---------- 상점 ---------- */
  const CATS = [['ALL', '전체'], ['W', '무기', ['ITC_WEAPON']], ['A', '방어구', ['ITC_ARMOR']], ['X', '악세사리', ['ITC_ACCESSORY']], ['C', '소모품 · 도구', ['ITC_CONSUME', 'ITC_GEAR']], ['S', '마정석 · 소재', ['ITC_STONE', 'ITC_MAT']], ['B', '책', ['ITC_BOOK']]];
  /* 축복 (starBlessings 가 있을 때만 '축복' 갈래가 보인다) */
  function blessHTML() {
    const L = STAR.blessList(), act = STAR.blessActive(), now = nowAbs();
    return `<div class="su-bless">${L.map(b => { const on = act.find(x => x.id === b.id), cd = (G.blessCd?.[b.id] || 0) > now;
      return `<div class="su-ach ${on ? 'on' : ''}"><div class="su-ach-t"><b>${esc(b.name)}</b><span class="su-ach-c">${b.days ?? 1}일${b.cd ? ` · 재사용 ${b.cd}일` : ''}</span></div><span class="muted">${esc(b.desc || '')}</span>
        ${on ? `<span class="good" style="font-size:11px">걸려 있음 · ${durTxt(on.until - now).replace(/ \d+분$/, '')} 남음</span>` : ''}
        <span class="su-ach-r">${coinTxt(b.coin || 0)}<button class="btn sm pri" data-subless="${b.id}" ${cd || (G.coin || 0) < (b.coin || 0) ? 'disabled' : ''}>${cd ? '기다리는 중' : '축복 걸기'}</button></span></div>`; }).join('')}</div>`;
  }
  function shop() {
    if (UI.suCat === 'BL' && STAR.blessList().length) return head('상점', '성좌의 축복 — 코인으로 헌터에게 잠시 힘을 보탠다') + `<div class="su-chips">${CATS.map(c => `<button class="chip" data-sucat="${c[0]}">${c[1]}</button>`).join('')}<button class="chip a" data-sucat="BL">축복</button></div>${blessHTML()}`;
    const L = STAR.shopList(), cat = CATS.find(c => c[0] === UI.suCat) || CATS[0], list = cat[2] ? L.filter(e => cat[2].includes(DB.items[e.item].cat)) : L;
    const sel = L.find(e => e.id === UI.suSel) || list[0], it = sel && DB.items[sel.item], qty = Math.max(1, Math.min(UI.suQty || 1, sel?.left ?? 99));
    const card = e => { const i = DB.items[e.item], g = GEAR.gradeOf(i);
      return `<button class="su-item ${e.id === sel?.id ? 'on' : ''} ${e.left === 0 ? 'out' : ''}" data-sushop="${e.id}" style="--gc:${g?.color || 'var(--line2)'}"><span class="su-it-top">${gradeChip(i)}<span class="dim">${esc(GEAR.slotOf(i) ? DB.equipSlots[GEAR.slotOf(i)]?.name : DB.itemCats[i.cat]?.name || '')}</span></span>
        <b>${esc(i.name)}</b><span class="su-it-st">${esc(statTxt(i)) || '&nbsp;'}</span><span class="su-it-ft">${coinTxt(e.coin)}<span class="${e.left === 0 ? 'bad' : 'dim'}">${e.left === 0 ? '품절' : e.left == null ? (e.fixed ? '상시' : '') : '남은 ' + e.left}</span></span></button>`; };
    const side = sel ? `<div class="ph"><span>${esc(it.name)}</span>${gradeChip(it)}</div><div class="pb" style="display:grid;gap:10px">
        <p style="margin:0">${esc(it.desc || '설명 없음')}</p>
        <dl class="kv" style="font-size:12px"><dt>분류</dt><dd>${esc(DB.itemCats[it.cat]?.name || '')}${GEAR.slotOf(it) ? ' · ' + esc(DB.equipSlots[GEAR.slotOf(it)]?.name) : ''}</dd>${it.stat ? `<dt>입으면</dt><dd>${esc(statTxt(it))}</dd>` : ''}${(GEAR.traitsOf(it) || []).length ? `<dt>개성</dt><dd>${GEAR.traitsOf(it).map(t => esc(GEAR.traitTxt(t))).join(' · ')}</dd>` : ''}<dt>가격</dt><dd>${coinTxt(sel.coin)}</dd><dt>재고</dt><dd>${sel.left == null ? '무제한' : sel.left + '개'}</dd></dl>
        ${sel.left === 0 ? '<div class="bad">품절</div>' : `<div class="row" style="gap:8px"><label class="sub" for="suqty">수량</label><input id="suqty" class="abin" style="width:64px" type="number" min="1" max="${sel.left ?? 99}" value="${qty}" data-suqty="1"><span class="sub">합계 ${coinTxt(sel.coin * qty)}</span></div>
        <button class="btn pri" data-subuy="${sel.id}" ${sel.coin * qty > (G.coin || 0) ? 'disabled' : ''}>헌터에게 선물하기</button>${sel.coin * qty > (G.coin || 0) ? '<div class="bad" style="font-size:12px">코인이 부족하다. 헌터가 몬스터를 처치하면 쌓인다.</div>' : ''}`}
        <button class="btn sm" data-item="${it.id}">자세히 보기</button>
        <div class="dim su-note">${G.starKnown ? '헌터는 선물이 성좌에게서 왔다는 걸 안다.' : '헌터는 아직 성좌를 모른다 — 선물은 헌터가 운이나 노력으로 얻은 것처럼 들어간다.'} 입을지 · 쓸지는 헌터가 정한다.</div></div>` : '<div class="pb dim">고른 상품이 없다.</div>';
    return head('상점', '성좌가 코인으로 사서 헌터에게 선물한다 · 진열은 매일 바뀐다 (헌터 등급에 맞는 물건이 많이 나온다)') + `<div class="su-split">
      <div><div class="su-chips">${CATS.map(c => `<button class="chip ${c[0] === cat[0] ? 'a' : ''}" data-sucat="${c[0]}">${c[1]} <span class="dim">${c[2] ? L.filter(e => c[2].includes(DB.items[e.item].cat)).length : L.length}</span></button>`).join('')}${STAR.blessList().length ? '<button class="chip" data-sucat="BL">축복</button>' : ''}</div>
        <div class="su-grid">${list.map(card).join('') || '<div class="dim">이 갈래는 오늘 진열이 없다.</div>'}</div>
        <div class="dim" style="font-size:11px">다음 진열까지 ${durTxt(1440 - nowAbs() % 1440).replace(/ \d+분$/, '')}</div></div>
      <aside class="panel su-side">${side}</aside></div>`;
  }

  /* ---------- 업적 ---------- */
  const fmtN = (a, v) => a.measure === 'money' ? won(v) : a.measure === 'rank' ? (21 - v) + '급' : v.toLocaleString();
  function achieve() {
    const s = STARACC.cur(), A = vals('achievements'), got = s?.ach || {}, cats = ['전체', ...new Set(A.map(a => a.cat))], cat = cats.includes(UI.suAchCat) ? UI.suAchCat : '전체';
    const coinGot = A.filter(a => got[a.id]).reduce((t, a) => t + (a.coin || 0), 0);
    const list = A.filter(a => cat === '전체' || a.cat === cat).sort((x, y) => !!got[y.id] - !!got[x.id] || 0);
    const card = a => { const on = !!got[a.id], hide = a.hidden && !on, [cur, n] = STARACC.progress(a), pc = Math.max(0, Math.min(100, Math.round(cur / n * 100)));
      return `<div class="su-ach ${on ? 'on' : ''}"><div class="su-ach-t"><b>${on ? '✓ ' : ''}${hide ? '???' : esc(a.name)}</b><span class="su-ach-c">${esc(a.cat)}</span></div>
        <span class="muted">${hide ? '이루면 드러난다.' : esc(a.desc || '')}</span>
        ${on ? `<span class="good" style="font-size:11px">${new Date(got[a.id]).toLocaleDateString('ko-KR')} 달성</span>` : hide ? '' : `<div class="su-ach-p"><div class="bar"><i style="width:${pc}%"></i></div><span class="num">${fmtN(a, Math.min(cur, n))} / ${fmtN(a, n)}</span></div>`}
        <span class="su-ach-r">${coinTxt(a.coin || 0)}${a.unlock ? ` <span class="chip a">해금</span>` : ''}</span></div>`; };
    return head('업적', '성좌 계정에 남는다 — 한 번 받은 업적은 다시 받을 수 없다 · 이루면 코인을 받는다') + `
      ${s ? '' : '<div class="panel pb dim">성좌 계정이 없는 게임이라 업적이 쌓이지 않는다. 진행만 보인다.</div>'}
      <div class="su-stats">${[['달성', `${Object.keys(got).length} / ${A.length}`], ['업적으로 받은 코인', coinTxt(coinGot)], ['해금', `${Object.keys(s?.unlocks || {}).length} / 4`]].map(([k, v]) => `<div class="su-stat"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
      <div class="su-chips">${cats.map(c => `<button class="chip ${c === cat ? 'a' : ''}" data-suach="${c}">${c}</button>`).join('')}</div>
      <div class="su-grid ach">${list.map(card).join('')}</div>`;
  }

  /* ---------- 클릭 ---------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-sushop],[data-sucat],[data-subuy],[data-speek],[data-suach],[data-subless]'); if (!t) return; const d = t.dataset;
    if (d.sushop) { UI.suSel = d.sushop; UI.suQty = 1; render(); return; }
    if (d.sucat) { UI.suCat = d.sucat; UI.suSel = null; render(); return; }
    if (d.subuy) { if (STAR.shopBuy(d.subuy, UI.suQty || 1)) UI.suQty = 1; render(); return; }
    if (d.speek) { const n = +d.speek; if (STARACC.peek(n)) toast(n === 2 ? '헌터의 그릇이 또렷이 보인다.' : '헌터의 그릇이 어렴풋이 보인다.'); else toast('코인이 부족하다.'); render(); return; }
    if (d.subless) { if (STAR.bless(d.subless)) toast('축복을 걸었다.'); render(); return; }
    if (d.suach) { UI.suAchCat = d.suach; render(); return; }
  });
  document.addEventListener('input', e => { if (!e.target.dataset?.suqty) return; UI.suQty = Math.max(1, parseInt(e.target.value, 10) || 1); });
  document.addEventListener('change', e => { if (e.target.dataset?.suqty) render(); });

  const VIEWS = { starinfo: info, shop, auction: () => STAR.auctionView(), achieve };
  return { html: tab => `<div class="su">${(VIEWS[tab] || info)()}</div>` };
})();
