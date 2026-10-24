/* =========================================================
   relations.js — 관계 · 외모 평가 (설정집 4.2 · 9.1)
   · 관계는 방향이 있다: 나→상대(to) 와 상대→나(from) 를 따로 기록한다.
     내 감정(to)은 정확히 보이고, 상대의 감정(from)은 친밀도에 따라 짐작만 할 수 있다.
   · relDims  : 관계 차원. range 는 값 범위, def 는 처음 값
   · relStatus: 사실 · 법적 상태 (친구 · 연인 · 배우자 · 전 연인 …). 가족 관계(relTypes 의 가족)와 따로
   · lookScores: 외모 절대 평가 1~20. adult:true 는 성인끼리만 쓰고 보인다
   · 개인 취향은 사람마다 lookScores 가중치로 정해진다 (BAL_REL.taste). 같은 외모라도 보는 사람마다 첫인상이 다르다
   · 수치는 모두 [prototype_default] 임시값
   ========================================================= */

def('relDims', [
  {id:'RD_LIKE',    name:'호감',     range:[-100,100], def:0,  color:'#5cc48a'},
  {id:'RD_CLOSE',   name:'친밀도',   range:[0,100],    def:0,  color:'#4fa8e0'},
  {id:'RD_TRUST',   name:'신뢰',     range:[0,100],    def:20, color:'#7fb4d9'},
  {id:'RD_RESPECT', name:'존경',     range:[0,100],    def:10, color:'#e0a341'},
  {id:'RD_ROMANCE', name:'연애 감정', range:[0,100],    def:0,  color:'#e66b9a', adult:true},
  {id:'RD_RIVAL',   name:'경쟁심',   range:[0,100],    def:0,  color:'#ef8f5f'},
  {id:'RD_GRUDGE',  name:'원망',     range:[0,100],    def:0,  color:'#ef5f5f'},
  {id:'RD_DEPEND',  name:'의존',     range:[0,100],    def:0,  color:'#a284e6'},
]);

def('relStatus', [
  {id:'RS_ACQ',     name:'아는 사이'},
  {id:'RS_FRIEND',  name:'친구'},
  {id:'RS_BEST',    name:'절친'},
  {id:'RS_DATING',  name:'연인', romance:true},
  {id:'RS_ENGAGED', name:'약혼', romance:true},
  {id:'RS_SPOUSE',  name:'배우자', romance:true},
  {id:'RS_EX',      name:'전 연인'},
  {id:'RS_ESTRANGED', name:'절연'},
]);

def('lookScores', [
  {id:'APS_FACE',    name:'얼굴'},
  {id:'APS_BODY',    name:'몸매'},
  {id:'APS_SENSUAL', name:'관능미', adult:true},
  {id:'APS_STYLE',   name:'스타일 관리'},
]);
/* 외형 선택 → 외모 점수 (2026-10-24 사용자: 커마 외형 선택이 점수를 조금씩 올리고 내린다. 커마 화면에는 표시하지 않음)
   lookScoreFx: {id, look(ccLook), opt(lookOpts), aps:{lookScores: ±}} — 헌터를 만들 때(buildHunter) 무작위 점수에 더하고 1~20 으로 자른다.
   지금은 Claude 기본값 (외모 · 몸매 수준 · 피부 · 근육 선명도 · 체지방). 외주로 늘린다 */
def('lookScoreFx', [
  {id:'LSF_LV1', look:'LK_LOOKS', opt:'LV_1', aps:{APS_FACE:-4}},
  {id:'LSF_LV2', look:'LK_LOOKS', opt:'LV_2', aps:{APS_FACE:-2}},
  {id:'LSF_LV3', look:'LK_LOOKS', opt:'LV_3', aps:{APS_FACE:0}},
  {id:'LSF_LV4', look:'LK_LOOKS', opt:'LV_4', aps:{APS_FACE:2}},
  {id:'LSF_LV5', look:'LK_LOOKS', opt:'LV_5', aps:{APS_FACE:4}},
  {id:'LSF_FG1', look:'LK_FIGURE', opt:'LV_1', aps:{APS_BODY:-4, APS_SENSUAL:-2}},
  {id:'LSF_FG2', look:'LK_FIGURE', opt:'LV_2', aps:{APS_BODY:-2, APS_SENSUAL:-1}},
  {id:'LSF_FG3', look:'LK_FIGURE', opt:'LV_3', aps:{APS_BODY:0, APS_SENSUAL:0}},
  {id:'LSF_FG4', look:'LK_FIGURE', opt:'LV_4', aps:{APS_BODY:2, APS_SENSUAL:1}},
  {id:'LSF_FG5', look:'LK_FIGURE', opt:'LV_5', aps:{APS_BODY:4, APS_SENSUAL:2}},
  {id:'LSF_SK1', look:'LK_SKIN', opt:'SKN_1', aps:{APS_FACE:-1, APS_STYLE:-1}},
  {id:'LSF_SK2', look:'LK_SKIN', opt:'SKN_2', aps:{APS_FACE:-1, APS_STYLE:0}},
  {id:'LSF_SK4', look:'LK_SKIN', opt:'SKN_4', aps:{APS_FACE:1, APS_STYLE:0}},
  {id:'LSF_SK5', look:'LK_SKIN', opt:'SKN_5', aps:{APS_FACE:1, APS_STYLE:1}},
  {id:'LSF_MD4', look:'LK_MUSCLE_D', opt:'DF_4', aps:{APS_BODY:1}},
  {id:'LSF_MD5', look:'LK_MUSCLE_D', opt:'DF_5', aps:{APS_BODY:1, APS_SENSUAL:1}},
  {id:'LSF_FT5', look:'LK_FAT', opt:'AM_5', aps:{APS_BODY:-1}},
]);


def('balance', [
  {id:'BAL_REL', proto:true,
   adultAge:19,                   /* 이 나이부터 성인 (관능미 · 연애 감정 · 고백) */
   taste:[0.2,2],                 /* 사람마다 외모 항목 가중치 범위 */
   readExact:60, readRough:30,    /* 내 친밀도가 이 이상이면 상대 감정을 대략(±10) · 단계로 짐작한다. 미만이면 모름 */
   confessMin:50,                 /* 상대 연애 감정이 이 미만이면 고백은 판정과 상관없이 거절된다 (상대 의사 보존) */
   confessDc:18,
   proposeMin:80, proposeDc:16,   /* 청혼: 상대 연애 감정 기준 · 판정 난이도 */
   cohabitMin:70,                 /* 동거 제안: 상대 연애 감정 기준 (미만이면 거절) */
   coolDays:7, coolPerDay:1.5, leaveAt:25},  /* 연인을 coolDays 일 넘게 안 만나면 상대 연애 감정이 하루 coolPerDay 씩 준다. leaveAt 아래로 떨어지면 상대가 이별을 고한다 */
]);
