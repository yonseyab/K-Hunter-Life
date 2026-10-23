/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(/워커/.test(m.text()))console.log('console:',m.text().slice(0,200))});
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 백그라운드 계산: 워커 결과 = 메인 계산 결과 (같은 코드 · 같은 시드), 진행 중 화면이 멈추지 않음 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false});
await p.waitForTimeout(1500);console.log('worker',await p.evaluate(()=>SIM.workerState));
/* 같은 결과인지: 같은 상태 복사본으로 메인 계산 vs 워커 계산 */
console.log('same',await p.evaluate(async()=>{const ok=await SIM.ensure(G.day+1);return ok?JSON.stringify(SIM.compareCached()):'no worker'}));
/* 버튼으로 1주일 진행: 진행 중 프레임이 계속 돈다 (멈춤 시간 측정) */
const r=await p.evaluate(async()=>{let maxGap=0,last=performance.now(),run=true;const loop=()=>{const t=performance.now();maxGap=Math.max(maxGap,t-last);last=t;if(run)requestAnimationFrame(loop)};requestAnimationFrame(loop);
  const t0=performance.now();await runTimeAsync('week');const ms=performance.now()-t0;run=false;return {ms:Math.round(ms),maxGap:Math.round(maxGap),via:G.simStat.popVia,day:G.day}});
console.log('async week',JSON.stringify(r));
const r2=await p.evaluate(()=>{const t0=performance.now();runTime('week');return {ms:Math.round(performance.now()-t0),via:G.simStat.popVia}});
console.log('sync week',JSON.stringify(r2));
await p.evaluate(()=>runTimeAsync('next'));await p.waitForFunction(()=>!UI.busy);console.log('async ok',await p.evaluate(()=>G.simStat.popVia));
console.log('errs',errs);await b.close()})();
