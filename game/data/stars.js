/* =========================================================
   stars.js — 성좌 (2026-10-24 사용자 결정). 틀만 — 목록은 나중에 사용자 · 외주가 채운다
   헌터물 + 성좌물. 플레이어 = 내 헌터의 성좌 (직접 조종하지 않는다). 세상은 성좌가 있다는 걸 알지만, 누가 어느 성좌를 받는지는 모른다.
   성좌에게 이 세계는 '부캐 키우기'에 가깝다 (성좌마다 이유는 다르다 → why).
   헌터 한 명에 성좌는 하나. 성좌 하나가 헌터 여럿을 키울 수 있다. 고유 클래스는 성좌 하나에 하나, 가진 헌터는 세계에 한 명.
   코인 = 성좌 포인트. 상점 · 성좌 경매장에서 코인으로 물건을 사 헌터에게 선물한다(STAR.gift). 쓸지 · 입을지는 헌터가 정한다.
   내 성좌 설정(이름 · 성향 · 시작 코인 · 헌터가 아는지)은 커마 화면에서 나중에. 업적 · 성좌 화면도 나중에.
   ========================================================= */

/* 성좌 성향. {id, name, desc} */
def('starTraits', []);

/* NPC 성좌. {id, name, trait(starTraits), why(이 세계를 키우는 이유), cls(묶인 고유 클래스 ID, 없으면 null), hunters(키우는 헌터 수 [최소, 최대])}
   다른 헌터 일부를 후원하고, 성좌 경매장에서 출품 · 입찰로 경쟁한다 */
def('constellations', []);

/* 성좌 메시지 · 축복 (자리만 — 나중에 사용자가 넣는다)
   starMessages: {id, on:'gift'|'raidWin'|'raidLose'|'injured'|'rankUp'|'classGrant'|..., trait?(starTraits), text} — 이야기 창에 "[성좌] …" 한 줄 ({item} {cls} 치환)
   starBlessings: {id, name, coin, desc, fx} — 코인으로 거는 축복 · 스킬 (효과 연결은 나중) */
def('starMessages', []);
def('starBlessings', []);

/* npcRate: 고유 클래스가 없는 NPC 헌터에게 성좌가 붙어 있을 확률 · uniqueRate: 고유 클래스가 있는 헌터에게 성좌가 붙어 있을 확률
   giftsKeep: 선물 기록 줄 수 · anonSeller: 경매 출품 · 입찰자가 '익명의 성좌'일 확률 (NPC 성좌가 없으면 늘 익명) */
def('balance', [
  {id:'BAL_STAR', proto:true, npcRate:0.03, uniqueRate:0.95, giftsKeep:200, anonSeller:0.3},
]);
