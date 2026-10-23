/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 목표: 추천 · 정하기 · 진행 · 달성 · 단기 기한 · 내려놓기 · 목표에 맞춘 일정 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('goals');UI.routineTab='goals';render();G.stopOn.event=false;G.stopOn.lowEnergy=false});
console.log('suggest',await p.evaluate(()=>GOALS.suggest().map(([o,t])=>GOALS.name(o,t)).join(' / ')));
await p.selectOption('#gopt-OBJ_B_MONEY','10000000');await p.click('[data-goaladd="OBJ_B_MONEY"]');
await p.click('[data-goaladd="OBJ_B_TRAIN"]');await p.click('[data-goaladd="OBJ_B_RANK"]');await p.click('[data-goaladd="OBJ_B_LOVER"]');
console.log('active',await p.evaluate(()=>GOALS.active().map(g=>g.tpl+':'+g.target+' '+Math.round(GOALS.progress(g).f*100)+'%').join(', ')));
await p.screenshot({path:OUT+'/goals.png'});
await p.click('[data-autosched]');console.log('sched wd',await p.evaluate(()=>G.schedule[0].map(x=>hhmm(x.at)+' '+DB.actions[x.act].name+' '+x.dur).join(' | ')));
console.log('sched we',await p.evaluate(()=>G.schedule[5].map(x=>hhmm(x.at)+' '+DB.actions[x.act].name).join(' | ')));
console.log('done',await p.evaluate(()=>{G.money=12000000;const r=GOALS.check();return [r.join(),G.alerts[0].subj,G.history[0][1]]}));
await p.evaluate(()=>runTime('week'));console.log('after week',await p.evaluate(()=>(G.goals||[]).map(g=>g.tpl+(g.done?' 달성':g.failed?' 실패':' 진행')).join(', ')),await p.evaluate(()=>G.stats.trainMin));
await p.evaluate(()=>{UI.screen='goals';render()});await p.click('[data-goaldrop]');await p.click('[data-goaldrop]');
console.log('dropped',await p.evaluate(()=>(G.goals||[]).filter(g=>g.gaveUp).length));
await p.evaluate(()=>{UI.screen='home';G.layout.push({id:'WG_GOALS',x:0,y:2,w:2,h:1});render()});
console.log('errs',errs);await b.close()})();
