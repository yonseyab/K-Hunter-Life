/* =========================================================
   stars.js — 성좌 (2026-10-24 사용자 결정)
   헌터물 + 성좌물. 플레이어 = 내 헌터의 성좌 (직접 조종하지 않는다). 세상은 성좌가 있다는 걸 알지만, 누가 어느 성좌를 받는지는 모른다.
   성좌에게 이 세계는 '부캐 키우기'에 가깝다 (성좌마다 이유는 다르다).
   성좌 = 게임 계정 = 세이브 칸 (기본 3칸, engine/account.js STARACC). 업적 · 코인 · 해금이 성좌에 쌓이고, 성좌 하나는 헌터 한 명만 키운다.
   한 번 만든 성좌는 고칠 수 없다. 코인 = 성좌 포인트 — 상점 · 성좌 경매장에서 사서 헌터에게 선물한다(STAR.gift). 쓸지 · 입을지는 헌터가 정한다.
   base:true = 화면이 돌아가게 Claude가 넣은 기본값 (나중에 외주로 바꾸거나 늘린다)
   ========================================================= */

/* 성좌 성향 (만들 때 고른다). 나중에 메시지 말투 · 축복 성격의 재료 */
def('starTraits', [
  {id:'STT_WATCH',    name:'지켜보는',   desc:'말없이 오래 지켜본다.', base:true},
  {id:'STT_GENEROUS', name:'후한',       desc:'아끼지 않고 내준다.', base:true},
  {id:'STT_PLAYFUL',  name:'장난스러운', desc:'헌터가 곤란해하는 걸 즐긴다.', base:true},
  {id:'STT_STERN',    name:'엄격한',     desc:'쉽게 만족하지 않는다.', base:true},
  {id:'STT_COLD',     name:'냉담한',     desc:'정을 주지 않는다. 결과만 본다.', base:true},
  {id:'STT_DOTING',   name:'애틋한',     desc:'헌터가 다치는 걸 못 견딘다.', base:true},
]);

/* 이 세계에서 헌터를 키우는 이유 */
def('starReasons', [
  {id:'SRS_BORED',   name:'심심풀이',              desc:'영원은 길다. 볼거리가 필요했다.', base:true},
  {id:'SRS_BET',     name:'다른 성좌와의 내기',    desc:'누가 더 멀리 가는 헌터를 키우는지 걸었다.', base:true},
  {id:'SRS_REVENGE', name:'오래된 복수',           desc:'갚아야 할 상대가 이 세계 어딘가에 있다.', base:true},
  {id:'SRS_BOND',    name:'옛 인연',               desc:'오래전 이 땅에서 잃은 누군가를 닮았다.', base:true},
  {id:'SRS_TEST',    name:'시험',                  desc:'이 아이가 어디까지 버티는지 보고 싶다.', base:true},
  {id:'SRS_STORY',   name:'좋은 이야기',           desc:'끝까지 지켜볼 만한 이야기를 찾고 있다.', base:true},
  {id:'SRS_HEIR',    name:'후계자 찾기',           desc:'자리를 물려줄 그릇을 찾는 중이다.', base:true},
  {id:'SRS_LONELY',  name:'외로움',                desc:'누군가의 곁에 있고 싶었다.', base:true},
]);

/* 영역 · 상징 (성좌가 다스리는 것). sigil: 기본 문양. 나중에 고유 클래스 · 축복의 성격 */
def('starDomains', [
  {id:'SDM_FIRE',    name:'불',      sigil:'✶', base:true},
  {id:'SDM_SEA',     name:'바다',    sigil:'≈', base:true},
  {id:'SDM_DEATH',   name:'죽음',    sigil:'✝', base:true},
  {id:'SDM_WISDOM',  name:'지혜',    sigil:'◈', base:true},
  {id:'SDM_WAR',     name:'전쟁',    sigil:'⚔', base:true},
  {id:'SDM_TALE',    name:'이야기',  sigil:'❖', base:true},
  {id:'SDM_NIGHT',   name:'밤하늘',  sigil:'☾', base:true},
  {id:'SDM_HARVEST', name:'풍요',    sigil:'✿', base:true},
]);

/* 색 · 문양 고르기 */
def('starColors', [
  {id:'SCL_GOLD',  name:'금',   hex:'#e0b341'}, {id:'SCL_RED',   name:'붉은', hex:'#d9534f'},
  {id:'SCL_BLUE',  name:'푸른', hex:'#4f8fd8'}, {id:'SCL_JADE',  name:'비취', hex:'#3fae8a'},
  {id:'SCL_VIOLET',name:'보라', hex:'#9b6ad6'}, {id:'SCL_SILVER',name:'은',   hex:'#b8c2cc'},
  {id:'SCL_EMBER', name:'잿불', hex:'#e07a3c'}, {id:'SCL_INK',   name:'먹',   hex:'#6b7480'},
]);
def('starSigils', [
  {id:'SSG_1', mark:'✦'}, {id:'SSG_2', mark:'☾'}, {id:'SSG_3', mark:'☼'}, {id:'SSG_4', mark:'◈'},
  {id:'SSG_5', mark:'✶'}, {id:'SSG_6', mark:'⚔'}, {id:'SSG_7', mark:'❖'}, {id:'SSG_8', mark:'≈'},
]);

/* 이름 자동 생성: 앞(수식) + 뒤(존재). "새벽을 기다리는 자" */
def('starNameParts', [
  {id:'SNP_PRE', list:['새벽을 기다리는','잿빛 탑의','웃는','물가의','이름을 잃은','붉은 실을 잣는','끝을 보는','오래 잠든','별을 세는','문 앞에 선','바람을 삼킨','마지막 장을 쓰는']},
  {id:'SNP_POST', list:['자','왕','사냥개','어부','직조자','관측자','방랑자','노래꾼','파수꾼','여왕','늙은 신','아이']},
]);

/* 시작 코인 (사실상 난이도) */
def('starStarts', [
  {id:'SST_0', name:'빈손',   coin:0},
  {id:'SST_1', name:'조금',   coin:100},
  {id:'SST_2', name:'넉넉히', coin:1000},
  {id:'SST_3', name:'잔뜩',   coin:10000},
]);

/* 헌터가 성좌를 아는지 */
def('starKnown', [
  {id:'SKN_YES',   name:'안다'},
  {id:'SKN_NO',    name:'모른다'},
  {id:'SKN_LATER', name:'나중에 알게 됨'},
]);

/* 프리셋 (고른 뒤 세부를 고친다) */
def('starPresets', [
  {id:'SPR_1', name:'새벽을 기다리는 자', trait:'STT_WATCH',    reason:'SRS_STORY',   domain:'SDM_NIGHT',   color:'SCL_SILVER', sigil:'SSG_2', base:true},
  {id:'SPR_2', name:'붉은 실을 잣는 여왕', trait:'STT_DOTING',  reason:'SRS_BOND',    domain:'SDM_TALE',    color:'SCL_RED',    sigil:'SSG_7', base:true},
  {id:'SPR_3', name:'웃는 사냥개',         trait:'STT_PLAYFUL', reason:'SRS_BET',     domain:'SDM_WAR',     color:'SCL_EMBER',  sigil:'SSG_6', base:true},
  {id:'SPR_4', name:'잿빛 탑의 관측자',    trait:'STT_STERN',   reason:'SRS_TEST',    domain:'SDM_WISDOM',  color:'SCL_INK',    sigil:'SSG_4', base:true},
  {id:'SPR_5', name:'바람을 삼킨 늙은 신', trait:'STT_GENEROUS',reason:'SRS_HEIR',    domain:'SDM_HARVEST', color:'SCL_GOLD',   sigil:'SSG_3', base:true},
]);

/* NPC 성좌. {id, name, trait(starTraits), why(이 세계를 키우는 이유), cls(묶인 고유 클래스 ID, 없으면 null), hunters(키우는 헌터 수 [최소, 최대])}
   다른 헌터 일부를 후원하고, 성좌 경매장에서 출품 · 입찰로 경쟁한다 */
def('constellations', []);

/* 성좌 메시지 · 축복 (자리만 — 나중에 사용자가 넣는다)
   starMessages: {id, on:'gift'|'raidWin'|'raidLose'|'injured'|'rankUp'|'classGrant'|..., trait?(starTraits), text} — 이야기 창에 "[성좌] …" 한 줄 ({item} {cls} 치환)
   starBlessings: {id, name, coin, desc, fx} — 코인으로 거는 축복 · 스킬 (효과 연결은 나중) */
def('starMessages', []);
def('starBlessings', []);

/* 업적 (자리만 — 목록은 나중에). 헌터가 이루면 성좌에게 코인. 성좌마다 한 번만 (다시 받을 수 없다). unlock 이 있으면 그 해금이 열린다
   {id, name, desc, measure, n, coin, unlock?}
   measure: raids(공략 수) · cleared(클리어 수) · rank(등급 숫자 이하) · level(레벨 이상) · money(돈 이상) · days(산 날) · gifts(받은 선물 수) · rels(아는 사람 수)
   unlock : pickPotential(잠재력 직접 고르기) · pickClass(클래스 직접 고르기) · pickStats(능력치 직접 고르기) · peekPotential(잠재력 엿보기) */
def('achievements', []);

/* npcRate: 고유 클래스가 없는 NPC 헌터에게 성좌가 붙어 있을 확률 · uniqueRate: 고유 클래스가 있는 헌터에게 성좌가 붙어 있을 확률
   giftsKeep: 선물 기록 줄 수 · anonSeller: 경매 출품 · 입찰자가 '익명의 성좌'일 확률 (NPC 성좌가 없으면 늘 익명)
   slots: 성좌 칸 수 · peekCost: 잠재력 엿보기 코인 [대략, 전부] (화면은 성좌 탭 만들 때) */
def('balance', [
  {id:'BAL_STAR', proto:true, npcRate:0.03, uniqueRate:0.95, giftsKeep:200, anonSeller:0.3, slots:3, peekCost:[300,1500]},
]);
