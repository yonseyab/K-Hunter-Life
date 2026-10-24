/* Codex 01 · 클래스 스킬 720개. 기본 패시브와 레벨 습득은 엔진 연결이 별도로 필요하다. */

def('skills', [
  {
    id:'SK_C0001', name:'칼끝찍기', en:'Longsword Warden Contact', scope:'class', cls:'CLS_C001',
    grade:2, rarity:1, tier:1, desc:'장검 끝을 짧게 내려찍어 전방의 노출 부위를 친다. 검을 높게 들면 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 칼끝찍기를 공격 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['공격', '좁은 통로의 검선'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.1, kind2:'AK_MELEE', acc:-1,
    crit:1, cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'push',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0002'], lines:{use:['{u}은(는) 장검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 칼끝찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 칼끝찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 칼끝찍기의 경로에서 몸을 뺀다.', '{u}의 장검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 칼끝찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 칼끝찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 칼끝찍기를 중단한다.', '{u}의 칼끝찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', se:[{se:'SE_C007', turns:1, chance:0.3}]
  },
  {
    id:'SK_C0002', name:'칼등받기', en:'Longsword Warden Guard', scope:'class', cls:'CLS_C001',
    grade:1, rarity:1, tier:1, desc:'장검의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 칼등받기를 방어 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['방어', '좁은 통로의 검선'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0003'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장검의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 칼등받기가 필요한 위치에 닿지 않는다.', '{u}은(는) 칼등받기를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 칼등받기의 범위와 출력을 정확히 맞춘다.', '{u}의 칼등받기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 칼등받기를 중단한다.', '{u}의 칼등받기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0003', name:'검선열기', en:'Longsword Warden Set', scope:'class', cls:'CLS_C001',
    grade:1, rarity:1, tier:1, desc:'장검으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 검선열기를 틈 만들기 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['틈 만들기', '좁은 통로의 검선'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0004'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장검으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 검선열기가 필요한 위치에 닿지 않는다.', '{u}은(는) 검선열기를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 검선열기의 범위와 출력을 정확히 맞춘다.', '{u}의 검선열기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 검선열기를 중단한다.', '{u}의 검선열기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0004', name:'사선딛기', en:'Longsword Warden Step', scope:'class', cls:'CLS_C001',
    grade:2, rarity:1, tier:1, desc:'장검의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 사선딛기를 이동 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['이동', '좁은 통로의 검선'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0005'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장검의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사선딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 사선딛기를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 사선딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 사선딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 사선딛기를 중단한다.', '{u}의 사선딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0005', name:'검폭읽기', en:'Longsword Warden Reading', scope:'class', cls:'CLS_C001',
    grade:1, rarity:1, tier:1, desc:'좁은 통로의 검선을 살피며 손과 발의 변화를 읽는다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 검폭읽기를 거리 감지 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['거리 감지', '좁은 통로의 검선'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0006'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 통로의 검선을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 검폭읽기가 필요한 위치에 닿지 않는다.', '{u}은(는) 검폭읽기를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 검폭읽기의 범위와 출력을 정확히 맞춘다.', '{u}의 검폭읽기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 검폭읽기를 중단한다.', '{u}의 검폭읽기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0006', name:'반보거리', en:'Longsword Warden Discipline', scope:'class', cls:'CLS_C001',
    grade:1, rarity:1, tier:1, desc:'장검을 쥔 자세를 낮춰 반동을 나눠 받는다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 반보거리를 자세 유지 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['자세 유지', '좁은 통로의 검선'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0007'], lines:{use:['{u}의 {s}이(가) 발동한다. 장검을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반보거리가 필요한 위치에 닿지 않는다.', '{u}은(는) 반보거리를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 반보거리의 범위와 출력을 정확히 맞춘다.', '{u}의 반보거리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 반보거리를 중단한다.', '{u}의 반보거리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0007', name:'양손중심', en:'Longsword Warden Foundation', scope:'class', cls:'CLS_C001',
    grade:2, rarity:1, tier:1, desc:'장검의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 양손중심을 장비 적응 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['장비 적응', '좁은 통로의 검선'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0008'], lines:{use:['{u}의 {s}이(가) 발동한다. 장검의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 양손중심이 필요한 위치에 닿지 않는다.', '{u}은(는) 양손중심을 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 양손중심의 범위와 출력을 정확히 맞춘다.', '{u}의 양손중심이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 양손중심을 중단한다.', '{u}의 양손중심이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0008', name:'종베기', en:'Longsword Warden Sequence', scope:'class', cls:'CLS_C001',
    grade:2, rarity:3, tier:2, desc:'장검의 회수 동작을 다음 타격으로 이어 두 차례 친다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 종베기를 연계 공격 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['연계 공격', '좁은 통로의 검선'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:-1,
    crit:-1, cost:{stamina:18, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0009'], lines:{use:['{u}은(는) 장검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 종베기의 경로에서 몸을 뺀다.', '{u}의 장검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 종베기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 종베기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 종베기를 중단한다.', '{u}의 종베기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0009', name:'퇴로긋기', en:'Longsword Warden Coverage', scope:'class', cls:'CLS_C001',
    grade:3, rarity:3, tier:3, desc:'장검으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 퇴로긋기를 퇴로 엄호 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['퇴로 엄호', '좁은 통로의 검선'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0010'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장검으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 퇴로긋기가 필요한 위치에 닿지 않는다.', '{u}은(는) 퇴로긋기를 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴로긋기의 범위와 출력을 정확히 맞춘다.', '{u}의 퇴로긋기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 퇴로긋기를 중단한다.', '{u}의 퇴로긋기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0010', name:'손목되돌림', en:'Longsword Warden Feedback', scope:'class', cls:'CLS_C001',
    grade:4, rarity:3, tier:4, desc:'장검이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 큰 동작 뒤 옆구리가 빈다.', lore:'경비 업체 출입구 방어에서 손목되돌림을 반동 대응 용도로 쓴다. 큰 동작 뒤 옆구리가 빈다.',
    tags:['반동 대응', '좁은 통로의 검선'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0001'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 장검이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손목되돌림이 필요한 위치에 닿지 않는다.', '{u}은(는) 손목되돌림을 멈추고 장검의 위치를 다시 잡는다.'], crit:['{u}은(는) 손목되돌림의 범위와 출력을 정확히 맞춘다.', '{u}의 손목되돌림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장검의 상태가 맞지 않아 손목되돌림을 중단한다.', '{u}의 손목되돌림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0011', name:'엇날베기', en:'Twinblade Worker Contact', scope:'class', cls:'CLS_C002',
    grade:2, rarity:1, tier:1, desc:'두 칼을 엇갈려 짧게 벤다. 양손이 묶이면 이어 가지 못한다.', lore:'소형 게이트 측면 계약에서 엇날베기를 공격 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['공격', '좌우 검날의 교대'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.55, kind2:'AK_MELEE', acc:0,
    crit:2, cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0012'], lines:{use:['{u}은(는) 쌍검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 엇날베기의 경로에서 몸을 뺀다.', '{u}의 쌍검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 엇날베기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 엇날베기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 엇날베기를 중단한다.', '{u}의 엇날베기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0012', name:'교차받기', en:'Twinblade Worker Guard', scope:'class', cls:'CLS_C002',
    grade:1, rarity:1, tier:1, desc:'쌍검의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 교차받기를 방어 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['방어', '좌우 검날의 교대'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0013'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쌍검의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 교차받기가 필요한 위치에 닿지 않는다.', '{u}은(는) 교차받기를 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 교차받기의 범위와 출력을 정확히 맞춘다.', '{u}의 교차받기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 교차받기를 중단한다.', '{u}의 교차받기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0013', name:'틈넘기기', en:'Twinblade Worker Set', scope:'class', cls:'CLS_C002',
    grade:1, rarity:1, tier:1, desc:'쌍검으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 틈넘기기를 틈 만들기 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['틈 만들기', '좌우 검날의 교대'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0014'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쌍검으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 틈넘기기가 필요한 위치에 닿지 않는다.', '{u}은(는) 틈넘기기를 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 틈넘기기의 범위와 출력을 정확히 맞춘다.', '{u}의 틈넘기기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 틈넘기기를 중단한다.', '{u}의 틈넘기기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0014', name:'곁발돌기', en:'Twinblade Worker Step', scope:'class', cls:'CLS_C002',
    grade:2, rarity:1, tier:1, desc:'쌍검의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 곁발돌기를 이동 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['이동', '좌우 검날의 교대'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0015'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쌍검의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 곁발돌기가 필요한 위치에 닿지 않는다.', '{u}은(는) 곁발돌기를 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 곁발돌기의 범위와 출력을 정확히 맞춘다.', '{u}의 곁발돌기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 곁발돌기를 중단한다.', '{u}의 곁발돌기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0015', name:'손바뀜눈', en:'Twinblade Worker Reading', scope:'class', cls:'CLS_C002',
    grade:1, rarity:1, tier:1, desc:'좌우 검날의 교대를 살피며 손과 발의 변화를 읽는다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 손바뀜눈을 거리 감지 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['거리 감지', '좌우 검날의 교대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0016'], lines:{use:['{u}의 {s}이(가) 발동한다. 좌우 검날의 교대를 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손바뀜눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 손바뀜눈을 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 손바뀜눈의 범위와 출력을 정확히 맞춘다.', '{u}의 손바뀜눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 손바뀜눈을 중단한다.', '{u}의 손바뀜눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0016', name:'엇박호흡', en:'Twinblade Worker Discipline', scope:'class', cls:'CLS_C002',
    grade:1, rarity:1, tier:1, desc:'쌍검을 쥔 자세를 낮춰 반동을 나눠 받는다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 엇박호흡을 자세 유지 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['자세 유지', '좌우 검날의 교대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0017'], lines:{use:['{u}의 {s}이(가) 발동한다. 쌍검을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 엇박호흡이 필요한 위치에 닿지 않는다.', '{u}은(는) 엇박호흡을 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 엇박호흡의 범위와 출력을 정확히 맞춘다.', '{u}의 엇박호흡이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 엇박호흡을 중단한다.', '{u}의 엇박호흡이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0017', name:'양손분담', en:'Twinblade Worker Foundation', scope:'class', cls:'CLS_C002',
    grade:2, rarity:1, tier:1, desc:'쌍검의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 양손분담을 장비 적응 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['장비 적응', '좌우 검날의 교대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0018'], lines:{use:['{u}의 {s}이(가) 발동한다. 쌍검의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 양손분담이 필요한 위치에 닿지 않는다.', '{u}은(는) 양손분담을 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 양손분담의 범위와 출력을 정확히 맞춘다.', '{u}의 양손분담이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 양손분담을 중단한다.', '{u}의 양손분담이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0018', name:'쌍날훑기', en:'Twinblade Worker Sequence', scope:'class', cls:'CLS_C002',
    grade:2, rarity:3, tier:2, desc:'쌍검의 회수 동작을 다음 타격으로 이어 두 차례 친다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 쌍날훑기를 연계 공격 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['연계 공격', '좌우 검날의 교대'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:0,
    crit:-1, cost:{stamina:19, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0019'], lines:{use:['{u}은(는) 쌍검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 쌍날훑기의 경로에서 몸을 뺀다.', '{u}의 쌍검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 쌍날훑기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 쌍날훑기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 쌍날훑기를 중단한다.', '{u}의 쌍날훑기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0019', name:'검막접기', en:'Twinblade Worker Coverage', scope:'class', cls:'CLS_C002',
    grade:3, rarity:3, tier:3, desc:'쌍검으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 검막접기를 퇴로 엄호 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['퇴로 엄호', '좌우 검날의 교대'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0020'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쌍검으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 검막접기가 필요한 위치에 닿지 않는다.', '{u}은(는) 검막접기를 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 검막접기의 범위와 출력을 정확히 맞춘다.', '{u}의 검막접기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 검막접기를 중단한다.', '{u}의 검막접기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0020', name:'빈손보정', en:'Twinblade Worker Feedback', scope:'class', cls:'CLS_C002',
    grade:4, rarity:3, tier:4, desc:'쌍검이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 양손이 묶이면 방어가 무너진다.', lore:'소형 게이트 측면 계약에서 빈손보정을 반동 대응 용도로 쓴다. 양손이 묶이면 방어가 무너진다.',
    tags:['반동 대응', '좌우 검날의 교대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0011'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 쌍검이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 빈손보정이 필요한 위치에 닿지 않는다.', '{u}은(는) 빈손보정을 멈추고 쌍검의 위치를 다시 잡는다.'], crit:['{u}은(는) 빈손보정의 범위와 출력을 정확히 맞춘다.', '{u}의 빈손보정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쌍검의 상태가 맞지 않아 빈손보정을 중단한다.', '{u}의 빈손보정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0021', name:'창끝누름', en:'Longspear Guard Contact', scope:'class', cls:'CLS_C003',
    grade:2, rarity:1, tier:1, desc:'먼저 내민 창끝으로 접근하는 적을 누른다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 창끝누름을 공격 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['공격', '창끝과 발판의 간격'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0.9, kind2:'AK_MELEE', acc:1,
    crit:1, cost:{stamina:11, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'push',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0022'], lines:{use:['{u}은(는) 장창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 창끝누름이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 창끝누름을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 창끝누름의 경로에서 몸을 뺀다.', '{u}의 장창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 창끝누름이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 창끝누름의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 창끝누름을 중단한다.', '{u}의 창끝누름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', counter:'창끝이 닿는 거리로 적이 진입할 때'
  },
  {
    id:'SK_C0022', name:'창대받기', en:'Longspear Guard Guard', scope:'class', cls:'CLS_C003',
    grade:1, rarity:1, tier:1, desc:'장창의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 창대받기를 방어 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['방어', '창끝과 발판의 간격'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0023'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장창의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 창대받기가 필요한 위치에 닿지 않는다.', '{u}은(는) 창대받기를 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 창대받기의 범위와 출력을 정확히 맞춘다.', '{u}의 창대받기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 창대받기를 중단한다.', '{u}의 창대받기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0023', name:'진입차단', en:'Longspear Guard Set', scope:'class', cls:'CLS_C003',
    grade:1, rarity:1, tier:1, desc:'장창으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 진입차단을 틈 만들기 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['틈 만들기', '창끝과 발판의 간격'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0024'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장창으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 진입차단이 필요한 위치에 닿지 않는다.', '{u}은(는) 진입차단을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 진입차단의 범위와 출력을 정확히 맞춘다.', '{u}의 진입차단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 진입차단을 중단한다.', '{u}의 진입차단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0024', name:'창짚이동', en:'Longspear Guard Step', scope:'class', cls:'CLS_C003',
    grade:2, rarity:1, tier:1, desc:'장창의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 창짚이동을 이동 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['이동', '창끝과 발판의 간격'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0025'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장창의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 창짚이동이 필요한 위치에 닿지 않는다.', '{u}은(는) 창짚이동을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 창짚이동의 범위와 출력을 정확히 맞춘다.', '{u}의 창짚이동이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 창짚이동을 중단한다.', '{u}의 창짚이동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0025', name:'간격재기', en:'Longspear Guard Reading', scope:'class', cls:'CLS_C003',
    grade:1, rarity:1, tier:1, desc:'창끝과 발판의 간격을 살피며 손과 발의 변화를 읽는다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 간격재기를 거리 감지 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['거리 감지', '창끝과 발판의 간격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0026'], lines:{use:['{u}의 {s}이(가) 발동한다. 창끝과 발판의 간격을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 간격재기가 필요한 위치에 닿지 않는다.', '{u}은(는) 간격재기를 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 간격재기의 범위와 출력을 정확히 맞춘다.', '{u}의 간격재기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 간격재기를 중단한다.', '{u}의 간격재기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0026', name:'창끝정렬', en:'Longspear Guard Discipline', scope:'class', cls:'CLS_C003',
    grade:1, rarity:1, tier:1, desc:'장창을 쥔 자세를 낮춰 반동을 나눠 받는다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 창끝정렬을 자세 유지 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['자세 유지', '창끝과 발판의 간격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0027'], lines:{use:['{u}의 {s}이(가) 발동한다. 장창을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 창끝정렬이 필요한 위치에 닿지 않는다.', '{u}은(는) 창끝정렬을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 창끝정렬의 범위와 출력을 정확히 맞춘다.', '{u}의 창끝정렬이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 창끝정렬을 중단한다.', '{u}의 창끝정렬이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0027', name:'장대균형', en:'Longspear Guard Foundation', scope:'class', cls:'CLS_C003',
    grade:2, rarity:1, tier:1, desc:'장창의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 장대균형을 장비 적응 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['장비 적응', '창끝과 발판의 간격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0028'], lines:{use:['{u}의 {s}이(가) 발동한다. 장창의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 장대균형이 필요한 위치에 닿지 않는다.', '{u}은(는) 장대균형을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 장대균형의 범위와 출력을 정확히 맞춘다.', '{u}의 장대균형이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 장대균형을 중단한다.', '{u}의 장대균형이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0028', name:'두줄찌름', en:'Longspear Guard Sequence', scope:'class', cls:'CLS_C003',
    grade:2, rarity:3, tier:2, desc:'장창의 회수 동작을 다음 타격으로 이어 두 차례 친다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 두줄찌름을 연계 공격 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['연계 공격', '창끝과 발판의 간격'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:1,
    crit:-1, cost:{stamina:20, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0029'], lines:{use:['{u}은(는) 장창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 두줄찌름의 경로에서 몸을 뺀다.', '{u}의 장창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 두줄찌름이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 두줄찌름의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 두줄찌름을 중단한다.', '{u}의 두줄찌름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0029', name:'통로걸침', en:'Longspear Guard Coverage', scope:'class', cls:'CLS_C003',
    grade:3, rarity:3, tier:3, desc:'장창으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 통로걸침을 퇴로 엄호 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['퇴로 엄호', '창끝과 발판의 간격'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0030'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장창으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 통로걸침이 필요한 위치에 닿지 않는다.', '{u}은(는) 통로걸침을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 통로걸침의 범위와 출력을 정확히 맞춘다.', '{u}의 통로걸침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 통로걸침을 중단한다.', '{u}의 통로걸침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0030', name:'되감는창', en:'Longspear Guard Feedback', scope:'class', cls:'CLS_C003',
    grade:4, rarity:3, tier:4, desc:'장창이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 뒤로 물러날 공간이 필요하다.', lore:'좁은 길목 전열 계약에서 되감는창을 반동 대응 용도로 쓴다. 뒤로 물러날 공간이 필요하다.',
    tags:['반동 대응', '창끝과 발판의 간격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0021'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 장창이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 되감는창이 필요한 위치에 닿지 않는다.', '{u}은(는) 되감는창을 멈추고 장창의 위치를 다시 잡는다.'], crit:['{u}은(는) 되감는창의 범위와 출력을 정확히 맞춘다.', '{u}의 되감는창이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장창의 상태가 맞지 않아 되감는창을 중단한다.', '{u}의 되감는창이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0031', name:'이음타격', en:'Mace Breaker Contact', scope:'class', cls:'CLS_C004',
    grade:2, rarity:1, tier:1, desc:'갑각의 이음에 철퇴를 내리친다. 헛치면 어깨로 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 이음타격을 공격 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['공격', '갑각의 접합부'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.35, kind2:'AK_MELEE', acc:-1,
    crit:1, cost:{stamina:12, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0032'], lines:{use:['{u}은(는) 철퇴의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 이음타격이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 이음타격을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 이음타격의 경로에서 몸을 뺀다.', '{u}의 철퇴가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 이음타격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 이음타격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 이음타격을 중단한다.', '{u}의 이음타격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', se:[{se:'SE_C012', turns:2, chance:0.6}]
  },
  {
    id:'SK_C0032', name:'철퇴걸기', en:'Mace Breaker Guard', scope:'class', cls:'CLS_C004',
    grade:1, rarity:1, tier:1, desc:'철퇴의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 철퇴걸기를 방어 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['방어', '갑각의 접합부'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0033'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철퇴의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철퇴걸기가 필요한 위치에 닿지 않는다.', '{u}은(는) 철퇴걸기를 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 철퇴걸기의 범위와 출력을 정확히 맞춘다.', '{u}의 철퇴걸기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 철퇴걸기를 중단한다.', '{u}의 철퇴걸기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0033', name:'방호깨기', en:'Mace Breaker Set', scope:'class', cls:'CLS_C004',
    grade:1, rarity:1, tier:1, desc:'철퇴로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 방호깨기를 틈 만들기 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['틈 만들기', '갑각의 접합부'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0034'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철퇴로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 방호깨기가 필요한 위치에 닿지 않는다.', '{u}은(는) 방호깨기를 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 방호깨기의 범위와 출력을 정확히 맞춘다.', '{u}의 방호깨기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 방호깨기를 중단한다.', '{u}의 방호깨기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0034', name:'무게실음', en:'Mace Breaker Step', scope:'class', cls:'CLS_C004',
    grade:2, rarity:1, tier:1, desc:'철퇴의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 무게실음을 이동 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['이동', '갑각의 접합부'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0035'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철퇴의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 무게실음이 필요한 위치에 닿지 않는다.', '{u}은(는) 무게실음을 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 무게실음의 범위와 출력을 정확히 맞춘다.', '{u}의 무게실음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 무게실음을 중단한다.', '{u}의 무게실음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0035', name:'금간소리', en:'Mace Breaker Reading', scope:'class', cls:'CLS_C004',
    grade:1, rarity:1, tier:1, desc:'갑각의 접합부를 살피며 손과 발의 변화를 읽는다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 금간소리를 거리 감지 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['거리 감지', '갑각의 접합부'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0036'], lines:{use:['{u}의 {s}이(가) 발동한다. 갑각의 접합부를 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 금간소리가 필요한 위치에 닿지 않는다.', '{u}은(는) 금간소리를 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 금간소리의 범위와 출력을 정확히 맞춘다.', '{u}의 금간소리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 금간소리를 중단한다.', '{u}의 금간소리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0036', name:'팔꿈치잠금', en:'Mace Breaker Discipline', scope:'class', cls:'CLS_C004',
    grade:1, rarity:1, tier:1, desc:'철퇴를 쥔 자세를 낮춰 반동을 나눠 받는다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 팔꿈치잠금을 자세 유지 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['자세 유지', '갑각의 접합부'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0037'], lines:{use:['{u}의 {s}이(가) 발동한다. 철퇴를 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 팔꿈치잠금이 필요한 위치에 닿지 않는다.', '{u}은(는) 팔꿈치잠금을 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 팔꿈치잠금의 범위와 출력을 정확히 맞춘다.', '{u}의 팔꿈치잠금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 팔꿈치잠금을 중단한다.', '{u}의 팔꿈치잠금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0037', name:'철퇴관성', en:'Mace Breaker Foundation', scope:'class', cls:'CLS_C004',
    grade:2, rarity:1, tier:1, desc:'철퇴의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 철퇴관성을 장비 적응 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['장비 적응', '갑각의 접합부'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0038'], lines:{use:['{u}의 {s}이(가) 발동한다. 철퇴의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 철퇴관성이 필요한 위치에 닿지 않는다.', '{u}은(는) 철퇴관성을 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 철퇴관성의 범위와 출력을 정확히 맞춘다.', '{u}의 철퇴관성이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 철퇴관성을 중단한다.', '{u}의 철퇴관성이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0038', name:'겹충격', en:'Mace Breaker Sequence', scope:'class', cls:'CLS_C004',
    grade:2, rarity:3, tier:2, desc:'철퇴의 회수 동작을 다음 타격으로 이어 두 차례 친다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 겹충격을 연계 공격 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['연계 공격', '갑각의 접합부'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:-1,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0039'], lines:{use:['{u}은(는) 철퇴의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 겹충격의 경로에서 몸을 뺀다.', '{u}의 철퇴가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹충격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹충격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 겹충격을 중단한다.', '{u}의 겹충격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0039', name:'낮은진동', en:'Mace Breaker Coverage', scope:'class', cls:'CLS_C004',
    grade:3, rarity:3, tier:3, desc:'철퇴로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 낮은진동을 퇴로 엄호 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['퇴로 엄호', '갑각의 접합부'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0040'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철퇴로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 낮은진동이 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은진동을 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은진동의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은진동이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 낮은진동을 중단한다.', '{u}의 낮은진동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0040', name:'충격분산', en:'Mace Breaker Feedback', scope:'class', cls:'CLS_C004',
    grade:4, rarity:3, tier:4, desc:'철퇴이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 헛치면 무게를 되받는다.', lore:'갑각 마수 파쇄 계약에서 충격분산을 반동 대응 용도로 쓴다. 헛치면 무게를 되받는다.',
    tags:['반동 대응', '갑각의 접합부'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0031'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철퇴이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 충격분산이 필요한 위치에 닿지 않는다.', '{u}은(는) 충격분산을 멈추고 철퇴의 위치를 다시 잡는다.'], crit:['{u}은(는) 충격분산의 범위와 출력을 정확히 맞춘다.', '{u}의 충격분산이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철퇴의 상태가 맞지 않아 충격분산을 중단한다.', '{u}의 충격분산이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0041', name:'턱밑치기', en:'Close Quarters Fighter Contact', scope:'class', cls:'CLS_C005',
    grade:2, rarity:1, tier:1, desc:'권갑으로 턱 아래를 짧게 올려 친다. 상대의 팔 안쪽까지 붙어야 한다.', lore:'장비 반입 제한 구역 경호에서 턱밑치기를 공격 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['공격', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:0.9, kind2:'AK_MELEE', acc:0,
    crit:1, cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'dash',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0042'], lines:{use:['{u}은(는) 권갑의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 턱밑치기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 턱밑치기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 턱밑치기의 경로에서 몸을 뺀다.', '{u}의 권갑이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 턱밑치기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 턱밑치기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 턱밑치기를 중단한다.', '{u}의 턱밑치기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', se:[{se:'SE_C007', turns:1, chance:0.5}]
  },
  {
    id:'SK_C0042', name:'팔목감기', en:'Close Quarters Fighter Guard', scope:'class', cls:'CLS_C005',
    grade:1, rarity:1, tier:1, desc:'권갑의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 팔목감기를 방어 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['방어', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0043'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 권갑의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 팔목감기가 필요한 위치에 닿지 않는다.', '{u}은(는) 팔목감기를 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 팔목감기의 범위와 출력을 정확히 맞춘다.', '{u}의 팔목감기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 팔목감기를 중단한다.', '{u}의 팔목감기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0043', name:'붙잡아열기', en:'Close Quarters Fighter Set', scope:'class', cls:'CLS_C005',
    grade:1, rarity:1, tier:1, desc:'권갑으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 붙잡아열기를 틈 만들기 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['틈 만들기', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0044'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 권갑으로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 붙잡아열기가 필요한 위치에 닿지 않는다.', '{u}은(는) 붙잡아열기를 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 붙잡아열기의 범위와 출력을 정확히 맞춘다.', '{u}의 붙잡아열기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 붙잡아열기를 중단한다.', '{u}의 붙잡아열기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0044', name:'골반돌림', en:'Close Quarters Fighter Step', scope:'class', cls:'CLS_C005',
    grade:2, rarity:1, tier:1, desc:'권갑의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 골반돌림을 이동 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['이동', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0045'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 권갑의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 골반돌림이 필요한 위치에 닿지 않는다.', '{u}은(는) 골반돌림을 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 골반돌림의 범위와 출력을 정확히 맞춘다.', '{u}의 골반돌림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 골반돌림을 중단한다.', '{u}의 골반돌림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0045', name:'무게중심눈', en:'Close Quarters Fighter Reading', scope:'class', cls:'CLS_C005',
    grade:1, rarity:1, tier:1, desc:'붙잡힌 팔과 몸의 축을 살피며 손과 발의 변화를 읽는다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 무게중심눈을 거리 감지 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['거리 감지', '붙잡힌 팔과 몸의 축'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0046'], lines:{use:['{u}의 {s}이(가) 발동한다. 붙잡힌 팔과 몸의 축을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 무게중심눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 무게중심눈을 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 무게중심눈의 범위와 출력을 정확히 맞춘다.', '{u}의 무게중심눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 무게중심눈을 중단한다.', '{u}의 무게중심눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0046', name:'벽등지기', en:'Close Quarters Fighter Discipline', scope:'class', cls:'CLS_C005',
    grade:1, rarity:1, tier:1, desc:'권갑을 쥔 자세를 낮춰 반동을 나눠 받는다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 벽등지기를 자세 유지 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['자세 유지', '붙잡힌 팔과 몸의 축'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0047'], lines:{use:['{u}의 {s}이(가) 발동한다. 권갑을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 벽등지기가 필요한 위치에 닿지 않는다.', '{u}은(는) 벽등지기를 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 벽등지기의 범위와 출력을 정확히 맞춘다.', '{u}의 벽등지기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 벽등지기를 중단한다.', '{u}의 벽등지기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0047', name:'권갑감각', en:'Close Quarters Fighter Foundation', scope:'class', cls:'CLS_C005',
    grade:2, rarity:1, tier:1, desc:'권갑의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 권갑감각을 장비 적응 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['장비 적응', '붙잡힌 팔과 몸의 축'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0048'], lines:{use:['{u}의 {s}이(가) 발동한다. 권갑의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 권갑감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 권갑감각을 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 권갑감각의 범위와 출력을 정확히 맞춘다.', '{u}의 권갑감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 권갑감각을 중단한다.', '{u}의 권갑감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0048', name:'짧은연격', en:'Close Quarters Fighter Sequence', scope:'class', cls:'CLS_C005',
    grade:2, rarity:3, tier:2, desc:'권갑의 회수 동작을 다음 타격으로 이어 두 차례 친다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 짧은연격을 연계 공격 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['연계 공격', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:0,
    crit:-1, cost:{stamina:18, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0049'], lines:{use:['{u}은(는) 권갑의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 짧은연격의 경로에서 몸을 뺀다.', '{u}의 권갑이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 짧은연격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 짧은연격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 짧은연격을 중단한다.', '{u}의 짧은연격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0049', name:'몸통밀기', en:'Close Quarters Fighter Coverage', scope:'class', cls:'CLS_C005',
    grade:3, rarity:3, tier:3, desc:'권갑으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 몸통밀기를 퇴로 엄호 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['퇴로 엄호', '붙잡힌 팔과 몸의 축'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0050'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 권갑으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 몸통밀기가 필요한 위치에 닿지 않는다.', '{u}은(는) 몸통밀기를 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 몸통밀기의 범위와 출력을 정확히 맞춘다.', '{u}의 몸통밀기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 몸통밀기를 중단한다.', '{u}의 몸통밀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0050', name:'낙상분산', en:'Close Quarters Fighter Feedback', scope:'class', cls:'CLS_C005',
    grade:4, rarity:3, tier:4, desc:'권갑이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 붙어야 하므로 부상 위험이 크다.', lore:'장비 반입 제한 구역 경호에서 낙상분산을 반동 대응 용도로 쓴다. 붙어야 하므로 부상 위험이 크다.',
    tags:['반동 대응', '붙잡힌 팔과 몸의 축'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0041'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 권갑이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낙상분산이 필요한 위치에 닿지 않는다.', '{u}은(는) 낙상분산을 멈추고 권갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙상분산의 범위와 출력을 정확히 맞춘다.', '{u}의 낙상분산이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 권갑의 상태가 맞지 않아 낙상분산을 중단한다.', '{u}의 낙상분산이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0051', name:'도끼찍기', en:'Field Axeman Contact', scope:'class', cls:'CLS_C006',
    grade:2, rarity:1, tier:1, desc:'한손도끼의 끝으로 노출된 부위를 짧게 친다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 도끼찍기를 공격 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['공격', '걸린 날과 당기는 힘'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:1,
    crit:1, cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'dash',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0052'], lines:{use:['{u}은(는) 한손도끼의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 도끼찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 도끼찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 도끼찍기의 경로에서 몸을 뺀다.', '{u}의 한손도끼가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 도끼찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 도끼찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 도끼찍기를 중단한다.', '{u}의 도끼찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0052', name:'자루가림', en:'Field Axeman Guard', scope:'class', cls:'CLS_C006',
    grade:1, rarity:1, tier:1, desc:'한손도끼의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 자루가림을 방어 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['방어', '걸린 날과 당기는 힘'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0053'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 한손도끼의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 자루가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 자루가림을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 자루가림의 범위와 출력을 정확히 맞춘다.', '{u}의 자루가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 자루가림을 중단한다.', '{u}의 자루가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0053', name:'날걸어당김', en:'Field Axeman Set', scope:'class', cls:'CLS_C006',
    grade:1, rarity:1, tier:1, desc:'도끼날을 외피에 걸어 짧게 당긴다. 날이 깊이 박히면 회수가 늦어진다.', lore:'밀집 수풀 돌파 계약에서 날걸어당김을 틈 만들기 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['틈 만들기', '걸린 날과 당기는 힘'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C012', turns:2, chance:0.7}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0054'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 도끼날을 외피에 걸어 짧게 당긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 날걸어당김이 필요한 위치에 닿지 않는다.', '{u}은(는) 날걸어당김을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 날걸어당김의 범위와 출력을 정확히 맞춘다.', '{u}의 날걸어당김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 날걸어당김을 중단한다.', '{u}의 날걸어당김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', move:'pull'
  },
  {
    id:'SK_C0054', name:'비껴내딛기', en:'Field Axeman Step', scope:'class', cls:'CLS_C006',
    grade:2, rarity:1, tier:1, desc:'한손도끼의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 비껴내딛기를 이동 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['이동', '걸린 날과 당기는 힘'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0055'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 한손도끼의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 비껴내딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 비껴내딛기를 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 비껴내딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 비껴내딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 비껴내딛기를 중단한다.', '{u}의 비껴내딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0055', name:'날깊이눈', en:'Field Axeman Reading', scope:'class', cls:'CLS_C006',
    grade:1, rarity:1, tier:1, desc:'걸린 날과 당기는 힘을 살피며 손과 발의 변화를 읽는다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 날깊이눈을 거리 감지 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['거리 감지', '걸린 날과 당기는 힘'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0056'], lines:{use:['{u}의 {s}이(가) 발동한다. 걸린 날과 당기는 힘을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 날깊이눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 날깊이눈을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 날깊이눈의 범위와 출력을 정확히 맞춘다.', '{u}의 날깊이눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 날깊이눈을 중단한다.', '{u}의 날깊이눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0056', name:'낮은파지', en:'Field Axeman Discipline', scope:'class', cls:'CLS_C006',
    grade:1, rarity:1, tier:1, desc:'한손도끼를 쥔 자세를 낮춰 반동을 나눠 받는다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 낮은파지를 자세 유지 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['자세 유지', '걸린 날과 당기는 힘'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0057'], lines:{use:['{u}의 {s}이(가) 발동한다. 한손도끼를 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낮은파지가 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은파지를 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은파지의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은파지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 낮은파지를 중단한다.', '{u}의 낮은파지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0057', name:'날무게감', en:'Field Axeman Foundation', scope:'class', cls:'CLS_C006',
    grade:2, rarity:1, tier:1, desc:'한손도끼의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 날무게감을 장비 적응 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['장비 적응', '걸린 날과 당기는 힘'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0058'], lines:{use:['{u}의 {s}이(가) 발동한다. 한손도끼의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 날무게감이 필요한 위치에 닿지 않는다.', '{u}은(는) 날무게감을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 날무게감의 범위와 출력을 정확히 맞춘다.', '{u}의 날무게감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 날무게감을 중단한다.', '{u}의 날무게감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0058', name:'갈고리연타', en:'Field Axeman Sequence', scope:'class', cls:'CLS_C006',
    grade:2, rarity:3, tier:2, desc:'한손도끼의 회수 동작을 다음 타격으로 이어 두 차례 친다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 갈고리연타를 연계 공격 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['연계 공격', '걸린 날과 당기는 힘'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:1,
    crit:-1, cost:{stamina:19, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0059'], lines:{use:['{u}은(는) 한손도끼의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 갈고리연타의 경로에서 몸을 뺀다.', '{u}의 한손도끼가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈고리연타가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈고리연타의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 갈고리연타를 중단한다.', '{u}의 갈고리연타가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0059', name:'막힌길벌림', en:'Field Axeman Coverage', scope:'class', cls:'CLS_C006',
    grade:3, rarity:3, tier:3, desc:'한손도끼로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 막힌길벌림을 퇴로 엄호 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['퇴로 엄호', '걸린 날과 당기는 힘'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0060'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 한손도끼로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 막힌길벌림이 필요한 위치에 닿지 않는다.', '{u}은(는) 막힌길벌림을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 막힌길벌림의 범위와 출력을 정확히 맞춘다.', '{u}의 막힌길벌림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 막힌길벌림을 중단한다.', '{u}의 막힌길벌림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0060', name:'회수탄력', en:'Field Axeman Feedback', scope:'class', cls:'CLS_C006',
    grade:4, rarity:3, tier:4, desc:'한손도끼이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 날을 빼는 동안 손이 묶인다.', lore:'밀집 수풀 돌파 계약에서 회수탄력을 반동 대응 용도로 쓴다. 날을 빼는 동안 손이 묶인다.',
    tags:['반동 대응', '걸린 날과 당기는 힘'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0051'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 한손도끼이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회수탄력이 필요한 위치에 닿지 않는다.', '{u}은(는) 회수탄력을 멈추고 한손도끼의 위치를 다시 잡는다.'], crit:['{u}은(는) 회수탄력의 범위와 출력을 정확히 맞춘다.', '{u}의 회수탄력이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 한손도끼의 상태가 맞지 않아 회수탄력을 중단한다.', '{u}의 회수탄력이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0061', name:'견제긁기', en:'Escort Guard Contact', scope:'class', cls:'CLS_C007',
    grade:2, rarity:1, tier:1, desc:'단검과소형방패의 끝으로 노출된 부위를 짧게 친다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 견제긁기를 공격 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['공격', '보호 대상과의 거리'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:-1,
    crit:1, cost:{stamina:11, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'push',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0062'], lines:{use:['{u}은(는) 단검과소형방패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 견제긁기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 견제긁기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 견제긁기의 경로에서 몸을 뺀다.', '{u}의 단검과소형방패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 견제긁기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 견제긁기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 견제긁기를 중단한다.', '{u}의 견제긁기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0062', name:'곁방패', en:'Escort Guard Guard', scope:'class', cls:'CLS_C007',
    grade:1, rarity:1, tier:1, desc:'단검과소형방패의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 곁방패를 방어 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['방어', '보호 대상과의 거리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0063'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단검과소형방패의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 곁방패가 필요한 위치에 닿지 않는다.', '{u}은(는) 곁방패를 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 곁방패의 범위와 출력을 정확히 맞춘다.', '{u}의 곁방패가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 곁방패를 중단한다.', '{u}의 곁방패가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0063', name:'호위신호', en:'Escort Guard Set', scope:'class', cls:'CLS_C007',
    grade:1, rarity:1, tier:1, desc:'방패와 단검 사이로 동료가 지나갈 간격을 만든다. 보호 대상과 멀어지면 효과가 끊긴다.', lore:'비전투 인력 현장 호위에서 호위신호를 틈 만들기 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['틈 만들기', '보호 대상과의 거리'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C013', chance:1, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0064'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 방패와 단검 사이로 동료가 지나갈 간격을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 호위신호가 필요한 위치에 닿지 않는다.', '{u}은(는) 호위신호를 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 호위신호의 범위와 출력을 정확히 맞춘다.', '{u}의 호위신호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 호위신호를 중단한다.', '{u}의 호위신호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.12, turns:2}
  },
  {
    id:'SK_C0064', name:'끼어딛기', en:'Escort Guard Step', scope:'class', cls:'CLS_C007',
    grade:2, rarity:1, tier:1, desc:'단검과소형방패의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 끼어딛기를 이동 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['이동', '보호 대상과의 거리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0065'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단검과소형방패의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 끼어딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 끼어딛기를 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 끼어딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 끼어딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 끼어딛기를 중단한다.', '{u}의 끼어딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0065', name:'등뒤경계', en:'Escort Guard Reading', scope:'class', cls:'CLS_C007',
    grade:1, rarity:1, tier:1, desc:'보호 대상과의 거리를 살피며 손과 발의 변화를 읽는다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 등뒤경계를 거리 감지 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['거리 감지', '보호 대상과의 거리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0066'], lines:{use:['{u}의 {s}이(가) 발동한다. 보호 대상과의 거리를 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 등뒤경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 등뒤경계를 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 등뒤경계의 범위와 출력을 정확히 맞춘다.', '{u}의 등뒤경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 등뒤경계를 중단한다.', '{u}의 등뒤경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0066', name:'호위간격', en:'Escort Guard Discipline', scope:'class', cls:'CLS_C007',
    grade:1, rarity:1, tier:1, desc:'단검과소형방패를 쥔 자세를 낮춰 반동을 나눠 받는다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 호위간격을 자세 유지 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['자세 유지', '보호 대상과의 거리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0067'], lines:{use:['{u}의 {s}이(가) 발동한다. 단검과소형방패를 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 호위간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 호위간격을 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 호위간격의 범위와 출력을 정확히 맞춘다.', '{u}의 호위간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 호위간격을 중단한다.', '{u}의 호위간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0067', name:'동행걸음', en:'Escort Guard Foundation', scope:'class', cls:'CLS_C007',
    grade:2, rarity:1, tier:1, desc:'단검과소형방패의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 동행걸음을 장비 적응 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['장비 적응', '보호 대상과의 거리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0068'], lines:{use:['{u}의 {s}이(가) 발동한다. 단검과소형방패의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 동행걸음이 필요한 위치에 닿지 않는다.', '{u}은(는) 동행걸음을 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 동행걸음의 범위와 출력을 정확히 맞춘다.', '{u}의 동행걸음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 동행걸음을 중단한다.', '{u}의 동행걸음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0068', name:'돌진끊기', en:'Escort Guard Sequence', scope:'class', cls:'CLS_C007',
    grade:2, rarity:3, tier:2, desc:'단검과소형방패의 회수 동작을 다음 타격으로 이어 두 차례 친다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 돌진끊기를 연계 공격 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['연계 공격', '보호 대상과의 거리'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:-1,
    crit:-1, cost:{stamina:20, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0069'], lines:{use:['{u}은(는) 단검과소형방패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 돌진끊기의 경로에서 몸을 뺀다.', '{u}의 단검과소형방패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 돌진끊기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 돌진끊기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 돌진끊기를 중단한다.', '{u}의 돌진끊기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0069', name:'엄호통과', en:'Escort Guard Coverage', scope:'class', cls:'CLS_C007',
    grade:3, rarity:3, tier:3, desc:'단검과소형방패로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 엄호통과를 퇴로 엄호 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['퇴로 엄호', '보호 대상과의 거리'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0070'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단검과소형방패로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 엄호통과가 필요한 위치에 닿지 않는다.', '{u}은(는) 엄호통과를 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 엄호통과의 범위와 출력을 정확히 맞춘다.', '{u}의 엄호통과가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 엄호통과를 중단한다.', '{u}의 엄호통과가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0070', name:'위협전환', en:'Escort Guard Feedback', scope:'class', cls:'CLS_C007',
    grade:4, rarity:3, tier:4, desc:'단검과소형방패이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 혼자 앞서가면 보호가 끊긴다.', lore:'비전투 인력 현장 호위에서 위협전환을 반동 대응 용도로 쓴다. 혼자 앞서가면 보호가 끊긴다.',
    tags:['반동 대응', '보호 대상과의 거리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0061'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 단검과소형방패이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 위협전환이 필요한 위치에 닿지 않는다.', '{u}은(는) 위협전환을 멈추고 단검과소형방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 위협전환의 범위와 출력을 정확히 맞춘다.', '{u}의 위협전환이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단검과소형방패의 상태가 맞지 않아 위협전환을 중단한다.', '{u}의 위협전환이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0071', name:'봉끝찌름', en:'Staff Handler Contact', scope:'class', cls:'CLS_C008',
    grade:2, rarity:1, tier:1, desc:'장봉의 끝으로 노출된 부위를 짧게 친다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 봉끝찌름을 공격 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['공격', '장봉의 회전 반경'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:0,
    crit:1, cost:{stamina:12, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'pull',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0072'], lines:{use:['{u}은(는) 장봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 봉끝찌름이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 봉끝찌름을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 봉끝찌름의 경로에서 몸을 뺀다.', '{u}의 장봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 봉끝찌름이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 봉끝찌름의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 봉끝찌름을 중단한다.', '{u}의 봉끝찌름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0072', name:'봉대튕김', en:'Staff Handler Guard', scope:'class', cls:'CLS_C008',
    grade:1, rarity:1, tier:1, desc:'장봉의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 봉대튕김을 방어 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['방어', '장봉의 회전 반경'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0073'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장봉의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 봉대튕김이 필요한 위치에 닿지 않는다.', '{u}은(는) 봉대튕김을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉대튕김의 범위와 출력을 정확히 맞춘다.', '{u}의 봉대튕김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 봉대튕김을 중단한다.', '{u}의 봉대튕김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0073', name:'발목걸침', en:'Staff Handler Set', scope:'class', cls:'CLS_C008',
    grade:1, rarity:1, tier:1, desc:'장봉을 적의 발목 앞에 걸어 다음 보폭을 끊는다. 체격 차이가 크면 버티기 어렵다.', lore:'포획조 비살상 보조에서 발목걸침을 틈 만들기 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['틈 만들기', '장봉의 회전 반경'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C006', turns:2, chance:0.8}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0074'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장봉을 적의 발목 앞에 걸어 다음 보폭을 끊는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발목걸침이 필요한 위치에 닿지 않는다.', '{u}은(는) 발목걸침을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 발목걸침의 범위와 출력을 정확히 맞춘다.', '{u}의 발목걸침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 발목걸침을 중단한다.', '{u}의 발목걸침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0074', name:'장봉도약', en:'Staff Handler Step', scope:'class', cls:'CLS_C008',
    grade:2, rarity:1, tier:1, desc:'장봉의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 장봉도약을 이동 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['이동', '장봉의 회전 반경'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0075'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장봉의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 장봉도약이 필요한 위치에 닿지 않는다.', '{u}은(는) 장봉도약을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 장봉도약의 범위와 출력을 정확히 맞춘다.', '{u}의 장봉도약이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 장봉도약을 중단한다.', '{u}의 장봉도약이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0075', name:'반경가늠', en:'Staff Handler Reading', scope:'class', cls:'CLS_C008',
    grade:1, rarity:1, tier:1, desc:'장봉의 회전 반경을 살피며 손과 발의 변화를 읽는다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 반경가늠을 거리 감지 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['거리 감지', '장봉의 회전 반경'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0076'], lines:{use:['{u}의 {s}이(가) 발동한다. 장봉의 회전 반경을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반경가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 반경가늠을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 반경가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 반경가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 반경가늠을 중단한다.', '{u}의 반경가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0076', name:'양끝경계', en:'Staff Handler Discipline', scope:'class', cls:'CLS_C008',
    grade:1, rarity:1, tier:1, desc:'장봉을 쥔 자세를 낮춰 반동을 나눠 받는다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 양끝경계를 자세 유지 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['자세 유지', '장봉의 회전 반경'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0077'], lines:{use:['{u}의 {s}이(가) 발동한다. 장봉을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 양끝경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 양끝경계를 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 양끝경계의 범위와 출력을 정확히 맞춘다.', '{u}의 양끝경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 양끝경계를 중단한다.', '{u}의 양끝경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0077', name:'봉축유지', en:'Staff Handler Foundation', scope:'class', cls:'CLS_C008',
    grade:2, rarity:1, tier:1, desc:'장봉의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 봉축유지를 장비 적응 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['장비 적응', '장봉의 회전 반경'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0078'], lines:{use:['{u}의 {s}이(가) 발동한다. 장봉의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 봉축유지가 필요한 위치에 닿지 않는다.', '{u}은(는) 봉축유지를 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉축유지의 범위와 출력을 정확히 맞춘다.', '{u}의 봉축유지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 봉축유지를 중단한다.', '{u}의 봉축유지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0078', name:'반원쓸기', en:'Staff Handler Sequence', scope:'class', cls:'CLS_C008',
    grade:2, rarity:3, tier:2, desc:'장봉의 회수 동작을 다음 타격으로 이어 두 차례 친다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 반원쓸기를 연계 공격 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['연계 공격', '장봉의 회전 반경'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:0,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0079'], lines:{use:['{u}은(는) 장봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 반원쓸기의 경로에서 몸을 뺀다.', '{u}의 장봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 반원쓸기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 반원쓸기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 반원쓸기를 중단한다.', '{u}의 반원쓸기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0079', name:'봉벽세움', en:'Staff Handler Coverage', scope:'class', cls:'CLS_C008',
    grade:3, rarity:3, tier:3, desc:'장봉으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 봉벽세움을 퇴로 엄호 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['퇴로 엄호', '장봉의 회전 반경'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0080'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장봉으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 봉벽세움이 필요한 위치에 닿지 않는다.', '{u}은(는) 봉벽세움을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉벽세움의 범위와 출력을 정확히 맞춘다.', '{u}의 봉벽세움이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 봉벽세움을 중단한다.', '{u}의 봉벽세움이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0080', name:'받아돌림', en:'Staff Handler Feedback', scope:'class', cls:'CLS_C008',
    grade:4, rarity:3, tier:4, desc:'장봉이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 천장이 낮으면 회전이 막힌다.', lore:'포획조 비살상 보조에서 받아돌림을 반동 대응 용도로 쓴다. 천장이 낮으면 회전이 막힌다.',
    tags:['반동 대응', '장봉의 회전 반경'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0071'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 장봉이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 받아돌림이 필요한 위치에 닿지 않는다.', '{u}은(는) 받아돌림을 멈추고 장봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 받아돌림의 범위와 출력을 정확히 맞춘다.', '{u}의 받아돌림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장봉의 상태가 맞지 않아 받아돌림을 중단한다.', '{u}의 받아돌림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0081', name:'틈새긋기', en:'Knife Specialist Contact', scope:'class', cls:'CLS_C009',
    grade:2, rarity:1, tier:1, desc:'단도의 끝으로 노출된 부위를 짧게 친다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 틈새긋기를 공격 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['공격', '가죽 사이의 좁은 틈'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:1,
    crit:1, cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'dash',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0082'], lines:{use:['{u}은(는) 단도의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 틈새긋기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 틈새긋기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 틈새긋기의 경로에서 몸을 뺀다.', '{u}의 단도가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 틈새긋기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 틈새긋기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 틈새긋기를 중단한다.', '{u}의 틈새긋기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0082', name:'칼자루막기', en:'Knife Specialist Guard', scope:'class', cls:'CLS_C009',
    grade:1, rarity:1, tier:1, desc:'단도의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 칼자루막기를 방어 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['방어', '가죽 사이의 좁은 틈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0083'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단도의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 칼자루막기가 필요한 위치에 닿지 않는다.', '{u}은(는) 칼자루막기를 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 칼자루막기의 범위와 출력을 정확히 맞춘다.', '{u}의 칼자루막기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 칼자루막기를 중단한다.', '{u}의 칼자루막기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0083', name:'끈절단', en:'Knife Specialist Set', scope:'class', cls:'CLS_C009',
    grade:1, rarity:1, tier:1, desc:'동료를 묶은 줄을 잘라 움직일 틈을 만든다. 단단한 금속 구속은 끊지 못한다.', lore:'대형 마수 근접 보조에서 끈절단을 틈 만들기 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['틈 만들기', '가죽 사이의 좁은 틈'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0084'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료를 묶은 줄을 잘라 움직일 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 끈절단이 필요한 위치에 닿지 않는다.', '{u}은(는) 끈절단을 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 끈절단의 범위와 출력을 정확히 맞춘다.', '{u}의 끈절단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 끈절단을 중단한다.', '{u}의 끈절단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', cleanse:['SE_C006']
  },
  {
    id:'SK_C0084', name:'그늘딛기', en:'Knife Specialist Step', scope:'class', cls:'CLS_C009',
    grade:2, rarity:1, tier:1, desc:'단도의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 그늘딛기를 이동 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['이동', '가죽 사이의 좁은 틈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0085'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단도의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 그늘딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 그늘딛기를 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 그늘딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 그늘딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 그늘딛기를 중단한다.', '{u}의 그늘딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0085', name:'힘줄가늠', en:'Knife Specialist Reading', scope:'class', cls:'CLS_C009',
    grade:1, rarity:1, tier:1, desc:'가죽 사이의 좁은 틈을 살피며 손과 발의 변화를 읽는다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 힘줄가늠을 거리 감지 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['거리 감지', '가죽 사이의 좁은 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0086'], lines:{use:['{u}의 {s}이(가) 발동한다. 가죽 사이의 좁은 틈을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 힘줄가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 힘줄가늠을 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 힘줄가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 힘줄가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 힘줄가늠을 중단한다.', '{u}의 힘줄가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0086', name:'낮은자세', en:'Knife Specialist Discipline', scope:'class', cls:'CLS_C009',
    grade:1, rarity:1, tier:1, desc:'단도를 쥔 자세를 낮춰 반동을 나눠 받는다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 낮은자세를 자세 유지 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['자세 유지', '가죽 사이의 좁은 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0087'], lines:{use:['{u}의 {s}이(가) 발동한다. 단도를 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낮은자세가 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은자세를 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은자세의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은자세가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 낮은자세를 중단한다.', '{u}의 낮은자세가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0087', name:'단도밀착', en:'Knife Specialist Foundation', scope:'class', cls:'CLS_C009',
    grade:2, rarity:1, tier:1, desc:'단도의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 단도밀착을 장비 적응 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['장비 적응', '가죽 사이의 좁은 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0088'], lines:{use:['{u}의 {s}이(가) 발동한다. 단도의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 단도밀착이 필요한 위치에 닿지 않는다.', '{u}은(는) 단도밀착을 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 단도밀착의 범위와 출력을 정확히 맞춘다.', '{u}의 단도밀착이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 단도밀착을 중단한다.', '{u}의 단도밀착이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0088', name:'겹선절개', en:'Knife Specialist Sequence', scope:'class', cls:'CLS_C009',
    grade:2, rarity:3, tier:2, desc:'단도의 회수 동작을 다음 타격으로 이어 두 차례 친다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 겹선절개를 연계 공격 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['연계 공격', '가죽 사이의 좁은 틈'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:1,
    crit:-1, cost:{stamina:18, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0089'], lines:{use:['{u}은(는) 단도의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 겹선절개의 경로에서 몸을 뺀다.', '{u}의 단도가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹선절개가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹선절개의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 겹선절개를 중단한다.', '{u}의 겹선절개가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0089', name:'붙은손풀기', en:'Knife Specialist Coverage', scope:'class', cls:'CLS_C009',
    grade:3, rarity:3, tier:3, desc:'단도로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 붙은손풀기를 퇴로 엄호 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['퇴로 엄호', '가죽 사이의 좁은 틈'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0090'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단도로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 붙은손풀기가 필요한 위치에 닿지 않는다.', '{u}은(는) 붙은손풀기를 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 붙은손풀기의 범위와 출력을 정확히 맞춘다.', '{u}의 붙은손풀기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 붙은손풀기를 중단한다.', '{u}의 붙은손풀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0090', name:'위험접촉감', en:'Knife Specialist Feedback', scope:'class', cls:'CLS_C009',
    grade:4, rarity:3, tier:4, desc:'단도이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 정면에서 긴 무기에 밀린다.', lore:'대형 마수 근접 보조에서 위험접촉감을 반동 대응 용도로 쓴다. 정면에서 긴 무기에 밀린다.',
    tags:['반동 대응', '가죽 사이의 좁은 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0081'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 단도이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 위험접촉감이 필요한 위치에 닿지 않는다.', '{u}은(는) 위험접촉감을 멈추고 단도의 위치를 다시 잡는다.'], crit:['{u}은(는) 위험접촉감의 범위와 출력을 정확히 맞춘다.', '{u}의 위험접촉감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단도의 상태가 맞지 않아 위험접촉감을 중단한다.', '{u}의 위험접촉감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0091', name:'추끝치기', en:'Flail Handler Contact', scope:'class', cls:'CLS_C010',
    grade:2, rarity:1, tier:1, desc:'편곤의 끝으로 노출된 부위를 짧게 친다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 추끝치기를 공격 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['공격', '사슬 끝 추의 궤도'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:-1,
    crit:1, cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'push',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0092'], lines:{use:['{u}은(는) 편곤의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 추끝치기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 추끝치기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 추끝치기의 경로에서 몸을 뺀다.', '{u}의 편곤이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 추끝치기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 추끝치기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 추끝치기를 중단한다.', '{u}의 추끝치기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0092', name:'사슬걸침', en:'Flail Handler Guard', scope:'class', cls:'CLS_C010',
    grade:1, rarity:1, tier:1, desc:'편곤의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 사슬걸침을 방어 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['방어', '사슬 끝 추의 궤도'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0093'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 편곤의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사슬걸침이 필요한 위치에 닿지 않는다.', '{u}은(는) 사슬걸침을 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 사슬걸침의 범위와 출력을 정확히 맞춘다.', '{u}의 사슬걸침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 사슬걸침을 중단한다.', '{u}의 사슬걸침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0093', name:'무기휘감기', en:'Flail Handler Set', scope:'class', cls:'CLS_C010',
    grade:1, rarity:1, tier:1, desc:'편곤의 사슬로 적의 무기를 잠깐 감는다. 사슬이 끊기면 추의 궤도가 흐트러진다.', lore:'단단한 외피 개체 견제에서 무기휘감기를 틈 만들기 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['틈 만들기', '사슬 끝 추의 궤도'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.7, turns:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0094'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 편곤의 사슬로 적의 무기를 잠깐 감는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 무기휘감기가 필요한 위치에 닿지 않는다.', '{u}은(는) 무기휘감기를 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 무기휘감기의 범위와 출력을 정확히 맞춘다.', '{u}의 무기휘감기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 무기휘감기를 중단한다.', '{u}의 무기휘감기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0094', name:'추따라회전', en:'Flail Handler Step', scope:'class', cls:'CLS_C010',
    grade:2, rarity:1, tier:1, desc:'편곤의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 추따라회전을 이동 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['이동', '사슬 끝 추의 궤도'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0095'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 편곤의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 추따라회전이 필요한 위치에 닿지 않는다.', '{u}은(는) 추따라회전을 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 추따라회전의 범위와 출력을 정확히 맞춘다.', '{u}의 추따라회전이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 추따라회전을 중단한다.', '{u}의 추따라회전이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0095', name:'궤도경계', en:'Flail Handler Reading', scope:'class', cls:'CLS_C010',
    grade:1, rarity:1, tier:1, desc:'사슬 끝 추의 궤도를 살피며 손과 발의 변화를 읽는다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 궤도경계를 거리 감지 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['거리 감지', '사슬 끝 추의 궤도'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0096'], lines:{use:['{u}의 {s}이(가) 발동한다. 사슬 끝 추의 궤도를 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 궤도경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 궤도경계를 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 궤도경계의 범위와 출력을 정확히 맞춘다.', '{u}의 궤도경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 궤도경계를 중단한다.', '{u}의 궤도경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0096', name:'회전여유', en:'Flail Handler Discipline', scope:'class', cls:'CLS_C010',
    grade:1, rarity:1, tier:1, desc:'편곤을 쥔 자세를 낮춰 반동을 나눠 받는다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 회전여유를 자세 유지 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['자세 유지', '사슬 끝 추의 궤도'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0097'], lines:{use:['{u}의 {s}이(가) 발동한다. 편곤을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회전여유가 필요한 위치에 닿지 않는다.', '{u}은(는) 회전여유를 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전여유의 범위와 출력을 정확히 맞춘다.', '{u}의 회전여유가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 회전여유를 중단한다.', '{u}의 회전여유가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0097', name:'사슬장력', en:'Flail Handler Foundation', scope:'class', cls:'CLS_C010',
    grade:2, rarity:1, tier:1, desc:'편곤의 사슬에 걸리는 힘을 손으로 구별한다. 추의 회전 반경 안에는 동료가 들어오지 않아야 한다.', lore:'단단한 외피 개체 견제에서 사슬장력을 장비 적응 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['장비 적응', '사슬 끝 추의 궤도'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0098'], lines:{use:['{u}의 {s}이(가) 발동한다. 편곤의 사슬에 걸리는 힘을 손으로 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 사슬장력이 필요한 위치에 닿지 않는다.', '{u}은(는) 사슬장력을 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 사슬장력의 범위와 출력을 정확히 맞춘다.', '{u}의 사슬장력이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 사슬장력을 중단한다.', '{u}의 사슬장력이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0098', name:'꺾인궤적', en:'Flail Handler Sequence', scope:'class', cls:'CLS_C010',
    grade:2, rarity:3, tier:2, desc:'벽면 옆으로 추를 휘어 방호면 뒤를 두 차례 노린다. 아군이 가까이 있으면 멈춘다.', lore:'단단한 외피 개체 견제에서 꺾인궤적을 연계 공격 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['연계 공격', '사슬 끝 추의 궤도'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:2, count:1, power:0.7, kind2:'AK_MELEE', acc:-1,
    crit:-1, cost:{stamina:19, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0099'], lines:{use:['{u}은(는) 편곤의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 꺾인궤적의 경로에서 몸을 뺀다.', '{u}의 편곤이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 꺾인궤적이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 꺾인궤적의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 꺾인궤적을 중단한다.', '{u}의 꺾인궤적이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0099', name:'사슬울타리', en:'Flail Handler Coverage', scope:'class', cls:'CLS_C010',
    grade:3, rarity:3, tier:3, desc:'편곤으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 사슬울타리를 퇴로 엄호 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['퇴로 엄호', '사슬 끝 추의 궤도'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0100'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 편곤으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사슬울타리가 필요한 위치에 닿지 않는다.', '{u}은(는) 사슬울타리를 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 사슬울타리의 범위와 출력을 정확히 맞춘다.', '{u}의 사슬울타리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 사슬울타리를 중단한다.', '{u}의 사슬울타리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0100', name:'반동받음', en:'Flail Handler Feedback', scope:'class', cls:'CLS_C010',
    grade:4, rarity:3, tier:4, desc:'편곤이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 아군과 간격을 벌려야 한다.', lore:'단단한 외피 개체 견제에서 반동받음을 반동 대응 용도로 쓴다. 아군과 간격을 벌려야 한다.',
    tags:['반동 대응', '사슬 끝 추의 궤도'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0091'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 편곤이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반동받음이 필요한 위치에 닿지 않는다.', '{u}은(는) 반동받음을 멈추고 편곤의 위치를 다시 잡는다.'], crit:['{u}은(는) 반동받음의 범위와 출력을 정확히 맞춘다.', '{u}의 반동받음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 편곤의 상태가 맞지 않아 반동받음을 중단한다.', '{u}의 반동받음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0101', name:'앞끝박기', en:'Breach Vanguard Contact', scope:'class', cls:'CLS_C011',
    grade:2, rarity:2, tier:1, desc:'단창과방패의 끝으로 노출된 부위를 짧게 친다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 앞끝박기를 공격 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['공격', '전진할 때 생기는 틈'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:0,
    crit:1, cost:{stamina:11, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'pull',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0102'], lines:{use:['{u}은(는) 단창과방패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 앞끝박기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 앞끝박기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 앞끝박기의 경로에서 몸을 뺀다.', '{u}의 단창과방패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 앞끝박기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 앞끝박기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 앞끝박기를 중단한다.', '{u}의 앞끝박기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0102', name:'전면잠금', en:'Breach Vanguard Guard', scope:'class', cls:'CLS_C011',
    grade:1, rarity:2, tier:1, desc:'단창과방패의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 전면잠금을 방어 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['방어', '전진할 때 생기는 틈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0103'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단창과방패의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 전면잠금이 필요한 위치에 닿지 않는다.', '{u}은(는) 전면잠금을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 전면잠금의 범위와 출력을 정확히 맞춘다.', '{u}의 전면잠금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 전면잠금을 중단한다.', '{u}의 전면잠금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0103', name:'대열밀기', en:'Breach Vanguard Set', scope:'class', cls:'CLS_C011',
    grade:1, rarity:2, tier:1, desc:'단창과방패로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 대열밀기를 틈 만들기 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['틈 만들기', '전진할 때 생기는 틈'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C007', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0104'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단창과방패로 상대의 움직임을 걸어 동료가 통과할 틈을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열밀기가 필요한 위치에 닿지 않는다.', '{u}은(는) 대열밀기를 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열밀기의 범위와 출력을 정확히 맞춘다.', '{u}의 대열밀기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 대열밀기를 중단한다.', '{u}의 대열밀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0104', name:'방패보폭', en:'Breach Vanguard Step', scope:'class', cls:'CLS_C011',
    grade:2, rarity:2, tier:1, desc:'단창과방패의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 방패보폭을 이동 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['이동', '전진할 때 생기는 틈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0105'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단창과방패의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 방패보폭이 필요한 위치에 닿지 않는다.', '{u}은(는) 방패보폭을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 방패보폭의 범위와 출력을 정확히 맞춘다.', '{u}의 방패보폭이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 방패보폭을 중단한다.', '{u}의 방패보폭이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0105', name:'돌파선눈', en:'Breach Vanguard Reading', scope:'class', cls:'CLS_C011',
    grade:1, rarity:2, tier:1, desc:'전진할 때 생기는 틈을 살피며 손과 발의 변화를 읽는다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 돌파선눈을 거리 감지 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['거리 감지', '전진할 때 생기는 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0106'], lines:{use:['{u}의 {s}이(가) 발동한다. 전진할 때 생기는 틈을 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 돌파선눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 돌파선눈을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 돌파선눈의 범위와 출력을 정확히 맞춘다.', '{u}의 돌파선눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 돌파선눈을 중단한다.', '{u}의 돌파선눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0106', name:'전진호흡', en:'Breach Vanguard Discipline', scope:'class', cls:'CLS_C011',
    grade:1, rarity:2, tier:1, desc:'단창과방패를 쥔 자세를 낮춰 반동을 나눠 받는다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 전진호흡을 자세 유지 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['자세 유지', '전진할 때 생기는 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0107'], lines:{use:['{u}의 {s}이(가) 발동한다. 단창과방패를 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 전진호흡이 필요한 위치에 닿지 않는다.', '{u}은(는) 전진호흡을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 전진호흡의 범위와 출력을 정확히 맞춘다.', '{u}의 전진호흡이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 전진호흡을 중단한다.', '{u}의 전진호흡이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0107', name:'발바닥고정', en:'Breach Vanguard Foundation', scope:'class', cls:'CLS_C011',
    grade:2, rarity:2, tier:1, desc:'단창과방패의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 발바닥고정을 장비 적응 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['장비 적응', '전진할 때 생기는 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0108'], lines:{use:['{u}의 {s}이(가) 발동한다. 단창과방패의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 발바닥고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 발바닥고정을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 발바닥고정의 범위와 출력을 정확히 맞춘다.', '{u}의 발바닥고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 발바닥고정을 중단한다.', '{u}의 발바닥고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0108', name:'쐐기진입', en:'Breach Vanguard Sequence', scope:'class', cls:'CLS_C011',
    grade:2, rarity:3, tier:2, desc:'방패를 앞세워 짧게 돌진하고 단창으로 한 번 친다. 멈출 지점이 없으면 대열을 벗어난다.', lore:'브레이크 차단조 진입에서 쐐기진입을 연계 공격 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['연계 공격', '전진할 때 생기는 틈'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.55, kind2:'AK_MELEE', acc:0,
    crit:-1, cost:{stamina:20, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0109'], lines:{use:['{u}은(는) 단창과방패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 쐐기진입이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 쐐기진입을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 쐐기진입의 경로에서 몸을 뺀다.', '{u}의 단창과방패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 쐐기진입이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 쐐기진입의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 쐐기진입을 중단한다.', '{u}의 쐐기진입이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', move:'dash',
    se:[{se:'SE_C007', turns:1, chance:0.7}]
  },
  {
    id:'SK_C0109', name:'진입엄호', en:'Breach Vanguard Coverage', scope:'class', cls:'CLS_C011',
    grade:3, rarity:3, tier:3, desc:'단창과방패로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 진입엄호를 퇴로 엄호 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['퇴로 엄호', '전진할 때 생기는 틈'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0110'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단창과방패로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 진입엄호가 필요한 위치에 닿지 않는다.', '{u}은(는) 진입엄호를 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 진입엄호의 범위와 출력을 정확히 맞춘다.', '{u}의 진입엄호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 진입엄호를 중단한다.', '{u}의 진입엄호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0110', name:'충돌회복', en:'Breach Vanguard Feedback', scope:'class', cls:'CLS_C011',
    grade:4, rarity:3, tier:4, desc:'단창과방패이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 급정지하면 무릎에 부담이 간다.', lore:'브레이크 차단조 진입에서 충돌회복을 반동 대응 용도로 쓴다. 급정지하면 무릎에 부담이 간다.',
    tags:['반동 대응', '전진할 때 생기는 틈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0101'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 단창과방패이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 충돌회복이 필요한 위치에 닿지 않는다.', '{u}은(는) 충돌회복을 멈추고 단창과방패의 위치를 다시 잡는다.'], crit:['{u}은(는) 충돌회복의 범위와 출력을 정확히 맞춘다.', '{u}의 충돌회복이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단창과방패의 상태가 맞지 않아 충돌회복을 중단한다.', '{u}의 충돌회복이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0111', name:'봉고리치기', en:'Capture Handler Contact', scope:'class', cls:'CLS_C012',
    grade:2, rarity:2, tier:1, desc:'포획봉의 끝으로 노출된 부위를 짧게 친다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 봉고리치기를 공격 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['공격', '관절을 묶는 지렛대'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MELEE', acc:1,
    crit:1, cost:{stamina:12, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'dash',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0112'], lines:{use:['{u}은(는) 포획봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 봉고리치기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 봉고리치기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 봉고리치기의 경로에서 몸을 뺀다.', '{u}의 포획봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 봉고리치기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 봉고리치기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 봉고리치기를 중단한다.', '{u}의 봉고리치기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0112', name:'걸쇠받기', en:'Capture Handler Guard', scope:'class', cls:'CLS_C012',
    grade:1, rarity:2, tier:1, desc:'포획봉의 단단한 면으로 날아오는 힘을 옆으로 흘린다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 걸쇠받기를 방어 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['방어', '관절을 묶는 지렛대'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0113'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 포획봉의 단단한 면으로 날아오는 힘을 옆으로 흘린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 걸쇠받기가 필요한 위치에 닿지 않는다.', '{u}은(는) 걸쇠받기를 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 걸쇠받기의 범위와 출력을 정확히 맞춘다.', '{u}의 걸쇠받기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 걸쇠받기를 중단한다.', '{u}의 걸쇠받기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0113', name:'관절묶음', en:'Capture Handler Set', scope:'class', cls:'CLS_C012',
    grade:1, rarity:2, tier:1, desc:'포획봉의 고리를 관절 바깥에 걸어 움직임을 제한한다. 대상 체격이 너무 크면 풀린다.', lore:'생체 표본 포획 보조에서 관절묶음을 틈 만들기 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['틈 만들기', '관절을 묶는 지렛대'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_BODY', scale2:'ABL_A02', se:[{se:'SE_C006', turns:2, chance:0.85}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['손목과 무릎에 피로가 쌓인다.'],
    combo:['SK_C0114'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 포획봉의 고리를 관절 바깥에 걸어 움직임을 제한한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 관절묶음이 필요한 위치에 닿지 않는다.', '{u}은(는) 관절묶음을 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 관절묶음의 범위와 출력을 정확히 맞춘다.', '{u}의 관절묶음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 관절묶음을 중단한다.', '{u}의 관절묶음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0114', name:'옆걸음당김', en:'Capture Handler Step', scope:'class', cls:'CLS_C012',
    grade:2, rarity:2, tier:1, desc:'포획봉의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 옆걸음당김을 이동 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['이동', '관절을 묶는 지렛대'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_BODY', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0115'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 포획봉의 무게를 몸 가까이 두고 공격선 밖으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 옆걸음당김이 필요한 위치에 닿지 않는다.', '{u}은(는) 옆걸음당김을 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 옆걸음당김의 범위와 출력을 정확히 맞춘다.', '{u}의 옆걸음당김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 옆걸음당김을 중단한다.', '{u}의 옆걸음당김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0115', name:'관절범위눈', en:'Capture Handler Reading', scope:'class', cls:'CLS_C012',
    grade:1, rarity:2, tier:1, desc:'관절을 묶는 지렛대를 살피며 손과 발의 변화를 읽는다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 관절범위눈을 거리 감지 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['거리 감지', '관절을 묶는 지렛대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0116'], lines:{use:['{u}의 {s}이(가) 발동한다. 관절을 묶는 지렛대를 살피며 손과 발의 변화를 읽는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 관절범위눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 관절범위눈을 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 관절범위눈의 범위와 출력을 정확히 맞춘다.', '{u}의 관절범위눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 관절범위눈을 중단한다.', '{u}의 관절범위눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0116', name:'당김분배', en:'Capture Handler Discipline', scope:'class', cls:'CLS_C012',
    grade:1, rarity:2, tier:1, desc:'포획봉을 쥔 자세를 낮춰 반동을 나눠 받는다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 당김분배를 자세 유지 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['자세 유지', '관절을 묶는 지렛대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0117'], lines:{use:['{u}의 {s}이(가) 발동한다. 포획봉을 쥔 자세를 낮춰 반동을 나눠 받는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 당김분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 당김분배를 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 당김분배의 범위와 출력을 정확히 맞춘다.', '{u}의 당김분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 당김분배를 중단한다.', '{u}의 당김분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0117', name:'포획손길', en:'Capture Handler Foundation', scope:'class', cls:'CLS_C012',
    grade:2, rarity:2, tier:1, desc:'포획봉의 무게중심을 익혀 손에 걸리는 힘을 줄인다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 포획손길을 장비 적응 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['장비 적응', '관절을 묶는 지렛대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{def:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0118'], lines:{use:['{u}의 {s}이(가) 발동한다. 포획봉의 무게중심을 익혀 손에 걸리는 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 포획손길이 필요한 위치에 닿지 않는다.', '{u}은(는) 포획손길을 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 포획손길의 범위와 출력을 정확히 맞춘다.', '{u}의 포획손길이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 포획손길을 중단한다.', '{u}의 포획손길이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0118', name:'겹고리압박', en:'Capture Handler Sequence', scope:'class', cls:'CLS_C012',
    grade:2, rarity:3, tier:2, desc:'포획봉의 회수 동작을 다음 타격으로 이어 두 차례 친다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 겹고리압박을 연계 공격 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['연계 공격', '관절을 묶는 지렛대'], kind:'액티브', target:'enemy', range:'melee', area:1,
    hits:2, count:1, power:0.75, kind2:'AK_MELEE', acc:1,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_BODY', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_BODY:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0119'], lines:{use:['{u}은(는) 포획봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 연계 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 2차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 겹고리압박의 경로에서 몸을 뺀다.', '{u}의 포획봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹고리압박이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹고리압박의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 겹고리압박을 중단한다.', '{u}의 겹고리압박이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0119', name:'탈출구봉쇄', en:'Capture Handler Coverage', scope:'class', cls:'CLS_C012',
    grade:3, rarity:3, tier:3, desc:'포획봉으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 탈출구봉쇄를 퇴로 엄호 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['퇴로 엄호', '관절을 묶는 지렛대'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_BODY', scale2:'ABL_A02', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_BODY:15}, abl:{ABL_A02:10}}, ai:{enemies:2},
    risk:1, side:['손목과 무릎에 피로가 쌓인다.'], combo:['SK_C0120'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 포획봉으로 좁은 길을 가리며 동료 한 명의 후퇴를 엄호한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탈출구봉쇄가 필요한 위치에 닿지 않는다.', '{u}은(는) 탈출구봉쇄를 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 탈출구봉쇄의 범위와 출력을 정확히 맞춘다.', '{u}의 탈출구봉쇄가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 탈출구봉쇄를 중단한다.', '{u}의 탈출구봉쇄가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0120', name:'놓침감지', en:'Capture Handler Feedback', scope:'class', cls:'CLS_C012',
    grade:4, rarity:3, tier:4, desc:'포획봉이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다. 대상 체격 차이가 크면 풀린다.', lore:'생체 표본 포획 보조에서 놓침감지를 반동 대응 용도로 쓴다. 대상 체격 차이가 크면 풀린다.',
    tags:['반동 대응', '관절을 묶는 지렛대'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_BODY', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{def:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_BODY:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0111'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 포획봉이 빗나가면 몸의 축을 되돌려 다음 충격에 대비한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 놓침감지가 필요한 위치에 닿지 않는다.', '{u}은(는) 놓침감지를 멈추고 포획봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 놓침감지의 범위와 출력을 정확히 맞춘다.', '{u}의 놓침감지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 포획봉의 상태가 맞지 않아 놓침감지를 중단한다.', '{u}의 놓침감지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0121', name:'볼트찍기', en:'Crossbow Operator Contact', scope:'class', cls:'CLS_C013',
    grade:2, rarity:1, tier:1, desc:'쇠뇌에서 발사체 하나를 보내 노출된 부위를 노린다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 볼트찍기를 공격 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['공격', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:-1,
    crit:1, cost:{stamina:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0122'], lines:{use:['{u}은(는) 쇠뇌의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 볼트찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 볼트찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 볼트찍기의 경로에서 몸을 뺀다.', '{u}의 쇠뇌가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 볼트찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 볼트찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 볼트찍기를 중단한다.', '{u}의 볼트찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0122', name:'활대가림', en:'Crossbow Operator Guard', scope:'class', cls:'CLS_C013',
    grade:1, rarity:1, tier:1, desc:'쇠뇌를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 활대가림을 근접 방호 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['근접 방호', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0123'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쇠뇌를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 활대가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 활대가림을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 활대가림의 범위와 출력을 정확히 맞춘다.', '{u}의 활대가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 활대가림을 중단한다.', '{u}의 활대가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0123', name:'볼트고정', en:'Crossbow Operator Set', scope:'class', cls:'CLS_C013',
    grade:1, rarity:1, tier:1, desc:'쇠뇌의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 볼트고정을 발 묶기 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['발 묶기', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0124'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쇠뇌의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 볼트고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 볼트고정을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 볼트고정의 범위와 출력을 정확히 맞춘다.', '{u}의 볼트고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 볼트고정을 중단한다.', '{u}의 볼트고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0124', name:'장전물림', en:'Crossbow Operator Step', scope:'class', cls:'CLS_C013',
    grade:2, rarity:1, tier:1, desc:'쇠뇌를 안전 방향으로 둔 채 사선 밖으로 물러난다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 장전물림을 사격 위치 변경 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['사격 위치 변경', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0125'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쇠뇌를 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 장전물림이 필요한 위치에 닿지 않는다.', '{u}은(는) 장전물림을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 장전물림의 범위와 출력을 정확히 맞춘다.', '{u}의 장전물림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 장전물림을 중단한다.', '{u}의 장전물림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0125', name:'시위떨림눈', en:'Crossbow Operator Reading', scope:'class', cls:'CLS_C013',
    grade:1, rarity:1, tier:1, desc:'활대 장력과 볼트를 살펴 사격 전에 궤적의 오차를 가늠한다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 시위떨림눈을 탄도 감지 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['탄도 감지', '활대 장력과 볼트', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0126'], lines:{use:['{u}의 {s}이(가) 발동한다. 활대 장력과 볼트를 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 시위떨림눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 시위떨림눈을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 시위떨림눈의 범위와 출력을 정확히 맞춘다.', '{u}의 시위떨림눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 시위떨림눈을 중단한다.', '{u}의 시위떨림눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0126', name:'견착버릇', en:'Crossbow Operator Discipline', scope:'class', cls:'CLS_C013',
    grade:1, rarity:1, tier:1, desc:'쇠뇌를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 견착버릇을 조준 유지 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['조준 유지', '활대 장력과 볼트', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0127'], lines:{use:['{u}의 {s}이(가) 발동한다. 쇠뇌를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 견착버릇이 필요한 위치에 닿지 않는다.', '{u}은(는) 견착버릇을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 견착버릇의 범위와 출력을 정확히 맞춘다.', '{u}의 견착버릇이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 견착버릇을 중단한다.', '{u}의 견착버릇이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0127', name:'장력보존', en:'Crossbow Operator Foundation', scope:'class', cls:'CLS_C013',
    grade:2, rarity:1, tier:1, desc:'쇠뇌의 장력을 익혀 준비 동작의 낭비를 줄인다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 장력보존을 장비 적응 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['장비 적응', '활대 장력과 볼트', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0128'], lines:{use:['{u}의 {s}이(가) 발동한다. 쇠뇌의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 장력보존이 필요한 위치에 닿지 않는다.', '{u}은(는) 장력보존을 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 장력보존의 범위와 출력을 정확히 맞춘다.', '{u}의 장력보존이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 장력보존을 중단한다.', '{u}의 장력보존이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0128', name:'겹볼트', en:'Crossbow Operator Sequence', scope:'class', cls:'CLS_C013',
    grade:2, rarity:3, tier:2, desc:'준비한 볼트 두 발을 다른 표적에 나눠 쏜다. 발사 뒤 두 손으로 다시 장전해야 한다.', lore:'저소음 게이트 사격 계약에서 겹볼트를 분산 사격 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['분산 사격', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:1, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{stamina:20, cd:5, cast:1}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0129'], lines:{use:['{u}은(는) 쇠뇌의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹볼트의 경로에서 몸을 뺀다.', '{u}의 쇠뇌가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹볼트가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹볼트의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 겹볼트를 중단한다.', '{u}의 겹볼트가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0129', name:'사선폐쇄', en:'Crossbow Operator Coverage', scope:'class', cls:'CLS_C013',
    grade:3, rarity:3, tier:3, desc:'쇠뇌의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 사선폐쇄를 진입 차단 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['진입 차단', '활대 장력과 볼트', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0130'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쇠뇌의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사선폐쇄가 필요한 위치에 닿지 않는다.', '{u}은(는) 사선폐쇄를 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 사선폐쇄의 범위와 출력을 정확히 맞춘다.', '{u}의 사선폐쇄가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 사선폐쇄를 중단한다.', '{u}의 사선폐쇄가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0130', name:'잔장력회수', en:'Crossbow Operator Feedback', scope:'class', cls:'CLS_C013',
    grade:4, rarity:3, tier:4, desc:'쇠뇌의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 재장전에 두 손이 필요하다.', lore:'저소음 게이트 사격 계약에서 잔장력회수를 재장전 대응 용도로 쓴다. 재장전에 두 손이 필요하다.',
    tags:['재장전 대응', '활대 장력과 볼트', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0121'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 쇠뇌의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔장력회수가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔장력회수를 멈추고 쇠뇌의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔장력회수의 범위와 출력을 정확히 맞춘다.', '{u}의 잔장력회수가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 쇠뇌의 상태가 맞지 않아 잔장력회수를 중단한다.', '{u}의 잔장력회수가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0131', name:'창던지기', en:'Javelin Thrower Contact', scope:'class', cls:'CLS_C014',
    grade:2, rarity:1, tier:1, desc:'투창 한 자루를 던져 노출된 부위를 노린다. 회수하지 못하면 다음 투척이 제한된다.', lore:'중형 마수 원거리 견제에서 창던지기를 공격 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['공격', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.25, kind2:'AK_RANGED', acc:0,
    crit:1, cost:{stamina:12, cd:3, charges:3}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0132'], lines:{use:['{u}은(는) 투창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 창던지기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 창던지기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 창던지기의 경로에서 몸을 뺀다.', '{u}의 투창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 창던지기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 창던지기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 창던지기를 중단한다.', '{u}의 창던지기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0132', name:'자루쳐내기', en:'Javelin Thrower Guard', scope:'class', cls:'CLS_C014',
    grade:1, rarity:1, tier:1, desc:'투창을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 자루쳐내기를 근접 방호 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['근접 방호', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0133'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투창을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 자루쳐내기가 필요한 위치에 닿지 않는다.', '{u}은(는) 자루쳐내기를 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 자루쳐내기의 범위와 출력을 정확히 맞춘다.', '{u}의 자루쳐내기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 자루쳐내기를 중단한다.', '{u}의 자루쳐내기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0133', name:'창촉표식', en:'Javelin Thrower Set', scope:'class', cls:'CLS_C014',
    grade:1, rarity:1, tier:1, desc:'투창의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 창촉표식을 발 묶기 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['발 묶기', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0134'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투창의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 창촉표식이 필요한 위치에 닿지 않는다.', '{u}은(는) 창촉표식을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 창촉표식의 범위와 출력을 정확히 맞춘다.', '{u}의 창촉표식이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 창촉표식을 중단한다.', '{u}의 창촉표식이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0134', name:'빗각후퇴', en:'Javelin Thrower Step', scope:'class', cls:'CLS_C014',
    grade:2, rarity:1, tier:1, desc:'투창을 안전 방향으로 둔 채 사선 밖으로 물러난다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 빗각후퇴를 사격 위치 변경 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['사격 위치 변경', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0135'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투창을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 빗각후퇴가 필요한 위치에 닿지 않는다.', '{u}은(는) 빗각후퇴를 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 빗각후퇴의 범위와 출력을 정확히 맞춘다.', '{u}의 빗각후퇴가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 빗각후퇴를 중단한다.', '{u}의 빗각후퇴가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0135', name:'낙점눈금', en:'Javelin Thrower Reading', scope:'class', cls:'CLS_C014',
    grade:1, rarity:1, tier:1, desc:'회수 가능한 창의 궤적을 살펴 사격 전에 궤적의 오차를 가늠한다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 낙점눈금을 탄도 감지 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['탄도 감지', '회수 가능한 창의 궤적', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0136'], lines:{use:['{u}의 {s}이(가) 발동한다. 회수 가능한 창의 궤적을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낙점눈금이 필요한 위치에 닿지 않는다.', '{u}은(는) 낙점눈금을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙점눈금의 범위와 출력을 정확히 맞춘다.', '{u}의 낙점눈금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 낙점눈금을 중단한다.', '{u}의 낙점눈금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0136', name:'손끝회전', en:'Javelin Thrower Discipline', scope:'class', cls:'CLS_C014',
    grade:1, rarity:1, tier:1, desc:'투창을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 손끝회전을 조준 유지 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['조준 유지', '회수 가능한 창의 궤적', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0137'], lines:{use:['{u}의 {s}이(가) 발동한다. 투창을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손끝회전이 필요한 위치에 닿지 않는다.', '{u}은(는) 손끝회전을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 손끝회전의 범위와 출력을 정확히 맞춘다.', '{u}의 손끝회전이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 손끝회전을 중단한다.', '{u}의 손끝회전이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0137', name:'투창균형', en:'Javelin Thrower Foundation', scope:'class', cls:'CLS_C014',
    grade:2, rarity:1, tier:1, desc:'투창의 장력을 익혀 준비 동작의 낭비를 줄인다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 투창균형을 장비 적응 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['장비 적응', '회수 가능한 창의 궤적', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0138'], lines:{use:['{u}의 {s}이(가) 발동한다. 투창의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 투창균형이 필요한 위치에 닿지 않는다.', '{u}은(는) 투창균형을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 투창균형의 범위와 출력을 정확히 맞춘다.', '{u}의 투창균형이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 투창균형을 중단한다.', '{u}의 투창균형이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0138', name:'쌍창분산', en:'Javelin Thrower Sequence', scope:'class', cls:'CLS_C014',
    grade:2, rarity:3, tier:2, desc:'투창에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 쌍창분산을 분산 사격 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['분산 사격', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:0,
    crit:-1, cost:{stamina:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0139'], lines:{use:['{u}은(는) 투창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 쌍창분산의 경로에서 몸을 뺀다.', '{u}의 투창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 쌍창분산이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 쌍창분산의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 쌍창분산을 중단한다.', '{u}의 쌍창분산이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0139', name:'못박는창', en:'Javelin Thrower Coverage', scope:'class', cls:'CLS_C014',
    grade:3, rarity:3, tier:3, desc:'투창의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 못박는창을 진입 차단 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['진입 차단', '회수 가능한 창의 궤적', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0140'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투창의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 못박는창이 필요한 위치에 닿지 않는다.', '{u}은(는) 못박는창을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 못박는창의 범위와 출력을 정확히 맞춘다.', '{u}의 못박는창이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 못박는창을 중단한다.', '{u}의 못박는창이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0140', name:'회수동선', en:'Javelin Thrower Feedback', scope:'class', cls:'CLS_C014',
    grade:4, rarity:3, tier:4, desc:'투창의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 투창을 잃으면 선택지가 줄어든다.', lore:'중형 마수 원거리 견제에서 회수동선을 재장전 대응 용도로 쓴다. 투창을 잃으면 선택지가 줄어든다.',
    tags:['재장전 대응', '회수 가능한 창의 궤적', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0131'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 투창의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회수동선이 필요한 위치에 닿지 않는다.', '{u}은(는) 회수동선을 멈추고 투창의 위치를 다시 잡는다.'], crit:['{u}은(는) 회수동선의 범위와 출력을 정확히 맞춘다.', '{u}의 회수동선이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투창의 상태가 맞지 않아 회수동선을 중단한다.', '{u}의 회수동선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0141', name:'돌돌려쏘기', en:'Stone Slinger Contact', scope:'class', cls:'CLS_C015',
    grade:2, rarity:1, tier:1, desc:'투석구에서 발사체 하나를 보내 노출된 부위를 노린다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 돌돌려쏘기를 공격 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['공격', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:1,
    crit:1, cost:{stamina:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0142'], lines:{use:['{u}은(는) 투석구의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 돌돌려쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 돌돌려쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 돌돌려쏘기의 경로에서 몸을 뺀다.', '{u}의 투석구가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 돌돌려쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 돌돌려쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 돌돌려쏘기를 중단한다.', '{u}의 돌돌려쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0142', name:'회전견제', en:'Stone Slinger Guard', scope:'class', cls:'CLS_C015',
    grade:1, rarity:1, tier:1, desc:'투석구를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 회전견제를 근접 방호 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['근접 방호', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0143'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투석구를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 회전견제가 필요한 위치에 닿지 않는다.', '{u}은(는) 회전견제를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전견제의 범위와 출력을 정확히 맞춘다.', '{u}의 회전견제가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 회전견제를 중단한다.', '{u}의 회전견제가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0143', name:'돌가루표식', en:'Stone Slinger Set', scope:'class', cls:'CLS_C015',
    grade:1, rarity:1, tier:1, desc:'투석구의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 돌가루표식을 발 묶기 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['발 묶기', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0144'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투석구의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 돌가루표식이 필요한 위치에 닿지 않는다.', '{u}은(는) 돌가루표식을 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 돌가루표식의 범위와 출력을 정확히 맞춘다.', '{u}의 돌가루표식이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 돌가루표식을 중단한다.', '{u}의 돌가루표식이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0144', name:'돌며빠지기', en:'Stone Slinger Step', scope:'class', cls:'CLS_C015',
    grade:2, rarity:1, tier:1, desc:'투석구를 안전 방향으로 둔 채 사선 밖으로 물러난다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 돌며빠지기를 사격 위치 변경 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['사격 위치 변경', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0145'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투석구를 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 돌며빠지기가 필요한 위치에 닿지 않는다.', '{u}은(는) 돌며빠지기를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 돌며빠지기의 범위와 출력을 정확히 맞춘다.', '{u}의 돌며빠지기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 돌며빠지기를 중단한다.', '{u}의 돌며빠지기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0145', name:'돌결고르기', en:'Stone Slinger Reading', scope:'class', cls:'CLS_C015',
    grade:1, rarity:1, tier:1, desc:'돌의 질량과 회전을 살펴 사격 전에 궤적의 오차를 가늠한다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 돌결고르기를 탄도 감지 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['탄도 감지', '돌의 질량과 회전', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0146'], lines:{use:['{u}의 {s}이(가) 발동한다. 돌의 질량과 회전을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 돌결고르기가 필요한 위치에 닿지 않는다.', '{u}은(는) 돌결고르기를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 돌결고르기의 범위와 출력을 정확히 맞춘다.', '{u}의 돌결고르기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 돌결고르기를 중단한다.', '{u}의 돌결고르기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0146', name:'회전박자', en:'Stone Slinger Discipline', scope:'class', cls:'CLS_C015',
    grade:1, rarity:1, tier:1, desc:'투석구를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 회전박자를 조준 유지 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['조준 유지', '돌의 질량과 회전', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0147'], lines:{use:['{u}의 {s}이(가) 발동한다. 투석구를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회전박자가 필요한 위치에 닿지 않는다.', '{u}은(는) 회전박자를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전박자의 범위와 출력을 정확히 맞춘다.', '{u}의 회전박자가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 회전박자를 중단한다.', '{u}의 회전박자가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0147', name:'손목원궤', en:'Stone Slinger Foundation', scope:'class', cls:'CLS_C015',
    grade:2, rarity:1, tier:1, desc:'투석구의 장력을 익혀 준비 동작의 낭비를 줄인다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 손목원궤를 장비 적응 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['장비 적응', '돌의 질량과 회전', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0148'], lines:{use:['{u}의 {s}이(가) 발동한다. 투석구의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손목원궤가 필요한 위치에 닿지 않는다.', '{u}은(는) 손목원궤를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 손목원궤의 범위와 출력을 정확히 맞춘다.', '{u}의 손목원궤가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 손목원궤를 중단한다.', '{u}의 손목원궤가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0148', name:'흩돌사격', en:'Stone Slinger Sequence', scope:'class', cls:'CLS_C015',
    grade:2, rarity:3, tier:2, desc:'작은 돌 세 개를 넓게 흩뿌린다. 돌의 무게가 다르면 탄도가 벌어진다.', lore:'저비용 후열 화력 계약에서 흩돌사격을 분산 사격 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['분산 사격', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:3,
    hits:1, count:3, power:0.55, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{stamina:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0149'], lines:{use:['{u}은(는) 투석구의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 흩돌사격의 경로에서 몸을 뺀다.', '{u}의 투석구가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 흩돌사격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 흩돌사격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 흩돌사격을 중단한다.', '{u}의 흩돌사격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0149', name:'바닥파쇄', en:'Stone Slinger Coverage', scope:'class', cls:'CLS_C015',
    grade:3, rarity:3, tier:3, desc:'투석구의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 바닥파쇄를 진입 차단 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['진입 차단', '돌의 질량과 회전', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0150'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투석구의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 바닥파쇄가 필요한 위치에 닿지 않는다.', '{u}은(는) 바닥파쇄를 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 바닥파쇄의 범위와 출력을 정확히 맞춘다.', '{u}의 바닥파쇄가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 바닥파쇄를 중단한다.', '{u}의 바닥파쇄가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0150', name:'남은돌감각', en:'Stone Slinger Feedback', scope:'class', cls:'CLS_C015',
    grade:4, rarity:3, tier:4, desc:'투석구의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 불규칙한 돌은 빗나가기 쉽다.', lore:'저비용 후열 화력 계약에서 남은돌감각을 재장전 대응 용도로 쓴다. 불규칙한 돌은 빗나가기 쉽다.',
    tags:['재장전 대응', '돌의 질량과 회전', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0141'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 투석구의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 남은돌감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 남은돌감각을 멈추고 투석구의 위치를 다시 잡는다.'], crit:['{u}은(는) 남은돌감각의 범위와 출력을 정확히 맞춘다.', '{u}의 남은돌감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투석구의 상태가 맞지 않아 남은돌감각을 중단한다.', '{u}의 남은돌감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0151', name:'반회전칼', en:'Throwing Knife Handler Contact', scope:'class', cls:'CLS_C016',
    grade:2, rarity:1, tier:1, desc:'투척칼에서 발사체 하나를 보내 노출된 부위를 노린다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 반회전칼을 공격 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['공격', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:-1,
    crit:1, cost:{stamina:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0152'], lines:{use:['{u}은(는) 투척칼의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 반회전칼이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 반회전칼을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 반회전칼의 경로에서 몸을 뺀다.', '{u}의 투척칼이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 반회전칼이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 반회전칼의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 반회전칼을 중단한다.', '{u}의 반회전칼이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0152', name:'칼등튕기기', en:'Throwing Knife Handler Guard', scope:'class', cls:'CLS_C016',
    grade:1, rarity:1, tier:1, desc:'투척칼을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 칼등튕기기를 근접 방호 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['근접 방호', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0153'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투척칼을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 칼등튕기기가 필요한 위치에 닿지 않는다.', '{u}은(는) 칼등튕기기를 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 칼등튕기기의 범위와 출력을 정확히 맞춘다.', '{u}의 칼등튕기기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 칼등튕기기를 중단한다.', '{u}의 칼등튕기기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0153', name:'끈고정칼', en:'Throwing Knife Handler Set', scope:'class', cls:'CLS_C016',
    grade:1, rarity:1, tier:1, desc:'투척칼로 대상의 옷자락이나 끈을 바닥에 고정한다. 걸릴 재료가 없으면 쓰지 못한다.', lore:'협소 게이트 사각 견제에서 끈고정칼을 발 묶기 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['발 묶기', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', turns:2, chance:0.65}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0154'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투척칼로 대상의 옷자락이나 끈을 바닥에 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 끈고정칼이 필요한 위치에 닿지 않는다.', '{u}은(는) 끈고정칼을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 끈고정칼의 범위와 출력을 정확히 맞춘다.', '{u}의 끈고정칼이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 끈고정칼을 중단한다.', '{u}의 끈고정칼이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0154', name:'엇발투척', en:'Throwing Knife Handler Step', scope:'class', cls:'CLS_C016',
    grade:2, rarity:1, tier:1, desc:'투척칼을 안전 방향으로 둔 채 사선 밖으로 물러난다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 엇발투척을 사격 위치 변경 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['사격 위치 변경', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0155'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투척칼을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 엇발투척이 필요한 위치에 닿지 않는다.', '{u}은(는) 엇발투척을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 엇발투척의 범위와 출력을 정확히 맞춘다.', '{u}의 엇발투척이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 엇발투척을 중단한다.', '{u}의 엇발투척이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0155', name:'회전수눈', en:'Throwing Knife Handler Reading', scope:'class', cls:'CLS_C016',
    grade:1, rarity:1, tier:1, desc:'짧은 칼의 회전수를 살펴 사격 전에 궤적의 오차를 가늠한다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 회전수눈을 탄도 감지 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['탄도 감지', '짧은 칼의 회전수', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0156'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 칼의 회전수를 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회전수눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 회전수눈을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전수눈의 범위와 출력을 정확히 맞춘다.', '{u}의 회전수눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 회전수눈을 중단한다.', '{u}의 회전수눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0156', name:'손가락배열', en:'Throwing Knife Handler Discipline', scope:'class', cls:'CLS_C016',
    grade:1, rarity:1, tier:1, desc:'투척칼을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 손가락배열을 조준 유지 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['조준 유지', '짧은 칼의 회전수', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0157'], lines:{use:['{u}의 {s}이(가) 발동한다. 투척칼을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손가락배열이 필요한 위치에 닿지 않는다.', '{u}은(는) 손가락배열을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 손가락배열의 범위와 출력을 정확히 맞춘다.', '{u}의 손가락배열이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 손가락배열을 중단한다.', '{u}의 손가락배열이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0157', name:'날회수감', en:'Throwing Knife Handler Foundation', scope:'class', cls:'CLS_C016',
    grade:2, rarity:1, tier:1, desc:'투척칼의 장력을 익혀 준비 동작의 낭비를 줄인다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 날회수감을 장비 적응 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['장비 적응', '짧은 칼의 회전수', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0158'], lines:{use:['{u}의 {s}이(가) 발동한다. 투척칼의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 날회수감이 필요한 위치에 닿지 않는다.', '{u}은(는) 날회수감을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 날회수감의 범위와 출력을 정확히 맞춘다.', '{u}의 날회수감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 날회수감을 중단한다.', '{u}의 날회수감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0158', name:'겹칼투척', en:'Throwing Knife Handler Sequence', scope:'class', cls:'CLS_C016',
    grade:2, rarity:3, tier:2, desc:'투척칼에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 겹칼투척을 분산 사격 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['분산 사격', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0159'], lines:{use:['{u}은(는) 투척칼의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹칼투척의 경로에서 몸을 뺀다.', '{u}의 투척칼이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹칼투척이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹칼투척의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 겹칼투척을 중단한다.', '{u}의 겹칼투척이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0159', name:'사각박음', en:'Throwing Knife Handler Coverage', scope:'class', cls:'CLS_C016',
    grade:3, rarity:3, tier:3, desc:'투척칼의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 사각박음을 진입 차단 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['진입 차단', '짧은 칼의 회전수', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0160'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투척칼의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사각박음이 필요한 위치에 닿지 않는다.', '{u}은(는) 사각박음을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 사각박음의 범위와 출력을 정확히 맞춘다.', '{u}의 사각박음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 사각박음을 중단한다.', '{u}의 사각박음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0160', name:'낙칼기억', en:'Throwing Knife Handler Feedback', scope:'class', cls:'CLS_C016',
    grade:4, rarity:3, tier:4, desc:'투척칼의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 장갑이 두꺼우면 힘이 줄어든다.', lore:'협소 게이트 사각 견제에서 낙칼기억을 재장전 대응 용도로 쓴다. 장갑이 두꺼우면 힘이 줄어든다.',
    tags:['재장전 대응', '짧은 칼의 회전수', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0151'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 투척칼의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낙칼기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 낙칼기억을 멈추고 투척칼의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙칼기억의 범위와 출력을 정확히 맞춘다.', '{u}의 낙칼기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투척칼의 상태가 맞지 않아 낙칼기억을 중단한다.', '{u}의 낙칼기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0161', name:'점탄발사', en:'Mana Rifle Operator Contact', scope:'class', cls:'CLS_C017',
    grade:2, rarity:1, tier:1, desc:'마력총에서 응축한 탄 한 발을 보낸다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 점탄발사를 공격 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['공격', '탄에 실린 마력'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.1, kind2:'AK_RANGED', acc:0,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0162'], lines:{use:['{u}은(는) 마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 점탄발사가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 점탄발사를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 점탄발사의 경로에서 몸을 뺀다.', '{u}의 마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 점탄발사가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 점탄발사의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 점탄발사를 중단한다.', '{u}의 점탄발사가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C10'
  },
  {
    id:'SK_C0162', name:'총대엄폐', en:'Mana Rifle Operator Guard', scope:'class', cls:'CLS_C017',
    grade:1, rarity:1, tier:1, desc:'마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 총대엄폐를 근접 방호 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['근접 방호', '탄에 실린 마력'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0163'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 총대엄폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 총대엄폐를 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 총대엄폐의 범위와 출력을 정확히 맞춘다.', '{u}의 총대엄폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 총대엄폐를 중단한다.', '{u}의 총대엄폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0163', name:'착탄등표', en:'Mana Rifle Operator Set', scope:'class', cls:'CLS_C017',
    grade:1, rarity:1, tier:1, desc:'마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 착탄등표를 발 묶기 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['발 묶기', '탄에 실린 마력'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0164'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 착탄등표가 필요한 위치에 닿지 않는다.', '{u}은(는) 착탄등표를 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 착탄등표의 범위와 출력을 정확히 맞춘다.', '{u}의 착탄등표가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 착탄등표를 중단한다.', '{u}의 착탄등표가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0164', name:'견착후퇴', en:'Mana Rifle Operator Step', scope:'class', cls:'CLS_C017',
    grade:2, rarity:1, tier:1, desc:'마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 견착후퇴를 사격 위치 변경 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['사격 위치 변경', '탄에 실린 마력'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0165'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 견착후퇴가 필요한 위치에 닿지 않는다.', '{u}은(는) 견착후퇴를 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 견착후퇴의 범위와 출력을 정확히 맞춘다.', '{u}의 견착후퇴가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 견착후퇴를 중단한다.', '{u}의 견착후퇴가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0165', name:'탄열감지', en:'Mana Rifle Operator Reading', scope:'class', cls:'CLS_C017',
    grade:1, rarity:1, tier:1, desc:'탄에 실린 마력을 살펴 사격 전에 궤적의 오차를 가늠한다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 탄열감지를 탄도 감지 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['탄도 감지', '탄에 실린 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0166'], lines:{use:['{u}의 {s}이(가) 발동한다. 탄에 실린 마력을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탄열감지가 필요한 위치에 닿지 않는다.', '{u}은(는) 탄열감지를 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄열감지의 범위와 출력을 정확히 맞춘다.', '{u}의 탄열감지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 탄열감지를 중단한다.', '{u}의 탄열감지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0166', name:'호흡멎음', en:'Mana Rifle Operator Discipline', scope:'class', cls:'CLS_C017',
    grade:1, rarity:1, tier:1, desc:'마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 호흡멎음을 조준 유지 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['조준 유지', '탄에 실린 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0167'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 호흡멎음이 필요한 위치에 닿지 않는다.', '{u}은(는) 호흡멎음을 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 호흡멎음의 범위와 출력을 정확히 맞춘다.', '{u}의 호흡멎음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 호흡멎음을 중단한다.', '{u}의 호흡멎음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0167', name:'잔탄가늠', en:'Mana Rifle Operator Foundation', scope:'class', cls:'CLS_C017',
    grade:2, rarity:1, tier:1, desc:'마력총의 장력을 익혀 준비 동작의 낭비를 줄인다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 잔탄가늠을 장비 적응 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['장비 적응', '탄에 실린 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0168'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력총의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔탄가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔탄가늠을 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔탄가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 잔탄가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 잔탄가늠을 중단한다.', '{u}의 잔탄가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0168', name:'삼점사격', en:'Mana Rifle Operator Sequence', scope:'class', cls:'CLS_C017',
    grade:2, rarity:3, tier:2, desc:'짧은 점사로 표적 한 곳을 세 차례 친다. 총열이 식지 않았으면 중단한다.', lore:'도심 브레이크 사선 경계에서 삼점사격을 분산 사격 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['분산 사격', '탄에 실린 마력'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:3, count:1, power:0.45, kind2:'AK_RANGED', acc:0,
    crit:-1, cost:{mp:24, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0169'], lines:{use:['{u}은(는) 마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) {t}에게 3차례 닿는다.', '{t}의 자세가 {s}의 연속 타격에 흔들린다.'], miss:['{t}이(가) 삼점사격의 경로에서 몸을 뺀다.', '{u}의 마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 삼점사격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 삼점사격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 삼점사격을 중단한다.', '{u}의 삼점사격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C10'
  },
  {
    id:'SK_C0169', name:'억제사선', en:'Mana Rifle Operator Coverage', scope:'class', cls:'CLS_C017',
    grade:3, rarity:3, tier:3, desc:'마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 억제사선을 진입 차단 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['진입 차단', '탄에 실린 마력'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0170'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 억제사선이 필요한 위치에 닿지 않는다.', '{u}은(는) 억제사선을 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 억제사선의 범위와 출력을 정확히 맞춘다.', '{u}의 억제사선이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 억제사선을 중단한다.', '{u}의 억제사선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0170', name:'열배출감', en:'Mana Rifle Operator Feedback', scope:'class', cls:'CLS_C017',
    grade:4, rarity:3, tier:4, desc:'마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 연속 발사하면 총열이 달아오른다.', lore:'도심 브레이크 사선 경계에서 열배출감을 재장전 대응 용도로 쓴다. 연속 발사하면 총열이 달아오른다.',
    tags:['재장전 대응', '탄에 실린 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0161'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 열배출감이 필요한 위치에 닿지 않는다.', '{u}은(는) 열배출감을 멈추고 마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 열배출감의 범위와 출력을 정확히 맞춘다.', '{u}의 열배출감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 마력총의 상태가 맞지 않아 열배출감을 중단한다.', '{u}의 열배출감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0171', name:'올려쏘기', en:'Arc Shot Specialist Contact', scope:'class', cls:'CLS_C018',
    grade:2, rarity:1, tier:1, desc:'곡사활에서 발사체 하나를 보내 노출된 부위를 노린다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 올려쏘기를 공격 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['공격', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:1,
    crit:1, cost:{stamina:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0172'], lines:{use:['{u}은(는) 곡사활의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 올려쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 올려쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 올려쏘기의 경로에서 몸을 뺀다.', '{u}의 곡사활이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 올려쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 올려쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 올려쏘기를 중단한다.', '{u}의 올려쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0172', name:'활몸가림', en:'Arc Shot Specialist Guard', scope:'class', cls:'CLS_C018',
    grade:1, rarity:1, tier:1, desc:'곡사활을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 활몸가림을 근접 방호 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['근접 방호', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0173'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 곡사활을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 활몸가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 활몸가림을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 활몸가림의 범위와 출력을 정확히 맞춘다.', '{u}의 활몸가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 활몸가림을 중단한다.', '{u}의 활몸가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0173', name:'낙점표식', en:'Arc Shot Specialist Set', scope:'class', cls:'CLS_C018',
    grade:1, rarity:1, tier:1, desc:'곡사활의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 낙점표식을 발 묶기 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['발 묶기', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0174'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 곡사활의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 낙점표식이 필요한 위치에 닿지 않는다.', '{u}은(는) 낙점표식을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙점표식의 범위와 출력을 정확히 맞춘다.', '{u}의 낙점표식이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 낙점표식을 중단한다.', '{u}의 낙점표식이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0174', name:'옆각이동', en:'Arc Shot Specialist Step', scope:'class', cls:'CLS_C018',
    grade:2, rarity:1, tier:1, desc:'곡사활을 안전 방향으로 둔 채 사선 밖으로 물러난다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 옆각이동을 사격 위치 변경 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['사격 위치 변경', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0175'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 곡사활을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 옆각이동이 필요한 위치에 닿지 않는다.', '{u}은(는) 옆각이동을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 옆각이동의 범위와 출력을 정확히 맞춘다.', '{u}의 옆각이동이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 옆각이동을 중단한다.', '{u}의 옆각이동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0175', name:'천장측량', en:'Arc Shot Specialist Reading', scope:'class', cls:'CLS_C018',
    grade:1, rarity:1, tier:1, desc:'높게 휘는 화살을 살펴 사격 전에 궤적의 오차를 가늠한다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 천장측량을 탄도 감지 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['탄도 감지', '높게 휘는 화살', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0176'], lines:{use:['{u}의 {s}이(가) 발동한다. 높게 휘는 화살을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 천장측량이 필요한 위치에 닿지 않는다.', '{u}은(는) 천장측량을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 천장측량의 범위와 출력을 정확히 맞춘다.', '{u}의 천장측량이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 천장측량을 중단한다.', '{u}의 천장측량이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0176', name:'곡선기억', en:'Arc Shot Specialist Discipline', scope:'class', cls:'CLS_C018',
    grade:1, rarity:1, tier:1, desc:'곡사활을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 곡선기억을 조준 유지 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['조준 유지', '높게 휘는 화살', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0177'], lines:{use:['{u}의 {s}이(가) 발동한다. 곡사활을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 곡선기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 곡선기억을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 곡선기억의 범위와 출력을 정확히 맞춘다.', '{u}의 곡선기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 곡선기억을 중단한다.', '{u}의 곡선기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0177', name:'고각감각', en:'Arc Shot Specialist Foundation', scope:'class', cls:'CLS_C018',
    grade:2, rarity:1, tier:1, desc:'곡사활의 장력을 익혀 준비 동작의 낭비를 줄인다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 고각감각을 장비 적응 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['장비 적응', '높게 휘는 화살', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0178'], lines:{use:['{u}의 {s}이(가) 발동한다. 곡사활의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 고각감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 고각감각을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 고각감각의 범위와 출력을 정확히 맞춘다.', '{u}의 고각감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 고각감각을 중단한다.', '{u}의 고각감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0178', name:'갈래낙하', en:'Arc Shot Specialist Sequence', scope:'class', cls:'CLS_C018',
    grade:2, rarity:3, tier:2, desc:'화살 두 발을 고각으로 보내 엄폐 뒤의 다른 두 지점을 노린다. 낮은 천장에 막힌다.', lore:'엄폐 뒤 개체 견제에서 갈래낙하를 분산 사격 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['분산 사격', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.95, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{stamina:19, cd:4, cast:1}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0179'], lines:{use:['{u}은(는) 곡사활의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래낙하의 경로에서 몸을 뺀다.', '{u}의 곡사활이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래낙하가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래낙하의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 갈래낙하를 중단한다.', '{u}의 갈래낙하가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0179', name:'머리위견제', en:'Arc Shot Specialist Coverage', scope:'class', cls:'CLS_C018',
    grade:3, rarity:3, tier:3, desc:'곡사활의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 머리위견제를 진입 차단 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['진입 차단', '높게 휘는 화살', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0180'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 곡사활의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 머리위견제가 필요한 위치에 닿지 않는다.', '{u}은(는) 머리위견제를 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 머리위견제의 범위와 출력을 정확히 맞춘다.', '{u}의 머리위견제가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 머리위견제를 중단한다.', '{u}의 머리위견제가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0180', name:'빗각보정', en:'Arc Shot Specialist Feedback', scope:'class', cls:'CLS_C018',
    grade:4, rarity:3, tier:4, desc:'곡사활의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 천장이 낮으면 사거리가 줄어든다.', lore:'엄폐 뒤 개체 견제에서 빗각보정을 재장전 대응 용도로 쓴다. 천장이 낮으면 사거리가 줄어든다.',
    tags:['재장전 대응', '높게 휘는 화살', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0171'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 곡사활의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 빗각보정이 필요한 위치에 닿지 않는다.', '{u}은(는) 빗각보정을 멈추고 곡사활의 위치를 다시 잡는다.'], crit:['{u}은(는) 빗각보정의 범위와 출력을 정확히 맞춘다.', '{u}의 빗각보정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 곡사활의 상태가 맞지 않아 빗각보정을 중단한다.', '{u}의 빗각보정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0181', name:'부채탄', en:'Scatter Caster Contact', scope:'class', cls:'CLS_C019',
    grade:2, rarity:1, tier:1, desc:'마력 알갱이를 부채 모양으로 흩뿌린다. 거리가 멀어지면 탄의 밀도가 낮아진다.', lore:'소형 군체 저지 계약에서 부채탄을 공격 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['공격', '퍼지는 마력 알갱이'], kind:'액티브', target:'enemies', range:'near', area:3,
    hits:1, count:3, power:0.55, kind2:'AK_RANGED', acc:-1,
    crit:1, cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0182'], lines:{use:['{u}은(는) 산탄마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 부채탄의 경로에서 몸을 뺀다.', '{u}의 산탄마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 부채탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 부채탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 부채탄을 중단한다.', '{u}의 부채탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C10'
  },
  {
    id:'SK_C0182', name:'총대밀기', en:'Scatter Caster Guard', scope:'class', cls:'CLS_C019',
    grade:1, rarity:1, tier:1, desc:'산탄마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 총대밀기를 근접 방호 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['근접 방호', '퍼지는 마력 알갱이'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0183'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 산탄마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 총대밀기가 필요한 위치에 닿지 않는다.', '{u}은(는) 총대밀기를 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 총대밀기의 범위와 출력을 정확히 맞춘다.', '{u}의 총대밀기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 총대밀기를 중단한다.', '{u}의 총대밀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0183', name:'탄흔경계', en:'Scatter Caster Set', scope:'class', cls:'CLS_C019',
    grade:1, rarity:1, tier:1, desc:'산탄마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 탄흔경계를 발 묶기 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['발 묶기', '퍼지는 마력 알갱이'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0184'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 산탄마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탄흔경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 탄흔경계를 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄흔경계의 범위와 출력을 정확히 맞춘다.', '{u}의 탄흔경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 탄흔경계를 중단한다.', '{u}의 탄흔경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0184', name:'측면이탈', en:'Scatter Caster Step', scope:'class', cls:'CLS_C019',
    grade:2, rarity:1, tier:1, desc:'산탄마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 측면이탈을 사격 위치 변경 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['사격 위치 변경', '퍼지는 마력 알갱이'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0185'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 산탄마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 측면이탈이 필요한 위치에 닿지 않는다.', '{u}은(는) 측면이탈을 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 측면이탈의 범위와 출력을 정확히 맞춘다.', '{u}의 측면이탈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 측면이탈을 중단한다.', '{u}의 측면이탈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0185', name:'산포눈금', en:'Scatter Caster Reading', scope:'class', cls:'CLS_C019',
    grade:1, rarity:1, tier:1, desc:'퍼지는 마력 알갱이를 살펴 사격 전에 궤적의 오차를 가늠한다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 산포눈금을 탄도 감지 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['탄도 감지', '퍼지는 마력 알갱이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0186'], lines:{use:['{u}의 {s}이(가) 발동한다. 퍼지는 마력 알갱이를 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 산포눈금이 필요한 위치에 닿지 않는다.', '{u}은(는) 산포눈금을 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 산포눈금의 범위와 출력을 정확히 맞춘다.', '{u}의 산포눈금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 산포눈금을 중단한다.', '{u}의 산포눈금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0186', name:'반동호흡', en:'Scatter Caster Discipline', scope:'class', cls:'CLS_C019',
    grade:1, rarity:1, tier:1, desc:'산탄마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 반동호흡을 조준 유지 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['조준 유지', '퍼지는 마력 알갱이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0187'], lines:{use:['{u}의 {s}이(가) 발동한다. 산탄마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반동호흡이 필요한 위치에 닿지 않는다.', '{u}은(는) 반동호흡을 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 반동호흡의 범위와 출력을 정확히 맞춘다.', '{u}의 반동호흡이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 반동호흡을 중단한다.', '{u}의 반동호흡이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0187', name:'탄폭분배', en:'Scatter Caster Foundation', scope:'class', cls:'CLS_C019',
    grade:2, rarity:1, tier:1, desc:'산탄마력총의 장력을 익혀 준비 동작의 낭비를 줄인다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 탄폭분배를 장비 적응 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['장비 적응', '퍼지는 마력 알갱이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0188'], lines:{use:['{u}의 {s}이(가) 발동한다. 산탄마력총의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탄폭분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 탄폭분배를 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄폭분배의 범위와 출력을 정확히 맞춘다.', '{u}의 탄폭분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 탄폭분배를 중단한다.', '{u}의 탄폭분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0188', name:'겹부채탄', en:'Scatter Caster Sequence', scope:'class', cls:'CLS_C019',
    grade:2, rarity:3, tier:2, desc:'짧은 간격으로 산탄을 두 번 펼친다. 가까운 아군의 사선을 먼저 비워야 한다.', lore:'소형 군체 저지 계약에서 겹부채탄을 분산 사격 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['분산 사격', '퍼지는 마력 알갱이'], kind:'액티브', target:'enemies', range:'near', area:3,
    hits:2, count:3, power:0.4, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{mp:25, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0189'], lines:{use:['{u}은(는) 산탄마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹부채탄의 경로에서 몸을 뺀다.', '{u}의 산탄마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹부채탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹부채탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 겹부채탄을 중단한다.', '{u}의 겹부채탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C10'
  },
  {
    id:'SK_C0189', name:'접근차단탄', en:'Scatter Caster Coverage', scope:'class', cls:'CLS_C019',
    grade:3, rarity:3, tier:3, desc:'산탄마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 접근차단탄을 진입 차단 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['진입 차단', '퍼지는 마력 알갱이'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0190'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 산탄마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접근차단탄이 필요한 위치에 닿지 않는다.', '{u}은(는) 접근차단탄을 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 접근차단탄의 범위와 출력을 정확히 맞춘다.', '{u}의 접근차단탄이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 접근차단탄을 중단한다.', '{u}의 접근차단탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0190', name:'잔열내성', en:'Scatter Caster Feedback', scope:'class', cls:'CLS_C019',
    grade:4, rarity:3, tier:4, desc:'산탄마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 거리가 멀면 탄이 흩어진다.', lore:'소형 군체 저지 계약에서 잔열내성을 재장전 대응 용도로 쓴다. 거리가 멀면 탄이 흩어진다.',
    tags:['재장전 대응', '퍼지는 마력 알갱이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0181'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 산탄마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔열내성이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔열내성을 멈추고 산탄마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔열내성의 범위와 출력을 정확히 맞춘다.', '{u}의 잔열내성이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 산탄마력총의 상태가 맞지 않아 잔열내성을 중단한다.', '{u}의 잔열내성이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0191', name:'고정점탄', en:'Long Shot Worker Contact', scope:'class', cls:'CLS_C020',
    grade:2, rarity:1, tier:1, desc:'움직임을 멈추고 먼 표적의 한 점을 쏜다. 준비하는 동안 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 고정점탄을 공격 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['공격', '먼 표적의 노출 부위'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.6, kind2:'AK_RANGED', acc:2,
    crit:1, cost:{mp:15, cd:4, cast:1}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0192'], lines:{use:['{u}은(는) 장거리마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 고정점탄이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 고정점탄을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 고정점탄의 경로에서 몸을 뺀다.', '{u}의 장거리마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 고정점탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 고정점탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 고정점탄을 중단한다.', '{u}의 고정점탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C10'
  },
  {
    id:'SK_C0192', name:'사대방호', en:'Long Shot Worker Guard', scope:'class', cls:'CLS_C020',
    grade:1, rarity:1, tier:1, desc:'장거리마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 사대방호를 근접 방호 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['근접 방호', '먼 표적의 노출 부위'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0193'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장거리마력총을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사대방호가 필요한 위치에 닿지 않는다.', '{u}은(는) 사대방호를 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 사대방호의 범위와 출력을 정확히 맞춘다.', '{u}의 사대방호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 사대방호를 중단한다.', '{u}의 사대방호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0193', name:'노출표시', en:'Long Shot Worker Set', scope:'class', cls:'CLS_C020',
    grade:1, rarity:1, tier:1, desc:'장거리마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 노출표시를 발 묶기 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['발 묶기', '먼 표적의 노출 부위'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0194'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장거리마력총의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 노출표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 노출표시를 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 노출표시의 범위와 출력을 정확히 맞춘다.', '{u}의 노출표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 노출표시를 중단한다.', '{u}의 노출표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0194', name:'사대옮김', en:'Long Shot Worker Step', scope:'class', cls:'CLS_C020',
    grade:2, rarity:1, tier:1, desc:'장거리마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 사대옮김을 사격 위치 변경 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['사격 위치 변경', '먼 표적의 노출 부위'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0195'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장거리마력총을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 사대옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 사대옮김을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 사대옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 사대옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 사대옮김을 중단한다.', '{u}의 사대옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0195', name:'흔들림눈', en:'Long Shot Worker Reading', scope:'class', cls:'CLS_C020',
    grade:1, rarity:1, tier:1, desc:'먼 표적의 노출 부위를 살펴 사격 전에 궤적의 오차를 가늠한다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 흔들림눈을 탄도 감지 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['탄도 감지', '먼 표적의 노출 부위'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0196'], lines:{use:['{u}의 {s}이(가) 발동한다. 먼 표적의 노출 부위를 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 흔들림눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 흔들림눈을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 흔들림눈의 범위와 출력을 정확히 맞춘다.', '{u}의 흔들림눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 흔들림눈을 중단한다.', '{u}의 흔들림눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0196', name:'멈춤호흡', en:'Long Shot Worker Discipline', scope:'class', cls:'CLS_C020',
    grade:1, rarity:1, tier:1, desc:'장거리마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 멈춤호흡을 조준 유지 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['조준 유지', '먼 표적의 노출 부위'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0197'], lines:{use:['{u}의 {s}이(가) 발동한다. 장거리마력총을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 멈춤호흡이 필요한 위치에 닿지 않는다.', '{u}은(는) 멈춤호흡을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 멈춤호흡의 범위와 출력을 정확히 맞춘다.', '{u}의 멈춤호흡이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 멈춤호흡을 중단한다.', '{u}의 멈춤호흡이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0197', name:'긴사선감', en:'Long Shot Worker Foundation', scope:'class', cls:'CLS_C020',
    grade:2, rarity:1, tier:1, desc:'장거리마력총의 장력을 익혀 준비 동작의 낭비를 줄인다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 긴사선감을 장비 적응 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['장비 적응', '먼 표적의 노출 부위'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0198'], lines:{use:['{u}의 {s}이(가) 발동한다. 장거리마력총의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 긴사선감이 필요한 위치에 닿지 않는다.', '{u}은(는) 긴사선감을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 긴사선감의 범위와 출력을 정확히 맞춘다.', '{u}의 긴사선감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 긴사선감을 중단한다.', '{u}의 긴사선감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0198', name:'관절정탄', en:'Long Shot Worker Sequence', scope:'class', cls:'CLS_C020',
    grade:2, rarity:3, tier:2, desc:'장거리마력총에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 관절정탄을 분산 사격 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['분산 사격', '먼 표적의 노출 부위'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:0,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0199'], lines:{use:['{u}은(는) 장거리마력총의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 관절정탄의 경로에서 몸을 뺀다.', '{u}의 장거리마력총이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 관절정탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 관절정탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 관절정탄을 중단한다.', '{u}의 관절정탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0199', name:'퇴각엄호탄', en:'Long Shot Worker Coverage', scope:'class', cls:'CLS_C020',
    grade:3, rarity:3, tier:3, desc:'장거리마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 퇴각엄호탄을 진입 차단 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['진입 차단', '먼 표적의 노출 부위'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0200'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장거리마력총의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 퇴각엄호탄이 필요한 위치에 닿지 않는다.', '{u}은(는) 퇴각엄호탄을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴각엄호탄의 범위와 출력을 정확히 맞춘다.', '{u}의 퇴각엄호탄이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 퇴각엄호탄을 중단한다.', '{u}의 퇴각엄호탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0200', name:'조준풀림', en:'Long Shot Worker Feedback', scope:'class', cls:'CLS_C020',
    grade:4, rarity:3, tier:4, desc:'장거리마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 오래 조준하면 주변 시야가 좁아진다.', lore:'외곽 게이트 감시 계약에서 조준풀림을 재장전 대응 용도로 쓴다. 오래 조준하면 주변 시야가 좁아진다.',
    tags:['재장전 대응', '먼 표적의 노출 부위'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0191'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 장거리마력총의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 조준풀림이 필요한 위치에 닿지 않는다.', '{u}은(는) 조준풀림을 멈추고 장거리마력총의 위치를 다시 잡는다.'], crit:['{u}은(는) 조준풀림의 범위와 출력을 정확히 맞춘다.', '{u}의 조준풀림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장거리마력총의 상태가 맞지 않아 조준풀림을 중단한다.', '{u}의 조준풀림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0201', name:'원반표창', en:'Star Thrower Contact', scope:'class', cls:'CLS_C021',
    grade:2, rarity:1, tier:1, desc:'철제표창에서 발사체 하나를 보내 노출된 부위를 노린다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 원반표창을 공격 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['공격', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:1,
    crit:1, cost:{stamina:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0202'], lines:{use:['{u}은(는) 철제표창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 원반표창이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 원반표창을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 원반표창의 경로에서 몸을 뺀다.', '{u}의 철제표창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 원반표창이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 원반표창의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 원반표창을 중단한다.', '{u}의 원반표창이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0202', name:'회전가림', en:'Star Thrower Guard', scope:'class', cls:'CLS_C021',
    grade:1, rarity:1, tier:1, desc:'철제표창을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 회전가림을 근접 방호 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['근접 방호', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0203'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철제표창을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 회전가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 회전가림을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전가림의 범위와 출력을 정확히 맞춘다.', '{u}의 회전가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 회전가림을 중단한다.', '{u}의 회전가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0203', name:'옷자락고정', en:'Star Thrower Set', scope:'class', cls:'CLS_C021',
    grade:1, rarity:1, tier:1, desc:'철제표창의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 옷자락고정을 발 묶기 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['발 묶기', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0204'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철제표창의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 옷자락고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 옷자락고정을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 옷자락고정의 범위와 출력을 정확히 맞춘다.', '{u}의 옷자락고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 옷자락고정을 중단한다.', '{u}의 옷자락고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0204', name:'낮은미끄럼', en:'Star Thrower Step', scope:'class', cls:'CLS_C021',
    grade:2, rarity:1, tier:1, desc:'철제표창을 안전 방향으로 둔 채 사선 밖으로 물러난다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 낮은미끄럼을 사격 위치 변경 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['사격 위치 변경', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0205'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철제표창을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 낮은미끄럼이 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은미끄럼을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은미끄럼의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은미끄럼이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 낮은미끄럼을 중단한다.', '{u}의 낮은미끄럼이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0205', name:'반사각눈', en:'Star Thrower Reading', scope:'class', cls:'CLS_C021',
    grade:1, rarity:1, tier:1, desc:'회전 날의 접촉면을 살펴 사격 전에 궤적의 오차를 가늠한다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 반사각눈을 탄도 감지 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['탄도 감지', '회전 날의 접촉면', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0206'], lines:{use:['{u}의 {s}이(가) 발동한다. 회전 날의 접촉면을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반사각눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 반사각눈을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 반사각눈의 범위와 출력을 정확히 맞춘다.', '{u}의 반사각눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 반사각눈을 중단한다.', '{u}의 반사각눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0206', name:'손끝간격', en:'Star Thrower Discipline', scope:'class', cls:'CLS_C021',
    grade:1, rarity:1, tier:1, desc:'철제표창을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 손끝간격을 조준 유지 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['조준 유지', '회전 날의 접촉면', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0207'], lines:{use:['{u}의 {s}이(가) 발동한다. 철제표창을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손끝간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 손끝간격을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 손끝간격의 범위와 출력을 정확히 맞춘다.', '{u}의 손끝간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 손끝간격을 중단한다.', '{u}의 손끝간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0207', name:'회전날감', en:'Star Thrower Foundation', scope:'class', cls:'CLS_C021',
    grade:2, rarity:1, tier:1, desc:'철제표창의 장력을 익혀 준비 동작의 낭비를 줄인다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 회전날감을 장비 적응 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['장비 적응', '회전 날의 접촉면', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0208'], lines:{use:['{u}의 {s}이(가) 발동한다. 철제표창의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회전날감이 필요한 위치에 닿지 않는다.', '{u}은(는) 회전날감을 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전날감의 범위와 출력을 정확히 맞춘다.', '{u}의 회전날감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 회전날감을 중단한다.', '{u}의 회전날감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0208', name:'세갈래표창', en:'Star Thrower Sequence', scope:'class', cls:'CLS_C021',
    grade:2, rarity:3, tier:2, desc:'세 표창을 다른 각도로 나눠 던진다. 돌벽 반사각에 동료가 있으면 멈춘다.', lore:'수풀 게이트 측면 정리에서 세갈래표창을 분산 사격 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['분산 사격', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:3, power:0.6, kind2:'AK_RANGED', acc:1,
    crit:1, cost:{stamina:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0209'], lines:{use:['{u}은(는) 철제표창의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 세갈래표창의 경로에서 몸을 뺀다.', '{u}의 철제표창이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 세갈래표창이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 세갈래표창의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 세갈래표창을 중단한다.', '{u}의 세갈래표창이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0209', name:'진입선베기', en:'Star Thrower Coverage', scope:'class', cls:'CLS_C021',
    grade:3, rarity:3, tier:3, desc:'철제표창의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 진입선베기를 진입 차단 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['진입 차단', '회전 날의 접촉면', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0210'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철제표창의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 진입선베기가 필요한 위치에 닿지 않는다.', '{u}은(는) 진입선베기를 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 진입선베기의 범위와 출력을 정확히 맞춘다.', '{u}의 진입선베기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 진입선베기를 중단한다.', '{u}의 진입선베기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0210', name:'튕김경계', en:'Star Thrower Feedback', scope:'class', cls:'CLS_C021',
    grade:4, rarity:3, tier:4, desc:'철제표창의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 돌벽에 튕긴 날이 위험하다.', lore:'수풀 게이트 측면 정리에서 튕김경계를 재장전 대응 용도로 쓴다. 돌벽에 튕긴 날이 위험하다.',
    tags:['재장전 대응', '회전 날의 접촉면', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0201'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철제표창의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 튕김경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 튕김경계를 멈추고 철제표창의 위치를 다시 잡는다.'], crit:['{u}은(는) 튕김경계의 범위와 출력을 정확히 맞춘다.', '{u}의 튕김경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철제표창의 상태가 맞지 않아 튕김경계를 중단한다.', '{u}의 튕김경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0211', name:'매듭추탄', en:'Net Launcher Contact', scope:'class', cls:'CLS_C022',
    grade:2, rarity:1, tier:1, desc:'투망기의 매듭추 하나로 대상의 발치를 친다. 무거운 개체를 쓰러뜨리지는 못한다.', lore:'군체 포획 및 구조 보조에서 매듭추탄을 공격 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['공격', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:0.65, kind2:'AK_RANGED', acc:-1,
    crit:1, cost:{stamina:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0212'], lines:{use:['{u}은(는) 투망기의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 매듭추탄이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 매듭추탄을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 매듭추탄의 경로에서 몸을 뺀다.', '{u}의 투망기가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 매듭추탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 매듭추탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 매듭추탄을 중단한다.', '{u}의 매듭추탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0212', name:'그물받침', en:'Net Launcher Guard', scope:'class', cls:'CLS_C022',
    grade:1, rarity:1, tier:1, desc:'투망기를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 그물받침을 근접 방호 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['근접 방호', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0213'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투망기를 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 그물받침이 필요한 위치에 닿지 않는다.', '{u}은(는) 그물받침을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 그물받침의 범위와 출력을 정확히 맞춘다.', '{u}의 그물받침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 그물받침을 중단한다.', '{u}의 그물받침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0213', name:'투망펼침', en:'Net Launcher Set', scope:'class', cls:'CLS_C022',
    grade:1, rarity:1, tier:1, desc:'그물코를 넓게 펼쳐 적의 발과 팔을 묶는다. 날카로운 외피에는 그물이 찢어진다.', lore:'군체 포획 및 구조 보조에서 투망펼침을 발 묶기 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['발 묶기', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.85, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0214'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 그물코를 넓게 펼쳐 적의 발과 팔을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 투망펼침이 필요한 위치에 닿지 않는다.', '{u}은(는) 투망펼침을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 투망펼침의 범위와 출력을 정확히 맞춘다.', '{u}의 투망펼침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 투망펼침을 중단한다.', '{u}의 투망펼침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0214', name:'줄따라빠짐', en:'Net Launcher Step', scope:'class', cls:'CLS_C022',
    grade:2, rarity:1, tier:1, desc:'투망기를 안전 방향으로 둔 채 사선 밖으로 물러난다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 줄따라빠짐을 사격 위치 변경 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['사격 위치 변경', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0215'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투망기를 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 줄따라빠짐이 필요한 위치에 닿지 않는다.', '{u}은(는) 줄따라빠짐을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 줄따라빠짐의 범위와 출력을 정확히 맞춘다.', '{u}의 줄따라빠짐이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 줄따라빠짐을 중단한다.', '{u}의 줄따라빠짐이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0215', name:'그물코눈', en:'Net Launcher Reading', scope:'class', cls:'CLS_C022',
    grade:1, rarity:1, tier:1, desc:'그물코에 걸리는 움직임을 살펴 사격 전에 궤적의 오차를 가늠한다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 그물코눈을 탄도 감지 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['탄도 감지', '그물코에 걸리는 움직임', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0216'], lines:{use:['{u}의 {s}이(가) 발동한다. 그물코에 걸리는 움직임을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 그물코눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 그물코눈을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 그물코눈의 범위와 출력을 정확히 맞춘다.', '{u}의 그물코눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 그물코눈을 중단한다.', '{u}의 그물코눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0216', name:'매듭기억', en:'Net Launcher Discipline', scope:'class', cls:'CLS_C022',
    grade:1, rarity:1, tier:1, desc:'투망기를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 매듭기억을 조준 유지 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['조준 유지', '그물코에 걸리는 움직임', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0217'], lines:{use:['{u}의 {s}이(가) 발동한다. 투망기를 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 매듭기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 매듭기억을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 매듭기억의 범위와 출력을 정확히 맞춘다.', '{u}의 매듭기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 매듭기억을 중단한다.', '{u}의 매듭기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0217', name:'장력분담', en:'Net Launcher Foundation', scope:'class', cls:'CLS_C022',
    grade:2, rarity:1, tier:1, desc:'투망기의 장력을 익혀 준비 동작의 낭비를 줄인다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 장력분담을 장비 적응 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['장비 적응', '그물코에 걸리는 움직임', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0218'], lines:{use:['{u}의 {s}이(가) 발동한다. 투망기의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 장력분담이 필요한 위치에 닿지 않는다.', '{u}은(는) 장력분담을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 장력분담의 범위와 출력을 정확히 맞춘다.', '{u}의 장력분담이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 장력분담을 중단한다.', '{u}의 장력분담이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0218', name:'겹그물탄', en:'Net Launcher Sequence', scope:'class', cls:'CLS_C022',
    grade:2, rarity:3, tier:2, desc:'투망기에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 겹그물탄을 분산 사격 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['분산 사격', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:-1,
    crit:-1, cost:{stamina:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0219'], lines:{use:['{u}은(는) 투망기의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹그물탄의 경로에서 몸을 뺀다.', '{u}의 투망기가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹그물탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹그물탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 겹그물탄을 중단한다.', '{u}의 겹그물탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0219', name:'통로망침', en:'Net Launcher Coverage', scope:'class', cls:'CLS_C022',
    grade:3, rarity:3, tier:3, desc:'투망기의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 통로망침을 진입 차단 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['진입 차단', '그물코에 걸리는 움직임', '발사체 필요'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0220'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투망기의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 통로망침이 필요한 위치에 닿지 않는다.', '{u}은(는) 통로망침을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 통로망침의 범위와 출력을 정확히 맞춘다.', '{u}의 통로망침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 통로망침을 중단한다.', '{u}의 통로망침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0220', name:'찢김감각', en:'Net Launcher Feedback', scope:'class', cls:'CLS_C022',
    grade:4, rarity:3, tier:4, desc:'투망기의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 무거운 개체는 그물을 찢는다.', lore:'군체 포획 및 구조 보조에서 찢김감각을 재장전 대응 용도로 쓴다. 무거운 개체는 그물을 찢는다.',
    tags:['재장전 대응', '그물코에 걸리는 움직임', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0211'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 투망기의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 찢김감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 찢김감각을 멈추고 투망기의 위치를 다시 잡는다.'], crit:['{u}은(는) 찢김감각의 범위와 출력을 정확히 맞춘다.', '{u}의 찢김감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투망기의 상태가 맞지 않아 찢김감각을 중단한다.', '{u}의 찢김감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0221', name:'짧은탄쏘기', en:'Pellet Bow Worker Contact', scope:'class', cls:'CLS_C023',
    grade:2, rarity:2, tier:1, desc:'탄궁에서 발사체 하나를 보내 노출된 부위를 노린다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 짧은탄쏘기를 공격 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['공격', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_RANGED', acc:0,
    crit:1, cost:{stamina:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0222'], lines:{use:['{u}은(는) 탄궁의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 짧은탄쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 짧은탄쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 짧은탄쏘기의 경로에서 몸을 뺀다.', '{u}의 탄궁이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 짧은탄쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 짧은탄쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 짧은탄쏘기를 중단한다.', '{u}의 짧은탄쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0222', name:'탄띠튕김', en:'Pellet Bow Worker Guard', scope:'class', cls:'CLS_C023',
    grade:1, rarity:2, tier:1, desc:'탄궁을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 탄띠튕김을 근접 방호 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['근접 방호', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0223'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 탄궁을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탄띠튕김이 필요한 위치에 닿지 않는다.', '{u}은(는) 탄띠튕김을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄띠튕김의 범위와 출력을 정확히 맞춘다.', '{u}의 탄띠튕김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 탄띠튕김을 중단한다.', '{u}의 탄띠튕김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0223', name:'반사띠박음', en:'Pellet Bow Worker Set', scope:'class', cls:'CLS_C023',
    grade:1, rarity:2, tier:1, desc:'탄궁의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 반사띠박음을 발 묶기 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['발 묶기', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0224'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 탄궁의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 반사띠박음이 필요한 위치에 닿지 않는다.', '{u}은(는) 반사띠박음을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 반사띠박음의 범위와 출력을 정확히 맞춘다.', '{u}의 반사띠박음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 반사띠박음을 중단한다.', '{u}의 반사띠박음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0224', name:'기둥돌기', en:'Pellet Bow Worker Step', scope:'class', cls:'CLS_C023',
    grade:2, rarity:2, tier:1, desc:'탄궁을 안전 방향으로 둔 채 사선 밖으로 물러난다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 기둥돌기를 사격 위치 변경 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['사격 위치 변경', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0225'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 탄궁을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 기둥돌기가 필요한 위치에 닿지 않는다.', '{u}은(는) 기둥돌기를 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 기둥돌기의 범위와 출력을 정확히 맞춘다.', '{u}의 기둥돌기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 기둥돌기를 중단한다.', '{u}의 기둥돌기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0225', name:'탄성가늠', en:'Pellet Bow Worker Reading', scope:'class', cls:'CLS_C023',
    grade:1, rarity:2, tier:1, desc:'작은 탄환의 탄성을 살펴 사격 전에 궤적의 오차를 가늠한다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 탄성가늠을 탄도 감지 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['탄도 감지', '작은 탄환의 탄성', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0226'], lines:{use:['{u}의 {s}이(가) 발동한다. 작은 탄환의 탄성을 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탄성가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 탄성가늠을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄성가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 탄성가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 탄성가늠을 중단한다.', '{u}의 탄성가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0226', name:'손등기준', en:'Pellet Bow Worker Discipline', scope:'class', cls:'CLS_C023',
    grade:1, rarity:2, tier:1, desc:'탄궁을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 손등기준을 조준 유지 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['조준 유지', '작은 탄환의 탄성', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0227'], lines:{use:['{u}의 {s}이(가) 발동한다. 탄궁을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손등기준이 필요한 위치에 닿지 않는다.', '{u}은(는) 손등기준을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 손등기준의 범위와 출력을 정확히 맞춘다.', '{u}의 손등기준이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 손등기준을 중단한다.', '{u}의 손등기준이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0227', name:'탄환배열', en:'Pellet Bow Worker Foundation', scope:'class', cls:'CLS_C023',
    grade:2, rarity:2, tier:1, desc:'탄궁의 장력을 익혀 준비 동작의 낭비를 줄인다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 탄환배열을 장비 적응 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['장비 적응', '작은 탄환의 탄성', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0228'], lines:{use:['{u}의 {s}이(가) 발동한다. 탄궁의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탄환배열이 필요한 위치에 닿지 않는다.', '{u}은(는) 탄환배열을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 탄환배열의 범위와 출력을 정확히 맞춘다.', '{u}의 탄환배열이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 탄환배열을 중단한다.', '{u}의 탄환배열이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0228', name:'연속철탄', en:'Pellet Bow Worker Sequence', scope:'class', cls:'CLS_C023',
    grade:2, rarity:3, tier:2, desc:'탄궁에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 연속철탄을 분산 사격 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['분산 사격', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:0,
    crit:-1, cost:{stamina:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0229'], lines:{use:['{u}은(는) 탄궁의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 연속철탄의 경로에서 몸을 뺀다.', '{u}의 탄궁이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 연속철탄이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 연속철탄의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 연속철탄을 중단한다.', '{u}의 연속철탄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0229', name:'발밑쏘기', en:'Pellet Bow Worker Coverage', scope:'class', cls:'CLS_C023',
    grade:3, rarity:3, tier:3, desc:'발밑에 작은 철탄을 연속으로 보내 접근을 늦춘다. 돌바닥에서는 탄이 튀어 오른다.', lore:'장비 경량화 파티 후열에서 발밑쏘기를 진입 차단 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['진입 차단', '작은 탄환의 탄성', '발사체 필요'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C007', turns:2, chance:0.7}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0230'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발밑에 작은 철탄을 연속으로 보내 접근을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발밑쏘기가 필요한 위치에 닿지 않는다.', '{u}은(는) 발밑쏘기를 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 발밑쏘기의 범위와 출력을 정확히 맞춘다.', '{u}의 발밑쏘기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 발밑쏘기를 중단한다.', '{u}의 발밑쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0230', name:'당김회복', en:'Pellet Bow Worker Feedback', scope:'class', cls:'CLS_C023',
    grade:4, rarity:3, tier:4, desc:'탄궁의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 고무줄이 젖으면 탄도가 달라진다.', lore:'장비 경량화 파티 후열에서 당김회복을 재장전 대응 용도로 쓴다. 고무줄이 젖으면 탄도가 달라진다.',
    tags:['재장전 대응', '작은 탄환의 탄성', '발사체 필요'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0221'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 탄궁의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 당김회복이 필요한 위치에 닿지 않는다.', '{u}은(는) 당김회복을 멈추고 탄궁의 위치를 다시 잡는다.'], crit:['{u}은(는) 당김회복의 범위와 출력을 정확히 맞춘다.', '{u}의 당김회복이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탄궁의 상태가 맞지 않아 당김회복을 중단한다.', '{u}의 당김회복이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0231', name:'철환밀기', en:'Iron Orb Operator Contact', scope:'class', cls:'CLS_C024',
    grade:2, rarity:2, tier:1, desc:'띄운 철구 하나를 밀어 가까운 적을 친다. 무거운 철구를 오래 유지하지 못한다.', lore:'철갑 개체 외피 견제에서 철환밀기를 공격 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['공격', '마력으로 민 철구'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.2, kind2:'AK_RANGED', acc:1,
    crit:1, cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0232'], lines:{use:['{u}은(는) 철환의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 철환밀기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 철환밀기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 철환밀기의 경로에서 몸을 뺀다.', '{u}의 철환이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 철환밀기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 철환밀기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철환밀기를 중단한다.', '{u}의 철환밀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', el:'EL_C12'
  },
  {
    id:'SK_C0232', name:'철구받침', en:'Iron Orb Operator Guard', scope:'class', cls:'CLS_C024',
    grade:1, rarity:2, tier:1, desc:'철환을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 철구받침을 근접 방호 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['근접 방호', '마력으로 민 철구'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0233'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철환을 몸 가까이 붙여 급한 접촉 충격을 받아 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철구받침이 필요한 위치에 닿지 않는다.', '{u}은(는) 철구받침을 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 철구받침의 범위와 출력을 정확히 맞춘다.', '{u}의 철구받침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철구받침을 중단한다.', '{u}의 철구받침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0233', name:'철환매듭', en:'Iron Orb Operator Set', scope:'class', cls:'CLS_C024',
    grade:1, rarity:2, tier:1, desc:'철환의 발사체를 대상의 발치에 걸어 이동을 늦춘다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 철환매듭을 발 묶기 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['발 묶기', '마력으로 민 철구'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{enemies:1}, risk:1, side:['사격 준비 중 주변 시야가 좁아진다.'],
    combo:['SK_C0234'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철환의 발사체를 대상의 발치에 걸어 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철환매듭이 필요한 위치에 닿지 않는다.', '{u}은(는) 철환매듭을 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 철환매듭의 범위와 출력을 정확히 맞춘다.', '{u}의 철환매듭이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철환매듭을 중단한다.', '{u}의 철환매듭이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0234', name:'철구회수보', en:'Iron Orb Operator Step', scope:'class', cls:'CLS_C024',
    grade:2, rarity:2, tier:1, desc:'철환을 안전 방향으로 둔 채 사선 밖으로 물러난다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 철구회수보를 사격 위치 변경 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['사격 위치 변경', '마력으로 민 철구'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{stamina:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A02', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0235'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철환을 안전 방향으로 둔 채 사선 밖으로 물러난다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철구회수보가 필요한 위치에 닿지 않는다.', '{u}은(는) 철구회수보를 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 철구회수보의 범위와 출력을 정확히 맞춘다.', '{u}의 철구회수보가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철구회수보를 중단한다.', '{u}의 철구회수보가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0235', name:'질량가늠', en:'Iron Orb Operator Reading', scope:'class', cls:'CLS_C024',
    grade:1, rarity:2, tier:1, desc:'마력으로 민 철구를 살펴 사격 전에 궤적의 오차를 가늠한다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 질량가늠을 탄도 감지 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['탄도 감지', '마력으로 민 철구'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0236'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력으로 민 철구를 살펴 사격 전에 궤적의 오차를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 질량가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 질량가늠을 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 질량가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 질량가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 질량가늠을 중단한다.', '{u}의 질량가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0236', name:'궤도유지', en:'Iron Orb Operator Discipline', scope:'class', cls:'CLS_C024',
    grade:1, rarity:2, tier:1, desc:'철환을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 궤도유지를 조준 유지 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['조준 유지', '마력으로 민 철구'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0237'], lines:{use:['{u}의 {s}이(가) 발동한다. 철환을 같은 높이로 유지하며 호흡에 따른 흔들림을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 궤도유지가 필요한 위치에 닿지 않는다.', '{u}은(는) 궤도유지를 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 궤도유지의 범위와 출력을 정확히 맞춘다.', '{u}의 궤도유지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 궤도유지를 중단한다.', '{u}의 궤도유지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0237', name:'철구부양감', en:'Iron Orb Operator Foundation', scope:'class', cls:'CLS_C024',
    grade:2, rarity:2, tier:1, desc:'철환의 장력을 익혀 준비 동작의 낭비를 줄인다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 철구부양감을 장비 적응 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['장비 적응', '마력으로 민 철구'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0238'], lines:{use:['{u}의 {s}이(가) 발동한다. 철환의 장력을 익혀 준비 동작의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 철구부양감이 필요한 위치에 닿지 않는다.', '{u}은(는) 철구부양감을 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 철구부양감의 범위와 출력을 정확히 맞춘다.', '{u}의 철구부양감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철구부양감을 중단한다.', '{u}의 철구부양감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0238', name:'철환교차', en:'Iron Orb Operator Sequence', scope:'class', cls:'CLS_C024',
    grade:2, rarity:3, tier:2, desc:'철환에서 발사체를 나눠 보내 떨어진 두 대상을 견제한다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 철환교차를 분산 사격 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['분산 사격', '마력으로 민 철구'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_RANGED', acc:1,
    crit:-1, cost:{stamina:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A02', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A02:8}}, ai:{enemies:2}, risk:2,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0239'], lines:{use:['{u}은(는) 철환의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 사격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 철환교차의 경로에서 몸을 뺀다.', '{u}의 철환이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 철환교차가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 철환교차의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 철환교차를 중단한다.', '{u}의 철환교차가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0239', name:'회전철벽', en:'Iron Orb Operator Coverage', scope:'class', cls:'CLS_C024',
    grade:3, rarity:3, tier:3, desc:'철환의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 회전철벽을 진입 차단 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['진입 차단', '마력으로 민 철구'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{stamina:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A02', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:15,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A02:10}}, ai:{enemies:2}, risk:1,
    side:['사격 준비 중 주변 시야가 좁아진다.'], combo:['SK_C0240'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철환의 사선을 낮게 유지해 통로로 들어오는 적을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 회전철벽이 필요한 위치에 닿지 않는다.', '{u}은(는) 회전철벽을 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 회전철벽의 범위와 출력을 정확히 맞춘다.', '{u}의 회전철벽이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 회전철벽을 중단한다.', '{u}의 회전철벽이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0240', name:'궤도복귀', en:'Iron Orb Operator Feedback', scope:'class', cls:'CLS_C024',
    grade:4, rarity:3, tier:4, desc:'철환의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다. 무거운 철구를 오래 띄울 수 없다.', lore:'철갑 개체 외피 견제에서 궤도복귀를 재장전 대응 용도로 쓴다. 무거운 철구를 오래 띄울 수 없다.',
    tags:['재장전 대응', '마력으로 민 철구'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A02:12}}, risk:1, combo:['SK_C0231'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철환의 사격이 끝나면 다음 준비에 앞서 어긋난 동작을 바로잡는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 궤도복귀가 필요한 위치에 닿지 않는다.', '{u}은(는) 궤도복귀를 멈추고 철환의 위치를 다시 잡는다.'], crit:['{u}은(는) 궤도복귀의 범위와 출력을 정확히 맞춘다.', '{u}의 궤도복귀가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 철환의 상태가 맞지 않아 궤도복귀를 중단한다.', '{u}의 궤도복귀가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0241', name:'불씨쏘기', en:'Heat Channeler Contact', scope:'class', cls:'CLS_C025',
    grade:2, rarity:1, tier:1, desc:'국소 열과 작은 불씨를 좁은 점에 모아 적에게 보낸다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 불씨쏘기를 공격 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['공격', '국소 열과 작은 불씨'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:-1,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01',
    se:[{se:'SE_C002', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0242'], lines:{use:['{u}은(는) 내열봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 불씨쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 불씨쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 불씨쏘기의 경로에서 몸을 뺀다.', '{u}의 내열봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 불씨쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 불씨쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 불씨쏘기를 중단한다.', '{u}의 불씨쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0242', name:'내열겹막', en:'Heat Channeler Guard', scope:'class', cls:'CLS_C025',
    grade:1, rarity:1, tier:1, desc:'국소 열과 작은 불씨를 얇게 펴 가까운 충격을 받는 막으로 쓴다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 내열겹막을 방호막 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['방호막', '국소 열과 작은 불씨'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', shield:0.65,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0243'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 국소 열과 작은 불씨를 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 내열겹막이 필요한 위치에 닿지 않는다.', '{u}은(는) 내열겹막을 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 내열겹막의 범위와 출력을 정확히 맞춘다.', '{u}의 내열겹막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 내열겹막을 중단한다.', '{u}의 내열겹막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0243', name:'열선둘레', en:'Heat Channeler Set', scope:'class', cls:'CLS_C025',
    grade:1, rarity:1, tier:1, desc:'낮은 열선을 그어 진입 경로를 좁힌다. 가연물 곁에서는 선을 끊는다.', lore:'잔해 소각 현장 보조에서 열선둘레를 구역 제어 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['구역 제어', '국소 열과 작은 불씨'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', se:[{se:'SE_C002', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0244'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 낮은 열선을 그어 진입 경로를 좁힌다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 열선둘레가 필요한 위치에 닿지 않는다.', '{u}은(는) 열선둘레를 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 열선둘레의 범위와 출력을 정확히 맞춘다.', '{u}의 열선둘레가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 열선둘레를 중단한다.', '{u}의 열선둘레가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0244', name:'온풍딛기', en:'Heat Channeler Step', scope:'class', cls:'CLS_C025',
    grade:2, rarity:1, tier:1, desc:'국소 열과 작은 불씨를 이용해 옆으로 한 걸음 움직인다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 온풍딛기를 짧은 이동 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['짧은 이동', '국소 열과 작은 불씨'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0245'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 국소 열과 작은 불씨를 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 온풍딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 온풍딛기를 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 온풍딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 온풍딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 온풍딛기를 중단한다.', '{u}의 온풍딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0245', name:'잔열읽음', en:'Heat Channeler Reading', scope:'class', cls:'CLS_C025',
    grade:1, rarity:1, tier:1, desc:'국소 열과 작은 불씨의 변화를 읽어 가까운 위험 지점을 찾는다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 잔열읽음을 환경 감지 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['환경 감지', '국소 열과 작은 불씨'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0246'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 국소 열과 작은 불씨의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔열읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔열읽음을 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔열읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 잔열읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 잔열읽음을 중단한다.', '{u}의 잔열읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0246', name:'불꽃가늠', en:'Heat Channeler Discipline', scope:'class', cls:'CLS_C025',
    grade:1, rarity:1, tier:1, desc:'국소 열과 작은 불씨이 주변 물체에 미치는 변화를 먼저 알아챈다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 불꽃가늠을 위험 적응 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['위험 적응', '국소 열과 작은 불씨'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0247'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 국소 열과 작은 불씨이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 불꽃가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 불꽃가늠을 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 불꽃가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 불꽃가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 불꽃가늠을 중단한다.', '{u}의 불꽃가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0247', name:'열손실감', en:'Heat Channeler Foundation', scope:'class', cls:'CLS_C025',
    grade:2, rarity:1, tier:1, desc:'국소 열과 작은 불씨의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 열손실감을 출력 조절 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['출력 조절', '국소 열과 작은 불씨'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0248'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 국소 열과 작은 불씨의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 열손실감이 필요한 위치에 닿지 않는다.', '{u}은(는) 열손실감을 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 열손실감의 범위와 출력을 정확히 맞춘다.', '{u}의 열손실감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 열손실감을 중단한다.', '{u}의 열손실감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0248', name:'불씨분열', en:'Heat Channeler Sequence', scope:'class', cls:'CLS_C025',
    grade:2, rarity:3, tier:2, desc:'국소 열과 작은 불씨를 두 줄로 나눠 떨어진 적을 동시에 친다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 불씨분열을 분산 공격 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['분산 공격', '국소 열과 작은 불씨'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:-1,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01',
    se:[{se:'SE_C002', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0249'], lines:{use:['{u}은(는) 내열봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 불씨분열의 경로에서 몸을 뺀다.', '{u}의 내열봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 불씨분열이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 불씨분열의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 불씨분열을 중단한다.', '{u}의 불씨분열이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0249', name:'냉점차폐', en:'Heat Channeler Coverage', scope:'class', cls:'CLS_C025',
    grade:3, rarity:3, tier:3, desc:'국소 열과 작은 불씨이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 냉점차폐를 동료 차폐 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['동료 차폐', '국소 열과 작은 불씨'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', shield:0.9,
    se:[{se:'SE_C021', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0250'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 국소 열과 작은 불씨이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 냉점차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 냉점차폐를 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 냉점차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 냉점차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 냉점차폐를 중단한다.', '{u}의 냉점차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0250', name:'열길되짚기', en:'Heat Channeler Feedback', scope:'class', cls:'CLS_C025',
    grade:4, rarity:3, tier:4, desc:'국소 열과 작은 불씨의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 가연물 근처에서는 출력을 낮춘다.', lore:'잔해 소각 현장 보조에서 열길되짚기를 잔류 회수 용도로 쓴다. 가연물 근처에서는 출력을 낮춘다.',
    tags:['잔류 회수', '국소 열과 작은 불씨'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C01', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0241'], lines:{use:['{u}의 {s}이(가) 발동한다. 국소 열과 작은 불씨의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 열길되짚기가 필요한 위치에 닿지 않는다.', '{u}은(는) 열길되짚기를 멈추고 내열봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 열길되짚기의 범위와 출력을 정확히 맞춘다.', '{u}의 열길되짚기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 내열봉의 상태가 맞지 않아 열길되짚기를 중단한다.', '{u}의 열길되짚기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0251', name:'서리침', en:'Frost Channeler Contact', scope:'class', cls:'CLS_C026',
    grade:2, rarity:1, tier:1, desc:'얇은 얼음과 냉기를 좁은 점에 모아 적에게 보낸다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 서리침을 공격 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['공격', '얇은 얼음과 냉기'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:0,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02',
    se:[{se:'SE_C003', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0252'], lines:{use:['{u}은(는) 냉각봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 서리침이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 서리침을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 서리침의 경로에서 몸을 뺀다.', '{u}의 냉각봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 서리침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 서리침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 서리침을 중단한다.', '{u}의 서리침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0252', name:'결빙얇막', en:'Frost Channeler Guard', scope:'class', cls:'CLS_C026',
    grade:1, rarity:1, tier:1, desc:'얇은 얼음과 냉기를 얇게 펴 가까운 충격을 받는 막으로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 결빙얇막을 방호막 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['방호막', '얇은 얼음과 냉기'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0253'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 얇은 얼음과 냉기를 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 결빙얇막이 필요한 위치에 닿지 않는다.', '{u}은(는) 결빙얇막을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 결빙얇막의 범위와 출력을 정확히 맞춘다.', '{u}의 결빙얇막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 결빙얇막을 중단한다.', '{u}의 결빙얇막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0253', name:'발밑얼음', en:'Frost Channeler Set', scope:'class', cls:'CLS_C026',
    grade:1, rarity:1, tier:1, desc:'발밑 수분을 얇게 얼려 이동을 늦춘다. 해빙 뒤 아군도 미끄러질 수 있다.', lore:'냉각 설비 게이트 보조에서 발밑얼음을 구역 제어 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['구역 제어', '얇은 얼음과 냉기'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', se:[{se:'SE_C003', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0254'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발밑 수분을 얇게 얼려 이동을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발밑얼음이 필요한 위치에 닿지 않는다.', '{u}은(는) 발밑얼음을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 발밑얼음의 범위와 출력을 정확히 맞춘다.', '{u}의 발밑얼음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 발밑얼음을 중단한다.', '{u}의 발밑얼음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0254', name:'얼음발판', en:'Frost Channeler Step', scope:'class', cls:'CLS_C026',
    grade:2, rarity:1, tier:1, desc:'얇은 얼음과 냉기를 이용해 옆으로 한 걸음 움직인다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 얼음발판을 짧은 이동 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['짧은 이동', '얇은 얼음과 냉기'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0255'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 얇은 얼음과 냉기를 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 얼음발판이 필요한 위치에 닿지 않는다.', '{u}은(는) 얼음발판을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 얼음발판의 범위와 출력을 정확히 맞춘다.', '{u}의 얼음발판이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 얼음발판을 중단한다.', '{u}의 얼음발판이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0255', name:'냉점읽음', en:'Frost Channeler Reading', scope:'class', cls:'CLS_C026',
    grade:1, rarity:1, tier:1, desc:'얇은 얼음과 냉기의 변화를 읽어 가까운 위험 지점을 찾는다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 냉점읽음을 환경 감지 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['환경 감지', '얇은 얼음과 냉기'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0256'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 얇은 얼음과 냉기의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 냉점읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 냉점읽음을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 냉점읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 냉점읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 냉점읽음을 중단한다.', '{u}의 냉점읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0256', name:'서리균열감', en:'Frost Channeler Discipline', scope:'class', cls:'CLS_C026',
    grade:1, rarity:1, tier:1, desc:'얇은 얼음과 냉기이 주변 물체에 미치는 변화를 먼저 알아챈다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 서리균열감을 위험 적응 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['위험 적응', '얇은 얼음과 냉기'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0257'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 얇은 얼음과 냉기이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 서리균열감이 필요한 위치에 닿지 않는다.', '{u}은(는) 서리균열감을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 서리균열감의 범위와 출력을 정확히 맞춘다.', '{u}의 서리균열감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 서리균열감을 중단한다.', '{u}의 서리균열감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0257', name:'냉기보존', en:'Frost Channeler Foundation', scope:'class', cls:'CLS_C026',
    grade:2, rarity:1, tier:1, desc:'얇은 얼음과 냉기의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 냉기보존을 출력 조절 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['출력 조절', '얇은 얼음과 냉기'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0258'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 얇은 얼음과 냉기의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 냉기보존이 필요한 위치에 닿지 않는다.', '{u}은(는) 냉기보존을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 냉기보존의 범위와 출력을 정확히 맞춘다.', '{u}의 냉기보존이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 냉기보존을 중단한다.', '{u}의 냉기보존이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0258', name:'겹서리침', en:'Frost Channeler Sequence', scope:'class', cls:'CLS_C026',
    grade:2, rarity:3, tier:2, desc:'얇은 얼음과 냉기를 두 줄로 나눠 떨어진 적을 동시에 친다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 겹서리침을 분산 공격 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['분산 공격', '얇은 얼음과 냉기'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:0,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02',
    se:[{se:'SE_C003', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0259'], lines:{use:['{u}은(는) 냉각봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹서리침의 경로에서 몸을 뺀다.', '{u}의 냉각봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹서리침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹서리침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 겹서리침을 중단한다.', '{u}의 겹서리침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0259', name:'냉기완충', en:'Frost Channeler Coverage', scope:'class', cls:'CLS_C026',
    grade:3, rarity:3, tier:3, desc:'얇은 얼음과 냉기이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 냉기완충을 동료 차폐 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['동료 차폐', '얇은 얼음과 냉기'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', shield:0.9,
    se:[{se:'SE_C013', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0260'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 얇은 얼음과 냉기이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 냉기완충이 필요한 위치에 닿지 않는다.', '{u}은(는) 냉기완충을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 냉기완충의 범위와 출력을 정확히 맞춘다.', '{u}의 냉기완충이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 냉기완충을 중단한다.', '{u}의 냉기완충이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0260', name:'해빙가늠', en:'Frost Channeler Feedback', scope:'class', cls:'CLS_C026',
    grade:4, rarity:3, tier:4, desc:'얇은 얼음과 냉기의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 녹은 물이 아군 발을 미끄럽게 한다.', lore:'냉각 설비 게이트 보조에서 해빙가늠을 잔류 회수 용도로 쓴다. 녹은 물이 아군 발을 미끄럽게 한다.',
    tags:['잔류 회수', '얇은 얼음과 냉기'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C02', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0251'], lines:{use:['{u}의 {s}이(가) 발동한다. 얇은 얼음과 냉기의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 해빙가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 해빙가늠을 멈추고 냉각봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 해빙가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 해빙가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 냉각봉의 상태가 맞지 않아 해빙가늠을 중단한다.', '{u}의 해빙가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0261', name:'전류찍기', en:'Current Channeler Contact', scope:'class', cls:'CLS_C027',
    grade:2, rarity:1, tier:1, desc:'짧은 전류와 도체를 좁은 점에 모아 적에게 보낸다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 전류찍기를 공격 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['공격', '짧은 전류와 도체'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:1,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03',
    se:[{se:'SE_C004', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0262'], lines:{use:['{u}은(는) 절연봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 전류찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 전류찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 전류찍기의 경로에서 몸을 뺀다.', '{u}의 절연봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 전류찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 전류찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 전류찍기를 중단한다.', '{u}의 전류찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0262', name:'절연겹막', en:'Current Channeler Guard', scope:'class', cls:'CLS_C027',
    grade:1, rarity:1, tier:1, desc:'짧은 전류와 도체를 얇게 펴 가까운 충격을 받는 막으로 쓴다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 절연겹막을 방호막 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['방호막', '짧은 전류와 도체'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', shield:0.8500000000000001,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0263'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 짧은 전류와 도체를 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 절연겹막이 필요한 위치에 닿지 않는다.', '{u}은(는) 절연겹막을 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 절연겹막의 범위와 출력을 정확히 맞춘다.', '{u}의 절연겹막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 절연겹막을 중단한다.', '{u}의 절연겹막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0263', name:'접점묶기', en:'Current Channeler Set', scope:'class', cls:'CLS_C027',
    grade:1, rarity:1, tier:1, desc:'도체 접점에 전하를 걸어 근육의 동작을 흐트러뜨린다. 젖은 바닥에서는 누전에 주의한다.', lore:'전기 설비 인접 게이트 보조에서 접점묶기를 구역 제어 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['구역 제어', '짧은 전류와 도체'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', se:[{se:'SE_C004', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0264'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 도체 접점에 전하를 걸어 근육의 동작을 흐트러뜨린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접점묶기가 필요한 위치에 닿지 않는다.', '{u}은(는) 접점묶기를 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 접점묶기의 범위와 출력을 정확히 맞춘다.', '{u}의 접점묶기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 접점묶기를 중단한다.', '{u}의 접점묶기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0264', name:'방전도약', en:'Current Channeler Step', scope:'class', cls:'CLS_C027',
    grade:2, rarity:1, tier:1, desc:'짧은 전류와 도체를 이용해 옆으로 한 걸음 움직인다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 방전도약을 짧은 이동 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['짧은 이동', '짧은 전류와 도체'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0265'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 짧은 전류와 도체를 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 방전도약이 필요한 위치에 닿지 않는다.', '{u}은(는) 방전도약을 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 방전도약의 범위와 출력을 정확히 맞춘다.', '{u}의 방전도약이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 방전도약을 중단한다.', '{u}의 방전도약이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0265', name:'도체읽음', en:'Current Channeler Reading', scope:'class', cls:'CLS_C027',
    grade:1, rarity:1, tier:1, desc:'짧은 전류와 도체의 변화를 읽어 가까운 위험 지점을 찾는다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 도체읽음을 환경 감지 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['환경 감지', '짧은 전류와 도체'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0266'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 전류와 도체의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 도체읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 도체읽음을 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 도체읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 도체읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 도체읽음을 중단한다.', '{u}의 도체읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0266', name:'누전경계', en:'Current Channeler Discipline', scope:'class', cls:'CLS_C027',
    grade:1, rarity:1, tier:1, desc:'짧은 전류와 도체이 주변 물체에 미치는 변화를 먼저 알아챈다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 누전경계를 위험 적응 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['위험 적응', '짧은 전류와 도체'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0267'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 전류와 도체이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 누전경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 누전경계를 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 누전경계의 범위와 출력을 정확히 맞춘다.', '{u}의 누전경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 누전경계를 중단한다.', '{u}의 누전경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0267', name:'전하분배', en:'Current Channeler Foundation', scope:'class', cls:'CLS_C027',
    grade:2, rarity:1, tier:1, desc:'짧은 전류와 도체의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 전하분배를 출력 조절 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['출력 조절', '짧은 전류와 도체'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0268'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 전류와 도체의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 전하분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 전하분배를 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 전하분배의 범위와 출력을 정확히 맞춘다.', '{u}의 전하분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 전하분배를 중단한다.', '{u}의 전하분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0268', name:'가지방전', en:'Current Channeler Sequence', scope:'class', cls:'CLS_C027',
    grade:2, rarity:3, tier:2, desc:'짧은 전류와 도체를 두 줄로 나눠 떨어진 적을 동시에 친다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 가지방전을 분산 공격 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['분산 공격', '짧은 전류와 도체'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:1,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03',
    se:[{se:'SE_C004', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0269'], lines:{use:['{u}은(는) 절연봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 가지방전의 경로에서 몸을 뺀다.', '{u}의 절연봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 가지방전이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 가지방전의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 가지방전을 중단한다.', '{u}의 가지방전이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0269', name:'정전차폐', en:'Current Channeler Coverage', scope:'class', cls:'CLS_C027',
    grade:3, rarity:3, tier:3, desc:'짧은 전류와 도체이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 정전차폐를 동료 차폐 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['동료 차폐', '짧은 전류와 도체'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', shield:0.9,
    se:[{se:'SE_C020', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0270'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 짧은 전류와 도체이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 정전차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 정전차폐를 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 정전차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 정전차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 정전차폐를 중단한다.', '{u}의 정전차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0270', name:'잔류전류감', en:'Current Channeler Feedback', scope:'class', cls:'CLS_C027',
    grade:4, rarity:3, tier:4, desc:'짧은 전류와 도체의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 젖은 바닥에서는 우회 방전한다.', lore:'전기 설비 인접 게이트 보조에서 잔류전류감을 잔류 회수 용도로 쓴다. 젖은 바닥에서는 우회 방전한다.',
    tags:['잔류 회수', '짧은 전류와 도체'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C03', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0261'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 전류와 도체의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔류전류감이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔류전류감을 멈추고 절연봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔류전류감의 범위와 출력을 정확히 맞춘다.', '{u}의 잔류전류감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연봉의 상태가 맞지 않아 잔류전류감을 중단한다.', '{u}의 잔류전류감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0271', name:'압축바람', en:'Wind Channeler Contact', scope:'class', cls:'CLS_C028',
    grade:2, rarity:1, tier:1, desc:'좁게 모은 공기 흐름을 좁은 점에 모아 적에게 보낸다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 압축바람을 공격 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['공격', '좁게 모은 공기 흐름'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:-1,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0272'], lines:{use:['{u}은(는) 풍향봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 압축바람이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 압축바람을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 압축바람의 경로에서 몸을 뺀다.', '{u}의 풍향봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 압축바람이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 압축바람의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 압축바람을 중단한다.', '{u}의 압축바람이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0272', name:'바람덧막', en:'Wind Channeler Guard', scope:'class', cls:'CLS_C028',
    grade:1, rarity:1, tier:1, desc:'좁게 모은 공기 흐름을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 바람덧막을 방호막 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['방호막', '좁게 모은 공기 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', shield:0.65,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0273'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁게 모은 공기 흐름을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 바람덧막이 필요한 위치에 닿지 않는다.', '{u}은(는) 바람덧막을 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 바람덧막의 범위와 출력을 정확히 맞춘다.', '{u}의 바람덧막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 바람덧막을 중단한다.', '{u}의 바람덧막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0273', name:'맞바람띠', en:'Wind Channeler Set', scope:'class', cls:'CLS_C028',
    grade:1, rarity:1, tier:1, desc:'진입 방향으로 맞바람을 보내 보폭을 흐트러뜨린다. 분진도 함께 퍼질 수 있다.', lore:'유독 분진 현장 환기에서 맞바람띠를 구역 제어 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['구역 제어', '좁게 모은 공기 흐름'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', se:[{se:'SE_C007', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0274'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 진입 방향으로 맞바람을 보내 보폭을 흐트러뜨린다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 맞바람띠가 필요한 위치에 닿지 않는다.', '{u}은(는) 맞바람띠를 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 맞바람띠의 범위와 출력을 정확히 맞춘다.', '{u}의 맞바람띠가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 맞바람띠를 중단한다.', '{u}의 맞바람띠가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0274', name:'옆바람딛기', en:'Wind Channeler Step', scope:'class', cls:'CLS_C028',
    grade:2, rarity:1, tier:1, desc:'좁게 모은 공기 흐름을 이용해 옆으로 한 걸음 움직인다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 옆바람딛기를 짧은 이동 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['짧은 이동', '좁게 모은 공기 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0275'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁게 모은 공기 흐름을 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 옆바람딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 옆바람딛기를 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 옆바람딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 옆바람딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 옆바람딛기를 중단한다.', '{u}의 옆바람딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0275', name:'풍로읽음', en:'Wind Channeler Reading', scope:'class', cls:'CLS_C028',
    grade:1, rarity:1, tier:1, desc:'좁게 모은 공기 흐름의 변화를 읽어 가까운 위험 지점을 찾는다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 풍로읽음을 환경 감지 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['환경 감지', '좁게 모은 공기 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0276'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁게 모은 공기 흐름의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 풍로읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 풍로읽음을 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 풍로읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 풍로읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 풍로읽음을 중단한다.', '{u}의 풍로읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0276', name:'소용돌이감', en:'Wind Channeler Discipline', scope:'class', cls:'CLS_C028',
    grade:1, rarity:1, tier:1, desc:'좁게 모은 공기 흐름이 주변 물체에 미치는 변화를 먼저 알아챈다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 소용돌이감을 위험 적응 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['위험 적응', '좁게 모은 공기 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0277'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁게 모은 공기 흐름이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 소용돌이감이 필요한 위치에 닿지 않는다.', '{u}은(는) 소용돌이감을 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 소용돌이감의 범위와 출력을 정확히 맞춘다.', '{u}의 소용돌이감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 소용돌이감을 중단한다.', '{u}의 소용돌이감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0277', name:'기류보존', en:'Wind Channeler Foundation', scope:'class', cls:'CLS_C028',
    grade:2, rarity:1, tier:1, desc:'좁게 모은 공기 흐름의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 기류보존을 출력 조절 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['출력 조절', '좁게 모은 공기 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0278'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁게 모은 공기 흐름의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 기류보존이 필요한 위치에 닿지 않는다.', '{u}은(는) 기류보존을 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 기류보존의 범위와 출력을 정확히 맞춘다.', '{u}의 기류보존이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 기류보존을 중단한다.', '{u}의 기류보존이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0278', name:'갈래풍절', en:'Wind Channeler Sequence', scope:'class', cls:'CLS_C028',
    grade:2, rarity:3, tier:2, desc:'좁게 모은 공기 흐름을 두 줄로 나눠 떨어진 적을 동시에 친다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 갈래풍절을 분산 공격 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['분산 공격', '좁게 모은 공기 흐름'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:-1,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0279'], lines:{use:['{u}은(는) 풍향봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래풍절의 경로에서 몸을 뺀다.', '{u}의 풍향봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래풍절이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래풍절의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 갈래풍절을 중단한다.', '{u}의 갈래풍절이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0279', name:'하강풍막', en:'Wind Channeler Coverage', scope:'class', cls:'CLS_C028',
    grade:3, rarity:3, tier:3, desc:'좁게 모은 공기 흐름이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 하강풍막을 동료 차폐 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['동료 차폐', '좁게 모은 공기 흐름'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', shield:0.9,
    se:[{se:'SE_C013', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0280'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁게 모은 공기 흐름이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 하강풍막이 필요한 위치에 닿지 않는다.', '{u}은(는) 하강풍막을 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 하강풍막의 범위와 출력을 정확히 맞춘다.', '{u}의 하강풍막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 하강풍막을 중단한다.', '{u}의 하강풍막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0280', name:'흐름되읽기', en:'Wind Channeler Feedback', scope:'class', cls:'CLS_C028',
    grade:4, rarity:3, tier:4, desc:'좁게 모은 공기 흐름의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 밀폐 구역에서는 분진을 퍼뜨린다.', lore:'유독 분진 현장 환기에서 흐름되읽기를 잔류 회수 용도로 쓴다. 밀폐 구역에서는 분진을 퍼뜨린다.',
    tags:['잔류 회수', '좁게 모은 공기 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C04', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0271'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁게 모은 공기 흐름의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 흐름되읽기가 필요한 위치에 닿지 않는다.', '{u}은(는) 흐름되읽기를 멈추고 풍향봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 흐름되읽기의 범위와 출력을 정확히 맞춘다.', '{u}의 흐름되읽기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 풍향봉의 상태가 맞지 않아 흐름되읽기를 중단한다.', '{u}의 흐름되읽기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0281', name:'자갈쐐기', en:'Earth Channeler Contact', scope:'class', cls:'CLS_C029',
    grade:2, rarity:1, tier:1, desc:'다져진 흙과 자갈을 좁은 점에 모아 적에게 보낸다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 자갈쐐기를 공격 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['공격', '다져진 흙과 자갈'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:0,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05',
    se:[{se:'SE_C006', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0282'], lines:{use:['{u}은(는) 흙다짐봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 자갈쐐기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 자갈쐐기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 자갈쐐기의 경로에서 몸을 뺀다.', '{u}의 흙다짐봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 자갈쐐기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 자갈쐐기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 자갈쐐기를 중단한다.', '{u}의 자갈쐐기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0282', name:'흙겹받침', en:'Earth Channeler Guard', scope:'class', cls:'CLS_C029',
    grade:1, rarity:1, tier:1, desc:'다져진 흙과 자갈을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 흙겹받침을 방호막 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['방호막', '다져진 흙과 자갈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0283'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 다져진 흙과 자갈을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 흙겹받침이 필요한 위치에 닿지 않는다.', '{u}은(는) 흙겹받침을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 흙겹받침의 범위와 출력을 정확히 맞춘다.', '{u}의 흙겹받침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 흙겹받침을 중단한다.', '{u}의 흙겹받침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0283', name:'진흙발목', en:'Earth Channeler Set', scope:'class', cls:'CLS_C029',
    grade:1, rarity:1, tier:1, desc:'발치의 흙을 뭉쳐 발을 붙잡는다. 철판 위에서는 쓸 흙이 없다.', lore:'지반 불안정 구역 보조에서 진흙발목을 구역 제어 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['구역 제어', '다져진 흙과 자갈'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', se:[{se:'SE_C006', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0284'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발치의 흙을 뭉쳐 발을 붙잡는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 진흙발목이 필요한 위치에 닿지 않는다.', '{u}은(는) 진흙발목을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 진흙발목의 범위와 출력을 정확히 맞춘다.', '{u}의 진흙발목이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 진흙발목을 중단한다.', '{u}의 진흙발목이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0284', name:'흙턱딛기', en:'Earth Channeler Step', scope:'class', cls:'CLS_C029',
    grade:2, rarity:1, tier:1, desc:'다져진 흙과 자갈을 이용해 옆으로 한 걸음 움직인다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 흙턱딛기를 짧은 이동 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['짧은 이동', '다져진 흙과 자갈'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0285'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 다져진 흙과 자갈을 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 흙턱딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 흙턱딛기를 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 흙턱딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 흙턱딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 흙턱딛기를 중단한다.', '{u}의 흙턱딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0285', name:'지층읽음', en:'Earth Channeler Reading', scope:'class', cls:'CLS_C029',
    grade:1, rarity:1, tier:1, desc:'다져진 흙과 자갈의 변화를 읽어 가까운 위험 지점을 찾는다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 지층읽음을 환경 감지 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['환경 감지', '다져진 흙과 자갈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0286'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 다져진 흙과 자갈의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 지층읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 지층읽음을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 지층읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 지층읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 지층읽음을 중단한다.', '{u}의 지층읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0286', name:'침하경계', en:'Earth Channeler Discipline', scope:'class', cls:'CLS_C029',
    grade:1, rarity:1, tier:1, desc:'다져진 흙과 자갈이 주변 물체에 미치는 변화를 먼저 알아챈다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 침하경계를 위험 적응 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['위험 적응', '다져진 흙과 자갈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0287'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 다져진 흙과 자갈이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 침하경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 침하경계를 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 침하경계의 범위와 출력을 정확히 맞춘다.', '{u}의 침하경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 침하경계를 중단한다.', '{u}의 침하경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0287', name:'흙입자감', en:'Earth Channeler Foundation', scope:'class', cls:'CLS_C029',
    grade:2, rarity:1, tier:1, desc:'다져진 흙과 자갈의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 흙입자감을 출력 조절 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['출력 조절', '다져진 흙과 자갈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0288'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 다져진 흙과 자갈의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 흙입자감이 필요한 위치에 닿지 않는다.', '{u}은(는) 흙입자감을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 흙입자감의 범위와 출력을 정확히 맞춘다.', '{u}의 흙입자감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 흙입자감을 중단한다.', '{u}의 흙입자감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0288', name:'갈래토편', en:'Earth Channeler Sequence', scope:'class', cls:'CLS_C029',
    grade:2, rarity:3, tier:2, desc:'다져진 흙과 자갈을 두 줄로 나눠 떨어진 적을 동시에 친다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 갈래토편을 분산 공격 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['분산 공격', '다져진 흙과 자갈'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:0,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05',
    se:[{se:'SE_C006', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0289'], lines:{use:['{u}은(는) 흙다짐봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래토편의 경로에서 몸을 뺀다.', '{u}의 흙다짐봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래토편이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래토편의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 갈래토편을 중단한다.', '{u}의 갈래토편이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0289', name:'낮은둑막', en:'Earth Channeler Coverage', scope:'class', cls:'CLS_C029',
    grade:3, rarity:3, tier:3, desc:'다져진 흙과 자갈이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 낮은둑막을 동료 차폐 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['동료 차폐', '다져진 흙과 자갈'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', shield:0.9,
    se:[{se:'SE_C014', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0290'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 다져진 흙과 자갈이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 낮은둑막이 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은둑막을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은둑막의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은둑막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 낮은둑막을 중단한다.', '{u}의 낮은둑막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0290', name:'다짐회복', en:'Earth Channeler Feedback', scope:'class', cls:'CLS_C029',
    grade:4, rarity:3, tier:4, desc:'다져진 흙과 자갈의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 철판 위에서는 붙잡을 흙이 없다.', lore:'지반 불안정 구역 보조에서 다짐회복을 잔류 회수 용도로 쓴다. 철판 위에서는 붙잡을 흙이 없다.',
    tags:['잔류 회수', '다져진 흙과 자갈'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C05', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0281'], lines:{use:['{u}의 {s}이(가) 발동한다. 다져진 흙과 자갈의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 다짐회복이 필요한 위치에 닿지 않는다.', '{u}은(는) 다짐회복을 멈추고 흙다짐봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 다짐회복의 범위와 출력을 정확히 맞춘다.', '{u}의 다짐회복이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 흙다짐봉의 상태가 맞지 않아 다짐회복을 중단한다.', '{u}의 다짐회복이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0291', name:'물줄기찍기', en:'Water Channeler Contact', scope:'class', cls:'CLS_C030',
    grade:2, rarity:1, tier:1, desc:'가져온 물의 흐름을 좁은 점에 모아 적에게 보낸다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 물줄기찍기를 공격 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['공격', '가져온 물의 흐름'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:1,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0292'], lines:{use:['{u}은(는) 수류관의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 물줄기찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 물줄기찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 물줄기찍기의 경로에서 몸을 뺀다.', '{u}의 수류관이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 물줄기찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 물줄기찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 물줄기찍기를 중단한다.', '{u}의 물줄기찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0292', name:'수막받침', en:'Water Channeler Guard', scope:'class', cls:'CLS_C030',
    grade:1, rarity:1, tier:1, desc:'가져온 물의 흐름을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 수막받침을 방호막 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['방호막', '가져온 물의 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', shield:0.8500000000000001,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0293'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가져온 물의 흐름을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 수막받침이 필요한 위치에 닿지 않는다.', '{u}은(는) 수막받침을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 수막받침의 범위와 출력을 정확히 맞춘다.', '{u}의 수막받침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 수막받침을 중단한다.', '{u}의 수막받침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0293', name:'젖은발목', en:'Water Channeler Set', scope:'class', cls:'CLS_C030',
    grade:1, rarity:1, tier:1, desc:'가져온 물을 발치에 흘려 중심을 흔든다. 물이 없는 곳에서 새로 만들지 못한다.', lore:'오염 구역 세척 보조에서 젖은발목을 구역 제어 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['구역 제어', '가져온 물의 흐름'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', se:[{se:'SE_C007', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0294'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가져온 물을 발치에 흘려 중심을 흔든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 젖은발목이 필요한 위치에 닿지 않는다.', '{u}은(는) 젖은발목을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 젖은발목의 범위와 출력을 정확히 맞춘다.', '{u}의 젖은발목이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 젖은발목을 중단한다.', '{u}의 젖은발목이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0294', name:'물길미끄럼', en:'Water Channeler Step', scope:'class', cls:'CLS_C030',
    grade:2, rarity:1, tier:1, desc:'가져온 물의 흐름을 이용해 옆으로 한 걸음 움직인다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 물길미끄럼을 짧은 이동 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['짧은 이동', '가져온 물의 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0295'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가져온 물의 흐름을 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 물길미끄럼이 필요한 위치에 닿지 않는다.', '{u}은(는) 물길미끄럼을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 물길미끄럼의 범위와 출력을 정확히 맞춘다.', '{u}의 물길미끄럼이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 물길미끄럼을 중단한다.', '{u}의 물길미끄럼이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0295', name:'물결읽음', en:'Water Channeler Reading', scope:'class', cls:'CLS_C030',
    grade:1, rarity:1, tier:1, desc:'가져온 물의 흐름의 변화를 읽어 가까운 위험 지점을 찾는다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 물결읽음을 환경 감지 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['환경 감지', '가져온 물의 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0296'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 가져온 물의 흐름의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 물결읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 물결읽음을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 물결읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 물결읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 물결읽음을 중단한다.', '{u}의 물결읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0296', name:'누수감각', en:'Water Channeler Discipline', scope:'class', cls:'CLS_C030',
    grade:1, rarity:1, tier:1, desc:'가져온 물의 흐름이 주변 물체에 미치는 변화를 먼저 알아챈다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 누수감각을 위험 적응 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['위험 적응', '가져온 물의 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0297'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 가져온 물의 흐름이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 누수감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 누수감각을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 누수감각의 범위와 출력을 정확히 맞춘다.', '{u}의 누수감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 누수감각을 중단한다.', '{u}의 누수감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0297', name:'수량가늠', en:'Water Channeler Foundation', scope:'class', cls:'CLS_C030',
    grade:2, rarity:1, tier:1, desc:'가져온 물의 흐름의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 수량가늠을 출력 조절 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['출력 조절', '가져온 물의 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0298'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 가져온 물의 흐름의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 수량가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 수량가늠을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 수량가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 수량가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 수량가늠을 중단한다.', '{u}의 수량가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0298', name:'갈래수압', en:'Water Channeler Sequence', scope:'class', cls:'CLS_C030',
    grade:2, rarity:3, tier:2, desc:'가져온 물의 흐름을 두 줄로 나눠 떨어진 적을 동시에 친다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 갈래수압을 분산 공격 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['분산 공격', '가져온 물의 흐름'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:1,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0299'], lines:{use:['{u}은(는) 수류관의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래수압의 경로에서 몸을 뺀다.', '{u}의 수류관이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래수압이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래수압의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 갈래수압을 중단한다.', '{u}의 갈래수압이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0299', name:'맑은물가림', en:'Water Channeler Coverage', scope:'class', cls:'CLS_C030',
    grade:3, rarity:3, tier:3, desc:'가져온 물의 흐름이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 맑은물가림을 동료 차폐 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['동료 차폐', '가져온 물의 흐름'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', shield:0.9,
    se:[{se:'SE_C013', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0300'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가져온 물의 흐름이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 맑은물가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 맑은물가림을 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 맑은물가림의 범위와 출력을 정확히 맞춘다.', '{u}의 맑은물가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 맑은물가림을 중단한다.', '{u}의 맑은물가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0300', name:'물길회수', en:'Water Channeler Feedback', scope:'class', cls:'CLS_C030',
    grade:4, rarity:3, tier:4, desc:'가져온 물의 흐름의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 주변 물을 무한히 만들 수 없다.', lore:'오염 구역 세척 보조에서 물길회수를 잔류 회수 용도로 쓴다. 주변 물을 무한히 만들 수 없다.',
    tags:['잔류 회수', '가져온 물의 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C06', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0291'], lines:{use:['{u}의 {s}이(가) 발동한다. 가져온 물의 흐름의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 물길회수가 필요한 위치에 닿지 않는다.', '{u}은(는) 물길회수를 멈추고 수류관의 위치를 다시 잡는다.'], crit:['{u}은(는) 물길회수의 범위와 출력을 정확히 맞춘다.', '{u}의 물길회수가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수류관의 상태가 맞지 않아 물길회수를 중단한다.', '{u}의 물길회수가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0301', name:'광점쏘기', en:'Light Channeler Contact', scope:'class', cls:'CLS_C031',
    grade:2, rarity:1, tier:1, desc:'퍼지는 빛과 눈부심을 좁은 점에 모아 적에게 보낸다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 광점쏘기를 공격 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['공격', '퍼지는 빛과 눈부심'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:-1,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07',
    se:[{se:'SE_C008', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0302'], lines:{use:['{u}은(는) 반사봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 광점쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 광점쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 광점쏘기의 경로에서 몸을 뺀다.', '{u}의 반사봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 광점쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 광점쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 광점쏘기를 중단한다.', '{u}의 광점쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0302', name:'눈가림막', en:'Light Channeler Guard', scope:'class', cls:'CLS_C031',
    grade:1, rarity:1, tier:1, desc:'퍼지는 빛과 눈부심을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 눈가림막을 방호막 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['방호막', '퍼지는 빛과 눈부심'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', shield:0.65,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0303'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 퍼지는 빛과 눈부심을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 눈가림막이 필요한 위치에 닿지 않는다.', '{u}은(는) 눈가림막을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 눈가림막의 범위와 출력을 정확히 맞춘다.', '{u}의 눈가림막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 눈가림막을 중단한다.', '{u}의 눈가림막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0303', name:'윤곽밝힘', en:'Light Channeler Set', scope:'class', cls:'CLS_C031',
    grade:1, rarity:1, tier:1, desc:'대상의 윤곽을 밝혀 숨은 위치를 드러낸다. 아군의 눈을 향해 빛을 보내지 않는다.', lore:'암흑 구역 조명 계약에서 윤곽밝힘을 구역 제어 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['구역 제어', '퍼지는 빛과 눈부심'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', se:[{se:'SE_C009', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0304'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 대상의 윤곽을 밝혀 숨은 위치를 드러낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 윤곽밝힘이 필요한 위치에 닿지 않는다.', '{u}은(는) 윤곽밝힘을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 윤곽밝힘의 범위와 출력을 정확히 맞춘다.', '{u}의 윤곽밝힘이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 윤곽밝힘을 중단한다.', '{u}의 윤곽밝힘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0304', name:'빛점이동', en:'Light Channeler Step', scope:'class', cls:'CLS_C031',
    grade:2, rarity:1, tier:1, desc:'가까운 안전 지점에 빛점을 띄우고 그쪽으로 비켜선다. 빛으로 순간이동하지는 않는다.', lore:'암흑 구역 조명 계약에서 빛점이동을 짧은 이동 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['짧은 이동', '퍼지는 빛과 눈부심'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0305'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가까운 안전 지점에 빛점을 띄우고 그쪽으로 비켜선다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 빛점이동이 필요한 위치에 닿지 않는다.', '{u}은(는) 빛점이동을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 빛점이동의 범위와 출력을 정확히 맞춘다.', '{u}의 빛점이동이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 빛점이동을 중단한다.', '{u}의 빛점이동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0305', name:'반사읽음', en:'Light Channeler Reading', scope:'class', cls:'CLS_C031',
    grade:1, rarity:1, tier:1, desc:'퍼지는 빛과 눈부심의 변화를 읽어 가까운 위험 지점을 찾는다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 반사읽음을 환경 감지 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['환경 감지', '퍼지는 빛과 눈부심'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0306'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 퍼지는 빛과 눈부심의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반사읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 반사읽음을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 반사읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 반사읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 반사읽음을 중단한다.', '{u}의 반사읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0306', name:'명암적응', en:'Light Channeler Discipline', scope:'class', cls:'CLS_C031',
    grade:1, rarity:1, tier:1, desc:'퍼지는 빛과 눈부심이 주변 물체에 미치는 변화를 먼저 알아챈다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 명암적응을 위험 적응 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['위험 적응', '퍼지는 빛과 눈부심'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0307'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 퍼지는 빛과 눈부심이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 명암적응이 필요한 위치에 닿지 않는다.', '{u}은(는) 명암적응을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 명암적응의 범위와 출력을 정확히 맞춘다.', '{u}의 명암적응이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 명암적응을 중단한다.', '{u}의 명암적응이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0307', name:'광량분배', en:'Light Channeler Foundation', scope:'class', cls:'CLS_C031',
    grade:2, rarity:1, tier:1, desc:'퍼지는 빛과 눈부심의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 광량분배를 출력 조절 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['출력 조절', '퍼지는 빛과 눈부심'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0308'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 퍼지는 빛과 눈부심의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 광량분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 광량분배를 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 광량분배의 범위와 출력을 정확히 맞춘다.', '{u}의 광량분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 광량분배를 중단한다.', '{u}의 광량분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0308', name:'갈래광선', en:'Light Channeler Sequence', scope:'class', cls:'CLS_C031',
    grade:2, rarity:3, tier:2, desc:'퍼지는 빛과 눈부심을 두 줄로 나눠 떨어진 적을 동시에 친다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 갈래광선을 분산 공격 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['분산 공격', '퍼지는 빛과 눈부심'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:-1,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07',
    se:[{se:'SE_C008', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0309'], lines:{use:['{u}은(는) 반사봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래광선의 경로에서 몸을 뺀다.', '{u}의 반사봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래광선이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래광선의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 갈래광선을 중단한다.', '{u}의 갈래광선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0309', name:'산란차폐', en:'Light Channeler Coverage', scope:'class', cls:'CLS_C031',
    grade:3, rarity:3, tier:3, desc:'퍼지는 빛과 눈부심이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 산란차폐를 동료 차폐 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['동료 차폐', '퍼지는 빛과 눈부심'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', shield:0.9,
    se:[{se:'SE_C022', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0310'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 퍼지는 빛과 눈부심이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 산란차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 산란차폐를 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 산란차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 산란차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 산란차폐를 중단한다.', '{u}의 산란차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0310', name:'눈부심회복', en:'Light Channeler Feedback', scope:'class', cls:'CLS_C031',
    grade:4, rarity:3, tier:4, desc:'퍼지는 빛과 눈부심의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 반사면을 잘못 잡으면 아군도 눈부시다.', lore:'암흑 구역 조명 계약에서 눈부심회복을 잔류 회수 용도로 쓴다. 반사면을 잘못 잡으면 아군도 눈부시다.',
    tags:['잔류 회수', '퍼지는 빛과 눈부심'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C07', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0301'], lines:{use:['{u}의 {s}이(가) 발동한다. 퍼지는 빛과 눈부심의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 눈부심회복이 필요한 위치에 닿지 않는다.', '{u}은(는) 눈부심회복을 멈추고 반사봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 눈부심회복의 범위와 출력을 정확히 맞춘다.', '{u}의 눈부심회복이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반사봉의 상태가 맞지 않아 눈부심회복을 중단한다.', '{u}의 눈부심회복이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0311', name:'그늘침', en:'Shade Channeler Contact', scope:'class', cls:'CLS_C032',
    grade:2, rarity:1, tier:1, desc:'광량이 낮은 구역을 좁은 점에 모아 적에게 보낸다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 그늘침을 공격 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['공격', '광량이 낮은 구역'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:0,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08',
    se:[{se:'SE_C008', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0312'], lines:{use:['{u}은(는) 차광봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 그늘침이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 그늘침을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 그늘침의 경로에서 몸을 뺀다.', '{u}의 차광봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 그늘침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 그늘침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 그늘침을 중단한다.', '{u}의 그늘침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0312', name:'어둑겹막', en:'Shade Channeler Guard', scope:'class', cls:'CLS_C032',
    grade:1, rarity:1, tier:1, desc:'광량이 낮은 구역을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 어둑겹막을 방호막 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['방호막', '광량이 낮은 구역'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0313'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 광량이 낮은 구역을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 어둑겹막이 필요한 위치에 닿지 않는다.', '{u}은(는) 어둑겹막을 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 어둑겹막의 범위와 출력을 정확히 맞춘다.', '{u}의 어둑겹막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 어둑겹막을 중단한다.', '{u}의 어둑겹막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0313', name:'발치그늘', en:'Shade Channeler Set', scope:'class', cls:'CLS_C032',
    grade:1, rarity:1, tier:1, desc:'발치의 빛을 줄여 발판을 읽기 어렵게 한다. 접촉과 소리를 지우지는 못한다.', lore:'야행성 개체 관측 보조에서 발치그늘을 구역 제어 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['구역 제어', '광량이 낮은 구역'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', se:[{se:'SE_C008', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0314'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발치의 빛을 줄여 발판을 읽기 어렵게 한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발치그늘이 필요한 위치에 닿지 않는다.', '{u}은(는) 발치그늘을 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 발치그늘의 범위와 출력을 정확히 맞춘다.', '{u}의 발치그늘이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 발치그늘을 중단한다.', '{u}의 발치그늘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0314', name:'그림자딛기', en:'Shade Channeler Step', scope:'class', cls:'CLS_C032',
    grade:2, rarity:1, tier:1, desc:'확인한 그늘을 따라 옆으로 한 걸음 비킨다. 벽이나 적의 몸을 통과하지 못한다.', lore:'야행성 개체 관측 보조에서 그림자딛기를 짧은 이동 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['짧은 이동', '광량이 낮은 구역'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0315'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 확인한 그늘을 따라 옆으로 한 걸음 비킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 그림자딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 그림자딛기를 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 그림자딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 그림자딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 그림자딛기를 중단한다.', '{u}의 그림자딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0315', name:'암부읽음', en:'Shade Channeler Reading', scope:'class', cls:'CLS_C032',
    grade:1, rarity:1, tier:1, desc:'광량이 낮은 구역의 변화를 읽어 가까운 위험 지점을 찾는다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 암부읽음을 환경 감지 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['환경 감지', '광량이 낮은 구역'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0316'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광량이 낮은 구역의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 암부읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 암부읽음을 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 암부읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 암부읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 암부읽음을 중단한다.', '{u}의 암부읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0316', name:'그늘경계', en:'Shade Channeler Discipline', scope:'class', cls:'CLS_C032',
    grade:1, rarity:1, tier:1, desc:'광량이 낮은 구역이 주변 물체에 미치는 변화를 먼저 알아챈다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 그늘경계를 위험 적응 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['위험 적응', '광량이 낮은 구역'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0317'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광량이 낮은 구역이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 그늘경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 그늘경계를 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 그늘경계의 범위와 출력을 정확히 맞춘다.', '{u}의 그늘경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 그늘경계를 중단한다.', '{u}의 그늘경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0317', name:'차광감각', en:'Shade Channeler Foundation', scope:'class', cls:'CLS_C032',
    grade:2, rarity:1, tier:1, desc:'광량이 낮은 구역의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 차광감각을 출력 조절 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['출력 조절', '광량이 낮은 구역'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0318'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광량이 낮은 구역의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 차광감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 차광감각을 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 차광감각의 범위와 출력을 정확히 맞춘다.', '{u}의 차광감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 차광감각을 중단한다.', '{u}의 차광감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0318', name:'갈래음영', en:'Shade Channeler Sequence', scope:'class', cls:'CLS_C032',
    grade:2, rarity:3, tier:2, desc:'광량이 낮은 구역을 두 줄로 나눠 떨어진 적을 동시에 친다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 갈래음영을 분산 공격 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['분산 공격', '광량이 낮은 구역'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:0,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08',
    se:[{se:'SE_C008', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0319'], lines:{use:['{u}은(는) 차광봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래음영의 경로에서 몸을 뺀다.', '{u}의 차광봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래음영이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래음영의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 갈래음영을 중단한다.', '{u}의 갈래음영이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0319', name:'빛샘가림', en:'Shade Channeler Coverage', scope:'class', cls:'CLS_C032',
    grade:3, rarity:3, tier:3, desc:'광량이 낮은 구역이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 빛샘가림을 동료 차폐 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['동료 차폐', '광량이 낮은 구역'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', shield:0.9,
    se:[{se:'SE_C027', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0320'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 광량이 낮은 구역이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 빛샘가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 빛샘가림을 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 빛샘가림의 범위와 출력을 정확히 맞춘다.', '{u}의 빛샘가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 빛샘가림을 중단한다.', '{u}의 빛샘가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0320', name:'암순응유지', en:'Shade Channeler Feedback', scope:'class', cls:'CLS_C032',
    grade:4, rarity:3, tier:4, desc:'광량이 낮은 구역의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 완전한 은신이나 무적이 되지는 않는다.', lore:'야행성 개체 관측 보조에서 암순응유지를 잔류 회수 용도로 쓴다. 완전한 은신이나 무적이 되지는 않는다.',
    tags:['잔류 회수', '광량이 낮은 구역'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C08', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0311'], lines:{use:['{u}의 {s}이(가) 발동한다. 광량이 낮은 구역의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 암순응유지가 필요한 위치에 닿지 않는다.', '{u}은(는) 암순응유지를 멈추고 차광봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 암순응유지의 범위와 출력을 정확히 맞춘다.', '{u}의 암순응유지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차광봉의 상태가 맞지 않아 암순응유지를 중단한다.', '{u}의 암순응유지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0321', name:'독무점사', en:'Toxin Channeler Contact', scope:'class', cls:'CLS_C033',
    grade:2, rarity:1, tier:1, desc:'소량의 마력성 독을 좁은 점에 모아 적에게 보낸다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 독무점사를 공격 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['공격', '소량의 마력성 독'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:1,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09',
    se:[{se:'SE_C005', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0322'], lines:{use:['{u}은(는) 밀폐분사관의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 독무점사가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 독무점사를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 독무점사의 경로에서 몸을 뺀다.', '{u}의 밀폐분사관이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 독무점사가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 독무점사의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 독무점사를 중단한다.', '{u}의 독무점사가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0322', name:'비말차폐', en:'Toxin Channeler Guard', scope:'class', cls:'CLS_C033',
    grade:1, rarity:1, tier:1, desc:'소량의 마력성 독을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 비말차폐를 방호막 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['방호막', '소량의 마력성 독'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', shield:0.8500000000000001,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0323'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 소량의 마력성 독을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 비말차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 비말차폐를 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 비말차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 비말차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 비말차폐를 중단한다.', '{u}의 비말차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0323', name:'발치독띠', en:'Toxin Channeler Set', scope:'class', cls:'CLS_C033',
    grade:1, rarity:1, tier:1, desc:'발치에 옅은 독성 잔류 띠를 만든다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 발치독띠를 구역 제어 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['구역 제어', '소량의 마력성 독'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', se:[{se:'SE_C005', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0324'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발치에 옅은 독성 잔류 띠를 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발치독띠가 필요한 위치에 닿지 않는다.', '{u}은(는) 발치독띠를 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 발치독띠의 범위와 출력을 정확히 맞춘다.', '{u}의 발치독띠가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 발치독띠를 중단한다.', '{u}의 발치독띠가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0324', name:'독띠이탈', en:'Toxin Channeler Step', scope:'class', cls:'CLS_C033',
    grade:2, rarity:1, tier:1, desc:'소량의 마력성 독을 이용해 옆으로 한 걸음 움직인다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 독띠이탈을 짧은 이동 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['짧은 이동', '소량의 마력성 독'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0325'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 소량의 마력성 독을 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 독띠이탈이 필요한 위치에 닿지 않는다.', '{u}은(는) 독띠이탈을 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 독띠이탈의 범위와 출력을 정확히 맞춘다.', '{u}의 독띠이탈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 독띠이탈을 중단한다.', '{u}의 독띠이탈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0325', name:'오염읽음', en:'Toxin Channeler Reading', scope:'class', cls:'CLS_C033',
    grade:1, rarity:1, tier:1, desc:'소량의 마력성 독의 변화를 읽어 가까운 위험 지점을 찾는다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 오염읽음을 환경 감지 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['환경 감지', '소량의 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0326'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 소량의 마력성 독의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 오염읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 오염읽음을 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 오염읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 오염읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 오염읽음을 중단한다.', '{u}의 오염읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0326', name:'풍하경계', en:'Toxin Channeler Discipline', scope:'class', cls:'CLS_C033',
    grade:1, rarity:1, tier:1, desc:'소량의 마력성 독이 주변 물체에 미치는 변화를 먼저 알아챈다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 풍하경계를 위험 적응 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['위험 적응', '소량의 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0327'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 소량의 마력성 독이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 풍하경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 풍하경계를 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 풍하경계의 범위와 출력을 정확히 맞춘다.', '{u}의 풍하경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 풍하경계를 중단한다.', '{u}의 풍하경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0327', name:'독량제어', en:'Toxin Channeler Foundation', scope:'class', cls:'CLS_C033',
    grade:2, rarity:1, tier:1, desc:'소량의 마력성 독의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 독량제어를 출력 조절 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['출력 조절', '소량의 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0328'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 소량의 마력성 독의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 독량제어가 필요한 위치에 닿지 않는다.', '{u}은(는) 독량제어를 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 독량제어의 범위와 출력을 정확히 맞춘다.', '{u}의 독량제어가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 독량제어를 중단한다.', '{u}의 독량제어가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0328', name:'분리독무', en:'Toxin Channeler Sequence', scope:'class', cls:'CLS_C033',
    grade:2, rarity:3, tier:2, desc:'소량의 마력성 독을 두 줄로 나눠 떨어진 적을 동시에 친다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 분리독무를 분산 공격 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['분산 공격', '소량의 마력성 독'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:1,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09',
    se:[{se:'SE_C005', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0329'], lines:{use:['{u}은(는) 밀폐분사관의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 분리독무의 경로에서 몸을 뺀다.', '{u}의 밀폐분사관이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 분리독무가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 분리독무의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 분리독무를 중단한다.', '{u}의 분리독무가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0329', name:'흡입가림', en:'Toxin Channeler Coverage', scope:'class', cls:'CLS_C033',
    grade:3, rarity:3, tier:3, desc:'소량의 마력성 독이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 흡입가림을 동료 차폐 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['동료 차폐', '소량의 마력성 독'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', shield:0.9,
    se:[{se:'SE_C026', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0330'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 소량의 마력성 독이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 흡입가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 흡입가림을 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 흡입가림의 범위와 출력을 정확히 맞춘다.', '{u}의 흡입가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 흡입가림을 중단한다.', '{u}의 흡입가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0330', name:'잔독회수', en:'Toxin Channeler Feedback', scope:'class', cls:'CLS_C033',
    grade:4, rarity:3, tier:4, desc:'소량의 마력성 독의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 독 내성 개체에는 효과가 약하다.', lore:'오염 개체 격리 계약에서 잔독회수를 잔류 회수 용도로 쓴다. 독 내성 개체에는 효과가 약하다.',
    tags:['잔류 회수', '소량의 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C09', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0321'], lines:{use:['{u}의 {s}이(가) 발동한다. 소량의 마력성 독의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔독회수가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔독회수를 멈추고 밀폐분사관의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔독회수의 범위와 출력을 정확히 맞춘다.', '{u}의 잔독회수가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐분사관의 상태가 맞지 않아 잔독회수를 중단한다.', '{u}의 잔독회수가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0331', name:'진동찍기', en:'Sound Channeler Contact', scope:'class', cls:'CLS_C034',
    grade:2, rarity:1, tier:1, desc:'지향성 진동과 소리를 좁은 점에 모아 적에게 보낸다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 진동찍기를 공격 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['공격', '지향성 진동과 소리'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:-1,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11',
    se:[{se:'SE_C011', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0332'], lines:{use:['{u}은(는) 진동봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 진동찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 진동찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 진동찍기의 경로에서 몸을 뺀다.', '{u}의 진동봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 진동찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 진동찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 진동찍기를 중단한다.', '{u}의 진동찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0332', name:'흡음겹막', en:'Sound Channeler Guard', scope:'class', cls:'CLS_C034',
    grade:1, rarity:1, tier:1, desc:'지향성 진동과 소리를 얇게 펴 가까운 충격을 받는 막으로 쓴다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 흡음겹막을 방호막 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['방호막', '지향성 진동과 소리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', shield:0.65,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0333'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지향성 진동과 소리를 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 흡음겹막이 필요한 위치에 닿지 않는다.', '{u}은(는) 흡음겹막을 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 흡음겹막의 범위와 출력을 정확히 맞춘다.', '{u}의 흡음겹막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 흡음겹막을 중단한다.', '{u}의 흡음겹막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0333', name:'발소리묶기', en:'Sound Channeler Set', scope:'class', cls:'CLS_C034',
    grade:1, rarity:1, tier:1, desc:'발소리와 겹치는 진동을 보내 걸음의 박자를 흔든다. 반사음이 많으면 구별이 어렵다.', lore:'반향 지형 탐사 보조에서 발소리묶기를 구역 제어 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['구역 제어', '지향성 진동과 소리'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', se:[{se:'SE_C011', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0334'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발소리와 겹치는 진동을 보내 걸음의 박자를 흔든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발소리묶기가 필요한 위치에 닿지 않는다.', '{u}은(는) 발소리묶기를 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 발소리묶기의 범위와 출력을 정확히 맞춘다.', '{u}의 발소리묶기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 발소리묶기를 중단한다.', '{u}의 발소리묶기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0334', name:'진동반보', en:'Sound Channeler Step', scope:'class', cls:'CLS_C034',
    grade:2, rarity:1, tier:1, desc:'지향성 진동과 소리를 이용해 옆으로 한 걸음 움직인다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 진동반보를 짧은 이동 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['짧은 이동', '지향성 진동과 소리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0335'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지향성 진동과 소리를 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 진동반보가 필요한 위치에 닿지 않는다.', '{u}은(는) 진동반보를 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 진동반보의 범위와 출력을 정확히 맞춘다.', '{u}의 진동반보가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 진동반보를 중단한다.', '{u}의 진동반보가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0335', name:'반향읽음', en:'Sound Channeler Reading', scope:'class', cls:'CLS_C034',
    grade:1, rarity:1, tier:1, desc:'지향성 진동과 소리의 변화를 읽어 가까운 위험 지점을 찾는다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 반향읽음을 환경 감지 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['환경 감지', '지향성 진동과 소리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0336'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 지향성 진동과 소리의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반향읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 반향읽음을 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 반향읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 반향읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 반향읽음을 중단한다.', '{u}의 반향읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0336', name:'음압경계', en:'Sound Channeler Discipline', scope:'class', cls:'CLS_C034',
    grade:1, rarity:1, tier:1, desc:'지향성 진동과 소리이 주변 물체에 미치는 변화를 먼저 알아챈다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 음압경계를 위험 적응 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['위험 적응', '지향성 진동과 소리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0337'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 지향성 진동과 소리이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 음압경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 음압경계를 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 음압경계의 범위와 출력을 정확히 맞춘다.', '{u}의 음압경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 음압경계를 중단한다.', '{u}의 음압경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0337', name:'진동분배', en:'Sound Channeler Foundation', scope:'class', cls:'CLS_C034',
    grade:2, rarity:1, tier:1, desc:'지향성 진동과 소리의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 진동분배를 출력 조절 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['출력 조절', '지향성 진동과 소리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0338'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 지향성 진동과 소리의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 진동분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 진동분배를 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 진동분배의 범위와 출력을 정확히 맞춘다.', '{u}의 진동분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 진동분배를 중단한다.', '{u}의 진동분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0338', name:'겹파동', en:'Sound Channeler Sequence', scope:'class', cls:'CLS_C034',
    grade:2, rarity:3, tier:2, desc:'지향성 진동과 소리를 두 줄로 나눠 떨어진 적을 동시에 친다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 겹파동을 분산 공격 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['분산 공격', '지향성 진동과 소리'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:-1,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11',
    se:[{se:'SE_C011', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0339'], lines:{use:['{u}은(는) 진동봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹파동의 경로에서 몸을 뺀다.', '{u}의 진동봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹파동이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹파동의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 겹파동을 중단한다.', '{u}의 겹파동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0339', name:'귀울림막', en:'Sound Channeler Coverage', scope:'class', cls:'CLS_C034',
    grade:3, rarity:3, tier:3, desc:'지향성 진동과 소리이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 귀울림막을 동료 차폐 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['동료 차폐', '지향성 진동과 소리'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', shield:0.9,
    se:[{se:'SE_C018', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0340'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지향성 진동과 소리이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 귀울림막이 필요한 위치에 닿지 않는다.', '{u}은(는) 귀울림막을 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 귀울림막의 범위와 출력을 정확히 맞춘다.', '{u}의 귀울림막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 귀울림막을 중단한다.', '{u}의 귀울림막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0340', name:'잔향되읽기', en:'Sound Channeler Feedback', scope:'class', cls:'CLS_C034',
    grade:4, rarity:3, tier:4, desc:'지향성 진동과 소리의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 좁은 방에서는 반사음이 겹친다.', lore:'반향 지형 탐사 보조에서 잔향되읽기를 잔류 회수 용도로 쓴다. 좁은 방에서는 반사음이 겹친다.',
    tags:['잔류 회수', '지향성 진동과 소리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C11', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0331'], lines:{use:['{u}의 {s}이(가) 발동한다. 지향성 진동과 소리의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔향되읽기가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔향되읽기를 멈추고 진동봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔향되읽기의 범위와 출력을 정확히 맞춘다.', '{u}의 잔향되읽기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 진동봉의 상태가 맞지 않아 잔향되읽기를 중단한다.', '{u}의 잔향되읽기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0341', name:'철편쏘기', en:'Magnetism Channeler Contact', scope:'class', cls:'CLS_C035',
    grade:2, rarity:2, tier:1, desc:'철성 물체의 끌림을 좁은 점에 모아 적에게 보낸다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 철편쏘기를 공격 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['공격', '철성 물체의 끌림'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:0,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0342'], lines:{use:['{u}은(는) 자성봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 철편쏘기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 철편쏘기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 철편쏘기의 경로에서 몸을 뺀다.', '{u}의 자성봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 철편쏘기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 철편쏘기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 철편쏘기를 중단한다.', '{u}의 철편쏘기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0342', name:'철편차폐', en:'Magnetism Channeler Guard', scope:'class', cls:'CLS_C035',
    grade:1, rarity:2, tier:1, desc:'철성 물체의 끌림을 얇게 펴 가까운 충격을 받는 막으로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 철편차폐를 방호막 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['방호막', '철성 물체의 끌림'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0343'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철성 물체의 끌림을 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철편차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 철편차폐를 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 철편차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 철편차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 철편차폐를 중단한다.', '{u}의 철편차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0343', name:'금속붙임', en:'Magnetism Channeler Set', scope:'class', cls:'CLS_C035',
    grade:1, rarity:2, tier:1, desc:'대상의 금속 장비를 주변 철성 물체에 붙인다. 비금속 대상에는 걸리지 않는다.', lore:'금속 잔해 회수 계약에서 금속붙임을 구역 제어 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['구역 제어', '철성 물체의 끌림'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', se:[{se:'SE_C006', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0344'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 대상의 금속 장비를 주변 철성 물체에 붙인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 금속붙임이 필요한 위치에 닿지 않는다.', '{u}은(는) 금속붙임을 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 금속붙임의 범위와 출력을 정확히 맞춘다.', '{u}의 금속붙임이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 금속붙임을 중단한다.', '{u}의 금속붙임이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0344', name:'자석딛기', en:'Magnetism Channeler Step', scope:'class', cls:'CLS_C035',
    grade:2, rarity:2, tier:1, desc:'확인한 철성 발판에 힘을 걸어 몸을 짧게 옮긴다. 고정되지 않은 발판은 함께 딸려 온다.', lore:'금속 잔해 회수 계약에서 자석딛기를 짧은 이동 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['짧은 이동', '철성 물체의 끌림'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', move:'dash',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0345'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 확인한 철성 발판에 힘을 걸어 몸을 짧게 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 자석딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 자석딛기를 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 자석딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 자석딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 자석딛기를 중단한다.', '{u}의 자석딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0345', name:'철성읽음', en:'Magnetism Channeler Reading', scope:'class', cls:'CLS_C035',
    grade:1, rarity:2, tier:1, desc:'철성 물체의 끌림의 변화를 읽어 가까운 위험 지점을 찾는다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 철성읽음을 환경 감지 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['환경 감지', '철성 물체의 끌림'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0346'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철성 물체의 끌림의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 철성읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 철성읽음을 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 철성읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 철성읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 철성읽음을 중단한다.', '{u}의 철성읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0346', name:'자속경계', en:'Magnetism Channeler Discipline', scope:'class', cls:'CLS_C035',
    grade:1, rarity:2, tier:1, desc:'철성 물체의 끌림이 주변 물체에 미치는 변화를 먼저 알아챈다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 자속경계를 위험 적응 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['위험 적응', '철성 물체의 끌림'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0347'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철성 물체의 끌림이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 자속경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 자속경계를 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 자속경계의 범위와 출력을 정확히 맞춘다.', '{u}의 자속경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 자속경계를 중단한다.', '{u}의 자속경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0347', name:'자극분리', en:'Magnetism Channeler Foundation', scope:'class', cls:'CLS_C035',
    grade:2, rarity:2, tier:1, desc:'철성 물체의 끌림의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 자극분리를 출력 조절 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['출력 조절', '철성 물체의 끌림'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0348'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 철성 물체의 끌림의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 자극분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 자극분리를 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 자극분리의 범위와 출력을 정확히 맞춘다.', '{u}의 자극분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 자극분리를 중단한다.', '{u}의 자극분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0348', name:'철편분열', en:'Magnetism Channeler Sequence', scope:'class', cls:'CLS_C035',
    grade:2, rarity:3, tier:2, desc:'철성 물체의 끌림을 두 줄로 나눠 떨어진 적을 동시에 친다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 철편분열을 분산 공격 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['분산 공격', '철성 물체의 끌림'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:0,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12',
    se:[{se:'SE_C007', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0349'], lines:{use:['{u}은(는) 자성봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 철편분열의 경로에서 몸을 뺀다.', '{u}의 자성봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 철편분열이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 철편분열의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 철편분열을 중단한다.', '{u}의 철편분열이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0349', name:'극성가림', en:'Magnetism Channeler Coverage', scope:'class', cls:'CLS_C035',
    grade:3, rarity:3, tier:3, desc:'철성 물체의 끌림이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 극성가림을 동료 차폐 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['동료 차폐', '철성 물체의 끌림'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', shield:0.9,
    se:[{se:'SE_C013', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0350'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 철성 물체의 끌림이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 극성가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 극성가림을 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 극성가림의 범위와 출력을 정확히 맞춘다.', '{u}의 극성가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 극성가림을 중단한다.', '{u}의 극성가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0350', name:'자속회수', en:'Magnetism Channeler Feedback', scope:'class', cls:'CLS_C035',
    grade:4, rarity:3, tier:4, desc:'철성 물체의 끌림의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 비금속 개체에는 직접 힘이 닿지 않는다.', lore:'금속 잔해 회수 계약에서 자속회수를 잔류 회수 용도로 쓴다. 비금속 개체에는 직접 힘이 닿지 않는다.',
    tags:['잔류 회수', '철성 물체의 끌림'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C12', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0341'], lines:{use:['{u}의 {s}이(가) 발동한다. 철성 물체의 끌림의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 자속회수가 필요한 위치에 닿지 않는다.', '{u}은(는) 자속회수를 멈추고 자성봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 자속회수의 범위와 출력을 정확히 맞춘다.', '{u}의 자속회수가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 자성봉의 상태가 맞지 않아 자속회수를 중단한다.', '{u}의 자속회수가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0351', name:'압점누르기', en:'Pressure Channeler Contact', scope:'class', cls:'CLS_C036',
    grade:2, rarity:2, tier:1, desc:'좁은 면적의 압력차를 좁은 점에 모아 적에게 보낸다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 압점누르기를 공격 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['공격', '좁은 면적의 압력차'], kind:'액티브', target:'enemy', range:'far', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_MAGIC', acc:1,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10',
    se:[{se:'SE_C010', chance:0.35, turns:2}], maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0352'], lines:{use:['{u}은(는) 압력환의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 압점누르기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 압점누르기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 압점누르기의 경로에서 몸을 뺀다.', '{u}의 압력환이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 압점누르기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 압점누르기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 압점누르기를 중단한다.', '{u}의 압점누르기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0352', name:'완충압막', en:'Pressure Channeler Guard', scope:'class', cls:'CLS_C036',
    grade:1, rarity:2, tier:1, desc:'좁은 면적의 압력차를 얇게 펴 가까운 충격을 받는 막으로 쓴다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 완충압막을 방호막 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['방호막', '좁은 면적의 압력차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', shield:0.8500000000000001,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0353'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 면적의 압력차를 얇게 펴 가까운 충격을 받는 막으로 쓴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 완충압막이 필요한 위치에 닿지 않는다.', '{u}은(는) 완충압막을 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 완충압막의 범위와 출력을 정확히 맞춘다.', '{u}의 완충압막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 완충압막을 중단한다.', '{u}의 완충압막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0353', name:'발목가압', en:'Pressure Channeler Set', scope:'class', cls:'CLS_C036',
    grade:1, rarity:2, tier:1, desc:'발목 주변의 압력차로 보폭을 줄인다. 급격한 가압은 사용자의 귀에도 부담을 준다.', lore:'밀폐 공간 감압 보조에서 발목가압을 구역 제어 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['구역 제어', '좁은 면적의 압력차'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', se:[{se:'SE_C006', turns:2, chance:0.8}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0354'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발목 주변의 압력차로 보폭을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발목가압이 필요한 위치에 닿지 않는다.', '{u}은(는) 발목가압을 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 발목가압의 범위와 출력을 정확히 맞춘다.', '{u}의 발목가압이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 발목가압을 중단한다.', '{u}의 발목가압이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0354', name:'감압반보', en:'Pressure Channeler Step', scope:'class', cls:'CLS_C036',
    grade:2, rarity:2, tier:1, desc:'좁은 면적의 압력차를 이용해 옆으로 한 걸음 움직인다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 감압반보를 짧은 이동 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['짧은 이동', '좁은 면적의 압력차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0355'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 면적의 압력차를 이용해 옆으로 한 걸음 움직인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 감압반보가 필요한 위치에 닿지 않는다.', '{u}은(는) 감압반보를 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 감압반보의 범위와 출력을 정확히 맞춘다.', '{u}의 감압반보가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 감압반보를 중단한다.', '{u}의 감압반보가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0355', name:'압차읽음', en:'Pressure Channeler Reading', scope:'class', cls:'CLS_C036',
    grade:1, rarity:2, tier:1, desc:'좁은 면적의 압력차의 변화를 읽어 가까운 위험 지점을 찾는다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 압차읽음을 환경 감지 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['환경 감지', '좁은 면적의 압력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0356'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 면적의 압력차의 변화를 읽어 가까운 위험 지점을 찾는다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 압차읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 압차읽음을 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 압차읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 압차읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 압차읽음을 중단한다.', '{u}의 압차읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0356', name:'이압경계', en:'Pressure Channeler Discipline', scope:'class', cls:'CLS_C036',
    grade:1, rarity:2, tier:1, desc:'좁은 면적의 압력차이 주변 물체에 미치는 변화를 먼저 알아챈다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 이압경계를 위험 적응 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['위험 적응', '좁은 면적의 압력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0357'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 면적의 압력차이 주변 물체에 미치는 변화를 먼저 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 이압경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 이압경계를 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 이압경계의 범위와 출력을 정확히 맞춘다.', '{u}의 이압경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 이압경계를 중단한다.', '{u}의 이압경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0357', name:'압력평형', en:'Pressure Channeler Foundation', scope:'class', cls:'CLS_C036',
    grade:2, rarity:2, tier:1, desc:'좁은 면적의 압력차의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 압력평형을 출력 조절 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['출력 조절', '좁은 면적의 압력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{resist:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0358'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 면적의 압력차의 출력을 나눠 한 지점에 과하게 몰리지 않게 한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 압력평형이 필요한 위치에 닿지 않는다.', '{u}은(는) 압력평형을 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 압력평형의 범위와 출력을 정확히 맞춘다.', '{u}의 압력평형이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 압력평형을 중단한다.', '{u}의 압력평형이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0358', name:'분산압점', en:'Pressure Channeler Sequence', scope:'class', cls:'CLS_C036',
    grade:2, rarity:3, tier:2, desc:'좁은 면적의 압력차를 두 줄로 나눠 떨어진 적을 동시에 친다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 분산압점을 분산 공격 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['분산 공격', '좁은 면적의 압력차'], kind:'액티브', target:'enemies', range:'far', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_MAGIC', acc:1,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10',
    se:[{se:'SE_C010', chance:0.35, turns:2}], maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MANA:12}, abl:{ABL_A07:8}},
    ai:{enemies:2}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0359'], lines:{use:['{u}은(는) 압력환의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 분산압점의 경로에서 몸을 뺀다.', '{u}의 압력환이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 분산압점이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 분산압점의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 분산압점을 중단한다.', '{u}의 분산압점이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0359', name:'압파차폐', en:'Pressure Channeler Coverage', scope:'class', cls:'CLS_C036',
    grade:3, rarity:3, tier:3, desc:'좁은 면적의 압력차이 동료에게 번지지 않도록 얇은 차폐층을 두른다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 압파차폐를 동료 차폐 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['동료 차폐', '좁은 면적의 압력차'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', shield:0.9,
    se:[{se:'SE_C018', turns:3, chance:1}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MANA:15}, abl:{ABL_A07:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0360'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 면적의 압력차이 동료에게 번지지 않도록 얇은 차폐층을 두른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 압파차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 압파차폐를 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 압파차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 압파차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 압파차폐를 중단한다.', '{u}의 압파차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0360', name:'잔압풀림', en:'Pressure Channeler Feedback', scope:'class', cls:'CLS_C036',
    grade:4, rarity:3, tier:4, desc:'좁은 면적의 압력차의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다. 급격한 압력 변화가 귀를 해친다.', lore:'밀폐 공간 감압 보조에서 잔압풀림을 잔류 회수 용도로 쓴다. 급격한 압력 변화가 귀를 해친다.',
    tags:['잔류 회수', '좁은 면적의 압력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MANA', scale2:'ABL_A07', el:'EL_C10', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MANA:18}, abl:{ABL_A07:12}}, risk:1,
    combo:['SK_C0351'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 면적의 압력차의 잔류 흐름을 읽어 다음 시전의 낭비를 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔압풀림이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔압풀림을 멈추고 압력환의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔압풀림의 범위와 출력을 정확히 맞춘다.', '{u}의 잔압풀림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 압력환의 상태가 맞지 않아 잔압풀림을 중단한다.', '{u}의 잔압풀림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0361', name:'상처압착', en:'Trauma Stabilizer Contact', scope:'class', cls:'CLS_C037',
    grade:2, rarity:1, tier:1, desc:'깨끗한 상처 가장자리를 누르며 작은 출혈을 줄인다. 깊은 내부 출혈은 별도 처치가 필요하다.', lore:'게이트 후송조 응급 계약에서 상처압착을 개별 지원 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['개별 지원', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A25', heal:0.65, cleanse:['SE_C001'],
    se:[{se:'SE_C019', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0362'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 깨끗한 상처 가장자리를 누르며 작은 출혈을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 상처압착이 필요한 위치에 닿지 않는다.', '{u}은(는) 상처압착을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 상처압착의 범위와 출력을 정확히 맞춘다.', '{u}의 상처압착이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 상처압착을 중단한다.', '{u}의 상처압착이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0362', name:'처치손막', en:'Trauma Stabilizer Guard', scope:'class', cls:'CLS_C037',
    grade:1, rarity:1, tier:1, desc:'처치장갑을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 처치손막을 처치자 방호 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['처치자 방호', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MIND', scale2:'ABL_A25', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0363'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 처치장갑을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 처치손막이 필요한 위치에 닿지 않는다.', '{u}은(는) 처치손막을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치손막의 범위와 출력을 정확히 맞춘다.', '{u}의 처치손막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 처치손막을 중단한다.', '{u}의 처치손막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0363', name:'지혈유도', en:'Trauma Stabilizer Set', scope:'class', cls:'CLS_C037',
    grade:1, rarity:1, tier:1, desc:'동료가 누르는 상처의 압력을 맞춰 얕은 출혈을 줄인다. 깊은 내부 출혈에는 별도 처치가 필요하다.', lore:'게이트 후송조 응급 계약에서 지혈유도를 동료 보조 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['동료 보조', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A25', se:[{se:'SE_C019', chance:1, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0364'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료가 누르는 상처의 압력을 맞춰 얕은 출혈을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 지혈유도가 필요한 위치에 닿지 않는다.', '{u}은(는) 지혈유도를 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 지혈유도의 범위와 출력을 정확히 맞춘다.', '{u}의 지혈유도가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 지혈유도를 중단한다.', '{u}의 지혈유도가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true, cleanse:['SE_C001']
  },
  {
    id:'SK_C0364', name:'처치접근', en:'Trauma Stabilizer Step', scope:'class', cls:'CLS_C037',
    grade:2, rarity:1, tier:1, desc:'처치장갑을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 처치접근을 지원 위치 변경 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['지원 위치 변경', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MIND', scale2:'ABL_A25', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0365'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 처치장갑을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 처치접근이 필요한 위치에 닿지 않는다.', '{u}은(는) 처치접근을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치접근의 범위와 출력을 정확히 맞춘다.', '{u}의 처치접근이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 처치접근을 중단한다.', '{u}의 처치접근이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0365', name:'맥박가늠', en:'Trauma Stabilizer Reading', scope:'class', cls:'CLS_C037',
    grade:1, rarity:1, tier:1, desc:'출혈과 얕은 상처의 안정의 변화를 읽어 지원이 필요한 순서를 가늠한다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 맥박가늠을 상태 감지 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['상태 감지', '출혈과 얕은 상처의 안정'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0366'], lines:{use:['{u}의 {s}이(가) 발동한다. 출혈과 얕은 상처의 안정의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 맥박가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 맥박가늠을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 맥박가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 맥박가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 맥박가늠을 중단한다.', '{u}의 맥박가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0366', name:'피부변화눈', en:'Trauma Stabilizer Discipline', scope:'class', cls:'CLS_C037',
    grade:1, rarity:1, tier:1, desc:'처치장갑을 쓰기 전에 출혈과 얕은 상처의 안정의 이상 징후를 구별한다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 피부변화눈을 위험 경계 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['위험 경계', '출혈과 얕은 상처의 안정'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0367'], lines:{use:['{u}의 {s}이(가) 발동한다. 처치장갑을 쓰기 전에 출혈과 얕은 상처의 안정의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 피부변화눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 피부변화눈을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 피부변화눈의 범위와 출력을 정확히 맞춘다.', '{u}의 피부변화눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 피부변화눈을 중단한다.', '{u}의 피부변화눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0367', name:'처치평정', en:'Trauma Stabilizer Foundation', scope:'class', cls:'CLS_C037',
    grade:2, rarity:1, tier:1, desc:'출혈과 얕은 상처의 안정에 집중할 때 불필요한 동작을 줄인다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 처치평정을 지원 적응 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['지원 적응', '출혈과 얕은 상처의 안정'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0368'], lines:{use:['{u}의 {s}이(가) 발동한다. 출혈과 얕은 상처의 안정에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 처치평정이 필요한 위치에 닿지 않는다.', '{u}은(는) 처치평정을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치평정의 범위와 출력을 정확히 맞춘다.', '{u}의 처치평정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 처치평정을 중단한다.', '{u}의 처치평정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0368', name:'상처연결', en:'Trauma Stabilizer Sequence', scope:'class', cls:'CLS_C037',
    grade:2, rarity:3, tier:2, desc:'상처 둘레를 순서대로 안정시켜 얕은 손상의 회복을 돕는다. 소실된 조직을 복원하지 못한다.', lore:'게이트 후송조 응급 계약에서 상처연결을 심화 지원 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['심화 지원', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_MIND', scale2:'ABL_A25', heal:1.1, cleanse:['SE_C001'],
    se:[{se:'SE_C019', chance:1, turns:3}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}},
    ai:{allyHurt:true}, risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0369'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 상처 둘레를 순서대로 안정시켜 얕은 손상의 회복을 돕는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 상처연결이 필요한 위치에 닿지 않는다.', '{u}은(는) 상처연결을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 상처연결의 범위와 출력을 정확히 맞춘다.', '{u}의 상처연결이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 상처연결을 중단한다.', '{u}의 상처연결이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex', daily:true
  },
  {
    id:'SK_C0369', name:'다중안정', en:'Trauma Stabilizer Coverage', scope:'class', cls:'CLS_C037',
    grade:3, rarity:3, tier:3, desc:'가까운 부상자 둘의 출혈을 순서대로 확인하고 안정시킨다. 한 사람에게 집중할 때보다 효과가 낮다.', lore:'게이트 후송조 응급 계약에서 다중안정을 대열 지원 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['대열 지원', '출혈과 얕은 상처의 안정'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MIND', scale2:'ABL_A25', heal:0.45, cleanse:['SE_C001'],
    se:[{se:'SE_C019', chance:1, turns:3}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}},
    ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0370'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가까운 부상자 둘의 출혈을 순서대로 확인하고 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다중안정이 필요한 위치에 닿지 않는다.', '{u}은(는) 다중안정을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 다중안정의 범위와 출력을 정확히 맞춘다.', '{u}의 다중안정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 다중안정을 중단한다.', '{u}의 다중안정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex', daily:true
  },
  {
    id:'SK_C0370', name:'후송관찰', en:'Trauma Stabilizer Feedback', scope:'class', cls:'CLS_C037',
    grade:4, rarity:3, tier:4, desc:'출혈과 얕은 상처의 안정이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 소실된 조직을 복원할 수 없다.', lore:'게이트 후송조 응급 계약에서 후송관찰을 경과 관찰 용도로 쓴다. 소실된 조직을 복원할 수 없다.',
    tags:['경과 관찰', '출혈과 얕은 상처의 안정'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0361'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 출혈과 얕은 상처의 안정이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 후송관찰이 필요한 위치에 닿지 않는다.', '{u}은(는) 후송관찰을 멈추고 처치장갑의 위치를 다시 잡는다.'], crit:['{u}은(는) 후송관찰의 범위와 출력을 정확히 맞춘다.', '{u}의 후송관찰이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 처치장갑의 상태가 맞지 않아 후송관찰을 중단한다.', '{u}의 후송관찰이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0371', name:'개인덧막', en:'Personal Warder Contact', scope:'class', cls:'CLS_C038',
    grade:2, rarity:1, tier:1, desc:'동료 한 명의 노출 부위에 얇은 방호층을 덧댄다. 거리가 벌어지면 막이 약해진다.', lore:'후열 인력 보호 계약에서 개인덧막을 개별 지원 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['개별 지원', '한 사람을 감싸는 방호층'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.8, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0372'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 한 명의 노출 부위에 얇은 방호층을 덧댄다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 개인덧막이 필요한 위치에 닿지 않는다.', '{u}은(는) 개인덧막을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 개인덧막의 범위와 출력을 정확히 맞춘다.', '{u}의 개인덧막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 개인덧막을 중단한다.', '{u}의 개인덧막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0372', name:'손등방호', en:'Personal Warder Guard', scope:'class', cls:'CLS_C038',
    grade:1, rarity:1, tier:1, desc:'방호패를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 손등방호를 처치자 방호 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['처치자 방호', '한 사람을 감싸는 방호층'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0373'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 방호패를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 손등방호가 필요한 위치에 닿지 않는다.', '{u}은(는) 손등방호를 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 손등방호의 범위와 출력을 정확히 맞춘다.', '{u}의 손등방호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 손등방호를 중단한다.', '{u}의 손등방호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0373', name:'보호표시', en:'Personal Warder Set', scope:'class', cls:'CLS_C038',
    grade:1, rarity:1, tier:1, desc:'한 사람을 감싸는 방호층에 맞춰 동료 한 명의 동작을 안정시킨다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 보호표시를 동료 보조 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['동료 보조', '한 사람을 감싸는 방호층'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0374'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 한 사람을 감싸는 방호층에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 보호표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 보호표시를 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 보호표시의 범위와 출력을 정확히 맞춘다.', '{u}의 보호표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 보호표시를 중단한다.', '{u}의 보호표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0374', name:'보호끼임', en:'Personal Warder Step', scope:'class', cls:'CLS_C038',
    grade:2, rarity:1, tier:1, desc:'방호패를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 보호끼임을 지원 위치 변경 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['지원 위치 변경', '한 사람을 감싸는 방호층'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0375'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 방호패를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 보호끼임이 필요한 위치에 닿지 않는다.', '{u}은(는) 보호끼임을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 보호끼임의 범위와 출력을 정확히 맞춘다.', '{u}의 보호끼임이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 보호끼임을 중단한다.', '{u}의 보호끼임이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0375', name:'막두께눈', en:'Personal Warder Reading', scope:'class', cls:'CLS_C038',
    grade:1, rarity:1, tier:1, desc:'한 사람을 감싸는 방호층의 변화를 읽어 지원이 필요한 순서를 가늠한다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 막두께눈을 상태 감지 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['상태 감지', '한 사람을 감싸는 방호층'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0376'], lines:{use:['{u}의 {s}이(가) 발동한다. 한 사람을 감싸는 방호층의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 막두께눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 막두께눈을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 막두께눈의 범위와 출력을 정확히 맞춘다.', '{u}의 막두께눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 막두께눈을 중단한다.', '{u}의 막두께눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0376', name:'방호간격', en:'Personal Warder Discipline', scope:'class', cls:'CLS_C038',
    grade:1, rarity:1, tier:1, desc:'방호패를 쓰기 전에 한 사람을 감싸는 방호층의 이상 징후를 구별한다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 방호간격을 위험 경계 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['위험 경계', '한 사람을 감싸는 방호층'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0377'], lines:{use:['{u}의 {s}이(가) 발동한다. 방호패를 쓰기 전에 한 사람을 감싸는 방호층의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 방호간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 방호간격을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 방호간격의 범위와 출력을 정확히 맞춘다.', '{u}의 방호간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 방호간격을 중단한다.', '{u}의 방호간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0377', name:'보호집중', en:'Personal Warder Foundation', scope:'class', cls:'CLS_C038',
    grade:2, rarity:1, tier:1, desc:'한 사람을 감싸는 방호층에 집중할 때 불필요한 동작을 줄인다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 보호집중을 지원 적응 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['지원 적응', '한 사람을 감싸는 방호층'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0378'], lines:{use:['{u}의 {s}이(가) 발동한다. 한 사람을 감싸는 방호층에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 보호집중이 필요한 위치에 닿지 않는다.', '{u}은(는) 보호집중을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 보호집중의 범위와 출력을 정확히 맞춘다.', '{u}의 보호집중이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 보호집중을 중단한다.', '{u}의 보호집중이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0378', name:'충격완충막', en:'Personal Warder Sequence', scope:'class', cls:'CLS_C038',
    grade:2, rarity:3, tier:2, desc:'한 번의 큰 충격을 여러 층으로 나눠 받는다. 연속 타격에는 빠르게 닳는다.', lore:'후열 인력 보호 계약에서 충격완충막을 심화 지원 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['심화 지원', '한 사람을 감싸는 방호층'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', shield:1.3, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0379'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 한 번의 큰 충격을 여러 층으로 나눠 받는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 충격완충막이 필요한 위치에 닿지 않는다.', '{u}은(는) 충격완충막을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 충격완충막의 범위와 출력을 정확히 맞춘다.', '{u}의 충격완충막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 충격완충막을 중단한다.', '{u}의 충격완충막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0379', name:'나란한막', en:'Personal Warder Coverage', scope:'class', cls:'CLS_C038',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 앞에 나란한 방호면을 세운다. 보호 범위를 벗어나면 효과가 끊긴다.', lore:'후열 인력 보호 계약에서 나란한막을 대열 지원 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['대열 지원', '한 사람을 감싸는 방호층'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.6, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0380'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 앞에 나란한 방호면을 세운다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 나란한막이 필요한 위치에 닿지 않는다.', '{u}은(는) 나란한막을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 나란한막의 범위와 출력을 정확히 맞춘다.', '{u}의 나란한막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 나란한막을 중단한다.', '{u}의 나란한막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0380', name:'파손예감', en:'Personal Warder Feedback', scope:'class', cls:'CLS_C038',
    grade:4, rarity:3, tier:4, desc:'한 사람을 감싸는 방호층이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 멀어지면 방호막이 얇아진다.', lore:'후열 인력 보호 계약에서 파손예감을 경과 관찰 용도로 쓴다. 멀어지면 방호막이 얇아진다.',
    tags:['경과 관찰', '한 사람을 감싸는 방호층'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0371'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 한 사람을 감싸는 방호층이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 파손예감이 필요한 위치에 닿지 않는다.', '{u}은(는) 파손예감을 멈추고 방호패의 위치를 다시 잡는다.'], crit:['{u}은(는) 파손예감의 범위와 출력을 정확히 맞춘다.', '{u}의 파손예감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 방호패의 상태가 맞지 않아 파손예감을 중단한다.', '{u}의 파손예감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0381', name:'잔독분리', en:'Toxin Reliever Contact', scope:'class', cls:'CLS_C039',
    grade:2, rarity:1, tier:1, desc:'동료에게 남은 약한 마력성 독을 분리한다. 독의 종류를 확인하지 못하면 중단한다.', lore:'독성 개체 대응 계약에서 잔독분리를 개별 지원 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['개별 지원', '체내에 남은 마력성 독'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_MIND', scale2:'ABL_A25', cleanse:['SE_C005'], se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0382'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료에게 남은 약한 마력성 독을 분리한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 잔독분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔독분리를 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔독분리의 범위와 출력을 정확히 맞춘다.', '{u}의 잔독분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 잔독분리를 중단한다.', '{u}의 잔독분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0382', name:'처치비말막', en:'Toxin Reliever Guard', scope:'class', cls:'CLS_C039',
    grade:1, rarity:1, tier:1, desc:'검사용침을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 처치비말막을 처치자 방호 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['처치자 방호', '체내에 남은 마력성 독'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A25', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0383'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 검사용침을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 처치비말막이 필요한 위치에 닿지 않는다.', '{u}은(는) 처치비말막을 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치비말막의 범위와 출력을 정확히 맞춘다.', '{u}의 처치비말막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 처치비말막을 중단한다.', '{u}의 처치비말막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0383', name:'해독표시', en:'Toxin Reliever Set', scope:'class', cls:'CLS_C039',
    grade:1, rarity:1, tier:1, desc:'체내에 남은 마력성 독에 맞춰 동료 한 명의 동작을 안정시킨다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 해독표시를 동료 보조 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['동료 보조', '체내에 남은 마력성 독'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MIND', scale2:'ABL_A25', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0384'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 체내에 남은 마력성 독에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 해독표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 해독표시를 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 해독표시의 범위와 출력을 정확히 맞춘다.', '{u}의 해독표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 해독표시를 중단한다.', '{u}의 해독표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0384', name:'오염원회피', en:'Toxin Reliever Step', scope:'class', cls:'CLS_C039',
    grade:2, rarity:1, tier:1, desc:'검사용침을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 오염원회피를 지원 위치 변경 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['지원 위치 변경', '체내에 남은 마력성 독'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A25', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0385'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 검사용침을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 오염원회피가 필요한 위치에 닿지 않는다.', '{u}은(는) 오염원회피를 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 오염원회피의 범위와 출력을 정확히 맞춘다.', '{u}의 오염원회피가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 오염원회피를 중단한다.', '{u}의 오염원회피가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0385', name:'독반응눈', en:'Toxin Reliever Reading', scope:'class', cls:'CLS_C039',
    grade:1, rarity:1, tier:1, desc:'체내에 남은 마력성 독의 변화를 읽어 지원이 필요한 순서를 가늠한다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 독반응눈을 상태 감지 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['상태 감지', '체내에 남은 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0386'], lines:{use:['{u}의 {s}이(가) 발동한다. 체내에 남은 마력성 독의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 독반응눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 독반응눈을 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 독반응눈의 범위와 출력을 정확히 맞춘다.', '{u}의 독반응눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 독반응눈을 중단한다.', '{u}의 독반응눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0386', name:'피부색경계', en:'Toxin Reliever Discipline', scope:'class', cls:'CLS_C039',
    grade:1, rarity:1, tier:1, desc:'검사용침을 쓰기 전에 체내에 남은 마력성 독의 이상 징후를 구별한다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 피부색경계를 위험 경계 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['위험 경계', '체내에 남은 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0387'], lines:{use:['{u}의 {s}이(가) 발동한다. 검사용침을 쓰기 전에 체내에 남은 마력성 독의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 피부색경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 피부색경계를 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 피부색경계의 범위와 출력을 정확히 맞춘다.', '{u}의 피부색경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 피부색경계를 중단한다.', '{u}의 피부색경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0387', name:'약독구별', en:'Toxin Reliever Foundation', scope:'class', cls:'CLS_C039',
    grade:2, rarity:1, tier:1, desc:'체내에 남은 마력성 독에 집중할 때 불필요한 동작을 줄인다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 약독구별을 지원 적응 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['지원 적응', '체내에 남은 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0388'], lines:{use:['{u}의 {s}이(가) 발동한다. 체내에 남은 마력성 독에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 약독구별이 필요한 위치에 닿지 않는다.', '{u}은(는) 약독구별을 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 약독구별의 범위와 출력을 정확히 맞춘다.', '{u}의 약독구별이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 약독구별을 중단한다.', '{u}의 약독구별이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0388', name:'독성완화', en:'Toxin Reliever Sequence', scope:'class', cls:'CLS_C039',
    grade:2, rarity:3, tier:2, desc:'확인한 독성 잔류물의 작용을 낮춘다. 손상된 장기를 복구하지는 못한다.', lore:'독성 개체 대응 계약에서 독성완화를 심화 지원 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['심화 지원', '체내에 남은 마력성 독'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_MIND', scale2:'ABL_A25', cleanse:['SE_C005'], se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0389'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 확인한 독성 잔류물의 작용을 낮춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 독성완화가 필요한 위치에 닿지 않는다.', '{u}은(는) 독성완화를 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 독성완화의 범위와 출력을 정확히 맞춘다.', '{u}의 독성완화가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 독성완화를 중단한다.', '{u}의 독성완화가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0389', name:'주변독차단', en:'Toxin Reliever Coverage', scope:'class', cls:'CLS_C039',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 표면 잔독을 순서대로 걷어 낸다. 새로운 노출이 이어지면 다시 오염된다.', lore:'독성 개체 대응 계약에서 주변독차단을 대열 지원 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['대열 지원', '체내에 남은 마력성 독'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MIND', scale2:'ABL_A25', cleanse:['SE_C005'], se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0390'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 표면 잔독을 순서대로 걷어 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 주변독차단이 필요한 위치에 닿지 않는다.', '{u}은(는) 주변독차단을 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 주변독차단의 범위와 출력을 정확히 맞춘다.', '{u}의 주변독차단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 주변독차단을 중단한다.', '{u}의 주변독차단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0390', name:'재오염관찰', en:'Toxin Reliever Feedback', scope:'class', cls:'CLS_C039',
    grade:4, rarity:3, tier:4, desc:'체내에 남은 마력성 독이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 원인을 모르면 치료를 서두르지 못한다.', lore:'독성 개체 대응 계약에서 재오염관찰을 경과 관찰 용도로 쓴다. 원인을 모르면 치료를 서두르지 못한다.',
    tags:['경과 관찰', '체내에 남은 마력성 독'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A25', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0381'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 체내에 남은 마력성 독이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 재오염관찰이 필요한 위치에 닿지 않는다.', '{u}은(는) 재오염관찰을 멈추고 검사용침의 위치를 다시 잡는다.'], crit:['{u}은(는) 재오염관찰의 범위와 출력을 정확히 맞춘다.', '{u}의 재오염관찰이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 검사용침의 상태가 맞지 않아 재오염관찰을 중단한다.', '{u}의 재오염관찰이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0391', name:'호흡맞춤', en:'Stamina Aide Contact', scope:'class', cls:'CLS_C040',
    grade:2, rarity:1, tier:1, desc:'동료의 들숨과 날숨을 맞춰 과한 힘을 줄인다. 음식과 잠을 대신하지 못한다.', lore:'장거리 공략 체력 보조에서 호흡맞춤을 개별 지원 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['개별 지원', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{speed:1.1, turns:3}, se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0392'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료의 들숨과 날숨을 맞춰 과한 힘을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 호흡맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 호흡맞춤을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 호흡맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 호흡맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 호흡맞춤을 중단한다.', '{u}의 호흡맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0392', name:'피로완충', en:'Stamina Aide Guard', scope:'class', cls:'CLS_C040',
    grade:1, rarity:1, tier:1, desc:'호흡띠를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 피로완충을 처치자 방호 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['처치자 방호', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0393'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 호흡띠를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 피로완충이 필요한 위치에 닿지 않는다.', '{u}은(는) 피로완충을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 피로완충의 범위와 출력을 정확히 맞춘다.', '{u}의 피로완충이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 피로완충을 중단한다.', '{u}의 피로완충이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0393', name:'기력박자', en:'Stamina Aide Set', scope:'class', cls:'CLS_C040',
    grade:1, rarity:1, tier:1, desc:'지친 몸의 호흡과 긴장에 맞춰 동료 한 명의 동작을 안정시킨다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 기력박자를 동료 보조 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['동료 보조', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0394'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지친 몸의 호흡과 긴장에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 기력박자가 필요한 위치에 닿지 않는다.', '{u}은(는) 기력박자를 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 기력박자의 범위와 출력을 정확히 맞춘다.', '{u}의 기력박자가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 기력박자를 중단한다.', '{u}의 기력박자가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0394', name:'보폭맞추기', en:'Stamina Aide Step', scope:'class', cls:'CLS_C040',
    grade:2, rarity:1, tier:1, desc:'호흡띠를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 보폭맞추기를 지원 위치 변경 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['지원 위치 변경', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0395'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 호흡띠를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 보폭맞추기가 필요한 위치에 닿지 않는다.', '{u}은(는) 보폭맞추기를 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 보폭맞추기의 범위와 출력을 정확히 맞춘다.', '{u}의 보폭맞추기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 보폭맞추기를 중단한다.', '{u}의 보폭맞추기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0395', name:'탈진가늠', en:'Stamina Aide Reading', scope:'class', cls:'CLS_C040',
    grade:1, rarity:1, tier:1, desc:'지친 몸의 호흡과 긴장의 변화를 읽어 지원이 필요한 순서를 가늠한다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 탈진가늠을 상태 감지 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['상태 감지', '지친 몸의 호흡과 긴장'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0396'], lines:{use:['{u}의 {s}이(가) 발동한다. 지친 몸의 호흡과 긴장의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탈진가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 탈진가늠을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 탈진가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 탈진가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 탈진가늠을 중단한다.', '{u}의 탈진가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0396', name:'과호흡경계', en:'Stamina Aide Discipline', scope:'class', cls:'CLS_C040',
    grade:1, rarity:1, tier:1, desc:'호흡띠를 쓰기 전에 지친 몸의 호흡과 긴장의 이상 징후를 구별한다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 과호흡경계를 위험 경계 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['위험 경계', '지친 몸의 호흡과 긴장'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0397'], lines:{use:['{u}의 {s}이(가) 발동한다. 호흡띠를 쓰기 전에 지친 몸의 호흡과 긴장의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 과호흡경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 과호흡경계를 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 과호흡경계의 범위와 출력을 정확히 맞춘다.', '{u}의 과호흡경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 과호흡경계를 중단한다.', '{u}의 과호흡경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0397', name:'회복리듬', en:'Stamina Aide Foundation', scope:'class', cls:'CLS_C040',
    grade:2, rarity:1, tier:1, desc:'지친 몸의 호흡과 긴장에 집중할 때 불필요한 동작을 줄인다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 회복리듬을 지원 적응 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['지원 적응', '지친 몸의 호흡과 긴장'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0398'], lines:{use:['{u}의 {s}이(가) 발동한다. 지친 몸의 호흡과 긴장에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 회복리듬이 필요한 위치에 닿지 않는다.', '{u}은(는) 회복리듬을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 회복리듬의 범위와 출력을 정확히 맞춘다.', '{u}의 회복리듬이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 회복리듬을 중단한다.', '{u}의 회복리듬이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0398', name:'휴식유도', en:'Stamina Aide Sequence', scope:'class', cls:'CLS_C040',
    grade:2, rarity:3, tier:2, desc:'쉬는 구간의 호흡을 고르게 해 회복을 돕는다. 이동을 멈출 여유가 필요하다.', lore:'장거리 공략 체력 보조에서 휴식유도를 심화 지원 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['심화 지원', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{speed:1.2, turns:3}, se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0399'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 쉬는 구간의 호흡을 고르게 해 회복을 돕는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 휴식유도가 필요한 위치에 닿지 않는다.', '{u}은(는) 휴식유도를 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 휴식유도의 범위와 출력을 정확히 맞춘다.', '{u}의 휴식유도가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 휴식유도를 중단한다.', '{u}의 휴식유도가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0399', name:'대열호흡', en:'Stamina Aide Coverage', scope:'class', cls:'CLS_C040',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 보폭과 호흡 박자를 맞춘다. 동료가 응답하지 않으면 연결이 끊긴다.', lore:'장거리 공략 체력 보조에서 대열호흡을 대열 지원 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['대열 지원', '지친 몸의 호흡과 긴장'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{speed:1.1, turns:3}, se:[{se:'SE_C019', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0400'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 보폭과 호흡 박자를 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열호흡이 필요한 위치에 닿지 않는다.', '{u}은(는) 대열호흡을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열호흡의 범위와 출력을 정확히 맞춘다.', '{u}의 대열호흡이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 대열호흡을 중단한다.', '{u}의 대열호흡이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0400', name:'잔피로관찰', en:'Stamina Aide Feedback', scope:'class', cls:'CLS_C040',
    grade:4, rarity:3, tier:4, desc:'지친 몸의 호흡과 긴장이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 수면과 식사를 대신할 수 없다.', lore:'장거리 공략 체력 보조에서 잔피로관찰을 경과 관찰 용도로 쓴다. 수면과 식사를 대신할 수 없다.',
    tags:['경과 관찰', '지친 몸의 호흡과 긴장'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0391'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 지친 몸의 호흡과 긴장이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔피로관찰이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔피로관찰을 멈추고 호흡띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔피로관찰의 범위와 출력을 정확히 맞춘다.', '{u}의 잔피로관찰이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 호흡띠의 상태가 맞지 않아 잔피로관찰을 중단한다.', '{u}의 잔피로관찰이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0401', name:'긴장풀기', en:'Calm Aide Contact', scope:'class', cls:'CLS_C041',
    grade:2, rarity:1, tier:1, desc:'동료의 동의를 구하고 긴장성 떨림을 줄인다. 의사나 기억을 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 긴장풀기를 개별 지원 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['개별 지원', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{mind:1.15, turns:3}, se:[{se:'SE_C023', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0402'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료의 동의를 구하고 긴장성 떨림을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 긴장풀기가 필요한 위치에 닿지 않는다.', '{u}은(는) 긴장풀기를 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 긴장풀기의 범위와 출력을 정확히 맞춘다.', '{u}의 긴장풀기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 긴장풀기를 중단한다.', '{u}의 긴장풀기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0402', name:'놀람완충', en:'Calm Aide Guard', scope:'class', cls:'CLS_C041',
    grade:1, rarity:1, tier:1, desc:'촉각구를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 놀람완충을 처치자 방호 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['처치자 방호', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0403'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 촉각구를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 놀람완충이 필요한 위치에 닿지 않는다.', '{u}은(는) 놀람완충을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 놀람완충의 범위와 출력을 정확히 맞춘다.', '{u}의 놀람완충이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 놀람완충을 중단한다.', '{u}의 놀람완충이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0403', name:'호흡신호', en:'Calm Aide Set', scope:'class', cls:'CLS_C041',
    grade:1, rarity:1, tier:1, desc:'과도한 긴장과 놀람에 맞춰 동료 한 명의 동작을 안정시킨다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 호흡신호를 동료 보조 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['동료 보조', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0404'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 과도한 긴장과 놀람에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 호흡신호가 필요한 위치에 닿지 않는다.', '{u}은(는) 호흡신호를 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 호흡신호의 범위와 출력을 정확히 맞춘다.', '{u}의 호흡신호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 호흡신호를 중단한다.', '{u}의 호흡신호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0404', name:'곁자리접근', en:'Calm Aide Step', scope:'class', cls:'CLS_C041',
    grade:2, rarity:1, tier:1, desc:'촉각구를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 곁자리접근을 지원 위치 변경 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['지원 위치 변경', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0405'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 촉각구를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 곁자리접근이 필요한 위치에 닿지 않는다.', '{u}은(는) 곁자리접근을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 곁자리접근의 범위와 출력을 정확히 맞춘다.', '{u}의 곁자리접근이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 곁자리접근을 중단한다.', '{u}의 곁자리접근이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0405', name:'떨림가늠', en:'Calm Aide Reading', scope:'class', cls:'CLS_C041',
    grade:1, rarity:1, tier:1, desc:'과도한 긴장과 놀람의 변화를 읽어 지원이 필요한 순서를 가늠한다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 떨림가늠을 상태 감지 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['상태 감지', '과도한 긴장과 놀람', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0406'], lines:{use:['{u}의 {s}이(가) 발동한다. 과도한 긴장과 놀람의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 떨림가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 떨림가늠을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 떨림가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 떨림가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 떨림가늠을 중단한다.', '{u}의 떨림가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0406', name:'표정경계', en:'Calm Aide Discipline', scope:'class', cls:'CLS_C041',
    grade:1, rarity:1, tier:1, desc:'촉각구를 쓰기 전에 과도한 긴장과 놀람의 이상 징후를 구별한다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 표정경계를 위험 경계 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['위험 경계', '과도한 긴장과 놀람', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0407'], lines:{use:['{u}의 {s}이(가) 발동한다. 촉각구를 쓰기 전에 과도한 긴장과 놀람의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 표정경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 표정경계를 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 표정경계의 범위와 출력을 정확히 맞춘다.', '{u}의 표정경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 표정경계를 중단한다.', '{u}의 표정경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0407', name:'진정간격', en:'Calm Aide Foundation', scope:'class', cls:'CLS_C041',
    grade:2, rarity:1, tier:1, desc:'과도한 긴장과 놀람에 집중할 때 불필요한 동작을 줄인다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 진정간격을 지원 적응 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['지원 적응', '과도한 긴장과 놀람', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0408'], lines:{use:['{u}의 {s}이(가) 발동한다. 과도한 긴장과 놀람에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 진정간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 진정간격을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 진정간격의 범위와 출력을 정확히 맞춘다.', '{u}의 진정간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 진정간격을 중단한다.', '{u}의 진정간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0408', name:'공포완화', en:'Calm Aide Sequence', scope:'class', cls:'CLS_C041',
    grade:2, rarity:3, tier:2, desc:'두려움으로 흐트러진 호흡을 곁에서 고른다. 공포의 원인을 없애지는 못한다.', lore:'사고 현장 심리 안정 보조에서 공포완화를 심화 지원 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['심화 지원', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{mind:1.15, turns:3}, se:[{se:'SE_C023', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0409'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 두려움으로 흐트러진 호흡을 곁에서 고른다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공포완화가 필요한 위치에 닿지 않는다.', '{u}은(는) 공포완화를 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 공포완화의 범위와 출력을 정확히 맞춘다.', '{u}의 공포완화가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 공포완화를 중단한다.', '{u}의 공포완화가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0409', name:'주변평정', en:'Calm Aide Coverage', scope:'class', cls:'CLS_C041',
    grade:3, rarity:3, tier:3, desc:'동료 둘에게 같은 호흡 신호를 보내 긴장을 낮춘다. 강제적인 복종 효과는 없다.', lore:'사고 현장 심리 안정 보조에서 주변평정을 대열 지원 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['대열 지원', '과도한 긴장과 놀람', '동료 응답'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{mind:1.15, turns:3}, se:[{se:'SE_C023', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0410'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘에게 같은 호흡 신호를 보내 긴장을 낮춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 주변평정이 필요한 위치에 닿지 않는다.', '{u}은(는) 주변평정을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 주변평정의 범위와 출력을 정확히 맞춘다.', '{u}의 주변평정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 주변평정을 중단한다.', '{u}의 주변평정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0410', name:'반동불안눈', en:'Calm Aide Feedback', scope:'class', cls:'CLS_C041',
    grade:4, rarity:3, tier:4, desc:'과도한 긴장과 놀람이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 의식이나 의사를 강제로 바꾸지 못한다.', lore:'사고 현장 심리 안정 보조에서 반동불안눈을 경과 관찰 용도로 쓴다. 의식이나 의사를 강제로 바꾸지 못한다.',
    tags:['경과 관찰', '과도한 긴장과 놀람', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0401'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 과도한 긴장과 놀람이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 반동불안눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 반동불안눈을 멈추고 촉각구의 위치를 다시 잡는다.'], crit:['{u}은(는) 반동불안눈의 범위와 출력을 정확히 맞춘다.', '{u}의 반동불안눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 촉각구의 상태가 맞지 않아 반동불안눈을 중단한다.', '{u}의 반동불안눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0411', name:'점멸전달', en:'Field Messenger Contact', scope:'class', cls:'CLS_C042',
    grade:2, rarity:1, tier:1, desc:'시야 안의 동료에게 짧은 점멸 신호를 보낸다. 신호를 모르는 상대는 이해하지 못한다.', lore:'통신 음영 지역 연락 계약에서 점멸전달을 개별 지원 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['개별 지원', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0412'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 시야 안의 동료에게 짧은 점멸 신호를 보낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 점멸전달이 필요한 위치에 닿지 않는다.', '{u}은(는) 점멸전달을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 점멸전달의 범위와 출력을 정확히 맞춘다.', '{u}의 점멸전달이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 점멸전달을 중단한다.', '{u}의 점멸전달이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0412', name:'신호가림', en:'Field Messenger Guard', scope:'class', cls:'CLS_C042',
    grade:1, rarity:1, tier:1, desc:'신호기를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 신호가림을 처치자 방호 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['처치자 방호', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0413'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 신호기를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 신호가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 신호가림을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 신호가림의 범위와 출력을 정확히 맞춘다.', '{u}의 신호가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 신호가림을 중단한다.', '{u}의 신호가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0413', name:'위치호출', en:'Field Messenger Set', scope:'class', cls:'CLS_C042',
    grade:1, rarity:1, tier:1, desc:'짧은 신호의 전달에 맞춰 동료 한 명의 동작을 안정시킨다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 위치호출을 동료 보조 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['동료 보조', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0414'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 짧은 신호의 전달에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 위치호출이 필요한 위치에 닿지 않는다.', '{u}은(는) 위치호출을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 위치호출의 범위와 출력을 정확히 맞춘다.', '{u}의 위치호출이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 위치호출을 중단한다.', '{u}의 위치호출이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0414', name:'신호따라감', en:'Field Messenger Step', scope:'class', cls:'CLS_C042',
    grade:2, rarity:1, tier:1, desc:'신호기를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 신호따라감을 지원 위치 변경 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['지원 위치 변경', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0415'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 신호기를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 신호따라감이 필요한 위치에 닿지 않는다.', '{u}은(는) 신호따라감을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 신호따라감의 범위와 출력을 정확히 맞춘다.', '{u}의 신호따라감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 신호따라감을 중단한다.', '{u}의 신호따라감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0415', name:'응답가늠', en:'Field Messenger Reading', scope:'class', cls:'CLS_C042',
    grade:1, rarity:1, tier:1, desc:'짧은 신호의 전달의 변화를 읽어 지원이 필요한 순서를 가늠한다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 응답가늠을 상태 감지 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['상태 감지', '짧은 신호의 전달', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0416'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 신호의 전달의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 응답가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 응답가늠을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 응답가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 응답가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 응답가늠을 중단한다.', '{u}의 응답가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0416', name:'호출순서', en:'Field Messenger Discipline', scope:'class', cls:'CLS_C042',
    grade:1, rarity:1, tier:1, desc:'신호기를 쓰기 전에 짧은 신호의 전달의 이상 징후를 구별한다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 호출순서를 위험 경계 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['위험 경계', '짧은 신호의 전달', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0417'], lines:{use:['{u}의 {s}이(가) 발동한다. 신호기를 쓰기 전에 짧은 신호의 전달의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 호출순서가 필요한 위치에 닿지 않는다.', '{u}은(는) 호출순서를 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 호출순서의 범위와 출력을 정확히 맞춘다.', '{u}의 호출순서가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 호출순서를 중단한다.', '{u}의 호출순서가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0417', name:'전달명료', en:'Field Messenger Foundation', scope:'class', cls:'CLS_C042',
    grade:2, rarity:1, tier:1, desc:'짧은 신호의 전달에 집중할 때 불필요한 동작을 줄인다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 전달명료를 지원 적응 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['지원 적응', '짧은 신호의 전달', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0418'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 신호의 전달에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 전달명료가 필요한 위치에 닿지 않는다.', '{u}은(는) 전달명료를 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 전달명료의 범위와 출력을 정확히 맞춘다.', '{u}의 전달명료가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 전달명료를 중단한다.', '{u}의 전달명료가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0418', name:'긴급호출', en:'Field Messenger Sequence', scope:'class', cls:'CLS_C042',
    grade:2, rarity:3, tier:2, desc:'정해 둔 긴급 신호를 동료 한 명에게 반복한다. 두꺼운 차폐물에 막힌다.', lore:'통신 음영 지역 연락 계약에서 긴급호출을 심화 지원 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['심화 지원', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0419'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 정해 둔 긴급 신호를 동료 한 명에게 반복한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 긴급호출이 필요한 위치에 닿지 않는다.', '{u}은(는) 긴급호출을 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 긴급호출의 범위와 출력을 정확히 맞춘다.', '{u}의 긴급호출이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 긴급호출을 중단한다.', '{u}의 긴급호출이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0419', name:'대열중계', en:'Field Messenger Coverage', scope:'class', cls:'CLS_C042',
    grade:3, rarity:3, tier:3, desc:'가까운 동료 둘에게 같은 신호를 차례로 전달한다. 전달 완료를 보장하지 못한다.', lore:'통신 음영 지역 연락 계약에서 대열중계를 대열 지원 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['대열 지원', '짧은 신호의 전달', '동료 응답'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0420'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가까운 동료 둘에게 같은 신호를 차례로 전달한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열중계가 필요한 위치에 닿지 않는다.', '{u}은(는) 대열중계를 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열중계의 범위와 출력을 정확히 맞춘다.', '{u}의 대열중계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 대열중계를 중단한다.', '{u}의 대열중계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0420', name:'누락경계', en:'Field Messenger Feedback', scope:'class', cls:'CLS_C042',
    grade:4, rarity:3, tier:4, desc:'짧은 신호의 전달이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 두꺼운 차폐물은 신호를 끊는다.', lore:'통신 음영 지역 연락 계약에서 누락경계를 경과 관찰 용도로 쓴다. 두꺼운 차폐물은 신호를 끊는다.',
    tags:['경과 관찰', '짧은 신호의 전달', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0411'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 신호의 전달이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 누락경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 누락경계를 멈추고 신호기의 위치를 다시 잡는다.'], crit:['{u}은(는) 누락경계의 범위와 출력을 정확히 맞춘다.', '{u}의 누락경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 신호기의 상태가 맞지 않아 누락경계를 중단한다.', '{u}의 누락경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0421', name:'행동맞춤', en:'Formation Coordinator Contact', scope:'class', cls:'CLS_C043',
    grade:2, rarity:1, tier:1, desc:'동료 한 명과 행동 시점을 맞춘다. 합의한 신호를 알아야 한다.', lore:'혼성 파티 현장 지휘에서 행동맞춤을 개별 지원 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['개별 지원', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{acc:1.12, turns:3}, se:[{se:'SE_C016', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0422'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 한 명과 행동 시점을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 행동맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 행동맞춤을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 행동맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 행동맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 행동맞춤을 중단한다.', '{u}의 행동맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0422', name:'대열방호', en:'Formation Coordinator Guard', scope:'class', cls:'CLS_C043',
    grade:1, rarity:1, tier:1, desc:'지휘봉을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 대열방호를 처치자 방호 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['처치자 방호', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0423'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지휘봉을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열방호가 필요한 위치에 닿지 않는다.', '{u}은(는) 대열방호를 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열방호의 범위와 출력을 정확히 맞춘다.', '{u}의 대열방호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 대열방호를 중단한다.', '{u}의 대열방호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0423', name:'집중지시', en:'Formation Coordinator Set', scope:'class', cls:'CLS_C043',
    grade:1, rarity:1, tier:1, desc:'짧은 명령과 대열 간격에 맞춰 동료 한 명의 동작을 안정시킨다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 집중지시를 동료 보조 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['동료 보조', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0424'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 짧은 명령과 대열 간격에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 집중지시가 필요한 위치에 닿지 않는다.', '{u}은(는) 집중지시를 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 집중지시의 범위와 출력을 정확히 맞춘다.', '{u}의 집중지시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 집중지시를 중단한다.', '{u}의 집중지시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0424', name:'간격교대', en:'Formation Coordinator Step', scope:'class', cls:'CLS_C043',
    grade:2, rarity:1, tier:1, desc:'지휘봉을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 간격교대를 지원 위치 변경 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['지원 위치 변경', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0425'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 지휘봉을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 간격교대가 필요한 위치에 닿지 않는다.', '{u}은(는) 간격교대를 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 간격교대의 범위와 출력을 정확히 맞춘다.', '{u}의 간격교대가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 간격교대를 중단한다.', '{u}의 간격교대가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0425', name:'전열가늠', en:'Formation Coordinator Reading', scope:'class', cls:'CLS_C043',
    grade:1, rarity:1, tier:1, desc:'짧은 명령과 대열 간격의 변화를 읽어 지원이 필요한 순서를 가늠한다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 전열가늠을 상태 감지 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['상태 감지', '짧은 명령과 대열 간격', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0426'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 명령과 대열 간격의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 전열가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 전열가늠을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 전열가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 전열가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 전열가늠을 중단한다.', '{u}의 전열가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0426', name:'지시압축', en:'Formation Coordinator Discipline', scope:'class', cls:'CLS_C043',
    grade:1, rarity:1, tier:1, desc:'지휘봉을 쓰기 전에 짧은 명령과 대열 간격의 이상 징후를 구별한다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 지시압축을 위험 경계 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['위험 경계', '짧은 명령과 대열 간격', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0427'], lines:{use:['{u}의 {s}이(가) 발동한다. 지휘봉을 쓰기 전에 짧은 명령과 대열 간격의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 지시압축이 필요한 위치에 닿지 않는다.', '{u}은(는) 지시압축을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 지시압축의 범위와 출력을 정확히 맞춘다.', '{u}의 지시압축이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 지시압축을 중단한다.', '{u}의 지시압축이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0427', name:'대열감각', en:'Formation Coordinator Foundation', scope:'class', cls:'CLS_C043',
    grade:2, rarity:1, tier:1, desc:'짧은 명령과 대열 간격에 집중할 때 불필요한 동작을 줄인다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 대열감각을 지원 적응 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['지원 적응', '짧은 명령과 대열 간격', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0428'], lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 명령과 대열 간격에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 대열감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 대열감각을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열감각의 범위와 출력을 정확히 맞춘다.', '{u}의 대열감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 대열감각을 중단한다.', '{u}의 대열감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0428', name:'위기재편', en:'Formation Coordinator Sequence', scope:'class', cls:'CLS_C043',
    grade:2, rarity:3, tier:2, desc:'흐트러진 동료의 역할과 이동 순서를 다시 맞춘다. 타인의 행동을 강제하지 못한다.', lore:'혼성 파티 현장 지휘에서 위기재편을 심화 지원 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['심화 지원', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{acc:1.12, turns:3}, se:[{se:'SE_C016', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0429'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 흐트러진 동료의 역할과 이동 순서를 다시 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 위기재편이 필요한 위치에 닿지 않는다.', '{u}은(는) 위기재편을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 위기재편의 범위와 출력을 정확히 맞춘다.', '{u}의 위기재편이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 위기재편을 중단한다.', '{u}의 위기재편이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0429', name:'엄호순번', en:'Formation Coordinator Coverage', scope:'class', cls:'CLS_C043',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 엄호 순서를 맞춘다. 각자가 신호에 응답할 여유가 필요하다.', lore:'혼성 파티 현장 지휘에서 엄호순번을 대열 지원 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['대열 지원', '짧은 명령과 대열 간격', '동료 응답'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{acc:1.12, turns:3}, se:[{se:'SE_C016', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0430'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 엄호 순서를 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 엄호순번이 필요한 위치에 닿지 않는다.', '{u}은(는) 엄호순번을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 엄호순번의 범위와 출력을 정확히 맞춘다.', '{u}의 엄호순번이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 엄호순번을 중단한다.', '{u}의 엄호순번이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0430', name:'명령혼선눈', en:'Formation Coordinator Feedback', scope:'class', cls:'CLS_C043',
    grade:4, rarity:3, tier:4, desc:'짧은 명령과 대열 간격이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 동료가 신호를 알아야 효과가 난다.', lore:'혼성 파티 현장 지휘에서 명령혼선눈을 경과 관찰 용도로 쓴다. 동료가 신호를 알아야 효과가 난다.',
    tags:['경과 관찰', '짧은 명령과 대열 간격', '동료 응답'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0421'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 짧은 명령과 대열 간격이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 명령혼선눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 명령혼선눈을 멈추고 지휘봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 명령혼선눈의 범위와 출력을 정확히 맞춘다.', '{u}의 명령혼선눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 지휘봉의 상태가 맞지 않아 명령혼선눈을 중단한다.', '{u}의 명령혼선눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0431', name:'출력맞춤', en:'Mana Attuner Contact', scope:'class', cls:'CLS_C044',
    grade:2, rarity:1, tier:1, desc:'동료의 마력 출력과 장비의 요구 파장을 맞춘다. 에너지를 새로 만들지는 못한다.', lore:'혼합 마력 장비 운용 보조에서 출력맞춤을 개별 지원 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['개별 지원', '서로 다른 마력의 간섭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', buff:{power:1.12, turns:3},
    se:[{se:'SE_C017', chance:1, turns:3}], cleanse:['SE_C010'], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'],
    ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0432'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료의 마력 출력과 장비의 요구 파장을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 출력맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 출력맞춤을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 출력맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 출력맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 출력맞춤을 중단한다.', '{u}의 출력맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0432', name:'간섭차폐', en:'Mana Attuner Guard', scope:'class', cls:'CLS_C044',
    grade:1, rarity:1, tier:1, desc:'조율환을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 간섭차폐를 처치자 방호 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['처치자 방호', '서로 다른 마력의 간섭'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0433'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 조율환을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 간섭차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 간섭차폐를 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 간섭차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 간섭차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 간섭차폐를 중단한다.', '{u}의 간섭차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0433', name:'마력박자', en:'Mana Attuner Set', scope:'class', cls:'CLS_C044',
    grade:1, rarity:1, tier:1, desc:'서로 다른 마력의 간섭에 맞춰 동료 한 명의 동작을 안정시킨다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 마력박자를 동료 보조 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['동료 보조', '서로 다른 마력의 간섭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', se:[{se:'SE_C017', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0434'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 다른 마력의 간섭에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 마력박자가 필요한 위치에 닿지 않는다.', '{u}은(는) 마력박자를 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 마력박자의 범위와 출력을 정확히 맞춘다.', '{u}의 마력박자가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 마력박자를 중단한다.', '{u}의 마력박자가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0434', name:'조율접근', en:'Mana Attuner Step', scope:'class', cls:'CLS_C044',
    grade:2, rarity:1, tier:1, desc:'조율환을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 조율접근을 지원 위치 변경 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['지원 위치 변경', '서로 다른 마력의 간섭'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0435'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 조율환을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 조율접근이 필요한 위치에 닿지 않는다.', '{u}은(는) 조율접근을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 조율접근의 범위와 출력을 정확히 맞춘다.', '{u}의 조율접근이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 조율접근을 중단한다.', '{u}의 조율접근이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0435', name:'파장가늠', en:'Mana Attuner Reading', scope:'class', cls:'CLS_C044',
    grade:1, rarity:1, tier:1, desc:'서로 다른 마력의 간섭의 변화를 읽어 지원이 필요한 순서를 가늠한다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 파장가늠을 상태 감지 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['상태 감지', '서로 다른 마력의 간섭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0436'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 서로 다른 마력의 간섭의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 파장가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 파장가늠을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 파장가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 파장가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 파장가늠을 중단한다.', '{u}의 파장가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0436', name:'역류경계', en:'Mana Attuner Discipline', scope:'class', cls:'CLS_C044',
    grade:1, rarity:1, tier:1, desc:'조율환을 쓰기 전에 서로 다른 마력의 간섭의 이상 징후를 구별한다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 역류경계를 위험 경계 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['위험 경계', '서로 다른 마력의 간섭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0437'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 조율환을 쓰기 전에 서로 다른 마력의 간섭의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 역류경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 역류경계를 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 역류경계의 범위와 출력을 정확히 맞춘다.', '{u}의 역류경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 역류경계를 중단한다.', '{u}의 역류경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0437', name:'파장구별', en:'Mana Attuner Foundation', scope:'class', cls:'CLS_C044',
    grade:2, rarity:1, tier:1, desc:'서로 다른 마력의 간섭에 집중할 때 불필요한 동작을 줄인다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 파장구별을 지원 적응 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['지원 적응', '서로 다른 마력의 간섭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0438'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 서로 다른 마력의 간섭에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 파장구별이 필요한 위치에 닿지 않는다.', '{u}은(는) 파장구별을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 파장구별의 범위와 출력을 정확히 맞춘다.', '{u}의 파장구별이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 파장구별을 중단한다.', '{u}의 파장구별이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0438', name:'마력완충', en:'Mana Attuner Sequence', scope:'class', cls:'CLS_C044',
    grade:2, rarity:3, tier:2, desc:'튀는 마력 출력을 짧게 분산해 역류를 줄인다. 심한 고장은 수리해야 한다.', lore:'혼합 마력 장비 운용 보조에서 마력완충을 심화 지원 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['심화 지원', '서로 다른 마력의 간섭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', buff:{power:1.12, turns:3},
    se:[{se:'SE_C017', chance:1, turns:3}], cleanse:['SE_C010'], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'],
    req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true}, risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0439'],
    lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 튀는 마력 출력을 짧게 분산해 역류를 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 마력완충이 필요한 위치에 닿지 않는다.', '{u}은(는) 마력완충을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 마력완충의 범위와 출력을 정확히 맞춘다.', '{u}의 마력완충이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 마력완충을 중단한다.', '{u}의 마력완충이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0439', name:'합주출력', en:'Mana Attuner Coverage', scope:'class', cls:'CLS_C044',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 출력 시점이 충돌하지 않게 맞춘다. 서로 다른 파장을 같게 바꾸지는 못한다.', lore:'혼합 마력 장비 운용 보조에서 합주출력을 대열 지원 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['대열 지원', '서로 다른 마력의 간섭'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', buff:{power:1.12, turns:3},
    se:[{se:'SE_C017', chance:1, turns:3}], cleanse:['SE_C010'], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'],
    req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0440'],
    lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 출력 시점이 충돌하지 않게 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 합주출력이 필요한 위치에 닿지 않는다.', '{u}은(는) 합주출력을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 합주출력의 범위와 출력을 정확히 맞춘다.', '{u}의 합주출력이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 합주출력을 중단한다.', '{u}의 합주출력이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0440', name:'출력흐림눈', en:'Mana Attuner Feedback', scope:'class', cls:'CLS_C044',
    grade:4, rarity:3, tier:4, desc:'서로 다른 마력의 간섭이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 마력이 없는 대상을 충전하지 못한다.', lore:'혼합 마력 장비 운용 보조에서 출력흐림눈을 경과 관찰 용도로 쓴다. 마력이 없는 대상을 충전하지 못한다.',
    tags:['경과 관찰', '서로 다른 마력의 간섭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', el:'EL_C10', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1,
    combo:['SK_C0431'], lines:{use:['{u}의 {s}이(가) 발동한다. 서로 다른 마력의 간섭이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 출력흐림눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 출력흐림눈을 멈추고 조율환의 위치를 다시 잡는다.'], crit:['{u}은(는) 출력흐림눈의 범위와 출력을 정확히 맞춘다.', '{u}의 출력흐림눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조율환의 상태가 맞지 않아 출력흐림눈을 중단한다.', '{u}의 출력흐림눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0441', name:'노출차단', en:'Exposure Shielder Contact', scope:'class', cls:'CLS_C045',
    grade:2, rarity:1, tier:1, desc:'동료 앞에 빛과 큰 비말을 가리는 면을 세운다. 유독 가스를 여과하지 못한다.', lore:'위험광 및 분진 현장 보조에서 노출차단을 개별 지원 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['개별 지원', '빛과 분진의 통과 경로'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.8, se:[{se:'SE_C022', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0442'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 앞에 빛과 큰 비말을 가리는 면을 세운다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 노출차단이 필요한 위치에 닿지 않는다.', '{u}은(는) 노출차단을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 노출차단의 범위와 출력을 정확히 맞춘다.', '{u}의 노출차단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 노출차단을 중단한다.', '{u}의 노출차단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0442', name:'겹차폐판', en:'Exposure Shielder Guard', scope:'class', cls:'CLS_C045',
    grade:1, rarity:1, tier:1, desc:'차폐판을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 겹차폐판을 처치자 방호 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['처치자 방호', '빛과 분진의 통과 경로'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0443'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 차폐판을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹차폐판이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹차폐판을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹차폐판의 범위와 출력을 정확히 맞춘다.', '{u}의 겹차폐판이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 겹차폐판을 중단한다.', '{u}의 겹차폐판이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0443', name:'통과창표시', en:'Exposure Shielder Set', scope:'class', cls:'CLS_C045',
    grade:1, rarity:1, tier:1, desc:'빛과 분진의 통과 경로에 맞춰 동료 한 명의 동작을 안정시킨다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 통과창표시를 동료 보조 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['동료 보조', '빛과 분진의 통과 경로'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0444'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 빛과 분진의 통과 경로에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 통과창표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 통과창표시를 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 통과창표시의 범위와 출력을 정확히 맞춘다.', '{u}의 통과창표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 통과창표시를 중단한다.', '{u}의 통과창표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0444', name:'차폐옮김', en:'Exposure Shielder Step', scope:'class', cls:'CLS_C045',
    grade:2, rarity:1, tier:1, desc:'차폐판을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 차폐옮김을 지원 위치 변경 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['지원 위치 변경', '빛과 분진의 통과 경로'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0445'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 차폐판을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 차폐옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 차폐옮김을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 차폐옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 차폐옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 차폐옮김을 중단한다.', '{u}의 차폐옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0445', name:'틈새가늠', en:'Exposure Shielder Reading', scope:'class', cls:'CLS_C045',
    grade:1, rarity:1, tier:1, desc:'빛과 분진의 통과 경로의 변화를 읽어 지원이 필요한 순서를 가늠한다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 틈새가늠을 상태 감지 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['상태 감지', '빛과 분진의 통과 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0446'], lines:{use:['{u}의 {s}이(가) 발동한다. 빛과 분진의 통과 경로의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 틈새가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 틈새가늠을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 틈새가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 틈새가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 틈새가늠을 중단한다.', '{u}의 틈새가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0446', name:'막손상경계', en:'Exposure Shielder Discipline', scope:'class', cls:'CLS_C045',
    grade:1, rarity:1, tier:1, desc:'차폐판을 쓰기 전에 빛과 분진의 통과 경로의 이상 징후를 구별한다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 막손상경계를 위험 경계 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['위험 경계', '빛과 분진의 통과 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0447'], lines:{use:['{u}의 {s}이(가) 발동한다. 차폐판을 쓰기 전에 빛과 분진의 통과 경로의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 막손상경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 막손상경계를 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 막손상경계의 범위와 출력을 정확히 맞춘다.', '{u}의 막손상경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 막손상경계를 중단한다.', '{u}의 막손상경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0447', name:'차폐층감', en:'Exposure Shielder Foundation', scope:'class', cls:'CLS_C045',
    grade:2, rarity:1, tier:1, desc:'빛과 분진의 통과 경로에 집중할 때 불필요한 동작을 줄인다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 차폐층감을 지원 적응 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['지원 적응', '빛과 분진의 통과 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0448'], lines:{use:['{u}의 {s}이(가) 발동한다. 빛과 분진의 통과 경로에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 차폐층감이 필요한 위치에 닿지 않는다.', '{u}은(는) 차폐층감을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 차폐층감의 범위와 출력을 정확히 맞춘다.', '{u}의 차폐층감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 차폐층감을 중단한다.', '{u}의 차폐층감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0448', name:'긴급가림', en:'Exposure Shielder Sequence', scope:'class', cls:'CLS_C045',
    grade:2, rarity:3, tier:2, desc:'동료를 향하는 강한 빛의 노출을 줄인다. 반대편 시야도 좁아진다.', lore:'위험광 및 분진 현장 보조에서 긴급가림을 심화 지원 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['심화 지원', '빛과 분진의 통과 경로'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', shield:1.3, se:[{se:'SE_C022', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0449'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료를 향하는 강한 빛의 노출을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 긴급가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 긴급가림을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 긴급가림의 범위와 출력을 정확히 맞춘다.', '{u}의 긴급가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 긴급가림을 중단한다.', '{u}의 긴급가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0449', name:'대열차폐', en:'Exposure Shielder Coverage', scope:'class', cls:'CLS_C045',
    grade:3, rarity:3, tier:3, desc:'동료 둘 앞에 낮은 차폐면을 펼친다. 환기를 막지 않도록 틈을 남긴다.', lore:'위험광 및 분진 현장 보조에서 대열차폐를 대열 지원 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['대열 지원', '빛과 분진의 통과 경로'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.6, se:[{se:'SE_C022', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0450'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘 앞에 낮은 차폐면을 펼친다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열차폐가 필요한 위치에 닿지 않는다.', '{u}은(는) 대열차폐를 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열차폐의 범위와 출력을 정확히 맞춘다.', '{u}의 대열차폐가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 대열차폐를 중단한다.', '{u}의 대열차폐가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0450', name:'누출관찰', en:'Exposure Shielder Feedback', scope:'class', cls:'CLS_C045',
    grade:4, rarity:3, tier:4, desc:'빛과 분진의 통과 경로이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 밀폐하면 환기를 따로 확보해야 한다.', lore:'위험광 및 분진 현장 보조에서 누출관찰을 경과 관찰 용도로 쓴다. 밀폐하면 환기를 따로 확보해야 한다.',
    tags:['경과 관찰', '빛과 분진의 통과 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0441'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 빛과 분진의 통과 경로이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 누출관찰이 필요한 위치에 닿지 않는다.', '{u}은(는) 누출관찰을 멈추고 차폐판의 위치를 다시 잡는다.'], crit:['{u}은(는) 누출관찰의 범위와 출력을 정확히 맞춘다.', '{u}의 누출관찰이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 차폐판의 상태가 맞지 않아 누출관찰을 중단한다.', '{u}의 누출관찰이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0451', name:'신호이어줌', en:'Signal Relay Worker Contact', scope:'class', cls:'CLS_C046',
    grade:2, rarity:1, tier:1, desc:'서로 확인한 두 신호 지점을 이어 준다. 중간 지점이 가려지면 끊긴다.', lore:'장거리 파티 연결 계약에서 신호이어줌을 개별 지원 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['개별 지원', '떨어진 동료 사이의 신호'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0452'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 확인한 두 신호 지점을 이어 준다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 신호이어줌이 필요한 위치에 닿지 않는다.', '{u}은(는) 신호이어줌을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 신호이어줌의 범위와 출력을 정확히 맞춘다.', '{u}의 신호이어줌이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 신호이어줌을 중단한다.', '{u}의 신호이어줌이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0452', name:'접점방호', en:'Signal Relay Worker Guard', scope:'class', cls:'CLS_C046',
    grade:1, rarity:1, tier:1, desc:'중계구를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 접점방호를 처치자 방호 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['처치자 방호', '떨어진 동료 사이의 신호'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0453'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 중계구를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접점방호가 필요한 위치에 닿지 않는다.', '{u}은(는) 접점방호를 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 접점방호의 범위와 출력을 정확히 맞춘다.', '{u}의 접점방호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 접점방호를 중단한다.', '{u}의 접점방호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0453', name:'중계점표시', en:'Signal Relay Worker Set', scope:'class', cls:'CLS_C046',
    grade:1, rarity:1, tier:1, desc:'떨어진 동료 사이의 신호에 맞춰 동료 한 명의 동작을 안정시킨다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 중계점표시를 동료 보조 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['동료 보조', '떨어진 동료 사이의 신호'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0454'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 떨어진 동료 사이의 신호에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 중계점표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 중계점표시를 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 중계점표시의 범위와 출력을 정확히 맞춘다.', '{u}의 중계점표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 중계점표시를 중단한다.', '{u}의 중계점표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0454', name:'접점이동', en:'Signal Relay Worker Step', scope:'class', cls:'CLS_C046',
    grade:2, rarity:1, tier:1, desc:'중계구를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 접점이동을 지원 위치 변경 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['지원 위치 변경', '떨어진 동료 사이의 신호'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0455'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 중계구를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접점이동이 필요한 위치에 닿지 않는다.', '{u}은(는) 접점이동을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 접점이동의 범위와 출력을 정확히 맞춘다.', '{u}의 접점이동이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 접점이동을 중단한다.', '{u}의 접점이동이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0455', name:'연결가늠', en:'Signal Relay Worker Reading', scope:'class', cls:'CLS_C046',
    grade:1, rarity:1, tier:1, desc:'떨어진 동료 사이의 신호의 변화를 읽어 지원이 필요한 순서를 가늠한다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 연결가늠을 상태 감지 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['상태 감지', '떨어진 동료 사이의 신호'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0456'], lines:{use:['{u}의 {s}이(가) 발동한다. 떨어진 동료 사이의 신호의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 연결가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 연결가늠을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 연결가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 연결가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 연결가늠을 중단한다.', '{u}의 연결가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0456', name:'지연경계', en:'Signal Relay Worker Discipline', scope:'class', cls:'CLS_C046',
    grade:1, rarity:1, tier:1, desc:'중계구를 쓰기 전에 떨어진 동료 사이의 신호의 이상 징후를 구별한다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 지연경계를 위험 경계 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['위험 경계', '떨어진 동료 사이의 신호'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0457'], lines:{use:['{u}의 {s}이(가) 발동한다. 중계구를 쓰기 전에 떨어진 동료 사이의 신호의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 지연경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 지연경계를 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 지연경계의 범위와 출력을 정확히 맞춘다.', '{u}의 지연경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 지연경계를 중단한다.', '{u}의 지연경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0457', name:'중계기억', en:'Signal Relay Worker Foundation', scope:'class', cls:'CLS_C046',
    grade:2, rarity:1, tier:1, desc:'떨어진 동료 사이의 신호에 집중할 때 불필요한 동작을 줄인다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 중계기억을 지원 적응 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['지원 적응', '떨어진 동료 사이의 신호'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0458'], lines:{use:['{u}의 {s}이(가) 발동한다. 떨어진 동료 사이의 신호에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 중계기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 중계기억을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 중계기억의 범위와 출력을 정확히 맞춘다.', '{u}의 중계기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 중계기억을 중단한다.', '{u}의 중계기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0458', name:'우회연결', en:'Signal Relay Worker Sequence', scope:'class', cls:'CLS_C046',
    grade:2, rarity:3, tier:2, desc:'가까운 우회 지점을 통해 신호를 다시 잇는다. 새 지점을 먼저 확인해야 한다.', lore:'장거리 파티 연결 계약에서 우회연결을 심화 지원 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['심화 지원', '떨어진 동료 사이의 신호'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0459'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가까운 우회 지점을 통해 신호를 다시 잇는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 우회연결이 필요한 위치에 닿지 않는다.', '{u}은(는) 우회연결을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 우회연결의 범위와 출력을 정확히 맞춘다.', '{u}의 우회연결이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 우회연결을 중단한다.', '{u}의 우회연결이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0459', name:'다중중계', en:'Signal Relay Worker Coverage', scope:'class', cls:'CLS_C046',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 신호를 하나씩 순서대로 중계한다. 동시에 보내면 혼선이 난다.', lore:'장거리 파티 연결 계약에서 다중중계를 대열 지원 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['대열 지원', '떨어진 동료 사이의 신호'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{sense:1.12, turns:3}, se:[{se:'SE_C024', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0460'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 신호를 하나씩 순서대로 중계한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다중중계가 필요한 위치에 닿지 않는다.', '{u}은(는) 다중중계를 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 다중중계의 범위와 출력을 정확히 맞춘다.', '{u}의 다중중계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 다중중계를 중단한다.', '{u}의 다중중계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0460', name:'끊김예감', en:'Signal Relay Worker Feedback', scope:'class', cls:'CLS_C046',
    grade:4, rarity:3, tier:4, desc:'떨어진 동료 사이의 신호이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 연결 지점이 끊기면 재설치해야 한다.', lore:'장거리 파티 연결 계약에서 끊김예감을 경과 관찰 용도로 쓴다. 연결 지점이 끊기면 재설치해야 한다.',
    tags:['경과 관찰', '떨어진 동료 사이의 신호'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0451'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 떨어진 동료 사이의 신호이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 끊김예감이 필요한 위치에 닿지 않는다.', '{u}은(는) 끊김예감을 멈추고 중계구의 위치를 다시 잡는다.'], crit:['{u}은(는) 끊김예감의 범위와 출력을 정확히 맞춘다.', '{u}의 끊김예감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 중계구의 상태가 맞지 않아 끊김예감을 중단한다.', '{u}의 끊김예감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0461', name:'표면씻김', en:'Residue Cleaner Contact', scope:'class', cls:'CLS_C047',
    grade:2, rarity:2, tier:1, desc:'피부와 장비 표면의 약한 오염을 걷어 낸다. 몸속 손상까지 씻지는 못한다.', lore:'마력 잔류물 청소 계약에서 표면씻김을 개별 지원 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['개별 지원', '피부와 장비 표면의 오염'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', cleanse:['SE_C002', 'SE_C003', 'SE_C005'], se:[{se:'SE_C026', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0462'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 피부와 장비 표면의 약한 오염을 걷어 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 표면씻김이 필요한 위치에 닿지 않는다.', '{u}은(는) 표면씻김을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 표면씻김의 범위와 출력을 정확히 맞춘다.', '{u}의 표면씻김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 표면씻김을 중단한다.', '{u}의 표면씻김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0462', name:'오염손막', en:'Residue Cleaner Guard', scope:'class', cls:'CLS_C047',
    grade:1, rarity:2, tier:1, desc:'세척솔을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 오염손막을 처치자 방호 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['처치자 방호', '피부와 장비 표면의 오염'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0463'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 세척솔을 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 오염손막이 필요한 위치에 닿지 않는다.', '{u}은(는) 오염손막을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 오염손막의 범위와 출력을 정확히 맞춘다.', '{u}의 오염손막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 오염손막을 중단한다.', '{u}의 오염손막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0463', name:'안전면표시', en:'Residue Cleaner Set', scope:'class', cls:'CLS_C047',
    grade:1, rarity:2, tier:1, desc:'피부와 장비 표면의 오염에 맞춰 동료 한 명의 동작을 안정시킨다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 안전면표시를 동료 보조 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['동료 보조', '피부와 장비 표면의 오염'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0464'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 피부와 장비 표면의 오염에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 안전면표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 안전면표시를 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 안전면표시의 범위와 출력을 정확히 맞춘다.', '{u}의 안전면표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 안전면표시를 중단한다.', '{u}의 안전면표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0464', name:'정화면접근', en:'Residue Cleaner Step', scope:'class', cls:'CLS_C047',
    grade:2, rarity:2, tier:1, desc:'세척솔을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 정화면접근을 지원 위치 변경 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['지원 위치 변경', '피부와 장비 표면의 오염'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0465'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 세척솔을 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 정화면접근이 필요한 위치에 닿지 않는다.', '{u}은(는) 정화면접근을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 정화면접근의 범위와 출력을 정확히 맞춘다.', '{u}의 정화면접근이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 정화면접근을 중단한다.', '{u}의 정화면접근이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0465', name:'잔류가늠', en:'Residue Cleaner Reading', scope:'class', cls:'CLS_C047',
    grade:1, rarity:2, tier:1, desc:'피부와 장비 표면의 오염의 변화를 읽어 지원이 필요한 순서를 가늠한다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 잔류가늠을 상태 감지 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['상태 감지', '피부와 장비 표면의 오염'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0466'], lines:{use:['{u}의 {s}이(가) 발동한다. 피부와 장비 표면의 오염의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔류가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔류가늠을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔류가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 잔류가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 잔류가늠을 중단한다.', '{u}의 잔류가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0466', name:'비산경계', en:'Residue Cleaner Discipline', scope:'class', cls:'CLS_C047',
    grade:1, rarity:2, tier:1, desc:'세척솔을 쓰기 전에 피부와 장비 표면의 오염의 이상 징후를 구별한다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 비산경계를 위험 경계 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['위험 경계', '피부와 장비 표면의 오염'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0467'], lines:{use:['{u}의 {s}이(가) 발동한다. 세척솔을 쓰기 전에 피부와 장비 표면의 오염의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 비산경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 비산경계를 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 비산경계의 범위와 출력을 정확히 맞춘다.', '{u}의 비산경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 비산경계를 중단한다.', '{u}의 비산경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0467', name:'세척분리', en:'Residue Cleaner Foundation', scope:'class', cls:'CLS_C047',
    grade:2, rarity:2, tier:1, desc:'피부와 장비 표면의 오염에 집중할 때 불필요한 동작을 줄인다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 세척분리를 지원 적응 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['지원 적응', '피부와 장비 표면의 오염'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0468'], lines:{use:['{u}의 {s}이(가) 발동한다. 피부와 장비 표면의 오염에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 세척분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 세척분리를 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 세척분리의 범위와 출력을 정확히 맞춘다.', '{u}의 세척분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 세척분리를 중단한다.', '{u}의 세척분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0468', name:'잔류분해', en:'Residue Cleaner Sequence', scope:'class', cls:'CLS_C047',
    grade:2, rarity:3, tier:2, desc:'표면에 남은 마력성 잔류물을 나눠 제거한다. 원래 재료까지 깎지 않도록 멈춰 확인한다.', lore:'마력 잔류물 청소 계약에서 잔류분해를 심화 지원 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['심화 지원', '피부와 장비 표면의 오염'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', cleanse:['SE_C002', 'SE_C003', 'SE_C005'], se:[{se:'SE_C026', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}}, ai:{allyHurt:true},
    risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0469'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표면에 남은 마력성 잔류물을 나눠 제거한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 잔류분해가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔류분해를 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔류분해의 범위와 출력을 정확히 맞춘다.', '{u}의 잔류분해가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 잔류분해를 중단한다.', '{u}의 잔류분해가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0469', name:'주변청정', en:'Residue Cleaner Coverage', scope:'class', cls:'CLS_C047',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 표면 잔류물을 순서대로 걷어 낸다. 오염원이 남아 있으면 다시 묻는다.', lore:'마력 잔류물 청소 계약에서 주변청정을 대열 지원 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['대열 지원', '피부와 장비 표면의 오염'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', cleanse:['SE_C002', 'SE_C003', 'SE_C005'], se:[{se:'SE_C026', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0470'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 표면 잔류물을 순서대로 걷어 낸다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 주변청정이 필요한 위치에 닿지 않는다.', '{u}은(는) 주변청정을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 주변청정의 범위와 출력을 정확히 맞춘다.', '{u}의 주변청정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 주변청정을 중단한다.', '{u}의 주변청정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0470', name:'오염되묻음눈', en:'Residue Cleaner Feedback', scope:'class', cls:'CLS_C047',
    grade:4, rarity:3, tier:4, desc:'피부와 장비 표면의 오염이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 몸속 손상까지 씻어 내지는 못한다.', lore:'마력 잔류물 청소 계약에서 오염되묻음눈을 경과 관찰 용도로 쓴다. 몸속 손상까지 씻어 내지는 못한다.',
    tags:['경과 관찰', '피부와 장비 표면의 오염'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0461'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 피부와 장비 표면의 오염이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 오염되묻음눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 오염되묻음눈을 멈추고 세척솔의 위치를 다시 잡는다.'], crit:['{u}은(는) 오염되묻음눈의 범위와 출력을 정확히 맞춘다.', '{u}의 오염되묻음눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 세척솔의 상태가 맞지 않아 오염되묻음눈을 중단한다.', '{u}의 오염되묻음눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0471', name:'체중나눔', en:'Rescue Carrier Contact', scope:'class', cls:'CLS_C048',
    grade:2, rarity:2, tier:1, desc:'부축할 동료와 체중을 나눌 지점을 맞춘다. 골절 부위를 함부로 움직이지 않는다.', lore:'부상 헌터 후송 계약에서 체중나눔을 개별 지원 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['개별 지원', '함께 나누는 체중과 보폭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{def:1.1, turns:3}, se:[{se:'SE_C028', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0472'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 부축할 동료와 체중을 나눌 지점을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 체중나눔이 필요한 위치에 닿지 않는다.', '{u}은(는) 체중나눔을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 체중나눔의 범위와 출력을 정확히 맞춘다.', '{u}의 체중나눔이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 체중나눔을 중단한다.', '{u}의 체중나눔이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0472', name:'운반완충', en:'Rescue Carrier Guard', scope:'class', cls:'CLS_C048',
    grade:1, rarity:2, tier:1, desc:'구조띠를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 운반완충을 처치자 방호 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['처치자 방호', '함께 나누는 체중과 보폭'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0473'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 구조띠를 든 손 주위에 얇은 막을 둘러 처치 중 접촉을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 운반완충이 필요한 위치에 닿지 않는다.', '{u}은(는) 운반완충을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 운반완충의 범위와 출력을 정확히 맞춘다.', '{u}의 운반완충이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 운반완충을 중단한다.', '{u}의 운반완충이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0473', name:'들것신호', en:'Rescue Carrier Set', scope:'class', cls:'CLS_C048',
    grade:1, rarity:2, tier:1, desc:'함께 나누는 체중과 보폭에 맞춰 동료 한 명의 동작을 안정시킨다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 들것신호를 동료 보조 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['동료 보조', '함께 나누는 체중과 보폭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_MIND', scale2:'ABL_A27', se:[{se:'SE_C017', chance:1, turns:3}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{allyHurt:true}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0474'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 함께 나누는 체중과 보폭에 맞춰 동료 한 명의 동작을 안정시킨다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 들것신호가 필요한 위치에 닿지 않는다.', '{u}은(는) 들것신호를 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 들것신호의 범위와 출력을 정확히 맞춘다.', '{u}의 들것신호가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 들것신호를 중단한다.', '{u}의 들것신호가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', daily:true
  },
  {
    id:'SK_C0474', name:'함께물림', en:'Rescue Carrier Step', scope:'class', cls:'CLS_C048',
    grade:2, rarity:2, tier:1, desc:'구조띠를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 함께물림을 지원 위치 변경 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['지원 위치 변경', '함께 나누는 체중과 보폭'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_MIND', scale2:'ABL_A27', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0475'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 구조띠를 몸 가까이 두고 지원 가능한 거리로 짧게 이동한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 함께물림이 필요한 위치에 닿지 않는다.', '{u}은(는) 함께물림을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 함께물림의 범위와 출력을 정확히 맞춘다.', '{u}의 함께물림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 함께물림을 중단한다.', '{u}의 함께물림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0475', name:'통증가늠', en:'Rescue Carrier Reading', scope:'class', cls:'CLS_C048',
    grade:1, rarity:2, tier:1, desc:'함께 나누는 체중과 보폭의 변화를 읽어 지원이 필요한 순서를 가늠한다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 통증가늠을 상태 감지 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['상태 감지', '함께 나누는 체중과 보폭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0476'], lines:{use:['{u}의 {s}이(가) 발동한다. 함께 나누는 체중과 보폭의 변화를 읽어 지원이 필요한 순서를 가늠한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 통증가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 통증가늠을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 통증가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 통증가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 통증가늠을 중단한다.', '{u}의 통증가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0476', name:'낙하경계', en:'Rescue Carrier Discipline', scope:'class', cls:'CLS_C048',
    grade:1, rarity:2, tier:1, desc:'구조띠를 쓰기 전에 함께 나누는 체중과 보폭의 이상 징후를 구별한다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 낙하경계를 위험 경계 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['위험 경계', '함께 나누는 체중과 보폭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0477'], lines:{use:['{u}의 {s}이(가) 발동한다. 구조띠를 쓰기 전에 함께 나누는 체중과 보폭의 이상 징후를 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 낙하경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 낙하경계를 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙하경계의 범위와 출력을 정확히 맞춘다.', '{u}의 낙하경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 낙하경계를 중단한다.', '{u}의 낙하경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0477', name:'부축균형', en:'Rescue Carrier Foundation', scope:'class', cls:'CLS_C048',
    grade:2, rarity:2, tier:1, desc:'함께 나누는 체중과 보폭에 집중할 때 불필요한 동작을 줄인다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 부축균형을 지원 적응 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['지원 적응', '함께 나누는 체중과 보폭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{mind:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0478'], lines:{use:['{u}의 {s}이(가) 발동한다. 함께 나누는 체중과 보폭에 집중할 때 불필요한 동작을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 부축균형이 필요한 위치에 닿지 않는다.', '{u}은(는) 부축균형을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 부축균형의 범위와 출력을 정확히 맞춘다.', '{u}의 부축균형이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 부축균형을 중단한다.', '{u}의 부축균형이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0478', name:'후송지탱', en:'Rescue Carrier Sequence', scope:'class', cls:'CLS_C048',
    grade:2, rarity:3, tier:2, desc:'고정한 구조띠로 동료의 하중을 짧게 당겨 받는다. 지지점의 강도를 먼저 확인해야 한다.', lore:'부상 헌터 후송 계약에서 후송지탱을 심화 지원 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['심화 지원', '함께 나누는 체중과 보폭'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{def:1.1, turns:3}, se:[{se:'SE_C028', chance:1, turns:3}],
    move:'pull', maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_MIND:12}, abl:{ABL_A27:8}},
    ai:{allyHurt:true}, risk:3, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0479'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 고정한 구조띠로 동료의 하중을 짧게 당겨 받는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 후송지탱이 필요한 위치에 닿지 않는다.', '{u}은(는) 후송지탱을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 후송지탱의 범위와 출력을 정확히 맞춘다.', '{u}의 후송지탱이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 후송지탱을 중단한다.', '{u}의 후송지탱이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex', daily:true
  },
  {
    id:'SK_C0479', name:'동반이탈', en:'Rescue Carrier Coverage', scope:'class', cls:'CLS_C048',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 후송 순서를 정하고 지지점을 나눈다. 두 사람을 동시에 들어 올리지는 못한다.', lore:'부상 헌터 후송 계약에서 동반이탈을 대열 지원 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['대열 지원', '함께 나누는 체중과 보폭'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_MIND', scale2:'ABL_A27', buff:{def:1.1, turns:3}, se:[{se:'SE_C028', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_MIND:15}, abl:{ABL_A27:10}}, ai:{allyHurt:true},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0480'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 후송 순서를 정하고 지지점을 나눈다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 동반이탈이 필요한 위치에 닿지 않는다.', '{u}은(는) 동반이탈을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 동반이탈의 범위와 출력을 정확히 맞춘다.', '{u}의 동반이탈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 동반이탈을 중단한다.', '{u}의 동반이탈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex',
    daily:true
  },
  {
    id:'SK_C0480', name:'하중변화눈', en:'Rescue Carrier Feedback', scope:'class', cls:'CLS_C048',
    grade:4, rarity:3, tier:4, desc:'함께 나누는 체중과 보폭이 다시 나빠지는 징후를 지원 뒤에도 관찰한다. 골절 부위를 함부로 움직일 수 없다.', lore:'부상 헌터 후송 계약에서 하중변화눈을 경과 관찰 용도로 쓴다. 골절 부위를 함부로 움직일 수 없다.',
    tags:['경과 관찰', '함께 나누는 체중과 보폭'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_MIND', scale2:'ABL_A27', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_MIND:18}, abl:{ABL_A27:12}}, risk:1, combo:['SK_C0471'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 함께 나누는 체중과 보폭이 다시 나빠지는 징후를 지원 뒤에도 관찰한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 하중변화눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 하중변화눈을 멈추고 구조띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 하중변화눈의 범위와 출력을 정확히 맞춘다.', '{u}의 하중변화눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 구조띠의 상태가 맞지 않아 하중변화눈을 중단한다.', '{u}의 하중변화눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0481', name:'탐침찌름', en:'Probe Surveyor Contact', scope:'class', cls:'CLS_C049',
    grade:2, rarity:1, tier:1, desc:'탐침봉에 마력을 실어 가까운 적의 움직임을 견제한다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 탐침찌름을 견제 공격 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['견제 공격', '가느다란 마력 탐침'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:-1,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0482'], lines:{use:['{u}은(는) 탐침봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 탐침찌름이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 탐침찌름을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 탐침찌름의 경로에서 몸을 뺀다.', '{u}의 탐침봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 탐침찌름이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 탐침찌름의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 탐침찌름을 중단한다.', '{u}의 탐침찌름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0482', name:'탐침울타리', en:'Probe Surveyor Guard', scope:'class', cls:'CLS_C049',
    grade:1, rarity:1, tier:1, desc:'탐침봉 주위의 마력으로 얇은 방호면을 만든다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 탐침울타리를 임시 방호 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['임시 방호', '가느다란 마력 탐침'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0483'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 탐침봉 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탐침울타리가 필요한 위치에 닿지 않는다.', '{u}은(는) 탐침울타리를 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 탐침울타리의 범위와 출력을 정확히 맞춘다.', '{u}의 탐침울타리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 탐침울타리를 중단한다.', '{u}의 탐침울타리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0483', name:'틈새표시', en:'Probe Surveyor Set', scope:'class', cls:'CLS_C049',
    grade:1, rarity:1, tier:1, desc:'가느다란 마력 탐침을 이용해 대상의 이동 경로를 좁힌다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 틈새표시를 위치 제어 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['위치 제어', '가느다란 마력 탐침'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0484'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가느다란 마력 탐침을 이용해 대상의 이동 경로를 좁힌다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 틈새표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 틈새표시를 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 틈새표시의 범위와 출력을 정확히 맞춘다.', '{u}의 틈새표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 틈새표시를 중단한다.', '{u}의 틈새표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0484', name:'탐침회수보', en:'Probe Surveyor Step', scope:'class', cls:'CLS_C049',
    grade:2, rarity:1, tier:1, desc:'가느다란 마력 탐침을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 탐침회수보를 안전 이동 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['안전 이동', '가느다란 마력 탐침'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0485'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가느다란 마력 탐침을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탐침회수보가 필요한 위치에 닿지 않는다.', '{u}은(는) 탐침회수보를 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 탐침회수보의 범위와 출력을 정확히 맞춘다.', '{u}의 탐침회수보가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 탐침회수보를 중단한다.', '{u}의 탐침회수보가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0485', name:'빈틈울림', en:'Probe Surveyor Reading', scope:'class', cls:'CLS_C049',
    grade:1, rarity:1, tier:1, desc:'가느다란 마력 탐침의 작은 차이를 읽어 주변 이상을 구별한다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 빈틈울림을 이상 감지 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['이상 감지', '가느다란 마력 탐침'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0486'], lines:{use:['{u}의 {s}이(가) 발동한다. 가느다란 마력 탐침의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 빈틈울림이 필요한 위치에 닿지 않는다.', '{u}은(는) 빈틈울림을 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 빈틈울림의 범위와 출력을 정확히 맞춘다.', '{u}의 빈틈울림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 빈틈울림을 중단한다.', '{u}의 빈틈울림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0486', name:'탐침분리감', en:'Probe Surveyor Discipline', scope:'class', cls:'CLS_C049',
    grade:1, rarity:1, tier:1, desc:'가느다란 마력 탐침을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 탐침분리감을 작업 경계 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['작업 경계', '가느다란 마력 탐침'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0487'], lines:{use:['{u}의 {s}이(가) 발동한다. 가느다란 마력 탐침을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탐침분리감이 필요한 위치에 닿지 않는다.', '{u}은(는) 탐침분리감을 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 탐침분리감의 범위와 출력을 정확히 맞춘다.', '{u}의 탐침분리감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 탐침분리감을 중단한다.', '{u}의 탐침분리감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0487', name:'깊이가늠', en:'Probe Surveyor Foundation', scope:'class', cls:'CLS_C049',
    grade:2, rarity:1, tier:1, desc:'가느다란 마력 탐침을 유지하는 데 필요한 힘을 일정하게 나눈다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 깊이가늠을 기술 적응 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['기술 적응', '가느다란 마력 탐침'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0488'], lines:{use:['{u}의 {s}이(가) 발동한다. 가느다란 마력 탐침을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 깊이가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 깊이가늠을 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 깊이가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 깊이가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 깊이가늠을 중단한다.', '{u}의 깊이가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0488', name:'갈래탐침', en:'Probe Surveyor Sequence', scope:'class', cls:'CLS_C049',
    grade:2, rarity:3, tier:2, desc:'탐침봉의 마력을 나눠 가까운 적 둘을 견제한다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 갈래탐침을 분산 견제 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['분산 견제', '가느다란 마력 탐침'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:-1,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0489'], lines:{use:['{u}은(는) 탐침봉의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래탐침의 경로에서 몸을 뺀다.', '{u}의 탐침봉이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래탐침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래탐침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 갈래탐침을 중단한다.', '{u}의 갈래탐침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0489', name:'우회선표시', en:'Probe Surveyor Coverage', scope:'class', cls:'CLS_C049',
    grade:3, rarity:3, tier:3, desc:'가느다란 마력 탐침을 이용해 동료가 물러날 경로를 확보한다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 우회선표시를 퇴각 지원 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['퇴각 지원', '가느다란 마력 탐침'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0490'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가느다란 마력 탐침을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 우회선표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 우회선표시를 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 우회선표시의 범위와 출력을 정확히 맞춘다.', '{u}의 우회선표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 우회선표시를 중단한다.', '{u}의 우회선표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0490', name:'탐침단절감', en:'Probe Surveyor Feedback', scope:'class', cls:'CLS_C049',
    grade:4, rarity:3, tier:4, desc:'가느다란 마력 탐침이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 확인한 깊이 너머는 보장하지 못한다.', lore:'미확인 게이트 선행 측량에서 탐침단절감을 실패 징후 용도로 쓴다. 확인한 깊이 너머는 보장하지 못한다.',
    tags:['실패 징후', '가느다란 마력 탐침'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0481'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 가느다란 마력 탐침이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 탐침단절감이 필요한 위치에 닿지 않는다.', '{u}은(는) 탐침단절감을 멈추고 탐침봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 탐침단절감의 범위와 출력을 정확히 맞춘다.', '{u}의 탐침단절감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 탐침봉의 상태가 맞지 않아 탐침단절감을 중단한다.', '{u}의 탐침단절감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0491', name:'무음긁기', en:'Quiet Walker Contact', scope:'class', cls:'CLS_C050',
    grade:2, rarity:1, tier:1, desc:'연질단검으로 가까운 적의 노출 부위를 얕게 긁는다. 소리를 줄여도 접촉하면 위치가 드러난다.', lore:'야행성 개체 관측 계약에서 무음긁기를 견제 공격 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['견제 공격', '발소리와 몸의 윤곽'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:0,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08',
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0492'], lines:{use:['{u}은(는) 연질단검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 무음긁기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 무음긁기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 무음긁기의 경로에서 몸을 뺀다.', '{u}의 연질단검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 무음긁기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 무음긁기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 무음긁기를 중단한다.', '{u}의 무음긁기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0492', name:'그늘가림', en:'Quiet Walker Guard', scope:'class', cls:'CLS_C050',
    grade:1, rarity:1, tier:1, desc:'연질단검 주위의 마력으로 얇은 방호면을 만든다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 그늘가림을 임시 방호 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['임시 방호', '발소리와 몸의 윤곽'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', shield:0.75,
    se:[{se:'SE_C013', chance:1, turns:3}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0493'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 연질단검 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 그늘가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 그늘가림을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 그늘가림의 범위와 출력을 정확히 맞춘다.', '{u}의 그늘가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 그늘가림을 중단한다.', '{u}의 그늘가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0493', name:'소음미끼', en:'Quiet Walker Set', scope:'class', cls:'CLS_C050',
    grade:1, rarity:1, tier:1, desc:'발소리와 몸의 윤곽을 이용해 대상의 이동 경로를 좁힌다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 소음미끼를 위치 제어 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['위치 제어', '발소리와 몸의 윤곽'], kind:'액티브', target:'area', range:'near', area:2,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', se:[{se:'SE_C009', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0494'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발소리와 몸의 윤곽을 이용해 대상의 이동 경로를 좁힌다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 소음미끼가 필요한 위치에 닿지 않는다.', '{u}은(는) 소음미끼를 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 소음미끼의 범위와 출력을 정확히 맞춘다.', '{u}의 소음미끼가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 소음미끼를 중단한다.', '{u}의 소음미끼가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0494', name:'낮은발딛기', en:'Quiet Walker Step', scope:'class', cls:'CLS_C050',
    grade:2, rarity:1, tier:1, desc:'발소리와 몸의 윤곽을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 낮은발딛기를 안전 이동 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['안전 이동', '발소리와 몸의 윤곽'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', move:'retreat',
    se:[{se:'SE_C015', chance:1, turns:1}], maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0495'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발소리와 몸의 윤곽을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 낮은발딛기가 필요한 위치에 닿지 않는다.', '{u}은(는) 낮은발딛기를 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은발딛기의 범위와 출력을 정확히 맞춘다.', '{u}의 낮은발딛기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 낮은발딛기를 중단한다.', '{u}의 낮은발딛기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0495', name:'시선가늠', en:'Quiet Walker Reading', scope:'class', cls:'CLS_C050',
    grade:1, rarity:1, tier:1, desc:'발소리와 몸의 윤곽의 작은 차이를 읽어 주변 이상을 구별한다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 시선가늠을 이상 감지 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['이상 감지', '발소리와 몸의 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0496'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 발소리와 몸의 윤곽의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 시선가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 시선가늠을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 시선가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 시선가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 시선가늠을 중단한다.', '{u}의 시선가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0496', name:'소리누름', en:'Quiet Walker Discipline', scope:'class', cls:'CLS_C050',
    grade:1, rarity:1, tier:1, desc:'발소리와 몸의 윤곽을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 소리누름을 작업 경계 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['작업 경계', '발소리와 몸의 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0497'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 발소리와 몸의 윤곽을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 소리누름이 필요한 위치에 닿지 않는다.', '{u}은(는) 소리누름을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 소리누름의 범위와 출력을 정확히 맞춘다.', '{u}의 소리누름이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 소리누름을 중단한다.', '{u}의 소리누름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0497', name:'발압분산', en:'Quiet Walker Foundation', scope:'class', cls:'CLS_C050',
    grade:2, rarity:1, tier:1, desc:'발소리와 몸의 윤곽을 유지하는 데 필요한 힘을 일정하게 나눈다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 발압분산을 기술 적응 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['기술 적응', '발소리와 몸의 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08},
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0498'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 발소리와 몸의 윤곽을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 발압분산이 필요한 위치에 닿지 않는다.', '{u}은(는) 발압분산을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 발압분산의 범위와 출력을 정확히 맞춘다.', '{u}의 발압분산이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 발압분산을 중단한다.', '{u}의 발압분산이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0498', name:'사각절개', en:'Quiet Walker Sequence', scope:'class', cls:'CLS_C050',
    grade:2, rarity:3, tier:2, desc:'연질단검의 마력을 나눠 가까운 적 둘을 견제한다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 사각절개를 분산 견제 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['분산 견제', '발소리와 몸의 윤곽'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:0,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08',
    maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0499'], lines:{use:['{u}은(는) 연질단검의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 사각절개의 경로에서 몸을 뺀다.', '{u}의 연질단검이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 사각절개가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 사각절개의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 사각절개를 중단한다.', '{u}의 사각절개가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0499', name:'철수그늘', en:'Quiet Walker Coverage', scope:'class', cls:'CLS_C050',
    grade:3, rarity:3, tier:3, desc:'발소리와 몸의 윤곽을 이용해 동료가 물러날 경로를 확보한다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 철수그늘을 퇴각 지원 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['퇴각 지원', '발소리와 몸의 윤곽'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', shield:0.9,
    se:[{se:'SE_C018', chance:1, turns:3}], maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}},
    ai:{enemies:2}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0500'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 발소리와 몸의 윤곽을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 철수그늘이 필요한 위치에 닿지 않는다.', '{u}은(는) 철수그늘을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 철수그늘의 범위와 출력을 정확히 맞춘다.', '{u}의 철수그늘이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 철수그늘을 중단한다.', '{u}의 철수그늘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0500', name:'노출예감', en:'Quiet Walker Feedback', scope:'class', cls:'CLS_C050',
    grade:4, rarity:3, tier:4, desc:'발소리와 몸의 윤곽이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 접촉하거나 강한 빛을 받으면 드러난다.', lore:'야행성 개체 관측 계약에서 노출예감을 실패 징후 용도로 쓴다. 접촉하거나 강한 빛을 받으면 드러난다.',
    tags:['실패 징후', '발소리와 몸의 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', el:'EL_C08', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06},
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1,
    combo:['SK_C0491'], lines:{use:['{u}의 {s}이(가) 발동한다. 발소리와 몸의 윤곽이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 노출예감이 필요한 위치에 닿지 않는다.', '{u}은(는) 노출예감을 멈추고 연질단검의 위치를 다시 잡는다.'], crit:['{u}은(는) 노출예감의 범위와 출력을 정확히 맞춘다.', '{u}의 노출예감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 연질단검의 상태가 맞지 않아 노출예감을 중단한다.', '{u}의 노출예감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0501', name:'덫추발사', en:'Trap Worker Contact', scope:'class', cls:'CLS_C051',
    grade:2, rarity:1, tier:1, desc:'장력덫에 마력을 실어 가까운 적의 움직임을 견제한다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 덫추발사를 견제 공격 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['견제 공격', '미리 설치한 장력줄'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:1,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0502'], lines:{use:['{u}은(는) 장력덫의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 덫추발사가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 덫추발사를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 덫추발사의 경로에서 몸을 뺀다.', '{u}의 장력덫이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 덫추발사가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 덫추발사의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 덫추발사를 중단한다.', '{u}의 덫추발사가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0502', name:'방호덫줄', en:'Trap Worker Guard', scope:'class', cls:'CLS_C051',
    grade:1, rarity:1, tier:1, desc:'장력덫 주위의 마력으로 얇은 방호면을 만든다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 방호덫줄을 임시 방호 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['임시 방호', '미리 설치한 장력줄'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0503'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 장력덫 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 방호덫줄이 필요한 위치에 닿지 않는다.', '{u}은(는) 방호덫줄을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 방호덫줄의 범위와 출력을 정확히 맞춘다.', '{u}의 방호덫줄이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 방호덫줄을 중단한다.', '{u}의 방호덫줄이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0503', name:'발묶는덫', en:'Trap Worker Set', scope:'class', cls:'CLS_C051',
    grade:1, rarity:1, tier:1, desc:'바닥에 장력줄을 설치해 밟은 적의 발을 묶는다. 설치가 끝나기 전에는 작동하지 않는다.', lore:'통로 방어 및 생포 계약에서 발묶는덫을 위치 제어 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['위치 제어', '미리 설치한 장력줄'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:4, cast:1}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C006', turns:3, chance:0.8}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0504'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 바닥에 장력줄을 설치해 밟은 적의 발을 묶는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발묶는덫이 필요한 위치에 닿지 않는다.', '{u}은(는) 발묶는덫을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 발묶는덫의 범위와 출력을 정확히 맞춘다.', '{u}의 발묶는덫이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 발묶는덫을 중단한다.', '{u}의 발묶는덫이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0504', name:'줄넘어물림', en:'Trap Worker Step', scope:'class', cls:'CLS_C051',
    grade:2, rarity:1, tier:1, desc:'미리 설치한 장력줄을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 줄넘어물림을 안전 이동 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['안전 이동', '미리 설치한 장력줄'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0505'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 미리 설치한 장력줄을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 줄넘어물림이 필요한 위치에 닿지 않는다.', '{u}은(는) 줄넘어물림을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 줄넘어물림의 범위와 출력을 정확히 맞춘다.', '{u}의 줄넘어물림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 줄넘어물림을 중단한다.', '{u}의 줄넘어물림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0505', name:'덫장력눈', en:'Trap Worker Reading', scope:'class', cls:'CLS_C051',
    grade:1, rarity:1, tier:1, desc:'미리 설치한 장력줄의 작은 차이를 읽어 주변 이상을 구별한다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 덫장력눈을 이상 감지 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['이상 감지', '미리 설치한 장력줄'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0506'], lines:{use:['{u}의 {s}이(가) 발동한다. 미리 설치한 장력줄의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 덫장력눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 덫장력눈을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 덫장력눈의 범위와 출력을 정확히 맞춘다.', '{u}의 덫장력눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 덫장력눈을 중단한다.', '{u}의 덫장력눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0506', name:'설치순서', en:'Trap Worker Discipline', scope:'class', cls:'CLS_C051',
    grade:1, rarity:1, tier:1, desc:'미리 설치한 장력줄을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 설치순서를 작업 경계 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['작업 경계', '미리 설치한 장력줄'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0507'], lines:{use:['{u}의 {s}이(가) 발동한다. 미리 설치한 장력줄을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 설치순서가 필요한 위치에 닿지 않는다.', '{u}은(는) 설치순서를 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 설치순서의 범위와 출력을 정확히 맞춘다.', '{u}의 설치순서가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 설치순서를 중단한다.', '{u}의 설치순서가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0507', name:'방아쇠감', en:'Trap Worker Foundation', scope:'class', cls:'CLS_C051',
    grade:2, rarity:1, tier:1, desc:'미리 설치한 장력줄을 유지하는 데 필요한 힘을 일정하게 나눈다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 방아쇠감을 기술 적응 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['기술 적응', '미리 설치한 장력줄'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0508'], lines:{use:['{u}의 {s}이(가) 발동한다. 미리 설치한 장력줄을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 방아쇠감이 필요한 위치에 닿지 않는다.', '{u}은(는) 방아쇠감을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 방아쇠감의 범위와 출력을 정확히 맞춘다.', '{u}의 방아쇠감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 방아쇠감을 중단한다.', '{u}의 방아쇠감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0508', name:'겹줄덫', en:'Trap Worker Sequence', scope:'class', cls:'CLS_C051',
    grade:2, rarity:3, tier:2, desc:'장력덫의 마력을 나눠 가까운 적 둘을 견제한다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 겹줄덫을 분산 견제 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['분산 견제', '미리 설치한 장력줄'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:1,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0509'], lines:{use:['{u}은(는) 장력덫의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹줄덫의 경로에서 몸을 뺀다.', '{u}의 장력덫이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹줄덫이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹줄덫의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 겹줄덫을 중단한다.', '{u}의 겹줄덫이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0509', name:'퇴로덫침', en:'Trap Worker Coverage', scope:'class', cls:'CLS_C051',
    grade:3, rarity:3, tier:3, desc:'미리 설치한 장력줄을 이용해 동료가 물러날 경로를 확보한다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 퇴로덫침을 퇴각 지원 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['퇴각 지원', '미리 설치한 장력줄'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0510'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 미리 설치한 장력줄을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 퇴로덫침이 필요한 위치에 닿지 않는다.', '{u}은(는) 퇴로덫침을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴로덫침의 범위와 출력을 정확히 맞춘다.', '{u}의 퇴로덫침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 퇴로덫침을 중단한다.', '{u}의 퇴로덫침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0510', name:'풀린덫감각', en:'Trap Worker Feedback', scope:'class', cls:'CLS_C051',
    grade:4, rarity:3, tier:4, desc:'미리 설치한 장력줄이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 설치할 바닥과 시간이 필요하다.', lore:'통로 방어 및 생포 계약에서 풀린덫감각을 실패 징후 용도로 쓴다. 설치할 바닥과 시간이 필요하다.',
    tags:['실패 징후', '미리 설치한 장력줄'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0501'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 미리 설치한 장력줄이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 풀린덫감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 풀린덫감각을 멈추고 장력덫의 위치를 다시 잡는다.'], crit:['{u}은(는) 풀린덫감각의 범위와 출력을 정확히 맞춘다.', '{u}의 풀린덫감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 장력덫의 상태가 맞지 않아 풀린덫감각을 중단한다.', '{u}의 풀린덫감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0511', name:'좌표압점', en:'Anchor Mapper Contact', scope:'class', cls:'CLS_C052',
    grade:2, rarity:1, tier:1, desc:'좌표말뚝에 마력을 실어 가까운 적의 움직임을 견제한다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 좌표압점을 견제 공격 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['견제 공격', '표식 사이의 상대 위치'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:-1,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0512'], lines:{use:['{u}은(는) 좌표말뚝의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 좌표압점이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 좌표압점을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 좌표압점의 경로에서 몸을 뺀다.', '{u}의 좌표말뚝이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 좌표압점이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 좌표압점의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 좌표압점을 중단한다.', '{u}의 좌표압점이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0512', name:'기준점막', en:'Anchor Mapper Guard', scope:'class', cls:'CLS_C052',
    grade:1, rarity:1, tier:1, desc:'좌표말뚝 주위의 마력으로 얇은 방호면을 만든다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 기준점막을 임시 방호 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['임시 방호', '표식 사이의 상대 위치'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0513'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좌표말뚝 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 기준점막이 필요한 위치에 닿지 않는다.', '{u}은(는) 기준점막을 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 기준점막의 범위와 출력을 정확히 맞춘다.', '{u}의 기준점막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 기준점막을 중단한다.', '{u}의 기준점막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0513', name:'귀환점표시', en:'Anchor Mapper Set', scope:'class', cls:'CLS_C052',
    grade:1, rarity:1, tier:1, desc:'확인한 가까운 바닥에 귀환 기준점을 남긴다. 기준점이 지워지면 이동에 쓸 수 없다.', lore:'공간 왜곡 구역 안내에서 귀환점표시를 위치 제어 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['위치 제어', '표식 사이의 상대 위치'], kind:'액티브', target:'area', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C024', turns:4, chance:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0514'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 확인한 가까운 바닥에 귀환 기준점을 남긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 귀환점표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 귀환점표시를 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 귀환점표시의 범위와 출력을 정확히 맞춘다.', '{u}의 귀환점표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 귀환점표시를 중단한다.', '{u}의 귀환점표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0514', name:'표식건너기', en:'Anchor Mapper Step', scope:'class', cls:'CLS_C052',
    grade:2, rarity:1, tier:1, desc:'미리 확인해 둔 가까운 좌표 표식으로 몸을 옮긴다. 표식이 지워졌거나 가로막히면 실패한다.', lore:'공간 왜곡 구역 안내에서 표식건너기를 안전 이동 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['안전 이동', '표식 사이의 상대 위치'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'teleport', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0515'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 미리 확인해 둔 가까운 좌표 표식으로 몸을 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 표식건너기가 필요한 위치에 닿지 않는다.', '{u}은(는) 표식건너기를 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 표식건너기의 범위와 출력을 정확히 맞춘다.', '{u}의 표식건너기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 표식건너기를 중단한다.', '{u}의 표식건너기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0515', name:'좌표어긋남', en:'Anchor Mapper Reading', scope:'class', cls:'CLS_C052',
    grade:1, rarity:1, tier:1, desc:'표식 사이의 상대 위치의 작은 차이를 읽어 주변 이상을 구별한다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 좌표어긋남을 이상 감지 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['이상 감지', '표식 사이의 상대 위치'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0516'], lines:{use:['{u}의 {s}이(가) 발동한다. 표식 사이의 상대 위치의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 좌표어긋남이 필요한 위치에 닿지 않는다.', '{u}은(는) 좌표어긋남을 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 좌표어긋남의 범위와 출력을 정확히 맞춘다.', '{u}의 좌표어긋남이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 좌표어긋남을 중단한다.', '{u}의 좌표어긋남이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0516', name:'기준점기억', en:'Anchor Mapper Discipline', scope:'class', cls:'CLS_C052',
    grade:1, rarity:1, tier:1, desc:'표식 사이의 상대 위치를 다룰 때 실패로 이어질 징후를 먼저 살핀다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 기준점기억을 작업 경계 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['작업 경계', '표식 사이의 상대 위치'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0517'], lines:{use:['{u}의 {s}이(가) 발동한다. 표식 사이의 상대 위치를 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 기준점기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 기준점기억을 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 기준점기억의 범위와 출력을 정확히 맞춘다.', '{u}의 기준점기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 기준점기억을 중단한다.', '{u}의 기준점기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0517', name:'거리분리감', en:'Anchor Mapper Foundation', scope:'class', cls:'CLS_C052',
    grade:2, rarity:1, tier:1, desc:'표식 사이의 상대 위치를 유지하는 데 필요한 힘을 일정하게 나눈다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 거리분리감을 기술 적응 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['기술 적응', '표식 사이의 상대 위치'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0518'], lines:{use:['{u}의 {s}이(가) 발동한다. 표식 사이의 상대 위치를 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 거리분리감이 필요한 위치에 닿지 않는다.', '{u}은(는) 거리분리감을 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 거리분리감의 범위와 출력을 정확히 맞춘다.', '{u}의 거리분리감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 거리분리감을 중단한다.', '{u}의 거리분리감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0518', name:'좌표겹침', en:'Anchor Mapper Sequence', scope:'class', cls:'CLS_C052',
    grade:2, rarity:3, tier:2, desc:'좌표말뚝의 마력을 나눠 가까운 적 둘을 견제한다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 좌표겹침을 분산 견제 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['분산 견제', '표식 사이의 상대 위치'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:-1,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0519'], lines:{use:['{u}은(는) 좌표말뚝의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 좌표겹침의 경로에서 몸을 뺀다.', '{u}의 좌표말뚝이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 좌표겹침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 좌표겹침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 좌표겹침을 중단한다.', '{u}의 좌표겹침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0519', name:'귀환선확보', en:'Anchor Mapper Coverage', scope:'class', cls:'CLS_C052',
    grade:3, rarity:3, tier:3, desc:'표식 사이의 상대 위치를 이용해 동료가 물러날 경로를 확보한다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 귀환선확보를 퇴각 지원 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['퇴각 지원', '표식 사이의 상대 위치'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0520'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표식 사이의 상대 위치를 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 귀환선확보가 필요한 위치에 닿지 않는다.', '{u}은(는) 귀환선확보를 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 귀환선확보의 범위와 출력을 정확히 맞춘다.', '{u}의 귀환선확보가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 귀환선확보를 중단한다.', '{u}의 귀환선확보가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0520', name:'표식소실감', en:'Anchor Mapper Feedback', scope:'class', cls:'CLS_C052',
    grade:4, rarity:3, tier:4, desc:'표식 사이의 상대 위치이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 표식을 모르는 곳으로 이동하지 못한다.', lore:'공간 왜곡 구역 안내에서 표식소실감을 실패 징후 용도로 쓴다. 표식을 모르는 곳으로 이동하지 못한다.',
    tags:['실패 징후', '표식 사이의 상대 위치'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0511'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표식 사이의 상대 위치이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 표식소실감이 필요한 위치에 닿지 않는다.', '{u}은(는) 표식소실감을 멈추고 좌표말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 표식소실감의 범위와 출력을 정확히 맞춘다.', '{u}의 표식소실감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 좌표말뚝의 상태가 맞지 않아 표식소실감을 중단한다.', '{u}의 표식소실감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0521', name:'손끝굳힘', en:'Body Adaptor Contact', scope:'class', cls:'CLS_C053',
    grade:2, rarity:1, tier:1, desc:'손끝을 단단하게 바꿔 짧게 찌른다. 체중을 과하게 실으면 손가락 관절이 상한다.', lore:'협소 구역 진입 계약에서 손끝굳힘을 견제 공격 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['견제 공격', '손발의 짧은 형태 변화'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:0,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0522'], lines:{use:['{u}은(는) 관절보호대의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 손끝굳힘이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 손끝굳힘을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 손끝굳힘의 경로에서 몸을 뺀다.', '{u}의 관절보호대가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 손끝굳힘이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 손끝굳힘의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 손끝굳힘을 중단한다.', '{u}의 손끝굳힘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0522', name:'피부겹침', en:'Body Adaptor Guard', scope:'class', cls:'CLS_C053',
    grade:1, rarity:1, tier:1, desc:'관절보호대 주위의 마력으로 얇은 방호면을 만든다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 피부겹침을 임시 방호 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['임시 방호', '손발의 짧은 형태 변화'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0523'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 관절보호대 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 피부겹침이 필요한 위치에 닿지 않는다.', '{u}은(는) 피부겹침을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 피부겹침의 범위와 출력을 정확히 맞춘다.', '{u}의 피부겹침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 피부겹침을 중단한다.', '{u}의 피부겹침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0523', name:'틈새손길', en:'Body Adaptor Set', scope:'class', cls:'CLS_C053',
    grade:1, rarity:1, tier:1, desc:'손끝을 가늘게 모아 틈에 걸린 끈을 풀기 쉽게 만든다. 금속 잠금장치를 없애지는 못한다.', lore:'협소 구역 진입 계약에서 틈새손길을 위치 제어 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['위치 제어', '손발의 짧은 형태 변화'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C025', turns:2, chance:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0524'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 손끝을 가늘게 모아 틈에 걸린 끈을 풀기 쉽게 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 틈새손길이 필요한 위치에 닿지 않는다.', '{u}은(는) 틈새손길을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 틈새손길의 범위와 출력을 정확히 맞춘다.', '{u}의 틈새손길이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 틈새손길을 중단한다.', '{u}의 틈새손길이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{acc:1.12, turns:2}
  },
  {
    id:'SK_C0524', name:'관절접기', en:'Body Adaptor Step', scope:'class', cls:'CLS_C053',
    grade:2, rarity:1, tier:1, desc:'손발의 짧은 형태 변화를 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 관절접기를 안전 이동 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['안전 이동', '손발의 짧은 형태 변화'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0525'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 손발의 짧은 형태 변화를 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 관절접기가 필요한 위치에 닿지 않는다.', '{u}은(는) 관절접기를 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 관절접기의 범위와 출력을 정확히 맞춘다.', '{u}의 관절접기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 관절접기를 중단한다.', '{u}의 관절접기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0525', name:'몸틀가늠', en:'Body Adaptor Reading', scope:'class', cls:'CLS_C053',
    grade:1, rarity:1, tier:1, desc:'손발의 짧은 형태 변화의 작은 차이를 읽어 주변 이상을 구별한다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 몸틀가늠을 이상 감지 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['이상 감지', '손발의 짧은 형태 변화'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0526'], lines:{use:['{u}의 {s}이(가) 발동한다. 손발의 짧은 형태 변화의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 몸틀가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 몸틀가늠을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 몸틀가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 몸틀가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 몸틀가늠을 중단한다.', '{u}의 몸틀가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0526', name:'변형이완', en:'Body Adaptor Discipline', scope:'class', cls:'CLS_C053',
    grade:1, rarity:1, tier:1, desc:'손발의 짧은 형태 변화를 다룰 때 실패로 이어질 징후를 먼저 살핀다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 변형이완을 작업 경계 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['작업 경계', '손발의 짧은 형태 변화'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0527'], lines:{use:['{u}의 {s}이(가) 발동한다. 손발의 짧은 형태 변화를 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 변형이완이 필요한 위치에 닿지 않는다.', '{u}은(는) 변형이완을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 변형이완의 범위와 출력을 정확히 맞춘다.', '{u}의 변형이완이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 변형이완을 중단한다.', '{u}의 변형이완이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0527', name:'원형기억', en:'Body Adaptor Foundation', scope:'class', cls:'CLS_C053',
    grade:2, rarity:1, tier:1, desc:'손발의 짧은 형태 변화를 유지하는 데 필요한 힘을 일정하게 나눈다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 원형기억을 기술 적응 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['기술 적응', '손발의 짧은 형태 변화'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0528'], lines:{use:['{u}의 {s}이(가) 발동한다. 손발의 짧은 형태 변화를 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 원형기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 원형기억을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 원형기억의 범위와 출력을 정확히 맞춘다.', '{u}의 원형기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 원형기억을 중단한다.', '{u}의 원형기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0528', name:'겹손날', en:'Body Adaptor Sequence', scope:'class', cls:'CLS_C053',
    grade:2, rarity:3, tier:2, desc:'관절보호대의 마력을 나눠 가까운 적 둘을 견제한다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 겹손날을 분산 견제 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['분산 견제', '손발의 짧은 형태 변화'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:0,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0529'], lines:{use:['{u}은(는) 관절보호대의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹손날의 경로에서 몸을 뺀다.', '{u}의 관절보호대가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹손날이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹손날의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 겹손날을 중단한다.', '{u}의 겹손날이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0529', name:'탈출몸접기', en:'Body Adaptor Coverage', scope:'class', cls:'CLS_C053',
    grade:3, rarity:3, tier:3, desc:'손발의 짧은 형태 변화를 이용해 동료가 물러날 경로를 확보한다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 탈출몸접기를 퇴각 지원 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['퇴각 지원', '손발의 짧은 형태 변화'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0530'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 손발의 짧은 형태 변화를 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 탈출몸접기가 필요한 위치에 닿지 않는다.', '{u}은(는) 탈출몸접기를 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 탈출몸접기의 범위와 출력을 정확히 맞춘다.', '{u}의 탈출몸접기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 탈출몸접기를 중단한다.', '{u}의 탈출몸접기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0530', name:'변형피로감', en:'Body Adaptor Feedback', scope:'class', cls:'CLS_C053',
    grade:4, rarity:3, tier:4, desc:'손발의 짧은 형태 변화이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.', lore:'협소 구역 진입 계약에서 변형피로감을 실패 징후 용도로 쓴다. 체격을 크게 바꾸거나 조직을 재생하지 못한다.',
    tags:['실패 징후', '손발의 짧은 형태 변화'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0521'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 손발의 짧은 형태 변화이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 변형피로감이 필요한 위치에 닿지 않는다.', '{u}은(는) 변형피로감을 멈추고 관절보호대의 위치를 다시 잡는다.'], crit:['{u}은(는) 변형피로감의 범위와 출력을 정확히 맞춘다.', '{u}의 변형피로감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 관절보호대의 상태가 맞지 않아 변형피로감을 중단한다.', '{u}의 변형피로감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0531', name:'잔향충격', en:'Trace Listener Contact', scope:'class', cls:'CLS_C054',
    grade:2, rarity:1, tier:1, desc:'기록판에 마력을 실어 가까운 적의 움직임을 견제한다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 잔향충격을 견제 공격 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['견제 공격', '남은 마력의 시간차'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:1,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0532'], lines:{use:['{u}은(는) 기록판의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 잔향충격이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 잔향충격을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 잔향충격의 경로에서 몸을 뺀다.', '{u}의 기록판이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 잔향충격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 잔향충격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 잔향충격을 중단한다.', '{u}의 잔향충격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0532', name:'잔향가림', en:'Trace Listener Guard', scope:'class', cls:'CLS_C054',
    grade:1, rarity:1, tier:1, desc:'기록판 주위의 마력으로 얇은 방호면을 만든다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 잔향가림을 임시 방호 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['임시 방호', '남은 마력의 시간차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0533'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 기록판 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 잔향가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔향가림을 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔향가림의 범위와 출력을 정확히 맞춘다.', '{u}의 잔향가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 잔향가림을 중단한다.', '{u}의 잔향가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0533', name:'발자취표시', en:'Trace Listener Set', scope:'class', cls:'CLS_C054',
    grade:1, rarity:1, tier:1, desc:'읽어 낸 마력 흔적의 위치를 작은 표식으로 남긴다. 표식은 이미 사라진 사실을 복원하지 못한다.', lore:'실종 헌터 동선 조사에서 발자취표시를 위치 제어 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['위치 제어', '남은 마력의 시간차'], kind:'액티브', target:'area', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C024', turns:3, chance:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0534'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 읽어 낸 마력 흔적의 위치를 작은 표식으로 남긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 발자취표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 발자취표시를 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 발자취표시의 범위와 출력을 정확히 맞춘다.', '{u}의 발자취표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 발자취표시를 중단한다.', '{u}의 발자취표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0534', name:'지난길밟기', en:'Trace Listener Step', scope:'class', cls:'CLS_C054',
    grade:2, rarity:1, tier:1, desc:'남은 마력의 시간차를 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 지난길밟기를 안전 이동 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['안전 이동', '남은 마력의 시간차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0535'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 남은 마력의 시간차를 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 지난길밟기가 필요한 위치에 닿지 않는다.', '{u}은(는) 지난길밟기를 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 지난길밟기의 범위와 출력을 정확히 맞춘다.', '{u}의 지난길밟기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 지난길밟기를 중단한다.', '{u}의 지난길밟기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0535', name:'시차읽음', en:'Trace Listener Reading', scope:'class', cls:'CLS_C054',
    grade:1, rarity:1, tier:1, desc:'남은 마력의 시간차의 작은 차이를 읽어 주변 이상을 구별한다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 시차읽음을 이상 감지 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['이상 감지', '남은 마력의 시간차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0536'], lines:{use:['{u}의 {s}이(가) 발동한다. 남은 마력의 시간차의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 시차읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 시차읽음을 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 시차읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 시차읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 시차읽음을 중단한다.', '{u}의 시차읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0536', name:'잔향분리', en:'Trace Listener Discipline', scope:'class', cls:'CLS_C054',
    grade:1, rarity:1, tier:1, desc:'남은 마력의 시간차를 다룰 때 실패로 이어질 징후를 먼저 살핀다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 잔향분리를 작업 경계 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['작업 경계', '남은 마력의 시간차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0537'], lines:{use:['{u}의 {s}이(가) 발동한다. 남은 마력의 시간차를 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔향분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 잔향분리를 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔향분리의 범위와 출력을 정확히 맞춘다.', '{u}의 잔향분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 잔향분리를 중단한다.', '{u}의 잔향분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0537', name:'흔적보존', en:'Trace Listener Foundation', scope:'class', cls:'CLS_C054',
    grade:2, rarity:1, tier:1, desc:'남은 마력의 시간차를 유지하는 데 필요한 힘을 일정하게 나눈다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 흔적보존을 기술 적응 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['기술 적응', '남은 마력의 시간차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0538'], lines:{use:['{u}의 {s}이(가) 발동한다. 남은 마력의 시간차를 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 흔적보존이 필요한 위치에 닿지 않는다.', '{u}은(는) 흔적보존을 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 흔적보존의 범위와 출력을 정확히 맞춘다.', '{u}의 흔적보존이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 흔적보존을 중단한다.', '{u}의 흔적보존이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0538', name:'겹잔향파', en:'Trace Listener Sequence', scope:'class', cls:'CLS_C054',
    grade:2, rarity:3, tier:2, desc:'기록판의 마력을 나눠 가까운 적 둘을 견제한다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 겹잔향파를 분산 견제 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['분산 견제', '남은 마력의 시간차'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:1,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0539'], lines:{use:['{u}은(는) 기록판의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹잔향파의 경로에서 몸을 뺀다.', '{u}의 기록판이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹잔향파가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹잔향파의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 겹잔향파를 중단한다.', '{u}의 겹잔향파가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0539', name:'퇴로잔향', en:'Trace Listener Coverage', scope:'class', cls:'CLS_C054',
    grade:3, rarity:3, tier:3, desc:'남은 마력의 시간차를 이용해 동료가 물러날 경로를 확보한다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 퇴로잔향을 퇴각 지원 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['퇴각 지원', '남은 마력의 시간차'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0540'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 남은 마력의 시간차를 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 퇴로잔향이 필요한 위치에 닿지 않는다.', '{u}은(는) 퇴로잔향을 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴로잔향의 범위와 출력을 정확히 맞춘다.', '{u}의 퇴로잔향이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 퇴로잔향을 중단한다.', '{u}의 퇴로잔향이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0540', name:'소실감지', en:'Trace Listener Feedback', scope:'class', cls:'CLS_C054',
    grade:4, rarity:3, tier:4, desc:'남은 마력의 시간차이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 잔향은 사건 전체를 보여 주지 않는다.', lore:'실종 헌터 동선 조사에서 소실감지를 실패 징후 용도로 쓴다. 잔향은 사건 전체를 보여 주지 않는다.',
    tags:['실패 징후', '남은 마력의 시간차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0531'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 남은 마력의 시간차이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 소실감지가 필요한 위치에 닿지 않는다.', '{u}은(는) 소실감지를 멈추고 기록판의 위치를 다시 잡는다.'], crit:['{u}은(는) 소실감지의 범위와 출력을 정확히 맞춘다.', '{u}의 소실감지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 기록판의 상태가 맞지 않아 소실감지를 중단한다.', '{u}의 소실감지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0541', name:'봉인점격', en:'Seal Restrainer Contact', scope:'class', cls:'CLS_C055',
    grade:2, rarity:1, tier:1, desc:'각인띠에 마력을 실어 가까운 적의 움직임을 견제한다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 봉인점격을 견제 공격 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['견제 공격', '좁은 표면의 마력 흐름'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:-1,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0542'], lines:{use:['{u}은(는) 각인띠의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 봉인점격이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 봉인점격을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 봉인점격의 경로에서 몸을 뺀다.', '{u}의 각인띠가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 봉인점격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 봉인점격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 봉인점격을 중단한다.', '{u}의 봉인점격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0542', name:'봉인겹막', en:'Seal Restrainer Guard', scope:'class', cls:'CLS_C055',
    grade:1, rarity:1, tier:1, desc:'각인띠 주위의 마력으로 얇은 방호면을 만든다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 봉인겹막을 임시 방호 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['임시 방호', '좁은 표면의 마력 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0543'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 각인띠 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 봉인겹막이 필요한 위치에 닿지 않는다.', '{u}은(는) 봉인겹막을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉인겹막의 범위와 출력을 정확히 맞춘다.', '{u}의 봉인겹막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 봉인겹막을 중단한다.', '{u}의 봉인겹막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0543', name:'출력묶음', en:'Seal Restrainer Set', scope:'class', cls:'CLS_C055',
    grade:1, rarity:1, tier:1, desc:'좁은 표면의 마력 흐름을 이용해 대상의 이동 경로를 좁힌다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 출력묶음을 위치 제어 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['위치 제어', '좁은 표면의 마력 흐름'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C010', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0544'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 표면의 마력 흐름을 이용해 대상의 이동 경로를 좁힌다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 출력묶음이 필요한 위치에 닿지 않는다.', '{u}은(는) 출력묶음을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 출력묶음의 범위와 출력을 정확히 맞춘다.', '{u}의 출력묶음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 출력묶음을 중단한다.', '{u}의 출력묶음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0544', name:'각인우회', en:'Seal Restrainer Step', scope:'class', cls:'CLS_C055',
    grade:2, rarity:1, tier:1, desc:'좁은 표면의 마력 흐름을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 각인우회를 안전 이동 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['안전 이동', '좁은 표면의 마력 흐름'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0545'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 표면의 마력 흐름을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 각인우회가 필요한 위치에 닿지 않는다.', '{u}은(는) 각인우회를 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 각인우회의 범위와 출력을 정확히 맞춘다.', '{u}의 각인우회가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 각인우회를 중단한다.', '{u}의 각인우회가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0545', name:'봉인틈눈', en:'Seal Restrainer Reading', scope:'class', cls:'CLS_C055',
    grade:1, rarity:1, tier:1, desc:'좁은 표면의 마력 흐름의 작은 차이를 읽어 주변 이상을 구별한다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 봉인틈눈을 이상 감지 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['이상 감지', '좁은 표면의 마력 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0546'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 표면의 마력 흐름의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 봉인틈눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 봉인틈눈을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉인틈눈의 범위와 출력을 정확히 맞춘다.', '{u}의 봉인틈눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 봉인틈눈을 중단한다.', '{u}의 봉인틈눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0546', name:'각인간격', en:'Seal Restrainer Discipline', scope:'class', cls:'CLS_C055',
    grade:1, rarity:1, tier:1, desc:'좁은 표면의 마력 흐름을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 각인간격을 작업 경계 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['작업 경계', '좁은 표면의 마력 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0547'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 표면의 마력 흐름을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 각인간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 각인간격을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 각인간격의 범위와 출력을 정확히 맞춘다.', '{u}의 각인간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 각인간격을 중단한다.', '{u}의 각인간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0547', name:'봉인면감', en:'Seal Restrainer Foundation', scope:'class', cls:'CLS_C055',
    grade:2, rarity:1, tier:1, desc:'좁은 표면의 마력 흐름을 유지하는 데 필요한 힘을 일정하게 나눈다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 봉인면감을 기술 적응 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['기술 적응', '좁은 표면의 마력 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0548'], lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 표면의 마력 흐름을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 봉인면감이 필요한 위치에 닿지 않는다.', '{u}은(는) 봉인면감을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 봉인면감의 범위와 출력을 정확히 맞춘다.', '{u}의 봉인면감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 봉인면감을 중단한다.', '{u}의 봉인면감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0548', name:'겹매듭봉인', en:'Seal Restrainer Sequence', scope:'class', cls:'CLS_C055',
    grade:2, rarity:3, tier:2, desc:'각인띠의 마력을 나눠 가까운 적 둘을 견제한다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 겹매듭봉인을 분산 견제 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['분산 견제', '좁은 표면의 마력 흐름'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:-1,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0549'], lines:{use:['{u}은(는) 각인띠의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹매듭봉인의 경로에서 몸을 뺀다.', '{u}의 각인띠가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹매듭봉인이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹매듭봉인의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 겹매듭봉인을 중단한다.', '{u}의 겹매듭봉인이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0549', name:'위험물차단', en:'Seal Restrainer Coverage', scope:'class', cls:'CLS_C055',
    grade:3, rarity:3, tier:3, desc:'좁은 표면의 마력 흐름을 이용해 동료가 물러날 경로를 확보한다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 위험물차단을 퇴각 지원 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['퇴각 지원', '좁은 표면의 마력 흐름'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0550'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 좁은 표면의 마력 흐름을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 위험물차단이 필요한 위치에 닿지 않는다.', '{u}은(는) 위험물차단을 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 위험물차단의 범위와 출력을 정확히 맞춘다.', '{u}의 위험물차단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 위험물차단을 중단한다.', '{u}의 위험물차단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0550', name:'풀림경계', en:'Seal Restrainer Feedback', scope:'class', cls:'CLS_C055',
    grade:4, rarity:3, tier:4, desc:'좁은 표면의 마력 흐름이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 생명이나 능력을 영구히 지우지 못한다.', lore:'불안정 마력 물체 격리에서 풀림경계를 실패 징후 용도로 쓴다. 생명이나 능력을 영구히 지우지 못한다.',
    tags:['실패 징후', '좁은 표면의 마력 흐름'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0541'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 좁은 표면의 마력 흐름이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 풀림경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 풀림경계를 멈추고 각인띠의 위치를 다시 잡는다.'], crit:['{u}은(는) 풀림경계의 범위와 출력을 정확히 맞춘다.', '{u}의 풀림경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인띠의 상태가 맞지 않아 풀림경계를 중단한다.', '{u}의 풀림경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0551', name:'갈고리박음', en:'Tether Worker Contact', scope:'class', cls:'CLS_C056',
    grade:2, rarity:1, tier:1, desc:'견인갈고리에 마력을 실어 가까운 적의 움직임을 견제한다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 갈고리박음을 견제 공격 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['견제 공격', '마력줄이 당기는 하중'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:0,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0552'], lines:{use:['{u}은(는) 견인갈고리의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 갈고리박음이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 갈고리박음을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 갈고리박음의 경로에서 몸을 뺀다.', '{u}의 견인갈고리가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈고리박음이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈고리박음의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 갈고리박음을 중단한다.', '{u}의 갈고리박음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0552', name:'견인줄막', en:'Tether Worker Guard', scope:'class', cls:'CLS_C056',
    grade:1, rarity:1, tier:1, desc:'견인갈고리 주위의 마력으로 얇은 방호면을 만든다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 견인줄막을 임시 방호 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['임시 방호', '마력줄이 당기는 하중'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0553'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 견인갈고리 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 견인줄막이 필요한 위치에 닿지 않는다.', '{u}은(는) 견인줄막을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 견인줄막의 범위와 출력을 정확히 맞춘다.', '{u}의 견인줄막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 견인줄막을 중단한다.', '{u}의 견인줄막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0553', name:'대상당김', en:'Tether Worker Set', scope:'class', cls:'CLS_C056',
    grade:1, rarity:1, tier:1, desc:'고정점에 연결한 마력줄로 대상을 짧게 당긴다. 고정점이 약하면 사용자도 끌려간다.', lore:'매몰 구역 구조 보조에서 대상당김을 위치 제어 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['위치 제어', '마력줄이 당기는 하중'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C007', chance:0.8, turns:1}], move:'pull',
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0554'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 고정점에 연결한 마력줄로 대상을 짧게 당긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대상당김이 필요한 위치에 닿지 않는다.', '{u}은(는) 대상당김을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 대상당김의 범위와 출력을 정확히 맞춘다.', '{u}의 대상당김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 대상당김을 중단한다.', '{u}의 대상당김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0554', name:'고정점도약', en:'Tether Worker Step', scope:'class', cls:'CLS_C056',
    grade:2, rarity:1, tier:1, desc:'마력줄이 당기는 하중을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 고정점도약을 안전 이동 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['안전 이동', '마력줄이 당기는 하중'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0555'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력줄이 당기는 하중을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 고정점도약이 필요한 위치에 닿지 않는다.', '{u}은(는) 고정점도약을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 고정점도약의 범위와 출력을 정확히 맞춘다.', '{u}의 고정점도약이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 고정점도약을 중단한다.', '{u}의 고정점도약이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0555', name:'하중가늠', en:'Tether Worker Reading', scope:'class', cls:'CLS_C056',
    grade:1, rarity:1, tier:1, desc:'마력줄이 당기는 하중의 작은 차이를 읽어 주변 이상을 구별한다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 하중가늠을 이상 감지 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['이상 감지', '마력줄이 당기는 하중'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0556'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력줄이 당기는 하중의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 하중가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 하중가늠을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 하중가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 하중가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 하중가늠을 중단한다.', '{u}의 하중가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0556', name:'줄꼬임눈', en:'Tether Worker Discipline', scope:'class', cls:'CLS_C056',
    grade:1, rarity:1, tier:1, desc:'마력줄이 당기는 하중을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 줄꼬임눈을 작업 경계 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['작업 경계', '마력줄이 당기는 하중'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0557'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력줄이 당기는 하중을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 줄꼬임눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 줄꼬임눈을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 줄꼬임눈의 범위와 출력을 정확히 맞춘다.', '{u}의 줄꼬임눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 줄꼬임눈을 중단한다.', '{u}의 줄꼬임눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0557', name:'고정점감', en:'Tether Worker Foundation', scope:'class', cls:'CLS_C056',
    grade:2, rarity:1, tier:1, desc:'마력줄이 당기는 하중을 유지하는 데 필요한 힘을 일정하게 나눈다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 고정점감을 기술 적응 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['기술 적응', '마력줄이 당기는 하중'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0558'], lines:{use:['{u}의 {s}이(가) 발동한다. 마력줄이 당기는 하중을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 고정점감이 필요한 위치에 닿지 않는다.', '{u}은(는) 고정점감을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 고정점감의 범위와 출력을 정확히 맞춘다.', '{u}의 고정점감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 고정점감을 중단한다.', '{u}의 고정점감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0558', name:'겹갈고리', en:'Tether Worker Sequence', scope:'class', cls:'CLS_C056',
    grade:2, rarity:3, tier:2, desc:'견인갈고리의 마력을 나눠 가까운 적 둘을 견제한다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 겹갈고리를 분산 견제 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['분산 견제', '마력줄이 당기는 하중'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:0,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0559'], lines:{use:['{u}은(는) 견인갈고리의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹갈고리의 경로에서 몸을 뺀다.', '{u}의 견인갈고리가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹갈고리가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹갈고리의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 겹갈고리를 중단한다.', '{u}의 겹갈고리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0559', name:'긴급인양', en:'Tether Worker Coverage', scope:'class', cls:'CLS_C056',
    grade:3, rarity:3, tier:3, desc:'마력줄이 당기는 하중을 이용해 동료가 물러날 경로를 확보한다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 긴급인양을 퇴각 지원 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['퇴각 지원', '마력줄이 당기는 하중'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0560'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마력줄이 당기는 하중을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 긴급인양이 필요한 위치에 닿지 않는다.', '{u}은(는) 긴급인양을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 긴급인양의 범위와 출력을 정확히 맞춘다.', '{u}의 긴급인양이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 긴급인양을 중단한다.', '{u}의 긴급인양이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0560', name:'끊김반응', en:'Tether Worker Feedback', scope:'class', cls:'CLS_C056',
    grade:4, rarity:3, tier:4, desc:'마력줄이 당기는 하중이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 고정점이 약하면 함께 끌려간다.', lore:'매몰 구역 구조 보조에서 끊김반응을 실패 징후 용도로 쓴다. 고정점이 약하면 함께 끌려간다.',
    tags:['실패 징후', '마력줄이 당기는 하중'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0551'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 마력줄이 당기는 하중이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 끊김반응이 필요한 위치에 닿지 않는다.', '{u}은(는) 끊김반응을 멈추고 견인갈고리의 위치를 다시 잡는다.'], crit:['{u}은(는) 끊김반응의 범위와 출력을 정확히 맞춘다.', '{u}의 끊김반응이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 견인갈고리의 상태가 맞지 않아 끊김반응을 중단한다.', '{u}의 끊김반응이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0561', name:'반향침', en:'Echo Mapper Contact', scope:'class', cls:'CLS_C057',
    grade:2, rarity:1, tier:1, desc:'반향구에 마력을 실어 가까운 적의 움직임을 견제한다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 반향침을 견제 공격 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['견제 공격', '벽에서 돌아오는 반향'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:1,
    crit:1, cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0562'], lines:{use:['{u}은(는) 반향구의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 반향침이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 반향침을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 반향침의 경로에서 몸을 뺀다.', '{u}의 반향구가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 반향침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 반향침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 반향침을 중단한다.', '{u}의 반향침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0562', name:'되울림막', en:'Echo Mapper Guard', scope:'class', cls:'CLS_C057',
    grade:1, rarity:1, tier:1, desc:'반향구 주위의 마력으로 얇은 방호면을 만든다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 되울림막을 임시 방호 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['임시 방호', '벽에서 돌아오는 반향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0563'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 반향구 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 되울림막이 필요한 위치에 닿지 않는다.', '{u}은(는) 되울림막을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 되울림막의 범위와 출력을 정확히 맞춘다.', '{u}의 되울림막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 되울림막을 중단한다.', '{u}의 되울림막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0563', name:'벽면표시', en:'Echo Mapper Set', scope:'class', cls:'CLS_C057',
    grade:1, rarity:1, tier:1, desc:'확인한 벽면에 반향 기준점을 남긴다. 흡음 재료 뒤의 공간은 보장하지 못한다.', lore:'암흑 동굴 선행 탐사에서 벽면표시를 위치 제어 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['위치 제어', '벽에서 돌아오는 반향'], kind:'액티브', target:'area', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C024', turns:3, chance:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0564'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 확인한 벽면에 반향 기준점을 남긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 벽면표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 벽면표시를 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 벽면표시의 범위와 출력을 정확히 맞춘다.', '{u}의 벽면표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 벽면표시를 중단한다.', '{u}의 벽면표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0564', name:'반향따라감', en:'Echo Mapper Step', scope:'class', cls:'CLS_C057',
    grade:2, rarity:1, tier:1, desc:'벽에서 돌아오는 반향을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 반향따라감을 안전 이동 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['안전 이동', '벽에서 돌아오는 반향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0565'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 벽에서 돌아오는 반향을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 반향따라감이 필요한 위치에 닿지 않는다.', '{u}은(는) 반향따라감을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 반향따라감의 범위와 출력을 정확히 맞춘다.', '{u}의 반향따라감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 반향따라감을 중단한다.', '{u}의 반향따라감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0565', name:'빈공간눈', en:'Echo Mapper Reading', scope:'class', cls:'CLS_C057',
    grade:1, rarity:1, tier:1, desc:'벽에서 돌아오는 반향의 작은 차이를 읽어 주변 이상을 구별한다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 빈공간눈을 이상 감지 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['이상 감지', '벽에서 돌아오는 반향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0566'], lines:{use:['{u}의 {s}이(가) 발동한다. 벽에서 돌아오는 반향의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 빈공간눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 빈공간눈을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 빈공간눈의 범위와 출력을 정확히 맞춘다.', '{u}의 빈공간눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 빈공간눈을 중단한다.', '{u}의 빈공간눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0566', name:'메아리분리', en:'Echo Mapper Discipline', scope:'class', cls:'CLS_C057',
    grade:1, rarity:1, tier:1, desc:'벽에서 돌아오는 반향을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 메아리분리를 작업 경계 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['작업 경계', '벽에서 돌아오는 반향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0567'], lines:{use:['{u}의 {s}이(가) 발동한다. 벽에서 돌아오는 반향을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 메아리분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 메아리분리를 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 메아리분리의 범위와 출력을 정확히 맞춘다.', '{u}의 메아리분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 메아리분리를 중단한다.', '{u}의 메아리분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0567', name:'벽거리감', en:'Echo Mapper Foundation', scope:'class', cls:'CLS_C057',
    grade:2, rarity:1, tier:1, desc:'벽에서 돌아오는 반향을 유지하는 데 필요한 힘을 일정하게 나눈다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 벽거리감을 기술 적응 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['기술 적응', '벽에서 돌아오는 반향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0568'], lines:{use:['{u}의 {s}이(가) 발동한다. 벽에서 돌아오는 반향을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 벽거리감이 필요한 위치에 닿지 않는다.', '{u}은(는) 벽거리감을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 벽거리감의 범위와 출력을 정확히 맞춘다.', '{u}의 벽거리감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 벽거리감을 중단한다.', '{u}의 벽거리감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0568', name:'겹반향격', en:'Echo Mapper Sequence', scope:'class', cls:'CLS_C057',
    grade:2, rarity:3, tier:2, desc:'반향구의 마력을 나눠 가까운 적 둘을 견제한다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 겹반향격을 분산 견제 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['분산 견제', '벽에서 돌아오는 반향'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:1,
    crit:-1, cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0569'], lines:{use:['{u}은(는) 반향구의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹반향격의 경로에서 몸을 뺀다.', '{u}의 반향구가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹반향격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹반향격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 겹반향격을 중단한다.', '{u}의 겹반향격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0569', name:'퇴각반향선', en:'Echo Mapper Coverage', scope:'class', cls:'CLS_C057',
    grade:3, rarity:3, tier:3, desc:'벽에서 돌아오는 반향을 이용해 동료가 물러날 경로를 확보한다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 퇴각반향선을 퇴각 지원 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['퇴각 지원', '벽에서 돌아오는 반향'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0570'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 벽에서 돌아오는 반향을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 퇴각반향선이 필요한 위치에 닿지 않는다.', '{u}은(는) 퇴각반향선을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴각반향선의 범위와 출력을 정확히 맞춘다.', '{u}의 퇴각반향선이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 퇴각반향선을 중단한다.', '{u}의 퇴각반향선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0570', name:'울림누락감', en:'Echo Mapper Feedback', scope:'class', cls:'CLS_C057',
    grade:4, rarity:3, tier:4, desc:'벽에서 돌아오는 반향이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.', lore:'암흑 동굴 선행 탐사에서 울림누락감을 실패 징후 용도로 쓴다. 흡음 물질은 빈 공간처럼 읽힐 수 있다.',
    tags:['실패 징후', '벽에서 돌아오는 반향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0561'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 벽에서 돌아오는 반향이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 울림누락감이 필요한 위치에 닿지 않는다.', '{u}은(는) 울림누락감을 멈추고 반향구의 위치를 다시 잡는다.'], crit:['{u}은(는) 울림누락감의 범위와 출력을 정확히 맞춘다.', '{u}의 울림누락감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 반향구의 상태가 맞지 않아 울림누락감을 중단한다.', '{u}의 울림누락감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0571', name:'눈속임침', en:'Decoy Projector Contact', scope:'class', cls:'CLS_C058',
    grade:2, rarity:1, tier:1, desc:'투영패에 마력을 실어 가까운 적의 움직임을 견제한다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 눈속임침을 견제 공격 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['견제 공격', '멀리서 보이는 윤곽'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:-1,
    crit:1, cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0572'], lines:{use:['{u}은(는) 투영패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 눈속임침이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 눈속임침을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 눈속임침의 경로에서 몸을 뺀다.', '{u}의 투영패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 눈속임침이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 눈속임침의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 눈속임침을 중단한다.', '{u}의 눈속임침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0572', name:'겹윤곽막', en:'Decoy Projector Guard', scope:'class', cls:'CLS_C058',
    grade:1, rarity:1, tier:1, desc:'투영패 주위의 마력으로 얇은 방호면을 만든다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 겹윤곽막을 임시 방호 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['임시 방호', '멀리서 보이는 윤곽'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0573'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 투영패 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹윤곽막이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹윤곽막을 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹윤곽막의 범위와 출력을 정확히 맞춘다.', '{u}의 겹윤곽막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 겹윤곽막을 중단한다.', '{u}의 겹윤곽막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0573', name:'빈자리미끼', en:'Decoy Projector Set', scope:'class', cls:'CLS_C058',
    grade:1, rarity:1, tier:1, desc:'빈자리에 동료의 윤곽을 투영해 적의 시선을 분산한다. 접촉하면 허상임을 알아챈다.', lore:'파티 이탈 및 유인 보조에서 빈자리미끼를 위치 제어 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['위치 제어', '멀리서 보이는 윤곽'], kind:'액티브', target:'area', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C008', chance:0.7, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0574'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 빈자리에 동료의 윤곽을 투영해 적의 시선을 분산한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 빈자리미끼가 필요한 위치에 닿지 않는다.', '{u}은(는) 빈자리미끼를 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 빈자리미끼의 범위와 출력을 정확히 맞춘다.', '{u}의 빈자리미끼가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 빈자리미끼를 중단한다.', '{u}의 빈자리미끼가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0574', name:'윤곽바꾸기', en:'Decoy Projector Step', scope:'class', cls:'CLS_C058',
    grade:2, rarity:1, tier:1, desc:'멀리서 보이는 윤곽을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 윤곽바꾸기를 안전 이동 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['안전 이동', '멀리서 보이는 윤곽'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0575'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 멀리서 보이는 윤곽을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 윤곽바꾸기가 필요한 위치에 닿지 않는다.', '{u}은(는) 윤곽바꾸기를 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 윤곽바꾸기의 범위와 출력을 정확히 맞춘다.', '{u}의 윤곽바꾸기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 윤곽바꾸기를 중단한다.', '{u}의 윤곽바꾸기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0575', name:'주시가늠', en:'Decoy Projector Reading', scope:'class', cls:'CLS_C058',
    grade:1, rarity:1, tier:1, desc:'멀리서 보이는 윤곽의 작은 차이를 읽어 주변 이상을 구별한다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 주시가늠을 이상 감지 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['이상 감지', '멀리서 보이는 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0576'], lines:{use:['{u}의 {s}이(가) 발동한다. 멀리서 보이는 윤곽의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 주시가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 주시가늠을 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 주시가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 주시가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 주시가늠을 중단한다.', '{u}의 주시가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0576', name:'투영경계', en:'Decoy Projector Discipline', scope:'class', cls:'CLS_C058',
    grade:1, rarity:1, tier:1, desc:'멀리서 보이는 윤곽을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 투영경계를 작업 경계 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['작업 경계', '멀리서 보이는 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0577'], lines:{use:['{u}의 {s}이(가) 발동한다. 멀리서 보이는 윤곽을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 투영경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 투영경계를 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 투영경계의 범위와 출력을 정확히 맞춘다.', '{u}의 투영경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 투영경계를 중단한다.', '{u}의 투영경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0577', name:'윤곽분배', en:'Decoy Projector Foundation', scope:'class', cls:'CLS_C058',
    grade:2, rarity:1, tier:1, desc:'멀리서 보이는 윤곽을 유지하는 데 필요한 힘을 일정하게 나눈다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 윤곽분배를 기술 적응 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['기술 적응', '멀리서 보이는 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0578'], lines:{use:['{u}의 {s}이(가) 발동한다. 멀리서 보이는 윤곽을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 윤곽분배가 필요한 위치에 닿지 않는다.', '{u}은(는) 윤곽분배를 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 윤곽분배의 범위와 출력을 정확히 맞춘다.', '{u}의 윤곽분배가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 윤곽분배를 중단한다.', '{u}의 윤곽분배가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0578', name:'갈래허상', en:'Decoy Projector Sequence', scope:'class', cls:'CLS_C058',
    grade:2, rarity:3, tier:2, desc:'투영패의 마력을 나눠 가까운 적 둘을 견제한다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 갈래허상을 분산 견제 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['분산 견제', '멀리서 보이는 윤곽'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:-1,
    crit:-1, cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0579'], lines:{use:['{u}은(는) 투영패의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래허상의 경로에서 몸을 뺀다.', '{u}의 투영패가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래허상이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래허상의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 갈래허상을 중단한다.', '{u}의 갈래허상이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0579', name:'이탈가림상', en:'Decoy Projector Coverage', scope:'class', cls:'CLS_C058',
    grade:3, rarity:3, tier:3, desc:'멀리서 보이는 윤곽을 이용해 동료가 물러날 경로를 확보한다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 이탈가림상을 퇴각 지원 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['퇴각 지원', '멀리서 보이는 윤곽'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0580'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 멀리서 보이는 윤곽을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 이탈가림상이 필요한 위치에 닿지 않는다.', '{u}은(는) 이탈가림상을 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 이탈가림상의 범위와 출력을 정확히 맞춘다.', '{u}의 이탈가림상이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 이탈가림상을 중단한다.', '{u}의 이탈가림상이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0580', name:'허상파손감', en:'Decoy Projector Feedback', scope:'class', cls:'CLS_C058',
    grade:4, rarity:3, tier:4, desc:'멀리서 보이는 윤곽이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 손에 닿는 물체를 만들지 못한다.', lore:'파티 이탈 및 유인 보조에서 허상파손감을 실패 징후 용도로 쓴다. 손에 닿는 물체를 만들지 못한다.',
    tags:['실패 징후', '멀리서 보이는 윤곽'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0571'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 멀리서 보이는 윤곽이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 허상파손감이 필요한 위치에 닿지 않는다.', '{u}은(는) 허상파손감을 멈추고 투영패의 위치를 다시 잡는다.'], crit:['{u}은(는) 허상파손감의 범위와 출력을 정확히 맞춘다.', '{u}의 허상파손감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 투영패의 상태가 맞지 않아 허상파손감을 중단한다.', '{u}의 허상파손감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0581', name:'접지충격', en:'Grounding Worker Contact', scope:'class', cls:'CLS_C059',
    grade:2, rarity:2, tier:1, desc:'접지말뚝에 마력을 실어 가까운 적의 움직임을 견제한다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 접지충격을 견제 공격 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['견제 공격', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:0,
    crit:1, cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:10,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0582'], lines:{use:['{u}은(는) 접지말뚝의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 접지충격이 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 접지충격을 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 접지충격의 경로에서 몸을 뺀다.', '{u}의 접지말뚝이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 접지충격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 접지충격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 접지충격을 중단한다.', '{u}의 접지충격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0582', name:'접지받침', en:'Grounding Worker Guard', scope:'class', cls:'CLS_C059',
    grade:1, rarity:2, tier:1, desc:'접지말뚝 주위의 마력으로 얇은 방호면을 만든다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 접지받침을 임시 방호 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['임시 방호', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0583'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 접지말뚝 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접지받침이 필요한 위치에 닿지 않는다.', '{u}은(는) 접지받침을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 접지받침의 범위와 출력을 정확히 맞춘다.', '{u}의 접지받침이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 접지받침을 중단한다.', '{u}의 접지받침이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0583', name:'잔류배출', en:'Grounding Worker Set', scope:'class', cls:'CLS_C059',
    grade:1, rarity:2, tier:1, desc:'고정한 접지점으로 주변의 약한 잔류 마력을 뺀다. 절연 바닥에서는 별도 접점이 필요하다.', lore:'누출 마력 현장 안정화에서 잔류배출을 위치 제어 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['위치 제어', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C020', turns:2, chance:1}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0584'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 고정한 접지점으로 주변의 약한 잔류 마력을 뺀다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 잔류배출이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔류배출을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔류배출의 범위와 출력을 정확히 맞춘다.', '{u}의 잔류배출이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 잔류배출을 중단한다.', '{u}의 잔류배출이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', cleanse:['SE_C004', 'SE_C010']
  },
  {
    id:'SK_C0584', name:'접점건넘', en:'Grounding Worker Step', scope:'class', cls:'CLS_C059',
    grade:2, rarity:2, tier:1, desc:'땅으로 빼내는 잔류 마력을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 접점건넘을 안전 이동 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['안전 이동', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0585'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 땅으로 빼내는 잔류 마력을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접점건넘이 필요한 위치에 닿지 않는다.', '{u}은(는) 접점건넘을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 접점건넘의 범위와 출력을 정확히 맞춘다.', '{u}의 접점건넘이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 접점건넘을 중단한다.', '{u}의 접점건넘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0585', name:'누출경로눈', en:'Grounding Worker Reading', scope:'class', cls:'CLS_C059',
    grade:1, rarity:2, tier:1, desc:'땅으로 빼내는 잔류 마력의 작은 차이를 읽어 주변 이상을 구별한다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 누출경로눈을 이상 감지 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['이상 감지', '땅으로 빼내는 잔류 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0586'], lines:{use:['{u}의 {s}이(가) 발동한다. 땅으로 빼내는 잔류 마력의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 누출경로눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 누출경로눈을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 누출경로눈의 범위와 출력을 정확히 맞춘다.', '{u}의 누출경로눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 누출경로눈을 중단한다.', '{u}의 누출경로눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0586', name:'접점경계', en:'Grounding Worker Discipline', scope:'class', cls:'CLS_C059',
    grade:1, rarity:2, tier:1, desc:'땅으로 빼내는 잔류 마력을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 접점경계를 작업 경계 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['작업 경계', '땅으로 빼내는 잔류 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0587'], lines:{use:['{u}의 {s}이(가) 발동한다. 땅으로 빼내는 잔류 마력을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 접점경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 접점경계를 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 접점경계의 범위와 출력을 정확히 맞춘다.', '{u}의 접점경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 접점경계를 중단한다.', '{u}의 접점경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0587', name:'지면연결감', en:'Grounding Worker Foundation', scope:'class', cls:'CLS_C059',
    grade:2, rarity:2, tier:1, desc:'땅으로 빼내는 잔류 마력을 유지하는 데 필요한 힘을 일정하게 나눈다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 지면연결감을 기술 적응 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['기술 적응', '땅으로 빼내는 잔류 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0588'], lines:{use:['{u}의 {s}이(가) 발동한다. 땅으로 빼내는 잔류 마력을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 지면연결감이 필요한 위치에 닿지 않는다.', '{u}은(는) 지면연결감을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 지면연결감의 범위와 출력을 정확히 맞춘다.', '{u}의 지면연결감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 지면연결감을 중단한다.', '{u}의 지면연결감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0588', name:'겹접지파', en:'Grounding Worker Sequence', scope:'class', cls:'CLS_C059',
    grade:2, rarity:3, tier:2, desc:'접지말뚝의 마력을 나눠 가까운 적 둘을 견제한다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 겹접지파를 분산 견제 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['분산 견제', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:0,
    crit:-1, cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', maxLv:15,
    growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0589'], lines:{use:['{u}은(는) 접지말뚝의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 겹접지파의 경로에서 몸을 뺀다.', '{u}의 접지말뚝이 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 겹접지파가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 겹접지파의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 겹접지파를 중단한다.', '{u}의 겹접지파가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0589', name:'안전띠접지', en:'Grounding Worker Coverage', scope:'class', cls:'CLS_C059',
    grade:3, rarity:3, tier:3, desc:'땅으로 빼내는 잔류 마력을 이용해 동료가 물러날 경로를 확보한다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 안전띠접지를 퇴각 지원 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['퇴각 지원', '땅으로 빼내는 잔류 마력'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0590'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 땅으로 빼내는 잔류 마력을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 안전띠접지가 필요한 위치에 닿지 않는다.', '{u}은(는) 안전띠접지를 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 안전띠접지의 범위와 출력을 정확히 맞춘다.', '{u}의 안전띠접지가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 안전띠접지를 중단한다.', '{u}의 안전띠접지가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0590', name:'역류감각', en:'Grounding Worker Feedback', scope:'class', cls:'CLS_C059',
    grade:4, rarity:3, tier:4, desc:'땅으로 빼내는 잔류 마력이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 절연 바닥에서는 고정점을 따로 만든다.', lore:'누출 마력 현장 안정화에서 역류감각을 실패 징후 용도로 쓴다. 절연 바닥에서는 고정점을 따로 만든다.',
    tags:['실패 징후', '땅으로 빼내는 잔류 마력'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0581'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 땅으로 빼내는 잔류 마력이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 역류감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 역류감각을 멈추고 접지말뚝의 위치를 다시 잡는다.'], crit:['{u}은(는) 역류감각의 범위와 출력을 정확히 맞춘다.', '{u}의 역류감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접지말뚝의 상태가 맞지 않아 역류감각을 중단한다.', '{u}의 역류감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0591', name:'균열찍기', en:'Fracture Reader Contact', scope:'class', cls:'CLS_C060',
    grade:2, rarity:2, tier:1, desc:'균열쐐기에 마력을 실어 가까운 적의 움직임을 견제한다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 균열찍기를 견제 공격 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['견제 공격', '이미 생긴 작은 균열'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:1.05, kind2:'AK_SPECIAL', acc:1,
    crit:1, cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C012', chance:0.5, turns:2}],
    maxLv:10, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{opener:true}, risk:2,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0592'], lines:{use:['{u}은(는) 균열쐐기의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 견제 공격에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 균열찍기가 {t}의 노출된 부위에 닿는다.', '{t}의 자세가 {u}의 균열찍기를 받은 쪽으로 흔들린다.'], miss:['{t}이(가) 균열찍기의 경로에서 몸을 뺀다.', '{u}의 균열쐐기가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 균열찍기가 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 균열찍기의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 균열찍기를 중단한다.', '{u}의 균열찍기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0592', name:'틈메움막', en:'Fracture Reader Guard', scope:'class', cls:'CLS_C060',
    grade:1, rarity:2, tier:1, desc:'균열쐐기 주위의 마력으로 얇은 방호면을 만든다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 틈메움막을 임시 방호 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['임시 방호', '이미 생긴 작은 균열'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0593'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 균열쐐기 주위의 마력으로 얇은 방호면을 만든다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 틈메움막이 필요한 위치에 닿지 않는다.', '{u}은(는) 틈메움막을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 틈메움막의 범위와 출력을 정확히 맞춘다.', '{u}의 틈메움막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 틈메움막을 중단한다.', '{u}의 틈메움막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0593', name:'약점벌림', en:'Fracture Reader Set', scope:'class', cls:'CLS_C060',
    grade:1, rarity:2, tier:1, desc:'이미 생긴 작은 균열을 이용해 대상의 이동 경로를 좁힌다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 약점벌림을 위치 제어 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['위치 제어', '이미 생긴 작은 균열'], kind:'액티브', target:'enemy', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C006', chance:0.8, turns:2}], maxLv:10,
    growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25}, risk:1, side:['연달아 쓰면 집중이 흐려진다.'],
    combo:['SK_C0594'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 이미 생긴 작은 균열을 이용해 대상의 이동 경로를 좁힌다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 약점벌림이 필요한 위치에 닿지 않는다.', '{u}은(는) 약점벌림을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 약점벌림의 범위와 출력을 정확히 맞춘다.', '{u}의 약점벌림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 약점벌림을 중단한다.', '{u}의 약점벌림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0594', name:'균열비켜감', en:'Fracture Reader Step', scope:'class', cls:'CLS_C060',
    grade:2, rarity:2, tier:1, desc:'이미 생긴 작은 균열을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 균열비켜감을 안전 이동 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['안전 이동', '이미 생긴 작은 균열'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A19', move:'retreat', se:[{se:'SE_C015', chance:1, turns:1}],
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0595'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 이미 생긴 작은 균열을 확인한 뒤 표시된 안전 지점으로 한 걸음 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 균열비켜감이 필요한 위치에 닿지 않는다.', '{u}은(는) 균열비켜감을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 균열비켜감의 범위와 출력을 정확히 맞춘다.', '{u}의 균열비켜감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 균열비켜감을 중단한다.', '{u}의 균열비켜감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0595', name:'금간면눈', en:'Fracture Reader Reading', scope:'class', cls:'CLS_C060',
    grade:1, rarity:2, tier:1, desc:'이미 생긴 작은 균열의 작은 차이를 읽어 주변 이상을 구별한다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 금간면눈을 이상 감지 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['이상 감지', '이미 생긴 작은 균열'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0596'], lines:{use:['{u}의 {s}이(가) 발동한다. 이미 생긴 작은 균열의 작은 차이를 읽어 주변 이상을 구별한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 금간면눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 금간면눈을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 금간면눈의 범위와 출력을 정확히 맞춘다.', '{u}의 금간면눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 금간면눈을 중단한다.', '{u}의 금간면눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0596', name:'파편경계', en:'Fracture Reader Discipline', scope:'class', cls:'CLS_C060',
    grade:1, rarity:2, tier:1, desc:'이미 생긴 작은 균열을 다룰 때 실패로 이어질 징후를 먼저 살핀다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 파편경계를 작업 경계 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['작업 경계', '이미 생긴 작은 균열'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{sense:1.06}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0597'], lines:{use:['{u}의 {s}이(가) 발동한다. 이미 생긴 작은 균열을 다룰 때 실패로 이어질 징후를 먼저 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 파편경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 파편경계를 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 파편경계의 범위와 출력을 정확히 맞춘다.', '{u}의 파편경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 파편경계를 중단한다.', '{u}의 파편경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0597', name:'균열방향감', en:'Fracture Reader Foundation', scope:'class', cls:'CLS_C060',
    grade:2, rarity:2, tier:1, desc:'이미 생긴 작은 균열을 유지하는 데 필요한 힘을 일정하게 나눈다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 균열방향감을 기술 적응 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['기술 적응', '이미 생긴 작은 균열'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{sense:1.08}, maxLv:10,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0598'], lines:{use:['{u}의 {s}이(가) 발동한다. 이미 생긴 작은 균열을 유지하는 데 필요한 힘을 일정하게 나눈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 균열방향감이 필요한 위치에 닿지 않는다.', '{u}은(는) 균열방향감을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 균열방향감의 범위와 출력을 정확히 맞춘다.', '{u}의 균열방향감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 균열방향감을 중단한다.', '{u}의 균열방향감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0598', name:'갈래균열격', en:'Fracture Reader Sequence', scope:'class', cls:'CLS_C060',
    grade:2, rarity:3, tier:2, desc:'균열쐐기의 마력을 나눠 가까운 적 둘을 견제한다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 갈래균열격을 분산 견제 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['분산 견제', '이미 생긴 작은 균열'], kind:'액티브', target:'enemies', range:'near', area:2,
    hits:1, count:2, power:0.85, kind2:'AK_SPECIAL', acc:1,
    crit:-1, cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A19', se:[{se:'SE_C012', chance:0.5, turns:2}],
    maxLv:15, growth:{power:0.04, cost:-0.1}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A19:8}}, ai:{enemies:2},
    risk:2, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0599'], lines:{use:['{u}은(는) 균열쐐기의 위치를 잡고 {s}을(를) 쓴다.', '{u}은(는) 분산 견제에 필요한 간격을 확인하고 {s}을(를) 시작한다.'], hit:['{u}의 {s}이(가) 나뉜 표적에 차례로 닿는다.', '{u}의 {s}이(가) 흩어진 적의 움직임을 끊는다.'], miss:['{t}이(가) 갈래균열격의 경로에서 몸을 뺀다.', '{u}의 균열쐐기가 닿기 전에 {t}의 위치가 바뀐다.'], crit:['{u}의 갈래균열격이 {t}의 방호가 벌어진 틈을 짚는다.', '{t}은(는) {u}의 갈래균열격의 충격을 받고 지지하던 발을 옮긴다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 갈래균열격을 중단한다.', '{u}의 갈래균열격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0599', name:'붕괴선차단', en:'Fracture Reader Coverage', scope:'class', cls:'CLS_C060',
    grade:3, rarity:3, tier:3, desc:'이미 생긴 작은 균열을 이용해 동료가 물러날 경로를 확보한다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 붕괴선차단을 퇴각 지원 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['퇴각 지원', '이미 생긴 작은 균열'], kind:'액티브', target:'ally', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A19', shield:0.9, se:[{se:'SE_C018', chance:1, turns:3}],
    maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A19:10}}, ai:{enemies:2},
    risk:1, side:['연달아 쓰면 집중이 흐려진다.'], combo:['SK_C0600'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 이미 생긴 작은 균열을 이용해 동료가 물러날 경로를 확보한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 붕괴선차단이 필요한 위치에 닿지 않는다.', '{u}은(는) 붕괴선차단을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 붕괴선차단의 범위와 출력을 정확히 맞춘다.', '{u}의 붕괴선차단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 붕괴선차단을 중단한다.', '{u}의 붕괴선차단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0600', name:'균열진행감', en:'Fracture Reader Feedback', scope:'class', cls:'CLS_C060',
    grade:4, rarity:3, tier:4, desc:'이미 생긴 작은 균열이 끊기거나 어긋날 때 손끝의 변화를 알아챈다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.', lore:'붕괴 위험 구조물 조사에서 균열진행감을 실패 징후 용도로 쓴다. 멀쩡한 구조물을 마음대로 쪼개지 못한다.',
    tags:['실패 징후', '이미 생긴 작은 균열'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A19', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, maxLv:15,
    growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A19:12}}, risk:1, combo:['SK_C0591'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 이미 생긴 작은 균열이 끊기거나 어긋날 때 손끝의 변화를 알아챈다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 균열진행감이 필요한 위치에 닿지 않는다.', '{u}은(는) 균열진행감을 멈추고 균열쐐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 균열진행감의 범위와 출력을 정확히 맞춘다.', '{u}의 균열진행감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 균열쐐기의 상태가 맞지 않아 균열진행감을 중단한다.', '{u}의 균열진행감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0601', name:'금속결맞춤', en:'Field Smith Contact', scope:'class', cls:'CLS_C061',
    grade:2, rarity:1, tier:1, desc:'달군 금속의 결을 망치로 맞춘다. 차가운 금속은 같은 방식으로 단조할 수 없다.', lore:'마수 소재 공방 단조에서 금속결맞춤을 단일 작업 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['단일 작업', '달군 금속의 결정 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0602'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 달군 금속의 결을 망치로 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 금속결맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 금속결맞춤을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 금속결맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 금속결맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 금속결맞춤을 중단한다.', '{u}의 금속결맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0602', name:'단조열막', en:'Field Smith Guard', scope:'class', cls:'CLS_C061',
    grade:1, rarity:1, tier:1, desc:'단조망치를 든 손과 작업면 사이에 얇은 보호층을 둔다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 단조열막을 작업자 방호 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['작업자 방호', '달군 금속의 결정 방향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0603'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 단조망치를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 단조열막이 필요한 위치에 닿지 않는다.', '{u}은(는) 단조열막을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 단조열막의 범위와 출력을 정확히 맞춘다.', '{u}의 단조열막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 단조열막을 중단한다.', '{u}의 단조열막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0603', name:'날끝조임', en:'Field Smith Set', scope:'class', cls:'CLS_C061',
    grade:1, rarity:1, tier:1, desc:'달군 금속의 결정 방향이 어긋나지 않도록 작업면을 임시로 고정한다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 날끝조임을 작업면 고정 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['작업면 고정', '달군 금속의 결정 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0604'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 달군 금속의 결정 방향이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 날끝조임이 필요한 위치에 닿지 않는다.', '{u}은(는) 날끝조임을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 날끝조임의 범위와 출력을 정확히 맞춘다.', '{u}의 날끝조임이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 날끝조임을 중단한다.', '{u}의 날끝조임이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0604', name:'작업대옮김', en:'Field Smith Step', scope:'class', cls:'CLS_C061',
    grade:2, rarity:1, tier:1, desc:'작업물과 단조망치의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'마수 소재 공방 단조에서 작업대옮김을 안전 운반 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['안전 운반', '달군 금속의 결정 방향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0605'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 단조망치의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 작업대옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 작업대옮김을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 작업대옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 작업대옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 작업대옮김을 중단한다.', '{u}의 작업대옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0605', name:'단조결눈', en:'Field Smith Reading', scope:'class', cls:'CLS_C061',
    grade:1, rarity:1, tier:1, desc:'달군 금속의 결정 방향의 차이를 읽어 작업 전 품질을 살핀다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 단조결눈을 품질 감지 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['품질 감지', '달군 금속의 결정 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0606'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 달군 금속의 결정 방향의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 단조결눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 단조결눈을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 단조결눈의 범위와 출력을 정확히 맞춘다.', '{u}의 단조결눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 단조결눈을 중단한다.', '{u}의 단조결눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0606', name:'망치박자', en:'Field Smith Discipline', scope:'class', cls:'CLS_C061',
    grade:1, rarity:1, tier:1, desc:'달군 금속의 결정 방향에 맞는 작업 순서를 손에 익힌다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 망치박자를 공정 기억 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['공정 기억', '달군 금속의 결정 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0607'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 달군 금속의 결정 방향에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 망치박자가 필요한 위치에 닿지 않는다.', '{u}은(는) 망치박자를 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 망치박자의 범위와 출력을 정확히 맞춘다.', '{u}의 망치박자가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 망치박자를 중단한다.', '{u}의 망치박자가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0607', name:'가열균등', en:'Field Smith Foundation', scope:'class', cls:'CLS_C061',
    grade:2, rarity:1, tier:1, desc:'달군 금속의 결정 방향을 다룰 때 불필요한 힘을 줄인다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 가열균등을 재료 적응 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['재료 적응', '달군 금속의 결정 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0608'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 달군 금속의 결정 방향을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 가열균등이 필요한 위치에 닿지 않는다.', '{u}은(는) 가열균등을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 가열균등의 범위와 출력을 정확히 맞춘다.', '{u}의 가열균등이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 가열균등을 중단한다.', '{u}의 가열균등이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0608', name:'겹결단조', en:'Field Smith Sequence', scope:'class', cls:'CLS_C061',
    grade:2, rarity:3, tier:2, desc:'여러 금속층의 결을 순서대로 두드려 맞춘다. 재료와 열원이 따로 필요하다.', lore:'마수 소재 공방 단조에서 겹결단조를 심화 가공 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['심화 가공', '달군 금속의 결정 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0609'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 여러 금속층의 결을 순서대로 두드려 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹결단조가 필요한 위치에 닿지 않는다.', '{u}은(는) 겹결단조를 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹결단조의 범위와 출력을 정확히 맞춘다.', '{u}의 겹결단조가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 겹결단조를 중단한다.', '{u}의 겹결단조가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0609', name:'공동열처리', en:'Field Smith Coverage', scope:'class', cls:'CLS_C061',
    grade:3, rarity:3, tier:3, desc:'함께 작업하는 둘의 가열 기준을 맞춘다. 서로 다른 재료는 별도로 처리한다.', lore:'마수 소재 공방 단조에서 공동열처리를 공동 작업 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['공동 작업', '달군 금속의 결정 방향', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0610'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 함께 작업하는 둘의 가열 기준을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동열처리가 필요한 위치에 닿지 않는다.', '{u}은(는) 공동열처리를 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동열처리의 범위와 출력을 정확히 맞춘다.', '{u}의 공동열처리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 공동열처리를 중단한다.', '{u}의 공동열처리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0610', name:'식힘균열감', en:'Field Smith Feedback', scope:'class', cls:'CLS_C061',
    grade:4, rarity:3, tier:4, desc:'달군 금속의 결정 방향이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 재료와 열원이 없으면 단조하지 못한다.', lore:'마수 소재 공방 단조에서 식힘균열감을 손상 징후 용도로 쓴다. 재료와 열원이 없으면 단조하지 못한다.',
    tags:['손상 징후', '달군 금속의 결정 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0601'], lines:{use:['{u}의 {s}이(가) 발동한다. 달군 금속의 결정 방향이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 식힘균열감이 필요한 위치에 닿지 않는다.', '{u}은(는) 식힘균열감을 멈추고 단조망치의 위치를 다시 잡는다.'], crit:['{u}은(는) 식힘균열감의 범위와 출력을 정확히 맞춘다.', '{u}의 식힘균열감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 단조망치의 상태가 맞지 않아 식힘균열감을 중단한다.', '{u}의 식힘균열감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0611', name:'올잇기', en:'Field Mender Contact', scope:'class', cls:'CLS_C062',
    grade:2, rarity:1, tier:1, desc:'찢어진 원단의 올을 당겨 잇는다. 없어진 원단과 실은 따로 보충해야 한다.', lore:'현장 방호복 수선에서 올잇기를 단일 작업 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['단일 작업', '찢어진 섬유의 연결', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0612'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 찢어진 원단의 올을 당겨 잇는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 올잇기가 필요한 위치에 닿지 않는다.', '{u}은(는) 올잇기를 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 올잇기의 범위와 출력을 정확히 맞춘다.', '{u}의 올잇기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 올잇기를 중단한다.', '{u}의 올잇기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0612', name:'수선손막', en:'Field Mender Guard', scope:'class', cls:'CLS_C062',
    grade:1, rarity:1, tier:1, desc:'수선바늘을 든 손과 작업면 사이에 얇은 보호층을 둔다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 수선손막을 작업자 방호 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['작업자 방호', '찢어진 섬유의 연결'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0613'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 수선바늘을 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 수선손막이 필요한 위치에 닿지 않는다.', '{u}은(는) 수선손막을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 수선손막의 범위와 출력을 정확히 맞춘다.', '{u}의 수선손막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 수선손막을 중단한다.', '{u}의 수선손막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0613', name:'찢김고정', en:'Field Mender Set', scope:'class', cls:'CLS_C062',
    grade:1, rarity:1, tier:1, desc:'찢어진 섬유의 연결이 어긋나지 않도록 작업면을 임시로 고정한다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 찢김고정을 작업면 고정 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['작업면 고정', '찢어진 섬유의 연결', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0614'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 찢어진 섬유의 연결이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 찢김고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 찢김고정을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 찢김고정의 범위와 출력을 정확히 맞춘다.', '{u}의 찢김고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 찢김고정을 중단한다.', '{u}의 찢김고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0614', name:'수선자리교대', en:'Field Mender Step', scope:'class', cls:'CLS_C062',
    grade:2, rarity:1, tier:1, desc:'작업물과 수선바늘의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'현장 방호복 수선에서 수선자리교대를 안전 운반 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['안전 운반', '찢어진 섬유의 연결'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0615'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 수선바늘의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 수선자리교대가 필요한 위치에 닿지 않는다.', '{u}은(는) 수선자리교대를 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 수선자리교대의 범위와 출력을 정확히 맞춘다.', '{u}의 수선자리교대가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 수선자리교대를 중단한다.', '{u}의 수선자리교대가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0615', name:'올풀림눈', en:'Field Mender Reading', scope:'class', cls:'CLS_C062',
    grade:1, rarity:1, tier:1, desc:'찢어진 섬유의 연결의 차이를 읽어 작업 전 품질을 살핀다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 올풀림눈을 품질 감지 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['품질 감지', '찢어진 섬유의 연결'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0616'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 찢어진 섬유의 연결의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 올풀림눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 올풀림눈을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 올풀림눈의 범위와 출력을 정확히 맞춘다.', '{u}의 올풀림눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 올풀림눈을 중단한다.', '{u}의 올풀림눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0616', name:'바늘간격', en:'Field Mender Discipline', scope:'class', cls:'CLS_C062',
    grade:1, rarity:1, tier:1, desc:'찢어진 섬유의 연결에 맞는 작업 순서를 손에 익힌다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 바늘간격을 공정 기억 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['공정 기억', '찢어진 섬유의 연결'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0617'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 찢어진 섬유의 연결에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 바늘간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 바늘간격을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 바늘간격의 범위와 출력을 정확히 맞춘다.', '{u}의 바늘간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 바늘간격을 중단한다.', '{u}의 바늘간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0617', name:'당김분산', en:'Field Mender Foundation', scope:'class', cls:'CLS_C062',
    grade:2, rarity:1, tier:1, desc:'찢어진 섬유의 연결을 다룰 때 불필요한 힘을 줄인다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 당김분산을 재료 적응 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['재료 적응', '찢어진 섬유의 연결'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0618'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 찢어진 섬유의 연결을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 당김분산이 필요한 위치에 닿지 않는다.', '{u}은(는) 당김분산을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 당김분산의 범위와 출력을 정확히 맞춘다.', '{u}의 당김분산이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 당김분산을 중단한다.', '{u}의 당김분산이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0618', name:'겹올수선', en:'Field Mender Sequence', scope:'class', cls:'CLS_C062',
    grade:2, rarity:3, tier:2, desc:'겹친 원단의 올을 각각 이어 응력을 나눈다. 방호 성능은 수선 뒤 검수해야 한다.', lore:'현장 방호복 수선에서 겹올수선을 심화 가공 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['심화 가공', '찢어진 섬유의 연결', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0619'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 겹친 원단의 올을 각각 이어 응력을 나눈다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹올수선이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹올수선을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹올수선의 범위와 출력을 정확히 맞춘다.', '{u}의 겹올수선이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 겹올수선을 중단한다.', '{u}의 겹올수선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0619', name:'대열옷점검', en:'Field Mender Coverage', scope:'class', cls:'CLS_C062',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 방호복에서 풀린 올을 순서대로 확인한다. 손상을 완전히 없애지는 못한다.', lore:'현장 방호복 수선에서 대열옷점검을 공동 작업 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['공동 작업', '찢어진 섬유의 연결', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0620'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 방호복에서 풀린 올을 순서대로 확인한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열옷점검이 필요한 위치에 닿지 않는다.', '{u}은(는) 대열옷점검을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열옷점검의 범위와 출력을 정확히 맞춘다.', '{u}의 대열옷점검이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 대열옷점검을 중단한다.', '{u}의 대열옷점검이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0620', name:'재파열감', en:'Field Mender Feedback', scope:'class', cls:'CLS_C062',
    grade:4, rarity:3, tier:4, desc:'찢어진 섬유의 연결이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 없어진 원단을 새로 만들지 못한다.', lore:'현장 방호복 수선에서 재파열감을 손상 징후 용도로 쓴다. 없어진 원단을 새로 만들지 못한다.',
    tags:['손상 징후', '찢어진 섬유의 연결'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0611'], lines:{use:['{u}의 {s}이(가) 발동한다. 찢어진 섬유의 연결이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 재파열감이 필요한 위치에 닿지 않는다.', '{u}은(는) 재파열감을 멈추고 수선바늘의 위치를 다시 잡는다.'], crit:['{u}은(는) 재파열감의 범위와 출력을 정확히 맞춘다.', '{u}의 재파열감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 수선바늘의 상태가 맞지 않아 재파열감을 중단한다.', '{u}의 재파열감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0621', name:'미세홈긋기', en:'Inscription Worker Contact', scope:'class', cls:'CLS_C063',
    grade:2, rarity:1, tier:1, desc:'각인침으로 장비 표면에 얕은 마력 경로를 긋는다. 너무 깊으면 재료를 약하게 한다.', lore:'마력 장비 표면 가공에서 미세홈긋기를 단일 작업 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['단일 작업', '표면에 새긴 마력 경로', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0622'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 각인침으로 장비 표면에 얕은 마력 경로를 긋는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 미세홈긋기가 필요한 위치에 닿지 않는다.', '{u}은(는) 미세홈긋기를 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 미세홈긋기의 범위와 출력을 정확히 맞춘다.', '{u}의 미세홈긋기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 미세홈긋기를 중단한다.', '{u}의 미세홈긋기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0622', name:'각인비산막', en:'Inscription Worker Guard', scope:'class', cls:'CLS_C063',
    grade:1, rarity:1, tier:1, desc:'각인침을 든 손과 작업면 사이에 얇은 보호층을 둔다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 각인비산막을 작업자 방호 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['작업자 방호', '표면에 새긴 마력 경로'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0623'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 각인침을 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 각인비산막이 필요한 위치에 닿지 않는다.', '{u}은(는) 각인비산막을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 각인비산막의 범위와 출력을 정확히 맞춘다.', '{u}의 각인비산막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 각인비산막을 중단한다.', '{u}의 각인비산막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0623', name:'경로고정', en:'Inscription Worker Set', scope:'class', cls:'CLS_C063',
    grade:1, rarity:1, tier:1, desc:'표면에 새긴 마력 경로이 어긋나지 않도록 작업면을 임시로 고정한다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 경로고정을 작업면 고정 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['작업면 고정', '표면에 새긴 마력 경로', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0624'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표면에 새긴 마력 경로이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 경로고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 경로고정을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 경로고정의 범위와 출력을 정확히 맞춘다.', '{u}의 경로고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 경로고정을 중단한다.', '{u}의 경로고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0624', name:'각인점옮김', en:'Inscription Worker Step', scope:'class', cls:'CLS_C063',
    grade:2, rarity:1, tier:1, desc:'작업물과 각인침의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'마력 장비 표면 가공에서 각인점옮김을 안전 운반 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['안전 운반', '표면에 새긴 마력 경로'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0625'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 각인침의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 각인점옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 각인점옮김을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 각인점옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 각인점옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 각인점옮김을 중단한다.', '{u}의 각인점옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0625', name:'홈깊이눈', en:'Inscription Worker Reading', scope:'class', cls:'CLS_C063',
    grade:1, rarity:1, tier:1, desc:'표면에 새긴 마력 경로의 차이를 읽어 작업 전 품질을 살핀다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 홈깊이눈을 품질 감지 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['품질 감지', '표면에 새긴 마력 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0626'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면에 새긴 마력 경로의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 홈깊이눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 홈깊이눈을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 홈깊이눈의 범위와 출력을 정확히 맞춘다.', '{u}의 홈깊이눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 홈깊이눈을 중단한다.', '{u}의 홈깊이눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0626', name:'획간격', en:'Inscription Worker Discipline', scope:'class', cls:'CLS_C063',
    grade:1, rarity:1, tier:1, desc:'표면에 새긴 마력 경로에 맞는 작업 순서를 손에 익힌다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 획간격을 공정 기억 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['공정 기억', '표면에 새긴 마력 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0627'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면에 새긴 마력 경로에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 획간격이 필요한 위치에 닿지 않는다.', '{u}은(는) 획간격을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 획간격의 범위와 출력을 정확히 맞춘다.', '{u}의 획간격이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 획간격을 중단한다.', '{u}의 획간격이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0627', name:'표면장력감', en:'Inscription Worker Foundation', scope:'class', cls:'CLS_C063',
    grade:2, rarity:1, tier:1, desc:'표면에 새긴 마력 경로를 다룰 때 불필요한 힘을 줄인다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 표면장력감을 재료 적응 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['재료 적응', '표면에 새긴 마력 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0628'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면에 새긴 마력 경로를 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 표면장력감이 필요한 위치에 닿지 않는다.', '{u}은(는) 표면장력감을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 표면장력감의 범위와 출력을 정확히 맞춘다.', '{u}의 표면장력감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 표면장력감을 중단한다.', '{u}의 표면장력감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0628', name:'겹경로각인', en:'Inscription Worker Sequence', scope:'class', cls:'CLS_C063',
    grade:2, rarity:3, tier:2, desc:'서로 간섭하지 않도록 여러 경로를 나눠 새긴다. 설계와 재료가 맞아야 한다.', lore:'마력 장비 표면 가공에서 겹경로각인을 심화 가공 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['심화 가공', '표면에 새긴 마력 경로', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0629'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 간섭하지 않도록 여러 경로를 나눠 새긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹경로각인이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹경로각인을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹경로각인의 범위와 출력을 정확히 맞춘다.', '{u}의 겹경로각인이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 겹경로각인을 중단한다.', '{u}의 겹경로각인이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0629', name:'공동접점', en:'Inscription Worker Coverage', scope:'class', cls:'CLS_C063',
    grade:3, rarity:3, tier:3, desc:'동료 둘이 쓰는 장비의 접점 기준을 맞춘다. 새 능력을 임의로 부여하지 못한다.', lore:'마력 장비 표면 가공에서 공동접점을 공동 작업 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['공동 작업', '표면에 새긴 마력 경로', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0630'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘이 쓰는 장비의 접점 기준을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동접점이 필요한 위치에 닿지 않는다.', '{u}은(는) 공동접점을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동접점의 범위와 출력을 정확히 맞춘다.', '{u}의 공동접점이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 공동접점을 중단한다.', '{u}의 공동접점이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0630', name:'획끊김감', en:'Inscription Worker Feedback', scope:'class', cls:'CLS_C063',
    grade:4, rarity:3, tier:4, desc:'표면에 새긴 마력 경로이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 깊은 흠집은 장비를 약하게 한다.', lore:'마력 장비 표면 가공에서 획끊김감을 손상 징후 용도로 쓴다. 깊은 흠집은 장비를 약하게 한다.',
    tags:['손상 징후', '표면에 새긴 마력 경로'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0621'], lines:{use:['{u}의 {s}이(가) 발동한다. 표면에 새긴 마력 경로이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 획끊김감이 필요한 위치에 닿지 않는다.', '{u}은(는) 획끊김감을 멈추고 각인침의 위치를 다시 잡는다.'], crit:['{u}은(는) 획끊김감의 범위와 출력을 정확히 맞춘다.', '{u}의 획끊김감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 각인침의 상태가 맞지 않아 획끊김감을 중단한다.', '{u}의 획끊김감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0631', name:'불순물뜸', en:'Ore Refiner Contact', scope:'class', cls:'CLS_C064',
    grade:2, rarity:1, tier:1, desc:'가열된 광물에서 뜨는 불순물을 분리한다. 분진과 찌꺼기를 따로 수거해야 한다.', lore:'회수 광물 정제 공방에서 불순물뜸을 단일 작업 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['단일 작업', '광물 속 불순물의 분리', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0632'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 가열된 광물에서 뜨는 불순물을 분리한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 불순물뜸이 필요한 위치에 닿지 않는다.', '{u}은(는) 불순물뜸을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 불순물뜸의 범위와 출력을 정확히 맞춘다.', '{u}의 불순물뜸이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 불순물뜸을 중단한다.', '{u}의 불순물뜸이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0632', name:'제련분진막', en:'Ore Refiner Guard', scope:'class', cls:'CLS_C064',
    grade:1, rarity:1, tier:1, desc:'제련집게를 든 손과 작업면 사이에 얇은 보호층을 둔다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 제련분진막을 작업자 방호 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['작업자 방호', '광물 속 불순물의 분리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0633'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 제련집게를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 제련분진막이 필요한 위치에 닿지 않는다.', '{u}은(는) 제련분진막을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 제련분진막의 범위와 출력을 정확히 맞춘다.', '{u}의 제련분진막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 제련분진막을 중단한다.', '{u}의 제련분진막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0633', name:'용융면고정', en:'Ore Refiner Set', scope:'class', cls:'CLS_C064',
    grade:1, rarity:1, tier:1, desc:'광물 속 불순물의 분리이 어긋나지 않도록 작업면을 임시로 고정한다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 용융면고정을 작업면 고정 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['작업면 고정', '광물 속 불순물의 분리', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0634'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 광물 속 불순물의 분리이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 용융면고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 용융면고정을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 용융면고정의 범위와 출력을 정확히 맞춘다.', '{u}의 용융면고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 용융면고정을 중단한다.', '{u}의 용융면고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0634', name:'도가니옮김', en:'Ore Refiner Step', scope:'class', cls:'CLS_C064',
    grade:2, rarity:1, tier:1, desc:'작업물과 제련집게의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'회수 광물 정제 공방에서 도가니옮김을 안전 운반 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['안전 운반', '광물 속 불순물의 분리'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0635'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 제련집게의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 도가니옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 도가니옮김을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 도가니옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 도가니옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 도가니옮김을 중단한다.', '{u}의 도가니옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0635', name:'광물결눈', en:'Ore Refiner Reading', scope:'class', cls:'CLS_C064',
    grade:1, rarity:1, tier:1, desc:'광물 속 불순물의 분리의 차이를 읽어 작업 전 품질을 살핀다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 광물결눈을 품질 감지 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['품질 감지', '광물 속 불순물의 분리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0636'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광물 속 불순물의 분리의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 광물결눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 광물결눈을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 광물결눈의 범위와 출력을 정확히 맞춘다.', '{u}의 광물결눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 광물결눈을 중단한다.', '{u}의 광물결눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0636', name:'가열순서', en:'Ore Refiner Discipline', scope:'class', cls:'CLS_C064',
    grade:1, rarity:1, tier:1, desc:'광물 속 불순물의 분리에 맞는 작업 순서를 손에 익힌다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 가열순서를 공정 기억 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['공정 기억', '광물 속 불순물의 분리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0637'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광물 속 불순물의 분리에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 가열순서가 필요한 위치에 닿지 않는다.', '{u}은(는) 가열순서를 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 가열순서의 범위와 출력을 정확히 맞춘다.', '{u}의 가열순서가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 가열순서를 중단한다.', '{u}의 가열순서가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0637', name:'불순물구별', en:'Ore Refiner Foundation', scope:'class', cls:'CLS_C064',
    grade:2, rarity:1, tier:1, desc:'광물 속 불순물의 분리를 다룰 때 불필요한 힘을 줄인다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 불순물구별을 재료 적응 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['재료 적응', '광물 속 불순물의 분리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0638'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 광물 속 불순물의 분리를 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 불순물구별이 필요한 위치에 닿지 않는다.', '{u}은(는) 불순물구별을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 불순물구별의 범위와 출력을 정확히 맞춘다.', '{u}의 불순물구별이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 불순물구별을 중단한다.', '{u}의 불순물구별이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0638', name:'다층분리', en:'Ore Refiner Sequence', scope:'class', cls:'CLS_C064',
    grade:2, rarity:3, tier:2, desc:'녹는 순서가 다른 층을 나눠 분리한다. 성분을 모르는 광물은 먼저 검사한다.', lore:'회수 광물 정제 공방에서 다층분리를 심화 가공 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['심화 가공', '광물 속 불순물의 분리', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0639'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 녹는 순서가 다른 층을 나눠 분리한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다층분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 다층분리를 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 다층분리의 범위와 출력을 정확히 맞춘다.', '{u}의 다층분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 다층분리를 중단한다.', '{u}의 다층분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0639', name:'공동예열', en:'Ore Refiner Coverage', scope:'class', cls:'CLS_C064',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 제련 작업에 필요한 예열 기준을 맞춘다. 다른 광물을 함께 녹이지 않는다.', lore:'회수 광물 정제 공방에서 공동예열을 공동 작업 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['공동 작업', '광물 속 불순물의 분리', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0640'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 제련 작업에 필요한 예열 기준을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동예열이 필요한 위치에 닿지 않는다.', '{u}은(는) 공동예열을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동예열의 범위와 출력을 정확히 맞춘다.', '{u}의 공동예열이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 공동예열을 중단한다.', '{u}의 공동예열이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0640', name:'슬래그감', en:'Ore Refiner Feedback', scope:'class', cls:'CLS_C064',
    grade:4, rarity:3, tier:4, desc:'광물 속 불순물의 분리이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 독성 분진을 따로 처리해야 한다.', lore:'회수 광물 정제 공방에서 슬래그감을 손상 징후 용도로 쓴다. 독성 분진을 따로 처리해야 한다.',
    tags:['손상 징후', '광물 속 불순물의 분리'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0631'], lines:{use:['{u}의 {s}이(가) 발동한다. 광물 속 불순물의 분리이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 슬래그감이 필요한 위치에 닿지 않는다.', '{u}은(는) 슬래그감을 멈추고 제련집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 슬래그감의 범위와 출력을 정확히 맞춘다.', '{u}의 슬래그감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 제련집게의 상태가 맞지 않아 슬래그감을 중단한다.', '{u}의 슬래그감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0641', name:'가죽결절단', en:'Protective Tailor Contact', scope:'class', cls:'CLS_C065',
    grade:2, rarity:1, tier:1, desc:'마수 가죽의 섬유 방향을 따라 재단한다. 보호 면적을 줄여 성능을 높이지 못한다.', lore:'방호 장비 맞춤 제작에서 가죽결절단을 단일 작업 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['단일 작업', '마수 가죽의 섬유 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0642'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마수 가죽의 섬유 방향을 따라 재단한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 가죽결절단이 필요한 위치에 닿지 않는다.', '{u}은(는) 가죽결절단을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 가죽결절단의 범위와 출력을 정확히 맞춘다.', '{u}의 가죽결절단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 가죽결절단을 중단한다.', '{u}의 가죽결절단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0642', name:'재단손가림', en:'Protective Tailor Guard', scope:'class', cls:'CLS_C065',
    grade:1, rarity:1, tier:1, desc:'재단가위를 든 손과 작업면 사이에 얇은 보호층을 둔다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 재단손가림을 작업자 방호 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['작업자 방호', '마수 가죽의 섬유 방향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0643'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 재단가위를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 재단손가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 재단손가림을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 재단손가림의 범위와 출력을 정확히 맞춘다.', '{u}의 재단손가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 재단손가림을 중단한다.', '{u}의 재단손가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0643', name:'재단면고정', en:'Protective Tailor Set', scope:'class', cls:'CLS_C065',
    grade:1, rarity:1, tier:1, desc:'마수 가죽의 섬유 방향이 어긋나지 않도록 작업면을 임시로 고정한다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 재단면고정을 작업면 고정 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['작업면 고정', '마수 가죽의 섬유 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0644'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마수 가죽의 섬유 방향이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 재단면고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 재단면고정을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 재단면고정의 범위와 출력을 정확히 맞춘다.', '{u}의 재단면고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 재단면고정을 중단한다.', '{u}의 재단면고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0644', name:'원단접어옮김', en:'Protective Tailor Step', scope:'class', cls:'CLS_C065',
    grade:2, rarity:1, tier:1, desc:'작업물과 재단가위의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'방호 장비 맞춤 제작에서 원단접어옮김을 안전 운반 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['안전 운반', '마수 가죽의 섬유 방향'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0645'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 재단가위의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 원단접어옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 원단접어옮김을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 원단접어옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 원단접어옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 원단접어옮김을 중단한다.', '{u}의 원단접어옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0645', name:'섬유방향눈', en:'Protective Tailor Reading', scope:'class', cls:'CLS_C065',
    grade:1, rarity:1, tier:1, desc:'마수 가죽의 섬유 방향의 차이를 읽어 작업 전 품질을 살핀다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 섬유방향눈을 품질 감지 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['품질 감지', '마수 가죽의 섬유 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0646'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 마수 가죽의 섬유 방향의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 섬유방향눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 섬유방향눈을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 섬유방향눈의 범위와 출력을 정확히 맞춘다.', '{u}의 섬유방향눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 섬유방향눈을 중단한다.', '{u}의 섬유방향눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0646', name:'시접가늠', en:'Protective Tailor Discipline', scope:'class', cls:'CLS_C065',
    grade:1, rarity:1, tier:1, desc:'마수 가죽의 섬유 방향에 맞는 작업 순서를 손에 익힌다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 시접가늠을 공정 기억 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['공정 기억', '마수 가죽의 섬유 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0647'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 마수 가죽의 섬유 방향에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 시접가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 시접가늠을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 시접가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 시접가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 시접가늠을 중단한다.', '{u}의 시접가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0647', name:'결따라재단', en:'Protective Tailor Foundation', scope:'class', cls:'CLS_C065',
    grade:2, rarity:1, tier:1, desc:'마수 가죽의 섬유 방향을 다룰 때 불필요한 힘을 줄인다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 결따라재단을 재료 적응 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['재료 적응', '마수 가죽의 섬유 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0648'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 마수 가죽의 섬유 방향을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 결따라재단이 필요한 위치에 닿지 않는다.', '{u}은(는) 결따라재단을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 결따라재단의 범위와 출력을 정확히 맞춘다.', '{u}의 결따라재단이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 결따라재단을 중단한다.', '{u}의 결따라재단이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0648', name:'겹원단맞춤', en:'Protective Tailor Sequence', scope:'class', cls:'CLS_C065',
    grade:2, rarity:3, tier:2, desc:'겹칠 원단의 결을 맞춰 접합 오차를 줄인다. 부족한 원단을 새로 만들지는 못한다.', lore:'방호 장비 맞춤 제작에서 겹원단맞춤을 심화 가공 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['심화 가공', '마수 가죽의 섬유 방향', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0649'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 겹칠 원단의 결을 맞춰 접합 오차를 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹원단맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹원단맞춤을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹원단맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 겹원단맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 겹원단맞춤을 중단한다.', '{u}의 겹원단맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0649', name:'공동치수표', en:'Protective Tailor Coverage', scope:'class', cls:'CLS_C065',
    grade:3, rarity:3, tier:3, desc:'함께 만드는 방호복의 치수 기준을 맞춘다. 착용자의 실제 치수 확인이 필요하다.', lore:'방호 장비 맞춤 제작에서 공동치수표를 공동 작업 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['공동 작업', '마수 가죽의 섬유 방향', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0650'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 함께 만드는 방호복의 치수 기준을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동치수표가 필요한 위치에 닿지 않는다.', '{u}은(는) 공동치수표를 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동치수표의 범위와 출력을 정확히 맞춘다.', '{u}의 공동치수표가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 공동치수표를 중단한다.', '{u}의 공동치수표가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0650', name:'당김주름감', en:'Protective Tailor Feedback', scope:'class', cls:'CLS_C065',
    grade:4, rarity:3, tier:4, desc:'마수 가죽의 섬유 방향이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 보호 부위를 줄이면 착용감만 좋아진다.', lore:'방호 장비 맞춤 제작에서 당김주름감을 손상 징후 용도로 쓴다. 보호 부위를 줄이면 착용감만 좋아진다.',
    tags:['손상 징후', '마수 가죽의 섬유 방향'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0641'], lines:{use:['{u}의 {s}이(가) 발동한다. 마수 가죽의 섬유 방향이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 당김주름감이 필요한 위치에 닿지 않는다.', '{u}은(는) 당김주름감을 멈추고 재단가위의 위치를 다시 잡는다.'], crit:['{u}은(는) 당김주름감의 범위와 출력을 정확히 맞춘다.', '{u}의 당김주름감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 재단가위의 상태가 맞지 않아 당김주름감을 중단한다.', '{u}의 당김주름감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0651', name:'유격맞춤', en:'Device Assembler Contact', scope:'class', cls:'CLS_C066',
    grade:2, rarity:1, tier:1, desc:'맞는 부품끼리 끼움 깊이를 맞춘다. 규격이 다른 부품을 억지로 결합하지 못한다.', lore:'탐지 장비 조립 공방에서 유격맞춤을 단일 작업 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['단일 작업', '부품 사이의 유격', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0652'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 맞는 부품끼리 끼움 깊이를 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 유격맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 유격맞춤을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 유격맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 유격맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 유격맞춤을 중단한다.', '{u}의 유격맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0652', name:'조립정전막', en:'Device Assembler Guard', scope:'class', cls:'CLS_C066',
    grade:1, rarity:1, tier:1, desc:'조립집게를 든 손과 작업면 사이에 얇은 보호층을 둔다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 조립정전막을 작업자 방호 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['작업자 방호', '부품 사이의 유격'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0653'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 조립집게를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 조립정전막이 필요한 위치에 닿지 않는다.', '{u}은(는) 조립정전막을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 조립정전막의 범위와 출력을 정확히 맞춘다.', '{u}의 조립정전막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 조립정전막을 중단한다.', '{u}의 조립정전막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0653', name:'부품임시잠금', en:'Device Assembler Set', scope:'class', cls:'CLS_C066',
    grade:1, rarity:1, tier:1, desc:'부품 사이의 유격이 어긋나지 않도록 작업면을 임시로 고정한다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 부품임시잠금을 작업면 고정 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['작업면 고정', '부품 사이의 유격', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0654'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 부품 사이의 유격이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 부품임시잠금이 필요한 위치에 닿지 않는다.', '{u}은(는) 부품임시잠금을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 부품임시잠금의 범위와 출력을 정확히 맞춘다.', '{u}의 부품임시잠금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 부품임시잠금을 중단한다.', '{u}의 부품임시잠금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0654', name:'조립대교대', en:'Device Assembler Step', scope:'class', cls:'CLS_C066',
    grade:2, rarity:1, tier:1, desc:'작업물과 조립집게의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'탐지 장비 조립 공방에서 조립대교대를 안전 운반 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['안전 운반', '부품 사이의 유격'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0655'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 조립집게의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 조립대교대가 필요한 위치에 닿지 않는다.', '{u}은(는) 조립대교대를 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 조립대교대의 범위와 출력을 정확히 맞춘다.', '{u}의 조립대교대가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 조립대교대를 중단한다.', '{u}의 조립대교대가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0655', name:'끼움깊이눈', en:'Device Assembler Reading', scope:'class', cls:'CLS_C066',
    grade:1, rarity:1, tier:1, desc:'부품 사이의 유격의 차이를 읽어 작업 전 품질을 살핀다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 끼움깊이눈을 품질 감지 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['품질 감지', '부품 사이의 유격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0656'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 부품 사이의 유격의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 끼움깊이눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 끼움깊이눈을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 끼움깊이눈의 범위와 출력을 정확히 맞춘다.', '{u}의 끼움깊이눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 끼움깊이눈을 중단한다.', '{u}의 끼움깊이눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0656', name:'체결순서', en:'Device Assembler Discipline', scope:'class', cls:'CLS_C066',
    grade:1, rarity:1, tier:1, desc:'부품 사이의 유격에 맞는 작업 순서를 손에 익힌다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 체결순서를 공정 기억 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['공정 기억', '부품 사이의 유격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0657'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 부품 사이의 유격에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 체결순서가 필요한 위치에 닿지 않는다.', '{u}은(는) 체결순서를 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 체결순서의 범위와 출력을 정확히 맞춘다.', '{u}의 체결순서가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 체결순서를 중단한다.', '{u}의 체결순서가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0657', name:'유격감각', en:'Device Assembler Foundation', scope:'class', cls:'CLS_C066',
    grade:2, rarity:1, tier:1, desc:'부품 사이의 유격을 다룰 때 불필요한 힘을 줄인다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 유격감각을 재료 적응 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['재료 적응', '부품 사이의 유격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0658'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 부품 사이의 유격을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 유격감각이 필요한 위치에 닿지 않는다.', '{u}은(는) 유격감각을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 유격감각의 범위와 출력을 정확히 맞춘다.', '{u}의 유격감각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 유격감각을 중단한다.', '{u}의 유격감각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0658', name:'다점체결', en:'Device Assembler Sequence', scope:'class', cls:'CLS_C066',
    grade:2, rarity:3, tier:2, desc:'여러 체결점을 순서대로 조여 유격을 나눈다. 부러진 부품은 교체해야 한다.', lore:'탐지 장비 조립 공방에서 다점체결을 심화 가공 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['심화 가공', '부품 사이의 유격', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0659'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 여러 체결점을 순서대로 조여 유격을 나눈다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다점체결이 필요한 위치에 닿지 않는다.', '{u}은(는) 다점체결을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 다점체결의 범위와 출력을 정확히 맞춘다.', '{u}의 다점체결이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 다점체결을 중단한다.', '{u}의 다점체결이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0659', name:'공동정렬', en:'Device Assembler Coverage', scope:'class', cls:'CLS_C066',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 조립 기준선을 맞춘다. 작동 검사는 조립 뒤 따로 해야 한다.', lore:'탐지 장비 조립 공방에서 공동정렬을 공동 작업 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['공동 작업', '부품 사이의 유격', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0660'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 조립 기준선을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동정렬이 필요한 위치에 닿지 않는다.', '{u}은(는) 공동정렬을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동정렬의 범위와 출력을 정확히 맞춘다.', '{u}의 공동정렬이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 공동정렬을 중단한다.', '{u}의 공동정렬이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0660', name:'풀림진동감', en:'Device Assembler Feedback', scope:'class', cls:'CLS_C066',
    grade:4, rarity:3, tier:4, desc:'부품 사이의 유격이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 설계와 맞는 부품이 필요하다.', lore:'탐지 장비 조립 공방에서 풀림진동감을 손상 징후 용도로 쓴다. 설계와 맞는 부품이 필요하다.',
    tags:['손상 징후', '부품 사이의 유격'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0651'], lines:{use:['{u}의 {s}이(가) 발동한다. 부품 사이의 유격이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 풀림진동감이 필요한 위치에 닿지 않는다.', '{u}은(는) 풀림진동감을 멈추고 조립집게의 위치를 다시 잡는다.'], crit:['{u}은(는) 풀림진동감의 범위와 출력을 정확히 맞춘다.', '{u}의 풀림진동감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조립집게의 상태가 맞지 않아 풀림진동감을 중단한다.', '{u}의 풀림진동감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0661', name:'속열맞춤', en:'Field Cook Contact', scope:'class', cls:'CLS_C067',
    grade:2, rarity:1, tier:1, desc:'식재료 속까지 열이 고르게 닿게 돕는다. 독성 재료를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 속열맞춤을 단일 작업 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['단일 작업', '식재료의 익힘과 보존', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0662'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 식재료 속까지 열이 고르게 닿게 돕는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 속열맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 속열맞춤을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 속열맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 속열맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 속열맞춤을 중단한다.', '{u}의 속열맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0662', name:'조리비말막', en:'Field Cook Guard', scope:'class', cls:'CLS_C067',
    grade:1, rarity:1, tier:1, desc:'조리도구를 든 손과 작업면 사이에 얇은 보호층을 둔다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 조리비말막을 작업자 방호 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['작업자 방호', '식재료의 익힘과 보존'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0663'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 조리도구를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 조리비말막이 필요한 위치에 닿지 않는다.', '{u}은(는) 조리비말막을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 조리비말막의 범위와 출력을 정확히 맞춘다.', '{u}의 조리비말막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 조리비말막을 중단한다.', '{u}의 조리비말막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0663', name:'식재료안정', en:'Field Cook Set', scope:'class', cls:'CLS_C067',
    grade:1, rarity:1, tier:1, desc:'식재료의 익힘과 보존이 어긋나지 않도록 작업면을 임시로 고정한다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 식재료안정을 작업면 고정 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['작업면 고정', '식재료의 익힘과 보존', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0664'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 식재료의 익힘과 보존이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 식재료안정이 필요한 위치에 닿지 않는다.', '{u}은(는) 식재료안정을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 식재료안정의 범위와 출력을 정확히 맞춘다.', '{u}의 식재료안정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 식재료안정을 중단한다.', '{u}의 식재료안정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0664', name:'배식대옮김', en:'Field Cook Step', scope:'class', cls:'CLS_C067',
    grade:2, rarity:1, tier:1, desc:'작업물과 조리도구의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'공략조 식사 공급에서 배식대옮김을 안전 운반 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['안전 운반', '식재료의 익힘과 보존'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0665'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 조리도구의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 배식대옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 배식대옮김을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 배식대옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 배식대옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 배식대옮김을 중단한다.', '{u}의 배식대옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0665', name:'익힘상태눈', en:'Field Cook Reading', scope:'class', cls:'CLS_C067',
    grade:1, rarity:1, tier:1, desc:'식재료의 익힘과 보존의 차이를 읽어 작업 전 품질을 살핀다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 익힘상태눈을 품질 감지 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['품질 감지', '식재료의 익힘과 보존'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0666'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 식재료의 익힘과 보존의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 익힘상태눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 익힘상태눈을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 익힘상태눈의 범위와 출력을 정확히 맞춘다.', '{u}의 익힘상태눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 익힘상태눈을 중단한다.', '{u}의 익힘상태눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0666', name:'향손실감', en:'Field Cook Discipline', scope:'class', cls:'CLS_C067',
    grade:1, rarity:1, tier:1, desc:'식재료의 익힘과 보존에 맞는 작업 순서를 손에 익힌다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 향손실감을 공정 기억 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['공정 기억', '식재료의 익힘과 보존'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0667'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 식재료의 익힘과 보존에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 향손실감이 필요한 위치에 닿지 않는다.', '{u}은(는) 향손실감을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 향손실감의 범위와 출력을 정확히 맞춘다.', '{u}의 향손실감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 향손실감을 중단한다.', '{u}의 향손실감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0667', name:'열고름', en:'Field Cook Foundation', scope:'class', cls:'CLS_C067',
    grade:2, rarity:1, tier:1, desc:'식재료의 익힘과 보존을 다룰 때 불필요한 힘을 줄인다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 열고름을 재료 적응 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['재료 적응', '식재료의 익힘과 보존'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0668'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 식재료의 익힘과 보존을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 열고름이 필요한 위치에 닿지 않는다.', '{u}은(는) 열고름을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 열고름의 범위와 출력을 정확히 맞춘다.', '{u}의 열고름이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 열고름을 중단한다.', '{u}의 열고름이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0668', name:'동시익힘', en:'Field Cook Sequence', scope:'class', cls:'CLS_C067',
    grade:2, rarity:3, tier:2, desc:'서로 다른 재료의 익힘 순서를 나눠 조리한다. 재료와 조리 도구가 필요하다.', lore:'공략조 식사 공급에서 동시익힘을 심화 가공 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['심화 가공', '식재료의 익힘과 보존', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0669'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 다른 재료의 익힘 순서를 나눠 조리한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 동시익힘이 필요한 위치에 닿지 않는다.', '{u}은(는) 동시익힘을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 동시익힘의 범위와 출력을 정확히 맞춘다.', '{u}의 동시익힘이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 동시익힘을 중단한다.', '{u}의 동시익힘이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0669', name:'대열배식', en:'Field Cook Coverage', scope:'class', cls:'CLS_C067',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 배식 분량과 시각을 맞춘다. 먹은 사람의 체력을 즉시 회복시키지는 않는다.', lore:'공략조 식사 공급에서 대열배식을 공동 작업 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['공동 작업', '식재료의 익힘과 보존', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0670'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 배식 분량과 시각을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 대열배식이 필요한 위치에 닿지 않는다.', '{u}은(는) 대열배식을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 대열배식의 범위와 출력을 정확히 맞춘다.', '{u}의 대열배식이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 대열배식을 중단한다.', '{u}의 대열배식이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0670', name:'변질전조감', en:'Field Cook Feedback', scope:'class', cls:'CLS_C067',
    grade:4, rarity:3, tier:4, desc:'식재료의 익힘과 보존이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.', lore:'공략조 식사 공급에서 변질전조감을 손상 징후 용도로 쓴다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다.',
    tags:['손상 징후', '식재료의 익힘과 보존'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0661'], lines:{use:['{u}의 {s}이(가) 발동한다. 식재료의 익힘과 보존이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 변질전조감이 필요한 위치에 닿지 않는다.', '{u}은(는) 변질전조감을 멈추고 조리도구의 위치를 다시 잡는다.'], crit:['{u}은(는) 변질전조감의 범위와 출력을 정확히 맞춘다.', '{u}의 변질전조감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 조리도구의 상태가 맞지 않아 변질전조감을 중단한다.', '{u}의 변질전조감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0671', name:'수분묶음', en:'Specimen Preserver Contact', scope:'class', cls:'CLS_C068',
    grade:2, rarity:1, tier:1, desc:'용기 안 표본의 수분 손실을 늦춘다. 이미 부패한 표본은 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 수분묶음을 단일 작업 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['단일 작업', '온도와 수분의 손실', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C026', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0672'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 용기 안 표본의 수분 손실을 늦춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 수분묶음이 필요한 위치에 닿지 않는다.', '{u}은(는) 수분묶음을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 수분묶음의 범위와 출력을 정확히 맞춘다.', '{u}의 수분묶음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 수분묶음을 중단한다.', '{u}의 수분묶음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0672', name:'표본차광막', en:'Specimen Preserver Guard', scope:'class', cls:'CLS_C068',
    grade:1, rarity:1, tier:1, desc:'밀폐용기를 든 손과 작업면 사이에 얇은 보호층을 둔다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 표본차광막을 작업자 방호 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['작업자 방호', '온도와 수분의 손실'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0673'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 밀폐용기를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 표본차광막이 필요한 위치에 닿지 않는다.', '{u}은(는) 표본차광막을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 표본차광막의 범위와 출력을 정확히 맞춘다.', '{u}의 표본차광막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 표본차광막을 중단한다.', '{u}의 표본차광막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0673', name:'보존점고정', en:'Specimen Preserver Set', scope:'class', cls:'CLS_C068',
    grade:1, rarity:1, tier:1, desc:'온도와 수분의 손실이 어긋나지 않도록 작업면을 임시로 고정한다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 보존점고정을 작업면 고정 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['작업면 고정', '온도와 수분의 손실', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C026', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0674'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 온도와 수분의 손실이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 보존점고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 보존점고정을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 보존점고정의 범위와 출력을 정확히 맞춘다.', '{u}의 보존점고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 보존점고정을 중단한다.', '{u}의 보존점고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0674', name:'용기안전운반', en:'Specimen Preserver Step', scope:'class', cls:'CLS_C068',
    grade:2, rarity:1, tier:1, desc:'작업물과 밀폐용기의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'생체 표본 운송 계약에서 용기안전운반을 안전 운반 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['안전 운반', '온도와 수분의 손실'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0675'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 밀폐용기의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 용기안전운반이 필요한 위치에 닿지 않는다.', '{u}은(는) 용기안전운반을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 용기안전운반의 범위와 출력을 정확히 맞춘다.', '{u}의 용기안전운반이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 용기안전운반을 중단한다.', '{u}의 용기안전운반이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0675', name:'변색가늠', en:'Specimen Preserver Reading', scope:'class', cls:'CLS_C068',
    grade:1, rarity:1, tier:1, desc:'온도와 수분의 손실의 차이를 읽어 작업 전 품질을 살핀다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 변색가늠을 품질 감지 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['품질 감지', '온도와 수분의 손실'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0676'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 온도와 수분의 손실의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 변색가늠이 필요한 위치에 닿지 않는다.', '{u}은(는) 변색가늠을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 변색가늠의 범위와 출력을 정확히 맞춘다.', '{u}의 변색가늠이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 변색가늠을 중단한다.', '{u}의 변색가늠이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0676', name:'밀봉경계', en:'Specimen Preserver Discipline', scope:'class', cls:'CLS_C068',
    grade:1, rarity:1, tier:1, desc:'온도와 수분의 손실에 맞는 작업 순서를 손에 익힌다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 밀봉경계를 공정 기억 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['공정 기억', '온도와 수분의 손실'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0677'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 온도와 수분의 손실에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 밀봉경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 밀봉경계를 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 밀봉경계의 범위와 출력을 정확히 맞춘다.', '{u}의 밀봉경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 밀봉경계를 중단한다.', '{u}의 밀봉경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0677', name:'손실억제', en:'Specimen Preserver Foundation', scope:'class', cls:'CLS_C068',
    grade:2, rarity:1, tier:1, desc:'온도와 수분의 손실을 다룰 때 불필요한 힘을 줄인다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 손실억제를 재료 적응 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['재료 적응', '온도와 수분의 손실'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0678'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 온도와 수분의 손실을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 손실억제가 필요한 위치에 닿지 않는다.', '{u}은(는) 손실억제를 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 손실억제의 범위와 출력을 정확히 맞춘다.', '{u}의 손실억제가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 손실억제를 중단한다.', '{u}의 손실억제가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0678', name:'겹층보존', en:'Specimen Preserver Sequence', scope:'class', cls:'CLS_C068',
    grade:2, rarity:3, tier:2, desc:'여러 보존층을 나눠 표본의 노출을 줄인다. 밀폐 용기와 냉각 조건이 필요하다.', lore:'생체 표본 운송 계약에서 겹층보존을 심화 가공 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['심화 가공', '온도와 수분의 손실', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C026', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0679'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 여러 보존층을 나눠 표본의 노출을 줄인다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹층보존이 필요한 위치에 닿지 않는다.', '{u}은(는) 겹층보존을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹층보존의 범위와 출력을 정확히 맞춘다.', '{u}의 겹층보존이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 겹층보존을 중단한다.', '{u}의 겹층보존이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0679', name:'일괄냉각', en:'Specimen Preserver Coverage', scope:'class', cls:'CLS_C068',
    grade:3, rarity:3, tier:3, desc:'표본 둘의 냉각 기준을 순서대로 맞춘다. 살아 있는 사람을 냉각하는 용도로 쓰지 않는다.', lore:'생체 표본 운송 계약에서 일괄냉각을 공동 작업 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['공동 작업', '온도와 수분의 손실', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C026', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0680'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표본 둘의 냉각 기준을 순서대로 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 일괄냉각이 필요한 위치에 닿지 않는다.', '{u}은(는) 일괄냉각을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 일괄냉각의 범위와 출력을 정확히 맞춘다.', '{u}의 일괄냉각이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 일괄냉각을 중단한다.', '{u}의 일괄냉각이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0680', name:'밀봉풀림감', en:'Specimen Preserver Feedback', scope:'class', cls:'CLS_C068',
    grade:4, rarity:3, tier:4, desc:'온도와 수분의 손실이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 부패한 조직을 되돌리지 못한다.', lore:'생체 표본 운송 계약에서 밀봉풀림감을 손상 징후 용도로 쓴다. 부패한 조직을 되돌리지 못한다.',
    tags:['손상 징후', '온도와 수분의 손실'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0671'], lines:{use:['{u}의 {s}이(가) 발동한다. 온도와 수분의 손실이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 밀봉풀림감이 필요한 위치에 닿지 않는다.', '{u}은(는) 밀봉풀림감을 멈추고 밀폐용기의 위치를 다시 잡는다.'], crit:['{u}은(는) 밀봉풀림감의 범위와 출력을 정확히 맞춘다.', '{u}의 밀봉풀림감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 밀폐용기의 상태가 맞지 않아 밀봉풀림감을 중단한다.', '{u}의 밀봉풀림감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0681', name:'표층감정', en:'Material Appraiser Contact', scope:'class', cls:'CLS_C069',
    grade:2, rarity:1, tier:1, desc:'렌즈와 마력으로 소재 표면의 품질 차이를 읽는다. 내부 성질 전체를 확정하지 못한다.', lore:'회수 소재 등급 감정에서 표층감정을 단일 작업 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['단일 작업', '표면과 내부의 품질 차이', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0682'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 렌즈와 마력으로 소재 표면의 품질 차이를 읽는다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 표층감정이 필요한 위치에 닿지 않는다.', '{u}은(는) 표층감정을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 표층감정의 범위와 출력을 정확히 맞춘다.', '{u}의 표층감정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 표층감정을 중단한다.', '{u}의 표층감정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0682', name:'감정광가림', en:'Material Appraiser Guard', scope:'class', cls:'CLS_C069',
    grade:1, rarity:1, tier:1, desc:'감정렌즈를 든 손과 작업면 사이에 얇은 보호층을 둔다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 감정광가림을 작업자 방호 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['작업자 방호', '표면과 내부의 품질 차이'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0683'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 감정렌즈를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 감정광가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 감정광가림을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 감정광가림의 범위와 출력을 정확히 맞춘다.', '{u}의 감정광가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 감정광가림을 중단한다.', '{u}의 감정광가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0683', name:'의심점표시', en:'Material Appraiser Set', scope:'class', cls:'CLS_C069',
    grade:1, rarity:1, tier:1, desc:'표면과 내부의 품질 차이이 어긋나지 않도록 작업면을 임시로 고정한다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 의심점표시를 작업면 고정 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['작업면 고정', '표면과 내부의 품질 차이', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0684'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표면과 내부의 품질 차이이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 의심점표시가 필요한 위치에 닿지 않는다.', '{u}은(는) 의심점표시를 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 의심점표시의 범위와 출력을 정확히 맞춘다.', '{u}의 의심점표시가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 의심점표시를 중단한다.', '{u}의 의심점표시가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0684', name:'감정각옮김', en:'Material Appraiser Step', scope:'class', cls:'CLS_C069',
    grade:2, rarity:1, tier:1, desc:'작업물과 감정렌즈의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'회수 소재 등급 감정에서 감정각옮김을 안전 운반 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['안전 운반', '표면과 내부의 품질 차이'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:7, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0685'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 감정렌즈의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 감정각옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 감정각옮김을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 감정각옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 감정각옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 감정각옮김을 중단한다.', '{u}의 감정각옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0685', name:'혼입물눈', en:'Material Appraiser Reading', scope:'class', cls:'CLS_C069',
    grade:1, rarity:1, tier:1, desc:'표면과 내부의 품질 차이의 차이를 읽어 작업 전 품질을 살핀다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 혼입물눈을 품질 감지 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['품질 감지', '표면과 내부의 품질 차이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0686'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면과 내부의 품질 차이의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 혼입물눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 혼입물눈을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 혼입물눈의 범위와 출력을 정확히 맞춘다.', '{u}의 혼입물눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 혼입물눈을 중단한다.', '{u}의 혼입물눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0686', name:'빛각기억', en:'Material Appraiser Discipline', scope:'class', cls:'CLS_C069',
    grade:1, rarity:1, tier:1, desc:'표면과 내부의 품질 차이에 맞는 작업 순서를 손에 익힌다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 빛각기억을 공정 기억 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['공정 기억', '표면과 내부의 품질 차이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0687'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면과 내부의 품질 차이에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 빛각기억이 필요한 위치에 닿지 않는다.', '{u}은(는) 빛각기억을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 빛각기억의 범위와 출력을 정확히 맞춘다.', '{u}의 빛각기억이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 빛각기억을 중단한다.', '{u}의 빛각기억이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0687', name:'결구별', en:'Material Appraiser Foundation', scope:'class', cls:'CLS_C069',
    grade:2, rarity:1, tier:1, desc:'표면과 내부의 품질 차이를 다룰 때 불필요한 힘을 줄인다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 결구별을 재료 적응 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['재료 적응', '표면과 내부의 품질 차이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0688'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 표면과 내부의 품질 차이를 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 결구별이 필요한 위치에 닿지 않는다.', '{u}은(는) 결구별을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 결구별의 범위와 출력을 정확히 맞춘다.', '{u}의 결구별이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 결구별을 중단한다.', '{u}의 결구별이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0688', name:'심부대조', en:'Material Appraiser Sequence', scope:'class', cls:'CLS_C069',
    grade:2, rarity:3, tier:2, desc:'표면 관찰과 얕은 내부 반응을 대조한다. 인증 검사를 대신하지 못한다.', lore:'회수 소재 등급 감정에서 심부대조를 심화 가공 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['심화 가공', '표면과 내부의 품질 차이', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:18, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0689'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 표면 관찰과 얕은 내부 반응을 대조한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 심부대조가 필요한 위치에 닿지 않는다.', '{u}은(는) 심부대조를 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 심부대조의 범위와 출력을 정확히 맞춘다.', '{u}의 심부대조가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 심부대조를 중단한다.', '{u}의 심부대조가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0689', name:'공동분류', en:'Material Appraiser Coverage', scope:'class', cls:'CLS_C069',
    grade:3, rarity:3, tier:3, desc:'동료 둘과 같은 기준으로 회수품을 분류한다. 분류가 시장 가격을 보장하지는 않는다.', lore:'회수 소재 등급 감정에서 공동분류를 공동 작업 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['공동 작업', '표면과 내부의 품질 차이', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:16, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0690'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘과 같은 기준으로 회수품을 분류한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동분류가 필요한 위치에 닿지 않는다.', '{u}은(는) 공동분류를 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동분류의 범위와 출력을 정확히 맞춘다.', '{u}의 공동분류가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 공동분류를 중단한다.', '{u}의 공동분류가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0690', name:'품질변화감', en:'Material Appraiser Feedback', scope:'class', cls:'CLS_C069',
    grade:4, rarity:3, tier:4, desc:'표면과 내부의 품질 차이이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 모든 숨은 성질을 한 번에 알지 못한다.', lore:'회수 소재 등급 감정에서 품질변화감을 손상 징후 용도로 쓴다. 모든 숨은 성질을 한 번에 알지 못한다.',
    tags:['손상 징후', '표면과 내부의 품질 차이'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0681'], lines:{use:['{u}의 {s}이(가) 발동한다. 표면과 내부의 품질 차이이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 품질변화감이 필요한 위치에 닿지 않는다.', '{u}은(는) 품질변화감을 멈추고 감정렌즈의 위치를 다시 잡는다.'], crit:['{u}은(는) 품질변화감의 범위와 출력을 정확히 맞춘다.', '{u}의 품질변화감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 감정렌즈의 상태가 맞지 않아 품질변화감을 중단한다.', '{u}의 품질변화감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0691', name:'경계가르기', en:'Salvage Dismantler Contact', scope:'class', cls:'CLS_C070',
    grade:2, rarity:1, tier:1, desc:'서로 다른 조직의 경계를 따라 절개한다. 독낭과 장기를 건드리면 오염될 수 있다.', lore:'마수 사체 소재 회수에서 경계가르기를 단일 작업 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['단일 작업', '서로 붙은 조직의 경계', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0692'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 다른 조직의 경계를 따라 절개한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 경계가르기가 필요한 위치에 닿지 않는다.', '{u}은(는) 경계가르기를 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 경계가르기의 범위와 출력을 정확히 맞춘다.', '{u}의 경계가르기가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 경계가르기를 중단한다.', '{u}의 경계가르기가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0692', name:'해체비말막', en:'Salvage Dismantler Guard', scope:'class', cls:'CLS_C070',
    grade:1, rarity:1, tier:1, desc:'해체톱을 든 손과 작업면 사이에 얇은 보호층을 둔다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 해체비말막을 작업자 방호 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['작업자 방호', '서로 붙은 조직의 경계'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.65, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0693'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 해체톱을 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 해체비말막이 필요한 위치에 닿지 않는다.', '{u}은(는) 해체비말막을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 해체비말막의 범위와 출력을 정확히 맞춘다.', '{u}의 해체비말막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 해체비말막을 중단한다.', '{u}의 해체비말막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0693', name:'절개면고정', en:'Salvage Dismantler Set', scope:'class', cls:'CLS_C070',
    grade:1, rarity:1, tier:1, desc:'서로 붙은 조직의 경계이 어긋나지 않도록 작업면을 임시로 고정한다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 절개면고정을 작업면 고정 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['작업면 고정', '서로 붙은 조직의 경계', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0694'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 서로 붙은 조직의 경계이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 절개면고정이 필요한 위치에 닿지 않는다.', '{u}은(는) 절개면고정을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 절개면고정의 범위와 출력을 정확히 맞춘다.', '{u}의 절개면고정이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 절개면고정을 중단한다.', '{u}의 절개면고정이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0694', name:'해체각옮김', en:'Salvage Dismantler Step', scope:'class', cls:'CLS_C070',
    grade:2, rarity:1, tier:1, desc:'작업물과 해체톱의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'마수 사체 소재 회수에서 해체각옮김을 안전 운반 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['안전 운반', '서로 붙은 조직의 경계'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:8, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0695'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 해체톱의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 해체각옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 해체각옮김을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 해체각옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 해체각옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 해체각옮김을 중단한다.', '{u}의 해체각옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0695', name:'조직경계눈', en:'Salvage Dismantler Reading', scope:'class', cls:'CLS_C070',
    grade:1, rarity:1, tier:1, desc:'서로 붙은 조직의 경계의 차이를 읽어 작업 전 품질을 살핀다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 조직경계눈을 품질 감지 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['품질 감지', '서로 붙은 조직의 경계'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0696'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 서로 붙은 조직의 경계의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 조직경계눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 조직경계눈을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 조직경계눈의 범위와 출력을 정확히 맞춘다.', '{u}의 조직경계눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 조직경계눈을 중단한다.', '{u}의 조직경계눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0696', name:'독낭경계', en:'Salvage Dismantler Discipline', scope:'class', cls:'CLS_C070',
    grade:1, rarity:1, tier:1, desc:'서로 붙은 조직의 경계에 맞는 작업 순서를 손에 익힌다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 독낭경계를 공정 기억 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['공정 기억', '서로 붙은 조직의 경계'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0697'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 서로 붙은 조직의 경계에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 독낭경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 독낭경계를 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 독낭경계의 범위와 출력을 정확히 맞춘다.', '{u}의 독낭경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 독낭경계를 중단한다.', '{u}의 독낭경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0697', name:'절개저항감', en:'Salvage Dismantler Foundation', scope:'class', cls:'CLS_C070',
    grade:2, rarity:1, tier:1, desc:'서로 붙은 조직의 경계를 다룰 때 불필요한 힘을 줄인다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 절개저항감을 재료 적응 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['재료 적응', '서로 붙은 조직의 경계'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0698'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 서로 붙은 조직의 경계를 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 절개저항감이 필요한 위치에 닿지 않는다.', '{u}은(는) 절개저항감을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 절개저항감의 범위와 출력을 정확히 맞춘다.', '{u}의 절개저항감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 절개저항감을 중단한다.', '{u}의 절개저항감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0698', name:'겹조직분리', en:'Salvage Dismantler Sequence', scope:'class', cls:'CLS_C070',
    grade:2, rarity:3, tier:2, desc:'겹친 조직을 다른 방향으로 나눠 분리한다. 죽은 마수와 확보된 작업 공간이 필요하다.', lore:'마수 사체 소재 회수에서 겹조직분리를 심화 가공 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['심화 가공', '서로 붙은 조직의 경계', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:19, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0699'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 겹친 조직을 다른 방향으로 나눠 분리한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 겹조직분리가 필요한 위치에 닿지 않는다.', '{u}은(는) 겹조직분리를 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 겹조직분리의 범위와 출력을 정확히 맞춘다.', '{u}의 겹조직분리가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 겹조직분리를 중단한다.', '{u}의 겹조직분리가 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0699', name:'공동해체선', en:'Salvage Dismantler Coverage', scope:'class', cls:'CLS_C070',
    grade:3, rarity:3, tier:3, desc:'동료 둘과 겹치지 않도록 해체선을 맞춘다. 사체의 안전 검사는 별도로 해야 한다.', lore:'마수 사체 소재 회수에서 공동해체선을 공동 작업 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['공동 작업', '서로 붙은 조직의 경계', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:17, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0700'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘과 겹치지 않도록 해체선을 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동해체선이 필요한 위치에 닿지 않는다.', '{u}은(는) 공동해체선을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동해체선의 범위와 출력을 정확히 맞춘다.', '{u}의 공동해체선이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 공동해체선을 중단한다.', '{u}의 공동해체선이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0700', name:'파열전조감', en:'Salvage Dismantler Feedback', scope:'class', cls:'CLS_C070',
    grade:4, rarity:3, tier:4, desc:'서로 붙은 조직의 경계이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 독낭을 건드리면 회수품이 오염된다.', lore:'마수 사체 소재 회수에서 파열전조감을 손상 징후 용도로 쓴다. 독낭을 건드리면 회수품이 오염된다.',
    tags:['손상 징후', '서로 붙은 조직의 경계'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0691'], lines:{use:['{u}의 {s}이(가) 발동한다. 서로 붙은 조직의 경계이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 파열전조감이 필요한 위치에 닿지 않는다.', '{u}은(는) 파열전조감을 멈추고 해체톱의 위치를 다시 잡는다.'], crit:['{u}은(는) 파열전조감의 범위와 출력을 정확히 맞춘다.', '{u}의 파열전조감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 해체톱의 상태가 맞지 않아 파열전조감을 중단한다.', '{u}의 파열전조감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0701', name:'접촉면맞춤', en:'Bonding Worker Contact', scope:'class', cls:'CLS_C071',
    grade:2, rarity:2, tier:1, desc:'끊어진 재료의 접촉면을 맞춰 고정한다. 소실된 부분은 보충재가 필요하다.', lore:'비전투 설비 응급 복구에서 접촉면맞춤을 단일 작업 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['단일 작업', '끊어진 재료의 접촉면', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0702'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 끊어진 재료의 접촉면을 맞춰 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접촉면맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 접촉면맞춤을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 접촉면맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 접촉면맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 접촉면맞춤을 중단한다.', '{u}의 접촉면맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0702', name:'접합열가림', en:'Bonding Worker Guard', scope:'class', cls:'CLS_C071',
    grade:1, rarity:2, tier:1, desc:'접합클램프를 든 손과 작업면 사이에 얇은 보호층을 둔다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 접합열가림을 작업자 방호 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['작업자 방호', '끊어진 재료의 접촉면'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.75, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0703'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 접합클램프를 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 접합열가림이 필요한 위치에 닿지 않는다.', '{u}은(는) 접합열가림을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 접합열가림의 범위와 출력을 정확히 맞춘다.', '{u}의 접합열가림이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 접합열가림을 중단한다.', '{u}의 접합열가림이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0703', name:'이음임시잠금', en:'Bonding Worker Set', scope:'class', cls:'CLS_C071',
    grade:1, rarity:2, tier:1, desc:'끊어진 재료의 접촉면이 어긋나지 않도록 작업면을 임시로 고정한다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 이음임시잠금을 작업면 고정 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['작업면 고정', '끊어진 재료의 접촉면', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0704'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 끊어진 재료의 접촉면이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 이음임시잠금이 필요한 위치에 닿지 않는다.', '{u}은(는) 이음임시잠금을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 이음임시잠금의 범위와 출력을 정확히 맞춘다.', '{u}의 이음임시잠금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 이음임시잠금을 중단한다.', '{u}의 이음임시잠금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0704', name:'지지대옮김', en:'Bonding Worker Step', scope:'class', cls:'CLS_C071',
    grade:2, rarity:2, tier:1, desc:'작업물과 접합클램프의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'비전투 설비 응급 복구에서 지지대옮김을 안전 운반 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['안전 운반', '끊어진 재료의 접촉면'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:9, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0705'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 접합클램프의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 지지대옮김이 필요한 위치에 닿지 않는다.', '{u}은(는) 지지대옮김을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 지지대옮김의 범위와 출력을 정확히 맞춘다.', '{u}의 지지대옮김이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 지지대옮김을 중단한다.', '{u}의 지지대옮김이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0705', name:'접촉면눈', en:'Bonding Worker Reading', scope:'class', cls:'CLS_C071',
    grade:1, rarity:2, tier:1, desc:'끊어진 재료의 접촉면의 차이를 읽어 작업 전 품질을 살핀다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 접촉면눈을 품질 감지 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['품질 감지', '끊어진 재료의 접촉면'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0706'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 끊어진 재료의 접촉면의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 접촉면눈이 필요한 위치에 닿지 않는다.', '{u}은(는) 접촉면눈을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 접촉면눈의 범위와 출력을 정확히 맞춘다.', '{u}의 접촉면눈이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 접촉면눈을 중단한다.', '{u}의 접촉면눈이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0706', name:'굳힘박자', en:'Bonding Worker Discipline', scope:'class', cls:'CLS_C071',
    grade:1, rarity:2, tier:1, desc:'끊어진 재료의 접촉면에 맞는 작업 순서를 손에 익힌다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 굳힘박자를 공정 기억 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['공정 기억', '끊어진 재료의 접촉면'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0707'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 끊어진 재료의 접촉면에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 굳힘박자가 필요한 위치에 닿지 않는다.', '{u}은(는) 굳힘박자를 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 굳힘박자의 범위와 출력을 정확히 맞춘다.', '{u}의 굳힘박자가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 굳힘박자를 중단한다.', '{u}의 굳힘박자가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0707', name:'이음응력감', en:'Bonding Worker Foundation', scope:'class', cls:'CLS_C071',
    grade:2, rarity:2, tier:1, desc:'끊어진 재료의 접촉면을 다룰 때 불필요한 힘을 줄인다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 이음응력감을 재료 적응 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['재료 적응', '끊어진 재료의 접촉면'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0708'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 끊어진 재료의 접촉면을 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 이음응력감이 필요한 위치에 닿지 않는다.', '{u}은(는) 이음응력감을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 이음응력감의 범위와 출력을 정확히 맞춘다.', '{u}의 이음응력감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 이음응력감을 중단한다.', '{u}의 이음응력감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0708', name:'다층접합', en:'Bonding Worker Sequence', scope:'class', cls:'CLS_C071',
    grade:2, rarity:3, tier:2, desc:'여러 접합층의 굳는 순서를 맞춘다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 다층접합을 심화 가공 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['심화 가공', '끊어진 재료의 접촉면', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:20, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0709'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 여러 접합층의 굳는 순서를 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다층접합이 필요한 위치에 닿지 않는다.', '{u}은(는) 다층접합을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 다층접합의 범위와 출력을 정확히 맞춘다.', '{u}의 다층접합이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 다층접합을 중단한다.', '{u}의 다층접합이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0709', name:'공동하중분담', en:'Bonding Worker Coverage', scope:'class', cls:'CLS_C071',
    grade:3, rarity:3, tier:3, desc:'동료 둘의 지지점에 작업 하중을 나눠 준다. 구조물의 안전을 보장하지는 못한다.', lore:'비전투 설비 응급 복구에서 공동하중분담을 공동 작업 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['공동 작업', '끊어진 재료의 접촉면', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:18, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0710'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘의 지지점에 작업 하중을 나눠 준다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 공동하중분담이 필요한 위치에 닿지 않는다.', '{u}은(는) 공동하중분담을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동하중분담의 범위와 출력을 정확히 맞춘다.', '{u}의 공동하중분담이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 공동하중분담을 중단한다.', '{u}의 공동하중분담이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0710', name:'이음벌어짐감', en:'Bonding Worker Feedback', scope:'class', cls:'CLS_C071',
    grade:4, rarity:3, tier:4, desc:'끊어진 재료의 접촉면이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 다른 재료끼리는 접합력이 낮다.', lore:'비전투 설비 응급 복구에서 이음벌어짐감을 손상 징후 용도로 쓴다. 다른 재료끼리는 접합력이 낮다.',
    tags:['손상 징후', '끊어진 재료의 접촉면'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0701'], lines:{use:['{u}의 {s}이(가) 발동한다. 끊어진 재료의 접촉면이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 이음벌어짐감이 필요한 위치에 닿지 않는다.', '{u}은(는) 이음벌어짐감을 멈추고 접합클램프의 위치를 다시 잡는다.'], crit:['{u}은(는) 이음벌어짐감의 범위와 출력을 정확히 맞춘다.', '{u}의 이음벌어짐감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 접합클램프의 상태가 맞지 않아 이음벌어짐감을 중단한다.', '{u}의 이음벌어짐감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0711', name:'출력선맞춤', en:'Charge Technician Contact', scope:'class', cls:'CLS_C072',
    grade:2, rarity:2, tier:1, desc:'마정석 전원의 출력선을 장비 규격에 맞춘다. 에너지를 새로 만들지 못한다.', lore:'마정석 전원 장비 정비에서 출력선맞춤을 단일 작업 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['단일 작업', '에너지원과 장비의 출력차', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:12, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0712'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 마정석 전원의 출력선을 장비 규격에 맞춘다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 출력선맞춤이 필요한 위치에 닿지 않는다.', '{u}은(는) 출력선맞춤을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 출력선맞춤의 범위와 출력을 정확히 맞춘다.', '{u}의 출력선맞춤이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 출력선맞춤을 중단한다.', '{u}의 출력선맞춤이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0712', name:'충전절연막', en:'Charge Technician Guard', scope:'class', cls:'CLS_C072',
    grade:1, rarity:2, tier:1, desc:'절연충전선을 든 손과 작업면 사이에 얇은 보호층을 둔다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 충전절연막을 작업자 방호 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['작업자 방호', '에너지원과 장비의 출력차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:11, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', shield:0.8500000000000001, se:[{se:'SE_C013', chance:1, turns:3}],
    daily:true, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.6},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0713'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 절연충전선을 든 손과 작업면 사이에 얇은 보호층을 둔다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 충전절연막이 필요한 위치에 닿지 않는다.', '{u}은(는) 충전절연막을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 충전절연막의 범위와 출력을 정확히 맞춘다.', '{u}의 충전절연막이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 충전절연막을 중단한다.', '{u}의 충전절연막이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0713', name:'전원임시잠금', en:'Charge Technician Set', scope:'class', cls:'CLS_C072',
    grade:1, rarity:2, tier:1, desc:'에너지원과 장비의 출력차이 어긋나지 않도록 작업면을 임시로 고정한다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 전원임시잠금을 작업면 고정 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['작업면 고정', '에너지원과 장비의 출력차', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:13, cd:3}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{mpAbove:0.25},
    risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0714'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 에너지원과 장비의 출력차이 어긋나지 않도록 작업면을 임시로 고정한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 전원임시잠금이 필요한 위치에 닿지 않는다.', '{u}은(는) 전원임시잠금을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 전원임시잠금의 범위와 출력을 정확히 맞춘다.', '{u}의 전원임시잠금이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 전원임시잠금을 중단한다.', '{u}의 전원임시잠금이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0714', name:'전원점교대', en:'Charge Technician Step', scope:'class', cls:'CLS_C072',
    grade:2, rarity:2, tier:1, desc:'작업물과 절연충전선의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다. 무게 자체를 없애지는 못한다.', lore:'마정석 전원 장비 정비에서 전원점교대를 안전 운반 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['안전 운반', '에너지원과 장비의 출력차'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:10, cd:2}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    maxLv:10, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], ai:{hpBelow:0.4}, risk:1,
    side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0715'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 작업물과 절연충전선의 하중을 몸 가까이 모아 안전한 지지점으로 옮긴다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 전원점교대가 필요한 위치에 닿지 않는다.', '{u}은(는) 전원점교대를 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 전원점교대의 범위와 출력을 정확히 맞춘다.', '{u}의 전원점교대가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 전원점교대를 중단한다.', '{u}의 전원점교대가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex', buff:{def:1.08, turns:2}
  },
  {
    id:'SK_C0715', name:'잔량읽음', en:'Charge Technician Reading', scope:'class', cls:'CLS_C072',
    grade:1, rarity:2, tier:1, desc:'에너지원과 장비의 출력차의 차이를 읽어 작업 전 품질을 살핀다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 잔량읽음을 품질 감지 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['품질 감지', '에너지원과 장비의 출력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'매번 접근하기 전에 주변 변화와 시야 안의 징후를 확인할 때', buff:{sense:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0716'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 에너지원과 장비의 출력차의 차이를 읽어 작업 전 품질을 살핀다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 잔량읽음이 필요한 위치에 닿지 않는다.', '{u}은(는) 잔량읽음을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔량읽음의 범위와 출력을 정확히 맞춘다.', '{u}의 잔량읽음이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 잔량읽음을 중단한다.', '{u}의 잔량읽음이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0716', name:'과열경계', en:'Charge Technician Discipline', scope:'class', cls:'CLS_C072',
    grade:1, rarity:2, tier:1, desc:'에너지원과 장비의 출력차에 맞는 작업 순서를 손에 익힌다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 과열경계를 공정 기억 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['공정 기억', '에너지원과 장비의 출력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'같은 자세와 작업 조건을 유지할 때', buff:{acc:1.06}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0717'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 에너지원과 장비의 출력차에 맞는 작업 순서를 손에 익힌다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 과열경계가 필요한 위치에 닿지 않는다.', '{u}은(는) 과열경계를 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 과열경계의 범위와 출력을 정확히 맞춘다.', '{u}의 과열경계가 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 과열경계를 중단한다.', '{u}의 과열경계가 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0717', name:'입출력감', en:'Charge Technician Foundation', scope:'class', cls:'CLS_C072',
    grade:2, rarity:2, tier:1, desc:'에너지원과 장비의 출력차를 다룰 때 불필요한 힘을 줄인다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 입출력감을 재료 적응 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['재료 적응', '에너지원과 장비의 출력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'장비를 점검하고 클래스의 기본 동작을 유지할 때', buff:{acc:1.08}, daily:true,
    maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], risk:1, combo:['SK_C0718'],
    lines:{use:['{u}의 {s}이(가) 발동한다. 에너지원과 장비의 출력차를 다룰 때 불필요한 힘을 줄인다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 입출력감이 필요한 위치에 닿지 않는다.', '{u}은(는) 입출력감을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 입출력감의 범위와 출력을 정확히 맞춘다.', '{u}의 입출력감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 입출력감을 중단한다.', '{u}의 입출력감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  },
  {
    id:'SK_C0718', name:'다단충전', en:'Charge Technician Sequence', scope:'class', cls:'CLS_C072',
    grade:2, rarity:3, tier:2, desc:'출력을 여러 단계로 나눠 장비를 충전한다. 맞는 마정석과 충전 회로가 필요하다.', lore:'마정석 전원 장비 정비에서 다단충전을 심화 가공 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['심화 가공', '에너지원과 장비의 출력차', '재료 필요'], kind:'액티브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    cost:{mp:21, cd:4}, scale:'STAT_SENSE', scale2:'ABL_A26', daily:true, se:[{se:'SE_C025', chance:1, turns:3}],
    buff:{acc:1.15, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:10, stat:{STAT_SENSE:12}, abl:{ABL_A26:8}},
    ai:{mpAbove:0.25}, risk:3, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0719'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 출력을 여러 단계로 나눠 장비를 충전한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 다단충전이 필요한 위치에 닿지 않는다.', '{u}은(는) 다단충전을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 다단충전의 범위와 출력을 정확히 맞춘다.', '{u}의 다단충전이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 다단충전을 중단한다.', '{u}의 다단충전이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0719', name:'분배전원', en:'Charge Technician Coverage', scope:'class', cls:'CLS_C072',
    grade:3, rarity:3, tier:3, desc:'동료 둘이 쓰는 장비의 전원을 순서대로 분배한다. 사람의 마력을 충전하지는 않는다.', lore:'마정석 전원 장비 정비에서 분배전원을 공동 작업 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['공동 작업', '에너지원과 장비의 출력차', '재료 필요'], kind:'액티브', target:'allies', range:'near', area:2,
    hits:1, count:2, power:0, acc:0, crit:0,
    cost:{mp:19, cd:5}, scale:'STAT_SENSE', scale2:'ABL_A26', se:[{se:'SE_C025', chance:1, turns:3}], daily:true,
    buff:{acc:1.08, turns:3}, maxLv:15, growth:{cost:-0.15, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:25, stat:{STAT_SENSE:15}, abl:{ABL_A26:10}},
    ai:{enemies:2}, risk:1, side:['작업 뒤 손끝 감각이 잠시 둔해진다.'], combo:['SK_C0720'], lines:{use:['{u}은(는) {s}에 필요한 장비와 간격을 확인한다.', '{u}은(는) 동료 둘이 쓰는 장비의 전원을 순서대로 분배한다.'], hit:['{u}의 {s}이(가) 필요한 지점에 작용한다.', '{u}은(는) {s}의 결과를 살피며 출력을 줄인다.'], miss:['{u}의 분배전원이 필요한 위치에 닿지 않는다.', '{u}은(는) 분배전원을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 분배전원의 범위와 출력을 정확히 맞춘다.', '{u}의 분배전원이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 분배전원을 중단한다.', '{u}의 분배전원이 끊긴다. {u}은(는) 남은 힘을 확인한다.']},
    src:'codex'
  },
  {
    id:'SK_C0720', name:'출력흔들림감', en:'Charge Technician Feedback', scope:'class', cls:'CLS_C072',
    grade:4, rarity:3, tier:4, desc:'에너지원과 장비의 출력차이 틀어지기 시작하는 징후를 작업 뒤 확인한다. 마정석이 없으면 에너지를 만들지 못한다.', lore:'마정석 전원 장비 정비에서 출력흔들림감을 손상 징후 용도로 쓴다. 마정석이 없으면 에너지를 만들지 못한다.',
    tags:['손상 징후', '에너지원과 장비의 출력차'], kind:'패시브', target:'self', range:'near', area:1,
    hits:1, count:1, power:0, acc:0, crit:0,
    scale:'STAT_SENSE', scale2:'ABL_A26', reaction:'타격 또는 지원이 끝난 뒤 다음 동작을 준비할 때', buff:{sense:1.06}, daily:true,
    maxLv:15, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], req:{lv:45, stat:{STAT_SENSE:18}, abl:{ABL_A26:12}}, risk:1,
    combo:['SK_C0711'], lines:{use:['{u}의 {s}이(가) 발동한다. 에너지원과 장비의 출력차이 틀어지기 시작하는 징후를 작업 뒤 확인한다.', '{u}은(는) {s}에 익숙한 순서로 작은 변화를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 조건 안에서 작용한다.', '{u}은(는) {s}의 징후를 읽고 자세를 고른다.'], miss:['{u}의 출력흔들림감이 필요한 위치에 닿지 않는다.', '{u}은(는) 출력흔들림감을 멈추고 절연충전선의 위치를 다시 잡는다.'], crit:['{u}은(는) 출력흔들림감의 범위와 출력을 정확히 맞춘다.', '{u}의 출력흔들림감이 적은 낭비로 필요한 지점에 작용한다.'], fail:['{u}은(는) 절연충전선의 상태가 맞지 않아 출력흔들림감을 중단한다.', '{u}의 출력흔들림감이 끊긴다. {u}은(는) 남은 힘을 확인한다.']}, src:'codex'
  }
]);
