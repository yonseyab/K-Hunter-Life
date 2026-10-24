# 콘텐츠 채우기 도구 (tools/fill) — 2026-10-24

**주문서 → 빈칸에 글만 채우기 → 검사 → 게임에 반영.** 채우는 쪽(사람이든 어떤 AI든)은 주문서 파일 하나만 보면 된다.
기준(세계관 · 스타일 · 칸 설명 · 쓸 수 있는 값 · 이미 있는 것)은 도구가 주문서에 다 적어 준다. 매번 설명할 필요가 없다.

## 한눈에

```
node tools/fill/fill.js list                     # 채울 수 있는 종류와 지금 개수
node tools/fill/fill.js order story --n 40       # 주문서 → fill/orders/story-<날짜>.md
   (이 파일을 사람 · AI에게 그대로 준다. '## 답' 아래 빈칸만 채워 돌려받는다)
node tools/fill/fill.js check 받은파일.md         # 검사만 — 게임은 안 바뀜
node tools/fill/fill.js apply 받은파일.md         # 통과한 것만 게임에 넣는다
node tools/fill/fill.js batches                  # 넣은 묶음 목록
node tools/fill/fill.js undo 3                   # 3번 묶음을 게임에서 뺀다
```
윈도우 PC(Node.js 설치)에서는 저장소 폴더에서 `fill list` · `fill order story` 처럼 `fill.cmd` 로 줄여 쓸 수 있다.
Node 가 없으면: 주문서(`fill/orders/`)를 AI 에게 주고, 돌려받은 답 파일을 Claude 에게 주면 Claude 가 check · apply 한다.

## 종류

| 종류 | 넣는 곳 | 채우는 것 | 도구가 미리 정해 주는 것 |
|---|---|---|---|
| story | storyLines | 이야기 창 한 줄 | 언제 나오는지(on) · 상세도 — 비어 있는 순간부터 |
| hear | hearTexts | "~했다고 한다" 들은 소식 | 무슨 일(on) |
| rumor | rumorPool | 소문 한 줄 | — |
| news | newsPool | 뉴스 제목 | 분류 |
| career | careerMsgs | 일반인 지인의 근황 메시지 | 무슨 근황 |
| starmsg | starMessages | 성좌의 한마디 | 언제 · 성좌 성향 · 헌터가 알 때만 |
| giftcover | giftCovers | 선물을 운 · 노력으로 얻은 것처럼 | 운/노력 · 게이트 안/밖 · 물건 갈래 |
| bits | textBits | 빈칸 문장 재료 `{@key}` | key |
| crisis | crises | 공략 위기 장면 · 선택지 · 결과 문장 | 언제 · 선택 성향 · 판정 · 효과 |
| event | events | 연락/알림 · 선택지 · 결과 문장 | 사건 종류 · 보낸 사람 · 조건 · 판단 꼬리표 · 효과 |
| monster | monsters | 이름 · 도감 설명 · 등장 문장 | 계열 · 등급 범위 · 역할 · 크기 · 보스 |
| place | places | 이름 있는 장소 이름 · 설명 | 지역 · 장소 종류 · 유명한 정도 |
| trait | itemTraits | 장비 개성 이름 · 설명 | 종류 · 스탯 · 크기 |
| consumable | items | 소모품 이름 · 설명 | 등급 · 효과 · 값 |
| constellation | constellations | NPC 성좌 이름 · 이유 · 평판 | 성향 · 영역 |

주문서 옵션: `--n 개수` · `--focus act:`(story — 그 갈래만) · `--goal 8`(이 개수가 될 때까지 빈 곳부터).

## 답 형식 (주문서 맨 아래에 그대로 있다)

```
## 답
kind: story
by: 채운 사람 (사람 이름이든 AI 이름이든)

### 1
on: act:ACT_WORK
lv: 3
text: 사무실 형광등 아래에서 엑셀 칸을 채운다.
```
- 빈칸만 채우면 된다. 미리 채워진 칸도 바꿔도 된다 (ID 나 이름 둘 다 됨).
- 같은 칸을 여러 번 = 목록 (`line:` 말풍선 여러 줄). `choice.t:` 가 나올 때마다 새 선택지.
- `//` 는 메모. 비워 둔 항목은 건너뛴다. `### ` 블록을 더 붙여 더 써도 된다.

## 막아 주는 것 (check · apply)

1. **겹침** — 기존 게임 + 이미 넣은 묶음 + 같은 답 파일 안. 문장은 글자 조각(2글자씩)이 72% 이상 같으면 뺀다(55% 이상은 '비슷함' 경고). 이름은 같으면 뺀다(80% 이상 경고). 같은 답 파일을 두 번 넣어도 전부 막힌다.
2. **스타일** — 지문은 현재형 · 마침표 · 존댓말 금지 · 1인칭 금지, 길이, 이모지, 채우다 만 자리(TODO · ???), 금지 주제(STYLE_CHECKLIST 26).
3. **자리 표시** — 그 순간에 쓸 수 없는 `{x}` 는 뺀다 (게임에서 `{x}` 그대로 보이는 사고 방지). 꼭 필요한 것(`{a}` · `{item}`)이 없어도 뺀다.
4. **값** — 모르는 ID · 이름, 숫자 범위, 조건 · 효과 문법.
5. **게임 규칙** — `game/engine/validate.js` 의 그 테이블 규칙을 항목마다 그대로 돌린다 (세 층 원칙의 단정 낱말 포함).
6. **반영 뒤 전체 검사** — `tools/validate_data.js` 가 통과하지 않으면 넣은 것을 되돌린다.

통과한 것만 넣고, 걸린 항목은 이유와 줄 번호를 보여 준다 (고쳐서 다시 check → apply).

## 게임에 들어가는 곳

- `game/data/ext/fill_<묶음 2자리>_<종류>.js` 한 파일 = 한 묶음. `game/data/ext/_list.js` 에 자동 등록 → 게임이 바로 읽는다.
- ID: `<접두사>_F<묶음><3자리>` (예: `SL_F01001`). 원본 답 파일은 `fill/done/<묶음>_<종류>.md` 에 남는다.
- 빼기: `undo <묶음>` (파일 삭제 + 등록 해제). 고치기: undo 뒤 답 파일을 고쳐 다시 apply.
- Claude 세션: apply 뒤 평소 순서(테스트 → 커밋 → push → PC 동기화 → 게임 페이지 갱신 — 새 `data/ext/fill_*.js` 와 `_list.js` 도 함께 올린다).

## 새 종류 추가 (개발자용)

`tools/fill/kinds.js` 에 한 덩어리: `table` · `prefix` · `title` · `about` · `rules` · `fields`(채울 칸 `fill:true`) · `existing`(겹침 비교 대상) · `targets`(빈 곳부터 미리 깔 값) · `make`(게임 행으로). 시험: `node tests/tools/t_fill.js` (game 사본에서 종류마다 주문 → 채움 → 반영 → 겹침 막힘 → undo).
