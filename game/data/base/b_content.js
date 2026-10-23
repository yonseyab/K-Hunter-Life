/* =========================================================
   data/base/b_content.js — Claude가 먼저 만드는 최소 재료 (배치 코드 B, 2026-10-23)
   엔진이 직접 가리키거나 없으면 게임이 돌지 않는 것만 꼭 필요한 만큼 넣었다. 정식 콘텐츠는 나중에 외주로 채운다.
   ID 규칙: <접두사>_B#### (B = Claude 기본분). 외주 배치는 다른 글자를 쓴다.
   ========================================================= */

/* ---------- 아이템 · 시스템 상점 ---------- */
def('items', [
  {id:'IT_B0001', old:true, name:'옛 마정석 (하)',   cat:'ITC_STONE', rank:'RANK_19', price:89000,    desc:'원산지: 20~16급 게이트. 협회 인증 등급 하. 매입가는 협회 고시가로만 거래한다. 개인 간 거래 시 과태료.'},
  {id:'IT_B0002', old:true, name:'옛 마정석 (중)',   cat:'ITC_STONE', rank:'RANK_14', price:620000,   desc:'원산지: 15~11급 게이트. 협회 인증 등급 중. 운반 시 등록증 지참.'},
  {id:'IT_B0003', old:true, name:'옛 마정석 (상)',   cat:'ITC_STONE', rank:'RANK_08', price:4500000,  desc:'원산지: 10~6급 게이트. 협회 인증 등급 상. 반출 신고 대상.'},
  {id:'IT_B0004', old:true, name:'옛 마정석 (최상)', cat:'ITC_STONE', rank:'RANK_03', price:30000000, desc:'원산지: 5급 이상 게이트. 국가 관리 물자. 발견 즉시 협회 신고 의무.'},
  {id:'IT_B0010', name:'지갑',          cat:'ITC_DAILY', rank:null, price:0, desc:'신분증 · 헌터 등록증 · 체크카드.'},
  {id:'IT_B0011', name:'스마트폰',      cat:'ITC_DAILY', rank:null, price:0, desc:'협회 앱이 깔린 개인 휴대전화. 게이트 안에서는 먹통.'},
  {id:'IT_B0012', name:'집 열쇠',       cat:'ITC_DAILY', rank:null, price:0, desc:''},
  {id:'IT_B0020', name:'구급 키트',     cat:'ITC_CONSUME', rank:null, price:45000, use:{hp:10,cure:'INJ_BLEED'}, desc:'붕대 · 지혈대 · 소독약. 식약처 의료기기 2등급. 지혈대는 2시간 넘게 감지 말 것.'},
  {id:'IT_B0021', name:'협회 지급 단검', cat:'ITC_WEAPON', grade:'IG_1', rank:'RANK_20', price:180000, slot:'SLOT_WEAPON', sources:['SRC_ASSOC_GIVE'], desc:'신규 등록 헌터 지급품. 협회 인증 20급. 재판매 금지.'},
  {id:'IT_B0022', name:'방검 조끼 (보급형)', cat:'ITC_ARMOR', grade:'IG_1', rank:'RANK_19', price:420000, slot:'SLOT_TOP', sources:['SRC_ASSOC_GIVE'], desc:'경찰 방검복에 마수 가죽을 덧댄 보급형. 국산. 세탁기 사용 금지.'},
  {id:'IT_B0023', name:'마력 포션 (하급)', cat:'ITC_CONSUME', rank:'RANK_18', price:120000, use:{mp:25}, desc:'마력 소폭 회복. 1일 3병 이하 권장. 치유 포션은 존재하지 않는다.'},
  {id:'IT_B0024', name:'게이트용 방호 마스크', cat:'ITC_GEAR', rank:null, price:95000, desc:'KF 마력 필터 내장. 필터 교체 주기 게이트 3회.'},
  {id:'IT_B0030', name:'마수 송곳니', cat:'ITC_MAT', rank:'RANK_17', price:35000, desc:'공방 가공 소재. 협회 매입 대상.'},
  {id:'IT_B0031', name:'점액 결정',   cat:'ITC_MAT', rank:'RANK_19', price:12000, desc:'부정형 몬스터 잔해. 장갑 착용 후 취급.'},
]);
def('sysShop', [
  {id:'SS_B0001', item:'IT_B0023', price:120000, coin:12, stock:null},
  {id:'SS_B0002', item:'IT_B0020', price:50000,  coin:5,  stock:null},
  {id:'SS_B0003', item:'IT_B0024', price:110000, coin:11, stock:null},
  {id:'SS_B0004', item:'IT_B0022', price:460000, coin:46, stock:3},
]);

/* ---------- 몬스터 (분류마다 몇 종 — 게이트 생성에 필요) ---------- */
def('monsters', [
  {id:'MON_B001', name:'고블린',       cat:'MC_HUMANOID', rank:'RANK_19', drops:[{item:'IT_B0030',chance:0.3,qty:1}], desc:'무리를 짓는 작은 인간형. 신입이 가장 먼저 만나는 몬스터.'},
  {id:'MON_B002', name:'오크 전사',    cat:'MC_HUMANOID', rank:'RANK_13', drops:[], desc:'덩치 큰 인간형. 조잡한 도끼를 휘두른다.'},
  {id:'MON_B003', name:'늑대형 마수',  cat:'MC_BEAST',    rank:'RANK_16', drops:[{item:'IT_B0030',chance:0.8,qty:2}], desc:'측면을 노리는 무리 사냥꾼.'},
  {id:'MON_B004', name:'철갑 멧돼지',  cat:'MC_BEAST',    rank:'RANK_11', drops:[{item:'IT_B0030',chance:0.6,qty:3}], desc:'돌진 한 번에 방패가 휜다.'},
  {id:'MON_B005', name:'슬라임',       cat:'MC_AMORPH',   rank:'RANK_20', drops:[{item:'IT_B0031',chance:0.7,qty:2}], desc:'느리지만 산성 체액이 장비를 상하게 한다.'},
  {id:'MON_B006', name:'그림자 점액',  cat:'MC_AMORPH',   rank:'RANK_15', drops:[{item:'IT_B0031',chance:0.5,qty:3}], desc:'빛이 없는 곳에서만 움직인다.'},
  {id:'MON_B007', name:'스켈레톤 병사', cat:'MC_UNDEAD',  rank:'RANK_17', drops:[], desc:'부서져도 다시 맞춰진다. 머리를 깨야 끝난다.'},
  {id:'MON_B008', name:'구울',         cat:'MC_UNDEAD',   rank:'RANK_12', drops:[], desc:'썩은 손톱에 마비 독.'},
  {id:'MON_B009', name:'거대 개미',    cat:'MC_INSECT',   rank:'RANK_18', drops:[], desc:'개미산 분사. 굴을 판다.'},
  {id:'MON_B010', name:'칼날 사마귀',  cat:'MC_INSECT',   rank:'RANK_10', drops:[], desc:'앞다리 날이 방검 조끼를 가른다.'},
  {id:'MON_B011', name:'미확인 개체',  cat:'MC_UNKNOWN',  rank:'RANK_07', drops:[], desc:'협회 분류 대기 중. 교전 기록 부족.'},
  {id:'MON_B012', name:'석상 수호자',  cat:'MC_UNKNOWN',  rank:'RANK_04', drops:[], desc:'상위 게이트 보스로 보고된 개체.'},
]);

/* ---------- 클래스 · 스킬 (역할마다 하나) ---------- */
def('classes', [
  {id:'CLS_B01', name:'방패병',   cat:'CC_MELEE',   role:'ROLE_TANK', pick:2, desc:'앞에서 버티는 클래스.', pool:['SK_B0001','SK_B0002','SK_B0003','SK_B0004']},
  {id:'CLS_B02', name:'검사',     cat:'CC_MELEE',   role:'ROLE_MDPS', pick:2, desc:'가장 흔한 근접 클래스. 같은 검사라도 스킬은 사람마다 다르다.', pool:['SK_B0005','SK_B0006','SK_B0007','SK_B0008']},
  {id:'CLS_B03', name:'궁수',     cat:'CC_RANGED',  role:'ROLE_RDPS', pick:2, desc:'거리를 유지하며 쏜다.', pool:['SK_B0009','SK_B0010','SK_B0011','SK_B0012']},
  {id:'CLS_B04', name:'원소술사', cat:'CC_MAGIC',   role:'ROLE_MAGE', pick:2, desc:'마력을 원소로 바꿔 쓴다.', pool:['SK_B0013','SK_B0014','SK_B0015','SK_B0016']},
  {id:'CLS_B05', name:'치유사',   cat:'CC_SUPPORT', role:'ROLE_HEAL', pick:2, desc:'상처를 봉합하고 지혈한다. 포션은 없다.', pool:['SK_B0017','SK_B0018','SK_B0019','SK_B0020']},
  {id:'CLS_B06', name:'결계사',   cat:'CC_SUPPORT', role:'ROLE_SUP',  pick:2, desc:'결계로 파티를 받친다.', pool:['SK_B0021','SK_B0022','SK_B0023','SK_B0024']},
  {id:'CLS_B07', name:'추적자',   cat:'CC_SPECIAL', role:'ROLE_SCOUT', pick:2, desc:'앞서 길을 읽는다.', pool:['SK_B0025','SK_B0026','SK_B0027','SK_B0028']},
]);
def('skills', [
  {id:'SK_B0001', name:'방패 밀치기', scope:'class', kind:'액티브', desc:'방패로 밀어 거리를 만든다. 반동 주의.'},
  {id:'SK_B0002', name:'도발',       scope:'class', kind:'액티브', desc:'적의 시선을 끈다.'},
  {id:'SK_B0003', name:'버티기',     scope:'class', kind:'패시브', desc:'받는 충격을 조금 줄인다.'},
  {id:'SK_B0004', name:'철벽',       scope:'class', kind:'액티브', desc:'짧은 시간 움직이지 않는 대신 거의 밀리지 않는다.'},
  {id:'SK_B0005', name:'연속 베기',  scope:'class', kind:'액티브', desc:'두 번 벤다.'},
  {id:'SK_B0006', name:'흘려 막기',  scope:'class', kind:'패시브', desc:'칼끝으로 공격을 흘린다.'},
  {id:'SK_B0007', name:'돌파',       scope:'class', kind:'액티브', desc:'적 사이로 파고든다.'},
  {id:'SK_B0008', name:'일섬',       scope:'class', kind:'액티브', desc:'한 번에 거리를 좁혀 벤다.'},
  {id:'SK_B0009', name:'조준',       scope:'class', kind:'패시브', desc:'명중이 오른다.'},
  {id:'SK_B0010', name:'연사',       scope:'class', kind:'액티브', desc:'세 발을 빠르게 쏜다.'},
  {id:'SK_B0011', name:'관통 사격',  scope:'class', kind:'액티브', desc:'두 마리를 꿰뚫는다.'},
  {id:'SK_B0012', name:'후퇴 사격',  scope:'class', kind:'액티브', desc:'물러나며 쏜다.'},
  {id:'SK_B0013', name:'화염구',     scope:'class', kind:'액티브', desc:'작은 불덩이. 실내 사용 주의.'},
  {id:'SK_B0014', name:'빙결',       scope:'class', kind:'액티브', desc:'발을 얼린다.'},
  {id:'SK_B0015', name:'마력 순환',  scope:'class', kind:'패시브', desc:'마력 회복이 빨라진다.'},
  {id:'SK_B0016', name:'낙뢰',       scope:'class', kind:'액티브', desc:'좁은 범위에 번개를 떨군다.'},
  {id:'SK_B0017', name:'지혈',       scope:'class', kind:'액티브', desc:'출혈을 멈춘다.'},
  {id:'SK_B0018', name:'봉합',       scope:'class', kind:'액티브', desc:'베인 상처를 닫는다.'},
  {id:'SK_B0019', name:'생명 감지',  scope:'class', kind:'패시브', desc:'파티원의 상태를 느낀다.'},
  {id:'SK_B0020', name:'응급 소생',  scope:'class', kind:'액티브', desc:'쓰러진 동료를 깨운다. 하루 한 번.'},
  {id:'SK_B0021', name:'방어 결계',  scope:'class', kind:'액티브', desc:'얇은 막을 친다.'},
  {id:'SK_B0022', name:'정화',       scope:'class', kind:'액티브', desc:'독 · 산을 씻어 낸다.'},
  {id:'SK_B0023', name:'가속',       scope:'class', kind:'액티브', desc:'파티 발걸음이 빨라진다.'},
  {id:'SK_B0024', name:'마력 공유',  scope:'class', kind:'액티브', desc:'자기 마력을 나눠 준다.'},
  {id:'SK_B0025', name:'흔적 읽기',  scope:'class', kind:'패시브', desc:'발자국 · 마력 흔적을 읽는다.'},
  {id:'SK_B0026', name:'은신',       scope:'class', kind:'액티브', desc:'잠깐 기척을 지운다.'},
  {id:'SK_B0027', name:'함정 해제',  scope:'class', kind:'액티브', desc:'함정을 찾아 푼다.'},
  {id:'SK_B0028', name:'급소 찌르기', scope:'class', kind:'액티브', desc:'약점을 노린다.'},
  {id:'SK_B0101', name:'위기 감지',  scope:'common', kind:'패시브', desc:'나쁜 예감이 잘 맞는다.'},
  {id:'SK_B0102', name:'응급 처치',  scope:'common', kind:'액티브', desc:'붕대를 빨리 감는다.'},
  {id:'SK_B0103', name:'지구력',     scope:'common', kind:'패시브', desc:'덜 지친다.'},
  {id:'SK_B0104', name:'야간 시야',  scope:'common', kind:'패시브', desc:'어두운 곳에서 조금 더 보인다.'},
  {id:'SK_B0105', name:'짐 꾸리기',  scope:'common', kind:'패시브', desc:'회수품을 더 챙긴다.'},
  {id:'SK_B0106', name:'침착',       scope:'common', kind:'패시브', desc:'위기에서 손이 덜 떨린다.'},
]);

/* ---------- 특성 (몇 개) ---------- */
def('traits', [
  {id:'TR_B0001', name:'정의감',   cat:'TC_MIND',   cost:-2, pick:true, tags:['성격'], desc:'위험에 처한 사람을 보면 몸이 먼저 움직인다.'},
  {id:'TR_B0002', name:'겁이 많음', cat:'TC_MIND',  cost:3,  pick:true, tags:['성격'], desc:'위험 앞에서 쉽게 굳는다.'},
  {id:'TR_B0003', name:'튼튼한 몸', cat:'TC_BODY',  cost:-3, pick:true, tags:['신체'], desc:'잘 다치지 않고 회복이 빠르다.'},
  {id:'TR_B0004', name:'불면증',   cat:'TC_BODY',   cost:2,  pick:true, tags:['신체'], desc:'잠드는 데 오래 걸린다.'},
  {id:'TR_B0005', name:'붙임성',   cat:'TC_SOCIAL', cost:-2, pick:true, tags:['관계'], desc:'처음 보는 사람과도 금방 말을 튼다.'},
  {id:'TR_B0006', name:'짠돌이',   cat:'TC_LIFE',   cost:-1, pick:true, tags:['돈'], desc:'만 원 한 장에도 손이 떨린다.'},
  {id:'TR_B0007', name:'빚',       cat:'TC_PAST',   cost:4,  pick:true, tags:['돈','과거'], desc:'갚아야 할 돈이 있다.'},
  {id:'TR_B0008', name:'게이트 생존자', cat:'TC_PAST', cost:1, pick:true, tags:['과거'], desc:'어릴 때 브레이크 현장에 있었다.'},
]);

/* ---------- 일반인 직업 · 경력 메시지 (배경 인구 시뮬레이션에 필요) ---------- */
def('aiJobs', [
  {id:'JOB_B_OFFICE',  name:'회사원',    pay:18000, w:5, keys:['ABL_B01','ABL_B15','ABL_B24'], ladder:['사원','주임','대리','과장','차장','부장'], names:['회사원','직장인']},
  {id:'JOB_B_SERVICE', name:'서비스직',  pay:12500, w:4, keys:['ABL_B15','ABL_B18','ABL_C09'], ladder:['직원','매니저','점장']},
  {id:'JOB_B_STUDENT', name:'대학생',    pay:0,     w:2, keys:['ABL_B04','ABL_B03','ABL_B09'], student:true, years:4, names:['대학생','학생']},
  {id:'JOB_B_SELF',    name:'자영업',    pay:19000, w:2, keys:['ABL_B30','ABL_B17','ABL_B38'], ladder:['사장'], self:true, names:['식당 운영','자영업','가게 운영']},
  {id:'JOB_B_ASSOC',   name:'협회 직원', pay:18500, w:1, keys:['ABL_B33','ABL_B34','ABL_B29'], ladder:['주무관','주임','팀장','부장']},
  {id:'JOB_B_FACTORY', name:'생산직',    pay:15500, w:2, keys:['ABL_C08','ABL_C09','ABL_C04'], ladder:['사원','반장','조장','공장장']},
]);
def('careerMsgs', [
  {id:'CM_B_PROMO', ev:'promo', texts:['나 승진했어. 이제 {rank}.','인사 발표 났는데 {rank} 달았다 ㅋㅋ']},
  {id:'CM_B_FIRED', ev:'fired', texts:['회사 잘렸다. 당분간 좀 쉴게.','정리해고 명단에 내 이름 있더라.']},
  {id:'CM_B_HIRED', ev:'hired', texts:['취직했어! {job}으로 다음 주 출근.','{job} 붙었다. 드디어.']},
  {id:'CM_B_GRAD',  ev:'grad',  texts:['졸업했어. {job}으로 취업도 됨.','학교 끝. 이제 {job}.']},
  {id:'CM_B_BOOM',  ev:'boom',  texts:['요즘 가게 장사 잘 된다. 밥 한번 사 줄게.']},
  {id:'CM_B_SLUMP', ev:'slump', texts:['가게가 요즘 한산하네… 게이트 공사 때문에 손님이 끊겼어.']},
]);

/* ---------- 길드 (NPC 소속에 필요). 대기업 계열 영어 · 회사식, 연합 · 공공 한자어, 민간 파티 순우리말 ---------- */
def('guilds', [
  {id:'GD_B01', name:'한결 파티',        short:'한', rank:'RANK_16', color:'#3f6b4f', color2:'#5c9670', region:'RG_SEOUL_MAPO',     master:'HN_B0001', funds:8200000,     raids:31, rep:22, recruit:{minLv:20, minRep:0,  share:[4,7],  months:6}},
  {id:'GD_B02', name:'청운 길드',        short:'청', rank:'RANK_12', color:'#26446e', color2:'#3c6aa6', region:'RG_SEOUL_EUNPYEONG', master:'HN_B0005', funds:310000000,   raids:96, rep:48, recruit:{minLv:15, minRep:5,  share:[6,10], months:12}},
  {id:'GD_B03', name:'아던트 파트너스',  short:'A',  rank:'RANK_05', color:'#2a2440', color2:'#6650a8', region:'RG_SEOUL_GANGNAM',   master:'HN_B0009', funds:24000000000, raids:240, rep:92, recruit:{minLv:9,  minRep:40, share:[10,14], months:24}},
  {id:'GD_B04', name:'해솔 연합',        short:'해', rank:'RANK_09', color:'#7a4b10', color2:'#c9861d', region:'RG_GG_SEONGNAM',     master:'HN_B0011', funds:1200000000,  raids:150, rep:70, recruit:{minLv:13, minRep:20, share:[8,12], months:12}},
  {id:'GD_B05', name:'바람결',           short:'바', rank:'RANK_15', color:'#2f6f73', color2:'#47a3a8', region:'RG_IC_YEONSU',       master:'HN_B0012', funds:21000000,    raids:40, rep:25, recruit:{minLv:20, minRep:0,  share:[5,8],  months:6}},
]);

/* ---------- 고정 NPC (데모 가족 · 지인) ---------- */
def('npcs', [
  {id:'NP_B0001', name:'김순례', sex:'여', age:58, job:'식당 운영', jobId:'JOB_B_SELF',    region:'RG_SEOUL_MAPO', portrait:'POR_NP_B0001'},
  {id:'NP_B0002', name:'이도윤', sex:'남', age:22, job:'대학생',    jobId:'JOB_B_STUDENT', region:'RG_SEOUL_MAPO', portrait:'POR_NP_B0002'},
  {id:'NP_B0003', name:'박상민', sex:'남', age:27, job:'회사원',    jobId:'JOB_B_OFFICE',  region:'RG_SEOUL_YEONGDEUNGPO', portrait:'POR_NP_B0003'},
  {id:'NP_B0004', name:'최유나', sex:'여', age:26, job:'편의점 점장', jobId:'JOB_B_SERVICE', region:'RG_SEOUL_MAPO', portrait:'POR_NP_B0004'},
]);

/* ---------- 목표 (몇 개) ---------- */
def('objectives', [
  {id:'OBJ_B_RANK',   term:'long',  ai:'GOAL_RANK',   measure:'rank',  opts:'rankUp', name:'{t}급 달성', desc:'상태창이 등급을 올려 줄 만큼 강해진다.'},
  {id:'OBJ_B_MONEY',  route:'finance', term:'long', ai:'GOAL_WEALTH', measure:'money', opts:[10000000,30000000,100000000], name:'{t} 모으기', desc:'가진 돈이 목표 금액이 된다.'},
  {id:'OBJ_B_GUILD',  route:'guild', term:'mid',   ai:'GOAL_STABLE', measure:'req',   req:{k:'hasGuild'}, name:'길드 들어가기', desc:'길드와 계약한다.'},
  {id:'OBJ_B_LOVER',  route:'relations', term:'mid', ai:'GOAL_PEOPLE', measure:'req', req:{k:'romanceAny'}, name:'연인 만들기', desc:'누군가와 사귄다.'},
  {id:'OBJ_B_CLEAR',  route:'gates', term:'mid',   ai:'GOAL_FAME',   measure:'cleared', rel:true, opts:[3,5,10], name:'게이트 {t}회 더 클리어', desc:'게이트 공략에 성공한다.'},
  {id:'OBJ_B_TRAIN',  term:'short', ai:'GOAL_GROW',   measure:'trainHours', rel:true, opts:[6,10,15], days:7, name:'이번 주 훈련 {t}시간', desc:'일주일 안에 훈련 시간을 채운다.'},
  {id:'OBJ_B_SOCIAL', term:'short', ai:'GOAL_PEOPLE', measure:'social', rel:true, opts:[2,3,5], days:7, name:'이번 주 사람 {t}번 만나기', desc:'교류 행동 1시간 이상.'},
  {id:'OBJ_B_RAID',   route:'gates', term:'short', ai:'GOAL_WEALTH', measure:'raids', rel:true, opts:[1,2,3], days:7, name:'이번 주 게이트 {t}회 공략', desc:'성공 · 후퇴 모두.'},
]);

/* ---------- 세상 소식 (뉴스 · 소문 · 들은 이야기) — 이야기 창이 비지 않을 만큼 ---------- */
def('news', [
  {id:'NEWS_B0001', cat:'협회', tone:'',  title:'협회 "1999년 이후 누적 게이트 4천만 건 돌파"… 브레이크 비율은 역대 최저', when:'어제'},
  {id:'NEWS_B0002', cat:'경제', tone:'',  title:'마정석(하) 고시가 3주 연속 동결… 소형 길드 "생활비도 안 나온다"', when:'오늘'},
]);
def('newsPool', [
  {id:'NWP_B0001', cat:'사회', tone:'',  title:'"게이트 옆 원룸 월세 반값" 대학가 자취생들 몰려'},
  {id:'NWP_B0002', cat:'경제', tone:'',  title:'헌터 전용 상해보험료 또 인상… 20급은 월 31만 원'},
  {id:'NWP_B0003', cat:'협회', tone:'a', title:'협회, 신규 각성자 무료 기초 교육 과정 확대'},
  {id:'NWP_B0004', cat:'사회', tone:'',  title:'지하철 2호선 출근길 게이트 통제로 40분 지연… 시민 "이젠 놀랍지도 않다"'},
  {id:'NWP_B0005', cat:'길드', tone:'',  title:'대형 길드 하청 파티 사망 사고… "위험은 아래로, 수익은 위로"'},
  {id:'NWP_B0006', cat:'국제', tone:'b', title:'해외 브레이크 피해 지역 재건 지원금 국회 통과'},
  {id:'NWP_B0007', cat:'커뮤니티', tone:'', title:'[인기글] 20급 헌터 월급 공개합니다 (댓글 1,204)'},
  {id:'NWP_B0008', cat:'경제', tone:'a', title:'게이트 관련주 일제히 상승… 마정석 발전 단가 하락 전망'},
]);
def('rumorPool', [
  {id:'RP_B0001', text:'{a}이(가) 다른 길드로 옮긴다는 소문'},
  {id:'RP_B0002', text:'{a}이(가) 크게 다쳤다는 소문'},
  {id:'RP_B0003', text:'{a}이(가) 협회 재측정을 앞두고 있다는 소문'},
]);
def('hearTexts', [
  {id:'HT_B0001', on:'npcRankUp',   text:'{a}이(가) {rank}급으로 올랐다고 한다'},
  {id:'HT_B0002', on:'npcRaidWin',  text:'{a}이(가) {gate} 공략에 성공했다고 한다'},
  {id:'HT_B0003', on:'npcInjured',  text:'{a}이(가) {gate}에서 다쳤다고 한다'},
  {id:'HT_B0004', on:'npcDied',     text:'{a}이(가) 세상을 떠났다 — {why}'},
  {id:'HT_B0005', on:'npcAwaken',   text:'{a}이(가) 각성했다고 한다 ({role})'},
  {id:'HT_B0006', on:'career:promo',text:'{a}이(가) {rank}(으)로 승진했다고 한다'},
  {id:'HT_B0007', on:'career:fired',text:'{a}이(가) 일을 그만두게 됐다고 한다'},
  {id:'HT_B0008', on:'career:hired',text:'{a}이(가) {job} 일을 새로 시작했다고 한다'},
  {id:'HT_B0009', on:'career:grad', text:'{a}이(가) 졸업했다고 한다'},
  {id:'HT_B0010', on:'career:boom', text:'{a}의 가게가 요즘 잘된다고 한다'},
  {id:'HT_B0011', on:'career:slump',text:'{a}의 가게가 요즘 힘들다고 한다'},
  {id:'HT_B0012', on:'guildSign',   text:'{a}이(가) {guild}와(과) 계약했다고 한다'},
  {id:'HT_B0013', on:'guildLeave',  text:'{a}이(가) {guild}을(를) 떠났다고 한다'},
]);
/* 실제 장소 목록(data/pool)이 다 떨어졌을 때만 쓰는 마지막 대비용 */
def('gatePlaces', [
  {id:'GP_B_MAPO', region:'RG_SEOUL_MAPO', places:['합정역 지하상가','망원시장 뒤편','공덕 오거리 공터']},
]);
def('assets', []);
def('gates', []);
