/* =========================================================
   classes.js — 클래스
   cat  : 분류 (classCats)
   role : 임시 능력치 생성에 쓰는 파티 역할 (능력치 규칙은 아직 정하지 않음)
   pick : 캐릭터 생성 때 고를 수 있는 클래스 전용 스킬 개수
   pool : 그 클래스가 처음 각성할 때 나올 수 있는 스킬 후보. 같은 클래스라도 사람마다 고르는 스킬이 다르다.
   unique : true 면 고유 클래스 (2026-10-24 사용자 결정). 세계에 한 명만 가진다. 선천 각성으로는 나오지 않고, 성좌가 주거나 고유 클래스북으로만 얻는다.
            star : 그 고유 클래스가 묶인 성좌 (constellations, 성좌 하나에 고유 클래스 하나). 받으면 원래 클래스가 바뀐다 (STAR.grantClass)
   고유 스킬: skills.scope 'unique' — 고유 클래스의 pool 에만 들어간다. 이름 · 성능은 그 성좌와 엮인다 (외주)
   클래스는 능력치와 맞지 않을 수 있고, 게임 중 클래스북으로 바뀔 수 있다.
   ── 2026-10-24 전투 개편 대비 (선택 필드) ──
   stats  : 레벨업 때 주능력치가 오르는 경향 {STAT_BODY:가중치, …} (헌터 판단 자동 분배의 재료)
   keys   : 이 클래스에 중요한 세부 능력 [ABL_…] (전투 판정 · 성장 문장의 재료)
   gear   : 잘 맞는 장비 갈래 [itemCats 또는 장비 꼬리표 ID] — 헌터가 장비를 고를 때 가산
   next   : 상위 클래스로 바뀌는 길 [{to(classes), cond(조건 문장 · 나중에 규칙)}]
   traits : 클래스를 받으면 같이 붙는 특성 [traits]
   ── 스킬 (skills) 형식 ──
   scope  : class 클래스 전용 · common 공용 · unique 고유   kind : 액티브 · 패시브   desc : 설명
   선택 필드 (2026-10-24): cls(주인 클래스) · target(self 자신 · ally 아군 하나 · allies 아군 전체 · enemy 적 하나 · enemies 적 전체 · area 범위)
            cost {mp, hp, cd(재사용 턴)} · power(배율) · kind2(attackKinds) · el(elements) · scale(주로 기대는 능력 STAT_ · ABL_ ID)
            se [{se(statusEffects), chance, turns}] · maxLv(스킬 레벨 상한) · tags(꼬리표) · req(배우는 조건 문장)
            lines {use:[..], hit:[..], miss:[..]} — 전투 문장 {u} 쓰는 사람 · {t} 대상 · {s} 스킬 이름
   ========================================================= */
def('classCats', [
  {"id":"CC_MELEE","name":"근접"},
  {"id":"CC_RANGED","name":"원거리"},
  {"id":"CC_MAGIC","name":"마법"},
  {"id":"CC_SUPPORT","name":"지원"},
  {"id":"CC_SPECIAL","name":"특수"},
  {"id":"CC_CRAFT","name":"생산"}
]);
/* 캐릭터 생성 규칙 */
def('ccRules', [
  {id:'RULE_START', rank:'RANK_20', level:1, guild:null, commonSkills:2,
   /* 특성: 기본 포인트 traitBase, 최대 traitMax 개 (장점 · 단점 모두 포함) — 사용자 결정 2026-10-23 */
   traitBase:3, traitMax:5,
   /* 시작 소지품 (items.js) */
   startItems:[{item:'IT_B0020',qty:2,loc:'LOC_BAG'},{item:'IT_B0021',qty:1,loc:'LOC_BODY'},{item:'IT_B0010',qty:1,loc:'LOC_BODY'},{item:'IT_B0011',qty:1,loc:'LOC_BODY'},{item:'IT_B0012',qty:1,loc:'LOC_BODY'},{item:'IT_B0022',qty:1,loc:'LOC_BODY'}],
   /* 상태창 타인 공개 기본값 (본인이 고른 항목만 공개된다) */
   statusPublic:{level:true, cls:true, rank:true, vit:false, exp:false, stats:false, skills:false},
   /* 능력치 생성 [prototype_default]. real = 현실적 생성(기본), rand = 완전 무작위 */
   gen:{ stat:{mean:10, sd:1.4, min:6, max:14},
         real:{ABS_A:{mean:5, sd:2}, ABS_B:{mean:9, sd:3}},
         rand:{ABS_A:[1,20], ABS_B:[1,20]},
         potLevel:{min:5, max:100, skew:2.2},     /* 높은 값일수록 드물다 */
         potCap:{extraMean:300, extraSd:140, extraMin:30} }},
]);
