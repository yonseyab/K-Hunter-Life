/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* NPC 자율 행동: 인구 생성 · 하루 처리 시간 · 공략 · 성장 · 저장 왕복 */
const t0=Date.now();await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('init ms',Date.now()-t0,await p.evaluate(()=>JSON.stringify({n:G.pop.n,...(({byRank,last,...r})=>r)(SIM.stats())})));
console.log('rank dist',await p.evaluate(()=>SIM.stats().byRank.map((c,i)=>i?i+':'+c:'').filter(Boolean).join(' ')));
const lv0=await p.evaluate(()=>vals('hunters').map(h=>h.level).join(','));
const t1=Date.now();await p.evaluate(()=>{runTime('week')});console.log('week ms',Date.now()-t1,'day ms',await p.evaluate(()=>G.simStat.ms));
console.log('world',await p.evaluate(()=>JSON.stringify(G.simStat)));
console.log('levels',lv0,'→',await p.evaluate(()=>vals('hunters').map(h=>h.level).join(',')));
console.log('npc today',await p.evaluate(()=>{const a=G.ai.HN_B0002;return JSON.stringify({goals:a.goals.map(i=>vals('aiGoals')[i].name),today:a.today.map(t=>t.act+(t.gate?'@'+t.gate:'')),money:a.money,why:a.why[1]})}));
console.log('civ today',await p.evaluate(()=>{const a=G.ai.NP_B0003;return a.today.map(t=>t.act).join(',')}));
console.log('gates',await p.evaluate(()=>vals('gates').map(g=>{const s=gateSt(g.id);return g.name+':'+s.status+(s.by?'('+s.by+')':'')}).join(' | ')));
console.log('news',await p.evaluate(()=>G.news.slice(0,6).map(n=>n.title).join(' / ')));
/* 승격 · 검색 */
console.log('search',await p.evaluate(()=>{const r=SIM.search('김','HUNTER',5);return r.total+' '+r.rows.map(x=>x.name+x.rank).join(',')}));
console.log('promote',await p.evaluate(()=>{const id=SIM.search('','FREE',1).rows[0].id;const h=H(id);return [h.id,h.name,h.rank,h.level,ablSum(h),Object.values(h.stats).reduce((a,b)=>a+b,0)].join(' ')}));
/* 저장 왕복 (IndexedDB) */
console.log('save',await p.evaluate(async()=>{saveGame('slot2');await new Promise(r=>setTimeout(r,800));const lv=SIM.POP.level.slice(0,50).join(),m=SIM.POP.money[7];SIM.POP.level.fill(0);const res=await SIM.load('slot2');return [res,SIM.POP.level.slice(0,50).join()===lv,SIM.POP.money[7]===m]}));
const t2=Date.now();await p.evaluate(()=>{for(let i=0;i<4;i++)runTime('week')});console.log('month ms',Date.now()-t2,await p.evaluate(()=>JSON.stringify((({byRank,last,...r})=>r)(SIM.stats()))));
/* 화면: DB 인물(수만 명 검색) · 세계 통계 · NPC 생활 탭(개발자 보기) · 파티 후보 */
await p.evaluate(()=>{DB_UI.open('people')});console.log('db count',await p.locator('#dbx-count').innerText());await p.screenshot({path:OUT+'/sim_db.png'});
await p.evaluate(()=>{SETTINGS.dev=true;UI.screen='profile';UI.profileId='HN_B0002';UI.profTab='생활';render()});await p.screenshot({path:OUT+'/sim_life.png'});
console.log('cands',await p.evaluate(()=>{leaveGuild();UI.prep={gid:'GT_0001',party:[],retreat:35};return raidCands().map(h=>h.name+'/'+h.rank).slice(0,8).join(',')}));
console.log('errs',errs.slice(0,5));await b.close()})();
