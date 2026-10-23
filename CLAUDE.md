# K-Hunter-Life — 작업 안내 (Claude용)

**K-Hunter-Life**는 헌터 라이프(Hunter Life)의 새 버전이야. 옛 저장소 [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life)에서 엔진과 일부 데이터만 가져와 새로 만들어.

**새 채팅을 시작하면 먼저 [docs/REBUILD_PLAN.md](docs/REBUILD_PLAN.md)를 끝까지 읽어.** 2026-10-23에 사용자와 정한 설계 전부와 만드는 순서가 거기 있어.

## 사용자와 일하는 규칙

- **답은 한국어로, 짧게.** 사용자가 묻지 않으면 과정을 길게 설명하지 않아.
- **사용자가 "물어보지 말고 해 줘"라고 하면** 합리적으로 정하고 결과에 적어.
- **"나중에"로 미룬 결정:** 범죄 · 자녀 · 잠재력 전체 보기. 자녀는 '다음 인물로 이어 가기'를 만들 때 같이 정해.
- **게임 안에 AI(LLM)를 넣지 않아.** 모든 내용은 ID 기반 데이터와 규칙으로 만들어.
- **문서를 늘 최신으로 유지해.** `docs/HANDOFF.md`(진행 상황 · 구조)와 `docs/DECISIONS.md`(사용자 결정)가 기준이야.

## 변경할 때마다 하는 순서

1. **테스트**
   - 데이터 검사: `node tools/validate_data.js`
   - UI 전체: `CHROMIUM=/opt/pw-browsers/chromium OUT=/tmp/claude-0 NODE_PATH=$(npm root -g) node tests/ui/run_all.js`
2. **커밋**: 메시지 끝에 세션이 알려 주는 attribution 줄을 붙여.
3. **push**
4. **PC 동기화**: 바탕화면 `K-Hunter-Life` 폴더 (`C:\Users\YON\Desktop\K-Hunter-Life`)
   - 연결된 컴퓨터 도구로 바뀐 파일을 써 넣어 (`device_commit_files`, force).
   - 폴더가 아직 없으면 사용자에게 만들어 달라고 하거나 폴더 접근을 요청해.
5. **게임 페이지(아티팩트) 갱신**: **새 페이지**를 만들어. 옛 Hunter Life 페이지에는 덮어쓰지 마. 처음 만든 페이지 URL은 `docs/HANDOFF.md`에 적어 둬.

## 역할

| 누구 | 하는 일 |
|---|---|
| 사용자 | 방향과 최종 결정 |
| Claude | 시스템 · 엔진 · UI · 저장 · 밸런스 · 데이터 통합 · 검사 도구 · 외주 의뢰서의 기술 부분 |
| Codex | **모든 콘텐츠 외주.** 이벤트 · 위기 · 문장 재료 · 뉴스 · 소문 · 특성 · 클래스 · 스킬 · 아이템 · 몬스터 · 목표 · 직업 · 길드 · 인물 |
| Gemini | 사용자가 콘텐츠 **스타일**을 정할 때 상담. 결과는 [docs/STYLE_CHECKLIST.md](docs/STYLE_CHECKLIST.md)에 채워 와 |

**Codex 의뢰서는 만들기 전에 반드시 사용자와 상의해.** 스타일이 정해지기 전에는 기술 형식(데이터 필드 · 태그 · 검사 규칙)만 준비해 둬.
