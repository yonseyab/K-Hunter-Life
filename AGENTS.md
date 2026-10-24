# K-Hunter-Life — AI 작업 안내 (Claude 외 다른 AI용)

Claude 는 [CLAUDE.md](CLAUDE.md) 를 읽는다. 다른 AI(Codex · Gemini · GPT 등)는 이 파일부터.

1. **[docs/ROADMAP.md](docs/ROADMAP.md)** — 작업 규칙 · 지금 상태 · 앞으로 할 일 · 구조 요약 · 콘텐츠 만드는 법
2. [docs/HANDOFF.md](docs/HANDOFF.md) — 구조 · 진행 상황
3. [docs/DECISIONS.md](docs/DECISIONS.md) — 사용자 결정 (가장 우선)
4. [docs/STYLE_CHECKLIST.md](docs/STYLE_CHECKLIST.md) — 글 스타일

핵심 규칙: 한국어로 짧게 답한다 · 결정할 건 선택지를 펼쳐 고르게 한다 · 범위 밖을 앞서 고치지 않는다 · 게임 안에 LLM 금지(ID 데이터 + 규칙) · 관찰형(헌터를 직접 조종하는 UI 금지) · 밸런스는 `BAL_*` 테이블 · 변경마다 `node tools/validate_data.js` + `tests/ui` → 커밋 → `main` push → HANDOFF/DECISIONS 갱신.
사용자 PC 폴더 동기화 · 게임 페이지(claude.ai 아티팩트) 갱신은 Claude 세션 도구로만 할 수 있다 — 다른 AI는 바뀐 파일 목록을 사용자에게 알려 준다.
