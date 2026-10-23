# 인수인계 (K-Hunter-Life)

> **최신 상태 요약: [Codex → Claude 작업 인계 · 2026-10-23](CODEX_TO_CLAUDE_2026-10-23.md).** 충돌 시 최신 인계/최신 사용자 결정을 우선한다. 로컬 경로는 `C:\Users\YON\Desktop\K-Hunter-Life`. GPT 로컬 수정본은 2026-10-23 Claude가 GitHub(main) · 게임 페이지 · PC 폴더에 모두 맞춰 반영했다 (아래 7장).

이 문서만 읽고 작업을 이어받을 수 있게 정리한다. 작업이 끝날 때마다 갱신한다. 사용자 결정은 [DECISIONS.md](DECISIONS.md), 설계 원안은 [REBUILD_PLAN.md](REBUILD_PLAN.md), 콘텐츠 스타일은 [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md).

## 1. 한 줄
**최신 방향 변경 (2026-10-23, 반영):** 시뮬레이션 중심으로 방향 · 목표 · 중요 선택 · 구매 · 장비 관리만 직접 정한다. `engine/observe.js`가 기존 화면 링크 · 직접 행동 버튼을 정리하고 클릭 실행도 차단한다. `doNow`는 실행하지 않으며 `startRaid`는 자동 공략 내부에서만 호출한다. 인생 화면의 일정 편집 · 직접 공략 · 다시 맡기기를 제거했다. '방향 · 목표'에서 생활 방향을 선택하면 GOALS → ROUTINE → SIM 자동 일정에 반영한다. 소식과 대화는 이야기 창, 사건 · 길드 계약 · 공략 위기는 선택 카드로 전달한다. 공략 위기 대기 상태는 `G.play.pendingRaid`에 저장해 이어 갈 수 있다. 기존 수동 일정 저장은 자동 모드로 전환한다. 아래의 옛 직접 플레이 설명보다 DECISIONS.md의 최신 결정이 우선한다.

커마한 헌터의 인생이 하루 30초로 흘러가고, 플레이어는 지켜보다가 원할 때 끼어드는 한국 헌터물 인생 시뮬레이션 (『80억분의 1』의 디테일한 버전). `game/index.html` 을 브라우저로 열면 동작한다 (빌드 없음).

- 게임 페이지(아티팩트): https://claude.ai/artifact/1KVipZo2SnDCQkUgtbLpri (새 페이지. 옛 Hunter Life 페이지는 건드리지 않음)
- PC 폴더: `C:\Users\YON\Desktop\K-Hunter-Life` (로컬 폴더에는 `.git` 없음 — GitHub 와는 Claude 가 파일을 옮겨 맞춘다)
- 옛 버전: [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) — 보관본. 옛 저장과 호환하지 않는다.

## 2. 구조

### 최신 홈 UI (2026-10-23, 실제 게임 반영)
- **거래 추가:** 좌측 거래 아래 시스템 상점/경매장/기타. `V.homeTrade`와 `UI.homeTabs.trade`로 사이드바/내부 탭 선택을 연동한다. 내용은 빈 패널이며 기존 V.shop · V.auction은 유지한다.
- **좌측 하위 메뉴 추가:** 이야기 아래 인생/목표 설정/일대기, 내 헌터 아래 내 정보/상태창/관계/소지품을 표시한다. 사이드바 선택과 화면 내부 탭이 연동된다. DB 하위 탭은 화면 안에만 유지한다. 아래의 '하위 탭은 사이드바에 표시하지 않음'보다 이 변경이 우선한다.
- **최신 변경:** 16:9에서 중앙 620px 제한을 제거해 상태창 · 인생 기록을 넓혔다. 좌측은 이야기 · 내 헌터 · DB만 표시하고, 하위 탭은 화면 안에서 바꾼다. 이야기(인생/목표 설정/일대기), 내 헌터(내 정보/상태창/관계/소지품), DB(인물/게이트/몬스터/장비/장소/기타/클래스/스킬). 인생 외 새 탭에는 내용 UI를 만들지 않았다. 기존 V.* 기능은 유지한다. 탭 선택은 UI.homeTabs에만 기록한다. 아래의 '인생만 표시' 설명보다 이 변경이 우선한다.
- 로그 시각은 고정 42px 칸 대신 글자 너비 + 6px 간격으로 표시한다. 새로운 타임라인 · 대화 카드 등으로 원본 로그를 바꾸지 않는다.
- `game/home.css`: 기존 스타일 뒤에 불러오는 인생 홈 레이아웃. 사각형 · 같은 폰트 · 일정한 상단 높이, 작은 상태창 위/원본 로그 아래/위젯 오른쪽. 모바일은 세로로 쌓인다.
- `statusWindowHTML(h, true)`가 원래 상태창 항목을 작은 홈 상태창으로 표시한다. 위치는 상태창 우측 하단이며 현재 행동 설명 줄은 없다. 재생 중 수치와 위치를 부분 갱신한다.
- 좌측 메뉴는 `renderNav`에서 인생만 그린다. `NAV`의 전체 화면 목록과 `V.*` 구현은 유지하며 검색 · 버튼 · 위젯에서 이용할 수 있다.
- 위젯 구성 · 순서는 `G.prefs.play.homeWidgets`에 저장한다. 기존 WIDGETS의 자금 · 컨디션 · 가까운 사람 · 목표 · 뉴스를 재사용한다. 구성 버튼은 박스 밖 위쪽, 첫 위젯 상단 · 높이는 상태창과 맞춘다.
- 홈 회귀 검사는 `tests/ui/t_home.js`. 위치 · 실시간 갱신 · 로그 DOM 유지 · 메뉴 하나 · 내부 화면 보존 · 위젯 저장 왕복 · 320px까지 검사한다.

```
game/index.html          엔진 · UI 본체 (옛 prototype/index.html 을 tools/patch_index.py 로 고침)
game/life.css            인생 화면 · 재생 막대 · 일대기 스타일
game/data/*.js           시스템 테이블 (옛 버전에서 옮김: 능력치 · 행동 · 관계 · 세계 수치 · 커마 선택지 · 지역 · 지도 · 게이트 장소 20만)
game/data/system.js      새 시스템 테이블: 의미 태그 · 이유 조각 · 감정 · 고비 · 멈춤 종류 · 국가 상태 · BAL_PLAY/MIND/TELLER/SMALL/EMO/SELF/SCALE/AGE
game/data/base/          Claude 최소 재료 (배치 B): b_hunters.js(자동 생성) · b_content.js · b_story.js(이야기 문장 · 위기 · 이벤트 · 데모)
game/data/ext · packs    외주 데이터 자리 (지금 ext 에는 옛 커마 선택지 LA · LB · BB · PB 만)
game/engine/             sim.js(NPC · 배경 인구 · 워커) · goals · routine · autoraid · know · validate · status_ui (옛 버전)
                         scale.js · mind.js · story.js · play.js · life.js · life_ui.js (새 버전)
tools/                   validate_data.js · gen_id_reference.js · qa_sim.js · gen_base_hunters.js · build_*.py · patch_index.py(기록용)
tests/ui/                Playwright 테스트 71개 + fixture.js(테스트 전용 데이터). 옛 직접 조작 화면을 쓰는 테스트는 `OBSERVE.legacy=true`(검사용 스위치)로 연다
```

### 새 시스템 (REBUILD_PLAN 4장 → 구현 위치)
| # | 시스템 | 어디 | 핵심 |
|---|---|---|---|
| 1 | 실시간 재생 | `engine/play.js` PLAY | 하루 30초(×1) · ×2 · ×5 · ×20 · 다음 사건까지. 틱마다 `runTime` 을 분 단위로 잘게, 자정 넘을 때 `SIM.ensure`(워커). 아침에 하루 계획(`ROUTINE.plan`) · 공략 판단(`MIND.wantRaid` → `pickGate` → `runRaid`) |
| 2 | 인생 화면 · 이야기 창 | `engine/story.js` STORY · `engine/life_ui.js` | 행동 · 이동 · 작은 일 · 만남 · 반응 · 공략 장면 · 세상 소식 · 하루 마무리 · 시작 전 인생. 상세도 3단계. 조사 자동(`STORY.josa`). 이야기 창은 붙이기만 |
| 3 | 판단 엔진 | `engine/mind.js` MIND | 태그(mindTags) × 재료(성격 · 감정 · 상태 · 자기 인식 · 방침) + 판정 확률 + 관계 · 기억 + 무작위(예측 가능성). 이벤트 · 위기 · 하루 공략 · 게이트 고르기. 이유 문장(mindWhy). 성격 변화(`drift`). NPC 점수(`npcScore`) |
| 4 | 세 층 원칙 | `engine/validate.js` assertErrs · `tools/validate_data.js` · `docs/CC_IMPACT.md` | `asserts` ⊆ `req` 강제, 단정 낱말 검사, 조건 키 looks · emo · self · adult · place |
| 5 | 이야기꾼 | `engine/mind.js` TELLER | 조용하면 확률 ↑, 몰리면 ↓ (이벤트 · 작은 일) |
| 6 | 멈춤 · 개입 | `engine/story.js` EVT · play.js | 안 멈춤 / 큰 갈림길만 / 사건마다 + 종류별. 자동 결정. 위기에서 멈추면 옛 공략 화면으로 넘김. 끼어들기 막대 · '다시 맡기기' |
| 7 | 고비 · 일대기 | `engine/life.js` LIFE | 상태 비교로 고비 감지 → 회고 카드 + 한 줄. 나이 · 은퇴 생각 · 노화. 끝나면 일대기 한 장(장 · 기록 · 사람 · 감정 흐름 · 성격 변화 · 노년 · 작별) |
| 8 | 이어 가기 | `engine/life.js` LEGACY | 같은 세계 새 인물(커마 → `adoptWorld`) · 플레이 중 인물 바꾸기(`switchTo`) · 기록관(`khl.archive.v1`, 시점 · 관계) · 파일 내보내기/가져오기 |
| 9 | 화면 정리 | index.html NAV · life_ui.js | 메뉴 네 묶음, 첫 화면 = 인생, 옛 홈 = 대시보드, 전국 현황 · 일대기 · 기록관 화면 |
| 10 | 설정 묶음 | life_ui.js `V.settings` · `G.prefs.play` | 재생 · 멈춤 / 판단 · 방침 / 이야기 / 게임 설정 / 환경설정 / 헌터 관리 |
| + | 인구 · 게이트 규모 | `engine/scale.js` SCALE · sim.js popGen ver 3 | 각성 0.5% · 활동 0.2% · 전국 하루 약 5,470개. 내 주변 개별, 나머지 집계(`G.wagg`). 다른 헌터 공략 시각(`g.clr`) |

### 세이브 (`G`, localStorage `khl.saves.v1`, v:3)
새 필드: `story`(현재 달 원문 전체, 화면은 최근 300~500줄) · `storyArchive`(월별 묶음 목록/쓰기 대기 원문, 아래 최신 진행 참고) · `chron`(기존 하루 요약, 최대 4000개) · `emo`/`emoLog` · `persF`/`persBase`/`persLog` · `selfHeard` · `mindMem` · `teller` · `play`(오늘 공략 판단) · `milestones`/`retroQ`/`retroOpen` · `snaps`(rookie · prime · last) · `bioCard` · `oldAge` · `wagg` · `legacyOf`/`cast` · `prefs.play`.

## 3. 반드시 지킬 것
- 게임 안 AI(LLM) 금지. 모든 내용은 ID 기반 데이터 + 규칙.
- 콘텐츠는 Codex 외주. Claude 는 최소 재료만 (배치 B). **의뢰서는 사용자와 상의한 뒤** — 기술 부분은 [outsource/00_기술_형식.md](outsource/00_기술_형식.md).
- 아이템 **체계 설계** 의뢰서: [outsource/02a_아이템_체계_의뢰.md](outsource/02a_아이템_체계_의뢰.md) (2026-10-23, 사용자 요청). 결과물은 `docs/design/ITEM_SYSTEM_PROPOSAL.md` 로 받고, 그 뒤 아이템 데이터 의뢰(02)를 고친다.
- 커마 값은 능력치 효과가 아니라 사건 · 반응 · 선택 · 묘사의 재료 ([CC_IMPACT.md](CC_IMPACT.md)).
- 밸런스 수치는 `balance` 테이블(`BAL_*`, proto:true). 코드에 상수로 박지 않는다.
- 문서 최신 유지: 이 문서 · DECISIONS.md.

## 4. 작업 순서 (매 변경)
1. `node tools/validate_data.js`
2. `CHROMIUM=/opt/pw-browsers/chromium OUT=/tmp/claude-0 NODE_PATH=$(npm root -g) node tests/ui/run_all.js` (62개, 순서대로 약 25분. 병렬: `ls tests/ui/t_*.js | xargs -P 6 …`)
3. 큰 변경이면 QA 봇: `DAYS=120 RUNS=3 node tools/qa_sim.js` (docs/QA.md)
4. 커밋 → push → PC 동기화(바탕화면 폴더) → 게임 페이지(아티팩트) 갱신

코드 메모 (옛 버전과 같음): 데이터 `def('테이블',[…])` → `DB.테이블[ID]` · 화면 `V.<screen>()` · 클릭은 data-* 위임(새 UI 는 data-k* 를 life_ui.js 가 따로 받는다) · 입력창은 부분 갱신 · 테스트는 `runTime`(동기) / `PLAY.stepSync`(동기) / `PLAY.step`(비동기, 워커).

## 5. 다음 할 일
사용자와 먼저 상의할 것
- **Codex 의뢰서** (스타일 확정됨). 묶음 · 분량 · 순서 · 배치 코드. 이야기 문장(storyLines)이 가장 급하다 (행동마다 5~10변형, 작은 일 · 만남 · 반응 · 공략 장면 · 감정 · 회고 · 노년).
- 망한 나라 · 대륙 세계사 (Codex 세계관 문서) → `ccNations.state` · 뉴스.
- 화면 배치 · 메뉴 (사용자: "일단 해 보는 걸로") — 써 보고 고칠 점.
- 경제: 새 헌터가 두 달이면 돈이 바닥나는 경우가 있다 (QA). 생계형 현실감으로 둘지, 시작 자금 · 하위 등급 수입을 올릴지.

물어보지 않고 해도 되는 것
- 이야기 문장이 많아지면 상세도별 빈도 · 반복 방지 조정.
- 감정 그래프를 SVG 선 그래프로 (지금은 띠).
- NPC 판단에 MIND 를 더 넓게 (지금은 초대 · 위기 · 점수 함수까지, SIM 배경 인구는 옛 효용 엔진).
- 세이브 1년 이상: IndexedDB 로 옮기는 것 검토 (QA 결과 참고).

## 6. 알려진 문제 · 한계
- 옛 버전 테스트 다수는 `tests/ui/fixture.js`(옛 고정 게이트 · 이벤트를 새 ID 로 바꾼 테스트 전용 데이터)에 기대어 돈다.
- 자녀 · 범죄 · 잠재력 전체 보기는 보류 (사용자 '나중에').
- '같은 세계 새 인물'은 배경 인구(IndexedDB)를 옮기지 않고 메모리의 것을 이어 쓴다 — 새로 고침하면 같은 시드로 다시 만든다.

## 7. 진행 상황
- [완료] 2026-10-23 (Claude) GPT 수정본에 맞추기 + 주사위: ① PC 로컬 수정본을 GitHub main 에 그대로 반영 ② `OBSERVE.legacy`(검사용) — 켜면 옛 직접 조작 화면 · `doNowDirect` · 수동 `startRaid` · 팝업 생략. 게임에서는 꺼져 있다 ③ 옛 UI 테스트 28개를 새 화면에 맞춤(좌측 메뉴 · 상단 도구 · 위치 메뉴 · 알림 배지 대신 함수 호출, 일과 제목 '방향 · 목표') ④ 판정 주사위 새로 그림: 정이십면체 모양(SVG), 굴리는 동안 숫자가 점점 느려지며 멈추고 착지 · 결과 색(성공 초록 · 실패 빨강 · 20 금색 · 1 어두운 빨강), 아래에 능력치 + d20 + 보정 = 합계 칸과 난이도 눈금 막대가 차오른다. 장식 숫자는 정해진 순서(난수 안 씀), 움직임 줄이기 설정이면 바로 결과. 위치 `engine/life_ui.js` performChoice · `home.css` d20-* ⑤ 테스트 71개 · 데이터 검사 통과
- [완료] 2026-10-23 사용자 정정 반영: 성격 요약명 바로 아래 짧은 설명 한 문단을 복원했다. persRoles/persStyles의 desc를 조합하며 긴 세부 목록은 복원하지 않았다. 256개 이름과 게임 판단 수치는 유지한다. 의상 스타일은 기본 10개+확장 50개 전부 짧고 일관된 취향 문구로 바꿨다(캐주얼한 옷차림 선호 / 몸의 선이 드러나는 옷 선호). 기존 ID/desc/검색/자동 줄바꿈 유지. t_personality_names/t_creation_text/t_ccbasic 및 데이터/asserts 통과. 아래 이전 요약명 전용/의상 단어화 기록은 이 정정으로 대체한다.
- [완료] 2026-10-23 성격 요약 정정: 오른쪽/최종 확인의 요약은 표제와 짧은 이름만 표시한다. index.html의 상세 요약 생성/외주 문장 병합/CSS를 제거하고 personality.js의 strong/mid/view/stress/hunter/balanced 및 원본 세부 설명 테이블을 삭제했다. 확장 `ext/pers_PB.js`와 로드 목록 항목도 삭제했다. `persRoles`/`persStyles` 각 16행의 axes/poles 규칙으로 8개 축을 모두 반영하는 256가지 짧은 요약명을 생성한다. 미정/중간 축이 많으면 기존 극성 adj/noun으로 주요 성향만 반영한다. 단계별 levels 예시와 MIND의 수치 판단은 유지한다. t_personality_names는 256개 고유명, 모든 축 영향, 난수/수치 변경 없음, 상세 원본 부재, 슬라이더 노드 보존/실시간 갱신, 확인 화면과 모바일을 검증한다. t_ccbasic/t_mind 및 데이터/asserts도 통과했다.
- [완료] 2026-10-23 커마 의상 이름/긴 선택지: `data/ext/lookOpts_LA.js`/`lookOpts_LB.js`의 SC_OUTFIT 50개 name을 짧은 스타일명으로 바꾸고 원래 문장을 desc로 보존했다. ID/그룹/저장값은 그대로다. `chTilesHTML`은 이름과 desc를 검색하고 툴팁에 설명을 표시한다. 공통 CH 선택지의 `.choice-label`, 왼쪽 선택값/상단 현재값에서 말줄임을 제거하고 줄바꿈/높이 자동 조정을 적용했다. 문장형 의상 전용 240px 레이아웃은 제거했으며 공통 text 선택지는 반응형 180px 기준이다. `t_creation_text`는 기본/외형/배경의 모든 선택 카테고리와 남녀, 320/400/768/1366px에서 실제 글씨 잘림/가로 넘침을 검사한다. t_ccbasic 및 데이터/asserts 검사 통과, ID 참조 재생성.
- [완료] 2026-10-23 월별 인생 원문/일대기: `engine/life_log.js`를 STORY 앞에 로드한다. 지난달 원문은 IndexedDB `khl-life-log`의 `months` 스토어에 UUID 키의 불변 묶음으로 기록한다. `G.storyArchive={v,months,pending}`의 월별 count/kinds/keys만 세이브에 남으며 IDB 완료 전 원문은 pending에도 유지한다. 과거 세이브의 키 목록이 미래 묶음을 참조하지 않으므로 분기/되돌리기 기록이 섞이지 않는다. 기록 DB는 저장 슬롯 삭제 시 자동 삭제하지 않는다. 기존 남은 900줄도 로드 시 월별 이관하지만 이미 잘린 기록은 복구할 수 없다. 월말 하루 마무리용 직전 날짜 기록은 메모리 캐시로 보존한다.
- [완료] `engine/history_ui.js`/`history.css`: 이야기 → 일대기에 기록 기간/건수와 지난 일생 돌아보기 버튼을 구현했다. 현재 달만 인생 창에 표시하며 이번 달 전체 보기로 화면 밖 원문도 읽는다. 팝업은 연/월/날짜/종류, 전체 기간 검색, 검색 결과에서 해당 하루로 이동, 최근 기록, 이전/다음 페이지를 제공한다. 월별 읽기+최대 3개월 캐시, 100건 단위 DOM, 취소 가능한 순차 월 검색으로 100년 이상 대응한다. 사망/은퇴 화면에서도 열 수 있다. 원문은 현재 브라우저 IDB에 보관되며 기존 헌터 JSON 내보내기는 이 DB를 포함하지 않는다. 기존 chron 요약 4000개 제한과 별개로 원문은 월별 보관에 남는다. 1201개월/실제 새로고침/저장 실패 복구 테스트와 실제 시뮬레이션 120일 QA 통과.
- [완료] 2026-10-23 우측 상태창/상세 탭/인물별 선택 설정: 인생 중앙에서 `#lifeSide`를 빼서 `.life-widgets` 맨 위로 이동, 좁은 패널은 스탯/정보를 2열로 표시한다. 내 헌터 상태창 내부 `기본 상태 / 클래스 · 스킬 / 특성` 탭과 키보드 전환을 추가했으며 클래스 → 스킬 세로 배치다. 검색 왼쪽 각성 경과는 실시간 날짜 갱신과 UTC 기념일 계산을 사용한다. 새 커마 인물은 `awakenedDate`, 같은 세계 새 인물은 이어받은 날짜를 기록한다. 기존 YYYY-MM만 있는 각성 기록은 월 1일 기준이고 툴팁에 명시한다. `G.player.choicePrefs={skipDice,delegate}`를 주사위 팝업 체크박스와 설정 → 재생·멈춤에서 바꾸며 체크 시 autoSave 규칙을 따른다. 이번 굴림만 스킵은 저장하지 않는다. 항상 맡기면 EVT/MIND/AUTORAID가 사건·위기·계약을 결정하고 회고 대기는 생략한다. 기존 인물에게 돌아오면 그 인물 설정을 복원하며 새 인물은 기본값이다. t_choice_prefs 및 관련 UI 회귀 통과.
- [완료] 2026-10-23 날짜/게이트 상태/선택 모달: 홈 자금 내역에 기존 ledger 날짜를 10px로 표시한다(과거 시간은 추정하지 않음). index.html의 별도 `.gbanner` 출력을 제거하고 공유 상태창의 `.in-gate` 색/제목만 전환해 레이아웃을 고정했다. `life_ui.js`의 `#lifePend`를 제거하고 문서 흐름 밖의 native `dialog#lifeEventModal`에 직접 선택할 사건·위기·계약·회고를 표시한다. 팝업 동안 재생을 멈추며 ESC로 필수 선택을 건너뛰지 않는다. judge/EVT.resolve/PLAY.chooseCrisis의 실제 판정 메타데이터로 애니메이션을 표시하고, 장식 숫자는 난수를 소비하지 않는다. 계약 협상은 기존 수식의 `replyGuildOffer`를 공용화했다. 무판정은 즉시 처리하고 새 게임/타이틀에서 모달 상태를 정리한다. 저장된 선택은 불러올 때 다시 표시된다. `t_event_popup` 추가, 관련 회귀 통과.
- [완료] 2026-10-23 상태 요약/홈 위젯 수정: 공유 상태창에 스킬·특성 이름을 텍스트로 노출(클래스는 기존 텍스트), 클래스·스킬 이동 버튼 제거. 고비 회고는 한 줄 입력 없이 계속 버튼만 표시한다. 홈 자금은 최근 입출금 3건과 +/- 부호를 노출하며 고정 최소 높이를 제거했다. 즐겨찾기한 인물은 구성에서 아는 인물 최대 10명을 선택/해제하며 `prefs.play.homePeople`에 저장한다. 선택 인물은 관계 자동 정리에서 보호하고, SIM.gc는 기존 G 참조 스캔으로 보존한다. 내 헌터의 상태창 상세 표도 유지한다. `t_home_widgets` 신규 회귀 검사 추가.
- [완료] 2026-10-23 내 헌터 → 상태창: `engine/hunter_status.js` · `hunter_status.css` 추가. 공유 상태창 아래에 분배안/실제 HP·MP 예상 변화, 스킬·클래스·특성을 촘촘한 사각형 표로 표시한다. 분배안은 UI 메모리에만 두고 적용 시 재검증 후 실제 스탯·포인트에 한 번 반영하며 자동 저장 설정을 따른다. 저장/불러오기 · 인물 변경 · 기반 스탯 변경 시 미확정 분배안을 초기화한다. 세부 능력은 새 화면에서 제외(엔진 삭제는 미실시), 부상·상태 이상은 기존 기능 유지. 다른 빈 탭은 그대로다. t_hunter_status · t_home 및 기존 관련 회귀 검사 결과는 QA.md 참고.
- [완료] 2026-10-23 실제 홈 UI 적용: 샘플에서 합의한 작은 사각형 상태창과 위젯 · 세로 인생 로그. 위치는 상태창 우측 하단, 별도 행동 설명 제거, 상단 정렬 · 폰트 통일, 좌측 인생만 표시(내부 기능 유지). t_home · t_observe · t_play · t_status · t_legacy 및 데이터/조건 검사 통과.
- [완료] 2026-10-23 시뮬레이션 중심 전환: observe.js 공통 UI 정책, 방향 · 목표, 사건 · 계약 · 공략 위기 카드, 이야기 창 소식 전달, 위기 대기 저장 복원. 새 회귀 테스트 t_observe 및 주요 기존 테스트 통과. QA 새 헌터 120일 × 3 · 데모 60일 × 2: 문제 0, 저장 왕복 정상. 옛 수동 조작을 전제로 한 전체 UI 테스트는 이번 검증 대상이 아니다.
- [완료] 2026-10-23 새 버전 한 번에 만들기 (REBUILD_PLAN 6장 1~8): 옛 엔진 · 세계 · 커마 이식, 콘텐츠 비우기 + 최소 재료(배치 B), 새 시스템 10개 + 인구 · 게이트 규모, 테스트 62개 통과, QA 봇.
