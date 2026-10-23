/* =========================================================
   engine/mind.js — 판단 엔진 · 감정 · 자기 인식 · 이야기꾼 (K-Hunter-Life, 2026-10-23)
   판단 엔진 (하나로 통합) · 세 층 원칙 · 감정 · 이야기꾼.

   MIND  하루 일정(공략 갈까) · 이벤트 선택지 · 공략 위기를 같은 식으로 고른다. NPC도 같은 식(MIND.npcScore).
         점수 = Σ 태그(mindTags) × 재료(성격 · 감정 · 상태 · 자기 인식 · 방침) + 성공 확률 + 관계 · 기억 + 무작위.
         고른 이유를 문장으로 돌려준다(mindWhy). 큰 사건은 성격 축을 아주 조금 움직인다(MIND.drift).
   EMO   감정. 사건으로 생기고 반감기에 따라 천천히 가라앉는다. 바뀔 때만 이야기 창에 한 줄.
   SELF  자기 인식(3층). 사실(1층) 기준선 + 성격 + 들은 말. 사실에서 band 이상 벗어나지 않는다.
   TELLER 이야기꾼(B안). 오래 조용하면 확률을 조금 올리고, 큰일이 몰리면 낮춘다. 화면에 드러내지 않는다.
   ========================================================= */
const MIND = (() => {
  const BM = () => DB.balance.BAL_MIND;
  const AX = () => vals('ccPersonality').map(p => p.id);
  const cv = v => Math.max(-1, Math.min(1, ((v ?? 5.5) - 5.5) / 4.5));   /* 1~10 → −1~+1 */
  const play = () => (G && G.prefs && G.prefs.play) || {};

  /* 성격 (−1~+1). 플레이어는 커마 값(경험으로 조금씩 바뀐 값), NPC 는 시드 성격 */
  function pxOf(who) {
    const o = {};
    if (!who || who === G.player || who.id === G.player.id) { const pr = G.bio?.pers || {}, f = G.persF || {}; AX().forEach(k => o[k] = cv(f[k] ?? pr[k])); return o; }
    let raw = null;
    if (who.px && typeof who.px === 'object' && !ArrayBuffer.isView(who.px)) raw = who.px;
    else { try { const a = SIM.pxOf ? SIM.pxOf(who) : null; if (a) { raw = {}; AX().forEach((k, i) => raw[k] = a[i]); } } catch (e) { } }
    if (!raw) { const r = rng((who.id || 'x') + '|px'); raw = {}; AX().forEach(k => raw[k] = Math.max(1, Math.min(10, Math.round(5.5 + gauss(r) * 2)))); }
    AX().forEach(k => o[k] = cv(raw[k])); return o;
  }
  /* 재료 묶음 (플레이어). NPC 는 성격만 + 간단한 상태 */
  function factors(who) {
    const F = {}, px = pxOf(who); Object.entries(px).forEach(([k, v]) => F['px:' + k] = v);
    if (who && who !== G.player && who.id !== G.player.id) return F;
    const c = G.cond, em = energyMax();
    F['st:hpLow'] = Math.max(0, (70 - (c.hp ?? 100)) / 70);
    F['st:energyLow'] = Math.max(0, (50 - c.energy) / 50);
    F['st:stressHigh'] = Math.max(0, (c.stress - 50) / 50);
    F['st:sleepy'] = Math.min(1, (c.sleepDebt || 0) / 12);
    const fix = (DB.balance.BAL_LIFE?.fixed || []).reduce((a, x) => a + x[1], 0) || 900000;
    F['st:moneyLow'] = Math.max(0, Math.min(1, 1 - G.money / (fix * 2)));
    F['st:injured'] = Math.min(1, (G.injuries || []).reduce((a, j) => a + (j.sev || 1), 0) / 4);
    vals('emotions').forEach(e => { if (e.id !== 'EM_CALM') F['emo:' + e.id] = (EMO.val(e.id) || 0) / 100; });
    const s = SELF.get(); ['looks', 'skill', 'money', 'belong'].forEach(k => F['self:' + k] = (s[k] - 50) / 50);
    const pol = policy(); Object.entries(pol).forEach(([k, v]) => F['pol:' + k] = v);
    return F;
  }
  /* 방침 (설정 › 방침) → −1~+1 */
  function policy() {
    const A = (G.prefs && G.prefs.autoRaid) || {}, pl = play();
    const risk = { safe: -0.8, balanced: 0, profit: 0.4, team: -0.2 }[A.policy] ?? 0;
    const money = { safe: -0.2, balanced: 0, profit: 0.9, team: -0.3 }[A.policy] ?? 0;
    const team = { safe: 0.2, balanced: 0, profit: -0.4, team: 0.9 }[A.policy] ?? 0;
    const rest = { work: -0.8, balance: 0, rest: 0.8 }[pl.pace || 'balance'] ?? 0;
    return { risk, money, team, rest };
  }
  /* 태그 하나의 점수와 기여 내역 */
  function tagScore(tagId, F, wPol) {
    const T = DB.mindTags[tagId]; if (!T) return { s: 0, parts: [] };
    let s = 0; const parts = [];
    for (const [k, w] of Object.entries(T.w)) {
      const v = F[k]; if (v == null || !v) continue;
      const m = k.startsWith('pol:') ? wPol * 1.5 : k.startsWith('px:') ? (1 - wPol * 0.8) : 1;  /* 방침 대 성격 (0 = 성격만, 1 = 방침 위주) */
      const c = w * v * m; s += c; parts.push([k, c]);
    }
    return { s, parts };
  }
  /* 선택지의 태그: 데이터 tags → style → 효과로 추정 */
  function tagsOf(ch) {
    if (ch.tags && ch.tags.length) return ch.tags;
    if (ch.style && DB.styleTags[ch.style]) return DB.styleTags[ch.style].tags;
    const fx = ch.okFx || {}, out = [];
    if (fx.retreat) out.push('TAG_ESCAPE');
    if (ch.needParty) out.push('TAG_TEAM');
    if (fx.money > 0 || fx.stones || fx.loot) out.push('TAG_MONEY');
    if (fx.money < 0 && (fx.rel || fx.relDim)) out.push('TAG_KIND');
    if ((fx.rel && fx.rel[2] > 0) || fx.relDim) out.push('TAG_SOCIAL');
    if (ch.risk === '위험' || ch.risk === '치명적') out.push('TAG_RISK');
    if (!ch.check && !out.length) out.push('TAG_SAFE');
    if (fx.stress > 0 && !out.length) out.push('TAG_AVOID');
    return out.length ? out : ['TAG_CAREFUL'];
  }
  /* 판정 성공 확률 */
  function pOk(ch, ctx) {
    if (!ch.check) return 1;
    try { const v = attrVal(G.player, ch.check.attr), m = checkMods(ch.check.attr, ctx && ctx.gate).sum, need = ch.check.dc - v - m; return Math.max(0.05, Math.min(1, (21 - need) / 20)); } catch (e) { return 0.5; }
  }
  /* 관계 · 기억: 상대를 믿으면 상대와 엮인 선택(친절 · 동료 · 어울림)이 오르고, 원망이 있으면 내려간다 */
  function relTerm(tags, tgt) {
    if (!tgt) return { s: 0 }; const r = relOf(tgt); if (!r) return { s: 0 };
    ensureRel(r); const t = r.to || {}, warm = ((t.RD_LIKE || 0) / 100 + (t.RD_TRUST || 0) / 100 + (t.RD_CLOSE || 0) / 100) / 3 - (t.RD_GRUDGE || 0) / 100;
    const k = tags.some(x => ['TAG_KIND', 'TAG_TEAM', 'TAG_SOCIAL', 'TAG_LOVE'].includes(x)) ? 1 : tags.some(x => ['TAG_SELFISH', 'TAG_AVOID', 'TAG_ALONE'].includes(x)) ? -1 : 0;
    const mem = (G.mindMem || []).filter(m => m.who === tgt && nowAbs() - m.t < BM().memDays * 1440);
    const mm = mem.reduce((a, m) => a + m.v, 0) * k * 0.3;
    return { s: k * warm * 0.8 + mm, key: mm < -0.05 ? 'mem' : 'rel', sign: warm >= 0 ? 1 : -1 };
  }
  /* 무작위 크기: 예측 가능성 설정 × (1 + 즉흥성 + 분노 · 들뜸) */
  function noiseSize(F) {
    const B = BM(), lv = play().predict || 'some', base = B.noise[lv] ?? B.noise.some;
    const imp = Math.max(0, (F['px:PX_ADVEN'] || 0) + (F['px:PX_EXPRESS'] || 0)) / 2;
    const hot = Math.max(F['emo:EM_ANGER'] || 0, F['emo:EM_JOY'] || 0);
    return base * (1 + B.impulse * imp + B.emoNoise * hot);
  }
  /* 고르기. opts: [{…choice}] · ctx: {who, tgt, gate, kind, extra(i)→점수 보정} → {i, reason, scores} */
  function decide(opts, ctx = {}) {
    const B = BM(), F = factors(ctx.who), wPol = ctx.who && ctx.who !== G.player ? 0 : (play().policyVsChar ?? B.policyVsChar);
    const ns = noiseSize(F), res = [];
    opts.forEach((ch, i) => {
      if (!ch || ch._off) { res.push(null); return; }
      const tags = tagsOf(ch); let s = 0, parts = [];
      tags.forEach(t => { const r = tagScore(t, F, wPol); s += r.s / Math.sqrt(tags.length); parts = parts.concat(r.parts); });
      const rl = { '주의': 0.3, '위험': 0.7, '치명적': 1 }[ch.risk] || 0; if (rl && !tags.includes('TAG_RISK')) { const r = tagScore('TAG_RISK', F, wPol); s += rl * r.s; parts = parts.concat(r.parts.map(([k, c]) => [k, c * rl])); }  /* 위험도 표시가 있으면 '위험 감수'를 그만큼 */
      if (ch.check) { const p = pOk(ch, ctx); s += (p - 0.5) * B.okWeight; if (ch.risk === '치명적') s -= (1 - p) * B.deadly * 2; else if (ch.risk === '위험') s -= (1 - p) * B.deadly * 0.5; }
      const rt = relTerm(tags, ctx.tgt); if (rt.s) { s += rt.s; parts.push([rt.key + (rt.sign < 0 ? '-' : ''), rt.s]); }
      if (ctx.extra) s += ctx.extra(ch, i) || 0;
      const nz = gauss(Math.random) * ns; s += nz;
      res.push({ i, s, parts, nz, tags });
    });
    const ok = res.filter(Boolean); if (!ok.length) return { i: -1, reason: '' };
    ok.sort((a, b) => b.s - a.s); const top = ok[0];
    const second = ok[1];
    const byNoise = second && (second.s - second.nz) - (top.s - top.nz) > 0.3;  /* 무작위가 아니었으면 확실히 다른 쪽이었을 때만 '평소답지 않게' */
    return { i: top.i, reason: whyText(top, byNoise, ctx), scores: res, tags: top.tags };
  }
  /* 이유 문장: 가장 크게 작용한 재료 하나를 mindWhy 문장 조각으로 */
  function whyText(top, byNoise, ctx) {
    if (byNoise) { const w = pickWhy('noise', 1); return w || ''; }
    const parts = top.parts.slice().sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    for (const [k, c] of parts) {
      if (Math.abs(c) < 0.08) break;
      let key = k, sign = 1;
      if (k.startsWith('pol:')) { key = 'pol'; sign = 1; }
      else if (k === 'rel' || k === 'rel-' || k === 'mem') { key = k === 'mem' ? 'mem' : 'rel'; sign = k === 'rel-' ? -1 : 1; }
      else { const F = factors(ctx.who); sign = (F[k] || 0) >= 0 ? 1 : -1; }
      const w = pickWhy(key, sign); if (w) return w;
    }
    return '';
  }
  function pickWhy(key, sign) { const L = vals('mindWhy').filter(w => w.key === key && w.sign === sign); return L.length ? pick(L).text : ''; }
  /* "{why} {p}은(는) …" 를 만들 때 쓰는 이름 */
  const callName = () => given(G.player.name);

  /* ---------- 하루: 지금 게이트에 갈까 ---------- */
  function wantRaid(again) {
    const B = BM().raid, c = G.cond;
    if (G.time < B.from || G.time > (again ? B.lateTo : B.to)) return { go: false, why: '', hard: true };
    if (c.energy < B.minEnergy || (c.hp ?? 100) < B.minHp || (G.injuries || []).some(j => j.sev >= 2)) return { go: false, why: pickWhy(c.energy < B.minEnergy ? 'st:energyLow' : 'st:injured', 1), hard: true };
    const opts = [{ t: '간다', tags: ['TAG_WORK', 'TAG_RISK', 'TAG_MONEY'] }, { t: '쉰다', tags: ['TAG_REST', 'TAG_SAFE'] }];
    const H = (G.play?.hist || []), r3 = H.filter(d => G.day - d < 3).length, r7 = H.filter(d => G.day - d < 7).length;
    const d = decide(opts, { kind: 'day', extra: (ch, i) => i === 0 ? B.base - (again ? B.againPenalty : 0) - B.load3 * r3 - B.load7 * r7 : 0 });
    return { go: d.i === 0, why: d.reason };
  }

  /* ---------- 경험이 성격을 바꾼다 ---------- */
  const DRIFT = {
    raidWin: { PX_ADVEN: 0.3, PX_PESSI: -0.3 }, raidLose: { PX_PESSI: 0.4, PX_ADVEN: -0.2 }, injuryBig: { PX_PESSI: 0.6, PX_ADVEN: -0.5 },
    allyDeath: { PX_PESSI: 0.8, PX_EXTRO: -0.3, PX_DEPEND: -0.3 }, loveStart: { PX_EXTRO: 0.3, PX_EXPRESS: 0.4 }, loveEnd: { PX_PESSI: 0.3, PX_EXPRESS: -0.3 },
    rankUp: { PX_COMPET: 0.3, PX_PESSI: -0.4 }, betrayed: { PX_DEPEND: -0.5, PX_PRAG: 0.3 }, saved: { PX_SELF: -0.4 }, kindChoice: { PX_SELF: -0.15 }, selfChoice: { PX_SELF: 0.15 },
    joinGuild: { PX_DEPEND: 0.2 }, famDeath: { PX_PESSI: 0.6, PX_EXPRESS: -0.2 }, married: { PX_ADVEN: -0.3, PX_SELF: -0.2 },
  };
  const DRIFT_NAME = { raidWin: '공략 성공', raidLose: '공략 실패', injuryBig: '큰 부상', allyDeath: '동료의 죽음', loveStart: '연애', loveEnd: '이별', rankUp: '승급', betrayed: '배신', saved: '목숨을 구함', kindChoice: '남을 도운 선택', selfChoice: '자기를 먼저 챙긴 선택', joinGuild: '길드 입단', famDeath: '가족의 죽음', married: '결혼' };
  function drift(kind, mag = 1) {
    const D = DRIFT[kind]; if (!D || !G.bio) return [];
    const B = BM(), pr = G.bio.pers || (G.bio.pers = {}), f = G.persF || (G.persF = {}), base = G.persBase || (G.persBase = { ...pr }), out = [];
    for (const [ax, w] of Object.entries(D)) {
      const cur = f[ax] ?? pr[ax] ?? 5.5, b0 = base[ax] ?? 5.5;
      let nv = cur + w * B.drift * mag; nv = Math.max(Math.max(1, b0 - B.driftMax), Math.min(Math.min(10, b0 + B.driftMax), nv));
      f[ax] = nv; const old = pr[ax] ?? Math.round(cur), ni = Math.round(nv);
      if (ni !== old) {
        pr[ax] = ni; const P = DB.ccPersonality[ax], toward = ni > old ? P.b : P.a;
        (G.persLog = G.persLog || []).push({ t: nowAbs(), ax, from: old, to: ni, why: DRIFT_NAME[kind] || kind });
        out.push(`${P.a}·${P.b} ${old}→${ni}`);
        STORY.add('pers', `${callName()}은(는) 조금 더 ${toward} 쪽이 되었다. (${DRIFT_NAME[kind] || kind})`, 2);
      }
    }
    return out;
  }
  /* 기억: 이벤트에서 상대와 있었던 일(+ 좋음, − 나쁨) */
  function note(who, v, what) { if (!who) return; (G.mindMem = G.mindMem || []).unshift({ who, v, what, t: nowAbs() }); G.mindMem.length = Math.min(G.mindMem.length, 120); }

  /* NPC: 같은 태그 점수로 받아들일지 (초대 · 권유 등). 반환 −1~+1 */
  function npcScore(who, tags) { const F = factors(who); let s = 0; tags.forEach(t => s += tagScore(t, F, 0).s); return Math.max(-1, Math.min(1, s / Math.max(1, tags.length))); }

  return { decide, tagsOf, factors, pxOf, policy, wantRaid, drift, note, npcScore, pOk, pickWhy, callName, DRIFT_NAME };
})();

/* ---------- 감정 ---------- */
const EMO = (() => {
  const st = () => G.emo || (G.emo = { v: {}, cur: 'EM_CALM', since: nowAbs(), last: nowAbs() });
  const val = id => st().v[id] || 0;
  function cur() { const E = st(); let best = 'EM_CALM', bv = 0; vals('emotions').forEach(e => { if (e.id === 'EM_CALM') return; const v = E.v[e.id] || 0; if (v >= e.show && v > bv) { bv = v; best = e.id; } }); return best; }
  /* 성격 보정: 비관적이면 불안 · 우울이 더 크게 */
  function add(id, amt, why) {
    if (!G || !DB.emotions[id] || id === 'EM_CALM') return;
    const E = st(), B = DB.balance.BAL_EMO, pe = (G.bio?.pers?.PX_PESSI ?? 5.5);
    let a = amt; if (a > 0 && (id === 'EM_ANX' || id === 'EM_SAD')) a *= 1 + B.pessiMul * (pe - 5.5) / 4.5; if (a > 0 && id === 'EM_JOY') a *= 1 - B.pessiMul * 0.5 * (pe - 5.5) / 4.5;
    E.v[id] = Math.max(0, Math.min(100, (E.v[id] || 0) + a)); changed(why);
  }
  function on(kind, why) { vals('emoTriggers').filter(t => t.on === kind).forEach(t => Object.entries(t.fx).forEach(([k, v]) => add(k, v, why))); }
  function decay(min) {
    const E = st(), B = DB.balance.BAL_EMO, ex = (G.bio?.pers?.PX_EXPRESS ?? 5.5);
    vals('emotions').forEach(e => { if (!e.half || !E.v[e.id]) return; const half = e.half * (1 - B.expressHalf * (ex - 5.5) / 4.5); E.v[e.id] *= Math.pow(0.5, min / 60 / Math.max(1, half)); if (E.v[e.id] < 1) delete E.v[e.id]; });
    changed(); sample();
  }
  function changed(why) {
    const E = st(), c = cur(); if (c === E.cur) return;
    E.cur = c; E.since = nowAbs();
    const L = vals('storyLines').filter(l => l.on === (c === 'EM_CALM' ? 'emo:calm' : 'emo:' + c) && STORY.ok(l));
    if (L.length) STORY.add('emo', STORY.fill(pick(L).text, { why }), pick(L).lv || 2, { emo: c });
    else STORY.add('emo', `${MIND.callName()}의 기분: ${DB.emotions[c].name}`, 2, { emo: c });
  }
  /* 일대기 감정 그래프용 표본 */
  function sample() {
    const E = st(), B = DB.balance.BAL_EMO, t = nowAbs(); if (t - (E.lastSample || -1e9) < B.sampleEvery) return; E.lastSample = t;
    const L = G.emoLog || (G.emoLog = []); const row = { t, c: E.cur }; vals('emotions').forEach(e => { if (E.v[e.id] >= 5) row[e.id.slice(3, 6)] = Math.round(E.v[e.id]); }); L.push(row);
    if (L.length > B.logKeep) { const keep = L.filter((x, i) => i % 2 === 0 || i > L.length - B.logKeep / 2); G.emoLog = keep; }
  }
  const name = () => DB.emotions[cur()]?.name || '평온';
  return { add, on, decay, cur, val, name, st };
})();

/* ---------- 자기 인식 (세 층 원칙의 3층) ---------- */
const SELF = (() => {
  const B = () => DB.balance.BAL_SELF;
  /* 1층 사실에서 나온 기준선 (0~100) */
  function base() {
    const p = G.player, L = looksOf(p), lk = ((L.APS_FACE ?? 10) * 2 + (L.APS_BODY ?? 10) + (L.APS_STYLE ?? 10)) / 4;
    const rankLv = DB.ranks[p.rank]?.lv ?? 20, skill = Math.max(0, Math.min(100, 30 + (20 - rankLv) * 4 + Math.min(30, p.level)));
    const fix = (DB.balance.BAL_LIFE?.fixed || []).reduce((a, x) => a + x[1], 0) || 900000, money = Math.max(0, Math.min(100, 50 + 25 * Math.log10(Math.max(1, G.money) / (fix * 3))));
    const fam = (G.relations || []).filter(r => isFam(r)).length, close = (G.relations || []).filter(r => (r.close || 0) >= 50).length, belong = Math.max(0, Math.min(100, 25 + (p.guild ? 25 : 0) + fam * 6 + close * 6));
    return { looks: Math.round((lk - 1) / 19 * 100), skill: Math.round(skill), money: Math.round(money), belong: Math.round(belong) };
  }
  /* 성격 편향: 비관적이면 낮게, 낙관적이면 높게 본다 */
  function get() {
    const b = base(), S = G.selfHeard || {}, pe = ((G.bio?.pers?.PX_PESSI ?? 5.5) - 5.5) / 4.5, band = B().band, o = {};
    Object.keys(b).forEach(k => { const v = b[k] - pe * B().pessiBias + (S[k] || 0); o[k] = Math.round(Math.max(b[k] - band, Math.min(b[k] + band, Math.max(0, Math.min(100, v))))); });
    return o;
  }
  /* 들은 말: aspect looks|skill|money|belong, v +1 칭찬 / −1 깎아내림. 비관적인 사람은 칭찬을 덜 믿는다 */
  function hear(aspect, v) { const S = G.selfHeard || (G.selfHeard = {}), pe = ((G.bio?.pers?.PX_PESSI ?? 5.5) - 5.5) / 4.5; const k = v > 0 ? 1 - Math.max(0, pe) * 0.7 : 1 + Math.max(0, pe) * 0.5; S[aspect] = Math.max(-B().band, Math.min(B().band, (S[aspect] || 0) + v * B().hearStep * k)); }
  function day() { const S = G.selfHeard || {}; Object.keys(S).forEach(k => S[k] *= 1 - B().hearDecay); }
  const label = v => v >= 75 ? '자신 있음' : v >= 55 ? '괜찮음' : v >= 40 ? '보통' : v >= 25 ? '자신 없음' : '바닥';
  return { base, get, hear, day, label };
})();

/* ---------- 이야기꾼 (B안: 개수는 정하지 않되 조용하면 조금 올리고, 몰리면 조금 낮춘다) ---------- */
const TELLER = (() => {
  const B = () => DB.balance.BAL_TELLER;
  const st = () => G.teller || (G.teller = { last: nowAbs(), log: [] });
  function note(w = 1, big) { const T = st(), t = nowAbs(); T.last = t; T.log.push([t, w, big ? 1 : 0]); T.log = T.log.filter(x => t - x[0] < B().window * 60); }
  function mul(kind) {
    if (G.prefs?.play?.teller === 'off') return 1;
    const T = st(), b = B(), t = nowAbs(), q = (t - T.last) / 60;
    let m = 1;
    if (q > b.quietH) m *= 1 + (b.maxBoost - 1) * Math.min(1, (q - b.quietH) / b.rampH);
    const big = T.log.filter(x => x[2]).length; if (big >= b.busyN) m *= b.damp;
    /* 큰일 30% · 작은 일 70%에 가깝게 (STYLE 28번) */
    const n = T.log.length || 1, share = T.log.filter(x => !x[2]).length / n;
    if (kind === 'big' && share < b.smallShare - 0.15) m *= 0.8; if (kind === 'small' && share < b.smallShare - 0.15) m *= 1.2;
    return m;
  }
  return { note, mul, st };
})();
