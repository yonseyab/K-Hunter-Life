/* 목표 방향은 GOALS, 하루 계획은 SIM, 행동과 시간은 기존 runTime을 공유한다.
   저장에는 방침·기록만 남긴다. 불러오기로 자동 실행이 재개되지는 않는다. */
const ROUTINE = (() => {
  const bal = () => DB.balance.BAL_ROUTINE;
  function state() { const r=G.routine || (G.routine = {}); r.mode=r.mode||'auto'; r.log=r.log||[]; return r; }
  function focus(id) {
    const g = GOALS.active().find(g => g.id === id); if (!g) return '진행 중인 목표만 집중할 수 있습니다.';
    if (!g.focus && GOALS.active().filter(g => g.focus).length >= bal().focusMax) return `집중 목표는 ${bal().focusMax}개까지입니다.`;
    g.focus = !g.focus; state().planned = null; return null;
  }
  function plan() {
    const r = state(), key=`${G.created}|${G.day}|${ROUTINE_CATALOG.revision}|${GOALS.active().map(g=>g.id+':'+!!g.focus).join(',')}`;
    if (r.mode === 'manual' || (r.planned === G.day && UI.routinePlanKey===key)) return;
    const focus=GOALS.aiFocus(), goals=GOALS.active(), chosen=[], blocked=new Map(), viable=new Set();
    const all=ROUTINE_CATALOG.candidates(focus), rows=[];
    const reject=reason=>blocked.set(reason,(blocked.get(reason)||0)+1);
    for(const a of all){const reason=ROUTINE_CATALOG.restriction(a);if(reason)reject(reason);else rows.push(a);}
    const dailyRejected=new Set();
    G.schedule[wd(G.day)] = SIM.suggestDay(focus, wd(G.day) >= 5, {rows,startAt:G.time,
      check(a,time,dur,agent){
        const chk=actCheck(a,dur,false,null,{time,money:agent.money});
        if(!chk.ok){const key=a.id+'|'+chk.why[0];if(!dailyRejected.has(key)){dailyRejected.add(key);reject(chk.why[0]);}return false;}
        const match=goals.filter(g=>ROUTINE_CATALOG.contributes(a,DB.objectives[g.tpl]));
        for(const g of match)viable.add(g.id);
        return {ok:true,bonus:match.filter(g=>g.focus||!goals.some(x=>x.focus)).length*bal().focusBonus};
      },
      onChoice(a,at,dur){if(chosen.length<bal().diagnosticMax)chosen.push({act:a.id,at,dur,goals:goals.filter(g=>ROUTINE_CATALOG.contributes(a,DB.objectives[g.tpl])).map(g=>g.id)});}
    });
    r.report={day:G.day,total:all.length,eligible:rows.length,chosen,blocked:[...blocked].sort((a,b)=>b[1]-a[1]).slice(0,bal().diagnosticMax),goals:goals.map(g=>({id:g.id,name:GOALS.name(DB.objectives[g.tpl],g.target),possible:viable.has(g.id),route:DB.objectives[g.tpl].route||null}))};
    r.planned = G.day;
    UI.routinePlanKey=key;
  }
  function safety() {
    const c = G.cond, B = bal();
    if (UI.routineCancel) return '직접 일과를 멈췄습니다.';
    if (G.dead) return '인생이 끝났습니다.';
    if (raidActive()) return '진행 중인 공략을 먼저 확인하세요.';
    /* 몸 상태 안전선은 하루에 한 번만 알린다 — 다시 맡기면 일과가 쉬기 · 회복을 골라 이어 간다 (QA: 기력 20 아래에서 일과가 영원히 멈췄다) */
    const once = (key, msg) => { const w = state().warned || (state().warned = {}); if (w[key]) return null; w[key] = nowAbs(); return msg; };
    if ((c.hp ?? 100) <= B.hpMin) { const m = once('hp|' + G.day, `HP가 안전선 ${B.hpMin}% 이하입니다. 다시 맡기면 회복을 우선합니다.`); if (m) return m; }
    if (c.energy <= B.energyMin) { const m = once('en|' + G.day, `기력이 안전선 ${B.energyMin} 이하입니다. 다시 맡기면 쉬면서 이어 갑니다.`); if (m) return m; }
    if (c.stress >= B.stressMax) { const m = once('st|' + G.day, `스트레스가 안전선 ${B.stressMax} 이상입니다. 다시 맡기면 쉬면서 이어 갑니다.`); if (m) return m; }
    if (G.threads.some(t => t.event && !t.event.resolved)) return '답변이 필요한 중요 메시지가 있습니다.';
    /* 알려 주기만 하는 멈춤(제안 · 브레이크 임박)은 같은 대상에 한 번만 — 다시 맡기면 이어서 진행 (QA 2026-10-23: 같은 게이트 때문에 일과가 계속 멈췄다) */
    for (const o of (G.offers || [])) { const m = once('offer|' + o.gid + '|' + o.exp, '계약이나 영입 제안을 확인하세요.'); if (m) return m; }
    for (const x of (G.myGuild?.poach || [])) { const m = once('poach|' + (x.id || x.mid || JSON.stringify(x)), '계약이나 영입 제안을 확인하세요.'); if (m) return m; }
    // 공개된 위치와 브레이크 시간만 사용한다. 내부 정보는 판단하지 않는다.
    const nearL = vals('gates').filter(g => {
      if (g.region !== locOf().region) return false;
      const st = gateSt(g.id); return st.status === 'open' && st.breakAt > nowAbs() && st.breakAt - nowAbs() <= B.urgentHours * 60;
    });
    for (const near of nearL) { const m = once('brk|' + near.id, `현재 지역 게이트 ${near.name}의 브레이크가 ${B.urgentHours}시간 안으로 다가왔습니다. 다시 맡기면 이어서 진행합니다.`); if (m) return m; }
    { const w = state().warned; if (w) for (const k in w) if (nowAbs() - w[k] > 30 * 1440) delete w[k]; }
    return null;
  }
  function noteSkip(a,why){const r=state();r.skipped=(r.skipped||0)+1;if(r.report){const pair=r.report.blocked.find(x=>x[0]===why);if(pair)pair[1]++;else if(r.report.blocked.length<bal().diagnosticMax)r.report.blocked.push([why,1]);}}
  function snapshot() { return { money: G.money, train: G.stats?.trainMin || 0, social: G.stats?.social || 0, done: (G.goals || []).filter(g => g.done).length, skipped:state().skipped||0, raids: G.stats?.raids || 0, cleared: G.stats?.cleared || 0, level: G.player.level, rank: DB.ranks[G.player.rank].lv, exp: G.player.exp || 0, coin: G.coin || 0, inj: (G.injuries || []).length, goals:GOALS.active().map(g=>({id:g.id,name:GOALS.name(DB.objectives[g.tpl],g.target),f:GOALS.progress(g).f})) }; }
  function record(day, before, minutes) {
    if (minutes <= 0) return;
    const r = state(), after = snapshot(); let row = r.log.find(x => x.day === day);
    if (!row) { row = { day, minutes: 0, money: 0, train: 0, social: 0, done: 0, skipped:0, raids:0, cleared:0 }; r.log.unshift(row); }
    row.minutes += minutes; for (const k of ['money', 'train', 'social', 'done', 'skipped', 'raids', 'cleared']) row[k] = (row[k]||0) + after[k] - before[k];
    row.goals=row.goals||{};
    for(const old of before.goals){const g=(G.goals||[]).find(g=>g.id===old.id);if(!g)continue;const item=row.goals[old.id]||(row.goals[old.id]={name:old.name,from:old.f});item.to=GOALS.progress(g).f;item.done=!!g.done;item.failed=!!g.failed;}
    r.log = r.log.slice(0, bal().historyDays);
  }
  async function run(days) {
    if (UI.busy || UI.routineRunning) return;
    ensureTime(); const r = state(), end = nowAbs() + Math.min(bal().maxDays, Math.max(1, days || 1)) * 1440;
    UI.busy = true; UI.routineRunning = true; UI.routineCancel = false; r.reason = null;
    const t0 = nowAbs(), s0 = snapshot(), d0 = G.day; UI.routineProg = { t0, end };
    let painted = performance.now(); render();
    try {
      while (nowAbs() < end) {
        const reason = safety(); if (reason) { r.reason = reason; break; }
        /* 자동 공략: 조건이 맞으면 이 시간에 게이트를 다녀온다 (engine/autoraid.js) */
        { const day = G.day, start = nowAbs(), before = snapshot(), ar = AUTORAID.tick(); if (ar) { record(day, before, nowAbs() - start); if (G.dead) { r.reason = '인생이 끝났습니다.'; break; } if (performance.now() - painted >= 200) { render(); painted = performance.now(); } continue; } }
        plan(); const day = G.day, start = nowAbs(), before = snapshot(), until = Math.min(end, (day + 1) * 1440, start + bal().stepMin);
        if (until === (day + 1) * 1440) await SIM.ensure(day + 1);
        if (UI.routineCancel) { r.reason = '직접 일과를 멈췄습니다.'; break; }
        const result = runTime('routine', { until, span: true, start });
        record(day, before, nowAbs() - start);
        r.reason = result?.stop?.replaceAll('<b>', '').replaceAll('</b>', '') || safety();
        if (performance.now() - painted >= 200) { render(); painted = performance.now(); }
        if (r.reason || nowAbs() <= start) break;
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      r.reason = r.reason || '정한 기간의 일과를 마쳤습니다.';
    } catch (error) { r.reason = '일과 처리 중 오류가 생겨 멈췄습니다.'; console.error(error); }
    finally { UI.busy = false; UI.routineRunning = false; UI.routineCancel = false; UI.routineProg = null; if (UI.screen === 'raidresult' || UI.screen === 'raid') UI.screen = 'goals'; render(); if (!G.dead && nowAbs() > t0) showResult(t0, s0, d0, r.reason); }
  }
  function panel(section = 'day') {
    const r = state(), B = bal(), today = G.schedule[wd(G.day)] || [];
    if(section==='records')return summaryHTML()+recordsHTML();
    const focused=GOALS.active().filter(g=>g.focus); 
    return `<div class="row" style="margin-bottom:12px;flex-wrap:wrap"><span class="muted">지금 집중</span>${focused.length?focused.map(g=>`<span class="chip">${esc(GOALS.name(DB.objectives[g.tpl],g.target))}</span>`).join(''):'<span class="muted">지정한 목표 없음 · 성격과 생활 상태를 고려합니다.</span>'}<button class="btn sm" data-rtab="goals">목표 관리</button></div><div class="panel" style="margin-bottom:14px"><div class="ph">자동 일과</div><div class="pb">
      <div class="row" style="flex-wrap:wrap;margin-bottom:10px"><button class="btn ${r.mode === 'auto' ? 'pri' : ''}" data-routine-mode="auto" aria-pressed="${r.mode === 'auto'}">매일 자동 편성</button><button class="btn ${r.mode === 'manual' ? 'pri' : ''}" data-routine-mode="manual" aria-pressed="${r.mode === 'manual'}">수동 일정 유지</button><button class="btn" data-go="schedule">일정표 수정</button><button class="btn" data-rplan="1">오늘 계획 확인</button>
      </div>
      <p class="muted">집중 목표가 있으면 그 방향을 우선합니다. 자동 편성은 매일 오늘 일정을 새로 만들고, 수동 모드는 편집한 주간 일정을 반복합니다. 게이트 공략은 아래 '자동 공략'을 켜면 맡길 수 있습니다. 청혼·가입처럼 직접 결정할 일은 자동 실행하지 않습니다.</p>
      <p class="muted">안전선: HP ${B.hpMin}% · 기력 ${B.energyMin} 이하 / 스트레스 ${B.stressMax} 이상 · 중요 메시지·계약 제안 · 현재 지역 브레이크 ${B.urgentHours}시간 전이면 멈춥니다.</p>
      <div role="status">${UI.routineRunning ? '일과 진행 중 · ' : ''}${esc(r.reason || '기간을 골라 일과를 시작하세요.')}</div>${progHTML()}
      <div class="row" style="flex-wrap:wrap;margin-top:10px">${today.map(b => `<span class="chip">${hhmm(b.at)} ${esc(DB.actions[b.act]?.name || b.act)}</span>`).join('')}</div>
      <p class="muted">${prefs().autoRaid.on==='on'?'공략은 아래 자동 공략 설정대로 다녀옵니다. 직접 고르려면':'공략이 필요한 목표는'} <button class="btn sm" data-go="gates">게이트 확인</button>에서 공략을 선택하세요. 중요 메시지는 <button class="btn sm" data-go="messenger">메신저</button>에서 확인할 수 있습니다.</p>
      </div></div>${AUTORAID.panelHTML()}${reportHTML()}${activityBrowser()}`;
  }
  /* 진행 막대 (맡긴 기간 중 지난 비율) */
  function progHTML(){const p=UI.routineProg;if(!UI.routineRunning||!p)return '';const f=Math.max(0,Math.min(100,Math.round((nowAbs()-p.t0)/Math.max(1,p.end-p.t0)*100)));return `<div class="rprog" role="progressbar" aria-valuenow="${f}" aria-valuemin="0" aria-valuemax="100" aria-label="일과 진행"><i style="width:${f}%"></i><span>${dateOf(G.day).m}/${dateOf(G.day).d} ${hhmm(G.time)} · ${f}%</span></div>`;}
  /* 끝나면 결과 한 장 (맡긴 기간 동안 바뀐 것) */
  function showResult(t0,s0,d0,reason){const s1=snapshot(),dt=nowAbs()-t0,ar=(G.autoRaid?.log||[]).filter(x=>(x.t??x.day*1440)>=t0),row=(k,v)=>`<div class="row" style="justify-content:space-between"><span>${k}</span><b class="num">${v}</b></div>`,sg=v=>(v>0?'+':'')+v;
    const ups=[];if(s1.level>s0.level)ups.push(`레벨 ${s0.level} → ${s1.level}`);if(s1.rank<s0.rank)ups.push(`등급 ${s0.rank}급 → ${s1.rank}급`);if(G.player.statPts)ups.push(`분배할 스탯 포인트 ${G.player.statPts}`);
    const wait=G.alerts.filter(m=>m.ev&&!m.resolved).length,msg=G.threads.filter(t=>t.event&&!t.event.resolved).length;
    showInfo(`<h2>일과 결과</h2><div class="muted" style="margin-bottom:10px">${durTxt(dt)} 진행 · ${esc(reason||'')}</div><div style="display:grid;gap:6px">
      ${row('돈',`${won(s1.money-s0.money)}`)}${row('코인',sg(s1.coin-s0.coin))}${row('게이트 공략',`${s1.raids-s0.raids}회 (성공 ${s1.cleared-s0.cleared})`)}${row('훈련',durTxt(s1.train-s0.train))}${row('교류',`${s1.social-s0.social}회`)}${row('목표 달성',`${s1.done-s0.done}개`)}${row('부상',`${s1.inj}곳${s1.inj>s0.inj?` (+${s1.inj-s0.inj})`:''}`)}
      ${ups.length?`<div class="good">${ups.map(esc).join(' · ')}</div>`:''}
      ${ar.length?`<div class="sub" style="margin-top:6px">자동 공략</div>${ar.slice(0,8).map(x=>`<div style="font-size:12px">${dateOf(x.day).m}/${dateOf(x.day).d} ${x.rank}급 ${esc(x.name)} — ${x.ok?'<span class="good">성공</span>':'<span class="warn">후퇴</span>'}${x.pay?' · '+won(x.pay):''}${x.sold?' · 판매 '+won(x.sold):''} · EXP +${x.exp}${x.inj?' · 부상 '+x.inj:''}</div>`).join('')}`:''}
      ${wait||msg?`<div class="warn" style="margin-top:6px">답할 것: 메시지 ${msg} · 알림 ${wait}</div>`:''}</div>
      <div class="row" style="margin-top:12px;gap:6px"><button class="btn" data-ivclose="1" data-go="alerts">알림 보기</button><button class="btn pri" data-ivclose="1">닫기</button></div>`);}
  function recordsHTML(){const r=state();return `<div class="panel" style="margin-bottom:14px"><div class="ph">최근 일과 기록</div><div class="pb">${r.log.length ? r.log.map(x => `<div style="margin-bottom:8px">${dateOf(x.day).m}/${dateOf(x.day).d} · ${durTxt(x.minutes)} · 자금 ${won(x.money)} · 훈련 ${durTxt(x.train)} · 교류 ${x.social}회 · 공략 ${x.raids||0}회 · 목표 달성 ${x.done}개 · 실행 못 함 ${x.skipped||0}회${Object.values(x.goals||{}).map(g=>`<div class="muted">${esc(g.name)}: ${Math.round(g.from*100)}% → ${Math.round(g.to*100)}%${g.done?' · 달성':g.failed?' · 기한 종료':''}</div>`).join('')}</div>`).join('') : '<span class="muted">일과를 맡기면 날짜별 진행 결과가 쌓입니다.</span>'}</div></div>`;}
  function browse(kind){const b=(UI.routineBrowse=UI.routineBrowse||{});return b[kind]||(b[kind]={q:'',page:0});}
  function summaryHTML(){const rows=state().log.filter(x=>x.day>=G.day-6&&x.day<=G.day);if(!rows.length)return '';const sum=k=>rows.reduce((n,x)=>n+(x[k]||0),0);return `<div class="panel" style="margin-bottom:14px"><div class="ph">최근 7일 결산 <span class="muted">· 일과를 맡긴 시간 기준</span></div><div class="pb">진행 ${durTxt(sum('minutes'))} · 자금 증감 ${won(sum('money'))} · 훈련 ${durTxt(sum('train'))} · 교류 ${sum('social')}회 · 목표 달성 ${sum('done')}개${sum('skipped')?`<p class="warn">조건을 만족하지 못해 ${sum('skipped')}회 실행하지 못했습니다. 오늘의 선택과 막힌 일을 확인하세요.</p>`:''}${sum('money')<0?'<p class="muted">지출이 수입보다 많았습니다. 수입 활동의 조건과 재정을 확인하세요.</p>':''}</div></div>`;}
  function page(kind){const b=browse(kind);return ROUTINE_CATALOG.page(kind,b.q,b.page);}
  function browserControls(kind){const b=browse(kind),p=page(kind);return `<div class="row" style="flex-wrap:wrap;padding:10px"><input id="routine-query-${kind}" aria-label="${kind==='objectives'?'목표':'활동'} 검색" value="${esc(b.q)}" placeholder="이름·설명·ID 검색"><button class="btn sm" data-rsearch="${kind}">검색</button><button class="btn sm" data-rbrowse="${kind}|${p.index-1}" ${p.index===0?'disabled':''}>이전</button><span>${p.index+1}/${p.pages} · ${p.total}개</span><button class="btn sm" data-rbrowse="${kind}|${p.index+1}" ${p.index+1>=p.pages?'disabled':''}>다음</button></div>`;}
  function activityBrowser(){const p=page('actions'),a=DB.actions[UI.routineInspect];return `<details class="panel" style="margin-bottom:14px" ${UI.routineOpen||UI.routineInspect?'open':''}><summary class="ph">활동 찾아보기</summary>${browserControls('actions')}<div class="pb">${p.rows.map(a=>`<button class="btn sm" style="margin:3px" data-rinspect="${a.id}">${esc(a.name)}</button>`).join('')}${a?`<div style="margin-top:10px"><b>${esc(a.name)}</b> · ${esc(ROUTINE_CATALOG.restriction(a)||actCheck(a,a.durs[0],false).why[0]||'지금 실행 조건을 만족하는 활동')}<p>${esc(a.desc||'')}</p></div>`:''}</div></details>`;}
  function reportHTML(){const p=state().report;if(!p)return '';return `<details class="panel" style="margin-bottom:14px"><summary class="ph">오늘의 선택과 막힌 일</summary><div class="pb"><div class="muted">${dateOf(p.day).m}/${dateOf(p.day).d} 자동 편성 기준 · 목표 방향과 회복 필요를 함께 고려했습니다.${state().mode==='manual'?' 현재는 수동 일정을 실행합니다.':''}</div>${p.chosen.map(x=>`<div>${hhmm(x.at)} ${esc(DB.actions[x.act]?.name||x.act)} · ${x.goals.length?x.goals.map(id=>esc(p.goals.find(g=>g.id===id)?.name||'목표')).join(' · '):'생활 유지·회복·목표를 위한 준비'}</div>`).join('')}${p.goals.filter(g=>!g.possible).map(g=>`<p class="warn">${esc(g.name)}: 자동으로 직접 진척시킬 수 있는 활동이 없습니다.${g.route?` <button class="btn sm" data-go="${g.route}">필요한 일 확인</button>`:''}</p>`).join('')}${p.blocked.length?`<details><summary>선택하지 못한 이유</summary>${p.blocked.map(([why,n])=>`<div class="muted">${esc(why)} · ${n}건</div>`).join('')}</details>`:''}</div></details>`;}
  return { state, focus, plan, safety, record, snapshot, run, panel, noteSkip, browse, page, browserControls };
})();
