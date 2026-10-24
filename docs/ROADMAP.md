# 로드맵 (K-Hunter-Life) — 2026-10-24

이 문서는 **어떤 AI가 이어받아도** 같은 방향으로 개발을 계속할 수 있게 쓴 작업 지도다.
처음 들어온 AI는 이 순서로 읽는다: **이 문서 → [HANDOFF.md](HANDOFF.md)(구조 · 진행) → [DECISIONS.md](DECISIONS.md)(사용자 결정) → [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md)(글 스타일)**.
결정이 부딪치면: 사용자의 최근 말 > DECISIONS > 이 문서 > STYLE_CHECKLIST > AI 임시값.

---

## 0. 일하는 규칙 (모든 AI 공통)

- 사용자와는 **한국어로, 짧게**. 결정할 게 있으면 선택지를 펼쳐 고르게 한다. 사용자가 "물어보지 말고 해 줘"라고 하면 합리적으로 정하고 결과에 적는다.
- **정해진 범위 밖을 앞서 고치지 않는다.** UI를 바꾸지 말라고 하면 바꾸지 않는다.
- **게임 안에 AI(LLM)를 넣지 않는다.** 모든 내용은 ID 기반 데이터(`def('테이블',[…])`)와 규칙으로.
- **관찰형:** 플레이어는 헌터의 '성좌'다. 헌터를 직접 조종하는 버튼(행동 · 공략 · 장비 착용 · 스탯 분배)을 만들지 않는다. 성좌가 하는 건 지켜보기 · 선물(코인) · 축복 · (헌터가 성좌를 알면) 조언뿐.
- **밸런스 수치는 `balance` 테이블(`BAL_*`)에.** 코드에 상수로 박지 않는다.
- **콘텐츠도 AI가 만든다** (외주 중단, 2026-10-24). 형식은 각 data 파일 **머리 주석**과 `game/engine/validate.js` 규칙이 기준.
- 문서를 늘 최신으로: 작업이 끝나면 HANDOFF '진행 상황'에 한 줄, 사용자가 새로 정한 것은 DECISIONS 에 한 줄.

### 변경할 때마다
1. `node tools/validate_data.js` — '문제 없음'이어야 한다.
2. UI 테스트 전체 (Playwright · Chromium): `ls tests/ui/t_*.js | CHROMIUM=<chromium 경로> OUT=/tmp/out NODE_PATH=$(npm root -g) xargs -P 6 -I{} sh -c 'node {} >/tmp/out/$(basename {}).log 2>&1 || echo FAIL {}'`
3. 콘텐츠를 많이 넣었으면 `node tools/report_content.js` (빈 곳 · 겹침), 큰 변경이면 `tools/qa_sim.js`(QA 봇) · `tools/perf_scale.js`(속도).
4. 커밋 → `main` 에 push.
5. (Claude 세션 전용) 사용자 PC 폴더 동기화 · 게임 페이지(아티팩트) 갱신 — CLAUDE.md 참고. 다른 AI는 이 단계를 사용자에게 알리고 넘긴다.

---

## 1. 지금 상태 한눈에

| 영역 | 상태 |
|---|---|
| 실시간 재생 · 이야기 창 · 판단 엔진 · 감정 · 고비 · 일대기 | 돌아감 (HANDOFF 2장 표) |
| 배경 인구 · 게이트 규모 · NPC 공략 | 돌아감 (sim.js · scale.js, 워커 + IndexedDB) |
| 전투 (실시간 통계 시뮬) | 돌아감 (`engine/combat.js`) |
| 클래스 100 · 스킬 280 · 전투 기술 157 · 장비 507 | 데이터 있음 (`tools/content/*_src.py` → `build.py` → `game/data/content/k_*.js`) |
| 성좌: 계정 · 상점(매일 진열) · 경매장 · 업적 30 · 잠재력 엿보기 · 축복/메시지 구조 | 돌아감. 메시지 · 축복 · 정해진 성좌 · NPC 성좌 **데이터는 비어 있음** |
| 내 헌터: 정보 · 상태창(기본 · 장비 · 클래스/스킬 · 특성) · 관계 | 돌아감 |
| 기반: 색인 · 공통 꼬리표 · 빈칸 문장 · IndexedDB 세이브 · 보고/속도 도구 | 돌아감 (`engine/content.js`) |
| **콘텐츠 양** | **아주 적음** — 아래 2장 A 단계가 다음 큰 일 |

`node tools/report_content.js` 가 지금 비어 있는 곳을 바로 보여 준다 (2026-10-24 기준: 이야기 문장 71개 시점이 모두 5줄 미만, 이벤트 10개, 몬스터 15, 이름 있는 장소 0, 물건 개성 0, 성좌 메시지 0 …).

---

## 2. 로드맵

표기: **[결정]** = 시작 전에 사용자에게 물어야 함 · **[바로]** = 형식이 정해져 있어 바로 채우면 됨 · 완료 기준은 '이걸 만족하면 끝'.

### A. 콘텐츠 1차 — 기초 DB 채우기 (다음 할 일)
사용자 결정(2026-10-23): 선택지 · 이벤트보다 **기초 DB(장소 · 아이템 · 몬스터 · 인물)를 먼저**, 그 위에 이야기.

| # | 할 일 | 어디 · 형식 | 완료 기준 |
|---|---|---|---|
| A1 [바로] | 이야기 문장: 모든 발동 시점 5~10줄 | `data/base/b_story.js` storyLines 머리 주석 (on · lv · req · asserts · w). 새 파일로 나눠도 됨(`data/ext/_list.js` 에 등록) | report 의 '5줄 미만 시점' 0개. asserts 는 req 에 같은 조건(세 층 원칙) |
| A2 [바로] | 게이트 · 몬스터 목록 | `data/content.js`(monsterCats · monsterTags · matParts · terrains) · monsters · gates 형식 (DECISIONS '게이트 · 몬스터': 게이트 하나 = 잡몹 1~3종 + 보스 1, 몬스터 등급은 범위) | 20개 등급마다 잡몹 · 보스 후보가 있음, 몬스터 갈래마다 꼬리표 · 소재 부위 |
| A3 [바로] | 이름 있는 장소 | `data/places.js` (placeTypes · placeTags · places, 시 · 군 · 구 단위) | 큰 도시(서울 · 부산 · 인천 · 대구 · 대전 · 광주 · 울산 · 경기 주요 시)부터, 지역마다 생활 · 헌터 · 가게 장소 몇 개 |
| A4 [바로] | 물건 나머지: 개성 · 소모품 · 소재 · 책 · 생활품 | `data/items.js` (itemTraits · items 형식 · itemGrades · itemSources). 장비는 `tools/content/gear_src.py` 를 고치고 `python3 tools/content/build.py` | 개성 30+ · 소모품 30+ · 소재(몬스터 갈래 × 부위) · 스킬북/클래스북 · 생활품. 가격은 ECONOMY.md 가이드 |
| A5 [바로] | 이벤트 · 위기 늘리기 | b_story.js events · crises (kind = stopKinds, on = 세계 사건, req, choices[tags · check · ok/ng · okFx/ngFx]) | stopKinds 마다 5개 이상 (지금 연애 · 이적/영입 · 공략 위기 · 세상 일이 0), 위기 when 마다 5개 이상 |
| A6 [바로] | 성좌 메시지 · 축복 · NPC 성좌 | `data/stars.js` (starMsgEvents 11개 때 · starMessages · starBlessings · constellations 형식 주석) | 때마다 성향별 몇 줄, 축복 10개 안팎, NPC 성좌 10~20 (경매 · 다른 헌터 후원에 이름이 나옴) |
| A7 [결정] | 정해진 성좌 (starPresets) | DECISIONS: **사용자가 만든다**. 형식은 stars.js 주석 | 사용자가 준 내용을 형식대로 넣고 고유 클래스 · 스킬(unique) 데이터 연결 |
| A8 [바로] | 인물 · 직업 · 생활비 | npcs · aiJobs(직업) · costItems(더 붙는 생활비) · namePool · hunters(이름 있는 헌터, `data/base/b_hunters.js`) | 직업 20+, 이름 있는 헌터 각 등급대, 길드 마스터 · 유명인 |
| A9 [바로] | 빈칸 재료 · 공통 꼬리표 붙이기 | textBits · contentTags, 행마다 `ctags` | report 의 '안 쓰는 key / 쓰임 0 꼬리표'가 줄어듦 |
| A10 [바로] | 소문 · 뉴스 · 들은 말 · 경력 메시지 | world.js newsPool · rumorPool · hearTexts · careerMsgs | 종류마다 10+ |

### B. 시스템 보강 (콘텐츠와 나란히)
| # | 할 일 | 메모 |
|---|---|---|
| B1 [결정] | **옛 화면 정리**: 게이트 · 길드 · 재정 · 뉴스 · 전국 현황 · 소지품 · 옛 상점(`V.shop`) · 옛 DB(`V.db`/`DB_TABS`) | 아직 검색 · 알림 링크로 열리는 옛 `V.*` 화면. 새 탭 구조(좌측 4묶음)에 넣을지 · 없앨지 사용자와 정한다 |
| B2 [바로] | 경제 손보기 | ECONOMY.md 3장: 고참 헌터 성장 둔화 · 장비/포션 가격 가이드 맞추기 · 플레이어 기준 성장 시뮬. `tools/qa_sim.js` 로 1~3년 흘려 확인 |
| B3 [결정] | 현실 가게 · 경매에서 헌터가 스스로 사는 사건 | DECISIONS '성좌: 상점 · 경매장' — 성좌 상점과 별개. 이벤트 + 헌터 판단으로 |
| B4 [결정] | 스탯 분배를 성좌에게 묻는 순간 | 지금은 `autoStatAlloc`(BAL_STATALLOC 규칙)로 헌터가 스스로 나눈다. '묻기'는 선택지 · 이벤트 단계(맨 나중) |
| B5 [결정] | 성좌의 지시 | DECISIONS '성좌의 지시 (나중에)': 성좌가 시키고 헌터가 성향대로 따르거나 거부. 조언(`engine/star_advice.js`)을 넓히는 방향 |
| B6 [결정] | 아이템 품질 단계 · 제작 · 강화 | DECISIONS: 일단 넣지 않음 / 나중에 다시 |
| B7 [바로] | 장비 착용 판단 고도화 | `GEAR.consider` — 지금은 선물받을 때만. 수리 · 교체 · 클래스에 맞는 무기 선호 |
| B8 [바로] | 몬스터 약점 · 저항 · 꼬리표를 전투에 연결 | `engine/monster.js` 주석: 형식만 있고 계산은 게이트 등급뿐. combat.js 원소 · 상태 표와 연결 |

### C. 큰 기능 (사용자가 '나중에'로 미룬 것)
| # | 할 일 | 메모 |
|---|---|---|
| C1 [결정] | **자녀 + 다음 인물로 이어 가기** | DECISIONS: 게임이 어느 정도 플레이 가능해지고 선택지가 많아진 뒤. 자녀 규칙은 이어 가기를 만들 때 같이 정한다 |
| C2 [결정] | **범죄** (살인 · 암살 등) | 가능하게 하되 선택지 · 이벤트를 만들 때 **맨 나중에** |
| C3 [결정] | 각성 전 일상부터 시작 | DECISIONS '각성 전부터 시작 (나중에)' |
| C4 [바로] | 망한 나라 세계사 | world.js nationStates · 뉴스 · 소문 재료로 |
| C5 [바로] | '같은 세계 새 인물'에서 배경 인구 이어받기 | HANDOFF 6장 한계: 새로 고침하면 같은 시드로 다시 만든다 |

### D. 품질 · 성능 (늘)
| # | 할 일 | 메모 |
|---|---|---|
| D1 | 콘텐츠를 늘릴 때마다 `perf_scale.js` | 기준: 하루 300ms · 화면 400ms · 세이브 3MB. 2026-10-24: ×1 약 140ms, ×30 약 290ms. 남은 무거운 곳 = 이야기 창 그리기(`life_ui.js appendLine`) · 배경 인구(`sim.js choose`) |
| D2 | 큰 테이블을 훑는 코드는 `CONTENT.get/all` 로 | `vals('큰 테이블')` 을 틱마다 부르지 않는다. def 로 행이 더해지면 색인은 저절로 다시 만든다 |
| D3 | 테스트 정리 | 옛 테스트 다수가 `tests/ui/fixture.js`(테스트 전용 데이터)에 기댄다. 콘텐츠가 차면 실제 데이터 기반으로 |
| D4 | QA 봇 정기 실행 | `DAYS=120 RUNS=3 node tools/qa_sim.js` (docs/QA.md) — 문장에 치환 안 된 `{x}` · 조사 표시 · 불변식 |
| D5 | 모바일 · 접근성 | 각 화면 320~768px 가로 넘침 검사는 테스트에 있음. 새 화면도 같은 검사를 넣는다 |

---

## 3. 구조 요약 (코드를 처음 보는 AI용)

- **빌드 없음.** `game/index.html` 을 브라우저로 열면 동작. 스크립트는 `<script src>` 순서대로: `data/*.js`(데이터) → index.html 본문(엔진 · UI 본체) → `engine/*.js`(모듈).
- **데이터:** `def('테이블', [{id:'접두사_…', …}, …])` → 게임에서 `DB.테이블[ID]` · `vals('테이블')`. 같은 테이블을 여러 파일에서 def 해도 합쳐진다(새 파일은 `data/ext/_list.js` 또는 큰 묶음은 `data/packs/_manifest.js` 에 등록 — 팩은 뒤에서 불러온다).
- **ID 배치 코드:** `_B` Claude 기본분 · `_K` tools/content 생성분. 새 배치는 다른 글자.
- **검사:** `engine/validate.js` RULES(테이블별 규칙) · REQ_K(이벤트 조건 종류) · 세 층 원칙(asserts ⊆ req) · 없는 ID 참조 · 공통 꼬리표(ctags). 새 테이블을 만들면 RULES 에 한 줄.
- **이벤트 조건(req):** `[{k:'…', …}]`. 종류는 REQ_K, 검사는 index.html `checkReq`. 꼬리표 조건 `{k:'tag', of:'here'|'gate'|'who'|'player'|'bag', tag:'CT_…'}`.
- **문장 자리 표시:** 이야기 문장은 `{p}` `{place}` 등(b_story.js 주석), 새 문장은 `CONTENT.fill` 의 `{a|b}` · `{@재료}` · `{who.name}`. 조사는 `이(가)` `을(를)` 처럼 쓰면 자동으로 맞춘다.
- **세이브:** `G` 한 덩어리. 목록은 localStorage `khl.saves.v1.meta`, 내용은 IndexedDB `khl-saves`(`SAVES`). 성좌 계정은 localStorage `khl.stars.v1`. 배경 인구 · 월별 이야기 원문은 IndexedDB 따로.
- **화면:** 좌측 4묶음 `이야기 · 내 헌터 · 성좌 · DB` (`engine/life_ui.js` HOME_TABS · index.html `renderNav`). 클릭은 `data-*` 위임. 관찰형이라 `engine/observe.js` 가 직접 조작 버튼을 지운다.
- **도구:** `tools/validate_data.js`(검사) · `tools/report_content.js`(커버리지 · 겹침) · `tools/perf_scale.js`(속도) · `tools/qa_sim.js`(QA 봇) · `tools/content/build.py`(클래스 · 스킬 · 장비 생성) · `tools/build_*.py`(지역 · 지도 · 게이트 장소).

---

## 4. 콘텐츠 만드는 법 (A 단계 작업 순서)

1. `node tools/report_content.js` 로 빈 곳을 본다.
2. 넣을 테이블의 data 파일 **머리 주석**을 읽는다 (필드 · 필수/선택 · 자리 표시).
3. [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md) 를 지킨다 — 3인칭 · 현재형 · 짧게 · 건조한 기록체, 이름은 헌터 소설풍, 희귀도에 맞는 이름 분위기, 비하 · 혐오는 인물의 말로만, 성적 묘사는 성인끼리만(adult 조건).
4. 많으면 새 파일(`data/ext/<주제>.js` + `_list.js` 등록)로. 클래스 · 스킬 · 장비는 `tools/content/*_src.py` 원고를 고치고 `build.py` 로 다시 만든다 (생성 파일을 직접 고치지 않는다).
5. `validate_data.js` → `report_content.js` → 테스트.

---

## 5. 사용자에게 물어볼 것 (결정 대기)

- B1 옛 화면들(게이트 · 길드 · 재정 · 뉴스 · 전국 현황 · 소지품)을 새 탭 구조 어디에 둘지.
- A7 정해진 성좌 내용 (사용자가 만들기로 함).
- C1 자녀 규칙 · C2 범죄 범위 · C3 각성 전 시작 방식 — 각각 시작할 때.
- 잠재력 '전부 엿보기'는 만들어 두고 꺼 두었다 (`BAL_STAR.peekFull:false`, CLAUDE.md '나중에'). 켤지 사용자에게 묻는다. '대략 엿보기'는 켜져 있다.
