/* =========================================================
   engine/content.js — 대량 콘텐츠를 위한 공용 도구 (2026-10-24 기반 작업)
   1) 색인  CONTENT.by(테이블, 칸) · CONTENT.get(테이블, 칸, 값)
      def() 로 그 테이블에 행이 더해지면(팩 · 추가 파일) 저절로 다시 만든다 (HL_REV). 행을 직접 지웠다면 CONTENT.reset(). 이벤트를 '발동 시점(on)'으로 고를 때 전부 훑지 않는다.
   2) 꼬리표 CONTENT.tagsOf(행) · hasTag · tagged(테이블, 꼬리표) · ctxTags(of, 대상) · ctxHas
      행의 tags(옛 자유 글자) + ctags(contentTags ID) 를 함께 본다. 이벤트 조건 {k:'tag'} 이 ctxHas 를 쓴다.
   3) 빈칸 문장 CONTENT.fill(문장, 값)
      {a|b|c} 하나 고르기 · {@key} textBits 재료 · {이름} / {who.name} 값 · 조사 자동(STORY.josa)
   ========================================================= */
const CONTENT = (() => {
  /* ---------- 색인 ---------- */
  const idx = {};
  const rev = t => (window.HL_REV || {})[t] || 0;   /* def() 가 올리는 테이블별 판 번호 (index.html) */
  function by(table, field) {
    const k = table + '|' + field, c = idx[k], r = rev(table);
    if (c && c.r === r) return c.m;
    const L = vals(table), m = new Map();
    L.forEach(r => { const v = r[field]; (Array.isArray(v) ? v : [v]).forEach(x => { if (!m.has(x)) m.set(x, []); m.get(x).push(r); }); });
    idx[k] = { r, m }; return m;
  }
  const get = (table, field, v) => by(table, field).get(v) || [];
  /* 테이블 전체 (매번 Object.values 를 만들지 않게). 돌려받은 배열을 고치지 말 것 */
  const allC = {};
  const all = t => { const c = allC[t], r = rev(t); if (c && c.r === r) return c.L; const L = vals(t); allC[t] = { r, L }; return L; };
  /* 행을 def() 말고 직접 지웠을 때 등: 색인을 버린다 */
  const reset = () => { for (const k in idx) delete idx[k]; for (const k in allC) delete allC[k]; };

  /* ---------- 꼬리표 ---------- */
  const tagsOf = r => r ? [...(r.tags || []), ...(r.ctags || [])] : [];
  const hasTag = (r, t) => tagsOf(r).includes(t);
  const tagged = (table, t) => [...new Set([...get(table, 'ctags', t), ...get(table, 'tags', t)])];
  function ctxTags(of, tgt) {
    switch (of) {
      case 'here': { const l = locOf(); return [...tagsOf(DB.placeTypes?.[l.pt]), ...tagsOf(DB.regions?.[l.region])]; }
      case 'gate': return G.inGate ? tagsOf(DB.gates[G.inGate]) : [];
      case 'who': return tgt ? tagsOf(P(tgt)) : [];
      case 'player': { const h = G.player; return [...tagsOf(h), ...tagsOf(DB.classes[h.cls]), ...(h.traits || []).flatMap(id => tagsOf(DB.traits?.[id]))]; }
      case 'bag': return invOf().flatMap(r => tagsOf(DB.items[r.item]));
    }
    return [];
  }
  const ctxHas = (of, t, tgt) => ctxTags(of, tgt).includes(t);

  /* ---------- 빈칸 문장 ---------- */
  const pick = L => L[Math.floor(Math.random() * L.length)];
  const path = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
  function bits(key) {
    return get('textBits', 'key', key).filter(b => !b.req || (b.req || []).every(q => typeof checkReq !== 'function' || checkReq(q))).flatMap(b => b.texts || []);
  }
  function fill(t, vars = {}, depth = 0) {
    let s = String(t ?? '');
    if (depth > 4) return s;
    s = s.replace(/\{@([a-z][a-z0-9_.]*)\}/g, (m, k) => { const L = bits(k); return L.length ? fill(pick(L), vars, depth + 1) : ''; });
    s = s.replace(/\{([^{}@]*\|[^{}]*)\}/g, (m, alt) => pick(alt.split('|')));
    s = s.replace(/\{([A-Za-z_][\w.]*)\}/g, (m, k) => { const v = path(vars, k); return v == null ? m : String(v); });
    return typeof STORY !== 'undefined' && STORY.josa ? STORY.josa(s) : s;
  }

  return { by, get, all, reset, tagsOf, hasTag, tagged, ctxTags, ctxHas, bits, fill };
})();
