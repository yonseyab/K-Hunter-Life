/* =========================================================
   abilities.js — 능력치 구조 (세계관 설정집 3.3 · 4.3 · 4.4 기준)
   · 기본 스탯 4종 (STAT_*)  : 레벨 1에서 약 10. 레벨업마다 합계 +5 자동 분배. 상한 없음.
   · 세부 능력 (ABL_*)       : 모두 1~20.
       각성자   = A(각성자 전문 30) + B(공통 40)  → 70개
       비각성자 = B(공통 40) + C(비각성자 전문 20) → 60개
     클래스·직업마다 목록을 따로 만들지 않는다. 종합 능력(CA) 수치는 두지 않는다.
   · 잠재력은 캐릭터 데이터(pot)에 둔다: level = 도달 가능한 최대 레벨(≤100),
     cap = 활성 세부 능력 합계의 상한. 게임 안에서는 추정치로만 보인다.
   새 능력은 abilities 에 한 줄 추가하면 표시 · 생성 · 판정에 바로 쓰인다.
   ========================================================= */

def('baseStats', [
  {id:'STAT_BODY',  name:'신체', short:'신체', desc:'힘 · 체력 · 민첩 · 내구'},
  {id:'STAT_MIND',  name:'정신', short:'정신', desc:'집중 · 의지 · 압력 저항 (지식이나 판단력과는 다르다)'},
  {id:'STAT_MANA',  name:'마력', short:'마력', desc:'마력 보유량과 출력의 바탕'},
  {id:'STAT_SENSE', name:'감각', short:'감각', desc:'지각 · 기척 · 재료 · 마력 흐름 감지'},
]);

/* 능력 묶음 — who: 'awake' 각성자만 · 'all' 모두 · 'mundane' 비각성자만 */
def('ablSets', [
  {id:'ABS_A', name:'각성자 전문', short:'A', who:'awake'},
  {id:'ABS_B', name:'공통',        short:'B', who:'all'},
  {id:'ABS_C', name:'비각성자 전문', short:'C', who:'mundane'},
]);

/* 표시 그룹 — col: 정보창 열 (0~2) */
def('ablGroups', [
  {id:'ABG_A1', set:'ABS_A', name:'전투 기술', col:0},
  {id:'ABG_A2', set:'ABS_A', name:'마력 운용', col:0},
  {id:'ABG_A3', set:'ABS_A', name:'스킬 운용', col:1},
  {id:'ABG_A4', set:'ABS_A', name:'감지 · 대응', col:1},
  {id:'ABG_A5', set:'ABS_A', name:'특수 운용 · 지속', col:2},

  {id:'ABG_B1', set:'ABS_B', name:'사고', col:0},
  {id:'ABG_B2', set:'ABS_B', name:'집중 · 적응', col:0},
  {id:'ABG_B3', set:'ABS_B', name:'소통 · 관계', col:1},
  {id:'ABG_B4', set:'ABS_B', name:'지휘 · 관리', col:1},
  {id:'ABG_B5', set:'ABS_B', name:'전문 지식', col:2},
  {id:'ABG_B6', set:'ABS_B', name:'현장 · 생존', col:2},

  {id:'ABG_C1', set:'ABS_C', name:'신체', col:0},
  {id:'ABG_C2', set:'ABS_C', name:'작업', col:1},
  {id:'ABG_C3', set:'ABS_C', name:'기술', col:1},
  {id:'ABG_C4', set:'ABS_C', name:'전투', col:2},
]);

def('abilities', [
  /* A — 각성자 전문 30 */
  {id:'ABL_A01', set:'ABS_A', g:'ABG_A1', name:'근접 공격 기술'},
  {id:'ABL_A02', set:'ABS_A', g:'ABG_A1', name:'무기 운용'},
  {id:'ABL_A03', set:'ABS_A', g:'ABG_A1', name:'회피 기술'},
  {id:'ABL_A04', set:'ABS_A', g:'ABG_A1', name:'방어 기술'},
  {id:'ABL_A05', set:'ABS_A', g:'ABG_A1', name:'초인적 신체 제어'},
  {id:'ABL_A06', set:'ABS_A', g:'ABG_A1', name:'전투 반응'},
  {id:'ABL_A07', set:'ABS_A', g:'ABG_A2', name:'마력 제어'},
  {id:'ABL_A08', set:'ABS_A', g:'ABG_A2', name:'마력 효율'},
  {id:'ABL_A09', set:'ABS_A', g:'ABG_A2', name:'마력 방출'},
  {id:'ABL_A10', set:'ABS_A', g:'ABG_A2', name:'마력 정밀도'},
  {id:'ABL_A11', set:'ABS_A', g:'ABG_A2', name:'마력 순환'},
  {id:'ABL_A12', set:'ABS_A', g:'ABG_A2', name:'마력 회복 운용'},
  {id:'ABL_A13', set:'ABS_A', g:'ABG_A3', name:'스킬 숙련'},
  {id:'ABL_A14', set:'ABS_A', g:'ABG_A3', name:'스킬 응용'},
  {id:'ABL_A15', set:'ABS_A', g:'ABG_A3', name:'스킬 연계'},
  {id:'ABL_A16', set:'ABS_A', g:'ABG_A3', name:'시전 속도'},
  {id:'ABL_A17', set:'ABS_A', g:'ABG_A3', name:'시전 안정성'},
  {id:'ABL_A18', set:'ABS_A', g:'ABG_A3', name:'스킬 타이밍'},
  {id:'ABL_A19', set:'ABS_A', g:'ABG_A4', name:'마력 탐지'},
  {id:'ABL_A20', set:'ABS_A', g:'ABG_A4', name:'마력 해석'},
  {id:'ABL_A21', set:'ABS_A', g:'ABG_A4', name:'기척 감지'},
  {id:'ABL_A22', set:'ABS_A', g:'ABG_A4', name:'몬스터 대응'},
  {id:'ABL_A23', set:'ABS_A', g:'ABG_A4', name:'게이트 환경 적응'},
  {id:'ABL_A24', set:'ABS_A', g:'ABG_A4', name:'위험 감지'},
  {id:'ABL_A25', set:'ABS_A', g:'ABG_A5', name:'치유 스킬 운용'},
  {id:'ABL_A26', set:'ABS_A', g:'ABG_A5', name:'생산 스킬 운용'},
  {id:'ABL_A27', set:'ABS_A', g:'ABG_A5', name:'보조 스킬 운용'},
  {id:'ABL_A28', set:'ABS_A', g:'ABG_A5', name:'마력 방어'},
  {id:'ABL_A29', set:'ABS_A', g:'ABG_A5', name:'상태이상 대응'},
  {id:'ABL_A30', set:'ABS_A', g:'ABG_A5', name:'전투 지속 운용'},

  /* B — 공통 40 */
  {id:'ABL_B01', set:'ABS_B', g:'ABG_B1', name:'분석력'},
  {id:'ABL_B02', set:'ABS_B', g:'ABG_B1', name:'논리력'},
  {id:'ABL_B03', set:'ABS_B', g:'ABG_B1', name:'기억력'},
  {id:'ABL_B04', set:'ABS_B', g:'ABG_B1', name:'학습력'},
  {id:'ABL_B05', set:'ABS_B', g:'ABG_B1', name:'창의성'},
  {id:'ABL_B06', set:'ABS_B', g:'ABG_B1', name:'문제 해결력'},
  {id:'ABL_B07', set:'ABS_B', g:'ABG_B1', name:'관찰력'},
  {id:'ABL_B08', set:'ABS_B', g:'ABG_B1', name:'판단 속도'},
  {id:'ABL_B09', set:'ABS_B', g:'ABG_B2', name:'집중력'},
  {id:'ABL_B10', set:'ABS_B', g:'ABG_B2', name:'압박 상황 수행 안정성'},
  {id:'ABL_B11', set:'ABS_B', g:'ABG_B2', name:'장시간 집중 유지'},
  {id:'ABL_B12', set:'ABS_B', g:'ABG_B2', name:'환경 적응 기술'},
  {id:'ABL_B13', set:'ABS_B', g:'ABG_B2', name:'행동 조절 기술'},
  {id:'ABL_B14', set:'ABS_B', g:'ABG_B2', name:'스트레스 대처 기술'},
  {id:'ABL_B15', set:'ABS_B', g:'ABG_B3', name:'의사소통'},
  {id:'ABL_B16', set:'ABS_B', g:'ABG_B3', name:'설득력'},
  {id:'ABL_B17', set:'ABS_B', g:'ABG_B3', name:'협상력'},
  {id:'ABL_B18', set:'ABS_B', g:'ABG_B3', name:'감정 전달 기술'},
  {id:'ABL_B19', set:'ABS_B', g:'ABG_B3', name:'갈등 조정'},
  {id:'ABL_B20', set:'ABS_B', g:'ABG_B3', name:'관계 관리'},
  {id:'ABL_B21', set:'ABS_B', g:'ABG_B3', name:'사회적 통찰'},
  {id:'ABL_B22', set:'ABS_B', g:'ABG_B4', name:'지도력'},
  {id:'ABL_B23', set:'ABS_B', g:'ABG_B4', name:'조직 관리'},
  {id:'ABL_B24', set:'ABS_B', g:'ABG_B4', name:'계획 수립'},
  {id:'ABL_B25', set:'ABS_B', g:'ABG_B4', name:'인재 평가'},
  {id:'ABL_B26', set:'ABS_B', g:'ABG_B4', name:'교육 능력'},
  {id:'ABL_B27', set:'ABS_B', g:'ABG_B4', name:'업무 배분'},
  {id:'ABL_B28', set:'ABS_B', g:'ABG_B5', name:'의료 지식'},
  {id:'ABL_B29', set:'ABS_B', g:'ABG_B5', name:'법률 지식'},
  {id:'ABL_B30', set:'ABS_B', g:'ABG_B5', name:'재무 지식'},
  {id:'ABL_B31', set:'ABS_B', g:'ABG_B5', name:'장비 지식'},
  {id:'ABL_B32', set:'ABS_B', g:'ABG_B5', name:'연구 역량'},
  {id:'ABL_B33', set:'ABS_B', g:'ABG_B5', name:'행정 실무'},
  {id:'ABL_B34', set:'ABS_B', g:'ABG_B5', name:'정보 분석'},
  {id:'ABL_B35', set:'ABS_B', g:'ABG_B6', name:'생존 지식'},
  {id:'ABL_B36', set:'ABS_B', g:'ABG_B6', name:'안전 관리'},
  {id:'ABL_B37', set:'ABS_B', g:'ABG_B6', name:'응급처치'},
  {id:'ABL_B38', set:'ABS_B', g:'ABG_B6', name:'자원 관리'},
  {id:'ABL_B39', set:'ABS_B', g:'ABG_B6', name:'현장 지휘'},
  {id:'ABL_B40', set:'ABS_B', g:'ABG_B6', name:'체력 관리'},

  /* C — 비각성자 전문 20 */
  {id:'ABL_C01', set:'ABS_C', g:'ABG_C1', name:'근력 활용'},
  {id:'ABL_C02', set:'ABS_C', g:'ABG_C1', name:'민첩성'},
  {id:'ABL_C03', set:'ABS_C', g:'ABG_C1', name:'반응 속도'},
  {id:'ABL_C04', set:'ABS_C', g:'ABG_C1', name:'지구력'},
  {id:'ABL_C05', set:'ABS_C', g:'ABG_C1', name:'균형 감각'},
  {id:'ABL_C06', set:'ABS_C', g:'ABG_C1', name:'신체 협응'},
  {id:'ABL_C07', set:'ABS_C', g:'ABG_C2', name:'손재주'},
  {id:'ABL_C08', set:'ABS_C', g:'ABG_C2', name:'작업 정확도'},
  {id:'ABL_C09', set:'ABS_C', g:'ABG_C2', name:'작업 속도'},
  {id:'ABL_C10', set:'ABS_C', g:'ABG_C2', name:'도구 활용'},
  {id:'ABL_C11', set:'ABS_C', g:'ABG_C3', name:'기계 조작'},
  {id:'ABL_C12', set:'ABS_C', g:'ABG_C3', name:'정비 기술'},
  {id:'ABL_C13', set:'ABS_C', g:'ABG_C3', name:'운송 기술'},
  {id:'ABL_C14', set:'ABS_C', g:'ABG_C3', name:'구조 기술'},
  {id:'ABL_C15', set:'ABS_C', g:'ABG_C3', name:'환경 대응'},
  {id:'ABL_C16', set:'ABS_C', g:'ABG_C4', name:'무기 사용'},
  {id:'ABL_C17', set:'ABS_C', g:'ABG_C4', name:'비무장 격투'},
  {id:'ABL_C18', set:'ABS_C', g:'ABG_C4', name:'방어 동작'},
  {id:'ABL_C19', set:'ABS_C', g:'ABG_C4', name:'회피 동작'},
  {id:'ABL_C20', set:'ABS_C', g:'ABG_C4', name:'전투 협응'},
]);

/* 밸런스 값 — 모두 [prototype_default] 임시값. 코드에 상수로 박지 않고 여기서 바꾼다. */
def('balance', [
  {id:'BAL_GROWTH', proto:true, levelMax:100, wallEvery:10, statPerLevel:5, ablMin:1, ablMax:20,  /* statPerLevel: 레벨업마다 플레이어가 직접 나눠 주는 스탯 포인트 (NPC는 자동 분배) */
   expNext:{base:100, pow:1.8},    /* 레벨 L → L+1 필요 경험치 = base × L^pow */
   wallTrainHour:0.01, wallGate:0.15, wallCrisis:0.1},  /* 성장의 벽 돌파 확률: 벽에 막힌 상태에서 훈련 1시간 · 게이트 클리어 · 위기 판정 성공마다. 정해진 방법은 없다 (설정집 3.3) */
  /* 수치가 판정에 주는 효과 [prototype_default]
     판정 = 세부 능력 + d20 + 스탯 보정 + 상태 보정 (+ 게이트 등급 차) ≥ 난이도
     스탯 보정 = floor(관련 기본 스탯 / statDiv) − 1  (스탯 10 → 0, 30 → +2, 60 → +5). 관련 스탯은 세부 능력 그룹으로 정한다 (groupStat)
     상태 보정 = 스트레스 높음 · 기력 낮음 · 중상(심각도 2 이상) 마다 감점
     장비: 무기는 전투 기술(ABG_A1) 판정 +floor((21 − 무기 등급)/weaponDiv), 공략 전력 +(21 − 등급)×weaponPow. 방어구는 받는 피해 ×(1 − (21 − 등급)×armorDef)
     스킬 숙련: 공략 전력 + 평균 숙련 × skillPow · '스킬 연습' 시간당 skillTrainHour 진척 (100 = 숙련 +1) */
  {id:'BAL_EFFECT', proto:true, statDiv:10,
   groupStat:{ABG_A1:'STAT_BODY',ABG_A2:'STAT_MANA',ABG_A3:'STAT_MIND',ABG_A4:'STAT_SENSE',ABG_A5:'STAT_MANA',
              ABG_B1:'STAT_MIND',ABG_B2:'STAT_MIND',ABG_B3:'STAT_MIND',ABG_B4:'STAT_MIND',ABG_B5:'STAT_MIND',ABG_B6:'STAT_BODY'},
   stressHigh:70, stressPen:-2, energyLow:20, energyPen:-2, injuryPen:-1, injuryPenMax:-3,
   weaponDiv:6, weaponPow:0.1, armorDef:0.012, skillPow:0.15, skillTrainHour:20},
  /* 죽음 = 게임 종료 (사용자 결정). 공략 중 HP 0 → 동료가 있으면 rescue, 혼자면 soloRescue 확률로 구조 (전력 비율을 곱함).
     머리 · 몸통 중태(심각도 3) 부상은 fatal 확률로 즉사 */
  {id:'BAL_DEATH', proto:true, rescue:0.85, soloRescue:0.3, fatal:0.25, fatalParts:['PART_HEAD','PART_TORSO']},
  {id:'BAL_VITALS', proto:true, hp:{base:100, per:10, stat:'STAT_BODY', perLevel:8}, mp:{base:50, per:10, stat:'STAT_MANA', perLevel:5}, mpMundane:0},  /* perLevel: 레벨마다 추가 HP · MP */
  /* 등급 자동 갱신 (사용자 결정: 상태창이 판단해 자동 승급, 강등 없음) [prototype_default]
     등급 숫자 r 의 기준 (k = 20 − r): 기본 스탯 합계 ≥ statBase + statStep × k + statCurve × k²  그리고  세부 능력 평균 ≥ ablBase + ablStep × k
     (예시 헌터들의 등급 · 스탯 분포에 맞춘 임시값). 하루가 바뀔 때와 레벨업 때 판단한다 */
  {id:'BAL_RANKUP', proto:true, statBase:42, statStep:12, statCurve:0.4, ablBase:6, ablStep:0.4, newsAt:10},
  /* 은퇴 (사용자 결정: 은퇴로도 게임이 끝난다). 공략 중에는 은퇴할 수 없다 */
  {id:'BAL_RETIRE', proto:true, minDays:0},
]);
