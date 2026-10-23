/* =========================================================
   tools/qa_sim.js — 자동 QA 봇 (K-Hunter-Life, docs/QA.md)
   실시간 재생 엔진(PLAY)으로 헌터 인생을 DAYS 일 동안 흘리며 검사한다:
     오류(pageerror · console · 요청 실패) · 불변식(돈 · 기력 · 시각 · 누적 목록) · 이야기 창 문장(undefined · NaN · 치환 안 된 {x} · 조사 표시 '(가)')
     모든 화면 · 탭 렌더 · 하루 계산 시간 · 세이브 크기 · 저장 왕복 · 공략 빈도 · 사망 · 고비 · 감정 · 성격 변화
   실행: CHROMIUM=/opt/pw-browsers/chromium NODE_PATH=$(npm root -g) DAYS=120 RUNS=3 [MODE=demo] [STOP=none|big|each] node tools/qa_sim.js
   STOP=big/each 이면 멈출 때마다 봇이 무작위로 직접 고른다 (사용자처럼). 기본 none = 전부 캐릭터가 결정
   ========================================================= */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../game/index.html');
const DAYS=+process.env.DAYS||60,RUNS=+process.env.RUNS||1,MODE=process.env.MODE||'new',STOP=process.env.STOP||'none';
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM});const all=[];
for(let run=1;run<=RUNS;run++){
const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();
const issues=[];const add=(k,m)=>{const key=k+'|'+m;if(!issues.find(x=>x.key===key))issues.push({key,k,m})};
p.on('pageerror',e=>add('pageerror',e.message+' @ '+(e.stack||'').split('\n').slice(1,3).join(' ')));
p.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Failed to load resource'))add('console',m.text().slice(0,200))});
p.on('requestfailed',r=>{if(!/fonts\.g/.test(r.url()))add('request',r.url().slice(-100))});
await p.goto(APP);await p.waitForFunction(()=>typeof DB!=='undefined');await p.evaluate(()=>localStorage.clear());
await p.evaluate(async({MODE,STOP})=>{await packsLoad();if(MODE==='demo')gameFromScenario('SC_BDEMO');else{const c=newCC();autoAll(c);gameFromCreation(c)}enterGame();await poolPrefetch();prefs().play.stop=STOP;},{MODE,STOP});
await p.evaluate(()=>{window.QA={
  bad(t){const o=[];for(const [r,n] of [[/undefined/,'undefined'],[/\bNaN\b/,'NaN'],[/\[object Object\]/,'[object Object]'],[/\{[a-zA-Z.]+\}/,'치환 안 된 {x}'],[/\bnull\b/,'null'],[/Infinity/,'Infinity'],[/[가-힣]\((이|은|을|와|으)\)|이\(가\)|은\(는\)|을\(를\)/,'조사 표시 남음']]){const m=t.match(r);if(m)o.push(n+': …'+t.slice(Math.max(0,m.index-30),m.index+30).replace(/\s+/g,' ')+'…')}return o},
  inv(){const o=[],c=G.cond,pl=G.player;if(!Number.isFinite(G.money))o.push('money '+G.money);for(const k of ['energy','hp','stress'])if(!Number.isFinite(c[k])||c[k]<-0.001)o.push('cond.'+k+' '+c[k]);
    if(c.energy>energyMax()+0.01)o.push('energy>max');if(c.stress>100.01)o.push('stress>100');if(!Number.isFinite(G.time)||G.time<0||G.time>=1440)o.push('time '+G.time);
    if(G.alerts.length>DB.balance.BAL_ALERT.keep+30)o.push('alerts '+G.alerts.length);if((G.story||[]).some(x=>LIFE_LOG.monthOf(x)!==LIFE_LOG.monthOfDay(G.day)))o.push('story has another month');if((G.news||[]).length>500)o.push('news '+G.news.length);
    if(Object.keys(G.genGates||{}).length>1500)o.push('genGates '+Object.keys(G.genGates).length);if((G.emoLog||[]).length>2200)o.push('emoLog '+G.emoLog.length);if((G.chron||[]).length>4100)o.push('chron');
    for(const [k,v] of Object.entries(G.emo?.v||{}))if(!(v>=0&&v<=100))o.push('emo '+k+' '+v);
    for(const [k,v] of Object.entries(G.bio?.pers||{}))if(!(v>=1&&v<=10))o.push('pers '+k+' '+v);
    (invOf()||[]).forEach(r=>{if(!DB.items[r.item])o.push('없는 아이템 '+r.item);if(!(r.qty>0))o.push('수량 '+r.item)});return o},
  pick(){/* 멈추면 사용자처럼 무작위로 직접 고른다 */let n=0;if(G.retroOpen){LIFE.note(G.retroOpen.i,Math.random()<.5?'QA 한 줄':'');n++}
    for(const x of EVT.pending()){const ok=x.ev.choices.map((c,i)=>i).filter(i=>EVT.okChoice(x.ev.choices[i],x.tgt));if(Math.random()<.5)EVT.resolve(x,ok[Math.floor(Math.random()*ok.length)],'me');else EVT.auto(x);n++}
    if(UI.raid&&!UI.raid.done){let k=0;while(UI.raid&&!UI.raid.done&&!G.dead&&k++<100){if(UI.raid.crisis)PLAY.chooseCrisis();else PLAY.stepSync(1)}n++}
    G.pendingPick=false;return n},
  screens(){const out=[],S=[...NAV.flatMap(g=>g[1].map(x=>x[0])),'schedule','news'];for(const s of S){try{UI.screen=s;const t0=performance.now();render();const ms=performance.now()-t0;if(ms>500)out.push('느린 화면 '+s+' '+Math.round(ms)+'ms');QA.bad($('#main')?.innerText||'').forEach(x=>out.push(s+' · '+x));
      for(const sel of ['[data-settingstab]','[data-sttab]','[data-rtab]','[data-guildtab]','[data-dbtab]','[data-gtab]','[data-kdetail]']){const n=document.querySelectorAll(sel).length;for(let i=0;i<n&&i<8;i++){const el=document.querySelectorAll(sel)[i];if(!el)break;el.click();QA.bad($('#main')?.innerText||'').forEach(x=>out.push(s+' '+sel+'#'+i+' · '+x))}}}catch(e){out.push(s+' 렌더 오류 '+e.message)}}UI.screen='life';render();return out}};});
const t0=Date.now();let per=[],stops=0,picks=0;
for(let d=0;d<DAYS;d++){
  const r=await p.evaluate(async()=>{if(G.dead)return {dead:G.dead};const a=performance.now();let st=0,pk=0;
    for(let k=0;k<24&&!G.dead;k++){const o=await PLAY.step(60);if(o){st++;pk+=QA.pick()}}
    const h=G.player;while((h.statPts||0)>0){const ks=Object.keys(h.stats);h.stats[ks[Math.floor(Math.random()*ks.length)]]++;h.statPts--;rankCheck()}
    return {ms:Math.round(performance.now()-a),st,pk,inv:QA.inv(),bad:G.story.filter(x=>x.t>=nowAbs()-1440).flatMap(x=>QA.bad(x.s)).slice(0,3)}});
  if(r.dead){console.log(`[run ${run}] 사망 day ${d}:`,r.dead.cause);break}
  per.push(r.ms);stops+=r.st;picks+=r.pk;(r.inv||[]).forEach(x=>add('불변식',x));(r.bad||[]).forEach(x=>add('문장',x));
  if((d+1)%30===0){const sc=await p.evaluate(()=>QA.screens());sc.forEach(x=>add('화면',x));console.log(`[run ${run}] day ${d+1} · 하루 평균 ${Math.round(per.slice(-30).reduce((a,x)=>a+x,0)/Math.min(30,per.length))}ms`)}
}
const sum=await p.evaluate(()=>{const k={};(G.story||[]).forEach(x=>k[x.k]=(k[x.k]||0)+1);const days=Math.max(1,G.day-(G.startDay??0));
  const save=JSON.stringify(G).length;let rt=null;if(!G.dead){saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=JSON.parse(JSON.stringify(s.data));enterGame();rt=G.player.name===s.name}
  const parts=Object.entries(G).map(([k,v])=>[k,JSON.stringify(v)?.length||0]).sort((a,b)=>b[1]-a[1]).slice(0,6);
  return {name:G.player.name,days,dead:G.dead?.cause||null,raids:G.stats?.raids||0,cleared:G.stats?.cleared||0,perWeek:Math.round((G.stats?.raids||0)/days*7*10)/10,rank:DB.ranks[G.player.rank].name+'급',lv:G.player.level,money:G.money,
    ms:(G.milestones||[]).map(m=>m.id.replace('MS_','')),pers:(G.persLog||[]).length,emo:EMO.name(),save,parts,rt,story:k,open:vals('gates').filter(g=>gateSt(g.id).status==='open').length,gen:Object.keys(G.genGates||{}).length}});
const res={run,mode:MODE,stop:STOP,days:sum.days,sec:Math.round((Date.now()-t0)/1000),avgDayMs:Math.round(per.reduce((a,x)=>a+x,0)/Math.max(1,per.length)),stops,picks,...sum,issues:issues.map(x=>x.k+': '+x.m)};
console.log(JSON.stringify(res));all.push(res);await p.close();}
const deaths=all.filter(x=>x.dead).length;console.log(`\n== ${RUNS}회 · ${DAYS}일 · 사망 ${deaths} · 평균 주당 공략 ${(all.reduce((a,x)=>a+x.perWeek,0)/all.length).toFixed(1)} · 문제 ${all.reduce((a,x)=>a+x.issues.length,0)}건`);
await b.close();process.exit(all.some(x=>x.issues.length)?1:0)})();
