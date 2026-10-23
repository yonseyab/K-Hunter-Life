/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
for(let w=0;w<3;w++){await p.evaluate(()=>runTime('week'));console.log(await p.evaluate(()=>{const L=vals('gates');return `day${G.day} gates ${L.length} open ${L.filter(g=>gateSt(g.id).status==='open').length} gen ${Object.keys(G.genGates||{}).length} news ${(G.news||[]).length} alerts ${G.alerts.length}`}))}
console.log(await p.evaluate(()=>(G.news||[]).slice(0,6).map(n=>newsWhen(n)+' '+n.title).join('\n')));
await p.evaluate(()=>{UI.screen='gates';render()});await p.screenshot({path:''+OUT+'/w_gates.png'});
await p.evaluate(()=>{UI.screen='news';render()});await p.evaluate(()=>{UI.screen='home';render()});
// save/load roundtrip
await p.evaluate(()=>{saveGame('slot1')}).catch(()=>{});
const ok=await p.evaluate(()=>{const n=Object.keys(G.genGates).length;const s=JSON.parse(JSON.stringify(G));G=s;enterGame('gates');return n===vals('gates').filter(g=>g.gen).length});console.log('reload ok',ok);
// raid a generated gate
await p.evaluate(()=>{const L=vals('gates').filter(g=>g.gen&&gateSt(g.id).status==='open'),g=L.find(x=>x.region===G.player.region)||L[0];if(g){G.loc={region:g.region,pt:'PT_GATE'};UI.prep={gid:g.id,party:[],retreat:20};startRaid(g.id);if(UI.raid)UI.raid.speed=4}});
for(let i=0;i<200;i++){const st=await p.evaluate(()=>!UI.raid?'none':UI.raid.done?'done':UI.raid.crisis?'crisis':'run');if(st!=='run'&&st!=='crisis')break;if(st==='crisis'){await p.locator('#rCrisis .ch:not([disabled])').last().click()}else await p.waitForTimeout(300)}
console.log('gen raid',await p.evaluate(()=>UI.screen));
// new game then check DB.gates cleaned
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame()});console.log('after new game gen in DB',await p.evaluate(()=>Object.keys(DB.gates).filter(k=>k.startsWith('GT_G')).length));
console.log('errs',errs);await b.close()})();
