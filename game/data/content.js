/* content.js — 몬스터 (특성은 traits.js, 스킬은 skills.js, 클래스는 classes.js, 아이템은 items.js)
   rank : 협회 추정 등급 (RANK_01~20). 장비와 축적 정보로 매긴 추정이라 틀릴 수 있다 (설정집 3.5).
   drops : 처치 후 회수할 수 있는 것 [{item, chance(0~1 · 공략 1회당), qty}]
   몬스터가 게임에 주는 효과(전투 수치 등)는 아직 정하지 않았다. */

/* 몬스터 분류 */
def('monsterCats', [
  {id:'MC_HUMANOID', name:'인간형'},
  {id:'MC_BEAST',    name:'마수'},
  {id:'MC_AMORPH',   name:'부정형'},
  {id:'MC_UNDEAD',   name:'언데드'},
  {id:'MC_INSECT',   name:'곤충형'},
  {id:'MC_UNKNOWN',  name:'미분류'},
]);

