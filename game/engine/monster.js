/* =========================================================
   engine/monster.js — 몬스터 · 게이트 구성 형식 (2026-10-24 사용자 결정, data/content.js)
   몬스터 등급은 범위(ranks). 게이트 하나 = 잡몹 1~3종(mobs) + 보스 1(boss). g.mon 은 옛 엔진 호환용 = 첫 잡몹.
   특별한 게이트는 kind (gateKinds) — 지금은 브레이크 하나 (시간이 다 돼 넘치면 엔진이 붙인다).
   전투 수치는 아직 게이트 등급으로만 계산한다. 약점 · 저항 · 꼬리표 · 크기는 형식만 (목록을 채운 뒤 연결).
   ========================================================= */
const MONSTER = (() => {
  const lvOf = rid => DB.ranks[rid]?.lv ?? 20;
  /* [약한 쪽 등급 숫자, 센 쪽 등급 숫자] */
  const range = m => m?.ranks ? [lvOf(m.ranks[0]), lvOf(m.ranks[1])] : [lvOf(m?.rank), lvOf(m?.rank)];
  const fits = (m, lv) => { const [a, b] = range(m); return lv <= a && lv >= b; };
  const dist = (m, lv) => { const [a, b] = range(m); return lv > a ? lv - a : lv < b ? b - lv : 0; };
  /* ranks 만 있는 몬스터에 옛 rank(가운데)를 넣는다 — 옛 화면 · 엔진이 rank 를 읽는다 */
  let seen = 0;
  function normalize() {
    const L = vals('monsters'); if (L.length === seen) return; seen = L.length;
    L.forEach(m => { if (m.ranks && !m.rank) { const [a, b] = range(m), mid = Math.round((a + b) / 2); m.rank = 'RANK_' + String(mid).padStart(2, '0'); } });
  }
  /* 게이트 등급 lv · 내부 지형 gi 에 맞는 구성. 맞는 게 없으면 등급이 가장 가까운 것 */
  function compose(r, lv, gi) {
    normalize();
    const all = vals('monsters').filter(m => m.rank || m.ranks), at = m => !m.habitats?.length || m.habitats.includes(gi);
    const near = L => { const ok = L.filter(m => fits(m, lv)); return ok.length ? ok : L.slice().sort((a, b) => dist(a, lv) - dist(b, lv)).slice(0, 2); };
    const mobsAll = all.filter(m => !m.boss), bosses = all.filter(m => m.boss);
    let pool = near(mobsAll.filter(at)); if (!pool.length) pool = near(mobsAll); if (!pool.length) pool = near(all);
    const n = Math.min(pool.length, 1 + Math.floor(r() * 3)), mobs = [];
    const bag = pool.slice(); while (mobs.length < n && bag.length) mobs.push(bag.splice(Math.floor(r() * bag.length), 1)[0].id);
    let bp = near(bosses.filter(at)); if (!bp.length) bp = near(bosses);
    const boss = bp.length ? bp[Math.floor(r() * bp.length)].id : null;
    return { mobs, boss, mon: mobs[0] || boss };
  }
  /* 시간이 다 돼 넘치면 브레이크 분류를 붙인다 */
  function markBreak(g) { if (g && !g.kind) { const k = vals('gateKinds').find(x => x.auto === 'break'); if (k) g.kind = k.id; } }
  return { range, fits, normalize, compose, markBreak };
})();
