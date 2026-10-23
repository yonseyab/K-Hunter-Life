/* =========================================================
   engine/active.js — '활동 중인 사람' (2026-10-24 사용자 결정)
   내 헌터 주변 인물 + 이야기에 한 번이라도 등장한 사람은 성격 · 감정 · 상태(판단 엔진 MIND)로 행동을 정한다.
   배경 인구(SIM 집계)는 기존 방식 그대로.
   G.active = {id: 마지막으로 엮인 시각}, G.npcEmo = {id: {EM_…: 0~1}} (가벼운 감정, 하루마다 줄어듦), G.faded = {id: {name, line}}
   - 이야기에 등장(STORY.add 의 who) · 기억(remember) · 관계가 생기면 올라온다
   - BAL_ACTIVE.idleDays 동안 안 엮이면 배경으로 내려간다 (감정 · 판단 기억은 접고 이름 · 한 줄만). 상한 BAL_ACTIVE.max — 넘으면 오래된 순
   - 관계 있는 사람(가족 · 연인 · 친한 사람 · 파티 · 즐겨찾기)은 내려가지 않는다
   쓰는 곳: 만남 상대 고르기(사교성), 먼저 연락하기(하루 한 번 굴림), 자동 공략 동행 (위험 · 협동 성향과 기분)
   ========================================================= */
const ACTIVE = (() => {
  const B = () => DB.balance.BAL_ACTIVE;
  const A = () => G.active || (G.active = {});
  function mark(id) { if (!G || !id || id === G.player?.id || id === 'ME' || !(typeof P === 'function' ? P(id) : true)) return; A()[id] = nowAbs(); }
  const is = id => !!(G?.active && G.active[id] != null);
  /* 가벼운 감정: 0~1, 겹치면 더하고 1에서 멈춤 */
  function feel(id, emo, amt) { if (!is(id)) return; const E = (G.npcEmo = G.npcEmo || {}), e = E[id] || (E[id] = {}); e[emo] = Math.min(1, (e[emo] || 0) + amt); }
  const emoOf = id => (G.npcEmo || {})[id] || null;
  /* 판단: 활동 중인 사람만 MIND 로 (-1~1). 아니면 0 (= 옛 방식 그대로) */
  const score = (id, tags) => is(id) && typeof MIND !== 'undefined' ? MIND.npcScore(H(id) || { id }, tags) : 0;
  function protectedSet() {
    const s = new Set([...(G.party?.members || []), ...(G.team?.members || []), ...(G.prefs?.play?.homePeople || []), homeOf().partner].filter(Boolean));
    (G.relations || []).forEach(r => { ensureRel(r); if (isFam(r) || DB.relStatus[r.status]?.romance || (r.to?.RD_CLOSE || 0) >= (B().keepClose ?? 40)) s.add(r.id); });
    return s;
  }
  function fold(id) {
    const m = (G.mem || []).find(x => x.who === id);
    (G.faded = G.faded || {})[id] = { name: nameOf(id), line: m ? m.text : '' };
    delete G.active[id]; if (G.npcEmo) delete G.npcEmo[id]; if (G.mindMem) G.mindMem = G.mindMem.filter(x => x.who !== id);
  }
  /* 하루마다: 감정은 줄고, 오래 안 엮인 사람은 배경으로, 상한을 넘으면 오래된 순으로 */
  function daily() {
    if (!G) return; const b = B(), t = nowAbs(), keep = protectedSet(), act = A();
    Object.values(G.npcEmo || {}).forEach(e => Object.keys(e).forEach(k => { e[k] *= b.emoDecay; if (e[k] < 0.05) delete e[k]; }));
    keep.forEach(id => { if (act[id] == null && P(id)) act[id] = t; });
    Object.entries(act).forEach(([id, at]) => { if (!keep.has(id) && t - at > b.idleDays * 1440) fold(id); });
    const ids = Object.keys(act).filter(id => !keep.has(id)).sort((a, b2) => act[a] - act[b2]);
    let over = Object.keys(act).length - b.max; for (const id of ids) { if (over-- <= 0) break; fold(id); }
    contactRoll();
  }
  /* 먼저 연락하기: 활동 중이고 관계가 있는 사람이 사교성 · 외로움 · 기분에 따라 하루 한 번 굴린다 */
  function contactRoll() {
    const b = B(); if (!(b.contactPerDay > 0)) return;
    const rels = (G.relations || []).filter(r => is(r.id) && r.id !== homeOf().partner);
    for (const r of rels) {
      const s = score(r.id, ['TAG_SOCIAL']), p = b.contactPerDay * (1 + s) * (1 + Math.min(1, (r.close || 0) / 50)); if (Math.random() >= p) continue;
      const l = STORY.pickLine('contact', r.id), who = nameOf(r.id);
      STORY.add('meet', l ? STORY.fill(l.text, { who }) : `${who}에게서 안부 연락이 왔다.`, 2, { who: r.id });
      if (typeof relAdd === 'function') relAdd(r, 'RD_CLOSE', 1, 'both'); feel(r.id, 'EM_JOY', 0.1); break;  /* 하루에 한 명 */
    }
  }
  /* 자동 공략 동행: 내키지 않으면 빠진다 (활동 중인 사람만) */
  function willJoin(id) { if (!is(id)) return true; const s = score(id, ['TAG_RISK', 'TAG_TEAM']); return s > -0.35 || Math.random() < 0.4; }
  /* 만남 상대 가중치 배율 */
  const meetMul = id => is(id) ? 1 + 0.5 * score(id, ['TAG_SOCIAL']) : 1;
  return { mark, is, feel, emoOf, score, daily, willJoin, meetMul, fold };
})();
