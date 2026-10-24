/* =========================================================
   engine/validate.js — 데이터 검증 규칙 (브라우저 개발 도구 · node tools/validate_data.js 공용)
   1) 중복 ID  2) 없는 ID 참조 (값 · 객체 키)  3) 테이블별 규칙 RULES
   ========================================================= */
(function (root) {
/* 게임 중 생기거나 파일로만 있는 ID: 존재 검사를 하지 않는다 */
const RUNTIME = ['POR', 'CREST', 'PP', 'NW', 'PG', 'GD_P', 'GT_G', 'NP_G', 'HN_G', 'HN_L', 'HN_A', 'AR', 'SYS', 'GRP', 'ME', 'MEM', 'VOICE_ASSET'];
const ID_RE = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$/;
const prefixOf = id => id.split('_')[0];

/* 이벤트 발동 조건(req) 검사: 종류(k)와 커마 조건의 필수 값 (index.html checkReq · checkCC 와 같은 목록) */
const REQ_K = ['time','slot','trait','density','rel','relStat','known','family','money','at','inRegion','romanceAny','spouseAny','homeIn','guildMaster','rep','hasGuild','noGuild','guildNot','all','any','not','energy','stress','sleepDebt','injured','relDim','relStatus','level','rankMax','cleared','item','weekday','flag','memory','noFlag',
  'look','lookNum','bmi','bg','pers','sex','age','basic','lang','cls',
  /* K-Hunter-Life: 세 층 원칙 · 감정 · 자기 인식 · 성인 · 장소 */
  'looks','emo','self','adult','place'];
function reqErrs(q, DB, where) {
  if (!q || typeof q !== 'object') return [`${where}: 조건 형식`];
  if (!REQ_K.includes(q.k)) return [`${where}: 모르는 조건 k=${q.k}`];
  const o = [];
  if (q.k === 'all' || q.k === 'any') (q.of || []).forEach((x, i) => o.push(...reqErrs(x, DB, `${where}.${q.k}[${i}]`)));
  if (q.k === 'not') o.push(...reqErrs(q.q, DB, where + '.not'));
  if (q.k === 'look' && (!DB.ccLook?.[q.item] || !Array.isArray(q.in))) o.push(`${where}: look 은 item(LK_) · in[] 필요`);
  if (q.k === 'lookNum' && !DB.ccLook?.[q.item]?.slider) o.push(`${where}: lookNum 은 슬라이더 항목(키 · 체중 등)만`);
  if (q.k === 'bg' && (!DB.bgItems?.[q.item] || !Array.isArray(q.in))) o.push(`${where}: bg 는 item(BI_) · in[] 필요`);
  if (q.k === 'pers' && !DB.ccPersonality?.[q.axis]) o.push(`${where}: pers 는 axis(PX_) 필요`);
  if (q.k === 'sex' && !['남', '여'].includes(q.v)) o.push(`${where}: sex 는 v '남' · '여'`);
  if (q.k === 'basic' && !['blood', 'hand', 'nation', 'bplace', 'langMain', 'voice', 'speech'].includes(q.key)) o.push(`${where}: basic key 값`);
  if (['lookNum', 'bmi', 'pers', 'age'].includes(q.k) && q.min == null && q.max == null) o.push(`${where}: min 또는 max 필요`);
  if (q.k === 'looks' && (!DB.lookScores?.[q.aspect] || (q.min == null && q.max == null))) o.push(`${where}: looks 는 aspect(APS_) · min/max 필요`);
  if (q.k === 'emo' && (!DB.emotions?.[q.id] || (q.min == null && q.max == null))) o.push(`${where}: emo 는 id(EM_) · min/max 필요`);
  if (q.k === 'self' && (!['looks', 'skill', 'money', 'belong'].includes(q.aspect) || (q.min == null && q.max == null))) o.push(`${where}: self 는 aspect(looks·skill·money·belong) · min/max 필요`);
  if (q.k === 'place' && (!Array.isArray(q.in) || q.in.some(x => !DB.placeTypes?.[x]))) o.push(`${where}: place 는 in[PT_] 필요`);
  if (q.who && q.who !== 'tgt') o.push(`${where}: who 는 'tgt' 만`);
  return o;
}
/* 세 층 원칙: 캐릭터에 대해 단정하는 사실(asserts)은 반드시 조건(req)에 같은 사실이 있어야 한다.
   같은 종류(k) · 같은 대상 키(aspect · item · axis · id · key · who)이고, 조건 범위가 단정 범위 안에 들어야 한다 */
const ASSERT_KEYS = ['aspect', 'item', 'axis', 'id', 'key', 'who', 'type', 'dim', 'v'];
function reqFlat(req) { const out = []; (req || []).forEach(q => { if (q && q.k === 'all') out.push(...reqFlat(q.of)); else out.push(q); }); return out; }
function implies(q, a) {
  if (!q || q.k !== a.k) return false; if (ASSERT_KEYS.some(k => (a[k] ?? null) !== (q[k] ?? null))) return false;
  if (a.min != null && !(q.min != null && q.min >= a.min)) return false; if (a.max != null && !(q.max != null && q.max <= a.max)) return false;
  if (a.in && !(Array.isArray(q.in) && q.in.every(x => a.in.includes(x)))) return false;
  return true;
}
function assertErrs(row, DB, where) {
  const o = [], A = row.asserts; if (A == null) return o; if (!Array.isArray(A)) return [`${where}: asserts 는 배열`];
  const R = reqFlat(row.req);
  A.forEach((a, i) => { o.push(...reqErrs(a, DB, `${where} asserts[${i}]`)); if (!R.some(q => implies(q, a))) o.push(`${where}: asserts[${i}] (${a.k}${a.aspect ? ' ' + a.aspect : ''}) 이(가) req 에 없음 — 사실과 반대되는 서술이 나올 수 있음`); });
  return o;
}
/* 외모 · 형편을 단정하는 말이 있는데 asserts 가 없으면 오류 (noAssert:true 로 예외 — 다른 인물 이야기일 때) */
const ASSERT_WORDS = /잘생|예쁘|미인|미남|못생|추남|추녀|뚱뚱|비만|말라깽이|키가 크|키가 작|부자|가난|몸매/;
function assertWordErrs(row, texts, where) { if (row.noAssert || (row.asserts || []).length) return []; return texts.some(t => ASSERT_WORDS.test(String(t || ''))) ? [`${where}: 외모 · 형편을 단정하는 문장에 asserts 가 없음`] : []; }
/* 테이블별 규칙: [테이블, 행 검사 함수(row, DB) → 문제 문자열 배열] */
/* 위기 선택지 성향 (자동 공략이 방침에 따라 고를 때 쓴다, 2026-10-23): safe 안전 · careful 신중(판정 있지만 위험 낮음) · bold 정면 돌파 · greedy 전리품 · team 동료 협력 · escape 후퇴 */
const CR_STYLE = ['safe', 'careful', 'bold', 'greedy', 'team', 'escape'];
const RULES = [
  ['actions', (a, DB) => [
    ...((a.durs||[]).some(n=>!Number.isFinite(n)||n<=0||n>1440) ? ['durs 는 1~1440분 숫자'] : []),
    ...['pay','energy','stress'].filter(k=>a[k]!=null&&!Number.isFinite(a[k])).map(k=>k+' 는 유한한 숫자'),
    ...(a.ai?.base!=null&&!Number.isFinite(a.ai.base)?['ai.base 는 유한한 숫자']:[]),
    ...(a.routineOnly?(a.req||[]).filter(q=>!['hasGuild','noGuild','startBetween','money','injured','adultTarget','notFamily','notDating','dating','targetFree','hasJob','guildMaster','engaged','notCohabit','homeStorage'].includes(q.k)).map(q=>'일과에서 지원하지 않는 조건 '+q.k):[]),
    ...('routineOnly' in a && typeof a.routineOnly!=='boolean' ? ['routineOnly 는 boolean'] : []),
    ...(a.routineOnly && (!a.ai || !(a.show||[]).includes('schedule') || a.hidden || a.target || a.special) ? ['routineOnly 는 대상·특수 행동이 없는 schedule · ai 행동만 가능'] : []),
    ...Object.entries(a.ai?.goal||{}).filter(([id,w])=>!DB.aiGoals[id]||!Number.isFinite(w)).map(([id])=>'ai.goal 값 확인 '+id),
    ...Object.entries(a.ai?.need||{}).filter(([id,w])=>!DB.aiNeeds[id]||!Number.isFinite(w)).map(([id])=>'ai.need 값 확인 '+id),
    ...(a.cat && !DB.actionCats[a.cat] ? [`cat ${a.cat} 없음`] : []),
    ...(!a.hidden && !(a.durs || []).length ? ['durs 비어 있음'] : []),
    ...((a.train || []).filter(g => !DB.ablGroups[g]).map(g => `train ${g} 없음`)),
  ]],
  ['aiJobs', (j, DB) => (j.keys || []).filter(k => !DB.abilities[k]).map(k => `keys ${k} 없음`)],
  ['classes', (c, DB) => [...(c.pool || []).filter(k => !DB.skills[k]).map(k => `pool ${k} 없음`), ...(c.role && !DB.roles[c.role] ? [`role ${c.role} 없음`] : [])]],
  ['gates', (g, DB) => [...(!DB.ranks[g.rank] ? [`rank ${g.rank} 없음`] : []), ...(g.mon && !DB.monsters[g.mon] ? [`mon ${g.mon} 없음`] : []), ...(!DB.regions[g.region] ? [`region ${g.region} 없음`] : [])]],
  ['hunters', (h, DB) => [...(!DB.ranks[h.rank] ? [`rank ${h.rank} 없음`] : []), ...(h.level < 1 ? ['level < 1'] : []), ...Object.entries(h.abl || {}).filter(([k, v]) => !DB.abilities[k] || v < 1 || v > 20).map(([k, v]) => `abl ${k}=${v}`)]],
  ['balance', (b) => (b.proto !== true ? ['proto:true 표시 없음 ([prototype_default])'] : [])],
  /* 외주 데이터용 규칙 */
  ['events', (e, DB) => { const o = [], ON = ['npcInjured', 'npcRaidWin', 'npcRankUp', 'npcDied', 'npcAwaken', 'career:promo', 'career:fired', 'career:hired', 'career:grad', 'career:boom', 'career:slump'];
    if (!['alert', 'msg'].includes(e.ch)) o.push('ch 는 alert · msg'); if (e.ch === 'msg' && (!e.to || !(e.lines || []).length)) o.push('msg 는 to · lines 필요'); if (e.ch === 'alert' && (!e.from || !e.body)) o.push('alert 는 from · body 필요');
    if (e.on && !ON.includes(e.on)) o.push('on 값이 잘못됨: ' + e.on); if (e.on === 'npcDied' && e.ch !== 'alert') o.push('npcDied 는 alert 로');
    if (!e.subj) o.push('subj 없음'); if (!Array.isArray(e.req)) o.push('req 배열 없음'); else e.req.forEach((q, i) => o.push(...reqErrs(q, DB, `req[${i}]`)));
    const C = e.choices || []; if (C.length < 1 || C.length > 4) o.push('선택지는 1~4개');
    C.forEach((c, i) => { if (!c.t || !c.ok) o.push(`선택지 ${i + 1}: t · ok 필요`); if (c.check) { if (!(c.check.dc >= 10 && c.check.dc <= 30)) o.push(`선택지 ${i + 1}: dc 범위 10~30`); if (!c.ng) o.push(`선택지 ${i + 1}: 판정이 있으면 ng 필요`); }
      (c.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`선택지 ${i + 1}: 태그 ${t} 없음`); }); (c.req || []).forEach((q, j) => o.push(...reqErrs(q, DB, `선택지 ${i + 1} req[${j}]`))); });
    if (C.length > 1 && C.every(c => c.check)) o.push('판정 없는 선택지가 하나는 있어야 함');
    if (e.kind && !DB.stopKinds?.[e.kind]) o.push('kind 는 stopKinds(SK_) 중 하나');
    o.push(...assertErrs(e, DB, 'asserts'), ...assertWordErrs(e, [e.body, e.subj, ...(e.lines || []), ...C.flatMap(c => [c.t, c.ok, c.ng])], '문장')); return o; }],
  ['crises', (c, DB) => { const o = []; if (!['fight', 'any', 'boss'].includes(c.when)) o.push('when 은 fight · any · boss'); const C = c.choices || [];
    if (C.length < 2 || C.length > 4) o.push('선택지는 2~4개'); if (!C.some(x => !x.check)) o.push('판정 없는 선택지가 하나는 있어야 함');
    (c.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`태그 ${t} 없음`); });
    C.forEach((x, i) => { (x.tags || []).forEach(t => { if (!DB.mindTags?.[t]) o.push(`선택지 ${i + 1}: 태그 ${t} 없음`); }); if (x.check && !(x.check.dc >= 10 && x.check.dc <= 30)) o.push(`선택지 ${i + 1}: dc 범위`); if (x.check && !x.ng) o.push(`선택지 ${i + 1}: ng 필요`); if (x.style != null && !CR_STYLE.includes(x.style)) o.push(`선택지 ${i + 1}: style 은 ${CR_STYLE.join(' · ')}`); }); return o; }],
  /* K-Hunter-Life 새 테이블 */
  ['storyLines', (l, DB) => { const o = [], ON = /^(act:ACT_[A-Z0-9_]+|cat:ACC_[A-Z]+|move|small:(any|TRAVEL|PT_[A-Z]+)|meet|react:(looksHi|looksLo|jealous)|raid:(enter|zone|fight|hurt|heal|stone|boss|win|lose|retreat)|emo:(EM_[A-Z]+|calm)|day:(start|end|plan)|decide:(raid|rest|again|stop)|retro:MS_[A-Z_]+|farewell|old|prologue|world:(news|rumor))$/;
    if (!ON.test(l.on || '')) o.push('on 값이 잘못됨: ' + l.on); if (!l.text) o.push('text 필요'); if (![1, 2, 3].includes(l.lv ?? 2)) o.push('lv 는 1 · 2 · 3');
    const m = /^(act|cat|emo|retro|small):(.+)$/.exec(l.on || ''); if (m) { const id = m[2], T = { act: 'actions', cat: 'actionCats', emo: 'emotions', retro: 'milestoneTypes', small: 'placeTypes' }[m[1]]; if (!['any', 'TRAVEL', 'calm'].includes(id) && !DB[T]?.[id]) o.push(`on 의 ${id} 없음`); }
    (l.req || []).forEach((q, i) => o.push(...reqErrs(q, DB, `req[${i}]`))); o.push(...assertErrs(l, DB, 'asserts'), ...assertWordErrs(l, [l.text], 'text'));
    if (l.fx) Object.keys(l.fx).filter(k => !['stress', 'energy', 'money', 'emo', 'rel'].includes(k)).forEach(k => o.push('fx 에 쓸 수 없는 키 ' + k)); return o; }],
  ['mindTags', (t, DB) => Object.keys(t.w || {}).filter(k => { const [a, b] = k.split(':'); return a === 'px' ? !DB.ccPersonality[b] : a === 'emo' ? !DB.emotions[b] : a === 'st' ? !['hpLow', 'energyLow', 'stressHigh', 'moneyLow', 'injured', 'sleepy'].includes(b) : a === 'self' ? !['looks', 'skill', 'money', 'belong'].includes(b) : a === 'pol' ? !['risk', 'money', 'team', 'rest'].includes(b) : true; }).map(k => '재료 키 ' + k)],
  ['mindWhy', (w) => [...(![1, -1].includes(w.sign) ? ['sign 은 1 · -1'] : []), ...(!w.text ? ['text 필요'] : [])]],
  ['emoTriggers', (t, DB) => Object.keys(t.fx || {}).filter(k => !DB.emotions[k]).map(k => '감정 ' + k + ' 없음')],
  ['styleTags', (s, DB) => (s.tags || []).filter(t => !DB.mindTags[t]).map(t => '태그 ' + t + ' 없음')],
  ['ccNations', (n, DB) => (n.state && !DB.nationStates?.[n.state] ? ['state 는 nationStates(NS_) 중 하나'] : [])],
  ['traits', (t) => [...(!(t.cost >= -4 && t.cost <= 4) ? ['cost 는 -4~4'] : []), ...(!t.name || !t.desc ? ['name · desc 필요'] : [])]],
  ['items', (it, DB) => [...(it.use ? Object.keys(it.use).filter(k => !['mp', 'hp', 'energy', 'cure'].includes(k)).map(k => 'use 에 쓸 수 없는 키 ' + k) : []), ...(!('price' in it) ? ['price 필요 (값을 매길 수 없으면 null)'] : []),
    ...(it.grade && !DB.itemGrades?.[it.grade] ? ['grade ' + it.grade + ' 없음'] : []), ...(it.slot && !DB.equipSlots?.[it.slot] && !['SLOT_BODY', 'SLOT_HANDS', 'SLOT_RING', 'SLOT_FACE'].includes(it.slot) ? ['slot ' + it.slot + ' 없음'] : []),
    ...(it.slot === 'SLOT_SPECIAL' && !it.special ? ['특수 칸 물건은 special:true'] : []), ...(it.twoHand && it.slot !== 'SLOT_WEAPON' ? ['twoHand 는 무기 칸만'] : []), ...(it.onePiece && it.slot !== 'SLOT_TOP' ? ['onePiece 는 상의 칸만'] : []),
    ...(it.traits || []).filter(t => !DB.itemTraits?.[t]).map(t => '개성 ' + t + ' 없음'), ...(it.sources || []).filter(t => !DB.itemSources?.[t]).map(t => '구하는 곳 ' + t + ' 없음'),
    ...(it.classBook && !DB.classes?.[it.classBook] ? ['classBook ' + it.classBook + ' 없음'] : [])]],
  ['itemTraits', (t, DB) => [...(!['stat', 'check', 'resist', 'situ'].includes(t.kind) ? ['kind 는 stat · check · resist · situ'] : []), ...(t.kind === 'stat' && !DB.baseStats[t.stat] ? ['stat 필요'] : [])]],
  ['constellations', (c, DB) => [...(c.trait && !DB.starTraits?.[c.trait] ? ['성향 ' + c.trait + ' 없음'] : []), ...(c.cls && !DB.classes?.[c.cls]?.unique ? ['cls 는 고유 클래스(unique)여야 함'] : [])]],
  ['classes', (c, DB) => (c.unique && c.star && !DB.constellations?.[c.star] ? ['star ' + c.star + ' 없음'] : [])],
  ['starMessages', (m) => (!m.on || !m.text ? ['on · text 필요'] : [])],
  ['placeTypes', (t, DB) => [...(t.group && !['life', 'hunter', 'shop', 'public', 'move', 'nature', 'etc'].includes(t.group) ? ['group 값: ' + t.group] : []), ...(t.where && !['all', 'city', 'metro', 'rare'].includes(t.where) ? ['where 값: ' + t.where] : []),
    ...(t.sources || []).filter(x => !DB.itemSources?.[x]).map(x => '구하는 곳 ' + x + ' 없음'), ...(!t.name ? ['name 필요'] : [])]],
  ['placeTags', (t) => (!t.name ? ['name 필요'] : [])],
  ['monsters', (m, DB) => { const r = m.ranks; const bad = r && (!Array.isArray(r) || r.length !== 2 || !DB.ranks[r[0]] || !DB.ranks[r[1]] || DB.ranks[r[0]].lv < DB.ranks[r[1]].lv);
    return [...(!m.rank && !r ? ['rank 또는 ranks 필요'] : []), ...(bad ? ['ranks 는 [약한 쪽, 센 쪽] 등급 두 개'] : []), ...(m.size && !DB.monsterSizes?.[m.size] ? ['size ' + m.size + ' 없음'] : []),
      ...(m.tags || []).filter(x => !DB.monsterTags?.[x]).map(x => '꼬리표 ' + x + ' 없음'), ...[...(m.weak || []), ...(m.resist || [])].filter(x => !DB.elements?.[x]).map(x => '약점/저항 ' + x + ' 없음'),
      ...(m.habitats || []).filter(x => !DB.gateInteriors?.[x]).map(x => '지형 ' + x + ' 없음'), ...(m.boss != null && typeof m.boss !== 'boolean' ? ['boss 는 true · false'] : [])]; }],
  ['items', (it, DB) => [...(it.matCat && !DB.monsterCats?.[it.matCat] ? ['matCat ' + it.matCat + ' 없음'] : []), ...(it.matPart && !DB.matParts?.[it.matPart] ? ['matPart ' + it.matPart + ' 없음'] : [])]],
  ['places', (() => { const seen = new Map(); return (pl, DB) => { const k = pl.region + '|' + pl.name, d = seen.get(k); if (!d) seen.set(k, pl.id);
    return [...(!DB.placeTypes?.[pl.type] ? ['type ' + pl.type + ' 없음'] : []), ...(!DB.regions?.[pl.region] ? ['region ' + pl.region + ' 없음'] : []), ...(!pl.name || pl.name.length > 24 ? ['name 1~24자'] : []),
      ...(!pl.desc || pl.desc.length > 60 ? ['desc 1~60자'] : []), ...(!['local', 'region', 'national'].includes(pl.scale) ? ['scale 은 local · region · national'] : []), ...(typeof pl.real !== 'boolean' ? ['real 은 true · false'] : []),
      ...(pl.tags || []).filter(x => !DB.placeTags?.[x]).map(x => '꼬리표 ' + x + ' 없음'), ...(d && d !== pl.id ? ['같은 지역에 같은 이름: ' + d] : [])]; }; })()],
  ['sysShop', (x) => (!(x.coin >= 1) ? ['coin(코인 가격) 필요'] : [])],
  ['skills', (k) => [...(!['class', 'common', 'unique', 'monster'].includes(k.scope) ? ['scope 는 class · common · unique · monster'] : []), ...(!['액티브', '패시브'].includes(k.kind) ? ['kind 는 액티브 · 패시브'] : [])]],
  ['hearTexts', (h) => [...(!['npcInjured', 'npcRaidWin', 'npcRankUp', 'npcDied', 'npcAwaken', 'career:promo', 'career:fired', 'career:hired', 'career:grad', 'career:boom', 'career:slump', 'guildSign', 'guildLeave'].includes(h.on) ? ['on 값이 잘못됨: ' + h.on] : []), ...(!h.text || !h.text.includes('{a}') ? ['text 에 {a} 필요'] : [])]],
  ['gateInteriors', (g) => (!g.name ? ['name 필요'] : [])],
  /* 2026-10-24 전투 개편 대비 선택 필드 */
  ['monsters', (m, DB) => { const e = []; if (m.stat && typeof m.stat !== 'object') e.push('stat 은 {hp,atk,def,spd}');
    if (m.group && (!Array.isArray(m.group) || m.group.length !== 2 || m.group[0] > m.group[1])) e.push('group 은 [최소, 최대]');
    (m.attacks || []).forEach((a, i) => { if (!a.name) e.push(`attacks[${i}] name 필요`); if (a.kind && !DB.attackKinds?.[a.kind]) e.push(`attacks[${i}] kind ${a.kind} 없음`); if (a.el && !DB.elements?.[a.el]) e.push(`attacks[${i}] el ${a.el} 없음`); (a.se || []).forEach(x => { if (!DB.statusEffects?.[x.se]) e.push(`attacks[${i}] se ${x.se} 없음`); }); });
    (m.phases || []).forEach((ph, i) => { if (!(ph.hp > 0 && ph.hp < 1)) e.push(`phases[${i}] hp 는 0~1`); }); return e; }],
  ['skills', (k, DB) => { const e = [], T = ['self', 'ally', 'allies', 'enemy', 'enemies', 'area'];
    if (k.target && !T.includes(k.target)) e.push('target 은 ' + T.join(' · ')); if (k.cls && !DB.classes[k.cls]) e.push(`cls ${k.cls} 없음`);
    if (k.kind2 && !DB.attackKinds?.[k.kind2]) e.push(`kind2 ${k.kind2} 없음`); if (k.el && !DB.elements?.[k.el]) e.push(`el ${k.el} 없음`);
    (k.se || []).forEach(x => { if (!DB.statusEffects?.[x.se]) e.push(`se ${x.se} 없음`); }); return e; }],
  ['classes', (c, DB) => [...Object.keys(c.stats || {}).filter(s => !DB.baseStats[s]).map(s => `stats ${s} 없음`), ...(c.keys || []).filter(a => !DB.abilities?.[a]).map(a => `keys ${a} 없음`),
    ...(c.next || []).filter(n => !DB.classes[n.to]).map(n => `next ${n.to} 없음`), ...(c.traits || []).filter(t => !DB.traits?.[t]).map(t => `traits ${t} 없음`)]],
  /* '최대한 많이' 선택 필드의 참조 검사 (2026-10-24). miss(목록, 표) = 그 표에 없는 ID */
  ...(() => { const miss = (DB, a, tb) => (Array.isArray(a) ? a : a ? [a] : []).filter(x => typeof x === 'string' && !DB[tb]?.[x]);
    const chk = (DB, o, spec) => spec.flatMap(([f, tb]) => miss(DB, o[f], tb).map(x => `${f} ${x} 없음`));
    const one = (v, list, f) => (v != null && !list.includes(v) ? [`${f} 값: ${v}`] : []);
    return [
      ['monsters', (m, DB) => [...chk(DB, m, [['skills', 'skills'], ['immune', 'statusEffects'], ['absorb', 'elements'], ['weak', 'elements'], ['resist', 'elements'], ['leader', 'monsters'], ['minions', 'monsters'], ['preys', 'monsters'], ['predators', 'monsters'], ['rivals', 'monsters'], ['allies', 'monsters'], ['mats', 'matParts'], ['terrains', 'terrains'], ['habitats', 'gateInteriors'], ['regions', 'regions'], ['gateKinds', 'gateKinds']]),
        ...(m.summon || []).flatMap(x => miss(DB, x.mon, 'monsters').map(v => `summon ${v} 없음`)),
        ...one(m.ai, ['aggressive', 'defensive', 'cowardly', 'territorial', 'swarm', 'ambush', 'guardian', 'berserk', 'cunning'], 'ai'), ...one(m.active, ['day', 'night', 'all'], 'active'),
        ...miss(DB, m.moves, 'combatMoves').map(v => `moves ${v} 없음 (combatMoves)`), ...(m.mrole && !DB.monsterRoles?.[m.mrole] ? [`mrole ${m.mrole} 없음`] : []),
        ...(m.size && !DB.monsterSizes?.[m.size] ? [`size ${m.size} 없음`] : []), ...one(m.target, ['near', 'weak', 'back', 'random'], 'target'),
        ...(m.pack && (!Array.isArray(m.pack) || m.pack.length !== 2 || m.pack[0] > m.pack[1] || m.pack[0] < 1) ? ['pack 은 [최소, 최대]'] : [])]],
      /* 전투 (2026-10-24, data/combat.js) */
      ['combatMoves', (x, DB) => [...(!x.name ? ['name 필요'] : []), ...one(x.kind, ['attack', 'heal', 'buff', 'debuff', 'taunt'], 'kind'), ...one(x.target, ['enemy', 'enemies', 'ally', 'allies', 'self'], 'target'),
        ...one(x.stat, ['atk', 'mag'], 'stat'), ...one(x.when, ['allyLow', 'selfLow', 'crowd', 'notTarget', 'start', 'always'], 'when'), ...(x.el && !DB.elements?.[x.el] ? [`el ${x.el} 없음`] : []),
        ...(x.se || []).flatMap(e => DB.statusEffects?.[e.se] ? [] : [`se ${e.se} 없음`]), ...(x.kind === 'attack' && !(x.power >= 0) ? ['attack 은 power 필요'] : []), ...(x.kind === 'heal' && !(x.heal > 0) ? ['heal 은 heal 필요'] : [])]],
      ['monsterRoles', (x) => [...(!x.name ? ['name 필요'] : []), ...one(x.target, ['near', 'weak', 'back', 'random'], 'target')]],
      ['skills', (k, DB) => [...miss(DB, k.move ? [k.move] : [], 'combatMoves').map(v => `move ${v} 없음 (combatMoves)`), ...miss(DB, k.domains, 'skillDomains').map(v => `domains ${v} 없음`),
        ...one(k.scope, ['class', 'common', 'unique', 'monster'], 'scope'), ...one(k.kind, ['액티브', '패시브'], 'kind'),
        ...(k.move && k.kind === '패시브' ? ['패시브는 move 대신 cstat'] : []), ...(k.cstat && typeof k.cstat !== 'object' ? ['cstat 은 {hp, atk …}'] : []),
        ...Object.keys(k.checks || {}).filter(a => !DB.abilities?.[a] && !DB.baseStats?.[a]).map(a => `checks ${a} 없음`),
        ...((k.move || k.cstat) && k.domains && !k.domains.includes('SD_COMBAT') ? ['move · cstat 이 있으면 domains 에 SD_COMBAT'] : [])]],
      ['classes', (c, DB) => [...chk(DB, c, [['roles', 'roles'], ['passive', 'skills'], ['from', 'classes'], ['affinity', 'elements'], ['weakEl', 'elements'], ['el', 'elements'], ['guildPref', 'guilds']]), ...(c.learn || []).flatMap(x => miss(DB, x.skill, 'skills').map(v => `learn ${v} 없음`)),
        ...Object.keys(c.statReq || {}).filter(k => !DB.baseStats[k]).map(k => `statReq ${k} 없음`), ...Object.keys(c.ablReq || {}).filter(k => !DB.abilities?.[k]).map(k => `ablReq ${k} 없음`)]],
      ['skills', (k, DB) => [...chk(DB, k, [['classes', 'classes'], ['cleanse', 'statusEffects'], ['combo', 'skills'], ['acts', 'actions'], ['book', 'items']]), ...(k.evolve || []).flatMap(x => miss(DB, x.to, 'skills').map(v => `evolve ${v} 없음`)),
        ...(k.summon || []).flatMap(x => miss(DB, x.mon, 'monsters').map(v => `summon ${v} 없음`)), ...one(k.range, ['melee', 'near', 'far'], 'range'),
        ...(k.req ? [...miss(DB, k.req.skill, 'skills'), ...miss(DB, k.req.cls, 'classes')].map(v => `req ${v} 없음`) : [])]],
      ['placeTypes', (t, DB) => [...chk(DB, t, [['acts', 'actions'], ['tags', 'placeTags']])]],
      ['places', (t, DB) => [...chk(DB, t, [['type', 'placeTypes'], ['region', 'regions'], ['near', 'places'], ['parent', 'places'], ['guild', 'guilds'], ['items', 'items'], ['events', 'events'], ['tags', 'placeTags']]), ...one(t.status, ['open', 'closed', 'ruined', 'gate', 'moved'], 'status')]],
      ['gateInteriors', (g, DB) => chk(DB, g, [['monsters', 'monsters'], ['cats', 'monsterCats']])],
      /* 장비 구조 · 나머지 표 (2026-10-24) */
      ['equipSlots', (x, DB) => [...chk(DB, x, [['covers', 'bodyParts'], ['slotsWith', 'equipSlots']]), ...one(x.group, ['weapon', 'armor', 'acc', 'special'], 'group')]],
      ['itemGrades', (x, DB) => chk(DB, x, [['traitPool', 'itemTraits'], ['sources', 'itemSources']])],
      ['itemTraits', (x, DB) => [...chk(DB, x, [['pair', 'itemTraits'], ['grades', 'itemGrades'], ['cats', 'itemCats'], ['slots', 'equipSlots']]), ...one(x.kind, ['stat', 'check', 'resist', 'situ', 'life', 'social', 'curse'], 'kind')]],
      ['itemSources', (x, DB) => chk(DB, x, [['where', 'placeTypes']])],
      ['traits', (x, DB) => [...chk(DB, x, [['ban', 'traits'], ['with', 'traits'], ['se', 'statusEffects']]), ...Object.keys(x.stats || {}).filter(k => !DB.baseStats[k]).map(k => `stats ${k} 없음`), ...Object.keys(x.abl || {}).filter(k => !DB.abilities?.[k]).map(k => `abl ${k} 없음`)]],
      ['guilds', (x, DB) => [...chk(DB, x, [['rivals', 'guilds'], ['allies', 'guilds'], ['branches', 'regions'], ['territory', 'regions'], ['tier', 'guildTiers'], ['sym', 'crestSyms']]), ...one(x.type, ['corp', 'union', 'public', 'party', 'cult', 'crime'], 'type')]],
      ['roles', (x, DB) => chk(DB, x, [['gear', 'itemCats']])],
      ['injuryTypes', (x, DB) => chk(DB, x, [['parts', 'bodyParts'], ['se', 'statusEffects'], ['cure', 'items']])],
      ['emotions', (x, DB) => [...chk(DB, x, [['opposite', 'emotions']]), ...one(x.group, ['good', 'bad', 'neutral'], 'group')]],
      ['actions', (x, DB) => chk(DB, x, [['items', 'items'], ['out', 'items']])],
      ['elements', (x, DB) => chk(DB, x, [['opposite', 'elements'], ['se', 'statusEffects'], ['terrains', 'terrains']])],
      ['monsterCats', (x, DB) => chk(DB, x, [['weak', 'elements'], ['resist', 'elements'], ['mats', 'matParts']])],
      ['statusEffects', (x, DB) => chk(DB, x, [['cure', 'items'], ['el', 'elements']])],
      ['starBlessings', (x, DB) => chk(DB, x, [['cls', 'classes'], ['trait', 'starTraits']])],
      ['lookScoreFx', (x, DB) => [...(!DB.ccLook[x.look] ? [`look ${x.look} 없음`] : []), ...(!DB.lookOpts?.[x.opt] ? [`opt ${x.opt} 없음`] : []), ...Object.keys(x.aps || {}).filter(k => !DB.lookScores[k]).map(k => `aps ${k} 없음`)]],
      ['skills', (k, DB) => [...(k.scope === 'common' && !k.cat ? ['공용 스킬은 cat(skillCats) 필요'] : []), ...(k.cat && !DB.skillCats?.[k.cat] ? [`cat ${k.cat} 없음`] : []), ...(k.tier != null && !(k.tier >= 1 && k.tier <= 5) ? ['tier 는 1~5'] : [])]],
      ['classes', (c, DB) => [...(c.tier != null && !(c.tier >= 1 && c.tier <= 5) ? ['tier 는 1~5'] : []), ...(c.rarity != null && !(c.rarity >= 1 && c.rarity <= 5) ? ['rarity 는 1~5'] : []), ...((c.tier || 1) <= 1 && !c.unique && c.pick > (c.pool || []).length ? ['pick 이 pool 보다 많음'] : [])]],
      ['constellations', (x, DB) => chk(DB, x, [['rivals', 'constellations'], ['likes', 'mindTags'], ['hates', 'mindTags']])],
      ['items', (it, DB) => [...chk(DB, it, [['cls', 'classes'], ['resist', 'elements'], ['immune', 'statusEffects'], ['el', 'elements'], ['kind2', 'attackKinds']]), ...one(it.legal, ['legal', 'grey', 'illegal'], 'legal')]],
    ]; })(),
  ['statusEffects', (x) => [...(!x.name ? ['name 필요'] : []), ...(x.kind && !['buff', 'debuff'].includes(x.kind) ? ['kind 는 buff · debuff'] : [])]],
  ['terrains', (x) => (!x.name ? ['name 필요'] : [])],
  ['gateInteriors', (g, DB) => (g.terrain && !DB.terrains?.[g.terrain] ? [`terrain ${g.terrain} 없음`] : [])],
  ['placeTypes', (t, DB) => (t.terrain && !DB.terrains?.[t.terrain] ? [`terrain ${t.terrain} 없음`] : [])],
  ['places', (t, DB) => (t.terrain && !DB.terrains?.[t.terrain] ? [`terrain ${t.terrain} 없음`] : [])],
  ['gatePlacePool', (p, DB) => [...(!DB.regions[p.region] ? [`region ${p.region} 없음`] : []), ...(!(p.n > 0) ? ['n 없음'] : []), ...(!/^pool\/pl_[A-Z]+\.js$/.test(p.file || '') ? ['file 은 pool/pl_<시도>.js'] : [])]],
  ['regions', (r) => [...(!Array.isArray(r.geo) || r.geo.length !== 2 ? ['geo [경도, 위도] 필요'] : []), ...(!r.prov ? ['prov(시도 지도 키) 필요'] : [])]],
  ['objectives', (o) => [...(!['long', 'mid', 'short'].includes(o.term) ? ['term'] : []), ...(o.term === 'short' && !o.days ? ['단기는 days 필요'] : []), ...(!['rank', 'level', 'money', 'rep', 'cleared', 'raids', 'trainHours', 'social', 'stressBelow', 'req'].includes(o.measure) ? ['measure 값'] : [])]],
];

function check(DB, dup) {
  const errs = [...(dup || [])], warns = [];
  const ids = new Set(), prefixes = new Set();
  for (const t of Object.values(DB)) for (const id of Object.keys(t)) { ids.add(id); prefixes.add(prefixOf(id)); }
  const skip = id => RUNTIME.some(p => id === p || id.startsWith(p + '_') || id.startsWith(p));
  const check = (id, where) => { if (!ID_RE.test(id) || skip(id)) return; if (!prefixes.has(prefixOf(id))) return; if (!ids.has(id)) errs.push(`${where}: 없는 ID ${id}`); };
  const walk = (v, where, depth) => {
    if (depth > 8 || v == null) return;
    if (typeof v === 'string') return check(v, where);
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${where}[${i}]`, depth + 1));
    if (typeof v === 'object') for (const [k, x] of Object.entries(v)) { check(k, `${where}.${k}(키)`); walk(x, `${where}.${k}`, depth + 1); }
  };
  for (const [tn, t] of Object.entries(DB)) for (const [id, row] of Object.entries(t)) for (const [k, v] of Object.entries(row)) if (k !== 'id') walk(v, `${tn}.${id}.${k}`, 0);
  for (const [tn, fn] of RULES) for (const [id, row] of Object.entries(DB[tn] || {})) for (const p of fn(row, DB)) errs.push(`${tn}.${id}: ${p}`);
  const rows = Object.values(DB).reduce((a, t) => a + Object.keys(t).length, 0);
  return { errs, warns, stats: { tables: Object.keys(DB).length, rows } };
}

  root.VALIDATE = { check, RULES, RUNTIME, reqErrs, REQ_K, assertErrs, implies };
})(typeof window !== 'undefined' ? window : globalThis);
