/* =========================================================
   star_advice.js — 성좌의 조언 (2026-10-24)
   헌터가 성좌를 모르면(G.starKnown 아님) 고민되는 순간에도 묻지 않는다 → 혼자 정하고 이야기는 자연스럽게 이어진다.
   알게 된 뒤엔 사건 · 공략 위기 · 길드 제안에서 성좌에게 묻는다. 성좌가 답하면 따를지는 헌터가 정한다:
     신뢰(성좌 말대로 해서 잘 됐는지) · 호감(선물 등) · 성격(독립/의존 · 자신 우선) · 상태(스트레스) · 성향 차이(자기 판단과 얼마나 다른지) · 위험도
   신뢰는 숫자로 보이지 않는다 — 단계(starTrustStages)가 바뀔 때 문장 한 줄.
   G.starRel = {trust, favor, asked, followed, refused, stage}
   ========================================================= */
const STARADV = (() => {
  const B = () => DB.balance.BAL_STAR.advice;
  const rel = () => G.starRel || (G.starRel = { trust: 0, favor: 0, asked: 0, followed: 0, refused: 0, stage: null });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const canAsk = () => !!(G && G.star && G.starKnown && !G.dead);
  const starNm = () => (typeof STARACC !== 'undefined' && STARACC.cur()?.name) || '성좌';
  function line(on, ctx = {}) {
    const L = vals('starAdviceLines').filter(x => x.on === on); if (!L.length) return '';
    const t = L[Math.floor(Math.random() * L.length)].text;
    return STORY.josa(t.replace(/\{name\}/g, MIND.callName()).replace(/\{star\}/g, starNm()).replace(/\{pick\}/g, ctx.pick || '').replace(/\{own\}/g, ctx.own || ''));
  }
  function stageOf(trust) { let s = null; vals('starTrustStages').sort((a, b) => a.min - b.min).forEach(x => { if (trust >= x.min) s = x; }); return s; }
  /* 따를 확률 */
  function chance(opts, pick, d) {
    const b = B(), r = rel(), px = MIND.pxOf(G.player), F = MIND.factors();
    let p = b.base + r.trust / 100 * b.trust + r.favor / 100 * b.favor + (px.PX_DEPEND || 0) * b.depend - (px.PX_SELF || 0) * b.self - (F['st:stressHigh'] || 0) * b.stress;
    const sc = (d.scores || []).filter(Boolean), top = sc.length ? Math.max(...sc.map(x => x.s - x.nz)) : 0, mine = d.scores?.[pick];
    if (mine) p -= Math.max(0, top - (mine.s - mine.nz)) * b.gap;
    const rk = b.risk[opts[pick]?.risk] || 0; p -= rk * (1 - Math.max(0, r.trust) / 100);
    return clamp(p, b.min, b.max);
  }
  /* 성좌가 pick 을 골랐다 → 헌터 판단 → run(i) 로 결과 적용. 돌려줌: {result, followed, agree, reaction}
     pick 이 null 이면 '말 걸지 않음' — 헌터 혼자 정하고 신뢰는 그대로 */
  function advise(opts, pick, ctx, run) {
    const d = MIND.decide(opts, ctx), own = ctx.own != null ? ctx.own : d.i, r = rel();
    if (pick == null) { const result = run(own, 'auto'); return { result, followed: false, agree: false, reaction: line('silent') }; }
    r.asked++;
    const agree = pick === own, followed = agree || api.roll() < chance(opts, pick, d), i = followed ? pick : own;
    const reaction = line(agree ? 'agree' : followed ? 'follow' : 'refuse', { pick: opts[pick]?.t, own: opts[own]?.t });
    if (followed) r.followed++; else r.refused++;
    const result = run(i, 'star', reaction);
    const ok = result?.judgement ? !!result.judgement.ok : result?.ok ?? true, b = B();
    r.trust = clamp(r.trust + (agree ? (ok ? b.agreeOk : 0) : followed ? (ok ? b.followOk : b.followNg) : (ok ? b.refuseOk : b.refuseNg)), -100, 100);
    checkStage();
    return { result, followed, agree, reaction };
  }
  function checkStage() {
    const r = rel(), s = stageOf(r.trust); if (!s || s.id === r.stage) return;
    const first = r.stage == null; r.stage = s.id;
    if (!first && s.story) STORY.add('emo', STORY.josa(s.story.replace(/\{name\}/g, MIND.callName())), 2);
  }
  function onGift() { const r = rel(); r.favor = clamp(r.favor + B().giftFavor, 0, 100); }
  function daily() { const r = rel(); r.favor = Math.max(0, r.favor - B().favorDecay); if (G.starKnown && r.stage == null) checkStage(); }
  const stageText = () => canAsk() ? (stageOf(rel().trust)?.text || '') : '';
  const api = { canAsk, advise, chance, line, onGift, daily, stageText, rel, stageOf, roll: () => Math.random() };  /* roll: 따를지 굴림 (테스트에서 바꿀 수 있다) */
  return api;
})();
