/* Codex 01 · 공용 스킬 240개. 동의와 도구 및 환경의 제약을 생략하지 않는다. */

def('skills', [
  {
    id:'SK_C5001', name:'체온붙들기', en:'Heat Retention', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:2, rarity:2, tier:1, desc:'몸 가까이에 열이 빠져나가는 속도를 늦춘다. 젖은 옷은 먼저 갈아입어야 한다.',
    lore:'몸 가까이에 열이 빠져나가는 속도를 늦춘다. 젖은 옷은 먼저 갈아입어야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '체온붙들기'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C021', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 몸 가까이에 열이 빠져나가는 속도를 늦춘다.'], hit:['{u}의 체온붙들기가 확인한 범위 안에서 작용한다.', '{u}은(는) 체온붙들기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 체온붙들기가 필요한 지점을 놓친다.', '{u}은(는) 체온붙들기의 위치를 다시 잡는다.'], crit:['{u}은(는) 체온붙들기의 순서와 힘을 정확히 맞춘다.', '{u}의 체온붙들기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 체온붙들기를 중단한다.', '{u}은(는) 체온붙들기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5009']
  },
  {
    id:'SK_C5002', name:'찬바람가림', en:'Draft Cover', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'옷 안으로 파고드는 바람을 잠시 줄인다. 몸 전체를 밀폐하지는 못한다.',
    lore:'옷 안으로 파고드는 바람을 잠시 줄인다. 몸 전체를 밀폐하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '찬바람가림'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C013', chance:1, turns:2}],
    shield:0.4, daily:true, side:['연속 사용하면 머리가 무거워진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옷 안으로 파고드는 바람을 잠시 줄인다.'], hit:['{u}의 찬바람가림이 확인한 범위 안에서 작용한다.', '{u}은(는) 찬바람가림의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 찬바람가림이 필요한 지점을 놓친다.', '{u}은(는) 찬바람가림의 위치를 다시 잡는다.'], crit:['{u}은(는) 찬바람가림의 순서와 힘을 정확히 맞춘다.', '{u}의 찬바람가림이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 찬바람가림을 중단한다.', '{u}은(는) 찬바람가림을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5003', name:'갈증분배', en:'Thirst Pacing', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'남은 수분에 맞춰 움직임과 호흡을 고른다. 물을 마시는 일을 대신하지 못한다.',
    lore:'남은 수분에 맞춰 움직임과 호흡을 고른다. 물을 마시는 일을 대신하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '갈증분배'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 남은 수분에 맞춰 움직임과 호흡을 고른다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 갈증분배가 확인한 범위 안에서 작용한다.', '{u}은(는) 갈증분배의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 갈증분배가 필요한 지점을 놓친다.', '{u}은(는) 갈증분배의 위치를 다시 잡는다.'], crit:['{u}은(는) 갈증분배의 순서와 힘을 정확히 맞춘다.', '{u}의 갈증분배가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 갈증분배를 중단한다.', '{u}은(는) 갈증분배를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5004']
  },
  {
    id:'SK_C5004', name:'식수판별', en:'Water Screening', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'물의 냄새와 마력성 오염 징후를 살핀다. 미생물 안전까지 보장하지 못한다.',
    lore:'물의 냄새와 마력성 오염 징후를 살핀다. 미생물 안전까지 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '식수판별'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 물의 냄새와 마력성 오염 징후를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 식수판별이 확인한 범위 안에서 작용한다.', '{u}은(는) 식수판별의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 식수판별이 필요한 지점을 놓친다.', '{u}은(는) 식수판별의 위치를 다시 잡는다.'], crit:['{u}은(는) 식수판별의 순서와 힘을 정확히 맞춘다.', '{u}의 식수판별이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 식수판별을 중단한다.', '{u}은(는) 식수판별을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5003']
  },
  {
    id:'SK_C5005', name:'비상식분할', en:'Ration Split', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'남은 식량을 체력 소모와 인원에 맞춰 나눈다. 식량 자체가 늘어나지는 않는다.',
    lore:'남은 식량을 체력 소모와 인원에 맞춰 나눈다. 식량 자체가 늘어나지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '비상식분할'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C025', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 남은 식량을 체력 소모와 인원에 맞춰 나눈다.'], hit:['{u}의 비상식분할이 확인한 범위 안에서 작용한다.', '{u}은(는) 비상식분할의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 비상식분할이 필요한 지점을 놓친다.', '{u}은(는) 비상식분할의 위치를 다시 잡는다.'], crit:['{u}은(는) 비상식분할의 순서와 힘을 정확히 맞춘다.', '{u}의 비상식분할이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 비상식분할을 중단한다.', '{u}은(는) 비상식분할을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5006', name:'분진막기', en:'Dust Cover', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'마스크 주변의 큰 분진을 밀어낸다. 유독 가스를 걸러 내지는 못한다.',
    lore:'마스크 주변의 큰 분진을 밀어낸다. 유독 가스를 걸러 내지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '분진막기'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C013', chance:1, turns:2}],
    shield:0.4, daily:true, side:['연속 사용하면 머리가 무거워진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 마스크 주변의 큰 분진을 밀어낸다.'], hit:['{u}의 분진막기가 확인한 범위 안에서 작용한다.', '{u}은(는) 분진막기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 분진막기가 필요한 지점을 놓친다.', '{u}은(는) 분진막기의 위치를 다시 잡는다.'], crit:['{u}은(는) 분진막기의 순서와 힘을 정확히 맞춘다.', '{u}의 분진막기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 분진막기를 중단한다.', '{u}은(는) 분진막기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5007', name:'발열예방', en:'Heat Pacing', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'쉬는 간격을 조절해 더위로 흐트러진 동작을 고른다. 열사병에는 별도 처치가 필요하다.',
    lore:'쉬는 간격을 조절해 더위로 흐트러진 동작을 고른다. 열사병에는 별도 처치가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '발열예방'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 쉬는 간격을 조절해 더위로 흐트러진 동작을 고른다.'], hit:['{u}의 발열예방이 확인한 범위 안에서 작용한다.', '{u}은(는) 발열예방의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 발열예방이 필요한 지점을 놓친다.', '{u}은(는) 발열예방의 위치를 다시 잡는다.'], crit:['{u}은(는) 발열예방의 순서와 힘을 정확히 맞춘다.', '{u}의 발열예방이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 발열예방을 중단한다.', '{u}은(는) 발열예방을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5008', name:'손끝보온', en:'Finger Warming', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:2, rarity:1, tier:1, desc:'손끝으로 열이 빠져나가는 속도를 줄인다. 이미 생긴 동상을 낫게 하지는 못한다.',
    lore:'손끝으로 열이 빠져나가는 속도를 줄인다. 이미 생긴 동상을 낫게 하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '손끝보온'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C021', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 손끝으로 열이 빠져나가는 속도를 줄인다.'], hit:['{u}의 손끝보온이 확인한 범위 안에서 작용한다.', '{u}은(는) 손끝보온의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 손끝보온이 필요한 지점을 놓친다.', '{u}은(는) 손끝보온의 위치를 다시 잡는다.'], crit:['{u}은(는) 손끝보온의 순서와 힘을 정확히 맞춘다.', '{u}의 손끝보온이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손끝보온을 중단한다.', '{u}은(는) 손끝보온을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5009', name:'젖은옷말림', en:'Cloth Drying', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'옷 표면의 수분을 작은 바람으로 날린다. 밀폐 공간에서는 습기가 남는다.',
    lore:'옷 표면의 수분을 작은 바람으로 날린다. 밀폐 공간에서는 습기가 남는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '젖은옷말림'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C026', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옷 표면의 수분을 작은 바람으로 날린다.'], hit:['{u}의 젖은옷말림이 확인한 범위 안에서 작용한다.', '{u}은(는) 젖은옷말림의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 젖은옷말림이 필요한 지점을 놓친다.', '{u}은(는) 젖은옷말림의 위치를 다시 잡는다.'], crit:['{u}은(는) 젖은옷말림의 순서와 힘을 정확히 맞춘다.', '{u}의 젖은옷말림이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 젖은옷말림을 중단한다.', '{u}은(는) 젖은옷말림을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5001']
  },
  {
    id:'SK_C5010', name:'안전잠자리', en:'Rest Site Check', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:2, tier:1, desc:'낙하물과 물길을 살펴 누울 자리를 고른다. 지형이 변하면 다시 확인해야 한다.',
    lore:'낙하물과 물길을 살펴 누울 자리를 고른다. 지형이 변하면 다시 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '안전잠자리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 낙하물과 물길을 살펴 누울 자리를 고른다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 안전잠자리가 확인한 범위 안에서 작용한다.', '{u}은(는) 안전잠자리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 안전잠자리가 필요한 지점을 놓친다.', '{u}은(는) 안전잠자리의 위치를 다시 잡는다.'], crit:['{u}은(는) 안전잠자리의 순서와 힘을 정확히 맞춘다.', '{u}의 안전잠자리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 안전잠자리를 중단한다.', '{u}은(는) 안전잠자리를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5019']
  },
  {
    id:'SK_C5011', name:'낙하물경계', en:'Falling Debris Watch', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'천장 이음새와 먼지의 낙하를 먼저 살핀다. 소리 없는 붕괴를 모두 예측하지 못한다.',
    lore:'천장 이음새와 먼지의 낙하를 먼저 살핀다. 소리 없는 붕괴를 모두 예측하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '낙하물경계'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 천장 이음새와 먼지의 낙하를 먼저 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 낙하물경계가 확인한 범위 안에서 작용한다.', '{u}은(는) 낙하물경계의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 낙하물경계가 필요한 지점을 놓친다.', '{u}은(는) 낙하물경계의 위치를 다시 잡는다.'], crit:['{u}은(는) 낙하물경계의 순서와 힘을 정확히 맞춘다.', '{u}의 낙하물경계가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 낙하물경계를 중단한다.', '{u}은(는) 낙하물경계를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5012', name:'바닥온도촉', en:'Ground Temperature', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'발밑 온도 변화를 피부와 마력으로 읽는다. 두꺼운 절연 바닥에서는 둔해진다.',
    lore:'발밑 온도 변화를 피부와 마력으로 읽는다. 두꺼운 절연 바닥에서는 둔해진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '바닥온도촉'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 발밑 온도 변화를 피부와 마력으로 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 바닥온도촉이 확인한 범위 안에서 작용한다.', '{u}은(는) 바닥온도촉의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 바닥온도촉이 필요한 지점을 놓친다.', '{u}은(는) 바닥온도촉의 위치를 다시 잡는다.'], crit:['{u}은(는) 바닥온도촉의 순서와 힘을 정확히 맞춘다.', '{u}의 바닥온도촉이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 바닥온도촉을 중단한다.', '{u}은(는) 바닥온도촉을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5013', name:'들숨줄이기', en:'Shallow Intake', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'숨을 짧게 나눠 자극성 공기의 흡입을 잠시 줄인다. 산소 부족 구역에서는 사용할 수 없다.',
    lore:'숨을 짧게 나눠 자극성 공기의 흡입을 잠시 줄인다. 산소 부족 구역에서는 사용할 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '들숨줄이기'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 숨을 짧게 나눠 자극성 공기의 흡입을 잠시 줄인다.'], hit:['{u}의 들숨줄이기가 확인한 범위 안에서 작용한다.', '{u}은(는) 들숨줄이기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 들숨줄이기가 필요한 지점을 놓친다.', '{u}은(는) 들숨줄이기의 위치를 다시 잡는다.'], crit:['{u}은(는) 들숨줄이기의 순서와 힘을 정확히 맞춘다.', '{u}의 들숨줄이기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 들숨줄이기를 중단한다.', '{u}은(는) 들숨줄이기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5014', name:'해충털기', en:'Pest Shedding', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'옷에 붙은 작은 벌레를 약한 진동으로 턴다. 박힌 독침까지 뽑아 주지는 못한다.',
    lore:'옷에 붙은 작은 벌레를 약한 진동으로 턴다. 박힌 독침까지 뽑아 주지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '해충털기'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옷에 붙은 작은 벌레를 약한 진동으로 턴다.'], hit:['{u}의 해충털기가 확인한 범위 안에서 작용한다.', '{u}은(는) 해충털기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 해충털기가 필요한 지점을 놓친다.', '{u}은(는) 해충털기의 위치를 다시 잡는다.'], crit:['{u}은(는) 해충털기의 순서와 힘을 정확히 맞춘다.', '{u}의 해충털기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 해충털기를 중단한다.', '{u}은(는) 해충털기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5015', name:'비탈앉기', en:'Slope Rest', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:2, rarity:1, tier:1, desc:'경사면에서 체중을 낮춰 미끄러짐을 줄인다. 낙석이 오는 곳은 피해야 한다.',
    lore:'경사면에서 체중을 낮춰 미끄러짐을 줄인다. 낙석이 오는 곳은 피해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '비탈앉기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 경사면에서 체중을 낮춰 미끄러짐을 줄인다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 비탈앉기가 확인한 범위 안에서 작용한다.', '{u}은(는) 비탈앉기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 비탈앉기가 필요한 지점을 놓친다.', '{u}은(는) 비탈앉기의 위치를 다시 잡는다.'], crit:['{u}은(는) 비탈앉기의 순서와 힘을 정확히 맞춘다.', '{u}의 비탈앉기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 비탈앉기를 중단한다.', '{u}은(는) 비탈앉기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5016', name:'퇴로기억', en:'Exit Recall', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'지나온 갈림길과 표식을 순서대로 기억한다. 지형이 바뀌면 기억만으로 돌아갈 수 없다.',
    lore:'지나온 갈림길과 표식을 순서대로 기억한다. 지형이 바뀌면 기억만으로 돌아갈 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '퇴로기억'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 지나온 갈림길과 표식을 순서대로 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 퇴로기억이 확인한 범위 안에서 작용한다.', '{u}은(는) 퇴로기억의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 퇴로기억이 필요한 지점을 놓친다.', '{u}은(는) 퇴로기억의 위치를 다시 잡는다.'], crit:['{u}은(는) 퇴로기억의 순서와 힘을 정확히 맞춘다.', '{u}의 퇴로기억이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 퇴로기억을 중단한다.', '{u}은(는) 퇴로기억을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5017', name:'피로눈금', en:'Fatigue Gauge', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'손 떨림과 호흡 변화를 보고 소모를 가늠한다. 정확한 의료 진단은 할 수 없다.',
    lore:'손 떨림과 호흡 변화를 보고 소모를 가늠한다. 정확한 의료 진단은 할 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '피로눈금'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 손 떨림과 호흡 변화를 보고 소모를 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 피로눈금이 확인한 범위 안에서 작용한다.', '{u}은(는) 피로눈금의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 피로눈금이 필요한 지점을 놓친다.', '{u}은(는) 피로눈금의 위치를 다시 잡는다.'], crit:['{u}은(는) 피로눈금의 순서와 힘을 정확히 맞춘다.', '{u}의 피로눈금이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 피로눈금을 중단한다.', '{u}은(는) 피로눈금을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5018', name:'구조빛점', en:'Rescue Beacon', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'구조자가 알아볼 수 있는 작은 점멸광을 띄운다. 빛은 적에게도 보인다.',
    lore:'구조자가 알아볼 수 있는 작은 점멸광을 띄운다. 빛은 적에게도 보인다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '구조빛점'],
    risk:1, src:'codex', cost:{mp:6, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C024', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 구조자가 알아볼 수 있는 작은 점멸광을 띄운다.'], hit:['{u}의 구조빛점이 확인한 범위 안에서 작용한다.', '{u}은(는) 구조빛점의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 구조빛점이 필요한 지점을 놓친다.', '{u}은(는) 구조빛점의 위치를 다시 잡는다.'], crit:['{u}은(는) 구조빛점의 순서와 힘을 정확히 맞춘다.', '{u}의 구조빛점이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 구조빛점을 중단한다.', '{u}은(는) 구조빛점을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5020']
  },
  {
    id:'SK_C5019', name:'바람등지기', en:'Wind Shelter', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:2, tier:1, desc:'바람을 등지는 자세로 체열 손실을 줄인다. 방향이 바뀌면 자세도 바꿔야 한다.',
    lore:'바람을 등지는 자세로 체열 손실을 줄인다. 방향이 바뀌면 자세도 바꿔야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '바람등지기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 바람을 등지는 자세로 체열 손실을 줄인다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 바람등지기가 확인한 범위 안에서 작용한다.', '{u}은(는) 바람등지기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 바람등지기가 필요한 지점을 놓친다.', '{u}은(는) 바람등지기의 위치를 다시 잡는다.'], crit:['{u}은(는) 바람등지기의 순서와 힘을 정확히 맞춘다.', '{u}의 바람등지기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 바람등지기를 중단한다.', '{u}은(는) 바람등지기를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5010']
  },
  {
    id:'SK_C5020', name:'동행점검', en:'Buddy Check', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'출발 전 동료의 장비 고정과 이동 상태를 확인한다. 동료가 감춘 이상은 놓칠 수 있다.',
    lore:'출발 전 동료의 장비 고정과 이동 상태를 확인한다. 동료가 감춘 이상은 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '동행점검'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 출발 전 동료의 장비 고정과 이동 상태를 확인한다.'], hit:['{u}의 동행점검이 확인한 범위 안에서 작용한다.', '{u}은(는) 동행점검의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 동행점검이 필요한 지점을 놓친다.', '{u}은(는) 동행점검의 위치를 다시 잡는다.'], crit:['{u}은(는) 동행점검의 순서와 힘을 정확히 맞춘다.', '{u}의 동행점검이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 동행점검을 중단한다.', '{u}은(는) 동행점검을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5018']
  },
  {
    id:'SK_C5021', name:'손목고정', en:'Wrist Set', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:2, rarity:2, tier:1, desc:'타격 직전에 손목이 꺾이지 않도록 힘을 모은다. 팔꿈치 부상까지 보완하지 못한다.',
    lore:'타격 직전에 손목이 꺾이지 않도록 힘을 모은다. 팔꿈치 부상까지 보완하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '손목고정'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C014', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 타격 직전에 손목이 꺾이지 않도록 힘을 모은다.'], hit:['{u}의 손목고정이 확인한 범위 안에서 작용한다.', '{u}은(는) 손목고정의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 손목고정이 필요한 지점을 놓친다.', '{u}은(는) 손목고정의 위치를 다시 잡는다.'], crit:['{u}은(는) 손목고정의 순서와 힘을 정확히 맞춘다.', '{u}의 손목고정이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손목고정을 중단한다.', '{u}은(는) 손목고정을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5025']
  },
  {
    id:'SK_C5022', name:'칼집정리', en:'Sheath Clearance', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'무기를 빼는 동선에서 끈과 옷자락을 치운다. 기습을 미리 알아채는 능력은 없다.',
    lore:'무기를 빼는 동선에서 끈과 옷자락을 치운다. 기습을 미리 알아채는 능력은 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '칼집정리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 무기를 빼는 동선에서 끈과 옷자락을 치운다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 칼집정리가 확인한 범위 안에서 작용한다.', '{u}은(는) 칼집정리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 칼집정리가 필요한 지점을 놓친다.', '{u}은(는) 칼집정리의 위치를 다시 잡는다.'], crit:['{u}은(는) 칼집정리의 순서와 힘을 정확히 맞춘다.', '{u}의 칼집정리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 칼집정리를 중단한다.', '{u}은(는) 칼집정리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5023', name:'사각확인', en:'Blind Spot Check', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'공격 전에 아군과 엄폐물의 위치를 짧게 살핀다. 확인하는 동안 공격이 늦어진다.',
    lore:'공격 전에 아군과 엄폐물의 위치를 짧게 살핀다. 확인하는 동안 공격이 늦어진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '사각확인'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C016', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 공격 전에 아군과 엄폐물의 위치를 짧게 살핀다.'], hit:['{u}의 사각확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 사각확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 사각확인이 필요한 지점을 놓친다.', '{u}은(는) 사각확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 사각확인의 순서와 힘을 정확히 맞춘다.', '{u}의 사각확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 사각확인을 중단한다.', '{u}은(는) 사각확인을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5034']
  },
  {
    id:'SK_C5024', name:'방패모서리', en:'Shield Edge Brace', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'방패 모서리를 지지해 짧은 충격을 나눈다. 방패가 없으면 쓸 수 없다.',
    lore:'방패 모서리를 지지해 짧은 충격을 나눈다. 방패가 없으면 쓸 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '방패모서리'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C014', chance:1, turns:2}],
    shield:0.4, side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 방패 모서리를 지지해 짧은 충격을 나눈다.'], hit:['{u}의 방패모서리가 확인한 범위 안에서 작용한다.', '{u}은(는) 방패모서리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 방패모서리가 필요한 지점을 놓친다.', '{u}은(는) 방패모서리의 위치를 다시 잡는다.'], crit:['{u}은(는) 방패모서리의 순서와 힘을 정확히 맞춘다.', '{u}의 방패모서리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 방패모서리를 중단한다.', '{u}은(는) 방패모서리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5025', name:'반동호흡법', en:'Recoil Breathing', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'짧게 숨을 내쉬며 무기의 반동을 몸통으로 분산한다. 연속 사용하면 숨이 찬다.',
    lore:'짧게 숨을 내쉬며 무기의 반동을 몸통으로 분산한다. 연속 사용하면 숨이 찬다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '반동호흡법'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C017', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 짧게 숨을 내쉬며 무기의 반동을 몸통으로 분산한다.'], hit:['{u}의 반동호흡법이 확인한 범위 안에서 작용한다.', '{u}은(는) 반동호흡법의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 반동호흡법이 필요한 지점을 놓친다.', '{u}은(는) 반동호흡법의 위치를 다시 잡는다.'], crit:['{u}은(는) 반동호흡법의 순서와 힘을 정확히 맞춘다.', '{u}의 반동호흡법이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 반동호흡법을 중단한다.', '{u}은(는) 반동호흡법을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5021']
  },
  {
    id:'SK_C5026', name:'횡이동견제', en:'Lateral Feint', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'옆으로 한 걸음 비켜 적의 공격 방향을 흔든다. 발을 디딜 공간이 있어야 한다.',
    lore:'옆으로 한 걸음 비켜 적의 공격 방향을 흔든다. 발을 디딜 공간이 있어야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '횡이동견제'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옆으로 한 걸음 비켜 적의 공격 방향을 흔든다.'], hit:['{u}의 횡이동견제가 확인한 범위 안에서 작용한다.', '{u}은(는) 횡이동견제의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 횡이동견제가 필요한 지점을 놓친다.', '{u}은(는) 횡이동견제의 위치를 다시 잡는다.'], crit:['{u}은(는) 횡이동견제의 순서와 힘을 정확히 맞춘다.', '{u}의 횡이동견제가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 횡이동견제를 중단한다.', '{u}은(는) 횡이동견제를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5033']
  },
  {
    id:'SK_C5027', name:'손등쳐내기', en:'Hand Deflection', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'가까운 적의 손등을 쳐 공격선을 비튼다. 단단한 갑각에는 효과가 약하다.',
    lore:'가까운 적의 손등을 쳐 공격선을 비튼다. 단단한 갑각에는 효과가 약하다.', target:'enemy', range:'melee', area:1, hits:1,
    count:1, power:0.55, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '손등쳐내기'],
    risk:2, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C007', chance:0.6, turns:1}],
    kind2:'AK_MELEE', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 가까운 적의 손등을 쳐 공격선을 비튼다.'], hit:['{u}의 손등쳐내기가 {t}의 자세를 흔든다.', '{t}의 움직임이 손등쳐내기의 접촉에 잠깐 끊긴다.'], miss:['{t}이(가) 손등쳐내기의 범위에서 벗어난다.', '{u}의 손등쳐내기가 {t}에게 닿지 않는다.'], crit:['{u}은(는) 손등쳐내기의 순서와 힘을 정확히 맞춘다.', '{u}의 손등쳐내기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손등쳐내기를 중단한다.', '{u}은(는) 손등쳐내기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5028', name:'발치쓸기', en:'Low Sweep', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:2, rarity:1, tier:1, desc:'낮게 다리를 쓸어 중심을 흔든다. 체격 차이가 크면 넘어뜨리지 못한다.',
    lore:'낮게 다리를 쓸어 중심을 흔든다. 체격 차이가 크면 넘어뜨리지 못한다.', target:'enemy', range:'melee', area:1, hits:1,
    count:1, power:0.55, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '발치쓸기'],
    risk:2, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C007', chance:0.6, turns:1}],
    kind2:'AK_MELEE', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 낮게 다리를 쓸어 중심을 흔든다.'], hit:['{u}의 발치쓸기가 {t}의 자세를 흔든다.', '{t}의 움직임이 발치쓸기의 접촉에 잠깐 끊긴다.'], miss:['{t}이(가) 발치쓸기의 범위에서 벗어난다.', '{u}의 발치쓸기가 {t}에게 닿지 않는다.'], crit:['{u}은(는) 발치쓸기의 순서와 힘을 정확히 맞춘다.', '{u}의 발치쓸기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 발치쓸기를 중단한다.', '{u}은(는) 발치쓸기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5029', name:'무기끈풀기', en:'Weapon Sling Release', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'엉킨 무기끈을 짧은 손동작으로 풀어 낸다. 끈이 손상됐으면 다시 묶어야 한다.',
    lore:'엉킨 무기끈을 짧은 손동작으로 풀어 낸다. 끈이 손상됐으면 다시 묶어야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '무기끈풀기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 엉킨 무기끈을 짧은 손동작으로 풀어 낸다.'], hit:['{u}의 무기끈풀기가 확인한 범위 안에서 작용한다.', '{u}은(는) 무기끈풀기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 무기끈풀기가 필요한 지점을 놓친다.', '{u}은(는) 무기끈풀기의 위치를 다시 잡는다.'], crit:['{u}은(는) 무기끈풀기의 순서와 힘을 정확히 맞춘다.', '{u}의 무기끈풀기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 무기끈풀기를 중단한다.', '{u}은(는) 무기끈풀기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5030', name:'짧은기합', en:'Brief Call', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:2, tier:1, desc:'주변 동료가 알아들을 짧은 기합으로 공격 시점을 맞춘다. 소리가 적에게도 들린다.',
    lore:'주변 동료가 알아들을 짧은 기합으로 공격 시점을 맞춘다. 소리가 적에게도 들린다.', target:'allies', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '짧은기합'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C024', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 주변 동료가 알아들을 짧은 기합으로 공격 시점을 맞춘다.'], hit:['{u}의 짧은기합이 확인한 범위 안에서 작용한다.', '{u}은(는) 짧은기합의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 짧은기합이 필요한 지점을 놓친다.', '{u}은(는) 짧은기합의 위치를 다시 잡는다.'], crit:['{u}은(는) 짧은기합의 순서와 힘을 정확히 맞춘다.', '{u}의 짧은기합이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 짧은기합을 중단한다.', '{u}은(는) 짧은기합을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5031', name:'먼지견제', en:'Dust Feint', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'바닥의 마른 먼지를 적의 눈앞에 걷어 올린다. 눈이 없거나 바닥이 젖으면 효과가 약하다.',
    lore:'바닥의 마른 먼지를 적의 눈앞에 걷어 올린다. 눈이 없거나 바닥이 젖으면 효과가 약하다.', target:'enemy', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '먼지견제'],
    risk:2, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C008', chance:0.6, turns:1}],
    side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 바닥의 마른 먼지를 적의 눈앞에 걷어 올린다.'], hit:['{u}의 먼지견제가 확인한 범위 안에서 작용한다.', '{u}은(는) 먼지견제의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 먼지견제가 필요한 지점을 놓친다.', '{u}은(는) 먼지견제의 위치를 다시 잡는다.'], crit:['{u}은(는) 먼지견제의 순서와 힘을 정확히 맞춘다.', '{u}의 먼지견제가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 먼지견제를 중단한다.', '{u}은(는) 먼지견제를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5032', name:'무게옮기기', en:'Weight Shift', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'타격 전에 뒤꿈치에서 앞발로 무게를 옮긴다. 미끄러운 바닥에서는 오히려 위험하다.',
    lore:'타격 전에 뒤꿈치에서 앞발로 무게를 옮긴다. 미끄러운 바닥에서는 오히려 위험하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '무게옮기기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C016', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 타격 전에 뒤꿈치에서 앞발로 무게를 옮긴다.'], hit:['{u}의 무게옮기기가 확인한 범위 안에서 작용한다.', '{u}은(는) 무게옮기기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 무게옮기기가 필요한 지점을 놓친다.', '{u}은(는) 무게옮기기의 위치를 다시 잡는다.'], crit:['{u}은(는) 무게옮기기의 순서와 힘을 정확히 맞춘다.', '{u}의 무게옮기기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 무게옮기기를 중단한다.', '{u}은(는) 무게옮기기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5033', name:'옷자락빼기', en:'Cloth Release', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'걸린 옷자락을 몸을 틀며 빼낸다. 몸을 묶은 금속 구속에는 통하지 않는다.',
    lore:'걸린 옷자락을 몸을 틀며 빼낸다. 몸을 묶은 금속 구속에는 통하지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '옷자락빼기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, cleanse:['SE_C006'],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 걸린 옷자락을 몸을 틀며 빼낸다.'], hit:['{u}의 옷자락빼기가 확인한 범위 안에서 작용한다.', '{u}은(는) 옷자락빼기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 옷자락빼기가 필요한 지점을 놓친다.', '{u}은(는) 옷자락빼기의 위치를 다시 잡는다.'], crit:['{u}은(는) 옷자락빼기의 순서와 힘을 정확히 맞춘다.', '{u}의 옷자락빼기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 옷자락빼기를 중단한다.', '{u}은(는) 옷자락빼기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5026']
  },
  {
    id:'SK_C5034', name:'착탄자리눈', en:'Impact Reading', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'발사체가 닿은 위치로 다음 조준의 오차를 읽는다. 첫 사격에는 도움을 주지 못한다.',
    lore:'발사체가 닿은 위치로 다음 조준의 오차를 읽는다. 첫 사격에는 도움을 주지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '착탄자리눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 발사체가 닿은 위치로 다음 조준의 오차를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 착탄자리눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 착탄자리눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 착탄자리눈이 필요한 지점을 놓친다.', '{u}은(는) 착탄자리눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 착탄자리눈의 순서와 힘을 정확히 맞춘다.', '{u}의 착탄자리눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 착탄자리눈을 중단한다.', '{u}은(는) 착탄자리눈을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5023']
  },
  {
    id:'SK_C5035', name:'접촉예비', en:'Contact Ready', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:2, rarity:1, tier:1, desc:'적과 닿기 전에 팔과 턱의 위치를 고른다. 등 뒤의 접촉까지 막지는 못한다.',
    lore:'적과 닿기 전에 팔과 턱의 위치를 고른다. 등 뒤의 접촉까지 막지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '접촉예비'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C014', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 적과 닿기 전에 팔과 턱의 위치를 고른다.'], hit:['{u}의 접촉예비가 확인한 범위 안에서 작용한다.', '{u}은(는) 접촉예비의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 접촉예비가 필요한 지점을 놓친다.', '{u}은(는) 접촉예비의 위치를 다시 잡는다.'], crit:['{u}은(는) 접촉예비의 순서와 힘을 정확히 맞춘다.', '{u}의 접촉예비가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 접촉예비를 중단한다.', '{u}은(는) 접촉예비를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5036', name:'낮은팔막기', en:'Low Arm Guard', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'전완으로 낮은 공격을 받아 급소를 가린다. 맨팔에는 충격이 그대로 남는다.',
    lore:'전완으로 낮은 공격을 받아 급소를 가린다. 맨팔에는 충격이 그대로 남는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '낮은팔막기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C018', chance:1, turns:2}],
    shield:0.4, side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 전완으로 낮은 공격을 받아 급소를 가린다.'], hit:['{u}의 낮은팔막기가 확인한 범위 안에서 작용한다.', '{u}은(는) 낮은팔막기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 낮은팔막기가 필요한 지점을 놓친다.', '{u}은(는) 낮은팔막기의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은팔막기의 순서와 힘을 정확히 맞춘다.', '{u}의 낮은팔막기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 낮은팔막기를 중단한다.', '{u}은(는) 낮은팔막기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5037', name:'장비잡음눈', en:'Gear Noise Check', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'장비가 부딪히는 소리로 느슨한 부위를 알아챈다. 전투 소음이 크면 놓칠 수 있다.',
    lore:'장비가 부딪히는 소리로 느슨한 부위를 알아챈다. 전투 소음이 크면 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '장비잡음눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 장비가 부딪히는 소리로 느슨한 부위를 알아챈다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 장비잡음눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 장비잡음눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 장비잡음눈이 필요한 지점을 놓친다.', '{u}은(는) 장비잡음눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 장비잡음눈의 순서와 힘을 정확히 맞춘다.', '{u}의 장비잡음눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 장비잡음눈을 중단한다.', '{u}은(는) 장비잡음눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5038', name:'빈동작줄임', en:'Compact Motion', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'타격 전 불필요한 준비 동작을 덜어 낸다. 무거운 무기의 관성은 없애지 못한다.',
    lore:'타격 전 불필요한 준비 동작을 덜어 낸다. 무거운 무기의 관성은 없애지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '빈동작줄임'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 타격 전 불필요한 준비 동작을 덜어 낸다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 빈동작줄임이 확인한 범위 안에서 작용한다.', '{u}은(는) 빈동작줄임의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 빈동작줄임이 필요한 지점을 놓친다.', '{u}은(는) 빈동작줄임의 위치를 다시 잡는다.'], crit:['{u}은(는) 빈동작줄임의 순서와 힘을 정확히 맞춘다.', '{u}의 빈동작줄임이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 빈동작줄임을 중단한다.', '{u}은(는) 빈동작줄임을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5039', name:'선두교대', en:'Front Rotation', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:2, tier:1, desc:'동료와 신호를 맞춰 전열 자리를 바꾼다. 동료가 응답하지 않으면 멈춰야 한다.',
    lore:'동료와 신호를 맞춰 전열 자리를 바꾼다. 동료가 응답하지 않으면 멈춰야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '선두교대'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C024', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 동료와 신호를 맞춰 전열 자리를 바꾼다.'], hit:['{u}의 선두교대가 확인한 범위 안에서 작용한다.', '{u}은(는) 선두교대의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 선두교대가 필요한 지점을 놓친다.', '{u}은(는) 선두교대의 위치를 다시 잡는다.'], crit:['{u}은(는) 선두교대의 순서와 힘을 정확히 맞춘다.', '{u}의 선두교대가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 선두교대를 중단한다.', '{u}은(는) 선두교대를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5040']
  },
  {
    id:'SK_C5040', name:'급소가리기', en:'Vital Cover', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'목과 옆구리를 좁은 방호층으로 가린다. 사지 전체를 보호하지는 못한다.',
    lore:'목과 옆구리를 좁은 방호층으로 가린다. 사지 전체를 보호하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '급소가리기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C013', chance:1, turns:2}],
    shield:0.4, side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 목과 옆구리를 좁은 방호층으로 가린다.'], hit:['{u}의 급소가리기가 확인한 범위 안에서 작용한다.', '{u}은(는) 급소가리기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 급소가리기가 필요한 지점을 놓친다.', '{u}은(는) 급소가리기의 위치를 다시 잡는다.'], crit:['{u}은(는) 급소가리기의 순서와 힘을 정확히 맞춘다.', '{u}의 급소가리기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 급소가리기를 중단한다.', '{u}은(는) 급소가리기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5039']
  },
  {
    id:'SK_C5041', name:'미세기류눈', en:'Air Drift Sense', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:2, rarity:2, tier:1, desc:'피부에 닿는 작은 기류 차이를 읽는다. 거센 바람 속에서는 구별이 어렵다.',
    lore:'피부에 닿는 작은 기류 차이를 읽는다. 거센 바람 속에서는 구별이 어렵다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '미세기류눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 피부에 닿는 작은 기류 차이를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 미세기류눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 미세기류눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 미세기류눈이 필요한 지점을 놓친다.', '{u}은(는) 미세기류눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 미세기류눈의 순서와 힘을 정확히 맞춘다.', '{u}의 미세기류눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 미세기류눈을 중단한다.', '{u}은(는) 미세기류눈을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5046']
  },
  {
    id:'SK_C5042', name:'금속울림귀', en:'Metal Ring Sense', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'두드린 금속의 울림으로 빈 공간을 짐작한다. 복합 재료 내부를 정확히 보지는 못한다.',
    lore:'두드린 금속의 울림으로 빈 공간을 짐작한다. 복합 재료 내부를 정확히 보지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '금속울림귀'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 두드린 금속의 울림으로 빈 공간을 짐작한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 금속울림귀가 확인한 범위 안에서 작용한다.', '{u}은(는) 금속울림귀의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 금속울림귀가 필요한 지점을 놓친다.', '{u}은(는) 금속울림귀의 위치를 다시 잡는다.'], crit:['{u}은(는) 금속울림귀의 순서와 힘을 정확히 맞춘다.', '{u}의 금속울림귀가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 금속울림귀를 중단한다.', '{u}은(는) 금속울림귀를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5054']
  },
  {
    id:'SK_C5043', name:'마력잔점', en:'Mana Speck Trace', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'표면에 남은 작은 마력점을 살핀다. 오래된 흔적은 주변 잔류물과 섞인다.',
    lore:'표면에 남은 작은 마력점을 살핀다. 오래된 흔적은 주변 잔류물과 섞인다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '마력잔점'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 표면에 남은 작은 마력점을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 마력잔점이 확인한 범위 안에서 작용한다.', '{u}은(는) 마력잔점의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 마력잔점이 필요한 지점을 놓친다.', '{u}은(는) 마력잔점의 위치를 다시 잡는다.'], crit:['{u}은(는) 마력잔점의 순서와 힘을 정확히 맞춘다.', '{u}의 마력잔점이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 마력잔점을 중단한다.', '{u}은(는) 마력잔점을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5044', name:'물방울청취', en:'Drip Listening', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'반복되는 물방울 소리로 물길 방향을 찾는다. 반사음이 많으면 방향이 흐려진다.',
    lore:'반복되는 물방울 소리로 물길 방향을 찾는다. 반사음이 많으면 방향이 흐려진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '물방울청취'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 반복되는 물방울 소리로 물길 방향을 찾는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 물방울청취가 확인한 범위 안에서 작용한다.', '{u}은(는) 물방울청취의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 물방울청취가 필요한 지점을 놓친다.', '{u}은(는) 물방울청취의 위치를 다시 잡는다.'], crit:['{u}은(는) 물방울청취의 순서와 힘을 정확히 맞춘다.', '{u}의 물방울청취가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 물방울청취를 중단한다.', '{u}은(는) 물방울청취를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5045', name:'사람숨소리', en:'Human Breath Listen', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'조용한 곳에서 사람의 호흡 소리를 구별한다. 의식이 없고 호흡이 약하면 놓칠 수 있다.',
    lore:'조용한 곳에서 사람의 호흡 소리를 구별한다. 의식이 없고 호흡이 약하면 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '사람숨소리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 조용한 곳에서 사람의 호흡 소리를 구별한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 사람숨소리가 확인한 범위 안에서 작용한다.', '{u}은(는) 사람숨소리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 사람숨소리가 필요한 지점을 놓친다.', '{u}은(는) 사람숨소리의 위치를 다시 잡는다.'], crit:['{u}은(는) 사람숨소리의 순서와 힘을 정확히 맞춘다.', '{u}의 사람숨소리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 사람숨소리를 중단한다.', '{u}은(는) 사람숨소리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5046', name:'먼지흐름눈', en:'Dust Flow Sight', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'분진이 움직이는 방향으로 열린 틈을 짐작한다. 분진이 없으면 단서를 얻지 못한다.',
    lore:'분진이 움직이는 방향으로 열린 틈을 짐작한다. 분진이 없으면 단서를 얻지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '먼지흐름눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 분진이 움직이는 방향으로 열린 틈을 짐작한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 먼지흐름눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 먼지흐름눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 먼지흐름눈이 필요한 지점을 놓친다.', '{u}은(는) 먼지흐름눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 먼지흐름눈의 순서와 힘을 정확히 맞춘다.', '{u}의 먼지흐름눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 먼지흐름눈을 중단한다.', '{u}은(는) 먼지흐름눈을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5041']
  },
  {
    id:'SK_C5047', name:'열점확인', en:'Heat Spot Check', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'가까운 표면의 국소 온도 차이를 확인한다. 두꺼운 벽 너머의 생물을 보지는 못한다.',
    lore:'가까운 표면의 국소 온도 차이를 확인한다. 두꺼운 벽 너머의 생물을 보지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '열점확인'],
    risk:1, src:'codex', cost:{mp:6, cd:2}, ai:{mpAbove:0.2}, daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 가까운 표면의 국소 온도 차이를 확인한다.'], hit:['{u}의 열점확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 열점확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 열점확인이 필요한 지점을 놓친다.', '{u}은(는) 열점확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 열점확인의 순서와 힘을 정확히 맞춘다.', '{u}의 열점확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 열점확인을 중단한다.', '{u}은(는) 열점확인을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5052']
  },
  {
    id:'SK_C5048', name:'발자국대조', en:'Track Comparison', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:2, rarity:1, tier:1, desc:'크기와 깊이가 다른 발자국을 구분한다. 딱딱한 바닥에는 흔적이 적다.',
    lore:'크기와 깊이가 다른 발자국을 구분한다. 딱딱한 바닥에는 흔적이 적다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '발자국대조'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 크기와 깊이가 다른 발자국을 구분한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 발자국대조가 확인한 범위 안에서 작용한다.', '{u}은(는) 발자국대조의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 발자국대조가 필요한 지점을 놓친다.', '{u}은(는) 발자국대조의 위치를 다시 잡는다.'], crit:['{u}은(는) 발자국대조의 순서와 힘을 정확히 맞춘다.', '{u}의 발자국대조가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 발자국대조를 중단한다.', '{u}은(는) 발자국대조를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5060']
  },
  {
    id:'SK_C5049', name:'냄새분리', en:'Odor Sorting', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'겹친 냄새에서 익숙한 냄새 하나를 골라낸다. 마스크를 벗고 확인해서는 안 된다.',
    lore:'겹친 냄새에서 익숙한 냄새 하나를 골라낸다. 마스크를 벗고 확인해서는 안 된다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '냄새분리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 겹친 냄새에서 익숙한 냄새 하나를 골라낸다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 냄새분리가 확인한 범위 안에서 작용한다.', '{u}은(는) 냄새분리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 냄새분리가 필요한 지점을 놓친다.', '{u}은(는) 냄새분리의 위치를 다시 잡는다.'], crit:['{u}은(는) 냄새분리의 순서와 힘을 정확히 맞춘다.', '{u}의 냄새분리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 냄새분리를 중단한다.', '{u}은(는) 냄새분리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5050', name:'색번짐눈', en:'Color Bleed Sense', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:2, tier:1, desc:'액체나 천의 색 번짐을 보고 누출을 찾는다. 무색 물질은 별도 검사가 필요하다.',
    lore:'액체나 천의 색 번짐을 보고 누출을 찾는다. 무색 물질은 별도 검사가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '색번짐눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 액체나 천의 색 번짐을 보고 누출을 찾는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 색번짐눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 색번짐눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 색번짐눈이 필요한 지점을 놓친다.', '{u}은(는) 색번짐눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 색번짐눈의 순서와 힘을 정확히 맞춘다.', '{u}의 색번짐눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 색번짐눈을 중단한다.', '{u}은(는) 색번짐눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5051', name:'진동발바닥', en:'Sole Vibration', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'발바닥으로 전해지는 반복 진동을 읽는다. 두꺼운 쿠션 신발에서는 둔해진다.',
    lore:'발바닥으로 전해지는 반복 진동을 읽는다. 두꺼운 쿠션 신발에서는 둔해진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '진동발바닥'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 발바닥으로 전해지는 반복 진동을 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 진동발바닥이 확인한 범위 안에서 작용한다.', '{u}은(는) 진동발바닥의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 진동발바닥이 필요한 지점을 놓친다.', '{u}은(는) 진동발바닥의 위치를 다시 잡는다.'], crit:['{u}은(는) 진동발바닥의 순서와 힘을 정확히 맞춘다.', '{u}의 진동발바닥이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 진동발바닥을 중단한다.', '{u}은(는) 진동발바닥을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5052', name:'반사빛보기', en:'Reflection Scan', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'작은 반사광을 따라 돌출물과 젖은 면을 찾는다. 빛이 없으면 확인할 수 없다.',
    lore:'작은 반사광을 따라 돌출물과 젖은 면을 찾는다. 빛이 없으면 확인할 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '반사빛보기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 작은 반사광을 따라 돌출물과 젖은 면을 찾는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 반사빛보기가 확인한 범위 안에서 작용한다.', '{u}은(는) 반사빛보기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 반사빛보기가 필요한 지점을 놓친다.', '{u}은(는) 반사빛보기의 위치를 다시 잡는다.'], crit:['{u}은(는) 반사빛보기의 순서와 힘을 정확히 맞춘다.', '{u}의 반사빛보기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 반사빛보기를 중단한다.', '{u}은(는) 반사빛보기를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5047']
  },
  {
    id:'SK_C5053', name:'거리재확인', en:'Distance Recheck', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'시야 안의 기준물로 가까운 거리를 다시 잰다. 기준물이 움직이면 오차가 커진다.',
    lore:'시야 안의 기준물로 가까운 거리를 다시 잰다. 기준물이 움직이면 오차가 커진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '거리재확인'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C016', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 시야 안의 기준물로 가까운 거리를 다시 잰다.'], hit:['{u}의 거리재확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 거리재확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 거리재확인이 필요한 지점을 놓친다.', '{u}은(는) 거리재확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 거리재확인의 순서와 힘을 정확히 맞춘다.', '{u}의 거리재확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 거리재확인을 중단한다.', '{u}은(는) 거리재확인을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5054', name:'문틈살피기', en:'Door Gap Check', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'문 아래와 경첩의 변화를 살핀다. 반대편 전체 상황은 알 수 없다.',
    lore:'문 아래와 경첩의 변화를 살핀다. 반대편 전체 상황은 알 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '문틈살피기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 문 아래와 경첩의 변화를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 문틈살피기가 확인한 범위 안에서 작용한다.', '{u}은(는) 문틈살피기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 문틈살피기가 필요한 지점을 놓친다.', '{u}은(는) 문틈살피기의 위치를 다시 잡는다.'], crit:['{u}은(는) 문틈살피기의 순서와 힘을 정확히 맞춘다.', '{u}의 문틈살피기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 문틈살피기를 중단한다.', '{u}은(는) 문틈살피기를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5042']
  },
  {
    id:'SK_C5055', name:'그늘움직임', en:'Shade Motion', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:2, rarity:1, tier:1, desc:'그늘 가장자리의 변화를 보고 움직임을 찾는다. 조명 자체가 흔들리면 혼동하기 쉽다.',
    lore:'그늘 가장자리의 변화를 보고 움직임을 찾는다. 조명 자체가 흔들리면 혼동하기 쉽다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '그늘움직임'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 그늘 가장자리의 변화를 보고 움직임을 찾는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 그늘움직임이 확인한 범위 안에서 작용한다.', '{u}은(는) 그늘움직임의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 그늘움직임이 필요한 지점을 놓친다.', '{u}은(는) 그늘움직임의 위치를 다시 잡는다.'], crit:['{u}은(는) 그늘움직임의 순서와 힘을 정확히 맞춘다.', '{u}의 그늘움직임이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 그늘움직임을 중단한다.', '{u}은(는) 그늘움직임을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5056', name:'신호누락눈', en:'Signal Gap Watch', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'정해 둔 박자에서 빠진 동료의 응답을 알아챈다. 응답이 끊긴 이유까지 알지는 못한다.',
    lore:'정해 둔 박자에서 빠진 동료의 응답을 알아챈다. 응답이 끊긴 이유까지 알지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '신호누락눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 정해 둔 박자에서 빠진 동료의 응답을 알아챈다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 신호누락눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 신호누락눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 신호누락눈이 필요한 지점을 놓친다.', '{u}은(는) 신호누락눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 신호누락눈의 순서와 힘을 정확히 맞춘다.', '{u}의 신호누락눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 신호누락눈을 중단한다.', '{u}은(는) 신호누락눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5057', name:'균열가늠', en:'Crack Check', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'금의 폭과 먼지 흔적으로 최근 변화를 살핀다. 구조물 전체의 안전을 보장하지 못한다.',
    lore:'금의 폭과 먼지 흔적으로 최근 변화를 살핀다. 구조물 전체의 안전을 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '균열가늠'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 금의 폭과 먼지 흔적으로 최근 변화를 살핀다.'], hit:['{u}의 균열가늠이 확인한 범위 안에서 작용한다.', '{u}은(는) 균열가늠의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 균열가늠이 필요한 지점을 놓친다.', '{u}은(는) 균열가늠의 위치를 다시 잡는다.'], crit:['{u}은(는) 균열가늠의 순서와 힘을 정확히 맞춘다.', '{u}의 균열가늠이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 균열가늠을 중단한다.', '{u}은(는) 균열가늠을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5058', name:'무게차손', en:'Weight Difference', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'두 물건을 들어 미세한 무게 차이를 가늠한다. 정밀 저울을 대신할 수 없다.',
    lore:'두 물건을 들어 미세한 무게 차이를 가늠한다. 정밀 저울을 대신할 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '무게차손'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 두 물건을 들어 미세한 무게 차이를 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 무게차손이 확인한 범위 안에서 작용한다.', '{u}은(는) 무게차손의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 무게차손이 필요한 지점을 놓친다.', '{u}은(는) 무게차손의 위치를 다시 잡는다.'], crit:['{u}은(는) 무게차손의 순서와 힘을 정확히 맞춘다.', '{u}의 무게차손이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 무게차손을 중단한다.', '{u}은(는) 무게차손을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5059', name:'눈부심적응', en:'Glare Adjustment', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:2, tier:1, desc:'밝은 곳에서 시선을 나눠 윤곽을 유지한다. 강한 광선을 직접 보면 손상될 수 있다.',
    lore:'밝은 곳에서 시선을 나눠 윤곽을 유지한다. 강한 광선을 직접 보면 손상될 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '눈부심적응'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 밝은 곳에서 시선을 나눠 윤곽을 유지한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 눈부심적응이 확인한 범위 안에서 작용한다.', '{u}은(는) 눈부심적응의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 눈부심적응이 필요한 지점을 놓친다.', '{u}은(는) 눈부심적응의 위치를 다시 잡는다.'], crit:['{u}은(는) 눈부심적응의 순서와 힘을 정확히 맞춘다.', '{u}의 눈부심적응이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 눈부심적응을 중단한다.', '{u}은(는) 눈부심적응을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5060', name:'뒤따름확인', en:'Trailing Check', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'자기 걸음 사이에 섞이는 다른 발소리를 확인한다. 발소리를 내지 않는 상대는 놓칠 수 있다.',
    lore:'자기 걸음 사이에 섞이는 다른 발소리를 확인한다. 발소리를 내지 않는 상대는 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '뒤따름확인'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 자기 걸음 사이에 섞이는 다른 발소리를 확인한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 뒤따름확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 뒤따름확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 뒤따름확인이 필요한 지점을 놓친다.', '{u}은(는) 뒤따름확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 뒤따름확인의 순서와 힘을 정확히 맞춘다.', '{u}의 뒤따름확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 뒤따름확인을 중단한다.', '{u}은(는) 뒤따름확인을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5048']
  },
  {
    id:'SK_C5061', name:'압박보조', en:'Pressure Support', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:2, rarity:2, tier:1, desc:'동료의 상처를 누르는 손에 일정한 압력을 보태 얕은 출혈의 회복을 돕는다. 깊은 내부 출혈을 해결하지 못한다.',
    lore:'동료의 상처를 누르는 손에 일정한 압력을 보탠다. 깊은 내부 출혈을 해결하지 못한다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '압박보조'],
    risk:1, src:'codex', cost:{mp:10, cd:4}, ai:{allyHurt:true}, se:[{se:'SE_C019', chance:1, turns:2}],
    heal:0.15, daily:true, side:['연속 사용하면 머리가 무거워진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 동료의 상처를 누르는 손에 일정한 압력을 보태 얕은 출혈의 회복을 돕는다.'], hit:['{u}의 압박보조가 확인한 범위 안에서 작용한다.', '{u}은(는) 압박보조의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 압박보조가 필요한 지점을 놓친다.', '{u}은(는) 압박보조의 위치를 다시 잡는다.'], crit:['{u}은(는) 압박보조의 순서와 힘을 정확히 맞춘다.', '{u}의 압박보조가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 압박보조를 중단한다.', '{u}은(는) 압박보조를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5062']
  },
  {
    id:'SK_C5062', name:'붕대정렬', en:'Bandage Alignment', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'붕대가 겹치는 면을 고르게 맞춘다. 붕대와 처치 지식이 필요하다.',
    lore:'붕대가 겹치는 면을 고르게 맞춘다. 붕대와 처치 지식이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '붕대정렬'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C025', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 붕대가 겹치는 면을 고르게 맞춘다.'], hit:['{u}의 붕대정렬이 확인한 범위 안에서 작용한다.', '{u}은(는) 붕대정렬의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 붕대정렬이 필요한 지점을 놓친다.', '{u}은(는) 붕대정렬의 위치를 다시 잡는다.'], crit:['{u}은(는) 붕대정렬의 순서와 힘을 정확히 맞춘다.', '{u}의 붕대정렬이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 붕대정렬을 중단한다.', '{u}은(는) 붕대정렬을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5061']
  },
  {
    id:'SK_C5063', name:'체온덧막', en:'Thermal Support', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'후송 중인 동료의 체열 손실을 줄인다. 고체온 상태에는 쓰지 않는다.',
    lore:'후송 중인 동료의 체열 손실을 줄인다. 고체온 상태에는 쓰지 않는다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '체온덧막'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{allyHurt:true}, se:[{se:'SE_C021', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 후송 중인 동료의 체열 손실을 줄인다.'], hit:['{u}의 체온덧막이 확인한 범위 안에서 작용한다.', '{u}은(는) 체온덧막의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 체온덧막이 필요한 지점을 놓친다.', '{u}은(는) 체온덧막의 위치를 다시 잡는다.'], crit:['{u}은(는) 체온덧막의 순서와 힘을 정확히 맞춘다.', '{u}의 체온덧막이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 체온덧막을 중단한다.', '{u}은(는) 체온덧막을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5064', name:'떨림가라앉힘', en:'Tremor Ease', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'처치받는 동료의 긴장성 떨림을 줄인다. 독이나 신경 손상은 별도 처치가 필요하다.',
    lore:'처치받는 동료의 긴장성 떨림을 줄인다. 독이나 신경 손상은 별도 처치가 필요하다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '떨림가라앉힘'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 처치받는 동료의 긴장성 떨림을 줄인다.'], hit:['{u}의 떨림가라앉힘이 확인한 범위 안에서 작용한다.', '{u}은(는) 떨림가라앉힘의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 떨림가라앉힘이 필요한 지점을 놓친다.', '{u}은(는) 떨림가라앉힘의 위치를 다시 잡는다.'], crit:['{u}은(는) 떨림가라앉힘의 순서와 힘을 정확히 맞춘다.', '{u}의 떨림가라앉힘이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 떨림가라앉힘을 중단한다.', '{u}은(는) 떨림가라앉힘을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5065', name:'호흡관찰', en:'Breath Watch', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'호흡의 규칙성과 피부 변화를 계속 살핀다. 확정 진단은 의료진에게 맡겨야 한다.',
    lore:'호흡의 규칙성과 피부 변화를 계속 살핀다. 확정 진단은 의료진에게 맡겨야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '호흡관찰'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 호흡의 규칙성과 피부 변화를 계속 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 호흡관찰이 확인한 범위 안에서 작용한다.', '{u}은(는) 호흡관찰의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 호흡관찰이 필요한 지점을 놓친다.', '{u}은(는) 호흡관찰의 위치를 다시 잡는다.'], crit:['{u}은(는) 호흡관찰의 순서와 힘을 정확히 맞춘다.', '{u}의 호흡관찰이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 호흡관찰을 중단한다.', '{u}은(는) 호흡관찰을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5066']
  },
  {
    id:'SK_C5066', name:'얕은상처닫기', en:'Shallow Closure', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'깨끗한 얕은 상처의 가장자리를 붙인다. 오염된 상처를 그대로 닫으면 안 된다.',
    lore:'깨끗한 얕은 상처의 가장자리를 붙인다. 오염된 상처를 그대로 닫으면 안 된다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '얕은상처닫기'],
    risk:1, src:'codex', cost:{mp:10, cd:4}, ai:{allyHurt:true}, se:[{se:'SE_C019', chance:1, turns:2}],
    heal:0.45, daily:true, side:['연속 사용하면 머리가 무거워진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 깨끗한 얕은 상처의 가장자리를 붙인다.'], hit:['{u}의 얕은상처닫기가 확인한 범위 안에서 작용한다.', '{u}은(는) 얕은상처닫기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 얕은상처닫기가 필요한 지점을 놓친다.', '{u}은(는) 얕은상처닫기의 위치를 다시 잡는다.'], crit:['{u}은(는) 얕은상처닫기의 순서와 힘을 정확히 맞춘다.', '{u}의 얕은상처닫기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 얕은상처닫기를 중단한다.', '{u}은(는) 얕은상처닫기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5065']
  },
  {
    id:'SK_C5067', name:'상처표면씻기', en:'Surface Rinse', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'준비한 깨끗한 물로 상처 주변을 씻는 일을 돕는다. 박힌 이물질은 함부로 뽑지 않는다.',
    lore:'준비한 깨끗한 물로 상처 주변을 씻는 일을 돕는다. 박힌 이물질은 함부로 뽑지 않는다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '상처표면씻기'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{allyHurt:true}, daily:true,
    buff:{acc:1.05, turns:1}, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 준비한 깨끗한 물로 상처 주변을 씻는 일을 돕는다.'], hit:['{u}의 상처표면씻기가 확인한 범위 안에서 작용한다.', '{u}은(는) 상처표면씻기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 상처표면씻기가 필요한 지점을 놓친다.', '{u}은(는) 상처표면씻기의 위치를 다시 잡는다.'], crit:['{u}은(는) 상처표면씻기의 순서와 힘을 정확히 맞춘다.', '{u}의 상처표면씻기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 상처표면씻기를 중단한다.', '{u}은(는) 상처표면씻기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5068', name:'손열고르기', en:'Hand Temperature', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:2, rarity:1, tier:1, desc:'처치하는 손의 온도를 안정시킨다. 상처를 직접 치료하는 효과는 없다.',
    lore:'처치하는 손의 온도를 안정시킨다. 상처를 직접 치료하는 효과는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '손열고르기'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 처치하는 손의 온도를 안정시킨다.'], hit:['{u}의 손열고르기가 확인한 범위 안에서 작용한다.', '{u}은(는) 손열고르기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 손열고르기가 필요한 지점을 놓친다.', '{u}은(는) 손열고르기의 위치를 다시 잡는다.'], crit:['{u}은(는) 손열고르기의 순서와 힘을 정확히 맞춘다.', '{u}의 손열고르기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손열고르기를 중단한다.', '{u}은(는) 손열고르기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5069', name:'부목고정', en:'Splint Set', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'부목이 어긋나지 않도록 접점을 고정한다. 골절을 맞추는 기술은 아니다.',
    lore:'부목이 어긋나지 않도록 접점을 고정한다. 골절을 맞추는 기술은 아니다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '부목고정'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{allyHurt:true}, se:[{se:'SE_C028', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 부목이 어긋나지 않도록 접점을 고정한다.'], hit:['{u}의 부목고정이 확인한 범위 안에서 작용한다.', '{u}은(는) 부목고정의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 부목고정이 필요한 지점을 놓친다.', '{u}은(는) 부목고정의 위치를 다시 잡는다.'], crit:['{u}은(는) 부목고정의 순서와 힘을 정확히 맞춘다.', '{u}의 부목고정이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 부목고정을 중단한다.', '{u}은(는) 부목고정을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5079']
  },
  {
    id:'SK_C5070', name:'통증완화촉', en:'Pain Soothing Touch', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:2, tier:1, desc:'동료가 느끼는 얕은 통증을 잠시 줄인다. 통증이 줄어도 부상은 남는다.',
    lore:'동료가 느끼는 얕은 통증을 잠시 줄인다. 통증이 줄어도 부상은 남는다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '통증완화촉'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C023', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 동료가 느끼는 얕은 통증을 잠시 줄인다.'], hit:['{u}의 통증완화촉이 확인한 범위 안에서 작용한다.', '{u}은(는) 통증완화촉의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 통증완화촉이 필요한 지점을 놓친다.', '{u}은(는) 통증완화촉의 위치를 다시 잡는다.'], crit:['{u}은(는) 통증완화촉의 순서와 힘을 정확히 맞춘다.', '{u}의 통증완화촉이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 통증완화촉을 중단한다.', '{u}은(는) 통증완화촉을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5071', name:'처치집중', en:'Care Focus', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'주변 소음 속에서 처치 순서를 놓치지 않게 한다. 시야 밖의 위험을 알아채기 어려워진다.',
    lore:'주변 소음 속에서 처치 순서를 놓치지 않게 한다. 시야 밖의 위험을 알아채기 어려워진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '처치집중'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{allyHurt:true}, se:[{se:'SE_C016', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 주변 소음 속에서 처치 순서를 놓치지 않게 한다.'], hit:['{u}의 처치집중이 확인한 범위 안에서 작용한다.', '{u}은(는) 처치집중의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 처치집중이 필요한 지점을 놓친다.', '{u}은(는) 처치집중의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치집중의 순서와 힘을 정확히 맞춘다.', '{u}의 처치집중이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 처치집중을 중단한다.', '{u}은(는) 처치집중을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5072', name:'맥박비교', en:'Pulse Comparison', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'처치 전후의 맥박 차이를 비교한다. 순환 상태를 수치로 확정하지 못한다.',
    lore:'처치 전후의 맥박 차이를 비교한다. 순환 상태를 수치로 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '맥박비교'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 처치 전후의 맥박 차이를 비교한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 맥박비교가 확인한 범위 안에서 작용한다.', '{u}은(는) 맥박비교의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 맥박비교가 필요한 지점을 놓친다.', '{u}은(는) 맥박비교의 위치를 다시 잡는다.'], crit:['{u}은(는) 맥박비교의 순서와 힘을 정확히 맞춘다.', '{u}의 맥박비교가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 맥박비교를 중단한다.', '{u}은(는) 맥박비교를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5077']
  },
  {
    id:'SK_C5073', name:'열상오염눈', en:'Wound Contamination', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'상처 표면의 색과 냄새 변화를 살핀다. 눈에 안 보이는 감염은 놓칠 수 있다.',
    lore:'상처 표면의 색과 냄새 변화를 살핀다. 눈에 안 보이는 감염은 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '열상오염눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 상처 표면의 색과 냄새 변화를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 열상오염눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 열상오염눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 열상오염눈이 필요한 지점을 놓친다.', '{u}은(는) 열상오염눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 열상오염눈의 순서와 힘을 정확히 맞춘다.', '{u}의 열상오염눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 열상오염눈을 중단한다.', '{u}은(는) 열상오염눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5074', name:'눈자극덜기', en:'Eye Irritation Ease', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'깨끗한 물로 씻어 낸 눈 주변의 긴장을 풀어 준다. 박힌 이물질이나 화학 손상은 해결하지 못한다.',
    lore:'깨끗한 물로 씻어 낸 눈 주변의 긴장을 풀어 준다. 박힌 이물질이나 화학 손상은 해결하지 못한다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '눈자극덜기'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{allyHurt:true}, cleanse:['SE_C008'],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 깨끗한 물로 씻어 낸 눈 주변의 긴장을 풀어 준다.'], hit:['{u}의 눈자극덜기가 확인한 범위 안에서 작용한다.', '{u}은(는) 눈자극덜기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 눈자극덜기가 필요한 지점을 놓친다.', '{u}은(는) 눈자극덜기의 위치를 다시 잡는다.'], crit:['{u}은(는) 눈자극덜기의 순서와 힘을 정확히 맞춘다.', '{u}의 눈자극덜기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 눈자극덜기를 중단한다.', '{u}은(는) 눈자극덜기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5075', name:'독기털어냄', en:'Residue Shedding', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:2, rarity:1, tier:1, desc:'옷과 장비 표면에 묻은 약한 독성 잔류물을 턴다. 몸속으로 들어간 독에는 통하지 않는다.',
    lore:'옷과 장비 표면에 묻은 약한 독성 잔류물을 턴다. 몸속으로 들어간 독에는 통하지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '독기털어냄'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{allyHurt:true}, cleanse:['SE_C005'],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옷과 장비 표면에 묻은 약한 독성 잔류물을 턴다.'], hit:['{u}의 독기털어냄이 확인한 범위 안에서 작용한다.', '{u}은(는) 독기털어냄의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 독기털어냄이 필요한 지점을 놓친다.', '{u}은(는) 독기털어냄의 위치를 다시 잡는다.'], crit:['{u}은(는) 독기털어냄의 순서와 힘을 정확히 맞춘다.', '{u}의 독기털어냄이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 독기털어냄을 중단한다.', '{u}은(는) 독기털어냄을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5076', name:'회복자세', en:'Recovery Position', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'동료가 편하게 호흡할 수 있는 자세를 유지하도록 돕는다. 목과 척추 손상이 의심되면 움직임을 제한한다.',
    lore:'동료가 편하게 호흡할 수 있는 자세를 유지하도록 돕는다. 목과 척추 손상이 의심되면 움직임을 제한한다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '회복자세'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C019', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 동료가 편하게 호흡할 수 있는 자세를 유지하도록 돕는다.'], hit:['{u}의 회복자세가 확인한 범위 안에서 작용한다.', '{u}은(는) 회복자세의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 회복자세가 필요한 지점을 놓친다.', '{u}은(는) 회복자세의 위치를 다시 잡는다.'], crit:['{u}은(는) 회복자세의 순서와 힘을 정확히 맞춘다.', '{u}의 회복자세가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 회복자세를 중단한다.', '{u}은(는) 회복자세를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5077', name:'처치기록', en:'Care Record', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'처치 시각과 관찰한 변화를 순서대로 기억한다. 기록만으로 상태가 나아지지는 않는다.',
    lore:'처치 시각과 관찰한 변화를 순서대로 기억한다. 기록만으로 상태가 나아지지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '처치기록'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 처치 시각과 관찰한 변화를 순서대로 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 처치기록이 확인한 범위 안에서 작용한다.', '{u}은(는) 처치기록의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 처치기록이 필요한 지점을 놓친다.', '{u}은(는) 처치기록의 위치를 다시 잡는다.'], crit:['{u}은(는) 처치기록의 순서와 힘을 정확히 맞춘다.', '{u}의 처치기록이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 처치기록을 중단한다.', '{u}은(는) 처치기록을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5072']
  },
  {
    id:'SK_C5078', name:'안정들숨', en:'Steady Inhale', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'자기 호흡을 고르게 해 과호흡에 따른 떨림을 줄인다. 호흡기 질환을 치료하지 못한다.',
    lore:'자기 호흡을 고르게 해 과호흡에 따른 떨림을 줄인다. 호흡기 질환을 치료하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '안정들숨'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 자기 호흡을 고르게 해 과호흡에 따른 떨림을 줄인다.'], hit:['{u}의 안정들숨이 확인한 범위 안에서 작용한다.', '{u}은(는) 안정들숨의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 안정들숨이 필요한 지점을 놓친다.', '{u}은(는) 안정들숨의 위치를 다시 잡는다.'], crit:['{u}은(는) 안정들숨의 순서와 힘을 정확히 맞춘다.', '{u}의 안정들숨이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 안정들숨을 중단한다.', '{u}은(는) 안정들숨을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5079', name:'후송신호', en:'Evacuation Call', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:2, tier:1, desc:'부상 위치와 후송 필요를 짧은 빛으로 알린다. 의료진 도착을 보장하지 못한다.',
    lore:'부상 위치와 후송 필요를 짧은 빛으로 알린다. 의료진 도착을 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '후송신호'],
    risk:1, src:'codex', cost:{mp:6, cd:2}, ai:{allyHurt:true}, se:[{se:'SE_C024', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 부상 위치와 후송 필요를 짧은 빛으로 알린다.'], hit:['{u}의 후송신호가 확인한 범위 안에서 작용한다.', '{u}은(는) 후송신호의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 후송신호가 필요한 지점을 놓친다.', '{u}은(는) 후송신호의 위치를 다시 잡는다.'], crit:['{u}은(는) 후송신호의 순서와 힘을 정확히 맞춘다.', '{u}의 후송신호가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 후송신호를 중단한다.', '{u}은(는) 후송신호를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5069']
  },
  {
    id:'SK_C5080', name:'손목휴식', en:'Wrist Relief', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'과사용한 손목의 긴장을 휴식 중 풀어 준다. 손상된 인대는 회복 시간이 필요하다.',
    lore:'과사용한 손목의 긴장을 휴식 중 풀어 준다. 손상된 인대는 회복 시간이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '손목휴식'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{allyHurt:true}, se:[{se:'SE_C019', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 과사용한 손목의 긴장을 휴식 중 풀어 준다.'], hit:['{u}의 손목휴식이 확인한 범위 안에서 작용한다.', '{u}은(는) 손목휴식의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 손목휴식이 필요한 지점을 놓친다.', '{u}은(는) 손목휴식의 위치를 다시 잡는다.'], crit:['{u}은(는) 손목휴식의 순서와 힘을 정확히 맞춘다.', '{u}의 손목휴식이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손목휴식을 중단한다.', '{u}은(는) 손목휴식을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5081', name:'짧은옆딛기', en:'Short Sidestep', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:2, rarity:2, tier:1, desc:'옆으로 한 걸음 빠르게 옮긴다. 발판을 확인하지 않으면 넘어질 수 있다.',
    lore:'옆으로 한 걸음 빠르게 옮긴다. 발판을 확인하지 않으면 넘어질 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '짧은옆딛기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 옆으로 한 걸음 빠르게 옮긴다.'], hit:['{u}의 짧은옆딛기가 확인한 범위 안에서 작용한다.', '{u}은(는) 짧은옆딛기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 짧은옆딛기가 필요한 지점을 놓친다.', '{u}은(는) 짧은옆딛기의 위치를 다시 잡는다.'], crit:['{u}은(는) 짧은옆딛기의 순서와 힘을 정확히 맞춘다.', '{u}의 짧은옆딛기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 짧은옆딛기를 중단한다.', '{u}은(는) 짧은옆딛기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5082']
  },
  {
    id:'SK_C5082', name:'뒤꿈치빼기', en:'Heel Retreat', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'발뒤꿈치를 빼며 가까운 공격선에서 물러난다. 뒤가 막혀 있으면 쓸 수 없다.',
    lore:'발뒤꿈치를 빼며 가까운 공격선에서 물러난다. 뒤가 막혀 있으면 쓸 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '뒤꿈치빼기'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 발뒤꿈치를 빼며 가까운 공격선에서 물러난다.'], hit:['{u}의 뒤꿈치빼기가 확인한 범위 안에서 작용한다.', '{u}은(는) 뒤꿈치빼기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 뒤꿈치빼기가 필요한 지점을 놓친다.', '{u}은(는) 뒤꿈치빼기의 위치를 다시 잡는다.'], crit:['{u}은(는) 뒤꿈치빼기의 순서와 힘을 정확히 맞춘다.', '{u}의 뒤꿈치빼기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 뒤꿈치빼기를 중단한다.', '{u}은(는) 뒤꿈치빼기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5081']
  },
  {
    id:'SK_C5083', name:'낮은턱넘기', en:'Low Ledge Step', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'무릎 아래 턱을 짧게 딛고 넘어간다. 높은 벽을 오르지는 못한다.',
    lore:'무릎 아래 턱을 짧게 딛고 넘어간다. 높은 벽을 오르지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '낮은턱넘기'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'dash', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 무릎 아래 턱을 짧게 딛고 넘어간다.'], hit:['{u}의 낮은턱넘기가 확인한 범위 안에서 작용한다.', '{u}은(는) 낮은턱넘기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 낮은턱넘기가 필요한 지점을 놓친다.', '{u}은(는) 낮은턱넘기의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은턱넘기의 순서와 힘을 정확히 맞춘다.', '{u}의 낮은턱넘기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 낮은턱넘기를 중단한다.', '{u}은(는) 낮은턱넘기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5086']
  },
  {
    id:'SK_C5084', name:'난간쥐기', en:'Rail Grip', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'잡을 수 있는 난간에 손의 힘을 모은다. 난간 자체가 약하면 떨어질 수 있다.',
    lore:'잡을 수 있는 난간에 손의 힘을 모은다. 난간 자체가 약하면 떨어질 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '난간쥐기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C028', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 잡을 수 있는 난간에 손의 힘을 모은다.'], hit:['{u}의 난간쥐기가 확인한 범위 안에서 작용한다.', '{u}은(는) 난간쥐기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 난간쥐기가 필요한 지점을 놓친다.', '{u}은(는) 난간쥐기의 위치를 다시 잡는다.'], crit:['{u}은(는) 난간쥐기의 순서와 힘을 정확히 맞춘다.', '{u}의 난간쥐기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 난간쥐기를 중단한다.', '{u}은(는) 난간쥐기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5085', name:'진흙발빼기', en:'Mud Release', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'발바닥 접촉면을 줄여 진흙에서 발을 뺀다. 깊은 수렁에서는 지지점이 필요하다.',
    lore:'발바닥 접촉면을 줄여 진흙에서 발을 뺀다. 깊은 수렁에서는 지지점이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '진흙발빼기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, ai:{hpBelow:0.65}, cleanse:['SE_C006'],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 발바닥 접촉면을 줄여 진흙에서 발을 뺀다.'], hit:['{u}의 진흙발빼기가 확인한 범위 안에서 작용한다.', '{u}은(는) 진흙발빼기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 진흙발빼기가 필요한 지점을 놓친다.', '{u}은(는) 진흙발빼기의 위치를 다시 잡는다.'], crit:['{u}은(는) 진흙발빼기의 순서와 힘을 정확히 맞춘다.', '{u}의 진흙발빼기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 진흙발빼기를 중단한다.', '{u}은(는) 진흙발빼기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5086', name:'잔해발판', en:'Rubble Footing', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'흔들리는 잔해 위에 무게를 나눠 싣는다. 잔해가 붕괴하면 지탱하지 못한다.',
    lore:'흔들리는 잔해 위에 무게를 나눠 싣는다. 잔해가 붕괴하면 지탱하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '잔해발판'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 흔들리는 잔해 위에 무게를 나눠 싣는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 잔해발판이 확인한 범위 안에서 작용한다.', '{u}은(는) 잔해발판의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 잔해발판이 필요한 지점을 놓친다.', '{u}은(는) 잔해발판의 위치를 다시 잡는다.'], crit:['{u}은(는) 잔해발판의 순서와 힘을 정확히 맞춘다.', '{u}의 잔해발판이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 잔해발판을 중단한다.', '{u}은(는) 잔해발판을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5083']
  },
  {
    id:'SK_C5087', name:'줄타기균형', en:'Rope Balance', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'안전줄을 잡은 상태에서 몸의 흔들림을 줄인다. 안전 장비 없이 줄을 건너지 않는다.',
    lore:'안전줄을 잡은 상태에서 몸의 흔들림을 줄인다. 안전 장비 없이 줄을 건너지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '줄타기균형'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C017', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 안전줄을 잡은 상태에서 몸의 흔들림을 줄인다.'], hit:['{u}의 줄타기균형이 확인한 범위 안에서 작용한다.', '{u}은(는) 줄타기균형의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 줄타기균형이 필요한 지점을 놓친다.', '{u}은(는) 줄타기균형의 위치를 다시 잡는다.'], crit:['{u}은(는) 줄타기균형의 순서와 힘을 정확히 맞춘다.', '{u}의 줄타기균형이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 줄타기균형을 중단한다.', '{u}은(는) 줄타기균형을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5088', name:'좁은틈통과', en:'Narrow Passage', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:2, rarity:1, tier:1, desc:'장비를 몸 가까이 모아 좁은 틈을 지난다. 몸보다 좁은 구멍은 통과하지 못한다.',
    lore:'장비를 몸 가까이 모아 좁은 틈을 지난다. 몸보다 좁은 구멍은 통과하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '좁은틈통과'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'dash', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 장비를 몸 가까이 모아 좁은 틈을 지난다.'], hit:['{u}의 좁은틈통과가 확인한 범위 안에서 작용한다.', '{u}은(는) 좁은틈통과의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 좁은틈통과가 필요한 지점을 놓친다.', '{u}은(는) 좁은틈통과의 위치를 다시 잡는다.'], crit:['{u}은(는) 좁은틈통과의 순서와 힘을 정확히 맞춘다.', '{u}의 좁은틈통과가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 좁은틈통과를 중단한다.', '{u}은(는) 좁은틈통과를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5090']
  },
  {
    id:'SK_C5089', name:'착지무릎', en:'Landing Knees', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'낮은 높이에서 착지 충격을 다리로 나눈다. 높은 추락을 안전하게 만들지는 못한다.',
    lore:'낮은 높이에서 착지 충격을 다리로 나눈다. 높은 추락을 안전하게 만들지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '착지무릎'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 낮은 높이에서 착지 충격을 다리로 나눈다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 착지무릎이 확인한 범위 안에서 작용한다.', '{u}은(는) 착지무릎의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 착지무릎이 필요한 지점을 놓친다.', '{u}은(는) 착지무릎의 위치를 다시 잡는다.'], crit:['{u}은(는) 착지무릎의 순서와 힘을 정확히 맞춘다.', '{u}의 착지무릎이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 착지무릎을 중단한다.', '{u}은(는) 착지무릎을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5090', name:'가방고정', en:'Pack Stability', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:2, tier:1, desc:'가방이 흔들리지 않도록 등과 끈의 간격을 고른다. 과적 자체를 해결하지 못한다.',
    lore:'가방이 흔들리지 않도록 등과 끈의 간격을 고른다. 과적 자체를 해결하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '가방고정'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 가방이 흔들리지 않도록 등과 끈의 간격을 고른다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 가방고정이 확인한 범위 안에서 작용한다.', '{u}은(는) 가방고정의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 가방고정이 필요한 지점을 놓친다.', '{u}은(는) 가방고정의 위치를 다시 잡는다.'], crit:['{u}은(는) 가방고정의 순서와 힘을 정확히 맞춘다.', '{u}의 가방고정이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 가방고정을 중단한다.', '{u}은(는) 가방고정을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5088']
  },
  {
    id:'SK_C5091', name:'급정지보', en:'Stop Step', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'보폭을 나눠 짧은 거리에서 속도를 줄인다. 얼음 바닥에서는 제동이 늦다.',
    lore:'보폭을 나눠 짧은 거리에서 속도를 줄인다. 얼음 바닥에서는 제동이 늦다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '급정지보'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C014', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 보폭을 나눠 짧은 거리에서 속도를 줄인다.'], hit:['{u}의 급정지보가 확인한 범위 안에서 작용한다.', '{u}은(는) 급정지보의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 급정지보가 필요한 지점을 놓친다.', '{u}은(는) 급정지보의 위치를 다시 잡는다.'], crit:['{u}은(는) 급정지보의 순서와 힘을 정확히 맞춘다.', '{u}의 급정지보가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 급정지보를 중단한다.', '{u}은(는) 급정지보를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5092', name:'기둥돌아감', en:'Pillar Turn', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'기둥을 사이에 두고 상대의 접근선을 벗어난다. 기둥이 없으면 활용하지 못한다.',
    lore:'기둥을 사이에 두고 상대의 접근선을 벗어난다. 기둥이 없으면 활용하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '기둥돌아감'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C027', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 기둥을 사이에 두고 상대의 접근선을 벗어난다.'], hit:['{u}의 기둥돌아감이 확인한 범위 안에서 작용한다.', '{u}은(는) 기둥돌아감의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 기둥돌아감이 필요한 지점을 놓친다.', '{u}은(는) 기둥돌아감의 위치를 다시 잡는다.'], crit:['{u}은(는) 기둥돌아감의 순서와 힘을 정확히 맞춘다.', '{u}의 기둥돌아감이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 기둥돌아감을 중단한다.', '{u}은(는) 기둥돌아감을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5093', name:'계단박자', en:'Stair Rhythm', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'계단 높이에 맞춰 일정한 보폭을 유지한다. 파손된 계단은 별도 확인이 필요하다.',
    lore:'계단 높이에 맞춰 일정한 보폭을 유지한다. 파손된 계단은 별도 확인이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '계단박자'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 계단 높이에 맞춰 일정한 보폭을 유지한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 계단박자가 확인한 범위 안에서 작용한다.', '{u}은(는) 계단박자의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 계단박자가 필요한 지점을 놓친다.', '{u}은(는) 계단박자의 위치를 다시 잡는다.'], crit:['{u}은(는) 계단박자의 순서와 힘을 정확히 맞춘다.', '{u}의 계단박자가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 계단박자를 중단한다.', '{u}은(는) 계단박자를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5094', name:'낮은포복', en:'Low Crawl', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'장비를 바닥 가까이 붙여 낮은 통로를 기어간다. 오염된 바닥에 닿을 수 있다.',
    lore:'장비를 바닥 가까이 붙여 낮은 통로를 기어간다. 오염된 바닥에 닿을 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '낮은포복'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C027', chance:1, turns:2}],
    move:'dash', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 장비를 바닥 가까이 붙여 낮은 통로를 기어간다.'], hit:['{u}의 낮은포복이 확인한 범위 안에서 작용한다.', '{u}은(는) 낮은포복의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 낮은포복이 필요한 지점을 놓친다.', '{u}은(는) 낮은포복의 위치를 다시 잡는다.'], crit:['{u}은(는) 낮은포복의 순서와 힘을 정확히 맞춘다.', '{u}의 낮은포복이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 낮은포복을 중단한다.', '{u}은(는) 낮은포복을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5095', name:'동료끌어옴', en:'Buddy Pull', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:2, rarity:1, tier:1, desc:'손이 닿는 동료를 안전한 쪽으로 짧게 당긴다. 목과 척추 부상이 있으면 사용을 제한한다.',
    lore:'손이 닿는 동료를 안전한 쪽으로 짧게 당긴다. 목과 척추 부상이 있으면 사용을 제한한다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '동료끌어옴'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C028', chance:1, turns:2}],
    move:'pull', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 손이 닿는 동료를 안전한 쪽으로 짧게 당긴다.'], hit:['{u}의 동료끌어옴이 확인한 범위 안에서 작용한다.', '{u}은(는) 동료끌어옴의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 동료끌어옴이 필요한 지점을 놓친다.', '{u}은(는) 동료끌어옴의 위치를 다시 잡는다.'], crit:['{u}은(는) 동료끌어옴의 순서와 힘을 정확히 맞춘다.', '{u}의 동료끌어옴이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 동료끌어옴을 중단한다.', '{u}은(는) 동료끌어옴을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5099']
  },
  {
    id:'SK_C5096', name:'문턱비킴', en:'Threshold Clear', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'문이 열리는 궤적 밖으로 빠르게 몸을 옮긴다. 반대편 상황을 확인하는 능력은 없다.',
    lore:'문이 열리는 궤적 밖으로 빠르게 몸을 옮긴다. 반대편 상황을 확인하는 능력은 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '문턱비킴'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C015', chance:1, turns:2}],
    move:'dash', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 문이 열리는 궤적 밖으로 빠르게 몸을 옮긴다.'], hit:['{u}의 문턱비킴이 확인한 범위 안에서 작용한다.', '{u}은(는) 문턱비킴의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 문턱비킴이 필요한 지점을 놓친다.', '{u}은(는) 문턱비킴의 위치를 다시 잡는다.'], crit:['{u}은(는) 문턱비킴의 순서와 힘을 정확히 맞춘다.', '{u}의 문턱비킴이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 문턱비킴을 중단한다.', '{u}은(는) 문턱비킴을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5097', name:'물가디딤', en:'Shore Footing', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'물가의 미끄러운 돌에 체중을 나눠 딛는다. 깊은 물 위에 서지는 못한다.',
    lore:'물가의 미끄러운 돌에 체중을 나눠 딛는다. 깊은 물 위에 서지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '물가디딤'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 물가의 미끄러운 돌에 체중을 나눠 딛는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 물가디딤이 확인한 범위 안에서 작용한다.', '{u}은(는) 물가디딤의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 물가디딤이 필요한 지점을 놓친다.', '{u}은(는) 물가디딤의 위치를 다시 잡는다.'], crit:['{u}은(는) 물가디딤의 순서와 힘을 정확히 맞춘다.', '{u}의 물가디딤이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 물가디딤을 중단한다.', '{u}은(는) 물가디딤을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5098', name:'비탈내려감', en:'Slope Descent', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'몸을 낮추고 짧은 보폭으로 비탈을 내려간다. 발판이 무너지면 멈추기 어렵다.',
    lore:'몸을 낮추고 짧은 보폭으로 비탈을 내려간다. 발판이 무너지면 멈추기 어렵다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '비탈내려감'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, ai:{hpBelow:0.65}, se:[{se:'SE_C014', chance:1, turns:2}],
    move:'retreat', side:['연속 사용하면 호흡이 거칠어진다.'], lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 몸을 낮추고 짧은 보폭으로 비탈을 내려간다.'], hit:['{u}의 비탈내려감이 확인한 범위 안에서 작용한다.', '{u}은(는) 비탈내려감의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 비탈내려감이 필요한 지점을 놓친다.', '{u}은(는) 비탈내려감의 위치를 다시 잡는다.'], crit:['{u}은(는) 비탈내려감의 순서와 힘을 정확히 맞춘다.', '{u}의 비탈내려감이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 비탈내려감을 중단한다.', '{u}은(는) 비탈내려감을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5099', name:'부축보폭', en:'Assisted Stride', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:2, tier:1, desc:'부축하는 동료와 발을 맞춰 함께 움직인다. 상대를 들어 나를 힘은 따로 필요하다.',
    lore:'부축하는 동료와 발을 맞춰 함께 움직인다. 상대를 들어 나를 힘은 따로 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '부축보폭'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, ai:{hpBelow:0.65}, se:[{se:'SE_C028', chance:1, turns:2}],
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 부축하는 동료와 발을 맞춰 함께 움직인다.'], hit:['{u}의 부축보폭이 확인한 범위 안에서 작용한다.', '{u}은(는) 부축보폭의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 부축보폭이 필요한 지점을 놓친다.', '{u}은(는) 부축보폭의 위치를 다시 잡는다.'], crit:['{u}은(는) 부축보폭의 순서와 힘을 정확히 맞춘다.', '{u}의 부축보폭이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 부축보폭을 중단한다.', '{u}은(는) 부축보폭을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5095']
  },
  {
    id:'SK_C5100', name:'걸음소리줄임', en:'Soft Footfall', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'발뒤꿈치부터 체중을 나눠 발소리를 줄인다. 시야나 냄새까지 숨기지는 못한다.',
    lore:'발뒤꿈치부터 체중을 나눠 발소리를 줄인다. 시야나 냄새까지 숨기지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '걸음소리줄임'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', lines:{use:['{u}은(는) 발뒤꿈치부터 체중을 나눠 발소리를 줄인다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 걸음소리줄임이 확인한 범위 안에서 작용한다.', '{u}은(는) 걸음소리줄임의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 걸음소리줄임이 필요한 지점을 놓친다.', '{u}은(는) 걸음소리줄임의 위치를 다시 잡는다.'], crit:['{u}은(는) 걸음소리줄임의 순서와 힘을 정확히 맞춘다.', '{u}의 걸음소리줄임이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 걸음소리줄임을 중단한다.', '{u}은(는) 걸음소리줄임을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5101', name:'생각끊기', en:'Thought Break', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:2, rarity:2, tier:1, desc:'같은 걱정의 반복을 잠깐 멈추고 주변을 확인한다. 걱정의 원인을 없애지는 못한다.',
    lore:'같은 걱정의 반복을 잠깐 멈추고 주변을 확인한다. 걱정의 원인을 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '생각끊기'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C023', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 같은 걱정의 반복을 잠깐 멈추고 주변을 확인한다.'], hit:['{u}의 생각끊기가 확인한 범위 안에서 작용한다.', '{u}은(는) 생각끊기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 생각끊기가 필요한 지점을 놓친다.', '{u}은(는) 생각끊기의 위치를 다시 잡는다.'], crit:['{u}은(는) 생각끊기의 순서와 힘을 정확히 맞춘다.', '{u}의 생각끊기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 생각끊기를 중단한다.', '{u}은(는) 생각끊기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5102']
  },
  {
    id:'SK_C5102', name:'호흡세기', en:'Counted Breath', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'들숨과 날숨을 세며 동작의 박자를 찾는다. 전력 질주 중에는 호흡을 우선한다.',
    lore:'들숨과 날숨을 세며 동작의 박자를 찾는다. 전력 질주 중에는 호흡을 우선한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '호흡세기'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 들숨과 날숨을 세며 동작의 박자를 찾는다.'], hit:['{u}의 호흡세기가 확인한 범위 안에서 작용한다.', '{u}은(는) 호흡세기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 호흡세기가 필요한 지점을 놓친다.', '{u}은(는) 호흡세기의 위치를 다시 잡는다.'], crit:['{u}은(는) 호흡세기의 순서와 힘을 정확히 맞춘다.', '{u}의 호흡세기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 호흡세기를 중단한다.', '{u}은(는) 호흡세기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5101']
  },
  {
    id:'SK_C5103', name:'소음골라듣기', en:'Noise Filtering', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'겹친 소리에서 정해 둔 신호 하나에 집중한다. 다른 경고를 놓칠 수 있다.',
    lore:'겹친 소리에서 정해 둔 신호 하나에 집중한다. 다른 경고를 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '소음골라듣기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 겹친 소리에서 정해 둔 신호 하나에 집중한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 소음골라듣기가 확인한 범위 안에서 작용한다.', '{u}은(는) 소음골라듣기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 소음골라듣기가 필요한 지점을 놓친다.', '{u}은(는) 소음골라듣기의 위치를 다시 잡는다.'], crit:['{u}은(는) 소음골라듣기의 순서와 힘을 정확히 맞춘다.', '{u}의 소음골라듣기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 소음골라듣기를 중단한다.', '{u}은(는) 소음골라듣기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5104', name:'실수되짚기', en:'Error Review', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'방금 실패한 동작을 순서대로 떠올린다. 기억이 항상 정확하지는 않다.',
    lore:'방금 실패한 동작을 순서대로 떠올린다. 기억이 항상 정확하지는 않다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '실수되짚기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 방금 실패한 동작을 순서대로 떠올린다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 실수되짚기가 확인한 범위 안에서 작용한다.', '{u}은(는) 실수되짚기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 실수되짚기가 필요한 지점을 놓친다.', '{u}은(는) 실수되짚기의 위치를 다시 잡는다.'], crit:['{u}은(는) 실수되짚기의 순서와 힘을 정확히 맞춘다.', '{u}의 실수되짚기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 실수되짚기를 중단한다.', '{u}은(는) 실수되짚기를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5110']
  },
  {
    id:'SK_C5105', name:'공포이름붙임', en:'Fear Naming', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'두려운 대상을 짧은 말로 구분해 판단을 돕는다. 공포 반응을 완전히 없애지는 못한다.',
    lore:'두려운 대상을 짧은 말로 구분해 판단을 돕는다. 공포 반응을 완전히 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '공포이름붙임'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C023', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 두려운 대상을 짧은 말로 구분해 판단을 돕는다.'], hit:['{u}의 공포이름붙임이 확인한 범위 안에서 작용한다.', '{u}은(는) 공포이름붙임의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 공포이름붙임이 필요한 지점을 놓친다.', '{u}은(는) 공포이름붙임의 위치를 다시 잡는다.'], crit:['{u}은(는) 공포이름붙임의 순서와 힘을 정확히 맞춘다.', '{u}의 공포이름붙임이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 공포이름붙임을 중단한다.', '{u}은(는) 공포이름붙임을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5106', name:'눈앞한가지', en:'Single Task Focus', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'지금 필요한 동작 하나에 집중한다. 주변 상황을 함께 확인할 동료가 필요하다.',
    lore:'지금 필요한 동작 하나에 집중한다. 주변 상황을 함께 확인할 동료가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '눈앞한가지'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C016', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 지금 필요한 동작 하나에 집중한다.'], hit:['{u}의 눈앞한가지가 확인한 범위 안에서 작용한다.', '{u}은(는) 눈앞한가지의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 눈앞한가지가 필요한 지점을 놓친다.', '{u}은(는) 눈앞한가지의 위치를 다시 잡는다.'], crit:['{u}은(는) 눈앞한가지의 순서와 힘을 정확히 맞춘다.', '{u}의 눈앞한가지가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 눈앞한가지를 중단한다.', '{u}은(는) 눈앞한가지를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5118']
  },
  {
    id:'SK_C5107', name:'통증거리두기', en:'Pain Distance', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'통증에 쏠린 주의를 잠깐 다른 감각으로 나눈다. 통증이 줄어도 부상은 그대로다.',
    lore:'통증에 쏠린 주의를 잠깐 다른 감각으로 나눈다. 통증이 줄어도 부상은 그대로다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '통증거리두기'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 통증에 쏠린 주의를 잠깐 다른 감각으로 나눈다.'], hit:['{u}의 통증거리두기가 확인한 범위 안에서 작용한다.', '{u}은(는) 통증거리두기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 통증거리두기가 필요한 지점을 놓친다.', '{u}은(는) 통증거리두기의 위치를 다시 잡는다.'], crit:['{u}은(는) 통증거리두기의 순서와 힘을 정확히 맞춘다.', '{u}의 통증거리두기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 통증거리두기를 중단한다.', '{u}은(는) 통증거리두기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5108', name:'기다림호흡', en:'Waiting Breath', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:2, rarity:1, tier:1, desc:'대기 중 불필요한 긴장을 줄인다. 쉬는 시간을 실제로 확보해야 한다.',
    lore:'대기 중 불필요한 긴장을 줄인다. 쉬는 시간을 실제로 확보해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '기다림호흡'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 대기 중 불필요한 긴장을 줄인다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 기다림호흡이 확인한 범위 안에서 작용한다.', '{u}은(는) 기다림호흡의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 기다림호흡이 필요한 지점을 놓친다.', '{u}은(는) 기다림호흡의 위치를 다시 잡는다.'], crit:['{u}은(는) 기다림호흡의 순서와 힘을 정확히 맞춘다.', '{u}의 기다림호흡이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 기다림호흡을 중단한다.', '{u}은(는) 기다림호흡을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5109', name:'판단한박자', en:'Decision Pause', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'급한 반응 전에 짧게 상황을 확인한다. 즉시 피해야 할 공격에는 늦을 수 있다.',
    lore:'급한 반응 전에 짧게 상황을 확인한다. 즉시 피해야 할 공격에는 늦을 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '판단한박자'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 급한 반응 전에 짧게 상황을 확인한다.'], hit:['{u}의 판단한박자가 확인한 범위 안에서 작용한다.', '{u}은(는) 판단한박자의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 판단한박자가 필요한 지점을 놓친다.', '{u}은(는) 판단한박자의 위치를 다시 잡는다.'], crit:['{u}은(는) 판단한박자의 순서와 힘을 정확히 맞춘다.', '{u}의 판단한박자가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 판단한박자를 중단한다.', '{u}은(는) 판단한박자를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5110', name:'실패후정렬', en:'Post Failure Reset', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:2, tier:1, desc:'실패 뒤 손과 발의 위치부터 다시 맞춘다. 잃은 장비나 자원은 돌아오지 않는다.',
    lore:'실패 뒤 손과 발의 위치부터 다시 맞춘다. 잃은 장비나 자원은 돌아오지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '실패후정렬'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 실패 뒤 손과 발의 위치부터 다시 맞춘다.'], hit:['{u}의 실패후정렬이 확인한 범위 안에서 작용한다.', '{u}은(는) 실패후정렬의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 실패후정렬이 필요한 지점을 놓친다.', '{u}은(는) 실패후정렬의 위치를 다시 잡는다.'], crit:['{u}은(는) 실패후정렬의 순서와 힘을 정확히 맞춘다.', '{u}의 실패후정렬이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 실패후정렬을 중단한다.', '{u}은(는) 실패후정렬을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5104']
  },
  {
    id:'SK_C5111', name:'자기상태확인', en:'Self Check', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'피로와 감정이 판단에 끼치는 영향을 살핀다. 자기 판단의 편향을 모두 알 수는 없다.',
    lore:'피로와 감정이 판단에 끼치는 영향을 살핀다. 자기 판단의 편향을 모두 알 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '자기상태확인'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 피로와 감정이 판단에 끼치는 영향을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 자기상태확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 자기상태확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 자기상태확인이 필요한 지점을 놓친다.', '{u}은(는) 자기상태확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 자기상태확인의 순서와 힘을 정확히 맞춘다.', '{u}의 자기상태확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 자기상태확인을 중단한다.', '{u}은(는) 자기상태확인을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5116']
  },
  {
    id:'SK_C5112', name:'시선되돌림', en:'Attention Return', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'한곳에 붙잡힌 시선을 주변으로 돌린다. 강제적인 마력 구속을 풀지는 못한다.',
    lore:'한곳에 붙잡힌 시선을 주변으로 돌린다. 강제적인 마력 구속을 풀지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '시선되돌림'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C016', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 한곳에 붙잡힌 시선을 주변으로 돌린다.'], hit:['{u}의 시선되돌림이 확인한 범위 안에서 작용한다.', '{u}은(는) 시선되돌림의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 시선되돌림이 필요한 지점을 놓친다.', '{u}은(는) 시선되돌림의 위치를 다시 잡는다.'], crit:['{u}은(는) 시선되돌림의 순서와 힘을 정확히 맞춘다.', '{u}의 시선되돌림이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 시선되돌림을 중단한다.', '{u}은(는) 시선되돌림을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5113', name:'불안메모', en:'Worry Note', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'확인할 걱정을 짧게 적어 기억 부담을 나눈다. 메모할 도구와 여유가 필요하다.',
    lore:'확인할 걱정을 짧게 적어 기억 부담을 나눈다. 메모할 도구와 여유가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '불안메모'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 확인할 걱정을 짧게 적어 기억 부담을 나눈다.'], hit:['{u}의 불안메모가 확인한 범위 안에서 작용한다.', '{u}은(는) 불안메모의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 불안메모가 필요한 지점을 놓친다.', '{u}은(는) 불안메모의 위치를 다시 잡는다.'], crit:['{u}은(는) 불안메모의 순서와 힘을 정확히 맞춘다.', '{u}의 불안메모가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 불안메모를 중단한다.', '{u}은(는) 불안메모를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5114', name:'명령되읽기', en:'Order Recall', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'받은 지시의 핵심 순서를 다시 떠올린다. 잘못 받은 지시까지 바로잡지는 못한다.',
    lore:'받은 지시의 핵심 순서를 다시 떠올린다. 잘못 받은 지시까지 바로잡지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '명령되읽기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 받은 지시의 핵심 순서를 다시 떠올린다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 명령되읽기가 확인한 범위 안에서 작용한다.', '{u}은(는) 명령되읽기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 명령되읽기가 필요한 지점을 놓친다.', '{u}은(는) 명령되읽기의 위치를 다시 잡는다.'], crit:['{u}은(는) 명령되읽기의 순서와 힘을 정확히 맞춘다.', '{u}의 명령되읽기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 명령되읽기를 중단한다.', '{u}은(는) 명령되읽기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5115', name:'끝난일접기', en:'Task Closure', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:2, rarity:1, tier:1, desc:'끝난 작업과 남은 작업을 구분한다. 감정이 곧바로 가라앉지는 않는다.',
    lore:'끝난 작업과 남은 작업을 구분한다. 감정이 곧바로 가라앉지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '끝난일접기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 끝난 작업과 남은 작업을 구분한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 끝난일접기가 확인한 범위 안에서 작용한다.', '{u}은(는) 끝난일접기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 끝난일접기가 필요한 지점을 놓친다.', '{u}은(는) 끝난일접기의 위치를 다시 잡는다.'], crit:['{u}은(는) 끝난일접기의 순서와 힘을 정확히 맞춘다.', '{u}의 끝난일접기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 끝난일접기를 중단한다.', '{u}은(는) 끝난일접기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5116', name:'휴식허용', en:'Rest Permission', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'쉬는 동안 다음 행동의 준비를 잠시 멈춘다. 위험 구역에서는 경계를 유지해야 한다.',
    lore:'쉬는 동안 다음 행동의 준비를 잠시 멈춘다. 위험 구역에서는 경계를 유지해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '휴식허용'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C019', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 쉬는 동안 다음 행동의 준비를 잠시 멈춘다.'], hit:['{u}의 휴식허용이 확인한 범위 안에서 작용한다.', '{u}은(는) 휴식허용의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 휴식허용이 필요한 지점을 놓친다.', '{u}은(는) 휴식허용의 위치를 다시 잡는다.'], crit:['{u}은(는) 휴식허용의 순서와 힘을 정확히 맞춘다.', '{u}의 휴식허용이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 휴식허용을 중단한다.', '{u}은(는) 휴식허용을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5111']
  },
  {
    id:'SK_C5117', name:'손떨림분리', en:'Tremor Separation', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'긴장으로 떨리는 손을 잠깐 쉬게 한 뒤 다시 움직인다. 질환이나 독성 떨림에는 효과가 없다.',
    lore:'긴장으로 떨리는 손을 잠깐 쉬게 한 뒤 다시 움직인다. 질환이나 독성 떨림에는 효과가 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '손떨림분리'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C017', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 긴장으로 떨리는 손을 잠깐 쉬게 한 뒤 다시 움직인다.'], hit:['{u}의 손떨림분리가 확인한 범위 안에서 작용한다.', '{u}은(는) 손떨림분리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 손떨림분리가 필요한 지점을 놓친다.', '{u}은(는) 손떨림분리의 위치를 다시 잡는다.'], crit:['{u}은(는) 손떨림분리의 순서와 힘을 정확히 맞춘다.', '{u}의 손떨림분리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 손떨림분리를 중단한다.', '{u}은(는) 손떨림분리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5118', name:'목표한줄', en:'One Line Goal', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'지금 할 일을 짧은 한 문장으로 정리한다. 다른 사람의 목표를 강제로 바꾸지 못한다.',
    lore:'지금 할 일을 짧은 한 문장으로 정리한다. 다른 사람의 목표를 강제로 바꾸지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '목표한줄'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C016', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 지금 할 일을 짧은 한 문장으로 정리한다.'], hit:['{u}의 목표한줄이 확인한 범위 안에서 작용한다.', '{u}은(는) 목표한줄의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 목표한줄이 필요한 지점을 놓친다.', '{u}은(는) 목표한줄의 위치를 다시 잡는다.'], crit:['{u}은(는) 목표한줄의 순서와 힘을 정확히 맞춘다.', '{u}의 목표한줄이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 목표한줄을 중단한다.', '{u}은(는) 목표한줄을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5106']
  },
  {
    id:'SK_C5119', name:'후회나누기', en:'Regret Sharing', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:2, tier:1, desc:'믿는 동료에게 관찰한 사실부터 말할 순서를 잡는다. 상대의 공감이나 동의를 보장하지 못한다.',
    lore:'믿는 동료에게 관찰한 사실부터 말할 순서를 잡는다. 상대의 공감이나 동의를 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '후회나누기'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, ai:{mpAbove:0.2}, se:[{se:'SE_C023', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 믿는 동료에게 관찰한 사실부터 말할 순서를 잡는다.'], hit:['{u}의 후회나누기가 확인한 범위 안에서 작용한다.', '{u}은(는) 후회나누기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 후회나누기가 필요한 지점을 놓친다.', '{u}은(는) 후회나누기의 위치를 다시 잡는다.'], crit:['{u}은(는) 후회나누기의 순서와 힘을 정확히 맞춘다.', '{u}의 후회나누기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 후회나누기를 중단한다.', '{u}은(는) 후회나누기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5120', name:'경계내려놓기', en:'Stand Down', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'안전이 확인된 곳에서 과도한 긴장을 줄인다. 위험 여부를 스스로 확인해야 한다.',
    lore:'안전이 확인된 곳에서 과도한 긴장을 줄인다. 위험 여부를 스스로 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '경계내려놓기'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, ai:{mpAbove:0.2}, se:[{se:'SE_C023', chance:1, turns:2}],
    daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 안전이 확인된 곳에서 과도한 긴장을 줄인다.'], hit:['{u}의 경계내려놓기가 확인한 범위 안에서 작용한다.', '{u}은(는) 경계내려놓기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 경계내려놓기가 필요한 지점을 놓친다.', '{u}은(는) 경계내려놓기의 위치를 다시 잡는다.'], crit:['{u}은(는) 경계내려놓기의 순서와 힘을 정확히 맞춘다.', '{u}의 경계내려놓기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 경계내려놓기를 중단한다.', '{u}은(는) 경계내려놓기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5121', name:'짧은자기소개', en:'Brief Introduction', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:2, rarity:2, tier:1, desc:'이름과 맡은 일을 짧게 전달한다. 상대가 호감을 느끼게 강제하지 못한다.',
    lore:'이름과 맡은 일을 짧게 전달한다. 상대가 호감을 느끼게 강제하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '짧은자기소개'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 이름과 맡은 일을 짧게 전달한다.'], hit:['{u}의 짧은자기소개가 확인한 범위 안에서 작용한다.', '{u}은(는) 짧은자기소개의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 짧은자기소개가 필요한 지점을 놓친다.', '{u}은(는) 짧은자기소개의 위치를 다시 잡는다.'], crit:['{u}은(는) 짧은자기소개의 순서와 힘을 정확히 맞춘다.', '{u}의 짧은자기소개가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 짧은자기소개를 중단한다.', '{u}은(는) 짧은자기소개를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5122', name:'의뢰범위확인', en:'Scope Confirmation', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'계약의 작업 범위와 제외 항목을 짚는다. 상대가 숨긴 조건은 추가 확인이 필요하다.',
    lore:'계약의 작업 범위와 제외 항목을 짚는다. 상대가 숨긴 조건은 추가 확인이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B17', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '의뢰범위확인'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 계약의 작업 범위와 제외 항목을 짚는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 의뢰범위확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 의뢰범위확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 의뢰범위확인이 필요한 지점을 놓친다.', '{u}은(는) 의뢰범위확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 의뢰범위확인의 순서와 힘을 정확히 맞춘다.', '{u}의 의뢰범위확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 의뢰범위확인을 중단한다.', '{u}은(는) 의뢰범위확인을 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5123']
  },
  {
    id:'SK_C5123', name:'대금되묻기', en:'Payment Clarification', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'금액과 지급 시점을 차분하게 다시 확인한다. 부당한 계약을 자동으로 막지는 못한다.',
    lore:'금액과 지급 시점을 차분하게 다시 확인한다. 부당한 계약을 자동으로 막지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B17', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '대금되묻기'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 금액과 지급 시점을 차분하게 다시 확인한다.'], hit:['{u}의 대금되묻기가 확인한 범위 안에서 작용한다.', '{u}은(는) 대금되묻기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 대금되묻기가 필요한 지점을 놓친다.', '{u}은(는) 대금되묻기의 위치를 다시 잡는다.'], crit:['{u}은(는) 대금되묻기의 순서와 힘을 정확히 맞춘다.', '{u}의 대금되묻기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 대금되묻기를 중단한다.', '{u}은(는) 대금되묻기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5122']
  },
  {
    id:'SK_C5124', name:'거절문장', en:'Clear Refusal', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'할 수 없는 일과 이유를 짧게 전달한다. 상대의 반응은 통제하지 못한다.',
    lore:'할 수 없는 일과 이유를 짧게 전달한다. 상대의 반응은 통제하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '거절문장'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 할 수 없는 일과 이유를 짧게 전달한다.'], hit:['{u}의 거절문장이 확인한 범위 안에서 작용한다.', '{u}은(는) 거절문장의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 거절문장이 필요한 지점을 놓친다.', '{u}은(는) 거절문장의 위치를 다시 잡는다.'], crit:['{u}은(는) 거절문장의 순서와 힘을 정확히 맞춘다.', '{u}의 거절문장이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 거절문장을 중단한다.', '{u}은(는) 거절문장을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5125', name:'말순서정리', en:'Speaking Order', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'사실과 요청을 나눠 말할 순서를 잡는다. 사실 여부는 따로 확인해야 한다.',
    lore:'사실과 요청을 나눠 말할 순서를 잡는다. 사실 여부는 따로 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '말순서정리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 사실과 요청을 나눠 말할 순서를 잡는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 말순서정리가 확인한 범위 안에서 작용한다.', '{u}은(는) 말순서정리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 말순서정리가 필요한 지점을 놓친다.', '{u}은(는) 말순서정리의 위치를 다시 잡는다.'], crit:['{u}은(는) 말순서정리의 순서와 힘을 정확히 맞춘다.', '{u}의 말순서정리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 말순서정리를 중단한다.', '{u}은(는) 말순서정리를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5128']
  },
  {
    id:'SK_C5126', name:'동료이름기억', en:'Name Recall', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'함께 일한 동료의 이름과 역할을 연결해 기억한다. 처음 듣지 못한 이름은 알 수 없다.',
    lore:'함께 일한 동료의 이름과 역할을 연결해 기억한다. 처음 듣지 못한 이름은 알 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '동료이름기억'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 함께 일한 동료의 이름과 역할을 연결해 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 동료이름기억이 확인한 범위 안에서 작용한다.', '{u}은(는) 동료이름기억의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 동료이름기억이 필요한 지점을 놓친다.', '{u}은(는) 동료이름기억의 위치를 다시 잡는다.'], crit:['{u}은(는) 동료이름기억의 순서와 힘을 정확히 맞춘다.', '{u}의 동료이름기억이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 동료이름기억을 중단한다.', '{u}은(는) 동료이름기억을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5127', name:'표정재확인', en:'Expression Recheck', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'상대의 표정과 말이 어긋나는지 살핀다. 속마음이나 거짓말을 확정하지 못한다.',
    lore:'상대의 표정과 말이 어긋나는지 살핀다. 속마음이나 거짓말을 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '표정재확인'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 상대의 표정과 말이 어긋나는지 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 표정재확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 표정재확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 표정재확인이 필요한 지점을 놓친다.', '{u}은(는) 표정재확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 표정재확인의 순서와 힘을 정확히 맞춘다.', '{u}의 표정재확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 표정재확인을 중단한다.', '{u}은(는) 표정재확인을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5128', name:'오해되짚기', en:'Misunderstanding Check', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:2, rarity:1, tier:1, desc:'서로 다르게 이해한 부분을 다시 말해 확인한다. 대화할 의사가 없는 상대에게는 어렵다.',
    lore:'서로 다르게 이해한 부분을 다시 말해 확인한다. 대화할 의사가 없는 상대에게는 어렵다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '오해되짚기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 서로 다르게 이해한 부분을 다시 말해 확인한다.'], hit:['{u}의 오해되짚기가 확인한 범위 안에서 작용한다.', '{u}은(는) 오해되짚기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 오해되짚기가 필요한 지점을 놓친다.', '{u}은(는) 오해되짚기의 위치를 다시 잡는다.'], crit:['{u}은(는) 오해되짚기의 순서와 힘을 정확히 맞춘다.', '{u}의 오해되짚기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 오해되짚기를 중단한다.', '{u}은(는) 오해되짚기를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5125']
  },
  {
    id:'SK_C5129', name:'인수인계말', en:'Handover Brief', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'현재 상태와 남은 위험을 빠뜨리지 않게 전달한다. 전달받은 쪽의 행동을 보장하지 못한다.',
    lore:'현재 상태와 남은 위험을 빠뜨리지 않게 전달한다. 전달받은 쪽의 행동을 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '인수인계말'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 현재 상태와 남은 위험을 빠뜨리지 않게 전달한다.'], hit:['{u}의 인수인계말이 확인한 범위 안에서 작용한다.', '{u}은(는) 인수인계말의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 인수인계말이 필요한 지점을 놓친다.', '{u}은(는) 인수인계말의 위치를 다시 잡는다.'], crit:['{u}은(는) 인수인계말의 순서와 힘을 정확히 맞춘다.', '{u}의 인수인계말이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 인수인계말을 중단한다.', '{u}은(는) 인수인계말을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5133']
  },
  {
    id:'SK_C5130', name:'불만분리', en:'Complaint Sorting', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:2, tier:1, desc:'관찰한 문제와 감정 섞인 표현을 나눠 정리한다. 불만 자체를 없애지는 못한다.',
    lore:'관찰한 문제와 감정 섞인 표현을 나눠 정리한다. 불만 자체를 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '불만분리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 관찰한 문제와 감정 섞인 표현을 나눠 정리한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 불만분리가 확인한 범위 안에서 작용한다.', '{u}은(는) 불만분리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 불만분리가 필요한 지점을 놓친다.', '{u}은(는) 불만분리의 위치를 다시 잡는다.'], crit:['{u}은(는) 불만분리의 순서와 힘을 정확히 맞춘다.', '{u}의 불만분리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 불만분리를 중단한다.', '{u}은(는) 불만분리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5131', name:'협상휴지', en:'Negotiation Pause', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'대화가 급해질 때 잠깐 멈출 시점을 잡는다. 상대가 기다려 줄지는 알 수 없다.',
    lore:'대화가 급해질 때 잠깐 멈출 시점을 잡는다. 상대가 기다려 줄지는 알 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '협상휴지'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C023', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 대화가 급해질 때 잠깐 멈출 시점을 잡는다.'], hit:['{u}의 협상휴지가 확인한 범위 안에서 작용한다.', '{u}은(는) 협상휴지의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 협상휴지가 필요한 지점을 놓친다.', '{u}은(는) 협상휴지의 위치를 다시 잡는다.'], crit:['{u}은(는) 협상휴지의 순서와 힘을 정확히 맞춘다.', '{u}의 협상휴지가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 협상휴지를 중단한다.', '{u}은(는) 협상휴지를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5132', name:'공동분담표', en:'Shared Duties', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'동료와 합의한 작업을 나눠 적는다. 동의 없이 일을 떠넘길 수는 없다.',
    lore:'동료와 합의한 작업을 나눠 적는다. 동의 없이 일을 떠넘길 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '공동분담표'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 동료와 합의한 작업을 나눠 적는다.'], hit:['{u}의 공동분담표가 확인한 범위 안에서 작용한다.', '{u}은(는) 공동분담표의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 공동분담표가 필요한 지점을 놓친다.', '{u}은(는) 공동분담표의 위치를 다시 잡는다.'], crit:['{u}은(는) 공동분담표의 순서와 힘을 정확히 맞춘다.', '{u}의 공동분담표가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 공동분담표를 중단한다.', '{u}은(는) 공동분담표를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5133', name:'도움요청말', en:'Help Request', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'필요한 도움과 현재 위치를 구체적으로 말한다. 도움을 받을 수 있다는 보장은 없다.',
    lore:'필요한 도움과 현재 위치를 구체적으로 말한다. 도움을 받을 수 있다는 보장은 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '도움요청말'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 필요한 도움과 현재 위치를 구체적으로 말한다.'], hit:['{u}의 도움요청말이 확인한 범위 안에서 작용한다.', '{u}은(는) 도움요청말의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 도움요청말이 필요한 지점을 놓친다.', '{u}은(는) 도움요청말의 위치를 다시 잡는다.'], crit:['{u}은(는) 도움요청말의 순서와 힘을 정확히 맞춘다.', '{u}의 도움요청말이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 도움요청말을 중단한다.', '{u}은(는) 도움요청말을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5129']
  },
  {
    id:'SK_C5134', name:'소문출처묻기', en:'Source Check', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'들은 말의 출처와 시점을 차례로 확인한다. 출처가 있다고 사실이 되는 것은 아니다.',
    lore:'들은 말의 출처와 시점을 차례로 확인한다. 출처가 있다고 사실이 되는 것은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '소문출처묻기'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, daily:true, lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 들은 말의 출처와 시점을 차례로 확인한다.'], hit:['{u}의 소문출처묻기가 확인한 범위 안에서 작용한다.', '{u}은(는) 소문출처묻기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 소문출처묻기가 필요한 지점을 놓친다.', '{u}은(는) 소문출처묻기의 위치를 다시 잡는다.'], crit:['{u}은(는) 소문출처묻기의 순서와 힘을 정확히 맞춘다.', '{u}의 소문출처묻기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 소문출처묻기를 중단한다.', '{u}은(는) 소문출처묻기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5135', name:'낯선말확인', en:'Term Clarification', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:2, rarity:1, tier:1, desc:'모르는 현장 용어를 다시 설명해 달라고 요청한다. 처음부터 전문 지식이 생기지는 않는다.',
    lore:'모르는 현장 용어를 다시 설명해 달라고 요청한다. 처음부터 전문 지식이 생기지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '낯선말확인'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 모르는 현장 용어를 다시 설명해 달라고 요청한다.'], hit:['{u}의 낯선말확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 낯선말확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 낯선말확인이 필요한 지점을 놓친다.', '{u}은(는) 낯선말확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 낯선말확인의 순서와 힘을 정확히 맞춘다.', '{u}의 낯선말확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 낯선말확인을 중단한다.', '{u}은(는) 낯선말확인을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5136', name:'감사전달', en:'Thanks Delivery', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'받은 도움과 고마운 이유를 짧게 전한다. 관계가 즉시 좋아진다고 보장하지 못한다.',
    lore:'받은 도움과 고마운 이유를 짧게 전한다. 관계가 즉시 좋아진다고 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '감사전달'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C023', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 받은 도움과 고마운 이유를 짧게 전한다.'], hit:['{u}의 감사전달이 확인한 범위 안에서 작용한다.', '{u}은(는) 감사전달의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 감사전달이 필요한 지점을 놓친다.', '{u}은(는) 감사전달의 위치를 다시 잡는다.'], crit:['{u}은(는) 감사전달의 순서와 힘을 정확히 맞춘다.', '{u}의 감사전달이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 감사전달을 중단한다.', '{u}은(는) 감사전달을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5137', name:'기록동의', en:'Record Consent', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'대화 내용을 적기 전에 동의를 구한다. 동의하지 않은 내용을 강제로 기록하지 못한다.',
    lore:'대화 내용을 적기 전에 동의를 구한다. 동의하지 않은 내용을 강제로 기록하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '기록동의'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 대화 내용을 적기 전에 동의를 구한다.'], hit:['{u}의 기록동의가 확인한 범위 안에서 작용한다.', '{u}은(는) 기록동의의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 기록동의가 필요한 지점을 놓친다.', '{u}은(는) 기록동의의 위치를 다시 잡는다.'], crit:['{u}은(는) 기록동의의 순서와 힘을 정확히 맞춘다.', '{u}의 기록동의가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 기록동의를 중단한다.', '{u}은(는) 기록동의를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5139']
  },
  {
    id:'SK_C5138', name:'업무거리', en:'Work Boundaries', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'사적 요청과 계약 업무의 경계를 확인한다. 관계의 갈등을 모두 막지는 못한다.',
    lore:'사적 요청과 계약 업무의 경계를 확인한다. 관계의 갈등을 모두 막지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B17', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '업무거리'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 사적 요청과 계약 업무의 경계를 확인한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 업무거리가 확인한 범위 안에서 작용한다.', '{u}은(는) 업무거리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 업무거리가 필요한 지점을 놓친다.', '{u}은(는) 업무거리의 위치를 다시 잡는다.'], crit:['{u}은(는) 업무거리의 순서와 힘을 정확히 맞춘다.', '{u}의 업무거리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 업무거리를 중단한다.', '{u}은(는) 업무거리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5139', name:'분쟁사실표', en:'Dispute Facts', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:2, tier:1, desc:'확인한 사실과 확인하지 못한 주장을 나눠 적는다. 법적 판단을 대신하지 못한다.',
    lore:'확인한 사실과 확인하지 못한 주장을 나눠 적는다. 법적 판단을 대신하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B29', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '분쟁사실표'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 확인한 사실과 확인하지 못한 주장을 나눠 적는다.'], hit:['{u}의 분쟁사실표가 확인한 범위 안에서 작용한다.', '{u}은(는) 분쟁사실표의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 분쟁사실표가 필요한 지점을 놓친다.', '{u}은(는) 분쟁사실표의 위치를 다시 잡는다.'], crit:['{u}은(는) 분쟁사실표의 순서와 힘을 정확히 맞춘다.', '{u}의 분쟁사실표가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 분쟁사실표를 중단한다.', '{u}은(는) 분쟁사실표를 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5137']
  },
  {
    id:'SK_C5140', name:'약속시각눈', en:'Schedule Awareness', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'합의한 시각과 이동 시간을 함께 기억한다. 돌발 지연을 없애지는 못한다.',
    lore:'합의한 시각과 이동 시간을 함께 기억한다. 돌발 지연을 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '약속시각눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 합의한 시각과 이동 시간을 함께 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 약속시각눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 약속시각눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 약속시각눈이 필요한 지점을 놓친다.', '{u}은(는) 약속시각눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 약속시각눈의 순서와 힘을 정확히 맞춘다.', '{u}의 약속시각눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 약속시각눈을 중단한다.', '{u}은(는) 약속시각눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5141', name:'공구배열', en:'Tool Layout', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:2, rarity:2, tier:1, desc:'자주 쓰는 공구를 손이 닿는 순서로 놓는다. 공구가 부족하면 작업을 줄여야 한다.',
    lore:'자주 쓰는 공구를 손이 닿는 순서로 놓는다. 공구가 부족하면 작업을 줄여야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '공구배열'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 자주 쓰는 공구를 손이 닿는 순서로 놓는다.'], hit:['{u}의 공구배열이 확인한 범위 안에서 작용한다.', '{u}은(는) 공구배열의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 공구배열이 필요한 지점을 놓친다.', '{u}은(는) 공구배열의 위치를 다시 잡는다.'], crit:['{u}은(는) 공구배열의 순서와 힘을 정확히 맞춘다.', '{u}의 공구배열이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 공구배열을 중단한다.', '{u}은(는) 공구배열을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5152']
  },
  {
    id:'SK_C5142', name:'볼트분류', en:'Bolt Sorting', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'길이와 나사산이 다른 볼트를 구분한다. 재료 강도까지 육안으로 확정하지 못한다.',
    lore:'길이와 나사산이 다른 볼트를 구분한다. 재료 강도까지 육안으로 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '볼트분류'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 길이와 나사산이 다른 볼트를 구분한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 볼트분류가 확인한 범위 안에서 작용한다.', '{u}은(는) 볼트분류의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 볼트분류가 필요한 지점을 놓친다.', '{u}은(는) 볼트분류의 위치를 다시 잡는다.'], crit:['{u}은(는) 볼트분류의 순서와 힘을 정확히 맞춘다.', '{u}의 볼트분류가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 볼트분류를 중단한다.', '{u}은(는) 볼트분류를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5143', name:'식비장부', en:'Meal Budget', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'식비와 남은 생활비를 나눠 적는다. 수입을 새로 만들어 주지는 않는다.',
    lore:'식비와 남은 생활비를 나눠 적는다. 수입을 새로 만들어 주지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B30', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '식비장부'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 식비와 남은 생활비를 나눠 적는다.'], hit:['{u}의 식비장부가 확인한 범위 안에서 작용한다.', '{u}은(는) 식비장부의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 식비장부가 필요한 지점을 놓친다.', '{u}은(는) 식비장부의 위치를 다시 잡는다.'], crit:['{u}은(는) 식비장부의 순서와 힘을 정확히 맞춘다.', '{u}의 식비장부가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 식비장부를 중단한다.', '{u}은(는) 식비장부를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5144', name:'장비닦기', en:'Gear Wipe', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'표면 오염을 골라 장비를 닦는 순서를 정한다. 손상된 장비를 수리하지는 못한다.',
    lore:'표면 오염을 골라 장비를 닦는 순서를 정한다. 손상된 장비를 수리하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '장비닦기'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C026', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 표면 오염을 골라 장비를 닦는 순서를 정한다.'], hit:['{u}의 장비닦기가 확인한 범위 안에서 작용한다.', '{u}은(는) 장비닦기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 장비닦기가 필요한 지점을 놓친다.', '{u}은(는) 장비닦기의 위치를 다시 잡는다.'], crit:['{u}은(는) 장비닦기의 순서와 힘을 정확히 맞춘다.', '{u}의 장비닦기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 장비닦기를 중단한다.', '{u}은(는) 장비닦기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5145', name:'끈매듭점검', en:'Knot Inspection', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'매듭 방향과 느슨한 부분을 확인한다. 낡은 끈의 강도를 보장하지 못한다.',
    lore:'매듭 방향과 느슨한 부분을 확인한다. 낡은 끈의 강도를 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '끈매듭점검'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 매듭 방향과 느슨한 부분을 확인한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 끈매듭점검이 확인한 범위 안에서 작용한다.', '{u}은(는) 끈매듭점검의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 끈매듭점검이 필요한 지점을 놓친다.', '{u}은(는) 끈매듭점검의 위치를 다시 잡는다.'], crit:['{u}은(는) 끈매듭점검의 순서와 힘을 정확히 맞춘다.', '{u}의 끈매듭점검이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 끈매듭점검을 중단한다.', '{u}은(는) 끈매듭점검을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5146', name:'세탁분리', en:'Laundry Sorting', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'방호복과 일상복의 오염을 구분해 분리한다. 제조사 세탁 지침을 대신하지 못한다.',
    lore:'방호복과 일상복의 오염을 구분해 분리한다. 제조사 세탁 지침을 대신하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '세탁분리'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C026', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 방호복과 일상복의 오염을 구분해 분리한다.'], hit:['{u}의 세탁분리가 확인한 범위 안에서 작용한다.', '{u}은(는) 세탁분리의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 세탁분리가 필요한 지점을 놓친다.', '{u}은(는) 세탁분리의 위치를 다시 잡는다.'], crit:['{u}은(는) 세탁분리의 순서와 힘을 정확히 맞춘다.', '{u}의 세탁분리가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 세탁분리를 중단한다.', '{u}은(는) 세탁분리를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5147', name:'주머니배치', en:'Pocket Layout', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'급히 쓸 물건을 주머니별로 나눠 넣는다. 소지품의 무게가 줄지는 않는다.',
    lore:'급히 쓸 물건을 주머니별로 나눠 넣는다. 소지품의 무게가 줄지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '주머니배치'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 급히 쓸 물건을 주머니별로 나눠 넣는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 주머니배치가 확인한 범위 안에서 작용한다.', '{u}은(는) 주머니배치의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 주머니배치가 필요한 지점을 놓친다.', '{u}은(는) 주머니배치의 위치를 다시 잡는다.'], crit:['{u}은(는) 주머니배치의 순서와 힘을 정확히 맞춘다.', '{u}의 주머니배치가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 주머니배치를 중단한다.', '{u}은(는) 주머니배치를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5153']
  },
  {
    id:'SK_C5148', name:'표본라벨', en:'Specimen Label', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:2, rarity:1, tier:1, desc:'표본의 위치와 채취 시각을 짧게 기록한다. 기록이 틀렸다면 다시 확인해야 한다.',
    lore:'표본의 위치와 채취 시각을 짧게 기록한다. 기록이 틀렸다면 다시 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '표본라벨'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 표본의 위치와 채취 시각을 짧게 기록한다.'], hit:['{u}의 표본라벨이 확인한 범위 안에서 작용한다.', '{u}은(는) 표본라벨의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 표본라벨이 필요한 지점을 놓친다.', '{u}은(는) 표본라벨의 위치를 다시 잡는다.'], crit:['{u}은(는) 표본라벨의 순서와 힘을 정확히 맞춘다.', '{u}의 표본라벨이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 표본라벨을 중단한다.', '{u}은(는) 표본라벨을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5149']
  },
  {
    id:'SK_C5149', name:'용기밀봉', en:'Container Seal', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'밀봉면의 이물질을 치우고 뚜껑을 맞춘다. 깨진 용기는 밀폐할 수 없다.',
    lore:'밀봉면의 이물질을 치우고 뚜껑을 맞춘다. 깨진 용기는 밀폐할 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '용기밀봉'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C026', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 밀봉면의 이물질을 치우고 뚜껑을 맞춘다.'], hit:['{u}의 용기밀봉이 확인한 범위 안에서 작용한다.', '{u}은(는) 용기밀봉의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 용기밀봉이 필요한 지점을 놓친다.', '{u}은(는) 용기밀봉의 위치를 다시 잡는다.'], crit:['{u}은(는) 용기밀봉의 순서와 힘을 정확히 맞춘다.', '{u}의 용기밀봉이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 용기밀봉을 중단한다.', '{u}은(는) 용기밀봉을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5148']
  },
  {
    id:'SK_C5150', name:'조리온도눈', en:'Cooking Heat Check', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:2, tier:1, desc:'익힘 정도와 열이 고르지 않은 부분을 살핀다. 식중독 위험을 전부 판별하지 못한다.',
    lore:'익힘 정도와 열이 고르지 않은 부분을 살핀다. 식중독 위험을 전부 판별하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '조리온도눈'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 익힘 정도와 열이 고르지 않은 부분을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 조리온도눈이 확인한 범위 안에서 작용한다.', '{u}은(는) 조리온도눈의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 조리온도눈이 필요한 지점을 놓친다.', '{u}은(는) 조리온도눈의 위치를 다시 잡는다.'], crit:['{u}은(는) 조리온도눈의 순서와 힘을 정확히 맞춘다.', '{u}의 조리온도눈이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 조리온도눈을 중단한다.', '{u}은(는) 조리온도눈을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5151', name:'남은양재기', en:'Stock Estimate', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'남은 소모품을 작업 횟수와 대조한다. 정확한 계량이 필요한 물건은 따로 잰다.',
    lore:'남은 소모품을 작업 횟수와 대조한다. 정확한 계량이 필요한 물건은 따로 잰다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '남은양재기'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 남은 소모품을 작업 횟수와 대조한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 남은양재기가 확인한 범위 안에서 작용한다.', '{u}은(는) 남은양재기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 남은양재기가 필요한 지점을 놓친다.', '{u}은(는) 남은양재기의 위치를 다시 잡는다.'], crit:['{u}은(는) 남은양재기의 순서와 힘을 정확히 맞춘다.', '{u}의 남은양재기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 남은양재기를 중단한다.', '{u}은(는) 남은양재기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5152', name:'수리전점검', en:'Repair Inspection', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'전원을 끄고 손상 부위를 순서대로 살핀다. 전문 수리 자격을 대신하지 못한다.',
    lore:'전원을 끄고 손상 부위를 순서대로 살핀다. 전문 수리 자격을 대신하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '수리전점검'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 전원을 끄고 손상 부위를 순서대로 살핀다.'], hit:['{u}의 수리전점검이 확인한 범위 안에서 작용한다.', '{u}은(는) 수리전점검의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 수리전점검이 필요한 지점을 놓친다.', '{u}은(는) 수리전점검의 위치를 다시 잡는다.'], crit:['{u}은(는) 수리전점검의 순서와 힘을 정확히 맞춘다.', '{u}의 수리전점검이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 수리전점검을 중단한다.', '{u}은(는) 수리전점검을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5141']
  },
  {
    id:'SK_C5153', name:'짐무게분담', en:'Load Split', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'짐을 여러 가방에 나눠 중심을 맞춘다. 총무게와 운반 인원은 바뀌지 않는다.',
    lore:'짐을 여러 가방에 나눠 중심을 맞춘다. 총무게와 운반 인원은 바뀌지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '짐무게분담'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 짐을 여러 가방에 나눠 중심을 맞춘다.'], hit:['{u}의 짐무게분담이 확인한 범위 안에서 작용한다.', '{u}은(는) 짐무게분담의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 짐무게분담이 필요한 지점을 놓친다.', '{u}은(는) 짐무게분담의 위치를 다시 잡는다.'], crit:['{u}은(는) 짐무게분담의 순서와 힘을 정확히 맞춘다.', '{u}의 짐무게분담이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 짐무게분담을 중단한다.', '{u}은(는) 짐무게분담을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5147']
  },
  {
    id:'SK_C5154', name:'영수증묶기', en:'Receipt Bundle', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'작업별 영수증과 지급 내역을 나눠 보관한다. 누락된 영수증을 복원하지 못한다.',
    lore:'작업별 영수증과 지급 내역을 나눠 보관한다. 누락된 영수증을 복원하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B30', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '영수증묶기'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 작업별 영수증과 지급 내역을 나눠 보관한다.'], hit:['{u}의 영수증묶기가 확인한 범위 안에서 작용한다.', '{u}은(는) 영수증묶기의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 영수증묶기가 필요한 지점을 놓친다.', '{u}은(는) 영수증묶기의 위치를 다시 잡는다.'], crit:['{u}은(는) 영수증묶기의 순서와 힘을 정확히 맞춘다.', '{u}의 영수증묶기가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 영수증묶기를 중단한다.', '{u}은(는) 영수증묶기를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5155', name:'교통시간표', en:'Transit Planning', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:2, rarity:1, tier:1, desc:'약속 시각에 맞춰 환승과 도보 시간을 정리한다. 실시간 지연까지 예측하지 못한다.',
    lore:'약속 시각에 맞춰 환승과 도보 시간을 정리한다. 실시간 지연까지 예측하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B24', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '교통시간표'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 약속 시각에 맞춰 환승과 도보 시간을 정리한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 교통시간표가 확인한 범위 안에서 작용한다.', '{u}은(는) 교통시간표의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 교통시간표가 필요한 지점을 놓친다.', '{u}은(는) 교통시간표의 위치를 다시 잡는다.'], crit:['{u}은(는) 교통시간표의 순서와 힘을 정확히 맞춘다.', '{u}의 교통시간표가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 교통시간표를 중단한다.', '{u}은(는) 교통시간표를 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5160']
  },
  {
    id:'SK_C5156', name:'공용품반납', en:'Shared Gear Return', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'빌린 물건의 상태와 수량을 확인해 돌려준다. 이미 생긴 손상은 별도 정산해야 한다.',
    lore:'빌린 물건의 상태와 수량을 확인해 돌려준다. 이미 생긴 손상은 별도 정산해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '공용품반납'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 빌린 물건의 상태와 수량을 확인해 돌려준다.'], hit:['{u}의 공용품반납이 확인한 범위 안에서 작용한다.', '{u}은(는) 공용품반납의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 공용품반납이 필요한 지점을 놓친다.', '{u}은(는) 공용품반납의 위치를 다시 잡는다.'], crit:['{u}은(는) 공용품반납의 순서와 힘을 정확히 맞춘다.', '{u}의 공용품반납이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 공용품반납을 중단한다.', '{u}은(는) 공용품반납을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5157', name:'날끝점검', en:'Edge Inspection', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'날의 이 빠짐과 휨을 빛에 비춰 살핀다. 내부 균열은 별도 검사가 필요하다.',
    lore:'날의 이 빠짐과 휨을 빛에 비춰 살핀다. 내부 균열은 별도 검사가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '날끝점검'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 날의 이 빠짐과 휨을 빛에 비춰 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 날끝점검이 확인한 범위 안에서 작용한다.', '{u}은(는) 날끝점검의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 날끝점검이 필요한 지점을 놓친다.', '{u}은(는) 날끝점검의 위치를 다시 잡는다.'], crit:['{u}은(는) 날끝점검의 순서와 힘을 정확히 맞춘다.', '{u}의 날끝점검이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 날끝점검을 중단한다.', '{u}은(는) 날끝점검을 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5158', name:'휴대등정비', en:'Lamp Care', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'접점과 고정부를 확인해 휴대등을 정비한다. 고장난 전지를 충전하지 못한다.',
    lore:'접점과 고정부를 확인해 휴대등을 정비한다. 고장난 전지를 충전하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '휴대등정비'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 접점과 고정부를 확인해 휴대등을 정비한다.'], hit:['{u}의 휴대등정비가 확인한 범위 안에서 작용한다.', '{u}은(는) 휴대등정비의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 휴대등정비가 필요한 지점을 놓친다.', '{u}은(는) 휴대등정비의 위치를 다시 잡는다.'], crit:['{u}은(는) 휴대등정비의 순서와 힘을 정확히 맞춘다.', '{u}의 휴대등정비가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 휴대등정비를 중단한다.', '{u}은(는) 휴대등정비를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5159', name:'물건찾는순서', en:'Search Order', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:2, tier:1, desc:'마지막 사용 위치부터 소지품을 순서대로 찾는다. 분실한 물건의 위치를 감지하지는 못한다.',
    lore:'마지막 사용 위치부터 소지품을 순서대로 찾는다. 분실한 물건의 위치를 감지하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '물건찾는순서'],
    risk:1, src:'codex', reaction:'관련 감각과 기억을 사용해 주변의 변화를 확인할 때', daily:true, lines:{use:['{u}은(는) 마지막 사용 위치부터 소지품을 순서대로 찾는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 물건찾는순서가 확인한 범위 안에서 작용한다.', '{u}은(는) 물건찾는순서의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 물건찾는순서가 필요한 지점을 놓친다.', '{u}은(는) 물건찾는순서의 위치를 다시 잡는다.'], crit:['{u}은(는) 물건찾는순서의 순서와 힘을 정확히 맞춘다.', '{u}의 물건찾는순서가 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 물건찾는순서를 중단한다.', '{u}은(는) 물건찾는순서를 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5160', name:'출근전확인', en:'Departure Check', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'열쇠와 등록증 및 작업 장비를 나가기 전에 확인한다. 확인표에 없는 물건은 빠뜨릴 수 있다.',
    lore:'열쇠와 등록증 및 작업 장비를 나가기 전에 확인한다. 확인표에 없는 물건은 빠뜨릴 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '출근전확인'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}의 조건을 확인한다.', '{u}은(는) 열쇠와 등록증 및 작업 장비를 나가기 전에 확인한다.'], hit:['{u}의 출근전확인이 확인한 범위 안에서 작용한다.', '{u}은(는) 출근전확인의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 출근전확인이 필요한 지점을 놓친다.', '{u}은(는) 출근전확인의 위치를 다시 잡는다.'], crit:['{u}은(는) 출근전확인의 순서와 힘을 정확히 맞춘다.', '{u}의 출근전확인이 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 출근전확인을 중단한다.', '{u}은(는) 출근전확인을 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5155']
  },
  // 2026-10-24 추가분: 기존 ID와 행을 보존한다.
  {
    id:'SK_C5161', name:'젖은장갑교대', en:'Wet Glove Rotation', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:2, tier:1, desc:'젖은 장갑을 벗고 마른 장갑으로 바꿀 순서를 고른다. 마른 장갑과 쉴 자리가 필요하다.',
    lore:'젖은 장갑을 벗고 마른 장갑으로 바꿀 순서를 고른다. 마른 장갑과 쉴 자리가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '젖은장갑교대'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 젖은 장갑을 벗고 마른 장갑으로 바꿀 순서를 고른다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5168']
  },
  {
    id:'SK_C5162', name:'차가운벽분리', en:'Cold Wall Gap', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'몸과 찬 벽 사이에 가방이나 천을 놓아 열 손실을 줄인다. 보온 재료가 없으면 효과가 작다.',
    lore:'몸과 찬 벽 사이에 가방이나 천을 놓아 열 손실을 줄인다. 보온 재료가 없으면 효과가 작다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '차가운벽분리'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, se:[{se:'SE_C021', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 몸과 찬 벽 사이에 가방이나 천을 놓아 열 손실을 줄인다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5163', name:'식량봉투점검', en:'Ration Seal Check', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'식량 봉투의 팽창과 밀봉 손상을 살핀다. 외관만으로 식품 안전을 확정하지 못한다.',
    lore:'식량 봉투의 팽창과 밀봉 손상을 살핀다. 외관만으로 식품 안전을 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '식량봉투점검'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 식량 봉투의 팽창과 밀봉 손상을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5164', name:'우천고정끈', en:'Rain Strap Set', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'빗물에 미끄러지는 장비끈을 다시 고정한다. 손상된 끈은 교체해야 한다.',
    lore:'빗물에 미끄러지는 장비끈을 다시 고정한다. 손상된 끈은 교체해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '우천고정끈'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C028', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 빗물에 미끄러지는 장비끈을 다시 고정한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5165', name:'쉼터배수눈', en:'Shelter Drain Watch', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'쉬려는 곳으로 빗물이 모이는 방향을 읽는다. 급격한 범람을 모두 예측하지 못한다.',
    lore:'쉬려는 곳으로 빗물이 모이는 방향을 읽는다. 급격한 범람을 모두 예측하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '쉼터배수눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 쉬려는 곳으로 빗물이 모이는 방향을 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5166', name:'야간표식띠', en:'Night Marker Strip', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:2, tier:1, desc:'동료가 알아볼 표식띠를 몸 바깥에 단다. 표식은 적에게도 보인다.',
    lore:'동료가 알아볼 표식띠를 몸 바깥에 단다. 표식은 적에게도 보인다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '야간표식띠'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 동료가 알아볼 표식띠를 몸 바깥에 단다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5167', name:'오염봉투분리', en:'Contamination Bag Sort', scope:'common', kind:'액티브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'오염된 물품을 청결 물품과 다른 봉투에 넣는다. 새 봉투와 표시할 도구가 필요하다.',
    lore:'오염된 물품을 청결 물품과 다른 봉투에 넣는다. 새 봉투와 표시할 도구가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '오염봉투분리'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C026', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 오염된 물품을 청결 물품과 다른 봉투에 넣는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5168', name:'신발젖음눈', en:'Boot Moisture Check', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'신발 안의 젖음과 마찰 변화를 구별한다. 젖은 신발을 스스로 말리지는 못한다.',
    lore:'신발 안의 젖음과 마찰 변화를 구별한다. 젖은 신발을 스스로 말리지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '신발젖음눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 신발 안의 젖음과 마찰 변화를 구별한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5161']
  },
  {
    id:'SK_C5169', name:'대피집결기억', en:'Assembly Recall', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'합의한 집결 장소와 확인 신호를 기억한다. 집결지가 실제로 안전한지는 다시 확인해야 한다.',
    lore:'합의한 집결 장소와 확인 신호를 기억한다. 집결지가 실제로 안전한지는 다시 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '대피집결기억'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 합의한 집결 장소와 확인 신호를 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5188']
  },
  {
    id:'SK_C5170', name:'귀가소모점검', en:'Return Fatigue Check', scope:'common', kind:'패시브',
    cat:'SKC_SURVIVE', grade:1, rarity:1, tier:1, desc:'돌아갈 거리에 필요한 물과 기력을 함께 가늠한다. 돌발 우회로의 소모는 달라질 수 있다.',
    lore:'돌아갈 거리에 필요한 물과 기력을 함께 가늠한다. 돌발 우회로의 소모는 달라질 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_B35', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생존', '귀가소모점검'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 돌아갈 거리에 필요한 물과 기력을 함께 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5234']
  },
  {
    id:'SK_C5171', name:'헛손당김', en:'Empty Hand Feint', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:2, tier:1, desc:'빈손을 짧게 내밀어 상대의 시선을 나눈다. 상대가 속아 줄 것이라고 보장하지 못한다.',
    lore:'빈손을 짧게 내밀어 상대의 시선을 나눈다. 상대가 속아 줄 것이라고 보장하지 못한다.', target:'enemy', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '헛손당김'],
    risk:2, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C008', chance:0.5, turns:1}], ai:{enemies:1},
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 빈손을 짧게 내밀어 상대의 시선을 나눈다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5172', name:'방패손바꿈', en:'Shield Hand Switch', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'방패를 받친 뒤 손잡이를 바꿔 쥔다. 바꾸는 동안 방호면이 좁아진다.',
    lore:'방패를 받친 뒤 손잡이를 바꿔 쥔다. 바꾸는 동안 방호면이 좁아진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '방패손바꿈'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C014', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 방패를 받친 뒤 손잡이를 바꿔 쥔다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5173', name:'발판한칸', en:'One Footing Check', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'공격 전에 자기 발이 닿을 한 칸을 확인한다. 확인하는 동안 공격이 늦어진다.',
    lore:'공격 전에 자기 발이 닿을 한 칸을 확인한다. 확인하는 동안 공격이 늦어진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '발판한칸'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C016', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 공격 전에 자기 발이 닿을 한 칸을 확인한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5175']
  },
  {
    id:'SK_C5174', name:'끈걸림풀림', en:'Strap Snag Release', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'장비끈이 팔에 걸린 지점을 손으로 푼다. 찢어진 끈은 수선해야 한다.',
    lore:'장비끈이 팔에 걸린 지점을 손으로 푼다. 찢어진 끈은 수선해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '끈걸림풀림'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 장비끈이 팔에 걸린 지점을 손으로 푼다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5175', name:'반격여유눈', en:'Counter Window Read', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'상대의 큰 동작 뒤 남는 빈 간격을 읽는다. 빈틈이 실제 안전을 보장하지는 않는다.',
    lore:'상대의 큰 동작 뒤 남는 빈 간격을 읽는다. 빈틈이 실제 안전을 보장하지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '반격여유눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 상대의 큰 동작 뒤 남는 빈 간격을 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5173']
  },
  {
    id:'SK_C5176', name:'양옆사선눈', en:'Flank Lane Check', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:2, tier:1, desc:'자기 공격선 양옆의 동료 위치를 살핀다. 사각에서 들어오는 사람은 놓칠 수 있다.',
    lore:'자기 공격선 양옆의 동료 위치를 살핀다. 사각에서 들어오는 사람은 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '양옆사선눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 자기 공격선 양옆의 동료 위치를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5177', name:'장전손가림', en:'Reload Hand Cover', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'재장전하는 손 앞에 얇은 파편막을 둔다. 재장전 자체를 빠르게 하지는 않는다.',
    lore:'재장전하는 손 앞에 얇은 파편막을 둔다. 재장전 자체를 빠르게 하지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '장전손가림'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C013', chance:1, turns:2}], shield:0.35,
    ai:{hpBelow:0.7}, lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 재장전하는 손 앞에 얇은 파편막을 둔다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5180']
  },
  {
    id:'SK_C5178', name:'접근각나눔', en:'Approach Angle Split', scope:'common', kind:'액티브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'동료와 접근 방향이 겹치지 않도록 신호를 맞춘다. 상대의 동의와 응답이 필요하다.',
    lore:'동료와 접근 방향이 겹치지 않도록 신호를 맞춘다. 상대의 동의와 응답이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '접근각나눔'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 동료와 접근 방향이 겹치지 않도록 신호를 맞춘다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5179', name:'휘두름끝눈', en:'Swing End Watch', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'무기의 회수 끝이 향하는 위치를 읽는다. 무기의 반동을 없애지는 못한다.',
    lore:'무기의 회수 끝이 향하는 위치를 읽는다. 무기의 반동을 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '휘두름끝눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 무기의 회수 끝이 향하는 위치를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5180', name:'빈탄소리구별', en:'Empty Shot Sound', scope:'common', kind:'패시브',
    cat:'SKC_COMBAT', grade:1, rarity:1, tier:1, desc:'장비가 빈 상태에서 내는 익숙한 소리를 구별한다. 새 장비에서는 먼저 소리를 익혀야 한다.',
    lore:'장비가 빈 상태에서 내는 익숙한 소리를 구별한다. 새 장비에서는 먼저 소리를 익혀야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A06', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['전투 보조', '빈탄소리구별'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 장비가 빈 상태에서 내는 익숙한 소리를 구별한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5177']
  },
  {
    id:'SK_C5181', name:'표면습기촉', en:'Surface Moisture Touch', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:2, tier:1, desc:'안전하게 닿을 수 있는 면의 습기 차이를 읽는다. 전기나 오염 위험이 있는 면은 만지지 않는다.',
    lore:'안전하게 닿을 수 있는 면의 습기 차이를 읽는다. 전기나 오염 위험이 있는 면은 만지지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '표면습기촉'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 안전하게 닿을 수 있는 면의 습기 차이를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5190']
  },
  {
    id:'SK_C5182', name:'문경첩소리', en:'Hinge Sound Read', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'문 경첩의 마찰음에서 움직임의 변화를 읽는다. 소리 없는 장치는 놓칠 수 있다.',
    lore:'문 경첩의 마찰음에서 움직임의 변화를 읽는다. 소리 없는 장치는 놓칠 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '문경첩소리'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 문 경첩의 마찰음에서 움직임의 변화를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5183', name:'얕은기울기눈', en:'Shallow Tilt Read', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'가까운 물체의 기울기를 기준선과 대조한다. 정밀 수평계를 대신하지 못한다.',
    lore:'가까운 물체의 기울기를 기준선과 대조한다. 정밀 수평계를 대신하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '얕은기울기눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 가까운 물체의 기울기를 기준선과 대조한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5184', name:'남은빛흔들림', en:'Lamp Flicker Watch', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'휴대등의 밝기가 불규칙하게 변하는 것을 알아챈다. 빛의 변화만으로 고장 원인을 확정하지 못한다.',
    lore:'휴대등의 밝기가 불규칙하게 변하는 것을 알아챈다. 빛의 변화만으로 고장 원인을 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '남은빛흔들림'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 휴대등의 밝기가 불규칙하게 변하는 것을 알아챈다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5185', name:'가까운열기확인', en:'Near Heat Check', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'손을 대기 전에 가까운 표면의 열기를 확인한다. 내부 온도 전체를 알 수는 없다.',
    lore:'손을 대기 전에 가까운 표면의 열기를 확인한다. 내부 온도 전체를 알 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '가까운열기확인'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, se:[{se:'SE_C016', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 손을 대기 전에 가까운 표면의 열기를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5186', name:'끈마찰청취', en:'Cord Friction Listen', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:2, tier:1, desc:'당겨지는 끈이 모서리에 닿는 소리를 구별한다. 현장 소음이 크면 들리지 않을 수 있다.',
    lore:'당겨지는 끈이 모서리에 닿는 소리를 구별한다. 현장 소음이 크면 들리지 않을 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '끈마찰청취'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 당겨지는 끈이 모서리에 닿는 소리를 구별한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5187', name:'상자속빈틈', en:'Box Gap Estimate', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'안전하게 흔든 상자의 울림으로 큰 빈틈을 짐작한다. 위험물이나 파손 우려가 있으면 흔들지 않는다.',
    lore:'안전하게 흔든 상자의 울림으로 큰 빈틈을 짐작한다. 위험물이나 파손 우려가 있으면 흔들지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '상자속빈틈'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C016', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 안전하게 흔든 상자의 울림으로 큰 빈틈을 짐작한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5188', name:'먼표식대조', en:'Distant Marker Compare', scope:'common', kind:'액티브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'이미 아는 먼 표식과 현재 보이는 방향을 대조한다. 가려진 표식을 새로 볼 수는 없다.',
    lore:'이미 아는 먼 표식과 현재 보이는 방향을 대조한다. 가려진 표식을 새로 볼 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '먼표식대조'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C016', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 이미 아는 먼 표식과 현재 보이는 방향을 대조한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5169']
  },
  {
    id:'SK_C5189', name:'이중그림자눈', en:'Double Shadow Read', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'그림자 둘의 방향 차이로 조명 위치를 가늠한다. 반사광이 복잡하면 오차가 커진다.',
    lore:'그림자 둘의 방향 차이로 조명 위치를 가늠한다. 반사광이 복잡하면 오차가 커진다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '이중그림자눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 그림자 둘의 방향 차이로 조명 위치를 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5190', name:'접점변색눈', en:'Contact Discoloration', scope:'common', kind:'패시브',
    cat:'SKC_SENSE', grade:1, rarity:1, tier:1, desc:'전원을 끈 장비 접점의 변색을 살핀다. 변색이 없다고 안전한 것은 아니다.',
    lore:'전원을 끈 장비 접점의 변색을 살핀다. 변색이 없다고 안전한 것은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_A19', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['감지', '접점변색눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 전원을 끈 장비 접점의 변색을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5181']
  },
  {
    id:'SK_C5191', name:'처치손씻김', en:'Care Hand Rinse', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:2, tier:1, desc:'준비한 깨끗한 물로 처치 전 손을 씻는 순서를 돕는다. 손씻기만으로 모든 오염을 없애지는 못한다.',
    lore:'준비한 깨끗한 물로 처치 전 손을 씻는 순서를 돕는다. 손씻기만으로 모든 오염을 없애지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '처치손씻김'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 준비한 깨끗한 물로 처치 전 손을 씻는 순서를 돕는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5192', name:'장갑벗는순서', en:'Glove Removal Order', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'오염된 장갑의 바깥면이 피부에 닿지 않게 벗는다. 장갑이 찢어졌다면 별도 확인이 필요하다.',
    lore:'오염된 장갑의 바깥면이 피부에 닿지 않게 벗는다. 장갑이 찢어졌다면 별도 확인이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '장갑벗는순서'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 오염된 장갑의 바깥면이 피부에 닿지 않게 벗는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5193', name:'붕대젖음관찰', en:'Dressing Wetness Watch', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'붕대가 새로 젖는 위치와 속도를 살핀다. 관찰만으로 출혈을 멈추지는 못한다.',
    lore:'붕대가 새로 젖는 위치와 속도를 살핀다. 관찰만으로 출혈을 멈추지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '붕대젖음관찰'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 붕대가 새로 젖는 위치와 속도를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5195']
  },
  {
    id:'SK_C5194', name:'부목끝완충', en:'Splint Edge Padding', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'준비한 천으로 부목 끝과 피부 사이를 받친다. 골절을 맞추거나 움직임을 허용하는 기술은 아니다.',
    lore:'준비한 천으로 부목 끝과 피부 사이를 받친다. 골절을 맞추거나 움직임을 허용하는 기술은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '부목끝완충'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, se:[{se:'SE_C018', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 준비한 천으로 부목 끝과 피부 사이를 받친다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5200']
  },
  {
    id:'SK_C5195', name:'후송기록전달', en:'Evacuation Handover', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'관찰한 변화와 처치 시각을 후송 담당에게 전달한다. 진단을 확정하거나 의료진을 대신하지 못한다.',
    lore:'관찰한 변화와 처치 시각을 후송 담당에게 전달한다. 진단을 확정하거나 의료진을 대신하지 못한다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '후송기록전달'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 관찰한 변화와 처치 시각을 후송 담당에게 전달한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5193']
  },
  {
    id:'SK_C5196', name:'처치수량눈', en:'Care Stock Watch', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:2, tier:1, desc:'사용한 처치 물품과 남은 수량을 연결해 기억한다. 없는 물품을 보충하지 못한다.',
    lore:'사용한 처치 물품과 남은 수량을 연결해 기억한다. 없는 물품을 보충하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '처치수량눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 사용한 처치 물품과 남은 수량을 연결해 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5197', name:'가벼운쓸림보조', en:'Abrasion Support', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'깨끗이 확인한 얕은 쓸림 부위의 회복을 조금 돕는다. 깊거나 오염된 상처에는 적용하지 않는다.',
    lore:'깨끗이 확인한 얕은 쓸림 부위의 회복을 조금 돕는다. 깊거나 오염된 상처에는 적용하지 않는다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '가벼운쓸림보조'],
    risk:1, src:'codex', cost:{mp:10, cd:4}, se:[{se:'SE_C019', chance:1, turns:2}], heal:0.2,
    ai:{allyHurt:true}, daily:true, lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 깨끗이 확인한 얕은 쓸림 부위의 회복을 조금 돕는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5198', name:'휴식중통증눈', en:'Rest Pain Watch', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'쉬는 동안 달라지는 통증 표현과 자세를 살핀다. 원인 질환이나 손상을 확정하지 못한다.',
    lore:'쉬는 동안 달라지는 통증 표현과 자세를 살핀다. 원인 질환이나 손상을 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '휴식중통증눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 쉬는 동안 달라지는 통증 표현과 자세를 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5199', name:'처치포장점검', en:'Care Package Check', scope:'common', kind:'패시브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'처치 도구 포장의 손상과 개봉 표시를 읽는다. 포장이 멀쩡해도 사용 기한을 따로 봐야 한다.',
    lore:'처치 도구 포장의 손상과 개봉 표시를 읽는다. 포장이 멀쩡해도 사용 기한을 따로 봐야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '처치포장점검'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 처치 도구 포장의 손상과 개봉 표시를 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5200', name:'부축전확인', en:'Pre Assist Check', scope:'common', kind:'액티브',
    cat:'SKC_HEAL', grade:1, rarity:1, tier:1, desc:'부축하기 전에 동료에게 아픈 부위와 움직일 수 있는 범위를 묻는다. 목이나 척추 손상이 의심되면 함부로 옮기지 않는다.',
    lore:'부축하기 전에 동료에게 아픈 부위와 움직일 수 있는 범위를 묻는다. 목이나 척추 손상이 의심되면 함부로 옮기지 않는다.', target:'ally', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B37', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['회복·응급', '부축전확인'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 부축하기 전에 동료에게 아픈 부위와 움직일 수 있는 범위를 묻는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5194']
  },
  {
    id:'SK_C5201', name:'가로끈넘기', en:'Cross Cord Step', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:2, tier:1, desc:'확인한 낮은 끈을 장비에 걸리지 않게 넘어간다. 폭발물이나 함정 의심선에는 접근하지 않는다.',
    lore:'확인한 낮은 끈을 장비에 걸리지 않게 넘어간다. 폭발물이나 함정 의심선에는 접근하지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '가로끈넘기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C015', chance:1, turns:2}], move:'retreat',
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 확인한 낮은 끈을 장비에 걸리지 않게 넘어간다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5204']
  },
  {
    id:'SK_C5202', name:'문옆멈춤', en:'Door Side Stop', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'문이 열리는 방향 옆에서 속도를 줄여 선다. 문 반대편 위험을 알 수는 없다.',
    lore:'문이 열리는 방향 옆에서 속도를 줄여 선다. 문 반대편 위험을 알 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '문옆멈춤'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C014', chance:1, turns:2}], move:'retreat',
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 문이 열리는 방향 옆에서 속도를 줄여 선다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5203', name:'발목각유지', en:'Ankle Angle Control', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'울퉁불퉁한 바닥에서 발목이 꺾이는 각도를 줄인다. 이미 생긴 부상을 보완하지 못한다.',
    lore:'울퉁불퉁한 바닥에서 발목이 꺾이는 각도를 줄인다. 이미 생긴 부상을 보완하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '발목각유지'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 울퉁불퉁한 바닥에서 발목이 꺾이는 각도를 줄인다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5204', name:'등짐회전폭', en:'Pack Turn Width', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'등짐이 벽에 닿지 않을 회전 폭을 가늠한다. 통로가 너무 좁으면 짐을 내려야 한다.',
    lore:'등짐이 벽에 닿지 않을 회전 폭을 가늠한다. 통로가 너무 좁으면 짐을 내려야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '등짐회전폭'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 등짐이 벽에 닿지 않을 회전 폭을 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5201']
  },
  {
    id:'SK_C5205', name:'얕은물보폭', en:'Shallow Water Stride', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'바닥을 확인하며 얕은 물에서 짧게 걷는다. 깊은 곳과 급류는 건너지 않는다.',
    lore:'바닥을 확인하며 얕은 물에서 짧게 걷는다. 깊은 곳과 급류는 건너지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '얕은물보폭'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], move:'retreat',
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 바닥을 확인하며 얕은 물에서 짧게 걷는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5206', name:'발끝이물눈', en:'Toe Debris Check', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:2, tier:1, desc:'발끝에 닿는 작은 이물질의 저항을 읽는다. 날카로운 물체를 맨발로 확인하지 않는다.',
    lore:'발끝에 닿는 작은 이물질의 저항을 읽는다. 날카로운 물체를 맨발로 확인하지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '발끝이물눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 발끝에 닿는 작은 이물질의 저항을 읽는다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5207', name:'사다리손교대', en:'Ladder Hand Change', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'고정한 사다리에서 손과 발의 교대 순서를 고른다. 약한 사다리의 강도를 높여 주지는 못한다.',
    lore:'고정한 사다리에서 손과 발의 교대 순서를 고른다. 약한 사다리의 강도를 높여 주지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '사다리손교대'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C028', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 고정한 사다리에서 손과 발의 교대 순서를 고른다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5210']
  },
  {
    id:'SK_C5208', name:'양손짐착지', en:'Two Hand Load Landing', scope:'common', kind:'액티브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'두 손으로 든 짐을 낮은 받침에 내려놓으며 무릎을 굽힌다. 높은 곳에서 뛰어내리는 용도로 쓰지 않는다.',
    lore:'두 손으로 든 짐을 낮은 받침에 내려놓으며 무릎을 굽힌다. 높은 곳에서 뛰어내리는 용도로 쓰지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '양손짐착지'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C018', chance:1, turns:2}], lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 두 손으로 든 짐을 낮은 받침에 내려놓으며 무릎을 굽힌다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5209', name:'뒤따름보폭', en:'Following Stride', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'앞사람과 간격을 두고 보폭을 맞춘다. 앞사람의 발판이 항상 안전한 것은 아니다.',
    lore:'앞사람과 간격을 두고 보폭을 맞춘다. 앞사람의 발판이 항상 안전한 것은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '뒤따름보폭'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 앞사람과 간격을 두고 보폭을 맞춘다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5210', name:'멈춤거리눈', en:'Stopping Distance Read', scope:'common', kind:'패시브',
    cat:'SKC_MOVE', grade:1, rarity:1, tier:1, desc:'바닥 상태에 따라 자기 제동 거리를 가늠한다. 예상보다 미끄러우면 멈추기 어렵다.',
    lore:'바닥 상태에 따라 자기 제동 거리를 가늠한다. 예상보다 미끄러우면 멈추기 어렵다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_BODY', scale2:'ABL_A05', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['이동', '멈춤거리눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', lines:{use:['{u}은(는) 바닥 상태에 따라 자기 제동 거리를 가늠한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5207']
  },
  {
    id:'SK_C5211', name:'확인한것나눔', en:'Known Fact Sorting', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:2, tier:1, desc:'확인한 사실과 아직 모르는 부분을 나눠 적는다. 기록한 사실도 잘못 관찰했을 수 있다.',
    lore:'확인한 사실과 아직 모르는 부분을 나눠 적는다. 기록한 사실도 잘못 관찰했을 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '확인한것나눔'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C016', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 확인한 사실과 아직 모르는 부분을 나눠 적는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5215']
  },
  {
    id:'SK_C5212', name:'반응앞호흡', en:'Breath Before Reply', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'대답하기 전에 짧게 숨을 고른다. 긴급한 상황에서는 행동을 늦출 수 있다.',
    lore:'대답하기 전에 짧게 숨을 고른다. 긴급한 상황에서는 행동을 늦출 수 있다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '반응앞호흡'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 대답하기 전에 짧게 숨을 고른다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5213']
  },
  {
    id:'SK_C5213', name:'반복생각표시', en:'Recurring Thought Mark', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'되풀이되는 생각을 알아채고 짧게 표시한다. 생각이 즉시 사라진다고 보장하지 못한다.',
    lore:'되풀이되는 생각을 알아채고 짧게 표시한다. 생각이 즉시 사라진다고 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '반복생각표시'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 되풀이되는 생각을 알아채고 짧게 표시한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5212']
  },
  {
    id:'SK_C5214', name:'아직할일분리', en:'Pending Task Sort', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'끝나지 않은 일과 지금 할 수 있는 일을 나눈다. 시간이나 자원이 새로 생기지는 않는다.',
    lore:'끝나지 않은 일과 지금 할 수 있는 일을 나눈다. 시간이나 자원이 새로 생기지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '아직할일분리'],
    risk:1, src:'codex', cost:{mp:6, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 끝나지 않은 일과 지금 할 수 있는 일을 나눈다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5215', name:'과한확신눈', en:'Confidence Check', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'근거보다 확신이 앞서는 순간을 돌아본다. 자기 편향을 전부 알아채지는 못한다.',
    lore:'근거보다 확신이 앞서는 순간을 돌아본다. 자기 편향을 전부 알아채지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '과한확신눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 근거보다 확신이 앞서는 순간을 돌아본다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5211']
  },
  {
    id:'SK_C5216', name:'기다림끝정리', en:'End Of Wait Reset', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:2, tier:1, desc:'오래 기다린 뒤 첫 행동을 다시 짚는다. 놓친 정보를 저절로 알 수는 없다.',
    lore:'오래 기다린 뒤 첫 행동을 다시 짚는다. 놓친 정보를 저절로 알 수는 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '기다림끝정리'],
    risk:1, src:'codex', cost:{mp:8, cd:3}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 오래 기다린 뒤 첫 행동을 다시 짚는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5217', name:'감정표현순서', en:'Feeling Statement Order', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'느낀 점과 관찰한 사실을 나눠 말할 순서를 고른다. 상대의 반응을 통제하지 못한다.',
    lore:'느낀 점과 관찰한 사실을 나눠 말할 순서를 고른다. 상대의 반응을 통제하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '감정표현순서'],
    risk:1, src:'codex', cost:{mp:5, cd:2}, se:[{se:'SE_C023', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 느낀 점과 관찰한 사실을 나눠 말할 순서를 고른다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5218', name:'자기속도눈', en:'Own Pace Watch', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'평소보다 급해진 말과 동작의 속도를 알아챈다. 알아차린다고 바로 진정되는 것은 아니다.',
    lore:'평소보다 급해진 말과 동작의 속도를 알아챈다. 알아차린다고 바로 진정되는 것은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '자기속도눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 평소보다 급해진 말과 동작의 속도를 알아챈다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5219', name:'주변되확인', en:'Surrounding Recheck', scope:'common', kind:'액티브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'긴 생각 뒤 시선을 돌려 현재 위치를 확인한다. 이미 놓친 사건을 복원하지 못한다.',
    lore:'긴 생각 뒤 시선을 돌려 현재 위치를 확인한다. 이미 놓친 사건을 복원하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '주변되확인'],
    risk:1, src:'codex', cost:{mp:7, cd:2}, se:[{se:'SE_C016', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 긴 생각 뒤 시선을 돌려 현재 위치를 확인한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5220', name:'쉰뒤차이눈', en:'After Rest Compare', scope:'common', kind:'패시브',
    cat:'SKC_MIND', grade:1, rarity:1, tier:1, desc:'쉬기 전과 뒤의 손 떨림과 호흡을 비교한다. 의료 상태를 수치로 확정하지 못한다.',
    lore:'쉬기 전과 뒤의 손 떨림과 호흡을 비교한다. 의료 상태를 수치로 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B09', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['정신', '쉰뒤차이눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 쉬기 전과 뒤의 손 떨림과 호흡을 비교한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5221', name:'변경조건확인', en:'Changed Terms Check', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:2, tier:1, desc:'이전 합의와 달라진 조건을 하나씩 확인한다. 상대가 숨긴 변경은 별도 증거가 필요하다.',
    lore:'이전 합의와 달라진 조건을 하나씩 확인한다. 상대가 숨긴 변경은 별도 증거가 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '변경조건확인'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 이전 합의와 달라진 조건을 하나씩 확인한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5230']
  },
  {
    id:'SK_C5222', name:'인용말분리', en:'Quoted Claim Sort', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'직접 본 사실과 남에게 들은 말을 나눠 전달한다. 전달한 말의 진실성을 보장하지 못한다.',
    lore:'직접 본 사실과 남에게 들은 말을 나눠 전달한다. 전달한 말의 진실성을 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '인용말분리'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 직접 본 사실과 남에게 들은 말을 나눠 전달한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5223', name:'응답시간맞춤', en:'Response Timing', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'상대가 대답할 시간을 남기고 말을 멈춘다. 상대가 대답해야 할 의무를 만들지는 못한다.',
    lore:'상대가 대답할 시간을 남기고 말을 멈춘다. 상대가 대답해야 할 의무를 만들지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '응답시간맞춤'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 상대가 대답할 시간을 남기고 말을 멈춘다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5224', name:'연락경로합의', en:'Contact Route Agreement', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'업무에 쓸 연락 경로와 확인 방식을 맞춘다. 합의하지 않은 연락을 강제하지 못한다.',
    lore:'업무에 쓸 연락 경로와 확인 방식을 맞춘다. 합의하지 않은 연락을 강제하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '연락경로합의'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 업무에 쓸 연락 경로와 확인 방식을 맞춘다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5225', name:'책임범위메모', en:'Responsibility Note', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'각자 동의한 책임 범위를 짧게 적는다. 법적 효력을 스스로 판단하지 못한다.',
    lore:'각자 동의한 책임 범위를 짧게 적는다. 법적 효력을 스스로 판단하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '책임범위메모'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 각자 동의한 책임 범위를 짧게 적는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5227']
  },
  {
    id:'SK_C5226', name:'말바뀜대조', en:'Statement Comparison', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:2, tier:1, desc:'앞서 들은 말과 지금의 표현 차이를 비교한다. 차이만으로 거짓말을 확정하지 못한다.',
    lore:'앞서 들은 말과 지금의 표현 차이를 비교한다. 차이만으로 거짓말을 확정하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '말바뀜대조'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 앞서 들은 말과 지금의 표현 차이를 비교한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5227', name:'공개범위묻기', en:'Disclosure Boundary', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'인계할 정보 중 공개해도 되는 범위를 묻는다. 동의하지 않은 개인정보를 퍼뜨리지 않는다.',
    lore:'인계할 정보 중 공개해도 되는 범위를 묻는다. 동의하지 않은 개인정보를 퍼뜨리지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '공개범위묻기'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C017', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 인계할 정보 중 공개해도 되는 범위를 묻는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5225']
  },
  {
    id:'SK_C5228', name:'이름호칭확인', en:'Form Of Address Check', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'상대가 원하는 이름과 호칭을 확인한다. 친밀감이 자동으로 생기지는 않는다.',
    lore:'상대가 원하는 이름과 호칭을 확인한다. 친밀감이 자동으로 생기지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '이름호칭확인'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 상대가 원하는 이름과 호칭을 확인한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5229', name:'남은질문정리', en:'Remaining Questions', scope:'common', kind:'패시브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'대화 중 확인하지 못한 질문을 구분해 기억한다. 상대가 답을 알고 있다고 보장하지 못한다.',
    lore:'대화 중 확인하지 못한 질문을 구분해 기억한다. 상대가 답을 알고 있다고 보장하지 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '남은질문정리'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 대화 중 확인하지 못한 질문을 구분해 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5230', name:'합의되읽기', en:'Agreement Readback', scope:'common', kind:'액티브',
    cat:'SKC_SOCIAL', grade:1, rarity:1, tier:1, desc:'합의한 내용을 끝에 짧게 되읽는다. 잘못 이해한 부분은 다시 확인해야 한다.',
    lore:'합의한 내용을 끝에 짧게 되읽는다. 잘못 이해한 부분은 다시 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_MIND', scale2:'ABL_B15', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['사회·교섭', '합의되읽기'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C024', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 합의한 내용을 끝에 짧게 되읽는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5221']
  },
  {
    id:'SK_C5231', name:'작업복건조순서', en:'Workwear Drying Order', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:2, tier:1, desc:'젖은 작업복을 재질과 오염에 따라 나눠 말린다. 제조사 지침과 적절한 건조 공간이 필요하다.',
    lore:'젖은 작업복을 재질과 오염에 따라 나눠 말린다. 제조사 지침과 적절한 건조 공간이 필요하다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '작업복건조순서'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C026', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 젖은 작업복을 재질과 오염에 따라 나눠 말린다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5232', name:'빌린물건기록', en:'Borrowed Item Note', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'빌린 물건의 수량과 반환 시각을 적는다. 기록만으로 분실을 막지는 못한다.',
    lore:'빌린 물건의 수량과 반환 시각을 적는다. 기록만으로 분실을 막지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '빌린물건기록'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 빌린 물건의 수량과 반환 시각을 적는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5237']
  },
  {
    id:'SK_C5233', name:'충전선구별', en:'Cable Sorting', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'장비에 맞는 충전선과 손상된 선을 나눠 둔다. 규격을 모르면 연결하지 않는다.',
    lore:'장비에 맞는 충전선과 손상된 선을 나눠 둔다. 규격을 모르면 연결하지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '충전선구별'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 장비에 맞는 충전선과 손상된 선을 나눠 둔다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']},
    combo:['SK_C5238']
  },
  {
    id:'SK_C5234', name:'남은교통비', en:'Transit Fare Check', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'귀가에 필요한 교통비와 남은 돈을 대조한다. 돈을 새로 만들어 주지는 않는다.',
    lore:'귀가에 필요한 교통비와 남은 돈을 대조한다. 돈을 새로 만들어 주지는 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '남은교통비'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 귀가에 필요한 교통비와 남은 돈을 대조한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5170']
  },
  {
    id:'SK_C5235', name:'보관함표식', en:'Locker Label', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'보관함의 내용과 인계자를 짧게 표시한다. 표식과 실제 내용은 따로 대조해야 한다.',
    lore:'보관함의 내용과 인계자를 짧게 표시한다. 표식과 실제 내용은 따로 대조해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '보관함표식'],
    risk:1, src:'codex', cost:{stamina:7, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 보관함의 내용과 인계자를 짧게 표시한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5236', name:'뚜껑나사눈', en:'Cap Thread Check', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:2, tier:1, desc:'용기 뚜껑의 나사산이 비뚤어진 곳을 살핀다. 깨진 뚜껑을 수리하지는 못한다.',
    lore:'용기 뚜껑의 나사산이 비뚤어진 곳을 살핀다. 깨진 뚜껑을 수리하지는 못한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '뚜껑나사눈'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 용기 뚜껑의 나사산이 비뚤어진 곳을 살핀다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5237', name:'기한표나누기', en:'Deadline Board', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'납품과 반납 및 개인 일정의 기한을 나눠 적는다. 일을 끝낼 시간을 자동으로 늘려 주지 않는다.',
    lore:'납품과 반납 및 개인 일정의 기한을 나눠 적는다. 일을 끝낼 시간을 자동으로 늘려 주지 않는다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '기한표나누기'],
    risk:1, src:'codex', cost:{stamina:5, cd:2}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 납품과 반납 및 개인 일정의 기한을 나눠 적는다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5232']
  },
  {
    id:'SK_C5238', name:'소모품개봉표', en:'Opened Stock Label', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'소모품을 개봉한 시각과 용도를 표시한다. 개봉 뒤 성능이 보장되는 것은 아니다.',
    lore:'소모품을 개봉한 시각과 용도를 표시한다. 개봉 뒤 성능이 보장되는 것은 아니다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '소모품개봉표'],
    risk:1, src:'codex', cost:{stamina:6, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 소모품을 개봉한 시각과 용도를 표시한다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}, combo:['SK_C5233']
  },
  {
    id:'SK_C5239', name:'작은부품기억', en:'Small Part Recall', scope:'common', kind:'패시브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'분해할 때 꺼낸 작은 부품의 순서를 기억한다. 처음부터 없던 부품은 알 수 없다.',
    lore:'분해할 때 꺼낸 작은 부품의 순서를 기억한다. 처음부터 없던 부품은 알 수 없다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{power:0}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '작은부품기억'],
    risk:1, src:'codex', reaction:'해당 기술의 감각과 기억으로 관련 조건을 확인할 때', daily:true, lines:{use:['{u}은(는) 분해할 때 꺼낸 작은 부품의 순서를 기억한다.', '{u}의 {s}이(가) 익숙한 확인 순서로 이어진다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  },
  {
    id:'SK_C5240', name:'퇴근정리선', en:'End Shift Layout', scope:'common', kind:'액티브',
    cat:'SKC_LIFE', grade:1, rarity:1, tier:1, desc:'다음 사람이 확인할 물건과 폐기할 물건을 나눈다. 폐기 기준을 모르면 담당자에게 확인해야 한다.',
    lore:'다음 사람이 확인할 물건과 폐기할 물건을 나눈다. 폐기 기준을 모르면 담당자에게 확인해야 한다.', target:'self', range:'near', area:1, hits:1,
    count:1, power:0, scale:'STAT_SENSE', scale2:'ABL_B31', acc:0,
    crit:0, maxLv:10, growth:{cost:-0.1, cd:-0.05}, mastery:['초입', '익숙함', '숙련', '정밀'], tags:['생활·기술', '퇴근정리선'],
    risk:1, src:'codex', cost:{stamina:8, cd:3}, se:[{se:'SE_C025', chance:1, turns:2}], daily:true,
    lines:{use:['{u}은(는) {s}에 필요한 조건을 확인한다.', '{u}은(는) 다음 사람이 확인할 물건과 폐기할 물건을 나눈다.'], hit:['{u}의 {s}이(가) 확인한 범위 안에서 작용한다.', '{u}은(는) {s}의 결과를 확인하고 손을 거둔다.'], miss:['{u}의 {s}이(가) 필요한 지점을 놓친다.', '{u}은(는) {s}의 위치를 다시 잡는다.'], crit:['{u}은(는) {s}의 순서와 힘을 정확히 맞춘다.', '{u}의 {s}이(가) 적은 낭비로 마무리된다.'], fail:['{u}은(는) 조건이 맞지 않아 {s}을(를) 중단한다.', '{u}은(는) {s}을(를) 멈추고 준비 상태를 다시 확인한다.']}
  }
]);
