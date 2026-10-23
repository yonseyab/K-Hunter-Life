/* =========================================================
   places.js — 장소 · 이동 (큰 틀: 같은 곳에 있어야 만나고, 다른 곳에 가려면 시간이 든다)
   placeTypes : 장소 종류. 지역마다 같은 종류의 장소가 있다고 본다 (지역 + 종류 = 장소).
                집은 플레이어가 사는 지역의 집, 길드 사무실은 길드 지역, 게이트 현장은 게이트 지역.
   행동의 place 필드 (actions.js): 장소 종류 ID, 또는 'target'(대상 인물이 있는 지역의 PT_CAFE) · 'gate'(대상 게이트 현장) · 'guild'(대상/내 길드 사무실)
   free       : 이 행동 중인 NPC는 만나자고 하면 시간을 낼 수 있다 (아니면 '바쁨')
   2026-10-24 (사용자: 장소는 외주, 시 · 군 · 구 단위까지, 이름 있는 개별 장소까지, 디폴트값만)
   placeTypes 추가 필드 (외주분): group 묶음(life 생활 · hunter 헌터 · shop 가게 · public 공공 · move 교통 · nature 자연 · etc 기타),
                desc 한 줄, where 있는 곳(all 어느 시 · 군 · 구에나 · city 시 · 구에만 · metro 광역시 · 큰 도시에만 · rare 몇 곳만),
                sources 아이템을 구할 수 있으면 itemSources ID
   placeTags  : 장소 꼬리표 {id:'PTAG_…', name, desc} — 분위기 · 가격대 · 위험 · 혼잡 같은 사건 조건 재료
   places     : 이름 있는 개별 장소 {id:'PL_<배치><5자리>', name, type(placeTypes), region(regions), desc 한 문장, tags(placeTags), scale(local 동네 · region 시 · 군 · 구 · national 전국에 알려짐), real(실존 공공 지명 기반이면 true)}
                지금은 데이터만 — 게임에서 쓰는 건 나중 (이동 · 단골 · 사건 조건)
   ========================================================= */
def('placeTypes', [
  {id:'PT_HOME',     name:'집',          icon:'⌂'},
  {id:'PT_TRAIN',    name:'헌터 훈련장', icon:'⚔'},
  {id:'PT_LIB',      name:'도서관',      icon:'▤'},
  {id:'PT_CAFE',     name:'카페 · 식당', icon:'☕'},
  {id:'PT_WORK',     name:'일터',        icon:'▣'},
  {id:'PT_ASSOC',    name:'협회 지부',   icon:'◆'},
  {id:'PT_HOSPITAL', name:'헌터 병원',   icon:'✚'},
  {id:'PT_GUILD',    name:'길드 사무실', icon:'⚑'},
  {id:'PT_GATE',     name:'게이트 현장', icon:'◎'},
]);

/* 장소 꼬리표 · 이름 있는 장소 (외주로 채운다) */
def('placeTags', []);
def('places', []);

/* 이동 [prototype_default]
   거리(km) = 두 지역 geo 사이 거리. 같은 지역 안 이동은 same 분.
   far km 이하는 대중교통: base + km × perKm 분 · 요금 fare + km × farePerKm
   far km 넘으면 KTX · 항공: longBase + km × longPerKm 분 · 요금 longFare + km × longFarePerKm (제주는 항공으로 같은 식)
   이동 중 기력은 BAL_TIME.awakeDrain 대신 energyPerHour */
def('balance', [
  {id:'BAL_MOVE', proto:true, same:15, base:20, perKm:2.2, fare:1500, farePerKm:100, far:80,
   longBase:70, longPerKm:0.3, longFare:20000, longFarePerKm:120, energyPerHour:-3,
   workSame:0.55, workMaxKm:45,   /* 일반인 일터: 사는 지역일 확률 · 다른 지역이면 이 거리(km) 안에서 (출퇴근) */
   busyActs:['ACT_WORK','ACT_JOB','ACT_GUILD','ACT_GATE_RAID','ACT_HOSPITAL','ACT_SLEEP','ACT_TR_COMBAT','ACT_TR_MANA','ACT_TR_SKILL','ACT_TR_SENSE']},
]);

/* 정보 출처 (engine/know.js). staleDays: 이 날짜가 지나면 '오래된 정보'로 표시 */
def('knowSources', [
  {id:'KS_SCOUT', name:'협회 스카우트 보고서', staleDays:14},
  {id:'KS_TALK',  name:'대화',               staleDays:7},
  {id:'KS_OLD',   name:'예전 보고서',         staleDays:14},
  {id:'KS_GATE',  name:'게이트 사전 조사',     staleDays:3},
  {id:'KS_HEARD', name:'지인에게 건너 들음',   staleDays:14},
  {id:'KS_RUMOR', name:'소문',               staleDays:30},
  {id:'KS_NEWS',  name:'뉴스',               staleDays:30},
]);
/* 들은 이야기 문장 — 아는 사람(관계 있는 사람)에게 일이 생기면 플레이어가 '들은 이야기'로 알게 된다 (KNOW.hear)
   on: 세계 사건(02 이벤트의 on 과 같은 값) · text: {a} 대상 이름, 사건 데이터 {rank} {gate} {why} {cls} {role} {job} {title} {guild}
   이벤트가 따로 발동해도 들은 이야기는 남는다. 같은 on 이 여러 개면 무작위 */

def('balance', [
  /* 아는 정보: gossip = 만나서 이야기할 때(만나기 · 데이트) 상대가 내가 아는 다른 사람의 소문을 하나 들려줄 확률 */
  {id:'BAL_KNOW', proto:true, gossip:0.5},
]);
