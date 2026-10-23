/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 들은 이야기(KNOW.hear) · 수다 · 같이 보내는 저녁 · 협회 위탁 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('home');G.stopOn.event=false;G.stopOn.lowEnergy=false});
const known=await p.evaluate(()=>G.relations.find(r=>H(r.id))?.id);
console.log('happen→heard',await p.evaluate(id=>{G.happen=[{k:'npcRankUp',who:id,data:{rank:'12'},t:nowAbs()},{k:'npcInjured',who:id,data:{gate:'공덕역 게이트'},t:nowAbs()}];processHappen();return KNOW.heard(id).map(h=>h.text+' / '+h.src)},known));
console.log('rumor→heard',await p.evaluate(id=>{rumorAdd([id],nameOf(id)+'이(가) 해외 길드 제안을 받았다는 소문',false);return KNOW.heard(id)[0]},known));
console.log('gossip',await p.evaluate(()=>{const [a,b2]=G.relations.map(r=>r.id);DB.balance.BAL_KNOW.gossip=1;G.rumors.unshift({about:[b2],text:'시험용 소문 '+nameOf(b2),truth:true,t:nowAbs()});return gossipFrom(a)+' | '+JSON.stringify(KNOW.heard(b2)[0])}));
await p.evaluate(id=>{UI.profileId=id;UI.profTab='생활';UI.screen='profile';render()},known);
console.log('panel',await p.evaluate(()=>[...document.querySelectorAll('.ph')].some(x=>x.textContent.includes('들은 이야기'))));
await p.screenshot({path:OUT+'/hear.png'});
/* 같이 보내는 저녁 */
console.log('together',await p.evaluate(()=>{const r=G.relations.find(r=>H(r.id));r.status='RS_SPOUSE';homeOf().partner=r.id;if(G.ai?.[r.id])G.ai[r.id].today=[];homeOf().lastTogether=G.day-10;G.loc={region:G.player.region,pt:'PT_HOME'};const c0=r.to.RD_CLOSE;G.togetherDay=null;G.time=1200;togetherTick(60);const c1=r.to.RD_CLOSE;
  homeOf().lastTogether=G.day-10;const ro=r.from.RD_ROMANCE;missDay(r);return [c0,c1,homeOf().togetherN,ro,r.from.RD_ROMANCE,threadWith(r.id).msgs.slice(-1)[0]?.t]}));
/* 협회 위탁 */
console.log('consign',await p.evaluate(()=>{enterGame('squad');leaveGuild();G.money=80000000;G.rep=60;foundGuild('위탁 시험 길드');const g=G.myGuild;g.tier='GTR_4';const ids=consignMonth(g);return [ids.length,ids.map(id=>`${DB.gates[id].name} ${DB.gates[id].rank} permit=${hasPermit(DB.gates[id])}`).join(' | '),G.alerts[0]?.subj]}));
await p.evaluate(()=>{runTime('week')});
console.log('errs',errs);await b.close()})();
