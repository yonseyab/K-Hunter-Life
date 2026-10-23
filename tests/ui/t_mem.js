/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 공략 중 동료 응급처치 성공 → 그 동료가 기억 → 감사 메시지 이벤트(MEM:) */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('gates');UI.prep={gid:'GT_0001',party:['HN_B0002','HN_B0003'],retreat:20};startRaid('GT_0001');UI.raid.paused=true;
  const R=UI.raid;R.crisis={id:'CR_B0003',b:'한유리',bid:'HN_B0003'};R.party[0].hp=100;});
await p.evaluate(()=>{const v=attrVal;window.attrVal=(h,id)=>id==='ABL_B37'?40:v(h,id)});/* 판정 성공 강제 */
await p.evaluate(()=>{UI.screen='raid';render();resolveCrisis(0)});
console.log('mem',await p.evaluate(()=>JSON.stringify(memOf('HN_B0003'))));
await p.evaluate(()=>{UI.raid.done=true;finishRaid(true)});
console.log('party mem',await p.evaluate(()=>memOf('HN_B0002').map(m=>m.text).join(' / ')));
console.log('elig 12',await p.evaluate(()=>{relOf('HN_B0003').from.RD_TRUST=50;return eligible(DB.events.EV_0012)+' '+resolveTarget('MEM:rescued_by')}));
await p.evaluate(()=>{UI.screen='relations';UI.relSel='HN_B0003';render()});await p.screenshot({path:OUT+'/mem_rel.png'});
console.log('errs',errs);await b.close()})();
