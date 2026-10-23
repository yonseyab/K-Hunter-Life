/* =========================================================
   creation.js — 캐릭터 생성 선택지
   선택지를 늘리려면 해당 배열에 한 줄을 추가하면 된다.
   ※ 각 선택지가 게임에 어떤 영향을 주는지는 아직 정하지 않는다 (2단계 이후 결정).
     지금은 선택 결과가 ID 로 기록만 된다.
   ========================================================= */
/* ---------- 기본 정보 ---------- */
/* lang: 자동 설정 때 고르는 기본 모국어 */
def('ccNations', [
  {id:'NAT_KR', name:'대한민국', code:'KR', lang:'LANG_KO'}, {id:'NAT_JP', name:'일본', code:'JP', lang:'LANG_JA'},
  {id:'NAT_CN', name:'중국', code:'CN', lang:'LANG_ZH'},     {id:'NAT_US', name:'미국', code:'US', lang:'LANG_EN'},
  {id:'NAT_VN', name:'베트남', code:'VN', lang:'LANG_VI'},   {id:'NAT_RU', name:'러시아', code:'RU', lang:'LANG_RU'},
  {id:'NAT_ETC', name:'기타', code:'—'},
]);
def('ccBirthplaces', [
  {id:'BP_SEOUL', name:'서울', nat:'NAT_KR'},   {id:'BP_BUSAN', name:'부산', nat:'NAT_KR'},
  {id:'BP_INCHEON', name:'인천', nat:'NAT_KR'}, {id:'BP_DAEGU', name:'대구', nat:'NAT_KR'},
  {id:'BP_GWANGJU', name:'광주', nat:'NAT_KR'}, {id:'BP_DAEJEON', name:'대전', nat:'NAT_KR'},
  {id:'BP_GANGWON', name:'강원도', nat:'NAT_KR'},{id:'BP_JEJU', name:'제주도', nat:'NAT_KR'},
  {id:'BP_TOKYO', name:'도쿄', nat:'NAT_JP'},   {id:'BP_OSAKA', name:'오사카', nat:'NAT_JP'},
  {id:'BP_SHANGHAI', name:'상하이', nat:'NAT_CN'},{id:'BP_LA', name:'로스앤젤레스', nat:'NAT_US'},
  {id:'BP_HANOI', name:'하노이', nat:'NAT_VN'}, {id:'BP_VLADIVOSTOK', name:'블라디보스토크', nat:'NAT_RU'},
  {id:'BP_ETC', name:'기타 / 미상', nat:null},
]);
def('ccLanguages', [
  {id:'LANG_KO', name:'한국어'}, {id:'LANG_EN', name:'영어'}, {id:'LANG_JA', name:'일본어'},
  {id:'LANG_ZH', name:'중국어'}, {id:'LANG_VI', name:'베트남어'}, {id:'LANG_RU', name:'러시아어'},
  {id:'LANG_ES', name:'스페인어'}, {id:'LANG_SIGN', name:'수어'},
]);
/* 목소리: 음성 에셋과 연결될 프리셋 ID (VOICE_###) */
def('ccVoices', [
  {id:'VOICE_001', name:'낮고 차분한'}, {id:'VOICE_002', name:'맑고 높은'},
  {id:'VOICE_003', name:'허스키한'},     {id:'VOICE_004', name:'굵고 울리는'},
  {id:'VOICE_005', name:'부드러운'},     {id:'VOICE_006', name:'건조한'},
  {id:'VOICE_007', name:'앳된'},
]);
def('ccSpeech', [
  {id:'SPEECH_001', name:'표준어 · 존댓말 위주'}, {id:'SPEECH_002', name:'표준어 · 반말 위주'},
  {id:'SPEECH_003', name:'경상도 사투리'},         {id:'SPEECH_004', name:'전라도 사투리'},
  {id:'SPEECH_005', name:'충청도 사투리'},         {id:'SPEECH_006', name:'제주 방언'},
  {id:'SPEECH_007', name:'무뚝뚝함'},             {id:'SPEECH_008', name:'수다스러움'},
  {id:'SPEECH_009', name:'격식체 · 딱딱함'},       {id:'SPEECH_010', name:'외국어 억양'},
]);

/* ---------- 출신 · 배경: background_options.js 로 이동 ---------- */
/* 성격 축: personality.js 로 이동 */
/* ---------- 외형 ----------
   ccLook     : 외형 항목. slider 가 있으면 슬라이더(키·체중), pool 이면 look_options.js 의 선택지 묶음에서 고른다
   ccLookSets : 성별별 항목 목록과 표시 순서
   ※ 외형 항목이 게임에 주는 영향은 아직 정하지 않는다. */
def('ccLook', [
  {id:'LK_LOOKS',     name:'외모 수준',   pool:'SC_LEVEL'},
  {id:'LK_FIGURE',    name:'몸매 수준',   pool:'SC_LEVEL'},
  {id:'LK_HEIGHT',    name:'키',          slider:{min:140, max:210, unit:'cm', def:{'남':176,'여':163}}},
  {id:'LK_WEIGHT',    name:'체중',        slider:{min:35,  max:150, unit:'kg', def:{'남':72,'여':54}}},
  {id:'LK_FACE',      name:'얼굴 크기',   pool:'SC_SIZE'},
  {id:'LK_SHOULDER',  name:'어깨너비',    pool:'SC_WIDTH'},
  {id:'LK_CHEST_D',   name:'가슴 두께',   pool:'SC_DEPTH'},
  {id:'LK_CHEST_S',   name:'가슴 크기',   pool:'SC_SIZE'},
  {id:'LK_CUP',       name:'컵 사이즈',   pool:'SC_CUP'},   /* 2026-10-23: 이벤트 발동 조건용 (예: G컵 이상 → 옷 사기 곤란) */
  {id:'LK_CHEST_F',   name:'가슴 형태',   pool:'SC_CHEST_SHAPE'},
  {id:'LK_BACK',      name:'등 너비',     pool:'SC_WIDTH'},
  {id:'LK_ARM',       name:'팔 굵기',     pool:'SC_THICK'},
  {id:'LK_WAIST',     name:'허리 굵기',   pool:'SC_THICK'},
  {id:'LK_WAIST_C',   name:'허리 굴곡',   pool:'SC_CURVE'},
  {id:'LK_PELVIS',    name:'골반 너비',   pool:'SC_WIDTH'},
  {id:'LK_HIP',       name:'엉덩이 크기', pool:'SC_SIZE'},
  {id:'LK_HIP_F',     name:'엉덩이 형태', pool:'SC_HIP_SHAPE'},
  {id:'LK_THIGH',     name:'허벅지 굵기', pool:'SC_THICK'},
  {id:'LK_LEG',       name:'다리 길이',   pool:'SC_LENGTH'},
  {id:'LK_MUSCLE',    name:'근육량',      pool:'SC_AMOUNT'},
  {id:'LK_MUSCLE_D',  name:'근육 선명도', pool:'SC_DEFINE'},
  {id:'LK_FAT',       name:'체지방',      pool:'SC_AMOUNT'},
  {id:'LK_SKIN_TONE', name:'피부톤',      pool:'SC_SKIN_TONE'},
  {id:'LK_SKIN',      name:'피부 상태',   pool:'SC_SKIN'},
  {id:'LK_HAIR_STYLE',name:'헤어스타일',  pool:'SC_HAIR_STYLE'},
  {id:'LK_HAIR_COLOR',name:'머리색',      pool:'SC_HAIR_COLOR'},
  {id:'LK_AGELOOK',   name:'동안 · 노안', pool:'SC_AGELOOK'},
  {id:'LK_MOOD',      name:'외형 분위기', pool:'SC_MOOD'},
  {id:'LK_OUTFIT',    name:'의상 스타일', pool:'SC_OUTFIT'},
]);
def('ccLookSets', [
  {id:'LS_M', sex:'남', items:['LK_LOOKS','LK_FIGURE','LK_HEIGHT','LK_WEIGHT','LK_FACE','LK_SHOULDER','LK_CHEST_D','LK_BACK','LK_ARM','LK_WAIST','LK_PELVIS','LK_HIP','LK_THIGH','LK_LEG','LK_MUSCLE','LK_MUSCLE_D','LK_FAT','LK_SKIN_TONE','LK_SKIN','LK_AGELOOK','LK_HAIR_STYLE','LK_HAIR_COLOR','LK_MOOD','LK_OUTFIT']},
  {id:'LS_F', sex:'여', items:['LK_LOOKS','LK_FIGURE','LK_HEIGHT','LK_WEIGHT','LK_FACE','LK_SHOULDER','LK_CHEST_S','LK_CUP','LK_CHEST_F','LK_ARM','LK_WAIST','LK_WAIST_C','LK_PELVIS','LK_HIP','LK_HIP_F','LK_THIGH','LK_LEG','LK_MUSCLE','LK_FAT','LK_SKIN_TONE','LK_SKIN','LK_AGELOOK','LK_HAIR_STYLE','LK_HAIR_COLOR','LK_MOOD','LK_OUTFIT']},
]);
/* 각성 · 시작 단계는 없어졌다: 항상 각성 직후 · 무소속으로 시작 (classes.js 의 ccRules) */
/* 이름 생성용 (가족 NPC) */
def('namePool', [
  {id:'NAMEPOOL_KR',
   family:['김','이','박','최','정','강','조','윤','장','임','한','오','서','신','권','황','안','송','전','홍','유','고','문','양','손','배','백','허','남','심','노','하','곽','성','차','주','우','구','민','류','나','진','지','엄','채','원','천','방','공','현'],
   male:['민준','서준','도윤','예준','시우','하준','주원','지호','준서','건우','현우','정훈','상철','영수','지훈','우진','선우','서진','민재','현준','연우','유준','정우','승우','승현','시윤','준혁','은우','지환','승민','지우','유찬','윤우','민성','준영','시후','진우','지원','수호','재윤','태윤','한결','동현','성민','재현','영호','성훈','기현','태현','민호','경수','진호','상훈','병철','재석','용준','형준','대현','석진','광수'],
   female:['서연','서윤','지우','하은','민서','지유','윤서','채원','수아','지아','미숙','영희','순자','은정','지민','서현','예은','하윤','수빈','지원','다은','예린','소율','나은','유나','가은','서영','민지','수민','예지','하린','지현','은서','소연','혜원','유진','다인','아린','채은','시은','예서','주아','은비','지수','현정','미영','정희','경희','수진','은영','혜진','선영','미경','지영','은주','소희','보람','슬기','한나','세영']},
]);
