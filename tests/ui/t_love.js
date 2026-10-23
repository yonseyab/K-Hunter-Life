/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 연인: 데이트 · 청혼 · 헤어지기 · 오래 안 만나면 상대가 이별 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('relations');G.money=5000000;G.time=600;const r=relOf('HN_B0002');r.status='RS_DATING';r.from.RD_ROMANCE=85;UI.relSel='HN_B0002';Object.values(G.ai||{}).forEach(a=>a.today=[]);render()});
await p.locator('[data-actdo="ACT_DATE"]').click();await p.locator('[data-actdo="ACT_PROPOSE"]').click();
console.log((await p.locator('#toast').innerText()).replace(/\n/g,' '),await p.evaluate(()=>relOf('HN_B0002').status));
await p.evaluate(()=>{const r=relOf('HN_B0002');r.status='RS_DATING';r.from.RD_ROMANCE=40;G.stopOn.event=false;G.stopOn.lowEnergy=false;for(let i=0;i<3;i++)runTime('week')});
console.log('after 3 weeks',await p.evaluate(()=>relOf('HN_B0002').status+' '+Math.round(relOf('HN_B0002').from.RD_ROMANCE)));
await p.evaluate(()=>{const r=relOf('NP_B0003');r.status='RS_DATING';UI.relSel='NP_B0003';UI.screen='relations';G.time=600;render()});
await p.locator('[data-actdo="ACT_BREAKUP"]').click();console.log('breakup',await p.evaluate(()=>relOf('NP_B0003').status+' grudge '+relOf('NP_B0003').from.RD_GRUDGE));
/* 결혼식 · 동거 (월세 반) · 고시원이면 동거 불가 */
console.log('wed',await p.evaluate(()=>{const r=relOf('HN_B0002');r.status='RS_ENGAGED';r.from.RD_ROMANCE=90;G.money=30000000;G.time=600;UI.relSel='HN_B0002';UI.screen='relations';render();const rent0=fixedCosts()[0][1];
  document.querySelector('[data-actdo="ACT_WEDDING"]').click();const st=relOf('HN_B0002').status;G.time=600;render();document.querySelector('[data-actdo="ACT_COHABIT"]').click();
  return [st,homeOf().partner,rent0,fixedCosts()[0].join(' '),actCheck(DB.actions.ACT_COHABIT,60,false,'HN_B0002').why.join()]}));
await p.screenshot({path:OUT+'/love_wed.png'});
console.log('errs',errs);await b.close()})();
