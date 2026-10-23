/* =========================================================
   npc_ai.js — NPC 자율 행동 (설정집 8장). 플레이어와 같은 행동(actions.js)을 같은 비용 규칙으로 쓴다.
   NPC는 하루를 시간 블록으로 나눠, 블록마다 행동 후보의 '효용'을 계산해 하나를 고른다.
     효용 = base + Σ 욕구 가중치 × 욕구 급함 + Σ 목표 가중치 × 목표 비중 + 성격 보정 − 위험 × 위험 회피 − 비용 보정 + 습관 + 무작위
   행동 쪽 가중치는 actions.js 의 각 행동 ai 필드에 있다:
     ai: { base, need:{NEED_*:w}, goal:{GOAL_*:w}, px:{PX_*:w}, awake:true(각성자만), job:true(직업 있는 사람만),
           weekdays:true(평일만), raid:true(게이트 공략), guild:true(길드원만), injured:true(부상자만), rankMin:n(각성자는 등급 숫자 n 이상 = 그보다 약할 때만) }
   aiNeeds : 욕구. 급함(0~1)은 엔진이 상태에서 계산한다 (계산식은 key 로 고정, 기준값은 BAL_AI)
   aiGoals : 목표. 사람마다 성격(px 가중치)과 시드로 1순위 · 2순위 목표를 정한다. BAL_AI.goalReviewDays 마다 다시 본다
   수치는 모두 [prototype_default] 임시값
   ========================================================= */

def('aiNeeds', [
  {id:'NEED_ENERGY', name:'기력',   desc:'기력이 낮을수록 쉬고 싶다'},
  {id:'NEED_STRESS', name:'스트레스', desc:'스트레스가 높을수록 풀고 싶다'},
  {id:'NEED_MONEY',  name:'돈',     desc:'가진 돈이 생활비 몇 달치보다 적을수록 벌고 싶다'},
  {id:'NEED_SOCIAL', name:'사람',   desc:'사람을 안 만난 날이 길수록 만나고 싶다'},
  {id:'NEED_HEALTH', name:'몸',     desc:'다쳤으면 치료받고 싶다'},
]);

/* px: 성격 축 가중치 (축 값 1~10 을 −1~+1 로 바꿔 곱한다). awake: 각성자만 가질 수 있는 목표 */
def('aiGoals', [
  {id:'GOAL_GROW',   name:'강해지기',         px:{PX_COMPET:0.8, PX_ADVEN:0.6},  awake:true},
  {id:'GOAL_RANK',   name:'등급 올리기',      px:{PX_COMPET:1.0, PX_SELF:0.4},   awake:true},
  {id:'GOAL_WEALTH', name:'돈 모으기',        px:{PX_PRAG:1.0, PX_SELF:0.5}},
  {id:'GOAL_STABLE', name:'안정된 생활',      px:{PX_ADVEN:-1.0, PX_PESSI:0.4}},
  {id:'GOAL_PEOPLE', name:'사람들과 잘 지내기', px:{PX_EXTRO:1.0, PX_SELF:-0.5}},
  {id:'GOAL_FAME',   name:'이름 알리기',      px:{PX_EXPRESS:0.8, PX_COMPET:0.6, PX_ADVEN:0.3}, awake:true},
]);

/* 일반인 직업 · 경력 (비각성자 생활 루프, 설정집 10장). pay: 기본 시급(원) — ACT_WORK 가 쓴다.
   keys   : 일을 잘하는지 정하는 세부 능력 (B · C). 평균 = '업무 능력'
   ladder : 직급. 직급이 하나 오를 때마다 시급 × (1 + BAL_CAREER.payStep)
   student: 학생 (years 년 뒤 졸업 → 업무 능력에 맞는 직업으로 취업) · self: 자영업 (달마다 장사 운 ±selfVar)
   names  : 이 직업으로 볼 고정 NPC 직업 이름 (npcs.js 의 job 문자열을 직업 ID로 연결) */



def('balance', [
  {id:'BAL_AI', proto:true,
   /* 하루 계획: 수면 블록 + 낮 블록들 (분). 블록마다 행동 하나 */
   sleep:[1380, 420], blocks:[[420,480,'meal'],[480,720],[720,780,'meal'],[780,1020],[1020,1140],[1140,1380]],
   temp:0.12,                 /* 무작위성 (클수록 덜 최적 · 더 사람 같음). 성격으로 ±30% */
   habit:0.08,                /* 어제 같은 블록에서 한 행동을 또 할 보너스 */
   repeatPen:0.5,             /* 오늘 이미 한 행동을 또 할 때마다 빼는 값 (하루가 한 가지로만 채워지지 않게) */
   energyFloor:30, energyPen:1.5,   /* 기력이 이 아래면 기력을 쓰는 행동 효용 감소 */
   moneyMonths:3,             /* 생활비 몇 달치보다 적으면 돈 욕구가 생긴다 */
   socialDays:4,              /* 이만큼 사람을 안 만나면 사람 욕구 최대 */
   foodPerDay:20000,          /* 하루 식비 (식사 블록) */
   dependentRate:0.35,        /* 학생 · 무직 일반인은 고정 생활비의 이 비율만 낸다 (가족과 사는 몫). 일반인은 헌터 보험 없음 */
   goalReviewDays:30, goalSecond:0.5,
   risk:{base:0.8, adven:-0.5, pessi:0.4},   /* 위험 회피 = base + 성격 보정. 공략 효용에서 (1 − 예상 성공률) × 위험 회피 를 뺀다 */
   accept:{base:0.55, adven:-0.2, pessi:0.15},  /* 이 성공률 아래로 예상되는 게이트는 고르지 않는다 */
   raidCooldown:2,            /* 공략 뒤 며칠은 공략 효용이 줄어든다 (회복) */
   raidMinutes:[120,300],     /* 공략에 걸리는 시간 (게이트 구역 수에 비례) */
   /* 빠른 공략 결과 (NPC 파티): 성공률 = (전력 비율 r − r0)/span, 최대 max. 플레이어 공략 시뮬의 결과 분포에 맞춘 값 */
   quick:{r0:0.6, span:0.38, max:0.97, failInjury:0.45, failDeath:0.01, winInjury:0.06, winDeath:0.0005},
   /* 공략 수입 (1인): base × mul^(20 − 등급 숫자). 실패하면 failPay 비율. 경제 기준은 사용자가 '나중에' 로 둔 임시값 */
   raidPay:{base:80000, mul:1.32, failPay:0.3},
   /* 지켜보는 게이트를 오늘 누군가 맡을 확률 (협회 개방 · 길드 소유 · 낙찰). 브레이크까지 urgentHours 미만이면 urgentBonus 더함.
      플레이어 길드 소유 · 내 낙찰 게이트는 BAL_WORLD.oursUrgentHours 안쪽에서만 길드 동료가 맡는다 */
   claim:{open:0.35, owned:0.45, won:0.55, urgentHours:48, urgentBonus:0.5},
   bgGate:0.75,               /* 지켜보는 게이트(목록에 있는 게이트)가 없을 때, 다른 곳 게이트를 찾을 확률 */
   partySize:[3,6],
   injuryDays:[2,14],          /* NPC 부상 회복 일수 (경상 ~ 중상) */
   hpRecoverDay:35},
  /* 경력 [prototype_default]: reviewDays 마다 한 번 본다 (사람마다 날짜가 다름)
     승진: 지금 직급에서 promoteMonths 개월 이상 + 확률 promoteBase × (업무 능력/perfRef)²
     해고: fireBase (업무 능력이 firePerf 미만이면 × fireLow) · 무직: hireBase × (업무 능력/perfRef) + 구직 활동 횟수(최대 huntCap) × huntBonus
     자영업: 달마다 장사 운 1 ± selfVar (업무 능력이 높을수록 좋은 쪽) */
  {id:'BAL_CAREER', proto:true, reviewDays:30, promoteMonths:12, promoteBase:0.18, perfRef:10, payStep:0.18,
   fireBase:0.008, firePerf:7, fireLow:3, hireBase:0.15, huntBonus:0.015, huntCap:10, selfVar:0.35, civAbl:{mean:8, sd:2}},
  /* 집계 인구 (수만 명). 개인별로 세부 능력을 저장하지 않고 평균 능력 · 스탯 합계 · 상태만 저장한다.
     플레이어가 관심을 가지면(정보창 · 파티 · 영입) 같은 시드로 세부 능력을 만들어 상세 인물로 '승격'한다 (설정집 8.3) */
  {id:'BAL_POP', proto:true, size:30000, awakeRatio:0.2, guildRatio:0.45, newsRank:6,   /* newsRank: 배경 인구는 이 등급 이상(숫자 이하)일 때만 뉴스 */
   ageRange:[19,62], levelDist:{mean:8, sd:9, max:70},
   awakenPerDay:0.00002,      /* 일반인 1명이 하루에 각성할 확률 (배경 인구) */
   awakenDetailed:0.00015, awakenAgeMax:45,   /* 이름 있는 일반인(가족 · 지인)이 하루에 각성할 확률 · 나이 상한. 이야기를 위해 배경 인구보다 높다 */
   ablAtLevel:{base:7.0, perLevel:0.12, sd:1.2},   /* 평균 세부 능력 ≈ base + perLevel × 레벨 (예시 헌터 분포) */
   statAtLevel:{base:40, perLevel:5, sd:12},
   moneyStart:[500000, 30000000]},
]);
