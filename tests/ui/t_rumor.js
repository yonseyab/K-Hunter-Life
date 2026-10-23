/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 60일 동안 NPC끼리 관계 · 소문 (참/거짓) */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false;for(let i=0;i<9;i++)runTime('week')});
console.log(await p.evaluate(()=>`pairs ${Object.keys(G.npcRel||{}).length} rumors ${(G.rumors||[]).length} true ${(G.rumors||[]).filter(r=>r.truth).length}`));
console.log(await p.evaluate(()=>(G.rumors||[]).slice(0,4).map(r=>r.text+(r.truth?'':' (거짓)')).join(' / ')));
const who=await p.evaluate(()=>(G.rumors||[])[0]?.about[0]);if(who){await p.evaluate(id=>{UI.screen='profile';UI.profileId=id;render()},who)}
console.log('errs',errs);await b.close()})();
