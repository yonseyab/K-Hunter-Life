# 01 · 1차 클래스 · 클래스 스킬 · 공용 스킬

> 먼저 [README.md](README.md)의 공통 규칙을 읽는다. 형식 기준은 `game/data/classes.js` 맨 위 주석이다.

## 무엇을 만드나

| 만들 것 | 양 | 파일 |
|---|---|---|
| 1차 클래스 (처음 각성할 때 나오는 클래스) | **가능한 한 많이.** 분류 6개(classCats)마다 최소 10개, 총 60개 이상 | `game/data/ext/codex_classes.js` |
| 클래스 스킬 | **클래스당 10개** (아래 구성) | `game/data/ext/codex_class_skills.js` |
| 공용 스킬 (클래스와 상관없이 누구나) | **가능한 한 많이.** 묶음 8개(skillCats)마다 최소 15개, 총 120개 이상 | `game/data/ext/codex_common_skills.js` |
| 속성 · 상태 이상 (스킬이 쓰는 만큼만) | 필요한 만큼 | `game/data/ext/codex_combat_base.js` |

세 파일(+ 전투 기본 파일)을 `game/data/ext/_list.js` 의 `HL_EXT` 에 이 순서로 등록한다: `codex_combat_base.js` → `codex_class_skills.js` → `codex_common_skills.js` → `codex_classes.js`.

### 클래스당 스킬 10개 구성
| 칸 | 개수 | 필드 | 쓰임 |
|---|---|---|---|
| 각성 후보 | 6 | 클래스의 `pool` | 처음 각성할 때 이 중 `pick`(=2)개가 무작위로 붙는다. 같은 클래스라도 사람마다 다르게 — 6개가 서로 다른 방향(공격 · 방어 · 보조 · 이동 · 감지 등)이 되게 |
| 기본 패시브 | 1 | 클래스의 `passive` | 그 클래스면 누구나 가진 바탕 능력. `kind:'패시브'` |
| 레벨 습득 | 3 | 클래스의 `learn` `[{skill, lv}]` | 레벨이 오르면 배운다. lv 는 대략 10 · 25 · 45 (클래스마다 조금씩 달라도 됨) |

액티브 · 패시브 비율은 클래스 성격에 맞게. 대략 액티브 6~7 · 패시브 3~4.

## ID

| 대상 | 범위 | 예 |
|---|---|---|
| 클래스 | `CLS_C001` ~ `CLS_C999` | `CLS_C001` |
| 클래스 스킬 | `SK_C0001` ~ `SK_C4999` (클래스 순서대로 10개씩 이어서) | `CLS_C001` 의 스킬 = `SK_C0001`~`SK_C0010` |
| 공용 스킬 | `SK_C5001` ~ `SK_C9999` | `SK_C5001` |
| 속성 | `EL_C01` ~ | `EL_C01` |
| 상태 이상 · 강화 | `SE_C001` ~ | `SE_C001` |

## 클래스 — 채울 항목 (전부)

| 필드 | 형식 | 설명 |
|---|---|---|
| `id` · `name` | | 이름은 한국어. 협회 공식 명칭 같은 2~5글자가 기본 (예: 방패병 · 원소술사) |
| `alias` | `['…']` | 사람들이 부르는 다른 이름 · 은어 1~3개 |
| `en` | `'Shieldbearer'` | 영문 |
| `cat` | classCats | `CC_MELEE` 근접 · `CC_RANGED` 원거리 · `CC_MAGIC` 마법 · `CC_SUPPORT` 지원 · `CC_SPECIAL` 특수 · `CC_CRAFT` 생산 |
| `tier` | `1` | 이번 의뢰는 전부 1 |
| `rarity` | 1~5 | 1 흔함 ~ 5 매우 드묾. 각성 확률에 반영된다 (1이 가장 잘 나옴). 분포: 1~2가 절반 이상, 5는 소수 |
| `desc` | 한 줄 | 30자 안팎 |
| `lore` | 2~4문장 | 이 클래스가 사회에서 어떤 존재인지, 현장에서 어떤 일을 하는지 |
| `role` | roles | 대표 역할 하나: `ROLE_TANK` · `ROLE_MDPS` · `ROLE_RDPS` · `ROLE_MAGE` · `ROLE_HEAL` · `ROLE_SUP` · `ROLE_SCOUT` |
| `roles` | `[roles]` | 맡을 수 있는 역할 1~3개 (role 포함) |
| `range` | `'melee'` · `'near'` · `'far'` | 주로 싸우는 거리 |
| `resource` | 글 | 주로 쓰는 힘: `'mp'` · `'stamina'` 또는 짧은 글 |
| `el` | elements | 주 속성 (없는 클래스는 비움) |
| `affinity` · `weakEl` | `[elements]` | 잘 맞는 · 다루기 어려운 속성 (없으면 비움) |
| `pick` | `2` | 전부 2 |
| `pool` | `[skills]` × 6 | 각성 후보 |
| `passive` | `[skills]` × 1 | 기본 패시브 |
| `learn` | `[{skill:'SK_…', lv:10}, …]` × 3 | 레벨 습득 |
| `stats` | `{STAT_BODY:3, STAT_MIND:1, STAT_MANA:0, STAT_SENSE:1}` | 레벨업 때 기본 스탯이 오르는 경향 (가중치, 합 5 안팎) |
| `keys` | `['ABL_A01', …]` 3~6개 | 이 클래스에 중요한 세부 능력. ID는 `game/data/abilities.js` 의 `abilities` 에서 |
| `growth` | `{hp: 숫자, mp: 숫자}` | 레벨당 HP · MP 증가 느낌 (탱커 hp 크게, 마법 mp 크게). 기준: 보통 클래스 `{hp:30, mp:15}` |
| `hpMul` · `mpMul` | 0.7~1.4 | 기본 HP · MP 배율 |
| `statReq` · `ablReq` | `{STAT_…: 값}` · `{ABL_…: 값}` | 클래스북으로 이 클래스가 되려면 필요한 최소치 (스탯 10~20, 세부 능력 8~14 정도) |
| `gear` | `[itemCats]` | 잘 맞는 장비 분류: `ITC_WEAPON` · `ITC_ARMOR` · `ITC_ACCESSORY` · `ITC_GEAR` 중 |
| `weapons` · `armors` | `['글', …]` | 잘 맞는 무기 · 방어구 갈래 (예: `['한손검','방패']`, `['중갑']`) |
| `fame` | `'rare'` · `'common'` · `'scorned'` · `'popular'` | 사회 평판 |
| `pay` | 0.6~2.0 | 의뢰 시세 배율 (1 보통) |
| `demand` | 1~5 | 길드 수요 |
| `jobs` | `['글', …]` 2~4개 | 각성 뒤 흔히 하는 일 (예: '게이트 전열 계약직', '보안 업체 경호') |
| `habits` | `['글', …]` 3~5개 | 이 클래스 사람의 일상 버릇 · 직업병. 이야기 창 한 줄 재료 (현재형 한 문장, 예: '앉을 때 무의식적으로 벽을 등진다.') |
| `lines` | `{awaken:[…], levelUp:[…], idle:[…]}` 각 2~3개 | `{u}` = 헌터 이름. 예: `'{u}은(는) 상태창에 뜬 클래스 이름을 몇 번이고 다시 읽는다.'` |
| `src` | `'codex'` | |

**비울 항목 (키를 쓰지 않음):** `unique` · `star` (고유 클래스는 나중) · `next` · `from` (상위 클래스는 나중) · `traits` · `guildPref` · `ban` · `img` · `icon` · `color` · `notes` · `ver`.

## 스킬 — 채울 항목 (클래스 스킬 · 공용 스킬 공통)

| 필드 | 형식 | 설명 |
|---|---|---|
| `id` · `name` | | 이름은 한국어 2~6글자 중심 |
| `alias` | `['…']` | 현장 은어 0~2개 (없으면 비움) |
| `en` | 영문 | |
| `scope` | `'class'` · `'common'` | 클래스 스킬은 class, 공용은 common. **unique · monster 는 쓰지 않는다** |
| `kind` | `'액티브'` · `'패시브'` | |
| `cat` | skillCats | **공용 스킬만 필수.** `SKC_SURVIVE` 생존 · `SKC_COMBAT` 전투 보조 · `SKC_SENSE` 감지 · `SKC_HEAL` 회복 · 응급 · `SKC_MOVE` 이동 · `SKC_MIND` 정신 · `SKC_SOCIAL` 사회 · 교섭 · `SKC_LIFE` 생활 · 기술 |
| `cls` | classes | **클래스 스킬만.** 주인 클래스 |
| `grade` · `rarity` · `tier` | 1~5 | 스킬의 격 · 희귀도 · 단계 (각성 후보는 1~2, 레벨 습득은 2~4 정도) |
| `desc` | 한 줄 | 무엇을 하는지 + 대가 · 한계 하나 (예: '방패로 밀어 거리를 만든다. 반동 주의.') |
| `lore` | 1~2문장 | |
| `target` | `self` · `ally` · `allies` · `enemy` · `enemies` · `area` | 패시브는 보통 `self` |
| `range` | `melee` · `near` · `far` | |
| `area` | 1~5 | 범위 크기 (단일 대상이면 1) |
| `hits` | 1~ | 타격 수 (공격 아니면 1) |
| `count` | 1~ | 대상 수 |
| `cost` | `{mp, hp, stamina, cd, cast, charges, daily}` 중 맞는 것 | 패시브는 `{}` 대신 **키를 비움**. 액티브는 최소 `mp` 또는 `stamina` + `cd`(재사용 턴) |
| `power` | 0~3 | 위력 배율 (1 보통 공격). 공격 아닌 스킬은 0 |
| `kind2` | attackKinds | 공격 스킬만: `AK_MELEE` · `AK_RANGED` · `AK_MAGIC` · `AK_SPECIAL` |
| `el` | elements | 속성이 있으면 |
| `scale` · `scale2` | `STAT_…` · `ABL_…` | 주로 · 보조로 기대는 능력 |
| `acc` · `crit` | -3~+3 | 명중 · 치명 보정 |
| `heal` · `shield` | 0~3 | 회복 · 보호막 배율 (해당 스킬만) |
| `se` | `[{se:'SE_…', chance:0~1, turns}]` | 거는 상태 이상 · 강화 |
| `cleanse` | `['SE_…']` | 풀어 주는 상태 |
| `buff` | `{stat 배율…, turns}` | 예: `{def:1.2, turns:3}` |
| `move` | `dash` · `retreat` · `teleport` · `pull` · `push` | 이동기만 |
| `stance` · `toggle` | `true` | 자세 · 켜고 끄는 스킬만 |
| `combo` | `[skills]` | 이어 쓰기 좋은 같은 클래스 스킬 · 공용 스킬 |
| `counter` · `reaction` | 글 | 반격 조건 · 패시브 발동 조건 (해당 스킬만) |
| `maxLv` | 5~20 | 스킬 레벨 상한 |
| `growth` | `{power, cost, cd}` | 레벨당 변화 (예: `{power:0.05, cd:-0.1}`) |
| `mastery` | `['글', …]` 3~4개 | 숙련 단계 이름 (예: `['서툼','익숙함','능숙함','경지']`) |
| `req` | `{lv, stat:{}, abl:{}}` | 배우는 조건. 레벨 습득 스킬은 lv 필수. 각성 후보 · 공용은 비워도 됨 |
| `ai` | `{hpBelow, mpAbove, enemies, allyHurt, boss, opener}` 중 맞는 것 | 헌터가 언제 쓰는지 (예: `{allyHurt:true}`, `{hpBelow:0.4}`, `{enemies:3}`) |
| `tags` | `['글', …]` | 짧은 꼬리표 (예: '방어', '소음', '실내 위험') |
| `risk` | 1~5 | 쓰는 위험 |
| `side` | `['글']` | 부작용 (반동 · 마력 고갈 · 소음 등). 없으면 비움 |
| `daily` | `true` | 일상에서도 쓰는 스킬만 (요리 · 치료 · 설득 · 정리 등) |
| `lines` | `{use:[…], hit:[…], miss:[…], crit:[…], fail:[…]}` 각 2개 이상 | `{u}` 쓰는 사람 · `{t}` 대상 · `{s}` 스킬 이름. 패시브는 `{use}` 대신 발동 문장 2개. 건조한 기록체 |
| `src` | `'codex'` | |

**비울 항목:** `classes` (여러 클래스 공용 스킬은 이번에 안 만듦) · `evolve` · `book` · `summon` · `acts` · `img` · `icon` · `fx` · `sound` · `notes` · `ver`.

## 속성 · 상태 이상 (`codex_combat_base.js`)
스킬이 `el` · `se` · `cleanse` 로 가리키는 것만 만든다. 너무 잘게 나누지 말 것.
- `def('elements', [ {id:'EL_C01', name:'화염', desc, color:'#hex', opposite:['EL_C02']}, … ]);` — 대략 8~12개 (화염 · 냉기 · 전격 · 빛 · 어둠 · 독 · 대지 · 바람 · 순수 마력 등).
- `def('statusEffects', [ {id:'SE_C001', name:'출혈', kind:'debuff', turns:3, stack:true, desc, text:'{t}의 상처에서 피가 멈추지 않는다.', dmg:0.03}, … ]);` — 필요한 만큼 (보통 20~40). `kind` 는 `buff` · `debuff`.
- `attackKinds` 는 이미 4개(`AK_MELEE` · `AK_RANGED` · `AK_MAGIC` · `AK_SPECIAL`) — 추가하지 않는다.

## 예시 (형식만 참고 — 내용을 베끼지 말 것)
```js
def('classes', [
  {id:'CLS_C001', name:'방벽수', alias:['벽','문지기'], en:'Bulwark', cat:'CC_MELEE', tier:1, rarity:2,
   desc:'앞에서 버티며 뒤를 지키는 전열.', lore:'…', role:'ROLE_TANK', roles:['ROLE_TANK','ROLE_SUP'], range:'melee', resource:'stamina',
   affinity:['EL_C07'], pick:2, pool:['SK_C0001','SK_C0002','SK_C0003','SK_C0004','SK_C0005','SK_C0006'], passive:['SK_C0007'],
   learn:[{skill:'SK_C0008', lv:10},{skill:'SK_C0009', lv:25},{skill:'SK_C0010', lv:45}],
   stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A04','ABL_A01'], growth:{hp:45, mp:8}, hpMul:1.3, mpMul:0.8,
   statReq:{STAT_BODY:14}, ablReq:{ABL_A04:10}, gear:['ITC_WEAPON','ITC_ARMOR'], weapons:['한손 둔기','대형 방패'], armors:['중갑'],
   fame:'common', pay:1.1, demand:4, jobs:['게이트 전열 계약직','현장 경호'], habits:['앉을 때 무의식적으로 벽을 등진다.','…'],
   lines:{awaken:['…','…'], levelUp:['…','…'], idle:['…','…']}, src:'codex'},
]);
def('skills', [
  {id:'SK_C0001', name:'밀쳐내기', en:'Shove', scope:'class', kind:'액티브', cls:'CLS_C001', grade:1, rarity:1, tier:1,
   desc:'방패로 밀어 거리를 만든다. 반동이 크다.', lore:'…', target:'enemy', range:'melee', area:1, hits:1, count:1,
   cost:{stamina:10, cd:2}, power:0.6, kind2:'AK_MELEE', scale:'STAT_BODY', scale2:'ABL_A04', acc:1, crit:-1, move:'push',
   combo:['SK_C0002'], maxLv:10, growth:{power:0.05}, mastery:['서툼','익숙함','능숙함'], ai:{enemies:2}, tags:['밀침'], risk:1,
   side:['팔이 저린다'], lines:{use:['{u}이(가) 방패를 앞세워 {t}에게 부딪친다.','…'], hit:['…','…'], miss:['…','…'], crit:['…','…'], fail:['…','…']}, src:'codex'},
]);
```

## 반영 순서
1. 위 파일들을 만들고 `_list.js` 에 등록한다.
2. `node tools/validate_data.js` → '문제 없음'.
3. (가능하면) UI 테스트.
4. 커밋 · push, PC 폴더 맞추기.
5. 아래 완료 보고를 채운다.

## 확인할 것
- 분류 6개 · 공용 묶음 8개가 고르게 채워졌는가.
- 같은 클래스의 각성 후보 6개가 서로 다른 방향인가 (두 개가 뽑혔을 때 사람마다 다른 헌터가 되는가).
- 스킬 이름 · 클래스 이름 중복이 없는가.
- 세계관 고정 사실(치유 포션 없음 등)과 어긋나지 않는가.
- 모든 문장이 스타일 명세(3인칭 · 현재형 · 건조한 기록체)를 따르는가.

## 완료 보고 (Codex가 채움)
- 클래스 수 (분류별):
- 클래스 스킬 수:
- 공용 스킬 수 (묶음별):
- 속성 · 상태 이상 수:
- 검사 결과:
- 커밋:
- 막힌 점 · 형식 문의:
