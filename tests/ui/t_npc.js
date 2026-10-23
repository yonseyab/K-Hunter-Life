/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
const lv0=await p.evaluate(()=>vals('hunters').map(h=>h.level).join(','));
await p.evaluate(()=>{runTime('week');runTime('week')});
console.log(lv0,'→',await p.evaluate(()=>vals('hunters').map(h=>h.level).join(',')));
console.log(await p.evaluate(()=>JSON.stringify(G.market)));
console.log(await p.evaluate(()=>(G.news||[]).filter(n=>n.cat!=='게이트'&&n.cat!=='속보').slice(0,5).map(n=>n.title).join(' / ')));
await p.evaluate(()=>{UI.screen='profile';UI.profileId='HN_B0009';render()});await p.screenshot({path:''+OUT+'/n_prof.png'});
await p.evaluate(()=>{UI.screen='status';render()});await p.screenshot({path:''+OUT+'/n_status.png'});
const i=await p.evaluate(()=>G.inv.findIndex(r=>r.item==='IT_B0001'&&r.loc==='LOC_BAG'));await p.evaluate(i=>{UI.screen='inventory';UI.invSel=i;render()},i);
console.log(await p.locator('[data-actdo="ACT_ASSOC_SELL"]').innerText().catch(()=>'none'));
// roundtrip & new game resets
await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(G));const c=newCC();autoAll(c);gameFromCreation(c);enterGame();G=s;enterGame()});console.log('reload',await p.evaluate(()=>vals('hunters').map(h=>h.level).join(',')));
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame()});console.log('new',await p.evaluate(()=>vals('hunters').map(h=>h.level).join(',')));
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});console.log('demo player lv',await p.evaluate(()=>G.player.level));
console.log('errs',errs);await b.close()})();
