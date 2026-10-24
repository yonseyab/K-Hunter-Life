/* =========================================================
   system.js — 새 버전(K-Hunter-Life) 시스템 테이블. Claude 관리 (구조 · 수치). 문장 재료는 data/base · data/ext · data/packs
   mindTags     : 판단 엔진의 의미 태그. 선택지 점수 = Σ(태그 × 재료). 재료 키:
                  px:<성격 축>   성격 8축 (1~10을 −1~+1로 바꿔 씀. +는 b극 쪽 — 예: PX_ADVEN + = 모험 추구)
                  emo:<감정>     지금 감정 세기 (0~1)
                  st:<상태>      hpLow · energyLow · stressHigh · moneyLow · injured · sleepy (0~1)
                  self:<자기 인식> looks · skill · money · belong (−1~+1, 0 = 보통)
                  pol:<방침>     risk · money · team · rest (설정의 방침, −1~+1)
   styleTags    : 옛 위기 선택지 style → 태그 (태그가 없을 때)
   mindWhy      : 고른 이유 문장 조각. key = 가장 크게 작용한 재료, sign = 방향(+ − ). "{p}" = 이름(부르는 이름)
   emotions     : 감정. half = 반감기(시간), show = 상태 칸에 보이는 최소 세기
   emoTriggers  : 일 → 감정 변화 (on = 엔진이 부르는 일 이름)
   milestoneTypes : 고비 회고 (big = 기본 설정에서 멈춤)
   stopKinds    : 멈춤 종류 (설정 › 멈춤에서 켜고 끔)
   nationStates : 국가 상태 (게이트 브레이크로 무너진 나라 등 — 나라별 값은 세계관 콘텐츠)
   ========================================================= */
/* ════ '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   mindTags     : + name · desc · icon · group 묶음 · opposite 반대 꼬리표 · px {ccPersonality: 가중치} · emo {emotions: 가중치}
   emotions     : + name · color · icon · desc · group(good · bad · neutral) · decay 하루 줄어드는 양 · max · opposite [emotions] · mind {mindTags: 가중치} · face 표정 문장 · lines {rise, peak, fade}
   emoTriggers  : + on · emo · v · cond 조건(글/규칙) · chance · text
   milestoneTypes: + name · big · desc · icon · cond 규칙 · once 한 번만 · chapter 장(章)을 여는가 · emo {emotions} · px {ccPersonality} · lines
   stopKinds    : + name · dflt · big · desc · icon · ask 헌터가 성좌에게 묻는 문장(글) */
def('mindTags', [
  {id:'TAG_RISK',     name:'위험 감수', w:{'px:PX_ADVEN':1.0,'px:PX_PESSI':-0.7,'emo:EM_ANGER':0.5,'emo:EM_JOY':0.4,'emo:EM_ANX':-0.8,'st:hpLow':-1.2,'st:injured':-0.8,'self:skill':0.6,'pol:risk':1.0}},
  {id:'TAG_SAFE',     name:'안전',     w:{'px:PX_ADVEN':-0.8,'px:PX_PESSI':0.6,'emo:EM_ANX':0.7,'st:hpLow':1.0,'st:injured':0.7,'self:skill':-0.4,'pol:risk':-1.0}},
  {id:'TAG_CAREFUL',  name:'신중',     w:{'px:PX_ADVEN':-0.4,'px:PX_PESSI':0.4,'px:PX_PRAG':-0.2,'emo:EM_ANX':0.4,'st:hpLow':0.4,'pol:risk':-0.5}},
  {id:'TAG_KIND',     name:'친절',     w:{'px:PX_SELF':-1.0,'px:PX_COMPET':-0.4,'emo:EM_JOY':0.3,'emo:EM_ANGER':-0.6,'self:belong':0.3,'pol:team':0.6}},
  {id:'TAG_SELFISH',  name:'이기적',   w:{'px:PX_SELF':1.0,'px:PX_COMPET':0.4,'emo:EM_ANGER':0.4,'st:moneyLow':0.5,'pol:team':-0.6}},
  {id:'TAG_HONEST',   name:'정직',     w:{'px:PX_PRAG':-0.9,'px:PX_EXPRESS':0.3,'emo:EM_ANX':-0.2}},
  {id:'TAG_AVOID',    name:'회피',     w:{'px:PX_EXTRO':-0.5,'px:PX_PESSI':0.5,'px:PX_DEPEND':0.3,'emo:EM_ANX':0.7,'emo:EM_SAD':0.6,'st:stressHigh':0.6,'st:energyLow':0.4}},
  {id:'TAG_CONFRONT', name:'정면 대결', w:{'px:PX_COMPET':0.8,'px:PX_ADVEN':0.4,'px:PX_DEPEND':-0.4,'emo:EM_ANGER':0.9,'emo:EM_ANX':-0.5,'self:skill':0.4}},
  {id:'TAG_MONEY',    name:'돈 우선',  w:{'px:PX_PRAG':0.7,'px:PX_SELF':0.3,'st:moneyLow':1.2,'self:money':-0.8,'pol:money':1.0}},
  {id:'TAG_GREEDY',   name:'욕심',     w:{'px:PX_PRAG':0.5,'px:PX_ADVEN':0.4,'px:PX_SELF':0.4,'st:moneyLow':0.6,'st:hpLow':-0.6,'pol:money':0.8,'pol:risk':0.4}},
  {id:'TAG_LOVE',     name:'연애 적극', w:{'px:PX_EXTRO':0.6,'px:PX_EXPRESS':0.6,'px:PX_ADVEN':0.3,'emo:EM_JOY':0.5,'emo:EM_LONELY':0.7,'emo:EM_SAD':-0.3,'self:looks':0.5}},
  {id:'TAG_FACE',     name:'체면',     w:{'px:PX_COMPET':0.6,'px:PX_EXPRESS':-0.3,'px:PX_DEPEND':-0.3,'emo:EM_PROUD':0.5,'self:looks':0.3,'self:skill':0.3}},
  {id:'TAG_TEAM',     name:'동료',     w:{'px:PX_COMPET':-0.7,'px:PX_DEPEND':0.4,'px:PX_SELF':-0.4,'self:belong':0.4,'pol:team':1.0}},
  {id:'TAG_RULE',     name:'원칙',     w:{'px:PX_PRAG':-1.0,'px:PX_ADVEN':-0.2}},
  {id:'TAG_GAIN',     name:'실리',     w:{'px:PX_PRAG':1.0,'st:moneyLow':0.3}},
  {id:'TAG_SOCIAL',   name:'어울림',   w:{'px:PX_EXTRO':1.0,'emo:EM_LONELY':0.8,'emo:EM_JOY':0.3,'emo:EM_SAD':-0.3,'st:energyLow':-0.4,'self:belong':0.2}},
  {id:'TAG_ALONE',    name:'혼자',     w:{'px:PX_EXTRO':-1.0,'px:PX_DEPEND':-0.4,'emo:EM_SAD':0.4,'emo:EM_ANGER':0.3,'st:stressHigh':0.3}},
  {id:'TAG_REST',     name:'쉼',       w:{'st:energyLow':1.3,'st:stressHigh':0.8,'st:hpLow':0.8,'st:injured':0.7,'st:sleepy':0.8,'emo:EM_SAD':0.3,'px:PX_ADVEN':-0.2,'pol:rest':1.0}},
  {id:'TAG_WORK',     name:'일',       w:{'px:PX_COMPET':0.3,'px:PX_SELF':0.2,'st:moneyLow':0.8,'st:energyLow':-1.0,'st:stressHigh':-0.4,'emo:EM_PROUD':0.3,'pol:rest':-0.8}},
  {id:'TAG_ESCAPE',   name:'도망',     w:{'px:PX_PESSI':0.6,'px:PX_ADVEN':-0.5,'emo:EM_ANX':0.9,'st:hpLow':1.4,'st:injured':0.8,'pol:risk':-0.7}},
]);
def('styleTags', [
  {id:'safe',    tags:['TAG_SAFE']},
  {id:'careful', tags:['TAG_CAREFUL']},
  {id:'bold',    tags:['TAG_RISK','TAG_CONFRONT']},
  {id:'greedy',  tags:['TAG_GREEDY','TAG_MONEY']},
  {id:'team',    tags:['TAG_TEAM','TAG_KIND']},
  {id:'escape',  tags:['TAG_ESCAPE','TAG_AVOID']},
]);
/* 이유 문장 조각 — "{why} {p}은(는) 결국 ~했다"처럼 붙는다. 더 많은 변형은 나중에 Claude가 */
def('mindWhy', [
  {id:'MW_0001', key:'px:PX_ADVEN',  sign:1,  text:'모험을 마다하지 않는'},
  {id:'MW_0002', key:'px:PX_ADVEN',  sign:-1, text:'익숙한 길이 편한'},
  {id:'MW_0003', key:'px:PX_PESSI',  sign:1,  text:'늘 최악을 먼저 떠올리는'},
  {id:'MW_0004', key:'px:PX_PESSI',  sign:-1, text:'어떻게든 될 거라 믿는'},
  {id:'MW_0005', key:'px:PX_SELF',   sign:1,  text:'제 몫을 먼저 챙기는'},
  {id:'MW_0006', key:'px:PX_SELF',   sign:-1, text:'남 일을 그냥 못 넘기는'},
  {id:'MW_0007', key:'px:PX_PRAG',   sign:1,  text:'계산이 빠른'},
  {id:'MW_0008', key:'px:PX_PRAG',   sign:-1, text:'원칙을 굽히지 않는'},
  {id:'MW_0009', key:'px:PX_EXTRO',  sign:1,  text:'사람을 좋아하는'},
  {id:'MW_0010', key:'px:PX_EXTRO',  sign:-1, text:'혼자가 편한'},
  {id:'MW_0011', key:'px:PX_COMPET', sign:1,  text:'지는 걸 싫어하는'},
  {id:'MW_0012', key:'px:PX_COMPET', sign:-1, text:'다 같이 가는 게 먼저인'},
  {id:'MW_0013', key:'px:PX_DEPEND', sign:1,  text:'기댈 곳을 찾는'},
  {id:'MW_0014', key:'px:PX_DEPEND', sign:-1, text:'무엇이든 혼자 정하는'},
  {id:'MW_0015', key:'px:PX_EXPRESS',sign:1,  text:'속을 숨기지 못하는'},
  {id:'MW_0016', key:'px:PX_EXPRESS',sign:-1, text:'표정 변화가 없는'},
  {id:'MW_0017', key:'emo:EM_ANX',   sign:1,  text:'불안이 가시지 않은'},
  {id:'MW_0018', key:'emo:EM_ANGER', sign:1,  text:'화가 덜 풀린'},
  {id:'MW_0019', key:'emo:EM_JOY',   sign:1,  text:'들뜬 기분이 남은'},
  {id:'MW_0020', key:'emo:EM_SAD',   sign:1,  text:'가라앉은'},
  {id:'MW_0021', key:'emo:EM_LONELY',sign:1,  text:'요즘 부쩍 외로운'},
  {id:'MW_0022', key:'emo:EM_PROUD', sign:1,  text:'자신감이 붙은'},
  {id:'MW_0023', key:'st:hpLow',     sign:1,  text:'몸 상태가 좋지 않은'},
  {id:'MW_0024', key:'st:energyLow', sign:1,  text:'지칠 대로 지친'},
  {id:'MW_0025', key:'st:stressHigh',sign:1,  text:'신경이 곤두선'},
  {id:'MW_0026', key:'st:moneyLow',  sign:1,  text:'통장 잔고가 마음에 걸리는'},
  {id:'MW_0027', key:'st:injured',   sign:1,  text:'다친 데가 아직 욱신거리는'},
  {id:'MW_0028', key:'st:sleepy',    sign:1,  text:'잠이 모자란'},
  {id:'MW_0029', key:'self:skill',   sign:1,  text:'실력에 자신이 있는'},
  {id:'MW_0030', key:'self:skill',   sign:-1, text:'아직 실력이 모자라다고 여기는'},
  {id:'MW_0031', key:'self:money',   sign:-1, text:'돈 걱정이 떠나지 않는'},
  {id:'MW_0032', key:'self:belong',  sign:-1, text:'어디에도 속하지 못한 느낌인'},
  {id:'MW_0033', key:'self:looks',   sign:1,  text:'외모에 자신이 있는'},
  {id:'MW_0034', key:'self:looks',   sign:-1, text:'외모에 자신이 없는'},
  {id:'MW_0035', key:'pol',          sign:1,  text:'정해 둔 방침대로'},
  {id:'MW_0036', key:'mem',          sign:1,  text:'지난번 일이 마음에 걸린'},
  {id:'MW_0037', key:'rel',          sign:1,  text:'그 사람을 믿는'},
  {id:'MW_0038', key:'rel',          sign:-1, text:'그 사람이 영 미덥지 않은'},
  {id:'MW_0039', key:'noise',        sign:1,  text:'평소답지 않게'},
]);

def('emotions', [
  {id:'EM_CALM',   name:'평온',   half:0,  show:0,  color:'#8fa3b8'},
  {id:'EM_JOY',    name:'들뜸',   half:10, show:25, color:'#e0b341'},
  {id:'EM_PROUD',  name:'뿌듯함', half:16, show:25, color:'#5cc48a'},
  {id:'EM_ANX',    name:'불안',   half:14, show:25, color:'#c58be0'},
  {id:'EM_ANGER',  name:'분노',   half:6,  show:25, color:'#ef5f5f'},
  {id:'EM_SAD',    name:'우울',   half:30, show:25, color:'#6b8fd6'},
  {id:'EM_LONELY', name:'외로움', half:48, show:30, color:'#7fb4d9'},
]);
/* 감정 변화. on: raidWin · raidLose · raidDown · injury · injuryBig · allyHurt · allyDeath · famDeath · rankUp · levelUp ·
   loveStart · loveEnd · married · rejected · moneyShort · paid · joinGuild · leaveGuild · alone(하루 혼자) · social(만남) · praised · insulted · rest */
def('emoTriggers', [
  {id:'ET_01', on:'raidWin',    fx:{EM_JOY:30, EM_PROUD:25, EM_ANX:-15}},
  {id:'ET_02', on:'raidLose',   fx:{EM_SAD:20, EM_ANX:20, EM_PROUD:-20}},
  {id:'ET_03', on:'raidDown',   fx:{EM_ANX:45, EM_SAD:20}},
  {id:'ET_04', on:'injury',     fx:{EM_ANX:15}},
  {id:'ET_05', on:'injuryBig',  fx:{EM_ANX:40, EM_SAD:25}},
  {id:'ET_06', on:'allyHurt',   fx:{EM_ANX:15}},
  {id:'ET_07', on:'allyDeath',  fx:{EM_SAD:70, EM_ANX:30, EM_ANGER:20}},
  {id:'ET_08', on:'famDeath',   fx:{EM_SAD:85}},
  {id:'ET_09', on:'rankUp',     fx:{EM_PROUD:45, EM_JOY:35}},
  {id:'ET_10', on:'levelUp',    fx:{EM_PROUD:10}},
  {id:'ET_11', on:'loveStart',  fx:{EM_JOY:55, EM_LONELY:-60}},
  {id:'ET_12', on:'loveEnd',    fx:{EM_SAD:55, EM_LONELY:35}},
  {id:'ET_13', on:'married',    fx:{EM_JOY:60, EM_LONELY:-80}},
  {id:'ET_14', on:'rejected',   fx:{EM_SAD:30, EM_ANGER:10}},
  {id:'ET_15', on:'moneyShort', fx:{EM_ANX:30}},
  {id:'ET_16', on:'paid',       fx:{EM_JOY:10}},
  {id:'ET_17', on:'joinGuild',  fx:{EM_JOY:30, EM_LONELY:-30}},
  {id:'ET_18', on:'leaveGuild', fx:{EM_ANX:20, EM_LONELY:15}},
  {id:'ET_19', on:'alone',      fx:{EM_LONELY:6}},
  {id:'ET_20', on:'social',     fx:{EM_LONELY:-15, EM_SAD:-5}},
  {id:'ET_21', on:'praised',    fx:{EM_JOY:8, EM_PROUD:5}},
  {id:'ET_22', on:'insulted',   fx:{EM_ANGER:25, EM_SAD:8}},
  {id:'ET_23', on:'rest',       fx:{EM_ANX:-5, EM_ANGER:-5}},
]);

def('milestoneTypes', [
  {id:'MS_FIRST_RAID',  name:'첫 공략',       big:true},
  {id:'MS_FIRST_CLEAR', name:'첫 클리어',     big:true},
  {id:'MS_RANKUP',      name:'승급',          big:true},
  {id:'MS_LOVE',        name:'연애 시작',     big:true},
  {id:'MS_LOVE_END',    name:'이별',          big:false},
  {id:'MS_MARRY',       name:'결혼',          big:true},
  {id:'MS_BIG_INJURY',  name:'큰 부상',       big:true},
  {id:'MS_ALLY_DEATH',  name:'동료의 죽음',   big:true},
  {id:'MS_FAM_DEATH',   name:'가족의 죽음',   big:true},
  {id:'MS_GUILD_JOIN',  name:'길드 입단',     big:true},
  {id:'MS_GUILD_MOVE',  name:'이적',          big:true},
  {id:'MS_GUILD_FOUND', name:'길드 설립',     big:true},
  {id:'MS_YEAR',        name:'헌터 생활 1년', big:false},
  {id:'MS_RETIRE',      name:'은퇴',          big:true},
]);
/* 멈춤 종류. dflt = 기본 켜짐(‘사건마다’일 때). big = '큰 갈림길만'에서도 멈춤 */
def('stopKinds', [
  {id:'SK_LOVE',      name:'연애',        dflt:true,  big:true},
  {id:'SK_DEATH',     name:'죽을 위험',   dflt:true,  big:true},
  {id:'SK_MOVE',      name:'이적 · 영입', dflt:true,  big:true},
  {id:'SK_CONTRACT',  name:'계약',        dflt:true,  big:true},
  {id:'SK_FAMILY',    name:'가족',        dflt:true,  big:false},
  {id:'SK_CRISIS',    name:'공략 위기',   dflt:false, big:false},
  {id:'SK_MONEY',     name:'돈',          dflt:true,  big:false},
  {id:'SK_SOCIAL',    name:'인간관계',    dflt:true,  big:false},
  {id:'SK_WORLD',     name:'세상 일',     dflt:false, big:false},
  {id:'SK_MILESTONE', name:'고비 회고',   dflt:true,  big:true},
]);
/* 기록관 · 이어 가기 관계 */
def('relTypes', [
  {id:'REL_MENTOR',   name:'스승', tag:'동료'},
  {id:'REL_DISCIPLE', name:'제자', tag:'동료'},
]);
def('nationStates', [
  {id:'NS_OK',      name:'정상'},
  {id:'NS_PART',    name:'일부 상실'},
  {id:'NS_FALLEN',  name:'붕괴'},
  {id:'NS_RECOVER', name:'수복 중'},
]);

/* ---------- 수치 [prototype_default] ---------- */
def('balance', [
  /* 실시간 재생: secPerDay = ×1 배속에서 하루가 흐르는 실제 초. speeds = 배속 버튼. tickMs = 화면 갱신 간격 · nextChunk = '다음 사건까지'에서 한 번에 돌리는 분 · nextMaxDays */
  {id:'BAL_PLAY', proto:true, secPerDay:30, speeds:[1,2,5,20], tickMs:250, nextChunk:60, nextMaxDays:30, planAt:300, dayEndAt:1380},
  /* 판단 엔진: noise = 무작위 크기(예측 가능성 설정별) · impulse = 즉흥성(성격) 가중 · emoNoise = 분노 · 들뜸이 무작위를 키우는 정도
     okWeight = 판정 성공 확률이 점수에 미치는 정도 · deadly = '치명적' 선택지 감점 · policyVsChar = 방침 대 성격 기본(0 = 성격만, 1 = 방침만)
     drift = 큰 사건 하나가 성격 축을 움직이는 정도(1~10 척도) · driftMax = 한 축이 시작값에서 움직일 수 있는 최대 */
  {id:'BAL_MIND', proto:true, noise:{steady:0.12, some:0.35, often:0.7}, impulse:0.25, emoNoise:0.35, okWeight:1.6, deadly:1.2, policyVsChar:0.4, drift:0.18, driftMax:3, memDays:30,
   /* 하루 공략 판단: 출발 점수 = 태그 점수 + base. 기준선 이상이면 출발 */
   raid:{from:540, to:1020, base:0.1, minEnergy:35, minHp:55, againPenalty:0.5, lateTo:960, load3:0.35, load7:0.12}},
  /* 이야기꾼: quietH 동안 큰일이 없으면 확률을 조금씩 올리고(최대 maxBoost), window 시간 안에 큰일이 busyN 번 넘게 몰리면 낮춘다(damp) */
  {id:'BAL_TELLER', proto:true, quietH:36, rampH:72, maxBoost:1.8, window:72, busyN:4, damp:0.55, smallShare:0.7},
  /* 작은 일 · 만남: 시간당 기본 확률 × 장소 · 같이 있는 사람 · 기분 */
  /* 활동 중인 사람 (engine/active.js): idleDays 동안 안 엮이면 배경으로 · max 명 넘으면 오래된 순 · keepClose 이상 친하면 안 내려감 · emoDecay 하루마다 감정 × · contactPerDay 먼저 연락 기본 확률 */
  {id:'BAL_ACTIVE', proto:true, idleDays:60, max:200, keepClose:40, emoDecay:0.6, contactPerDay:0.03},
  {id:'BAL_SMALL', proto:true, perHour:0.10, meetPerHour:0.08, placeMul:{PT_HOME:0.6, PT_CAFE:1.6, PT_WORK:1.2, PT_TRAIN:1.0, PT_ASSOC:1.1, PT_GUILD:1.2, PT_HOSPITAL:0.8, PT_LIB:0.7, PT_GATE:0.5, TRAVEL:1.5},
   companyMul:1.3, moodMul:{EM_JOY:1.2, EM_SAD:0.8, EM_LONELY:1.2}, newsPerDay:2.5, rumorPerDay:0.8},
  /* 감정: show 이상인 가장 센 감정이 '지금 감정'. 성격 보정: 비관 → 불안 · 우울 +, 표현 많음 → 반감기 짧음 */
  {id:'BAL_EMO', proto:true, pessiMul:0.35, expressHalf:0.25, sampleEvery:360, logKeep:2000},
  /* 자기 인식(세 층의 3층): 사실 기준선 ± 성격 · 들은 말. band = 사실에서 벗어날 수 있는 최대 폭 */
  {id:'BAL_SELF', proto:true, band:25, pessiBias:12, hearStep:3, hearDecay:0.02},
  /* 인구 · 게이트 규모 (사용자 결정 2026-10-23: 각성 0.5% · 활동 0.2%)
     sidoPop: 2026년 시도 인구(만 명, 근삿값) · awakeCap/civSize: 상세 시뮬레이션 행 수 상한(넘으면 가중치) · zoneKm: 생활권(사는 시도 + 이 거리 안 다른 지역)
     게이트: 활동 헌터 × raidsPerWeek ÷ 7 ÷ partyAvg ÷ clearShare = 하루 발생 수. localKm: 개별 게이트로 만드는 범위(사는 지역 + 인접) */
  {id:'BAL_SCALE', proto:true, popKR:51700000, awakeRate:0.005, activeRate:0.002, raidsPerWeek:1.5, partyAvg:4.5, clearShare:0.9,
   sidoPop:{SEOUL:933, BUSAN:327, DAEGU:236, INCHEON:302, GWANGJU:140, DAEJEON:144, ULSAN:110, SEJONG:39, GYEONGGI:1370, GANGWON:151, CHUNGBUK:159, CHUNGNAM:213, JEONBUK:173, JEONNAM:179, GYEONGBUK:253, GYEONGNAM:324, JEJU:67},
   awakeCap:24000, civSize:9000, zoneKm:20, localKm:7, localMax:6, clearMeanH:14, gpKeep:4000, aggKeep:30, breakNewsLv:12,
   /* 게이트 등급 분포 [등급 숫자, 가중치] — 옛 rankWeights 비율 유지 + 11급 이상을 이어 붙임 */
   rankW:[[20,30],[19,26],[18,18],[17,12],[16,8],[15,5],[14,3],[13,2],[12,1],[11,0.6],[10,0.35],[9,0.2],[8,0.12],[7,0.07],[6,0.04],[5,0.02],[4,0.01],[3,0.005],[2,0.002],[1,0.001]]},
  /* 나이 · 끝: 은퇴를 생각하기 시작하는 나이 · 노화 사망(곰페르츠) · 은퇴 뒤 노년을 흘리는 해마다 문장 수 */
  {id:'BAL_AGE', proto:true, retireThink:52, retireBase:0.002, illnessFrom:55, gompA:0.00003, gompB:0.085, epilogueLines:2, maxAge:104},
]);
