/* 시뮬레이션 중심 플레이: 방향 · 사건 선택 · 소지품 관리만 직접 조작한다.
   예전 화면의 링크와 동작에도 같은 정책을 적용한다. 엔진 내부 행동은 유지한다. */
const OBSERVE = (() => {
  /* legacy: 옛 직접 조작 화면을 다시 여는 검사용 스위치. 게임에서는 쓰지 않고, 옛 엔진 기능을 화면으로 검사하는 UI 테스트만 켠다 */
  let legacy = false;
  const routes = new Set(['acts', 'party', 'raidteam', 'raidprep', 'raid', 'raidresult', 'schedule', 'alerts', 'messenger']);
  const blocked = ['actdo','actdur','actall','advance','advmenu','locmenu','goto','scout','raid','raidprep','raidgo','rc','tac','retreat','crisis',
    'partyfor','partygo','partyinv','partykick','partyclear','partyjoin','teamfound','teaminv','teamkick','teamdisband','preploadteam','preploadparty','prepmem',
    'schsel','schadd','schdel','schcopy','schtpl','autosched','schedundo','routine-mode','routine-start','routine-stop','rplan','mapdo','mapgo',
    'bid','bidguild','equip','delegate','gshare','recshare','release','poach','thread','alert','reply','choice'];
  const selector = blocked.map(k => '[data-' + k + ']').join(',');
  const directions = { auto: ['성격에 맡기기', null], grow: ['실력 · 승급', 'GOAL_GROW'], money: ['돈 모으기', 'GOAL_WEALTH'],
    rest: ['회복 · 안정', 'GOAL_STABLE'], social: ['사람들과 가까워지기', 'GOAL_PEOPLE'] };
  const route = s => !legacy && routes.has(s) ? (s === 'schedule' ? 'goals' : 'life') : s;
  function invalidate() { ROUTINE.state().planned = null; PLAY.st().decided = -1; }
  function normalize() {
    if (!G || legacy) return;
    const r = ROUTINE.state(); if (r.mode === 'manual') { r.mode = 'auto'; invalidate(); }
    UI.screen = route(UI.screen); UI.locMenu = false; UI.advMenu = false;
    G.layout = (G.layout || []).filter(w => !['WG_ALERTS','WG_MSG'].includes(w.id));
    if (!G.observeVersion) {
      G.observeVersion = 1;
      prefs().autoRaid.on = 'on'; invalidate();
    }
  }
  function clean(root) {
    if (!root || UI.mode !== 'app' || legacy) return;
    root.querySelectorAll(selector).forEach(el => {
      if (el.matches('[data-locmenu]')) { const s = document.createElement('span'); s.className = 'muted'; s.textContent = el.textContent; el.replaceWith(s); }
      else el.remove();
    });
    root.querySelectorAll('[data-go],[data-kgo2],[data-qsgo]').forEach(el => {
      const d = el.dataset, s = d.go || d.kgo2 || (d.qsgo?.startsWith('go:') ? d.qsgo.slice(3) : '');
      if (routes.has(s)) el.remove();
    });
    root.querySelectorAll('[data-wpsel="WG_ALERTS"],[data-wpsel="WG_MSG"]').forEach(el=>el.remove());
  }
  const plain = s => { const e = document.createElement('div'); e.innerHTML = s || ''; return e.textContent.trim(); };
  function notices() {
    if (!G || !G.story) return;
    (G.alerts || []).slice().reverse().forEach(m => {
      if (m._storyTold) return; m._storyTold = true;
      if (m.ev || /^\[공략 보고서\]/.test(m.subj || '')) return;
      STORY.add('news', [plain(m.subj), plain(m.body)].filter(Boolean).join(' — '), 2);
    });
    (G.threads || []).forEach(th => {
      (th.msgs || []).forEach(m => {
        if (m._storyTold) return; m._storyTold = true;
        if (th.event && !th.event.resolved || !m.t || m.from === 'ME') return;
        STORY.add('news', `${nameOf(m.from || th.with)}: "${plain(m.t)}"`, 2);
      });
    });
  }
  function directionHTML() {
    const cur = prefs().play.direction || 'auto';
    return `<div class="panel pb" style="margin-bottom:12px"><b>당분간의 방향</b><p class="muted">방향과 목표를 정하면 성격 · 몸 상태 · 돈 사정에 맞춰 하루를 살아갑니다.</p><div class="row" style="flex-wrap:wrap">${Object.entries(directions).map(([k,[n]]) => `<button class="btn ${k === cur ? 'pri' : ''}" data-direction="${k}" aria-pressed="${k === cur}">${n}</button>`).join('')}</div><div class="row" style="margin-top:12px"><button class="btn" data-kset="판단 · 방침">생활 · 공략 방침</button><button class="btn" data-rtab="goals">목표 정하기</button></div></div>`;
  }
  const oldPanel = ROUTINE.panel;
  ROUTINE.panel = section => section === 'records' ? oldPanel(section) : directionHTML() + `<div class="panel pb"><b>오늘의 흐름</b><p class="muted">일정은 캐릭터가 정합니다. 공략과 만남은 그날 상황에 따라 달라집니다.</p>${(G.schedule[wd(G.day)] || []).map(b => `<div>${hhmm(b.at)} · ${esc(DB.actions[b.act]?.name || '')}</div>`).join('')}<button class="btn" style="margin-top:12px" data-go="life">인생 지켜보기</button></div>`;
  const focus = GOALS.aiFocus;
  GOALS.aiFocus = () => { const id = directions[prefs().play.direction || 'auto']?.[1], list = focus(); return id ? [id, ...list.filter(x => x !== id)] : list; };
  document.addEventListener('click', e => {
    if (UI.mode !== 'app') return;
    const dir = e.target.closest('[data-direction]');
    if (dir) {
      e.preventDefault(); e.stopImmediatePropagation(); const key = dir.dataset.direction; if (!directions[key]) return;
      prefs().play.direction = key; prefs().play.pace = key === 'rest' ? 'rest' : 'balance'; invalidate();
      STORY.add('decide', `당분간 '${directions[key][0]}' 쪽으로 방향을 잡는다.`, 1); render(); return;
    }
    if (!legacy && e.target.closest(selector)) { e.preventDefault(); e.stopImmediatePropagation(); return; }
    if (e.target.closest('[data-goaladd],[data-goaldrop],[data-focus]')) invalidate();
  }, true);
  return { route, normalize, clean, notices, invalidate, get legacy() { return legacy; }, set legacy(v) { legacy = !!v; } };
})();
