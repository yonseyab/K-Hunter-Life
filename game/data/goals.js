/* =========================================================
   goals.js — 플레이어 목표 (설정집 8.2: 장기 · 중기 · 단기 목표, 플레이어가 정한 목표는 자동으로 지우거나 바꾸지 않는다)
   objectives : 목표 틀. 플레이어가 고르고, 대상 값(opts)을 정한다
     term    : 'long'(장기) · 'mid'(중기) · 'short'(단기, days 안에 못 하면 실패)
     ai      : 이 목표가 어떤 NPC 목표(aiGoals)와 같은 방향인지 — '목표에 맞춘 일정 만들기'가 NPC와 같은 효용 엔진으로 일정을 짠다
     measure : 진행을 재는 방법 (engine/goals.js)
               rank(등급 숫자, 작을수록 좋음) · level · money · rep · cleared · raids · trainHours · social(만난 횟수) · stressBelow · req(조건 하나, events.js 의 조건 형식)
     rel     : true 면 opts 는 '지금보다 +값' (단기 · 횟수 목표)
     opts    : 고를 수 있는 대상 값. 'rankUp' 은 지금보다 1~3급 위
   수치는 [prototype_default] 임시값
   ========================================================= */

def('balance', [
  {id:'BAL_GOAL', proto:true, max:{long:2, mid:3, short:3}, doneStress:-8, failStress:4, suggest:4,
   terms:{long:'장기', mid:'중기', short:'단기'}},
]);

/* [prototype_default] 자동 일과 안전선과 기록 보관 */
/* 자동 공략 (engine/autoraid.js) [prototype_default]
   startFrom~startTo: 출발할 수 있는 시각(분) · minHp: 출발 HP% · minLeftMin: 브레이크까지 이만큼(분)은 남은 게이트만 · logKeep: 기록 개수
   weights: 방침별 위기 선택지 성향 가중치 (style: safe careful bold greedy team escape) · HP가 후퇴선 + lowHpMargin 아래면 safe · escape 를 lowHpBoost 배 */
def('balance', [{id:'BAL_AUTORAID', proto:true, startFrom:540, startTo:1020, minHp:70, minLeftMin:240, logKeep:30, lowHpMargin:15, lowHpBoost:3,
  weights:{
    safe:    {safe:5, careful:3, team:2.5, escape:2, bold:0.3, greedy:0.2},
    balanced:{careful:4, team:3, safe:2, bold:1.5, greedy:1, escape:0.6},
    profit:  {greedy:5, bold:3, careful:2, team:2, safe:0.5, escape:0.2},
    team:    {team:6, careful:3, safe:2, bold:1, greedy:0.5, escape:0.6}}}]);
def('balance', [{id:'BAL_ROUTINE', proto:true, focusMax:2, hpMin:40, energyMin:20, stressMax:85, urgentHours:12, stepMin:60, historyDays:14, maxDays:30, pageSize:24, diagnosticMax:12, focusBonus:2}]);
