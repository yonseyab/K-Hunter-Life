/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.player.contract.until=ymOf(G.day)});
await p.evaluate(()=>{runTime('morning')});console.log(await p.evaluate(()=>JSON.stringify((G.offers||[]).map(o=>[o.gid,o.share,o.renew]))+' '+G.alerts[0].subj));
await p.evaluate(()=>{UI.screen='squad';render()});await p.screenshot({path:''+OUT+'/h_renew.png'});
await p.locator('[data-offer$="|ok"]').first().click();console.log(await p.evaluate(()=>JSON.stringify(G.player.contract)+' '+G.player.guild));
// ignore path
await p.evaluate(()=>{G.player.contract={share:8,until:ymOf(G.day),bonus:'—'};G.offers=[];for(let i=0;i<7;i++)runTime('morning')});console.log('ignored →',await p.evaluate(()=>G.player.guild));
console.log(await p.evaluate(()=>G.history.slice(0,8).map(r=>r.join(' ')).join('\n')));
await p.evaluate(()=>{UI.screen='profile';UI.profileId=G.player.id;UI.profTab='기록';render()});
console.log('errs',errs);await b.close()})();
