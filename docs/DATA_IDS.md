> 옛 버전(yonseyab/Hunter-Life)에서 옮긴 문서 (2026-10-23). 엔진 규칙은 그대로 유효하다. 새 버전에서 바뀐 것은 docs/HANDOFF.md · docs/DECISIONS.md 가 우선.

# 데이터 ID 규칙

모든 데이터는 **ID로 저장하고 ID로 참조한다.** 이름이나 문구는 표시용일 뿐, 다른 데이터가 이름을 참조하는 일은 없다.

## 데이터 파일 구조

`game/data/*.js` 파일은 모두 같은 형식이다.

```js
def('테이블 이름', [
  {id:'ID', ...필드},
  ...
]);
```

- `def()`는 행을 `HLDB[테이블][id]`에 등록한다. 같은 ID가 두 번 나오면 콘솔에 경고가 뜬다.
- 같은 테이블을 여러 파일에서 `def()` 해도 합쳐진다. 그래서 추가 데이터(DLC, 모드)는 새 파일 하나로 붙일 수 있다.
- 새 파일을 만들면 `index.html`의 `<script src="data/...">` 목록에 한 줄을 추가한다.
- 나중에 정식 버전에서는 같은 구조를 JSON으로 옮긴다. 필드 이름은 그대로 유지한다.

## ID 접두사

| 접두사 | 대상 | 예 | 파일 |
|---|---|---|---|
| `STAT_` | 기본 스탯 4종 (신체 · 정신 · 마력 · 감각) | `STAT_BODY` | abilities.js |
| `ABS_` | 세부 능력 묶음 (A 각성자 전문 · B 공통 · C 비각성자 전문) | `ABS_A` | abilities.js |
| `ABG_` | 세부 능력 표시 그룹 | `ABG_A1` | abilities.js |
| `ABL_` | 세부 능력 (1~20). A01~A30 · B01~B40 · C01~C20 | `ABL_B17` | abilities.js |
| `BAL_` | 밸런스 값 ([prototype_default] 임시값). BAL_TIME · BAL_TRAIN 은 actions.js, BAL_SHOP 은 items.js, BAL_GATE 는 gate_content.js, BAL_REL 은 relations.js, BAL_WORLD · MARKET · BID · NPC · NPCREL · LIFE · HOUSE 는 world.js, BAL_GUILD 도 world.js, BAL_AI · BAL_POP 은 npc_ai.js, BAL_GOAL 은 goals.js, BAL_MOVE 는 places.js, 나머지(GROWTH · VITALS · EFFECT · DEATH · RANKUP · RETIRE)는 abilities.js | `BAL_VITALS` | abilities.js |
| `ROLE_` | 파티 역할 | `ROLE_TANK` | core.js |
| `RANK_` | 등급 1~20급 (01이 최상위). 헌터 · 게이트 · 길드 공통 | `RANK_13` | core.js |
| `REL_` | 관계 유형 | `REL_SISTER` | core.js |
| `ACT_` | 행동 (홈 추천 · 화면 버튼 · 일정표 공용, NPC도 같은 ID) | `ACT_SLEEP` | actions.js |
| `ACC_` | 행동 분류 | `ACC_TRAIN` | actions.js |
| `SCH_` | 일정 템플릿 (평일 · 주말 시간 블록) | `SCH_GUILD` | actions.js |
| `RG_` | 지역 (전국 시 · 군 · 자치구 230곳, `RG_<시도코드>_<로마자>`) | `RG_SEOUL_MAPO` | core.js (직접 정한 9곳) · regions_all.js (자동 생성) |
| `SYS_` | 시스템 발신자 | `SYS_ASSOC` | core.js |
| `TR_####` | 특성 | `TR_0001` | traits.js |
| `TR_S####` | 목록 성능 확인용 샘플 특성 (나중에 삭제) | `TR_S0001` | dev_traits_sample.js |
| `TC_` | 특성 카테고리 | `TC_BODY` | traits.js |
| `XG_` | 특성 배타 묶음 (묶음 안에서 하나만 선택) | `XG_TEMPER` | traits.js |
| `SK_####` | 스킬 (scope: class / common) | `SK_0050` | skills.js |
| `CLS_####` | 클래스 (후보 스킬 pool, 생성 때 고를 개수 pick) | `CLS_0009` | classes.js |
| `CC_` | 클래스 분류 | `CC_MAGIC` | classes.js |
| `RULE_` | 캐릭터 생성 규칙 (시작 등급 · 소속 · 공용 스킬 수) | `RULE_START` | classes.js |
| `MON_###` | 몬스터 (rank = 협회 추정 등급) | `MON_003` | content.js |
| `MC_` | 몬스터 분류 | `MC_BEAST` | content.js |
| `PART_` | 신체 부위 (부상 위치, w = 무작위 가중치) | `PART_ARM_L` | gate_content.js |
| `INJ_` | 부상 종류 (heal = 심각도별 자연 회복 시간) | `INJ_CUT` | gate_content.js |
| `SEV_` | 부상 심각도 1~3 | `SEV_2` | gate_content.js |
| `CR_####` | 게이트 위기 상황 (선택지 · 판정 · 효과) | `CR_0001` | gate_content.js |
| `GP_` | 새 게이트 이름 재료 (지역별 장소) | `GP_MAPO` | world.js |
| `GT_G####` | 게임 중 생성된 게이트 (세이브 `G.genGates`, 실행 중 `DB.gates` 에도 등록) | `GT_G0001` | — |
| `NW_G#####` | 게임 중 생성된 뉴스 (세이브 `G.news`) | `NW_G00001` | — |
| `RD_` | 관계 차원 (방향성: to 나→상대, from 상대→나) | `RD_LIKE` | relations.js |
| `RS_` | 관계 상태 (친구 · 연인 · 배우자 · 전 연인 …, 가족과 별개) | `RS_DATING` | relations.js |
| `APS_` | 외모 절대 평가 항목 1~20 (adult: 성인끼리만) | `APS_FACE` | relations.js |
| `IT_####` | 아이템 | `IT_0009` | items.js |
| `ITC_` | 아이템 분류 | `ITC_CONSUME` | items.js |
| `LOC_` | 물건 보관 위치 (carry: 지니는 곳, 시스템 상점에 팔 수 있음) | `LOC_BAG` | items.js |
| `HOU_` | 집 종류 (월세 · 보증금 · 자택 보관) | `HOU_ONE` | world.js |
| `SLOT_` | 장비 착용 부위 | `SLOT_WEAPON` | items.js |
| `SS_####` | 시스템 상점 판매 목록 (item · price · stock) | `SS_0001` | items.js |
| `GD_###` | 길드 | `GD_001` | guilds.js |
| `PP_######` | 배경 인구 인물 (집계 → 승격하면 상세) | `PP_000123` | 세이브 · IndexedDB (시드로 생성) |
| `NEED_` | NPC 욕구 | `NEED_MONEY` | npc_ai.js |
| `GOAL_` | 목표 (NPC · 추후 플레이어) | `GOAL_RANK` | npc_ai.js |
| `PT_` | 장소 종류 (지역 + 종류 = 장소) | `PT_TRAIN` | places.js |
| `KS_` | 정보 출처 (아는 것 vs 사실) | `KS_SCOUT` | places.js |
| `OBJ_` | 플레이어 목표 틀 | `OBJ_RANK` | goals.js |
| `PG_#` | 플레이어가 정한 목표 | `PG_3` | 세이브 (`G.goals`) |
| `JOB_` | 일반인 직업 (직급 · 업무 능력) | `JOB_OFFICE` | npc_ai.js |
| `CM_` | 경력 사건 메시지 | `CM_PROMO` | npc_ai.js |
| `NWP_` | 흘러가는 뉴스 재료 | `NWP_0001` | world.js |
| `RP_` | 근거 없는 소문 문장 | `RP_0001` | world.js |
| `PXE_` | 성격 문장 추가 후보 (외주) | `PXE_A0001` | data/ext |
| `GD_P#####` | 플레이어가 세운 길드 | `GD_P12478` | 세이브 데이터 (`G.myGuild`) |
| `HN_####` | 고정 헌터 (미리 정해진 인물) | `HN_0013` | hunters.js |
| `HN_G####` | 생성 헌터 (게임 중 생성, 플레이어 포함) | `HN_G0001` | 세이브 데이터 |
| `NP_####` | 고정 NPC (헌터가 아닌 인물) | `NP_0001` | npcs.js |
| `NP_G####` | 생성 NPC (가족 등) | `NP_G0001` | 세이브 데이터 |
| `GT_####` | 게이트 | `GT_0006` | gates.js |
| `EV_####` | 이벤트 | `EV_0002` | events.js |
| `NEWS_####` | 뉴스 | `NEWS_0001` | world.js |
| `NAT_` | 국적 | `NAT_KR` | creation.js |
| `BP_` | 출생지 | `BP_BUSAN` | creation.js |
| `LANG_` | 언어 | `LANG_EN` | creation.js |
| `VOICE_###` | 목소리 프리셋 (음성 에셋과 연결 예정) | `VOICE_003` | creation.js |
| `SPEECH_###` | 말투 | `SPEECH_003` | creation.js |
| `BI_` | 출신 · 배경 항목 (36개, multi 여부·최대 개수) | `BI_MOTIVE` | background_options.js |
| `BSEC_` | 출신 · 배경 항목 구역 | `BSEC_7` | background_options.js |
| `BGP_` | 출신 · 배경 선택지 묶음 | `BGP_PLACE` | background_options.js |
| `PL_` `FE_` `GE_` `FM_` `FR_` `FS_` `HF_` `HO_` `CB_` `ED_` `MJ_` `SL_` `MS_` `JB_` `CR_` `QT_` `LC_` `FN_` `IH_` `DT_` `DE_` `AB_` `FD_` `BD_` `LO_` `MR_` `RL_` `OG_` `RP_` `PA_` `GH_` `HI_` `PC_` `MO_` (+`_####`) | 출신 · 배경 선택지 | `JB_0018` | background_options.js |
| `PX_` | 성격 축 (1~10 수치, 게임 시스템이 쓰는 값) | `PX_EXTRO` | personality.js |
| `PXC_` | 성격 조합 문장 (두 축 × 방향, 표시용) | `PXC_EP_ab` | personality.js |
| `PXN_` | 성격이 모두 가운데일 때 문장 (표시용) | `PXN_001` | personality.js |
| `LK_` | 외형 항목 (키·체중은 슬라이더, 나머지는 선택지 묶음에서 고름) | `LK_HAIR_STYLE` | creation.js |
| `SC_` | 외형 선택지 묶음 (pool). kind = text / swatch / thumb | `SC_HAIR_COLOR` | look_options.js |
| `LV_` `SZ_` `WD_` `TK_` `DP_` `LN_` `AM_` `DF_` `CV_` `SKN_` `AL_` `CS_` `HP_` `MD_` `OF_` | 외형 단계·형태 선택값 | `WD_4` | look_options.js |
| `ST_####` | 피부톤 | `ST_0004` | look_options.js |
| `HC_####` | 머리색 | `HC_0010` | look_options.js |
| `HR_####` | 헤어스타일 (성별 지정 가능) | `HR_0011` | look_options.js |
| `LOOK_<선택지 ID>` | 외형 썸네일 에셋 → `assets/look/<ID>.png` | `LOOK_HR_0011` | assets/ |
| `LS_` | 성별별 외형 항목 목록 · 순서 | `LS_F` | creation.js |
| `GI_` | 게이트 내부 지형 | `GI_CAVE` | world.js |
| `GPP_` | 지역별 게이트 장소 후보 (목록은 data/pool/pl_<시도>.js) | `GPP_SEOUL_MAPO` | gate_pool.js (자동 생성) |
| `SC_` | 시작 시나리오 | `SC_DEMO` | scenario_demo.js |
| `WG_` | 홈 위젯 | `WG_ALERTS` | index.html |
| `GRP_<길드 ID>` | 단체 대화방 | `GRP_GD_001` | 세이브 데이터 |
| `POR_<엔티티 ID>` | 초상화 에셋 | `POR_HN_0001` | assets/ |
| `CREST_<길드 ID>` | 길드 문장 에셋 | `CREST_GD_001` | assets/ |

## 캐릭터 생성 선택지의 영향

캐릭터 생성 항목(기존 항목과 앞으로 추가할 항목 모두)이 게임에 어떤 영향을 주는지는 **아직 정하지 않는다.**
지금은 선택 결과가 ID로 기록만 된다. 능력치는 각성 계열과 시드로만 임시 생성한다.
특성의 `cost`는 생성 화면의 포인트 계산에만 쓰인다.

## 특성 데이터

- 특성은 `data/traits.js`에 있다. 수가 많아지면 카테고리별 파일로 나눠도 된다 (`def('traits', ...)`는 합쳐진다).
- `pick:false` 특성은 생성 화면에 나오지 않는다 (게임 중에만 생기는 특성).
- `excl`이 같은 특성끼리는 하나만 가질 수 있다. 생성 화면에서 다른 것을 고르면 자동으로 바뀐다.
- `data/dev_traits_sample.js`는 목록 성능 확인용 샘플(`TR_S####`)이다. `python tools/gen_trait_samples.py 5000`처럼 개수를 바꿔 만들 수 있고, 실제 데이터가 쌓이면 `index.html`에서 해당 줄을 지운다.

## 출신 · 배경 선택지

- 항목(`bgItems`)은 외형과 같은 구조다: `pool`이 선택지 묶음(`bgPools`)을 가리키고, 선택지(`bgOpts`)는 몇 개든 추가할 수 있다.
- `multi:true` 항목은 여러 개를 고를 수 있고 `max`로 최대 개수를 정한다. `none:true` 선택지("없음")를 고르면 나머지가 해제된다.
- 묶음에 `table:'regions'`를 주면 다른 데이터 테이블을 그대로 선택지로 쓴다 (현재 거주 지역 → 게임의 지역 ID).
- 가족 구성 선택지의 `rel`은 게임 시작 시 만들어질 가족 인물의 관계 유형이다.
- 외형과 출신 · 배경은 같은 선택 화면 코드(`CH`)를 쓴다. 새 단계도 `CH`에 한 줄을 추가하면 같은 화면으로 만들 수 있다.

## 클래스 · 스킬

- 캐릭터는 항상 각성 직후 · 무소속 (시작 등급은 `RULE_START.rank`, 임시 20급)으로 시작한다 (`ccRules.RULE_START`).
- 클래스의 `pool`은 처음 각성할 때 나올 수 있는 스킬 후보다. 생성 때 그중 `pick`개를 고른다. 같은 클래스라도 사람마다 스킬이 다르다.
- 공용 스킬(`scope:'common'`)은 누구나 익힐 수 있고, 생성 때 `commonSkills`개까지 고를 수 있다.
- 클래스와 능력치는 맞지 않을 수 있다. 게임 중 클래스북 · 스킬북으로 클래스가 바뀌거나 스킬이 늘어날 수 있다 (추후 시스템).
- 세계에 한 명만 존재하는 고유 클래스는 `unique:true`로 표시할 예정이다 (추후 추가).

## 성격

- 성격은 8개 축 × 10단계 수치로 저장한다. 게임 시스템은 이 수치만 쓴다.
- 성격 요약은 짧은 표시용 이름과 짧은 설명 한 문단을 보여 준다. `persRoles`(PXR_)의 대인 성향 16종과 `persStyles`(PXS_)의 판단·표현 수식어 16종을 조합해 256가지 이름을 만든다.
- 각 규칙의 `axes`와 `poles`를 비교하며 a는 1~5, b는 6~10이다. 역할은 외향/타인·자신 우선/협력·경쟁/자립·의존, 수식어는 원칙·실리/안정·모험/낙관·비관/절제·표현을 반영한다.
- 미선택 축이 있거나 두드러진 축이 3개 미만이면 확정된 주요 성향으로만 이름을 만들며, 모두 5~6이면 균형 잡힌 조율자다. 요약은 난수를 쓰지 않고 게임 판단 수치를 변경하지 않는다.
- 짧은 설명은 persRoles/persStyles의 desc를 조합한다. 요약 아래 길게 붙던 상세 설명의 원본/확장 테이블과 생성 코드는 삭제했다. 각 슬라이더 아래의 10단계 예시(`levels`)는 유지한다.

## 외형 선택지

- 항목(`ccLook`)은 `pool`로 선택지 묶음을 가리킨다. 선택지(`lookOpts`)는 `look_options.js`에 있고, 묶음마다 몇 개든 추가할 수 있다.
- 같은 묶음을 여러 항목이 함께 쓸 수 있다 (예: 어깨너비·골반 너비 → `SC_WIDTH`). 항목별로 다르게 하려면 새 묶음을 만들어 `pool`만 바꾼다.
- `group`을 넣으면 선택지 화면에 필터 칩이 생기고, `sex`를 넣으면 해당 성별에만 보인다.
- 선택지 화면은 검색·묶음 필터·타일(글자 / 색 견본 / 썸네일)로 수백 개까지 고르는 것을 전제로 만들었다.

## 에셋 (초상화 · 문장)

정보창, 관계, 캐릭터 생성 화면의 사진 자리는 에셋 ID로 비워 두었다.

- 초상화: `game/assets/portraits/POR_HN_0001.png` 처럼 **에셋 ID와 같은 이름의 PNG**를 두면 자동으로 표시된다.
- 길드 문장: `game/assets/crests/CREST_GD_001.png`
- 외형 썸네일: `game/assets/look/LOOK_HR_0011.png`
- 파일 이름이나 형식이 다르면 `data/assets.js`에 `{id:'POR_HN_0001', src:'경로'}`로 등록한다.
- 파일이 없으면 실루엣과 에셋 ID가 표시된다.

## 이벤트 데이터 형식

`data/events.js` 맨 위 주석에 전체 형식이 있다. 요약하면 이렇다.

- `ch`: `alert`(단말기 알림) 또는 `msg`(메신저)
- `req`: 발동 조건 목록. 화면의 "발동 조건" 상자는 이 목록을 자동으로 문장으로 바꿔 보여준다.
- `to: 'REL:REL_SISTER'`처럼 관계 유형으로 대상을 지정하면, 생성 캐릭터에게도 같은 이벤트가 적용된다.
- `check: {attr, dc}`: 능력치 + d20(1~20) ≥ 난이도. 20·1이 나와도 자동 성공/실패 없음
- `fx`: 결과 효과 (`rep`, `fatigue`, `stress`, `hp`, `money`, `rel`)

## 이벤트 조건 (events.js `req`)

- 시각: `{k:'time', from, to}` 분 단위(0~1439). `to < from` 이면 자정을 넘는다 (예: `from:1080, to:360` = 18:00~06:00).
- 그 밖의 조건 · 효과 목록은 `game/data/events.js` 머리 주석에 있다 (all/any/not, 기력 · 스트레스 · 수면 부족 · 부상 · 관계 차원 · 관계 상태 · 레벨 · 등급 · 클리어 수 · 아이템 · 요일 · 진행 표시).
- 예전 `{k:'slot', in:[…]}`(오전 · 오후 · 저녁 · 밤)도 시간 범위로 해석되지만 새 데이터에는 `time`을 쓴다.

## 검증
`node tools/validate_data.js` — 모든 데이터 파일을 읽어 중복 ID, 없는 ID 참조(값 · 객체 키 모두), 테이블별 규칙(`RULES`)을 검사한다. 게임 중 생기는 ID(PP_ · GT_G · GD_P · PG_ …)와 에셋 ID(POR_ · CREST_)는 `RUNTIME` 목록으로 뺀다. 새 테이블 규칙은 `RULES` 에 한 줄 추가.

## 외주 데이터
외주 지시문은 `docs/outsource/` (공통 규칙 + 카테고리 12개 + 자동 생성 `ID_참조.md`). 외주 ID 는 배치 코드를 넣는다 (예: `EV_A001`, `TR_A0001`). 받은 파일은 `game/data/ext/` 에 넣고 `ext/_list.js` 에 추가.

## 일과 확장 필드 (2026-10-22)

기존 ACT_·OBJ_ ID 배치 규칙은 그대로야. actions.routineOnly는 일과 전용 후보 여부이고, objectives.route는 직접 진행할 일이 있는 화면 안내야. 후보의 방향·비용·조건·효과는 기존 필드를 재사용해. 형식과 검사 범위는 [일과 시스템](ROUTINE.md)을 확인해 줘.

## K-Hunter-Life 에서 추가한 접두사 (2026-10-23)

| 접두사 | 대상 | 예 | 파일 |
|---|---|---|---|
| `TAG_` | 판단 엔진 의미 태그 (선택지 tags) | `TAG_RISK` | data/system.js |
| `MW_` | 고른 이유 문장 조각 | `MW_0001` | data/system.js |
| `EM_` | 감정 | `EM_ANX` | data/system.js |
| `ET_` | 감정 변화 규칙 | `ET_01` | data/system.js |
| `MS_` | 고비 회고 종류 | `MS_RANKUP` | data/system.js |
| `SK_` (멈춤) | 멈춤 종류 — `stopKinds` 테이블 (스킬 `SK_####` 과 테이블이 다르다) | `SK_LOVE` | data/system.js |
| `NS_` | 국가 상태 | `NS_FALLEN` | data/system.js |
| `SL_` | 이야기 창 문장 재료 | `SL_B0001` | data/base/b_story.js · 외주 |
| `HN_L####` | 끝난 · 바꾼 전 주인공 (같은 세계 NPC) | `HN_L0001` | 세이브 |
| `HN_A####` | 기록관에서 넣은 헌터 | `HN_A0001` | 세이브 |
| `AR_` | 기록관 항목 | `AR_…` | 브라우저 저장소 `khl.archive.v1` |
| `*_B####` | Claude 기본분(최소 재료) 배치 B | `IT_B0001` · `EV_B0001` | data/base/ |

옛 버전의 콘텐츠 ID(`HN_0001` · `GD_001` · `IT_0011` · `EV_0001` · `SC_DEMO` …)는 새 버전에 없다. 테스트는 `tests/ui/fixture.js` 의 테스트 전용 데이터를 쓴다.
