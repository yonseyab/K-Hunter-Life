/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});await p.screenshot({path:''+OUT+'/t_home.png'});
const st=()=>p.evaluate(()=>`${G.day}d ${hhmm(G.time)} E${Math.round(G.cond.energy)}/${energyMax()} debt${G.cond.sleepDebt.toFixed(1)} $${G.money} sum${ablSum(G.player)}`);
console.log('start',await st());
await p.evaluate(()=>runTimeAsync('next'));await p.waitForFunction(()=>!UI.busy);console.log('next',await st(), await p.locator('#toast').innerText().catch(()=>''));
await p.evaluate(()=>runTimeAsync('morning'));await p.waitForFunction(()=>!UI.busy);console.log('morning',await st());
// disable event stop & run week
await p.evaluate(()=>{G.stopOn.event=false});await p.evaluate(()=>runTimeAsync('week'));await p.waitForTimeout(50);await p.waitForFunction(()=>!UI.busy);console.log('week',await st());
console.log((await p.locator('#toast').innerText()).replace(/\n/g,' | '));
// manual actions
await p.evaluate(()=>{UI.screen='acts';render()});
await p.locator('.acard [data-actdo]').first().click();console.log('did',await st());
await p.evaluate(()=>{UI.screen='schedule';render()});await p.screenshot({path:''+OUT+'/t_sched.png'});
await p.locator('.blk:not(.cont)').first().click();await p.selectOption('#schact','ACT_TR_MANA');await p.selectOption('#schdur','180');
console.log('edited',await p.evaluate(()=>JSON.stringify(G.schedule[UI.schSel.d][UI.schSel.i])));
await p.click('[data-schadd="2"]');await p.click('[data-schdel]');await p.click('[data-schtpl="SCH_SOLO"]');
await p.click('[data-stopon="lowEnergy"]');
await p.evaluate(()=>{UI.screen='relations';render()});await p.locator('[data-actdo="ACT_CONTACT"]').first().click();
await p.evaluate(()=>{UI.screen='gates';render()});await p.locator('[data-actdo="ACT_GATE_SCOUT"]').click();
// growth stress test: 60 days training
const g=await p.evaluate(()=>{G.stopOn.event=false;G.stopOn.lowEnergy=false;const s0=ablSum(G.player);for(let i=0;i<9;i++)runTime('week');return [s0,ablSum(G.player),G.player.pot.cap,G.cond.energy,G.cond.sleepDebt.toFixed(1)]});console.log('9 weeks',g);
// all screens render
for(const k of ['home','alerts','messenger','news','status','skills','inventory','shop','profile','schedule','relations','finance','gates','squad','guild','party','raidteam','acts','auction','db']){await p.evaluate(k=>{UI.screen=k;render()},k)}
await p.setViewportSize({width:400,height:850});for(const k of ['home','schedule']){await p.evaluate(k=>{UI.screen=k;render()},k);console.log(k,await p.evaluate(()=>document.documentElement.scrollWidth))}
await p.screenshot({path:''+OUT+'/t_m_home.png'});
// new game + old save migration
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame();runTime('next')});console.log('new',await st());
await p.evaluate(()=>{G.schedule=Array.from({length:7},()=>['ACT_TRAIN','ACT_JOB','ACT_REST','ACT_NONE']);delete G.time;G.slot=2;G.cond.fatigue=40;delete G.cond.energy;delete G.train;enterGame();runTime('1h')});console.log('migrated',await st());
console.log('errs',errs);await b.close()})();
