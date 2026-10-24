/* =========================================================
   engine/combat.js — 전투 시스템 (2026-10-24 사용자 결정: 실시간 통계 시뮬, 상세 인물까지)
   데이터 · 규칙 설명은 data/combat.js 머리 주석. 수치는 BAL_COMBAT.
   - unit: 전투원 하나 (헌터 · 몬스터 공통). fromHunter / fromLevel / fromMonster 로 만든다
   - fight(party, foes): 교전 하나를 0.5초 단위로 끝까지 돌린다 → {res:'win'|'flee'|'wipe', t(초), ev(큰 장면), kills}
   - encounter(g, lv, kind, n): 게이트 구성에서 몬스터 무리 · 보스를 뽑는다
   - npcRaid(units, g): NPC 파티 공략 한 번 (구역 → 교전 → 보스) → {ok, down[], hurt[], min}
   - stepRaid(R): 내 헌터 공략 (index.html raidTick 이 한 구간씩 부른다)
   Math.random 대신 COMBAT.rnd 를 쓴다 (검사에서 바꿀 수 있게)
   ========================================================= */
const COMBAT = (() => {
  const B = () => DB.balance.BAL_COMBAT;
  const api = { rnd: Math.random };
  const R = () => api.rnd();
  const cl = (v, a, b) => v < a ? a : v > b ? b : v;
  const pickOne = L => L[Math.floor(R() * L.length)];
  const josa = s => typeof STORY !== 'undefined' ? STORY.josa(s) : s;
  const fillT = (t, u, tg) => josa(String(t).replace(/\{u\}/g, u?.name || '').replace(/\{t\}/g, tg?.name || '').replace(/\{m\}/g, u?.name || ''));

  /* ---------- 능력치 ---------- */
  const levelOfRank = lv => Math.round(B().rankLevel[0] + (20 - lv) * B().rankLevel[1]);
  /* 등급 숫자 → 그 급 헌터가 보통 쓰는 장비 등급 보정 (NPC · 몬스터 기준) */
  const gearOfRank = lv => lv >= 17 ? 1 : lv >= 13 ? 2 : lv >= 9 ? 4 : lv >= 5 ? 7 : 11;
  function typicalStats(L) {
    const T = B().typical, st = {}; for (const k of ['STAT_BODY', 'STAT_MIND', 'STAT_MANA', 'STAT_SENSE']) st[k] = T[k][0] + T[k][1] * L;
    return { stats: st, abl: T.ablBase + T.ablPer * L };
  }
  /* src: {stats, abl(객체 또는 숫자), level, role, gearAtk(무기 등급 보정), gearDef(방어구 등급 보정)} → 전투 능력치 */
  function derive(src) {
    const K = B().hunter, rs = B().roleStat[src.role] || B().roleStat.ROLE_MDPS, s = src.stats, a = id => typeof src.abl === 'number' ? src.abl : (src.abl?.[id] ?? 8);
    const L = src.level || 1;
    return {
      max: Math.round((K.hpBase + s.STAT_BODY * K.hpBody + L * K.hpLv) * rs.hp),
      mpMax: Math.round(K.mpBase + s.STAT_MANA * K.mpMana),
      atk: (s.STAT_BODY * K.atkBody + (a('ABL_A01') + a('ABL_A02')) * K.atkAbl + (src.gearAtk || 0) * K.gearAtk) * rs.atk,
      mag: (s.STAT_MANA * K.magMana + (a('ABL_A09') + a('ABL_A07')) * K.magAbl + (src.gearAtk || 0) * K.gearAtk) * rs.mag,
      def: (s.STAT_BODY * K.defBody + a('ABL_A04') * K.defAbl + (src.gearDef || 0) * K.gearDef) * rs.def,
      res: (s.STAT_MIND * K.resMind + a('ABL_A28') * K.resAbl + (src.gearDef || 0) * K.gearDef * 0.6) * rs.res,
      acc: a('ABL_A02') * K.accAbl, eva: a('ABL_A03') * K.evaAbl, crit: K.critBase + a('ABL_A06') * K.critAbl,
      spd: rs.spd * (1 - cl(a('ABL_A16'), 0, 30) * 0.008), magic: !!rs.magic,
    };
  }
  function unit(o) {
    return { hp: o.max, mp: o.mpMax ?? 100, mpMax: o.mpMax ?? 100, se: [], threat: 0, next: R() * 1.2, down: false, dealt: 0, healed: 0, kills: 0, taken: 0, cds: {}, weak: [], resist: [], immune: [], moves: [], ...o };
  }
  /* 헌터 (상세 인물 · 나). opt.hpPct · mpPct 시작 HP · MP(%) */
  function fromHunter(h, opt = {}) {
    const me = typeof G !== 'undefined' && G.player && h.id === G.player.id;
    const pr = !me && typeof hsOf === 'function' && DB.hunters?.[h.id] ? hsOf(h) : h;
    const lv = DB.ranks[pr.rank || h.rank]?.lv ?? 20, gw = me && typeof GEAR !== 'undefined' ? GEAR.bonus(GEAR.at('SLOT_WEAPON')) : gearOfRank(lv);
    const ga = me && typeof GEAR !== 'undefined' ? (GEAR.bonus(GEAR.at('SLOT_TOP')) + GEAR.bonus(GEAR.at('SLOT_BOTTOM'))) / 2 : gearOfRank(lv);
    const stats = pr.stats || h.stats || typicalStats(pr.level || h.level || 1).stats, abl = pr.abl || h.abl || typicalStats(pr.level || 1).abl;
    return hunterUnit({ id: h.id, name: h.name, role: h.roleMain || 'ROLE_MDPS', level: pr.level || h.level || 1, stats, abl, gearAtk: gw, gearDef: ga, skills: h.skills || [] }, opt);
  }
  /* 레벨 · 역할만 아는 사람 (배경 인구) */
  function fromLevel(o, opt = {}) { const t = typicalStats(o.level || 1), lv = o.rankLv ?? 20; return hunterUnit({ ...o, stats: t.stats, abl: t.abl, gearAtk: gearOfRank(lv), gearDef: gearOfRank(lv), skills: [] }, opt); }
  function hunterUnit(src, opt) {
    const d = derive(src), u = unit({ side: 'P', id: src.id, name: src.name, role: src.role, level: src.level, ...d });
    u.moves = movesOf(src.role, src.skills); u.hp = Math.round(u.max * cl((opt.hpPct ?? 100) / 100, 0.01, 1)); u.mp = Math.round(u.mpMax * cl((opt.mpPct ?? 100) / 100, 0, 1));
    u.threatMul = src.role === 'ROLE_TANK' ? B().threat.tank : 1;
    return u;
  }
  /* 역할 기본 기술 + 스킬에 붙은 기술 (skills.move). 스킬 레벨 1당 위력 · 치유 +5% */
  function movesOf(role, skills) {
    const L = (B().roleMoves[role] || []).map(id => ({ id, mul: 1 }));
    (skills || []).forEach(([sid, lv]) => { const k = DB.skills?.[sid]; if (k?.move && DB.combatMoves[k.move] && !L.some(x => x.id === k.move)) L.unshift({ id: k.move, mul: 1 + 0.05 * ((lv || 1) - 1), skill: sid }); });
    return L.filter(x => DB.combatMoves[x.id]);
  }
  /* 몬스터. lv = 게이트 등급 숫자 */
  function monsterStats(m, lv) {
    const C = B(), r = DB.monsterRoles?.[m.mrole] || DB.monsterRoles?.MR_BRUTE || {}, k = m.boss ? C.boss : C.mob, s = m.stat || {};
    const L = levelOfRank(lv), t = typicalStats(L), base = derive({ stats: t.stats, abl: t.abl, level: L, role: r.magic ? 'ROLE_MAGE' : 'ROLE_MDPS', gearAtk: gearOfRank(lv), gearDef: gearOfRank(lv) });
    const raw = derive({ stats: t.stats, abl: t.abl, level: L, role: 'ROLE_MDPS', gearAtk: gearOfRank(lv), gearDef: gearOfRank(lv) });
    const mul = (key, def = 1) => (r[key] ?? def) * (k[key] ?? 1) * (s[key] ?? 1);
    return {
      max: Math.max(1, Math.round(raw.max * mul('hp') * (C.sizeHp[m.size] ?? 1))), mpMax: 100,
      atk: raw.atk * mul('atk'), mag: base.mag * mul('mag', r.magic ? 1 : 0.6), def: raw.def * mul('def'), res: raw.res * mul('res'),
      acc: raw.acc + (r.acc || 0) + (k.acc || 0) + (s.acc || 0), eva: raw.eva + (r.eva || 0) + (k.eva || 0) + (s.eva || 0) + (C.sizeEva[m.size] ?? 0), crit: raw.crit + (r.crit || 0) + (s.crit || 0),
      spd: 2.0 * (r.spd ?? 1) * (k.spd ?? 1) * (s.spd ?? 1), magic: !!r.magic,
    };
  }
  /* 등급 차 압력: 높은 등급 게이트일수록 '같은 급' 기준보다 더 세게 (등급 하나 차이가 레벨이 높아도 똑같이 무겁도록).
     파티 등급 plv 보다 게이트가 gap 등급 높으면, 몬스터 전력(HP × 공격)을 gapPow^gap ÷ (레벨 차로 이미 생긴 전력 비) 배 */
  function pressure(lv, plv) {
    if (plv == null || plv === lv) return 1; const T = B().typical.STAT_BODY, gap = plv - lv;
    const nat = Math.pow((T[0] + T[1] * levelOfRank(lv)) / (T[0] + T[1] * levelOfRank(plv)), 2);
    return Math.sqrt(Math.pow(B().gapPow, gap) / nat);
  }
  function fromMonster(m, lv, n, plv) {
    const d = monsterStats(m, lv), r = DB.monsterRoles?.[m.mrole] || {}, f = pressure(lv, plv);
    if (f !== 1) { d.max = Math.max(1, Math.round(d.max * f)); d.atk *= f; d.mag *= f; }
    return unit({ side: 'M', id: m.id + (n ? '#' + n : ''), mon: m.id, name: m.name, boss: !!m.boss, ...d, el: m.el || null, weak: m.weak || [], resist: m.resist || [], immune: m.immune || [],
      moves: (m.moves || []).filter(id => DB.combatMoves[id]).map(id => ({ id, mul: 1 })), target: m.target || r.target || 'near', flee: m.flee || 0, enrage: m.boss ? (m.enrage ?? B().boss.enrageAt) : 0 });
  }

  /* ---------- 상태 ---------- */
  const seOf = id => DB.statusEffects[id];
  const has = (u, id) => u.se.some(x => x.id === id);
  function addSe(u, id, dur, t) { if (!seOf(id) || u.immune.includes(id) || u.down) return false; const e = u.se.find(x => x.id === id); if (e) e.until = Math.max(e.until, t + dur); else u.se.push({ id, until: t + dur }); return true; }
  function mult(u, key) { let v = 1; for (const x of u.se) { const s = seOf(x.id)?.stat; if (s && s[key] != null) v *= s[key]; } return v; }
  const alive = L => L.filter(u => !u.down);
  const pct = u => u.hp / u.max;

  /* ---------- 고르기 ---------- */
  function whenOk(w, u, ally, foe, t) {
    if (!w || w === 'always') return true;
    if (w === 'allyLow') return alive(ally).some(x => pct(x) < 0.55);
    if (w === 'selfLow') return pct(u) < 0.4;
    if (w === 'crowd') return alive(foe).length >= 3;
    if (w === 'notTarget') return alive(foe).some(f => f.tgt && f.tgt !== u.id);
    if (w === 'start') return t < 6;
    return true;
  }
  function chooseMove(u, ally, foe, t) {
    for (const mv of u.moves) {
      const M = DB.combatMoves[mv.id]; if ((u.cds[mv.id] || 0) > t || (M.mp || 0) > u.mp) continue;
      if (!whenOk(M.when, u, ally, foe, t)) continue;
      if (M.kind === 'heal' && !alive(ally).some(x => pct(x) < 0.8)) continue;
      if (M.kind === 'buff' && M.target !== 'self' && M.se && alive(ally).every(x => M.se.every(e => has(x, e.se)))) continue;
      if (M.target === 'enemies' && alive(foe).length < 2 && M.kind !== 'debuff') continue;
      return { M, mul: mv.mul };
    }
    return null;
  }
  function pickFoe(u, foe) {
    const L = alive(foe); if (!L.length) return null;
    if (u.side === 'M') {
      const tn = L.find(x => has(x, 'SE_TAUNT')); if (tn && R() < 0.85) return tn;
      if (u.target === 'weak') return L.reduce((a, b) => pct(b) < pct(a) ? b : a);
      if (u.target === 'back') { const bk = L.filter(x => ['ROLE_HEAL', 'ROLE_MAGE', 'ROLE_RDPS', 'ROLE_SUP'].includes(x.role)); if (bk.length && R() < 0.7) return pickOne(bk); }
      if (u.target === 'random') return pickOne(L);
      /* near: 위협이 큰 쪽 */
      if (R() < 0.75) return L.reduce((a, b) => b.threat * (b.threatMul || 1) > a.threat * (a.threatMul || 1) ? b : a);
      return pickOne(L);
    }
    /* 헌터: 탱커는 보스 · 큰 놈, 딜러는 약한 놈부터 (빨리 숫자를 줄인다), 나머지는 아무나 */
    if (u.role === 'ROLE_TANK') return L.find(x => x.boss) || L.reduce((a, b) => b.max > a.max ? b : a);
    if (['ROLE_MDPS', 'ROLE_RDPS', 'ROLE_SCOUT'].includes(u.role)) return L.reduce((a, b) => b.hp < a.hp ? b : a);
    return pickOne(L);
  }
  const lowAlly = ally => alive(ally).reduce((a, b) => pct(b) < pct(a) ? b : a, alive(ally)[0]);

  /* ---------- 피해 ---------- */
  function hit(S, u, tg, M, mul, t) {
    const C = B(), magic = M ? M.stat === 'mag' : u.magic, el = M?.el || (u.side === 'M' ? u.el : null);
    const chance = cl(C.hitBase + u.acc - tg.eva, C.hitMin, C.hitMax) / 100;
    if (!magic && R() > chance) return 0;
    let base = (magic ? u.mag * mult(u, 'mag') : u.atk * mult(u, 'atk')) * (M ? M.power ?? 1 : 1) * (mul || 1);
    if (base <= 0) return 0;
    const df = (magic ? tg.res * mult(tg, 'res') : tg.def * mult(tg, 'def'));
    let d = base * base / (base + df);
    const crit = R() * 100 < u.crit + (M?.crit || 0); if (crit) d *= C.critMul;
    if (el && tg.weak.includes(el)) d *= C.weakMul; if (el && tg.resist.includes(el)) d *= C.resistMul;
    d *= mult(tg, 'dmgIn') * (C.dmgRand[0] + R() * (C.dmgRand[1] - C.dmgRand[0]));
    d = Math.max(1, Math.round(d));
    tg.hp -= d; tg.taken += d; u.dealt += d; u.threat += d * B().threat.dmg;
    if (M?.drain) { const g = Math.round(d * M.drain); u.hp = Math.min(u.max, u.hp + g); }
    if (tg.side === 'P' && d >= tg.max * C.down.bigHit) S.big.push(tg.id);
    if (crit && d >= tg.max * 0.3 && tg.side === 'M') S.note(t, '', `${u.name}의 치명타가 ${tg.name}에게 꽂힌다.`, 2);
    (M?.se || []).forEach(e => { if (tg.hp > 0 && R() < e.chance && addSe(tg, e.se, e.dur || seOf(e.se)?.dur || 5, t) && tg.boss) S.note(t, '', josa(`${tg.name}이(가) ${seOf(e.se).name} 상태가 됐다.`), 3); });
    if (!M && el) { const s2 = (DB.elements[el]?.se || [])[0]; if (s2 && R() < 0.12) addSe(tg, s2, seOf(s2)?.dur || 5, t); }
    if (tg.hp <= 0) kill(S, u, tg, t);
    return d;
  }
  function kill(S, u, tg, t) {
    tg.hp = 0; tg.down = true; tg.se = []; if (u) u.kills++;
    if (tg.side === 'P') S.note(t, 'h', josa(`${tg.name}이(가) 쓰러졌다 — ${u ? u.name + '의 공격' : '상처가 깊다'}.`), 1);
    else if (tg.boss) S.note(t, 'k', josa(`${tg.name}이(가) 쓰러졌다 — ${u ? u.name + '의 마지막 일격' : ''}.`), 1);
  }
  function heal(S, u, tg, amt) { if (tg.down) return 0; const g = Math.min(tg.max - tg.hp, Math.round(amt)); tg.hp += g; u.healed += g; u.threat += g * B().threat.heal; return g; }

  /* ---------- 교전 ---------- */
  /* party · foes: unit 배열. 반환 {res, t, ev, kills, big} — ev: [t, c, 문장, 중요도 1~3] */
  function fight(party, foes, opt = {}) {
    const C = B(), dt = C.tick, S = { ev: [], big: [], used: new Set(), note(t, c, s, lv) { S.ev.push([Math.round(t), c, s, lv]); } };
    [...party, ...foes].forEach(u => { u.next = R() * 1.2; u.cds = {}; u.threat = 0; u.tgt = null; u.se = u.se.filter(x => seOf(x.id)?.kind === 'buff' && x.until > 1e8); });
    let t = 0, res = null;
    while (t < C.maxFight) {
      t += dt;
      for (const u of [...party, ...foes]) {
        if (u.down) continue;
        u.se = u.se.filter(x => x.until > t);
        for (const x of u.se) { const s = seOf(x.id); if (s.dot) { u.hp -= u.max * s.dot * dt; if (u.hp <= 0) { kill(S, null, u, t); break; } } if (s.hot) u.hp = Math.min(u.max, u.hp + u.max * s.hot * dt); }
      }
      for (const u of [...party, ...foes]) {
        if (u.down || u.next > t) continue;
        const ally = u.side === 'P' ? party : foes, foe = u.side === 'P' ? foes : party;
        if (!alive(foe).length) break;
        if (u.se.some(x => seOf(x.id)?.skip)) { u.next = t + dt; continue; }
        if (u.enrage && !u.raged && pct(u) <= u.enrage) { u.raged = true; addSe(u, 'SE_ENRAGE', 999, t); S.note(t, 'h', josa(`${u.name}이(가) 격노한다 — 공격이 거세진다.`), 1); }
        if (u.flee && pct(u) < u.flee && !u.boss) { u.down = true; u.fled = true; S.note(t, '', josa(`${u.name}이(가) 달아난다.`), 3); continue; }
        const pick = chooseMove(u, ally, foe, t), M = pick?.M;
        if (M) { u.cds[M.id] = t + (M.cd || 0); u.mp -= M.mp || 0; }
        if (M && !S.used.has(u.id + M.id) && M.lines?.use) { S.used.add(u.id + M.id); const tg0 = M.target === 'enemy' ? pickFoe(u, foe) : M.target === 'ally' ? lowAlly(ally) : null; S.note(t, '', fillT(pickOne(M.lines.use), u, tg0), u.boss || u.side === 'P' ? 2 : 3); }
        if (!M || M.kind === 'attack' || M.kind === 'debuff') {
          const targets = M?.target === 'enemies' ? alive(foe).sort(() => R() - 0.5).slice(0, M.area || 3) : [pickFoe(u, foe)];
          targets.forEach(tg => { if (!tg) return; u.tgt = tg.id; for (let k = 0; k < (M?.hits || 1) && !tg.down; k++) { if (M?.kind === 'debuff' && !(M.power > 0)) { (M.se || []).forEach(e => { if (R() < e.chance) addSe(tg, e.se, e.dur, t); }); break; } hit(S, u, tg, M, pick?.mul, t); } });
        } else if (M.kind === 'heal') {
          const amt = u.mag * mult(u, 'mag') * M.heal * (pick.mul || 1);
          (M.target === 'allies' ? alive(ally) : [lowAlly(ally)]).forEach(x => heal(S, u, x, amt * (M.target === 'allies' ? 1 : 1)));
        } else if (M.kind === 'buff' || M.kind === 'taunt') {
          (M.target === 'self' ? [u] : M.target === 'ally' ? [lowAlly(ally)] : alive(ally)).forEach(x => (M.se || []).forEach(e => addSe(x, e.se, e.dur, t)));
          if (M.kind === 'taunt') u.threat += 50;
        }
        u.next = t + u.spd * mult(u, 'spd') * (0.92 + R() * 0.16);
      }
      if (!alive(foes).length) { res = 'win'; break; }
      if (!alive(party).length) { res = 'wipe'; break; }
      const avg = party.reduce((a, u) => a + (u.down ? 0 : pct(u)), 0) / party.length;
      if (avg < C.flee.partyHp && !opt.noFlee) { res = 'flee'; S.note(t, 'e', '더 버티지 못하고 물러난다.', 1); break; }
    }
    if (!res) { res = 'flee'; S.note(t, 'e', '싸움이 길어져 양쪽 다 물러난다.', 1); }
    party.forEach(u => { u.hp = Math.max(0, Math.round(u.hp)); u.se = []; });
    return { res, t: Math.round(t), ev: S.ev, kills: foes.filter(f => f.down && !f.fled).length, big: S.big };
  }

  /* ---------- 게이트 무리 ---------- */
  function packOf(m, n) { const r = DB.monsterRoles?.[m.mrole], p = m.pack || r?.pack || [2, 4], k = 1 + (n - 4) * B().packScale; return Math.max(1, Math.round((p[0] + Math.floor(R() * (p[1] - p[0] + 1))) * k)); }
  /* kind 'mob' | 'boss'. n = 파티 인원 */
  function encounter(g, lv, kind, n, plv) {
    const mobs = (g.mobs || [g.mon]).filter(id => DB.monsters[id]);
    if (kind === 'boss') {
      const b = DB.monsters[g.boss] || null; const out = [];
      if (b) out.push(fromMonster(b, lv, 0, plv)); else return encounter(g, lv, 'mob', n + 2, plv);
      const mi = (b.minions || []).filter(id => DB.monsters[id]).concat(mobs), k = B().raid.bossMinions;
      const cnt = Math.round((k[0] + Math.floor(R() * (k[1] - k[0] + 1))) * (1 + (n - 4) * B().packScale));
      for (let i = 0; i < cnt && mi.length; i++) out.push(fromMonster(DB.monsters[pickOne(mi)], lv, i + 1, plv));
      return out;
    }
    if (!mobs.length) return [];
    const m = DB.monsters[pickOne(mobs)], c = packOf(m, n), out = [];
    for (let i = 0; i < c; i++) out.push(fromMonster(m, lv, i + 1, plv));
    if (mobs.length > 1 && R() < 0.3) { const m2 = DB.monsters[pickOne(mobs)]; out.push(fromMonster(m2, lv, c + 1, plv)); }
    return out;
  }
  const lvOf = g => DB.ranks[g.rank]?.lv ?? 20;
  const rest = (party) => { const K = B().raid; party.forEach(u => { if (u.down) return; u.hp = Math.min(u.max, u.hp + u.max * K.restHp); u.mp = Math.min(u.mpMax, u.mp + u.mpMax * K.restMp); }); };
  const rint = a => a[0] + Math.floor(R() * (a[1] - a[0] + 1));
  /* 몬스터 이름 무리 문장 */
  function packName(foes) { const c = {}; foes.forEach(f => c[f.name] = (c[f.name] || 0) + 1); return Object.entries(c).map(([n, k]) => k > 1 ? `${n} ${k}마리` : n).join(' · '); }
  function fightLine(party, foes, r) {
    const top = party.filter(u => u.kills).sort((a, b) => b.kills - a.kills)[0];
    const head = packName(foes);
    if (r.res === 'win') return josa(`${head} — 정리했다.${top && foes.length > 1 ? ` ${top.name}이(가) ${['', '하나를', '둘을', '셋을', '넷을', '다섯을'][Math.min(top.kills, 5)] || top.kills + '마리를'} 쓰러뜨렸다.` : ''}`);
    return josa(`${head} — ${r.res === 'wipe' ? '파티가 무너졌다.' : '버티지 못하고 물러났다.'}`);
  }
  function resetCounters(party) { party.forEach(u => { u.kills = 0; }); }

  /* ---------- NPC 파티 공략 (상세 인물이 낀 파티) ---------- */
  /* units: 헌터 unit 배열 · g: 게이트 (없으면 {rank, floors, mobs, boss} 를 넘긴다) → {ok, down:[id], hurt:[id], min, kills} */
  function npcRaid(units, g, plv) {
    const lv = lvOf(g), K = B().raid, floors = g.floors || 5; let min = 0, kills = 0, ok = false;
    const down = new Set(), hurt = new Set();
    for (let z = 0; z < floors; z++) {
      min += rint(K.moveMin);
      const boss = z === floors - 1, n = boss ? 1 : rint(K.fights); let lost = false;
      for (let f = 0; f < n; f++) {
        const foes = encounter(g, lv, boss ? 'boss' : 'mob', alive(units).length || 1, plv); if (!foes.length) continue;
        const r = fight(alive(units), foes); min += Math.ceil(r.t / 60); kills += r.kills;
        units.forEach(u => { if (u.down) down.add(u.id); }); r.big.forEach(id => hurt.add(id));
        if (r.res !== 'win') { lost = true; break; }
        rest(units); min += K.restMin;
      }
      if (lost) break;
      const avg = units.reduce((a, u) => a + (u.down ? 0 : pct(u)), 0) / units.length;
      if (boss) ok = true;
      else if (avg < 0.35 || alive(units).length < Math.ceil(units.length / 2)) break;
    }
    return { ok, down: [...down], hurt: [...hurt].filter(id => !down.has(id)), min, kills };
  }

  /* ---------- 내 헌터 공략 (UI.raid = R). 한 번에 한 구간: 이동 · 교전 · 보스 ---------- */
  function partyUnits(R0) {
    if (R0.cu) { R0.cu.forEach((u, i) => { const p = R0.party[i]; if (p && p.hp !== u._p) { u.hp = Math.round(u.max * cl(p.hp, 0, 100) / 100); u.down = u.hp <= 0; u._p = p.hp; } if (p && p.mp !== u._m) { u.mp = Math.round(u.mpMax * cl(p.mp, 0, 100) / 100); u._m = p.mp; } }); return R0.cu; }
    R0.cu = R0.party.map(p => { const h = p.id === G.player.id ? G.player : H(p.id); return h ? fromHunter(h, { hpPct: p.hp, mpPct: p.mp }) : fromLevel({ id: p.id, name: p.n, role: 'ROLE_MDPS', level: G.player.level }, { hpPct: p.hp }); });
    return R0.cu;
  }
  function sync(R0) { R0.cu.forEach((u, i) => { const p = R0.party[i]; p.hp = u.down ? 0 : Math.max(1, Math.round(u.hp / u.max * 100)); p.mp = Math.round(u.mp / u.mpMax * 100); u._p = p.hp; u._m = p.mp; }); }
  /* 반환: 'boss'(보스룸 직전 — 위기 기회) · 'win' · 'flee' · 'wipe' · 'down'(내가 쓰러짐) · null(계속) */
  function stepRaid(R0, log) {
    const g = DB.gates[R0.gid], lv = lvOf(g), K = B().raid, U = partyUnits(R0);
    const z = R0.cz || (R0.cz = { left: -1 });
    if (R0.floor >= R0.floors - 1) {
      if (!z.bossRoom) { z.bossRoom = true; const m = rint(K.moveMin); R0.t += m; log('e', '보스룸에 도착했다.'); return 'boss'; }
      return doFight(R0, g, lv, 'boss', log);
    }
    if (z.left < 0) { const m = rint(K.moveMin); R0.t += m; z.left = rint(K.fights); if (R0.floor > 0 || z.entered) log('e', `${R0.floor + 1}구역으로 진입했다.`); else log('', '파티가 대형을 갖추고 첫 구역으로 들어간다.'); z.entered = true; return null; }
    if (z.left > 0) { z.left--; const r = doFight(R0, g, lv, 'mob', log); if (r) return r; rest(U); R0.t += K.restMin; sync(R0); return null; }
    R0.floor++; z.left = -1; return null;
  }
  function doFight(R0, g, lv, kind, log) {
    const U = partyUnits(R0), act = alive(U); if (!act.length) return 'wipe';
    const foes = encounter(g, lv, kind, act.length, R0.plv); if (!foes.length) return null;
    resetCounters(U);
    const ap = foes.map(f => DB.monsters[f.mon]?.lines?.appear).find(Boolean);
    log(kind === 'boss' ? 'e' : '', ap ? fillT(pickOne(ap).replace('{n}', foes.length), foes[0]) : josa(`${packName(foes)}${kind === 'boss' ? '이(가) 모습을 드러낸다.' : '와(과) 마주쳤다.'}`));
    const before = U.map(u => u.hp), r = fight(act, foes);
    r.ev.filter(e => e[3] <= 2).slice(0, 8).forEach(e => log(e[1], e[2]));
    R0.t += Math.max(1, Math.ceil(r.t / 60)); R0.kills += r.kills; R0.stones += r.kills + (kind === 'boss' && r.res === 'win' ? 10 : 0);
    R0.dmg += U.reduce((a, u, i) => a + Math.max(0, Math.round((before[i] - u.hp) / u.max * 100)), 0);
    R0.big = (R0.big || []).concat(r.big);
    sync(R0);
    log(r.res === 'win' ? 'k' : 'h', fightLine(act, foes, r));
    R0.lastFight = { res: r.res, t: r.t, foes: foes.map(f => f.mon) };
    if (U[0].down) return 'down';
    if (r.res === 'win') { if (kind === 'boss') return 'win'; return null; }
    return r.res;
  }

  /* ---------- DB 화면 · 균형 표 ---------- */
  const TGT = { enemy: '적 하나', enemies: '적 여럿', ally: '아군 하나', allies: '아군 모두', self: '자신' };
  const WHEN = { allyLow: '아군 HP가 55% 아래일 때', selfLow: '자기 HP가 40% 아래일 때', crowd: '적이 셋 이상일 때', notTarget: '적이 다른 사람을 노릴 때', start: '싸움 첫머리에' };
  /* 기술 한 줄 설명 (숫자는 실제 계산에 쓰는 값) */
  function describeMove(id, mul = 1) {
    const M = DB.combatMoves[id]; if (!M) return '';
    const o = [];
    if (M.kind === 'attack' || (M.kind === 'debuff' && M.power > 0)) o.push(`${TGT[M.target]}${M.target === 'enemies' ? `(최대 ${M.area || 3})` : ''}에게 ${M.stat === 'mag' ? '마공' : '공격'} ×${+(M.power * mul).toFixed(2)}${M.hits > 1 ? ` · ${M.hits}번` : ''}`);
    if (M.kind === 'heal') o.push(`${TGT[M.target]} 치유 (마공 ×${+(M.heal * mul).toFixed(2)})`);
    if (M.el) o.push(`${DB.elements[M.el]?.name || ''} 속성`);
    if (M.crit) o.push(`치명 +${M.crit}%`);
    if (M.drain) o.push(`준 피해의 ${Math.round(M.drain * 100)}% 회복`);
    (M.se || []).forEach(e => { const S = seOf(e.se); if (!S) return; o.push(`${M.kind === 'buff' || M.kind === 'taunt' ? (M.target === 'self' ? '자신에게' : TGT[M.target] + '에게') : ''}${e.chance < 1 ? ` ${Math.round(e.chance * 100)}% 확률로` : ''} ${S.name} ${e.dur || S.dur}초 (${S.desc})`.trim()); });
    const c = [M.cd ? `재사용 ${M.cd}초` : '', M.mp ? `마력 ${M.mp}` : '', WHEN[M.when] || ''].filter(Boolean);
    return `${M.name} — ${o.join(' · ')}${c.length ? ` · ${c.join(' · ')}` : ''}`;
  }
  /* 몬스터를 같은 등급 헌터(근접 딜러 기준)와 비교한 배율 */
  function compare(m, lv) {
    const L = levelOfRank(lv), t = typicalStats(L), h = derive({ stats: t.stats, abl: t.abl, level: L, role: 'ROLE_MDPS', gearAtk: gearOfRank(lv), gearDef: gearOfRank(lv) }), x = monsterStats(m, lv);
    const mg = x.magic, r2 = v => +v.toFixed(2);
    return { hp: r2(x.max / h.max), pow: r2((mg ? x.mag : x.atk) / h.atk), magic: mg, def: r2(x.def / h.def), res: r2(x.res / h.res), spd: +(x.spd).toFixed(1), eva: Math.round(x.eva - h.eva), acc: Math.round(x.acc - h.acc), crit: Math.round(x.crit) };
  }
  /* 이 몬스터가 lv 등급 게이트에서 가지는 능력치 (잡몹이면 잡몹 배율) */
  const statsAt = (m, lv) => monsterStats(m, lv);
  const range = m => (typeof MONSTER !== 'undefined' ? MONSTER.range(m) : [20, 20]);
  return Object.assign(api, { describeMove, compare, pressure, levelOfRank, gearOfRank, typicalStats, derive, fromHunter, fromLevel, fromMonster, movesOf, monsterStats, statsAt, range, fight, encounter, npcRaid, stepRaid, partyUnits, packName });
})();
