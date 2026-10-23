/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 아는 것 vs 사실: 스카우트 보고서(그때의 값) · 시간이 지나 실제가 바뀜 · 대화로 목표 알기 · 개발자 보기는 실제 값 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();G.stopOn.event=false;G.stopOn.lowEnergy=false;G.time=600;G.money=5000000;UI.screen='profile';UI.profileId='HN_B0001';UI.profTab='개요';render()});
console.log('before',await p.evaluate(()=>!!KNOW.get('HN_B0001','report')),await p.locator('.pf-head .ds').innerText());
await p.click('[data-actdo="ACT_SCOUT"]');console.log((await p.locator('#toast').innerText()).replace(/\n/g,' ').slice(0,140));
const lv=await p.evaluate(()=>KNOW.get('HN_B0001','report').v.level);
/* 실제 값을 바꾸고 2주 흐름 → 화면은 보고서 값 */
await p.evaluate(()=>{hsOf(DB.hunters.HN_B0001).level+=3;syncNpcState();G.know.HN_B0001.report.t-=15*1440;UI.screen='profile';render()});
console.log('report lv',lv,'shown',await p.locator('.pf-head .ds').innerText(),'| real',await p.evaluate(()=>H('HN_B0001').level));
console.log('kbar',await p.locator('.kbar').getAttribute('class'),await p.locator('.kbar').innerText());
await p.screenshot({path:OUT+'/know_profile.png'});
await p.evaluate(()=>{SETTINGS.dev=true;render()});console.log('dev shown',await p.locator('.pf-head .ds').innerText());
/* 대화로 목표 알기 */
console.log('talk',await p.evaluate(()=>{SETTINGS.dev=false;G.ai.HN_B0002.today=[];const r=relOf('HN_B0002');r.to.RD_CLOSE=10;KNOW.talk('HN_B0002');UI.profileId='HN_B0002';UI.profTab='생활';render();return document.querySelector('#main').innerText.match(/요즘 목표\n[^\n]+/)?.[0]}));
console.log('errs',errs);await b.close()})();
