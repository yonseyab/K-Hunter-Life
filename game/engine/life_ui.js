/* =========================================================
   engine/life_ui.js — 인생 화면 · 일대기 · 전국 현황 · 기록관 · 설정 묶음 (K-Hunter-Life, 2026-10-23)
   인생 화면이 중심: 가운데 이야기 창, 위에 시계와 재생 · 배속, 오른쪽에 상태, 아래에 끼어들기 버튼.
   이야기 창은 붙이기만 한다 (매 틱 화면 전체를 다시 그리지 않는다).
   클릭은 data-k* 속성으로 이 파일이 따로 받는다.
   ========================================================= */
const LIFEUI = (() => {
  let bound = false;
  const PP = () => prefs().play;
  const fmtT = t => { const d = dateOf(Math.floor(t / 1440)); return { d: `${d.m}/${d.d}`, t: hhmm(t % 1440) }; };
  const KIND_LABEL = { act: '', move: '', small: '', meet: '', react: '', raid: '공략', event: '사건', choice: '선택', emo: '감정', pers: '성격', day: '', news: '소식', mile: '고비', sys: '', up: '성장', decide: '', prologue: '', old: '' };

  function enter() { prefs(); bind(); if (!G.story || !G.story.length) { STORY.prologue(); LIFE.watch(); STORY.dayStart(); } PLAY.S.speed = PP().speed || 1; }
  function bind() {
    if (bound) return; bound = true;
    STORY.on(appendLine); PLAY.onUi(onPlayUi);
    document.addEventListener('click', onClick); document.addEventListener('change', onChange);
    document.addEventListener('keydown', e => { if (UI.mode !== 'app' || !G || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.code === 'Space' && UI.screen === 'life') { e.preventDefault(); toggle(); } });
  }
  function toggle() { if (PLAY.S.running) PLAY.pause(); else PLAY.start('run'); }

  /* ---------- 상단 재생 막대 ---------- */
  function controls() {
    const S = PLAY.S, sp = DB.balance.BAL_PLAY.speeds;
    return `<div class="playbar" id="playbar" role="group" aria-label="재생">
      <button class="pbtn main" data-kplay="toggle" aria-label="${S.running ? '일시정지' : '재생'}" title="재생 · 일시정지 (Space)">${S.running ? '⏸' : '▶'}</button>
      ${sp.map(x => `<button class="pbtn ${S.speed === x && S.mode !== 'next' ? 'on' : ''}" data-kspeed="${x}" aria-pressed="${S.speed === x}">×${x}</button>`).join('')}
      <button class="pbtn ${S.mode === 'next' && S.running ? 'on' : ''}" data-kplay="next" title="다음 사건까지 빠르게">⏭</button>
      <span class="pstate">${S.running ? (S.mode === 'next' ? '다음 사건까지…' : `재생 중 · 하루 ${Math.round(DB.balance.BAL_PLAY.secPerDay / S.speed)}초`) : S.stop ? '멈춤' : '일시정지'}</span></div>`;
  }
  function onPlayUi(S) {
    if (!G || UI.mode !== 'app') return;
    if (G.dead) { render(); return; }
    if (UI.screen === 'raid') { render(); return; }
    const pb = document.getElementById('playbar'); if (pb) pb.outerHTML = controls();
    const dt = dateOf(G.day), cd = document.getElementById('clockD'); if (cd) cd.innerHTML = `${dt.y}년 ${dt.m}월 ${dt.d}일 (${dt.w}) <span class="num">${hhmm(G.time)}</span>`;
    const cs = document.getElementById('clockS'); if (cs) cs.textContent = nowDoing();
    if (UI.screen === 'life') { const sd = document.getElementById('lifeSide'); if (sd) sd.innerHTML = sideHTML(); const pe = document.getElementById('lifePend'); if (pe) pe.innerHTML = pendHTML(); const ib = document.getElementById('lifeBar'); if (ib) ib.innerHTML = barHTML(); }
    const eg = document.querySelector('.egauge'); if (eg && !S.running) { /* 멈췄을 때만 전체 상단 갱신 */ renderTop(); }
  }
  function nowDoing() {
    if (raidActive()) return '게이트 안'; const b = blockAt(nowAbs()); const a = b && DB.actions[b.act];
    return a ? `${a.name} · ${placeName(locOf())}` : `자유 시간 · ${placeName(locOf())}`;
  }
  /* ---------- 이야기 창 ---------- */
  function lineHTML(it) {
    const f = fmtT(it.t), lab = KIND_LABEL[it.k] || '';
    if (it.k === 'day' && it.dayStart != null) return `<div class="sl sday" data-k="day"><span>${esc(it.s)}</span></div>`;
    return `<div class="sl k-${it.k}${it.lv === 1 ? ' l1' : ''}"><span class="tm">${f.t}</span>${lab ? `<span class="tag">${lab}</span>` : ''}<span class="tx">${esc(it.s)}</span></div>`;
  }
  function appendLine(it) {
    if (UI.mode !== 'app' || UI.screen !== 'life' || !STORY.visible(it)) return;
    const box = document.getElementById('story'); if (!box) return;
    const near = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
    box.insertAdjacentHTML('beforeend', lineHTML(it));
    while (box.children.length > 500) box.firstElementChild.remove();
    if (near) box.scrollTop = box.scrollHeight;
  }
  function after() { if (UI.screen === 'life') { const box = document.getElementById('story'); if (box) box.scrollTop = box.scrollHeight; } }

  /* ---------- 오른쪽 상태 ---------- */
  function company() {
    if (raidActive()) return UI.raid.party.slice(1).map(p => p.n).join(', ') || '혼자';
    const here = locOf(), out = []; const pt = homeOf().partner; if (pt && here.pt === 'PT_HOME') out.push(nameOf(pt));
    (G.relations || []).forEach(r => { if (out.length >= 3 || r.id === pt) return; const w = npcWhere(r.id); if (w && w.region === here.region && w.pt === here.pt && here.pt !== 'PT_HOME') out.push(nameOf(r.id)); });
    return out.join(', ') || '혼자';
  }
  function sideHTML() {
    const p = G.player, c = G.cond, em = EMO.cur(), E = DB.emotions[em], S = SELF.get(), pl = PLAY.st();
    const row = (k, v, cls) => `<div class="srow"><span>${k}</span><b class="${cls || ''}">${v}</b></div>`;
    return `<div class="sname">${esc(p.name)} <span class="dim">${p.age ? p.age + '세' : ''}</span></div>
      <div class="ssub">${rkBadge(p.rank)} Lv.${p.level} · ${esc(DB.classes[p.cls]?.name || '클래스 미확인')} · ${esc(guildName(p.guild))}</div>
      ${row('HP', Math.round(c.hp ?? 100), (c.hp ?? 100) < 40 ? 'bad' : '')}${row('기력', `${Math.round(c.energy)} / ${energyMax()}`, c.energy < 25 ? 'bad' : c.energy < 50 ? 'warn' : '')}${row('스트레스', Math.round(c.stress), c.stress >= 70 ? 'bad' : '')}${row('돈', won(G.money), G.money < 0 ? 'bad' : '')}
      <div class="srow"><span>감정</span><b><i class="emodot" style="background:${E?.color || '#888'}"></i>${E?.name || '평온'}</b></div>
      ${row('지금', esc(nowDoing()))}${row('같이', esc(company()))}
      ${row('오늘 게이트', (pl.day === G.day ? pl.raids : 0) + '곳')}
      ${(G.injuries || []).length ? row('부상', esc(G.injuries.map(injTxt).slice(0, 2).join(', ')), 'warn') : ''}
      <details class="sself"><summary>스스로 보는 나</summary>${['looks', 'skill', 'money', 'belong'].map(k => `<div class="srow"><span>${({ looks: '외모', skill: '실력', money: '돈', belong: '소속감' })[k]}</span><b>${SELF.label(S[k])}</b></div>`).join('')}<div class="dim" style="font-size:11px">사실 · 성격 · 들은 말로 생깁니다.</div></details>`;
  }
  /* ---------- 답할 사건 · 고비 회고 ---------- */
  function pendHTML() {
    if (G.retroOpen) {
      const m = (G.milestones || [])[G.retroOpen.i]; if (m) {
        const T = DB.milestoneTypes[m.id], days = G.day - (G.startDay ?? G.day);
        return `<div class="kcard retro" role="dialog" aria-label="고비 회고"><div class="kh">고비 — ${esc(T?.name || '')}</div><div class="kb">${esc(m.text)}</div>
          <div class="dim" style="font-size:12px;margin:6px 0">각성 ${days}일째 · ${DB.ranks[G.player.rank].name}급 Lv.${G.player.level} · 공략 ${G.stats?.raids || 0}회 (클리어 ${G.stats?.cleared || 0}) · 기분 ${EMO.name()}</div>
          <div class="row" style="gap:6px"><input id="retroLine" maxlength="120" placeholder="한 줄 남기기 (선택)" style="flex:1"><button class="btn pri" data-kretro="save">남기고 계속</button><button class="btn" data-kretro="skip">넘어가기</button></div></div>`;
      }
    }
    const L = EVT.pending(); if (!L.length) return '';
    const x = L[0], ev = x.ev, T = EVT.texts(x), subj = T.subj, body = T.body;
    const from = ev.ch === 'alert' ? (DB.senders[ev.from]?.name || nameOf(ev.from) || '') : nameOf(x.tgt);
    return `<div class="kcard pend" role="dialog" aria-label="답할 사건"><div class="kh">${ev.ch === 'alert' ? '알림' : '메시지'} · ${esc(from)} — ${esc(subj)} ${L.length > 1 ? `<span class="dim">외 ${L.length - 1}건</span>` : ''}</div><div class="kb">${esc(body)}</div>
      <div class="kch">${ev.choices.map((c, i) => EVT.okChoice(c, x.tgt) ? `<button class="choice" data-kpick="${i}"><div>${esc(c.t)}</div><div class="ck">${checkText(c)}</div></button>` : '').join('')}</div>
      <div class="row" style="gap:6px;margin-top:6px"><button class="btn" data-kauto="1" title="성격 · 감정 · 상태로 판단 엔진이 고릅니다">${esc(MIND.callName())}에게 맡기기</button><span class="dim" style="font-size:11px">${DB.stopKinds[EVT.kindOf(ev)]?.name || ''} 사건 · 멈춤은 설정에서</span></div></div>`;
  }
  function barHTML() {
    const n = EVT.pending().length, man = ROUTINE.state().mode === 'manual';
    return `<button class="btn ${n ? 'pri' : ''}" data-kgo="pend" ${n ? '' : 'disabled'}>선택지 직접 고르기${n ? ` (${n})` : ''}</button>
      <button class="btn" data-go="schedule">오늘 일정 바꾸기</button><button class="btn" data-go="gates">공략 직접 하기</button>
      <button class="btn" data-kset="판단 · 방침">방침 바꾸기</button><button class="btn" data-go="home">관리 화면</button>
      <button class="btn ${man ? 'club' : ''}" data-kplay="resume" title="일정 · 결정을 다시 캐릭터에게 맡깁니다">${man ? '다시 맡기기 (일정 수동 중)' : '다시 맡기기'}</button>`;
  }
  /* ---------- 인생 화면 ---------- */
  V.life = () => {
    const lv = PP().detail || 'detail', L = (G.story || []).filter(STORY.visible).slice(-300);
    return `<div class="life">
      <div class="lmain"><div class="h-row" style="margin-bottom:8px"><h1 class="h1">인생</h1><div class="row" style="gap:4px" role="group" aria-label="문장 상세도">${[['summary', '요약'], ['normal', '보통'], ['detail', '자세히']].map(([k, n]) => `<button class="btn sm ${lv === k ? 'pri' : ''}" data-kdetail="${k}" aria-pressed="${lv === k}">${n}</button>`).join('')}</div></div>
        <div id="story" class="story" role="log" aria-live="polite" aria-label="이야기 창">${L.map(lineHTML).join('')}</div>
        <div id="lifePend">${pendHTML()}</div>
        <div id="lifeBar" class="lbar" role="group" aria-label="끼어들기">${barHTML()}</div></div>
      <aside class="lside" id="lifeSide" aria-label="상태">${sideHTML()}</aside></div>`;
  };
  /* ---------- 일대기 ---------- */
  function bioHTML(C, live) {
    const rec = C.records || {}, emoBar = (C.emo || []).length ? `<div class="emobar" aria-label="감정 흐름">${C.emo.map(e => `<i style="background:${DB.emotions[e.c]?.color || '#666'}" title="${DB.emotions[e.c]?.name || ''}"></i>`).join('')}</div><div class="dim" style="font-size:11px">${vals('emotions').map(e => `<i class="emodot" style="background:${e.color}"></i>${e.name}`).join(' ')}</div>` : '<div class="muted">기록이 아직 짧습니다.</div>';
    const base = G.persBase || {}, cur = G.bio?.pers || {};
    return `<div class="bio"><div class="bhead"><h1 class="h1">${esc(C.name)}</h1><div class="sub">${esc(C.born || '')} 출생 · ${live ? '지금' : esc(C.endDate || '')}${C.kind ? ` · ${C.kind === 'retire' ? '은퇴' : '사망'}${C.cause && C.kind !== 'retire' ? ` (${esc(C.cause)})` : ''}` : ''}</div></div>
      <div class="grid g4" style="margin:10px 0">${[['헌터로 산 날', `${rec.days || 0}일`], ['공략', `${rec.raids || 0}회 · 클리어 ${rec.cleared || 0}`], ['최고 등급', `${DB.ranks[rec.peakRank]?.name || '-'}급`], ['레벨', rec.level || 1]].map(([k, v]) => `<div class="panel pb stat"><div class="lab"><span>${k}</span></div><div class="big" style="font-size:18px">${v}</div></div>`).join('')}</div>
      <div class="panel" style="margin-bottom:10px"><div class="ph">장(章)</div><div class="pb">${(C.chapters || []).map(c => `<div class="chap"><b>${c.n}장 · ${esc(c.title)}</b> <span class="dim">${c.from} ~ ${c.to}</span>${c.text ? `<div>${esc(c.text)}</div>` : ''}<div class="dim" style="font-size:12px">공략 ${c.raids}회 (클리어 ${c.wins}) · 훈련 ${c.trainH}시간 · 일 ${c.workH}시간</div>${c.notes.map(n => `<div class="dim" style="font-size:12px">· ${esc(n)}</div>`).join('')}</div>`).join('') || '<span class="muted">아직 장이 나뉘지 않았습니다.</span>'}</div></div>
      <div class="grid g2" style="align-items:start;gap:10px">
        <div class="panel"><div class="ph">함께한 사람들</div><div class="pb">${(C.people || []).map(p => `<div class="srow"><span>${esc(p.name)} <span class="dim">${esc(p.rel)}${p.status ? ' · ' + esc(p.status) : ''}</span></span><b>${p.close}</b></div>`).join('') || '<span class="muted">-</span>'}</div></div>
        <div class="panel"><div class="ph">감정 흐름</div><div class="pb">${emoBar}</div></div>
        <div class="panel"><div class="ph">성격 변화</div><div class="pb">${vals('ccPersonality').map(x => { const a = base[x.id] ?? cur[x.id], b = cur[x.id]; if (a == null || b == null) return ''; return `<div class="srow"><span>${x.a} ↔ ${x.b}</span><b>${a === b ? b : `${a} → ${b}`}</b></div>`; }).join('')}${(C.pers || []).slice(-6).map(l => `<div class="dim" style="font-size:12px">· ${esc(DB.ccPersonality[l.ax]?.a || '')}·${esc(DB.ccPersonality[l.ax]?.b || '')} ${l.from}→${l.to} (${esc(l.why)})</div>`).join('')}</div></div>
        <div class="panel"><div class="ph">고비</div><div class="pb">${(C.milestones || []).slice(-14).map(m => `<div style="font-size:12px"><span class="dim">${m.date}</span> ${esc(DB.milestoneTypes[m.id]?.name || '')} — ${esc(m.text)}${m.note ? `<div class="note">"${esc(m.note)}"</div>` : ''}</div>`).join('') || '<span class="muted">-</span>'}</div></div>
      </div>
      ${C.oldAge ? `<div class="panel" style="margin-top:10px"><div class="ph">노년</div><div class="pb">${C.oldAge.lines.map(l => `<div>${esc(l)}</div>`).join('')}</div></div>` : ''}
      ${C.farewell ? `<div class="farewell">"${esc(C.farewell)}"</div>` : ''}</div>`;
  }
  V.bio = () => { const live = !G.dead, C = live ? LIFE.card(null, null) : (G.bioCard || LIFE.card(G.dead.kind, G.dead.cause)); return `<div class="h-row"><h1 class="h1">일대기${live ? ' · 지금까지' : ''}</h1></div>${bioHTML(C, live)}`; };
  V.gameover = () => {
    const C = G.bioCard || LIFE.card(G.dead.kind, G.dead.cause);
    return `<div style="max-width:980px;margin:0 auto"><div class="dim" style="letter-spacing:.4em;text-align:center">${G.dead.kind === 'retire' ? 'RETIRED' : 'IN MEMORIAM'}</div>${bioHTML(C, false)}
      ${C.farewell ? '' : `<div class="panel" style="margin-top:12px"><div class="ph">작별 한마디</div><div class="pb row" style="gap:6px"><input id="farewell" maxlength="200" placeholder="${esc(C.name)}에게 남길 말" style="flex:1"><button class="btn pri" data-kfare="1">남기기</button></div></div>`}
      <div class="panel" style="margin-top:12px"><div class="ph">다음</div><div class="pb row" style="gap:8px;flex-wrap:wrap">
        <label class="field">이 헌터와의 관계 <select id="contRel">${Object.entries(LEGACY.REL_NAME).map(([k, n]) => `<option value="${k}" ${k === 'disciple' ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <button class="btn pri" data-kcont="new">같은 세계에서 새 인물로</button><button class="btn" data-kgo2="archive">기록관</button><button class="btn" data-totitle="1">타이틀</button>
        <div class="dim" style="font-size:12px;width:100%">${esc(C.name)}은(는) 이 세계에 ${G.dead.kind === 'retire' ? '은퇴한 원로' : '기억'}로 남습니다. 기록관에도 보관했습니다 (다른 새 게임에 넣을 수 있음).</div></div></div></div>`;
  };
  /* ---------- 전국 현황 (집계) ---------- */
  V.world = () => {
    const N = SCALE.national(), Z = G.pop?.scale, A = G.wagg || { log: [], sum: { n: 0, clear: 0, brk: 0 } }, L = A.log.slice(0, 7), loc = SCALE.localRegions();
    const open = vals('gates').filter(g => gateSt(g.id).status === 'open').length, f = n => Math.round(n).toLocaleString('ko-KR');
    const provRows = Object.keys(SCALE.provs()).map(k => { const n = L.reduce((a, r) => a + (r.prov[k]?.[0] || 0), 0), b = L.reduce((a, r) => a + (r.prov[k]?.[1] || 0), 0); return [k, n, b]; }).sort((a, b) => b[1] - a[1]);
    return `<div class="h-row"><h1 class="h1">전국 현황</h1><div class="sub">1999년 첫 게이트 이후 27년 · 내 주변은 개별 게이트, 나머지는 집계</div></div>
      <div class="grid g4" style="margin-bottom:12px">${[['인구', f(N.pop) + '명'], ['각성자 (0.5%)', f(N.awake) + '명'], ['활동 헌터 (0.2%)', f(N.active) + '명'], ['하루 게이트 발생', '약 ' + f(N.gatesPerDay) + '개']].map(([k, v]) => `<div class="panel pb stat"><div class="lab"><span>${k}</span></div><div class="big" style="font-size:18px">${v}</div></div>`).join('')}</div>
      <div class="grid g2" style="align-items:start;gap:10px">
        <div class="panel"><div class="ph">최근 ${L.length}일 · 시도별 (개별 게이트 범위 제외)</div><div class="pb"><table class="tbl"><thead><tr><th>시도</th><th class="r">발생</th><th class="r">브레이크</th></tr></thead><tbody>${provRows.map(([k, n, b]) => `<tr><td>${SCALE.provName(k)}</td><td class="r num">${f(n)}</td><td class="r num ${b ? 'warn' : ''}">${f(b)}</td></tr>`).join('')}</tbody></table>
          <div class="dim" style="font-size:12px;margin-top:6px">누적 집계: 발생 ${f(A.sum.n)} · 클리어 ${f(A.sum.clear)} · 브레이크 ${f(A.sum.brk)}</div></div></div>
        <div class="panel"><div class="ph">내 주변 (개별 게이트)</div><div class="pb"><div>${loc.map(r => esc(regionName(r))).join(' · ')}</div><div class="dim" style="font-size:12px;margin:6px 0">하루 약 ${f(loc.reduce((a, r) => a + SCALE.gatesPerDayIn(r), 0))}개 발생 · 지금 열린 게이트 ${open}개</div>
          ${Z ? `<div class="srow"><span>생활권 인구</span><b>${f(Z.pop)}명</b></div><div class="srow"><span>생활권 각성자</span><b>${f(Z.awake)}명</b></div><div class="srow"><span>그중 활동 헌터</span><b>${f(Z.active)}명</b></div><div class="dim" style="font-size:12px">상세 시뮬레이션: 각성자 ${f(Z.nA)}명 (1명 = 실제 ${Z.wA.toFixed(2)}명) · 일반인 표본 ${f(Z.nC)}명</div>` : ''}
          <button class="btn" data-go="gates" style="margin-top:8px">게이트 목록</button></div></div>
      </div>`;
  };
  /* ---------- 기록관 ---------- */
  function archiveListHTML(inGame) {
    const A = LEGACY.list();
    return A.length ? A.map(e => `<div class="slot"><div class="info"><b>${esc(e.name)} ${rkBadge(e.rank || 'RANK_20')}${e.ended ? ` <span class="chip">${e.ended.kind === 'retire' ? '은퇴' : '사망'}</span>` : ''}${e.imported ? ' <span class="chip">가져옴</span>' : ''}</b><span>Lv.${e.level || 1} · ${esc(DB.classes[e.cls]?.name || '')} ${e.ended ? '· ' + esc(e.ended.date) : ''} · 시점 ${['rookie', 'prime', 'last'].filter(k => e.snaps?.[k]).map(k => ({ rookie: '신입', prime: '전성기', last: '마지막' })[k]).join(' · ')}</span></div>
      ${e.card ? `<button class="btn sm" data-karbio="${esc(e.aid)}">일대기</button>` : ''}<button class="btn sm" data-karexp="${esc(e.aid)}">파일로 내보내기</button><button class="btn sm" data-kardel="${esc(e.aid)}">${UI.arDel === e.aid ? '정말 지우기' : '지우기'}</button></div>`).join('') : '<div class="pb muted">보관한 헌터가 없습니다. 헌터의 이야기가 끝나면 자동으로 보관됩니다.</div>';
  }
  V.archive = () => `<div class="h-row"><h1 class="h1">기록관</h1><div class="sub">끝난 헌터를 보관했다가 다른 새 게임에 넣습니다 (커마 '확인' 단계에서 시점 · 관계 선택)</div></div>
    <div class="panel" style="max-width:860px"><div class="ph">보관한 헌터 <span class="row" style="gap:6px"><button class="btn sm" data-karnow="1">지금 헌터 보관</button><label class="btn sm">파일 가져오기<input type="file" accept=".json,application/json" data-karimp="1" hidden></label></span></div>${archiveListHTML(true)}</div>`;

  /* ---------- 설정 묶음 ---------- */
  const TABS = ['재생 · 멈춤', '판단 · 방침', '이야기', '게임 설정', '환경설정', '헌터 관리'];
  const sel = (key, cur, opts) => `<select data-kpref="${key}">${opts.map(([v, n]) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
  V.settings = () => {
    const tab = TABS.includes(UI.settingsTab) ? UI.settingsTab : TABS[0], P = PP(), A = prefs().autoRaid;
    let body = '';
    if (tab === '재생 · 멈춤') body = `<div class="pb grid" style="gap:12px">
      <div class="field"><label>언제 멈출까</label>${sel('play.stop', P.stop, [['none', '안 멈춤 (전부 캐릭터가 결정)'], ['big', '큰 갈림길만'], ['each', '사건마다']])}</div>
      <div class="field"><label>멈출 종류</label><div class="chips">${vals('stopKinds').map(k => `<label class="chk"><input type="checkbox" data-kkind="${k.id}" ${(P.kinds?.[k.id] ?? k.dflt) ? 'checked' : ''}> ${k.name}${k.big ? ' <span class="dim">(큰 갈림길)</span>' : ''}</label>`).join('')}</div></div>
      <div class="field"><label>자동 결정</label>${sel('play.autoDecide', P.autoDecide !== false, [['true', '켬 — 멈추지 않는 사건은 캐릭터가 고른다'], ['false', '끔 — 모든 선택지에서 멈춘다']])}</div>
      <div class="field"><label>배속 기본값</label>${sel('play.speed', P.speed || 1, DB.balance.BAL_PLAY.speeds.map(x => [x, '×' + x]))}</div>
      <p class="muted">×1 = 하루 ${DB.balance.BAL_PLAY.secPerDay}초. 게임을 끈 동안에는 시간이 흐르지 않습니다.</p></div>`;
    else if (tab === '판단 · 방침') body = `<div class="pb grid" style="gap:12px">
      <div class="field"><label>예측 가능성</label>${sel('play.predict', P.predict, [['steady', '거의 성격대로'], ['some', '가끔 의외'], ['often', '자주 의외']])}</div>
      <div class="field"><label>방침 대 성격 <span class="dim">${Math.round((P.policyVsChar ?? 0.4) * 100)}% 방침</span></label><input type="range" min="0" max="1" step="0.1" value="${P.policyVsChar ?? 0.4}" data-kpref="play.policyVsChar" aria-label="방침 대 성격"><div class="dim" style="font-size:11px">0 = 캐릭터 성격대로 · 1 = 정해 둔 방침대로</div></div>
      <div class="field"><label>생활 방침</label>${sel('play.pace', P.pace || 'balance', [['work', '일 위주'], ['balance', '균형'], ['rest', '쉼 위주']])}</div>
      <div class="field"><label>공략 방침</label>${sel('autoRaid.policy', A.policy, Object.entries(AUTORAID.POLICY))}</div>
      <div class="field"><label>게이트 고르기</label>${sel('autoRaid.grade', A.grade, [['easy', '쉬운 게이트'], ['fit', '내 등급에 맞게'], ['hard', '도전']])}</div>
      <div class="field"><label>거리</label>${sel('autoRaid.km', A.km, [5, 10, 20, 40].map(k => [k, k + 'km 안']))}</div>
      <div class="field"><label>후퇴 (파티 평균 HP)</label>${sel('autoRaid.retreat', A.retreat, [20, 35, 50, 65].map(k => [k, k + '% 아래']))}</div>
      <div class="field"><label>파티</label>${sel('autoRaid.minParty', A.minParty, [[1, '혼자도 간다'], [2, '2명 이상'], [3, '3명 이상']])}</div>
      <div class="field"><label>게이트 공략</label>${sel('autoRaid.on', A.on, [['on', '캐릭터가 판단해서 간다'], ['off', '직접만 간다']])}</div>
      <p class="muted">하루 몇 번 같은 고정 제한은 없습니다. 기력 · HP · 감정 · 돈 사정 · 성격으로 그날그날 정합니다.</p></div>`;
    else if (tab === '이야기') body = `<div class="pb grid" style="gap:12px">
      <div class="field"><label>문장 상세도</label>${sel('play.detail', P.detail || 'detail', [['detail', '자세히 — 시간대별 행동 전부'], ['normal', '보통'], ['summary', '요약 — 사건 · 하루 정리만']])}</div>
      <div class="field"><label>이야기꾼</label>${sel('play.teller', P.teller || 'on', [['on', '켬 — 너무 조용하거나 몰리지 않게 살짝 거든다'], ['off', '끔']])}</div></div>`;
    else if (tab === '게임 설정') body = prefsHTML();
    else if (tab === '환경설정') body = settingsOptionsHTML();
    else {
      const C = LEGACY.candidates();
      body = `<div class="pb grid" style="gap:14px">
        <div><b>다른 인물로 바꾸기</b><p class="muted">같은 세계의 아는 헌터로 이어서 플레이합니다. ${esc(G.player.name)}은(는) NPC가 되어 성격대로 계속 삽니다.</p>
          ${C.length ? C.slice(0, 12).map(h => `<div class="srow"><span>${esc(h.name)} ${rkBadge(h.rank)} <span class="dim">${esc(DB.roles[h.roleMain]?.name || '')} · ${esc(guildName(h.guild))}</span></span><button class="btn sm" data-kswitch="${h.id}" ${raidActive() || G.dead ? 'disabled' : ''}>${UI.swArm === h.id ? '정말 바꾸기' : '이 사람으로'}</button></div>`).join('') : '<div class="muted">아는 헌터가 아직 없습니다.</div>'}</div>
        <div><b>기록관 · 파일</b><div class="row" style="gap:6px;margin-top:6px"><button class="btn" data-karnow="1">지금 모습 보관</button><button class="btn" data-karexp="">파일로 내보내기</button></div></div>
        <div><b>은퇴</b><p class="muted">은퇴하면 노년을 짧게 흘린 뒤 일대기 한 장이 남습니다.</p><button class="btn ${UI.retireArm ? 'club' : ''}" data-retire="1" ${raidActive() || G.dead ? 'disabled' : ''}>${UI.retireArm ? '정말 은퇴하기 (다시 누르기)' : '은퇴하기'}</button></div></div>`;
    }
    return `<div class="h-row"><h1 class="h1">설정</h1></div><div class="tabs" role="tablist">${TABS.map(t => `<button role="tab" aria-selected="${tab === t}" data-settingstab="${t}">${t}</button>`).join('')}</div><div class="panel" style="max-width:780px">${body}</div>`;
  };

  /* ---------- 타이틀 · 커마 덧붙임 ---------- */
  const _title = titleHTML;
  titleHTML = function () {
    let h = _title();
    h = h.replace('<button data-title="continue">', `<button data-ktitle="random">무작위 헌터로 시작<small>커마를 전부 무작위로 정하고 바로 시작합니다</small></button>\n        <button data-title="continue">`);
    h = h.replace('<button data-title="credits"', `<button data-ktitle="archive" aria-current="${UI.panel === 'archive'}">기록관</button>\n        <button data-title="credits"`);
    if (UI.panel === 'archive') h = h.replace('<div class="t-right"></div>', `<div class="t-right"><div class="t-panel"><div class="ph">기록관 <span class="row" style="gap:6px"><label class="btn sm">파일 가져오기<input type="file" accept=".json,application/json" data-karimp="1" hidden></label><button class="more" data-tpanel="">닫기</button></span></div>${archiveListHTML(false)}</div></div>`);
    return h;
  };
  const _cc = ccHTML;
  ccHTML = function () {
    let h = _cc(); const cc = UI.cc; if (!cc || cc.step !== CC_STEPS.length - 1) return h;
    const A = LEGACY.list(), adds = cc.archiveAdds || [];
    const box = `<div class="panel" style="margin-top:14px"><div class="ph">기록관에서 인물 넣기 <span class="dim" style="font-weight:400">끝난 헌터를 이 세계의 인물로 — 어느 시점의 모습인지와 새 캐릭터와의 관계</span></div><div class="pb">
      ${UI.continueFrom ? `<div class="srow"><span>같은 세계에서 이어 가기 — 전 주인공 <b>${esc(UI.continueFrom.player.name)}</b></span><span>${esc(LEGACY.REL_NAME[UI.continueRel] || '')}</span></div>` : ''}
      ${A.length ? `<div class="row" style="gap:6px;flex-wrap:wrap"><select id="arPick">${A.map(e => `<option value="${esc(e.aid)}">${esc(e.name)} (${DB.ranks[e.rank]?.name || '?'}급)</option>`).join('')}</select><select id="arWhen"><option value="rookie">신입</option><option value="prime">전성기</option><option value="last" selected>마지막 (은퇴 후)</option></select><select id="arRel">${Object.entries(LEGACY.REL_NAME).map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select><button class="btn" data-karadd="1">넣기</button></div>` : '<div class="muted">보관한 헌터가 없습니다.</div>'}
      ${adds.map((x, i) => { const e = A.find(a => a.aid === x.aid); return `<div class="srow"><span>${esc(e?.name || '?')} · ${({ rookie: '신입', prime: '전성기', last: '마지막' })[x.when]} · ${esc(LEGACY.REL_NAME[x.rel])}</span><button class="btn sm" data-karrm="${i}">빼기</button></div>`; }).join('')}</div></div>`;
    return h.replace('<div class="cc-foot">', box + '<div class="cc-foot">');
  };
  const _gfc = gameFromCreation;
  gameFromCreation = function (cc) {
    _gfc(cc);
    if (UI.continueFrom) { try { LEGACY.adoptWorld(UI.continueFrom, UI.continueRel || 'none'); } catch (e) { console.error(e); } UI.continueFrom = null; }
    (cc.archiveAdds || []).forEach(x => { const e = LEGACY.list().find(a => a.aid === x.aid); if (e) LEGACY.placeInto(e, x.when, x.rel); });
  };

  /* ---------- 클릭 · 변경 ---------- */
  async function onClick(e) {
    const t = e.target.closest('[data-kplay],[data-kspeed],[data-kdetail],[data-kpick],[data-kauto],[data-kretro],[data-kset],[data-kgo],[data-kgo2],[data-kfare],[data-kcont],[data-karbio],[data-karexp],[data-kardel],[data-karnow],[data-karadd],[data-karrm],[data-ktitle],[data-kswitch]');
    if (!t || t.disabled) return; const d = t.dataset;
    if (d.kplay) { if (d.kplay === 'toggle') toggle(); else if (d.kplay === 'next') PLAY.start('next'); else if (d.kplay === 'resume') { ROUTINE.state().mode = 'auto'; ROUTINE.state().planned = -1; PLAY.st().decided = -1; if (UI.screen !== 'life') { UI.screen = 'life'; render(); } PLAY.start('run'); } return; }
    if (d.kspeed) { PLAY.setSpeed(+d.kspeed); PP().speed = +d.kspeed; if (!PLAY.S.running) PLAY.start('run'); return; }
    if (d.kdetail) { PP().detail = d.kdetail; render(); return; }
    if (d.kpick != null || d.kauto) {
      const x = EVT.pending()[0]; if (!x) return; if (d.kauto) EVT.auto(x); else EVT.resolve(x, +d.kpick, 'me');
      G.pendingPick = EVT.pending().some(y => EVT.stopWanted(y.ev)); PLAY.S.stop = null; render(); return;
    }
    if (d.kretro) { LIFE.note(G.retroOpen?.i, d.kretro === 'save' ? (document.getElementById('retroLine')?.value || '') : ''); render(); return; }
    if (d.kset) { UI.settingsTab = d.kset; UI.screen = 'settings'; render(); return; }
    if (d.kgo === 'pend') { const el = document.getElementById('lifePend'); if (el) el.scrollIntoView({ block: 'center' }); return; }
    if (d.kgo2) { UI.screen = d.kgo2; render(); return; }
    if (d.kfare) { LIFE.farewell(document.getElementById('farewell')?.value || ''); render(); return; }
    if (d.kcont) { UI.continueFrom = G; UI.continueRel = document.getElementById('contRel')?.value || 'none'; UI.cc = newCC(); UI.mode = 'create'; $('#root').innerHTML = ''; render(); return; }
    if (d.karbio) { const en = LEGACY.list().find(a => a.aid === d.karbio); if (en?.card) showInfo(`<div style="max-height:75vh;overflow:auto">${bioHTML(en.card, false)}</div>`); return; }
    if (d.karexp != null) { LEGACY.exportFile(d.karexp || null); toast('파일로 내보냈습니다.'); return; }
    if (d.kardel) { if (UI.arDel !== d.kardel) { UI.arDel = d.kardel; render(); return; } LEGACY.remove(d.kardel); UI.arDel = null; render(); return; }
    if (d.karnow) { LEGACY.archiveAdd(); toast('기록관에 보관했습니다.'); render(); return; }
    if (d.karadd) { const cc = UI.cc; (cc.archiveAdds = cc.archiveAdds || []).push({ aid: $('#arPick').value, when: $('#arWhen').value, rel: $('#arRel').value }); render(); return; }
    if (d.karrm != null) { UI.cc.archiveAdds.splice(+d.karrm, 1); render(); return; }
    if (d.kswitch) { if (UI.swArm !== d.kswitch) { UI.swArm = d.kswitch; render(); return; } UI.swArm = null; const ok = LEGACY.switchTo(d.kswitch); if (ok) { UI.screen = 'life'; toast(`이제 ${esc(G.player.name)}의 이야기입니다.`); } $('#root').innerHTML = ''; render(); return; }
    if (d.ktitle === 'random') {
      const go = () => { const cc = newCC(); autoAll(cc); gameFromCreation(cc); enterGame(); toast(`<b>${esc(G.player.name)}</b> — 무작위 헌터로 시작했습니다.`); };
      if (!packsReady()) afterPacks(go); else go(); return;
    }
    if (d.ktitle === 'archive') { UI.panel = UI.panel === 'archive' ? null : 'archive'; render(); return; }
  }
  function onChange(e) {
    const t = e.target; if (!t || !t.dataset) return;
    if (t.dataset.karimp) { const f = t.files && t.files[0]; if (!f) return; f.text().then(txt => { const r = LEGACY.importJSON(txt); toast(r.error ? r.error : `${esc(r.entry.name)}을(를) 기록관에 넣었습니다.`); render(); }); return; }
    if (t.dataset.kkind) { const P = PP(); P.kinds = P.kinds || {}; P.kinds[t.dataset.kkind] = t.checked; return; }
    if (t.dataset.kpref) {
      const [grp, key] = t.dataset.kpref.split('.'), raw = t.value, v = raw === 'true' ? true : raw === 'false' ? false : (raw !== '' && !isNaN(+raw) ? +raw : raw);
      const o = grp === 'play' ? PP() : prefs()[grp]; o[key] = v; if (grp === 'play' && key === 'speed') PLAY.setSpeed(v);
      if (t.type === 'range') render(); else if (grp === 'play' && key === 'detail') render();
    }
  }
  bind();  /* 타이틀 · 커마에서도 data-k* 클릭을 받는다 */
  return { controls, enter, after, sideHTML, pendHTML, lineHTML, bioHTML, toggle };
})();
/* 타이틀은 이 파일보다 먼저 한 번 그려졌다 → 덧붙인 메뉴(무작위 시작 · 기록관)가 보이게 다시 그린다 */
if (typeof UI !== 'undefined' && UI.mode === 'title' && document.getElementById('root')) { cancelAnimationFrame(bgRAF); render(); }
