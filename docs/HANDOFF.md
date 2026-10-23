# 인수인계 (K-Hunter-Life)

이 문서만 읽고 작업을 이어받을 수 있게 정리한다. 작업이 끝날 때마다 갱신한다. 사용자 결정은 [DECISIONS.md](DECISIONS.md), 콘텐츠 스타일은 [STYLE_CHECKLIST.md](STYLE_CHECKLIST.md), 경제 기준은 [ECONOMY.md](ECONOMY.md), QA 봇은 [QA.md](QA.md).

## 1. 한 줄
한국 헌터물 + 성좌물 **관찰형** 인생 시뮬레이션. 커마한 헌터의 인생이 하루 30초로 흘러가고, 플레이어는 그 헌터의 **성좌**로서 지켜보며 코인으로 선물한다. 직접 행동 · 공략 · 장비 착용 · 스탯 분배는 하지 않는다 (헌터가 성향대로 정한다). `game/index.html` 을 브라우저로 열면 동작한다 (빌드 없음).

- 게임 페이지(아티팩트): https://claude.ai/artifact/1KVipZo2SnDCQkUgtbLpri (옛 Hunter Life 페이지는 건드리지 않음)
- PC 폴더: `C:\Users\YON\Desktop\K-Hunter-Life` (로컬 폴더에는 `.git` 없음 — GitHub 와는 Claude 가 파일을 옮겨 맞춘다)
- 옛 버전: [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) — 보관본. 옛 저장과 호환하지 않는다.
- 2026-10-24 정리: 옛 직접 조작 화면 · 옛 외주 문서/데이터 · 끝난 계획 문서 · 한 번 쓴 도구를 지웠다 (GitHub 기록에 남아 있음).

## 2. 구조

### 화면 (2026-10-24)
- 좌측 메뉴(`renderNav`): **이야기**(인생 · 목표 설정 · 일대기) · **내 헌터**(정보 · 상태창 · 관계 · 소지품) · **성좌**(내 정보 · 상점 · 성좌 경매장 · 업적) · **DB**. 하위 탭은 `UI.homeTabs`. 인생 · 상태창 외 새 탭은 아직 빈 패널.
- 인생 탭: 원본 로그 + 작은 상태창(`statusWindowHTML(h,true,{fold:true})`, EXP 아래 접기 `UI.swOpen`) + 위젯(`G.prefs.play.homeWidgets`, `WIDGETS` 재사용). 상단에 코인(`#topCoin`) · 각성 경과.
- 내 헌터 › 상태창: `engine/hunter_status.js` (기본 상태 · 클래스/스킬 · 특성. 스탯 분배 없음).
- `engine/observe.js`: 직접 조작 링크 · 버튼을 지우고 클릭을 막는다. 사건 · 위기는 `engine/life_ui.js` 의 선택 팝업(d20).
- 옛 `V.*` 화면 중 아직 남은 것(소지품 · 상점 · 경매장 · 게이트 · 길드 · DB · 관계 · 정보 · 재정 · 뉴스 · 전국 현황 · 기록관 · 설정 · 공략 화면)은 검색 · 버튼 · 알림 링크로 열린다. 새 탭 UI를 만들 때 바꾼다.

```
game/index.html          엔진 · UI 본체
game/*.css               life · home · hunter_status · history · star
game/data/*.js           시스템 테이블 (능력치 · 행동 · 관계 · 세계 수치 · 커마 선택지 · 지역 · 지도 · 게이트 장소 · 아이템 · 성좌 · 장소 · 몬스터 형식)
game/data/system.js      판단 · 감정 · 고비 · 멈춤 · 국가 상태 · BAL_PLAY/MIND/TELLER/SMALL/EMO/SELF/SCALE/AGE
game/data/base/          Claude 최소 재료 (배치 B): b_hunters.js · b_content.js · b_story.js(이야기 문장 · 위기 · 이벤트 · 데모)
game/data/ext · packs    외주 데이터 자리 (지금 비어 있음 — `_list.js` · `_manifest.js` 에 파일 이름을 한 줄씩)
game/engine/             sim · goals · routine · autoraid · know · validate · status_ui (옛 버전에서) · scale · mind · story · play · life · life_ui · observe · hunter_status · history_ui · life_log · gear · star · monster · account(성좌 계정) · active(활동 중인 사람) · emo_graph
tools/                   validate_data.js · qa_sim.js · build_regions.py · build_maps.py · build_gate_pool.py
tests/ui/                Playwright 테스트 + fixture.js(테스트 전용 데이터)
```

### 시스템 → 구현 위치
| # | 시스템 | 어디 | 핵심 |
|---|---|---|---|
| 1 | 실시간 재생 | `engine/play.js` PLAY | 하루 30초(×1) · ×2 · ×5 · ×20 · 다음 사건까지. 틱마다 `runTime` 을 분 단위로 잘게, 자정 넘을 때 `SIM.ensure`(워커). 아침에 하루 계획(`ROUTINE.plan`) · 공략 판단(`MIND.wantRaid` → `pickGate` → `runRaid`) |
| 2 | 인생 화면 · 이야기 창 | `engine/story.js` STORY · `engine/life_ui.js` | 행동 · 이동 · 작은 일 · 만남 · 반응 · 공략 장면 · 세상 소식 · 하루 마무리 · 시작 전 인생. 상세도 3단계. 조사 자동(`STORY.josa`). 이야기 창은 붙이기만 |
| 3 | 판단 엔진 | `engine/mind.js` MIND | 태그(mindTags) × 재료(성격 · 감정 · 상태 · 자기 인식 · 방침) + 판정 확률 + 관계 · 기억 + 무작위(예측 가능성). 이벤트 · 위기 · 하루 공략 · 게이트 고르기. 이유 문장(mindWhy). 성격 변화(`drift`). NPC 점수(`npcScore`) |
| 4 | 세 층 원칙 | `engine/validate.js` assertErrs · `tools/validate_data.js` | `asserts` ⊆ `req` 강제, 단정 낱말 검사, 조건 키 looks · emo · self · adult · place |
| 5 | 이야기꾼 | `engine/mind.js` TELLER | 조용하면 확률 ↑, 몰리면 ↓ (이벤트 · 작은 일) |
| 6 | 멈춤 · 개입 | `engine/story.js` EVT · play.js | 안 멈춤 / 큰 갈림길만 / 사건마다 + 종류별. 자동 결정. 위기에서 멈추면 옛 공략 화면으로 넘김. 끼어들기 막대 · '다시 맡기기' |
| 7 | 고비 · 일대기 | `engine/life.js` LIFE | 상태 비교로 고비 감지 → 회고 카드 + 한 줄. 나이 · 은퇴 생각 · 노화. 끝나면 일대기 한 장(장 · 기록 · 사람 · 감정 흐름 · 성격 변화 · 노년 · 작별) |
| 8 | 이어 가기 | `engine/life.js` LEGACY | 같은 세계 새 인물(커마 → `adoptWorld`) · 플레이 중 인물 바꾸기(`switchTo`) · 기록관(`khl.archive.v1`, 시점 · 관계) · 파일 내보내기/가져오기 |
| 9 | 화면 | index.html `renderNav` · life_ui.js | 위 '화면' 참고 |
| 10 | 설정 묶음 | life_ui.js `V.settings` · `G.prefs.play` | 재생 · 멈춤 / 판단 · 방침 / 이야기 / 게임 설정 / 환경설정 / 헌터 관리 |
| + | 인구 · 게이트 규모 | `engine/scale.js` SCALE · sim.js popGen ver 3 | 각성 0.5% · 활동 0.2% · 전국 하루 약 5,470개. 내 주변 개별, 나머지 집계(`G.wagg`). 다른 헌터 공략 시각(`g.clr`) |
| + | 장비 · 아이템 틀 | `engine/gear.js` GEAR · data/items.js | 등급 6(일반~전설 + 숨은 신화, 보정 +1 · 2 · 4 · 7 · 11 · 16) · 칸 8(양손 · 한 벌 · 특수) · 개성(itemTraits) · 출처 13(itemSources) · 내구도 · 수리(헌터가 자동) · 마정석 80종(게이트 등급 × 품질). 착용은 헌터 판단 `GEAR.consider` (선물받을 때). 옛 칸 · rank 만 있는 장비는 `GEAR.normalize` 가 바꿈. 화면(상태창 › 장비)은 아직 |
| + | 성좌 | `engine/star.js` STAR · data/stars.js | 선물 `STAR.gift`(상점 · 경매 → 헌터 가방) · 성좌 경매장(코인, `G.auction.coin`) · NPC 성좌 `STAR.ofHunter` · 고유 클래스 `STAR.grantClass`(세계에 한 명, `G.uniqueHeld`) · 클래스북 `readBook` · 메시지 `STAR.say`(자리만). 내 성좌 설정 · 업적 · 성좌 화면은 커마 화면 작업 때 |

### 세이브 (`G`, localStorage `khl.saves.v1`, v:3)
새 필드: `story`(현재 달 원문 전체, 화면은 최근 300~500줄) · `storyArchive`(월별 묶음 목록/쓰기 대기 원문, 아래 최신 진행 참고) · `chron`(기존 하루 요약, 최대 4000개) · `emo`/`emoLog` · `persF`/`persBase`/`persLog` · `selfHeard` · `mindMem` · `teller` · `play`(오늘 공략 판단) · `milestones`/`retroQ`/`retroOpen` · `snaps`(rookie · prime · last) · `bioCard` · `oldAge` · `wagg` · `legacyOf`/`cast` · `prefs.play`.

## 3. 반드시 지킬 것
- 게임 안 AI(LLM) 금지. 모든 내용은 ID 기반 데이터 + 규칙.
- 관찰형: 플레이어(성좌)가 헌터를 직접 조종하는 UI를 만들지 않는다.
- 콘텐츠는 나중에 한꺼번에 외주. **외주 의뢰서 · 형식 문서는 사용자가 정할 때까지 만들지 않는다.** 데이터 형식은 각 data 파일 머리 주석과 `engine/validate.js` 규칙이 기준.
- 커마 값은 능력치 효과가 아니라 사건 · 반응 · 선택 · 묘사의 재료 (조건 키는 `engine/validate.js` REQ_K).
- 밸런스 수치는 `balance` 테이블(`BAL_*`, proto:true). 코드에 상수로 박지 않는다.
- 문서 최신 유지: 이 문서 · DECISIONS.md.

## 4. 작업 순서 (매 변경)
1. `node tools/validate_data.js`
2. `CHROMIUM=/opt/pw-browsers/chromium OUT=/tmp/claude-0 NODE_PATH=$(npm root -g) node tests/ui/run_all.js` (병렬: `ls tests/ui/t_*.js | xargs -P 6 …`)
3. 큰 변경이면 QA 봇: `DAYS=120 RUNS=3 node tools/qa_sim.js` (docs/QA.md)
4. 커밋 → push → PC 동기화(바탕화면 폴더) → 게임 페이지(아티팩트) 갱신

코드 메모 (옛 버전과 같음): 데이터 `def('테이블',[…])` → `DB.테이블[ID]` · 화면 `V.<screen>()` · 클릭은 data-* 위임(새 UI 는 data-k* 를 life_ui.js 가 따로 받는다) · 입력창은 부분 갱신 · 테스트는 `runTime`(동기) / `PLAY.stepSync`(동기) / `PLAY.step`(비동기, 워커).

## 5. 다음 할 일 (2026-10-24 사용자와 정한 순서)
2. **성좌 · 내 헌터 탭 UI (같이 정하며):** 성좌 탭(내 정보 · 상점 · 성좌 경매장 · 업적 — 잠재력 엿보기 화면 `STARACC.peek` 포함) · 업적 목록 · 내 헌터 탭(정보 · 관계 · 소지품) · 장비 화면. 게임 플레이 설정 화면은 시스템이 갖춰지면.
3. **기반 작업 (2번 뒤):** 업데이트 쉬운 구조(데이터 종류별 꼬리표 · 꼬리표에 거는 이벤트 · 빈칸 문장 · 커버리지/중복 보고 도구) · 대량 콘텐츠 대비(속도 시험 · 발동 시점별 색인 · 나눠 불러오기 · IndexedDB 세이브) · 남은 기초 형식(직업 · 생계, 인물 · 관계).
4. **맨 마지막 — 선택지 · 이벤트 · 콘텐츠:** 스탯 분배 묻기 · 현실 가게/경매 구매 사건 · 성좌 메시지 · 축복 · 고유 클래스/스킬 · 범죄 · 경제 손보기 · 망한 나라 세계사 · 외주 전체.
5. **업데이트 예정:** 자녀 (다음 인물로 이어 가기와 함께).

- 외주 의뢰서 · 형식 문서는 사용자가 정할 때까지 만들지 않는다.
- 스탯 포인트는 지금 임시 자동 분배(`autoStatAlloc`).

## 6. 알려진 문제 · 한계
- 옛 버전 테스트 다수는 `tests/ui/fixture.js`(옛 고정 게이트 · 이벤트를 새 ID 로 바꾼 테스트 전용 데이터)에 기대어 돈다.
- 자녀 · 범죄 · 잠재력 전체 보기는 보류 (사용자 '나중에').
- '같은 세계 새 인물'은 배경 인구(IndexedDB)를 옮기지 않고 메모리의 것을 이어 쓴다 — 새로 고침하면 같은 시드로 다시 만든다.

## 7. 진행 상황
- [완료] 2026-10-24 (Claude) 성좌 만들기 다듬기: 새 성좌 → 성좌 인트로(`data/stars.js` starIntroScenes, 그림 `assets/star_intro/SI_01~05.webp` — 아직 없음, GPT 외주) → '정해진 성좌로 깨어나기'(`starPresets`, 지금 비어 있음 — 탭만) / '나만의 성좌 빚기'(커마 기본 정보식 항목/선택지: 이름 · 성향 · 영역 · 색(팔레트) · 문양(직접 입력) · 말투(ccSpeech), 모두 무작위, 가운데 확인 창, 뒤로). 성좌 데이터는 색 #hex · 문양 글자로 저장. 이유 · 시작 코인 선택 · 헌터가 아는지 선택 · 프리셋 5개 삭제 — 코인 0, 헌터는 `G.starKnown`(하루 `BAL_STAR.revealPerDay` 확률로 알아챔). 정해진 성좌는 성향에 맞는 메시지만(`STAR.say`)
- [완료] 2026-10-24 (Claude) 새 게임 흐름 + 준비 묶음: ① 성좌 = 계정 = 세이브 칸 (`engine/account.js` STARACC, localStorage `khl.stars.v1`, 3칸 · 세이브 `star-<칸>` · 코인/업적/해금 유지 · 한 번 받은 업적은 다시 못 받음 · 성좌 하나에 헌터 한 명 · 수정 불가) ② 타이틀 '시작하기' → 성좌 고르기(이어 가기 · 새 헌터 · 지우기 · 데모) / 성좌 만들기(프리셋 5 · 이름 자동 생성 · 성향 · 이유 · 영역 · 색 · 문양 · 시작 코인 · 헌터가 아는지, 기본값 base:true) ③ 커마: 클래스 · 능력치(잠재력 포함)는 각성 결과 무작위 + 능력치 다시 굴리기(무제한), 업적 해금(pickClass · pickStats · pickPotential)이 있으면 옛 직접 고르기 ④ 마지막 단계 '시작 전 확인'에 성좌 카드 ⑤ 저장 메뉴 = 성좌 칸 하나 ⑥ 활동 중인 사람(`engine/active.js` ACTIVE: 등장 · 기억 · 관계로 올라옴, 60일 · 200명 · 관계자 보호, 가벼운 감정 `G.npcEmo`, MIND.factors 가 NPC 감정 · 부상 반영, 만남 가중치 · 먼저 연락 · 자동 공략 동행 판단) ⑦ 일대기 감정 그래프(`engine/emo_graph.js`, 월별/연도별, 감정마다 작은 선 그래프). 옛 slot1~3 · auto 세이브는 화면에서 안 보임. QA 365일: 하루 평균 208ms · 세이브 657KB
- [완료] 2026-10-24 (Claude) 정리: 옛 직접 조작 화면(행동 · 파티 · 공략대 · 공략 준비 · 일정 · 알림 · 메신저 · 대시보드 · 개발 도구)과 그 처리 코드 · 위젯 배치 편집 · `OBSERVE.legacy` · `doNowDirect` 삭제, 옛 테스트 29개 삭제, 외주 문서 전부 · 끝난 계획 문서(REBUILD_PLAN · CODEX 인계 · CC_IMPACT · DATA_IDS · NPC_SIM) · 한 번 쓴 도구 · 옛 외주 커마 데이터(lookOpts_LA/LB · bgOpts_BB) 삭제
- [완료] 2026-10-24 (Claude) 게이트 · 몬스터 형식: 몬스터 등급 범위(`ranks`) · 크기 · 꼬리표 · 약점/저항 · 지형 · 보스 · 소재 부위 표(비어 있음), 게이트 = 잡몹 1~3 + 보스(`engine/monster.js` MONSTER.compose, `g.mobs` · `g.boss`), 특별한 게이트 분류 `gateKinds`(브레이크만, 넘치면 `g.kind`). (형식 문서는 정리 때 삭제 — data/content.js 주석이 기준)
- [완료] 2026-10-24 (Claude) 장소 외주 준비: `placeTypes` 추가 필드(group · where · sources · desc) · 새 테이블 `placeTags` · `places`(이름 있는 개별 장소, 지금은 데이터만) · 검사 규칙. (형식 문서는 정리 때 삭제 — data/places.js 주석이 기준)
- [완료] 2026-10-24 (Claude) 스탯 임시 자동 분배(`autoStatAlloc`, 이야기 창 한 줄) · 소식 줄 `{p}` 치환 고침(`OBSERVE.notices` 가 `STORY.fill`)
- [완료] 2026-10-24 (Claude) 메뉴 · 상태창 정리: 좌측 메뉴 순서(DB 맨 아래) · '성좌' 묶음(내 정보 · 상점 · 성좌 경매장 · 업적 — 빈 탭), 스탯 분배 화면 없앰(`OBSERVE` 차단 'statpt', 상태창 분배 칸 삭제 — 포인트는 쌓이고 헌터 판단 분배는 나중), 인생 탭 상태창 EXP 아래 접기(`UI.swOpen`), 코인은 상단 `#topCoin`
- [완료] 2026-10-24 (Claude) 성좌 · 아이템 틀 (사용자와 목록 합의, UI는 꼭 필요한 곳만): 아이템 등급 · 칸 · 개성 · 출처 · 내구도 · 마정석 체계, 스탯 착용 조건 없앰, 착용은 헌터 판단(화면의 착용 버튼 없앰 — `OBSERVE` 차단 목록 'equip'), 상점 = 성좌가 사서 선물(판매 탭 · 소지품의 '시스템 상점에 팔기' 없앰), 원화 경매장 → 성좌 경매장(코인, 내 출품 없앰), NPC 성좌 · 고유 클래스(선천 각성 제외 · 한 명만 · 원래 클래스 바뀜) · 클래스북 틀, 좌측 '내 정보' → '정보'. 견본 데이터는 넣지 않음(표만). 장비 화면 이미지 의뢰서 `docs/outsource/gear_view_image_prompt.md`. 남은 것: 내 성좌 설정 · 시작 코인 · 고유 클래스로 시작(커마 화면) · 업적 · 성좌 화면 — 사용자와 상의하며
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
