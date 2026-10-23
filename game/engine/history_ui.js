/* 100년 이상 기록도 연/월 선택과 페이지 단위 읽기로 탐색한다. 전체 기간 검색도 월별로 읽고 중단할 수 있다. */
const HISTORY_UI=(()=>{
  const PAGE=100,FILTERS={all:null,event:['event','choice'],raid:['raid'],growth:['up','mile'],news:['news'],life:['act','move','small','meet','react','emo','pers','day','sys','decide','prologue','old']};
  let view=null,revision=0,searchTimer=null;
  const monthName=key=>`${+key.slice(0,4)}년 ${+key.slice(5)}월`;
  function homeHTML(){
    const months=LIFE_LOG.index(),count=months.reduce((n,m)=>n+m.count,0),A=LIFE_LOG.state();
    return `<section class="history-home"><header><h1 class="h1">일대기</h1><button class="btn pri" data-history-open>지난 일생 돌아보기</button></header><div class="history-home-summary"><span>${esc(G.player.name)}의 인생 기록</span><span class="muted">${months.length?monthName(months[0].month)+' — '+monthName(months.at(-1).month):'아직 기록 없음'}</span><span class="muted">${months.length.toLocaleString()}개월 · ${count.toLocaleString()}건</span></div>${A.error?`<p class="warn">${esc(A.error)} <button class="btn sm" data-history-retry-store>보관 다시 시도</button></p>`:''}</section>${typeof EMOGRAPH!=='undefined'?EMOGRAPH.html():''}`;
  }
  function close(){clearTimeout(searchTimer);revision++;const el=document.getElementById('lifeHistoryModal');view=null;el?.close();el?.remove();}
  function sync(){if(view&&(view.game!==G||UI.mode!=='app'))close();}
  function open(month){
    close();PLAY.pause();
    const months=LIFE_LOG.index(),current=LIFE_LOG.monthOfDay(G.day);
    if(!months.length)months.push({month:current,count:0,kinds:{}});
    if(month===current&&!months.some(m=>m.month===current))months.push({month:current,count:0,kinds:{}});
    const key=months.some(m=>m.month===month)?month:months.at(-1).month;
    view={game:G,months,key,q:'',kind:'all',day:'',all:false,page:0,cursors:[{mi:0,ri:0}],cache:new Map(),next:null};
    const el=document.createElement('dialog');el.id='lifeHistoryModal';el.setAttribute('aria-labelledby','lifeHistoryTitle');
    el.innerHTML=`<header class="history-heading"><h2 id="lifeHistoryTitle">지난 일생 돌아보기</h2><button class="btn sm" data-history-close aria-label="기록 닫기">닫기</button></header><div class="history-toolbar"><div class="history-period"><button class="btn sm" data-history-month-step="-1" aria-label="이전 달">‹</button><label>연도 <select data-history-year aria-label="기록 연도"></select></label><label>월 <select data-history-month aria-label="기록 월"></select></label><button class="btn sm" data-history-month-step="1" aria-label="다음 달">›</button><button class="btn sm" data-history-latest>최근 기록</button></div><div class="history-search"><input type="search" data-history-query aria-label="인생 기록 검색" placeholder="인물·장소·사건 검색"><select data-history-kind aria-label="기록 종류"><option value="all">모든 기록</option><option value="event">사건·선택</option><option value="raid">공략</option><option value="growth">성장·고비</option><option value="news">소식</option><option value="life">일상</option></select><select data-history-day aria-label="기록 날짜"><option value="">모든 날짜</option></select><label><input type="checkbox" data-history-all> 전체 기간 검색</label></div></div><div class="history-status" role="status" aria-live="polite"></div><div class="history-output" tabindex="0" aria-label="지난 인생 기록"></div><footer class="history-pager"></footer>`;
    view.dialog=el;el.addEventListener('close',()=>{if(view?.dialog===el){view=null;revision++;}el.remove();});el.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});document.body.appendChild(el);controls();el.showModal();el.querySelector('[data-history-year]').focus();void render();
  }
  function controls(){
    const C=view,el=document.getElementById('lifeHistoryModal');if(!C||!el)return;
    const years=[...new Set(C.months.map(m=>m.month.slice(0,4)))].reverse(),year=C.key.slice(0,4);
    el.querySelector('[data-history-year]').innerHTML=years.map(y=>`<option value="${y}" ${y===year?'selected':''}>${y}년</option>`).join('');
    el.querySelector('[data-history-month]').innerHTML=Array.from({length:12},(_,i)=>{const mm=String(i+1).padStart(2,'0'),key=year+'-'+mm,m=C.months.find(m=>m.month===key);return `<option value="${mm}" ${mm===C.key.slice(5)?'selected':''} ${m?'':'disabled'}>${i+1}월${m?' · '+m.count.toLocaleString()+'건':''}</option>`;}).join('');
    for(const e of el.querySelectorAll('[data-history-year],[data-history-month],[data-history-day],[data-history-month-step]'))e.disabled=C.all;
    if(!C.all){const i=C.months.findIndex(m=>m.month===C.key);el.querySelector('[data-history-month-step="-1"]').disabled=i<=0;el.querySelector('[data-history-month-step="1"]').disabled=i>=C.months.length-1;}
  }
  function resetPages(){if(!view)return;view.page=0;view.cursors=[{mi:0,ri:0}];view.next=null;}
  async function rows(C,key){
    if(C.cache.has(key))return C.cache.get(key);
    const data=await LIFE_LOG.readMonth(key,C.game);if(view!==C)return data;
    C.cache.set(key,data);while(C.cache.size>3)C.cache.delete(C.cache.keys().next().value);return data;
  }
  function matches(C,row){return (!FILTERS[C.kind]||FILTERS[C.kind].includes(row.k))&&(!C.q||row.s.toLocaleLowerCase().includes(C.q.toLocaleLowerCase()))&&(!C.day||C.all||Math.floor(row.t/1440)===+C.day);}
  function lineHTML(row,global){
    const day=Math.floor(row.t/1440),dt=dateOf(day);
    return `<div class="history-row" data-history-row>${global?`<div class="history-row-period"><span>${dt.y}.${String(dt.m).padStart(2,'0')}.${String(dt.d).padStart(2,'0')}</span><button class="btn sm" data-history-jump="${LIFE_LOG.monthOf(row)}|${day}">이 날 전체 보기</button></div>`:''}${LIFEUI.lineHTML(row)}</div>`;
  }
  async function render(){
    const C=view,el=document.getElementById('lifeHistoryModal');if(!C||!el)return;
    const token=++revision,status=el.querySelector('.history-status'),out=el.querySelector('.history-output'),pager=el.querySelector('.history-pager');
    status.textContent='기록을 불러오는 중…';out.setAttribute('aria-busy','true');pager.innerHTML='';
    try{
      let pageRows,total=0,next=null;
      if(C.all){
        pageRows=[];const months=C.months.slice().reverse(),cursor=C.cursors[C.page]||{mi:0,ri:0};
        outer:for(let mi=cursor.mi;mi<months.length;mi++){
          if(view!==C||token!==revision)return;
          const meta=months[mi];if(FILTERS[C.kind]&&!FILTERS[C.kind].some(k=>meta.kinds[k]))continue;
          status.textContent=`전체 기간 검색 중 · ${monthName(meta.month)} (${mi+1}/${months.length})`;
          const data=(await rows(C,meta.month)).slice().reverse();
          for(let ri=mi===cursor.mi?cursor.ri:0;ri<data.length;ri++)if(matches(C,data[ri])){
            if(pageRows.length===PAGE){next={mi,ri};break outer;}pageRows.push(data[ri]);
          }
          if(mi%10===0)await new Promise(resolve=>setTimeout(resolve,0));
        }
        total=pageRows.length;
      }else{
        const data=await rows(C,C.key);if(view!==C||token!==revision)return;
        const days=[...new Set(data.map(r=>Math.floor(r.t/1440)))].sort((a,b)=>a-b),select=el.querySelector('[data-history-day]');
        select.innerHTML='<option value="">모든 날짜</option>'+days.map(day=>`<option value="${day}" ${String(day)===String(C.day)?'selected':''}>${dateOf(day).d}일</option>`).join('');
        const filtered=data.filter(row=>matches(C,row));total=filtered.length;C.page=Math.min(C.page,Math.max(0,Math.ceil(total/PAGE)-1));pageRows=filtered.slice(C.page*PAGE,(C.page+1)*PAGE);next=(C.page+1)*PAGE<total?{}:null;
      }
      if(view!==C||token!==revision)return;C.next=next;
      let lastDay=null;out.innerHTML=pageRows.map(row=>{
        const day=Math.floor(row.t/1440),dt=dateOf(day),header=!C.all&&day!==lastDay?`<div class="history-day">${dt.y}년 ${dt.m}월 ${dt.d}일 (${dt.w})</div>`:'';lastDay=day;return header+lineHTML(row,C.all);
      }).join('')||'<div class="history-empty muted">조건에 맞는 기록이 없어.</div>';
      out.scrollTop=0;out.removeAttribute('aria-busy');
      status.textContent=C.all?`전체 기간 · ${C.page*PAGE+pageRows.length?C.page*PAGE+1:0}–${C.page*PAGE+pageRows.length}건${next?' · 다음 결과 있음':''}`:`${monthName(C.key)} · ${total.toLocaleString()}건${C.q?' · 검색 결과':''}`;
      pager.innerHTML=`<button class="btn sm" data-history-page="-1" ${C.page===0?'disabled':''}>이전</button><span>${C.page+1}${C.all?'페이지':' / '+Math.max(1,Math.ceil(total/PAGE))+'페이지'} · 한 번에 ${PAGE}건</span><button class="btn sm" data-history-page="1" ${!next?'disabled':''}>다음</button>`;
    }catch(e){if(view!==C||token!==revision)return;out.removeAttribute('aria-busy');status.textContent='기록을 불러오지 못했어.';out.innerHTML='<div class="history-empty">보관된 기록을 읽을 수 없어. <button class="btn sm" data-history-retry>다시 시도</button></div>';}
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-history-open],[data-history-close],[data-history-month-step],[data-history-latest],[data-history-page],[data-history-jump],[data-history-retry],[data-history-retry-store]');if(!b||b.disabled)return;
    if(b.hasAttribute('data-history-open')){open(b.dataset.historyOpen||undefined);return;}
    if(b.hasAttribute('data-history-close')){close();return;}
    if(b.hasAttribute('data-history-retry-store')){void LIFE_LOG.flush().then(()=>{if(UI.mode==='app')window.render();});return;}
    if(!view)return;const C=view;
    if(b.dataset.historyPage){if(+b.dataset.historyPage>0&&C.next){C.cursors[C.page+1]=C.next;C.page++;}else C.page=Math.max(0,C.page-1);void render();return;}
    if(b.dataset.historyMonthStep){const i=C.months.findIndex(m=>m.month===C.key),m=C.months[i+(+b.dataset.historyMonthStep)];if(m)C.key=m.month;C.day='';resetPages();controls();void render();return;}
    if(b.hasAttribute('data-history-latest')){C.key=C.months.at(-1).month;C.day='';C.all=false;document.querySelector('[data-history-all]').checked=false;resetPages();controls();void render();return;}
    if(b.dataset.historyJump){const [month,day]=b.dataset.historyJump.split('|');C.key=month;C.day=day;C.q='';C.kind='all';C.all=false;document.querySelector('[data-history-query]').value='';document.querySelector('[data-history-kind]').value='all';document.querySelector('[data-history-all]').checked=false;resetPages();controls();}
    void render();
  });
  document.addEventListener('change',e=>{
    const t=e.target;if(!view)return;const C=view;
    if(t.hasAttribute('data-history-year')){const key=t.value+'-'+C.key.slice(5);C.key=C.months.some(m=>m.month===key)?key:C.months.find(m=>m.month.startsWith(t.value+'-')).month;C.day='';}
    else if(t.hasAttribute('data-history-month')){C.key=C.key.slice(0,4)+'-'+t.value;C.day='';}
    else if(t.hasAttribute('data-history-kind'))C.kind=t.value;
    else if(t.hasAttribute('data-history-day'))C.day=t.value;
    else if(t.hasAttribute('data-history-all'))C.all=t.checked;
    else return;resetPages();controls();void render();
  });
  document.addEventListener('input',e=>{if(!view||!e.target.hasAttribute('data-history-query'))return;view.q=e.target.value.trim();resetPages();revision++;clearTimeout(searchTimer);searchTimer=setTimeout(()=>{void render();},220);});
  return {homeHTML,open,close,sync};
})();
