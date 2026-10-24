/* =========================================================
   hunter_rel.js — 내 헌터 › 관계 탭 (2026-10-24)
   헌터가 사람들(그리고 성좌)을 어떻게 생각하는지 지켜보는 화면. 성좌는 직접 고르거나 조작하지 않는다 — 행동 버튼 없음.
   마음은 숫자 대신 말로 보인다(막대는 느낌만). 상대의 마음은 헌터의 짐작(relRead).
   맨 위 '성좌' 칸: 헌터가 성좌를 아는지 · 신뢰 단계 문장(STARADV.stageText) · 받은 선물 · 물어본 일.
   ========================================================= */
const HUNTER_REL = (() => {
  const GROUPS = ['가족', '연애', '친구', '동료', '라이벌', '지인'];
  const likeWord = v => v == null ? '알 수 없음' : v <= -50 ? '싫어한다' : v <= -15 ? '꺼린다' : v < 15 ? '별생각 없다' : v < 45 ? '호감이 있다' : v < 75 ? '좋아한다' : '아낀다';
  const lvWord = v => v == null ? '?' : v < 15 ? '거의 없음' : v < 40 ? '조금' : v < 70 ? '꽤' : '깊이';
  const nm = () => MIND.callName();
  function list() {
    const L = (G.relations || []).filter(r => P(r.id)).map(r => ensureRel(r));
    const tagOf = r => DB.relStatus[r.status]?.romance ? '연애' : DB.relTypes[r.rel]?.tag || '지인';
    return GROUPS.map(g => [g, L.filter(r => tagOf(r) === g).sort((a, b) => (b.to.RD_CLOSE || 0) - (a.to.RD_CLOSE || 0))]).filter(([, a]) => a.length);
  }
  const dimsFor = r => { const p = P(r.id), adult = isAdultP(p) && isAdultP(G.player); return vals('relDims').filter(d => !(d.adult && (!adult || isFam(r)))); };
  /* 한 줄 속마음: 호감 말 + 40 이상인 다른 마음 두 개 */
  function gist(r) {
    const extra = dimsFor(r).filter(d => d.id !== 'RD_LIKE' && d.id !== 'RD_CLOSE' && (r.to[d.id] || 0) >= 40).sort((a, b) => r.to[b.id] - r.to[a.id]).slice(0, 2);
    return likeWord(r.to.RD_LIKE) + (extra.length ? ' · ' + extra.map(d => `${d.name} ${lvWord(r.to[d.id])}`).join(' · ') : '');
  }
  const bar = (d, v, txt) => { const lo = d.range[0], neg = v != null && v < 0, w = v == null ? 0 : lo < 0 ? Math.abs(v) : (v - lo) / (d.range[1] - lo) * 100;
    return `<div class="hr-dim"><span>${d.name}</span><div class="hr-bar ${neg ? 'neg' : ''} ${v == null ? 'unk' : ''}"><i style="width:${Math.max(0, Math.min(100, w))}%;${neg ? '' : `background:${d.color}`}"></i></div><b>${txt}</b></div>`; };

  /* ---------- 성좌 ---------- */
  function starRow(sel) {
    const s = typeof STARACC !== 'undefined' ? STARACC.cur() : null; if (!s) return '';
    const known = !!G.starKnown, col = STARACC.colOf(s);
    return `<button class="hr-item hr-star ${sel ? 'sel' : ''}" data-hrel="STAR" style="--sc:${col}"><span class="hr-sig">${known ? esc(STARACC.markOf(s)) : '?'}</span><span class="hr-nm"><b>${known ? esc(s.name) : '알 수 없는 무언가'}</b><span>${known ? esc(STARADV.stageText() || '성좌') : '아직 모른다'}</span></span></button>`;
  }
  function starDetail() {
    const s = STARACC.cur(), known = !!G.starKnown, R = STARADV.rel(), gifts = (G.starGifts || []).length;
    return `<div class="hr-head" style="--sc:${STARACC.colOf(s)}"><span class="hr-sig big">${known ? esc(STARACC.markOf(s)) : '?'}</span><div><h2>${known ? esc(s.name) : '알 수 없는 무언가'}</h2><div class="sub">${known ? '성좌 · 하늘 너머에서 지켜보는 존재' : '헌터는 아직 성좌를 모른다'}</div></div></div>
      <div class="hr-gist">${known ? esc(STARADV.stageText()) : `가끔 이유 없이 가방에 물건이 생긴다. ${esc(nm())}은(는) 그게 누구의 손길인지 모른다.`}</div>
      <div class="hr-facts">${[[known ? '받은 선물' : '이유 모를 물건', gifts + '개'], ['성좌에게 물은 일', known ? R.asked + '번' : '—'], ['말대로 한 일', known ? R.followed + '번' : '—'], ['고개를 저은 일', known ? R.refused + '번' : '—']].map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>
      <section class="hr-sec"><div class="sub">최근 선물</div>${(G.starGifts || []).slice(0, 6).map(g => { const d = dateOf(Math.floor(g.t / 1440)); return `<div class="hr-log"><span class="num muted">${d.m}/${d.d}</span> ${esc(DB.items[g.item]?.name || g.item)}${g.qty > 1 ? ' ' + g.qty + '개' : ''}</div>`; }).join('') || '<div class="dim hr-log">아직 없음</div>'}</section>`;
  }

  /* ---------- 사람 ---------- */
  function row(r, sel) {
    const p = P(r.id);
    return `<button class="hr-item ${sel ? 'sel' : ''}" data-hrel="${r.id}"><span class="hr-av">${esc((p.name || '?').slice(-2))}</span><span class="hr-nm"><b>${esc(p.name)}</b><span>${esc(gist(r))}</span></span><span class="hr-tag">${esc(DB.relStatus[r.status]?.name && !isFam(r) ? DB.relStatus[r.status].name : DB.relTypes[r.rel]?.name || '')}</span></button>`;
  }
  function detail(r) {
    const p = P(r.id), hh = H(r.id), dims = dimsFor(r), me = nm();
    const lines = (G.story || []).filter(x => x.who === r.id).slice(-6).reverse();
    return `<div class="hr-head"><span class="hr-av big">${esc((p.name || '?').slice(-2))}</span><div><h2>${esc(p.name)}</h2><div class="sub">${esc(DB.relTypes[r.rel]?.name || '')}${hh ? ' · ' + DB.ranks[hh.rank].name + '급 ' + DB.roles[hh.roleMain].name : p.job && p.job !== '—' ? ' · ' + esc(p.job) : ''}${p.age ? ' · ' + p.age + '세' : ''}</div></div></div>
      <div class="hr-gist">${esc(me)}은(는) ${esc(p.name)}을(를) — <b>${esc(gist(r))}</b></div>
      <div class="hr-cols">
        <section class="hr-sec"><div class="sub">${esc(me)}의 마음</div>${dims.map(d => bar(d, r.to[d.id], d.id === 'RD_LIKE' ? likeWord(r.to[d.id]) : lvWord(r.to[d.id]))).join('')}</section>
        <section class="hr-sec"><div class="sub">${esc(p.name)}의 마음 <span class="dim">(${esc(me)}의 짐작)</span></div>${dims.map(d => { const x = relRead(r, d.id); return bar(d, x.v, x.v == null ? (x.t && x.t !== '?' ? x.t : '모름') : d.id === 'RD_LIKE' ? likeWord(x.v) : lvWord(x.v)); }).join('')}</section>
      </div>
      ${r.note ? `<section class="hr-sec"><div class="sub">메모</div><div class="hr-log">${esc(r.note)}</div></section>` : ''}
      <section class="hr-sec"><div class="sub">함께한 일</div>${lines.map(x => { const d = dateOf(Math.floor(x.t / 1440)); return `<div class="hr-log"><span class="num muted">${d.m}/${d.d}</span> ${esc(x.s)}</div>`; }).join('') || '<div class="dim hr-log">아직 없음</div>'}</section>`;
  }

  function html() {
    const groups = list(), all = groups.flatMap(([, a]) => a), hasStar = typeof STARACC !== 'undefined' && !!STARACC.cur();
    let sel = UI.hrelSel; if (sel === 'STAR' && !hasStar) sel = null; if (sel !== 'STAR' && !all.some(r => r.id === sel)) sel = hasStar ? 'STAR' : all[0]?.id;
    const right = sel === 'STAR' ? starDetail() : sel ? detail(all.find(r => r.id === sel)) : '<div class="dim">아직 아는 사람이 없다.</div>';
    return `<div class="hr"><div class="hr-intro sub">${esc(nm())}이(가) 사람들을 어떻게 생각하는지. 마음은 말로만 보인다 — 상대의 마음은 ${esc(nm())}의 짐작이다.</div>
      <div class="hr-body"><nav class="hr-list" aria-label="관계 목록">${hasStar ? `<div class="hr-grp">성좌</div>${starRow(sel === 'STAR')}` : ''}${groups.map(([g, a]) => `<div class="hr-grp">${g} <span class="dim">${a.length}</span></div>${a.map(r => row(r, r.id === sel)).join('')}`).join('')}</nav>
      <div class="hr-detail">${right}</div></div></div>`;
  }
  document.addEventListener('click', e => { const b = e.target.closest?.('[data-hrel]'); if (!b) return; UI.hrelSel = b.dataset.hrel; render(); });
  return { html, gist, likeWord };
})();
