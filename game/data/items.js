/* =========================================================
   items.js — 아이템 정의 · 보관 위치
   시스템 인벤토리는 없다. 물건은 지니고 있거나 놓아 둔 장소(loc)에 있다. 무게는 따지지 않는다.
   시스템 상점: 코인(몬스터를 처치할 때마다 상태창에 쌓이는 시스템 화폐)으로 사고판다. 산 물건은 가방(LOC_BAG)으로, 팔 수 있는 건 지닌 물건(carry).
   시스템이 파는 목록은 sysShop(coin = 코인 가격), 되팔 때 값은 BAL_SHOP.sellRate × 코인 환산가(기준가 ÷ BAL_COIN.wonPerCoin).
   grade : 장비 · 소모품 등급 (itemGrades: 일반 · 고급 · 희귀 · 영웅 · 전설 + 숨은 신화). 등급이 기본 보정(+1 · +2 · +4 · +7 · +11 · +16) · 내구도를 정한다
   rank  : 마정석 · 소재 = 나온 게이트 등급 (RANK_01~20). 장비의 rank 는 협회 인증 등급 표시일 뿐 성능과 상관없다. 장비에 grade 가 없으면 옛 rank 로 등급을 어림한다 (옛 외주 데이터 호환, GEAR.normalize)
   착용은 누구나 · 등급과 상관없이 (2026-10-23 사용자 결정). req(스탯 조건)는 쓰지 않는다. 귀속 · 클래스 전용 같은 특수 조건(cond)은 나중에
   무엇을 입고 쓸지는 헌터가 정한다 (관찰형 · 2026-10-24, engine/gear.js consider). 성좌는 선물만 한다
   slot  : 착용 칸 (equipSlots). twoHand:true = 무기 + 보조 칸을 같이 차지, onePiece:true = 상의 + 하의 칸을 같이 차지. special:true 인 물건만 특수 칸
   traits: 개성 ID 목록 (itemTraits, 0~3개). 종류 · 크기는 등급에 따라 (itemGrades.traits · mag)
   sources: 구하는 곳 ID 목록 (itemSources). 없으면 등급 기본값
   matCat · matPart: 소재면 몬스터 계열(monsterCats) · 부위(matParts) — 계열 × 부위로 몬스터와 자동 연결 (나중에)
   classBook: 클래스북이면 그 클래스 ID (고유 클래스북 = 성좌 없이 고유 클래스를 얻는 드문 길)
   price : 개당 기준가(원, 표시용)
   use   : 사용 효과 — mp/hp(% 회복) · energy · cure(부상 종류 하나를 치료). 없으면 사용 불가
   내구도: 착용 장비 한 개마다 inv 줄의 dur. 공략할 때마다 닳고, 0 이면 부서져 성능이 없다. 수리는 헌터가 알아서 공방에 맡긴다
   ========================================================= */

/* 분류. equip:true = 장비 (DB · 소지품에서 무기 / 방어구 / 악세사리로 따로 본다) */
def('itemCats', [
  {id:'ITC_WEAPON',  name:'무기',     equip:true},
  {id:'ITC_ARMOR',   name:'방어구',   equip:true},
  {id:'ITC_ACCESSORY', name:'악세사리', equip:true},
  {id:'ITC_GEAR',    name:'장비 · 도구'},
  {id:'ITC_CONSUME', name:'소모품'},
  {id:'ITC_STONE',   name:'마정석'},
  {id:'ITC_MAT',     name:'소재'},
  {id:'ITC_BOOK',    name:'스킬북 · 클래스북'},
  {id:'ITC_DAILY',   name:'생활품'},
]);

/* 보관 위치. carry: 몸에 지니는 곳 (시스템 상점에 팔 수 있다) */
def('itemLocs', [
  {id:'LOC_BODY',  name:'착용',     carry:true},
  {id:'LOC_BAG',   name:'가방',     carry:true},
  {id:'LOC_HOME',  name:'자택',     carry:false},
  {id:'LOC_GUILD', name:'길드 창고', carry:false},
]);

/* 착용 칸 (2026-10-23 사용자 결정). 옛 칸(SLOT_BODY · HANDS · RING · FACE)은 GEAR.normalize 가 바꾼다 */
def('equipSlots', [
  {id:'SLOT_WEAPON',  name:'무기'},
  {id:'SLOT_SUB',     name:'보조'},
  {id:'SLOT_TOP',     name:'상의'},
  {id:'SLOT_BOTTOM',  name:'하의'},
  {id:'SLOT_EAR',     name:'귀'},
  {id:'SLOT_NECK',    name:'목'},
  {id:'SLOT_HAND',    name:'손'},
  {id:'SLOT_SPECIAL', name:'특수'},
]);

/* 등급 (장비 · 소모품 공통). bonus: 기본 보정(무기 → 판정 · 공략 전력, 방어구 → 받는 피해 감소)
   traits: 개성 칸 [최소, 최대] · mag: 개성 크기 [최소, 최대] · dur: 최대 내구도 (null = 닳지 않음) · wear: 공략 1회에 닳는 양
   repair: 수리비 배율 · sources: 기본 구하는 곳 · hidden: 숨은 단계 · look · social: 생김새 · 사회 반응 (사건 · 묘사 조건용)
   oldRank: 옛 rank 만 있는 장비를 어림할 때 이 등급 숫자 이하이면 이 등급 */
def('itemGrades', [
  {id:'IG_1', name:'일반', n:1, bonus:1,  traits:[0,0], mag:[0,0], dur:60,   wear:6, repair:1,   color:'#9aa3ad', oldRank:20, sources:['SRC_ASSOC_SHOP','SRC_STORE','SRC_ONLINE','SRC_USED','SRC_ASSOC_GIVE'], look:'평범한 쇠, 흠집', social:'아무도 신경 안 씀'},
  {id:'IG_2', name:'고급', n:2, bonus:2,  traits:[0,1], mag:[1,1], dur:100,  wear:4, repair:1.2, color:'#5fb37a', oldRank:16, sources:['SRC_ASSOC_SHOP','SRC_STORE','SRC_WORKSHOP','SRC_ONLINE','SRC_USED'], look:'손질된 날, 각인', social:'동료가 알아봄'},
  {id:'IG_3', name:'희귀', n:3, bonus:4,  traits:[1,1], mag:[1,2], dur:160,  wear:3, repair:1.5, color:'#4f8fd8', oldRank:12, sources:['SRC_AUCTION','SRC_ASSOC_SHOP','SRC_DROP','SRC_WORKSHOP'], look:'은은한 빛, 소재 무늬', social:'부러움 · 흥정 제안'},
  {id:'IG_4', name:'영웅', n:4, bonus:7,  traits:[1,2], mag:[2,2], dur:250,  wear:2, repair:2,   color:'#9b6ad6', oldRank:8,  sources:['SRC_AUCTION','SRC_DROP','SRC_GUILD'], look:'기운이 느껴짐, 주변 공기가 달라짐', social:'기자 · 길드의 관심, 도난 위험'},
  {id:'IG_5', name:'전설', n:5, bonus:11, traits:[2,2], mag:[2,3], dur:400,  wear:1, repair:3,   color:'#e0a43c', oldRank:4,  sources:['SRC_DROP','SRC_GUILD','SRC_PERSON'], look:'보는 사람이 압도됨', social:'뉴스, 노리는 사람'},
  {id:'IG_6', name:'신화', n:6, bonus:16, traits:[2,3], mag:[3,3], dur:null, wear:0, repair:0,   color:'#e05a5a', hidden:true, sources:['SRC_DROP'], look:'설명하기 어려움', social:'국가 행사급'},
]);

/* 개성 (틀만, 목록은 외주). {id, name, kind, v, stat?, on?, desc}
   kind: stat(그 기본 스탯 묶음 판정 ±, stat 필요) · check(무기 판정 ±) · resist(저항, on = 부상 종류 등 — 효과 연결은 나중) · situ(상황 보정, on — 나중)
   좋은 개성엔 단점을 같이 붙인다 */
def('itemTraits', []);

/* 구하는 곳 (13가지, 나중에 늘릴 수 있게). wired: 지금 게임에 실제로 연결된 곳. 헌터가 현실에서 사는 사건 · 선택지는 나중에 */
def('itemSources', [
  {id:'SRC_ASSOC_SHOP', name:'협회 공식 매장', desc:'정가 · 인증품'},
  {id:'SRC_STORE',      name:'민간 헌터 용품점', desc:'동네 가게 · 체인점. 가게마다 물건 · 값이 다름'},
  {id:'SRC_ONLINE',     name:'온라인 쇼핑', desc:'며칠 뒤 배송. 가짜 · 불량이 섞일 수 있음'},
  {id:'SRC_USED',       name:'중고 거래', desc:'헌터끼리 직거래. 싸지만 사기 · 하자 위험'},
  {id:'SRC_WORKSHOP',   name:'공방 주문 제작', desc:'맡기면 며칠 뒤 완성'},
  {id:'SRC_AUCTION',    name:'성좌 경매장', desc:'성좌가 코인으로 사서 선물', wired:true},
  {id:'SRC_DROP',       name:'게이트 드롭', desc:'보스 · 숨은 방 · 상자', wired:true},
  {id:'SRC_GUILD',      name:'길드', desc:'지급 · 대여 · 창고. 탈퇴하면 돌려줌'},
  {id:'SRC_ASSOC_GIVE', name:'협회 지급 · 포상', desc:'시작 장비 · 승급 · 공로 포상', wired:true},
  {id:'SRC_SYSTEM',     name:'상점', desc:'성좌가 코인으로 사서 선물', wired:true},
  {id:'SRC_PERSON',     name:'사람에게서', desc:'선물 · 상속 · 유품 · 빌리기'},
  {id:'SRC_BLACK',      name:'암시장', desc:'불법 · 장물 · 미인증품 (범죄는 보류 — 틀만)'},
  {id:'SRC_CRAFT',      name:'직접 제작', desc:'생산 · 제작 클래스 (제작은 아직 넣지 않음)'},
]);

/* 마정석 품질 ('17급 최상급 마정석' = 게이트 등급 × 품질). w: 나올 확률 비중 · mul: 기준가 배율 */
def('stoneQuals', [
  {id:'SQ_1', name:'하급',   n:1, w:30, mul:0.6},
  {id:'SQ_2', name:'중급',   n:2, w:45, mul:1},
  {id:'SQ_3', name:'상급',   n:3, w:20, mul:1.6},
  {id:'SQ_4', name:'최상급', n:4, w:5,  mul:2.6},
]);
/* 마정석 80종 = 게이트 등급 20 × 품질 4 (ID IT_ST<등급 두 자리>_<품질 n>). 중급 기준가 = 89,000원 × 1.46^(19 − 등급 숫자) (옛 하 · 중 · 상 · 최상 값과 같은 흐름)
   쓰임: 협회 판매 · 사회 에너지원(뉴스 · 시세). 개수 = 몫 ÷ 그 마정석 기준가라 경제 총액은 그대로 */
def('items', (()=>{const Q=[['하급',0.6],['중급',1],['상급',1.6],['최상급',2.6]],o=[];
  for(let lv=20;lv>=1;lv--){const base=89000*Math.pow(1.46,19-lv),rk='RANK_'+String(lv).padStart(2,'0');
    Q.forEach(([q,m],i)=>{const p=base*m,r=p>=1e7?1e5:p>=1e6?1e4:1e3;o.push({id:`IT_ST${String(lv).padStart(2,'0')}_${i+1}`,name:`${lv}급 ${q} 마정석`,cat:'ITC_STONE',rank:rk,stone:true,sq:'SQ_'+(i+1),price:Math.round(p/r)*r,
      desc:`${lv}급 게이트에서 나온 ${q} 마정석. 협회 고시가로만 매입. 발전 · 산업용 에너지원.`})})}
  return o})());

/* 상점 밸런스 [prototype_default]. sellRate: 시스템에 되팔 때 기준가 대비 비율 */
def('balance', [
  /* autoSellFee: '공략 끝나면 자동 판매'(협회 원격 매입) 수수료 — 매입소에 직접 가서 팔면 없음 (사용자 요청 2026-10-23) */
  /* BAL_GEAR: repairRate = 수리비(기준가 × 닳은 비율 × 등급 repair 에 곱함). autoRepairAt: 내구가 이 비율 아래면 공략 뒤 공방에 맡김 (돈이 수리비 × keep 배 이상일 때). armorPieceMul: 상의 · 하의 따로면 각각 이 배율 (한 벌은 1) */
  {id:'BAL_GEAR', proto:true, repairRate:0.3, autoRepairAt:0.5, keep:3, armorPieceMul:0.6},
  {id:'BAL_SHOP', proto:true, sellRate:0.4, assocRate:0.9, autoSellFee:0.03},
  /* 코인: 몬스터 1마리 처치마다 perKill × (21 − 게이트 등급 숫자)^rankExp 코인 (후퇴하면 retreat 배). wonPerCoin: 코인 가격이 없을 때 원화 기준가를 코인으로 바꾸는 값 */
  /* 협회 경매장 (원화). 매일 NPC 출품이 newPerDay 개쯤 올라오고, 경매는 days 일 동안 열린다. 시작가 = 기준가 × start, 즉시 구매가 = 기준가 × buyout
     NPC 입찰: 시간마다 bidPerHour 확률로 다음 입찰가(현재가 × (1 + step))를 부르되, 기준가 × npcMax 를 넘으면 멈춘다
     내 출품: 수수료 fee(낙찰가 비율). 입찰금은 입찰할 때 빠져나가고, 다른 사람이 더 부르면 돌려받는다 */
  {id:'BAL_AUCTION', proto:true, newPerDay:4, maxLots:14, days:[1,3], start:[0.55,0.85], buyout:[1.25,1.6], step:0.06, bidPerHour:0.06, npcMax:[0.9,1.35], fee:0.05, cats:['ITC_WEAPON','ITC_ARMOR','ITC_ACCESSORY','ITC_GEAR','ITC_STONE','ITC_MAT','ITC_BOOK','ITC_CONSUME']},
  /* 경제 기준 (2026-10-23) [prototype_default] — 게이트 하나의 총수익 = gateBase × perRank^(20 − 등급 숫자) 원 (마정석 + 소재).
     파티원 수로 나눠 가진다(플레이어 · 길드원 · NPC 모두 같은 식). 실패 · 후퇴 = failRate × 진행도(최소 0.25). matShare 는 마정석이 아닌 몬스터 소재 몫(드롭으로 따로 나옴).
     마정석: 그 게이트 등급의 마정석, 품질은 stoneQuals 비중으로 뽑는다. 개수 = 몫 ÷ 그 마정석 기준가
     무소속은 마정석을 받아 협회에 판다(BAL_SHOP.assocRate). 길드원은 현금 정산(길드 몫을 뺀 금액). 예: 20급 100만 · 15급 663만 · 10급 4,400만 · 5급 2.9억 · 1급 13.3억
     입찰: 다른 길드 입찰가 = 총수익 × bidShare × (0.5~1.5), 내 입찰 단계 = 총수익 × bidSteps */
  {id:'BAL_ECON', proto:true, gateBase:1000000, perRank:1.46, partyRef:4, failRate:0.4, matShare:0.15,
   bidShare:0.12, bidSteps:[0.05,0.1,0.15,0.25]},
  {id:'BAL_COIN', proto:true, perKill:1, rankExp:1.3, retreat:0.6, wonPerCoin:10000, start:0},   /* assocRate: 협회 매입가 = 기준가 × 비율 (흥정 불가, 마정석 · 소재만) */
]);
