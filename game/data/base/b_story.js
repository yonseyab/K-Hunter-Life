/* =========================================================
   data/base/b_story.js — 이야기 창 문장 재료 · 위기 · 이벤트 · 데모 시나리오 (Claude 기본분, 배치 B)
   스타일: docs/STYLE_CHECKLIST.md — 3인칭 · 현재형 · 짧게 · 건조한 기록체. 정식 분량(행동마다 5~10변형)은 Codex 외주.

   storyLines: 이야기 창에 흐르는 문장
     on   : 언제 쓰나 — act:<행동 ID> · cat:<행동 분류> · move · small:<장소 종류|any> · meet · react:<looksHi|looksLo|jealous> ·
            raid:<enter|zone|fight|hurt|heal|stone|boss|win|lose|retreat> · emo:<감정 ID|calm> · day:<start|end|plan> ·
            decide:<raid|rest|again|stop> · retro:<고비 ID> · farewell · old · prologue · world:<news|rumor>
     lv   : 보이는 상세도 — 1 요약에서도 · 2 보통부터 · 3 자세히에서만
     req  : 이벤트와 같은 조건 (조건이 맞을 때만 쓴다)
     asserts : 문장이 캐릭터에 대해 단정하는 사실. 반드시 req 안에 같은 조건이 있어야 한다 (세 층 원칙, tools/validate_data.js 가 검사)
     fx   : (작은 일 · 만남) 작은 효과 — stress · energy · money · emo:{감정:세기} · rel:[대상,'close',값]
     w    : 가중치 (기본 1)
   자리 표시: {p} 부르는 이름 · {P} 전체 이름 · {place} 장소 · {region} 지역 · {who} 만난 사람 · {rel} 관계 · {a}{b} 파티원 · {m} 몬스터 · {gate} 게이트 ·
            {rank} 등급 · {n} 수 · {cls} 클래스 · {role} 역할 · {gear} 무기 · {build} 체격 · {party} 파티 소개 · {money} 금액 · {line} 사용자가 남긴 한 줄
   ========================================================= */
/* ════ 이야기 재료 '최대한 많이' 선택 필드 (2026-10-24) — 전부 선택. 안 쓰면 그만, 필요할 때 넣어 쓴다. 공통 [작업] notes 메모 · src 작성자 · ver 버전 ════
   storyLines: id · on · lv · text + cond 조건(규칙/글) · w 비중 · once · px {성격 쏠림} · emo [emotions] · time [시, 시] · place(placeTypes) · tags
   events    : 지금 필드(ch · to · kind · subj · lines · choices …) + cond · w · once · cd 재발 쿨다운 일 · chain [events 이어지는 사건] · time · place · season · rank [약한, 센] · tags · img
               choices[] + tags [mindTags] · risk · check · ok · ng · okFx · ngFx · ask 헌터가 성좌에게 묻는 문장 · next(events)
   crises    : 지금 필드(when · title · tags · text · choices) + mons [monsters] · interior(gateInteriors) · rank · w · once · img
   scenarios : + name · desc · start 시작 상태 · cast [인물] · lines */
def('storyLines', [
  /* --- 하루 행동 (짧고 건조한 현재형 1문장) --- */
  {id:'SL_B0001', on:'act:ACT_SLEEP', lv:3, text:'불을 끄고 눕는다.'},
  {id:'SL_B0002', on:'act:ACT_SLEEP', lv:3, text:'알람을 세 개 맞추고 잠든다.'},
  {id:'SL_B0003', on:'act:ACT_SLEEP', lv:3, text:'휴대폰을 보다가 늦게 잠든다.', req:[{k:'stress',min:50}]},
  {id:'SL_B0004', on:'act:ACT_NAP', lv:3, text:'소파에서 잠깐 눈을 붙인다.'},
  {id:'SL_B0005', on:'act:ACT_REST', lv:3, text:'아무것도 하지 않고 누워 있는다.'},
  {id:'SL_B0006', on:'act:ACT_REST', lv:3, text:'유튜브 알고리즘에 끌려 한 시간을 보낸다.'},
  {id:'SL_B0007', on:'act:ACT_MEAL', lv:3, text:'편의점 도시락으로 끼니를 때운다.'},
  {id:'SL_B0008', on:'act:ACT_MEAL', lv:3, text:'김치찌개 한 그릇을 비운다.'},
  {id:'SL_B0009', on:'act:ACT_MEAL', lv:3, text:'라면에 계란 하나를 풀어 먹는다.', req:[{k:'money',max:500000}]},
  {id:'SL_B0010', on:'act:ACT_MEAL', lv:3, text:'배달 앱을 열었다가 배달비를 보고 닫는다.'},
  {id:'SL_B0011', on:'cat:ACC_TRAIN', lv:2, text:'훈련장에서 땀을 뺀다.'},
  {id:'SL_B0012', on:'act:ACT_TR_COMBAT', lv:2, text:'훈련장 모래주머니에 {gear}을(를) 휘두른다.'},
  {id:'SL_B0013', on:'act:ACT_TR_COMBAT', lv:2, text:'대련 상대를 구해 합을 맞춘다. 손바닥이 얼얼하다.'},
  {id:'SL_B0014', on:'act:ACT_TR_MANA', lv:2, text:'눈을 감고 마력 흐름을 세어 본다.'},
  {id:'SL_B0015', on:'act:ACT_TR_SKILL', lv:2, text:'같은 동작을 백 번 반복한다.'},
  {id:'SL_B0016', on:'act:ACT_TR_SENSE', lv:2, text:'안대를 쓰고 발소리를 구분하는 연습을 한다.'},
  {id:'SL_B0017', on:'act:ACT_TR_FIT', lv:2, text:'한강 둔치를 따라 뛴다.'},
  {id:'SL_B0018', on:'act:ACT_STUDY', lv:2, text:'협회 몬스터 도감을 펼쳐 놓고 밑줄을 긋는다.'},
  {id:'SL_B0019', on:'act:ACT_JOB', lv:2, text:'아르바이트를 간다. 시급은 그대로다.'},
  {id:'SL_B0020', on:'act:ACT_JOB', lv:2, text:'물류센터에서 상자를 나른다. 각성자라고 일이 줄지는 않는다.'},
  {id:'SL_B0021', on:'act:ACT_GUILD', lv:2, text:'길드 사무실에서 공략 보고서를 정리한다.'},
  {id:'SL_B0022', on:'act:ACT_GUILD', lv:2, text:'길드 단톡방 공지를 확인하고 장비를 점검한다.'},
  {id:'SL_B0023', on:'act:ACT_FRIENDS', lv:2, text:'친구들과 만나 술잔을 기울인다.'},
  {id:'SL_B0024', on:'act:ACT_FRIENDS', lv:2, text:'동네 친구와 PC방에서 세 판을 내리 진다.'},
  {id:'SL_B0025', on:'act:ACT_HOSPITAL', lv:2, text:'헌터 병원 대기실 번호표는 37번이다.'},
  {id:'SL_B0026', on:'act:ACT_ASSOC_SELL', lv:2, text:'협회 매입소 창구에 마정석을 올려놓는다.'},
  {id:'SL_B0027', on:'move', lv:3, text:'{to}(으)로 간다. {min}분.'},
  {id:'SL_B0028', on:'move', lv:3, text:'지하철을 타고 {to}(으)로 향한다. 지옥철이다.', req:[{k:'time',from:420,to:570}]},
  {id:'SL_B0029', on:'move', lv:3, text:'버스 맨 뒷자리에 앉아 {to}(으)로 간다.'},

  /* --- 하루의 시작 · 끝 · 계획 --- */
  {id:'SL_B0040', on:'day:start', lv:2, text:'{date}. {p}의 하루가 시작된다.'},
  {id:'SL_B0042', on:'day:end',   lv:1, text:'{date} 끝. {summary}'},
  {id:'SL_B0043', on:'decide:raid', lv:2, text:'{why} {p}은(는) 오늘 게이트에 가기로 한다.'},
  {id:'SL_B0044', on:'decide:rest', lv:3, text:'{why} {p}은(는) 오늘 게이트를 쉬기로 한다.'},
  {id:'SL_B0045', on:'decide:again', lv:2, text:'{why} {p}은(는) 한 군데 더 들어가기로 한다.'},
  {id:'SL_B0046', on:'decide:stop', lv:3, text:'{why} {p}은(는) 오늘은 여기까지 하기로 한다.'},

  /* --- 작은 일 (2~3문장 담담한 일상) --- */
  {id:'SL_B0100', on:'small:any', lv:2, text:'지하철이 게이트 통제로 15분 멈춘다. 안내 방송에 아무도 놀라지 않는다.', fx:{stress:2}},
  {id:'SL_B0101', on:'small:any', lv:2, text:'편의점 알바생이 헌터 등록증을 보고 컵라면 하나를 더 얹어 준다.', fx:{emo:{EM_JOY:6}}},
  {id:'SL_B0102', on:'small:PT_HOME', lv:2, text:'관리비 고지서가 문틈에 끼어 있다. 지난달보다 2만 원 올랐다.', fx:{stress:3}},
  {id:'SL_B0103', on:'small:PT_HOME', lv:2, text:'윗집에서 또 가구를 끈다. {p}은(는) 천장을 한 번 노려본다.', fx:{stress:2}},
  {id:'SL_B0104', on:'small:PT_TRAIN', lv:2, text:'훈련장 자판기가 동전을 먹는다. 옆 사람이 발로 차자 캔이 두 개 나온다.', fx:{emo:{EM_JOY:4}}},
  {id:'SL_B0105', on:'small:PT_TRAIN', lv:2, text:'옆 레인의 고등급 헌터가 바벨을 한 손으로 내려놓는다. 다들 못 본 척한다.'},
  {id:'SL_B0106', on:'small:PT_CAFE', lv:2, text:'옆 테이블에서 어제 브레이크 이야기를 한다. 숫자가 말할 때마다 커진다.'},
  {id:'SL_B0107', on:'small:PT_ASSOC', lv:2, text:'협회 지부 번호표 기계가 고장 나 있다. 직원이 손으로 이름을 받는다.', fx:{stress:2}},
  {id:'SL_B0108', on:'small:PT_WORK', lv:2, text:'점장이 이번 달 시프트표를 단톡방에 올린다. 주말이 다 빠져 있다.'},
  {id:'SL_B0109', on:'small:any', lv:2, text:'단톡방에서 누가 정산 이야기를 꺼낸다. 다들 읽고 답이 없다.', req:[{k:'hasGuild'}]},
  {id:'SL_B0110', on:'small:any', lv:2, text:'월세 납입일 알림이 뜬다. 잔고를 확인하고 앱을 닫는다.', req:[{k:'money',max:800000}], fx:{stress:4,emo:{EM_ANX:8}}},
  {id:'SL_B0111', on:'small:TRAVEL', lv:2, text:'버스 창밖으로 통제선이 지나간다. 노란 테이프 너머에서 누군가 담배를 피운다.'},
  {id:'SL_B0112', on:'small:PT_GUILD', lv:2, text:'길드 사무실 커피 머신이 또 고장이다. 막내가 수리 기사에게 전화를 건다.', req:[{k:'hasGuild'}]},
  {id:'SL_B0113', on:'small:any', lv:2, text:'어머니에게서 반찬 사진이 온다. "택배 보냈다."', req:[{k:'rel',type:'REL_MOTHER'}], fx:{emo:{EM_LONELY:-8}}},

  /* --- 만남 (같은 시간 · 장소의 사람) --- */
  {id:'SL_B0150', on:'meet', lv:2, text:'{place}에서 {who}을(를) 마주친다. 짧게 인사하고 근황을 묻는다.', fx:{rel:['T','close',1]}},
  {id:'SL_B0151', on:'meet', lv:2, text:'{who}이(가) 먼저 알아보고 손을 흔든다. 커피 한 잔을 같이 마신다.', fx:{rel:['T','close',2],emo:{EM_LONELY:-6}}},
  {id:'SL_B0152', on:'meet', lv:2, text:'{who}와(과) 엘리베이터에 같이 탄다. 층수 버튼만 본다.', req:[{k:'relDim',dim:'RD_CLOSE',max:20}]},

  /* --- 남들의 반응 (2층: 사실 × 상대의 취향 · 성격). 사실과 반대되는 말은 쓰지 않는다 --- */
  {id:'SL_B0170', on:'react:looksHi', lv:2, text:'{who}이(가) {p}을(를) 한 번 더 돌아본다.', req:[{k:'looks',aspect:'APS_FACE',min:15}], asserts:[{k:'looks',aspect:'APS_FACE',min:15}]},
  {id:'SL_B0171', on:'react:looksHi', lv:2, text:'"헌터보다 배우 하는 게 낫겠는데." {who}이(가) 반쯤 진심으로 말한다.', req:[{k:'looks',aspect:'APS_FACE',min:16}], asserts:[{k:'looks',aspect:'APS_FACE',min:16}]},
  {id:'SL_B0172', on:'react:looksLo', lv:3, text:'{who}은(는) {p}의 얼굴보다 등록증 등급을 먼저 본다.', req:[{k:'looks',aspect:'APS_FACE',max:7}], asserts:[{k:'looks',aspect:'APS_FACE',max:7}]},
  {id:'SL_B0173', on:'react:jealous', lv:2, text:'"얼굴로 파티 들어간 거 아냐?" {who}이(가) 들으라는 듯 말한다.', req:[{k:'looks',aspect:'APS_FACE',min:15}], asserts:[{k:'looks',aspect:'APS_FACE',min:15}], fx:{emo:{EM_ANGER:12}}},

  /* --- 공략 장면 (입장 → 구역 → 위기 → 보스 → 결과, 시스템 로그와 함께) --- */
  {id:'SL_B0200', on:'raid:enter', lv:1, text:'{gate}. {rank}급 {type}. {party} 통제선을 넘는다.'},
  {id:'SL_B0201', on:'raid:enter', lv:1, text:'[협회] {gate} 진입 확인. {party} 바깥과의 연락이 끊긴다.'},
  {id:'SL_B0202', on:'raid:zone',  lv:2, text:'{n}구역. {terrain}. {a}이(가) 손짓으로 멈추라고 한다.'},
  {id:'SL_B0203', on:'raid:zone',  lv:2, text:'{n}구역으로 내려간다. 공기가 눅눅하다.'},
  {id:'SL_B0204', on:'raid:fight', lv:3, text:'{m} 무리가 튀어나온다. {a}이(가) 앞을 막는다.'},
  {id:'SL_B0205', on:'raid:fight', lv:3, text:'{p}의 {gear}이(가) {m}의 목을 노린다. 한 마리가 쓰러진다.'},
  {id:'SL_B0206', on:'raid:hurt',  lv:2, text:'{b}이(가) 맞는다. 피가 바닥에 떨어진다. [HP −{n}]'},
  {id:'SL_B0207', on:'raid:heal',  lv:3, text:'잠깐 숨을 고른다. 아무도 말하지 않는다.'},
  {id:'SL_B0208', on:'raid:stone', lv:3, text:'벽에 박힌 마정석 {n}개를 캐낸다.'},
  {id:'SL_B0209', on:'raid:boss',  lv:1, text:'보스룸. {m}의 숨소리가 문 너머에서 들린다.'},
  {id:'SL_B0210', on:'raid:win',   lv:1, text:'{gate} 클리어. 게이트가 닫히기 시작한다. [EXP +{exp} · 배분 {money}]'},
  {id:'SL_B0211', on:'raid:lose',  lv:1, text:'{gate}에서 물러난다. 입구 밖 공기가 차갑다. [EXP +{exp}]'},
  {id:'SL_B0212', on:'raid:retreat', lv:2, text:'파티 체력이 바닥이다. {a}이(가) 후퇴를 외친다.'},

  /* --- 감정이 바뀔 때 (관찰할 수 있는 행동 · 신체 반응 위주) --- */
  {id:'SL_B0300', on:'emo:EM_JOY',    lv:2, text:'{p}의 걸음이 가볍다. 콧노래가 샌다.'},
  {id:'SL_B0301', on:'emo:EM_PROUD',  lv:2, text:'{p}은(는) 상태창을 몇 번이고 다시 연다.'},
  {id:'SL_B0302', on:'emo:EM_ANX',    lv:2, text:'{p}은(는) 같은 메시지를 세 번 읽는다. 손톱 끝이 갈라져 있다.'},
  {id:'SL_B0303', on:'emo:EM_ANGER',  lv:2, text:'{p}이(가) 문을 세게 닫는다.'},
  {id:'SL_B0304', on:'emo:EM_SAD',    lv:2, text:'{p}은(는) 불을 켜지 않은 채 앉아 있다.'},
  {id:'SL_B0305', on:'emo:EM_LONELY', lv:2, text:'{p}은(는) 연락처를 끝까지 내렸다가 다시 올린다.'},
  {id:'SL_B0306', on:'emo:calm',      lv:3, text:'{p}의 숨이 고르게 돌아온다.'},

  /* --- 고비 회고 --- */
  {id:'SL_B0400', on:'retro:MS_FIRST_RAID',  lv:1, text:'처음으로 게이트 안에 들어간 날. 각성한 지 {days}일째였다.'},
  {id:'SL_B0401', on:'retro:MS_FIRST_CLEAR', lv:1, text:'처음으로 문이 닫히는 걸 안에서 봤다. {gate}, {rank}급.'},
  {id:'SL_B0402', on:'retro:MS_RANKUP',      lv:1, text:'{rank}급. 등록증 숫자 하나가 바뀌었다.'},
  {id:'SL_B0403', on:'retro:MS_LOVE',        lv:1, text:'{who}와(과) 사귀기 시작했다.'},
  {id:'SL_B0404', on:'retro:MS_MARRY',       lv:1, text:'{who}와(과) 결혼했다.'},
  {id:'SL_B0405', on:'retro:MS_BIG_INJURY',  lv:1, text:'크게 다쳤다. {what}.'},
  {id:'SL_B0406', on:'retro:MS_ALLY_DEATH',  lv:1, text:'{who}이(가) 돌아오지 못했다.'},
  {id:'SL_B0407', on:'retro:MS_GUILD_JOIN',  lv:1, text:'{guild}에 들어갔다.'},
  {id:'SL_B0408', on:'retro:MS_GUILD_MOVE',  lv:1, text:'{guild}(으)로 옮겼다.'},
  {id:'SL_B0409', on:'retro:MS_YEAR',        lv:1, text:'헌터로 산 지 {years}년.'},
  {id:'SL_B0410', on:'retro:MS_RETIRE',      lv:1, text:'등록증을 반납했다.'},
  {id:'SL_B0411', on:'retro:MS_LOVE_END',    lv:1, text:'{who}와(과) 헤어졌다.'},
  {id:'SL_B0412', on:'retro:MS_FAM_DEATH',   lv:1, text:'{who}이(가) 세상을 떠났다.'},
  {id:'SL_B0413', on:'retro:MS_GUILD_FOUND', lv:1, text:'{guild}을(를) 세웠다.'},

  /* --- 끝 · 노년 · 시작 전 인생 --- */
  {id:'SL_B0500', on:'farewell', lv:1, text:'{P}, {years}년의 헌터 생활. {last}'},
  {id:'SL_B0501', on:'old', lv:1, text:'{year}년. {p}은(는) 동네 공원에서 젊은 헌터들 이야기를 듣는다.'},
  {id:'SL_B0502', on:'old', lv:1, text:'{year}년. 옛 동료의 부고 문자가 온다. {p}은(는) 검은 양복을 꺼낸다.'},
  {id:'SL_B0503', on:'old', lv:1, text:'{year}년. 협회에서 원로 인터뷰 요청이 온다. {p}은(는) 거절한다.'},
  {id:'SL_B0504', on:'old', lv:1, text:'{year}년. 무릎이 예전 같지 않다. 비 오는 날이면 옛 상처가 쑤신다.'},
  {id:'SL_B0510', on:'prologue', lv:1, text:'{P}. {age}세. {bplace} 출생. 1999년 첫 게이트가 열리고 {sinceGate}년 뒤에 태어난 세대다.', req:[{k:'age',max:26}]},
  {id:'SL_B0511', on:'prologue', lv:1, text:'{P}. {age}세. {bplace} 출생. 첫 게이트가 열린 해, {gateAge}살이었다.', req:[{k:'age',min:27}]},
  {id:'SL_B0512', on:'prologue', lv:1, text:'{bgline}'},
  {id:'SL_B0513', on:'prologue', lv:1, text:'그리고 오늘, 허공에 낯선 창이 떠오른다. 레벨 1, {rank}급. 클래스 {cls}.'},

  /* --- 세상 소식 섞기 --- */
  {id:'SL_B0600', on:'world:news',  lv:2, text:'[뉴스] {title}'},
  {id:'SL_B0601', on:'world:rumor', lv:2, text:'[소문] {title}'},
]);

/* ---------- 게이트 위기 (공략에 필요). style + tags = 판단 엔진 재료 ---------- */
def('crises', [
  {id:'CR_B0001', when:'fight', title:'덩치 큰 개체의 돌진', tags:['TAG_RISK'],
   text:'무리 뒤에서 덩치가 두 배는 되는 {m} 한 마리가 곧장 달려든다.',
   choices:[
     {t:'정면으로 막아선다', style:'bold', check:{attr:'ABL_A04',dc:22}, risk:'위험', ok:'충격을 버티고 반격으로 쓰러뜨린다.', okFx:{kills:1,stones:2}, ng:'방어가 밀린다. 갈비뼈 쪽이 울린다.', ngFx:{hp:-26,injury:{part:'rand',type:'INJ_BRUISE',sev:2}}},
     {t:'옆으로 피하며 빈틈을 노린다', style:'careful', check:{attr:'ABL_A03',dc:19}, risk:'주의', ok:'몸을 틀어 피하고 옆구리를 벤다.', okFx:{kills:1}, ng:'피하긴 했지만 팔이 긁힌다.', ngFx:{hp:-10,injury:{part:'rand',type:'INJ_CUT',sev:1}}},
     {t:'동료와 함께 받는다', style:'team', needParty:true, check:{attr:'ABL_B15',dc:16}, risk:'주의', ok:'호흡이 맞는다. 셋이서 정리한다.', okFx:{kills:1,party:-4}, ng:'신호가 엇갈려 {b}이(가) 다친다.', ngFx:{party:-14}},
     {t:'뒤로 물러나 거리를 벌린다', style:'safe', ok:'안전하게 물러나지만 시간이 걸린다.', okFx:{time:20}},
   ]},
  {id:'CR_B0002', when:'any', title:'갈림길', tags:[],
   text:'통로가 셋으로 갈라진다. 측정기 수치가 흐릿하다.',
   choices:[
     {t:'마력 흐름을 읽어 고른다', style:'bold', check:{attr:'ABL_A19',dc:17}, risk:'주의', ok:'마력이 짙은 쪽이 맞다. 다음 구역이 금방 나온다.', okFx:{progress:1}, ng:'막다른 길이다. 되돌아온다.', ngFx:{time:40}},
     {t:'하나씩 확인한다', style:'careful', ok:'시간은 걸리지만 안전하게 길을 찾는다.', okFx:{time:30}},
   ]},
  {id:'CR_B0003', when:'fight', title:'동료가 쓰러졌다', tags:['TAG_TEAM'],
   text:'{b}이(가) 공격을 맞고 쓰러진다. {m}이(가) 그쪽으로 몸을 돌린다.',
   choices:[
     {t:'달려가 {b}을(를) 끌어낸다', style:'team', tags:['TAG_KIND','TAG_RISK'], check:{attr:'ABL_A05',dc:20}, risk:'위험', ok:'{b}을(를) 엄폐물 뒤로 끌어낸다.', okFx:{party:6}, okMemo:{tag:'saved',text:'{gate}에서 나를 끌어내 줬다',rel:[['RD_TRUST',12],['RD_LIKE',8]]}, ng:'끌어내다 등을 긁힌다.', ngFx:{hp:-18,injury:{part:'rand',type:'INJ_CUT',sev:2}}},
     {t:'{m}의 시선을 끈다', style:'bold', check:{attr:'ABL_A22',dc:21}, risk:'위험', ok:'{m}이(가) 이쪽으로 돈다. 그 사이 {b}이(가) 일어난다.', okFx:{kills:1}, ng:'시선은 끌었지만 정통으로 맞는다.', ngFx:{hp:-22}},
     {t:'자리를 지킨다', style:'safe', tags:['TAG_SAFE','TAG_SELFISH'], ok:'진형은 유지된다. {b}은(는) 혼자 일어선다. 표정이 굳어 있다.', okFx:{party:-8}},
   ]},
  {id:'CR_B0004', when:'any', title:'마정석 광맥', tags:['TAG_GREEDY'],
   text:'벽 한쪽에 마정석이 빽빽하다. 캐는 동안 무리가 다시 모일 수 있다.',
   choices:[
     {t:'시간을 들여 캔다', style:'greedy', check:{attr:'ABL_B07',dc:18}, risk:'주의', ok:'마정석 한 무더기를 챙긴다.', okFx:{stones:6,time:30}, ng:'캐는 도중 기습을 받는다.', ngFx:{hp:-15,stones:2}},
     {t:'보이는 것만 챙기고 간다', style:'careful', ok:'몇 개만 주머니에 넣는다.', okFx:{stones:2}},
   ]},
  {id:'CR_B0005', when:'boss', title:'보스', tags:[],
   text:'{m}이(가) 보스룸 한가운데서 몸을 일으킨다. 크기가 다르다.',
   choices:[
     {t:'전원 공격', style:'bold', check:{attr:'ABL_A01',dc:20}, risk:'위험', ok:'집중 공격이 통한다.', okFx:{progress:1,kills:1,stones:4}, ng:'공격이 막힌다. 반격이 들어온다.', ngFx:{hp:-24,party:-12}},
     {t:'방어하며 약점을 찾는다', style:'careful', check:{attr:'ABL_B07',dc:18}, risk:'주의', ok:'뒷다리가 약하다. 거기만 판다.', okFx:{progress:1,kills:1}, ng:'약점을 찾는 사이 다들 지친다.', ngFx:{hp:-12,party:-10,time:30}},
     {t:'무리하지 않고 물러난다', style:'escape', ok:'보스를 남겨 두고 입구로 돌아간다.', okFx:{retreat:true}},
   ]},
  {id:'CR_B0006', when:'any', title:'함정', tags:['TAG_CAREFUL'],
   text:'바닥 판석 하나가 미세하게 떠 있다. 앞장선 {a}은(는) 못 본 것 같다.',
   choices:[
     {t:'소리쳐 멈춰 세운다', style:'team', ok:'{a}이(가) 발을 멈춘다. 다들 숨을 내쉰다.', okFx:{time:5}},
     {t:'직접 해제한다', style:'bold', check:{attr:'ABL_A21',dc:19}, risk:'주의', ok:'철컥. 함정이 멈춘다.', okFx:{progress:1}, ng:'손끝이 미끄러진다. 화살이 어깨를 스친다.', ngFx:{hp:-14,injury:{part:'rand',type:'INJ_CUT',sev:1}}},
   ]},
]);

/* ---------- 이벤트 (선택지) — kind = 멈춤 종류(stopKinds), tags = 판단 재료, asserts = 단정하는 사실 ---------- */
def('events', [
  {id:'EV_B0001', ch:'msg', to:'REL:REL_MOTHER', kind:'SK_FAMILY', subj:'반찬',
   lines:['밥은 먹고 다니니','반찬 좀 보냈다. 냉장고 넣어라','요즘 게이트 사고 뉴스 나오면 심장이 내려앉는다'],
   req:[{k:'rel',type:'REL_MOTHER'}], cooldown:20,
   choices:[
     {t:'전화를 건다', tags:['TAG_KIND','TAG_SOCIAL'], ok:'어머니 목소리가 밝아진다. 통화는 40분을 넘긴다.', okFx:{stress:-6,rel:['T','close',4],energy:-5}},
     {t:'"잘 먹을게요" 짧게 답한다', tags:['TAG_ALONE'], ok:'읽음 표시가 바로 뜬다. 답은 오지 않는다.', okFx:{rel:['T','close',1]}},
     {t:'나중에 답하려다 잊는다', tags:['TAG_AVOID'], ok:'저녁에 부재중 전화 두 통이 찍혀 있다.', okFx:{stress:3,rel:['T','close',-2]}},
   ]},
  {id:'EV_B0002', ch:'msg', to:'REL:REL_FRIEND', kind:'SK_SOCIAL', subj:'동창 모임',
   lines:['야 토요일 동창 모임 오냐','다들 너 헌터 된 거 신기해함 ㅋㅋ','회비 3만 원'],
   req:[{k:'rel',type:'REL_FRIEND'}], cooldown:30,
   choices:[
     {t:'간다', tags:['TAG_SOCIAL'], ok:'모임은 헌터 이야기로 시작해서 부동산 이야기로 끝난다.', okFx:{money:-30000,stress:-8,energy:-15,emo:{EM_LONELY:-20}}},
     {t:'게이트 일정 핑계를 댄다', tags:['TAG_ALONE','TAG_AVOID'], ok:'"그래 바쁘겠지 ㅋㅋ" 단톡방 사진에 {p}만 없다.', okFx:{emo:{EM_LONELY:6}}},
   ]},
  {id:'EV_B0003', ch:'alert', from:'SYS_ALERT', kind:'SK_DEATH', subj:'근처 균열 발생',
   body:'귀갓길, 골목 끝 공중에 작은 균열이 번진다. 협회 대응팀은 아직이다. 행인 몇 명이 휴대폰을 들고 있다.',
   req:[{k:'time',from:1140,to:300}], cooldown:40,
   choices:[
     {t:'직접 막아선다', tags:['TAG_RISK','TAG_KIND'], check:{attr:'ABL_A22',dc:18}, ok:'균열에서 나온 고블린 두 마리를 처리한다. 누군가 영상을 올린다.', okFx:{rep:3,energy:-15,emo:{EM_PROUD:20}}, ng:'한 마리를 놓쳐 팔을 물린다. 대응팀이 나머지를 정리한다.', ngFx:{energy:-20,hp:-12,injury:{part:'PART_ARM_L',type:'INJ_CUT',sev:1}}},
     {t:'사람들을 대피시키고 신고한다', tags:['TAG_CAREFUL','TAG_RULE'], check:{attr:'ABL_B08',dc:15}, ok:'부상자 없이 끝난다. 협회에서 감사 문자가 온다.', okFx:{rep:1,stress:-4}, ng:'신고 연결이 늦는다. 혼란이 커진다.', ngFx:{stress:8}},
     {t:'못 본 척 지나간다', tags:['TAG_AVOID','TAG_SELFISH'], ok:'잠은 잘 수 있겠지만 마음이 편하지 않다.', okFx:{stress:10,emo:{EM_ANX:10}}},
   ]},
  {id:'EV_B0004', ch:'alert', from:'SYS_LIFE', kind:'SK_MONEY', subj:'중고 장비 급매',
   body:'헌터 커뮤니티 장터에 보급형 방검 조끼가 반값으로 올라왔다. 판매자 평점이 없다.',
   req:[{k:'money',min:300000}], cooldown:25,
   choices:[
     {t:'산다 (−21만 원)', tags:['TAG_RISK','TAG_GAIN'], check:{attr:'ABL_B29',dc:14}, ok:'물건이 멀쩡하다. 이득 봤다.', okFx:{money:-210000,item:['IT_B0022',1]}, ng:'받아 보니 안감이 찢어져 있다. 판매자는 연락이 안 된다.', ngFx:{money:-210000,stress:8,emo:{EM_ANGER:20}}},
     {t:'협회 인증 매장에서 정가로 산다 (−42만 원)', tags:['TAG_SAFE','TAG_RULE'], ok:'비싸지만 마음은 편하다.', okFx:{money:-420000,item:['IT_B0022',1]}},
     {t:'지금 있는 걸로 버틴다', tags:['TAG_MONEY'], ok:'통장 잔고가 그대로다.', okFx:{}},
   ]},
  {id:'EV_B0005', ch:'msg', to:'MEM:saved', kind:'SK_SOCIAL', subj:'고마워서',
   lines:['그때 끌어내 줘서 고마웠어요','밥 한번 살게요. 시간 돼요?'],
   req:[{k:'memory',tag:'saved'}], cooldown:60,
   choices:[
     {t:'좋다고 한다', tags:['TAG_SOCIAL','TAG_KIND'], ok:'고기를 굽는 동안 그날 이야기가 세 번 나온다.', okFx:{rel:['T','close',6],stress:-5,money:0}},
     {t:'"할 일 한 거예요" 사양한다', tags:['TAG_FACE','TAG_ALONE'], ok:'"그래도요." 이모티콘 하나가 온다.', okFx:{rel:['T','close',2]}},
   ]},
  {id:'EV_B0006', ch:'alert', from:'SYS_ASSOC', kind:'SK_CONTRACT', subj:'[협회] 하청 공략 참여 제안',
   body:'대형 길드 하청 파티 보충 인원 모집. 등급 무관, 일당 45만 원. 계약서에는 "사고 시 책임은 개인 보험 처리"라는 문구가 있다.',
   req:[{k:'noGuild'}], cooldown:35,
   choices:[
     {t:'참여한다', tags:['TAG_MONEY','TAG_RISK'], check:{attr:'ABL_B05',dc:15}, ok:'짐꾼 취급이지만 일당은 들어온다.', okFx:{money:450000,energy:-35,stress:6,exp:30}, ng:'짐을 나르다 허리를 삐끗한다. 일당은 들어온다.', ngFx:{money:450000,energy:-40,injury:{part:'rand',type:'INJ_BRUISE',sev:1}}},
     {t:'계약서 문구를 고쳐 달라고 한다', tags:['TAG_RULE','TAG_CONFRONT'], check:{attr:'ABL_B17',dc:19}, ok:'담당자가 한숨을 쉬더니 문구를 지운다.', okFx:{money:450000,energy:-35,rep:1}, ng:'"싫으면 말고요." 자리는 다른 사람에게 간다.', ngFx:{stress:4}},
     {t:'거절한다', tags:['TAG_SAFE'], ok:'저녁 뉴스에 그 하청 파티 이야기가 나오지는 않는다.', okFx:{}},
   ]},
  {id:'EV_B0007', ch:'alert', from:'SYS_LIFE', kind:'SK_SOCIAL', subj:'편의점 앞에서',
   body:'편의점 앞에서 누가 {p}에게 사진을 같이 찍어 달라고 한다. 헌터 등록증을 알아본 모양이다.',
   req:[{k:'looks',aspect:'APS_FACE',min:15}], asserts:[{k:'looks',aspect:'APS_FACE',min:15}], cooldown:40,
   choices:[
     {t:'웃으며 찍어 준다', tags:['TAG_SOCIAL','TAG_KIND'], ok:'사진이 SNS에 올라간다. 댓글이 꽤 달린다.', okFx:{rep:1,emo:{EM_JOY:8}}},
     {t:'정중히 거절한다', tags:['TAG_ALONE'], ok:'상대가 머쓱하게 웃는다.', okFx:{}},
   ]},
  /* 은퇴 생각 (engine/life.js 가 BAL_AGE 나이부터 가끔 띄운다. fx.retire = 은퇴) */
  {id:'EV_B_RETIRE', ch:'alert', from:'SYS_LIFE', kind:'SK_MILESTONE', subj:'등록증을 내려다본다', manual:true,
   body:'아침에 일어나는 데 오래 걸린다. 지난 공략의 멍이 아직 안 빠졌다. 협회 원로 은퇴 안내문이 메일함에 와 있다.',
   req:[{k:'age',min:45}],
   choices:[
     {t:'등록증을 반납한다', tags:['TAG_REST','TAG_SAFE'], ok:'협회 창구 직원이 처음으로 존댓말 대신 "고생 많으셨어요"라고 말한다.', okFx:{retire:true}},
     {t:'아직은 더 뛴다', tags:['TAG_WORK','TAG_RISK','TAG_FACE'], ok:'파스를 하나 더 붙이고 단톡방에 "내일 갑니다"라고 쓴다.', okFx:{stress:3}},
   ]},
  /* 세계 사건 → 이벤트 (on = SIM happen) */
  {id:'EV_B_W001', on:'npcInjured', ch:'msg', to:'SUBJ', kind:'SK_SOCIAL', subj:'공략 중 부상', cooldown:10,
   lines:['나 병원이야. {s.gate}에서 좀 다쳤어','크게는 아니고 꿰맸어'],
   req:[{k:'known'},{k:'relStat',key:'close',min:30}],
   choices:[
     {t:'병문안 간다', tags:['TAG_KIND','TAG_SOCIAL'], ok:'과일 바구니를 들고 간다. 병실이 시끄럽다.', okFx:{rel:['T','close',5],energy:-10}},
     {t:'"푹 쉬어" 메시지만 보낸다', tags:['TAG_ALONE'], ok:'"ㅇㅇ 고마워"', okFx:{rel:['T','close',1]}},
   ]},
  {id:'EV_B_W002', on:'npcRankUp', ch:'msg', to:'SUBJ', kind:'SK_SOCIAL', subj:'등급 상승', cooldown:14,
   lines:['나 {s.rank}급 됐다','재측정 통과 ㅋㅋ 오늘 한잔 살게'],
   req:[{k:'known'},{k:'relStat',key:'close',min:25}],
   choices:[
     {t:'축하하러 간다', tags:['TAG_SOCIAL','TAG_KIND'], ok:'잔이 몇 번 돈다. 축하는 진심이다.', okFx:{rel:['T','close',4],energy:-12,stress:-4}},
     {t:'축하는 하지만 속이 쓰리다', tags:['TAG_FACE'], req:[{k:'pers',axis:'PX_COMPET',min:7}], ok:'"축하해." 짧게 보낸다. 상태창을 한 번 연다.', okFx:{emo:{EM_ANGER:6},stress:3}},
   ]},
]);

/* ---------- 데모 시나리오 (테스트 · 데모용) ---------- */
def('scenarios', [
  {id:'SC_BDEMO', name:'데모 · 한결 파티 13급 헌터', playerFrom:'HN_B0004',
   day:5, time:510, money:3420000, coin:40, rep:8,
   cond:{hp:90,energy:70,sleepDebt:2,stress:35,mood:'보통',injury:'없음'},
   bio:{bg:{}, pers:{PX_EXTRO:3,PX_SELF:5,PX_PRAG:6,PX_PESSI:6,PX_COMPET:5,PX_ADVEN:5,PX_DEPEND:4,PX_EXPRESS:3}},
   relations:[
     {id:'NP_B0001', rel:'REL_MOTHER',    close:72, trust:80, note:''},
     {id:'NP_B0002', rel:'REL_BROTHER',   close:58, trust:62, note:''},
     {id:'HN_B0001', rel:'REL_LEADER',    close:48, trust:66, note:'한결 파티장'},
     {id:'HN_B0002', rel:'REL_COLLEAGUE', close:52, trust:58, note:''},
     {id:'HN_B0003', rel:'REL_COLLEAGUE', close:30, trust:35, note:''},
     {id:'NP_B0003', rel:'REL_FRIEND',    close:46, trust:50, note:''},
   ],
   alerts:[
     {from:'SYS_ASSOC', subj:'[공지] 마포구 일대 게이트 출현 안내', when:'09:02', unread:true, body:'마포구 일대에 하위 등급 게이트가 출현했습니다. 단말기에서 공략 신청이 가능합니다.', actions:[['게이트 보기','gates']]},
   ],
   threads:[
     {with:'GRP_GD_B01', unread:1, msgs:[{from:'HN_B0001', t:'이번 주 정산 금요일. 영수증 올려라.', tm:'어제'}]},
     {with:'NP_B0001', unread:0, msgs:[{from:'NP_B0001', t:'밥 잘 챙겨 먹어라', tm:'3/12'}]},
   ],
   statusPublic:{level:true, cls:true, rank:true, vit:false, exp:false, stats:false, skills:true},
   inv:[{item:'IT_B0021',qty:1,loc:'LOC_BODY'},{item:'IT_B0022',qty:1,loc:'LOC_BODY'},{item:'IT_B0010',qty:1,loc:'LOC_BODY'},{item:'IT_B0011',qty:1,loc:'LOC_BODY'},{item:'IT_B0012',qty:1,loc:'LOC_BODY'},
        {item:'IT_B0020',qty:2,loc:'LOC_BAG'},{item:'IT_B0023',qty:2,loc:'LOC_BAG'},{item:'IT_B0001',qty:3,loc:'LOC_BAG'},{item:'IT_B0001',qty:5,loc:'LOC_HOME'}],
   pendingEvents:[],
   schedTpl:'SCH_GUILD',
   ledger:[['3/10','파티 정산',640000],['3/05','월세',-550000]],
   history:[['2025.08','한결 파티 합류',''],['2019.02','각성','']]},
]);
