# K-Hunter-Life

**한국 헌터물 + 성좌물 관찰형 인생 시뮬레이션.** 2026년, 1999년에 첫 게이트가 열린 지 27년이 지난 한국에서 내가 만든 헌터의 인생이 하루 30초씩 흘러간다. 플레이어는 헌터를 직접 조종하지 않는다 — 그 헌터를 지켜보는 **성좌**가 되어 코인으로 선물하고, 축복을 걸고, 헌터가 성좌를 알아채면 가끔 조언한다. 따를지는 헌터가 정한다.

> 헌터 라이프(Hunter Life)의 새 버전 · 옛 버전: [yonseyab/Hunter-Life](https://github.com/yonseyab/Hunter-Life) (보관본, 세이브 호환 안 됨)

## 실행

1. 이 저장소를 내려받는다 — 초록색 **Code → Download ZIP** 후 압축 풀기 (또는 `git clone`).
2. `game/index.html` 을 브라우저(크롬 · 엣지)로 연다. **빌드 · 설치 없음.**
3. 타이틀 → 성좌 칸 → 새 성좌 → 헌터 만들기 → 시작. 둘러보기만 하려면 '데모로 둘러보기'.

세이브는 브라우저 안(IndexedDB)에 남는다. 다른 브라우저 · 다른 PC 로 옮기려면 타이틀 › 기록관에서 끝난 헌터를 파일로 내보내고 가져온다.

## 지금 있는 것

| | |
|---|---|
| 인생 | 실시간 재생(×1 · 2 · 5 · 20) · 이야기 창 · 판단 엔진(성격 · 감정 · 상태로 스스로 정함) · 감정 · 고비 회고 · 일대기 · 노년 · 사망 · 은퇴 · 같은 세계에서 이어 가기 · 기록관 |
| 세계 | 전국 배경 인구 · 하루 약 5,500개 게이트 · NPC 자율 행동 · 길드 · 경제 · 뉴스 · 소문 |
| 전투 | 0.5초 단위 실시간 통계 시뮬 — 역할 · 클래스 · 스킬 · 장비 · 몬스터 역할 · 등급 차 |
| 성좌 | 계정(칸 3개) · 코인 · 업적 30 · 해금 · 상점(매일 진열) · 성좌 경매장 · 선물(헌터가 모르면 운 · 노력으로 얻은 것처럼) · 조언 · 잠재력 엿보기 · 축복 · 메시지 |
| 내 헌터 | 정보(FM식) · 상태창(기본 · 장비 · 클래스/스킬 · 특성) · 관계(마음 눈금) · 설정의 '헌터 사진 주문서'(외형 → 이미지 AI 프롬프트) |
| 콘텐츠 | 클래스 100 · 스킬 280 · 전투 기술 157 · 장비 507 · 마정석 80 · 기본 이야기 문장 · 이벤트 · 위기 · 몬스터 — **이야기 · 이벤트 · 몬스터 · 장소 같은 글 콘텐츠는 아직 적다** (채우는 중) |
| DB | 인물 · 게이트 · 몬스터 · 장비 · 장소 · 기타 · 클래스 · 스킬 — 검색 · 정렬 · 분류 |

## 콘텐츠 채우기 (사람 · 어떤 AI든)

글 콘텐츠는 **채우기 도구**로 넣는다. 도구가 세계관 · 스타일 · 칸 설명 · 이미 있는 것까지 담은 **주문서**를 만들고, 채우는 쪽은 빈칸에 글만 쓴다. 검사(겹침 · 스타일 · 게임 규칙)와 게임 반영은 도구가 한다.

```bash
node tools/fill/fill.js list                    # 채울 수 있는 종류 15가지
node tools/fill/fill.js order story --n 40      # 주문서 → fill/orders/  (이 파일을 그대로 넘긴다)
node tools/fill/fill.js check 받은답.md          # 검사만
node tools/fill/fill.js apply 받은답.md          # 통과한 것만 게임에 (되돌리기: undo <묶음>)
```
바로 쓸 주문서가 [`fill/orders/`](fill/orders) 에 있다. 자세한 사용법: [docs/FILL.md](docs/FILL.md) · 윈도우는 `fill.cmd`.

## 개발

- 처음 들어온 사람 · AI: **[docs/ROADMAP.md](docs/ROADMAP.md)**(할 일 · 규칙 · 구조) → [docs/HANDOFF.md](docs/HANDOFF.md)(구조 · 현황) → [docs/DECISIONS.md](docs/DECISIONS.md)(결정). AI 작업 안내: [AGENTS.md](AGENTS.md) · Claude: [CLAUDE.md](CLAUDE.md)
- 원칙: 게임 안에 AI(LLM) 없음 — 모든 내용은 ID 데이터 + 규칙 · 관찰형(헌터 직접 조종 UI 없음) · 밸런스 값은 `BAL_*` 테이블
- 스타일: [docs/STYLE_CHECKLIST.md](docs/STYLE_CHECKLIST.md) · 경제 기준: [docs/ECONOMY.md](docs/ECONOMY.md) · QA 봇: [docs/QA.md](docs/QA.md)

```
game/            게임 (index.html · engine/ · data/ · *.css)
tools/           validate_data · fill(채우기) · report_content(빈 곳 보고) · perf_scale(속도) · qa_sim(QA 봇) · content(클래스 · 스킬 · 장비 생성기)
tests/           ui/(Playwright) · tools/
fill/            채우기 주문서 · 넣은 답 원본
docs/            ROADMAP · HANDOFF · DECISIONS · FILL · STYLE_CHECKLIST · ECONOMY · QA
```

검사: `node tools/validate_data.js` · `node tests/tools/t_fill.js` · `CHROMIUM=<크로뮴 경로> NODE_PATH=$(npm root -g) node tests/ui/run_all.js` (Playwright)

## 자료 출처
지도 경계: [vuski/admdongkor](https://github.com/vuski/admdongkor) (CC BY 4.0) · 지역 · 지도 · 게이트 장소 목록은 `tools/build_regions.py` · `build_maps.py` · `build_gate_pool.py` 로 만든다 (원본 자료는 저장소 밖 `art_src/`)
