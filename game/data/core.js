/* =========================================================
   core.js — 게임 규칙의 기본 단위 (능력치, 역할, 등급, 관계, 활동, 지역, 발신자)
   모든 항목은 id 로 참조한다. 새 항목은 배열에 한 줄 추가하면 된다.
   ID 규칙: 접두사_이름 (대문자 · 숫자 · _). 외주 배치는 배치 코드를 넣는다.
   ========================================================= */

/* 능력치는 data/abilities.js (기본 스탯 · 세부 능력 A/B/C · 밸런스) */

/* 파티 역할 — zone: 파티 진형도 위치 [가로(0 왼쪽~2 오른쪽), 세로(0 전열~2 후열)], keys: 적합도 계산 가중치 (세부 능력 ID) (정보창에서 강조), prefs: 선호 전투 방식 */
def('roles', [
  {id:'ROLE_TANK',  name:'탱커',       short:'TK', zone:[1,0], kind:'수비',
   keys:{ABL_A04:3,ABL_A28:2,ABL_A30:2,ABL_A06:1,ABL_B10:1,ABL_B40:1}, prefs:['적의 시선을 끌어 파티를 보호한다','좁은 통로에서 진형을 유지한다','후퇴 시 마지막까지 남는다']},
  {id:'ROLE_MDPS',  name:'근접 딜러',  short:'MD', zone:[0,0], kind:'공격',
   keys:{ABL_A01:3,ABL_A02:2,ABL_A03:2,ABL_A05:2,ABL_A06:2,ABL_B08:1}, prefs:['선두에서 돌파를 시도한다','약점을 노려 일격에 마무리한다','적 후열로 파고든다']},
  {id:'ROLE_RDPS',  name:'원거리 딜러',short:'RD', zone:[0,2], kind:'공격',
   keys:{ABL_A02:3,ABL_A10:2,ABL_B09:2,ABL_A18:1,ABL_A21:1,ABL_B07:1}, prefs:['엄폐물 뒤에서 저격한다','우선 처치 대상을 먼저 노린다','거리를 유지하며 견제한다']},
  {id:'ROLE_MAGE',  name:'마법 딜러',  short:'MG', zone:[2,2], kind:'공격',
   keys:{ABL_A09:3,ABL_A07:2,ABL_A08:2,ABL_A16:2,ABL_A17:1,ABL_B01:1}, prefs:['범위 마법으로 무리를 정리한다','마력을 아껴 보스에 집중한다']},
  {id:'ROLE_HEAL',  name:'힐러',       short:'HL', zone:[1,2], kind:'지원',
   keys:{ABL_A25:3,ABL_A12:2,ABL_A17:2,ABL_A08:1,ABL_B37:1,ABL_B10:1}, prefs:['위험한 파티원부터 치유한다','마력 소모를 계산해 회복한다']},
  {id:'ROLE_SUP',   name:'서포터',     short:'SP', zone:[1,1], kind:'지원',
   keys:{ABL_A27:3,ABL_A15:2,ABL_A14:1,ABL_B22:2,ABL_B39:1,ABL_B15:1}, prefs:['전투 전에 강화를 건다','파티 진형을 지휘한다']},
  {id:'ROLE_SCOUT', name:'스카우트',   short:'SC', zone:[2,0], kind:'지원',
   keys:{ABL_A21:3,ABL_A19:2,ABL_A24:2,ABL_A23:1,ABL_B07:1,ABL_A03:1}, prefs:['앞서 나가 함정을 확인한다','기척을 숨겨 적 배치를 파악한다']},
]);

/* 등급 — 헌터 · 게이트 · 몬스터 · 장비 공통. 1급이 최상위, 20급이 최하위 (세계관 설정집 3.5). lv: 숫자 등급 */
def('ranks', [
  {id:'RANK_01', name:'1', lv:1, color:'#ef5f5f'},
  {id:'RANK_02', name:'2', lv:2, color:'#ea7655'},
  {id:'RANK_03', name:'3', lv:3, color:'#e58c4b'},
  {id:'RANK_04', name:'4', lv:4, color:'#e0a341'},
  {id:'RANK_05', name:'5', lv:5, color:'#d09b6a'},
  {id:'RANK_06', name:'6', lv:6, color:'#c19494'},
  {id:'RANK_07', name:'7', lv:7, color:'#b28cbd'},
  {id:'RANK_08', name:'8', lv:8, color:'#a284e6'},
  {id:'RANK_09', name:'9', lv:9, color:'#8d8de4'},
  {id:'RANK_10', name:'10', lv:10, color:'#7896e3'},
  {id:'RANK_11', name:'11', lv:11, color:'#649fe2'},
  {id:'RANK_12', name:'12', lv:12, color:'#4fa8e0'},
  {id:'RANK_13', name:'13', lv:13, color:'#52afca'},
  {id:'RANK_14', name:'14', lv:14, color:'#56b6b5'},
  {id:'RANK_15', name:'15', lv:15, color:'#59bda0'},
  {id:'RANK_16', name:'16', lv:16, color:'#5cc48a'},
  {id:'RANK_17', name:'17', lv:17, color:'#68b890'},
  {id:'RANK_18', name:'18', lv:18, color:'#73ac96'},
  {id:'RANK_19', name:'19', lv:19, color:'#7ea09d'},
  {id:'RANK_20', name:'20', lv:20, color:'#8a94a3'},
]);

/* 관계 유형 */
def('relTypes', [
  {id:'REL_MOTHER',  name:'어머니',   tag:'가족'}, {id:'REL_FATHER', name:'아버지', tag:'가족'},
  {id:'REL_SISTER',  name:'여동생',   tag:'가족'}, {id:'REL_BROTHER',name:'남동생', tag:'가족'},
  {id:'REL_OSIS',    name:'누나 · 언니', nameM:'누나', nameF:'언니', tag:'가족'}, {id:'REL_OBRO',   name:'형 · 오빠', nameM:'형', nameF:'오빠', tag:'가족'},
  {id:'REL_GRAND',   name:'할머니',   tag:'가족'}, {id:'REL_SPOUSE', name:'배우자', tag:'가족'},
  {id:'REL_CHILD',   name:'자녀',     tag:'가족'}, {id:'REL_GRANDPA', name:'할아버지', tag:'가족'},
  {id:'REL_STEP',    name:'의붓 부모', tag:'가족'},
  {id:'REL_FRIEND',  name:'친구',     tag:'친구'}, {id:'REL_COLLEAGUE',name:'동료',tag:'동료'},
  {id:'REL_LEADER',  name:'파티장',   tag:'동료'}, {id:'REL_RIVAL',  name:'라이벌', tag:'라이벌'},
  {id:'REL_LOVER',   name:'연인',     tag:'연애'},
  {id:'REL_ACQ',     name:'아는 헌터', tag:'지인'},
]);

/* 일정 활동 */
/* 행동 · 일정은 data/actions.js */

/* 지역 — gateDensity: 게이트 출현 빈도 (이벤트 조건에 사용) · geo: [경도, 위도] 이동 시간 계산용 (places.js BAL_MOVE) · prov: 시도 지도 키
   여기는 직접 정한 지역. 나머지 전국 시 · 군 · 구는 regions_all.js (tools/build_regions.py 자동 생성) */
def('regions', [
  {id:'RG_SEOUL_MAPO',   name:'서울 마포구',   gateDensity:3, geo:[126.90,37.56], prov:'SEOUL'},
  {id:'RG_SEOUL_GANGNAM',name:'서울 강남구',   gateDensity:2, geo:[127.05,37.50], prov:'SEOUL'},
  {id:'RG_SEOUL_EUNPYEONG',name:'서울 은평구', gateDensity:2, geo:[126.93,37.60], prov:'SEOUL'},
  {id:'RG_GG_SEONGNAM',  name:'경기 성남시',   gateDensity:2, geo:[127.13,37.42], prov:'GYEONGGI'},
  {id:'RG_IC_YEONSU',    name:'인천 연수구',   gateDensity:2, geo:[126.68,37.41], prov:'INCHEON'},
  {id:'RG_BS_HAEUNDAE',  name:'부산 해운대구', gateDensity:3, geo:[129.16,35.16], prov:'BUSAN'},
  {id:'RG_GJ_BUK',       name:'광주 북구',     gateDensity:1, geo:[126.91,35.17], prov:'GWANGJU'},
  {id:'RG_GW_CHUNCHEON', name:'강원 춘천시',   gateDensity:1, geo:[127.73,37.88], prov:'GANGWON'},
  {id:'RG_JJ_JEJU',      name:'제주시',        gateDensity:1, geo:[126.53,33.50], prov:'JEJU'},
]);

/* 알림 분류 (단말기 › 알림). 위에서부터: 제목 머리(prefix)가 맞으면 그 분류, 아니면 보낸 쪽(from), 길드가 보냈으면 guild, 그래도 없으면 dflt.
   분류마다 알림을 끌 수 있다(끈 분류는 목록에만 남고 배지 · 새 알림 표시 없음). '선택 필요' 알림(이벤트)은 끌 수 없다 */
def('alertCats', [
  {id:'AC_GATE',     name:'게이트', prefix:['[공지]','[낙찰]','[유찰]','[위탁]','[공략 보고서]','[협회] 무허가']},
  {id:'AC_GUILD',    name:'길드',   prefix:['[길드','계약 종료'], guild:true},
  {id:'AC_TRADE',    name:'거래',   prefix:['[경매'], from:['SYS_BANK']},
  {id:'AC_DISASTER', name:'재난',   from:['SYS_ALERT']},
  {id:'AC_LIFE',     name:'생활',   from:['SYS_LIFE']},
  {id:'AC_ASSOC',    name:'협회',   from:['SYS_ASSOC','SYS_RANK'], dflt:true},
]);

/* 시스템 발신자 (단말기 알림) */
def('senders', [
  {id:'SYS_ASSOC', name:'헌터 협회',       av:'협', color:'#4fa8e0'},
  {id:'SYS_LIFE',  name:'일상',            av:'·',  color:'#9aa3b2'},  /* 협회 · 재난이 아닌 생활 사건 알림 (외주 요청 2026-10) */
  {id:'SYS_ALERT', name:'긴급 재난 알림',  av:'!',  color:'#ef5f5f'},
  {id:'SYS_RANK',  name:'협회 등급 관리',  av:'협', color:'#4fa8e0'},
  {id:'SYS_BANK',  name:'청운은행',        av:'₩',  color:'#5cc48a'},
]);
