
/* 세계 자율 진행 [prototype_default] — 시간이 흐르면 게이트가 새로 열리고, 다른 헌터 · 길드가 공략한다 (설정집 0장 4번)
   clearPerHour : 시간당 다른 헌터가 공략할 확률 — 길드 소유 · 협회 개방 · 입찰 · 우리 길드(기한 임박 시)
   spawnPerHour : 시간당 새 게이트 출현 수 기댓값 (전국). 2.5 = 하루 약 60개 (사용자 2026-10-23), 서울 마포에 살면 그중 약 3.4%(하루 2개)가 마포 · 38%(하루 23개)가 15km 안
   rankWeights  : 새 게이트 등급 [등급 숫자, 가중치] — 약한 게이트가 훨씬 흔하다
   keepDays     : 끝난 생성 게이트를 목록에 남겨 두는 기간 */
def('balance', [
  /* 알림: keep = 남겨 두는 개수(넘으면 오래된 것부터 지움, 답할 것은 남김) · expireH = 이벤트 알림에 답하지 않으면 지나가는 시간 */
  {id:'BAL_ALERT', proto:true, keep:150, expireH:72},
  {id:'BAL_WORLD', proto:true, flavorNews:0.6,
   clearPerHour:{owned:0.04, open:0.03, bid:0.025, ours:0.25}, urgentHours:36, urgentBonus:0.25, oursUrgentHours:6,
   spawnPerHour:2.5, hoursLeft:[48,240],
   /* 전국 230개 지역: 출현 지역 가중치 = gateDensity × (1 + nearMul × e^(−거리km / nearKm)) (내 사는 곳 기준). 뉴스는 newsKm 안 또는 newsRankLv 급 이하만 */
   nearMul:9, nearKm:30, newsKm:40, newsRankLv:10,
   rankWeights:[[20,30],[19,26],[18,18],[17,12],[16,8],[15,5],[14,3],[13,2],[12,1]],
   floors:[3,7], keepDays:1, arcKeep:400},   /* arcKeep: 지난 게이트 기록(클리어 모아보기) 개수 */
]);


/* 새 게이트 이름 = 실제 장소 (data/gate_pool.js · data/pool, tools/build_gate_pool.py)
   한 세이브에서 쓴 장소는 다시 쓰지 않는다 (G.gpUsed). 지역 장소가 다 떨어지면 가장 가까운 다른 지역 장소 (게이트도 그 지역에). 위 gatePlaces 는 마지막 대비용
   gateInteriors : 게이트 내부 지형 (들어가야 알 수 있음). 뒤에 붙이던 게이트명은 쓰지 않기로 함 (2026-10-23) — 이름 자료는 docs/world/content/gate_names_200k 에 보관 */
/* gateInteriors 선택 필드 (2026-10-24 '최대한 많이'): name · alias · desc · lore · img · terrain(terrains) · light 밝기 1~5 · temp 온도(글) · air 공기(글)
   size 넓이 1~5 · floors [최소, 최대] 층 수 · hazards [글 함정 · 낙석 · 독안개] · monsters [monsters 자주 나오는 종] · cats [monsterCats] · ranks [약한, 센]
   loot [{item, chance}] 바닥에서 줍는 것 · rest 쉴 수 있나 · lines {enter, walk, rest, boss, exit} · bgm · notes · src */
def('gateInteriors', [
  {id:'GI_CAVE',   name:'좁은 동굴 통로'},
  {id:'GI_SUBWAY', name:'무너진 지하철 터널'},
  {id:'GI_FOREST', name:'안개 낀 숲'},
  {id:'GI_FLOOD',  name:'물에 잠긴 지하층'},
  {id:'GI_CANYON', name:'바위투성이 협곡'},
  {id:'GI_BUILD',  name:'버려진 건물 내부'},
  {id:'GI_SNOW',   name:'얼어붙은 설원'},
  {id:'GI_LAVA',   name:'용암이 흐르는 화구'},
  {id:'GI_SHRINE', name:'오래된 신전'},
  {id:'GI_FORT',   name:'무너진 성채'},
  {id:'GI_TOMB',   name:'안개 덮인 묘역'},
  {id:'GI_GARDEN', name:'버려진 정원'},
  {id:'GI_PLAIN',  name:'끝없는 초원'},
  {id:'GI_RIFT',   name:'일그러진 이공간'},
]);

/* 시장 · NPC 성장 [prototype_default]
   market : 협회 매입가 변동 — 마정석 · 소재만. 하루마다 ±dayMove 안에서 움직이고 range 안에 머문다. newsMove 이상 바뀌면 뉴스
   npc    : 고정 헌터들의 하루 성장 — 경험치(등급이 높을수록 많이) · 세부 능력 +1 확률 */
def('balance', [
  {id:'BAL_MARKET', proto:true, cats:['ITC_STONE','ITC_MAT'], dayMove:0.04, range:[0.7,1.35], newsMove:0.1},
  /* 입찰: 입찰 게이트는 hours 시간 뒤 마감. 다른 길드 입찰가 = base × (21 − 등급)² × (0.5~1.5). 무허가 진입은 caught 확률로 적발 → fine · rep */
  {id:'BAL_BID', proto:true, hours:12, base:40000, myOpts:[1000000,3000000,6000000,10000000], noPermit:{caught:0.35, fine:3000000, rep:-3}},
  {id:'BAL_NPC', proto:true, expPerDay:[0.02,0.08], ablPerDay:0.25},
  /* NPC끼리 관계 · 소문: NPC 엔진 일정에서 같은 시간에 교류 행동을 한 아는 사이가 만나 감정이 바뀐다(move). 같은 지역 모르는 사람과는 newAcq 확률로 알게 된다.
     같은 파티로 공략하면 성공 bondWin · 실패 bondFail. 기준을 넘으면 사건(연애 · 불화)이 생기고 소문이 돈다.
     falseRumor: 하루에 근거 없는 소문이 생길 확률 (소문은 사실과 따로 기록된다, 설정집 9.2) */
  {id:'BAL_NPCREL', proto:true, move:[-10,16], dateAt:60, feudAt:50, falseRumor:0.08, newAcq:0.05, bondWin:4, bondFail:-2},
  /* 생활비: 매월 payDay 일에 fixed 만큼 빠져나간다. 잔액이 마이너스면 스트레스 +debtStress (식비는 '식사' 행동에서 따로) */
  {id:'BAL_LIFE', proto:true, payDay:1, debtStress:15,
   fixed:[['월세',550000],['관리비 · 공과금',120000],['통신비',55000],['헌터 보험',90000]]},
]);
/* 더 붙는 생활비 (2026-10-24 기반 형식) — 매월 payDay 에 BAL_LIFE.fixed 뒤에 붙어 빠져나간다 (index.html fixedCosts).
   {id:'CI_…', name, amount(원/월), req?[이벤트와 같은 조건 — 맞을 때만], desc?, ctags?}
   예: 차 할부 · 반려동물 · 대출 상환 · 부모님 용돈 · 구독. 비어 있으면 기존 고정 지출만 */
def('costItems', []);

/* 주거 [prototype_default] — 월세는 매월 고정 지출(BAL_LIFE)에 '월세' 대신 들어간다. regionMul: 지역별 월세 배수
   이사 비용 = deposit(보증금) + moveCost. 이사 나갈 때 보증금은 돌려받는다.
   동거하면 월세 · 관리비를 나눠 낸다(아래 shareItems · splitOpts, 기본 shareRent). 계약 기간 leaseMonths 개월. 기간 전에 나가면 earlyFee × 월세 를 위약금으로 보증금에서 뺀다 (보증금이 없으면 현금에서) */
/* ════ 주거 (housing) '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   + name · deposit 보증금 · rent 월세 · size 평 · rooms · desc · icon · cond 조건 · comfort 1~5 · sleep 수면 보정 · safe 1~5 · noise 1~5 · guests 손님 가능 · pets 반려동물 가능
   region 경향 [regions] · buy 매매가 · upkeep 관리비 · lines {move, home} */
def('housing', [
  {id:'HOU_GOSI',  name:'고시원',      rent:350000,  deposit:0,        storage:false},
  {id:'HOU_ONE',   name:'원룸',        rent:550000,  deposit:5000000,  storage:true},
  {id:'HOU_TWO',   name:'투룸',        rent:900000,  deposit:20000000, storage:true},
  {id:'HOU_APT',   name:'아파트 전세', rent:300000,  deposit:250000000,storage:true},
]);
def('balance', [
  {id:'BAL_HOUSE', proto:true, moveCost:800000, moveHours:6, leaseMonths:12, earlyFee:2, shareRent:0.5,
   /* 동거 생활비 분담: shareItems 항목(월세 · 관리비)을 내 몫(splitOpts 중 고른 비율)만 낸다. 상대 몫은 상대 돈에서 빠지고, 상대가 낼 돈이 없으면 내가 전부 낸다(알림 · 스트레스 +shortStress)
      내가 generousAt 이상 부담하면 매월 상대 호감 +generousLike */
   shareItems:['월세','관리비 · 공과금'],
   /* 같이 보내는 저녁: 19~23시에 둘 다 집에 있으면 하루 한 번 친밀 +togetherClose · 스트레스 −togetherStress (주말은 weekendMul 배).
      missDays 일 넘게 같이 보낸 저녁이 없으면 매일 상대 로맨스 −missRomance, 처음 넘을 때 메시지 */
   togetherClose:1, togetherStress:3, weekendMul:2, missDays:5, missRomance:1, splitOpts:[0.5,0.7,1], generousAt:0.7, generousLike:2, shortStress:5,
   regionMul:{RG_SEOUL_GANGNAM:1.5, RG_SEOUL_MAPO:1.1, RG_SEOUL_EUNPYEONG:0.95, RG_GG_SEONGNAM:1.1, RG_IC_YEONSU:0.9, RG_BS_HAEUNDAE:0.9},
   /* regionMul 에 없는 지역은 시도(prov)별 배수 */
   provMul:{SEOUL:1.1, GYEONGGI:0.9, INCHEON:0.85, BUSAN:0.85, DAEGU:0.8, DAEJEON:0.8, ULSAN:0.8, GWANGJU:0.75, SEJONG:0.85, GANGWON:0.7, CHUNGBUK:0.7, CHUNGNAM:0.7, JEONBUK:0.65, JEONNAM:0.65, GYEONGBUK:0.65, GYEONGNAM:0.7, JEJU:0.85}},
]);

/* 길드 설립 · 운영 [prototype_default] (사용자 결정: 플레이어가 길드를 세우고 길드장이 될 수 있다)
   설립 조건: 등급 숫자 minRankLv 이하(=그보다 강함) · 평판 minRep · 협회 등록비 foundCost
   길드장 몫: 공략 수익 중 masterShare% 는 내 돈, 나머지는 길드 자금
   영입: 설득력 + d20 + 보정(호감 · 평판 · 등급 차) ≥ recruitDc. 상대가 길드보다 rankGap 등급 넘게 강하면 거의 거절
   운영비: 매월 1일 길드 자금에서 officeRent + 길드원 1명당 memberPay. 자금이 모자라면 내 돈에서 빠지고 길드원 사기가 떨어진다 */
def('balance', [
  /* 길드 운영 2차: 길드원 계약 · 사기 · 이탈 · 길드 입찰 · 맡기기
     shareRef: 기준 배분율(%) — 배분율이 높을수록 영입 판정 +(차이 × shareRecruit), 사기 +(차이 × shareMorale)/월. 길드는 길드원 공략 수입의 (memberCut + (shareRef − 배분율)/100) 을 길드 자금으로 가져간다
     contractMonths: 계약 기간 · 만료 때 사기 renewMorale 이상이면 재계약(배분율 그대로), 아니면 떠난다
     사기(0~100, 시작 moraleStart): 매월 + 그 달 공략 횟수 × moralePerRaid − (공략 0회면 idlePen) − 운영비 부족 시 unpaidPen. leaveAt 미만이면 달마다 leaveChance 로 이적
     delegate: '길드원에게 맡기기' 한 게이트를 길드원이 하루에 맡을 확률 */
  {id:'BAL_GUILD', proto:true, foundCost:30000000, minRankLv:16, minRep:10, masterShare:40, recruitDc:16, rankGap:3, officeRent:1500000, memberPay:800000,
   shareRef:8, shareOpts:[5,8,10,12,15], shareRecruit:1, shareMorale:2, memberCut:0.3, contractMonths:12, renewMorale:45, moraleStart:60, moralePerRaid:3, idlePen:8, unpaidPen:12, leaveAt:25, leaveChance:0.35, delegate:0.6,
   /* 길드 평판 · 등급 심사 · 영입 경쟁 (3차)
      평판(0~100): 길드원 공략 성공 +repWin (게이트 등급이 길드 등급 이상이면 +repWinHigh 더) · 실패 −repFail · 길드원 사망 −repDeath · 이탈 −repLeave · 운영비 부족 −repUnpaid · 한 달 공략 0회 −repIdle
      등급 심사: 매월 1일 guildTiers 조건(평판 · 누적 공략 · 길드원 수 · 길드 등급)을 보고 한 단계씩 승급, 평판이 지금 단계 조건 − demoteGap 아래면 강등
      영입 경쟁: 매월 1일 사기 poachMorale 미만 길드원에게 NPC 길드가 poachChance 확률로 영입 제안 (poachDays 일 안에 붙잡지 않으면 사기에 따라 떠남). 붙잡기 = 배분율 한 단계 + 사기 holdMorale
      NPC 길드는 매일 npcSign 확률로 무소속 헌터 한 명과 계약 (무소속 헌터를 두고 경쟁) */
   /* NPC 길드 월간 변동: 그 달 길드원 공략 승률이 npcWinRef 보다 높으면 평판 +, 낮으면 −((승률 − npcWinRef) × npcRepK, ±npcRepMax), 사망 1명당 −npcRepDeath, 공략이 없으면 −1. 원래 평판 쪽으로 (차이 × npcRepPull) 만큼 되돌아간다.
      누적 공략 += 성공 ÷ npcParty, 자금 += 길드원 수입 × memberCut */
   npcWinRef:0.95, npcRepK:30, npcRepMax:4, npcRepDeath:1, npcParty:3, npcRepPull:0.15,
   repWin:1, repWinHigh:1, repFail:1, repDeath:4, repLeave:1, repUnpaid:2, repIdle:1, demoteGap:10,
   poachMorale:50, poachChance:0.25, poachDays:5, holdMorale:15, npcSign:0.03,
   colors:[['#2f4a7a','#4a6fb0'],['#5a2a5e','#8a4a90'],['#2e5a3a','#4a8a5c'],['#6a4a1a','#a3772d'],['#5e2a2a','#954444'],['#2a4f5a','#3f7a89']]},
]);

/* 흘러가는 뉴스 · 소문 재료 (나중에 Claude가 늘리는 데이터)
   newsPool     : 하루에 BAL_WORLD.flavorNews 확률로 하나씩 뉴스에 올라오는 세상 이야기. w 가중치 · months [월] 이면 그 달에만
   rumorPool    : NPC에 대한 근거 없는 소문 문장 ({a} = 소문 대상 이름). BAL_NPCREL.falseRumor 확률로 하루 하나 */

def('balance', [
  /* 파티(임시) · 공격대(고정 파티) [prototype_default]
     partyMax: 내 임시 파티 최대 인원(나 포함, 게이트 partyMax 가 더 작으면 그쪽) · 임시 파티는 공략이 끝나면 풀린다
     초대 수락: 공격대원 · 같은 길드원 · 이미 파티원이면 바로. 그 밖에는 설득력 + d20 + 호감/10 − 등급 차 ≥ inviteDc
     teamMax: 공격대 최대 인원(나 포함) · teamDc: 공격대 가입 권유 난이도 · teamBond: 공격대원과 공략할 때마다 친밀 +
     boardPosts: 파티 모집 게시판에 올라오는 협회 매칭 글 수 */
  /* 파티는 갈 게이트를 먼저 정한다 (2026-10-23): 게이트보다 gateUp 급 강한 ~ gateDown 급 약한 헌터만 함께 갈 수 있다. 초대 · 공격대 권유를 거절하면 refuseHours 시간 동안 다시 부를 수 없다.
     모집 게시판 · 갈 게이트 목록은 지금 있는 곳에서 boardKm 안 */
  {id:'BAL_PARTY', proto:true, partyMax:4, inviteDc:12, teamMax:8, teamDc:15, teamBond:2, boardPosts:6, gateUp:3, gateDown:2, refuseHours:24, boardKm:40},
]);
