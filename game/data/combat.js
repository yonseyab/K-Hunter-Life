/* =========================================================
   combat.js — 전투 시스템 데이터 (2026-10-24, engine/combat.js COMBAT 이 쓴다)
   전투 = 실시간 통계 시뮬 (MMO 식). 0.5초마다 모두의 시간이 흐르고, 행동할 차례가 된 쪽이 기술을 하나 쓴다.
   여기 있는 값은 전부 엔진이 실제로 쓰는 값이다. DB 화면도 이 값으로 '전투에서 하는 일'을 계산해 보인다.

   ── 전투 능력치 (헌터 · 몬스터 공통, 엔진이 계산) ──
     HP 체력 · MP 마력 · 공격(물리 위력) · 마공(마법 위력) · 방어(물리 피해 줄임) · 저항(마법 피해 줄임)
     명중 · 회피 (%p, 맞힐 확률 = 기본 명중 + 명중 − 회피) · 치명(%) · 공격 간격(초, 낮을수록 빠름)
   헌터: 기본 스탯(신체 · 마력 · 정신 · 감각) + 세부 능력 + 레벨 + 역할 + 장비 등급에서 나온다 (BAL_COMBAT.hunter)
   몬스터: 게이트 등급에 맞는 '같은 급 헌터'의 능력치 × 몬스터 역할(monsterRoles) × 크기 × 개체 배율(stat) × 잡몹/보스 배율

   ── 기술 (combatMoves, CM_…) ──
     헌터는 역할마다 기본 기술(BAL_COMBAT.roleMoves) + 스킬에 붙은 기술(skills.move). 몬스터는 기본 공격 + moves.
     id · name · kind  attack 공격 · heal 치유 · buff 강화 · debuff 약화 · taunt 도발
        target  enemy 적 하나 · enemies 적 여럿(area 명까지) · ally 아군 하나 · allies 아군 모두 · self 자신
        stat    atk(공격) · mag(마공) — 위력의 바탕 · power 위력 배율 (기본 공격 1) · hits 타수 · area 범위 대상 수
        heal    치유 배율 (마공 × heal) · cd 재사용(초) · mp 마력 소모 · el 속성(elements)
        se      [{se(statusEffects), chance 0~1, dur 초}] 거는 상태 · when 쓰는 조건 (아래)
        lines   {use} 문장 (전투 기록에 큰 장면만)
     when: 'allyLow' 아군 HP 55% 아래 · 'selfLow' 자기 HP 40% 아래 · 'crowd' 적 3 이상 · 'notTarget' 적이 나를 안 노림 · 'start' 싸움 첫머리 · 'always'
   ========================================================= */

/* 속성. weak(약점)이면 피해 ×BAL_COMBAT.weakMul, resist(저항)이면 ×resistMul */
def('elements', [
  {id:'EL_FIRE',   name:'화염', color:'#e0743c', se:['SE_BURN']},
  {id:'EL_ICE',    name:'냉기', color:'#6fc3e8', se:['SE_SLOW']},
  {id:'EL_BOLT',   name:'전격', color:'#e8d24f', se:['SE_STUN']},
  {id:'EL_EARTH',  name:'대지', color:'#a8834f'},
  {id:'EL_WIND',   name:'바람', color:'#8fd6a8'},
  {id:'EL_WATER',  name:'물',   color:'#4f8fd8'},
  {id:'EL_LIGHT',  name:'빛',   color:'#f2e6a6'},
  {id:'EL_DARK',   name:'어둠', color:'#7a5fae'},
  {id:'EL_POISON', name:'독',   color:'#7fb34f', se:['SE_POISON']},
]);

/* 상태 이상 · 강화. dur 기본 지속(초) · dot 초당 피해(최대 HP 비율) · hot 초당 회복(최대 HP 비율)
   stat {atk, mag, def, res, spd(공격 간격 배율 — 크면 느림), dmgIn(받는 피해 배율)} · skip 행동 못 함 · taunt 도발(그 사람만 노림) */
def('statusEffects', [
  {id:'SE_STUN',   name:'기절', kind:'debuff', dur:2,  skip:true,               desc:'잠깐 아무것도 못 한다.'},
  {id:'SE_BLEED',  name:'출혈', kind:'debuff', dur:8,  dot:0.006,              desc:'초마다 최대 HP의 0.6%를 잃는다.'},
  {id:'SE_BURN',   name:'화상', kind:'debuff', dur:6,  dot:0.008,              desc:'초마다 최대 HP의 0.8%를 잃는다.', el:'EL_FIRE'},
  {id:'SE_POISON', name:'중독', kind:'debuff', dur:12, dot:0.004, stat:{atk:0.9}, desc:'초마다 최대 HP의 0.4%를 잃고, 공격이 10% 약해진다.', el:'EL_POISON'},
  {id:'SE_SLOW',   name:'둔화', kind:'debuff', dur:6,  stat:{spd:1.4},          desc:'공격 간격이 40% 길어진다.'},
  {id:'SE_WEAK',   name:'약화', kind:'debuff', dur:8,  stat:{atk:0.75, mag:0.75}, desc:'공격 · 마공이 25% 약해진다.'},
  {id:'SE_BREAK',  name:'방어 붕괴', kind:'debuff', dur:8, stat:{def:0.6},       desc:'방어가 40% 줄어든다.'},
  {id:'SE_GUARD',  name:'방어 태세', kind:'buff', dur:6,  stat:{dmgIn:0.6},       desc:'받는 피해가 40% 줄어든다.'},
  {id:'SE_TAUNT',  name:'도발', kind:'buff', dur:6,  taunt:true,                 desc:'적들이 이 사람만 노린다.'},
  {id:'SE_MIGHT',  name:'강화', kind:'buff', dur:10, stat:{atk:1.25, mag:1.25},  desc:'공격 · 마공이 25% 강해진다.'},
  {id:'SE_HASTE',  name:'가속', kind:'buff', dur:10, stat:{spd:0.75},            desc:'공격 간격이 25% 짧아진다.'},
  {id:'SE_REGEN',  name:'재생', kind:'buff', dur:10, hot:0.01,                   desc:'초마다 최대 HP의 1%를 회복한다.'},
  {id:'SE_ENRAGE', name:'격노', kind:'buff', dur:999, stat:{atk:1.3, spd:0.8},   desc:'보스가 궁지에 몰려 공격이 30% 세지고 빨라진다.'},
]);

/* 몬스터 역할: 능력치 배율 · 행동. target: near(위협이 큰 쪽) · weak(HP 낮은 쪽) · back(후열 · 힐러) · random
   pack: 이 역할의 잡몹이 한 무리에 나오는 수 [최소, 최대] (몬스터에 pack 이 있으면 그쪽) */
def('monsterRoles', [
  {id:'MR_BRUTE',    name:'돌격형', hp:1.3, atk:1.2,  def:1.0, res:0.8, spd:1.0, acc:0,  eva:-5, target:'near',  pack:[2,3], desc:'튼튼하고 세게 친다. 앞에 선 사람을 노린다.'},
  {id:'MR_SWARM',    name:'무리형', hp:0.55, atk:0.7, def:0.7, res:0.7, spd:0.85, acc:0, eva:5,  target:'random', pack:[4,7], desc:'약하지만 떼로 몰려온다.'},
  {id:'MR_RANGED',   name:'원거리형', hp:0.8, atk:1.0, def:0.7, res:0.9, spd:1.1, acc:10, eva:5, target:'weak',  pack:[2,4], desc:'멀리서 약한 쪽을 노린다.'},
  {id:'MR_CASTER',   name:'마법형', hp:0.75, atk:0.4, mag:1.3, def:0.6, res:1.3, spd:1.3, acc:5, eva:0, target:'back', pack:[1,3], magic:true, desc:'마법으로 친다. 물리 방어가 약하다.'},
  {id:'MR_TANK',     name:'수비형', hp:1.6, atk:0.8,  def:1.6, res:1.2, spd:1.2, acc:-5, eva:-10, target:'near', pack:[1,2], desc:'단단해서 오래 버틴다.'},
  {id:'MR_ASSASSIN', name:'암살형', hp:0.7, atk:1.3,  def:0.7, res:0.7, spd:0.8, acc:10, eva:15, crit:15, target:'back', pack:[1,3], desc:'빠르고 아프게, 뒤에 선 사람을 노린다.'},
  {id:'MR_SUPPORT',  name:'지원형', hp:0.8, atk:0.5, mag:1.0, def:0.8, res:1.1, spd:1.2, acc:0, eva:0, target:'random', pack:[1,2], magic:true, desc:'동료 몬스터를 치료하고 강화한다.'},
]);

/* 기술 */
def('combatMoves', [
  /* 헌터 역할 기본 기술 */
  {id:'CM_TAUNT',    name:'도발',       kind:'taunt',  target:'self', cd:12, se:[{se:'SE_TAUNT', chance:1, dur:6}], when:'notTarget', lines:{use:['{u}이(가) 소리를 질러 적의 시선을 끈다.']}},
  {id:'CM_GUARD',    name:'방어 태세',  kind:'buff',   target:'self', cd:15, se:[{se:'SE_GUARD', chance:1, dur:6}], when:'selfLow', lines:{use:['{u}이(가) 몸을 낮추고 버틴다.']}},
  {id:'CM_SMASH',    name:'강타',       kind:'attack', target:'enemy', stat:'atk', power:1.8, cd:6, mp:8, se:[{se:'SE_STUN', chance:0.25, dur:1.5}], lines:{use:['{u}의 강타가 {t}을(를) 내리친다.']}},
  {id:'CM_FLURRY',   name:'연속 공격',  kind:'attack', target:'enemy', stat:'atk', power:0.7, hits:3, cd:8, mp:10, lines:{use:['{u}이(가) {t}에게 연달아 파고든다.']}},
  {id:'CM_AIMED',    name:'조준 사격',  kind:'attack', target:'enemy', stat:'atk', power:2.2, cd:8, mp:8, lines:{use:['{u}이(가) 숨을 멈추고 {t}을(를) 겨눈다.']}},
  {id:'CM_VOLLEY',   name:'난사',       kind:'attack', target:'enemies', area:3, stat:'atk', power:0.8, cd:12, mp:14, when:'crowd', lines:{use:['{u}의 화살이 무리 위로 쏟아진다.']}},
  {id:'CM_BOLT',     name:'마력탄',     kind:'attack', target:'enemy', stat:'mag', power:1.6, cd:4, mp:10, lines:{use:['{u}의 손끝에서 마력탄이 날아간다.']}},
  {id:'CM_BLAST',    name:'범위 마법',  kind:'attack', target:'enemies', area:5, stat:'mag', power:1.1, cd:10, mp:24, when:'crowd', lines:{use:['{u}의 마법이 무리 한가운데서 터진다.']}},
  {id:'CM_HEAL',     name:'치유',       kind:'heal',   target:'ally', heal:1.6, cd:4, mp:12, when:'allyLow', lines:{use:['{u}이(가) {t}의 상처를 치유한다.']}},
  {id:'CM_MASSHEAL', name:'광역 치유',  kind:'heal',   target:'allies', heal:0.8, cd:16, mp:28, when:'allyLow', lines:{use:['{u}의 빛이 파티 전체를 감싼다.']}},
  {id:'CM_EMPOWER',  name:'전투 강화',  kind:'buff',   target:'allies', cd:20, mp:20, se:[{se:'SE_MIGHT', chance:1, dur:10}], when:'start', lines:{use:['{u}이(가) 파티에 강화 마법을 건다.']}},
  {id:'CM_HEX',      name:'약화 저주',  kind:'debuff', target:'enemy', stat:'mag', power:0.5, cd:12, mp:14, se:[{se:'SE_WEAK', chance:0.85, dur:8}], lines:{use:['{u}이(가) {t}에게 약화 저주를 건다.']}},
  {id:'CM_VITAL',    name:'급소 찌르기', kind:'attack', target:'enemy', stat:'atk', power:1.5, cd:7, mp:8, crit:30, se:[{se:'SE_BLEED', chance:0.6, dur:8}], lines:{use:['{u}이(가) {t}의 급소를 노린다.']}},
  /* 몬스터 기술 (견본) */
  {id:'CM_M_CHARGE', name:'돌진',       kind:'attack', target:'enemy', stat:'atk', power:1.8, cd:10, se:[{se:'SE_STUN', chance:0.3, dur:1.5}], lines:{use:['{u}이(가) 몸을 날려 {t}에게 돌진한다.']}},
  {id:'CM_M_CLAW',   name:'할퀴기',     kind:'attack', target:'enemy', stat:'atk', power:1.1, cd:5, se:[{se:'SE_BLEED', chance:0.4, dur:8}], lines:{use:['{u}의 발톱이 {t}을(를) 할퀸다.']}},
  {id:'CM_M_ACID',   name:'산성 분사',  kind:'attack', target:'enemies', area:3, stat:'mag', power:0.8, cd:12, el:'EL_POISON', se:[{se:'SE_POISON', chance:0.5, dur:10}], lines:{use:['{u}이(가) 산성 체액을 뿌린다.']}},
  {id:'CM_M_SLAM',   name:'내려찍기',   kind:'attack', target:'enemies', area:3, stat:'atk', power:1.3, cd:14, se:[{se:'SE_STUN', chance:0.2, dur:1.5}], lines:{use:['{u}이(가) 바닥을 내려찍는다. 충격파가 퍼진다.']}},
  {id:'CM_M_DRAIN',  name:'생명 흡수',  kind:'attack', target:'enemy', stat:'mag', power:1.4, cd:9, el:'EL_DARK', drain:0.5, lines:{use:['{u}이(가) {t}의 생기를 빨아들인다.']}},
  {id:'CM_M_SHADOW', name:'그림자 화살', kind:'attack', target:'enemy', stat:'mag', power:1.5, cd:6, el:'EL_DARK', lines:{use:['{u}의 그림자 화살이 {t}에게 꽂힌다.']}},
  {id:'CM_M_MEND',   name:'회복의 울음', kind:'heal', target:'ally', heal:1.4, cd:8, when:'allyLow', lines:{use:['{u}이(가) 울부짖자 동료의 상처가 아문다.']}},
  {id:'CM_M_ROAR',   name:'포효',       kind:'debuff', target:'enemies', area:5, stat:'atk', power:0, cd:20, se:[{se:'SE_WEAK', chance:0.5, dur:6}], when:'start', lines:{use:['{u}의 포효에 파티가 움찔한다.']}},
  {id:'CM_M_SHRED',  name:'갑옷 찢기',  kind:'attack', target:'enemy', stat:'atk', power:1.2, cd:8, se:[{se:'SE_BREAK', chance:0.6, dur:8}], lines:{use:['{u}의 날이 {t}의 방어구를 찢는다.']}},
]);

def('balance', [
  {id:'BAL_COMBAT', proto:true,
   tick:0.5,                        /* 시뮬 한 걸음(초) */
   maxFight:300,                    /* 교전 하나 최대 시간(초). 넘기면 양쪽 지쳐 물러난다 */
   hitBase:85, hitMin:25, hitMax:98,/* 맞힐 확률(%) = hitBase + 명중 − 회피 */
   critMul:1.6, weakMul:1.5, resistMul:0.6, dmgRand:[0.85, 1.15],
   /* 헌터 능력치 = 기본 스탯 · 세부 능력 · 레벨에서 (역할 배율 roleStat 을 곱한다) */
   hunter:{hpBase:80, hpBody:3.2, hpLv:6, mpBase:40, mpMana:1.6,
     atkBody:0.45, atkAbl:1.6, magMana:0.55, magAbl:1.6, defBody:0.12, defAbl:1.4, resMind:0.12, resAbl:1.4,
     accAbl:1.0, evaAbl:1.0, critBase:5, critAbl:0.4, gearAtk:3, gearDef:2.5},
   roleStat:{
     ROLE_TANK:  {hp:1.45, atk:0.85, mag:0.6, def:1.5, res:1.2, spd:2.2},
     ROLE_MDPS:  {hp:1.1,  atk:1.25, mag:0.6, def:1.0, res:0.9, spd:1.6},
     ROLE_RDPS:  {hp:0.9,  atk:1.2,  mag:0.6, def:0.8, res:0.9, spd:1.8},
     ROLE_MAGE:  {hp:0.85, atk:0.5,  mag:1.35, def:0.7, res:1.2, spd:2.0, magic:true},
     ROLE_HEAL:  {hp:0.95, atk:0.5,  mag:1.15, def:0.85, res:1.2, spd:2.0, magic:true},
     ROLE_SUP:   {hp:1.0,  atk:0.8,  mag:1.0,  def:0.95, res:1.1, spd:1.9, magic:true},
     ROLE_SCOUT: {hp:0.95, atk:1.1,  mag:0.6,  def:0.85, res:0.9, spd:1.5}},
   roleMoves:{ROLE_TANK:['CM_TAUNT','CM_GUARD','CM_SMASH'], ROLE_MDPS:['CM_FLURRY','CM_SMASH'], ROLE_RDPS:['CM_AIMED','CM_VOLLEY'], ROLE_MAGE:['CM_BOLT','CM_BLAST'],
     ROLE_HEAL:['CM_HEAL','CM_MASSHEAL'], ROLE_SUP:['CM_EMPOWER','CM_HEX','CM_HEAL'], ROLE_SCOUT:['CM_VITAL','CM_FLURRY']},
   /* 레벨만 아는 사람(배경 인구 · 몬스터 기준)의 '같은 급 헌터' 능력치: 스탯 = base + per × 레벨, 세부 능력 = ablBase + ablPer × 레벨 */
   typical:{STAT_BODY:[55,4.3], STAT_MIND:[35,2.3], STAT_MANA:[35,3.3], STAT_SENSE:[40,3.3], ablBase:6, ablPer:0.13},
   rankLevel:[1, 3.6],
   gapPow:1.2,                      /* 게이트가 파티보다 등급 하나 높을 때마다 몬스터 전력 ×1.2 (레벨 차로 생기는 몫을 빼고 맞춘다) */              /* 게이트 등급 숫자 lv → 같은 급 레벨 = a + (20 − lv) × b */
   mob:{hp:0.5, atk:0.55, mag:0.5, def:0.8, res:0.8, acc:0, eva:0, spd:1.15},   /* 잡몹 한 마리 = 같은 급 헌터 × 이 배율 */
   boss:{hp:6.5, atk:1.15, mag:1.15, def:1.2, res:1.2, acc:5, eva:0, spd:1.0, enrageAt:0.3},
   sizeHp:{MSZ_S:0.8, MSZ_M:1, MSZ_L:1.3, MSZ_H:1.7}, sizeEva:{MSZ_S:8, MSZ_M:0, MSZ_L:-6, MSZ_H:-12},
   packScale:0.25,                  /* 파티 인원이 4명보다 많거나 적으면 무리 수 × (1 + (인원 − 4) × packScale) */
   threat:{dmg:1, heal:0.6, tank:2.2},   /* 위협 = 준 피해 × dmg (+ 치유 × heal), 탱커 역할 × tank */
   /* 공략 흐름: 구역마다 이동(분) → 교전 1~2번 → 숨 고르기. 마지막 구역 = 보스 */
   raid:{moveMin:[8,18], fights:[1,2], restHp:0.12, restMp:0.2, restMin:4, bossMinions:[1,3]},
   down:{npcDeath:0.12, injury:0.75, hitInjury:0.3, bigHit:0.22},   /* 쓰러진 NPC 사망 확률 · 부상 확률, 한 번에 최대 HP의 bigHit 이상 맞으면 hitInjury 확률로 부상 */
   flee:{partyHp:0.15},             /* 교전 중 파티 평균 HP가 이 아래면 물러난다 */
  },
]);
