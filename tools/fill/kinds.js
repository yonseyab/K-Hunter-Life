/* =========================================================
   tools/fill/kinds.js — 채울 수 있는 콘텐츠 종류 (2026-10-24)
   종류 하나 = 어느 테이블에 · 어떤 칸을 · 어떤 기준으로. 새 종류는 여기에 한 덩어리 추가하면 order · check · apply 가 바로 쓴다.
   칸(fields) 형식:
     k 칸 이름 · label 설명 · type: text | texts(여러 줄) | enum | enums(여러 개, 쉼표) | num | bool | req(조건) | fx(효과)
     fill:true  = 채우는 사람이 쓰는 칸 (주문서에 빈칸으로 나온다). 나머지는 도구가 미리 정해 주고, 바꿔도 된다
     need:true  = 꼭 있어야 함 · lint = 문장 검사 종류(line · head · chat · name · desc · short) · ph = 쓸 수 있는 자리 표시
     dup: 'text' | 'name' = 기존 게임 · 같은 묶음과 겹침 검사 · opts(DB) = [[ID, 이름, 별칭…]] (enum)
   targets(DB, n) = 주문서에 미리 깔아 줄 빈 항목들 (비어 있는 곳부터) · make(v, DB) = 게임 행으로 (id 는 apply 가 붙인다)
   ========================================================= */
const { V } = require('./lib.js');
const cnt = (L, f) => L.reduce((m, r) => { const k = f(r); m[k] = (m[k] || 0) + 1; return m; }, {});
/* 비어 있는 곳부터 goal 개가 되도록 n 개 나눠 주기 */
function spread(keys, have, goal, n) {
  const out = [], c = { ...have };
  for (let i = 0; i < n && keys.length; i++) { const k = keys.slice().sort((a, b) => (c[a] || 0) - (c[b] || 0))[0]; c[k] = (c[k] || 0) + 1; out.push(k); }
  return out;
}
const rr = (L, i) => L[i % L.length];
const BASE_PH = ['p', 'P', 'rank', 'cls', 'role', 'gear', 'build', 'region', 'place', 'date'];

/* ---------- 이야기 문장 (storyLines) ---------- */
function storyOns(DB) {
  const o = [];
  V(DB, 'actions').forEach(a => o.push(['act:' + a.id, `${a.name} (하루 행동)`]));
  V(DB, 'actionCats').forEach(c => o.push(['cat:' + c.id, `${c.name} 갈래 행동 전체 (그 행동 문장이 없을 때)`]));
  [...V(DB, 'placeTypes').map(p => [p.id, p.name]), ['any', '어디서나'], ['TRAVEL', '이동 중']].forEach(([id, n]) => o.push(['small:' + id, `작은 일 — ${n}`]));
  o.push(['meet', '아는 사람과 마주침 · 연락'], ['react:looksHi', '외모가 눈에 띌 때 낯선 사람 반응'], ['react:looksLo', '외모가 안 좋은 쪽일 때 낯선 사람 반응'], ['react:jealous', '질투하는 사람의 말']);
  [['enter', '게이트 진입'], ['zone', '다음 구역'], ['fight', '싸움 한 장면'], ['hurt', '누군가 다침'], ['heal', '치료'], ['stone', '마정석 수거'], ['boss', '보스룸'], ['win', '공략 성공'], ['lose', '공략 실패'], ['retreat', '후퇴']].forEach(([k, n]) => o.push(['raid:' + k, `공략 — ${n}`]));
  V(DB, 'emotions').forEach(e => o.push(['emo:' + (e.id === 'EM_CALM' ? 'calm' : e.id), `감정이 '${e.name}'(으)로 바뀔 때`]));
  [['start', '하루 시작'], ['end', '하루 마무리'], ['plan', '하루 계획']].forEach(([k, n]) => o.push(['day:' + k, n]));
  [['raid', '오늘 공략하러 가기로'], ['rest', '오늘은 쉬기로'], ['again', '한 번 더 가기로'], ['stop', '그만하기로']].forEach(([k, n]) => o.push(['decide:' + k, `판단 — ${n}`]));
  V(DB, 'milestoneTypes').forEach(m => o.push(['retro:' + m.id, `고비 회고 — ${m.name}`]));
  o.push(['move', '이동 ({to} 목적지 · {min} 분)'], ['old', '노년의 한 해'], ['prologue', '각성 전 인생 요약'], ['farewell', '작별'], ['world:news', '뉴스 한 줄 ({title} 뉴스 제목)'], ['world:rumor', '소문 한 줄 ({text} 소문)']);
  return o;
}
function storyPh(on) {
  const f = String(on || '').split(':')[0], ph = BASE_PH.slice();
  if (f === 'raid') ph.push('gate', 'm', 'party', 'terrain', 'type', 'a', 'b', 'n', 'exp', 'money');
  if (f === 'meet' || f === 'react' || f === 'small') ph.push('who', 'rel');
  if (on === 'move') ph.push('to', 'min');
  if (on === 'world:news') ph.push('title'); if (on === 'world:rumor') ph.push('text');
  if (f === 'retro') ph.push('gate', 'who', 'age');
  if (on === 'prologue') ph.push('age', 'bplace', 'sinceGate', 'gateAge', 'bgline');
  return ph;
}
const story = {
  id: 'story', table: 'storyLines', prefix: 'SL', title: '이야기 문장',
  about: '이야기 창에 흐르는 한 줄. 헌터의 하루 행동 · 작은 일 · 만남 · 공략 장면 · 감정 · 고비 회고 같은 순간마다 이 문장 중 하나가 나온다.',
  rules: ['하루 행동 · 이동은 짧고 건조한 현재형 1문장 ("지하철 2호선을 타고 지옥철을 견디며 이동한다.")', '작은 일 · 만남은 2~3문장의 담담한 일상 드라마', '공략은 현장 중심 · 긴장감 · 과장 없이', '헌터 이름 자리는 {p} (부르는 이름). 조사는 {p}은(는) · {p}이(가) 처럼 두 개를 같이 쓰면 게임이 맞춘다', '같은 순간의 다른 문장과 뜻 · 장면이 겹치지 않게 (아래 \'이미 있는 문장\' 참고)'],
  fields: [
    { k: 'on', label: '언제 나오는 문장인가', type: 'enum', need: true, opts: storyOns },
    { k: 'lv', label: '상세도 — 1 요약에서도 보임 · 2 보통부터 · 3 자세히에서만 (기본: 행동 3 · 작은 일 2 · 공략 큰 장면 1)', type: 'num', min: 1, max: 3 },
    { k: 'text', label: '문장', type: 'text', fill: true, need: true, lint: 'line', dup: 'text', ph: v => storyPh(v.on) },
    { k: 'req', label: '(선택) 이 문장이 나올 조건 — 짧은 문법', type: 'req' },
  ],
  existing: DB => V(DB, 'storyLines').map(r => ({ id: r.id, text: r.text, scope: r.on })),
  targets(DB, n, o) {
    const ons = storyOns(DB).map(x => x[0]).filter(k => !o.focus || k.startsWith(o.focus)), have = cnt(V(DB, 'storyLines'), r => r.on);
    return spread(ons, have, o.goal || 8, n).map(on => ({ on, lv: /^(act|move|cat)/.test(on) ? 3 : /^raid:(enter|boss|win|lose)|^decide|^retro|^old|^prologue/.test(on) ? 1 : 2 }));
  },
  make: v => ({ on: v.on, lv: v.lv ?? 2, text: v.text, ...(v.req?.length ? { req: v.req } : {}) }),
};

/* ---------- 들은 이야기 (hearTexts) ---------- */
const HEAR_ON = [['npcRankUp', '아는 사람 등급 상승', 'rank'], ['npcRaidWin', '공략 성공', 'gate'], ['npcInjured', '다침', 'gate'], ['npcDied', '죽음', 'why'], ['npcAwaken', '각성', 'role'],
  ['career:promo', '승진', 'rank'], ['career:fired', '일을 잃음', ''], ['career:hired', '취직', 'job'], ['career:grad', '졸업', 'job'], ['career:boom', '가게가 잘됨', ''], ['career:slump', '가게가 힘듦', ''], ['guildSign', '길드 계약', 'guild'], ['guildLeave', '길드 탈퇴', 'guild']];
const hear = {
  id: 'hear', table: 'hearTexts', prefix: 'HT', title: '들은 이야기',
  about: '헌터가 아는 사람에게 일이 생기면 건너 들은 소식으로 한 줄 남는다. "~했다고 한다" 꼴.',
  rules: ['{a} = 그 사람 이름 (꼭 넣기)', '전해 들은 말투: "~했다고 한다" · "~라더라" · "~래"', '한 줄, 담담하게'],
  fields: [
    { k: 'on', label: '무슨 일', type: 'enum', need: true, opts: () => HEAR_ON.map(([id, n, x]) => [id, n + (x ? ` (쓸 수 있는 값 {${x}})` : '')]) },
    { k: 'text', label: '문장', type: 'text', fill: true, need: true, lint: 'short', len: [6, 70], dup: 'text', ph: v => ['a', 'rank', 'gate', 'why', 'role', 'job', 'guild', 'title', 'cls'], needPh: ['a'] },
  ],
  existing: DB => V(DB, 'hearTexts').map(r => ({ id: r.id, text: r.text, scope: r.on })),
  targets: (DB, n, o) => spread(HEAR_ON.map(x => x[0]), cnt(V(DB, 'hearTexts'), r => r.on), o.goal || 5, n).map(on => ({ on })),
  make: v => ({ on: v.on, text: v.text }),
};

/* ---------- 소문 (rumorPool) ---------- */
const rumor = {
  id: 'rumor', table: 'rumorPool', prefix: 'RP', title: '소문',
  about: '헌터 주변에 도는 소문 한 줄. {a} 자리에 아는 헌터 이름이 들어간다. "~라는 소문" 꼴로 끝난다.',
  rules: ['{a} 꼭 넣기', '"~다는 소문" · "~라는 소문"으로 끝내기 (앞에 "요즘"이 붙어 나온다)', '찌라시 · 커뮤니티 말투 OK, 사실처럼 단정하지 말 것'],
  fields: [{ k: 'text', label: '소문', type: 'text', fill: true, need: true, lint: 'short', len: [8, 60], dup: 'text', ph: () => ['a'], needPh: ['a'] }],
  existing: DB => V(DB, 'rumorPool').map(r => ({ id: r.id, text: r.text })),
  targets: (DB, n) => Array.from({ length: n }, () => ({})),
  make: v => ({ text: v.text }),
};

/* ---------- 뉴스 (newsPool) ---------- */
const NEWS_CAT = ['사회', '경제', '협회', '길드', '국제', '커뮤니티', '연예', '사건사고', '정치', '과학'];
const news = {
  id: 'news', table: 'newsPool', prefix: 'NWP', title: '뉴스 제목',
  about: '이야기 창에 가끔 흐르는 세상 소식. 기사 제목 한 줄.',
  rules: ['헤드라인체 (마침표 없이, 따옴표 · 말줄임 OK)', '2026년 한국, 게이트가 생긴 지 27년 — 법 · 보험 · 수수료가 다 자리 잡은 사회', '실존 기업 · 인물 이름 금지 (연상되는 가상 이름 OK), 실제 지명 · 노선 OK', '[인기글] 같은 커뮤니티 글 제목도 OK'],
  fields: [
    { k: 'cat', label: '분류', type: 'enum', need: true, opts: () => NEWS_CAT.map(c => [c, c]) },
    { k: 'tone', label: '분위기 — 없음(보통) · a(좋은 소식) · b(나쁜 소식)', type: 'enum', opts: () => [['', '보통', '없음'], ['a', '좋은 소식'], ['b', '나쁜 소식']] },
    { k: 'title', label: '제목', type: 'text', fill: true, need: true, lint: 'head', dup: 'text', ph: () => [] },
  ],
  existing: DB => [...V(DB, 'newsPool'), ...V(DB, 'news')].map(r => ({ id: r.id, text: r.title, scope: r.cat })),
  targets: (DB, n, o) => spread(NEWS_CAT, cnt(V(DB, 'newsPool'), r => r.cat), o.goal || 6, n).map(cat => ({ cat })),
  make: v => ({ cat: v.cat, tone: v.tone || '', title: v.title }),
};

/* ---------- 지인 근황 메시지 (careerMsgs) ---------- */
const CAREER = [['promo', '승진했다', 'rank'], ['fired', '잘렸다', ''], ['hired', '취직했다', 'job'], ['grad', '졸업했다', 'job'], ['boom', '가게가 잘된다', ''], ['slump', '가게가 힘들다', '']];
const career = {
  id: 'career', table: 'careerMsgs', prefix: 'CRM', title: '지인 근황 메시지',
  about: '헌터의 일반인 지인(가족 · 친구)이 메신저로 보내는 근황 한 마디.',
  rules: ['메신저 말투 (반말 · ㅋㅋ · 줄임말 OK)', '보내는 사람이 직접 하는 말 (1인칭 OK)', '한두 문장'],
  fields: [
    { k: 'ev', label: '무슨 근황', type: 'enum', need: true, opts: () => CAREER.map(([id, n, x]) => [id, n + (x ? ` ({${x}} 쓸 수 있음)` : '')]) },
    { k: 'text', label: '메시지', type: 'text', fill: true, need: true, lint: 'chat', dup: 'text', ph: () => ['rank', 'job'] },
  ],
  existing: DB => V(DB, 'careerMsgs').flatMap(r => (r.texts || []).map(t => ({ id: r.id, text: t, scope: r.ev }))),
  targets: (DB, n, o) => spread(CAREER.map(x => x[0]), cnt(V(DB, 'careerMsgs').flatMap(r => (r.texts || []).map(() => r)), r => r.ev), o.goal || 6, n).map(ev => ({ ev })),
  make: v => ({ ev: v.ev, texts: [v.text] }),
};

/* ---------- 성좌 메시지 (starMessages) ---------- */
const starmsg = {
  id: 'starmsg', table: 'starMessages', prefix: 'SMS', title: '성좌 메시지',
  about: '플레이어(성좌)가 헌터에게 건네는 짧은 한마디. 이야기 창에 "[성좌 이름] …"으로 나온다. 성좌 성향마다 말투가 다르다.',
  rules: ['성좌의 말 (헌터에게 하는 말, 반말 · 하대 · 다정함 등 성향대로)', '짧게 (한 문장, 길어야 두 문장)', '{name} = 헌터 이름 · 그 밖의 자리 표시는 상황마다 (칸 설명 참고)', 'known = 헌터가 성좌를 알 때만 나오게 (y/n)'],
  fields: [
    { k: 'on', label: '언제', type: 'enum', need: true, opts: DB => V(DB, 'starMsgEvents').map(e => [e.id, `${e.name}${(e.vars || []).length ? ' (' + e.vars.map(x => '{' + x + '}').join(' ') + ')' : ''}`]) },
    { k: 'trait', label: '성좌 성향 (비우면 모든 성향)', type: 'enum', opts: DB => V(DB, 'starTraits').map(t => [t.id, t.name, t.desc]) },
    { k: 'known', label: '헌터가 성좌를 알 때만 (y/n)', type: 'bool' },
    { k: 'text', label: '한마디', type: 'text', fill: true, need: true, lint: 'chat', dup: 'text', ph: (v, DB) => ['name', 'star', ...(DB.starMsgEvents?.[v.on]?.vars || [])] },
  ],
  existing: DB => V(DB, 'starMessages').map(r => ({ id: r.id, text: r.text, scope: r.on })),
  targets(DB, n, o) { const ev = V(DB, 'starMsgEvents').map(e => e.id), tr = V(DB, 'starTraits').map(t => t.id); return spread(ev, cnt(V(DB, 'starMessages'), r => r.on), o.goal || 6, n).map((on, i) => ({ on, trait: rr(tr, i), known: on === 'gift' || on === 'bless' || on === 'death' ? 'n' : 'y' })); },
  make: v => ({ on: v.on, text: v.text, ...(v.trait ? { trait: v.trait } : {}), ...(v.known ? { known: true } : {}) }),
};

/* ---------- 선물 안배 문장 (giftCovers) ---------- */
const CATS = DB => V(DB, 'itemCats').map(c => [c.id, c.name]);
const giftcover = {
  id: 'giftcover', table: 'giftCovers', prefix: 'GC', title: '선물 안배 문장',
  about: '헌터가 성좌를 모를 때, 성좌의 선물이 헌터의 운이나 노력으로 얻은 것처럼 보이게 하는 한 줄.',
  rules: ['{item} 꼭 넣기 (물건 이름 + 수량). 조사는 {item}{을} {item}{이} {item}{은} {item}{과} {item}{으로} {item}{이었다}', 'luck = 운 (추첨 · 주움 · 덤) / effort = 노력 (일한 대가 · 뒤져서 찾음)', 'gate = 게이트 안에서 / town = 바깥 일상 / any = 어디서나', '성좌 · 하늘 · 신비한 기운 같은 말 금지 — 진짜 우연처럼'],
  fields: [
    { k: 'how', label: 'luck(운) · effort(노력)', type: 'enum', need: true, opts: () => [['luck', '운'], ['effort', '노력']] },
    { k: 'where', label: 'gate · town · any', type: 'enum', need: true, opts: () => [['gate', '게이트 안'], ['town', '바깥'], ['any', '어디서나']] },
    { k: 'cats', label: '(선택) 이 문장이 어울리는 물건 갈래, 쉼표로', type: 'enums', opts: CATS },
    { k: 'text', label: '문장', type: 'text', fill: true, need: true, lint: 'line', dup: 'text', ph: () => ['item', '을', '이', '은', '과', '으로', '이었다', 'name'], needPh: ['item'] },
  ],
  existing: DB => V(DB, 'giftCovers').map(r => ({ id: r.id, text: r.text })),
  targets(DB, n) { const C = [null, ['ITC_WEAPON', 'ITC_ARMOR', 'ITC_ACCESSORY'], ['ITC_CONSUME'], ['ITC_STONE', 'ITC_MAT'], ['ITC_BOOK'], ['ITC_DAILY']]; return Array.from({ length: n }, (_, i) => ({ how: i % 2 ? 'effort' : 'luck', where: rr(['town', 'gate', 'town', 'any'], i), ...(rr(C, i) ? { cats: rr(C, i).join(', ') } : {}) })); },
  make: v => ({ how: v.how, where: v.where, ...(v.cats?.length ? { cats: v.cats } : {}), text: v.text }),
};

/* ---------- 빈칸 재료 (textBits) ---------- */
const bits = {
  id: 'bits', table: 'textBits', prefix: 'TB', title: '빈칸 문장 재료',
  about: '다른 문장 안에서 {@key} 로 불러 쓰는 짧은 조각. 같은 key 의 조각 중 하나가 무작위로 들어간다.',
  rules: ['key 는 소문자 · 점 (예: weather.rain · city.noise · gate.air)', '문장 조각 (마침표 없이, 다른 문장 중간에 들어간다)', '한 항목에 text 를 여러 줄 써도 된다'],
  list: ['text'],
  fields: [
    { k: 'key', label: '재료 이름', type: 'key', need: true },
    { k: 'text', label: '조각 (여러 줄 가능)', type: 'texts', fill: true, need: true, lint: 'short', len: [2, 50], dup: 'text', ph: () => BASE_PH },
  ],
  existing: DB => V(DB, 'textBits').flatMap(r => r.texts.map(t => ({ id: r.id, text: t, scope: r.key }))),
  targets: (DB, n) => { const K = [...new Set(V(DB, 'textBits').map(b => b.key))]; return Array.from({ length: n }, (_, i) => ({ key: rr(K.length ? K : ['weather.rain'], i) })); },
  make: v => ({ key: v.key, texts: v.text }),
};

/* ---------- 공략 위기 (crises) ---------- */
const STYLE_FX = {
  bold: { check: ['ABL_A01', 'ABL_A04', 'ABL_A05', 'ABL_A09'], dc: 21, risk: '위험', ok: 'kills:1, stones:2', ng: 'hp:-22, injury:rand/INJ_CUT/2' },
  careful: { check: ['ABL_A03', 'ABL_A21', 'ABL_B07', 'ABL_A24'], dc: 18, risk: '주의', ok: 'progress:1', ng: 'hp:-10, time:20' },
  team: { check: ['ABL_B15', 'ABL_B22', 'ABL_B39'], dc: 16, risk: '주의', ok: 'kills:1, party:-4', ng: 'party:-14', needParty: true },
  greedy: { check: ['ABL_B07', 'ABL_A19'], dc: 18, risk: '주의', ok: 'stones:5, time:30', ng: 'hp:-15, time:30' },
  safe: { ok: 'time:20' }, escape: { ok: 'retreat' },
};
const CHOICE_SETS = [['bold', 'careful', 'safe'], ['bold', 'team', 'escape'], ['greedy', 'careful', 'safe'], ['careful', 'team', 'safe']];
const crisis = {
  id: 'crisis', table: 'crises', prefix: 'CR', title: '공략 위기',
  about: '게이트 공략 중 갑자기 닥치는 위기 장면과 선택지. 헌터가 성격대로 고르거나 플레이어가 고른다. 고른 선택지는 판정(능력 + d20 vs 난이도) 뒤 성공 문장(ok) 또는 실패 문장(ng)이 나온다.',
  rules: ['장면(text)은 현장 중심 · 건조 · 현재형, 1~2문장', '선택지(choice.t)는 행동 하나를 짧게 ("정면으로 막아선다")', '정답이 없게 — 위험 · 시간 · 동료 · 욕심 사이의 딜레마', '{m} 몬스터 이름 · {a}{b} 파티원 이름 · {gate} 게이트 · {p} 헌터', '효과(okFx · ngFx) · 판정(check)은 도구가 미리 넣어 두었다. 바꿔도 된다'],
  groups: { choice: { first: 't' } },
  fields: [
    { k: 'when', label: '언제 — fight(싸움 중) · any(아무 때) · boss(보스)', type: 'enum', need: true, opts: () => [['fight', '싸움 중'], ['any', '아무 때'], ['boss', '보스']] },
    { k: 'title', label: '위기 이름 (짧게)', type: 'text', fill: true, need: true, lint: 'short', len: [2, 20], dup: 'name' },
    { k: 'text', label: '장면', type: 'text', fill: true, need: true, lint: 'line', dup: 'text', ph: () => [...BASE_PH, 'm', 'a', 'b', 'gate'] },
  ],
  group: {
    choice: [
      { k: 't', label: '선택지', type: 'text', fill: true, need: true, lint: 'short', len: [3, 30], ph: () => ['m', 'a', 'b', 'p'] },
      { k: 'style', label: '선택 성향 (safe · careful · bold · greedy · team · escape)', type: 'enum', need: true, opts: DB => V(DB, 'styleTags').map(s => [s.id, s.id]) },
      { k: 'check', label: '(선택) 판정 — 능력 ID 와 난이도 (예: ABL_A04 22)', type: 'check' },
      { k: 'risk', label: '(선택) 주의 · 위험 · 치명적', type: 'enum', opts: () => [['주의', '주의'], ['위험', '위험'], ['치명적', '치명적']] },
      { k: 'ok', label: '성공 문장', type: 'text', fill: true, need: true, lint: 'line', ph: () => [...BASE_PH, 'm', 'a', 'b'] },
      { k: 'okFx', label: '성공 효과', type: 'fx' },
      { k: 'ng', label: '실패 문장 (판정이 있을 때)', type: 'text', fill: true, show: c => !!c.check, lint: 'line', ph: () => [...BASE_PH, 'm', 'a', 'b'] },
      { k: 'ngFx', label: '실패 효과', type: 'fx' },
    ],
  },
  existing: DB => V(DB, 'crises').flatMap(r => [{ id: r.id, text: r.text, scope: r.when }, { id: r.id, name: r.title }]),
  targets(DB, n, o) {
    return spread(['fight', 'any', 'boss'], cnt(V(DB, 'crises'), r => r.when), o.goal || 6, n).map((when, i) => ({
      when, choice: rr(CHOICE_SETS, i).map((st, j) => { const S = STYLE_FX[st]; return { style: st, ...(S.check ? { check: `${rr(S.check, i + j)} ${S.dc}`, risk: S.risk } : {}), okFx: S.ok, ...(S.ng ? { ngFx: S.ng } : {}) }; }),
    }));
  },
  make: (v) => ({ when: v.when, title: v.title, tags: [], text: v.text, choices: (v.choice || []).map(c => ({ t: c.t, style: c.style, ...(STYLE_FX[c.style]?.needParty ? { needParty: true } : {}), ...(c.check ? { check: c.check } : {}), ...(c.risk ? { risk: c.risk } : {}), ok: c.ok, ...(c.okFx ? { okFx: c.okFx } : {}), ...(c.ng ? { ng: c.ng } : {}), ...(c.ngFx ? { ngFx: c.ngFx } : {}) })) }),
  check: v => { const e = []; if ((v.choice || []).length < 2) e.push('선택지 2개 이상'); (v.choice || []).forEach((c, i) => { if (c.check && !c.ng) e.push(`선택지 ${i + 1}: 판정이 있으면 실패 문장(ng) 필요`); }); return e; },
};

/* ---------- 이벤트 (events) ---------- */
const EV_KIND = {
  SK_FAMILY: { ch: 'msg', to: ['REL:REL_MOTHER', 'REL:REL_FATHER', 'REL:REL_SISTER', 'REL:REL_BROTHER'], tags: [['TAG_KIND', 'TAG_SOCIAL'], ['TAG_ALONE'], ['TAG_AVOID']], fx: ['stress:-4, rel:close+4, energy:-4', 'rel:close+1', 'stress:+2, rel:close-2'] },
  SK_SOCIAL: { ch: 'msg', to: ['REL:REL_FRIEND', 'REL:REL_COLLEAGUE'], tags: [['TAG_SOCIAL', 'TAG_KIND'], ['TAG_REST'], ['TAG_AVOID']], fx: ['stress:-5, energy:-8, money:-30000, rel:close+4', 'energy:+4', 'rel:close-2'] },
  SK_LOVE: { ch: 'msg', to: ['REL:REL_LOVER'], adult: true, tags: [['TAG_LOVE', 'TAG_KIND'], ['TAG_HONEST'], ['TAG_AVOID']], fx: ['stress:-6, rel:romance+5, money:-50000', 'rel:trust+3', 'rel:romance-4, stress:+3'] },
  SK_MONEY: { ch: 'alert', from: ['SYS_LIFE', 'SYS_BANK'], req: 'money>=200000', tags: [['TAG_MONEY', 'TAG_RISK'], ['TAG_CAREFUL'], ['TAG_SAFE']], fx: ['money:-150000', 'money:-30000, time:30', 'stress:+1'] },
  SK_CONTRACT: { ch: 'alert', from: ['SYS_ASSOC'], tags: [['TAG_GAIN', 'TAG_RISK'], ['TAG_CAREFUL', 'TAG_RULE'], ['TAG_SAFE']], fx: ['money:+300000, stress:+6', 'rep:1', 'stress:-1'] },
  SK_MOVE: { ch: 'alert', from: ['SYS_ASSOC'], req: 'level>=8', tags: [['TAG_GAIN', 'TAG_RISK'], ['TAG_TEAM'], ['TAG_SAFE']], fx: ['rep:2, stress:+4', 'rep:1', 'stress:-2'] },
  SK_WORLD: { ch: 'alert', from: ['SYS_ALERT', 'SYS_ASSOC'], tags: [['TAG_KIND', 'TAG_RISK'], ['TAG_WORK'], ['TAG_SAFE']], fx: ['rep:2, energy:-15, hp:-5', 'money:+80000, energy:-10', 'stress:+3'] },
  SK_DEATH: { ch: 'alert', from: ['SYS_ALERT'], tags: [['TAG_RISK', 'TAG_KIND'], ['TAG_CAREFUL'], ['TAG_ESCAPE']], fx: ['rep:3, hp:-25, injury:rand/INJ_CUT/2', 'rep:1, hp:-8', 'stress:+6'] },
};
const event = {
  id: 'event', table: 'events', prefix: 'EV', title: '이벤트 (선택지)',
  about: '일상에서 날아오는 연락(msg) 또는 알림(alert)과 선택지 셋. 헌터가 성격대로 고르거나 플레이어가 고른다. 결과 문장(ok)과 효과가 붙는다.',
  rules: ['msg = 아는 사람이 보낸 메신저 (line: 말풍선 한 줄씩, 2~4줄, 그 사람 말투)', 'alert = 상황 알림 (body: 상황 설명 + 관찰된 분위기, 2~3문장 현재형)', '선택지는 딜레마 — 정답 없이 기회비용이 있게 (STYLE 30)', '결과(choice.ok)는 담담한 현재형 1~2문장', '조건(req) · 효과(choice.okFx) · 꼬리표는 도구가 미리 넣었다. 바꿔도 된다', '연애(SK_LOVE)는 성인 조건이 자동으로 붙는다'],
  list: ['line'], groups: { choice: { first: 't' } },
  fields: [
    { k: 'kind', label: '사건 종류', type: 'enum', need: true, opts: DB => V(DB, 'stopKinds').filter(k => k.id !== 'SK_CRISIS' && k.id !== 'SK_MILESTONE').map(k => [k.id, k.name]) },
    { k: 'ch', label: 'msg(메신저) · alert(알림)', type: 'enum', need: true, opts: () => [['msg', '메신저'], ['alert', '알림']] },
    { k: 'to', label: '(msg) 보낸 사람 — REL:관계 ID', type: 'enum', opts: DB => V(DB, 'relTypes').map(r => ['REL:' + r.id, r.name]) },
    { k: 'from', label: '(alert) 보낸 곳', type: 'enum', opts: DB => V(DB, 'senders').map(s => [s.id, s.name]) },
    { k: 'subj', label: '제목 (짧게)', type: 'text', fill: true, need: true, lint: 'short', len: [2, 30], dup: 'name' },
    { k: 'line', label: '(msg) 말풍선 — 여러 줄', type: 'texts', fill: true, show: t => t.ch === 'msg', lint: 'chat', dup: 'text', ph: () => ['p'] },
    { k: 'body', label: '(alert) 상황 설명', type: 'text', fill: true, show: t => t.ch === 'alert', lint: 'line', dup: 'text', len: [10, 200], ph: () => BASE_PH },
    { k: 'req', label: '조건 — 짧은 문법', type: 'req' },
    { k: 'cooldown', label: '다시 나오기까지 일 수', type: 'num', min: 1, max: 365 },
  ],
  group: {
    choice: [
      { k: 't', label: '선택지', type: 'text', fill: true, need: true, lint: 'short', len: [2, 34], ph: () => ['p'] },
      { k: 'tags', label: '판단 꼬리표, 쉼표로', type: 'enums', opts: DB => V(DB, 'mindTags').map(t => [t.id, t.name]) },
      { k: 'ok', label: '결과 문장', type: 'text', fill: true, need: true, lint: 'line', ph: () => BASE_PH },
      { k: 'okFx', label: '효과', type: 'fx' },
    ],
  },
  existing: DB => V(DB, 'events').flatMap(r => [...(r.lines || []).map(t => ({ id: r.id, text: t })), ...(r.body ? [{ id: r.id, text: r.body }] : []), { id: r.id, name: r.subj }]),
  targets(DB, n, o) {
    const ks = Object.keys(EV_KIND).filter(k => DB.stopKinds?.[k]);
    return spread(ks, cnt(V(DB, 'events'), r => r.kind), o.goal || 5, n).map((kind, i) => { const K = EV_KIND[kind];
      const to = K.to ? rr(K.to, i) : null, req = [to ? 'rel=' + to.slice(4) : '', K.req || '', K.adult ? 'adult' : ''].filter(Boolean).join('; ');
      return { kind, ch: K.ch, ...(to ? { to } : { from: rr(K.from, i) }), ...(req ? { req } : {}), cooldown: 20 + (i % 4) * 10, choice: K.tags.map((t, j) => ({ tags: t.join(', '), okFx: K.fx[j] })) }; });
  },
  make: v => ({ ch: v.ch, ...(v.ch === 'msg' ? { to: v.to } : { from: v.from || 'SYS_LIFE' }), kind: v.kind, subj: v.subj, ...(v.ch === 'msg' ? { lines: v.line || [] } : { body: v.body }),
    req: v.req || [], cooldown: v.cooldown || 30, choices: (v.choice || []).map(c => ({ t: c.t, ...(c.tags?.length ? { tags: c.tags } : {}), ok: c.ok, ...(c.okFx ? { okFx: c.okFx } : {}) })) }),
  check: v => { const e = []; if (v.ch === 'msg' && !v.to) e.push('msg 는 to(보낸 사람) 필요'); if (v.ch === 'msg' && !(v.line || []).length) e.push('msg 는 line(말풍선) 1줄 이상'); if (v.ch === 'alert' && !v.body) e.push('alert 는 body(상황 설명) 필요');
    if ((v.choice || []).length < 2) e.push('선택지 2개 이상'); if (v.to?.startsWith('REL:') && !(v.req || []).some(q => q.k === 'rel')) e.push(`msg 를 ${v.to} 에게서 받으려면 조건 rel=${v.to.slice(4)} 필요`);
    if (v.kind === 'SK_LOVE' && !(v.req || []).some(q => q.k === 'adult')) e.push('연애 사건은 adult 조건 필요'); return e; },
};

/* ---------- 몬스터 (monsters) ---------- */
const RANKS = Array.from({ length: 20 }, (_, i) => 20 - i);
const monster = {
  id: 'monster', table: 'monsters', prefix: 'MON', title: '몬스터',
  about: '게이트에 나오는 몬스터. 게이트 하나 = 잡몹 1~3종 + 보스 1. 등급은 1급(최강)~20급(최약) 사이 범위로 나온다. 전투 수치는 역할 · 크기 · 등급으로 엔진이 계산한다 — 쓰는 건 이름 · 설명 · 등장 문장.',
  rules: ['이름: 한국 헌터물에서 부를 법한 이름 (협회 도감 명칭 느낌, "철갑 멧돼지" · "그림자 점액"). 유명 작품 몬스터 이름 그대로 금지', '설명(desc): 협회 도감처럼 건조한 한두 문장 — 특징 · 위험 · 대처', '등장 문장(appear): 현재형 1문장, {n} 무리 수 · {m} 이름', '보스(boss: y)는 무게감 있게'],
  fields: [
    { k: 'name', label: '이름', type: 'text', fill: true, need: true, lint: 'name', dup: 'name' },
    { k: 'cat', label: '계열', type: 'enum', need: true, opts: DB => V(DB, 'monsterCats').map(c => [c.id, c.name]) },
    { k: 'ranks', label: '나오는 등급 범위 — 약한 쪽 숫자, 센 쪽 숫자 (예: 20, 17)', type: 'range' },
    { k: 'mrole', label: '전투 역할', type: 'enum', need: true, opts: DB => V(DB, 'monsterRoles').map(r => [r.id, r.name]) },
    { k: 'size', label: '크기', type: 'enum', opts: DB => V(DB, 'monsterSizes').map(s => [s.id, s.name]) },
    { k: 'boss', label: '보스인가 (y/n)', type: 'bool' },
    { k: 'el', label: '(선택) 공격 속성', type: 'enum', opts: DB => V(DB, 'elements').map(e => [e.id, e.name]) },
    { k: 'weak', label: '(선택) 약점 속성, 쉼표로', type: 'enums', opts: DB => V(DB, 'elements').map(e => [e.id, e.name]) },
    { k: 'resist', label: '(선택) 저항 속성, 쉼표로', type: 'enums', opts: DB => V(DB, 'elements').map(e => [e.id, e.name]) },
    { k: 'habitats', label: '(선택) 나오는 게이트 내부, 쉼표로', type: 'enums', opts: DB => V(DB, 'gateInteriors').map(g => [g.id, g.name]) },
    { k: 'desc', label: '도감 설명', type: 'text', fill: true, need: true, lint: 'desc', dup: 'text', ph: () => [] },
    { k: 'appear', label: '등장 문장', type: 'text', fill: true, lint: 'line', ph: () => ['n', 'm'] },
  ],
  existing: DB => V(DB, 'monsters').flatMap(r => [{ id: r.id, name: r.name }, ...(r.desc ? [{ id: r.id, text: r.desc }] : [])]),
  targets(DB, n) {
    const cats = V(DB, 'monsterCats').map(c => c.id), roles = V(DB, 'monsterRoles').map(r => r.id), sizes = V(DB, 'monsterSizes').map(s => s.id);
    return Array.from({ length: n }, (_, i) => { const hi = rr(RANKS, i * 3 + 1), boss = i % 4 === 3, lo = Math.max(1, hi - 3);
      return { cat: rr(cats, i), ranks: `${hi}, ${lo}`, mrole: boss ? 'MR_BRUTE' : rr(roles, i), size: boss ? 'MSZ_L' : rr(sizes, i), boss: boss ? 'y' : 'n' }; });
  },
  make: v => { const [a, b] = v.ranks || [20, 17], R = x => 'RANK_' + String(x).padStart(2, '0');
    return { name: v.name, cat: v.cat, ranks: [R(a), R(b)], rank: R(Math.round((a + b) / 2)), mrole: v.mrole, ...(v.size ? { size: v.size } : {}), ...(v.boss ? { boss: true } : {}), ...(v.el ? { el: v.el } : {}),
      ...(v.weak?.length ? { weak: v.weak } : {}), ...(v.resist?.length ? { resist: v.resist } : {}), ...(v.habitats?.length ? { habitats: v.habitats } : {}), drops: [], desc: v.desc, ...(v.appear ? { lines: { appear: [v.appear] } } : {}) }; },
};

/* ---------- 이름 있는 장소 (places) ---------- */
const place = {
  id: 'place', table: 'places', prefix: 'PL', title: '이름 있는 장소',
  about: '지역(시 · 군 · 구)마다 있는 실제 같은 개별 장소 — 단골 카페, 협회 지부, 헌터 훈련장, 병원 등. 이동 · 사건 · 단골의 재료.',
  rules: ['이름: 실제 있을 법한 가상 상호 (실존 상호 · 브랜드 금지). 공공기관은 "헌터협회 ○○지부"처럼', '지역 특색을 살려 (바닷가 · 대학가 · 신도시 · 구도심)', '설명(desc): 한 문장, 무엇이 특별한지'],
  fields: [
    { k: 'name', label: '이름', type: 'text', fill: true, need: true, lint: 'name', len: [2, 30], dup: 'name' },
    { k: 'type', label: '장소 종류', type: 'enum', need: true, opts: DB => V(DB, 'placeTypes').map(p => [p.id, p.name]) },
    { k: 'region', label: '지역 (이름이나 ID)', type: 'enum', need: true, opts: DB => V(DB, 'regions').map(r => [r.id, r.name]) },
    { k: 'scale', label: 'local(동네) · region(그 지역에서 유명) · national(전국에서 유명)', type: 'enum', opts: () => [['local', '동네'], ['region', '지역'], ['national', '전국']] },
    { k: 'desc', label: '한 문장 설명', type: 'text', fill: true, need: true, lint: 'desc', dup: 'text', ph: () => [] },
  ],
  existing: DB => V(DB, 'places').flatMap(r => [{ id: r.id, name: r.name + '|' + r.region }, { id: r.id, text: r.desc }]),
  nameKey: v => v.name + '|' + v.region,
  targets(DB, n) {
    const big = ['SEOUL', 'BUSAN', 'INCHEON', 'DAEGU', 'DAEJEON', 'GWANGJU', 'ULSAN', 'GG'], have = cnt(V(DB, 'places'), p => p.region);
    const regs = V(DB, 'regions').filter(r => big.some(b => r.id.startsWith('RG_' + b))).sort((a, b) => (have[a.id] || 0) - (have[b.id] || 0)), types = V(DB, 'placeTypes').map(p => p.id).filter(t => t !== 'PT_HOME' && t !== 'PT_GATE');
    return Array.from({ length: n }, (_, i) => ({ region: rr(regs, Math.floor(i / 3)).id, type: rr(types, i), scale: i % 5 === 0 ? 'region' : 'local' }));
  },
  make: v => ({ name: v.name, type: v.type, region: v.region, desc: v.desc, scale: v.scale || 'local', real: false }),
};

/* ---------- 장비 개성 (itemTraits) ---------- */
const trait = {
  id: 'trait', table: 'itemTraits', prefix: 'ITT', title: '장비 개성',
  about: '장비에 붙는 작은 개성 (0~3개, 등급이 높을수록 많고 크다). 좋은 개성엔 단점을 같이 붙이는 게 원칙.',
  rules: ['이름: 짧은 명사구 ("손에 감기는 손잡이" · "무거운 날")', '설명(desc): 정비사 · 감정사가 적은 메모처럼 한 문장', 'kind/stat/v 는 도구가 정해 두었다 — v 가 음수면 단점'],
  fields: [
    { k: 'name', label: '이름', type: 'text', fill: true, need: true, lint: 'name', dup: 'name' },
    { k: 'kind', label: 'stat(스탯 묶음 판정) · check(무기 판정) · resist(저항) · situ(상황)', type: 'enum', need: true, opts: () => [['stat', '스탯'], ['check', '무기 판정'], ['resist', '저항'], ['situ', '상황']] },
    { k: 'stat', label: '(stat 일 때) 기본 스탯', type: 'enum', opts: DB => V(DB, 'baseStats').map(s => [s.id, s.name]) },
    { k: 'v', label: '크기 (+ 좋음 / − 나쁨, 1~3)', type: 'num', min: -3, max: 3 },
    { k: 'desc', label: '설명', type: 'text', fill: true, need: true, lint: 'desc', dup: 'text', ph: () => [] },
  ],
  existing: DB => V(DB, 'itemTraits').flatMap(r => [{ id: r.id, name: r.name }, { id: r.id, text: r.desc }]),
  targets(DB, n) { const S = V(DB, 'baseStats').map(s => s.id); return Array.from({ length: n }, (_, i) => { const kind = rr(['stat', 'check', 'stat', 'resist', 'situ'], i), v = rr([1, 2, -1, 1, -2, 3], i); return { kind, ...(kind === 'stat' ? { stat: rr(S, i) } : {}), v }; }); },
  make: v => ({ name: v.name, kind: v.kind, ...(v.stat ? { stat: v.stat } : {}), v: v.v ?? 1, desc: v.desc }),
  check: v => (v.kind === 'stat' && !v.stat ? ['kind stat 은 stat(기본 스탯) 필요'] : []),
};

/* ---------- 소모품 (items, ITC_CONSUME) ---------- */
const USE_SETS = [['hp:30', 'IG_1', 30000], ['mp:30', 'IG_1', 40000], ['energy:25', 'IG_1', 15000], ['hp:60', 'IG_2', 120000], ['mp:60', 'IG_2', 150000], ['hp:100', 'IG_3', 600000], ['cure:INJ_CUT', 'IG_2', 90000], ['cure:INJ_BLEED', 'IG_2', 110000], ['cure:INJ_FRACT', 'IG_3', 400000], ['energy:50, hp:20', 'IG_2', 80000]];
const consumable = {
  id: 'consumable', table: 'items', prefix: 'IT', title: '소모품',
  about: '헌터가 쓰는 회복약 · 마력 회복제 · 기력 음료 · 지혈제 같은 소모품. 효과 · 등급 · 값은 도구가 정해 두었다 — 쓰는 건 이름 · 설명.',
  rules: ['이름: 시스템 게임풍 ("[일반] 협회 규격 하급 포션") 또는 현실 제품풍 ("헌터용 지혈 패치")', '설명(desc): 현실 의약품 · 제품 라벨처럼 — 제조 · 인증 · 사용 주의 (STYLE 41)', '실존 제약사 · 브랜드 금지'],
  fields: [
    { k: 'name', label: '이름', type: 'text', fill: true, need: true, lint: 'name', len: [2, 30], dup: 'name' },
    { k: 'grade', label: '등급', type: 'enum', need: true, opts: DB => V(DB, 'itemGrades').map(g => [g.id, g.name]) },
    { k: 'use', label: '효과 — hp:% · mp:% · energy:값 · cure:부상 종류 ID', type: 'use' },
    { k: 'price', label: '기준가(원)', type: 'num', min: 1000, max: 1e9 },
    { k: 'desc', label: '설명', type: 'text', fill: true, need: true, lint: 'desc', dup: 'text', ph: () => [] },
  ],
  existing: DB => V(DB, 'items').filter(i => i.cat === 'ITC_CONSUME' || i.cat === 'ITC_GEAR').flatMap(r => [{ id: r.id, name: r.name }, ...(r.desc ? [{ id: r.id, text: r.desc }] : [])]),
  targets: (DB, n) => Array.from({ length: n }, (_, i) => { const [use, grade, price] = rr(USE_SETS, i); return { grade, use, price }; }),
  count: DB => V(DB, 'items').filter(i => i.cat === 'ITC_CONSUME').length,
  make: v => ({ name: v.name, cat: 'ITC_CONSUME', grade: v.grade, price: v.price || 50000, use: v.use, desc: v.desc }),
};

/* ---------- NPC 성좌 (constellations) ---------- */
const constellation = {
  id: 'constellation', table: 'constellations', prefix: 'CST', title: 'NPC 성좌',
  about: '플레이어 말고 다른 헌터들을 키우는 성좌들. 성좌 경매장에 이름으로 나오고, 다른 헌터 뒤에 붙어 있다.',
  rules: ['이름: "수식어 + 존재" ("새벽을 기다리는 자" · "잿빛 탑의 사냥개"). 신화 속 실존 신 이름 그대로 금지', 'why: 이 성좌가 이 세계를 보는 이유 한 문장 (놀이 · 내기 · 그리움 · 복수 …)', 'desc: 성좌들 사이의 평판 한 문장'],
  fields: [
    { k: 'name', label: '이름', type: 'text', fill: true, need: true, lint: 'name', len: [3, 24], dup: 'name' },
    { k: 'trait', label: '성향', type: 'enum', need: true, opts: DB => V(DB, 'starTraits').map(t => [t.id, t.name]) },
    { k: 'domain', label: '영역', type: 'enum', opts: DB => V(DB, 'starDomains').map(d => [d.id, d.name]) },
    { k: 'why', label: '이 세계를 보는 이유', type: 'text', fill: true, need: true, lint: 'desc', dup: 'text', ph: () => [] },
    { k: 'desc', label: '평판', type: 'text', fill: true, lint: 'desc', ph: () => [] },
  ],
  existing: DB => V(DB, 'constellations').flatMap(r => [{ id: r.id, name: r.name }, ...(r.why ? [{ id: r.id, text: r.why }] : [])]),
  targets(DB, n) { const T = V(DB, 'starTraits').map(t => t.id), D = V(DB, 'starDomains').map(d => d.id); return Array.from({ length: n }, (_, i) => ({ trait: rr(T, i), domain: rr(D, i * 3) })); },
  make: v => ({ name: v.name, trait: v.trait, ...(v.domain ? { domain: v.domain } : {}), why: v.why, ...(v.desc ? { desc: v.desc } : {}), cls: null, hunters: [1, 3] }),
};

module.exports = { story, hear, rumor, news, career, starmsg, giftcover, bits, crisis, event, monster, place, trait, consumable, constellation };
