# K-Hunter-Life — 작업 안내 (Claude용)

**K-Hunter-Life**는 헌터 라이프(Hunter Life)의 새 버전이야. 한국 헌터물 + 성좌물 **관찰형** 인생 시뮬레이션: 플레이어는 헌터를 직접 조종하지 않고, 그 헌터의 성좌로서 지켜보며 코인으로 선물해. 옛 저장소는 [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) (보관본).

**새 채팅을 시작하면 먼저 [docs/ROADMAP.md](docs/ROADMAP.md)(앞으로 할 일 · 규칙), [docs/HANDOFF.md](docs/HANDOFF.md)(진행 상황 · 구조), [docs/DECISIONS.md](docs/DECISIONS.md)(사용자 결정)를 읽어.** 다른 AI용 안내는 [AGENTS.md](AGENTS.md). 콘텐츠 스타일은 [docs/STYLE_CHECKLIST.md](docs/STYLE_CHECKLIST.md). 이 문서들과 사용자의 최근 말이 기준이야. 새 기능 구현이나 큰 정리는 시작하기 전에 할 일 목록을 사용자와 먼저 맞춰.

## 사용자와 일하는 규칙

- **답은 한국어로, 짧게.** 사용자가 묻지 않으면 과정을 길게 설명하지 않아.
- **상의 먼저.** 결정할 게 있으면 선택지를 여러 개 펼쳐 보여 주고 고르게 해. 정해진 범위 밖으로 앞서 나가 고치지 마 (UI를 바꾸지 말라고 하면 바꾸지 마).
- **사용자가 "물어보지 말고 해 줘"라고 하면** 합리적으로 정하고 결과에 적어.
- **"나중에"로 미룬 결정:** 범죄 · 자녀 · 잠재력 전체 보기. 자녀는 '다음 인물로 이어 가기'를 만들 때 같이 정해.
- **게임 안에 AI(LLM)를 넣지 않아.** 모든 내용은 ID 기반 데이터와 규칙으로 만들어.
- **콘텐츠도 Claude가 만든다 (2026-10-24 사용자 결정 — 외주 중단).** 글 콘텐츠는 채우기 도구(`tools/fill`, [docs/FILL.md](docs/FILL.md))로 — 사용자가 다른 AI · 사람에게 주문서를 줄 수도 있다. 받은 답 파일은 check → apply. 데이터 형식은 각 data 파일 머리 주석과 `game/engine/validate.js` 규칙이 기준이야.
- **문서를 늘 최신으로 유지해.** `docs/HANDOFF.md`와 `docs/DECISIONS.md`가 기준이야.

## 변경할 때마다 하는 순서

1. **테스트**
   - 데이터 검사: `node tools/validate_data.js`
   - 채우기 도구 시험: `node tests/tools/t_fill.js` (tools/fill 을 고쳤을 때)
   - UI 전체: `CHROMIUM=/opt/pw-browsers/chromium OUT=/tmp/claude-0 NODE_PATH=$(npm root -g) node tests/ui/run_all.js` (병렬로 돌려도 됨)
2. **커밋**: 메시지 끝에 세션이 알려 주는 attribution 줄을 붙여.
3. **push** (`main`)
4. **PC 동기화**: 바탕화면 `K-Hunter-Life` 폴더 (`C:\Users\YON\Desktop\K-Hunter-Life`)
   - 연결된 컴퓨터 도구로 바뀐 파일을 써 넣어 (`device_commit_files`, force). 지운 파일은 PC에서도 지워야 하면 사용자에게 알려.
5. **게임 페이지(아티팩트) 갱신**: `docs/HANDOFF.md`에 적힌 K-Hunter-Life 페이지. 옛 Hunter Life 페이지에는 덮어쓰지 마.

## 역할

| 누구 | 하는 일 |
|---|---|
| 사용자 | 방향과 최종 결정 |
| Claude | 시스템 · 엔진 · UI · 저장 · 밸런스 · 데이터 · 콘텐츠 · 검사 도구 |
| Gemini | 사용자가 콘텐츠 **스타일**을 정할 때 상담. 결과는 [docs/STYLE_CHECKLIST.md](docs/STYLE_CHECKLIST.md)에 |
