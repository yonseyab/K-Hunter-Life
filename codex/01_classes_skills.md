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
4. 작업 브랜치에 커밋 · push → `main` 대상 PR. 병합 뒤 PC 기준 폴더를 Git으로 갱신한다 (`README.md` · `docs/GIT_WORKFLOW.md` 참고).
5. 아래 완료 보고를 채운다.

## 확인할 것
- 분류 6개 · 공용 묶음 8개가 고르게 채워졌는가.
- 같은 클래스의 각성 후보 6개가 서로 다른 방향인가 (두 개가 뽑혔을 때 사람마다 다른 헌터가 되는가).
- 스킬 이름 · 클래스 이름 중복이 없는가.
- 세계관 고정 사실(치유 포션 없음 등)과 어긋나지 않는가.
- 모든 문장이 스타일 명세(3인칭 · 현재형 · 건조한 기록체)를 따르는가.

## 완료 보고 (Codex가 채움)
- 작업 상태: 2026-10-24 콘텐츠 제작 완료. `codex/classes-skills` 브랜치에서 PR로 전달한다. 엔진 연결은 아래 인계 항목을 확인한다.
- 클래스 수 (분류별): **108개** — 근접 · 원거리 · 마법 · 지원 · 특수 · 생산 각 **18개**. `CLS_C001`~`CLS_C108`.
- 클래스 스킬 수: **1,080개** (`SK_C0001`~`SK_C1080`). 클래스마다 각성 후보 6 + 기본 패시브 1 + 레벨 습득 3. 모든 클래스가 액티브 6 · 패시브 4이며, 레벨 습득은 10 · 25 · 45다.
- 공용 스킬 수 (묶음별): **240개** (`SK_C5001`~`SK_C5240`) — 생존 · 전투 보조 · 감지 · 회복/응급 · 이동 · 정신 · 사회/교섭 · 생활/기술 각 **30개**.
- 속성 · 상태 이상 수: 속성 **12개** (`EL_C01`~`EL_C12`) · 상태 **28개** (`SE_C001`~`SE_C028`). 전부 클래스 또는 스킬에서 참조한다. `attackKinds`는 추가하지 않았다.
- 추가 제작: 사용자 추가 요청으로 클래스 **36개** (`CLS_C073`~`CLS_C108`), 클래스 스킬 **360개** (`SK_C0721`~`SK_C1080`), 공용 스킬 **80개** (`SK_C5161`~`SK_C5240`)를 보탰다. 최초 72개 클래스와 880개 스킬의 모든 필드가 그대로인지 JSON 데이터로 대조했다. 기존 속성 · 상태를 재사용하며 등록 파일도 늘리지 않았다.
- 내용 점검: 기존 배치 포함 클래스/스킬 이름 · ID 중복 없음. Codex 클래스 설명 108개 · 스킬 설명 1,320개가 각각 서로 다르다. 희귀도 1/2/3/4/5는 36/36/18/12/6개다. 클래스별 현장 일거리 · 장비 · 한계 · 생활 버릇을 채웠다. 사회 지원은 타인의 의사를 강제하지 않고, 제작에는 재료와 도구가 필요하며, 치유는 소실 조직을 복원하지 않는다.
- 검사 결과:
  - `node tools/validate_data.js`: **문제 없음** — 파일 33개 · 테이블 117개 · 행 4,012개.
  - 추가 지침 검사: 분류별 수량 · 필수/금지 필드 · 빈 값 · ID 범위/소유 클래스 · 6/1/3 구성 · 액티브/패시브 비율 · 배우는 레벨 · 수치 범위 · 로그 묶음별 2문장 이상 · 참조/미사용 속성/상태 검사 통과. 검사 스크립트는 임시 폴더에서 실행했고 의뢰 범위 밖 저장소 파일은 추가하지 않았다.
  - 실제 브라우저: Codex 클래스 108개의 각성 후보 2개 조합 **1,620개 전부** 헌터 생성 확인. 무작위 각성 **1,000회** 정상. 8개 공용 묶음에 Codex 스킬 30개씩 표시 확인. 390px 모바일 가로 넘침 없음 · 페이지 오류 없음.
  - 확장 후 기존 UI 전체 재검사: **40/41 통과**. `t_play.js`의 두 단언(방향/구매/장비 버튼, '오늘 할 일' 계획 로그)이 이전과 동일하게 실패한다. 변경 없는 `main`(`10da063`)에서도 같은 두 단언이 동일하게 실패함을 최초 검사에서 비교 확인했다. 테스트 · 엔진 수정은 하지 않았다.
  - `git diff --check`: 통과.
- 커밋: 최초 콘텐츠 `30ddafb0983e1a9e86789360df82816e940d4868` (`[codex] 01 1차 클래스 72 · 클래스 스킬 720 · 공용 스킬 160`). 추가 콘텐츠 `1e22b4695fb0368c9f2c977d8d8818a82a406030` (`[codex] 01 클래스 36 · 클래스 스킬 360 · 공용 스킬 80 추가`). 완료 보고는 같은 브랜치의 후속 커밋으로 기록한다. [PR #2](https://github.com/yonseyab/K-Hunter-Life/pull/2)에 함께 전달한다.
- 막힌 점 · 형식 문의 (Claude 인계):
  - 현재 `buildHunter`는 각성 후보와 공용 스킬만 보유 목록에 넣는다 (`game/index.html`). `classes.passive` 자동 지급과 `classes.learn` 레벨별 습득은 현재 실행 코드에서 연결을 찾지 못했다. 클래스북 전환 시에도 기본 패시브 지급/회수 정책을 연결해야 한다.
  - 클래스 성장 가중치/HP·MP 배율/전직 요구치, 스킬별 비용/위력/상태/보호막/회복/AI/성장 등은 요청된 형식으로 채웠지만 현 엔진의 전투는 개별 스킬 효과를 실행하지 않는다. 실제 전투 밸런스 검증을 마쳤다는 의미는 아니다. 전투 개편 때 연결 및 검토가 필요하다.
  - 생산 스킬은 허용된 `target` 범위 안에서 작업자의 정렬/고정/보존 등 작업 보조로 표현했다. 재료 소모 · 제작 결과 아이템 · 작업 대상/공정 판정은 새로 구현하지 않았다.
  - 패시브 발동 문장 두 개는 기존 문서에 있는 `lines.use`에 발동 서술로 넣었다. 새 `trigger`/`proc` 키는 추가하지 않았다. 패시브는 비용을 생략하고 `growth.power:0`으로 효과가 자동 증폭되지 않게 명시했다. 패시브 숙련에 따른 강화 정책은 엔진 연결 때 정한다.
  - 추가분의 `배분사`는 자기 마력을 나누는 콘셉트지만, 허용된 스킬 형식에 수신자의 MP 전달량 필드가 없다. 현재 데이터에는 송신자의 MP 비용과 출력 보조 버프만 넣었다. 실제 MP 이동량 · 손실 · 수신 상한을 엔진에서 연결하기 전에는 완전한 마력 전달 기술로 동작하지 않는다.
