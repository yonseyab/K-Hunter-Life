/* =========================================================
   engine/scale.js — 인구 · 게이트 규모 (K-Hunter-Life, 2026-10-23)
   각성자 = 인구 0.5%, 활동 헌터 = 0.2%. 게이트 발생 수는 활동 헌터 수에서 거꾸로 계산한다
     (활동 헌터 × 주 raidsPerWeek ÷ 7 ÷ 평균 파티 ÷ 브레이크 전 공략 비율 ≈ 전국 하루 5,500개).
   내 주변(사는 지역 + 인접 localKm)만 개별 게이트로 만들고, 나머지는 시도별 개수 · 등급 · 결과를 집계로 돌린다.
   배경 인구: 생활권(사는 시도 + zoneKm 안)의 각성자를 실제 비율로 (상한을 넘으면 가중치), 일반인은 주변 중심 표본.
   ========================================================= */
const SCALE = (() => {
  const B = () => DB.balance.BAL_SCALE;
  let PROV = null;
  function provs() {
    if (PROV) return PROV; const b = B(), tot = Object.values(b.sidoPop).reduce((a, x) => a + x, 0), o = {};
    vals('regions').forEach(r => { if (!r.prov) return; const p = o[r.prov] || (o[r.prov] = { regs: [], w: 0, pop: (b.sidoPop[r.prov] || 0) / tot * b.popKR }); p.regs.push(r.id); p.w += r.gateDensity || 1; });
    return PROV = o;
  }
  const provPop = k => provs()[k]?.pop || 0;
  function regionPop(rid) { const r = DB.regions[rid]; if (!r || !r.prov) return 0; const p = provs()[r.prov]; return p ? p.pop * (r.gateDensity || 1) / p.w : 0; }
  /* 전국 수치 */
  function national() {
    const b = B(), awake = b.popKR * b.awakeRate, active = b.popKR * b.activeRate, gates = active * b.raidsPerWeek / 7 / b.partyAvg / b.clearShare;
    return { pop: b.popKR, awake, active, idle: awake - active, gatesPerDay: gates, raidsPerDay: active * b.raidsPerWeek / 7 / b.partyAvg };
  }
  const gatesPerDayIn = rid => national().gatesPerDay * regionPop(rid) / B().popKR;
  /* 개별 게이트 범위: 사는 지역 + localKm 안 (가까운 순 localMax 곳까지) */
  function localRegions(home) {
    home = home || G?.player?.region; if (!home) return [];
    const L = vals('regions').filter(r => r.id === home || kmBetween(home, r.id) <= B().localKm).sort((a, b) => kmBetween(home, a.id) - kmBetween(home, b.id)).slice(0, B().localMax).map(r => r.id);
    return L.includes(home) ? L : [home, ...L].slice(0, B().localMax);
  }
  const isLocal = rid => (G._local || (G._local = { home: null, set: null })).home === G.player.region ? G._local.set.has(rid) : (G._local = { home: G.player.region, set: new Set(localRegions()) }).set.has(rid);
  function localPerHour() { return localRegions().reduce((a, r) => a + gatesPerDayIn(r), 0) / 24; }
  function pickLocal(r) { const L = localRegions(), w = L.map(x => regionPop(x)), t = w.reduce((a, b) => a + b, 0); let x = r() * t; for (let i = 0; i < L.length; i++) { x -= w[i]; if (x <= 0) return L[i]; } return L[0]; }
  /* 생활권 (배경 인구) */
  function zoneRegions(home) { home = home || G?.player?.region; const pv = DB.regions[home]?.prov; return vals('regions').filter(r => r.id === home || r.prov === pv || kmBetween(home, r.id) <= B().zoneKm).map(r => r.id); }
  function zonePlan(home) {
    const b = B(), Z = zoneRegions(home), pop = Z.reduce((a, r) => a + regionPop(r), 0), awake = pop * b.awakeRate, active = pop * b.activeRate;
    const nA = Math.max(200, Math.min(b.awakeCap, Math.round(awake))), nC = b.civSize;
    return { regions: Z, pop: Math.round(pop), awake: Math.round(awake), active: Math.round(active), nA, nC, wA: awake / nA, wC: (pop - awake) / nC, activeShare: b.activeRate / b.awakeRate };
  }
  /* 등급 분포 (하위가 압도적). 20급 → 1급 */
  function rankW() { return B().rankW || DB.balance.BAL_WORLD.rankWeights; }
  function pickRankLv(r) { const W = rankW(), t = W.reduce((a, x) => a + x[1], 0); let x = r() * t; for (const [l, w] of W) { x -= w; if (x <= 0) return l; } return W[0][0]; }
  /* 포아송 (작은 λ는 정확히, 큰 λ는 정규 근사) */
  function poisson(l, r = Math.random) { if (l <= 0) return 0; if (l > 40) return Math.max(0, Math.round(l + Math.sqrt(l) * gauss(r))); let L = Math.exp(-l), k = 0, p = 1; do { k++; p *= r(); } while (p > L); return k - 1; }
  /* 하루 집계: 개별 게이트 범위 밖의 전국 게이트 */
  function day(d) {
    const b = B(), A = G.wagg || (G.wagg = { log: [], sum: { n: 0, clear: 0, brk: 0 } }), loc = new Set(localRegions()), row = { d, n: 0, clear: 0, brk: 0, prov: {}, hi: [] }, W = rankW(), wt = W.reduce((a, x) => a + x[1], 0);
    for (const [k, p] of Object.entries(provs())) {
      const lam = p.regs.filter(id => !loc.has(id)).reduce((a, id) => a + gatesPerDayIn(id), 0), n = poisson(lam);
      let brk = 0; for (let i = 0; i < Math.min(n, 200); i++) if (Math.random() > b.clearShare) brk++; if (n > 200) brk = Math.round(brk * n / 200);
      row.prov[k] = [n, brk]; row.n += n; row.brk += brk; row.clear += n - brk;
      /* 높은 등급 게이트 (기댓값으로 굴린다) */
      for (const [lv, w] of W) { if (lv > b.breakNewsLv) continue; const m = poisson(n * w / wt); for (let i = 0; i < m; i++) { const broke = Math.random() > b.clearShare; if (broke || lv <= 8) row.hi.push([k, lv, broke ? 1 : 0]); } }  /* 높은 등급만 하나씩 남긴다 (세이브 크기) */
    }
    A.log.unshift(row); if (A.log.length > b.aggKeep) A.log.length = b.aggKeep; A.sum.n += row.n; A.sum.clear += row.clear; A.sum.brk += row.brk;
    /* 큰 브레이크는 뉴스로 */
    row.hi.filter(x => x[2]).sort((a, b) => a[1] - b[1]).slice(0, 2).forEach(([k, lv]) => { const nm = provName(k); newsAdd('속보', 'b', `${nm} ${lv}급 게이트 브레이크… 협회 "피해 집계 중"`); STORY.newsLine({ title: `${nm} ${lv}급 게이트 브레이크`, big: lv <= 6 }); });
    if (Math.random() < 0.15) { const N = vals('ccNations').filter(n => n.state && n.state !== 'NS_OK'); if (N.length) { const n = pick(N); newsAdd('국제', '', `${n.name} 사태 ${2026 - 1999}년… ${DB.nationStates[n.state]?.name || ''} 지역 현황`); } }
    return row;
  }
  const PROV_NAME = { SEOUL: '서울', BUSAN: '부산', DAEGU: '대구', INCHEON: '인천', GWANGJU: '광주', DAEJEON: '대전', ULSAN: '울산', SEJONG: '세종', GYEONGGI: '경기', GANGWON: '강원', CHUNGBUK: '충북', CHUNGNAM: '충남', JEONBUK: '전북', JEONNAM: '전남', GYEONGBUK: '경북', GYEONGNAM: '경남', JEJU: '제주' };
  const provName = k => PROV_NAME[k] || k;
  /* 쓴 장소 기록: 지금 있는 개별 게이트만 막는다 (닫히고 정리되면 풀어 준다) */
  function release(g) { const U = G.gpUsed?.[g.region]; if (!U || !g.place) return; const i = U.lastIndexOf(g.place); if (i >= 0) U.splice(i, 1); }
  /* 다른 헌터들의 공략: 개별 게이트의 약 clearShare 가 브레이크 전에 누군가에게 공략된다 (생길 때 정해 둔 시각 g.clr).
     배경 인구 시뮬레이션(SIM)이 먼저 맡거나, 내가 공략 중이거나, 우리 길드 게이트면 건드리지 않는다 */
  function fate(g, hoursLeft) { const b = B(); if (Math.random() >= b.clearShare) return null; return g.born + Math.round(Math.min(hoursLeft * 60 - 45, -Math.log(1 - Math.random()) * b.clearMeanH * 60)); }
  function othersClear() {
    const t = nowAbs(), res = new Set((G.simQ || []).map(q => q.gid)); if (UI.raid && !UI.raid.done) res.add(UI.raid.gid);
    for (const g of Object.values(G.genGates || {})) {
      if (!g.clr || g.clr > t || res.has(g.id)) continue; const st = gateSt(g.id); if (st.status !== 'open') { g.clr = null; continue; }
      if (G.player.guild && (g.owner === G.player.guild || st.winner === G.player.guild || st.winner === 'ME' || st.delegate)) { g.clr = null; continue; }
      st.status = 'cleared'; st.clearedAt = g.clr; st.by = othersName(g); g.clr = null;
    }
  }
  function othersName(g) {
    const L = vals('guilds').filter(x => !x.mine && x.region && kmBetween(x.region, g.region) <= 15 && DB.ranks[x.rank].lv <= DB.ranks[g.rank].lv + 2);
    if (L.length && Math.random() < 0.3) return pick(L).name;
    const n = SIM.POP ? SIM.popName(Math.floor(Math.random() * SIM.POP.n)) : '무소속'; return `${n} 외 ${2 + Math.floor(Math.random() * 4)}명 파티`;
  }
  function tidyUsed() { const U = G.gpUsed || {}, k = B().gpKeep; for (const r of Object.keys(U)) if (U[r].length > k) U[r].splice(0, U[r].length - k); }
  return { fate, othersClear, national, regionPop, provPop, gatesPerDayIn, localRegions, isLocal, localPerHour, pickLocal, zoneRegions, zonePlan, pickRankLv, poisson, day, provs, provName, release, tidyUsed, rankW };
})();
