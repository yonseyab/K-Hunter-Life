/* =========================================================
   stars.js — 성좌 (2026-10-24 사용자 결정)
   헌터물 + 성좌물. 플레이어 = 내 헌터의 성좌 (직접 조종하지 않는다). 세상은 성좌가 있다는 걸 알지만, 누가 어느 성좌를 받는지는 모른다.
   성좌에게 이 세계는 '부캐 키우기'에 가깝다 (성좌마다 이유는 다르다).
   성좌 = 게임 계정 = 세이브 칸 (기본 3칸, engine/account.js STARACC). 업적 · 코인 · 해금이 성좌에 쌓이고, 성좌 하나는 헌터 한 명만 키운다.
   한 번 만든 성좌는 고칠 수 없다. 코인 = 성좌 포인트 — 상점 · 성좌 경매장에서 사서 헌터에게 선물한다(STAR.gift). 쓸지 · 입을지는 헌터가 정한다.
   base:true = 화면이 돌아가게 Claude가 넣은 기본값 (나중에 Claude가 바꾸거나 늘린다)
   ========================================================= */

/* 성좌 성향 (만들 때 고른다). 나중에 메시지 말투 · 축복 성격의 재료 */
/* ════ 성좌 쪽 '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 (정해진 성좌 starPresets 는 사용자가 만든다 — 아래는 나머지 표) ════
   constellations: NPC 성좌 + id · name · trait · domain · color · sigil · speech · desc · lore · cls(고유 클래스) · coin 씀씀이 1~5 · likes [mindTags] · hates [mindTags] · rivals [constellations] · lines
   starMessages  : + on · trait · text · lv · cond · chance · once · known(헌터가 알 때만)
   starBlessings : + id · name · coin · desc · fx {STAT_/ABL_/se: ±} · turns · days 지속 일 · cd · trait 성향 전용 · cls 클래스 전용 · lines {give, end}
   achievements  : id · name · desc · cat(성장 · 공략 · 관계 · 인생 · 숨은) · hidden · measure · target · coin · unlock · icon · rarity · once · text */
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
   필수: id · name · trait · domain. 나머지는 없어도 된다. 엔진 연결: 고르기 화면(account.js presetHTML, unlock 은 성좌 칸 아무 데서나 이룬 업적),
   새 헌터 시작 때 cls · skills 를 준다(STARACC.applyPreset), 성좌 › 내 정보 '고유 클래스 · 고유 스킬'에 보인다.
   정해진 성좌는 자기 성향(trait)에 맞는 지시 · 메시지만 할 수 있다 (STAR.say 가 성향이 같은 것만 고른다). 나만의 성좌는 제한 없음 */
def('starPresets', []);

/* 성좌 인트로 (타이틀 › 새 성좌 → 인트로 → 정해진 성좌 / 나만의 성좌). 글자만 (그림 없음 — 2026-10-24) */
def('starIntroScenes', [
  {id:'SI_01', ord:1, head:'하늘 너머의 관객', text:'게이트가 열린 그날부터, 하늘 너머에서 이 세계를 내려다보는 존재들이 있었다. 사람들은 그들을 성좌라 부른다.', mood:'calm'},
  {id:'SI_02', ord:2, head:'수많은 실', text:'성좌는 직접 내려오지 않는다. 다만 마음에 든 헌터 하나를 골라, 오래도록 지켜본다.', mood:'calm'},
  {id:'SI_03', ord:3, head:'그들의 놀이', text:'어떤 성좌에게 이 세계는 놀이이고, 어떤 성좌에게는 내기이며, 어떤 성좌에게는 오래된 그리움이다.', mood:'ominous'},
  {id:'SI_04', ord:4, head:'선물', text:'성좌는 헌터를 조종하지 못한다. 지켜보고, 선물을 보내고, 가끔 말을 걸 뿐. 그 말을 따를지는 헌터가 정한다.', mood:'warm'},
  {id:'SI_05', ord:5, head:'당신은 성좌다', text:'그리고 지금, 하나의 별이 눈을 뜬다. 당신이 지켜볼 인생을 고를 시간이다.', mood:'tense'},
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
/* 형식: {id:'CST_…', name, trait(starTraits), domain?(starDomains), color?('#hex'), sigil?, speech?(ccSpeech), why?, desc?, lore?, cls?(고유 클래스 ID — classes.unique), hunters?[최소, 최대],
          coin?(씀씀이 1~5 — 경매 입찰), likes?/hates?[mindTags], rivals?[constellations], lines?{} }
   엔진 연결: NPC 헌터에게 붙는 성좌(STAR.ofHunter) · 경매 출품자/입찰자 이름(sellerName) · 고유 클래스 묶음(classes.star). 비어 있으면 '익명의 성좌'로 돈다 */
def('constellations', []);

/* 성좌 메시지 · 축복 (자리만 — 나중에 사용자가 넣는다)
   starMessages: {id, on:'gift'|'raidWin'|'raidLose'|'injured'|'rankUp'|'classGrant'|..., trait?(starTraits), text} — 이야기 창에 "[성좌] …" 한 줄 ({item} {cls} 치환)
   starBlessings: {id, name, coin, desc, fx} — 코인으로 거는 축복 · 스킬 (효과 연결은 나중) */
/* 메시지가 걸리는 때 (STAR.say 를 부르는 곳). vars = text 에서 쓸 수 있는 {치환} — {name}(헌터 이름)은 늘 쓸 수 있다 */
def('starMsgEvents', [
  {id:'gift',       name:'선물을 보냈을 때',        vars:['item']},
  {id:'bless',      name:'축복을 걸었을 때',        vars:['bless']},
  {id:'classGrant', name:'클래스가 바뀌었을 때',    vars:['cls']},
  {id:'levelUp',    name:'헌터 레벨이 올랐을 때',   vars:['level']},
  {id:'rankUp',     name:'헌터 등급이 올랐을 때',   vars:['rank']},
  {id:'raidWin',    name:'게이트 공략 성공',        vars:['gate']},
  {id:'raidLose',   name:'게이트 공략 실패 · 후퇴', vars:['gate']},
  {id:'injured',    name:'헌터가 크게 다쳤을 때',   vars:['part']},
  {id:'known',      name:'헌터가 성좌를 알아챘을 때', vars:[]},
  {id:'death',      name:'헌터가 쓰러졌을 때',      vars:['cause']},
  {id:'retire',     name:'헌터가 은퇴할 때',        vars:[]},
]);
/* 성좌 메시지 형식: {id:'SMS_…', on(starMsgEvents), text, trait?(starTraits — 그 성향 성좌만), known?(true = 헌터가 성좌를 알 때만), lv?(헌터 레벨 이상),
   chance?(0~1, 기본 1), once?(true = 한 게임에 한 번)}. 걸리는 때마다 맞는 줄 중 하나가 이야기 창에 "[성좌 이름] …" */
def('starMessages', []);
/* 축복 형식 (STAR.bless — 성좌 › 상점 '축복' 갈래에 보인다): {id:'SBL_…', name, coin, desc, days?(지속 일, 기본 1), cd?(다시 걸 때까지 일),
   trait?(그 성향 성좌만), cls?(그 클래스 헌터만), fx:{check?{ABL_/STAT_ ID: 판정 보정 ±}, cstat?{atk · mag · def · res · hp: 배율, acc · eva · crit: 더하기}},
   lines?{give(걸 때 — 헌터가 알 때), unknown(걸 때 — 헌터가 모를 때), end(끝날 때)} } */
def('starBlessings', []);

/* 성좌를 모를 때의 선물 안배 (2026-10-24 사용자 결정). 헌터가 성좌를 모르면 선물은 헌터가 운이나 노력으로 얻은 것처럼 들어온다.
   {id, how:'luck'(운)|'effort'(노력), where:'gate'(게이트 안)|'town'(바깥)|'any', cats?(itemCats — 없으면 모든 물건), text}
   text 치환: {item} 물건 이름(수량 포함) · {을}{이}{은}{과}{으로} 물건 이름 뒤 조사 · {name} 헌터 이름 */
def('giftCovers', [
  {id:'GC_01', how:'luck',   where:'gate',  text:'쓰러진 몬스터 밑에서 {item}{이} 굴러 나왔다. 운이 좋았다.'},
  {id:'GC_02', how:'luck',   where:'gate',  text:'무너진 벽 틈에서 누군가 두고 간 {item}{을} 발견했다.'},
  {id:'GC_03', how:'effort', where:'gate',  text:'끝까지 구석구석 뒤진 끝에 {item}{을} 찾아냈다.'},
  {id:'GC_04', how:'effort', where:'gate',  text:'다들 지나친 곳을 다시 살펴보다 {item}{을} 건졌다.'},
  {id:'GC_05', how:'luck',   where:'town',  text:'협회 보급 추첨에서 {item}{이} 당첨됐다.'},
  {id:'GC_06', how:'luck',   where:'town',  text:'중고 거래 앱에서 {item}{을} 말도 안 되는 값에 건졌다.'},
  {id:'GC_07', how:'luck',   where:'town',  text:'편의점 경품 행사에 응모했더니 {item}{이} 왔다.'},
  {id:'GC_08', how:'luck',   where:'town',  text:'이사 가는 선배 헌터가 짐을 정리하며 {item}{을} 넘겨주었다.'},
  {id:'GC_09', how:'effort', where:'town',  text:'훈련장 정리를 도운 답례로 관리인이 {item}{을} 건넸다.'},
  {id:'GC_10', how:'effort', where:'town',  text:'밀린 잡일 의뢰를 마무리하자 의뢰인이 {item}{을} 덤으로 챙겨 주었다.'},
  {id:'GC_11', how:'effort', where:'town',  text:'협회 교육을 빠짐없이 들은 수료 기념으로 {item}{을} 받았다.'},
  {id:'GC_12', how:'luck',   where:'town',  cats:['ITC_WEAPON','ITC_ARMOR','ITC_ACCESSORY'], text:'단골 공방 주인이 "주인 못 찾은 물건"이라며 {item}{을} 싸게 내주었다.'},
  {id:'GC_13', how:'effort', where:'town',  cats:['ITC_WEAPON','ITC_ARMOR','ITC_ACCESSORY'], text:'대장간 일손을 며칠 도운 대가로 {item}{을} 받았다.'},
  {id:'GC_14', how:'luck',   where:'town',  cats:['ITC_BOOK'], text:'헌책방 구석에서 먼지 쌓인 {item}{을} 발견했다.'},
  {id:'GC_15', how:'effort', where:'town',  cats:['ITC_BOOK'], text:'협회 도서관 정리 봉사를 하다 폐기 목록의 {item}{을} 얻었다.'},
  {id:'GC_16', how:'luck',   where:'town',  cats:['ITC_CONSUME','ITC_DAILY'], text:'약국 개업 기념으로 {item}{을} 공짜로 받았다.'},
  {id:'GC_17', how:'effort', where:'town',  cats:['ITC_STONE','ITC_MAT'], text:'버려진 하급 게이트 터를 끈질기게 뒤져 {item}{을} 모았다.'},
  {id:'GC_18', how:'luck',   where:'any',   cats:['ITC_STONE','ITC_MAT'], text:'발밑에서 반짝이는 게 보여 주워 보니 {item}{이었다}.'},
]);

/* 업적 (자리만 — 목록은 나중에). 헌터가 이루면 성좌에게 코인. 성좌마다 한 번만 (다시 받을 수 없다). unlock 이 있으면 그 해금이 열린다
   {id, cat(성장 · 공략 · 관계 · 인생 · 성좌 · 숨은), name, desc, measure, n, coin, unlock?, hidden?(이루기 전엔 ???)}
   measure: raids(공략 수) · cleared(클리어 수) · rank(등급 숫자 이하) · level(레벨 이상) · money(돈 이상) · days(산 날) · gifts(받은 선물 수) · rels(아는 사람 수)
            · skills(스킬 수 초과) · gearGrade(입은 장비 등급 n 이상) · close(친밀 75 이상 사람 수) · known(성좌를 앎) · followed · refused(성좌 말 따름 · 거절 수) · nakedClear(장비 없이 클리어)
   unlock : pickPotential(잠재력 직접 고르기) · pickClass(클래스 직접 고르기) · pickStats(능력치 직접 고르기) · peekPotential(잠재력 엿보기) */
def('achievements', [
  /* 성장 */
  {id:'ACH_001', cat:'성장', name:'첫걸음',            desc:'레벨 5에 오른다',            measure:'level', n:5,   coin:20},
  {id:'ACH_002', cat:'성장', name:'제 몫을 하는 헌터',  desc:'레벨 15에 오른다',           measure:'level', n:15,  coin:60},
  {id:'ACH_003', cat:'성장', name:'중견',              desc:'레벨 30에 오른다',           measure:'level', n:30,  coin:150, unlock:'pickStats'},
  {id:'ACH_004', cat:'성장', name:'벽 너머',            desc:'레벨 50에 오른다',           measure:'level', n:50,  coin:400},
  {id:'ACH_005', cat:'성장', name:'정점을 보는 자',     desc:'레벨 80에 오른다',           measure:'level', n:80,  coin:1200, unlock:'pickPotential'},
  {id:'ACH_006', cat:'성장', name:'승급',              desc:'18급 이상이 된다',            measure:'rank',  n:18,  coin:40},
  {id:'ACH_007', cat:'성장', name:'눈에 띄는 이름',     desc:'15급 이상이 된다',            measure:'rank',  n:15,  coin:120, unlock:'pickClass'},
  {id:'ACH_008', cat:'성장', name:'상위 헌터',          desc:'10급 이상이 된다',            measure:'rank',  n:10,  coin:500},
  {id:'ACH_009', cat:'성장', name:'국가 전력',          desc:'5급 이상이 된다',             measure:'rank',  n:5,   coin:2000},
  {id:'ACH_010', cat:'성장', name:'손에 익은 기술',     desc:'스킬을 6개 넘게 지닌다',       measure:'skills', n:6, coin:40},
  /* 공략 */
  {id:'ACH_101', cat:'공략', name:'첫 게이트',          desc:'게이트 공략에 처음 나선다',     measure:'raids',   n:1,   coin:10},
  {id:'ACH_102', cat:'공략', name:'첫 클리어',          desc:'게이트를 처음 클리어한다',      measure:'cleared', n:1,   coin:20},
  {id:'ACH_103', cat:'공략', name:'단골 사냥꾼',        desc:'게이트를 10번 클리어한다',      measure:'cleared', n:10,  coin:80},
  {id:'ACH_104', cat:'공략', name:'베테랑',             desc:'게이트를 50번 클리어한다',      measure:'cleared', n:50,  coin:300},
  {id:'ACH_105', cat:'공략', name:'백 번의 문',         desc:'게이트를 100번 클리어한다',     measure:'cleared', n:100, coin:800},
  {id:'ACH_106', cat:'공략', name:'좋은 장비',          desc:'희귀 등급 이상 장비를 입는다',  measure:'gearGrade', n:3, coin:60},
  {id:'ACH_107', cat:'공략', name:'빛나는 무구',        desc:'전설 등급 장비를 입는다',       measure:'gearGrade', n:5, coin:600},
  /* 관계 */
  {id:'ACH_201', cat:'관계', name:'아는 얼굴',           desc:'아는 사람이 10명이 넘는다',     measure:'rels', n:10, coin:20},
  {id:'ACH_202', cat:'관계', name:'넓은 인맥',          desc:'아는 사람이 30명이 넘는다',     measure:'rels', n:30, coin:100},
  {id:'ACH_203', cat:'관계', name:'곁에 있는 사람',      desc:'아주 가까운 사람이 생긴다 (친밀 75 이상)', measure:'close', n:1, coin:60},
  /* 인생 */
  {id:'ACH_301', cat:'인생', name:'한 달',              desc:'각성하고 30일을 산다',          measure:'days', n:30,  coin:20},
  {id:'ACH_302', cat:'인생', name:'한 해',              desc:'각성하고 365일을 산다',         measure:'days', n:365, coin:200},
  {id:'ACH_303', cat:'인생', name:'모은 돈',            desc:'1억 원을 모은다',              measure:'money', n:100000000,  coin:100},
  {id:'ACH_304', cat:'인생', name:'부자 헌터',          desc:'10억 원을 모은다',             measure:'money', n:1000000000, coin:500},
  /* 성좌 */
  {id:'ACH_401', cat:'성좌', name:'첫 선물',            desc:'헌터에게 처음 선물한다',         measure:'gifts', n:1,  coin:5},
  {id:'ACH_402', cat:'성좌', name:'후원자',             desc:'선물을 20번 보낸다',            measure:'gifts', n:20, coin:60},
  {id:'ACH_403', cat:'성좌', name:'목소리',             desc:'헌터가 성좌를 알아챈다',         measure:'known', n:1,  coin:50, unlock:'peekPotential'},
  {id:'ACH_404', cat:'성좌', name:'믿을 만한 별',        desc:'헌터가 성좌의 말을 10번 따른다', measure:'followed', n:10, coin:120},
  /* 숨은 업적 — 이루기 전까지 이름이 ??? */
  {id:'ACH_901', cat:'숨은', hidden:true, name:'고집쟁이',  desc:'헌터가 성좌의 말을 10번 거절한다', measure:'refused', n:10, coin:80},
  {id:'ACH_902', cat:'숨은', hidden:true, name:'맨손의 헌터', desc:'장비 없이 게이트를 클리어한다',   measure:'nakedClear', n:1, coin:100},
]);

/* npcRate: 고유 클래스가 없는 NPC 헌터에게 성좌가 붙어 있을 확률 · uniqueRate: 고유 클래스가 있는 헌터에게 성좌가 붙어 있을 확률
   giftsKeep: 선물 기록 줄 수 · anonSeller: 경매 출품 · 입찰자가 '익명의 성좌'일 확률 (NPC 성좌가 없으면 늘 익명)
   slots: 성좌 칸 수 · peekCost: 잠재력 엿보기 코인 [대략, 전부] (화면은 성좌 탭 만들 때)
   startCoin: 새 성좌 코인(늘 0) · revealPerDay: 헌터가 성좌의 존재를 알아챌 하루 확률 (처음엔 모름 — 일상 중 무작위 메시지로) */
def('balance', [
  {id:'BAL_STAR', proto:true, npcRate:0.03, uniqueRate:0.95, giftsKeep:200, anonSeller:0.3, slots:3, peekCost:[300,1500], startCoin:0, revealPerDay:0.012,
    /* 성좌의 조언 (engine/star_advice.js). 따를 확률 = base + 신뢰 · 호감 · 성격 · 상태 − 성향 차이 · 위험 */
    advice:{base:0.45, trust:0.35, favor:0.15, depend:0.12, self:0.06, stress:0.08, gap:0.25, risk:{'주의':0.05,'위험':0.15,'치명적':0.3}, min:0.05, max:0.95,
      followOk:4, followNg:-5, refuseOk:-1, refuseNg:1, agreeOk:1, giftFavor:3, favorDecay:0.2}},
]);

/* 성좌의 조언 (2026-10-24, engine/star_advice.js) — 헌터가 성좌를 알게 된 뒤, 고민되는 순간 성좌에게 묻는다. 따를지는 헌터가 정한다.
   starTrustStages: {id, min(신뢰 −100~100, 이 값 이상), text(성좌 '내 정보'에 보일 문장), story(단계가 바뀔 때 이야기 창 한 줄, {name})}  — 숫자는 화면에 안 보인다
   starAdviceLines: {id, on:'ask'|'follow'|'refuse'|'agree'|'silent', text} — {name} 헌터 이름 · {star} 성좌 이름 · {pick} 성좌가 고른 것 · {own} 헌터가 고른 것. 나중에 Claude가 늘린다 */
def('starTrustStages', [
  {id:'TS_DOUBT', min:-100, text:'그 목소리를 믿지 않는다.', story:'{name}은(는) 이제 그 목소리를 믿지 않는다.'},
  {id:'TS_WARY',  min:-30,  text:'그 목소리가 조금 미덥지 않다.', story:'{name}은(는) 그 목소리가 조금 미덥지 않다.'},
  {id:'TS_NEW',   min:-10,  text:'아직 그 목소리를 잘 모른다.', story:'{name}은(는) 그 목소리를 다시 가늠해 본다.'},
  {id:'TS_LEAN',  min:15,   text:'요즘은 그 목소리를 꽤 믿는다.', story:'요즘 {name}은(는) 그 목소리를 꽤 믿는다.'},
  {id:'TS_TRUST', min:45,   text:'고비마다 그 목소리를 먼저 찾는다.', story:'{name}은(는) 고비마다 그 목소리를 먼저 찾게 되었다.'},
]);
def('starAdviceLines', [
  {id:'SAL_0001', on:'ask',    text:'{name}은(는) 잠시 하늘을 올려다본다. 성좌라면 어떻게 할까.'},
  {id:'SAL_0002', on:'follow', text:'{name}은(는) 성좌의 말대로 하기로 한다.'},
  {id:'SAL_0003', on:'refuse', text:'{name}은(는) 성좌의 말을 듣고도 고개를 젓는다. 자기 방식대로 한다.'},
  {id:'SAL_0004', on:'agree',  text:'성좌의 말이 {name}의 생각과 같다. 망설임 없이 그렇게 한다.'},
  {id:'SAL_0005', on:'silent', text:'성좌는 아무 말도 하지 않는다. {name}은(는) 스스로 정한다.'},
]);
