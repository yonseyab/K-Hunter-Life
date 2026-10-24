# UI 테스트 (Playwright · Chromium)

`game/index.html` 을 실제 브라우저로 열어 흐름을 눌러 보고 결과를 검사한다.

```bash
# 전체 (차례로, 요약)
CHROMIUM=/path/to/chromium OUT=/tmp/out NODE_PATH=$(npm root -g) node tests/ui/run_all.js
# 전체 (병렬)
ls tests/ui/t_*.js | CHROMIUM=… OUT=/tmp/out NODE_PATH=$(npm root -g) xargs -P 6 -I{} sh -c 'node {} >/tmp/out/$(basename {}).log 2>&1 || echo FAIL {}'
# 하나만
node tests/ui/t_play.js
```
통과 = 종료 코드 0 · 페이지 오류 없음(`errs []`) · '단언 실패' 없음. '(스모크)' 표시는 부서지지 않았는지만 보는 옛 테스트 — `fixture.js`(테스트 전용 고정 데이터)를 넣고 돈다.
채우기 도구 시험은 따로: `node tests/tools/t_fill.js`

| 파일 | 확인하는 것 |
|---|---|
| t_abl | 세부 능력 · 정보창 · 스카우트 보고서 (스모크) |
| t_asserts | 세 층 원칙 검사 도구 (asserts ⊆ req) |
| t_autoraid | 자동 공략 — 갈지 · 어디로 · 위기 선택 |
| t_career | 일반인 경력 · 메시지 · DB 인물 (스모크) |
| t_ccbasic | 새 헌터 기본 정보 화면 |
| t_combat | 전투 시뮬 · NPC 공략 · 등급 차 · DB 몬스터 |
| t_creation_text | 새 헌터 선택지 줄바꿈 · 표시 |
| t_crisis | 공략 위기 (스모크) |
| t_d20 | d20 판정 (스모크) |
| t_data | 데이터 검증 (tools/validate_data.js) |
| t_db | DB 화면 8탭 · 검색 · 정렬 · 분류 칩 · 상세 |
| t_econ | 경제 기준 · 커마 발동 조건 |
| t_equip | 장비 착용 판단 (스모크) |
| t_ev2 | 이벤트 (스모크) |
| t_event_popup | 선택 팝업 · d20 · 저장 복원 |
| t_foundation | 기반: 색인 · 빈칸 문장 · 꼬리표 조건 · 생활비 · IndexedDB 세이브 |
| t_gatelist | 게이트 목록 필터 · 정렬 |
| t_gc | 승격 인물 정리 (SIM.gc) |
| t_hear | 들은 이야기 (스모크) |
| t_home | 인생 홈 배치 · 위젯 · 사이드바 |
| t_home_widgets | 인생 홈 위젯 |
| t_house | 주거 · 동거 (스모크) |
| t_hunter_status | 내 헌터 상태창 (분배 없음 · 탭) |
| t_info_rel | 정보 탭 · 관계 눈금 · 선물 안배 · 사진 주문서 · 커마 |
| t_legacy | 끝 · 일대기 · 기록관 · 이어 가기 |
| t_life | 인생 진행 (스모크) |
| t_life_history | 월별 인생 기록 · 지난 일생 검색 |
| t_mind | 판단 엔진 · 성격 변화 · 이야기꾼 |
| t_myguild | 내 길드 (스모크) |
| t_npc | NPC 하루 (스모크) |
| t_observe | 관찰형 정책 · 자동 일정 · 구매 · 위기 |
| t_personality_names | 성격 요약명 256종 |
| t_place2 | NPC 위치 · 출퇴근 (스모크) |
| t_play | 실시간 재생 · 이야기 창 · 멈춤 · 회고 |
| t_prefs | 게임 설정 (자동 판매 · 알림) |
| t_rank | 등급 갱신 (스모크) |
| t_routine_scale | 일과 확장 계약 |
| t_rumor | 소문 (스모크) |
| t_save | 저장 슬롯 · 자동 저장 · 사망 세이브 (스모크) |
| t_scale | 인구 · 게이트 규모 |
| t_sim | 배경 인구 시뮬 (스모크) |
| t_split | 수익 분배 (스모크) |
| t_star_data | 성좌 축복 · 메시지 · 스탯 포인트 규칙 |
| t_star_tabs | 성좌 탭 (내 정보 · 상점 · 경매장 · 업적) · 장비 탭 |
| t_status | 스탯 분배 없음 |
| t_worker | 워커 인구 계산 (스모크) |
| t_world | 세계 (스모크) |
