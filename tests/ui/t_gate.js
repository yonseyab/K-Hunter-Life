/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{const C=DB.balance.BAL_AI.claim;C.open=0;C.owned=0;C.won=0;C.urgentBonus=0;gameFromScenario('SC_BDEMO');G.simQ=[];enterGame('gates')});
await p.click('tr[data-gate="GT_0001"]');await p.screenshot({path:''+OUT+'/g_list.png'});
await p.click('[data-actdo="ACT_GATE_SCOUT"]');await p.click('[data-actdo="ACT_GATE_APPLY"]');
console.log(await p.evaluate(()=>JSON.stringify(G.gates.GT_0001)));
await p.click('[data-raidprep="GT_0001"]');await p.screenshot({path:''+OUT+'/g_prep.png'});
const boxes=p.locator('[data-prepmem]');console.log('cands',await boxes.count());await boxes.first().click();
await p.click('[data-retreat="20"]');
await p.click('[data-raidgo]');await p.evaluate(()=>{UI.raid.speed=4});
// try runTime blocked
await p.evaluate(()=>runTime('1h'));
await p.evaluate(()=>{UI.screen='home';render()});await p.screenshot({path:''+OUT+'/g_banner.png'});await p.evaluate(()=>{UI.screen='raid';render()});
// loop: resolve crises until done
for(let i=0;i<200;i++){const st=await p.evaluate(()=>UI.raid.done?'done':UI.raid.crisis?'crisis':'run');
  if(st==='done')break; if(st==='crisis'){await p.screenshot({path:''+OUT+'/g_crisis.png'});const btn=p.locator('#rCrisis .ch:not([disabled])').first();await btn.click();} else await p.waitForTimeout(300);}
console.log('screen',await p.evaluate(()=>UI.screen), await p.evaluate(()=>JSON.stringify(UI.raidResult)));
await p.screenshot({path:''+OUT+'/g_result.png'});
console.log(await p.evaluate(()=>[hhmm(G.time),G.cond.energy,G.player.level,G.player.exp,(G.injuries||[]).length,G.inGate,JSON.stringify(G.gates.GT_0001.status)].join(' ')));
await p.evaluate(()=>{UI.screen='status';render()});await p.screenshot({path:''+OUT+'/g_status.png'});
// hospital
await p.evaluate(()=>{if(!G.injuries.length)addInjury('rand','INJ_CUT',2);G.time=600;UI.screen='home';UI.actAll=true;render()});
const hos=p.locator('[data-actdo="ACT_HOSPITAL"]');console.log('hospital btn',await hos.count());if(await hos.count()){const before=await p.evaluate(()=>G.injuries.map(j=>j.until-nowAbs()).join(','));await hos.click();console.log(before,'→',await p.evaluate(()=>G.injuries.map(j=>j.until-nowAbs()).join(',')))}
// break timer
await p.evaluate(()=>{G.stopOn.event=false;runTime('week')});console.log(await p.evaluate(()=>vals('gates').map(g=>g.id+':'+gateSt(g.id).status).join(' ')));
// new char raid on GT_0006 (19급) level up
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame('gates');UI.prep={gid:'GT_0006',party:[],retreat:20};startRaid('GT_0006');UI.raid.speed=4});
for(let i=0;i<200;i++){const st=await p.evaluate(()=>UI.raid.done?'done':UI.raid.crisis?'crisis':'run');if(st==='done')break;if(st==='crisis'){await p.locator('#rCrisis .ch:not([disabled])').last().click()}else await p.waitForTimeout(300)}
console.log('new',await p.evaluate(()=>JSON.stringify({lvl:UI.raidResult.lvl,exp:UI.raidResult.exp,got:UI.raidResult.got,lv:G.player.level})));
await p.setViewportSize({width:400,height:850});for(const k of ['gates','raidresult','raid']){await p.evaluate(k=>{UI.screen=k;render()},k);console.log(k,await p.evaluate(()=>document.documentElement.scrollWidth))}
await p.evaluate(()=>{UI.screen='raidprep';UI.prep={gid:'GT_0002',party:[],retreat:35};render()});console.log('prep',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('errs',errs);await b.close()})();
