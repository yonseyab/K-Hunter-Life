/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 판정 보정 표시 · 스킬 연습 숙련 · 혼자 6급 게이트 → 쓰러짐/사망 → 게임 오버 · 세이브 사망 표시 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.cond.stress=80;G.cond.energy=10});
console.log('mods',await p.evaluate(()=>checkText(DB.events.EV_0001.choices[0])+' | '+checkText(DB.events.EV_0002.choices[1])));
console.log('skill',await p.evaluate(()=>{G.cond.energy=100;G.time=600;const s0=JSON.stringify(G.player.skills);for(let i=0;i<12;i++){doNow('ACT_TR_SKILL',120);G.lastDay=G.day;G.time=600;G.cond.energy=100}return s0+' → '+JSON.stringify(G.player.skills)}));
await p.evaluate(()=>{saveGame('slot1')});
let dead=false;for(let k=0;k<15&&!dead;k++){dead=await p.evaluate(()=>{G.cond.hp=40;G.injuries=[];(s=>{s.status='open';s.breakAt=nowAbs()+3000;G.simQ=[]})(gateSt('GT_0005'));UI.prep={gid:'GT_0005',party:[],retreat:0};startRaid('GT_0005');clearInterval(UI._rt);const R=UI.raid;let n=0;while(!R.done&&n<3000){if(R.crisis)resolveCrisis(0);else{R.paused=false;raidTick()}n++}return !!G.dead})}
console.log('dead',dead,await p.evaluate(()=>G.dead?JSON.stringify(G.dead):'alive'),await p.evaluate(()=>UI.screen));
await p.screenshot({path:OUT+'/gameover.png'});
console.log('save marked',await p.evaluate(()=>JSON.stringify(listSaves().map(s=>s.dead))));
await p.evaluate(()=>{UI.screen='home';render()});console.log('forced',await p.evaluate(()=>UI.screen));
console.log('errs',errs);await b.close()})();
