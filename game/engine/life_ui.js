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

  function enter() { prefs(); bind(); LIFE_LOG.rotate();HISTORY_UI.sync();PLAY.restoreRaid(); if ((!G.story || !G.story.length)&&!LIFE_LOG.index().length) { STORY.prologue(); LIFE.watch(); STORY.dayStart(); } PLAY.S.speed = PP().speed || 1; }
  function bind() {
    if (bound) return; bound = true;
    STORY.on(appendLine); PLAY.onUi(onPlayUi);
    document.addEventListener('click', onClick); document.addEventListener('change', onChange);
    document.addEventListener('keydown', e => { if (UI.mode !== 'app' || !G || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (e.code === 'Space' && UI.screen === 'life') { e.preventDefault(); toggle(); } });
    document.addEventListener('keydown', e => { const tab = e.target.closest?.('[data-home-tab]'); if (!tab || !['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return; const tabs = [...tab.parentElement.querySelectorAll('[data-home-tab]')], i = tabs.indexOf(tab), next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length-1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; e.preventDefault(); tabs[next].click(); document.getElementById(tabs[next].id)?.focus(); });
  }
  function toggle() { if (PLAY.S.running) PLAY.pause(); else PLAY.start('run'); }

  /* ---------- 상단 재생 막대 ---------- */
  function controls() {
    const S = PLAY.S, sp = DB.balance.BAL_PLAY.speeds;
    return `<div class="playbar" id="playbar" role="group" aria-label="재생">
      <button class="pbtn main" data-kplay="toggle" aria-label="${S.running ? '일시정지' : '재생'}" title="재생 · 일시정지 (Space)">${S.running ? '⏸' : '▶'}</button>
      ${sp.map(x => `<button class="pbtn ${S.speed === x && S.mode !== 'next' ? 'on' : ''}" data-kspeed="${x}" aria-pressed="${S.speed === x}">×${x}</button>`).join('')}
      <button class="pbtn ${S.mode === 'next' && S.running ? 'on' : ''}" data-kplay="next" title="다음 사건까지 빠르게">다음 사건</button>
      <span class="playrate">하루 = ${+(DB.balance.BAL_PLAY.secPerDay / S.speed).toFixed(1)}초</span><span class="pstate" title="${esc(S.stop || '')}">${S.running ? (S.mode === 'next' ? '다음 사건까지' : '재생 중') : S.stop ? '멈춤' : '일시정지'}</span></div>`;
  }
  function onPlayUi(S) {
    if (!G || UI.mode !== 'app') return;
    if (G.dead) { render(); return; }
    if (UI.screen === 'raid') { render(); return; }
    const pb = document.getElementById('playbar'); if (pb) pb.outerHTML = controls();
    const dt = dateOf(G.day), cd = document.getElementById('clockD'); if (cd) cd.textContent = `${dt.y}년 ${dt.m}월 ${dt.d}일 (${dt.w})`;
    const ct = document.getElementById('clockTime'); if (ct) ct.textContent = hhmm(G.time);
    const ca = document.getElementById('clockAge'); if (ca) ca.textContent = `${G.player.age || 25}세`;
    const tc=document.getElementById('topCoin');if(tc)tc.innerHTML=coinTxt(G.coin||0);const elapsed=document.getElementById('awakeningElapsed');if(elapsed){const info=awakeningElapsed();elapsed.textContent=info.text;elapsed.title=info.title;}
    if (UI.screen === 'life') { const sd = document.getElementById('lifeSide'); if (sd && !sd.contains(document.activeElement)) sd.innerHTML = sideHTML(); const ws = document.getElementById('lifeWidgets'); if (ws && !ws.contains(document.activeElement)) ws.innerHTML = widgetsHTML(); alignPanels(); }
    refreshMonth();
    if (UI.screen === 'homeHunter' && selectedTab('hunter') === 'status') HUNTER_STATUS.refresh();
    syncPopup();
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
    if(refreshMonth())return;
    if(LIFE_LOG.monthOf(it)!==LIFE_LOG.monthOfDay(G.day))return;
    const near = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
    box.insertAdjacentHTML('beforeend', lineHTML(it));
    while (box.children.length > 500) box.firstElementChild.remove();
    if (near) box.scrollTop = box.scrollHeight;
  }
  let statusObserver = null;
  function refreshMonth(){
    const box=document.getElementById('story');if(!box)return false;
    LIFE_LOG.rotate();const month=LIFE_LOG.monthOfDay(G.day),label=document.getElementById('lifeMonthLabel');
    if(label){const dt=dateOf(G.day);label.textContent=`${dt.y}년 ${dt.m}월`;}
    const open=document.querySelector('[data-history-current]');if(open)open.dataset.historyOpen=month;
    if(box.dataset.month===month)return false;
    box.dataset.month=month;box.innerHTML=(G.story||[]).filter(STORY.visible).slice(-300).map(lineHTML).join('');box.scrollTop=box.scrollHeight;return true;
  }
  function alignPanels() { const home = document.querySelector('.life'), status = document.getElementById('lifeSide'); if (home && status) home.style.setProperty('--home-status-height', status.getBoundingClientRect().height + 'px'); }
  function after() { if (UI.screen === 'life') { const box = document.getElementById('story'); if (box) box.scrollTop = box.scrollHeight; alignPanels(); statusObserver?.disconnect(); const status = document.getElementById('lifeSide'); if (status && typeof ResizeObserver !== 'undefined') { statusObserver = new ResizeObserver(alignPanels); statusObserver.observe(status); } } else statusObserver?.disconnect(); HISTORY_UI.sync();syncPopup(); }

  /* ---------- 오른쪽 상태 ---------- */
  function company() {
    if (raidActive()) return UI.raid.party.slice(1).map(p => p.n).join(', ') || '혼자';
    const here = locOf(), out = []; const pt = homeOf().partner; if (pt && here.pt === 'PT_HOME') out.push(nameOf(pt));
    (G.relations || []).forEach(r => { if (out.length >= 3 || r.id === pt) return; const w = npcWhere(r.id); if (w && w.region === here.region && w.pt === here.pt && here.pt !== 'PT_HOME') out.push(nameOf(r.id)); });
    return out.join(', ') || '혼자';
  }
  function sideHTML() {
    return statusWindowHTML(G.player, true, { fold: true });
  }
  const HOME_WIDGETS = ['WG_MONEY','WG_COND','WG_PEOPLE','WG_NEWS'];
  function widgetIds() { const P = PP(); if (!Array.isArray(P.homeWidgets)) P.homeWidgets = ['WG_MONEY','WG_PEOPLE']; return P.homeWidgets = [...new Set(P.homeWidgets)].filter(id => HOME_WIDGETS.includes(id)); }
  function favoriteIds() { return PP().homePeople = [...new Set(Array.isArray(PP().homePeople) ? PP().homePeople : [])].filter(id=>id!==G.player.id&&P(id)).slice(0,10); }
  const widgetName = id => id === 'WG_PEOPLE' ? '즐겨찾기한 인물' : WIDGETS[id].name;
  function widgetEditorHTML() {
    const ids=widgetIds(), people=favoriteIds(), candidates=(G.relations||[]).filter(r=>r.id!==G.player.id&&!people.includes(r.id)&&P(r.id));
    return HOME_WIDGETS.map(id => `<label class="home-widget-choice"><input type="checkbox" data-life-widget-toggle="${id}" ${ids.includes(id) ? 'checked' : ''}>${esc(widgetName(id))}</label>`).join('') +
      `<div class="home-people-editor"><span>즐겨찾기한 인물 ${people.length} / 10</span><div class="home-people-picker"><select data-life-person-pick aria-label="즐겨찾기할 인물" ${people.length>=10?'disabled':''}><option value="">인물 선택</option>${candidates.map(r=>`<option value="${esc(r.id)}">${esc(nameOf(r.id))}</option>`).join('')}</select><button class="btn sm" data-life-person-add ${people.length>=10?'disabled':''}>추가</button></div>${people.map(id=>`<div class="home-person-choice"><span>${esc(nameOf(id))}</span><button class="btn sm" data-life-person-remove="${esc(id)}" aria-label="${esc(nameOf(id))} 즐겨찾기 해제">해제</button></div>`).join('')}</div>`;
  }
  function moneyHTML() {
    return `<div class="mini"><div class="num">${won(G.money)}</div>${(G.ledger||[]).filter(l=>Number(l[2])!==0).slice(0,3).map(l=>`<div class="home-money-log" data-home-ledger><span class="home-money-label" title="${esc(l[0]+' · '+l[1])}"><small data-home-ledger-date>${esc(l[0])}</small><span class="muted">${esc(l[1])}</span></span><span class="${l[2]>0?'good':'bad'} num">${l[2]>0?'+':''}${won(l[2])}</span></div>`).join('')}</div>`;
  }
  function peopleHTML() {
    const ids=favoriteIds();
    return `<div class="mini">${ids.map(id=>{const r=relOf(id);if(r)ensureRel(r);const close=r?.close??0;return `<div class="meter" data-home-person="${esc(id)}" style="margin:0"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(nameOf(id))}">${esc(nameOf(id))}</span>${bar(close)}<span class="num">${close}</span></div>`;}).join('')||'<span class="muted">구성에서 인물을 선택해 줘.</span>'}</div>`;
  }
  function widgetsHTML() { return widgetIds().map((id,i,L) => { const W = WIDGETS[id], name=widgetName(id); return `<section class="life-widget" data-life-widget="${id}"><header><button class="home-widget-title" data-go="${id === 'WG_COND' ? 'status' : W.go}">${esc(name)}</button><span><button data-life-widget-move="${id}|-1" aria-label="${esc(name)} 위로" ${i === 0 ? 'disabled' : ''}>↑</button><button data-life-widget-move="${id}|1" aria-label="${esc(name)} 아래로" ${i === L.length-1 ? 'disabled' : ''}>↓</button></span></header><div class="home-widget-body">${id==='WG_MONEY'?moneyHTML():id==='WG_PEOPLE'?peopleHTML():W.r(1,1)}</div></section>`; }).join(''); }
  /* ---------- 답할 사건 · 고비 회고 ---------- */
  function pendHTML() {
    const R = UI.raid, C = R && !R.done && R.crisis && DB.crises[R.crisis.id];
    if (C) return `<div class="kcard pend ask" role="dialog" aria-label="헌터의 고민"><div class="kh">공략 위기 — ${esc(C.title)}</div><div class="kb">${esc(crisisText(C.text))}</div><div class="ask-line">${esc(STARADV.line('ask'))}</div><div class="kch">${C.choices.map((ch,i) => (!ch.req || ch.req.every(q=>checkReq(q))) ? `<button class="choice" data-kcrisis="${i}" ${ch.needParty && R.party.filter(p=>p.hp>0).length<2 ? 'disabled' : ''}><div>${esc(crisisText(ch.t))}</div>${ch.risk?`<div class="ck">${esc(ch.risk)}</div>`:''}</button>` : '').join('')}</div><button class="btn" data-kcrisisauto="1">말 걸지 않기</button></div>`;
    if (raidActive()) return '';
    if (G.retroOpen) {
      const m = (G.milestones || [])[G.retroOpen.i]; if (m) {
        const T = DB.milestoneTypes[m.id], days = G.day - (G.startDay ?? G.day);
        return `<div class="kcard retro" role="dialog" aria-label="고비 회고"><div class="kh">고비 — ${esc(T?.name || '')}</div><div class="kb">${esc(m.text)}</div>
          <div class="dim" style="font-size:12px;margin:6px 0">각성 ${days}일째 · ${DB.ranks[G.player.rank].name}급 Lv.${G.player.level} · 공략 ${G.stats?.raids || 0}회 (클리어 ${G.stats?.cleared || 0}) · 기분 ${EMO.name()}</div>
          <button class="btn" data-kretro="skip">계속</button></div>`;
      }
    }
    const L = EVT.pending().filter(x=>EVT.stopWanted(x.ev)); if (!L.length) {
      const offers = (G.offers || []).filter(o=>o.exp>nowAbs()), o = offers[0];
      if (!o) return '';
      return `<div class="kcard pend ask" role="dialog" aria-label="헌터의 고민"><div class="kh">${esc(guildName(o.gid))} — 계약 제안</div><div class="kb">배분율 ${o.share}% · 남은 답변 시간 ${durTxt(o.exp-nowAbs())}</div><div class="ask-line">${esc(STARADV.line('ask'))}</div><div class="kch">${offerOpts(o).map((c,i)=>`<button class="choice" data-life-offer="${i}"><div>${esc(c.t)}</div></button>`).join('')}</div><button class="btn" data-life-offer="auto">말 걸지 않기</button></div>`;
    }
    const x = L[0], ev = x.ev, T = EVT.texts(x), subj = T.subj, body = T.body;
    const from = ev.ch === 'alert' ? (DB.senders[ev.from]?.name || nameOf(ev.from) || '') : nameOf(x.tgt);
    return `<div class="kcard pend ask" role="dialog" aria-label="헌터의 고민"><div class="kh">${ev.ch === 'alert' ? '알림' : '메시지'} · ${esc(from)} — ${esc(subj)} ${L.length > 1 ? `<span class="dim">외 ${L.length - 1}건</span>` : ''}</div><div class="kb">${esc(body)}</div><div class="ask-line">${esc(STARADV.line('ask'))}</div>
      <div class="kch">${ev.choices.map((c, i) => EVT.okChoice(c, x.tgt) ? `<button class="choice" data-kpick="${i}"><div>${esc(c.t)}</div></button>` : '').join('')}</div>
      <div class="row" style="gap:6px;margin-top:6px"><button class="btn" data-kauto="1" title="성좌는 말하지 않고 헌터가 스스로 정한다">말 걸지 않기</button><span class="dim" style="font-size:11px">따를지는 ${esc(MIND.callName())}이(가) 정한다</span></div></div>`;
  }
  /* 헌터의 고민은 문서 흐름 바깥의 모달에 표시한다 (헌터가 성좌를 알 때만). 판정 숫자 · 주사위는 보이지 않는다. */
  let popupGame=null, popupBusy=false, popupMarkup='', delegating=false;
  function resetPopup() { popupBusy=false;popupMarkup='';const el=document.getElementById('lifeEventModal');el?.close();el?.remove(); }
  /* 길드 제안의 선택지 (성좌의 조언 · 헌터 판단 공통) */
  function offerOpts(o) { return [{t:'계약 수락',k:'ok',tags:['TAG_TEAM','TAG_MONEY']},{t:'계약 거절',k:'no',tags:['TAG_SAFE']}].concat(o.neg?[]:[{t:'조건 협상',k:'neg',tags:['TAG_MONEY','TAG_RISK']}]); }
  function offerRun(o, i, reaction) { const c = offerOpts(o)[i], gn = guildName(o.gid); const r = replyGuildOffer(0, c.k); STORY.add('choice', `${reaction ? reaction + ' ' : ''}${c.k === 'ok' ? `${gn}의 제안을 받아들인다.` : c.k === 'no' ? `${gn}의 제안을 거절한다.` : `${gn}에 조건을 다시 묻는다.`}`, 1); return r; }
  function popupElement() {
    let el=document.getElementById('lifeEventModal');if(el)return el;
    el=document.createElement('dialog');el.id='lifeEventModal';el.setAttribute('aria-label','중요한 선택');
    el.addEventListener('cancel',e=>e.preventDefault());document.body.appendChild(el);return el;
  }
  function syncPopup() {

    if(popupGame!==G){resetPopup();popupGame=G;}
    if(UI.mode!=='app'){resetPopup();return;}
    if(popupBusy||delegating)return;
    /* 성좌를 모르면 묻지 않는다 — 헌터가 혼자 정하고 이야기는 이어진다 (선택 · 판정 문장 없음) */
    if(G&&!G.dead&&!STARADV.canAsk()){
      let changed=false;delegating=true;
      try {
        if(UI.raid&&!UI.raid.done&&UI.raid.crisis){PLAY.chooseCrisis();changed=true;}
        if(!raidActive()){
          for(const x of EVT.pending().slice(0,20)){EVT.auto(x);changed=true;}
          G.pendingPick=EVT.pending().length>0;
          const offer=(G.offers||[]).filter(o=>o.exp>nowAbs())[0];
          if(offer){const opts=offerOpts(offer).filter(c=>c.k!=='neg'),d=MIND.decide(opts,{kind:'event'});offerRun(offer,d.i<0?1:d.i,'');changed=true;}
        }
      } finally {delegating=false;}
      if(changed){render();return;}
    }
    const html=G&&!G.dead?pendHTML():'';
    if(!html){resetPopup();return;}
    const el=popupElement();
    if(html!==popupMarkup){popupMarkup=html;el.innerHTML=STORY.josa(html.replace('role="dialog"','role="group"'));}
    if(!el.open){el.showModal();el.querySelector('button:not(:disabled)')?.focus();}
    if(PLAY.S.running)PLAY.pause();
  }
  /* 성좌의 조언 결과: 헌터의 반응(따름 · 거부) → 일어난 일. 주사위 · 판정 숫자는 보이지 않는다 (2026-10-24) */
  function performChoice(action) {
    if(popupBusy)return;popupBusy=true;
    if(PLAY.S.running)PLAY.pause();
    let out;
    try {out=action();} catch(e){popupBusy=false;syncPopup();throw e;}
    const result=out?.result, text=STORY.josa(result?.text||'');
    if(!out||!out.reaction&&!text){popupBusy=false;render();return;}
    const el=popupElement();
    el.innerHTML=`<div class="advice-res ${out.followed||out.agree?'follow':out.reaction&&out.result?'refuse':''}"><header>${out.agree?'같은 생각':out.followed?'성좌의 말대로':out.reaction?'헌터의 선택':''}</header>
      <p class="advice-react">${esc(out.reaction||'')}</p>${text?`<p class="advice-text">${esc(text)}</p>`:''}
      <div class="event-roll-actions"><button class="btn pri" data-life-roll-continue>계속</button></div></div>`;
    if(!el.open)el.showModal();el.querySelector('[data-life-roll-continue]').focus();
  }

  function barHTML() {
    return `<button class="btn" data-home-tab="trade|shop">성좌 상점</button>`;
  }
  /* 이야기 · 내 헌터 · 거래는 좌측 하위 메뉴도 표시한다. 인생 외 새 탭 내용은 비워 둔다. */
  const HOME_TABS = {
    story: {label:'이야기', tabs:[['life','인생'],['bio','일대기']]},
    hunter: {label:'내 헌터', tabs:[['profile','정보'],['status','상태창'],['relations','관계']]},
    db: {label:'DB', tabs:[['people','인물'],['gates','게이트'],['monsters','몬스터'],['equipment','장비'],['places','장소'],['other','기타'],['classes','클래스'],['skills','스킬']]},
    trade: {label:'성좌', tabs:[['starinfo','내 정보'],['shop','상점'],['auction','성좌 경매장'],['achieve','업적']]}
  };
  function selectedTab(group) { const cfg = HOME_TABS[group], state = UI.homeTabs || (UI.homeTabs = {}); if (!cfg.tabs.some(([id])=>id===state[group])) state[group] = cfg.tabs[0][0]; return state[group]; }
  function categoryTabsHTML(group) { const cfg = HOME_TABS[group], current = selectedTab(group); return `<div class="home-category-tabs" role="tablist" aria-label="${cfg.label}">${cfg.tabs.map(([id,label])=>`<button type="button" id="home-tab-${group}-${id}" role="tab" data-home-tab="${group}|${id}" aria-selected="${id===current}" aria-controls="home-panel-${group}" tabindex="${id===current?0:-1}">${label}</button>`).join('')}</div>`; }
  function panelOpen(group) { return `<div id="home-panel-${group}" class="home-category-panel" role="tabpanel" aria-labelledby="home-tab-${group}-${selectedTab(group)}">`; }
  function emptyCategory(group) { return categoryTabsHTML(group) + panelOpen(group) + '</div>'; }
  V.homeHunter = () => categoryTabsHTML('hunter') + panelOpen('hunter') + (selectedTab('hunter') === 'profile' && typeof HUNTER_INFO !== 'undefined' ? HUNTER_INFO.html() : selectedTab('hunter') === 'status' ? HUNTER_STATUS.html() : selectedTab('hunter') === 'relations' && typeof HUNTER_REL !== 'undefined' ? HUNTER_REL.html() : '') + '</div>';
  V.homeDb = () => categoryTabsHTML('db') + panelOpen('db') + (typeof DB_UI !== 'undefined' ? DB_UI.html() : '') + '</div>';
  V.homeTrade = () => categoryTabsHTML('trade') + panelOpen('trade') + (typeof STAR_UI !== 'undefined' ? STAR_UI.html(selectedTab('trade')) : '') + '</div>';
  /* ---------- 인생 화면 ---------- */
  V.life = () => {
    if(selectedTab('story')==='bio')return categoryTabsHTML('story')+panelOpen('story')+HISTORY_UI.homeHTML()+'</div>';
    if (selectedTab('story') !== 'life') return emptyCategory('story');
    LIFE_LOG.rotate();
    const L = (G.story || []).filter(STORY.visible).slice(-300);
    return categoryTabsHTML('story') + panelOpen('story') + `<div class="life">
      <div class="lmain"><div class="life-main-tools"><span id="lifeMonthLabel">${dateOf(G.day).y}년 ${dateOf(G.day).m}월</span><button class="btn sm" data-history-current data-history-open="${LIFE_LOG.monthOfDay(G.day)}">이번 달 전체 보기</button></div>
        <div id="story" class="story" data-month="${LIFE_LOG.monthOfDay(G.day)}" role="log" aria-live="polite" aria-label="이야기 창">${L.map(lineHTML).join('')}</div>
        <div id="lifeBar" class="lbar" role="group" aria-label="끼어들기">${barHTML()}</div></div>
      <aside class="life-widgets" aria-label="상태창 및 위젯"><div class="life-widget-tools"><button class="btn sm" data-life-widget-edit aria-expanded="${!!UI.lifeWidgetEdit}">구성</button></div><div id="lifeWidgetEditor" class="home-widget-editor" ${UI.lifeWidgetEdit ? '' : 'hidden'}>${widgetEditorHTML()}</div><section id="lifeSide" aria-label="상태창">${sideHTML()}</section><div id="lifeWidgets">${widgetsHTML()}</div></aside></div></div>`;
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
    return `<div style="max-width:980px;margin:0 auto"><div class="dim" style="letter-spacing:.4em;text-align:center">${G.dead.kind === 'retire' ? 'RETIRED' : 'IN MEMORIAM'}</div><button class="btn" data-history-open>지난 일생 돌아보기</button>${bioHTML(C, false)}
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

  /* ---------- 설정 (2026-10-24 정리: 헌터의 삶을 정하는 방침 · 판매 · 알림 · 다른 인물로 바꾸기 · 기록관 · 옛 화면용 설정 삭제) ---------- */
  const TABS = ['재생', '화면', '헌터 관리', '개발'];
  const sel = (key, cur, opts) => `<select data-kpref="${key}">${opts.map(([v, n]) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
  const tgl = (key, on, title, sub) => `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>${title}</b><div class="sub">${sub}</div></div><button class="tgl" aria-pressed="${on}" data-set="${key}" aria-label="${title}"></button></div>`;
  V.settings = () => {
    const tab = TABS.includes(UI.settingsTab) ? UI.settingsTab : TABS[0], P = PP();
    let body = '';
    if (tab === '재생') body = `<div class="pb grid" style="gap:12px">
      <div class="field"><label>헌터가 성좌에게 물어 올 때</label>${sel('play.stop', P.stop, [['none', '멈추지 않는다 (헌터가 혼자 정한다)'], ['big', '큰 갈림길만'], ['each', '사건마다']])}</div>
      <div class="field"><label>물어 올 일</label><div class="chips">${vals('stopKinds').map(k => `<label class="chk"><input type="checkbox" data-kkind="${k.id}" ${(P.kinds?.[k.id] ?? k.dflt) ? 'checked' : ''}> ${k.name}${k.big ? ' <span class="dim">(큰 갈림길)</span>' : ''}</label>`).join('')}</div></div>
      <div class="field"><label>문장 상세도</label>${sel('play.detail', P.detail || 'detail', [['detail', '자세히 — 시간대별 행동 전부'], ['normal', '보통'], ['summary', '요약 — 사건 · 하루 정리만']])}</div>
      <div class="field"><label>배속 기본값</label>${sel('play.speed', P.speed || 1, DB.balance.BAL_PLAY.speeds.map(x => [x, '×' + x]))}</div>
      <p class="muted">헌터가 성좌를 알기 전에는 묻지 않는다. ×1 = 하루 ${DB.balance.BAL_PLAY.secPerDay}초. 게임을 끈 동안에는 시간이 흐르지 않는다.</p></div>`;
    else if (tab === '화면') body = `<div class="pb grid" style="gap:14px">
      <div class="field"><label for="st-fs">글자 크기</label><select id="st-fs" data-setsel="fontSize">${[12, 13, 14, 15].map(v => `<option value="${v}" ${SETTINGS.fontSize == v ? 'selected' : ''}>${v}px${v === 13 ? ' (기본)' : ''}</option>`).join('')}</select></div>
      ${tgl('intro', SETTINGS.intro !== false, '새 게임 인트로', '성좌 · 헌터를 만들기 전에 짧은 글 인트로를 보여 준다.')}
      ${tgl('autosave', SETTINGS.autosave !== false, '자동 저장', '하루가 지날 때와 공략이 끝날 때 성좌 칸에 저장한다.')}</div>`;
    else if (tab === '개발') body = `<div class="pb grid" style="gap:14px">
      ${tgl('dev', !!SETTINGS.dev, '개발자 보기', '숨은 값(잠재력 · 상대의 감정 · 게이트 내부 · 다른 헌터 능력치)을 그대로 보여 준다. 밸런스 확인용.')}
      ${tgl('showTrig', SETTINGS.showTrig !== false, '이벤트 발동 조건 표시', '이벤트가 어떤 데이터로 발동했는지 보여 준다.')}</div>`;
    else body = `<div class="pb grid" style="gap:14px">
        <div><b>헌터 사진 주문서</b><p class="muted">커마에서 정한 외형을 전부 모아 이미지 생성 AI에게 그대로 붙여 넣을 문장으로 만든다. 실사 · 흰 배경 · 장식 없음.</p>
          <div class="row" style="gap:6px"><button class="btn" data-kimgp="1">${UI.imgPrompt ? '다시 만들기' : '사진 주문서 만들기'}</button>${UI.imgPrompt ? '<button class="btn pri" data-kimgcopy="1">복사</button>' : ''}</div>
          ${UI.imgPrompt ? `<textarea class="kimgp" readonly rows="14" aria-label="이미지 프롬프트">${esc(UI.imgPrompt)}</textarea>` : ''}</div>
        <div><b>은퇴</b><p class="muted">은퇴하면 노년을 짧게 흘린 뒤 일대기 한 장이 남고, 이 성좌로 새 헌터를 지켜볼 수 있다.</p><button class="btn ${UI.retireArm ? 'club' : ''}" data-retire="1" ${raidActive() || G.dead ? 'disabled' : ''}>${UI.retireArm ? '정말 은퇴할까? 한 번 더 누르면 은퇴' : '은퇴'}</button></div></div>`;
    return `<div class="h-row"><h1 class="h1">설정</h1></div><div class="tabs" role="tablist">${TABS.map(t => `<button role="tab" aria-selected="${tab === t}" data-settingstab="${t}">${t}</button>`).join('')}</div><div class="panel" style="max-width:780px">${body}</div>`;
  };

  /* ---------- 타이틀 · 커마 덧붙임 ---------- */
  const _title = titleHTML;
  titleHTML = function () {
    let h = _title();
    h = h.replace('<button data-title="credits"', `<button data-ktitle="archive" aria-current="${UI.panel === 'archive'}">기록관</button>\n        <button data-title="credits"`);
    if (UI.panel === 'archive') h = h.replace('<div class="t-right"></div>', `<div class="t-right"><div class="t-panel"><div class="ph">기록관 <span class="row" style="gap:6px"><label class="btn sm">파일 가져오기<input type="file" accept=".json,application/json" data-karimp="1" hidden></label><button class="more" data-tpanel="">닫기</button></span></div>${archiveListHTML(false)}</div></div>`);
    return h;
  };
  /* 시작 전 확인의 '기록관에서 인물 넣기'는 2026-10-24 사용자 요청으로 뺐다 (LEGACY 기능은 남김) */
  const _gfc = gameFromCreation;
  gameFromCreation = function (cc) {
    _gfc(cc);
    if (UI.continueFrom) { try { LEGACY.adoptWorld(UI.continueFrom, UI.continueRel || 'none'); } catch (e) { console.error(e); } UI.continueFrom = null; }
    (cc.archiveAdds || []).forEach(x => { const e = LEGACY.list().find(a => a.aid === x.aid); if (e) LEGACY.placeInto(e, x.when, x.rel); });
  };

  /* ---------- 클릭 · 변경 ---------- */
  /* 헌터 사진 주문서 (2026-10-24): 커마 외형 전부 → 실사 · 흰 배경 이미지 프롬프트 */
  function imagePrompt() {
    const h = G.player, lk = h.look || G.bio?.look || {}, set = vals('ccLookSets').find(x => x.sex === h.sex), minor = h.age != null && h.age < 18;
    const skip = minor ? ['LK_CUP', 'LK_CHEST_F', 'LK_CHEST_S', 'LK_HIP_F', 'LK_FIGURE'] : [];
    const val = id => { const it = DB.ccLook[id]; let v = lk[id]; if (v == null) v = id === 'LK_HEIGHT' ? h.height : id === 'LK_WEIGHT' ? h.weight : null; if (v == null) v = it?.slider ? it.slider.def?.[h.sex] : DB.lookPools[it?.pool]?.def; if (v == null) return null; return it?.slider ? v + it.slider.unit : DB.lookOpts[v]?.name || null; };
    const rows = (set?.items || Object.keys(lk)).filter(id => DB.ccLook[id] && !skip.includes(id)).map(id => [DB.ccLook[id].name, val(id)]).filter(([, v]) => v);
    const nat = DB.ccNations?.[h.nation]?.name;
    return ['실사 인물 사진 (photorealistic portrait photo).',
      '배경: 심플한 흰색 배경 하나뿐. 소품 · 장식 · 글자 · 무늬 · 액자 · 테두리 없음.',
      '구도: 한 사람, 정면에 가까운 전신, 머리부터 발끝까지 화면 안. 부드러운 스튜디오 조명, 자연스러운 피부 질감, 보정 과하지 않게.',
      `인물: ${[nat ? nat + ' 사람' : '', h.sex === '여' ? '여성' : h.sex === '남' ? '남성' : '', h.age ? h.age + '세' : ''].filter(Boolean).join(' · ')}`,
      '외형 (아래 항목을 모두 반영):', ...rows.map(([k, v]) => `- ${k}: ${v}`),
      '옷은 위 의상 스타일 그대로 입힌다. 무기 · 갑옷 · 마법 효과 · 판타지 장식은 넣지 않는다.',
      '피할 것: 일러스트 · 애니메이션 · 3D 렌더 느낌, 여러 명, 글자 · 워터마크, 배경 사물.'].join('\n');
  }
  async function onClick(e) {
    if (e.target.closest('[data-kimgp]')) { UI.imgPrompt = imagePrompt(); render(); return; }
    if (e.target.closest('[data-kimgcopy]')) { try { await navigator.clipboard.writeText(UI.imgPrompt || ''); toast('사진 주문서를 복사했다'); } catch (_) { const t = document.querySelector('.kimgp'); if (t) { t.select(); toast('복사가 막혀 있어 글을 선택해 두었다 — Ctrl+C'); } } return; }
    if(e.target.closest('[data-life-roll-continue]')) {if(e.target.closest('button').disabled)return;resetPopup();syncPopup();return;}
    const offer=e.target.closest('[data-life-offer]');if(offer){const o=(G.offers||[]).filter(x=>x.exp>nowAbs())[0];if(!o)return;const v=offer.dataset.lifeOffer,opts=offerOpts(o);performChoice(()=>STARADV.advise(opts,v==='auto'?null:+v,{kind:'event'},(i,how,r)=>offerRun(o,i,r)));return;}
    const addPerson=e.target.closest('[data-life-person-add]'), removePerson=e.target.closest('[data-life-person-remove]');
    if(addPerson||removePerson) {
      const ids=favoriteIds();
      if(addPerson&&!addPerson.disabled) {const id=document.querySelector('[data-life-person-pick]')?.value;if(ids.length<10&&id&&id!==G.player.id&&relOf(id)&&P(id)&&!ids.includes(id))PP().homePeople=[...ids,id];}
      if(removePerson)PP().homePeople=ids.filter(id=>id!==removePerson.dataset.lifePersonRemove);
      document.getElementById('lifeWidgetEditor').innerHTML=widgetEditorHTML();document.getElementById('lifeWidgets').innerHTML=widgetsHTML();return;
    }
    const tab = e.target.closest('[data-home-tab]');
    if (tab) { const [group,id] = tab.dataset.homeTab.split('|'); if (HOME_TABS[group]?.tabs.some(([key])=>key===id)) { (UI.homeTabs || (UI.homeTabs={}))[group] = id; UI.screen = {story:'life',hunter:'homeHunter',db:'homeDb',trade:'homeTrade'}[group]; const focusId=tab.id; render(); document.getElementById(focusId)?.focus(); } return; }
    const edit = e.target.closest('[data-life-widget-edit]'), move = e.target.closest('[data-life-widget-move]');
    if (edit) { UI.lifeWidgetEdit = !UI.lifeWidgetEdit; const editor = document.getElementById('lifeWidgetEditor'); if (editor) editor.hidden = !UI.lifeWidgetEdit; edit.setAttribute('aria-expanded', !!UI.lifeWidgetEdit); return; }
    if (move && !move.disabled) { const [id,delta] = move.dataset.lifeWidgetMove.split('|'), ids = widgetIds(), i = ids.indexOf(id), j = i + +delta; if (i >= 0 && j >= 0 && j < ids.length) { [ids[i],ids[j]] = [ids[j],ids[i]]; PP().homeWidgets = ids; document.getElementById('lifeWidgets').innerHTML = widgetsHTML(); alignPanels(); } return; }
    const cr = e.target.closest('[data-kcrisis],[data-kcrisisauto]');
    if (cr && !cr.disabled) { const R=UI.raid,C=R?.crisis&&DB.crises[R.crisis.id];if(!C)return;const opts=C.choices.map(ch=>(!ch.req||ch.req.every(q=>checkReq(q)))&&!(ch.needParty&&R.party.filter(p=>p.hp>0).length<2)?ch:Object.assign({},ch,{_off:true}));
      performChoice(()=>STARADV.advise(opts,cr.dataset.kcrisisauto?null:+cr.dataset.kcrisis,{kind:'crisis',own:AUTORAID.choose(R,C)},(i,how,r)=>PLAY.chooseCrisis(i,r))); return; }
    const t = e.target.closest('[data-kplay],[data-kspeed],[data-kdetail],[data-kpick],[data-kauto],[data-kretro],[data-kset],[data-kgo],[data-kgo2],[data-kfare],[data-kcont],[data-karbio],[data-karexp],[data-kardel],[data-karnow],[data-karadd],[data-karrm],[data-ktitle],[data-kswitch]');
    if (!t || t.disabled) return; const d = t.dataset;
    if (d.kplay) { if (d.kplay === 'toggle') toggle(); else if (d.kplay === 'next') PLAY.start('next'); else if (d.kplay === 'resume') { ROUTINE.state().mode = 'auto'; ROUTINE.state().planned = -1; PLAY.st().decided = -1; if (UI.screen !== 'life') { UI.screen = 'life'; render(); } PLAY.start('run'); } return; }
    if (d.kspeed) { PLAY.setSpeed(+d.kspeed); PP().speed = +d.kspeed; if (!PLAY.S.running) PLAY.start('run'); return; }
    if (d.kdetail) { PP().detail = d.kdetail; render(); return; }
    if (d.kpick != null || d.kauto) {
      const x = EVT.pending().find(y=>EVT.stopWanted(y.ev)); if (!x) return;
      const opts=x.ev.choices.map(c=>EVT.okChoice(c,x.tgt)?c:Object.assign({},c,{_off:true}));
      performChoice(()=>{const out=STARADV.advise(opts,d.kauto?null:+d.kpick,{tgt:x.tgt,kind:'event'},(i,how,r)=>EVT.resolve(x,i,how,r));G.pendingPick=EVT.pending().some(y=>EVT.stopWanted(y.ev));PLAY.S.stop=null;return out;});return;
    }
    if (d.kretro) { LIFE.note(G.retroOpen?.i, ''); render(); return; }
    if (d.kset) { UI.settingsTab = d.kset; UI.screen = 'settings'; render(); return; }
    if (d.kgo === 'pend') { syncPopup(); return; }
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
    if (t.dataset.lifeWidgetToggle) { const id = t.dataset.lifeWidgetToggle; if (!HOME_WIDGETS.includes(id)) return; const ids = widgetIds(); PP().homeWidgets = t.checked ? [...new Set([...ids,id])] : ids.filter(x => x !== id); document.getElementById('lifeWidgets').innerHTML = widgetsHTML(); alignPanels(); return; }
    if (t.dataset.karimp) { const f = t.files && t.files[0]; if (!f) return; f.text().then(txt => { const r = LEGACY.importJSON(txt); toast(r.error ? r.error : `${esc(r.entry.name)}을(를) 기록관에 넣었습니다.`); render(); }); return; }
    if (t.dataset.kkind) { const P = PP(); P.kinds = P.kinds || {}; P.kinds[t.dataset.kkind] = t.checked; return; }
    if (t.dataset.kpref) {
      const [grp, key] = t.dataset.kpref.split('.'), raw = t.value, v = raw === 'true' ? true : raw === 'false' ? false : (raw !== '' && !isNaN(+raw) ? +raw : raw);
      const o = grp === 'play' ? PP() : prefs()[grp]; o[key] = v; if (grp === 'play' && key === 'speed') PLAY.setSpeed(v);
      if (grp === 'autoRaid' || grp === 'play' && ['pace','policyVsChar'].includes(key)) OBSERVE.invalidate();
      if (t.type === 'range') render(); else if (grp === 'play' && key === 'detail') render();
    }
  }
  bind();  /* 타이틀 · 커마에서도 data-k* 클릭을 받는다 */
  return { controls, enter, after, sideHTML, pendHTML, lineHTML, bioHTML, toggle, syncPopup };
})();
/* 타이틀은 이 파일보다 먼저 한 번 그려졌다 → 덧붙인 메뉴(무작위 시작 · 기록관)가 보이게 다시 그린다 */
if (typeof UI !== 'undefined' && UI.mode === 'title' && document.getElementById('root')) { cancelAnimationFrame(bgRAF); render(); }
