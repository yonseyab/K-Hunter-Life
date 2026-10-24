/* Codex 01 · 1차 클래스 72개. 분류마다 12개. 모든 클래스의 각성 후보는 6개 중 2개다. */

def('classes', [
  {
    id:'CLS_C001', name:'장검사', alias:['긴칼'], en:'Longsword Warden', cat:'CC_MELEE',
    tier:1, rarity:1, desc:'장검의 긴 검선으로 좁은 출입구를 지키는 전열.', lore:'경비 업체 출입구 방어에서 일감을 구한다. 큰 동작 뒤 옆구리가 빈다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_TANK',
    roles:['ROLE_TANK', 'ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0001', 'SK_C0002', 'SK_C0003', 'SK_C0004', 'SK_C0005', 'SK_C0006'],
    passive:['SK_C0007'], learn:[{skill:'SK_C0008', lv:10}, {skill:'SK_C0009', lv:25}, {skill:'SK_C0010', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:43, mp:10},
    hpMul:1.3, mpMul:0.85, statReq:{STAT_BODY:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['장검'], armors:['경갑', '방검복'], fame:'common', pay:1, demand:3,
    jobs:['경비 업체 출입구 방어', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['문 옆에 설 때 검집이 통로를 막는지 확인한다.', '앉기 전에 긴 검집 끝을 옆으로 돌린다.', '퇴근하면 장검의 칼등에 난 흠집부터 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 장검사 항목을 다시 읽는다.', '{u}은(는) 장검사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 장검을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 장검사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 장검의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 좁은 통로의 검선에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C002', name:'쌍검사', alias:['양칼'], en:'Twinblade Worker', cat:'CC_MELEE',
    tier:1, rarity:1, desc:'쌍검을 번갈아 써 측면의 짧은 틈을 노리는 전열.', lore:'소형 게이트 측면 계약 현장에서 일감을 구한다. 양손이 묶이면 방어가 무너진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0011', 'SK_C0012', 'SK_C0013', 'SK_C0014', 'SK_C0015', 'SK_C0016'],
    passive:['SK_C0017'], learn:[{skill:'SK_C0018', lv:10}, {skill:'SK_C0019', lv:25}, {skill:'SK_C0020', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:38, mp:11},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['쌍검'], armors:['경갑', '방검복'], fame:'common', pay:1.05, demand:3,
    jobs:['소형 게이트 측면 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['한쪽 장갑이 닳으면 반대쪽 손바닥도 펼쳐 본다.', '물건을 받으며 어느 손이 비어 있는지 먼저 확인한다.', '쌍검의 무게 차이를 손에 올려 비교한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 쌍검사 항목을 다시 읽는다.', '{u}은(는) 쌍검사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 쌍검을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 쌍검사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 쌍검의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 좌우 검날의 교대에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C003', name:'장창병', alias:['긴창'], en:'Longspear Guard', cat:'CC_MELEE',
    tier:1, rarity:2, desc:'창끝으로 간격을 벌리고 길목의 진입을 막는 전열.', lore:'좁은 길목 전열 계약 현장에서 일감을 구한다. 뒤로 물러날 공간이 필요하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS', 'ROLE_TANK'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0021', 'SK_C0022', 'SK_C0023', 'SK_C0024', 'SK_C0025', 'SK_C0026'],
    passive:['SK_C0027'], learn:[{skill:'SK_C0028', lv:10}, {skill:'SK_C0029', lv:25}, {skill:'SK_C0030', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:39, mp:12},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:14}, ablReq:{ABL_A02:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['장창'], armors:['경갑', '방검복'], fame:'common', pay:1.1, demand:3,
    jobs:['좁은 길목 전열 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['엘리베이터에 타기 전에 창대를 접을 공간을 찾는다.', '좁은 문 앞에서는 뒷사람에게 먼저 신호한다.', '발뒤꿈치 뒤로 물러날 거리를 남기고 선다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 장창병 항목을 다시 읽는다.', '{u}은(는) 장창병 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 장창을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 장창병 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 장창의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 창끝과 발판의 간격에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C004', name:'철퇴병', alias:['파쇄조'], en:'Mace Breaker', cat:'CC_MELEE',
    tier:1, rarity:1, desc:'철퇴로 단단한 외피의 이음새를 두드리는 파쇄 담당.', lore:'갑각 마수 파쇄 계약 현장에서 일감을 구한다. 헛치면 무게를 되받는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0031', 'SK_C0032', 'SK_C0033', 'SK_C0034', 'SK_C0035', 'SK_C0036'],
    passive:['SK_C0037'], learn:[{skill:'SK_C0038', lv:10}, {skill:'SK_C0039', lv:25}, {skill:'SK_C0040', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:37, mp:10},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:15}, ablReq:{ABL_A02:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['철퇴'], armors:['경갑', '방검복'], fame:'common', pay:1.15, demand:3,
    jobs:['갑각 마수 파쇄 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['가방을 내려놓을 때 철퇴가 바닥을 찍지 않게 받친다.', '조용한 방에서는 금속 이음이 울리는 소리에 귀를 기울인다.', '귀가하면 어깨를 천천히 돌려 뻐근한 곳을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 철퇴병 항목을 다시 읽는다.', '{u}은(는) 철퇴병 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 철퇴를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 철퇴병 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 철퇴의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 갑각의 접합부에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C005', name:'격투사', alias:['권갑조'], en:'Close Quarters Fighter', cat:'CC_MELEE',
    tier:1, rarity:2, desc:'권갑과 몸의 축을 써 가까운 적을 상대하는 전열.', lore:'장비 반입 제한 구역 경호에서 일감을 구한다. 붙어야 하므로 부상 위험이 크다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0041', 'SK_C0042', 'SK_C0043', 'SK_C0044', 'SK_C0045', 'SK_C0046'],
    passive:['SK_C0047'], learn:[{skill:'SK_C0048', lv:10}, {skill:'SK_C0049', lv:25}, {skill:'SK_C0050', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:38, mp:11},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:16}, ablReq:{ABL_A02:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['권갑'], armors:['경갑', '방검복'], fame:'common', pay:1.2, demand:3,
    jobs:['장비 반입 제한 구역 경호', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['장갑을 벗고 손가락 관절을 하나씩 편다.', '붐비는 지하철에서 팔꿈치를 몸 가까이 붙인다.', '쉴 때 권갑 안쪽의 땀을 닦는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 격투사 항목을 다시 읽는다.', '{u}은(는) 격투사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 권갑을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 격투사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 권갑의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 붙잡힌 팔과 몸의 축에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C006', name:'도끼병', alias:['벌림조'], en:'Field Axeman', cat:'CC_MELEE',
    tier:1, rarity:2, desc:'도끼날을 걸고 당겨 방호면을 벌리는 근접 담당.', lore:'밀집 수풀 돌파 계약 현장에서 일감을 구한다. 날을 빼는 동안 손이 묶인다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0051', 'SK_C0052', 'SK_C0053', 'SK_C0054', 'SK_C0055', 'SK_C0056'],
    passive:['SK_C0057'], learn:[{skill:'SK_C0058', lv:10}, {skill:'SK_C0059', lv:25}, {skill:'SK_C0060', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:39, mp:12},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['한손도끼'], armors:['경갑', '방검복'], fame:'common', pay:1, demand:3,
    jobs:['밀집 수풀 돌파 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['도끼날을 넣기 전에 날 보호구의 끈을 확인한다.', '나무 손잡이가 젖으면 그늘에 세워 말린다.', '손바닥의 굳은살이 갈라진 곳을 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 도끼병 항목을 다시 읽는다.', '{u}은(는) 도끼병 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 한손도끼를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 도끼병 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 한손도끼의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 걸린 날과 당기는 힘에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C007', name:'호위병', alias:['동행조'], en:'Escort Guard', cat:'CC_MELEE',
    tier:1, rarity:1, desc:'보호할 사람 곁에 붙어 통과와 후퇴를 돕는 호위.', lore:'비전투 인력 현장 호위에서 일감을 구한다. 혼자 앞서가면 보호가 끊긴다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_TANK',
    roles:['ROLE_TANK', 'ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0061', 'SK_C0062', 'SK_C0063', 'SK_C0064', 'SK_C0065', 'SK_C0066'],
    passive:['SK_C0067'], learn:[{skill:'SK_C0068', lv:10}, {skill:'SK_C0069', lv:25}, {skill:'SK_C0070', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:43, mp:10},
    hpMul:1.3, mpMul:0.85, statReq:{STAT_BODY:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['단검과소형방패'], armors:['경갑', '방검복'], fame:'common', pay:1.05, demand:3,
    jobs:['비전투 인력 현장 호위', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['동행자가 문을 통과할 때까지 옆에서 기다린다.', '식당에서도 함께 온 사람의 자리를 먼저 확인한다.', '작업 뒤 보호 대상과 헤어진 시각을 기록한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 호위병 항목을 다시 읽는다.', '{u}은(는) 호위병 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 단검과소형방패를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 호위병 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 단검과소형방패의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 보호 대상과의 거리에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C008', name:'장봉사', alias:['봉조'], en:'Staff Handler', cat:'CC_MELEE',
    tier:1, rarity:3, desc:'긴 봉으로 반경을 관리하며 접근을 끊는 전열.', lore:'포획조 비살상 보조 업무로 일감을 구한다. 천장이 낮으면 회전이 막힌다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS', 'ROLE_TANK'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0071', 'SK_C0072', 'SK_C0073', 'SK_C0074', 'SK_C0075', 'SK_C0076'],
    passive:['SK_C0077'], learn:[{skill:'SK_C0078', lv:10}, {skill:'SK_C0079', lv:25}, {skill:'SK_C0080', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:38, mp:11},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:14}, ablReq:{ABL_A02:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['장봉'], armors:['경갑', '방검복'], fame:'common', pay:1.1, demand:3,
    jobs:['포획조 비살상 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['문을 열기 전에 봉 끝이 닿을 천장을 본다.', '봉을 세워 두면 넘어지지 않도록 벽에 고정한다.', '양손을 번갈아 쥐며 장봉의 휨을 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 장봉사 항목을 다시 읽는다.', '{u}은(는) 장봉사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 장봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 장봉사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 장봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 장봉의 회전 반경에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C009', name:'단도사', alias:['틈칼'], en:'Knife Specialist', cat:'CC_MELEE',
    tier:1, rarity:2, desc:'짧은 단도로 두꺼운 가죽 사이의 틈을 노리는 근접.', lore:'대형 마수 근접 보조 업무로 일감을 구한다. 정면에서 긴 무기에 밀린다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0081', 'SK_C0082', 'SK_C0083', 'SK_C0084', 'SK_C0085', 'SK_C0086'],
    passive:['SK_C0087'], learn:[{skill:'SK_C0088', lv:10}, {skill:'SK_C0089', lv:25}, {skill:'SK_C0090', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:39, mp:12},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:15}, ablReq:{ABL_A02:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['단도'], armors:['경갑', '방검복'], fame:'common', pay:1.15, demand:3,
    jobs:['대형 마수 근접 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['앉을 때 단도집이 몸을 누르는 위치를 고친다.', '얇은 끈을 보면 날 대신 손으로 풀 수 있는지 먼저 본다.', '손잡이에 남은 기름을 천으로 닦는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 단도사 항목을 다시 읽는다.', '{u}은(는) 단도사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 단도를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 단도사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 단도의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 가죽 사이의 좁은 틈에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C010', name:'편곤사', alias:['사슬추'], en:'Flail Handler', cat:'CC_MELEE',
    tier:1, rarity:3, desc:'사슬추의 휘는 궤도로 방호면 옆을 노리는 전열.', lore:'단단한 외피 개체 견제에서 일감을 구한다. 아군과 간격을 벌려야 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MDPS',
    roles:['ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0091', 'SK_C0092', 'SK_C0093', 'SK_C0094', 'SK_C0095', 'SK_C0096'],
    passive:['SK_C0097'], learn:[{skill:'SK_C0098', lv:10}, {skill:'SK_C0099', lv:25}, {skill:'SK_C0100', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:37, mp:10},
    hpMul:1.2, mpMul:0.85, statReq:{STAT_BODY:16}, ablReq:{ABL_A02:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['편곤'], armors:['경갑', '방검복'], fame:'common', pay:1.2, demand:3,
    jobs:['단단한 외피 개체 견제', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['사슬을 접어 넣기 전에 꼬인 고리를 푼다.', '주변 사람과 간격을 확인하고 장비를 꺼낸다.', '귀가하면 편곤 추의 고정핀을 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 편곤사 항목을 다시 읽는다.', '{u}은(는) 편곤사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 편곤을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 편곤사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 편곤의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 사슬 끝 추의 궤도에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C011', name:'돌격병', alias:['진입조'], en:'Breach Vanguard', cat:'CC_MELEE',
    tier:1, rarity:4, desc:'방패와 단창을 앞세워 짧은 진입로를 여는 선두.', lore:'브레이크 차단조 진입에서 일감을 구한다. 급정지하면 무릎에 부담이 간다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_TANK',
    roles:['ROLE_TANK', 'ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0101', 'SK_C0102', 'SK_C0103', 'SK_C0104', 'SK_C0105', 'SK_C0106'],
    passive:['SK_C0107'], learn:[{skill:'SK_C0108', lv:10}, {skill:'SK_C0109', lv:25}, {skill:'SK_C0110', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:43, mp:11},
    hpMul:1.3, mpMul:0.85, statReq:{STAT_BODY:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['단창과방패'], armors:['경갑', '방검복'], fame:'rare', pay:1, demand:3,
    jobs:['브레이크 차단조 진입', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['계단을 내려간 뒤 무릎 보호대 위치를 고친다.', '어깨를 문틀에 부딪치지 않도록 몸을 틀어 지난다.', '장비를 내려놓기 전에 방패의 손잡이 핀을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 돌격병 항목을 다시 읽는다.', '{u}은(는) 돌격병 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 단창과방패를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 돌격병 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 단창과방패의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 전진할 때 생기는 틈에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C012', name:'포획사', alias:['생포조'], en:'Capture Handler', cat:'CC_MELEE',
    tier:1, rarity:5, desc:'포획봉으로 관절을 제한해 생포를 돕는 전열.', lore:'생체 표본 포획 보조 업무로 일감을 구한다. 대상 체격 차이가 크면 풀린다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_TANK',
    roles:['ROLE_TANK', 'ROLE_MDPS'], range:'melee', resource:'stamina', pick:2, pool:['SK_C0111', 'SK_C0112', 'SK_C0113', 'SK_C0114', 'SK_C0115', 'SK_C0116'],
    passive:['SK_C0117'], learn:[{skill:'SK_C0118', lv:10}, {skill:'SK_C0119', lv:25}, {skill:'SK_C0120', lv:45}], stats:{STAT_BODY:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A01', 'ABL_A02', 'ABL_A04', 'ABL_A06'], growth:{hp:43, mp:12},
    hpMul:1.3, mpMul:0.85, statReq:{STAT_BODY:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['포획봉'], armors:['경갑', '방검복'], fame:'rare', pay:1.05, demand:3,
    jobs:['생체 표본 포획 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['포획봉의 잠금쇠를 닫았다가 다시 열어 본다.', '마찰로 뜨거워진 손바닥을 잠깐 편다.', '작업 기록에 대상의 크기와 풀린 고리를 함께 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 포획사 항목을 다시 읽는다.', '{u}은(는) 포획사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 포획봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 포획사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 포획봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 관절을 묶는 지렛대에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C013', name:'쇠뇌수', alias:['볼트조'], en:'Crossbow Operator', cat:'CC_RANGED',
    tier:1, rarity:1, desc:'쇠뇌의 장력을 관리하며 볼트를 보내는 후열.', lore:'저소음 게이트 사격 계약 현장에서 일감을 구한다. 재장전에 두 손이 필요하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0121', 'SK_C0122', 'SK_C0123', 'SK_C0124', 'SK_C0125', 'SK_C0126'],
    passive:['SK_C0127'], learn:[{skill:'SK_C0128', lv:10}, {skill:'SK_C0129', lv:25}, {skill:'SK_C0130', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:28, mp:13},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['쇠뇌'], armors:['경갑', '활동복'], fame:'common', pay:1, demand:3,
    jobs:['저소음 게이트 사격 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['시위를 풀기 전에 볼트가 남았는지 확인한다.', '볼트 케이스를 열면 깃이 휜 것부터 골라낸다.', '대기 중에는 활대 고정핀을 손끝으로 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 쇠뇌수 항목을 다시 읽는다.', '{u}은(는) 쇠뇌수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 쇠뇌를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 쇠뇌수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 쇠뇌의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 활대 장력과 볼트에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C014', name:'투창수', alias:['던짐창'], en:'Javelin Thrower', cat:'CC_RANGED',
    tier:1, rarity:1, desc:'투창의 무게와 회수 경로를 함께 관리하는 후열.', lore:'중형 마수 원거리 견제에서 일감을 구한다. 투창을 잃으면 선택지가 줄어든다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0131', 'SK_C0132', 'SK_C0133', 'SK_C0134', 'SK_C0135', 'SK_C0136'],
    passive:['SK_C0137'], learn:[{skill:'SK_C0138', lv:10}, {skill:'SK_C0139', lv:25}, {skill:'SK_C0140', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:29, mp:14},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['투창'], armors:['경갑', '활동복'], fame:'common', pay:1.05, demand:3,
    jobs:['중형 마수 원거리 견제', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['회수한 창의 수를 출발 전 수량과 대조한다.', '긴 가방을 세울 때 뒤에 사람이 있는지 본다.', '창촉에 남은 흙을 털어 날 보호구를 끼운다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 투창수 항목을 다시 읽는다.', '{u}은(는) 투창수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 투창을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 투창수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 투창의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 회수 가능한 창의 궤적에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C015', name:'투석수', alias:['돌팔매'], en:'Stone Slinger', cat:'CC_RANGED',
    tier:1, rarity:2, desc:'돌의 질량과 회전으로 낮은 비용의 화력을 내는 후열.', lore:'저비용 후열 화력 계약 현장에서 일감을 구한다. 불규칙한 돌은 빗나가기 쉽다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0141', 'SK_C0142', 'SK_C0143', 'SK_C0144', 'SK_C0145', 'SK_C0146'],
    passive:['SK_C0147'], learn:[{skill:'SK_C0148', lv:10}, {skill:'SK_C0149', lv:25}, {skill:'SK_C0150', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:30, mp:15},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:14}, ablReq:{ABL_A02:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['투석구'], armors:['경갑', '활동복'], fame:'common', pay:1.1, demand:3,
    jobs:['저비용 후열 화력 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['주머니의 돌을 크기별로 나눈다.', '바닥의 둥근 돌을 보면 먼저 무게를 가늠한다.', '투석구의 마모된 끈을 빛에 비춰 본다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 투석수 항목을 다시 읽는다.', '{u}은(는) 투석수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 투석구를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 투석수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 투석구의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 돌의 질량과 회전에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C016', name:'비도사', alias:['던짐칼'], en:'Throwing Knife Handler', cat:'CC_RANGED',
    tier:1, rarity:1, desc:'작은 투척칼로 끈과 노출 부위를 노리는 후열.', lore:'협소 게이트 사각 견제에서 일감을 구한다. 장갑이 두꺼우면 힘이 줄어든다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0151', 'SK_C0152', 'SK_C0153', 'SK_C0154', 'SK_C0155', 'SK_C0156'],
    passive:['SK_C0157'], learn:[{skill:'SK_C0158', lv:10}, {skill:'SK_C0159', lv:25}, {skill:'SK_C0160', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:28, mp:13},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:15}, ablReq:{ABL_A02:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['투척칼'], armors:['경갑', '활동복'], fame:'common', pay:1.15, demand:3,
    jobs:['협소 게이트 사각 견제', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['투척칼을 한 방향으로 정리해 넣는다.', '회수한 칼의 끝을 천에 대지 않고 확인한다.', '장갑을 끼면 손끝이 얼마나 둔해지는지 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 비도사 항목을 다시 읽는다.', '{u}은(는) 비도사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 투척칼을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 비도사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 투척칼의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 짧은 칼의 회전수에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C017', name:'마력사수', alias:['점탄조'], en:'Mana Rifle Operator', cat:'CC_RANGED',
    tier:1, rarity:2, desc:'응축 마력탄과 총열의 열을 관리하는 사격 담당.', lore:'도심 브레이크 사선 경계에서 일감을 구한다. 연속 발사하면 총열이 달아오른다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'mp', pick:2, pool:['SK_C0161', 'SK_C0162', 'SK_C0163', 'SK_C0164', 'SK_C0165', 'SK_C0166'],
    passive:['SK_C0167'], learn:[{skill:'SK_C0168', lv:10}, {skill:'SK_C0169', lv:25}, {skill:'SK_C0170', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A07', 'ABL_A17', 'ABL_A22'], growth:{hp:29, mp:14},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:16}, ablReq:{ABL_A02:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['마력총'], armors:['경갑', '활동복'], fame:'common', pay:1.2, demand:3,
    jobs:['도심 브레이크 사선 경계', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['총열이 식은 뒤 장비 가방을 닫는다.', '대기 중에는 총구를 안전 방향으로 돌려 둔다.', '전원부의 잔량과 사용한 탄 수를 함께 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 마력사수 항목을 다시 읽는다.', '{u}은(는) 마력사수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 마력총을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 마력사수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 마력총의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 탄에 실린 마력에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C018', name:'곡사수', alias:['고각조'], en:'Arc Shot Specialist', cat:'CC_RANGED',
    tier:1, rarity:2, desc:'높은 탄도로 엄폐 뒤의 표적을 노리는 궁술 담당.', lore:'엄폐 뒤 개체 견제에서 일감을 구한다. 천장이 낮으면 사거리가 줄어든다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0171', 'SK_C0172', 'SK_C0173', 'SK_C0174', 'SK_C0175', 'SK_C0176'],
    passive:['SK_C0177'], learn:[{skill:'SK_C0178', lv:10}, {skill:'SK_C0179', lv:25}, {skill:'SK_C0180', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:30, mp:15},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['곡사활'], armors:['경갑', '활동복'], fame:'common', pay:1, demand:3,
    jobs:['엄폐 뒤 개체 견제', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['건물에 들어가면 천장 높이를 먼저 본다.', '화살 깃을 정리하며 휜 화살을 따로 뺀다.', '훈련 기록에 낙점과 발사 각도를 같이 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 곡사수 항목을 다시 읽는다.', '{u}은(는) 곡사수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 곡사활을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 곡사수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 곡사활의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 높게 휘는 화살에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C019', name:'산탄수', alias:['산포조'], en:'Scatter Caster', cat:'CC_RANGED',
    tier:1, rarity:1, desc:'근거리에서 마력 알갱이를 넓게 퍼뜨리는 후열.', lore:'소형 군체 저지 계약 현장에서 일감을 구한다. 거리가 멀면 탄이 흩어진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'mp', pick:2, pool:['SK_C0181', 'SK_C0182', 'SK_C0183', 'SK_C0184', 'SK_C0185', 'SK_C0186'],
    passive:['SK_C0187'], learn:[{skill:'SK_C0188', lv:10}, {skill:'SK_C0189', lv:25}, {skill:'SK_C0190', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A07', 'ABL_A17', 'ABL_A22'], growth:{hp:28, mp:13},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['산탄마력총'], armors:['경갑', '활동복'], fame:'common', pay:1.05, demand:3,
    jobs:['소형 군체 저지 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['사격 전에 양옆 동료의 위치를 확인한다.', '바닥에 남은 탄흔을 보고 퍼진 폭을 가늠한다.', '총열의 열이 빠질 때까지 장갑을 벗지 않는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 산탄수 항목을 다시 읽는다.', '{u}은(는) 산탄수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 산탄마력총을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 산탄수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 산탄마력총의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 퍼지는 마력 알갱이에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C020', name:'저격수', alias:['긴사선'], en:'Long Shot Worker', cat:'CC_RANGED',
    tier:1, rarity:3, desc:'준비한 긴 사선으로 노출된 한 점을 노리는 사격수.', lore:'외곽 게이트 감시 계약 현장에서 일감을 구한다. 오래 조준하면 주변 시야가 좁아진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'mp', pick:2, pool:['SK_C0191', 'SK_C0192', 'SK_C0193', 'SK_C0194', 'SK_C0195', 'SK_C0196'],
    passive:['SK_C0197'], learn:[{skill:'SK_C0198', lv:10}, {skill:'SK_C0199', lv:25}, {skill:'SK_C0200', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A07', 'ABL_A17', 'ABL_A22'], growth:{hp:29, mp:14},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:14}, ablReq:{ABL_A02:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['장거리마력총'], armors:['경갑', '활동복'], fame:'common', pay:1.1, demand:3,
    jobs:['외곽 게이트 감시 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['창가에 앉으면 반사광이 생기는 각도를 본다.', '긴 조준 뒤에는 고개를 돌려 주변을 다시 확인한다.', '장비를 접기 전에 렌즈 덮개를 닫는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 저격수 항목을 다시 읽는다.', '{u}은(는) 저격수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 장거리마력총을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 저격수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 장거리마력총의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 먼 표적의 노출 부위에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C021', name:'표창수', alias:['회전날'], en:'Star Thrower', cat:'CC_RANGED',
    tier:1, rarity:2, desc:'회전하는 표창으로 여러 접근 각도를 견제하는 후열.', lore:'수풀 게이트 측면 정리에서 일감을 구한다. 돌벽에 튕긴 날이 위험하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0201', 'SK_C0202', 'SK_C0203', 'SK_C0204', 'SK_C0205', 'SK_C0206'],
    passive:['SK_C0207'], learn:[{skill:'SK_C0208', lv:10}, {skill:'SK_C0209', lv:25}, {skill:'SK_C0210', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:30, mp:15},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:15}, ablReq:{ABL_A02:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['철제표창'], armors:['경갑', '활동복'], fame:'common', pay:1.15, demand:3,
    jobs:['수풀 게이트 측면 정리', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['표창 날의 이 빠짐을 모서리부터 살핀다.', '콘크리트 벽 앞에서는 반사각을 먼저 본다.', '회수한 표창 수를 케이스 칸과 대조한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 표창수 항목을 다시 읽는다.', '{u}은(는) 표창수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 철제표창을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 표창수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 철제표창의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 회전 날의 접촉면에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C022', name:'투망수', alias:['그물조'], en:'Net Launcher', cat:'CC_RANGED',
    tier:1, rarity:3, desc:'그물코와 매듭추로 움직임을 제한하는 포획 담당.', lore:'군체 포획 및 구조 보조 업무로 일감을 구한다. 무거운 개체는 그물을 찢는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0211', 'SK_C0212', 'SK_C0213', 'SK_C0214', 'SK_C0215', 'SK_C0216'],
    passive:['SK_C0217'], learn:[{skill:'SK_C0218', lv:10}, {skill:'SK_C0219', lv:25}, {skill:'SK_C0220', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:28, mp:13},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:16}, ablReq:{ABL_A02:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['투망기'], armors:['경갑', '활동복'], fame:'common', pay:1.2, demand:3,
    jobs:['군체 포획 및 구조 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['그물코에 걸린 돌과 가지를 빼낸다.', '젖은 그물을 접기 전에 그늘에 널어 말린다.', '포획 뒤 끊어진 매듭의 위치를 기록한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 투망수 항목을 다시 읽는다.', '{u}은(는) 투망수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 투망기를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 투망수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 투망기의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 그물코에 걸리는 움직임에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C023', name:'탄궁수', alias:['철탄조'], en:'Pellet Bow Worker', cat:'CC_RANGED',
    tier:1, rarity:4, desc:'작은 철탄과 탄성을 활용하는 경량 사격 담당.', lore:'장비 경량화 파티 후열에서 일감을 구한다. 고무줄이 젖으면 탄도가 달라진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'stamina', pick:2, pool:['SK_C0221', 'SK_C0222', 'SK_C0223', 'SK_C0224', 'SK_C0225', 'SK_C0226'],
    passive:['SK_C0227'], learn:[{skill:'SK_C0228', lv:10}, {skill:'SK_C0229', lv:25}, {skill:'SK_C0230', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A06', 'ABL_A17', 'ABL_A22'], growth:{hp:29, mp:14},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:12}, ablReq:{ABL_A02:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['탄궁'], armors:['경갑', '활동복'], fame:'rare', pay:1, demand:3,
    jobs:['장비 경량화 파티 후열', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['탄띠가 젖으면 마른 천으로 닦는다.', '작은 철탄을 뚜껑 있는 용기에 넣는다.', '대기 중 손등의 탄띠 자국을 문지른다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 탄궁수 항목을 다시 읽는다.', '{u}은(는) 탄궁수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 탄궁을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 탄궁수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 탄궁의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작은 탄환의 탄성에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C024', name:'철환수', alias:['철구조'], en:'Iron Orb Operator', cat:'CC_RANGED',
    tier:1, rarity:5, desc:'마력으로 띄운 철구의 질량을 운용하는 후열.', lore:'철갑 개체 외피 견제에서 일감을 구한다. 무거운 철구를 오래 띄울 수 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_RDPS',
    roles:['ROLE_RDPS', 'ROLE_SCOUT'], range:'far', resource:'mp', pick:2, pool:['SK_C0231', 'SK_C0232', 'SK_C0233', 'SK_C0234', 'SK_C0235', 'SK_C0236'],
    passive:['SK_C0237'], learn:[{skill:'SK_C0238', lv:10}, {skill:'SK_C0239', lv:25}, {skill:'SK_C0240', lv:45}], stats:{STAT_BODY:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A02', 'ABL_A07', 'ABL_A17', 'ABL_A22'], growth:{hp:30, mp:15},
    hpMul:1, mpMul:0.95, statReq:{STAT_SENSE:13}, ablReq:{ABL_A02:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['철환'], armors:['경갑', '활동복'], fame:'rare', pay:1.05, demand:3,
    jobs:['철갑 개체 외피 견제', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['철구를 내려놓을 때 받침을 먼저 깐다.', '철구 표면의 흠집과 편마모를 살핀다.', '장갑을 벗기 전에 손에 남은 마력을 흘려보낸다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 철환수 항목을 다시 읽는다.', '{u}은(는) 철환수 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 철환을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 철환수 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 철환의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 마력으로 민 철구에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C025', name:'화술사', alias:['열작업자', '불씨조'], en:'Heat Channeler', cat:'CC_MAGIC',
    tier:1, rarity:1, desc:'작은 불씨와 국소 열로 공격과 소각을 맡는 술사.', lore:'잔해 소각 현장 보조 업무로 일감을 구한다. 가연물 근처에서는 출력을 낮춘다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0241', 'SK_C0242', 'SK_C0243', 'SK_C0244', 'SK_C0245', 'SK_C0246'],
    passive:['SK_C0247'], learn:[{skill:'SK_C0248', lv:10}, {skill:'SK_C0249', lv:25}, {skill:'SK_C0250', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:22, mp:28},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:12}, ablReq:{ABL_A07:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['내열봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1, demand:3,
    jobs:['잔해 소각 현장 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['히터 옆의 종이와 천을 무심코 치운다.', '작업 뒤 내열 장갑의 변색을 확인한다.', '소각 기록에 바람 방향을 함께 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 화술사 항목을 다시 읽는다.', '{u}은(는) 화술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 내열봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 화술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 내열봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 국소 열과 작은 불씨에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C01',
    affinity:['EL_C01'], weakEl:['EL_C02']
  },
  {
    id:'CLS_C026', name:'빙술사', alias:['냉각조'], en:'Frost Channeler', cat:'CC_MAGIC',
    tier:1, rarity:1, desc:'수분을 얼려 발판과 이동 경로를 바꾸는 술사.', lore:'냉각 설비 게이트 보조 업무로 일감을 구한다. 녹은 물이 아군 발을 미끄럽게 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0251', 'SK_C0252', 'SK_C0253', 'SK_C0254', 'SK_C0255', 'SK_C0256'],
    passive:['SK_C0257'], learn:[{skill:'SK_C0258', lv:10}, {skill:'SK_C0259', lv:25}, {skill:'SK_C0260', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:23, mp:29},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:13}, ablReq:{ABL_A07:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['냉각봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.05, demand:3,
    jobs:['냉각 설비 게이트 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['젖은 바닥을 보면 뒤따르는 동료에게 알린다.', '냉각봉의 물기를 닦고 케이스를 연 채 말린다.', '휴식 중 굳은 손가락을 천천히 편다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 빙술사 항목을 다시 읽는다.', '{u}은(는) 빙술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 냉각봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 빙술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 냉각봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 얇은 얼음과 냉기에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C02',
    affinity:['EL_C02'], weakEl:['EL_C01']
  },
  {
    id:'CLS_C027', name:'전류사', alias:['전하조'], en:'Current Channeler', cat:'CC_MAGIC',
    tier:1, rarity:2, desc:'도체의 전류 경로를 읽고 짧게 방전하는 술사.', lore:'전기 설비 인접 게이트 보조 업무로 일감을 구한다. 젖은 바닥에서는 우회 방전한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0261', 'SK_C0262', 'SK_C0263', 'SK_C0264', 'SK_C0265', 'SK_C0266'],
    passive:['SK_C0267'], learn:[{skill:'SK_C0268', lv:10}, {skill:'SK_C0269', lv:25}, {skill:'SK_C0270', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:24, mp:30},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:14}, ablReq:{ABL_A07:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['절연봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.1, demand:3,
    jobs:['전기 설비 인접 게이트 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['전원을 만지기 전에 절연 장갑을 확인한다.', '젖은 신발을 충전 단자 가까이에 두지 않는다.', '작업 기록에 우회 접지점을 표시한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 전류사 항목을 다시 읽는다.', '{u}은(는) 전류사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 절연봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 전류사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 절연봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 짧은 전류와 도체에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C03',
    affinity:['EL_C03'], weakEl:['EL_C07']
  },
  {
    id:'CLS_C028', name:'풍술사', alias:['환기조'], en:'Wind Channeler', cat:'CC_MAGIC',
    tier:1, rarity:1, desc:'공기의 흐름으로 간격 확보와 환기를 돕는 술사.', lore:'유독 분진 현장 환기에서 일감을 구한다. 밀폐 구역에서는 분진을 퍼뜨린다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0271', 'SK_C0272', 'SK_C0273', 'SK_C0274', 'SK_C0275', 'SK_C0276'],
    passive:['SK_C0277'], learn:[{skill:'SK_C0278', lv:10}, {skill:'SK_C0279', lv:25}, {skill:'SK_C0280', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:22, mp:28},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:15}, ablReq:{ABL_A07:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['풍향봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.15, demand:3,
    jobs:['유독 분진 현장 환기', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['창문을 열기 전에 실내 먼지의 흐름을 본다.', '마스크 필터가 어느 쪽부터 막혔는지 확인한다.', '환기를 마친 뒤 문이 닫히는 힘을 가늠한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 풍술사 항목을 다시 읽는다.', '{u}은(는) 풍술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 풍향봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 풍술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 풍향봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 좁게 모은 공기 흐름에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C04',
    affinity:['EL_C04'], weakEl:['EL_C05']
  },
  {
    id:'CLS_C029', name:'토술사', alias:['지반조'], en:'Earth Channeler', cat:'CC_MAGIC',
    tier:1, rarity:2, desc:'주변 흙과 자갈을 다져 길목을 바꾸는 술사.', lore:'지반 불안정 구역 보조 업무로 일감을 구한다. 철판 위에서는 붙잡을 흙이 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0281', 'SK_C0282', 'SK_C0283', 'SK_C0284', 'SK_C0285', 'SK_C0286'],
    passive:['SK_C0287'], learn:[{skill:'SK_C0288', lv:10}, {skill:'SK_C0289', lv:25}, {skill:'SK_C0290', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:23, mp:29},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:16}, ablReq:{ABL_A07:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['흙다짐봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.2, demand:3,
    jobs:['지반 불안정 구역 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['바닥에 새 금이 보이면 발을 옆으로 뺀다.', '신발 밑창에 낀 흙을 털어 낸다.', '공사장 옆을 지날 때 지반 표지판을 읽는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 토술사 항목을 다시 읽는다.', '{u}은(는) 토술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 흙다짐봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 토술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 흙다짐봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 다져진 흙과 자갈에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C05',
    affinity:['EL_C05'], weakEl:['EL_C04']
  },
  {
    id:'CLS_C030', name:'수류사', alias:['물길조'], en:'Water Channeler', cat:'CC_MAGIC',
    tier:1, rarity:2, desc:'준비한 물의 흐름과 수압을 조절하는 술사.', lore:'오염 구역 세척 보조 업무로 일감을 구한다. 주변 물을 무한히 만들 수 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0291', 'SK_C0292', 'SK_C0293', 'SK_C0294', 'SK_C0295', 'SK_C0296'],
    passive:['SK_C0297'], learn:[{skill:'SK_C0298', lv:10}, {skill:'SK_C0299', lv:25}, {skill:'SK_C0300', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:24, mp:30},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:12}, ablReq:{ABL_A07:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['수류관'], armors:['절연복', '마력 방호복'], fame:'common', pay:1, demand:3,
    jobs:['오염 구역 세척 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['출발 전에 물통의 잔량과 뚜껑을 확인한다.', '물길을 막는 머리카락과 잔해를 치운다.', '세척 뒤 배수되는 방향을 끝까지 본다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 수류사 항목을 다시 읽는다.', '{u}은(는) 수류사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 수류관을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 수류사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 수류관의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 가져온 물의 흐름에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C06',
    affinity:['EL_C06'], weakEl:['EL_C01']
  },
  {
    id:'CLS_C031', name:'광술사', alias:['조명조'], en:'Light Channeler', cat:'CC_MAGIC',
    tier:1, rarity:1, desc:'광량과 반사를 다뤄 조명과 견제를 맡는 술사.', lore:'암흑 구역 조명 계약 현장에서 일감을 구한다. 반사면을 잘못 잡으면 아군도 눈부시다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0301', 'SK_C0302', 'SK_C0303', 'SK_C0304', 'SK_C0305', 'SK_C0306'],
    passive:['SK_C0307'], learn:[{skill:'SK_C0308', lv:10}, {skill:'SK_C0309', lv:25}, {skill:'SK_C0310', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:22, mp:28},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:13}, ablReq:{ABL_A07:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['반사봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.05, demand:3,
    jobs:['암흑 구역 조명 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['휴대등을 켤 때 맞은편 사람의 눈을 피한다.', '렌즈에 묻은 손자국을 부드러운 천으로 닦는다.', '어두운 곳에 들어가기 전에 잠깐 시선을 낮춘다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 광술사 항목을 다시 읽는다.', '{u}은(는) 광술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 반사봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 광술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 반사봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 퍼지는 빛과 눈부심에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C07',
    affinity:['EL_C07'], weakEl:['EL_C08']
  },
  {
    id:'CLS_C032', name:'암술사', alias:['차광조'], en:'Shade Channeler', cat:'CC_MAGIC',
    tier:1, rarity:3, desc:'주변 빛과 윤곽을 흐려 노출을 줄이는 술사.', lore:'야행성 개체 관측 보조 업무로 일감을 구한다. 완전한 은신이나 무적이 되지는 않는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0311', 'SK_C0312', 'SK_C0313', 'SK_C0314', 'SK_C0315', 'SK_C0316'],
    passive:['SK_C0317'], learn:[{skill:'SK_C0318', lv:10}, {skill:'SK_C0319', lv:25}, {skill:'SK_C0320', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:23, mp:29},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:14}, ablReq:{ABL_A07:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['차광봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.1, demand:3,
    jobs:['야행성 개체 관측 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['문틈에서 새는 빛을 먼저 본다.', '야간 작업 뒤에는 조명을 천천히 밝힌다.', '차광봉의 틈을 손으로 가려 빛샘을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 암술사 항목을 다시 읽는다.', '{u}은(는) 암술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 차광봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 암술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 차광봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 광량이 낮은 구역에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C08',
    affinity:['EL_C08'], weakEl:['EL_C07']
  },
  {
    id:'CLS_C033', name:'독술사', alias:['독무조'], en:'Toxin Channeler', cat:'CC_MAGIC',
    tier:1, rarity:2, desc:'소량의 마력성 독과 잔류 오염을 다루는 술사.', lore:'오염 개체 격리 계약 현장에서 일감을 구한다. 독 내성 개체에는 효과가 약하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0321', 'SK_C0322', 'SK_C0323', 'SK_C0324', 'SK_C0325', 'SK_C0326'],
    passive:['SK_C0327'], learn:[{skill:'SK_C0328', lv:10}, {skill:'SK_C0329', lv:25}, {skill:'SK_C0330', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:24, mp:30},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:15}, ablReq:{ABL_A07:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['밀폐분사관'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.15, demand:3,
    jobs:['오염 개체 격리 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['분사관의 마개를 닫고 한 번 더 확인한다.', '오염된 장갑을 벗기 전에 폐기 봉투를 편다.', '약한 냄새가 나도 마스크를 벗지 않는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 독술사 항목을 다시 읽는다.', '{u}은(는) 독술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 밀폐분사관을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 독술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 밀폐분사관의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 소량의 마력성 독에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C09',
    affinity:['EL_C09'], weakEl:['EL_C10']
  },
  {
    id:'CLS_C034', name:'음술사', alias:['진동조'], en:'Sound Channeler', cat:'CC_MAGIC',
    tier:1, rarity:3, desc:'매질을 따라 전하는 진동과 소리를 다루는 술사.', lore:'반향 지형 탐사 보조 업무로 일감을 구한다. 좁은 방에서는 반사음이 겹친다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0331', 'SK_C0332', 'SK_C0333', 'SK_C0334', 'SK_C0335', 'SK_C0336'],
    passive:['SK_C0337'], learn:[{skill:'SK_C0338', lv:10}, {skill:'SK_C0339', lv:25}, {skill:'SK_C0340', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:22, mp:28},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:16}, ablReq:{ABL_A07:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['진동봉'], armors:['절연복', '마력 방호복'], fame:'common', pay:1.2, demand:3,
    jobs:['반향 지형 탐사 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['문을 세게 닫는 소리에 어깨를 움츠린다.', '작업 뒤 귀마개의 오염을 확인한다.', '조용한 곳에서 잔향이 남는 시간을 잰다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 음술사 항목을 다시 읽는다.', '{u}은(는) 음술사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 진동봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 음술사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 진동봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 지향성 진동과 소리에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C11',
    affinity:['EL_C11'], weakEl:['EL_C12']
  },
  {
    id:'CLS_C035', name:'자력사', alias:['철편조'], en:'Magnetism Channeler', cat:'CC_MAGIC',
    tier:1, rarity:4, desc:'철성 물체의 끌림과 밀림을 운용하는 술사.', lore:'금속 잔해 회수 계약 현장에서 일감을 구한다. 비금속 개체에는 직접 힘이 닿지 않는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0341', 'SK_C0342', 'SK_C0343', 'SK_C0344', 'SK_C0345', 'SK_C0346'],
    passive:['SK_C0347'], learn:[{skill:'SK_C0348', lv:10}, {skill:'SK_C0349', lv:25}, {skill:'SK_C0350', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:23, mp:29},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:12}, ablReq:{ABL_A07:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['자성봉'], armors:['절연복', '마력 방호복'], fame:'rare', pay:1, demand:3,
    jobs:['금속 잔해 회수 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['가방 속 금속 공구를 나눠 고정한다.', '자성봉을 내려놓기 전에 작은 철물을 치운다.', '회수한 철편에 다른 재료가 붙었는지 살핀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 자력사 항목을 다시 읽는다.', '{u}은(는) 자력사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 자성봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 자력사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 자성봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 철성 물체의 끌림에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C12',
    affinity:['EL_C12'], weakEl:['EL_C11']
  },
  {
    id:'CLS_C036', name:'압력사', alias:['감압조'], en:'Pressure Channeler', cat:'CC_MAGIC',
    tier:1, rarity:5, desc:'좁은 면적의 압력차로 간격을 조절하는 술사.', lore:'밀폐 공간 감압 보조 업무로 일감을 구한다. 급격한 압력 변화가 귀를 해친다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_MAGE',
    roles:['ROLE_MAGE', 'ROLE_SUP'], range:'far', resource:'mp', pick:2, pool:['SK_C0351', 'SK_C0352', 'SK_C0353', 'SK_C0354', 'SK_C0355', 'SK_C0356'],
    passive:['SK_C0357'], learn:[{skill:'SK_C0358', lv:10}, {skill:'SK_C0359', lv:25}, {skill:'SK_C0360', lv:45}], stats:{STAT_MANA:3, STAT_MIND:1, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A08', 'ABL_A09', 'ABL_A10'], growth:{hp:24, mp:30},
    hpMul:0.85, mpMul:1.3, statReq:{STAT_MANA:13}, ablReq:{ABL_A07:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['압력환'], armors:['절연복', '마력 방호복'], fame:'rare', pay:1.05, demand:3,
    jobs:['밀폐 공간 감압 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['엘리베이터가 움직이면 귀를 한 번 풀어 준다.', '압력환의 실링이 들뜬 곳을 확인한다.', '밀폐 용기의 뚜껑을 열기 전에 압력을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 압력사 항목을 다시 읽는다.', '{u}은(는) 압력사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 압력환을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 압력사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 압력환의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 좁은 면적의 압력차에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C10',
    affinity:['EL_C10'], weakEl:['EL_C09']
  },
  {
    id:'CLS_C037', name:'응급사', alias:['현장처치조'], en:'Trauma Stabilizer', cat:'CC_SUPPORT',
    tier:1, rarity:1, desc:'얕은 상처와 출혈을 안정시켜 후송을 돕는 처치자.', lore:'게이트 후송조 응급 계약 현장에서 일감을 구한다. 소실된 조직을 복원할 수 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_HEAL',
    roles:['ROLE_HEAL', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0361', 'SK_C0362', 'SK_C0363', 'SK_C0364', 'SK_C0365', 'SK_C0366'],
    passive:['SK_C0367'], learn:[{skill:'SK_C0368', lv:10}, {skill:'SK_C0369', lv:25}, {skill:'SK_C0370', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A25', 'ABL_B28', 'ABL_B37', 'ABL_A07'], growth:{hp:27, mp:23},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:12}, ablReq:{ABL_A25:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['처치장갑'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1, demand:5,
    jobs:['게이트 후송조 응급 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['처치 장갑의 포장을 출발 전에 확인한다.', '붕대를 쓰면 남은 수량을 바로 적는다.', '처치 기록에 관찰 시각을 분 단위로 남긴다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 응급사 항목을 다시 읽는다.', '{u}은(는) 응급사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 처치장갑을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 응급사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 처치장갑의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 출혈과 얕은 상처의 안정에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C038', name:'보호사', alias:['개인방호조'], en:'Personal Warder', cat:'CC_SUPPORT',
    tier:1, rarity:1, desc:'한 사람의 노출 부위에 방호층을 덧대는 지원.', lore:'후열 인력 보호 계약 현장에서 일감을 구한다. 멀어지면 방호막이 얇아진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0371', 'SK_C0372', 'SK_C0373', 'SK_C0374', 'SK_C0375', 'SK_C0376'],
    passive:['SK_C0377'], learn:[{skill:'SK_C0378', lv:10}, {skill:'SK_C0379', lv:25}, {skill:'SK_C0380', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:28, mp:24},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:13}, ablReq:{ABL_A27:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['방호패'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.05, demand:5,
    jobs:['후열 인력 보호 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['보호할 사람과 팔 하나 정도 간격을 맞춘다.', '깨진 방호패를 새것과 다른 주머니에 넣는다.', '대기 중에는 방호막이 닿을 범위를 눈으로 잰다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 보호사 항목을 다시 읽는다.', '{u}은(는) 보호사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 방호패를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 보호사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 방호패의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 한 사람을 감싸는 방호층에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C039', name:'해독사', alias:['잔독처치조'], en:'Toxin Reliever', cat:'CC_SUPPORT',
    tier:1, rarity:2, desc:'확인한 마력성 독의 작용과 잔류를 줄이는 처치자.', lore:'독성 개체 대응 계약 현장에서 일감을 구한다. 원인을 모르면 치료를 서두르지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_HEAL',
    roles:['ROLE_HEAL', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0381', 'SK_C0382', 'SK_C0383', 'SK_C0384', 'SK_C0385', 'SK_C0386'],
    passive:['SK_C0387'], learn:[{skill:'SK_C0388', lv:10}, {skill:'SK_C0389', lv:25}, {skill:'SK_C0390', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A25', 'ABL_B28', 'ABL_B37', 'ABL_A07'], growth:{hp:29, mp:25},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:14}, ablReq:{ABL_A25:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['검사용침'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.1, demand:5,
    jobs:['독성 개체 대응 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['검사용 침의 포장이 뜯겼는지 확인한다.', '독 반응 기록을 증상과 노출 시각으로 나눈다.', '사용한 검사용 침을 바로 전용 통에 넣는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 해독사 항목을 다시 읽는다.', '{u}은(는) 해독사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 검사용침을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 해독사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 검사용침의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 체내에 남은 마력성 독에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C040', name:'활력사', alias:['호흡지원'], en:'Stamina Aide', cat:'CC_SUPPORT',
    tier:1, rarity:1, desc:'동료의 호흡과 휴식 박자를 맞추는 체력 지원.', lore:'장거리 공략 체력 보조 업무로 일감을 구한다. 수면과 식사를 대신할 수 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0391', 'SK_C0392', 'SK_C0393', 'SK_C0394', 'SK_C0395', 'SK_C0396'],
    passive:['SK_C0397'], learn:[{skill:'SK_C0398', lv:10}, {skill:'SK_C0399', lv:25}, {skill:'SK_C0400', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:27, mp:23},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:15}, ablReq:{ABL_A27:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['호흡띠'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.15, demand:5,
    jobs:['장거리 공략 체력 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['동료의 보폭이 짧아지면 쉬는 자리를 찾는다.', '물병을 꺼낼 때 자기 잔량도 함께 확인한다.', '공략 뒤 수면 시간을 기록해 둔다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 활력사 항목을 다시 읽는다.', '{u}은(는) 활력사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 호흡띠를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 활력사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 호흡띠의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 지친 몸의 호흡과 긴장에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C041', name:'진정사', alias:['안정지원'], en:'Calm Aide', cat:'CC_SUPPORT',
    tier:1, rarity:2, desc:'동의를 구하고 긴장성 떨림을 낮추는 안정 지원.', lore:'사고 현장 심리 안정 보조 업무로 일감을 구한다. 의식이나 의사를 강제로 바꾸지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0401', 'SK_C0402', 'SK_C0403', 'SK_C0404', 'SK_C0405', 'SK_C0406'],
    passive:['SK_C0407'], learn:[{skill:'SK_C0408', lv:10}, {skill:'SK_C0409', lv:25}, {skill:'SK_C0410', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:28, mp:24},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:16}, ablReq:{ABL_A27:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['촉각구'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.2, demand:5,
    jobs:['사고 현장 심리 안정 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['상대에게 다가가기 전에 먼저 말을 건다.', '소란한 곳에서는 대답할 시간을 조금 더 둔다.', '휴식 중에는 어깨의 힘을 천천히 푼다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 진정사 항목을 다시 읽는다.', '{u}은(는) 진정사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 촉각구를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 진정사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 촉각구의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 과도한 긴장과 놀람에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C042', name:'전령사', alias:['신호조'], en:'Field Messenger', cat:'CC_SUPPORT',
    tier:1, rarity:2, desc:'짧은 점멸 신호로 통신 사각을 잇는 연락 담당.', lore:'통신 음영 지역 연락 계약 현장에서 일감을 구한다. 두꺼운 차폐물은 신호를 끊는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0411', 'SK_C0412', 'SK_C0413', 'SK_C0414', 'SK_C0415', 'SK_C0416'],
    passive:['SK_C0417'], learn:[{skill:'SK_C0418', lv:10}, {skill:'SK_C0419', lv:25}, {skill:'SK_C0420', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:29, mp:25},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:12}, ablReq:{ABL_A27:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['신호기'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1, demand:5,
    jobs:['통신 음영 지역 연락 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['새 동료와 만날 때 비상 신호부터 맞춘다.', '신호기를 끄기 전에 마지막 응답을 확인한다.', '전달이 끝난 시각을 짧게 메모한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 전령사 항목을 다시 읽는다.', '{u}은(는) 전령사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 신호기를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 전령사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 신호기의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 짧은 신호의 전달에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C043', name:'지휘사', alias:['대열담당'], en:'Formation Coordinator', cat:'CC_SUPPORT',
    tier:1, rarity:1, desc:'합의한 신호로 역할과 대열 간격을 맞추는 지원.', lore:'혼성 파티 현장 지휘에서 일감을 구한다. 동료가 신호를 알아야 효과가 난다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0421', 'SK_C0422', 'SK_C0423', 'SK_C0424', 'SK_C0425', 'SK_C0426'],
    passive:['SK_C0427'], learn:[{skill:'SK_C0428', lv:10}, {skill:'SK_C0429', lv:25}, {skill:'SK_C0430', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:27, mp:23},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:13}, ablReq:{ABL_A27:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['지휘봉'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.05, demand:5,
    jobs:['혼성 파티 현장 지휘', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['출발 전에 동료들이 맡은 일을 한 번씩 듣는다.', '지도에 후퇴 지점부터 표시한다.', '작업 뒤 전달되지 않은 지시를 따로 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 지휘사 항목을 다시 읽는다.', '{u}은(는) 지휘사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 지휘봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 지휘사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 지휘봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 짧은 명령과 대열 간격에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C044', name:'조율사', alias:['파장담당'], en:'Mana Attuner', cat:'CC_SUPPORT',
    tier:1, rarity:3, desc:'동료와 장비의 마력 간섭을 줄이는 파장 지원.', lore:'혼합 마력 장비 운용 보조 업무로 일감을 구한다. 마력이 없는 대상을 충전하지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0431', 'SK_C0432', 'SK_C0433', 'SK_C0434', 'SK_C0435', 'SK_C0436'],
    passive:['SK_C0437'], learn:[{skill:'SK_C0438', lv:10}, {skill:'SK_C0439', lv:25}, {skill:'SK_C0440', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:28, mp:24},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:14}, ablReq:{ABL_A27:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['조율환'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.1, demand:5,
    jobs:['혼합 마력 장비 운용 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['장비 전원을 켜기 전에 출력 규격을 읽는다.', '손끝을 떼고도 남는 떨림을 잠깐 확인한다.', '함께 쓸 장비의 파장을 기록에서 대조한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 조율사 항목을 다시 읽는다.', '{u}은(는) 조율사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 조율환을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 조율사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 조율환의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 서로 다른 마력의 간섭에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C10',
    affinity:['EL_C10'], weakEl:['EL_C09']
  },
  {
    id:'CLS_C045', name:'차폐사', alias:['가림막조'], en:'Exposure Shielder', cat:'CC_SUPPORT',
    tier:1, rarity:2, desc:'빛과 큰 비말의 노출을 가리는 차폐 지원.', lore:'위험광 및 분진 현장 보조 업무로 일감을 구한다. 밀폐하면 환기를 따로 확보해야 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0441', 'SK_C0442', 'SK_C0443', 'SK_C0444', 'SK_C0445', 'SK_C0446'],
    passive:['SK_C0447'], learn:[{skill:'SK_C0448', lv:10}, {skill:'SK_C0449', lv:25}, {skill:'SK_C0450', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:29, mp:25},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:15}, ablReq:{ABL_A27:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['차폐판'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.15, demand:5,
    jobs:['위험광 및 분진 현장 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['막을 세우기 전에 환기구의 위치를 찾는다.', '차폐판을 접으며 빛이 새는 틈을 확인한다.', '실내에서는 동료의 시야를 가렸는지 돌아본다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 차폐사 항목을 다시 읽는다.', '{u}은(는) 차폐사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 차폐판을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 차폐사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 차폐판의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 빛과 분진의 통과 경로에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C046', name:'중계사', alias:['신호다리'], en:'Signal Relay Worker', cat:'CC_SUPPORT',
    tier:1, rarity:3, desc:'확인한 접점 사이에서 신호를 이어 주는 중계 지원.', lore:'장거리 파티 연결 계약 현장에서 일감을 구한다. 연결 지점이 끊기면 재설치해야 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0451', 'SK_C0452', 'SK_C0453', 'SK_C0454', 'SK_C0455', 'SK_C0456'],
    passive:['SK_C0457'], learn:[{skill:'SK_C0458', lv:10}, {skill:'SK_C0459', lv:25}, {skill:'SK_C0460', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:27, mp:23},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:16}, ablReq:{ABL_A27:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['중계구'], armors:['구조복', '경량 방호복'], fame:'popular', pay:1.2, demand:5,
    jobs:['장거리 파티 연결 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['동료가 보이지 않으면 응답 간격부터 확인한다.', '중계구의 번호를 지도와 같이 적는다.', '작업이 끝나면 남겨 둔 중계구를 회수한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 중계사 항목을 다시 읽는다.', '{u}은(는) 중계사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 중계구를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 중계사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 중계구의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 떨어진 동료 사이의 신호에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C047', name:'정화사', alias:['잔류청소조'], en:'Residue Cleaner', cat:'CC_SUPPORT',
    tier:1, rarity:4, desc:'피부와 장비 표면의 잔류 오염을 걷어 내는 지원.', lore:'마력 잔류물 청소 계약 현장에서 일감을 구한다. 몸속 손상까지 씻어 내지는 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0461', 'SK_C0462', 'SK_C0463', 'SK_C0464', 'SK_C0465', 'SK_C0466'],
    passive:['SK_C0467'], learn:[{skill:'SK_C0468', lv:10}, {skill:'SK_C0469', lv:25}, {skill:'SK_C0470', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A27', 'ABL_B15', 'ABL_B39'], growth:{hp:28, mp:24},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:12}, ablReq:{ABL_A27:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['세척솔'], armors:['구조복', '경량 방호복'], fame:'rare', pay:1, demand:5,
    jobs:['마력 잔류물 청소 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['청정 구역과 오염 구역의 장갑을 나눈다.', '세척솔을 씻고도 잔류 반응을 확인한다.', '작업복을 일상복과 다른 봉투에 넣는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 정화사 항목을 다시 읽는다.', '{u}은(는) 정화사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 세척솔을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 정화사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 세척솔의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 피부와 장비 표면의 오염에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C048', name:'부축사', alias:['후송손'], en:'Rescue Carrier', cat:'CC_SUPPORT',
    tier:1, rarity:5, desc:'체중과 보폭을 나눠 부상자의 후송을 돕는 지원.', lore:'부상 헌터 후송 계약 현장에서 일감을 구한다. 골절 부위를 함부로 움직일 수 없다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0471', 'SK_C0472', 'SK_C0473', 'SK_C0474', 'SK_C0475', 'SK_C0476'],
    passive:['SK_C0477'], learn:[{skill:'SK_C0478', lv:10}, {skill:'SK_C0479', lv:25}, {skill:'SK_C0480', lv:45}], stats:{STAT_MANA:2, STAT_MIND:2, STAT_SENSE:1}, keys:['ABL_A07', 'ABL_A25', 'ABL_A27', 'ABL_B37'], growth:{hp:29, mp:25},
    hpMul:1, mpMul:1.15, statReq:{STAT_MIND:13}, ablReq:{ABL_A27:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['구조띠'], armors:['구조복', '경량 방호복'], fame:'rare', pay:1.05, demand:5,
    jobs:['부상 헌터 후송 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['함께 걷는 사람의 보폭에 속도를 맞춘다.', '구조띠를 접기 전에 버클을 하나씩 연다.', '후송 뒤에는 손목과 허리에 남은 부담을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 부축사 항목을 다시 읽는다.', '{u}은(는) 부축사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 구조띠를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 부축사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 구조띠의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 함께 나누는 체중과 보폭에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C049', name:'탐침사', alias:['틈탐사조'], en:'Probe Surveyor', cat:'CC_SPECIAL',
    tier:1, rarity:1, desc:'가는 마력 탐침으로 확인 가능한 틈을 재는 탐사자.', lore:'미확인 게이트 선행 측량에서 일감을 구한다. 확인한 깊이 너머는 보장하지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0481', 'SK_C0482', 'SK_C0483', 'SK_C0484', 'SK_C0485', 'SK_C0486'],
    passive:['SK_C0487'], learn:[{skill:'SK_C0488', lv:10}, {skill:'SK_C0489', lv:25}, {skill:'SK_C0490', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:28, mp:19},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:12}, ablReq:{ABL_A19:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['탐침봉'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1, demand:3,
    jobs:['미확인 게이트 선행 측량', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['탐침 길이를 줄여 보관한다.', '좁은 틈을 보면 탐침이 들어갈 각도를 본다.', '탐침 끝에 묻은 이물질을 턴다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 탐침사 항목을 다시 읽는다.', '{u}은(는) 탐침사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 탐침봉을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 탐침사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 탐침봉의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 가느다란 마력 탐침에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C050', name:'잠행사', alias:['조용발'], en:'Quiet Walker', cat:'CC_SPECIAL',
    tier:1, rarity:1, desc:'발소리와 윤곽을 줄여 관측 거리를 확보하는 탐사자.', lore:'야행성 개체 관측 계약 현장에서 일감을 구한다. 접촉하거나 강한 빛을 받으면 드러난다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0491', 'SK_C0492', 'SK_C0493', 'SK_C0494', 'SK_C0495', 'SK_C0496'],
    passive:['SK_C0497'], learn:[{skill:'SK_C0498', lv:10}, {skill:'SK_C0499', lv:25}, {skill:'SK_C0500', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:29, mp:20},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:13}, ablReq:{ABL_A19:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['연질단검'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.05, demand:3,
    jobs:['야행성 개체 관측 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['신발 끈이 바닥을 끌지 않도록 묶는다.', '주머니 속 물건이 부딪치는 소리를 확인한다.', '새 바닥에서는 첫발을 천천히 놓는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 잠행사 항목을 다시 읽는다.', '{u}은(는) 잠행사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 연질단검을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 잠행사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 연질단검의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 발소리와 몸의 윤곽에 관한 현장 기록을 읽는다.']}, src:'codex', el:'EL_C08',
    affinity:['EL_C08'], weakEl:['EL_C07']
  },
  {
    id:'CLS_C051', name:'덫사냥꾼', alias:['덫조'], en:'Trap Worker', cat:'CC_SPECIAL',
    tier:1, rarity:2, desc:'미리 설치한 장력덫으로 통로와 발을 묶는 포획자.', lore:'통로 방어 및 생포 계약 현장에서 일감을 구한다. 설치할 바닥과 시간이 필요하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0501', 'SK_C0502', 'SK_C0503', 'SK_C0504', 'SK_C0505', 'SK_C0506'],
    passive:['SK_C0507'], learn:[{skill:'SK_C0508', lv:10}, {skill:'SK_C0509', lv:25}, {skill:'SK_C0510', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:30, mp:21},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:14}, ablReq:{ABL_A19:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['장력덫'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.1, demand:3,
    jobs:['통로 방어 및 생포 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['회수한 덫의 잠금 상태를 확인한다.', '덫줄에 걸린 잔해를 빼낸다.', '설치했던 덫의 수량을 기록과 대조한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 덫사냥꾼 항목을 다시 읽는다.', '{u}은(는) 덫사냥꾼 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 장력덫을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 덫사냥꾼 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 장력덫의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 미리 설치한 장력줄에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C052', name:'좌표사', alias:['기준점조'], en:'Anchor Mapper', cat:'CC_SPECIAL',
    tier:1, rarity:1, desc:'확인한 기준점 사이의 상대 위치를 다루는 안내자.', lore:'공간 왜곡 구역 안내에서 일감을 구한다. 표식을 모르는 곳으로 이동하지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0511', 'SK_C0512', 'SK_C0513', 'SK_C0514', 'SK_C0515', 'SK_C0516'],
    passive:['SK_C0517'], learn:[{skill:'SK_C0518', lv:10}, {skill:'SK_C0519', lv:25}, {skill:'SK_C0520', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:28, mp:19},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:15}, ablReq:{ABL_A19:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['좌표말뚝'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.15, demand:3,
    jobs:['공간 왜곡 구역 안내', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['기준점 표식의 번호를 순서대로 적는다.', '갈림길에서는 이전 표식이 보이는지 돌아본다.', '쓰지 않는 좌표말뚝을 별도 칸에 넣는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 좌표사 항목을 다시 읽는다.', '{u}은(는) 좌표사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 좌표말뚝을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 좌표사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 좌표말뚝의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 표식 사이의 상대 위치에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C053', name:'변형사', alias:['좁은길조'], en:'Body Adaptor', cat:'CC_SPECIAL',
    tier:1, rarity:2, desc:'손발의 작은 형태 변화를 좁은 작업에 쓰는 탐사자.', lore:'협소 구역 진입 계약 현장에서 일감을 구한다. 체격을 크게 바꾸거나 조직을 재생하지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0521', 'SK_C0522', 'SK_C0523', 'SK_C0524', 'SK_C0525', 'SK_C0526'],
    passive:['SK_C0527'], learn:[{skill:'SK_C0528', lv:10}, {skill:'SK_C0529', lv:25}, {skill:'SK_C0530', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:29, mp:20},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:16}, ablReq:{ABL_A19:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['관절보호대'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.2, demand:3,
    jobs:['협소 구역 진입 계약', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['관절보호대의 조임을 느슨하게 풀어 쉰다.', '손끝을 폈다 접으며 감각을 확인한다.', '좁은 문 앞에서는 장비 폭부터 가늠한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 변형사 항목을 다시 읽는다.', '{u}은(는) 변형사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 관절보호대를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 변형사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 관절보호대의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 손발의 짧은 형태 변화에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C054', name:'잔향사', alias:['흔적청취조'], en:'Trace Listener', cat:'CC_SPECIAL',
    tier:1, rarity:2, desc:'남은 마력의 시간차로 지난 동선을 살피는 조사자.', lore:'실종 헌터 동선 조사에서 일감을 구한다. 잔향은 사건 전체를 보여 주지 않는다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0531', 'SK_C0532', 'SK_C0533', 'SK_C0534', 'SK_C0535', 'SK_C0536'],
    passive:['SK_C0537'], learn:[{skill:'SK_C0538', lv:10}, {skill:'SK_C0539', lv:25}, {skill:'SK_C0540', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:30, mp:21},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:12}, ablReq:{ABL_A19:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['기록판'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1, demand:3,
    jobs:['실종 헌터 동선 조사', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['같은 장소의 기록을 시간순으로 놓는다.', '작업 뒤 기록판의 표식을 지운다.', '오래된 흔적은 따로 표시해 둔다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 잔향사 항목을 다시 읽는다.', '{u}은(는) 잔향사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 기록판을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 잔향사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 기록판의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 남은 마력의 시간차에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C055', name:'봉인사', alias:['각인봉쇄조'], en:'Seal Restrainer', cat:'CC_SPECIAL',
    tier:1, rarity:1, desc:'좁은 표면의 마력 흐름을 임시로 묶는 격리 담당.', lore:'불안정 마력 물체 격리에서 일감을 구한다. 생명이나 능력을 영구히 지우지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0541', 'SK_C0542', 'SK_C0543', 'SK_C0544', 'SK_C0545', 'SK_C0546'],
    passive:['SK_C0547'], learn:[{skill:'SK_C0548', lv:10}, {skill:'SK_C0549', lv:25}, {skill:'SK_C0550', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:28, mp:19},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:13}, ablReq:{ABL_A19:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['각인띠'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.05, demand:3,
    jobs:['불안정 마력 물체 격리', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['각인띠가 풀린 끝을 먼저 찾는다.', '봉인한 물건의 라벨을 밖으로 돌려 놓는다.', '인계할 때 봉인 시각을 함께 읽는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 봉인사 항목을 다시 읽는다.', '{u}은(는) 봉인사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 각인띠를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 봉인사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 각인띠의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 좁은 표면의 마력 흐름에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C056', name:'견인사', alias:['줄당김조'], en:'Tether Worker', cat:'CC_SPECIAL',
    tier:1, rarity:3, desc:'고정점과 마력줄로 하중과 이동을 돕는 구조 담당.', lore:'매몰 구역 구조 보조 업무로 일감을 구한다. 고정점이 약하면 함께 끌려간다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0551', 'SK_C0552', 'SK_C0553', 'SK_C0554', 'SK_C0555', 'SK_C0556'],
    passive:['SK_C0557'], learn:[{skill:'SK_C0558', lv:10}, {skill:'SK_C0559', lv:25}, {skill:'SK_C0560', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:29, mp:20},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:14}, ablReq:{ABL_A19:10}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['견인갈고리'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.1, demand:3,
    jobs:['매몰 구역 구조 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['견인줄을 감으며 꼬인 부분을 푼다.', '하중이 실릴 고정점을 두 번 확인한다.', '갈고리 끝을 보호구에 넣어 둔다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 견인사 항목을 다시 읽는다.', '{u}은(는) 견인사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 견인갈고리를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 견인사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 견인갈고리의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 마력줄이 당기는 하중에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C057', name:'반향사', alias:['벽울림조'], en:'Echo Mapper', cat:'CC_SPECIAL',
    tier:1, rarity:2, desc:'돌아오는 울림으로 벽과 빈 공간을 읽는 탐사자.', lore:'암흑 동굴 선행 탐사에서 일감을 구한다. 흡음 물질은 빈 공간처럼 읽힐 수 있다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0561', 'SK_C0562', 'SK_C0563', 'SK_C0564', 'SK_C0565', 'SK_C0566'],
    passive:['SK_C0567'], learn:[{skill:'SK_C0568', lv:10}, {skill:'SK_C0569', lv:25}, {skill:'SK_C0570', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:30, mp:21},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:15}, ablReq:{ABL_A19:11}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['반향구'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.15, demand:3,
    jobs:['암흑 동굴 선행 탐사', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['방에 들어가면 발소리의 울림을 듣는다.', '흡음재가 붙은 벽을 별도 표시한다.', '반향구의 먼지를 털어 케이스에 넣는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 반향사 항목을 다시 읽는다.', '{u}은(는) 반향사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 반향구를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 반향사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 반향구의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 벽에서 돌아오는 반향에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C058', name:'환영사', alias:['허상조'], en:'Decoy Projector', cat:'CC_SPECIAL',
    tier:1, rarity:3, desc:'닿지 않는 윤곽을 투영해 시선을 나누는 유인 담당.', lore:'파티 이탈 및 유인 보조 업무로 일감을 구한다. 손에 닿는 물체를 만들지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0571', 'SK_C0572', 'SK_C0573', 'SK_C0574', 'SK_C0575', 'SK_C0576'],
    passive:['SK_C0577'], learn:[{skill:'SK_C0578', lv:10}, {skill:'SK_C0579', lv:25}, {skill:'SK_C0580', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:28, mp:19},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:16}, ablReq:{ABL_A19:12}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['투영패'], armors:['탐사복', '경량 방호복'], fame:'common', pay:1.2, demand:3,
    jobs:['파티 이탈 및 유인 보조', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['유리창에 비친 윤곽을 잠깐 살핀다.', '동료에게 허상을 세울 위치를 먼저 알린다.', '투영패를 닦으며 긁힌 면을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 환영사 항목을 다시 읽는다.', '{u}은(는) 환영사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 투영패를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 환영사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 투영패의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 멀리서 보이는 윤곽에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C059', name:'접지사', alias:['누출배출조'], en:'Grounding Worker', cat:'CC_SPECIAL',
    tier:1, rarity:4, desc:'고정한 접지점으로 누출 마력을 빼는 안정화 담당.', lore:'누출 마력 현장 안정화에서 일감을 구한다. 절연 바닥에서는 고정점을 따로 만든다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0581', 'SK_C0582', 'SK_C0583', 'SK_C0584', 'SK_C0585', 'SK_C0586'],
    passive:['SK_C0587'], learn:[{skill:'SK_C0588', lv:10}, {skill:'SK_C0589', lv:25}, {skill:'SK_C0590', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:29, mp:20},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:12}, ablReq:{ABL_A19:8}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['접지말뚝'], armors:['탐사복', '경량 방호복'], fame:'rare', pay:1, demand:3,
    jobs:['누출 마력 현장 안정화', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['접지선을 걷기 전에 전원을 확인한다.', '말뚝에 묻은 흙을 털어 분리해 둔다.', '절연 바닥에는 접점 표시를 남긴다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 접지사 항목을 다시 읽는다.', '{u}은(는) 접지사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 접지말뚝을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 접지사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 접지말뚝의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 땅으로 빼내는 잔류 마력에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C060', name:'균열사', alias:['금읽기조'], en:'Fracture Reader', cat:'CC_SPECIAL',
    tier:1, rarity:5, desc:'이미 생긴 균열의 방향과 진행을 읽는 조사 담당.', lore:'붕괴 위험 구조물 조사에서 일감을 구한다. 멀쩡한 구조물을 마음대로 쪼개지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SCOUT',
    roles:['ROLE_SCOUT', 'ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0591', 'SK_C0592', 'SK_C0593', 'SK_C0594', 'SK_C0595', 'SK_C0596'],
    passive:['SK_C0597'], learn:[{skill:'SK_C0598', lv:10}, {skill:'SK_C0599', lv:25}, {skill:'SK_C0600', lv:45}], stats:{STAT_SENSE:3, STAT_MIND:1, STAT_BODY:1}, keys:['ABL_A18', 'ABL_A19', 'ABL_A22', 'ABL_A27'], growth:{hp:30, mp:21},
    hpMul:1, mpMul:1.05, statReq:{STAT_SENSE:13}, ablReq:{ABL_A19:9}, gear:['ITC_WEAPON', 'ITC_ARMOR', 'ITC_GEAR'],
    weapons:['균열쐐기'], armors:['탐사복', '경량 방호복'], fame:'rare', pay:1.05, demand:3,
    jobs:['붕괴 위험 구조물 조사', '협회 등록 현장 계약', '민간 안전 업체 보조'], habits:['금이 난 타일을 밟기 전에 발을 멈춘다.', '균열쐐기 끝의 휨을 살핀다.', '금의 길이를 자와 나란히 찍어 기록한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 균열사 항목을 다시 읽는다.', '{u}은(는) 균열사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 균열쐐기를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 균열사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 균열쐐기의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 이미 생긴 작은 균열에 관한 현장 기록을 읽는다.']}, src:'codex'
  },
  {
    id:'CLS_C061', name:'단조사', alias:['망치공'], en:'Field Smith', cat:'CC_CRAFT',
    tier:1, rarity:1, desc:'달군 금속의 결정 방향을 망치로 맞추는 가공자.', lore:'마수 소재 공방 단조에서 일감을 구한다. 재료와 열원이 없으면 단조하지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0601', 'SK_C0602', 'SK_C0603', 'SK_C0604', 'SK_C0605', 'SK_C0606'],
    passive:['SK_C0607'], learn:[{skill:'SK_C0608', lv:10}, {skill:'SK_C0609', lv:25}, {skill:'SK_C0610', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:26, mp:20},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:12}, ablReq:{ABL_A26:8}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['단조망치'], armors:['작업복', '방진 작업복'], fame:'common', pay:1, demand:4,
    jobs:['마수 소재 공방 단조', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['열이 빠진 뒤 망치를 정리한다.', '작업복 소매의 타는 자국을 확인한다.', '재료를 올리기 전에 모루 위를 비운다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 단조사 항목을 다시 읽는다.', '{u}은(는) 단조사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 단조망치를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 단조사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 단조망치의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C062', name:'수선사', alias:['올잇기공'], en:'Field Mender', cat:'CC_CRAFT',
    tier:1, rarity:1, desc:'남아 있는 섬유를 이어 방호복 손상을 줄이는 수선자.', lore:'현장 방호복 수선에서 일감을 구한다. 없어진 원단을 새로 만들지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0611', 'SK_C0612', 'SK_C0613', 'SK_C0614', 'SK_C0615', 'SK_C0616'],
    passive:['SK_C0617'], learn:[{skill:'SK_C0618', lv:10}, {skill:'SK_C0619', lv:25}, {skill:'SK_C0620', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:27, mp:21},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:13}, ablReq:{ABL_A26:9}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['수선바늘'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.05, demand:4,
    jobs:['현장 방호복 수선', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['실 색과 굵기별로 바늘통을 나눈다.', '찢긴 옷을 보면 올의 방향부터 본다.', '수선한 부분의 안쪽 매듭을 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 수선사 항목을 다시 읽는다.', '{u}은(는) 수선사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 수선바늘을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 수선사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 수선바늘의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C063', name:'각인사', alias:['홈새김공'], en:'Inscription Worker', cat:'CC_CRAFT',
    tier:1, rarity:2, desc:'장비 표면에 얕은 마력 경로를 새기는 가공자.', lore:'마력 장비 표면 가공에서 일감을 구한다. 깊은 흠집은 장비를 약하게 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0621', 'SK_C0622', 'SK_C0623', 'SK_C0624', 'SK_C0625', 'SK_C0626'],
    passive:['SK_C0627'], learn:[{skill:'SK_C0628', lv:10}, {skill:'SK_C0629', lv:25}, {skill:'SK_C0630', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:28, mp:22},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:14}, ablReq:{ABL_A26:10}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['각인침'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.1, demand:4,
    jobs:['마력 장비 표면 가공', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['각인침을 닦고 끝을 빛에 비춘다.', '획이 겹치는 도면을 따로 펼쳐 둔다.', '작업 뒤 확대경을 덮는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 각인사 항목을 다시 읽는다.', '{u}은(는) 각인사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 각인침을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 각인사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 각인침의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C064', name:'제련사', alias:['광물정제공'], en:'Ore Refiner', cat:'CC_CRAFT',
    tier:1, rarity:1, desc:'가열한 광물의 불순물을 나눠 걷어 내는 정제자.', lore:'회수 광물 정제 공방에서 일감을 구한다. 독성 분진을 따로 처리해야 한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0631', 'SK_C0632', 'SK_C0633', 'SK_C0634', 'SK_C0635', 'SK_C0636'],
    passive:['SK_C0637'], learn:[{skill:'SK_C0638', lv:10}, {skill:'SK_C0639', lv:25}, {skill:'SK_C0640', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:26, mp:20},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:15}, ablReq:{ABL_A26:11}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['제련집게'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.15, demand:4,
    jobs:['회수 광물 정제 공방', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['제련 찌꺼기를 일반 쓰레기와 나누어 담는다.', '집게가 식었는지 확인하고 옮긴다.', '광물 봉투에 반입 번호를 적는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 제련사 항목을 다시 읽는다.', '{u}은(는) 제련사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 제련집게를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 제련사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 제련집게의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C065', name:'재단사', alias:['가죽재단공'], en:'Protective Tailor', cat:'CC_CRAFT',
    tier:1, rarity:2, desc:'마수 가죽의 결을 따라 방호 원단을 자르는 가공자.', lore:'방호 장비 맞춤 제작에서 일감을 구한다. 보호 부위를 줄이면 착용감만 좋아진다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0641', 'SK_C0642', 'SK_C0643', 'SK_C0644', 'SK_C0645', 'SK_C0646'],
    passive:['SK_C0647'], learn:[{skill:'SK_C0648', lv:10}, {skill:'SK_C0649', lv:25}, {skill:'SK_C0650', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:27, mp:21},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:16}, ablReq:{ABL_A26:12}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['재단가위'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.2, demand:4,
    jobs:['방호 장비 맞춤 제작', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['원단의 결 방향을 작은 화살표로 표시한다.', '재단가위를 다른 용도로 쓰지 않는다.', '치수를 읽으면 줄자를 한 번 더 확인한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 재단사 항목을 다시 읽는다.', '{u}은(는) 재단사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 재단가위를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 재단사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 재단가위의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C066', name:'조립사', alias:['맞춤조립공'], en:'Device Assembler', cat:'CC_CRAFT',
    tier:1, rarity:2, desc:'맞는 규격의 부품을 정렬하고 체결하는 조립자.', lore:'탐지 장비 조립 공방에서 일감을 구한다. 설계와 맞는 부품이 필요하다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0651', 'SK_C0652', 'SK_C0653', 'SK_C0654', 'SK_C0655', 'SK_C0656'],
    passive:['SK_C0657'], learn:[{skill:'SK_C0658', lv:10}, {skill:'SK_C0659', lv:25}, {skill:'SK_C0660', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:28, mp:22},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:12}, ablReq:{ABL_A26:8}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['조립집게'], armors:['작업복', '방진 작업복'], fame:'common', pay:1, demand:4,
    jobs:['탐지 장비 조립 공방', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['작은 부품을 자석 없는 트레이에 놓는다.', '조립 집게의 끝이 맞물리는지 확인한다.', '체결을 끝내면 남은 부품 수를 센다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 조립사 항목을 다시 읽는다.', '{u}은(는) 조립사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 조립집게를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 조립사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 조립집게의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C067', name:'조리사', alias:['공략취사조'], en:'Field Cook', cat:'CC_CRAFT',
    tier:1, rarity:1, desc:'식재료의 익힘과 배식을 관리하는 공략조 취사자.', lore:'공략조 식사 공급에서 일감을 구한다. 먹을 수 없는 소재를 식용으로 바꾸지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0661', 'SK_C0662', 'SK_C0663', 'SK_C0664', 'SK_C0665', 'SK_C0666'],
    passive:['SK_C0667'], learn:[{skill:'SK_C0668', lv:10}, {skill:'SK_C0669', lv:25}, {skill:'SK_C0670', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:26, mp:20},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:13}, ablReq:{ABL_A26:9}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['조리도구'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.05, demand:4,
    jobs:['공략조 식사 공급', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['익힌 재료와 생재료의 도마를 나눈다.', '배식 전에 남은 인원 수를 다시 센다.', '식재료 라벨의 개봉 시각을 읽는다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 조리사 항목을 다시 읽는다.', '{u}은(는) 조리사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 조리도구를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 조리사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 조리도구의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C068', name:'보존사', alias:['표본보관조'], en:'Specimen Preserver', cat:'CC_CRAFT',
    tier:1, rarity:3, desc:'밀폐와 냉각으로 표본의 변질을 늦추는 보관 담당.', lore:'생체 표본 운송 계약 현장에서 일감을 구한다. 부패한 조직을 되돌리지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0671', 'SK_C0672', 'SK_C0673', 'SK_C0674', 'SK_C0675', 'SK_C0676'],
    passive:['SK_C0677'], learn:[{skill:'SK_C0678', lv:10}, {skill:'SK_C0679', lv:25}, {skill:'SK_C0680', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:27, mp:21},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:14}, ablReq:{ABL_A26:10}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['밀폐용기'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.1, demand:4,
    jobs:['생체 표본 운송 계약', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['용기의 밀봉면을 닦고 뚜껑을 닫는다.', '표본의 온도 기록을 먼저 확인한다.', '빈 용기와 사용한 용기를 다른 칸에 둔다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 보존사 항목을 다시 읽는다.', '{u}은(는) 보존사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 밀폐용기를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 보존사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 밀폐용기의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C069', name:'감정사', alias:['품질판독조'], en:'Material Appraiser', cat:'CC_CRAFT',
    tier:1, rarity:2, desc:'소재의 표면과 얕은 반응을 대조하는 품질 판독자.', lore:'회수 소재 등급 감정에서 일감을 구한다. 모든 숨은 성질을 한 번에 알지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0681', 'SK_C0682', 'SK_C0683', 'SK_C0684', 'SK_C0685', 'SK_C0686'],
    passive:['SK_C0687'], learn:[{skill:'SK_C0688', lv:10}, {skill:'SK_C0689', lv:25}, {skill:'SK_C0690', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:28, mp:22},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:15}, ablReq:{ABL_A26:11}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['감정렌즈'], armors:['작업복', '방진 작업복'], fame:'common', pay:1.15, demand:4,
    jobs:['회수 소재 등급 감정', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['소재를 만지기 전에 감정 렌즈를 닦는다.', '감정 결과에 확인하지 못한 항목을 남긴다.', '라벨이 뒤바뀌지 않도록 하나씩 정리한다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 감정사 항목을 다시 읽는다.', '{u}은(는) 감정사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 감정렌즈를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 감정사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 감정렌즈의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C070', name:'해체사', alias:['소재회수공'], en:'Salvage Dismantler', cat:'CC_CRAFT',
    tier:1, rarity:3, desc:'마수 사체의 조직 경계를 따라 소재를 회수하는 작업자.', lore:'마수 사체 소재 회수에서 일감을 구한다. 독낭을 건드리면 회수품이 오염된다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0691', 'SK_C0692', 'SK_C0693', 'SK_C0694', 'SK_C0695', 'SK_C0696'],
    passive:['SK_C0697'], learn:[{skill:'SK_C0698', lv:10}, {skill:'SK_C0699', lv:25}, {skill:'SK_C0700', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:26, mp:20},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:16}, ablReq:{ABL_A26:12}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['해체톱'], armors:['작업복', '방진 작업복'], fame:'scorned', pay:1.2, demand:4,
    jobs:['마수 사체 소재 회수', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['해체톱을 씻고 날 사이를 확인한다.', '사체와 회수품을 같은 천 위에 놓지 않는다.', '사용한 장갑을 벗기 전에 오염 봉투를 연다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 해체사 항목을 다시 읽는다.', '{u}은(는) 해체사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 해체톱을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 해체사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 해체톱의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C071', name:'접합사', alias:['이음공'], en:'Bonding Worker', cat:'CC_CRAFT',
    tier:1, rarity:4, desc:'끊어진 재료의 접촉면과 굳는 순서를 맞추는 복구자.', lore:'비전투 설비 응급 복구에서 일감을 구한다. 다른 재료끼리는 접합력이 낮다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0701', 'SK_C0702', 'SK_C0703', 'SK_C0704', 'SK_C0705', 'SK_C0706'],
    passive:['SK_C0707'], learn:[{skill:'SK_C0708', lv:10}, {skill:'SK_C0709', lv:25}, {skill:'SK_C0710', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:27, mp:21},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:12}, ablReq:{ABL_A26:8}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['접합클램프'], armors:['작업복', '방진 작업복'], fame:'rare', pay:1, demand:4,
    jobs:['비전투 설비 응급 복구', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['접합한 부분이 굳기 전에는 손대지 않는다.', '클램프를 풀기 전에 지지대를 확인한다.', '접촉면에서 떨어진 조각을 모아 둔다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 접합사 항목을 다시 읽는다.', '{u}은(는) 접합사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 접합클램프를 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 접합사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 접합클램프의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  },
  {
    id:'CLS_C072', name:'충전사', alias:['전원정비공'], en:'Charge Technician', cat:'CC_CRAFT',
    tier:1, rarity:5, desc:'마정석 전원을 장비 규격에 맞춰 분배하는 정비자.', lore:'마정석 전원 장비 정비에서 일감을 구한다. 마정석이 없으면 에너지를 만들지 못한다. 계약 전에 장비와 작업 범위를 맞추며, 숙련이 낮을 때는 선임과 함께 들어간다.', role:'ROLE_SUP',
    roles:['ROLE_SUP'], range:'near', resource:'mp', pick:2, pool:['SK_C0711', 'SK_C0712', 'SK_C0713', 'SK_C0714', 'SK_C0715', 'SK_C0716'],
    passive:['SK_C0717'], learn:[{skill:'SK_C0718', lv:10}, {skill:'SK_C0719', lv:25}, {skill:'SK_C0720', lv:45}], stats:{STAT_MANA:2, STAT_MIND:1, STAT_SENSE:2}, keys:['ABL_A10', 'ABL_A26', 'ABL_B31', 'ABL_B38'], growth:{hp:28, mp:22},
    hpMul:1, mpMul:1.1, statReq:{STAT_SENSE:13}, ablReq:{ABL_A26:9}, gear:['ITC_GEAR', 'ITC_ARMOR'],
    weapons:['절연충전선'], armors:['작업복', '방진 작업복'], fame:'rare', pay:1.05, demand:4,
    jobs:['마정석 전원 장비 정비', '회수품 가공 단기 계약', '공방 검수 보조'], habits:['충전선을 뽑기 전에 전원을 끈다.', '마정석 전원의 잔량을 인계표에 적는다.', '절연 피복이 갈라진 선을 따로 뺀다.'], lines:{awaken:['{u}은(는) 상태창에 뜬 충전사 항목을 다시 읽는다.', '{u}은(는) 충전사 등록 절차와 준비할 장비를 확인한다.'], levelUp:['{u}은(는) 절연충전선을 쥐었을 때 달라진 힘을 가늠한다.', '{u}은(는) 충전사 훈련표 옆에 오늘의 기록을 남긴다.'], idle:['{u}은(는) 절연충전선의 마모를 살피며 다음 계약을 기다린다.', '{u}은(는) 작업 의뢰서의 재료 수량과 납품 시각을 대조한다.']}, src:'codex'
  }
]);
