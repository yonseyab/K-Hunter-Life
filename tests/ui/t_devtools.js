/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.evaluate(()=>{OBSERVE.legacy=true});await p.waitForTimeout(300);
/* 개발 도구: 개발자 보기에서만 메뉴 · 세계 진행 · 게이트 생성 · 데이터 검증 · 인물 검사 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();SETTINGS.dev=false;render()});/* 개발 도구 메뉴 항목은 새 좌측 메뉴에 없다 — 화면은 UI.screen 으로 연다 */
await p.evaluate(()=>{SETTINGS.dev=true;render()});
await p.evaluate(()=>{UI.screen='devtools';render()});const d0=await p.evaluate(()=>G.day);await p.click('[data-devstep="7"]');await p.waitForTimeout(50);await p.waitForFunction(()=>!UI.busy);console.log('days',d0,'→',await p.evaluate(()=>G.day));
const g0=await p.evaluate(()=>vals('gates').length);await p.click('[data-devgate="5"]');console.log('gates',g0,'→',await p.evaluate(()=>vals('gates').length));
await p.click('[data-devval]');console.log('validate',(await p.locator('#main').innerText()).match(/\d+개 테이블[^\n]*/)?.[0]);
await p.fill('#devid','NP_B0002');await p.click('[data-devinspect]');console.log('inspect',(await p.locator('pre').innerText()).slice(0,80).replace(/\n/g,' '));
await p.screenshot({path:OUT+'/devtools.png'});
console.log('errs',errs);await b.close()})();
