/* content.js — 몬스터 (전투 수치 규칙은 data/combat.js · engine/combat.js)
   ════ 몬스터 형식 (monsters) — 2026-10-24 전투 시스템 기준으로 새로 ════
   전투에 쓰이는 칸 (엔진이 실제로 읽는다)
     id 'MON_<배치><번호>' · name · cat 계열(monsterCats)
     ranks [약한 쪽, 센 쪽] 나오는 게이트 등급 범위 (또는 rank 하나). 능력치는 '그 게이트 등급의 같은 급 헌터' 기준으로 계산
     boss true = 보스 전용 (마지막 구역에만, 잡몹 배율 대신 보스 배율 BAL_COMBAT.boss)
     mrole 몬스터 역할(monsterRoles) — 능력치 배율 · 노리는 대상 · 무리 수를 정한다. 없으면 MR_BRUTE
     size 크기(monsterSizes) — HP · 회피 보정 (BAL_COMBAT.sizeHp · sizeEva)
     stat {hp, atk, mag, def, res, spd, acc, eva, crit} 이 개체만의 배율 (spd 는 공격 간격 배율 — 크면 느림 · acc/eva/crit 는 더하기) — 없으면 1
     el 기본 공격 속성(elements) · weak [elements] 약점 (피해 ×1.5) · resist [elements] 저항 (×0.6) · immune [statusEffects] 안 걸리는 상태
     moves [combatMoves] 기본 공격 말고 쓰는 기술 · target 노리는 대상(near · weak · back · random — 없으면 역할 기본)
     pack [최소, 최대] 한 무리 수 (없으면 역할 기본) · minions [monsters] 보스가 데리고 나오는 잡몹
     enrage 보스가 격노하는 HP 비율 (없으면 BAL_COMBAT.boss.enrageAt) · flee 이 HP 비율 아래면 도망 (잡몹)
     habitats [gateInteriors] 나오는 내부 · drops [{item, chance, qty}] 전리품
   설명 · 문장
     desc 한 줄 · lore 긴 설명 · lines {appear, attack, die} 전투 기록 문장 ({m} 몬스터 · {t} 대상)
   그 밖의 칸(alias · en · parts · tags …)은 넣어도 되지만 엔진은 아직 안 읽는다. notes 메모 · src 작성자 · ver 버전 */

/* 몬스터 분류 */
/* ════ 몬스터 쪽 작은 표 '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   monsterCats : + desc · icon · color · weak [elements] · resist [elements] · mats [matParts] · lore
   monsterSizes: + n · desc · hpMul · hitMul 맞히기 쉬움 · reach 공격 거리
   monsterTags : id 'MTAG_…' · name · desc · icon · mind 전투 행동 규칙(글) · text
   elements    : id 'EL_…' · name · desc · color · icon · opposite [elements] · se [statusEffects 잘 거는 상태] · terrains [terrains 강해지는 곳]
   matParts    : id 'MP_…' · name · desc · priceMul · rarity · use(글 쓰임)
   statusEffects: id · name · kind · turns · stack · desc · text · icon · color · dmg 턴당 피해 비율 · stat {배율} · skip 행동 불가 · cure [items] · cleanse 풀리는 조건(글) · el(elements)
   terrains    : id · name · desc · mods · light · move · hide · el {elements: 배율} · hazards [글]
   gateKinds   : + desc · auto · icon · color · danger 1~5 · lines {news, enter} */
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
/* 행동 꼬리표 · 약점/저항 종류 · 소재 부위 (형식만, 목록은 나중에 Claude가). {id, name, desc} */
def('monsterTags', []);   /* MTAG_… */
def('matParts', []);      /* MP_…  가죽 · 뼈 · 송곳니 · 핵 같은 것. 소재 아이템 = matCat(monsterCats) × matPart */
/* ---------- 전투 공통 (2026-10-24 — 몬스터 · 스킬 · 장소가 함께 쓴다. 목록은 나중에 Claude가) ----------
   attackKinds  : 공격 갈래 {id:'AK_…', name}. 회피 · 방어 판정의 재료 (근접은 회피 기술, 원거리는 감지, 마법은 마력 방어 같은 식 — 규칙은 전투 개편 때)
   statusEffects: 상태 이상 · 강화 {id:'SE_…', name, kind:'debuff'|'buff', turns(기본 지속 턴), stack(겹치는지), desc, text(걸릴 때 문장 {t})}
   terrains     : 싸우는 곳의 지형 {id:'TRN_…', name, desc, mods:{ranged, melee, hide, move}(배율)} — gateInteriors.terrain · placeTypes.terrain · places.terrain 이 가리킨다 */
def('attackKinds', [
  {id:'AK_MELEE',  name:'근접'},
  {id:'AK_RANGED', name:'원거리'},
  {id:'AK_MAGIC',  name:'마법'},
  {id:'AK_SPECIAL',name:'특수'},
]);
def('terrains', []);

/* 특별한 게이트 분류 (2026-10-24 사용자: 분류만, 게임 완성 뒤 업데이트로 늘린다). 지금은 브레이크 하나.
   게이트의 kind 필드. 없으면 일반 게이트. auto: 엔진이 붙이는 경우 ('break' = 시간 안에 공략되지 않아 밖으로 넘침) */
def('gateKinds', [
  {id:'GK_BREAK', name:'브레이크', auto:'break', desc:'공략되지 않은 채 시간이 다 돼 몬스터가 밖으로 넘친 게이트.'},
]);


/* ════ 업데이트하기 쉬운 구조 (2026-10-24 기반 작업, engine/content.js CONTENT) ════
   contentTags : 공통 꼬리표. 어느 테이블의 행이든 ctags:['CT_…'] 로 붙인다 (옛 tags 칸은 자유 글자 그대로 둔다).
                 {id:'CT_…', name, kinds?:[이 꼬리표를 쓸 수 있는 테이블 이름 — 없으면 어디든], desc?}
                 쓰는 곳: 이벤트 조건 {k:'tag', of:'here'(지금 장소 · 지역)|'gate'(들어가 있는 게이트)|'who'(상대 인물)|'player'(헌터 · 클래스 · 특성)|'bag'(가진 물건), tag}
                          CONTENT.tagged(테이블, 꼬리표) 로 그 꼬리표가 붙은 행 찾기 (색인)
   textBits    : 빈칸 문장 재료. {id:'TB_…', key:'weather.rain'(소문자 · 점), texts:[…], req?:[조건]}
                 문장 안에서 {@weather.rain} 이라고 쓰면 그 key 의 texts 중 하나가 들어간다 (CONTENT.fill). 같은 key 를 여러 행에 나눠 써도 합쳐진다.
                 fill 이 아는 것: {a|b|c} 셋 중 하나 · {@key} 재료 · {이름} 넘겨준 값({who.name} 처럼 점도 됨) · 조사 이(가) 을(를) 은(는) 와(과) (으)로 자동 */
def('contentTags', [
  {id:'CT_URBAN',    name:'도심',        kinds:['placeTypes','regions','gates','events','textBits'], desc:'사람 많고 건물 빽빽한 곳'},
  {id:'CT_RURAL',    name:'시골',        kinds:['placeTypes','regions','gates','events','textBits']},
  {id:'CT_NATURE',   name:'자연',        kinds:['placeTypes','regions','gates','events','textBits'], desc:'산 · 바다 · 숲'},
  {id:'CT_NIGHT',    name:'밤',          desc:'밤에 어울리는 것'},
  {id:'CT_DANGER',   name:'위험',        desc:'다칠 수 있는 곳 · 일'},
  {id:'CT_LUXURY',   name:'고급',        desc:'돈 많은 사람의 것'},
  {id:'CT_CHEAP',    name:'서민',        desc:'싸고 흔한 것'},
  {id:'CT_HUNTER',   name:'헌터 업계',   desc:'협회 · 길드 · 게이트 관련'},
  {id:'CT_FAMILY',   name:'가족',        desc:'가족과 얽힌 것'},
  {id:'CT_ROMANCE',  name:'연애',        desc:'연애 · 설렘'},
  {id:'CT_MEDIA',    name:'언론 · 방송', desc:'기자 · 방송 · 인터넷 방송'},
  {id:'CT_UNDERWORLD', name:'뒷골목',    desc:'불법 · 암시장 · 범죄 (범죄 콘텐츠는 맨 나중)'},
  {id:'CT_FIRE',     name:'불',          desc:'불 · 열기 속성'},
  {id:'CT_WATER',    name:'물',          desc:'물 · 냉기 속성'},
  {id:'CT_UNDEAD',   name:'언데드',      desc:'죽은 것들'},
  {id:'CT_BEAST',    name:'짐승',        desc:'짐승형 몬스터 · 동물'},
]);
def('textBits', [
  {id:'TB_0001', key:'weather.rain',  texts:['빗줄기가 굵어진다','창밖으로 비가 그치지 않는다','젖은 아스팔트 냄새가 올라온다']},
  {id:'TB_0002', key:'weather.clear', texts:['하늘이 높고 맑다','햇볕이 따갑다','바람 한 점 없다']},
  {id:'TB_0003', key:'city.noise',    texts:['어디선가 경적이 울린다','배달 오토바이가 골목을 가른다','편의점 앞에 사람들이 모여 있다']},
  {id:'TB_0004', key:'gate.air',      texts:['공기가 눅눅하고 무겁다','마력 냄새가 코끝을 찌른다','멀리서 무언가 긁는 소리가 난다']},
  {id:'TB_0005', key:'mood.tired',    texts:['어깨가 무겁다','하품이 계속 나온다','눈꺼풀이 자꾸 내려온다']},
]);
