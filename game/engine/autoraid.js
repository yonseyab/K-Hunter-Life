/* =========================================================
   engine/autoraid.js — 자동 공략 (2026-10-23, 사용자: "진행")
   자동 일과(ROUTINE.run) 중에 조건이 맞으면 주변 게이트를 골라 신청 · 파티 구성 · 공략까지 한다.
   위기 선택지는 플레이어가 정한 방침(G.prefs.autoRaid.policy)과 선택지 성향(style)으로 고른다.
   style 이 없는 옛 위기는 inferStyle 로 추정한다. 수치는 data/goals.js BAL_AUTORAID.
   설정(G.prefs.autoRaid): on 'on'|'off' · minParty 최소 인원(나 포함) · policy safe|balanced|profit|team · retreat 파티 평균 HP% 후퇴선 · km 거리 · perDay 하루 최대 · grade easy|fit|hard · minEnergy 시작 기력
   ========================================================= */
const AUTORAID = (() => {
  const B = () => DB.balance.BAL_AUTORAID;
  const P = () => prefs().autoRaid;
  const POLICY = { safe: '안전 우선', balanced: '균형', profit: '수익 우선', team: '동료 우선' };
  const GRADE = { easy: '쉬운 게이트', fit: '내 등급에 맞게', hard: '도전' };

  /* 선택지 성향: 데이터에 style 이 있으면 그대로, 없으면 효과 · 판정 · 위험도로 추정 */
  function inferStyle(ch) {
    if (ch.style) return ch.style;
    const fx = ch.okFx || {};
    if (fx.retreat) return 'escape';
    if (ch.needParty) return 'team';
    if (!ch.check) return 'safe';
    if (fx.stones || fx.loot) return 'greedy';
    if (ch.risk === '위험' || ch.risk === '치명적') return 'bold';
    return 'careful';
  }
  /* 판정 성공 확률 (능력치 + d20 + 보정 ≥ dc) */
  function pOk(ch, g) {
    if (!ch.check) return 1;
    const v = attrVal(G.player, ch.check.attr), m = checkMods(ch.check.attr, g).sum, need = ch.check.dc - v - m;
    return Math.max(0, Math.min(1, (21 - need) / 20));
  }
  /* 위기에서 고르기 → 선택지 번호 */
  /* 위기 선택: 판단 엔진(MIND) — 성격 · 감정 · 상태 · 방침 × 선택지 태그 (K-Hunter-Life). 이유는 공략 기록에 남긴다 */
  function choose(R, C) {
    if (typeof MIND !== 'undefined') {
      const g = DB.gates[R.gid], alive = R.party.filter(p => p.hp > 0).length, hp = R.party[0].hp, low = hp < P().retreat + B().lowHpMargin;
      const opts = C.choices.map(ch => ch.needParty && alive < 2 ? Object.assign({}, ch, { _off: true }) : ch);
      const d = MIND.decide(opts, { gate: g, kind: 'crisis', extra: ch => low && ['escape', 'safe'].includes(inferStyle(ch)) ? 0.6 : 0 });
      if (d.i >= 0) { const nm = MIND.callName(); R.log.push([R.t, 'w', `${d.reason ? d.reason + ' ' : ''}${nm}은(는) '${typeof crisisText === 'function' && UI.raid === R ? crisisText(C.choices[d.i].t) : C.choices[d.i].t}' 쪽을 고른다.`]); return d.i; }
    }
    return chooseOld(R, C);
  }
  function chooseOld(R, C) {
    const g = DB.gates[R.gid], W = B().weights[P().policy] || B().weights.balanced, alive = R.party.filter(p => p.hp > 0).length;
    const hp = R.party[0].hp, low = hp < P().retreat + B().lowHpMargin;
    let best = -1, bs = -1;
    C.choices.forEach((ch, i) => {
      if (ch.needParty && alive < 2) return;
      const st = inferStyle(ch), p = pOk(ch, g);
      let s = (W[st] ?? 1) * (ch.check ? 0.25 + 0.75 * p : 1);
      if (ch.risk === '치명적') s *= P().policy === 'profit' ? p : p * p;
      if (low && (st === 'escape' || st === 'safe')) s *= B().lowHpBoost;
      s *= 1 + Math.random() * 0.05;
      if (s > bs) { bs = s; best = i; }
    });
    return best < 0 ? C.choices.findIndex(ch => !ch.check) : best;
  }

  /* 갈 수 있는 게이트: 열림 · 허가를 받을 수 있음(협회 개방, 또는 이미 허가) · 입장 가능한 등급 · 거리 · 남은 시간 */
  function gates() {
    const here = locOf().region, me = DB.ranks[G.player.rank].lv, A = P();
    const L = vals('gates').filter(g => {
      const st = gateSt(g.id); if (st.status !== 'open' || gateFit(G.player, g)) return false;
      if (!hasPermit(g) && (g.owner || g.bid)) return false;
      if (gateLeft(g) < B().minLeftMin) return false;
      return kmBetween(here, g.region) <= A.km;
    });
    const want = A.grade === 'easy' ? x => -DB.ranks[x.rank].lv : A.grade === 'hard' ? x => DB.ranks[x.rank].lv : x => Math.abs(DB.ranks[x.rank].lv - me);
    return L.sort((a, b) => want(a) - want(b) || kmBetween(here, a.region) - kmBetween(here, b.region));
  }
  /* 파티: 지금 파티(같은 게이트에 맞으면) → 공격대 · 길드원 · 협회 매칭 중 이 게이트에 맞는 사람, 역할을 고르게 */
  function party(g) {
    const cap = partyCap(g), me = G.player, seen = new Set([me.id]), out = [];
    const pool = [...raidCands(), ...SIM.freeNear(g.region, DB.ranks[g.rank].lv, 8)].filter(h => h && h.status !== '사망' && !gateFit(h, g));  /* 게이트 근처 무소속 헌터도 (시골 지역은 사는 곳 매칭만으로는 사람이 없다) */
    const need = ['ROLE_TANK', 'ROLE_HEAL', 'ROLE_RDPS', 'ROLE_SUP', 'ROLE_SCOUT', 'ROLE_MDPS', 'ROLE_MAGE'].filter(r => r !== me.roleMain);
    need.forEach(r => { if (out.length < cap - 1) { const m = pool.find(h => h.roleMain === r && !seen.has(h.id)); if (m) { seen.add(m.id); out.push(m.id); } } });
    pool.forEach(h => { if (out.length < cap - 1 && !seen.has(h.id)) { seen.add(h.id); out.push(h.id); } });
    return out;
  }
  function today() { const a = (G.autoRaid = G.autoRaid || { day: -1, n: 0, log: [] }); if (a.day !== G.day) { a.day = G.day; a.n = 0; } return a; }
  /* 지금 갈 수 있나 → 이유(못 가면) 또는 null */
  function blocked() {
    const A = P(), c = G.cond, b = B();
    if (A.on !== 'on') return '자동 공략 꺼짐';
    if (G.dead || raidActive() || G.inGate) return '공략 중';
    if (G.time < b.startFrom || G.time > b.startTo) return '공략 시간대 아님';
    if (c.energy < A.minEnergy) return '기력이 시작 기준보다 낮음';
    if ((c.hp ?? 100) < b.minHp) return 'HP가 낮음';
    if ((G.injuries || []).some(j => j.sev >= 2)) return '중상 치료가 먼저';
    return null;
  }
  /* 자동 일과에서 한 번 부른다 → 공략했으면 결과, 아니면 null */
  function tick() {
    if (blocked()) return null;
    const g = gates()[0]; if (!g) { today().none = G.day; return null; }
    const st = gateSt(g.id), prev = UI.screen;
    if (!hasPermit(g)) { st.permit = true; advanceClock(DB.actions.ACT_GATE_APPLY.durs[0]); }
    const mates = party(g); if (mates.length + 1 < P().minParty) { today().solo = G.day; return null; }  /* 혼자 가지 않기 */
    UI.prep = { gid: g.id, party: mates, retreat: P().retreat };
    startRaid(g.id);
    if (!UI.raid || UI.raid.gid !== g.id || UI.screen !== 'raid') { UI.prep = null; UI.screen = prev; return { gid: g.id, fail: '도착했을 때 이미 닫힘' }; }
    clearInterval(UI._rt); const R = UI.raid; R.auto = true; let k = 0;
    while (!R.done && !G.dead && k++ < 6000) { if (R.crisis) { const C = DB.crises[R.crisis.id]; resolveCrisis(choose(R, C)); } else raidTick(); }
    clearInterval(UI._rt); UI.prep = null;
    if (G.dead) return { gid: g.id, dead: true };
    const res = UI.raidResult || {}, out = { t: nowAbs(), day: G.day, gid: g.id, name: g.name, rank: DB.ranks[g.rank].name, ok: !!res.ok, pay: res.pay || 0, sold: R.sold || 0, exp: res.exp || 0, inj: (res.inj || []).length, mates: R.party.length - 1, crises: R.crN || 0, hp: Math.round(R.party[0].hp), why: res.ok ? '' : String((R.log[R.log.length - 1] || [])[2] || '').slice(0, 80) };
    const a = today(); a.n++; a.log.unshift(out); a.log.length = Math.min(a.log.length, B().logKeep);
    UI.screen = prev; return out;
  }
  /* 일과 화면용 설정 패널 */
  function panelHTML() {
    const A = P(), opt = (v, cur, t) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${t}</option>`, why = blocked(), next = A.on === 'on' ? gates()[0] : null, last = (G.autoRaid?.log || [])[0];
    return `<div class="panel" style="margin-bottom:14px"><div class="ph">자동 공략 <span class="dim" style="font-weight:400">일과를 맡기면 조건이 맞을 때 주변 게이트를 골라 공략합니다</span></div><div class="pb">
      <div class="row" style="flex-wrap:wrap;gap:8px">
        <div class="field"><label for="ar-on">자동 공략</label><select id="ar-on" data-gpref="autoRaid.on">${opt('off', A.on, '끔')}${opt('on', A.on, '켬')}</select></div>
        <div class="field"><label for="ar-pol">위기 방침</label><select id="ar-pol" data-gpref="autoRaid.policy">${Object.entries(POLICY).map(([k, n]) => opt(k, A.policy, n)).join('')}</select></div>
        <div class="field"><label for="ar-gr">게이트 고르기</label><select id="ar-gr" data-gpref="autoRaid.grade">${Object.entries(GRADE).map(([k, n]) => opt(k, A.grade, n)).join('')}</select></div>
        <div class="field"><label for="ar-km">거리</label><select id="ar-km" data-gpref="autoRaid.km">${[5, 10, 20, 40].map(k => opt(k, A.km, k + 'km 안')).join('')}</select></div>
        <div class="field"><label for="ar-pd">하루 최대</label><select id="ar-pd" data-gpref="autoRaid.perDay">${[1, 2, 3].map(k => opt(k, A.perDay, k + '회')).join('')}</select></div>
        <div class="field"><label for="ar-rt">후퇴 (파티 평균 HP)</label><select id="ar-rt" data-gpref="autoRaid.retreat">${[20, 35, 50, 65].map(k => opt(k, A.retreat, k + '% 아래')).join('')}</select></div>
        <div class="field"><label for="ar-mp">파티</label><select id="ar-mp" data-gpref="autoRaid.minParty">${opt(1, A.minParty, '혼자도 간다')}${opt(2, A.minParty, '2명 이상')}${opt(3, A.minParty, '3명 이상')}</select></div>
        <div class="field"><label for="ar-me">시작 기력</label><select id="ar-me" data-gpref="autoRaid.minEnergy">${[40, 60, 80].map(k => opt(k, A.minEnergy, k + ' 이상')).join('')}</select></div>
      </div>
      <div class="muted" style="font-size:12px;margin-top:6px">${A.on !== 'on' ? '꺼져 있으면 공략은 직접 합니다.' : `${B().startFrom / 60}~${B().startTo / 60}시에 기력 ${A.minEnergy} 이상 · HP ${B().minHp}% 이상 · 중상 없음이면 출발합니다. 협회 개방 게이트는 단말기로 자동 신청하고, 입찰 게이트는 낙찰받은 것만 갑니다. 위기는 '${POLICY[A.policy]}' 방침으로 고릅니다.`}
        ${A.on === 'on' ? `<div>지금: ${why ? esc(why) : G.autoRaid?.solo === G.day ? '함께 갈 헌터를 못 구해 오늘은 쉬는 중' : next ? `출발 가능 · 다음 후보 ${rkBadge(next.rank)} ${esc(next.name)} (${regionName(next.region)})` : '주변에 갈 수 있는 게이트가 없음'}</div>` : ''}
        ${last ? `<div>최근: ${dateOf(last.day).m}/${dateOf(last.day).d} ${last.rank}급 ${esc(last.name)} — ${last.ok ? '성공' : '후퇴'}${last.pay ? ' · 배분금 ' + won(last.pay) : ''}${last.sold ? ' · 자동 판매 ' + won(last.sold) : ''} · EXP +${last.exp}${last.inj ? ' · 부상 ' + last.inj : ''}</div>` : ''}</div>
    </div></div>`;
  }
  return { tick, choose, inferStyle, gates, party, blocked, panelHTML, POLICY };
})();
