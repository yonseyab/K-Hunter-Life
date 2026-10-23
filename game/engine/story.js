/* =========================================================
   engine/story.js — 이야기 창 문장 생성기 · 이벤트 흐름 (K-Hunter-Life, 2026-10-23)
   STORY 행동 문장 · 이동 · 작은 일 · 만남 · 남들의 반응 · 공략 장면 · 세상 소식 · 하루 마무리 · 시작 전 인생.
         상세도 3단계 (1 요약 · 2 보통 · 3 자세히, 설정 › 문장). 문장 재료는 storyLines (data/base/b_story.js · 외주).
   EVT   이벤트 선택지를 직접 고르거나(멈춤) 판단 엔진에 맡긴다(자동 결정). 결과 · 이유를 이야기 창에 남긴다.
   ========================================================= */
const STORY = (() => {
  const listeners = [];
  const lvMax = () => ({ summary: 1, normal: 2, detail: 3 })[(G && G.prefs && G.prefs.play && G.prefs.play.detail) || 'detail'] || 3;
  /* 조사 맞추기: 이(가) · 은(는) · 을(를) · 와(과) · (으)로 · (이)다 · 아(야) → 앞 글자 받침으로 */
  const JONG_DIGIT = { 0: 1, 1: 1, 3: 1, 6: 1, 7: 1, 8: 1 };
  function josa(t) {
    return String(t).replace(/([가-힣A-Za-z0-9])(?:\]|\)|')?(이\(가\)|은\(는\)|을\(를\)|와\(과\)|\(으\)로|\(이\)다|아\(야\)|이\(라\))/g, (m, ch, j) => {
      const c = ch.charCodeAt(0); let has, rieul = false;
      if (c >= 0xAC00 && c <= 0xD7A3) { const jg = (c - 0xAC00) % 28; has = jg > 0; rieul = jg === 8; } else if (/[0-9]/.test(ch)) { has = !!JONG_DIGIT[ch]; rieul = ch === '1' || ch === '7' || ch === '8'; } else has = /[lmnr]/i.test(ch);
      const pre = m.slice(0, m.length - j.length);
      const pick = { '이(가)': has ? '이' : '가', '은(는)': has ? '은' : '는', '을(를)': has ? '을' : '를', '와(과)': has ? '과' : '와', '(으)로': has && !rieul ? '으로' : '로', '(이)다': has ? '이다' : '다', '아(야)': has ? '아' : '야', '이(라)': has ? '이라' : '라' }[j];
      return pre + pick;
    });
  }
  function add(k, s, lv = 2, extra) {
    if (!G || !s) return null; s = josa(s);
    const it = Object.assign({ t: nowAbs(), k, s: String(s), lv }, extra || {});
    if (it.who && typeof ACTIVE !== 'undefined') ACTIVE.mark(it.who);
    LIFE_LOG.add(it);
    if (['event', 'choice', 'raid', 'mile', 'small', 'meet', 'react', 'pers'].includes(k) && lv <= 2) { G.storyMark = (G.storyMark || 0) + 1; }
    listeners.forEach(f => { try { f(it); } catch (e) { } });
    return it;
  }
  const on = f => listeners.push(f);
  const visible = it => it.lv <= lvMax();

  /* 조건 · 단정 검사 (세 층 원칙: 단정하는 사실이 맞을 때만) */
  function ok(l, tgt) {
    try { if (l.req && !l.req.every(q => checkReq(q, tgt))) return false; if (l.asserts && !l.asserts.every(q => checkReq(q, tgt))) return false; return true; } catch (e) { return false; }
  }
  function lines(on, tgt) { return vals('storyLines').filter(l => l.on === on && ok(l, tgt)); }
  function pickLine(on, tgt) { const L = lines(on, tgt); return L.length ? pickW(L) : null; }

  /* 체격 · 무기 · 파티 소개 */
  function build(h) {
    if (!h) return ''; const ht = h.height || h.look?.LK_HEIGHT, wt = h.weight || h.look?.LK_WEIGHT; if (!ht || !wt) return '';
    const bmi = wt / ((ht / 100) ** 2), tall = ht >= (h.sex === '여' ? 172 : 184), small = ht <= (h.sex === '여' ? 156 : 166);
    return (tall ? (bmi >= 27 ? '거구' : '키가 큰') : small ? (bmi >= 26 ? '다부진 단신' : '작은 체구') : bmi >= 28 ? '덩치 있는' : bmi < 19 ? '호리호리한' : '보통 체격') + ` ${ht}cm`;
  }
  function gear(h) { if (!h || h.id === G.player.id) { const w = equipped('SLOT_WEAPON'); return w ? w.name : '맨손'; } const c = DB.classes[h.cls]; return c ? ({ CC_MELEE: '검', CC_RANGED: '활', CC_MAGIC: '지팡이', CC_SUPPORT: '방패와 구급 가방', CC_SPECIAL: '단검' })[c.cat] || '무기' : '무기'; }
  function who(h) { if (!h) return ''; const r = DB.roles[h.roleMain]?.name || '', c = DB.classes[h.cls]?.name || '', b = build(h); return `${h.name}(${[r, c].filter(Boolean).join(' · ')}${b ? ', ' + b : ''})`; }
  function partyText(R) { const ms = R.party.map(p => p.id === G.player.id ? G.player : H(p.id)).filter(Boolean); return ms.length > 1 ? `${ms.map(who).join(', ')}.` : `${who(G.player)} 혼자.`; }

  /* 자리 표시 채우기 */
  function fill(t, c = {}) {
    const p = G.player, dt = dateOf(G.day);
    const base = { p: given(p.name), P: p.name, rank: DB.ranks[p.rank]?.name || '', cls: DB.classes[p.cls]?.name || '미확인', role: DB.roles[p.roleMain]?.name || '', gear: gear(p), build: build(p), region: regionName(locOf().region), place: placeName(locOf()), date: `${dt.m}월 ${dt.d}일 (${dt.w})` };
    const v = Object.assign(base, c);
    return String(t).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m).replace(/^\s+/, '');
  }

  /* ---------- 행동 · 이동 ---------- */
  function act(a, dur) {
    if (!a || dur < 15) return; const U = G._narr || (G._narr = {});
    const key = a.id + '|' + Math.floor(nowAbs() / 30); if (U.lastAct === a.id && nowAbs() - (U.lastActT || 0) < dur + 30) { U.lastActT = nowAbs(); return; }
    U.lastAct = a.id; U.lastActT = nowAbs();
    const l = pickLine('act:' + a.id) || pickLine('cat:' + a.cat);
    if (l) add('act', fill(l.text), l.lv ?? 3, { act: a.id }); else add('act', `${a.name}.`, 3, { act: a.id });
  }
  function move(min, toName) { if (min < 20 && (G._narr || {}).lastMoveTo === toName) return; (G._narr = G._narr || {}).lastMoveTo = toName; if (min < 12) return; const l = pickLine('move'); add('move', fill(l ? l.text : '{to}(으)로 간다.', { to: toName, min }), l?.lv ?? 3); }

  /* ---------- 작은 일 · 만남 · 반응 ---------- */
  function placeKey() { return locOf().pt || 'PT_HOME'; }
  function smallTick(hours, travelling) {
    const B = DB.balance.BAL_SMALL, pk = travelling ? 'TRAVEL' : placeKey(), em = EMO.cur();
    const p = 1 - Math.pow(1 - B.perHour * (B.placeMul[pk] ?? 1) * (B.moodMul[em] ?? 1) * TELLER.mul('small'), hours);
    if (Math.random() < p) {
      const L = lines('small:' + pk).concat(lines('small:any')).filter(l => !(G._smallSeen || []).includes(l.id)); if (!L.length) { G._smallSeen = []; return; }
      const l = pickW(L); (G._smallSeen = G._smallSeen || []).push(l.id); if (G._smallSeen.length > Math.max(5, Math.floor(L.length * 0.6))) G._smallSeen.shift();
      const fx = fxApply(l.fx); add('small', fill(l.text), l.lv ?? 2, fx ? { fx } : null); TELLER.note(1, false);
    }
    if (!travelling) meetTick(hours);
  }
  /* 같은 시간 · 장소에 있는 아는 사람. 가깝고 자주 만나는 사람이 더 자주 */
  function meetTick(hours) {
    const B = DB.balance.BAL_SMALL, here = locOf(); if (here.pt === 'PT_HOME' && !homeOf().partner) return;
    const p = 1 - Math.pow(1 - B.meetPerHour * TELLER.mul('small'), hours); if (Math.random() >= p) return;
    const cand = [];
    (G.relations || []).forEach(r => { if (isFam(r) && r.id === homeOf().partner) return; const w = npcWhere(r.id); if (!w || w.region !== here.region) return; if (w.pt && here.pt && w.pt !== here.pt && here.pt !== 'PT_CAFE') return; cand.push({ id: r.id, w: (1 + (r.close || 0) / 20) * (typeof ACTIVE !== 'undefined' ? ACTIVE.meetMul(r.id) : 1) }); });
    if (!cand.length) { reactTick(); return; }
    const c = pickW(cand), r = relOf(c.id); ensureRel(r);
    const t = r.to || {}, jealous = (t.RD_RIVAL || 0) + (t.RD_GRUDGE || 0) >= 50 || (r.from?.RD_RIVAL || 0) >= 50;
    if (jealous && Math.random() < 0.5) { const j = pickLine('react:jealous'); if (j) { const fx = fxApply(j.fx); SELF.hear('looks', -0.5); add('react', fill(j.text, { who: nameOf(c.id) }), j.lv ?? 2, fx ? { fx } : null); EMO.on('insulted'); if (typeof ACTIVE !== 'undefined') ACTIVE.feel(c.id, 'EM_ANGER', 0.2); return; } }
    const l = pickLine('meet', c.id); if (!l) return;
    const fx = fxApply(l.fx, c.id); add('meet', fill(l.text, { who: nameOf(c.id), rel: DB.relTypes[r.rel]?.name || '' }), l.lv ?? 2, { who: c.id, fx }); EMO.on('social'); TELLER.note(1, false); if (typeof ACTIVE !== 'undefined') ACTIVE.feel(c.id, 'EM_JOY', 0.2);
    G.lastMeet = nowAbs();
  }
  /* 모르는 사람의 반응 (2층). 사실(외모 점수)에 묶여 있다 */
  function reactTick() {
    if (Math.random() > 0.35) return; const L = looksOf(G.player), f = L.APS_FACE ?? 10;
    const on = f >= 15 ? 'react:looksHi' : f <= 7 ? 'react:looksLo' : null; if (!on) return;
    const l = pickLine(on); if (!l) return; const stranger = pick(['옆자리 사람', '카페 직원', '지나가던 학생', '협회 창구 직원', '택시 기사']);
    add('react', fill(l.text, { who: stranger }), l.lv ?? 2); SELF.hear('looks', on === 'react:looksHi' ? 1 : -0.3); if (on === 'react:looksHi') EMO.on('praised');
  }
  /* 작은 효과 */
  function fxApply(fx, tgt) {
    if (!fx) return null; const c = G.cond, out = [];
    if (fx.stress) { c.stress = clamp(c.stress + fx.stress); out.push('스트레스 ' + (fx.stress > 0 ? '+' : '') + fx.stress); }
    if (fx.energy) { c.energy = clamp(c.energy + fx.energy, 0, energyMax()); out.push('기력 ' + (fx.energy > 0 ? '+' : '') + fx.energy); }
    if (fx.money) { G.money += fx.money; const dt = dateOf(G.day); G.ledger.unshift([`${dt.m}/${dt.d}`, '생활', fx.money]); out.push(won(fx.money)); }
    if (fx.emo) Object.entries(fx.emo).forEach(([k, v]) => EMO.add(k, v));
    if (fx.rel) { const [t, k, v] = fx.rel, id = t === 'T' ? tgt : t, r = id && relOf(id); if (r) relAdd(r, REL_KEY[k] || k, v, 'both'); }
    return out.length ? out : null;
  }

  /* ---------- 공략 장면 (입장 → 구역 → 위기 → 보스 → 결과) ---------- */
  function raidScene(R, res) {
    if (!R) return; const g = DB.gates[R.gid]; if (!g) return; const mob = DB.monsters[g.mon]?.name || '몬스터';
    const alive = R.party.filter(p => p.hp > 0), nm = () => pick(R.party).n.split(' ')[0];
    const ctx = { gate: g.name, rank: DB.ranks[g.rank].name, type: g.type, party: partyText(R), terrain: g.terrain, m: mob };
    let l = pickLine('raid:enter'); add('raid', fill(l ? l.text : '{gate} 진입.', ctx), 1, { gid: g.id });
    let zone = 1;
    for (const [t, c, s] of R.log) {
      if (c === 'e' && /구역으로 진입/.test(s)) { zone++; l = pickLine('raid:zone'); add('raid', fill(l ? l.text : `${zone}구역.`, { ...ctx, n: zone, a: nm() }), l?.lv ?? 2); }
      else if (c === 'e' && /보스룸/.test(s)) { l = pickLine('raid:boss'); add('raid', fill(l ? l.text : '보스룸.', ctx), 1); }
      else if (c === 'c') add('raid', s, 2, { crisis: true });
      else if (c === 'w') add('raid', s, 2);
      else if (c === 'k' && / — /.test(s)) add('raid', s.replace(/\[([^\]]+)\]/, '[$1]'), 2);
      else if (c === 'h' && / — /.test(s)) add('raid', s, 2);
      else if (c === 'h' && /부상:/.test(s)) add('raid', s, 2);
      else if (c === 'h') { const m = s.match(/−(\d+)/); l = pickLine('raid:hurt'); add('raid', l ? fill(l.text, { ...ctx, b: (s.match(/(\S+)이\(가\) 피해|(\S+)의 방어/) || [])[1] || nm(), n: m ? m[1] : '?' }) : s, 3); }
      else if (c === 'k') { l = pickLine('raid:fight'); add('raid', l ? fill(l.text, { ...ctx, a: nm() }) : s, 3); }
      else if (c === 'e' && /후퇴/.test(s)) { l = pickLine('raid:retreat'); add('raid', fill(l ? l.text : s, { ...ctx, a: nm() }), 2); }
      else if (/마석 \d+개/.test(s)) { l = pickLine('raid:stone'); add('raid', fill(l ? l.text : s, { ...ctx, n: (s.match(/\d+/) || [1])[0] }), 3); }
    }
    if (res) { l = pickLine(res.ok ? 'raid:win' : 'raid:lose'); add('raid', fill(l ? l.text : (res.ok ? '{gate} 클리어.' : '{gate}에서 물러난다.'), { ...ctx, exp: res.exp, money: won(res.pay || (R.share || 0)) }), 1, { gid: g.id, ok: res.ok }); }
  }

  /* ---------- 세상 소식 ---------- */
  function newsLine(n) {
    if (!n) return; const B = DB.balance.BAL_SMALL, d = G.day, cnt = (G._newsCnt && G._newsCnt.d === d) ? G._newsCnt : (G._newsCnt = { d, n: 0 });
    if (cnt.n >= B.newsPerDay + 1) return; if (Math.random() > (n.big ? 1 : 0.35)) return; cnt.n++;
    const l = pickLine('world:news'); add('news', fill(l ? l.text : '[뉴스] {title}', { title: n.title }), l?.lv ?? 2);
  }
  function flavorTick(hours) {
    const B = DB.balance.BAL_SMALL; if (Math.random() < 1 - Math.pow(1 - B.rumorPerDay / 24, hours)) { const r = (G.rumors || [])[0]; if (r && !r._told) { r._told = 1; const l = pickLine('world:rumor'); add('news', fill(l ? l.text : '[소문] {title}', { title: r.text || r.t || '' }), 2); } }
  }

  /* ---------- 하루 마무리 · 일대기 기록 ---------- */
  function dayEnd(day) {
    const t0 = day * 1440, t1 = t0 + 1440, L = (G.timeLog || []).filter(x => x.t >= t0 && x.t < t1), by = {};
    L.forEach(x => { const a = DB.actions[x.act]; if (!a) return; by[a.cat] = (by[a.cat] || 0) + x.dur; });
    const dayStories=LIFE_LOG.dayRows(day),raids = dayStories.filter(x => x.k === 'raid' && x.ok != null), big = dayStories.filter(x => ['event', 'choice', 'mile'].includes(x.k));
    const parts = []; if (raids.length) parts.push(`게이트 ${raids.length}곳 (${raids.filter(x => x.ok).length} 클리어)`);
    if (by.ACC_TRAIN >= 60) parts.push(`훈련 ${Math.round(by.ACC_TRAIN / 60)}시간`); if (by.ACC_WORK >= 60) parts.push(`일 ${Math.round(by.ACC_WORK / 60)}시간`); if (by.ACC_SOCIAL >= 60) parts.push(`사람 만남 ${Math.round(by.ACC_SOCIAL / 60)}시간`);
    const m0 = G._dayMoney ?? G.money, dm = G.money - m0; if (Math.abs(dm) >= 10000) parts.push(`돈 ${dm > 0 ? '+' : '−'}${Math.abs(Math.round(dm / 10000))}만 원`);
    parts.push(`기분 ${EMO.name()}`);
    const dt = dateOf(day), l = pickLine('day:end');
    add('day', fill(l ? l.text : '{date} 끝. {summary}', { date: `${dt.m}월 ${dt.d}일`, summary: parts.join(' · ') + '.' }), 1, { dayEnd: day });
    (G.chron = G.chron || []).push({ d: day, raid: raids.length, win: raids.filter(x => x.ok).length, tr: by.ACC_TRAIN || 0, wk: by.ACC_WORK || 0, so: by.ACC_SOCIAL || 0, money: G.money, dm, emo: EMO.cur(), notes: big.slice(0, 3).map(x => x.s.slice(0, 60)) });
    if (G.chron.length > 4000) G.chron.splice(0, G.chron.length - 4000);
    G._dayMoney = G.money;
    if (!(by.ACC_SOCIAL >= 60) && !(G.lastMeet > t0)) EMO.on('alone'); else EMO.on('social');
  }
  function dayStart() { const l = pickLine('day:start'); add('day', fill(l ? l.text : '{date}.'), l?.lv ?? 2, { dayStart: G.day }); G._dayMoney = G.money; }

  /* ---------- 시작 전 인생 (커마 값 요약) ---------- */
  function prologue() {
    const p = G.player, bg = G.bio?.bg || {}, age = p.age || 25, bp = DB.ccBirthplaces?.[p.birthplace]?.name || '어딘가', gateAge = age - 27;
    const bgNames = ['BI_FAMENV', 'BI_EDU', 'BI_JOB', 'BI_FINANCE', 'BI_PAST'].map(k => { const v = bg[k]; const ids = Array.isArray(v) ? v : v ? [v] : []; return ids.map(id => DB.bgOpts?.[id]?.name).filter(Boolean).join(', '); }).filter(Boolean);
    const ctx = { age, bplace: bp, sinceGate: Math.max(0, (2026 - age) - 1999), gateAge: Math.max(0, gateAge), bgline: bgNames.length ? bgNames.join(' · ') + '.' : '평범하게 살아왔다.' };
    vals('storyLines').filter(l => l.on === 'prologue' && ok(l)).forEach(l => add('prologue', fill(l.text, ctx), 1));
  }
  function pickW(L) { let t = L.reduce((a, c) => a + (c.w ?? 1), 0), r = Math.random() * t; for (const c of L) { r -= c.w ?? 1; if (r <= 0) return c; } return L[L.length - 1]; }
  return { josa, add, on, visible, lvMax, ok, lines, pickLine, fill, act, move, smallTick, meetTick, reactTick, fxApply, raidScene, newsLine, flavorTick, dayEnd, dayStart, prologue, who, build, partyText };
})();

/* =========================================================
   EVT — 이벤트 선택지: 직접 고르기 · 자동 결정 · 멈춤 판단
   ========================================================= */
const EVT = (() => {
  const play = () => (G.prefs && G.prefs.play) || {};
  const okChoice = (c, tgt) => !c.req || c.req.every(q => { try { return checkReq(q, tgt); } catch (e) { return false; } });
  /* 아직 답하지 않은 이벤트 (알림 · 메시지) */
  function pending() {
    const out = [];
    (G.alerts || []).forEach(m => { if (m.ev && !m.resolved && DB.events[m.ev]) out.push({ type: 'alert', m, ev: DB.events[m.ev], tgt: m.who || null, t: m.t || 0 }); });
    (G.threads || []).forEach(th => { if (th.event && !th.event.resolved && DB.events[th.event.id]) out.push({ type: 'thread', th, ev: DB.events[th.event.id], tgt: th.event.tgt, t: th.event.t || 0 }); });
    return out.sort((a, b) => b.t - a.t);
  }
  /* 이벤트 종류 (멈춤 설정) */
  function kindOf(ev) {
    if (ev.kind) return ev.kind; const all = (ev.choices || []).map(c => c.okFx || {});
    if (ev.from && String(ev.from).startsWith('GD_')) return 'SK_CONTRACT';
    if (ev.to && /REL:REL_(MOTHER|FATHER|SISTER|BROTHER|OSIS|OBRO|GRAND|GRANDPA|SPOUSE|CHILD|STEP)/.test(ev.to)) return 'SK_FAMILY';
    if (all.some(f => f.relStatus || (f.relDim || []).some(x => x[1] === 'RD_ROMANCE'))) return 'SK_LOVE';
    if (all.some(f => f.injury || (f.hp || 0) < -20)) return 'SK_DEATH';
    if (all.some(f => Math.abs(f.money || 0) >= 300000)) return 'SK_MONEY';
    return ev.ch === 'alert' && ev.from === 'SYS_ALERT' ? 'SK_WORLD' : 'SK_SOCIAL';
  }
  /* 이 이벤트에서 멈출까 (설정 › 멈춤) */
  function stopWanted(ev) {
    if(choicePrefs().delegate)return false;
    const P = play(); if (P.autoDecide === false) return true;
    const mode = P.stop || 'big'; if (mode === 'none') return false;
    const k = kindOf(ev), K = DB.stopKinds[k], on = (P.kinds || {})[k] ?? K?.dflt ?? true;
    if (!on) return false; if (mode === 'each') return true; return !!K?.big;
  }
  function stopKindOn(kind) { const P = play(), mode = P.stop || 'big'; if (mode === 'none') return false; const K = DB.stopKinds[kind], on = (P.kinds || {})[kind] ?? K?.dflt ?? true; if (!on) return false; return mode === 'each' || !!K?.big; }
  /* 화면에 보일 제목 · 본문 (이미 자리 표시가 채워진 알림 · 메시지에서) */
  function texts(x) {
    if (x.type === 'alert') return { subj: x.m.subj || tpl(x.ev.subj || '', x.tgt, null), body: x.m.body || '' };
    const n = (x.ev.lines || []).length, msgs = (x.th.msgs || []).filter(m => m.from === x.tgt).slice(-n).map(m => m.t);
    return { subj: tpl(x.ev.subj || '', x.tgt, null), body: (msgs.length ? msgs : (x.ev.lines || []).map(l => tpl(l, x.tgt, null))).join(' / ') };
  }
  /* 결과 적용 (직접 · 자동 공통). how: 'me' | 'auto' */
  function resolve(x, idx, how, reason) {
    const ev = x.ev, c = ev.choices[idx]; if (!c) return null;
    const judgement = judge(c), { ok, line } = judgement, f = applyFx(ok ? c.okFx : c.ngFx, x.tgt || undefined), res = ok ? c.ok : c.ng;
    if (x.type === 'alert') { x.m.unread = false; x.m.resolved = `${line}<b>${esc(c.t)}</b><div style="margin-top:4px">${esc(res || '')}</div>${fxChips(f)}`; x.m.how = how; }
    else { x.th.msgs.push({ from: 'ME', t: c.t, tm: hhmm(G.time) }); x.th.msgs.push({ sys: `${line}${esc(res || '')}${fxChips(f)}` }); x.th.event.resolved = true; x.th.unread = 0; }
    const nm = MIND.callName(), sj = tpl(ev.subj || '', x.tgt, null);
    const head = how === 'auto' ? `${reason ? reason + ' ' : ''}${nm}은(는) '${c.t}' 쪽을 고른다.` : `${nm}은(는) '${c.t}' 쪽을 고른다.`;
    STORY.add('choice', `${head} ${res ? STORY.fill(tpl(res, x.tgt, null)) : ''}${f.length ? ` [${f.join(' · ')}]` : ''}`, 1, { ev: ev.id, how, subj: sj });
    const tags = MIND.tagsOf(c); if (x.tgt) MIND.note(x.tgt, tags.some(t => ['TAG_KIND', 'TAG_SOCIAL', 'TAG_TEAM', 'TAG_LOVE'].includes(t)) ? 1 : tags.some(t => ['TAG_SELFISH', 'TAG_AVOID'].includes(t)) ? -1 : 0, ev.id);
    if (tags.includes('TAG_KIND')) MIND.drift('kindChoice', 0.5); else if (tags.includes('TAG_SELFISH')) MIND.drift('selfChoice', 0.5);
    TELLER.note(2, true);
    return { ok, f, judgement, text:res?STORY.fill(tpl(res,x.tgt,null)):'', choice:c.t };
  }
  /* 판단 엔진에 맡기기 */
  function auto(x) {
    const opts = x.ev.choices.map(c => okChoice(c, x.tgt) ? c : Object.assign({}, c, { _off: true }));
    const d = MIND.decide(opts, { tgt: x.tgt, kind: 'event' }); if (d.i < 0) return null;
    return resolve(x, d.i, 'auto', d.reason);
  }
  /* 새 이벤트가 생겼을 때 (실시간 재생 중) → 멈춤 문구 또는 null */
  function arrived() {
    const L = pending(); if (!L.length) return null; const x = L[0];
    const message = x.type === 'alert' ? x.m : x.th.event;
    if (!message._told) { message._told = true; const T = texts(x); STORY.add('event', `${x.ev.ch === 'alert' ? '[소식]' : '[대화 · ' + nameOf(x.tgt) + ']'} ${T.subj}${T.body ? ' — ' + T.body.slice(0, 90) : ''}`, 1, { ev: x.ev.id }); }
    if (stopWanted(x.ev)) { G.pendingPick = true; return `${DB.stopKinds[kindOf(x.ev)]?.name || '사건'} — <b>${esc(texts(x).subj)}</b>`; }
    auto(x); return null;
  }
  return { texts, okChoice, pending, kindOf, stopWanted, stopKindOn, resolve, auto, arrived };
})();
