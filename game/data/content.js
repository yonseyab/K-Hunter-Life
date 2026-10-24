/* content.js — 몬스터 (특성은 traits.js, 스킬은 classes.js 머리 주석, 클래스는 classes.js, 아이템은 items.js)
   ════ 몬스터 형식 (monsters) — 2026-10-24 '최대한 많이' 버전 ════
   필수는 id · name · cat 뿐. 나머지는 전부 선택 — 비우면 엔진이 등급 기본값 · 공통 문장으로 채운다. 필요할 때 골라 쓰면 된다.
   [기본]   id 'MON_<배치><번호>' · name 이름 · alias [다른 이름] · en 영문/학명 · cat 계열(monsterCats) · sub 세부 분류(글) · title 칭호(보스 등)
            ranks [약한 쪽, 센 쪽] 등급 범위 · rank 협회 추정 등급(옛) · rarity 희귀도 1~5 · tier 같은 계열 안 서열 1~5 · size 크기(monsterSizes)
            desc 한 줄 설명 · lore 긴 설명 · first 첫 보고 연도 · known 협회 정보 공개 0 미확인 ~ 3 완전 · img 그림 ID · icon · color
   [몸]     height 키(m) · length 몸길이(m) · weight 무게(kg) · looks 생김새 문장 · sound 소리 · smell 냄새 · blood 피 색/성질
            parts [{id, name, hp(체력 비율), weak(약점 부위면 true), mat(matParts)}] 부위 · core 마력핵 위치 문장
   [능력]   stat {hp, mp, atk, mag, def, res, spd, acc, eva, crit} 등급 기본치 배율 (기본 1) · lv [최소, 최대] 개체 레벨 · exp 경험치 배율
            attacks [{id, name, kind(attackKinds), el(elements), power, hits, range(melee · near · far), area, cd, se:[{se(statusEffects), chance, turns}], text}]
            skills [skills — scope 'monster'] · passive [글] 지속 능력 · weak · resist · immune(statusEffects) · absorb(elements 흡수)
            regen 턴당 회복 비율 · armor 고정 피해 감소 · pierce 방어 무시 비율
   [행동]   ai 성향(aggressive 공격적 · defensive 수비 · cowardly 겁많음 · territorial 영역 · swarm 무리 · ambush 매복 · guardian 수호 · berserk 폭주 · cunning 교활)
            intel 지능 1~5 · tags 행동 꼬리표(monsterTags) · group [최소, 최대] 무리 수 · formation 대형(글) · leader [이끄는 종 monsters]
            summon [{mon, count, chance, hp(이 비율 이하일 때)}] · flee 도망 체력 비율 · enrage 격노 체력 비율 · target 노리는 대상(weak 약한 쪽 · healer · back 후열 · near 가까운)
            active 활동 시간(day · night · all) · senses [sight · smell · hearing · mana · heat] · moves [walk · fly · swim · burrow · climb · phase] · speed 이동 1~5
   [환경]   habitats [gateInteriors] · terrains [terrains 좋아하는 지형] · climate 기후(글) · season 계절 · regions [regions 자주 나오는 지역] · gateKinds [gateKinds]
   [관계]   preys · predators · rivals · allies [monsters] 먹이 · 천적 · 경쟁 · 공생
   [보스]   boss true = 보스 전용 · phases [{hp(0~1 이하가 되면), name, text, stat, attacks, summon}] · minions [monsters] · arena 싸우는 곳 문장 · bgm
   [보상]   drops [{item, chance, qty}] · mats [matParts] · stone 마정석 품질 배율 · coreChance 핵 확률 · bounty 협회 처치 보상금(원) · coin 성좌 코인
   [위험]   danger 일반인 위험 1~5 · contagion 오염 · 감염(글) · breakRisk 브레이크 때 위험 1~5 · warn 협회 경고 문장
   [문장]   lines {appear, idle, attack, hurt, enrage, flee, summon, die, corpse} 배열 — {m} 몬스터 · {t} 대상 · news [뉴스 문장] · rumor [소문]
   [작업]   notes 메모 · src 작성자 · ver 버전
   몬스터가 게임에 주는 전투 수치는 아직 등급으로만 계산한다 (전투 개편 때 stat · attacks 부터 연결). */

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
/* 행동 꼬리표 · 약점/저항 종류 · 소재 부위 (형식만, 목록은 외주). {id, name, desc} */
def('monsterTags', []);   /* MTAG_… */
def('elements', []);      /* EL_…  불 · 냉기 · 빛 · 둔기 같은 것 */
def('matParts', []);      /* MP_…  가죽 · 뼈 · 송곳니 · 핵 같은 것. 소재 아이템 = matCat(monsterCats) × matPart */
/* ---------- 전투 공통 (2026-10-24 — 몬스터 · 스킬 · 장소가 함께 쓴다. 목록은 외주) ----------
   attackKinds  : 공격 갈래 {id:'AK_…', name}. 회피 · 방어 판정의 재료 (근접은 회피 기술, 원거리는 감지, 마법은 마력 방어 같은 식 — 규칙은 전투 개편 때)
   statusEffects: 상태 이상 · 강화 {id:'SE_…', name, kind:'debuff'|'buff', turns(기본 지속 턴), stack(겹치는지), desc, text(걸릴 때 문장 {t})}
   terrains     : 싸우는 곳의 지형 {id:'TRN_…', name, desc, mods:{ranged, melee, hide, move}(배율)} — gateInteriors.terrain · placeTypes.terrain · places.terrain 이 가리킨다 */
def('attackKinds', [
  {id:'AK_MELEE',  name:'근접'},
  {id:'AK_RANGED', name:'원거리'},
  {id:'AK_MAGIC',  name:'마법'},
  {id:'AK_SPECIAL',name:'특수'},
]);
def('statusEffects', []);
def('terrains', []);

/* 특별한 게이트 분류 (2026-10-24 사용자: 분류만, 게임 완성 뒤 업데이트로 늘린다). 지금은 브레이크 하나.
   게이트의 kind 필드. 없으면 일반 게이트. auto: 엔진이 붙이는 경우 ('break' = 시간 안에 공략되지 않아 밖으로 넘침) */
def('gateKinds', [
  {id:'GK_BREAK', name:'브레이크', auto:'break', desc:'공략되지 않은 채 시간이 다 돼 몬스터가 밖으로 넘친 게이트.'},
]);

