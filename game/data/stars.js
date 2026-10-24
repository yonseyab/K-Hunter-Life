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

/* 정해진 성좌 (사용자가 만든다 — 지금은 비어 있음). '정해진 성좌로 깨어나기'에서 고른다. 시작 코인은 늘 0
   {id:'SPR_…', name, sigil(글자), color('#hex'), trait(starTraits), domain(starDomains), speech(ccSpeech),
    intro(배경 이야기 — 살짝 길게, 모티브를 짐작할 수 있게), cls(고유 클래스 ID), skills([고유 스킬 ID]), img(assets/stars/<img>.webp), unlock(업적 ID — 없으면 처음부터)}
   정해진 성좌는 자기 성향(trait)에 맞는 지시 · 메시지만 할 수 있다 (STAR.say 가 성향이 같은 것만 고른다). 나만의 성좌는 제한 없음 */
def('starPresets', []);

/* 성좌 인트로 (타이틀 › 새 성좌 → 인트로 → 정해진 성좌 / 나만의 성좌). img = assets/star_intro/<img>.webp (1920×1080, 하단 1/3 자막 자리 — 그림은 GPT 외주) */
def('starIntroScenes', [
  {id:'SI_01', ord:1, img:'SI_01', head:'하늘 너머의 관객', text:'게이트가 열린 그날부터, 하늘 너머에서 이 세계를 내려다보는 존재들이 있었다. 사람들은 그들을 성좌라 부른다.', mood:'calm'},
  {id:'SI_02', ord:2, img:'SI_02', head:'수많은 실', text:'성좌는 직접 내려오지 않는다. 다만 마음에 든 헌터 하나를 골라, 오래도록 지켜본다.', mood:'calm'},
  {id:'SI_03', ord:3, img:'SI_03', head:'그들의 놀이', text:'어떤 성좌에게 이 세계는 놀이이고, 어떤 성좌에게는 내기이며, 어떤 성좌에게는 오래된 그리움이다.', mood:'ominous'},
  {id:'SI_04', ord:4, img:'SI_04', head:'선물', text:'성좌는 헌터를 조종하지 못한다. 지켜보고, 선물을 보내고, 가끔 말을 걸 뿐. 그 말을 따를지는 헌터가 정한다.', mood:'warm'},
  {id:'SI_05', ord:5, img:'SI_05', head:'당신은 성좌다', text:'그리고 지금, 하나의 별이 눈을 뜬다. 당신이 지켜볼 인생을 고를 시간이다.', mood:'tense'},
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

/* 색 · 문양 예시 (색은 팔레트로, 문양은 글자로 직접 넣을 수도 있다) */
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
   slots: 성좌 칸 수 · peekCost: 잠재력 엿보기 코인 [대략, 전부] (화면은 성좌 탭 만들 때)
   startCoin: 새 성좌 코인(늘 0) · revealPerDay: 헌터가 성좌의 존재를 알아챌 하루 확률 (처음엔 모름 — 일상 중 무작위 메시지로) */
def('balance', [
  {id:'BAL_STAR', proto:true, npcRate:0.03, uniqueRate:0.95, giftsKeep:200, anonSeller:0.3, slots:3, peekCost:[300,1500], startCoin:0, revealPerDay:0.012},
]);
