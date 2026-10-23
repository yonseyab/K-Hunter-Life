/* 내 헌터 > 상태창. 분배안은 UI에만 두며 적용 전에는 G를 변경하지 않는다.
   세부 능력 화면은 만들지 않고, 기존 성장 · HP/MP · 등급 규칙을 사용한다. */
const HUNTER_STATUS = (() => {
  let plan = null, lastStamp = '';
  const stats = () => vals('baseStats');
  const budget = () => Math.max(0, Math.floor(G.player.statPts || 0));
  const used = d => stats().reduce((sum,s)=>sum+(d.add[s.id]||0),0);
  const signature = () => JSON.stringify([G.player.level,G.player.awake,budget(),stats().map(s=>G.player.stats[s.id]||0)]);
  function draft() {
    const stamp = signature();
    if (!plan || plan.game !== G || plan.player !== G.player || plan.stamp !== stamp) {
      const changed = plan && plan.game === G && plan.player === G.player && used(plan)>0;
      plan = {game:G,player:G.player,stamp,add:{},note:changed?'현재 능력치 변경으로 분배안 초기화':''};
    }
    return plan;
  }
  function preview() {
    const d = draft(), current = G.player, next = {...current,stats:{...current.stats}};
    stats().forEach(s=>next.stats[s.id]=(current.stats[s.id]||0)+(d.add[s.id]||0));
    return {current,next,before:vitals(current),after:vitals(next),spent:used(d),left:budget()-used(d)};
  }
  const n = value => Number(value).toLocaleString('ko-KR');
  function allocationHTML() {
    const d = draft(), p = preview(), div = DB.balance.BAL_EFFECT.statDiv;
    const change = (before,after) => `<span>${n(before)}</span><span class="hs-arrow" aria-hidden="true">→</span><b class="${after>before?'good':''}">${n(after)}</b>`;
    const meter = (key,before,after,ratio) => `<div class="hs-preview-row" data-hs-preview="${key}" data-before="${before}" data-after="${after}"><span>${key}</span><span>${change(before,after)}</span></div><div class="hs-preview-sub">현재 ${key.replace('최대 ','')} ${n(Math.round(before*ratio/100))} → ${n(Math.round(after*ratio/100))}</div>`;
    return `<section class="hs-section" id="hs-allocation"><header><span>스탯 분배</span><span>남은 포인트 <b data-hs-remaining>${p.left}</b> / ${budget()}</span></header>
      <div class="hs-allocation-layout"><div class="hs-stat-list">${stats().map(s=>{
        const add=d.add[s.id]||0, before=p.current.stats[s.id]||0;
        return `<div class="hs-stat-row" data-hs-stat="${s.id}"><div class="hs-stat-name"><b>${esc(s.name)}</b><span>${esc(s.desc)}</span></div><div class="hs-stat-control"><span class="hs-stat-before">${n(before)}</span><span class="hs-arrow">→</span><b data-hs-stat-after="${s.id}">${n(before+add)}</b><button type="button" data-hs-adjust="${s.id}|-1" aria-label="${esc(s.name)} 분배 1 줄이기" ${!add||G.dead?'disabled':''}>−</button><span class="hs-stat-added" data-hs-added="${s.id}">+${add}</span><button type="button" data-hs-adjust="${s.id}|1" aria-label="${esc(s.name)} 분배 1 늘리기" ${p.left<=0||G.dead?'disabled':''}>+</button></div></div>`;
      }).join('')}</div><div class="hs-preview" aria-label="스탯 분배 예상 변화"><div class="hs-preview-heading"><span>예상 변화</span><span>현재 → 적용 후</span></div>
        ${meter('최대 HP',p.before.hp,p.after.hp,G.cond.hp??100)}${meter('최대 MP',p.before.mp,p.after.mp,G.cond.mp??100)}
        <div class="hs-preview-bonuses">${stats().map(s=>{const before=Math.floor((p.current.stats[s.id]||0)/div)-1,after=Math.floor((p.next.stats[s.id]||0)/div)-1;return `<div class="hs-preview-row" data-hs-bonus="${s.id}"><span>${esc(s.name)} 판정 보정</span><span>${change(before,after)}</span></div>`;}).join('')}</div>
      </div></div><footer class="hs-allocation-footer"><span class="muted">${d.note || (p.spent?`${p.spent}포인트 분배 예정`:'적용 전까지 포인트 유지')}</span><div><button class="btn sm" data-hs-reset ${!p.spent?'disabled':''}>초기화</button><button class="btn sm pri" data-hs-apply ${!p.spent||G.dead?'disabled':''}>${p.spent?`${p.spent}포인트 적용`:'적용'}</button></div></footer></section>`;
  }
  function classHTML() {
    const h=G.player,c=DB.classes[h.cls],role=DB.roles[h.roleMain],category=c&&DB.classCats[c.cat];
    return `<section class="hs-section" id="hs-class"><header><span>클래스</span><span class="muted">${esc(category?.name||'')}</span></header><div class="hs-class-body"><div><b>${esc(c?.name||'없음')}</b><span class="muted">${esc(role?.name||'')}${h.roleSub&&DB.roles[h.roleSub]?' · '+esc(DB.roles[h.roleSub].name):''}</span></div>${c?.desc?`<p>${esc(c.desc)}</p>`:''}<div class="hs-class-meta"><span class="muted">각성</span><span>${esc(h.awakened||'—')}</span><span class="muted">클래스 스킬</span><span>${(h.skills||[]).filter(([id])=>DB.skills[id]?.scope==='class').length}개</span><span class="muted">공용 스킬</span><span>${(h.skills||[]).filter(([id])=>DB.skills[id]?.scope==='common').length}개</span></div></div></section>`;
  }
  function skillsHTML() {
    const L=G.player.skills||[];
    return `<section class="hs-section" id="hs-skills"><header><span>스킬</span><span class="muted">${L.length}개</span></header>${L.length?`<table class="hs-table hs-skill-table"><thead><tr><th>스킬</th><th>숙련</th><th>효과</th></tr></thead><tbody>${L.map(([id,pf])=>{const s=DB.skills[id];return `<tr><td>${esc(s?.name||'알 수 없는 스킬')}<small>${s?.scope==='class'?'클래스':'공용'} · ${esc(s?.kind||'—')}</small></td><td class="hs-skill-prof">${n(pf)}</td><td>${esc(s?.desc||'—')}</td></tr>`;}).join('')}</tbody></table>`:'<div class="hs-empty muted">보유 스킬 없음</div>'}</section>`;
  }
  function traitsHTML() {
    const L=G.player.traits||[];
    return `<section class="hs-section" id="hs-traits"><header><span>특성</span><span class="muted">${L.length}개</span></header>${L.length?`<table class="hs-table hs-trait-table"><thead><tr><th>특성</th><th>분류</th><th>설명</th></tr></thead><tbody>${L.map(id=>{const t=DB.traits[id];return `<tr><td>${esc(t?.name||'알 수 없는 특성')}</td><td>${esc(DB.traitCats[t?.cat]?.name||'—')}</td><td>${esc(t?.desc||'—')}</td></tr>`;}).join('')}</tbody></table>`:'<div class="hs-empty muted">보유 특성 없음</div>'}</section>`;
  }
  function html() {
    lastStamp = stamp();
    const tabs=[['base','기본 상태'],['classSkills','클래스 · 스킬'],['traits','특성']],tab=tabs.some(([id])=>id===UI.hunterStatusTab)?UI.hunterStatusTab:'base';
    return `<div id="hunterStatus" class="hunter-status"><div class="home-category-tabs hs-tabs" role="tablist" aria-label="상태창 상세">${tabs.map(([id,label])=>`<button role="tab" id="hs-tab-${id}" data-hs-tab="${id}" aria-selected="${id===tab}" aria-controls="hs-content" tabindex="${id===tab?0:-1}">${label}</button>`).join('')}</div><div id="hs-content" class="hs-content" role="tabpanel" aria-labelledby="hs-tab-${tab}">${tab==='base'?`<div id="hs-overview">${statusWindowHTML(G.player,true,{hunter:true})}</div>`:tab==='classSkills'?`${classHTML()}${skillsHTML()}`:traitsHTML()}</div><div id="hs-message" class="hs-message" role="status" aria-live="polite"></div></div>`;
  }
  function renderStatus() {
    const root=document.getElementById('hunterStatus'); if(!root)return;
    const scroll=document.getElementById('main')?.scrollTop||0;
    root.outerHTML=html();const main=document.getElementById('main');if(main)main.scrollTop=scroll;
  }
  function stamp() { return JSON.stringify([signature(),G.coin,G.cond.hp,G.cond.mp,G.player.exp,G.player.rank,G.player.cls,G.player.skills,G.player.traits,(G.injuries||[]).length,locOf()]); }
  function refresh() { const root=document.getElementById('hunterStatus'); if(!root||root.contains(document.activeElement)||stamp()===lastStamp)return;renderStatus(); }
  function apply() {
    const previous=plan,d=draft();
    if(previous!==d&&previous&&used(previous)>0){renderStatus();document.getElementById('hs-message').textContent='현재 능력치 변경 · 분배안 초기화';return;}
    const count=used(d);if(G.dead||!count||count>budget())return;
    const next={...G.player.stats};
    for(const s of stats()){const add=d.add[s.id]||0;if(!Number.isSafeInteger(add)||add<0)return;next[s.id]=(next[s.id]||0)+add;}
    G.player.stats=next;G.player.statPts=budget()-count;plan=null;
    const messages=rankCheck();
    STORY.add('up',`기본 스탯에 ${count}포인트를 분배한다.`,1);
    if(SETTINGS.autosave!==false)autoSave();
    renderStatus();document.getElementById('hs-message').textContent=`${count}포인트 분배 완료${messages.length?' · '+messages.join(' · '):''}`;
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-hs-adjust],[data-hs-reset],[data-hs-apply],[data-hstatus-scroll],[data-hs-tab]');
    if(!b||b.disabled||UI.mode!=='app'||!document.getElementById('hunterStatus'))return;
    if(b.dataset.hsTab){UI.hunterStatusTab=b.dataset.hsTab;renderStatus();document.getElementById('hs-tab-'+b.dataset.hsTab)?.focus();return;}
    if(b.dataset.hstatusScroll){document.getElementById('hs-'+b.dataset.hstatusScroll)?.scrollIntoView({block:'nearest'});return;}
    if(b.hasAttribute('data-hs-apply')){apply();return;}
    if(b.hasAttribute('data-hs-reset')){plan=null;renderStatus();return;}
    const [id,raw]=b.dataset.hsAdjust.split('|'),delta=+raw,d=draft();
    if(!DB.baseStats[id]||![1,-1].includes(delta)||G.dead)return;
    if(delta>0&&used(d)>=budget()||delta<0&&!(d.add[id]>0))return;
    d.add[id]=(d.add[id]||0)+delta;d.note='';
    const focus=b.dataset.hsAdjust;renderStatus();
    document.querySelector(`[data-hs-adjust="${focus}"]`)?.focus();
  });
  document.addEventListener('keydown',e=>{const tab=e.target.closest('[data-hs-tab]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const tabs=[...tab.parentElement.querySelectorAll('[data-hs-tab]')],i=tabs.indexOf(tab),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;e.preventDefault();tabs[next].click();});
  return {html,refresh,preview};
})();
