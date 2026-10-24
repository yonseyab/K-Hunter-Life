# 인수인계 (K-Hunter-Life)

이 문서만 읽고 작업을 이어받을 수 있게 정리한다. 작업이 끝날 때마다 갱신한다. **앞으로 할 일 전체는 [ROADMAP.md](ROADMAP.md)** (다른 AI도 이어 갈 수 있게 쓴 작업 지도). 사용자 결정은 [DECISIONS.md](DECISIONS.md), 콘텐츠 스타일은 [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md), 경제 기준은 [ECONOMY.md](ECONOMY.md), QA 봇은 [QA.md](QA.md).

## 1. 한 줄
한국 헌터물 + 성좌물 **관찰형** 인생 시뮬레이션. 커마한 헌터의 인생이 하루 30초로 흘러가고, 플레이어는 그 헌터의 **성좌**로서 지켜보며 코인으로 선물한다. 직접 행동 · 공략 · 장비 착용 · 스탯 분배는 하지 않는다 (헌터가 성향대로 정한다). `game/index.html` 을 브라우저로 열면 동작한다 (빌드 없음).

- 게임 페이지(아티팩트): https://claude.ai/artifact/1KVipZo2SnDCQkUgtbLpri (옛 Hunter Life 페이지는 건드리지 않음)
- PC 폴더: `C:\Users\YON\Desktop\K-Hunter-Life` — Claude가 바뀐 파일을 써 넣어 맞춘다 (git 은 쓰지 않음)
- 옛 버전: [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) — 보관본. 옛 저장과 호환하지 않는다.
- 2026-10-24 정리: 옛 직접 조작 화면 · 옛 상점 · 옛 DB 화면 · 외주 문서 · 끝난 계획 문서 · 지난 진행 기록을 지웠다 (GitHub 커밋 기록에 남아 있음).

## 2. 구조

### 화면 (2026-10-24)
- 좌측 메뉴(`renderNav`, 탭 정의 `engine/life_ui.js` HOME_TABS): **이야기**(인생 · 일대기) · **내 헌터**(정보 `hunter_info.js` · 상태창 `hunter_status.js` · 관계 `hunter_rel.js`) · **성좌**(내 정보 · 상점 · 성좌 경매장 · 업적 — `star_ui.js`) · **DB**(`db_ui.js`).
- 인생 탭: 원본 로그 + 작은 상태창(`statusWindowHTML(h,true,{fold:true})`, EXP 아래 접기 `UI.swOpen`) + 위젯(`G.prefs.play.homeWidgets`, `WIDGETS` 재사용). 상단에 코인(`#topCoin`) · 각성 경과.
- 내 헌터 › 상태창: `engine/hunter_status.js` (기본 상태 · 장비 · 클래스/스킬 · 특성. 스탯 분배 없음 — 헌터가 스스로 `autoStatAlloc`).
- DB: `engine/db_ui.js` DB_UI · `db.css`. 탭 정의 `DB_UI.T[탭]` = rows · F(필드: 이름 · 값 · 정렬 값 · 분류 가능) · cols · detail. 분류 칩 설정 `SETTINGS.dbView[탭] = {g 기준, hide [숨긴 칩], s [정렬 키, 방향]}` (localStorage `khl.settings`). 다른 탭으로 건너가기 `DB_UI.open(탭, id)`.
- `engine/observe.js`: 직접 조작 링크 · 버튼을 지우고 클릭을 막는다. 사건 · 위기는 `engine/life_ui.js` 의 선택 팝업(d20).
- 옛 `V.*` 화면 중 남은 것(소지품 · 게이트 · 길드 · 재정 · 뉴스 · 전국 현황 · 기록관 · 옛 정보창 · 공략 화면)은 검색 · 버튼 · 알림 링크로 열린다 — 새 탭 구조 어디에 둘지는 사용자와 정할 일 (ROADMAP B1). 옛 주소 `shop` · `auction` · `db` 는 `OBSERVE` 가 새 탭(성좌 › 상점 · 경매장, DB)으로 돌린다.

```
game/index.html          엔진 · UI 본체
game/*.css               life · home · hunter_status · history · star
game/data/*.js           시스템 테이블 (능력치 · 행동 · 관계 · 세계 수치 · 커마 선택지 · 지역 · 지도 · 게이트 장소 · 아이템 · 성좌 · 장소 · 몬스터 형식)
game/data/system.js      판단 · 감정 · 고비 · 멈춤 · 국가 상태 · BAL_PLAY/MIND/TELLER/SMALL/EMO/SELF/SCALE/AGE
game/data/base/          Claude 최소 재료 (배치 B): b_hunters.js · b_content.js · b_story.js(이야기 문장 · 위기 · 이벤트 · 데모)
game/data/content/       생성기(tools/content) 결과: 클래스 · 스킬 · 전투 기술 · 장비 (직접 고치지 않음)
game/data/ext · packs    추가 데이터 — 채우기 도구 묶음(`fill_NN_종류.js`)이 여기에 붙는다 (`_list.js` · `_manifest.js` 에 파일 이름)
fill/                    채우기 도구 작업 폴더 (orders 주문서 · done 넣은 답 원본)
game/engine/             content(색인 · 꼬리표 · 빈칸 문장) · combat · db_ui · star_ui · hunter_info · hunter_rel · sim · goals · routine · autoraid · know · validate · status_ui (옛 버전에서) · scale · mind · story · play · life · life_ui · observe · hunter_status · history_ui · life_log · gear · star · monster · account(성좌 계정) · active(활동 중인 사람) · emo_graph
tools/                   fill/(콘텐츠 채우기 — docs/FILL.md) · validate_data.js · report_content.js(커버리지 · 겹침) · perf_scale.js(속도) · qa_sim.js · content/(클래스 · 스킬 · 장비 생성) · build_regions.py · build_maps.py · build_gate_pool.py
tests/ui/                Playwright 테스트 + fixture.js(테스트 전용 데이터)
tests/tools/             도구 시험 (t_fill.js)
```

### 시스템 → 구현 위치
| # | 시스템 | 어디 | 핵심 |
|---|---|---|---|
| 1 | 실시간 재생 | `engine/play.js` PLAY | 하루 30초(×1) · ×2 · ×5 · ×20 · 다음 사건까지. 틱마다 `runTime` 을 분 단위로 잘게, 자정 넘을 때 `SIM.ensure`(워커). 아침에 하루 계획(`ROUTINE.plan`) · 공략 판단(`MIND.wantRaid` → `pickGate` → `runRaid`) |
| 2 | 인생 화면 · 이야기 창 | `engine/story.js` STORY · `engine/life_ui.js` | 행동 · 이동 · 작은 일 · 만남 · 반응 · 공략 장면 · 세상 소식 · 하루 마무리 · 시작 전 인생. 상세도 3단계. 조사 자동(`STORY.josa`). 이야기 창은 붙이기만 |
| 3 | 판단 엔진 | `engine/mind.js` MIND | 태그(mindTags) × 재료(성격 · 감정 · 상태 · 자기 인식 · 방침) + 판정 확률 + 관계 · 기억 + 무작위(예측 가능성). 이벤트 · 위기 · 하루 공략 · 게이트 고르기. 이유 문장(mindWhy). 성격 변화(`drift`). NPC 점수(`npcScore`) |
| 4 | 세 층 원칙 | `engine/validate.js` assertErrs · `tools/validate_data.js` | `asserts` ⊆ `req` 강제, 단정 낱말 검사, 조건 키 looks · emo · self · adult · place |
| 5 | 이야기꾼 | `engine/mind.js` TELLER | 조용하면 확률 ↑, 몰리면 ↓ (이벤트 · 작은 일) |
| 6 | 멈춤 · 조언 | `engine/story.js` EVT · play.js · `engine/star_advice.js` STARADV | 안 멈춤 / 큰 갈림길만 / 사건마다 + 종류별. 헌터가 성좌를 알면 고민될 때 묻고(선택 모달), 따를지는 헌터가 정한다. 모르면 혼자 정한다 |
| 7 | 고비 · 일대기 | `engine/life.js` LIFE | 상태 비교로 고비 감지 → 회고 카드 + 한 줄. 나이 · 은퇴 생각 · 노화. 끝나면 일대기 한 장(장 · 기록 · 사람 · 감정 흐름 · 성격 변화 · 노년 · 작별) |
| 8 | 이어 가기 | `engine/life.js` LEGACY | 같은 세계 새 인물(커마 → `adoptWorld`) · 플레이 중 인물 바꾸기(`switchTo`) · 기록관(`khl.archive.v1`, 시점 · 관계) · 파일 내보내기/가져오기 |
| 9 | 화면 | index.html `renderNav` · life_ui.js | 위 '화면' 참고 |
| 10 | 설정 | life_ui.js `V.settings` · `G.prefs.play` | 재생 · 화면 · 헌터 관리(헌터 사진 주문서 · 은퇴) · 개발 |
| + | 인구 · 게이트 규모 | `engine/scale.js` SCALE · sim.js popGen ver 3 | 각성 0.5% · 활동 0.2% · 전국 하루 약 5,470개. 내 주변 개별, 나머지 집계(`G.wagg`). 다른 헌터 공략 시각(`g.clr`) |
| + | 장비 · 아이템 틀 | `engine/gear.js` GEAR · data/items.js | 등급 6(일반~전설 + 숨은 신화, 보정 +1 · 2 · 4 · 7 · 11 · 16) · 칸 8(양손 · 한 벌 · 특수) · 개성(itemTraits) · 출처 13(itemSources) · 내구도 · 수리(헌터가 자동) · 마정석 80종(게이트 등급 × 품질). 착용은 헌터 판단 `GEAR.consider` (선물받을 때). 옛 칸 · rank 만 있는 장비는 `GEAR.normalize` 가 바꿈. 화면 = 상태창 › 장비 |
| + | 성좌 | `engine/star.js` STAR · data/stars.js | 선물 `STAR.gift`(상점 · 경매 → 헌터 가방) · 성좌 경매장(코인, `G.auction.coin`) · NPC 성좌 `STAR.ofHunter` · 고유 클래스 `STAR.grantClass`(세계에 한 명, `G.uniqueHeld`) · 클래스북 `readBook` · 메시지 `STAR.say`(starMsgEvents 때마다) · 축복 `STAR.bless` · 상점 매일 진열 `STAR.shopList` · 선물 안배(헌터가 모를 때 giftCovers). 계정 · 업적 · 잠재력 엿보기 `engine/account.js` STARACC |

### 세이브 (`G`, v:3 — 목록 localStorage `khl.saves.v1.meta`, 내용 IndexedDB `khl-saves` · `SAVES`, 2026-10-24)
새 필드: `story`(현재 달 원문 전체, 화면은 최근 300~500줄) · `storyArchive`(월별 묶음 목록/쓰기 대기 원문, 아래 최신 진행 참고) · `chron`(기존 하루 요약, 최대 4000개) · `emo`/`emoLog` · `persF`/`persBase`/`persLog` · `selfHeard` · `mindMem` · `teller` · `play`(오늘 공략 판단) · `milestones`/`retroQ`/`retroOpen` · `snaps`(rookie · prime · last) · `bioCard` · `oldAge` · `wagg` · `legacyOf`/`cast` · `prefs.play`.

## 3. 반드시 지킬 것
- 게임 안 AI(LLM) 금지. 모든 내용은 ID 기반 데이터 + 규칙.
- 관찰형: 플레이어(성좌)가 헌터를 직접 조종하는 UI를 만들지 않는다.
- 콘텐츠는 Claude가 만든다 (2026-10-24 외주 중단). 데이터 형식은 각 data 파일 머리 주석과 `engine/validate.js` 규칙이 기준.
- 커마 값은 능력치 효과가 아니라 사건 · 반응 · 선택 · 묘사의 재료 (조건 키는 `engine/validate.js` REQ_K).
- 밸런스 수치는 `balance` 테이블(`BAL_*`, proto:true). 코드에 상수로 박지 않는다.
- 문서 최신 유지: 이 문서 · DECISIONS.md.

## 4. 작업 순서 (매 변경)
1. `node tools/validate_data.js`
2. `node tests/tools/t_fill.js` · `CHROMIUM=/opt/pw-browsers/chromium OUT=/tmp/claude-0 NODE_PATH=$(npm root -g) node tests/ui/run_all.js` (병렬: `ls tests/ui/t_*.js | xargs -P 6 …`)
3. 큰 변경이면 QA 봇: `DAYS=120 RUNS=3 node tools/qa_sim.js` (docs/QA.md)
4. 커밋 → push → PC 동기화(바탕화면 폴더) → 게임 페이지(아티팩트) 갱신

코드 메모 (옛 버전과 같음): 데이터 `def('테이블',[…])` → `DB.테이블[ID]` · 화면 `V.<screen>()` · 클릭은 data-* 위임(새 UI 는 data-k* 를 life_ui.js 가 따로 받는다) · 입력창은 부분 갱신 · 테스트는 `runTime`(동기) / `PLAY.stepSync`(동기) / `PLAY.step`(비동기, 워커).

## 5. 다음 할 일
**[ROADMAP.md](ROADMAP.md) 를 본다.** 요약: A 콘텐츠 1차(기초 DB — 이야기 문장 · 게이트/몬스터 · 장소 · 물건 · 이벤트 · 성좌 메시지/축복/NPC 성좌 · 인물/직업) → B 시스템 보강(옛 화면 정리 · 경제 · 현실 구매 사건 · 성좌의 지시 …) → C 큰 기능(자녀 · 범죄 · 각성 전 시작 — 사용자 '나중에') · D 품질 · 성능.

## 6. 알려진 문제 · 한계
- 옛 버전 테스트 다수는 `tests/ui/fixture.js`(옛 고정 게이트 · 이벤트를 새 ID 로 바꾼 테스트 전용 데이터)에 기대어 돈다.
- 자녀 · 범죄 · 각성 전 시작은 보류 (사용자 '나중에'). 잠재력 '전부 엿보기'는 만들어 두고 꺼 둠(`BAL_STAR.peekFull`), '대략 엿보기'만 켜짐.
- '같은 세계 새 인물'은 배경 인구(IndexedDB)를 옮기지 않고 메모리의 것을 이어 쓴다 — 새로 고침하면 같은 시드로 다시 만든다.

## 7. 지금 있는 것 (2026-10-24 기준 요약 — 자세한 지난 기록은 GitHub 커밋 기록)
- **새 게임 흐름:** 성좌 칸(3) → 성좌 인트로 → 정해진 성좌(비어 있음) / 나만의 성좌 → 헌터 인트로 → 커마(클래스 · 능력치 · 잠재력 무작위 + 다시 굴리기) → 시작 전 확인 → 플레이.
- **인생:** 실시간 재생 · 이야기 창 · 판단 엔진 · 감정 · 고비 회고 · 일대기(월별 원문 IndexedDB · 감정 그래프) · 노년 · 사망 · 은퇴 · 이어 가기 · 기록관.
- **세계:** 배경 인구 · 전국 게이트 규모 · NPC 자율 행동 · 활동 중인 사람 · 길드 · 경제 · 뉴스 · 소문.
- **전투:** 실시간 통계 시뮬(`COMBAT`) — 내 공략 · 상세 인물 공략, 배경은 성공률 표. 장비 성능이 능력치에 더해진다.
- **콘텐츠:** 클래스 100 · 스킬 280 · 전투 기술 157 · 장비 507 (생성기 `tools/content`) · 업적 30 · 선물 안배 18 · 기본 이야기 문장 · 이벤트 · 위기 · 몬스터 15 (B 데이터). 나머지는 채우기 도구로 (`fill/orders/` 주문서 15개 준비).
- **성좌:** 계정 · 코인 · 업적 · 해금 · 상점(매일 진열) · 성좌 경매장 · 선물(모를 땐 운 · 노력처럼) · 조언(신뢰) · 잠재력 대략 엿보기 · 메시지 · 축복 · NPC 성좌 · 정해진 성좌 구조.
- **화면:** 좌측 이야기 · 내 헌터(정보 · 상태창(기본 · 장비 · 클래스/스킬 · 특성) · 관계) · 성좌(내 정보 · 상점 · 경매장 · 업적) · DB(8탭) · 설정(헌터 사진 주문서 포함).
- **기반:** 색인 · 공통 꼬리표 · 빈칸 문장(`engine/content.js`) · IndexedDB 세이브 · 채우기 도구 · 콘텐츠 보고 · 속도 시험 · QA 봇 · 데이터 검사.
