/* =========================================================
   engine/know.js — 아는 것 vs 사실 (설정집 0장 · 8.1: 인물은 자기가 아는 · 믿는 정보로 판단한다)
   G.know[대상 ID][항목] = {v: 알게 된 값(그때의 복사본), t: 알게 된 시각(분), src: 출처}
   · 세계의 실제 값은 계속 바뀐다. 화면은 '알게 된 값'과 '언제 알았는지'를 보여 준다 (개발자 보기는 실제 값).
   · 출처(knowSources): 스카우트 보고서 · 대화 · 사전 조사 · 소문 …
   · NPC 판단: NPC는 협회가 공개하는 정보(게이트 등급 · 위치 · 기한)와 자기 상태만 쓴다. 숨은 값(몬스터 종류 · 남의 능력)은 쓰지 않는다.
   ========================================================= */
const KNOW = (() => {
  const K = () => (G.know = G.know || {});
  function learn(subj, field, v, src) { const k = K(); (k[subj] = k[subj] || {})[field] = { v: clone(v), t: nowAbs(), src }; }
  const get = (subj, field) => K()[subj]?.[field] || null;
  const days = e => e ? Math.floor((nowAbs() - e.t) / 1440) : null;
  function ageTxt(e) { if (!e) return ''; const m = nowAbs() - e.t; return m < 60 ? '방금' : m < 1440 ? `${Math.floor(m / 60)}시간 전` : `${Math.floor(m / 1440)}일 전`; }
  const src = e => DB.knowSources[e?.src]?.name || e?.src || '';
  /* 헌터 보고서: 그때의 레벨 · 스탯 · 세부 능력 · 스킬 */
  function report(h) { learn(h.id, 'report', { level: h.level, exp: h.exp, stats: h.stats, abl: h.abl, skills: h.skills, rank: h.rank }, 'KS_SCOUT'); }
  /* 정보창에 쓸 '내가 아는 그 사람' (보고서가 없으면 null) */
  function viewOf(h) { const e = get(h.id, 'report'); return e ? { ...h, ...e.v, rank: h.rank } : null; }
  /* 대화로 알게 되는 것: 요즘 목표 · 오늘 할 일 */
  function talk(id) { const a = G.ai?.[id]; if (!a) return; learn(id, 'goal', a.goals, 'KS_TALK'); if (a.day === G.day) learn(id, 'plan', a.today, 'KS_TALK'); }
  /* 들은 이야기: G.know[대상].heard = [{text, t, src, from?, truth?}] (최근 10개, 같은 문장은 한 번) */
  function hear(subj, text, src, extra) { if (!subj || !text) return false; const k = K(), o = (k[subj] = k[subj] || {}), L = (o.heard = o.heard || []); if (L.some(x => x.text === text)) return false;
    L.unshift({ text, t: nowAbs(), src, ...(extra || {}) }); L.length = Math.min(L.length, 10); return true; }
  const heard = subj => K()[subj]?.heard || [];
  return { learn, get, days, ageTxt, src, report, viewOf, talk, hear, heard };
})();
