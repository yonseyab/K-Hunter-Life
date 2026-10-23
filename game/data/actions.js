/* =========================================================
   actions.js — 행동 (플레이어와 NPC가 같은 행동 ID를 쓴다)
   행동은 세 경로에서 같은 정의로 쓰인다:
     · 홈 화면 추천 카드 (show 에 'home')
     · 각 화면의 버튼 (show 에 'screen:<화면 ID>')
     · 일정표 자율 진행 (show 에 'schedule')
   필드
     cat     : 행동 분류 (actionCats)
     durs    : 고를 수 있는 시간(분). 첫 값이 기본
     energy  : 시간당 기력 변화 (음수 = 소모)
     stress  : 시간당 스트레스 변화
     pay     : 시간당 돈 변화 (원). 음수 = 비용
     sleep   : true 면 수면 (기력 회복 · 수면 부족 감소는 BAL_TIME)
     train   : 훈련 대상 세부 능력 그룹 (ablGroups). 수확 체감은 BAL_TRAIN
     relFx   : 대상 인물과의 관계 변화 [[차원 ID, 값, 'to'(나→상대)|'from'(상대→나)|'both'], …]. 'from' 의 'LIKE*' 는 상대 눈에 비친 내 외모로 보정
     skillTrain: true 면 가진 스킬 하나의 숙련 진척도 오른다 (BAL_EFFECT.skillTrainHour)
     special : 'confess' 고백 · 'propose' 청혼 · 'breakup' 이별 (상대 연애 감정 + 판정, relations.js BAL_REL)
     req     : 조건 — {k:'hasGuild'} {k:'noGuild'} {k:'startBetween',from,to}(분) {k:'money',min} {k:'injured'}
               관계: {k:'adultTarget'} {k:'notFamily'} {k:'notDating'} {k:'dating'} {k:'engaged'} {k:'notCohabit'} {k:'homeStorage'}(고시원 X) {k:'guildMaster'}(내가 세운 길드의 길드장) {k:'hasJob'}(직업이 있음) {k:'targetFree'}(대상 NPC가 지금 바쁘지 않음, places.js busyActs)
     heal    : 부상 남은 회복 시간을 이 비율만큼 줄인다 · hp: 시간당 HP(%) 회복
     hidden  : 목록에 나오지 않는 시스템 행동 (게이트 공략 등)
     place   : 하는 곳 (places.js). 장소 종류 ID 또는 'target'(대상 인물 지역 카페) · 'gate'(게이트 현장) · 'guild'(길드 사무실). 없으면 어디서나 (식사 · 연락)
               다른 곳에 있으면 먼저 이동한다 (이동 시간 · 교통비 · 기력, BAL_MOVE)
     payJob  : true 면 pay 대신 그 사람 직업(aiJobs)의 시급
     ai      : NPC가 이 행동을 고를 때의 효용 가중치 (npc_ai.js 설명 참고). 없으면 NPC는 고르지 않는다
     onGate  : 대상 게이트 상태 변경 — 'scout'(몬스터 정보 확인) · 'permit'(공략 허가)
     onGuild : 'apply' 이면 대상 길드에 입단 문의 → 기준을 넘으면 계약 제안 (G.offers)
     onSell  : 'assoc' 이면 대상 물건('아이템ID|위치ID')을 협회에 판다 (BAL_SHOP.assocRate)
   행동의 효과 수치는 [prototype_default] 임시값이다.
   ========================================================= */

def('actionCats', [
  {id:'ACC_LIFE',   name:'생활'},
  {id:'ACC_TRAIN',  name:'훈련'},
  {id:'ACC_WORK',   name:'일'},
  {id:'ACC_SOCIAL', name:'교류'},
  {id:'ACC_HUNTER', name:'헌터 활동'},
]);

def('actions', [
  {id:'ACT_SLEEP', name:'수면', place:'PT_HOME', cat:'ACC_LIFE', color:'#3d5a80', durs:[480,360,240,600], sleep:true, stress:-1,
   show:['home','schedule'], desc:'기력을 회복하고 수면 부족을 줄인다.'},
  {id:'ACT_NAP', name:'낮잠', place:'PT_HOME', cat:'ACC_LIFE', color:'#4a6a8f', durs:[60,30,90], sleep:true,
   show:['home','schedule'], desc:'짧게 잔다. 수면 부족은 조금만 준다.'},
  {id:'ACT_REST', name:'휴식', place:'PT_HOME', cat:'ACC_LIFE', color:'#5b6879', durs:[60,120,30], energy:6, stress:-3,
   show:['home','schedule'], ai:{base:0.05, need:{NEED_ENERGY:1.1, NEED_STRESS:0.5}, goal:{GOAL_STABLE:0.15}}, desc:'집에서 쉰다.'},
  {id:'ACT_MEAL', name:'식사', cat:'ACC_LIFE', color:'#7a6a4f', durs:[60,30], energy:4, stress:-2, pay:-15000,
   show:['home','schedule'], desc:'밥을 챙겨 먹는다.'},

  {id:'ACT_TR_COMBAT', name:'전투 훈련', place:'PT_TRAIN', cat:'ACC_TRAIN', color:'#4fa8e0', durs:[120,60,180], energy:-12, stress:1, train:['ABG_A1'],
   show:['home','schedule'], ai:{awake:true, need:{NEED_ENERGY:-0.6}, goal:{GOAL_GROW:1, GOAL_RANK:0.7, GOAL_FAME:0.2}, px:{PX_COMPET:0.1}}, desc:'무기 · 회피 · 방어 동작을 반복한다.'},
  {id:'ACT_TR_MANA', name:'마력 수련', place:'PT_TRAIN', cat:'ACC_TRAIN', color:'#6f8ff0', durs:[120,60,180], energy:-10, train:['ABG_A2'],
   show:['home','schedule'], ai:{awake:true, need:{NEED_ENERGY:-0.5}, goal:{GOAL_GROW:0.9, GOAL_RANK:0.7}}, desc:'마력을 돌리고 다루는 연습.'},
  {id:'ACT_TR_SKILL', name:'스킬 연습', place:'PT_TRAIN', cat:'ACC_TRAIN', color:'#8b7ff0', durs:[120,60], energy:-12, train:['ABG_A3'], skillTrain:true,
   show:['home','schedule'], ai:{awake:true, need:{NEED_ENERGY:-0.6}, goal:{GOAL_GROW:0.9, GOAL_RANK:0.6, GOAL_FAME:0.2}}, desc:'가진 스킬을 반복해 쓴다. 현실에서는 MP가 많이 든다.'},
  {id:'ACT_TR_SENSE', name:'감각 훈련', place:'PT_TRAIN', cat:'ACC_TRAIN', color:'#4fc4c4', durs:[120,60], energy:-8, train:['ABG_A4'],
   show:['home','schedule'], ai:{awake:true, need:{NEED_ENERGY:-0.4}, goal:{GOAL_GROW:0.8, GOAL_RANK:0.5}}, desc:'기척 · 마력 감지 훈련.'},
  {id:'ACT_TR_FIT', name:'체력 단련', place:'PT_TRAIN', cat:'ACC_TRAIN', color:'#5cc48a', durs:[90,60,120], energy:-12, stress:-1, train:['ABG_B6'],
   show:['home','schedule'], ai:{need:{NEED_ENERGY:-0.6, NEED_STRESS:0.2}, goal:{GOAL_GROW:0.6, GOAL_STABLE:0.2}}, desc:'달리기 · 근력 운동 · 생존 기술.'},
  {id:'ACT_STUDY', name:'공부', place:'PT_LIB', cat:'ACC_TRAIN', color:'#9ccf6a', durs:[120,60,180], energy:-6, stress:1, train:['ABG_B1','ABG_B5'],
   show:['home','schedule'], ai:{need:{NEED_ENERGY:-0.3}, goal:{GOAL_GROW:0.4, GOAL_WEALTH:0.2, GOAL_STABLE:0.3}, px:{PX_EXTRO:-0.1}}, desc:'책 · 강의 · 협회 자료.'},

  {id:'ACT_JOB', name:'아르바이트', place:'PT_WORK', cat:'ACC_WORK', color:'#e0a341', durs:[240,180,360], energy:-7, stress:2, pay:11000,
   req:[{k:'startBetween',from:480,to:1080}], show:['home','schedule'], ai:{need:{NEED_MONEY:1.1, NEED_ENERGY:-0.3}, goal:{GOAL_WEALTH:0.5, GOAL_STABLE:0.2}, nojob:true, rankMin:17}, desc:'시급 11,000원 (임시).'},
  {id:'ACT_WORK', name:'직장 근무', place:'PT_WORK', cat:'ACC_WORK', color:'#c9a24a', durs:[480,240], energy:-6, stress:2, payJob:true,
   req:[{k:'hasJob'},{k:'startBetween',from:420,to:900}], show:['home','schedule'], ai:{job:true, weekdays:true, repeatOk:true, base:0.9, need:{NEED_MONEY:0.6}, goal:{GOAL_STABLE:0.5, GOAL_WEALTH:0.4}}, desc:'직장에 나가 일한다. 시급은 직업(aiJobs)에 따라 다르다.'},
  {id:'ACT_JOBHUNT', name:'구직 활동', place:'PT_CAFE', cat:'ACC_WORK', color:'#b39a5a', durs:[180,120], energy:-4, stress:3, pay:-3000,
   req:[{k:'noJobCiv'}], show:[], ai:{civ:true, unemployed:true, base:0.2, need:{NEED_MONEY:1.4}, goal:{GOAL_STABLE:0.6, GOAL_WEALTH:0.4}}, desc:'일자리를 찾는다 (일반인). 할수록 취업 확률이 오른다.'},
  {id:'ACT_GUILD', name:'길드 업무', place:'guild', cat:'ACC_WORK', color:'#a33446', durs:[240,180], energy:-8, stress:1,
   req:[{k:'hasGuild'},{k:'startBetween',from:480,to:1080}], show:['home','schedule'], ai:{guild:true, weekdays:true, base:0.1, goal:{GOAL_STABLE:0.3, GOAL_PEOPLE:0.3, GOAL_RANK:0.2}}, desc:'길드 사무 · 장비 정비 · 회의.'},

  {id:'ACT_FRIENDS', name:'친구 만나기', place:'PT_CAFE', cat:'ACC_SOCIAL', color:'#a284e6', durs:[120,180], energy:-4, stress:-5, pay:-15000,
   show:['home','schedule'], ai:{need:{NEED_SOCIAL:1.2, NEED_STRESS:0.7, NEED_ENERGY:-0.2, NEED_MONEY:-0.6}, goal:{GOAL_PEOPLE:0.7}, px:{PX_EXTRO:0.25}}, desc:'밖에서 사람을 만난다.'},
  {id:'ACT_CONTACT', name:'연락하기', cat:'ACC_SOCIAL', color:'#b799ea', durs:[15], energy:-1, relFx:[['RD_CLOSE',1,'both']], target:'person',
   show:['screen:relations'], desc:'메시지나 전화로 안부를 묻는다.'},
  {id:'ACT_MEET', name:'만나기', place:'target', cat:'ACC_SOCIAL', color:'#a284e6', durs:[120,60,180], energy:-4, stress:-3, pay:-10000, target:'person',
   relFx:[['RD_CLOSE',3,'both'],['RD_LIKE*',2,'from'],['RD_LIKE',2,'to']], req:[{k:'targetFree'}], show:['screen:relations'], desc:'밥을 먹거나 차를 마신다. 상대가 나를 어떻게 보는지(외모 취향)에 따라 호감 변화가 다르다.'},
  {id:'ACT_GIFT', name:'선물하기', place:'target', cat:'ACC_SOCIAL', color:'#e66b9a', durs:[30], energy:-1, pay:-100000, target:'person',
   relFx:[['RD_LIKE',4,'from'],['RD_CLOSE',1,'from']], req:[{k:'targetFree'}], show:['screen:relations'], desc:'작은 선물 (5만 원, 임시).'},
  {id:'ACT_CONFESS', name:'고백하기', place:'target', cat:'ACC_SOCIAL', color:'#ff7aa8', durs:[30], energy:-5, stress:5, target:'person', special:'confess',
   req:[{k:'targetFree'},{k:'adultTarget'},{k:'notFamily'},{k:'notDating'}], show:['screen:relations'], desc:'마음을 전한다. 상대에게 그럴 마음이 없으면 결과는 바뀌지 않는다.'},

  {id:'ACT_DATE', name:'데이트', place:'target', cat:'ACC_SOCIAL', color:'#ff8fb8', durs:[180,120,240], energy:-4, stress:-6, pay:-30000, target:'person',
   relFx:[['RD_ROMANCE',4,'both'],['RD_CLOSE',2,'both'],['RD_LIKE*',2,'from']], req:[{k:'targetFree'},{k:'dating'}], show:['screen:relations'], desc:'연인과 시간을 보낸다. 한동안 만나지 않으면 마음이 식는다.'},
  {id:'ACT_PROPOSE', name:'청혼하기', place:'target', cat:'ACC_SOCIAL', color:'#ffb3cf', durs:[60], energy:-5, stress:8, pay:-1500000, target:'person', special:'propose',
   req:[{k:'targetFree'},{k:'dating'}], show:['screen:relations'], desc:'반지를 준비해 청혼한다 (150만 원, 임시). 상대 연애 감정이 충분하지 않으면 거절당한다.'},
  {id:'ACT_WEDDING', name:'결혼식', place:'target', cat:'ACC_SOCIAL', color:'#ffd6e6', durs:[360], energy:-3, stress:-4, pay:-2500000, target:'person', special:'wedding',
   req:[{k:'targetFree'},{k:'engaged'}], show:['screen:relations'], desc:'약혼자와 결혼식을 올린다 (6시간 · 총 1,500만 원, 임시). 배우자가 된다.'},
  {id:'ACT_COHABIT', name:'함께 살자고 하기', place:'target', cat:'ACC_SOCIAL', color:'#f0b8d0', durs:[60], energy:-3, stress:4, target:'person', special:'cohabit',
   req:[{k:'targetFree'},{k:'dating'},{k:'notCohabit'},{k:'homeStorage'}], show:['screen:relations'], desc:'지금 집에서 같이 살자고 한다. 받아들이면 월세를 나눠 내고, 같이 사는 동안은 마음이 쉽게 식지 않는다.'},
  {id:'ACT_BREAKUP', name:'헤어지기', place:'target', cat:'ACC_SOCIAL', color:'#8a6a7a', durs:[60], energy:-6, stress:12, target:'person', special:'breakup',
   req:[{k:'dating'}], show:['screen:relations'], desc:'관계를 끝낸다. 상대에게 원망이 남을 수 있다.'},
  {id:'ACT_SCOUT', name:'스카우트 보고서 요청', place:'PT_ASSOC', cat:'ACC_HUNTER', color:'#7fb4d9', durs:[30], energy:-1, pay:-400000, target:'person',
   req:[{k:'startBetween',from:540,to:1080}], show:['screen:profile'], desc:'협회에 그 헌터의 보고서를 요청한다 (20만 원, 임시). 받은 날의 레벨 · 스탯 · 세부 능력이 담긴다. 시간이 지나면 실제와 달라진다.'},
  {id:'ACT_GATE_SCOUT', name:'게이트 사전 조사', place:'gate', cat:'ACC_HUNTER', color:'#ef5f5f', durs:[60], energy:-5, target:'gate', onGate:'scout',
   show:['screen:gates'], desc:'협회 장비로 몬스터 종류 · 대략 개체 수를 조사한다. 지형 · 자원은 들어가기 전에 알 수 없다.'},
  {id:'ACT_GATE_APPLY', name:'공략 신청', place:'PT_ASSOC', cat:'ACC_HUNTER', color:'#e0605f', durs:[30], energy:-2, target:'gate', onGate:'permit',
   show:['screen:gates'], desc:'협회 단말기로 공략을 신청한다. 협회 개방 게이트는 선착순.'},
  {id:'ACT_TRAVEL', name:'이동', cat:'ACC_LIFE', color:'#6a7a8a', durs:[30], energy:-3, hidden:true, desc:'다른 장소로 간다. 시간 · 교통비는 거리에 따라 (BAL_MOVE).'},
  {id:'ACT_MOVE', name:'이사', cat:'ACC_LIFE', color:'#9a8f6a', durs:[360], energy:-2, stress:1, hidden:true, desc:'짐을 싸서 옮긴다. 재정 화면에서 한다.'},
  {id:'ACT_GATE_RAID', name:'게이트 공략', place:'gate', cat:'ACC_HUNTER', color:'#ef5f5f', durs:[60], energy:-14, stress:3, hidden:true, ai:{awake:true, raid:true, need:{NEED_MONEY:1.0, NEED_ENERGY:-0.8}, goal:{GOAL_GROW:0.8, GOAL_WEALTH:0.8, GOAL_RANK:0.8, GOAL_FAME:0.7}, px:{PX_ADVEN:0.3}}, desc:'게이트 안에서 보낸 시간.'},
  {id:'ACT_ASSOC_SELL', name:'협회 매입소 판매', place:'PT_ASSOC', cat:'ACC_HUNTER', color:'#c98b4a', durs:[60], energy:-3, onSell:'assoc', target:'item',
   req:[{k:'startBetween',from:540,to:1080}], show:['screen:inventory'], desc:'협회 매입소에 가서 마정석 · 소재를 판다. 매입가는 흥정할 수 없다.'},
  {id:'ACT_RECRUIT', name:'길드 영입 제안', place:'target', cat:'ACC_WORK', color:'#4a6fb0', durs:[60], energy:-4, stress:2, target:'person', special:'recruit',
   req:[{k:'targetFree'},{k:'guildMaster'},{k:'startBetween',from:540,to:1260}], show:['screen:squad'], desc:'무소속 헌터를 만나 내 길드에 들어오라고 제안한다. 설득력 + d20 판정.'},
  {id:'ACT_GUILD_VISIT', name:'길드 입단 문의', place:'guild', cat:'ACC_WORK', color:'#a33446', durs:[60], energy:-3, target:'guild', onGuild:'apply',
   req:[{k:'noGuild'},{k:'startBetween',from:540,to:1080}], show:['screen:squad'], desc:'길드 사무실을 찾아가 입단을 문의한다. 받아 주면 계약 제안이 온다.'},
  {id:'ACT_HOSPITAL', name:'병원 치료', place:'PT_HOSPITAL', cat:'ACC_LIFE', color:'#5fb3a3', durs:[120], energy:-3, pay:-30000, heal:0.5, hp:8,
   req:[{k:'injured'},{k:'startBetween',from:540,to:1080}], show:['home','schedule'], ai:{injured:true, need:{NEED_HEALTH:2}}, desc:'헌터 전문 병원. 부상 회복 시간을 줄인다. 치유 포션은 없다.'},
]);

/* 일정 템플릿 — at: 시작 시각(분, 0~1439) · dur: 분. 자정을 넘는 블록도 된다 */
def('schedTemplates', [
  {id:'SCH_SOLO', name:'무소속 기본',
   weekday:[{at:420,act:'ACT_MEAL',dur:60},{at:540,act:'ACT_TR_COMBAT',dur:120},{at:720,act:'ACT_MEAL',dur:60},{at:780,act:'ACT_JOB',dur:240},
            {at:1080,act:'ACT_MEAL',dur:60},{at:1200,act:'ACT_STUDY',dur:120},{at:1380,act:'ACT_SLEEP',dur:480}],
   weekend:[{at:540,act:'ACT_MEAL',dur:60},{at:600,act:'ACT_TR_FIT',dur:90},{at:720,act:'ACT_MEAL',dur:60},{at:840,act:'ACT_FRIENDS',dur:180},
            {at:1140,act:'ACT_REST',dur:120},{at:1380,act:'ACT_SLEEP',dur:480}]},
  {id:'SCH_GUILD', name:'길드원 기본',
   weekday:[{at:420,act:'ACT_MEAL',dur:60},{at:540,act:'ACT_TR_COMBAT',dur:120},{at:720,act:'ACT_MEAL',dur:60},{at:780,act:'ACT_GUILD',dur:240},
            {at:1080,act:'ACT_MEAL',dur:60},{at:1200,act:'ACT_TR_MANA',dur:120},{at:1380,act:'ACT_SLEEP',dur:480}],
   weekend:[{at:540,act:'ACT_MEAL',dur:60},{at:600,act:'ACT_TR_SENSE',dur:120},{at:720,act:'ACT_MEAL',dur:60},{at:840,act:'ACT_FRIENDS',dur:180},
            {at:1140,act:'ACT_REST',dur:120},{at:1380,act:'ACT_SLEEP',dur:480}]},
]);

/* 시간 · 기력 · 수면 · 훈련 밸런스 [prototype_default] */
def('balance', [
  {id:'BAL_TIME', proto:true,
   energyMax:100,          /* 기력 최대치 (수면 부족이 없을 때) */
   awakeDrain:-2,          /* 아무것도 안 할 때 시간당 기력 */
   sleepGain:13,           /* 수면 시간당 기력 회복 */
   sleepNeed:7,            /* 하루 필요 수면(시간). 깨어 있는 동안 수면 부족이 이만큼/24시간 쌓인다 */
   debtPenalty:4,          /* 수면 부족 1시간당 기력 최대치 감소 */
   energyFloorMax:40,      /* 기력 최대치의 하한 */
   lowEnergy:15,           /* 이 아래로 떨어지면 자율 진행을 멈춘다 (설정에서 끌 수 있음) */
   lowEnergyEff:0.5,       /* 기력이 행동 소모량보다 적을 때 훈련 효율 배수 */
   eventPerHour:0.06},     /* 깨어 있는 1시간당 무작위 이벤트 확률 */
  {id:'BAL_TRAIN', proto:true,
   gainPerHour:14,         /* 효율 100%일 때 시간당 진척도. 100이 되면 그룹 안 능력 하나 +1 */
   dayFree:120, dayFade:240, dayMin:0.15,     /* 같은 그룹 하루 120분까지 100%, 이후 240분에 걸쳐 15%까지 */
   weekFree:600, weekFade:1200, weekMin:0.3,  /* 같은 그룹 7일 600분까지 100%, 이후 30%까지 */
   capSlow:0.85},          /* 세부 능력 합계가 잠재 상한의 85%를 넘으면 상한까지 효율이 0으로 줄어든다 */
]);
