# Git 협업 규칙

2026-10-24 사용자 결정: GitHub `main`이 최신 기준이며, Claude와 Codex는 각자 브랜치와 작업 폴더를 사용한다.

## 작업 위치

- 기준 폴더: `C:\Users\YON\Desktop\K-Hunter-Life` — `main`. 합쳐진 버전을 확인하는 곳이다.
- Codex 폴더: `C:\Users\YON\Desktop\K-Hunter-Life\.worktrees\codex` — `codex/<작업이름>` 브랜치.
- Claude: 자신의 checkout 또는 별도 worktree에서 `claude/<작업이름>` 브랜치를 사용한다. Codex 폴더나 기준 폴더에서 동시에 작업하지 않는다.
- `.worktrees/`와 설치용 `.git-setup/`는 로컬 `.git/info/exclude`로 제외한다. `output/`도 이 PC에서만 제외한다.

## 매 작업의 순서

1. `git status --short`로 기존 수정과 현재 브랜치를 확인한다. 남의 변경을 되돌리거나 커밋에 섞지 않는다.
2. `git fetch origin`으로 최신 상태를 확인한다. 새 작업은 `origin/main`에서 자기 이름의 브랜치를 만든다.
3. 자기 작업 폴더에서 맡은 범위만 수정한다. 공유 파일, 특히 `game/data/ext/_list.js`는 다른 브랜치의 변경도 확인한다.
4. 데이터 검사 `node tools/validate_data.js`를 실행한다. 게임 동작에 영향이 있으면 UI 검사도 실행한다.
5. 바꾼 파일 경로를 지정해 stage하고 커밋한다. Codex 메시지는 `[codex] <의뢰 번호 또는 작업명> <요약>`이다.
6. 자기 브랜치를 push하고 `main` 대상 PR을 만든다. 변경 내용과 검사 결과를 적는다. `main`에 직접 push하거나 강제 push하지 않는다.
7. PR을 합친 뒤 기준 폴더가 깨끗할 때 `git pull --ff-only origin main`으로 갱신한다. 로컬 수정이 있으면 먼저 확인하고 보존한다.

Claude의 별도 작업 폴더가 필요하면 깨끗한 기준 폴더에서 다음처럼 만든다. 이미 같은 이름의 브랜치나 폴더가 있으면 재사용 여부를 먼저 확인한다.

```powershell
git fetch origin
git worktree add --no-track -b claude/작업이름 .worktrees/claude origin/main
```

## 하지 않는 것

- 파일 전체를 복사해 다른 작업 폴더를 덮어쓰지 않는다.
- 다른 사람이 쓰는 폴더에서 브랜치를 바꾸지 않는다.
- 로컬 변경이 남아 있는 상태에서 강제 초기화나 파일 정리를 하지 않는다.
- 데이터 필드나 엔진의 문제가 보여도 담당 범위를 넘어 임의 수정하지 않는다. PR이나 의뢰 보고에 남긴다.

## 최초 연결 기록

- 기존 PC 파일을 ZIP으로 백업하고, 수정된 추적 파일 15개의 SHA256이 백업과 같은지 확인했다.
- PC에만 있던 파일은 별도 임시 보관 폴더로 옮겼다. `output/`은 원래 위치에 유지했다.
- 기준 폴더는 GitHub `main`의 `0f1100b` 내용으로 맞췄다. 로컬에 없던 엔진 파일도 복구했다.
- 최초 설정 브랜치는 `codex/setup-collaboration`이다. 이 PR을 합친 뒤 다음 의뢰는 최신 `origin/main`에서 새 브랜치로 시작한다.
