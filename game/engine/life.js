/* =========================================================
   engine/life.js — 고비 회고 · 나이 · 끝 · 일대기 · 이어 가기 (K-Hunter-Life, 2026-10-23)
   LIFE   매 진행 뒤 상태를 비교해 고비(첫 공략 · 승급 · 연애 · 큰 부상 · 동료의 죽음 · 이적 …)를 찾는다.
          고비에서 잠깐 멈추고 짧은 회고(원하면 한 줄 남기기). 나이 · 은퇴 생각 · 노화. 끝나면 일대기 한 장을 만든다.
   LEGACY A 같은 세계에서 이어 가기(새 인물 · 플레이 중 인물 바꾸기) · B 기록관(시점 · 관계를 골라 새 게임에 넣기) · C 파일로 내보내기 · 가져오기
   ========================================================= */
const LIFE = (() => {
  const BA = () => DB.balance.BAL_AGE;
  /* 지금 상태 요약 (비교용) */
  function snap() {
    const p = G.player, rel = {}; (G.relations || []).forEach(r => rel[r.id] = r.status || '');
    const dead = {}; (G.relations || []).forEach(r => { const a = G.ai?.[r.id], h = P(r.id); if ((a && a.dead) || h?.status === '사망') dead[r.id] = 1; });
    return { rank: p.rank, level: p.level, guild: p.guild || null, master: typeof isMaster === 'function' && isMaster(), raids: G.stats?.raids || 0, cleared: G.stats?.cleared || 0, rel, dead, inj: Math.max(0, ...(G.injuries || []).map(j => j.sev || 1)), day: G.day };
  }
  function watch() {
    if (!G || G.dead) return; const s1 = snap(), s0 = G._snap; G._snap = s1; if (!s0) { initSnaps(); return; }
    const p = G.player, rk = id => DB.ranks[id]?.lv ?? 20;
    if (s1.raids > 0 && s0.raids === 0) milestone('MS_FIRST_RAID', { days: G.day - (G.startDay ?? 0) });
    if (s1.cleared > 0 && s0.cleared === 0) { const g = lastGate(); milestone('MS_FIRST_CLEAR', { gate: g?.name || '', rank: g ? DB.ranks[g.rank].name : '' }); }
    if (rk(s1.rank) < rk(s0.rank)) { EMO.on('rankUp'); MIND.drift('rankUp'); milestone('MS_RANKUP', { rank: DB.ranks[s1.rank].name }); primeSnap(); }
    if (s1.level > s0.level) EMO.on('levelUp');
    if (s1.guild !== s0.guild) {
      if (s1.guild && !s0.guild) { EMO.on('joinGuild'); MIND.drift('joinGuild'); milestone(s1.master ? 'MS_GUILD_FOUND' : 'MS_GUILD_JOIN', { guild: guildName(s1.guild) }); }
      else if (s1.guild && s0.guild) milestone('MS_GUILD_MOVE', { guild: guildName(s1.guild) });
      else EMO.on('leaveGuild');
    }
    for (const [id, stt] of Object.entries(s1.rel)) {
      const o = s0.rel[id]; if (o === stt) continue; const nm = nameOf(id);
      if (stt === 'RS_DATING') { EMO.on('loveStart'); MIND.drift('loveStart'); milestone('MS_LOVE', { who: nm }); }
      else if (stt === 'RS_SPOUSE') { EMO.on('married'); MIND.drift('married'); milestone('MS_MARRY', { who: nm }); }
      else if (stt === 'RS_EX' && DB.relStatus[o]?.romance) { EMO.on('loveEnd'); MIND.drift('loveEnd'); milestone('MS_LOVE_END', { who: nm }); }
    }
    for (const id of Object.keys(s1.dead)) if (!s0.dead[id]) {
      const r = relOf(id), fam = r && isFam(r); if (r) ensureRel(r);
      const close = r && (fam || (r.to?.RD_CLOSE || 0) >= 35 || DB.relStatus[r.status]?.romance || ['REL_FRIEND', 'REL_COLLEAGUE', 'REL_LEADER', 'REL_MENTOR', 'REL_DISCIPLE'].includes(r.rel));
      if (close) { EMO.on(fam ? 'famDeath' : 'allyDeath'); MIND.drift(fam ? 'famDeath' : 'allyDeath'); milestone(fam ? 'MS_FAM_DEATH' : 'MS_ALLY_DEATH', { who: nameOf(id) }); }
      else { STORY.add('news', `${nameOf(id)}의 부고를 전해 듣는다. 한 번 같이 게이트에 들어갔던 사람이다.`, 2); EMO.add('EM_SAD', 6); }
    }
    if (s1.inj >= 3 && s0.inj < 3) { const j = (G.injuries || []).slice().sort((a, b) => (b.sev || 0) - (a.sev || 0))[0]; EMO.on('injuryBig'); MIND.drift('injuryBig'); milestone('MS_BIG_INJURY', { what: j ? injTxt(j) : '중상' }); }
    if (s1.day !== s0.day) { daily(); }
  }
  function lastGate() { const L = (G.story || []).filter(x => x.k === 'raid' && x.ok === true).slice(-1)[0]; return L ? DB.gates[L.gid] || (G.gateArc || []).find(a => a.id === L.gid) : null; }
  function initSnaps() { G.snaps = G.snaps || {}; if (!G.snaps.rookie) G.snaps.rookie = hunterSnap(); G.persBase = G.persBase || { ...(G.bio?.pers || {}) }; G.startDay = G.startDay ?? G.day; }
  function primeSnap() { G.snaps = G.snaps || {}; G.snaps.prime = hunterSnap(); }
  /* 기록관에 넣을 수 있는 헌터 모습 */
  function hunterSnap() {
    const p = clone(G.player); ['form', 'career', 'byRank'].forEach(k => delete p[k]);
    return { at: nowAbs(), date: dateStr(G.day), hunter: p, pers: clone(G.bio?.pers || {}), look: clone(G.bio?.look || {}), bg: clone(G.bio?.bg || {}), money: G.money };
  }
  const dateStr = d => { const x = dateOf(d); return `${x.y}.${String(x.m).padStart(2, '0')}.${String(x.d).padStart(2, '0')}`; };

  /* 고비: 기록하고, 설정에 따라 멈춰 회고를 띄운다 */
  function milestone(id, ctx = {}) {
    const T = DB.milestoneTypes[id]; if (!T || !G) return;
    const L = STORY.lines('retro:' + id), text = STORY.fill(L.length ? pick(L).text : T.name, ctx);
    const M = G.milestones || (G.milestones = []), m = { t: nowAbs(), id, text, note: null, age: G.player.age, rank: G.player.rank };
    M.push(m); STORY.add('mile', `— ${T.name} — ${text}`, 1, { ms: id }); TELLER.note(3, true);
    pushHistory(T.name, text.slice(0, 60));
    const mode = G.prefs?.play?.stop || 'big', on = EVT.stopKindOn('SK_MILESTONE');
    if (on && (T.big || mode === 'each')) { (G.retroQ = G.retroQ || []).push(M.length - 1); if (!G.retroOpen) G.retroOpen = { i: M.length - 1, id }; }
  }
  function note(i, line) {
    const m = (G.milestones || [])[i]; if (m) { m.note = String(line || '').slice(0, 120) || null; if (m.note) STORY.add('mile', `${MIND.callName()}의 한 줄 — "${m.note}"`, 1); }
    G.retroQ = (G.retroQ || []).filter(x => x !== i); const nx = G.retroQ[0]; G.retroOpen = nx != null && G.milestones[nx] ? { i: nx, id: G.milestones[nx].id } : null;
  }

  /* 한 번 스친 사람(아는 헌터)은 오래 엮이지 않으면 잊는다 — 관계 · 아는 것 · 기억 목록이 끝없이 쌓이지 않게 (QA 1년: 관계 1천 명) */
  function tidyRelations() {
    const t = nowAbs(), keep = new Set([...(G.party?.members || []), ...(G.team?.members || []), ...(G.prefs?.play?.homePeople || []), homeOf().partner].filter(Boolean)), recent = new Set((G.mem || []).filter(m => t - m.t < 60 * 1440).map(m => m.who));
    const before = G.relations.length;
    G.relations = G.relations.filter(r => { if (r.rel !== 'REL_ACQ' || keep.has(r.id) || recent.has(r.id) || DB.relStatus[r.status]?.romance || r.status === 'RS_EX') return true; ensureRel(r); return (r.to?.RD_CLOSE || 0) >= 20 || (r.to?.RD_RIVAL || 0) >= 30 || (r.to?.RD_GRUDGE || 0) >= 30; });
    const live = new Set(G.relations.map(r => r.id)); if (G.know) Object.keys(G.know).forEach(id => { if (!live.has(id) && !DB.hunters[id]) delete G.know[id]; });
    if (G.mindMem) G.mindMem = G.mindMem.filter(m => live.has(m.who));
    return before - G.relations.length;
  }
  /* 하루마다: 나이 · 1년 · 은퇴 생각 · 노화 */
  function daily() {
    if (typeof ACTIVE !== 'undefined') ACTIVE.daily();
    if (dateOf(G.day).d === 1) tidyRelations();
    const p = G.player, dt = dateOf(G.day), by = parseInt(String(p.birth || '').slice(0, 4), 10);
    if (by) { const bm = parseInt(String(p.birth).slice(5, 7), 10) || 1, bd = parseInt(String(p.birth).slice(8, 10), 10) || 1, age = dt.y - by - ((dt.m < bm || (dt.m === bm && dt.d < bd)) ? 1 : 0); if (age !== p.age) { p.age = age; if (age > 0 && G.day > (G.startDay ?? 0)) STORY.add('day', `${MIND.callName()}, ${age}세 생일.`, 2); } }
    const yrs = Math.floor((G.day - (G.startDay ?? G.day)) / 365); if (yrs > 0 && (G.day - (G.startDay ?? 0)) % 365 === 0) milestone('MS_YEAR', { years: yrs });
    const A = BA(); if (!p.age) return;
    if (p.age >= A.illnessFrom) { const yearly = A.gompA * Math.exp(A.gompB * p.age), daily = 1 - Math.pow(1 - Math.min(0.9, yearly), 1 / 365); if (Math.random() < daily || p.age >= A.maxAge) { STORY.add('mile', `${MIND.callName()}이(가) 병으로 쓰러진다.`, 1); die(p.age >= 75 ? '노환' : '병'); return; } }
    if (p.age >= A.retireThink && dt.d === 1 && !G.flags?.noRetire && DB.events.EV_B_RETIRE && !EVT.pending().some(x => x.ev.id === 'EV_B_RETIRE')) {
      const pr = A.retireBase * 30 * (1 + (p.age - A.retireThink) / 4); if (Math.random() < pr) triggerEvent('EV_B_RETIRE', hhmm(G.time));
    }
  }
  /* 은퇴 이벤트의 효과 (applyFx 의 retire) */
  function retireNow() { if (raidActive() || G.dead) return; G.retirePending = false; milestone('MS_RETIRE', {}); retire(); }

  /* ---------- 끝: 일대기 한 장 ---------- */
  function finish(kind, cause) {
    if (!G || G._finished) return; G._finished = true;
    try { if (kind === 'retire') epilogue(); } catch (e) { console.error(e); }
    G.snaps = G.snaps || {}; G.snaps.last = hunterSnap(); if (!G.snaps.prime) G.snaps.prime = G.snaps.last;
    G.bioCard = card(kind, cause);
    try { LEGACY.archiveAdd(); } catch (e) { console.error(e); }
  }
  /* 은퇴 뒤 노년을 짧게 흘린다 (하루 시뮬레이션 없이 해마다 한두 줄) */
  function epilogue() {
    const A = BA(), p = G.player; let age = p.age || 40, y = dateOf(G.day).y; const out = [];
    for (let k = 0; k < 60; k++) {
      y++; age++; const L = STORY.lines('old');
      for (let j = 0; j < A.epilogueLines && L.length; j++) out.push(STORY.fill(pick(L).text, { year: y }));
      const yearly = age >= A.illnessFrom ? A.gompA * Math.exp(A.gompB * age) : 0.001; if (Math.random() < yearly || age >= A.maxAge) break;
    }
    out.push(`${y}년, ${p.name}이(가) ${age}세로 세상을 떠난다.`);
    G.oldAge = { lines: out.slice(-14), deathYear: y, deathAge: age };
    out.slice(-14).forEach(s => STORY.add('old', s, 1));
  }
  function card(kind, cause) {
    const p = G.player, M = G.milestones || [], C = G.chron || [], d0 = G.startDay ?? 0, d1 = G.day;
    /* 장(章): 고비마다 나눈다 */
    const cuts = M.filter(m => ['MS_FIRST_CLEAR', 'MS_GUILD_JOIN', 'MS_GUILD_MOVE', 'MS_GUILD_FOUND', 'MS_MARRY', 'MS_RANKUP', 'MS_ALLY_DEATH', 'MS_BIG_INJURY', 'MS_RETIRE'].includes(m.id));
    const bounds = [{ t: d0 * 1440, title: '각성', id: 'start' }, ...cuts.map(m => ({ t: m.t, title: DB.milestoneTypes[m.id].name, id: m.id, text: m.text }))];
    const used = new Set();
    const chapters = bounds.map((b, i) => {
      const t1 = (bounds[i + 1]?.t ?? d1 * 1440 + G.time), d0c = Math.floor(b.t / 1440), d1c = Math.floor(t1 / 1440), last = i === bounds.length - 1;
      const rows = C.filter(c => c.d >= d0c && (last ? c.d <= d1c : c.d < d1c) && !used.has(c.d)); rows.forEach(c => used.add(c.d));
      const sum = k => rows.reduce((a, c) => a + (c[k] || 0), 0);
      return { n: i + 1, title: b.title, from: dateStr(Math.floor(b.t / 1440)), to: dateStr(Math.floor(t1 / 1440)), text: b.text || '', raids: sum('raid'), wins: sum('win'), trainH: Math.round(sum('tr') / 60), workH: Math.round(sum('wk') / 60), notes: rows.flatMap(r => r.notes || []).slice(0, 3) };
    }).filter((c, i, a) => i === a.length - 1 || c.raids || c.text || c.notes.length);
    const people = (G.relations || []).map(r => { ensureRel(r); return { id: r.id, name: nameOf(r.id), rel: relName(r.rel) || '', status: DB.relStatus[r.status]?.name || '', close: Math.round(r.to?.RD_CLOSE || r.close || 0), romance: Math.round(r.to?.RD_ROMANCE || 0) }; }).sort((a, b) => (b.close + b.romance) - (a.close + a.romance)).slice(0, 8);
    const emo = (G.emoLog || []); const step = Math.max(1, Math.ceil(emo.length / 80)); const graph = emo.filter((x, i) => i % step === 0).map(x => ({ t: x.t, c: x.c }));
    const records = { days: d1 - d0, years: Math.floor((d1 - d0) / 365), raids: G.stats?.raids || 0, cleared: G.stats?.cleared || 0, rank: p.rank, level: p.level, money: G.money, peakRank: bestRank(), injuries: M.filter(m => m.id === 'MS_BIG_INJURY').length };
    return { name: p.name, sex: p.sex, kind, cause, born: p.birth, endDate: dateStr(G.dead?.day ?? d1), age: p.age, chapters, records, people, emo: graph, pers: (G.persLog || []).slice(-20), milestones: M.map(m => ({ id: m.id, text: m.text, note: m.note, date: dateStr(Math.floor(m.t / 1440)) })), oldAge: G.oldAge || null, farewell: null };
  }
  function bestRank() { const L = (G.milestones || []).filter(m => m.id === 'MS_RANKUP').map(m => m.rank); return [G.player.rank, ...L].sort((a, b) => (DB.ranks[a]?.lv ?? 20) - (DB.ranks[b]?.lv ?? 20))[0]; }
  function farewell(line) { if (!G.bioCard) return; G.bioCard.farewell = String(line || '').slice(0, 200); LEGACY.archiveAdd(); try { const saves = store.get(SAVE_KEY, []); saves.forEach(s => { if (s.data?.created === G.created) s.data = G; }); store.set(SAVE_KEY, saves); } catch (e) { } }
  return { tidyRelations, watch, milestone, note, daily, finish, card, farewell, retireNow, hunterSnap, primeSnap, snap, dateStr };
})();

/* =========================================================
   LEGACY — 이어 가기 · 기록관 · 파일
   ========================================================= */
const LEGACY = (() => {
  const AKEY = 'khl.archive.v1';
  const list = () => store.get(AKEY, []);
  /* B. 기록관에 지금 헌터를 보관 (끝날 때 자동, 수동으로도) */
  function archiveAdd() {
    if (!G) return null; const A = list(), aid = 'AR_' + G.created + '_' + (G.player.id || '');
    const e = { aid, kind: 'khl-hunter', v: 1, name: G.player.name, sex: G.player.sex, birth: G.player.birth, rank: G.player.rank, level: G.player.level, cls: G.player.cls, ended: G.dead ? { kind: G.dead.kind, cause: G.dead.cause, date: LIFE.dateStr(G.dead.day) } : null,
      snaps: G.snaps || { last: LIFE.hunterSnap() }, card: G.bioCard || null, world: G.created, savedAt: Date.now() };
    if (!e.snaps.last) e.snaps.last = LIFE.hunterSnap();
    const i = A.findIndex(x => x.aid === aid); if (i >= 0) A[i] = e; else A.unshift(e);
    while (!store.set(AKEY, A) && A.length > 1) A.pop();
    return e;
  }
  function remove(aid) { store.set(AKEY, list().filter(x => x.aid !== aid)); }
  /* C. 파일로 내보내기 · 가져오기 */
  function exportJSON(aid) { const e = aid ? list().find(x => x.aid === aid) : archiveAdd(); return e ? JSON.stringify(e) : null; }
  function exportFile(aid) {
    const s = exportJSON(aid); if (!s) return false; const e = JSON.parse(s), a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([s], { type: 'application/json' })); a.download = `hunter_${e.name}.khl.json`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); return true;
  }
  function importJSON(text) {
    let e; try { e = JSON.parse(text); } catch (x) { return { error: '파일을 읽을 수 없습니다.' }; }
    if (!e || e.kind !== 'khl-hunter' || !e.snaps || !(e.snaps.last || e.snaps.rookie)) return { error: 'K-Hunter-Life 헌터 파일이 아닙니다.' };
    e.aid = e.aid || 'AR_IMP_' + Date.now(); e.imported = Date.now(); const A = list().filter(x => x.aid !== e.aid); A.unshift(e); store.set(AKEY, A); return { ok: true, entry: e };
  }
  /* B. 새 게임에 넣기: 시점(rookie · prime · last) · 관계를 정해 NPC 로 */
  const REL_OF = { fam: 'REL_OBRO', mentor: 'REL_MENTOR', disciple: 'REL_DISCIPLE', rival: 'REL_RIVAL', ex: 'REL_ACQ', colleague: 'REL_COLLEAGUE', friend: 'REL_FRIEND', none: null };
  const REL_NAME = { fam: '가족', mentor: '스승', disciple: '제자', rival: '라이벌', ex: '옛 연인', colleague: '동료', friend: '친구', none: '모르는 사이' };
  function placeInto(entry, when, relKind) {
    const sn = entry.snaps[when] || entry.snaps.last || entry.snaps.rookie; if (!sn) return null;
    G.archSeq = (G.archSeq || 0) + 1; const id = 'HN_A' + String(G.archSeq).padStart(4, '0'), h = clone(sn.hunter);
    h.id = id; h.guild = h.guild && DB.guilds[h.guild] ? h.guild : null; h.region = h.region && DB.regions[h.region] ? h.region : G.player.region; h.px = sn.pers || null; h.fromArchive = entry.aid; h.status = '정상'; h.retired = false;
    if (h.cls && !DB.classes[h.cls]) h.cls = null; h.skills = (h.skills || []).filter(s => DB.skills[s[0]]); h.traits = (h.traits || []).filter(t => DB.traits[t]);
    if (!DB.ranks[h.rank]) h.rank = 'RANK_20'; if (!DB.roles[h.roleMain]) h.roleMain = 'ROLE_MDPS';
    G.genHunters = G.genHunters || {}; G.genHunters[id] = h;
    const rel = REL_OF[relKind]; if (rel) {
      const r = { id, rel: relKind === 'fam' ? ((h.age || 30) > (G.player.age || 25) ? (h.sex === '여' ? 'REL_OSIS' : 'REL_OBRO') : (h.sex === '여' ? 'REL_SISTER' : 'REL_BROTHER')) : rel, close: relKind === 'rival' ? 15 : relKind === 'ex' ? 30 : 55, trust: relKind === 'rival' ? 20 : 55, note: `기록관 · ${REL_NAME[relKind]}` };
      G.relations.push(r); ensureRel(r); if (relKind === 'ex') { r.status = 'RS_EX'; relAdd(r, 'RD_ROMANCE', 15, 'both'); } if (relKind === 'rival') relAdd(r, 'RD_RIVAL', 45, 'both');
    }
    return id;
  }
  /* A. 같은 세계: 세계 쪽 상태 키 */
  const WORLD_KEYS = ['day', 'time', 'slot', 'gates', 'genGates', 'genSeq', 'gpUsed', 'gnUsed', 'gateArc', 'news', 'newsSeq', 'rumors', 'npcRel', 'ai', 'hState', 'gState', 'gStat', 'simQ', 'simDay', 'simStat', 'pop', 'market', 'auction', 'wagg', 'happen', 'genHunters', 'genNpcs', 'archSeq', 'cast', 'legacySeq', 'world', 'myGuildArc'];
  /* 끝난(또는 바꾸는) 헌터를 그 세계의 NPC 로 남긴다 */
  function toNpc(oldG, status) {
    const P0 = clone(oldG.player); oldG.legacySeq = (oldG.legacySeq || 0) + 1; const id = 'HN_L' + String(oldG.legacySeq).padStart(4, '0');
    P0.id = id; P0.px = clone(oldG.bio?.pers || {}); P0.status = status || '정상'; P0.retired = status === '은퇴'; P0.legacy = { created: oldG.created, until: LIFE.dateStr(oldG.day) };
    oldG.genHunters = oldG.genHunters || {}; oldG.genHunters[id] = P0;
    (oldG.cast = oldG.cast || []).push({ id, name: P0.name, from: LIFE.dateStr(oldG.startDay ?? 0), to: LIFE.dateStr(oldG.day), end: status || '바꿈' });
    return id;
  }
  /* A-1. 끝난 뒤 같은 세계에서 새 인물(커마)로: 커마가 끝나면 gameFromCreation 이 만든 G 에 옛 세계를 옮긴다 */
  function adoptWorld(oldG, relKind) {
    const nG = G, prevId = toNpc(oldG, oldG.dead?.kind === 'retire' ? '은퇴' : oldG.dead ? '사망' : '정상');
    if (oldG.dead && oldG.dead.kind !== 'retire') { (oldG.ai = oldG.ai || {})[prevId] = Object.assign({}, oldG.ai?.[prevId] || {}, { dead: true }); }
    WORLD_KEYS.forEach(k => { if (oldG[k] !== undefined) nG[k] = oldG[k]; });
    nG.startDay = nG.day; nG.lastDay = nG.day; nG.legacyOf = (oldG.legacyOf || []).concat([{ id: prevId, name: oldG.player.name, end: oldG.dead?.kind || null }]);
    nG.player.awakenedDate=LIFE.dateStr(nG.day).replaceAll('.','-');nG.player.awakened=nG.player.awakenedDate.slice(0,7);
    Object.values(nG.genGates || {}).forEach(g => DB.gates[g.id] = g);
    const rel = REL_OF[relKind]; if (rel) { const r = { id: prevId, rel: relKind === 'fam' ? 'REL_OBRO' : rel, close: 55, trust: 60, note: `전 주인공 · ${REL_NAME[relKind]}` }; nG.relations.push(r); ensureRel(r); }
    SIM.adopt && SIM.adopt(nG.created);
    STORY.add('sys', `같은 세계 — ${oldG.player.name}의 이야기 다음. ${oldG.player.name}은(는) 이제 이 세계의 ${oldG.dead ? (oldG.dead.kind === 'retire' ? '은퇴한 원로' : '기억') : '사람'}으로 남는다.`, 1);
    newsAdd('헌터', '', oldG.dead ? `${oldG.player.name} 헌터 ${oldG.dead.kind === 'retire' ? '은퇴 뒤 근황' : '추모 기사'}` : `${oldG.player.name} 헌터 근황`);
    return prevId;
  }
  /* A-2. 플레이 중 다른 인물로 바꾸기. 원래 헌터는 NPC 가 되어 성격대로 계속 산다 */
  function candidates() {
    return (G.relations || []).map(r => H(r.id)).filter(h => h && h.id !== G.player.id && h.status !== '사망' && !(G.ai?.[h.id]?.dead) && (DB.hunters[h.id] || G.genHunters?.[h.id]));
  }
  function switchTo(hid) {
    const nh = H(hid); if (!nh || hid === G.player.id || raidActive()) return false;
    PLAY.pause(); const oldName = G.player.name, oldRel = relOf(hid); ensureRel(oldRel || {});
    const prevId = toNpc(G, '정상'); const oldBio = clone(G.bio || {});
    /* 새 주인공 */
    const np = clone(nh); np.id = hid; delete np.px;
    const raw = MIND.pxOf(nh), pers = {}; Object.entries(raw).forEach(([k, v]) => pers[k] = Math.max(1, Math.min(10, Math.round(v * 4.5 + 5.5))));
    if (G.genHunters?.[hid]) delete G.genHunters[hid];
    if (G.ai?.[hid]) { const a = G.ai[hid]; if (a.money != null) G.money = Math.max(0, Math.round(a.money)); delete G.ai[hid]; } else G.money = Math.max(G.money * 0.2, 1500000);
    G.player = np; G.bio = { pers, look: {}, bg: {}, pers0: pers }; G.persBase = { ...pers }; G.persF = {}; G.persLog = []; G.selfHeard = {};
    G.emo = null; G.milestones = []; G.snaps = {}; G._snap = null; G.chron = []; G.emoLog = [];
    G.cond = { hp: 100, mp: 100, energy: 80, sleepDebt: 0, stress: 25, mood: '보통', injury: '없음' }; G.injuries = [];
    G.inv = clone(DB.ccRules.RULE_START.startItems || []); G.ledger = [[`${dateOf(G.day).m}/${dateOf(G.day).d}`, '이어 받은 돈', G.money]]; G.history = [[LIFE.dateStr(G.day), `${np.name}의 이야기 시작`, `${oldName}에게서 이어 받음`]];
    const rel = [{ id: prevId, rel: oldRel?.rel === 'REL_LEADER' ? 'REL_COLLEAGUE' : (oldRel?.rel || 'REL_ACQ'), close: Math.round(oldRel?.from?.RD_CLOSE ?? 40), trust: Math.round(oldRel?.from?.RD_TRUST ?? 40), note: `전 주인공 ${oldName}` }];
    if (np.guild) guildMembers(np.guild).filter(m => m.id !== np.id && m.id !== prevId).slice(0, 8).forEach(m => rel.push({ id: m.id, rel: 'REL_COLLEAGUE', close: 30, trust: 35, note: '같은 길드' }));
    G.relations = rel; G.relations.forEach(ensureRel); if (oldRel?.status && DB.relStatus[oldRel.status]?.romance) G.relations[0].status = oldRel.status;
    G.threads = []; G.alerts = (G.alerts || []).filter(m => !m.ev); G.home = { type: 'HOU_ONE', region: np.region || G.player.region }; G.loc = { region: G.home.region, pt: 'PT_HOME' };
    G.schedule = schedFromTpl(np.guild ? 'SCH_GUILD' : 'SCH_SOLO'); G.goals = []; G.routine = null; G.play = null; G.startDay = G.day; G.stats = {}; G.statusPublic = clone(DB.ccRules.RULE_START.statusPublic);
    G.legacyOf = (G.legacyOf || []).concat([{ id: prevId, name: oldName, end: null }]);
    STORY.add('sys', `이제부터 ${np.name}의 이야기. ${oldName}은(는) 이 세계에서 자기 성격대로 계속 산다.`, 1);
    LIFE.watch(); return prevId;
  }
  return { list, archiveAdd, remove, exportJSON, exportFile, importJSON, placeInto, adoptWorld, toNpc, candidates, switchTo, REL_NAME, WORLD_KEYS };
})();
