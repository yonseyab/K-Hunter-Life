/* =========================================================
   classes.js — 클래스 · (스킬 형식도 여기)
   ════ 클래스 형식 (classes) — 2026-10-24 '최대한 많이' 버전. 필수는 id · name · cat ════
   [기본]   id 'CLS_<배치><번호>' · name · alias [다른 이름] · en · cat 분류(classCats) · tier 차수 1~5 (1 = 처음 각성) · rarity 희귀도 1~5
            desc 한 줄 · lore 긴 설명 · img · icon · color
   [역할]   role 대표 파티 역할(roles) · roles [roles 가능한 역할] · range 주 거리(melee · near · far) · resource 쓰는 힘(mp · stamina · rage · focus · 글)
            el 주 속성(elements) · affinity [elements 잘 맞는 속성] · weakEl [elements 다루기 어려운 속성]
   [스킬]   pick 커마 때 고르는 전용 스킬 수 · pool [skills] 처음 각성 때 후보 · passive [skills] 클래스에 늘 붙는 패시브 · learn [{skill, lv}] 레벨에 따라 배우는 스킬
   [성장]   stats {STAT_…: 가중치} 레벨업 때 오르는 경향 · keys [ABL_…] 핵심 세부 능력 · growth {hp, mp} 레벨당 증가 · hpMul · mpMul 기본치 배율
            statReq {STAT_…: 값} · ablReq {ABL_…: 값} 이 클래스로 바뀌는 데 필요한 능력 (전직 · 클래스북)
   [장비]   gear [itemCats · 꼬리표] 잘 맞는 장비 · weapons [글/꼬리표] 무기 갈래 · armors 방어구 갈래 · ban [금지 장비 꼬리표]
   [변화]   from [classes] 하위 클래스 · next [{to(classes), cond(조건 문장), lv}] 상위 클래스 · traits [traits] 같이 붙는 특성
   [고유]   unique true = 고유 클래스 (세계에 한 명 · 선천 각성 불가 · 성좌가 주거나 고유 클래스북) · star 묶인 성좌(constellations)
   [사회]   fame 평판(rare 희귀 · common 흔함 · scorned 천대 · popular 인기) · pay 의뢰 시세 배율 · demand 길드 수요 1~5 · guildPref [guilds 잘 뽑는 길드]
            jobs [글] 각성 후 흔한 일 · habits [글] 이 클래스 사람의 일상 버릇 (이야기 문장 재료)
   [문장]   lines {awaken, levelUp, classUp, idle} — {u} 헌터
   [작업]   notes · src · ver
   클래스는 능력치와 맞지 않을 수 있고, 게임 중 클래스북으로 바뀔 수 있다.

   ════ 스킬 분류 (2026-10-24 사용자 결정) — 세 축 ════
     소속 scope : class 클래스 전용 · common 공용 · unique 고유(성좌) · monster 몬스터
     종류 kind  : 액티브(쓰는 것) · 패시브(늘 켜진 것)
     효과 영역 domains [skillDomains] : 이 스킬이 어디서 효과를 내는지 (하나 이상). 영역마다 엔진이 읽는 칸이 정해져 있다 (아래 skillDomains)
   클래스 분류: 계열 cat(classCats 6) × 역할 role(roles 7). rarity 1~5 는 분류가 아니라 속성 (각성 확률 · 이름 분위기)
   이름 분위기 (2026-10-24): 희귀도로 섞는다 — 1~2 시스템 게임풍(탱커 · 아처 · [액티브] 실드 배시) · 3~4 한자 · 무협(검귀 · 일섬(一閃)) · 5 · 고유 웹소설 칭호([검성의 계승자])

   ════ 스킬 형식 (skills) — 필수는 id · name · scope · kind ════
   [영역별로 엔진이 실제로 읽는 칸]
            전투 SD_COMBAT : 액티브 → move (combatMoves 기술 ID) · 패시브 → cstat {hp, atk, mag, def, res, spd(배율)} {acc, eva, crit(더하기)}
            탐색 SD_EXPLORE: checks {ABL_ · STAT_: 보정} — 공략 중 위기 판정에 더한다
            생활 SD_LIFE · 사회 SD_SOCIAL: checks {…} — 공략 밖 판정(사건 · 일상)에 더한다 · acts [actions] 쓰이는 행동
   [기본]   id 'SK_<배치><번호>' · name · alias · en · scope(class 클래스 전용 · common 공용 · unique 고유 · monster 몬스터) · kind(액티브 · 패시브)
            cat 공용 스킬 묶음(skillCats — 공용 스킬은 필수. 커마 공용 스킬 고르기 화면의 묶음 칩)
            cls 주인 클래스 · classes [classes 같이 쓰는 클래스] · grade 스킬 등급(글 또는 1~5) · rarity 1~5 · tier 1~5 · desc · lore · img · icon · fx 시각 효과 ID · sound
   [대상]   target(self · ally · allies · enemy · enemies · area) · range(melee · near · far) · area 범위 크기 1~5 · hits 타격 수 · count 대상 수
   [비용]   cost {mp, hp, stamina, item(items), cd(재사용 턴), cast(시전 턴), charges(충전 수), daily(하루 횟수)}
   [효과]   power 위력 배율 · kind2 공격 갈래(attackKinds) · el 속성(elements) · scale · scale2 기대는 능력(STAT_ · ABL_) · acc · crit 보정
            heal 회복 배율 · shield 보호막 배율 · se [{se(statusEffects), chance, turns}] · cleanse [statusEffects 풀어 주는 것] · buff {stat: 배율, turns}
            summon [{mon, count, turns}] · move 전투 기술(combatMoves) · stance 자세 · toggle 켜고 끄는 스킬
            combo [skills 이어 쓰기 좋은 스킬] · counter 반격 조건(글) · reaction 발동 조건(글 — 패시브)
   [성장]   maxLv 스킬 레벨 상한 · growth {power, cost, cd} 레벨당 변화 · evolve [{to(skills), cond}] 변형 · mastery [글] 숙련 단계 이름
            req {lv, stat:{}, abl:{}, skill(skills), cls(classes)} 배우는 조건 · book 스킬북 아이템(items)
   [판단]   ai {hpBelow, mpAbove, enemies, ally hurt …} 헌터가 언제 쓰는지 · tags [꼬리표] · risk 쓰는 위험 1~5 · side [글] 부작용(반동 · 마력 고갈)
   [일상]   daily true = 일상에서도 씀 · acts [actions 쓰이는 행동] (요리 · 치료 · 설득 같은 생활 스킬)
   [문장]   lines {use, hit, miss, crit, kill, fail, idle} — {u} 쓰는 사람 · {t} 대상 · {s} 스킬 이름
   [작업]   notes · src · ver
   ========================================================= */
/* 스킬 효과 영역 (2026-10-24). reads: 엔진이 읽는 칸 */
def('skillDomains', [
  {id:'SD_COMBAT',  name:'전투', reads:'move · cstat', desc:'게이트 전투에서 쓰는 기술 · 능력치 보정 (engine/combat.js)'},
  {id:'SD_EXPLORE', name:'탐색', reads:'checks', desc:'공략 중 위기 · 함정 · 길 찾기 판정 보정'},
  {id:'SD_LIFE',    name:'생활', reads:'checks · acts', desc:'공략 밖 일상 판정 · 일 · 훈련 · 회복'},
  {id:'SD_SOCIAL',  name:'사회', reads:'checks · acts', desc:'사람 사이 판정 · 협상 · 관계'},
]);
/* 공용 스킬 묶음 (2026-10-24). 커마 › 공용 스킬 화면의 묶음 칩 (공용 스킬의 세부 분류) */
def('skillCats', [
  {id:'SKC_SURVIVE', name:'생존'},
  {id:'SKC_COMBAT',  name:'전투 보조'},
  {id:'SKC_SENSE',   name:'감지'},
  {id:'SKC_HEAL',    name:'회복 · 응급'},
  {id:'SKC_MOVE',    name:'이동'},
  {id:'SKC_MIND',    name:'정신'},
  {id:'SKC_SOCIAL',  name:'사회 · 교섭'},
  {id:'SKC_LIFE',    name:'생활 · 기술'},
]);
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
