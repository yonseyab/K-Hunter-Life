/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const out=[];if(typeof gameFromScenario==='function'){gameFromScenario('SC_BDEMO');}
const ev=DB.events.EV_0002||DB.events.find?.(e=>e.id==='EV_0002');const c=(ev.choices||[]).find(c=>c.check);out.push(checkText(c));for(let i=0;i<3;i++){out.push(judge(c).line)}return out}).catch(e=>'ERR '+e.message);
console.log(JSON.stringify(r));console.log('errs',errs);await b.close()})();
