/* content.js — 몬스터 (특성은 traits.js, 스킬은 skills.js, 클래스는 classes.js, 아이템은 items.js)
   몬스터 형식 (2026-10-24 사용자 결정 — 지금은 형식만, 목록은 나중에 한꺼번에 외주)
   cat     : 계열 (monsterCats)
   ranks   : 등급 범위 ['RANK_20','RANK_17'] = [약한 쪽, 센 쪽]. 같은 종이라도 개체마다 세기가 다르다. 옛 rank 하나만 있으면 그 등급 하나 (MONSTER.range)
   rank    : 협회 추정 등급 (옛 형식 · 표시용). ranks 가 있으면 MONSTER.normalize 가 가운데 등급을 넣는다
   size    : 크기 (monsterSizes)
   tags    : 행동 꼬리표 (monsterTags — 무리 · 매복 · 돌진 · 원거리 · 재생 같은 것. 위기 · 문장 조건 재료)
   weak · resist : 약점 · 저항 (elements ID 목록)
   habitats: 나오는 내부 지형 (gateInteriors ID 목록, 없으면 어디든)
   boss    : true 면 보스 전용 (게이트 하나 = 잡몹 1~3종 + 보스 1)
   drops   : 처치 후 회수할 수 있는 것 [{item, chance(0~1 · 공략 1회당), qty}]. 소재는 계열 × 부위 규칙(items 의 matCat · matPart)으로도 자동 연결 (나중에)
   desc    : 설명
   몬스터가 게임에 주는 전투 수치는 아직 등급으로만 계산한다. */

/* 몬스터 분류 */
def('monsterCats', [
  {id:'MC_HUMANOID', name:'인간형'},
  {id:'MC_BEAST',    name:'마수'},
  {id:'MC_AMORPH',   name:'부정형'},
  {id:'MC_UNDEAD',   name:'언데드'},
  {id:'MC_INSECT',   name:'곤충형'},
  {id:'MC_UNKNOWN',  name:'미분류'},
]);

/* 몬스터 크기 */
def('monsterSizes', [
  {id:'MSZ_S', name:'소형', n:1},
  {id:'MSZ_M', name:'중형', n:2},
  {id:'MSZ_L', name:'대형', n:3},
  {id:'MSZ_H', name:'거대', n:4},
]);
/* 행동 꼬리표 · 약점/저항 종류 · 소재 부위 (형식만, 목록은 외주). {id, name, desc} */
def('monsterTags', []);   /* MTAG_… */
def('elements', []);      /* EL_…  불 · 냉기 · 빛 · 둔기 같은 것 */
def('matParts', []);      /* MP_…  가죽 · 뼈 · 송곳니 · 핵 같은 것. 소재 아이템 = matCat(monsterCats) × matPart */
/* 특별한 게이트 분류 (2026-10-24 사용자: 분류만, 게임 완성 뒤 업데이트로 늘린다). 지금은 브레이크 하나.
   게이트의 kind 필드. 없으면 일반 게이트. auto: 엔진이 붙이는 경우 ('break' = 시간 안에 공략되지 않아 밖으로 넘침) */
def('gateKinds', [
  {id:'GK_BREAK', name:'브레이크', auto:'break', desc:'공략되지 않은 채 시간이 다 돼 몬스터가 밖으로 넘친 게이트.'},
]);

