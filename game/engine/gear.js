/* =========================================================
   engine/gear.js — 장비 체계 (2026-10-23 사용자 결정 · 2026-10-24 관찰형)
   착용은 누구나 · 등급과 상관없이. 칸 8개(무기 · 보조 · 상의 · 하의 · 귀 · 목 · 손 · 특수)
   등급(itemGrades)이 기본 보정 · 내구도를 정하고, 개성(itemTraits)이 조금씩 더하거나 뺀다.
   양손 무기(twoHand) = 무기 + 보조, 한 벌(onePiece) = 상의 + 하의. 특수 칸은 special 표시 물건만.
   무엇을 입을지는 헌터가 정한다(consider). 성좌(플레이어)는 선물만 한다.
   내구도: 착용 장비 한 개마다 inv 줄의 dur. 공략할 때마다 닳고 0 이면 부서져 성능이 없다. 공략 뒤 헌터가 알아서 공방 수리.
   화면(상태창 › 장비)은 아직 — 디자인을 정한 뒤에
   ========================================================= */
const GEAR = (() => {
  /* 옛 칸 이름 (옛 외주 · 테스트 데이터 호환) */
  const OLD = { SLOT_BODY: 'SLOT_TOP', SLOT_HANDS: 'SLOT_HAND', SLOT_RING: 'SLOT_HAND', SLOT_FACE: null };
  const slotOf = it => { if (!it?.slot) return null; const s = it.slot in OLD ? OLD[it.slot] : it.slot; return DB.equipSlots[s] ? s : null; };
  const gradeOf = it => {
    if (!it) return null; if (it.grade) return DB.itemGrades[it.grade] || null;
    if (!slotOf(it) || !it.rank) return null; const lv = DB.ranks[it.rank]?.lv ?? 20;
    return vals('itemGrades').filter(g => !g.hidden && g.oldRank != null).sort((a, b) => a.oldRank - b.oldRank).find(g => lv <= g.oldRank) || DB.itemGrades.IG_1;
  };
  /* 옛 데이터를 새 틀로 (옛 칸 이름 → 새 칸, grade 없는 장비 → rank 로 어림). 팩을 불러온 뒤에도 다시 부른다 */
  let seen = 0;
  function normalize() {
    const r = (window.HL_REV || {}).items || 0; if (r === seen) return; seen = r; const L = vals('items');  /* def('items') 가 판 번호를 올릴 때만 (매번 훑지 않게) */
    L.forEach(it => { if (!it.slot) return; const s = slotOf(it); if (s !== it.slot) { if (s) it.slot = s; else delete it.slot; }
      if (it.slot && !it.grade) { const g = gradeOf(it); if (g) it.grade = g.id; } });
  }
  const occupies = it => { const s = slotOf(it); if (!s) return []; const o = [s];
    if (s === 'SLOT_WEAPON' && it.twoHand) o.push('SLOT_SUB'); if (s === 'SLOT_TOP' && it.onePiece) o.push('SLOT_BOTTOM'); return o; };
  const maxDur = it => { const g = gradeOf(it); return g ? g.dur : null; };
  const durOf = r => { const m = maxDur(DB.items[r?.item]); return m == null ? null : Math.max(0, Math.min(m, r.dur ?? m)); };
  const broken = r => durOf(r) === 0;
  const worn = () => invOf().map((r, i) => ({ r, i, it: DB.items[r.item] })).filter(x => x.r.loc === 'LOC_BODY' && x.it && slotOf(x.it));
  const at = slot => worn().find(x => occupies(x.it).includes(slot)) || null;
  const bonusOf = (it, r) => { const g = gradeOf(it); return !g || (r && broken(r)) ? 0 : g.bonus; };
  const bonus = x => x ? bonusOf(x.it, x.r) : 0;
  const traitsOf = it => (it?.traits || []).map(id => DB.itemTraits?.[id]).filter(Boolean);
  const traitTxt = t => `${t.name}${t.v ? ` ${t.v > 0 ? '+' : '−'}${Math.abs(t.v)}` : ''}`;
  const josa = (w, a, b) => { w = String(w || '').replace(/\s*\([^)]*\)$/, ''); const c = w.charCodeAt(w.length - 1) - 0xAC00; return c >= 0 && c <= 11171 && c % 28 ? a : b; };

  /* 판정 보정 (checkMods): 근접 · 무기 판정(ABG_A1) = 무기 등급 보정 + check 개성, stat 개성은 그 스탯 묶음 판정에 */
  function checkParts(attr) {
    const out = [], ab = DB.abilities[attr], E = DB.balance.BAL_EFFECT, st = ab ? E.groupStat[ab.g] : DB.baseStats[attr] ? attr : null;
    if (ab?.g === 'ABG_A1') { const w = at('SLOT_WEAPON'); const v = bonus(w); if (v) out.push([w.it.name, v]); }
    worn().forEach(x => { if (broken(x.r)) return; traitsOf(x.it).forEach(t => {
      if (t.kind === 'check' && ab?.g === 'ABG_A1' && occupies(x.it).includes('SLOT_WEAPON')) out.push([t.name, t.v]);
      if (t.kind === 'stat' && st && t.stat === st) out.push([t.name, t.v]); }); });
    return out;
  }
  /* 공략 전력에 더하는 몫 (무기 + 보조 절반) */
  const power = () => { const E = DB.balance.BAL_EFFECT, w = at('SLOT_WEAPON'), s = at('SLOT_SUB'); return (bonus(w) + (s && (!w || s.r !== w.r) ? bonus(s) * 0.5 : 0)) * E.weaponPow;  /* 같은 인벤토리 줄(양손)은 한 번만 */ };
  /* 받는 피해 배율: 한 벌이면 그 등급 그대로, 상의 · 하의 따로면 각각 armorPieceMul 배 */
  function armorMul() {
    const E = DB.balance.BAL_EFFECT, k = DB.balance.BAL_GEAR.armorPieceMul, t = at('SLOT_TOP'), b = at('SLOT_BOTTOM');
    if (t && b && t.r === b.r) return 1 - bonus(t) * E.armorDef;  /* 한 벌 = 같은 인벤토리 줄 */
    return [t, b].reduce((m, x) => x ? m * (1 - bonus(x) * E.armorDef * k) : m, 1);
  }
  /* 물건 상세의 성능 줄 */
  function perf(it) {
    const g = gradeOf(it), E = DB.balance.BAL_EFFECT, s = slotOf(it); if (!g || !s) return [];
    const o = [];
    if (s === 'SLOT_WEAPON') o.push(['근접 · 무기 판정', `+${g.bonus}`], ['공략 전력', `+${Math.round(g.bonus * E.weaponPow * 100) / 100}`]);
    if (s === 'SLOT_SUB') o.push(['공략 전력', `+${Math.round(g.bonus * E.weaponPow * 50) / 100}`]);
    if (s === 'SLOT_TOP' || s === 'SLOT_BOTTOM') o.push(['받는 피해', `−${Math.round(g.bonus * E.armorDef * (it.onePiece ? 1 : DB.balance.BAL_GEAR.armorPieceMul) * 1000) / 10}%`]);
    traitsOf(it).forEach(t => o.push(['개성', traitTxt(t)]));
    return o;
  }

  /* 착용 · 해제 (엔진 · 헌터 판단 · 검사용). 겹치는 칸에 있던 물건은 가방으로 */
  function equip(i, on) {
    const inv = invOf(), r = inv[i]; if (!r) return false; const it = DB.items[r.item], s = slotOf(it); if (!s) return false;
    if (s === 'SLOT_SPECIAL' && !it.special) return false;
    if (on) {
      const need = occupies(it); worn().filter(x => x.r !== r && occupies(x.it).some(z => need.includes(z))).forEach(x => { x.r.loc = 'LOC_BAG'; });
      if (r.qty > 1) { r.qty--; inv.push({ item: r.item, qty: 1, loc: 'LOC_BODY', dur: r.dur }); } else r.loc = 'LOC_BODY';
    } else {
      if (r.qty > 1) { r.qty--; inv.push({ item: r.item, qty: 1, loc: 'LOC_BAG', dur: r.dur }); } else r.loc = 'LOC_BAG';
    }
    return true;
  }
  /* 헌터 판단: 가방의 장비가 지금 그 칸(들)에 입은 것보다 나으면 갈아입는다. 성격 · 애착은 나중에 */
  const score = (it, r) => bonusOf(it, r) * 10 + traitsOf(it).reduce((a, t) => a + (t.v || 0), 0);
  function consider(why) {
    const out = [];
    invOf().map(r => ({ r, it: DB.items[r.item] })).filter(x => x.r.loc === 'LOC_BAG' && x.it && slotOf(x.it) && !broken(x.r) && (slotOf(x.it) !== 'SLOT_SPECIAL' || x.it.special))
      .sort((a, b) => score(b.it, b.r) - score(a.it, a.r)).forEach(x => {
        if (x.r.loc !== 'LOC_BAG') return;
        const cur = [...new Map(occupies(x.it).map(at).filter(Boolean).map(c => [c.r, c])).values()], now = cur.reduce((a, c) => a + score(c.it, c.r), 0);
        if (score(x.it, x.r) > now && equip(invOf().indexOf(x.r), true)) out.push(x.it.name);
      });
    if (out.length && typeof STORY !== 'undefined') { const last = out[out.length - 1]; STORY.add('act', `${why ? why + ' ' : ''}${out.join(' · ')}${josa(last, '을', '를')} 몸에 걸쳐 본다.`, 1); }
    return out;
  }

  const repairCost = r => { const it = DB.items[r.item], g = gradeOf(it), m = maxDur(it); if (!g || m == null || !it.price) return 0;
    const miss = 1 - durOf(r) / m; return miss <= 0 ? 0 : Math.max(1000, Math.round(it.price * DB.balance.BAL_GEAR.repairRate * miss * g.repair / 1000) * 1000); };
  function repair(r, why) {
    const c = repairCost(r); if (!c || G.money < c) return 0; const it = DB.items[r.item];
    G.money -= c; r.dur = maxDur(it); const dt = dateOf(G.day); G.ledger.unshift([`${dt.m}/${dt.d}`, `장비 수리 (${it.name})`, -c]);
    if (typeof STORY !== 'undefined') STORY.add('act', `${why || '공방에 맡겨'} ${it.name}${josa(it.name, '을', '를')} 손봤다. 수리비 ${won(c)}.`, 1);
    return c;
  }
  /* 공략이 끝나면: 착용 장비가 닳고, 많이 닳았으면 돈이 넉넉할 때 공방에 맡긴다 */
  function afterRaid(ok) {
    const B = DB.balance.BAL_GEAR;
    worn().forEach(x => {
      const g = gradeOf(x.it), m = maxDur(x.it); if (!g || m == null || !g.wear) return;
      const before = durOf(x.r), loss = Math.max(1, Math.round(g.wear * (ok ? 1 : 1.5) * (0.7 + Math.random() * 0.6)));
      x.r.dur = Math.max(0, before - loss);
      if (before > 0 && x.r.dur === 0 && typeof STORY !== 'undefined') STORY.add('raid', `${x.it.name}${josa(x.it.name, '이', '가')} 버티지 못하고 망가졌다.`, 2);
      if (x.r.dur / m < B.autoRepairAt && G.money >= repairCost(x.r) * B.keep) repair(x.r, '공략을 마치고 공방에 들러');
    });
  }
  /* 세이브: 장비 줄은 한 개씩 나누고 내구도를 채운다 (옛 세이브 · 시작 소지품) */
  function fixSave() {
    normalize(); if (!G?.inv) return;
    if (!G.inv.some(r => { const it = DB.items[r.item]; return it && slotOf(it) && (r.qty > 1 || !(r.dur >= 0)); })) return;
    const out = [];
    G.inv.forEach(r => { const it = DB.items[r.item];
      if (it && slotOf(it) && r.qty > 1) { for (let k = 0; k < r.qty; k++) out.push({ ...r, qty: 1 }); } else out.push(r); });
    out.forEach(r => { const m = maxDur(DB.items[r.item]); if (m != null && !(r.dur >= 0)) r.dur = m; });
    G.inv = out;
  }
  return { slotOf, gradeOf, normalize, occupies, maxDur, durOf, broken, worn, at, bonus, traitsOf, traitTxt, checkParts, power, armorMul, perf, equip, consider, repairCost, repair, afterRaid, fixSave };
})();
GEAR.normalize();
