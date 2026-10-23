/* =========================================================
   engine/sim.js — 세계 시뮬레이션 엔진: NPC 자율 행동 (설정집 0장 3·4번, 8장)
   · 플레이어와 NPC는 같은 행동 데이터(actions.js)와 같은 비용 규칙(SIM.cost)을 쓴다.
   · NPC는 하루를 블록으로 나눠 블록마다 효용이 가장 높은 행동을 고른다 (data/npc_ai.js).
   · 처리 계층 (설정집 8.3)
       상세  : 이름 있는 인물 (고정 헌터 · 일반인 · 생성 · 승격 인물). 객체 하나씩, 결정 이유까지 기록
       집계  : 배경 인구 (수만 명). 열(typed array) 단위로 저장하고 같은 효용 규칙으로 하루씩 처리
     플레이어가 관심을 가지면(정보창 · 파티 · 영입) 집계 인물을 같은 시드로 상세 인물로 '승격'한다.
   · 게이트: 지켜보는 게이트(목록에 있는 게이트)는 NPC 파티가 실제로 맡아 공략한다 (G.simQ 에 예약 → 시각이 되면 반영).
     그 밖의 게이트는 '다른 곳 게이트'로 보고 결과만 계산한다.
   index.html 의 세계 함수(gateSt · newsAdd · rankNeed · expNeed · roleScore …)를 쓴다. 화면 코드는 쓰지 않는다.
   ========================================================= */
/* SIM_FACTORY 로 감싼 이유: 배경 인구 하루 계산을 Web Worker 에서 같은 코드로 돌리기 위해 (함수 소스를 그대로 워커로 보낸다) */
function SIM_FACTORY() {
  const BA = () => DB.balance.BAL_AI, BP = () => DB.balance.BAL_POP;
  const cl = (v, a, b) => v < a ? a : v > b ? b : v;
  const pad = (n, k) => String(n).padStart(k, '0');
  /* 세계에서 일어난 일 (이름 있는 인물). index.html 의 processHappen 이 이벤트(events.js 의 on 필드)로 바꾼다 */
  const happen = (k, who, data) => { (G.happen = G.happen || []).push({ k, who, t: nowAbs(), data: data || {} }); };

  /* ---------- 공통 규칙 (플레이어 · NPC) ---------- */
  function cost(a, dur, jobPay) {
    const h = dur / 60, T = DB.balance.BAL_TIME, pay = a.payJob ? (jobPay || 0) : (a.pay || 0);
    return { energy: Math.round(a.sleep ? T.sleepGain * h : (a.energy || 0) * h), pay: Math.round(pay * h), stress: Math.round((a.stress || 0) * h) };
  }
  /* 훈련 수확 체감: 오늘 · 7일 같은 그룹 훈련 분, 잠재 상한 근접도(0~1) */
  function trainFactor(today, week, capRatio) {
    const T = DB.balance.BAL_TRAIN;
    const fd = today <= T.dayFree ? 1 : Math.max(T.dayMin, 1 - (today - T.dayFree) / T.dayFade);
    const fw = week <= T.weekFree ? 1 : Math.max(T.weekMin, 1 - (week - T.weekFree) / T.weekFade);
    const fc = capRatio < T.capSlow ? 1 : Math.max(0, (1 - capRatio) / (1 - T.capSlow));
    return { fd, fw, fc, eff: fd * fw * fc };
  }
  let MC = 0; const monthlyCost = () => MC || (MC = DB.balance.BAL_LIFE.fixed.reduce((a, x) => a + x[1], 0) + BA().foodPerDay * 30);
  /* NPC 하루 고정 지출(식비 제외): 각성자 = 생활비 전부, 일반인 = 헌터 보험 빼고, 학생 · 무직 = 그중 dependentRate (가족과 사는 몫) — 경제 기준 2026-10-23 */
  const dayFixed = (awake, dep) => { const B = BA(), L = DB.balance.BAL_LIFE.fixed, all = L.reduce((a, x) => a + x[1], 0), civ = all - L.filter(x => /헌터/.test(x[0])).reduce((a, x) => a + x[1], 0); return (awake ? all : civ * (dep ? (B.dependentRate ?? 1) : 1)) / 30; };
  const weekday = day => ((day % 7) + 7) % 7 < 5;

  /* ---------- 성격 · 목표 ---------- */
  let PXI = null, GOALS = null, NEEDS = null, ACTS = null;
  function compile(rows) {
    PXI = vals('ccPersonality').map(p => p.id);
    NEEDS = vals('aiNeeds').map(n => n.id);
    GOALS = vals('aiGoals');
    const ni = id => NEEDS.indexOf(id), gi = id => GOALS.findIndex(g => g.id === id), pi = id => PXI.indexOf(id);
    ACTS = (rows || vals('actions').filter(a => !a.routineOnly)).filter(a => a.ai).map(a => {
      const ai = a.ai, sf = (a.req || []).find(q => q.k === 'startBetween');
      const flat = (o, f) => { const e = Object.entries(o || {}).map(([k, w]) => [f(k), w]).filter(x => x[0] >= 0); return [Int32Array.from(e.map(x => x[0])), Float64Array.from(e.map(x => x[1]))]; };
      const [nI, nW] = flat(ai.need, ni), [gI, gW] = flat(ai.goal, gi), [pI, pW] = flat(ai.px, pi);
      return { a, ai, fAwake: !!ai.awake, fJob: !!ai.job, fNojob: !!ai.nojob, fWd: !!ai.weekdays, fGuild: !!ai.guild, fInj: !!ai.injured, fRaid: !!ai.raid, rankMin: ai.rankMin || 0, fCiv: !!ai.civ, fUnemp: !!ai.unemployed, fStudent: !!ai.student, hunt: a.id === 'ACT_JOBHUNT', train: a.train || null, social: a.cat === 'ACC_SOCIAL', heal: !!a.heal, base: ai.base || 0, nI, nW, gI, gW, pI, pW, from: sf ? sf.from : 0, to: sf ? sf.to : 1440, drains: (a.energy || 0) < 0 };
    });
    ST = new Float64Array(ACTS.length); EL = new Int32Array(ACTS.length); REP = new Uint32Array(ACTS.length);
  }
  const c5 = v => (v - 5.5) / 4.5; /* 성격 1~10 → −1~+1 */
  /* 빠른 난수 (집계 인구용: 문자열 시드 없이 정수 상태) */
  let rs = 1; const fr = () => { rs |= 0; rs = rs + 0x6D2B79F5 | 0; let t = Math.imul(rs ^ rs >>> 15, 1 | rs); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const fseed = (a, b, c) => { rs = Math.imul(a ^ Math.imul(b + 1, 0x9E3779B1) ^ Math.imul(c + 7, 0x85EBCA6B), 0x27D4EB2D) | 0; };
  function pxFromSeed(seed) { const r = rng(seed + '|px'), o = new Int8Array(8); for (let k = 0; k < 8; k++) o[k] = cl(Math.round(5.5 + gauss(r) * 2), 1, 10); return o; }
  function goalsFor(seed, px, awake, epoch) {
    const r = rng(seed + '|goal|' + epoch), sc = GOALS.map((g, i) => {
      if (g.awake && !awake) return [i, -99];
      let s = gauss(r) * 0.6; for (const k in g.px) { const j = PXI.indexOf(k); if (j >= 0) s += g.px[k] * c5(px[j]); }
      return [i, s];
    }).sort((a, b) => b[1] - a[1]);
    return [sc[0][0], sc[1][0]];
  }

  /* ---------- 효용 · 행동 선택 (상세 · 집계 공용) ----------
     ag: {e, s, money, soc, inj, cd, awake, jobPay, hasJob, guild, px(Int8Array 8), g1, g2, last(블록별 어제 행동 index), pp, accept, risk} */
  const urg = new Float64Array(8);
  function needsOf(ag) {
    const B = BA(), mc = monthlyCost();
    urg[0] = cl((100 - ag.e) / 100, 0, 1);
    urg[1] = cl(ag.s / 100, 0, 1);
    urg[2] = cl(1 - ag.money / (mc * B.moneyMonths), 0, 1);
    urg[3] = cl(ag.soc / B.socialDays, 0, 1);
    urg[4] = ag.inj > 0 ? 1 : 0;
    return urg;
  }
  /* 한 블록의 행동을 고른다. why 배열을 주면 상위 후보와 점수를 남긴다 (개발자 보기 · 결정 이유) */
  let CB = -1, CS = -1;
  /* 하루 동안 바뀌지 않는 부분(가능 여부 · base · 목표 · 성격)은 사람마다 하루 한 번만 계산한다 */
  let ST = new Float64Array(0), EL = new Int32Array(0), REP = new Uint32Array(0); let ELN = 0;
  function prepare(ag, day) { REP.fill(0);
    const B = BA(), wd = weekday(day), px = ag.px, po = ag.po | 0, gs = B.goalSecond; ELN = 0;
    for (let k = 0; k < ACTS.length; k++) {
      const A = ACTS[k];
      if (A.fAwake && !ag.awake) continue; if (A.fJob && !ag.hasJob) continue; if (A.fNojob && ag.hasJob) continue;
      if (A.fWd && !wd) continue; if (A.fGuild && !ag.guild) continue; if (A.rankMin && ag.awake && ag.lv < A.rankMin) continue;
      if (A.fCiv && ag.awake) continue; if (A.fUnemp && (ag.hasJob || ag.student)) continue; if (A.fStudent && !ag.student) continue;
      let u = A.base; const gI = A.gI, pI = A.pI;
      for (let j = 0; j < gI.length; j++) { const i = gI[j]; if (i === ag.g1) u += A.gW[j]; else if (i === ag.g2) u += A.gW[j] * gs; }
      for (let j = 0; j < pI.length; j++) u += A.pW[j] * c5(px[po + pI[j]]);
      if (A.fRaid) u -= (1 - ag.pEst) * ag.risk;
      ST[k] = u; EL[ELN++] = k;
    }
  }
  function choose(ag, blk, bi, day, r, why, todayActs, check) {
    const B = BA(), U = needsOf(ag), px = ag.px, po = ag.po | 0; let best = -1, bu = -1e9, second = -1, su = -1e9; const list = why ? [] : null;
    const temp = B.temp * (1 + 0.3 * c5(px[po + 5])) * 3.46, inj = ag.inj > 0, low = ag.e < B.energyFloor ? B.energyPen * (B.energyFloor - ag.e) / B.energyFloor : 0, rp = B.repeatPen, t0 = blk[0];
    for (let q = 0; q < ELN; q++) {
      const k = EL[q], A = ACTS[k];
      if (A.fInj && !inj) continue; if (t0 < A.from || t0 > A.to) continue; if (A.fRaid && inj) continue;
      const checked = check ? check(A.a, t0, Math.min(blk[1]-t0, Math.max(...A.a.durs)), ag) : null;
      if (checked === false || checked?.ok === false) continue;
      let u = ST[k] + (checked?.bonus || 0); const nI = A.nI;
      for (let j = 0; j < nI.length; j++) u += A.nW[j] * U[nI[j]];
      if (!A.ai.repeatOk) u -= REP[k] * rp;   /* 직장 근무처럼 하루에 여러 칸 하는 게 정상인 행동은 반복 감점 없음 */
      if (A.drains) u -= low;
      if (A.fRaid && ag.cd < B.raidCooldown) u -= 0.6;
      if (ag.last && ag.last[bi] === k) u += B.habit;
      u += temp * (r() - 0.5);
      if (list) list.push([A.a.id, Math.round(u * 100) / 100]);
      if (u > bu) { second = best; su = bu; best = k; bu = u; } else if (u > su) { second = k; su = u; }
    }
    if (list) why.push(list.sort((x, y) => y[1] - x[1]).slice(0, 3));
    if (best >= 0) REP[best]++; CB = best; CS = second; return best;
  }
  /* 행동 효과를 상태에 적용 (기력 · 스트레스 · 돈 · 훈련 · 사람 · 치료). 훈련 진척은 onTrain(그룹, 진척) 으로 넘긴다 */
  function apply(ag, A, min, onTrain) {
    const a = A.a, h = min / 60, pay = a.payJob ? ag.jobPay : (a.pay || 0);
    ag.e = cl(ag.e + Math.round((a.energy || 0) * h), 0, 100); ag.s = cl(ag.s + Math.round((a.stress || 0) * h), 0, 100); ag.money += Math.round(pay * h);
    if (A.train && onTrain) { const per = min / A.train.length, gain = per / 60 * DB.balance.BAL_TRAIN.gainPerHour * (ag.e < 10 ? 0.5 : 1); for (let j = 0; j < A.train.length; j++) onTrain(A.train[j], per, gain); }
    if (A.social) ag.soc = 0; if (A.hunt) ag.hunt++;
    if (A.heal && ag.inj > 0) ag.inj = Math.max(0, ag.inj - 1);
  }
  function sleepNight(ag) { const T = DB.balance.BAL_TIME, h = 8; ag.e = cl(ag.e + T.sleepGain * h, 0, 100); ag.s = cl(ag.s - h, 0, 100); }

  /* ---------- 경력 (비각성자 생활 루프) ----------
     상세 일반인: G.ai[id].career = {job, lvl, mon(지금 직급 개월), tot(총 개월), mul(자영업 장사 운), unemp}
     집계 인구: 열 job(직업 index+1, 0 = 무직) · clv(직급) · cmon(지금 직급 개월) · hunt(구직 횟수) */
  const JOBS = () => vals('aiJobs'), CB2 = () => DB.balance.BAL_CAREER;
  function careerOf(p) {
    const st = aiOf(p); if (st.career) return st.career;
    let job = p.jobId || JOBS().find(j => (j.names || [j.name]).includes(p.job))?.id || null;
    const r = rng(p.id + '|career'), J = DB.aiJobs[job];
    return st.career = { job, work: workRegionFor(p, r), lvl: J?.ladder ? Math.min(J.ladder.length - 1, Math.floor(r() * Math.min(J.ladder.length, Math.max(1, ((p.age || 25) - 24) / 5)))) : 0, mon: Math.floor(r() * 12), tot: J?.student ? Math.floor(r() * 36) : Math.floor(r() * 60), mul: 1, unemp: !job };
  }
  /* 일터 지역: 사는 지역(BAL_MOVE.workSame 확률) 또는 출퇴근 거리(workMaxKm) 안의 다른 지역 */
  function workRegionFor(p, r) { const M = DB.balance.BAL_MOVE, home = p.region || 'RG_SEOUL_MAPO'; if (r() < M.workSame) return home;
    const L = vals('regions').filter(x => x.id !== home && typeof kmBetween === 'function' && kmBetween(home, x.id) <= M.workMaxKm); return L.length ? L[Math.floor(r() * L.length)].id : home; }
  /* 출퇴근 (편도 분 · 요금). 상세 일반인의 하루 계획에서 기력 · 돈에 반영, 화면에서는 위치 · 바쁨 */
  function commuteOf(p) { const cr = isHunter(p) ? null : careerOf(p); if (!cr || cr.unemp || !cr.job || DB.aiJobs[cr.job]?.student) return null;
    const w = cr.work || (cr.work = workRegionFor(p, rng(p.id + '|work'))), tc = typeof travelCost === 'function' ? travelCost({ region: p.region, pt: 'PT_HOME' }, { region: w, pt: 'PT_WORK' }) : { min: 0, fare: 0 }; return { region: w, min: tc.min, fare: tc.fare }; }
  function payOf(cr) { const J = DB.aiJobs[cr.job]; if (!J || cr.unemp) return 0; return Math.round(J.pay * (1 + CB2().payStep * (cr.lvl || 0)) * (cr.mul || 1)); }
  const rankName = cr => { const J = DB.aiJobs[cr.job]; return cr.unemp || !J ? '무직' : J.student ? `${J.name} ${Math.floor((cr.tot || 0) / 12) + 1}학년` : J.ladder ? `${J.name} · ${J.ladder[cr.lvl] || ''}` : J.name; };
  function jobTitle(p) { if (isHunter(p)) return null; if (SIM.isPop(p.id) && !G.ai?.[p.id]) return p.job || '—'; return rankName(careerOf(p)); }
  function perfOf(abl, J) { if (!J?.keys) return 8; let s = 0; for (const k of J.keys) s += abl[k] || 8; return s / J.keys.length; }
  function pickJob(perf, r) { const L = JOBS().filter(j => !j.student); let t = 0; const w = L.map(j => { const x = j.w * (j.pay >= 16000 ? perf / 10 : 1); t += x; return x; }); let y = r() * t; for (let k = 0; k < L.length; k++) { y -= w[k]; if (y <= 0) return L[k]; } return L[0]; }
  /* 한 달 심사: 졸업 · 승진 · 해고 · 취업 · 장사 운. 결과 사건 이름을 돌려준다 */
  function review(cr, perf, hunt, r) {
    const C = CB2(), J = DB.aiJobs[cr.job]; cr.mon = (cr.mon || 0) + 1; cr.tot = (cr.tot || 0) + 1;
    if (cr.unemp) { if (r() < C.hireBase * (perf / C.perfRef) + Math.min(hunt, C.huntCap) * C.huntBonus) { const nj = pickJob(perf, r); Object.assign(cr, { job: nj.id, lvl: 0, mon: 0, tot: 0, unemp: false, mul: 1 }); return 'hired'; } return null; }
    if (J?.student) { if (cr.tot >= (J.years || 4) * 12) { const nj = pickJob(perf, r); Object.assign(cr, { job: nj.id, lvl: 0, mon: 0, tot: 0, mul: 1 }); return 'grad'; } return null; }
    if (J?.self) { const v = C.selfVar, m = 1 + (r() * 2 - 1) * v + (perf - C.perfRef) / 40; cr.mul = cl(m, 0.3, 2); return cr.mul > 1.2 ? 'boom' : cr.mul < 0.8 ? 'slump' : null; }
    if (r() < C.fireBase * (perf < C.firePerf ? C.fireLow : 1)) { cr.unemp = true; cr.mon = 0; return 'fired'; }
    if (J?.ladder && cr.lvl < J.ladder.length - 1 && cr.mon >= C.promoteMonths && r() < C.promoteBase * Math.pow(perf / C.perfRef, 2)) { cr.lvl++; cr.mon = 0; return 'promo'; }
    return null;
  }
  function reviewDetailed(p, st, d) {
    const cr = careerOf(p), J0 = DB.aiJobs[cr.job], ev = review(cr, perfOf(progOf(p).abl, J0), st.hunt || 0, rng(p.id + '|rev|' + d)); if (ev === 'hired' || ev === 'grad') { st.hunt = 0; cr.work = workRegionFor(p, rng(p.id + '|work|' + d)); }
    if (!ev) return; (st.careerLog = st.careerLog || []).unshift([d, ev, rankName(cr)]); st.careerLog.length = Math.min(st.careerLog.length, 20); W.career[ev] = (W.career[ev] || 0) + 1;
    const J = DB.aiJobs[cr.job]; happen('career:' + ev, p.id, { job: J?.name || '', rank: J?.ladder?.[cr.lvl] || '', title: rankName(cr) });
  }

  /* 이름 있는 일반인의 각성 (가족 · 친구가 각성할 수 있다). 같은 ID로 헌터가 된다 (G.genHunters) — 관계 · 기억 · 경력 기록은 그대로 */
  function awaken(p) {
    const r = rng(p.id + '|awaken'), roles = vals('roles'), role = roles[Math.floor(r() * roles.length)].id, cls = vals('classes').filter(c => c.role === role), c = cls.length ? cls[Math.floor(r() * cls.length)] : vals('classes')[0];
    const st = civProg(p), abl = { ...st.abl }; vals('abilities').filter(a => ablSetsOf({ awake: true }).includes(a.set) && abl[a.id] == null).forEach(a => abl[a.id] = cl(Math.round(5 + gauss(r) * 1.5), 1, 20));
    for (const k of Object.keys(abl)) if (!ablSetsOf({ awake: true }).includes(DB.abilities[k]?.set)) delete abl[k];
    const stats = {}; vals('baseStats').forEach(b => stats[b.id] = 8 + Math.floor(r() * 6)); const dt = dateOf(G.day);
    const o = { ...p, awake: true, rank: 'RANK_20', level: 1, exp: 0, roleMain: role, roleSub: null, guild: null, cls: c.id, traits: [], skills: (c.pool || []).slice(0, c.pick || 2).map(s => [s, 1]),
      contract: { share: 0, until: '—', bonus: '—' }, style: '', media: '무난함', status: '정상', morale: '보통', fit: 90, prefs: [], form: [], career: [], byRank: {}, stats, abl,
      pot: { level: 20 + Math.floor(r() * 50), cap: Math.round(Object.values(abl).reduce((a, b) => a + b, 0) * (1.2 + r() * 0.5)) }, awakened: `2026-${pad(dt.m, 2)}`, wasCivilian: p.job || true };
    (G.genHunters = G.genHunters || {})[p.id] = o; delete pxCache[p.id]; pxCache[p.id] = pxFromSeed(p.id);
    W.awaken++; happen('npcAwaken', p.id, { cls: c.name, role: DB.roles[role].name }); return o;
  }

  /* ---------- 공략 (NPC 파티) ---------- */
  const gpOf = lv => { const P = DB.balance.BAL_GATE.power; return P.gateBase + (21 - lv) * P.perRank; };
  function pWin(pp, lv) { const Q = BA().quick, P = DB.balance.BAL_GATE.power, r = cl(pp / gpOf(lv), P.rClamp[0], P.rClamp[1]); return cl((r - Q.r0) / Q.span, 0, Q.max); }
  /* 이 전력으로 성공률 acc 이상 기대할 수 있는 가장 높은 게이트 등급 숫자 */
  function bestLv(pp, acc) { const Q = BA().quick, P = DB.balance.BAL_GATE.power, rn = Q.r0 + acc * Q.span, lv = Math.ceil(21 - (pp / rn - P.gateBase) / P.perRank); return lv < 1 ? 1 : lv > 20 ? 20 : lv; }
  /* NPC 공략 수입: 플레이어와 같은 경제 기준 (BAL_ECON) — 게이트 총수익 ÷ 기준 파티 인원 × (실패면 failRate). 마정석 몫만 */
  const raidPay = (lv, ok) => { const E = DB.balance.BAL_ECON; if (E) return Math.round(E.gateBase * Math.pow(E.perRank, 20 - lv) / E.partyRef * (1 - E.matShare) * (ok ? 1 : E.failRate * 0.5)); const R = BA().raidPay; return Math.round(R.base * Math.pow(R.mul, 20 - lv) * (ok ? 1 : R.failPay)); };
  const raidExp = (lv, floors, ok) => Math.round(DB.balance.BAL_GATE.expBase * Math.pow(21 - lv, 2) * (floors / 5) * (ok ? 1 : 0.4));

  /* ---------- 상세 인물 ---------- */
  function detailedList() {
    const out = [];
    for (const h of vals('hunters')) if (h.id !== G.player.id && !aiOf(h, true).dead) out.push(h);
    for (const h of Object.values(G.genHunters || {})) if (h.id !== G.player.id && !aiOf(h, true).dead) out.push(h);
    for (const n of [...vals('npcs'), ...Object.values(G.genNpcs || {})]) if (!aiOf(n, true).dead && !G.genHunters?.[n.id]) out.push(n);
    return out;
  }
  const isHunter = p => p.awake !== false && (p.rank != null);
  /* 성장 정보가 있는 객체: 고정 헌터는 G.hState(원본 데이터 보존), 나머지는 객체 자신 */
  const progOf = h => DB.hunters[h.id] && typeof hsOf === 'function' ? hsOf(h) : isHunter(h) ? h : civProg(h);
  /* 일반인의 세부 능력(B · C): 데이터에 없으면 시드로 만들어 G.ai 에 둔다 (설정집 4장: 비각성자 B40 + C20) */
  function civProg(p) { const st = aiOf(p); if (!st.abl) { const C = DB.balance.BAL_CAREER.civAbl, r = rng(p.id + '|civabl'); st.abl = {}; vals('abilities').filter(a => ablSetsOf({ awake: false }).includes(a.set)).forEach(a => st.abl[a.id] = cl(Math.round(C.mean + gauss(r) * C.sd), 1, 20)); } return st; }
  function aiOf(p, peek) {
    G.ai = G.ai || {};
    let a = G.ai[p.id]; if (a) return a; if (peek) return { dead: false };
    const awake = isHunter(p), lv = p.level || 1;
    a = G.ai[p.id] = { e: 80, s: 30, money: awake ? 1000000 + lv * lv * 25000 : 3000000, soc: 1, inj: 0, cd: 9, last: null, today: [], why: [], gEpoch: -1, goals: [0, 1], goalLog: [], tr: {}, prog: {}, raids: 0, dead: false };
    return a;
  }
  const pxCache = {};
  function pxOf(p) { if (p.id === G.player.id) return Int8Array.from(PXI.map(k => G.bio?.pers?.[k] ?? 5)); return pxCache[p.id] || (pxCache[p.id] = pxFromSeed(p.id)); }
  function ppOf(h) { const P = DB.balance.BAL_GATE.power, s = progOf(h); return roleScore({ ...h, abl: s.abl || h.abl, stats: s.stats || h.stats }, h.roleMain) + (s.level || 1) * P.perLevel; }
  function riskOf(px, o) { o = o | 0; const R = BA().risk; return R.base + R.adven * c5(px[o + 5]) + R.pessi * c5(px[o + 3]); }
  function acceptOf(px, o) { o = o | 0; const R = BA().accept; return cl(R.base + R.adven * c5(px[o + 5]) + R.pessi * c5(px[o + 3]), 0.2, 0.95); }
  function npcJobPay(p) { if (p.job == null) return 0; const j = DB.aiJobs?.[p.jobId]; return j ? j.pay : 15000; }

  /* NPC 성장: 경험치 → 레벨 (벽은 낮은 확률로 넘음) · 스탯 자동 분배 · 등급 자동 갱신 */
  function npcExp(h, n, news) {
    const s = progOf(h), GB = DB.balance.BAL_GROWTH; s.level = s.level || h.level; s.exp = (s.exp || 0) + n; s.stats = s.stats || clone(h.stats); s.abl = s.abl || clone(h.abl);
    let ups = 0;
    while (s.exp >= expNeed(s.level) && s.level < (h.pot?.level || GB.levelMax)) {
      if (s.level % GB.wallEvery === 0 && !(s.walls || []).includes(s.level)) { if (Math.random() < GB.wallGate) { (s.walls = s.walls || []).push(s.level); } else { s.exp = expNeed(s.level); break; } }
      s.exp -= expNeed(s.level); s.level++; ups++;
      for (let i = 0; i < GB.statPerLevel; i++) { const k = wpick(vals('baseStats').map(x => ({ id: x.id, w: s.stats[x.id] }))).id; s.stats[k]++; }
    }
    const cur = DB.ranks[s.rank || h.rank].lv, q = rankQualify({ ...h, stats: s.stats, abl: s.abl });
    if (q.lv < cur) { s.rank = 'RANK_' + pad(q.lv, 2); happen('npcRankUp', h.id, { rank: DB.ranks[s.rank].name }); if (q.lv <= DB.balance.BAL_RANKUP.newsAt && news) newsAdd('헌터', '', `${h.name}(${guildName(h.guild)}) ${DB.ranks[s.rank].name}급으로 등급 상승`); }
    if (!DB.hunters[h.id]) { h.level = s.level; if (s.rank) h.rank = s.rank; }
    return ups;
  }
  function npcTrain(h, g, min, gain) {
    const a = aiOf(h), s = progOf(h), GB = DB.balance.BAL_GROWTH; s.abl = s.abl || clone(h.abl || {});
    const t = a.tr[g] || (a.tr[g] = { d: -1, today: 0, week: 0 }); if (t.d !== G.lastDay) { t.week = t.week * 6 / 7 + t.today; t.today = 0; t.d = G.lastDay; }
    const sum = Object.values(s.abl).reduce((x, y) => x + y, 0), cap = h.pot?.cap || 1e9, f = trainFactor(t.today, t.week, sum / cap);
    t.today += min; a.prog[g] = (a.prog[g] || 0) + gain * f.eff;
    while (a.prog[g] >= 100) { a.prog[g] -= 100; const c = vals('abilities').filter(x => x.g === g && (s.abl[x.id] || 0) < GB.ablMax && (s.abl[x.id] != null)); if (!c.length || sum >= cap) { a.prog[g] = 0; break; } const x = c[Math.floor(Math.random() * c.length)]; s.abl[x.id]++; }
  }
  function npcInjure(p, ag, lvGap, death, label) {
    if (Math.random() < death) { npcDie(p, ag, label); return 'dead'; }
    const D = BA().injuryDays; ag.inj = Math.max(ag.inj, D[0] + Math.floor(Math.random() * (D[1] - D[0]))); ag.s = cl(ag.s + 10, 0, 100); return 'inj';
  }
  function npcDie(p, ag, why) {
    ag.dead = true; ag.deadAt = nowAbs(); ag.deadWhy = why;
    if (DB.hunters[p.id]) { hsOf(p).dead = true; DB.hunters[p.id].status = '사망'; }
    else p.status = '사망';
    if (p.guild && G.myGuild && p.guild === G.myGuild.id && typeof guildRepAdd === 'function') guildRepAdd(p.guild, -DB.balance.BAL_GUILD.repDeath, `${p.name} 사망`);
    if (p.guild && typeof setHunterGuild === 'function') setHunterGuild(p.id, null);
    newsAdd('사건', 'b', `${p.name} 헌터 사망 — ${why}`);
    happen('npcDied', p.id, { why }); const r = relOf(p.id); if (r) { G.cond.stress = cl(G.cond.stress + 8, 0, 100); }
    W.dead++;
  }

  /* ---------- 하루 처리 ---------- */
  let W = { day: -1, raids: 0, bgRaids: 0, tracked: 0, dead: 0, awaken: 0, lvups: 0, rankups: 0, acts: {} };
  function day(d) {
    if (!ACTS) compile();
    MC = 0; popActs = new Uint32Array(64); W = { day: d, raids: 0, bgRaids: 0, tracked: 0, dead: 0, awaken: 0, lvups: 0, rankups: 0, acts: {}, ms: 0, career: {} };
    const t0 = performance.now(), B = BA(), intents = [];
    /* 1) 상세 인물 */
    for (const p of detailedList()) planDetailed(p, d, intents);
    const t1 = performance.now();
    /* 2) 집계 인구: 백그라운드(워커)에서 미리 계산해 둔 결과가 있으면 쓰고, 없으면 여기서 계산 */
    if (POP) { if (!useCached(d, intents)) popPlan(d, intents); W.popVia = W.popVia || 'main'; }
    const t2 = performance.now();
    /* 3) 공략: 지켜보는 게이트 → NPC 파티 배정, 나머지는 다른 곳 게이트 */
    raids(d, intents); W.prof = [Math.round(t1 - t0), Math.round(t2 - t1), Math.round(performance.now() - t2)]; W.intents = intents.length;
    if (POP) popEnd(d);
    if (typeof syncNpcState === 'function') syncNpcState();
    G.simDay = d; prefetch(); W.ms = Math.round(performance.now() - t0); W.popActs = {}; ACTS.forEach((A, k) => { if (popActs[k]) W.popActs[A.a.id] = popActs[k]; }); G.simStat = W;
  }
  /* 계산용 임시 객체: 상세 · 집계 모두 같은 모양 (빠른 처리) */
  const mkAg = () => ({ e: 0, s: 0, money: 0, soc: 0, inj: 0, cd: 0, awake: false, hasJob: false, student: false, hunt: 0, jobPay: 0, guild: null, px: null, po: 0, g1: 0, g2: 1, last: null, pp: 0, pEst: 0, risk: 0, acc: 0, lv: 20 });
  const DSC = mkAg();
  function viewDetailed(p, st, d) {
    const ag = DSC, px = pxOf(p), awake = isHunter(p), s = progOf(p);
    ag.e = st.e; ag.s = st.s; ag.money = st.money; ag.soc = st.soc; ag.inj = st.inj; ag.cd = st.cd;
    const cr = awake ? null : careerOf(p); ag.awake = awake; ag.jobPay = st.jobPay = cr ? payOf(cr) : 0; ag.hasJob = ag.jobPay > 0; ag.student = !!(cr && DB.aiJobs[cr.job]?.student); ag.hunt = st.hunt || 0; ag.guild = p.guild || null; ag.px = px; ag.po = 0;
    ag.risk = riskOf(px); ag.acc = acceptOf(px); ag.last = st.last ? Int16Array.from(st.last.map(x => x ?? -1)) : null;
    if (awake) { ag.pp = ppOf(p); ag.lv = DB.ranks[s.rank || p.rank].lv; ag.pEst = pWin(ag.pp, Math.max(bestLv(ag.pp, ag.acc), ag.lv - 1)); } else { ag.pp = 0; ag.pEst = 0; ag.lv = 20; }
    const ep = Math.floor(d / BA().goalReviewDays); if (st.gEpoch !== ep) { const g = goalsFor(p.id, px, awake, ep); if (st.gEpoch >= 0 && g[0] !== st.goals[0]) st.goalLog.unshift([d, GOALS[st.goals[0]].id, GOALS[g[0]].id]); st.goals = g; st.gEpoch = ep; }
    ag.g1 = st.goals[0]; ag.g2 = st.goals[1];
    return ag;
  }
  function planDetailed(p, d, intents) {
    const st0 = aiOf(p); if (!isHunter(p) && (d + (hashStr(p.id) % 30)) % DB.balance.BAL_CAREER.reviewDays === 0) reviewDetailed(p, st0, d);
    if (!isHunter(p) && (p.age || 30) < BP().awakenAgeMax && Math.random() < BP().awakenDetailed) { p = awaken(p); st0.cd = 0; st0.inj = 0; }
    const B = BA(), st = st0, ag = viewDetailed(p, st, d);
    const r = rng(p.id + '|day|' + d), today = [], why = [], last = [];
    sleepNight(ag); prepare(ag, d);
    B.blocks.forEach((blk, bi) => {
      const min = blk[1] - blk[0];
      if (blk[2] === 'meal') { ag.money -= B.foodPerDay / 2; ag.e = cl(ag.e + 4, 0, 100); return; }
      const k = choose(ag, blk, bi, d, r, why, last), k2 = CS; if (k < 0) return; const A = ACTS[k]; last[bi] = k;
      if (A.fRaid) { intents.push({ p, st, d, bi, blk, alt: k2, pp: ag.pp, lv: ag.lv, acc: ag.acc, region: p.region, guild: p.guild, det: true }); today.push({ s: blk[0], e: blk[1], act: A.a.id }); return; }
      apply(ag, A, min, (g, m, gain) => npcTrain(p, g, m, gain)); today.push({ s: blk[0], e: blk[1], act: A.a.id });
      W.acts[A.a.id] = (W.acts[A.a.id] || 0) + 1;
    });
    ag.money -= dayFixed(ag.awake, ag.student || !ag.hasJob); ag.soc++; ag.cd++; if (ag.inj > 0) ag.inj--;
    if (today.some(t => t.act === 'ACT_WORK')) { const c = commuteOf(p); if (c && c.min) { ag.e = cl(ag.e + DB.balance.BAL_MOVE.energyPerHour * c.min * 2 / 60, 0, 100); ag.money -= c.fare * 2; st.commute = c; } }
    st.e = ag.e; st.s = ag.s; st.money = Math.round(ag.money); st.soc = ag.soc; st.inj = ag.inj; st.cd = ag.cd; st.hunt = ag.hunt;
    st.last = last; st.today = today; st.why = why; st.day = d;
  }

  function claimProb(g, st) {
    const C = BA().claim, W2 = DB.balance.BAL_WORLD, left = (st.breakAt - nowAbs()) / 60;
    const mg = G.player.guild, ours = (g.owner && g.owner === mg) || st.winner === 'ME' || (mg && st.winner === mg);
    if (st.delegate && mg) return DB.balance.BAL_GUILD.delegate + (left < C.urgentHours ? C.urgentBonus : 0);  /* 길드장이 길드원에게 맡긴 게이트 */
    if (ours) return left < 24 + W2.oursUrgentHours ? 0.9 : 0;
    if (g.bid && !st.winner && !g.owner) return 0;
    let p = g.owner ? C.owned : st.winner ? C.won : C.open; if (left < C.urgentHours) p += C.urgentBonus; return p;
  }
  function raids(d, intents) {
    const B = BA(), used = new Set(), reserved = new Set((G.simQ || []).map(q => q.gid));
    if (UI.raid && !UI.raid.done) reserved.add(UI.raid.gid);
    /* 지켜보는 게이트마다 오늘 누가 맡는지 */
    const gates = vals('gates').filter(g => gateSt(g.id).status === 'open' && !reserved.has(g.id) && gateSt(g.id).breakAt > d * 1440);
    for (const g of gates) {
      const st = gateSt(g.id), pc = claimProb(g, st); if (Math.random() >= pc) continue;
      const lv = DB.ranks[g.rank].lv, grp = st.delegate && G.player.guild ? G.player.guild : st.winner && st.winner !== 'ME' ? st.winner : g.owner;
      let cand = intents.filter(x => !used.has(x) && (grp ? x.guild === grp : (!x.guild || Math.random() < 0.3) && x.region === g.region) && pWin(x.pp, lv) >= x.acc * 0.9);
      if (!cand.length && !grp) cand = intents.filter(x => !used.has(x) && pWin(x.pp, lv) >= x.acc);
      /* 길드 게이트(맡김 · 소유 · 낙찰)는 공략하려던 사람이 없어도 길드원을 불러 모은다 (길드 업무) */
      if (!cand.length && grp) { const B2 = BA(); for (const m of detailedList()) { if (m.guild !== grp || !isHunter(m) || m.id === G.player.id) continue; const st2 = aiOf(m); if (st2.inj > 0 || st2.dead) continue;
        const bi = 1, pp = ppOf(m); cand.push({ p: m, st: st2, d, bi, blk: B2.blocks[bi], alt: -1, pp, lv: DB.ranks[progOf(m).rank || m.rank].lv, acc: 0.3, region: m.region, guild: m.guild, det: true, drafted: true }); } }
      if (!cand.length) continue;
      cand.sort((a, b) => (b.det - a.det) || (b.pp - a.pp));
      const n = Math.min(g.partyMax || 4, B.partySize[0] + Math.floor(Math.random() * (B.partySize[1] - B.partySize[0] + 1)));
      const party = cand.slice(0, n); party.forEach(x => used.add(x));
      const pp = party.reduce((a, x) => a + x.pp, 0) / party.length, p = pWin(pp, lv), ok = Math.random() < p, bi = party[0].bi, blk = B.blocks[bi];
      let t = d * 1440 + blk[0] + B.raidMinutes[0] + Math.round((B.raidMinutes[1] - B.raidMinutes[0]) * Math.min(1, (g.floors || 5) / 8));
      if (t >= st.breakAt - 30) t = Math.max(nowAbs() + 30, st.breakAt - 60); if (t >= st.breakAt) { party.forEach(x => used.delete(x)); continue; }
      const lead = party[0], by = grp ? guildName(grp) : `${nameAt(lead)} 외 ${party.length - 1}명 파티`;
      (G.simQ = G.simQ || []).push({ s: Math.max(nowAbs(), d * 1440 + blk[0]), t, gid: g.id, ok, by, n: party.length, p: Math.round(p * 100) });  /* s: 들어간 시각 (게이트 목록 '공략 중') */
      resolveParty(party, lv, g.floors || 5, ok, g.name); W.tracked++;
    }
    /* 나머지: 다른 곳 게이트 (지역 · 길드별로 파티를 묶는다) */
    const rest = intents.filter(x => !used.has(x)), groups = new Map();
    for (const x of rest) { const k = x.guild ? 'G' + x.guild : 'R' + x.region; let a = groups.get(k); if (!a) groups.set(k, a = []); a.push(x); }
    for (const a of groups.values()) {
      a.sort((x, y) => y.pp - x.pp);
      for (let i = 0; i < a.length;) {
        const n = B.partySize[0] + Math.floor(Math.random() * (B.partySize[1] - B.partySize[0] + 1)), party = a.slice(i, i + n); i += n;
        if (Math.random() >= B.bgGate) { party.forEach(fallback); continue; }
        const pp = party.reduce((s, x) => s + x.pp, 0) / party.length, acc = Math.max(...party.map(x => x.acc));
        const lv = Math.max(bestLv(pp, acc), Math.min(20, Math.round(party.reduce((s, x) => s + x.lv, 0) / party.length) + 1));
        const ok = Math.random() < pWin(pp, lv); resolveParty(party, lv, 3 + Math.floor(Math.random() * 5), ok, null); W.bgRaids++;
      }
    }
  }
  function fallback(x) {
    const A = ACTS[x.alt]; if (!A) return; const min = x.blk[1] - x.blk[0];
    if (x.det) { apply(x.st, A, min, (g, m, gain) => npcTrain(x.p, g, m, gain)); const td = x.st.today.find(t => t.s === x.blk[0]); if (td) td.act = A.a.id; }
    else popApply(x.i, A, min);
  }
  function resolveParty(party, lv, floors, ok, gname) {
    const Q = BA().quick, exp = raidExp(lv, floors, ok), pay = raidPay(lv, ok);
    W.raids++; let gDone = false;
    const det = party.filter(x => x.det && DB.hunters[x.p.id]); for (let i = 0; i < det.length; i++) for (let j = i + 1; j < det.length; j++) (G.npcBond = G.npcBond || []).push([det[i].p.id, det[j].p.id, ok]);
    for (const x of party) {
      const label = gname ? `${gname} 공략 중 전사` : `${DB.ranks['RANK_' + pad(lv, 2)].name}급 게이트 공략 중 전사`;
      const dth = ok ? Q.winDeath : Q.failDeath * (1 + Math.max(0, x.lv - lv) * 0), inj = ok ? Q.winInjury : Q.failInjury;
      if (x.det) {
        const ag = x.st, A = ACTS.find(a => a.fRaid); let mine = pay; ag.cd = 0; ag.raids++; apply(ag, A, x.blk[1] - x.blk[0]);
        const mg = G.myGuild, gm = mg && x.p.guild === mg.id ? (mg.mem = mg.mem || {})[x.p.id] : null;
        if (gm) { const GB = DB.balance.BAL_GUILD, cut = Math.round(pay * cl(GB.memberCut + (GB.shareRef - gm.share) / 100, 0.05, 0.6)); mg.funds += cut; mine -= cut; gm.raids++; if (!gDone) { gDone = true; if (ok) mg.raids++; if (typeof guildRaidRep === 'function') guildRaidRep(ok, lv); } }
        ag.money += mine;
        const td = ag.today.find(t => t.s === x.blk[0]); if (td) { td.gate = gname || `${DB.ranks['RANK_' + pad(lv, 2)].name}급 게이트`; td.ok = ok; }
        const died = Math.random() < dth; gstat(x.p.guild, ok, died, pay);
        if (died) { npcDie(x.p, ag, label); continue; }
        if (Math.random() < inj) { npcInjure(x.p, ag, 0, 0, label); happen('npcInjured', x.p.id, { gate: gname || `${DB.ranks['RANK_' + pad(lv, 2)].name}급 게이트` }); }
        else if (ok && lv <= (DB.ranks[progOf(x.p).rank || x.p.rank]?.lv ?? 20)) happen('npcRaidWin', x.p.id, { gate: gname || `${DB.ranks['RANK_' + pad(lv, 2)].name}급 게이트` });
        W.lvups += npcExp(x.p, exp, true);
      } else popRaid(x.i, lv, exp, pay, ok, inj, dth);
    }
  }
  /* G.simQ: 예약된 게이트 결과를 시각이 되면 반영 */
  function tick() {
    const q = G.simQ; if (!q || !q.length) return; const now = nowAbs();
    G.simQ = q.filter(e => {
      if (e.t > now) return true;
      const g = DB.gates[e.gid], st = g && gateSt(e.gid); if (!g || st.status !== 'open') return false;
      if (UI.raid && !UI.raid.done && UI.raid.gid === e.gid) return false;
      if (e.ok) { st.status = 'cleared'; st.by = e.by; st.clearedAt = e.t; newsAdd('게이트', '', `${e.by}, ${g.name} ${DB.ranks[g.rank].name}급 게이트 공략 성공`); }
      else newsAdd('게이트', 'w', `${e.by}, ${g.name} ${DB.ranks[g.rank].name}급 게이트 공략 실패 · 후퇴`);
      return false;
    });
  }

  /* ---------- 집계 인구 (columnar) ---------- */
  let POP = null, NAMES = null, owner = null, POPVER = 0;
  const COLS = [['flags', Uint8Array], ['age', Uint8Array], ['region', Uint8Array], ['level', Uint8Array], ['exp', Float32Array], ['rank', Uint8Array], ['abl', Float32Array], ['stat', Uint16Array],
    ['role', Uint8Array], ['guild', Int16Array], ['money', Int32Array], ['e', Uint8Array], ['s', Uint8Array], ['soc', Uint8Array], ['inj', Uint8Array], ['cd', Uint8Array], ['goal', Uint8Array], ['job', Uint8Array], ['raids', Uint16Array], ['pot', Uint8Array], ['clv', Uint8Array], ['cmon', Uint8Array], ['hunt', Uint8Array]];
  const F_ALIVE = 1, F_AWAKE = 2, F_PROMO = 4, F_FEMALE = 8, F_IDLE = 16;  /* F_IDLE: 각성했지만 전투 활동을 하지 않는 사람 (비전투 · 은퇴 · 지원직 · 등록만, 인구 0.3%) */
  function popAlloc(n) { const P = { n }; for (const [k, T] of COLS) P[k] = new T(n); P.px = new Int8Array(n * 8); P.tal = new Float32Array(n); P.last = new Uint8Array(n * 6).fill(255); return P; }
  function popMeta() { return G.pop; }
  function popGen(seed, n) {
    if (!ACTS) compile();
    /* 예전 저장(ver 1: 지역 9곳 시절)은 그때 지역 목록 · 가중치 그대로 다시 만든다 — 같은 시드면 같은 사람이 같은 곳에 */
    const old = G.pop && G.pop.seed === seed && G.pop.ver === 1 && G.pop.regions ? G.pop.regions.filter(id => DB.regions[id]) : null;
    /* ver 3 (K-Hunter-Life): 생활권(사는 시도 + 가까운 지역)만, 각성자는 실제 비율(0.5%, 상한을 넘으면 가중치) · 일반인은 주변 중심 표본 */
    const Z = !old && typeof SCALE !== 'undefined' && G.player && DB.balance.BAL_SCALE ? SCALE.zonePlan(G.player.region) : null; if (Z) n = Z.nA + Z.nC;
    const B = BP(), P = popAlloc(n), regs = old ? old.map(id => DB.regions[id]) : Z ? Z.regions.map(id => DB.regions[id]) : vals('regions'), gl = vals('guilds').filter(g => !g.mine), jobs = vals('aiJobs'), roles = vals('roles');
    G.pop = { seed, n, ver: old ? 1 : Z ? 3 : 2, regions: regs.map(r => r.id), guilds: gl.map(g => g.id), roles: roles.map(r => r.id), jobs: jobs.map(j => j.id), born: 0, scale: Z ? { wA: Z.wA, wC: Z.wC, awake: Z.awake, active: Z.active, pop: Z.pop, nA: Z.nA, nC: Z.nC } : null };
    /* ver 2 (지역 230곳): 내 사는 곳 가까이에 사람이 더 많게 (BAL_WORLD.nearMul · nearKm, 게이트 출현과 같은 가중) — 주변 인물이 묽어지지 않게 */
    const W = (!old && DB.balance.BAL_WORLD) || {}, hg = typeof G !== 'undefined' && DB.regions[G.player?.region]?.geo, near = r => !hg || !W.nearMul || !r.geo ? 1 : 1 + W.nearMul * Math.exp(-Math.hypot((r.geo[0] - hg[0]) * 88, (r.geo[1] - hg[1]) * 111) / W.nearKm);
    const regW = regs.map(r => Z ? SCALE.regionPop(r.id) * near(r) : (1 + (r.gateDensity || 1)) * near(r)), regT = regW.reduce((a, b) => a + b, 0), jobT = jobs.reduce((a, j) => a + j.w, 0);
    const regA = Z ? regs.map(r => SCALE.regionPop(r.id)) : regW, regAT = regA.reduce((a, b) => a + b, 0);
    for (let i = 0; i < n; i++) {
      const r = rng(seed + '|' + i); let f = F_ALIVE; if (r() < 0.5) f |= F_FEMALE; const ra = r(), awake = Z ? i < Z.nA : ra < B.awakeRatio; if (awake) f |= F_AWAKE;
      if (Z && awake && r() >= Z.activeShare) f |= F_IDLE;
      P.flags[i] = f; P.age[i] = B.ageRange[0] + Math.floor(r() * (B.ageRange[1] - B.ageRange[0]));
      const RW = awake && Z ? regA : regW; let x = r() * (awake && Z ? regAT : regT), ri = 0; while (ri < RW.length - 1 && x > RW[ri]) { x -= RW[ri]; ri++; } P.region[i] = ri;
      const px = pxFromSeed(seed + '|' + i); P.px.set(px, i * 8); P.tal[i] = (rng(seed + '|' + i + '|tal')() - 0.5) * 2;
      if (awake) {
        const lv = cl(1 + Math.floor(-Math.log(1 - r() * 0.999) * B.levelDist.mean), 1, B.levelDist.max); P.level[i] = lv;
        P.abl[i] = cl(B.ablAtLevel.base + B.ablAtLevel.perLevel * lv + gauss(r) * B.ablAtLevel.sd, 1, 20);
        P.stat[i] = Math.max(20, Math.round(B.statAtLevel.base + B.statAtLevel.perLevel * (lv - 1) + gauss(r) * B.statAtLevel.sd));
        P.rank[i] = popRankLv(P, i, 20); P.role[i] = Math.floor(r() * roles.length); P.pot[i] = Math.min(B.levelDist.max + 30, lv + 5 + Math.floor(r() * 40));
        const ok = gl.filter(g => DB.ranks[g.rank].lv <= P.rank[i]);
        if (ok.length && r() < B.guildRatio * (1 - (P.rank[i] - 1) / 40)) { const same = ok.filter(g => g.region === regs[ri].id), pool = same.length && r() < 0.7 ? same : ok; P.guild[i] = gl.indexOf(pool[Math.floor(r() * pool.length)]); } else P.guild[i] = -1;
        P.job[i] = 0;
      } else { P.level[i] = 0; P.rank[i] = 0; P.guild[i] = -1; let y = r() * jobT, j = 0; while (y > jobs[j].w) { y -= jobs[j].w; j++; } P.job[i] = j + 1;
        const C = DB.balance.BAL_CAREER.civAbl; P.abl[i] = cl(C.mean + gauss(r) * C.sd * 0.6, 1, 20); const J = jobs[j], age = P.age[i];
        if (J.student) { P.age[i] = 19 + Math.floor(r() * 5); P.cmon[i] = Math.floor(r() * 47); } else { P.clv[i] = J.ladder ? Math.min(J.ladder.length - 1, Math.floor(r() * Math.min(J.ladder.length, Math.max(1, (age - 24) / 5)))) : 0; P.cmon[i] = Math.floor(r() * 12); }
        if (!J.student && r() < 0.04) P.job[i] = 0; }
      const [m0, m1] = B.moneyStart; P.money[i] = Math.round(m0 * Math.pow(m1 / m0, r()) / 1000);
      P.e[i] = 80; P.s[i] = 20 + Math.floor(r() * 30); P.soc[i] = Math.floor(r() * 3); P.cd[i] = 9;
      const g = goalsFor(seed + '|' + i, px, awake, 0); P.goal[i] = g[0] | (g[1] << 4);
    }
    POP = P; NAMES = null; owner = G.created; POPVER++; return P;
  }
  function popRankLv(P, i, cur) { let best = cur; for (let r = cur - 1; r >= 1; r--) { const nd = rankNeed(r); if (P.stat[i] >= nd.st && P.abl[i] >= nd.abl) best = r; else break; } return best; }
  const popPP = i => POP.abl[i] + POP.tal[i] + POP.level[i] * DB.balance.BAL_GATE.power.perLevel;
  function derive(P, seed) { for (let i = 0; i < P.n; i++) { P.px.set(pxFromSeed(seed + '|' + i), i * 8); P.tal[i] = (rng(seed + '|' + i + '|tal')() - 0.5) * 2; } }
  const scratch = mkAg();
  const lastView = new Uint8Array(6);
  function popView(i) {
    const P = POP, ag = scratch, f = P.flags[i];
    ag.e = P.e[i]; ag.s = P.s[i]; ag.money = P.money[i] * 1000; ag.soc = P.soc[i]; ag.inj = P.inj[i]; ag.cd = P.cd[i];
    ag.awake = !!(f & F_AWAKE); const jb = P.job[i], jp = jb > 0 ? Math.round(JOBPAY[jb - 1] * (1 + PAYSTEP * P.clv[i])) : 0; ag.hasJob = jp > 0; ag.jobPay = jp; ag.student = jb > 0 && jb - 1 === STUD; ag.hunt = P.hunt[i];
    ag.guild = P.guild[i] >= 0 ? G.pop.guilds[P.guild[i]] : null; ag.px = P.px; ag.po = i * 8;
    ag.g1 = P.goal[i] & 15; ag.g2 = P.goal[i] >> 4; for (let b = 0; b < 6; b++) lastView[b] = P.last[i * 6 + b]; ag.last = lastView;
    if (ag.awake) { ag.pp = popPP(i); ag.lv = P.rank[i]; ag.risk = riskOf(P.px, ag.po); ag.acc = acceptOf(P.px, ag.po); ag.pEst = pWin(ag.pp, Math.max(bestLv(ag.pp, ag.acc), ag.lv - 1)); } else ag.pEst = 0;
    return ag;
  }
  function popStore(i, ag) { const P = POP; P.hunt[i] = Math.min(255, ag.hunt); P.e[i] = ag.e; P.s[i] = ag.s; P.money[i] = cl(Math.round(ag.money / 1000), -2e9, 2e9); P.soc[i] = Math.min(255, ag.soc); P.inj[i] = ag.inj; P.cd[i] = Math.min(255, ag.cd); }
  function popTrain(i, gain, eff) { /* 세부 능력 평균에 반영: 진척 100 = 능력 하나 +1 = 평균 +1/능력 수 */ const n = POP.flags[i] & F_AWAKE ? 70 : 60; POP.abl[i] = Math.min(20, POP.abl[i] + gain * eff / 100 / n); }
  function popApply(i, A, min) { POPVER++; const ag = popView(i); apply(ag, A, min, (g, m, gain) => popTrain(i, gain, trainFactor(m, 0, POP.abl[i] / 20).eff)); popStore(i, ag); }
  const tdy = new Uint8Array(6); let JOBPAY = [], REGID = [], PAYSTEP = 0.18, STUD = -1; let popActs = new Uint32Array(64);
  let SEEDI = 0, CUR = 0;
  const popTrainCb = (g, m, gain) => { const P = POP, i = CUR, t = trainFactor(m, 0, P.abl[i] / 20); P.abl[i] = Math.min(20, P.abl[i] + gain * t.eff / 100 / (P.flags[i] & F_AWAKE ? 70 : 60)); };
  function popPlan(d, intents) {
    SEEDI = hashStr(String(G.pop.seed)); JOBPAY = G.pop.jobs.map(j => DB.aiJobs[j]?.pay || 0); REGID = G.pop.regions; PAYSTEP = CB2().payStep; STUD = G.pop.jobs.findIndex(j => DB.aiJobs[j]?.student);
    const B = BA(), P = POP, n = P.n, blocks = B.blocks, dH = dayFixed(true, false), dW = dayFixed(false, false), dD = dayFixed(false, true), ep = Math.floor(d / B.goalReviewDays);
    for (let i = 0; i < n; i++) {
      const f = P.flags[i]; if (!(f & F_ALIVE) || (f & F_PROMO)) continue;
      if (!(f & F_AWAKE) && (i + d) % 30 === 0) popReview(i, d);
      const ag = popView(i); fseed(SEEDI, i, d);
      if (d % B.goalReviewDays === 0) { const g = goalsFor(G.pop.seed + '|' + i, ag.px, ag.awake, ep); P.goal[i] = g[0] | (g[1] << 4); ag.g1 = g[0]; ag.g2 = g[1]; }
      sleepNight(ag); tdy.fill(255); prepare(ag, d);
      for (let bi = 0; bi < blocks.length; bi++) {
        const blk = blocks[bi], min = blk[1] - blk[0];
        if (blk[2] === 'meal') { ag.money -= B.foodPerDay / 2; ag.e = cl(ag.e + 4, 0, 100); continue; }
        const k = choose(ag, blk, bi, d, fr, null, tdy), k2 = CS; if (k < 0) continue; P.last[i * 6 + bi] = k; tdy[bi] = k; popActs[k]++; const A = ACTS[k];
        if (A.ai.raid) { if (f & F_IDLE) continue; intents.push({ i, d, bi, blk, alt: k2, pp: ag.pp, lv: ag.lv, acc: ag.acc, region: REGID[P.region[i]], guild: ag.guild, det: false }); continue; }
        CUR = i; apply(ag, A, min, popTrainCb);
      }
      ag.money -= ag.awake ? dH : (ag.student || !ag.hasJob) ? dD : dW; ag.soc++; ag.cd++; if (ag.inj > 0) ag.inj--;
      popStore(i, ag);
    }
  }
  const crS = { job: null, lvl: 0, mon: 0, tot: 0, mul: 1, unemp: false };
  function popReview(i, d) {
    const P = POP, jb = P.job[i]; crS.job = jb ? G.pop.jobs[jb - 1] : null; crS.unemp = !jb; crS.lvl = P.clv[i]; crS.mon = P.cmon[i]; crS.tot = P.cmon[i]; crS.mul = 1;
    const J = DB.aiJobs[crS.job]; if (J?.student) crS.tot = P.cmon[i];
    fseed(SEEDI ^ 0x5bd1e995, i, d); const ev = review(crS, P.abl[i], P.hunt[i], fr);
    P.job[i] = crS.unemp ? 0 : G.pop.jobs.indexOf(crS.job) + 1; P.clv[i] = crS.lvl; P.cmon[i] = Math.min(255, J?.student && !ev ? crS.tot : crS.mon);
    if (ev === 'hired' || ev === 'grad') P.hunt[i] = 0; if (ev) W.career[ev] = (W.career[ev] || 0) + 1;
  }
  /* NPC 길드 월간 통계 (index.html npcGuildMonth 가 평판 · 공략 수 · 자금으로 바꾼다) */
  function gstat(gid, ok, dead, pay) { if (!gid || gid === G.myGuild?.id) return; const s = ((G.gStat = G.gStat || {})[gid] = G.gStat[gid] || { win: 0, fail: 0, dead: 0, pay: 0 }); if (ok) s.win++; else s.fail++; if (dead) s.dead++; s.pay += pay || 0; }
  function popRaid(i, lv, exp, pay, ok, inj, dth) {
    const P = POP; POPVER++; const pg = P.guild[i] >= 0 ? G.pop.guilds[P.guild[i]] : null; P.money[i] += Math.round(pay / 1000); P.cd[i] = 0; P.raids[i]++; P.e[i] = cl(P.e[i] - 40, 0, 100);
    const died = Math.random() < dth; gstat(pg, ok, died, pay);
    if (died) { P.flags[i] &= ~F_ALIVE; W.dead++; if (P.rank[i] <= BP().newsRank) newsAdd('사건', 'b', `${popName(i)} 헌터(${P.rank[i]}급) 게이트 공략 중 사망`); return; }
    if (Math.random() < inj) { const D = BA().injuryDays; P.inj[i] = D[0] + Math.floor(Math.random() * (D[1] - D[0])); }
    P.exp[i] += exp; const GB = DB.balance.BAL_GROWTH;
    while (P.exp[i] >= expNeed(P.level[i] || 1) && P.level[i] < (P.pot[i] || GB.levelMax)) {
      if (P.level[i] % GB.wallEvery === 0 && Math.random() >= GB.wallGate) { P.exp[i] = expNeed(P.level[i]); break; }
      P.exp[i] -= expNeed(P.level[i]); P.level[i]++; P.stat[i] += GB.statPerLevel; W.lvups++;
    }
    const nr = popRankLv(P, i, P.rank[i]); if (nr < P.rank[i]) { P.rank[i] = nr; W.rankups++; if (nr <= BP().newsRank) newsAdd('헌터', '', `${popName(i)} 헌터, ${nr}급으로 등급 상승`); }
  }
  function popEnd(d) {
    const B = BP(), P = POP; POPVER++;
    /* 새 각성자 (일반인 중) */
    const k = Math.round(P.n * B.awakenPerDay + Math.random() - 0.5);
    for (let t = 0; t < k; t++) { const i = Math.floor(Math.random() * P.n); if ((P.flags[i] & (F_ALIVE | F_AWAKE | F_PROMO)) !== F_ALIVE) continue; P.flags[i] |= F_AWAKE; P.level[i] = 1; P.rank[i] = 20; P.abl[i] = BP().ablAtLevel.base; P.stat[i] = BP().statAtLevel.base; P.job[i] = 0; P.role[i] = Math.floor(Math.random() * G.pop.roles.length); P.pot[i] = 10 + Math.floor(Math.random() * 50); W.awaken++; }
    if (d % 365 === 0 && d > 0) for (let i = 0; i < P.n; i++) if (P.age[i] < 255) P.age[i]++;
  }
  /* 이름: 시드로 만든다 (저장하지 않음) */
  function popName(i) { if (NAMES && NAMES[i]) return NAMES[i]; const np = DB.namePool.NAMEPOOL_KR, r = rng(G.pop.seed + '|' + i + '|name'), fem = POP.flags[i] & F_FEMALE, nm = np.family[Math.floor(r() * np.family.length)] + (fem ? np.female : np.male)[Math.floor(r() * (fem ? np.female : np.male).length)]; return nm; }
  function popNames() { if (!NAMES) { NAMES = new Array(POP.n); for (let i = 0; i < POP.n; i++) NAMES[i] = popName(i); } return NAMES; }
  const popId = i => 'PP_' + pad(i, 6), popIdx = id => +id.slice(3);
  function nameAt(x) { return x.det ? x.p.name : popName(x.i); }

  /* 승격: 집계 인물 → 상세 인물 (같은 시드로 세부 능력을 만든다). 이미 정해진 수치(레벨 · 평균 능력 · 스탯 합계 · 등급 · 소속)와 모순되지 않게 */
  function promote(i) {
    const id = popId(i), P = POP; if (!P || i < 0 || i >= P.n) return null;
    if (G.genHunters?.[id]) return G.genHunters[id]; if (G.genNpcs?.[id]) return G.genNpcs[id];
    const seed = G.pop.seed + '|' + i, r = rng(seed + '|promo'), f = P.flags[i], awake = !!(f & F_AWAKE), sex = f & F_FEMALE ? '여' : '남', reg = G.pop.regions[P.region[i]];
    const base = { id, name: popName(i), sex, age: P.age[i], region: reg, nation: 'NAT_KR', status: f & F_ALIVE ? '정상' : '사망', looks: null, promoted: true };
    let o;
    if (awake) {
      const role = G.pop.roles[P.role[i]], cls = vals('classes').filter(c => c.role === role), c = cls.length ? cls[Math.floor(r() * cls.length)] : vals('classes')[0];
      const abl = {}; vals('abilities').filter(a => ablSetsOf({ awake: true }).includes(a.set)).forEach(a => abl[a.id] = cl(Math.round(P.abl[i] + gauss(r) * 2.5), 1, 20));
      const st = vals('baseStats'), w = st.map(() => 0.5 + r()), tw = w.reduce((a, b) => a + b, 0), stats = {}; let left = P.stat[i];
      st.forEach((s, k) => { stats[s.id] = k === st.length - 1 ? left : Math.max(1, Math.round(P.stat[i] * w[k] / tw)); left -= stats[s.id]; });
      const skills = (c.pool || []).slice().sort(() => r() - 0.5).slice(0, c.pick || 2).map(s => [s, 1 + Math.floor(r() * 4)]);
      o = { ...base, awake: true, rank: 'RANK_' + pad(P.rank[i], 2), level: P.level[i], exp: Math.round(P.exp[i]), roleMain: role, roleSub: null, guild: P.guild[i] >= 0 ? G.pop.guilds[P.guild[i]] : null,
        cls: c.id, traits: [], skills, contract: { share: P.guild[i] >= 0 ? 6 + Math.floor(r() * 6) : 0, until: '—', bonus: '—' }, style: '', personality: '', media: '무난함', morale: '보통', fit: 80 + Math.floor(r() * 20),
        prefs: [], form: [], career: [], byRank: {}, portrait: null, stats, abl, pot: { level: P.pot[i] || Math.min(100, P.level[i] + 5 + Math.floor(r() * 40)), cap: Math.round(Object.values(abl).reduce((a, b) => a + b, 0) * (1.1 + r() * 0.5)) }, awakened: '2025-0' + (1 + Math.floor(r() * 9)) };
      (G.genHunters = G.genHunters || {})[id] = o;
    } else {
      const j = P.job[i] ? G.pop.jobs[P.job[i] - 1] : null; o = { ...base, awake: false, job: DB.aiJobs[j]?.name || '무직', jobId: j };
      (G.genNpcs = G.genNpcs || {})[id] = o;
      const st0 = aiOf(o); st0.career = { job: j, lvl: P.clv[i], mon: P.cmon[i], tot: P.cmon[i], mul: 1, unemp: !j };
      const C = DB.balance.BAL_CAREER.civAbl, rr = rng(id + '|civabl'); st0.abl = {}; vals('abilities').filter(a => ablSetsOf({ awake: false }).includes(a.set)).forEach(a => st0.abl[a.id] = cl(Math.round(P.abl[i] + gauss(rr) * 2), 1, 20));
    }
    P.flags[i] |= F_PROMO; POPVER++; o.promoAt = G.day;
    const ag = aiOf(o); ag.e = P.e[i]; ag.s = P.s[i]; ag.money = P.money[i] * 1000; ag.soc = P.soc[i]; ag.inj = P.inj[i]; ag.cd = P.cd[i]; ag.raids = P.raids[i];
    if (!(f & F_ALIVE)) ag.dead = true;
    return o;
  }
  const promoteId = id => POP && /^PP_\d{6}$/.test(id) ? promote(popIdx(id)) : null;
  /* 강등(정리): 목록에 보여 주느라 승격만 되고 아무 데도 엮이지 않은 사람을 다시 집계 인물로 돌린다 (QA 2026-10-23: 1년이면 승격 인물이 세이브 2MB를 넘겨 저장이 실패했다).
     관계 · 대화 · 기억 · 파티 · 길드 · 알림 등 G 어디에든 ID가 나오면 그대로 둔다. 승격한 지 keepDays 일이 안 된 사람도 둔다. 다시 승격하면 같은 시드로 세부를 만든다 */
  function gc(keepDays = 3) {
    if (!POP) return 0; const P = POP, skip = new Set(['genHunters', 'genNpcs', 'gpUsed', 'genGates', 'pop', 'gates', 'news', 'ledger']);
    const cand = [...Object.keys(G.genHunters || {}), ...Object.keys(G.genNpcs || {})].filter(id => /^PP_\d{6}$/.test(id));
    if (!cand.length) return 0;
    const refs = new Set(); const scan = v => { const m = JSON.stringify(v)?.match(/PP_\d{6}/g); if (m) m.forEach(x => refs.add(x)); };
    for (const k of Object.keys(G)) { if (skip.has(k)) continue; if (k === 'ai') { for (const [id, a] of Object.entries(G.ai || {})) { const m = JSON.stringify(a)?.match(/PP_\d{6}/g); if (m) m.forEach(x => { if (x !== id) refs.add(x); }); } continue; } scan(G[k]); }
    for (const o of [...Object.values(G.genHunters || {}), ...Object.values(G.genNpcs || {})]) { const m = JSON.stringify(o).match(/PP_\d{6}/g); if (m) m.forEach(x => { if (x !== o.id) refs.add(x); }); }
    if (typeof UI !== 'undefined') scan({ prep: UI.prep, raid: UI.raid && UI.raid.party, profile: UI.profileId, th: UI.thWith });
    let n = 0;
    for (const id of cand) {
      if (refs.has(id)) continue; const i = popIdx(id); if (i < 0 || i >= P.n || !(P.flags[i] & F_PROMO)) continue;
      const o = G.genHunters?.[id] || G.genNpcs?.[id], ag = G.ai?.[id] || {};
      if (o.promoAt != null && G.day - o.promoAt < keepDays) continue;
      if (o.awake) {
        const gi = o.guild ? G.pop.guilds.indexOf(o.guild) : -1; if (o.guild && gi < 0) continue;
        const ab = Object.values(o.abl || {}); P.level[i] = o.level; P.exp[i] = o.exp || 0; P.rank[i] = +String(o.rank).slice(5) || P.rank[i];
        P.stat[i] = Object.values(o.stats || {}).reduce((a, b) => a + b, 0) || P.stat[i]; if (ab.length) P.abl[i] = ab.reduce((a, b) => a + b, 0) / ab.length; P.guild[i] = gi; if (o.pot?.level) P.pot[i] = Math.min(255, o.pot.level);
      } else {
        const c = ag.career; if (c) { P.job[i] = c.job ? G.pop.jobs.indexOf(c.job) + 1 : 0; P.clv[i] = c.lvl || 0; P.cmon[i] = Math.min(255, c.mon || 0); }
        const ab = Object.values(ag.abl || {}); if (ab.length) P.abl[i] = ab.reduce((a, b) => a + b, 0) / ab.length;
      }
      if (o.age) P.age[i] = o.age;
      for (const k of ['e', 's', 'soc', 'inj', 'cd']) if (Number.isFinite(ag[k])) P[k][i] = Math.max(0, Math.min(255, Math.round(ag[k])));
      if (Number.isFinite(ag.raids)) P.raids[i] = ag.raids; if (Number.isFinite(ag.money)) P.money[i] = Math.round(ag.money / 1000);
      if (ag.dead || o.status === '사망') P.flags[i] &= ~F_ALIVE;
      P.flags[i] &= ~F_PROMO; delete G.genHunters?.[id]; delete G.genNpcs?.[id]; delete G.ai?.[id]; n++;
    }
    if (n) POPVER++; return n;
  }
  /* 목록용 가벼운 행 (승격하지 않음) */
  function popRow(i) { const P = POP, f = P.flags[i]; return { id: popId(i), i, name: popName(i), awake: !!(f & F_AWAKE), alive: !!(f & F_ALIVE), promoted: !!(f & F_PROMO), age: P.age[i], rank: P.rank[i] ? 'RANK_' + pad(P.rank[i], 2) : null, level: P.level[i], guild: P.guild[i] >= 0 ? G.pop.guilds[P.guild[i]] : null, region: G.pop.regions[P.region[i]], job: P.job[i] ? (() => { const J = DB.aiJobs[G.pop.jobs[P.job[i] - 1]]; return J.ladder && J.ladder.length > 1 ? `${J.name} · ${J.ladder[P.clv[i]]}` : J.name; })() : (f & F_AWAKE ? null : '무직') }; }
  /* 검색: q(이름 · ID), f('HUNTER'|'FREE'|'NPC'|'ALL'). 승격된 사람은 상세 쪽에서 나오므로 뺀다 */
  function search(q, f, limit) {
    if (!POP) return { rows: [], total: 0 }; const N = popNames(), P = POP, out = []; let total = 0; q = (q || '').trim();
    for (let i = 0; i < P.n; i++) {
      const fl = P.flags[i]; if (!(fl & F_ALIVE) || (fl & F_PROMO)) continue; const aw = fl & F_AWAKE;
      if (f === 'HUNTER' && !aw) continue; if (f === 'NPC' && aw) continue; if (f === 'FREE' && (!aw || P.guild[i] >= 0)) continue;
      if (q && !N[i].includes(q) && !popId(i).includes(q.toUpperCase())) continue;
      total++; if (out.length < limit) out.push(popRow(i));
    }
    return { rows: out, total };
  }
  /* 플레이어 파티 후보: 같은 지역 · 비슷한 등급의 무소속 헌터 (승격해서 돌려준다) */
  function freeNear(region, rankLv, n) {
    if (!POP) return []; const P = POP, ri = G.pop.regions.indexOf(region), c = [];
    for (let i = 0; i < P.n && c.length < 400; i++) { const fl = P.flags[i]; if ((fl & (F_ALIVE | F_AWAKE)) !== (F_ALIVE | F_AWAKE) || P.guild[i] >= 0 || P.region[i] !== ri || P.inj[i] > 0) continue; if (Math.abs(P.rank[i] - rankLv) <= 3) c.push(i); }
    const r = rng(G.pop.seed + '|near|' + G.day); c.sort((a, b) => (Math.abs(POP.rank[a] - rankLv) - Math.abs(POP.rank[b] - rankLv)) || (r() - 0.5));
    return c.slice(0, n).map(promote);
  }
  /* 밸런스 확인용: 집단별 평균 돈(원) — 각성자 · 직장인 · 무직 · 학생 */
  function moneyBy() {
    if (!POP) return null; const P = POP, stud = G.pop.jobs.findIndex(j => DB.aiJobs[j]?.student) + 1, o = { hunter: [0, 0], work: [0, 0], unemp: [0, 0], student: [0, 0] };
    for (let i = 0; i < P.n; i++) { const f = P.flags[i]; if (!(f & F_ALIVE)) continue; const k = f & F_AWAKE ? 'hunter' : P.job[i] === stud ? 'student' : P.job[i] ? 'work' : 'unemp'; o[k][0] += P.money[i] * 1000; o[k][1]++; }
    return Object.fromEntries(Object.entries(o).map(([k, [m, n]]) => [k, { n, avg: Math.round(m / Math.max(1, n)) }]));
  }
  function stats() {
    if (!POP) return null; const P = POP, by = new Array(21).fill(0); let alive = 0, awake = 0, guild = 0, money = 0, inj = 0, civ = 0, unemp = 0, stud = -1;
    stud = G.pop.jobs.findIndex(j => DB.aiJobs[j]?.student) + 1;
    for (let i = 0; i < P.n; i++) { const f = P.flags[i]; if (!(f & F_ALIVE)) continue; alive++; money += P.money[i]; if (!(f & F_AWAKE) && P.job[i] !== stud) { civ++; if (!P.job[i]) unemp++; } if (f & F_AWAKE) { awake++; by[P.rank[i]]++; if (P.guild[i] >= 0) guild++; if (P.inj[i]) inj++; } }
    return { n: P.n, alive, awake, guild, inj, civ, unemp, avgMoney: Math.round(money / Math.max(1, alive)) * 1000, byRank: by, last: G.simStat || null };
  }

  /* ---------- 저장 (IndexedDB). 세이브 본문(G)은 localStorage, 인구 열은 크기가 커서 IndexedDB 에 슬롯별로 ---------- */
  const IDB = 'khl-pop', STORE = 'pop';
  function idb() { return new Promise((res, rej) => { if (!window.indexedDB) return rej(new Error('no idb')); const q = indexedDB.open(IDB, 1); q.onupgradeneeded = () => q.result.createObjectStore(STORE); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
  async function save(slot) {
    if (!POP) return false; try {
      const db = await idb(), blob = { meta: G.pop, created: G.created, cols: {} }; for (const [k] of COLS) blob.cols[k] = POP[k].slice(); blob.last = POP.last.slice();
      await new Promise((res, rej) => { const t = db.transaction(STORE, 'readwrite'); t.objectStore(STORE).put(blob, slot); t.oncomplete = res; t.onerror = () => rej(t.error); }); return true;
    } catch (e) { console.warn('[SIM] 인구 저장 실패', e); return false; }
  }
  async function load(slot) {
    if (!G.pop) { POP = null; return 'none'; }
    try {
      const db = await idb(), blob = await new Promise((res, rej) => { const t = db.transaction(STORE, 'readonly'), q = t.objectStore(STORE).get(slot); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); });
      if (blob && blob.created === G.created && blob.meta.n === G.pop.n) { const P = popAlloc(blob.meta.n); for (const [k] of COLS) if (blob.cols[k]) P[k].set(blob.cols[k]); if (blob.last) P.last.set(blob.last); derive(P, G.pop.seed); POP = P; NAMES = null; owner = G.created; POPVER++; return 'ok'; }
    } catch (e) { console.warn('[SIM] 인구 불러오기 실패', e); }
    popGen(G.pop.seed, G.pop.n); return 'regen';
  }
  async function del(slot) { try { const db = await idb(); db.transaction(STORE, 'readwrite').objectStore(STORE).delete(slot); } catch (e) { } }
  /* 새 게임 · 시나리오 시작 */
  function init(seed, n) { if (!ACTS) compile(); popGen(seed ?? Math.floor(Math.random() * 1e9), n ?? BP().size); G.ai = G.ai || {}; G.simQ = []; }

  /* ---------- 백그라운드 계산 (Web Worker) ----------
     배경 인구의 '다음 날 계획'(popPlan)만 워커에서 미리 계산한다. 같은 코드(SIM_FACTORY 소스) · 같은 시드라 결과가 메인과 같다.
     요청할 때 인구 열을 복사해 보내고(POPVER 기록), 받은 결과는 그 사이 메인에서 인구가 바뀌지 않았을 때만 쓴다 (바뀌었으면 메인에서 다시 계산).
     file:// 에서도 되도록 워커 코드를 Blob 으로 만든다. 워커를 못 쓰면 지금처럼 메인에서 계산한다 */
  const WK = { w: null, state: 'off', pend: null, cache: null, seq: 0 };
  const WCOLS = () => [...COLS.map(c => c[0]), 'px', 'tal', 'last'];
  function wkStart() {
    if (WK.w || WK.state === 'fail' || typeof Worker === 'undefined' || typeof window === 'undefined') return WK.w;
    try {
      const src = `var DB={}, G={}, window=self, UI={};
var vals=t=>Object.values(DB[t]||{}); ${hashStr.toString()} ${rng.toString()} var gauss=${gauss.toString()};
var nowAbs=()=>0, newsAdd=()=>{}, rankNeed=()=>({st:1e9,abl:99}), expNeed=()=>1e12;
${SIM_FACTORY.toString()}
var S=SIM_FACTORY(); onmessage=e=>{const m=e.data; if(m.init){DB=m.db;return}
  try{const r=S.workerPlan(m.d,m.meta,m.cols);postMessage({seq:m.seq,d:m.d,ver:m.ver,...r},Object.values(r.cols).map(a=>a.buffer))}catch(err){postMessage({seq:m.seq,err:String(err&&err.stack||err)})}};`;
      WK.w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      const db = {}; for (const t of ['actions', 'aiNeeds', 'aiGoals', 'ccPersonality', 'balance', 'aiJobs']) db[t] = DB[t];
      WK.w.postMessage({ init: true, db: JSON.parse(JSON.stringify(db)) });
      WK.w.onmessage = e => { const m = e.data, p = WK.pend; if (!p || m.seq !== p.seq) return; WK.pend = null; if (m.err) { console.warn('[SIM] 워커 오류', m.err); WK.state = 'fail'; p.res(false); return; } WK.cache = m; WK.state = 'on'; p.res(true); };
      WK.w.onerror = e => { console.warn('[SIM] 워커를 쓸 수 없습니다 — 메인에서 계산합니다', e.message); WK.state = 'fail'; WK.w = null; if (WK.pend) { WK.pend.res(false); WK.pend = null; } };
      WK.state = 'starting';
    } catch (e) { WK.state = 'fail'; WK.w = null; }
    return WK.w;
  }
  /* 날짜 d 의 배경 인구 계획을 워커에 맡기고, 끝나면 풀리는 Promise. 이미 같은 요청이 있으면 그걸 돌려준다 */
  function ensure(d) {
    if (!POP || !G.pop) return Promise.resolve(false);
    if (WK.cache && WK.cache.d === d && WK.cache.ver === POPVER) return Promise.resolve(true);
    if (WK.pend && WK.pend.d === d && WK.pend.ver === POPVER) return WK.pend.p;
    if (!wkStart()) return Promise.resolve(false);
    if (WK.pend) { WK.pend.res(false); WK.pend = null; }
    const seq = ++WK.seq, cols = {}; for (const k of WCOLS()) cols[k] = POP[k].slice();
    let res; const p = new Promise(r => res = r); WK.pend = { seq, d, ver: POPVER, p, res };
    WK.w.postMessage({ seq, d, ver: POPVER, meta: JSON.parse(JSON.stringify(G.pop)), cols }, Object.values(cols).map(a => a.buffer));
    return p;
  }
  function prefetch() { if (G && G.pop && POP && !G.dead) ensure((G.simDay ?? G.day) + 1); }
  function useCached(d, intents) {
    const c = WK.cache; if (!c || c.d !== d || c.ver !== POPVER) return false;
    WK.cache = null; const B = BA();
    for (const k of COLS.map(x => x[0])) POP[k] = c.cols[k]; POP.last = c.cols.last;
    for (const x of c.intents) { x.blk = B.blocks[x.bi]; x.det = false; intents.push(x); }
    for (let k = 0; k < c.popActs.length; k++) popActs[k] += c.popActs[k];
    for (const [k, v] of Object.entries(c.career || {})) W.career[k] = (W.career[k] || 0) + v;
    POPVER++; W.popVia = 'worker'; return true;
  }
  /* 검사용: 워커가 미리 계산한 결과와, 같은 상태에서 메인이 계산한 결과가 같은지 (테스트 t_worker) */
  function compareCached() {
    const c = WK.cache; if (!c) return 'no cache'; const keep = POP, keepW = W, keepA = popActs, P = { n: POP.n };
    for (const k of WCOLS()) P[k] = POP[k].slice(); POP = P; W = { career: {} }; popActs = new Uint32Array(64); const it = []; popPlan(c.d, it);
    let diff = 0; for (const k of [...COLS.map(x => x[0]), 'last']) for (let i = 0; i < P.n; i++) if (P[k][i] !== c.cols[k][i]) { diff++; break; }
    const res = { diffCols: diff, intents: [it.length, c.intents.length] }; POP = keep; W = keepW; popActs = keepA; return res;
  }
  /* 워커 안에서 불린다: 받은 열로 popPlan(d) 을 돌려 결과를 돌려준다 */
  function workerPlan(d, meta, cols) {
    if (!ACTS) compile(); G.pop = meta; MC = 0;
    const P = { n: meta.n }; for (const k of WCOLS()) P[k] = cols[k]; POP = P; popActs = new Uint32Array(64); W = { career: {} };
    const intents = []; popPlan(d, intents);
    const out = {}; for (const k of [...COLS.map(c => c[0]), 'last']) out[k] = P[k];
    return { cols: out, intents: intents.map(x => ({ i: x.i, d: x.d, bi: x.bi, alt: x.alt, pp: x.pp, lv: x.lv, acc: x.acc, region: x.region, guild: x.guild })), popActs: Array.from(popActs), career: W.career };
  }

  /* 플레이어 일정 추천: NPC와 같은 효용 엔진으로 하루를 짠다 (목표 방향 focus = aiGoals ID 목록, 없으면 성격으로).
     공략은 넣지 않는다 (게이트는 직접 고른다). 결과는 일정표 형식 [{at, act, dur}] */
  function suggestDay(focus, weekend, options = {}) {
    if (options.rows) { const planner = SIM_FACTORY(); planner.compile(options.rows); const {rows, ...rest} = options; return planner.suggestDay(focus, weekend, rest); }
    if (!ACTS) compile();
    const B = BA(), ag = mkAg(), p = G.player, px = pxOf(p), d = weekend ? 5 : 0;
    ag.e = options.startAt != null ? G.cond.energy : 100; ag.s = G.cond.stress; ag.money = G.money; ag.inj = (G.injuries || []).length ? 3 : 0; ag.cd = 9; ag.awake = true; ag.hasJob = !!p.jobPay; ag.jobPay = p.jobPay || 0; ag.guild = p.guild || null; ag.px = px; ag.po = 0;
    const lastSoc = (G.timeLog || []).find(x => DB.actions[x.act]?.cat === 'ACC_SOCIAL'); ag.soc = lastSoc ? Math.floor((nowAbs() - lastSoc.t) / 1440) : B.socialDays;
    ag.lv = DB.ranks[p.rank].lv; ag.risk = 9; ag.pEst = 0; ag.acc = 1;
    const gi = id => GOALS.findIndex(g => g.id === id), f = (focus || []).map(gi).filter(i => i >= 0), pg = goalsFor(p.id, px, true, 0);
    ag.g1 = f[0] ?? pg[0]; ag.g2 = f[1] ?? (pg[0] === ag.g1 ? pg[1] : pg[0]);
    const keep = ACTS.map(A => !A.fRaid && (A.a.show || []).includes('schedule'));
    const r = rng(p.id + '|plan|' + (weekend ? 'we' : 'wd') + '|' + G.day), out = [], save = BA().temp; prepare(ag, d);
    for (let k = 0; k < ACTS.length; k++) if (!keep[k]) ST[k] = -99;
    for (const blk of B.blocks) {
      if(blk[1] <= (options.startAt || 0))continue;
      if (blk[2] === 'meal') { out.push({ at: blk[0], act: 'ACT_MEAL', dur: blk[1] - blk[0] }); ag.e = cl(ag.e + 4, 0, 100); continue; }
      let t = Math.max(blk[0],options.startAt || 0);
      while (blk[1] - t >= 60) {
        const k = choose(ag, [t, blk[1]], 0, d, r, null, null, options.check); if (k < 0 || ST[k] <= -90) break; const A = ACTS[k], mx = Math.max(...(A.a.durs || [60]));
        const dur = Math.min(blk[1] - t, mx); if(options.onChoice)options.onChoice(A.a,t,dur,ST[k]); out.push({ at: t, act: A.a.id, dur }); apply(ag, A, dur, null); t += dur;
      }
    }
    out.push({ at: B.sleep[0], act: 'ACT_SLEEP', dur: (1440 - B.sleep[0]) + B.sleep[1] });
    return out;
  }
  /* 세이브와 인구가 어긋났을 때(불러오기를 기다리지 않은 경우) 같은 시드로 다시 만든다 */
  function regen() { if (G.pop) popGen(G.pop.seed, G.pop.n); }
  return { pxOf: p => pxOf(p), adopt(c) { owner = c; }, careerOf, jobTitle, payOf, commuteOf, regen, suggestDay, get owner() { return owner; }, cost, trainFactor, compile, day, tick, init, save, load, del, promote, promoteId, gc, search, freeNear, stats, moneyBy, popRow, popName, pWin, bestLv, goalsFor,
    get POP() { return POP; }, get world() { return W; }, actsCompiled: () => ACTS, aiOf, detailedList, isPop: id => /^PP_\d{6}$/.test(id || ''),
    ensure, prefetch, workerPlan, compareCached, get workerState() { return WK.state; } };
}
const SIM = SIM_FACTORY();
