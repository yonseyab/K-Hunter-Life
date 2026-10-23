/* =========================================================
   engine/goals.js — 플레이어 목표 (data/goals.js)
   G.goals = [{id:'PG_#', tpl, target, base, term, made(일), due(일, 단기만), done(일)|null, failed(일)|null}]
   · 플레이어가 정한 목표는 자동으로 지우거나 바꾸지 않는다 (설정집 8.2). 끝난 목표는 기록으로 남는다.
   · 목표 방향(ai)은 NPC 목표(aiGoals)와 같아서, '목표에 맞춘 일정 만들기'가 NPC와 같은 효용 엔진(SIM.suggestDay)을 쓴다.
   ========================================================= */
const GOALS = (() => {
  const BG = () => DB.balance.BAL_GOAL;
  const st = () => (G.stats = G.stats || {});
  function value(o) {
    const h = G.player, S = st();
    switch (o.measure) {
      case 'rank': return DB.ranks[h.rank].lv;
      case 'level': return h.level;
      case 'money': return G.money;
      case 'rep': return G.rep;
      case 'cleared': return S.cleared || 0;
      case 'raids': return S.raids || 0;
      case 'trainHours': return Math.floor((S.trainMin || 0) / 60);
      case 'social': return S.social || 0;
      case 'stressBelow': return Math.round(G.cond.stress);
      case 'req': return checkReq(o.req, null) ? 1 : 0;
    }
    return 0;
  }
  /* 고를 수 있는 대상 값 (절대값으로) */
  function options(o) {
    const v = value(o);
    if (o.measure === 'req') return [1];
    if (o.opts === 'rankUp') return [1, 2, 3].map(k => v - k).filter(x => x >= 1);
    if (o.measure === 'stressBelow') return o.opts.filter(x => x < v);
    if (o.rel) return o.opts.map(k => v + k);
    return o.opts.filter(x => x > v);
  }
  const fmt = (o, t) => o.measure === 'money' ? won(t) : o.measure === 'rep' ? Math.min(100, t) : t;
  const name = (o, t) => o.name.replace('{t}', fmt(o, t));
  function progress(g) {
    const o = DB.objectives[g.tpl], v = value(o); let f = 0, cur = v, tgt = g.target, txt = '';
    if (o.measure === 'req') { f = v; txt = v ? '달성' : '아직'; }
    else if (o.measure === 'rank') { const nd = rankNeed(tgt), q = rankQualify(G.player); f = v <= tgt ? 1 : Math.min(q.st / nd.st, q.avg / nd.abl) * 0.99; txt = `지금 ${v}급 · 기준 스탯 ${q.st}/${nd.st} · 능력 평균 ${q.avg.toFixed(1)}/${nd.abl.toFixed(1)}`; }
    else if (o.measure === 'stressBelow') { f = v <= tgt ? 1 : clamp((g.base - v) / Math.max(1, g.base - tgt), 0, 0.99); txt = `지금 ${v}`; }
    else { const b = o.rel ? g.base : 0; f = clamp((v - b) / Math.max(1, tgt - b), 0, 1); txt = o.measure === 'money' ? `${won(v)} / ${won(tgt)}` : `${v - b} / ${tgt - b}${o.rel ? '' : ''}`; if (o.measure === 'level') txt = `Lv.${v} / ${tgt}`; if (o.measure === 'rep') txt = `${v} / ${Math.min(100, tgt)}`; }
    return { f, txt, done: f >= 1 };
  }
  function add(tpl, target) {
    const o = DB.objectives[tpl], B = BG(); if (!o) return '없는 목표입니다';
    const act = (G.goals || []).filter(g => !g.done && !g.failed);
    if (act.filter(g => g.term === o.term).length >= B.max[o.term]) return `${B.terms[o.term]} 목표는 ${B.max[o.term]}개까지입니다`;
    if (act.some(g => g.tpl === tpl)) return '같은 목표가 이미 있습니다';
    const v = value(o);
    (G.goals = G.goals || []).unshift({ id: 'PG_' + ((G.goalSeq = (G.goalSeq || 0) + 1)), tpl, target: o.measure === 'req' ? 1 : +target, base: v, term: o.term, made: G.day, due: o.days ? G.day + o.days : null, done: null, failed: null });
    return null;
  }
  function drop(id) { const g = (G.goals || []).find(x => x.id === id); if (g && !g.done) { g.failed = G.day; g.gaveUp = true; } }
  /* 진행 확인: 하루마다 · 행동 뒤에. 달성 → 알림 · 인생 기록 · 스트레스 감소 / 단기 기한 넘김 → 실패 */
  function check() {
    const B = BG(), out = [];
    for (const g of G.goals || []) {
      if (g.done || g.failed) continue; const o = DB.objectives[g.tpl], p = progress(g);
      if (p.done) { g.done = G.day; G.cond.stress = clamp(G.cond.stress + B.doneStress); pushHistory(`목표 달성: ${name(o, g.target)}`, B.terms[g.term]); out.push(name(o, g.target));
        G.alerts.unshift({ from: 'SYS_LIFE', ev: null, resolved: null, unread: true, when: hhmm(G.time), subj: `목표 달성 — ${name(o, g.target)}`, actions: [['목표 보기', 'goals']], body: `${B.terms[g.term]} 목표를 이뤘습니다. 다음 목표를 정해 보세요.` }); }
      else if (g.due != null && G.day >= g.due) { g.failed = G.day; G.cond.stress = clamp(G.cond.stress + B.failStress); G.alerts.unshift({ from: 'SYS_LIFE', ev: null, resolved: null, unread: true, when: hhmm(G.time), subj: `목표 기한 지남 — ${name(o, g.target)}`, actions: [['목표 보기', 'goals']], body: '이번에는 이루지 못했습니다.' }); }
    }
    return out;
  }
  const active = () => (G.goals || []).filter(g => !g.done && !g.failed);
  /* 추천: 지금 상태에서 할 만한 목표 (성격 방향 순) */
  function suggest(n) {
    const have = new Set(active().map(g => g.tpl)), px = G.bio?.pers || {}, c = v => ((v ?? 5.5) - 5.5) / 4.5;
    const score = o => { const ag = DB.aiGoals[o.ai]; let s = 0; for (const k in ag?.px || {}) s += ag.px[k] * c(px[k]); return s; };
    const limit = n ?? BG().suggest, best=[];
    for (const o of vals('objectives')) {
      if(have.has(o.id)||(o.measure==='req'&&value(o)))continue;
      const op=options(o);if(!op.length)continue;
      const row=[o,op[0],score(o)];let at=best.findIndex(x=>x[2]<row[2]);if(at<0)at=best.length;
      if(at<limit){best.splice(at,0,row);if(best.length>limit)best.pop();}
    }
    return best;
  }
  /* 일정 엔진에 넘길 목표 방향: 활성 목표의 ai 를 장기 > 중기 > 단기 순으로 */
  function aiFocus() {
    const w = { long: 3, mid: 2, short: 1 }, sc = {}, focused = active().filter(g => g.focus); for (const g of (focused.length ? focused : active())) { const a = DB.objectives[g.tpl].ai; sc[a] = (sc[a] || 0) + w[g.term]; }
    return Object.entries(sc).sort((a, b) => b[1] - a[1]).map(x => x[0]);
  }
  return { value, options, name, progress, add, drop, check, active, suggest, aiFocus };
})();
