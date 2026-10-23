/* =========================================================
   engine/play.js — 실시간 재생 엔진 (K-Hunter-Life, 2026-10-23)
   하루 30초(×1). ▶ · 일시정지 · 배속(×1 · ×2 · ×5 · ×20) · 다음 사건까지. 화면 위 시계가 실제로 움직인다.
   매 틱마다 분 단위로 runTime 을 잘게 돌린다 (자정을 넘을 때는 배경 인구 계산을 워커 결과로 받는다).
   하루 일정은 판단 엔진이 정하고(ROUTINE.plan + MIND.wantRaid), 이벤트는 멈춤 설정에 따라 멈추거나 자동 결정한다.
   중요한 공략 위기는 인생 화면의 선택 카드로 답하고 자동 공략을 이어 간다.
   상태는 화면용(PLAY.S)이고, 저장할 것은 G.play (배속 · 오늘 공략 수 등) 뿐이다.
   ========================================================= */
const PLAY = (() => {
  const B = () => DB.balance.BAL_PLAY;
  const S = { running: false, speed: 1, mode: 'run', timer: null, busy: false, stop: null, nextFrom: 0, nextMark: 0, lastPlanned: -1 };
  const st = () => G.play || (G.play = { day: -1, raids: 0, lastRaidAt: -1e9, decided: -1 });

  function minPerTick() { return 1440 / B().secPerDay * S.speed * B().tickMs / 1000; }
  function start(mode) {
    if (!G || G.dead) return;
    if (UI.raid && !UI.raid.done) { if (UI.raid.crisis) { S.stop = '공략 위기에서 선택이 필요합니다'; ui(); return; } const r = continueRaid(); if (r?.stop) { S.stop = r.stop; ui(); return; } }
    if (EVT.pending().some(x => EVT.stopWanted(x.ev))) { G.pendingPick = true; S.stop = '답할 사건이 있습니다'; ui(); return; }
    S.mode = mode || 'run'; S.running = true; S.stop = null; G.pendingPick = false; G.retroOpen = null;
    if (S.mode === 'next') { S.nextFrom = nowAbs(); S.nextMark = G.storyMark || 0; }
    clearInterval(S.timer); S.timer = setInterval(tick, B().tickMs); ui();
  }
  function pause(reason) { S.running = false; clearInterval(S.timer); S.timer = null; if (reason) { S.stop = reason; STORY.add('sys', '⏸ ' + String(reason).replace(/<[^>]+>/g, ''), 1); } ui(); }
  function setSpeed(x) { S.speed = x; if (G) st().speed = x; if (S.mode === 'next') S.mode = 'run'; ui(); }
  const isRunning = () => S.running;

  /* 한 틱 */
  async function tick() {
    if (S.busy) return; if (!G || UI.mode !== 'app' || G.dead) { pause(); return; }
    if (UI.raid && !UI.raid.done && UI.raid.crisis) { pause('공략 위기에서 선택이 필요합니다'); return; }
    S.busy = true;
    try {
      const t0 = performance.now(), mode = S.mode;
      do {
        const r = await step(mode === 'next' ? B().nextChunk : minPerTick()); if (r) { pause(r); break; }
        if (mode === 'next') {
          if ((G.storyMark || 0) !== S.nextMark) { S.mode = 'run'; pause('사건이 생겼습니다'); break; }
          if (nowAbs() - S.nextFrom > B().nextMaxDays * 1440) { S.mode = 'run'; pause(`${B().nextMaxDays}일 동안 큰일이 없었습니다`); break; }
        }
      } while (mode === 'next' && S.running && performance.now() - t0 < 60);
    } catch (e) { console.error(e); pause('오류로 멈췄습니다: ' + e.message); }
    finally { S.busy = false; }
    ui();
  }
  /* 분 단위 진행 (테스트 · QA 봇도 이걸 쓴다) → 멈춤 문구 또는 null */
  async function step(min) {
    ensureTime(); if (G.dead) return '끝';
    const now = nowAbs(), mid = (G.day + 1) * 1440, target = now + Math.max(1, Math.round(min));
    if (target >= mid) await SIM.ensure(G.day + 1);
    return stepSync(Math.max(1, Math.round(min)));
  }
  function stepSync(min) {
    ensureTime(); if (G.dead) return '끝';
    if (UI.raid && !UI.raid.done) return UI.raid.crisis ? '공략 위기에서 선택이 필요합니다' : continueRaid()?.stop || null;
    OBSERVE.notices();
    const P = st(), B0 = B();
    if (P.day !== G.day) dayChange();
    /* 하루 계획 (planAt 시각이 지나면 한 번) */
    if (P.decided !== G.day && G.time >= B0.planAt) { P.decided = G.day; planDay(); }
    /* 게이트에 갈까 — 캐릭터 판단 (하루 최대 횟수 같은 고정 제한 없음) */
    const raid = maybeRaid(); if (raid && raid.stop) return raid.stop;
    if (G.dead) return '끝';
    const stopK = G.pendingPick ? '답할 사건이 있습니다' : null; if (stopK) return stopK;
    const target = nowAbs() + min, e0 = G.cond.energy, money0 = G.money;
    UI.playRunning = true; let r;
    try { r = runTime(null, { until: target, span: true, e0, lines: [], ups: [] }); } finally { UI.playRunning = false; }
    EMO.decay(min); STORY.smallTick(min / 60, false); STORY.flavorTick(min / 60);
    if (G.money < 0 && money0 >= 0) EMO.on('moneyShort');
    LIFE.watch(); OBSERVE.notices();
    if (UI.autoDue && !raidActive()) { UI.autoDue = false; autoSave(); }
    if (G.dead) return '끝';
    if (r && r.stop) return r.stop;
    if (G.retroOpen) return '고비 — ' + (DB.milestoneTypes[G.retroOpen.id]?.name || '');
    return null;
  }
  function dayChange() {
    const P = st(); if (P.day >= 0) STORY.dayEnd(P.day < G.day ? G.day - 1 : P.day);
    P.day = G.day; P.raids = 0; P.lastRaidAt = -1e9; SELF.day(); STORY.dayStart();
  }
  /* 오늘 일정: 수동 모드가 아니면 목표 · 성격에 맞춰 다시 짠다 (ROUTINE.plan = NPC 와 같은 효용 엔진) */
  function planDay() {
    try { ROUTINE.plan(); } catch (e) { }
    const L = (G.schedule[wd(G.day)] || []).filter(b => DB.actions[b.act] && !['ACT_MEAL', 'ACT_SLEEP'].includes(b.act)).map(b => `${hhmm(b.at)} ${DB.actions[b.act].name}`);
    const l = STORY.pickLine('day:plan'); if (L.length) STORY.add('day', STORY.fill(l ? l.text : '오늘 할 일 — {plan}.', { plan: L.slice(0, 5).join(', ') }), l?.lv ?? 3);
  }
  /* ---------- 공략 (판단 엔진이 가고 말지 · 어디로 · 위기 선택을 정한다) ---------- */
  function maybeRaid() {
    const P = st(), A = prefs().autoRaid, BM = DB.balance.BAL_MIND.raid;
    if (A.on === 'off' || G.dead || raidActive() || G.inGate || UI.raid && !UI.raid.done) return null;
    if (G.time < BM.from || G.time > BM.lateTo) return null;
    if (nowAbs() - P.lastRaidAt < 90) return null;
    /* 오늘 게이트에 갈지는 아침에 한 번, 다녀온 뒤 한 군데 더 갈지는 한 번씩만 생각한다 */
    if (P.gd !== G.day) { P.gd = G.day; P.gateDay = null; P.againAsked = 0; }
    if (P.gateDay === false) return null;
    const again = P.raids > 0; if (again && P.againAsked === P.raids) return null;
    const w = MIND.wantRaid(again); if (again) P.againAsked = P.raids;
    if (!w.go) { if (w.hard && !again && G.time < BM.to - 120) return null; P.gateDay = false; const l = STORY.pickLine(again ? 'decide:stop' : 'decide:rest'); if (l) STORY.add('decide', STORY.fill(l.text, { why: w.why || '' }), l.lv ?? 3); return null; }
    P.gateDay = true;
    const g = pickGate(); if (!g) { if (P.noGate !== G.day) { P.noGate = G.day; STORY.add('decide', `주변에 갈 만한 게이트가 없다.`, 3); } return null; }
    const mates = AUTORAID.party(g); if (mates.length + 1 < (A.minParty || 1)) { if (P.solo !== G.day) { P.solo = G.day; STORY.add('decide', `같이 갈 사람을 못 구해 오늘은 접는다.`, 3); } return null; }
    const l = STORY.pickLine(again ? 'decide:again' : 'decide:raid'); STORY.add('decide', STORY.fill(l ? l.text : '{p}은(는) 게이트로 간다.', { why: w.why || '' }), l?.lv ?? 2);
    return runRaid(g, mates);
  }
  /* 갈 게이트: 가까운 후보 몇 개 중 판단 엔진이 고른다 (어려운 곳 = 위험 감수 · 욕심, 쉬운 곳 = 안전) */
  function pickGate() {
    const L = AUTORAID.gates().slice(0, 6); if (!L.length) return null; const me = DB.ranks[G.player.rank].lv, here = locOf().region;
    const opts = L.map(g => { const gap = me - DB.ranks[g.rank].lv; return { t: g.name, tags: gap >= 2 ? ['TAG_RISK', 'TAG_GREEDY'] : gap <= -2 ? ['TAG_SAFE', 'TAG_CAREFUL'] : ['TAG_CAREFUL', 'TAG_WORK'], _g: g, _km: kmBetween(here, g.region) }; });
    const d = MIND.decide(opts, { kind: 'gate', extra: o => -o._km / 25 }); return d.i >= 0 ? opts[d.i]._g : L[0];
  }
  function runRaid(g, mates) {
    const P = st(), prev = UI.screen, A = prefs().autoRaid, st0 = gateSt(g.id); (P.hist = P.hist || []).push(G.day); if (P.hist.length > 30) P.hist.shift();
    if (!hasPermit(g)) { st0.permit = true; advanceClock(DB.actions.ACT_GATE_APPLY.durs[0]); }
    UI.prep = { gid: g.id, party: mates, retreat: A.retreat || 35 }; UI.playRaid = true;
    startRaid(g.id);
    if (!UI.raid || UI.raid.gid !== g.id || UI.raid.done) { UI.prep = null; UI.playRaid = false; UI.screen = prev; STORY.add('raid', `${g.name}에 도착했지만 게이트는 이미 닫혀 있다.`, 2); P.lastRaidAt = nowAbs(); return null; }
    clearInterval(UI._rt); UI.raid.auto = true; UI.screen = prev; UI.prep = null;
    return continueRaid();
  }
  function continueRaid() {
    const P = st(), R = UI.raid; if (!R || R.done) return null;
    UI.playRaid = true; R.auto = true; clearInterval(UI._rt); let k = 0;
    while (!R.done && !G.dead && k++ < 6000) {
      if (R.crisis) {
        const C = DB.crises[R.crisis.id];
        if (crisisStop(R, C)) {
          UI.prep = null; UI.screen = 'life'; P.lastRaidAt = nowAbs();
          P.pendingRaid = R;
          if (R._shownCrisis !== R.crisis) { R._shownCrisis = R.crisis; STORY.add('raid', `위기 — ${C.title}. 중요한 결정을 앞두고 멈춘다.`, 1); }
          render(); return { stop: `공략 위기 — ${C.title}` };
        }
        const i = AUTORAID.choose(R, C); resolveCrisis(i);
      } else raidTick();
    }
    if (!R.done && !G.dead) { R.done = true; addLog('e', '공략이 길어져 안전하게 철수한다.'); finishRaid(false); }
    clearInterval(UI._rt); UI.prep = null; UI.playRaid = false;
    delete P.pendingRaid;
    if (!R._counted) { P.raids++; R._counted = true; } P.lastRaidAt = nowAbs();
    if (!G.dead) UI.screen = 'life';
    LIFE.watch(); OBSERVE.notices();
    return null;
  }
  function chooseCrisis(i) {
    const R = UI.raid, C = R?.crisis && DB.crises[R.crisis.id]; if (!C || G.dead) return;
    if (i == null) i = AUTORAID.choose(R, C);
    const ch = C.choices[i]; if (!ch || ch.needParty && R.party.filter(p => p.hp > 0).length < 2 || ch.req && !ch.req.every(q => checkReq(q))) return;
    STORY.add('choice', `${MIND.callName()}은(는) '${crisisText(ch.t)}' 쪽을 고른다.`, 1);
    const choiceText=crisisText(ch.t),okText=crisisText(ch.ok||''),ngText=crisisText(ch.ng||'');
    UI.playRaid = true; resolveCrisis(i);const judgement=R.lastCheck;
    if (R.done || G.dead) { if (!R._counted) { st().raids++; R._counted = true; } st().lastRaidAt = nowAbs(); delete st().pendingRaid; UI.playRaid = false; LIFE.watch(); }
    else { const r = continueRaid(); if (r?.stop) S.stop = r.stop; }
    S.stop = UI.raid && !UI.raid.done ? '공략 위기에서 선택이 필요합니다' : null;
    UI.screen = G.dead ? 'gameover' : 'life'; render();
    return {judgement,choice:choiceText,text:judgement.ok?okText:ngText};
  }
  /* 위기에서 멈출까: '공략 위기' 종류가 켜져 있거나, 죽을 위험(치명적 선택 · HP 낮음)이 켜져 있을 때 */
  function crisisStop(R, C) {
    if(choicePrefs().delegate)return false;
    if (EVT.stopKindOn('SK_CRISIS')) return true;
    const deadly = C.choices.some(c => c.risk === '치명적') || R.party[0].hp < 35;
    return deadly && EVT.stopKindOn('SK_DEATH') && (G.prefs?.play?.stop || 'big') !== 'none';
  }
  /* 공략이 끝나면 (자동 · 직접 모두): 장면 서술 · 감정 · 성격 */
  function afterRaid(R, res) {
    if (!R || !res) return;
    STORY.raidScene(R, res); TELLER.note(2, true);
    EMO.on(res.ok ? 'raidWin' : 'raidLose'); MIND.drift(res.ok ? 'raidWin' : 'raidLose', 0.25);
    if ((res.inj || []).length) EMO.on('injury');
    R.party.slice(1).forEach(p => { if (p.hp <= 0) EMO.on('allyHurt'); });
    if (!R.auto && UI.playRaid !== true) { st().raids++; st().lastRaidAt = nowAbs(); }
  }
  /* 실시간 재생 중 이벤트가 생기면 runTime 이 부른다 → 멈춤 문구 또는 null */
  function onEvent() { return EVT.arrived(); }
  function restoreRaid() {
    S.running = false; clearInterval(S.timer); S.timer = null; S.stop = null;
    clearInterval(UI._rt); UI._rt = null;
    const R = st().pendingRaid;
    UI.raid = R && !R.done && !G.dead ? R : null;
    UI.playRaid = !!UI.raid;
    if (UI.raid) { UI.raid.auto = true; G.inGate = R.gid; S.stop = '공략 위기에서 선택이 필요합니다'; }
    else if (G.inGate) G.inGate = null;
  }

  /* 화면 갱신 (전체를 다시 그리지 않는다) */
  let uiHook = null; const onUi = f => uiHook = f;
  function ui() { try { uiHook && uiHook(S); } catch (e) { console.error(e); } }

  /* 테스트 · QA: n분 동기 진행 (워커 대기 없이) */
  function runSync(totalMin, chunk = 60) { let left = totalMin, out = null; while (left > 0 && !G.dead) { const m = Math.min(chunk, left); out = stepSync(m); left -= m; if (out) break; } return out; }
  return { raid: runRaid, chooseCrisis, restoreRaid, S, start, pause, setSpeed, isRunning, tick, step, stepSync, runSync, onEvent, afterRaid, onUi, ui, st, planDay, maybeRaid, pickGate };
})();
