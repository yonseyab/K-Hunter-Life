/* 홈 위젯 추가 팝업 (목록 · 설명 · 미리보기 · 크기) — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');G.layout=[{id:'WG_STATUS',x:0,y:0,w:2,h:1}];enterGame('home');UI.editHome=true;render()});
await p.click('[data-cell="2,0"]');ok(await p.locator('#wpk .wpop').isVisible(),'팝업 열림');
ok(await p.evaluate(()=>!document.querySelector('.picker')),'아래쪽 목록 없음');
ok(await p.locator('#wpk .wp-it').count()===await p.evaluate(()=>Object.keys(WIDGETS).length),'위젯 목록');
await p.click('[data-wpsel="WG_GATES"]');await p.click('[data-wpsize="2x2"]');
const pv=await p.evaluate(()=>{const s=document.querySelector('#wpk .wp-prev .wg');return {txt:s.textContent.slice(0,80),desc:document.querySelector('#wpk .wp-main p').textContent,size:s.querySelector('.wsz').textContent}});
console.log(JSON.stringify(pv));ok(pv.size==='2×2'&&pv.desc.length>5,'미리보기 · 설명');
ok(await p.evaluate(()=>!!document.querySelector('[data-wpsel="WG_STATUS"]').textContent.includes('배치됨')),'배치됨 표시');
await p.screenshot({path:OUT+'/wg_popup.png'});
await p.click('#wpk [data-wadd]');ok(await p.evaluate(()=>!document.querySelector('#wpk')&&G.layout.some(o=>o.id==='WG_GATES'&&o.x===2&&o.w===2&&o.h===2)),'추가');
await p.click('[data-cell="0,1"]');await p.keyboard.press('Escape');ok(await p.evaluate(()=>!document.querySelector('#wpk')&&!UI.pickCell),'Esc 닫기');
console.log('errs',errs);await b.close()})();
