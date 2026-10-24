/* =========================================================
   gate_content.js — 게이트 공략 · 부상 데이터
   · bodyParts / injuryTypes : 부위별 부상 (HP와 따로 기록. 설정집 5.2)
   · crises : 공략 중 위기 상황. 자동 진행이 멈추고 선택지를 고른다 (설정집 6.2 · 6.3)
       when   : 'any' | 'fight' | 'boss'   (언제 나올 수 있나)
       조건(선택): monCat[MC_*](게이트 몬스터 분류) · gateType['던전형'|'필드형'] · rankMin/rankMax(게이트 등급 숫자, 1이 최상위) · w(가중치, 기본 1)
       choices: t(문장) · check{attr, dc}(능력치 + d20 + 상황 보정 ≥ dc) · risk(캐릭터가 아는 위험: 주의 · 위험 · 치명적)
                needParty: 파티원이 2명 이상일 때만 · ok/ng 결과 문장 · okFx/ngFx 효과
       okMemo : 성공하면 {b}(그 동료)가 기억하는 일 {tag, text, rel:[[차원, 값], …](그 사람 → 나)}
       효과   : hp(내 HP %) · mp · party(파티 HP %) · injury{part:'rand'|PART_*, type, sev} · loot{item,qty}
                time(추가 분) · kills · stones · retreat(후퇴) · progress(구역 진행 +1) · stress(스트레스)
   · 수치는 모두 [prototype_default] 임시값
   ========================================================= */

/* ════ '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   bodyParts  : + name · desc · vital 급소 true · w 맞을 확률 비중 · armor [equipSlots 막는 칸] · ablHit [ABL_ 다치면 떨어지는 능력]
   injuryTypes: + name · heal · desc · icon · parts [bodyParts 생기는 부위] · se [statusEffects] · scar 흉터 확률 · cure [items 치료 물건] · fx {STAT_/ABL_: −} 다친 동안 · lines {get, heal, scar}
   injurySev  : + name · desc · color · hospital 병원 필요 · cost 치료비 배율 */
def('bodyParts', [
  {id:'PART_HEAD',  name:'머리',     w:1},
  {id:'PART_TORSO', name:'몸통',     w:3},
  {id:'PART_ARM_L', name:'왼팔',     w:2},
  {id:'PART_ARM_R', name:'오른팔',   w:2},
  {id:'PART_LEG_L', name:'왼다리',   w:2},
  {id:'PART_LEG_R', name:'오른다리', w:2},
]);

/* heal: 심각도 1~3 별 자연 회복 시간(시간) */
def('injuryTypes', [
  {id:'INJ_BRUISE', name:'타박상', heal:[12,36,96]},
  {id:'INJ_CUT',    name:'열상',   heal:[24,72,168]},
  {id:'INJ_BLEED',  name:'출혈',   heal:[12,48,120]},
  {id:'INJ_FRACT',  name:'골절',   heal:[168,336,720]},
  {id:'INJ_BURN',   name:'화상',   heal:[48,120,336]},
]);
def('injurySev', [
  {id:'SEV_1', name:'경상', lv:1},
  {id:'SEV_2', name:'중상', lv:2},
  {id:'SEV_3', name:'중태', lv:3},
]);


/* 공략 밸런스 [prototype_default] */
def('balance', [
  {id:'BAL_GATE', proto:true,
   crisisPerTick:0.05, crisisMax:2,     /* 틱당 위기 확률 · 한 번 공략에서 최대 횟수 (보스 위기는 따로 1회) */
   rankMod:1,                           /* 판정 보정 = (게이트 등급 숫자 − 내 등급 숫자) × rankMod. 내가 약하면 음수 */
   expBase:40,                          /* EXP = expBase × (21 − 게이트 등급)² × (구역 수 / 5) × (성공 1, 후퇴 0.4) */
   injuryOnHit:0.15,                    /* 내가 큰 피해(14 이상)를 받을 때 부상 확률 */
   hpRegenAwake:1.5, hpRegenSleep:4,
   /* 전력 비교: 파티 전력 = 평균(역할 핵심 세부 능력 평균 + 레벨 × perLevel), 게이트 전력 = gateBase + (21 − 등급) × perRank.
      비율 r 이 처치 · 받는 피해 · 진행 속도에 곱해진다 (rClamp 범위 안) */
   power:{perLevel:0.15, gateBase:4, perRank:1.4, dmgExp:3, killExp:1.5, rClamp:[0.25,1.6]}},   /* 시간당 HP(%) 자연 회복 */
]);
