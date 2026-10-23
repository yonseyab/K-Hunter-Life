/* =========================================================
   items.js — 아이템 정의 · 보관 위치
   시스템 인벤토리는 없다. 물건은 지니고 있거나 놓아 둔 장소(loc)에 있다. 무게는 따지지 않는다.
   시스템 상점: 코인(몬스터를 처치할 때마다 상태창에 쌓이는 시스템 화폐)으로 사고판다. 산 물건은 가방(LOC_BAG)으로, 팔 수 있는 건 지닌 물건(carry).
   시스템이 파는 목록은 sysShop(coin = 코인 가격), 되팔 때 값은 BAL_SHOP.sellRate × 코인 환산가(기준가 ÷ BAL_COIN.wonPerCoin).
   rank : 장비 등급 (RANK_01~20). 등급이 높을수록 성능이 좋다 (무기 → 판정 · 공략 전력, 방어구 → 피해 감소). 착용 제한은 등급이 아니라 req
   req  : 착용에 필요한 기본 스탯 {STAT_BODY:30, …} (메이플스토리식). 모두 채워야 착용할 수 있다. 없거나 {} 면 누구나. lv 를 넣으면 레벨도 필요
   price : 개당 기준가(원, 표시용)
   use   : 사용 효과 — mp/hp(% 회복) · energy · cure(부상 종류 하나를 치료). 없으면 사용 불가
   slot  : 착용 부위 (equipSlots). 같은 부위는 하나만 착용. 착용 = 위치 LOC_BODY
   아이템이 게임에 주는 효과는 아직 정하지 않았다.
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

/* 착용 부위 */
def('equipSlots', [
  {id:'SLOT_WEAPON', name:'무기'},
  {id:'SLOT_BODY',   name:'몸통'},
  {id:'SLOT_HANDS',  name:'손'},
  {id:'SLOT_FACE',   name:'얼굴'},
  {id:'SLOT_NECK',   name:'목걸이'},
  {id:'SLOT_RING',   name:'반지'},
  {id:'SLOT_EAR',    name:'귀걸이'},
]);



/* 상점 밸런스 [prototype_default]. sellRate: 시스템에 되팔 때 기준가 대비 비율 */
def('balance', [
  /* autoSellFee: '공략 끝나면 자동 판매'(협회 원격 매입) 수수료 — 매입소에 직접 가서 팔면 없음 (사용자 요청 2026-10-23) */
  {id:'BAL_SHOP', proto:true, sellRate:0.4, assocRate:0.9, autoSellFee:0.03},
  /* 코인: 몬스터 1마리 처치마다 perKill × (21 − 게이트 등급 숫자)^rankExp 코인 (후퇴하면 retreat 배). wonPerCoin: 코인 가격이 없을 때 원화 기준가를 코인으로 바꾸는 값 */
  /* 협회 경매장 (원화). 매일 NPC 출품이 newPerDay 개쯤 올라오고, 경매는 days 일 동안 열린다. 시작가 = 기준가 × start, 즉시 구매가 = 기준가 × buyout
     NPC 입찰: 시간마다 bidPerHour 확률로 다음 입찰가(현재가 × (1 + step))를 부르되, 기준가 × npcMax 를 넘으면 멈춘다
     내 출품: 수수료 fee(낙찰가 비율). 입찰금은 입찰할 때 빠져나가고, 다른 사람이 더 부르면 돌려받는다 */
  {id:'BAL_AUCTION', proto:true, newPerDay:4, maxLots:14, days:[1,3], start:[0.55,0.85], buyout:[1.25,1.6], step:0.06, bidPerHour:0.06, npcMax:[0.9,1.35], fee:0.05, cats:['ITC_WEAPON','ITC_ARMOR','ITC_ACCESSORY','ITC_GEAR','ITC_STONE','ITC_MAT','ITC_BOOK','ITC_CONSUME']},
  /* 경제 기준 (2026-10-23) [prototype_default] — 게이트 하나의 총수익 = gateBase × perRank^(20 − 등급 숫자) 원 (마정석 + 소재).
     파티원 수로 나눠 가진다(플레이어 · 길드원 · NPC 모두 같은 식). 실패 · 후퇴 = failRate × 진행도(최소 0.25). matShare 는 마정석이 아닌 몬스터 소재 몫(드롭으로 따로 나옴).
     마정석 등급: stoneTiers [등급 숫자 이상이면, 아이템] — 하 20~16 · 중 15~11 · 상 10~6 · 최상 5~1. 개수 = 몫 ÷ 그 마정석 기준가
     무소속은 마정석을 받아 협회에 판다(BAL_SHOP.assocRate). 길드원은 현금 정산(길드 몫을 뺀 금액). 예: 20급 100만 · 15급 663만 · 10급 4,400만 · 5급 2.9억 · 1급 13.3억
     입찰: 다른 길드 입찰가 = 총수익 × bidShare × (0.5~1.5), 내 입찰 단계 = 총수익 × bidSteps */
  {id:'BAL_ECON', proto:true, gateBase:1000000, perRank:1.46, partyRef:4, failRate:0.4, matShare:0.15,
   stoneTiers:[[16,'IT_B0001'],[11,'IT_B0002'],[6,'IT_B0003'],[1,'IT_B0004']], bidShare:0.12, bidSteps:[0.05,0.1,0.15,0.25]},
  {id:'BAL_COIN', proto:true, perKill:1, rankExp:1.3, retreat:0.6, wonPerCoin:10000, start:0},   /* assocRate: 협회 매입가 = 기준가 × 비율 (흥정 불가, 마정석 · 소재만) */
]);
