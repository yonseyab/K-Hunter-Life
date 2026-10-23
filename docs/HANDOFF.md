# 인수인계 (K-Hunter-Life)

이 문서만 읽고 작업을 이어받을 수 있게 정리한다. 작업이 끝날 때마다 갱신한다. 사용자 결정은 [DECISIONS.md](DECISIONS.md), 설계 원안은 [REBUILD_PLAN.md](REBUILD_PLAN.md), 콘텐츠 스타일은 [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md).

## 1. 한 줄
커마한 헌터의 인생이 하루 30초로 흘러가고, 플레이어는 지켜보다가 원할 때 끼어드는 한국 헌터물 인생 시뮬레이션 (『80억분의 1』의 디테일한 버전). `game/index.html` 을 브라우저로 열면 동작한다 (빌드 없음).

- 게임 페이지(아티팩트): (아래 7장 진행 상황에 처음 만든 URL)
- 옛 버전: [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) — 보관본. 옛 저장과 호환하지 않는다.

## 2. 구조

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
tests/ui/                Playwright 테스트 62개 + fixture.js(테스트 전용 데이터)
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
새 필드: `story`(이야기 창 900줄) · `chron`(하루 요약, 일대기) · `emo`/`emoLog` · `persF`/`persBase`/`persLog` · `selfHeard` · `mindMem` · `teller` · `play`(오늘 공략 판단) · `milestones`/`retroQ`/`retroOpen` · `snaps`(rookie · prime · last) · `bioCard` · `oldAge` · `wagg` · `legacyOf`/`cast` · `prefs.play`.

## 3. 반드시 지킬 것
- 게임 안 AI(LLM) 금지. 모든 내용은 ID 기반 데이터 + 규칙.
- 콘텐츠는 Codex 외주. Claude 는 최소 재료만 (배치 B). **의뢰서는 사용자와 상의한 뒤** — 기술 부분은 [outsource/00_기술_형식.md](outsource/00_기술_형식.md).
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
- [완료] 2026-10-23 새 버전 한 번에 만들기 (REBUILD_PLAN 6장 1~8): 옛 엔진 · 세계 · 커마 이식, 콘텐츠 비우기 + 최소 재료(배치 B), 새 시스템 10개 + 인구 · 게이트 규모, 테스트 62개 통과, QA 봇.
