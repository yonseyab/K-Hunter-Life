/* 새 헌터 기본 정보(항목 · 선택지 화면) + 상태창 안 클래스 · 스킬 탭 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{UI.cc=newCC();UI.mode='create';UI.cc.step=0;$('#root').innerHTML='';render()});
ok(await p.locator('#biitems .lk-item').count()===13,'기본 정보 항목 13개');
await p.click('[data-chitem="bi|family"]');await p.fill('#cc-family','한');await p.click('[data-chitem="bi|given"]');await p.fill('#cc-given','서준');
await p.click('[data-chitem="bi|sex"]');await p.click('[data-chopt="bi|여"]');
await p.click('[data-chitem="bi|age"]');await p.click('[data-chopt="bi|24"]');
await p.click('[data-chitem="bi|langMain"]');await p.click('[data-chopt="bi|'+await p.evaluate(()=>vals('ccLanguages')[0].id)+'"]');
await p.click('[data-chitem="bi|langs"]');const l2=await p.evaluate(()=>vals('ccLanguages')[1].id);await p.click(`[data-chopt="bi|${l2}"]`);
await p.click('[data-chitem="bi|bplace"]');await p.screenshot({path:OUT+'/ccb_basic.png'});
const cc=await p.evaluate(()=>({f:UI.cc.family,g:UI.cc.given,sex:UI.cc.sex,age:UI.cc.age,lm:UI.cc.langMain,langs:UI.cc.langs,lookItems:UI.cc.sex?lookSet(UI.cc.sex).items.length:0,left:document.querySelector('#biitems').textContent}));
console.log(JSON.stringify(cc).slice(0,300));
ok(cc.f==='한'&&cc.g==='서준'&&cc.sex==='여'&&cc.age===24&&cc.lm&&cc.langs.includes(l2)&&cc.lookItems>0,'값 저장');ok(cc.left.includes('서준')&&cc.left.includes('24세'),'왼쪽 목록 표시');
/* 자동 설정 뒤에도 표시 · 게임 시작 */
await p.click('[data-ccauto="all"]');ok(await p.evaluate(()=>[...document.querySelectorAll('#biitems .lk-item')].filter(e=>!e.dataset.chitem.endsWith('|langs')).every(e=>!e.textContent.includes('미선택'))),'전체 자동 설정');
/* 3단계: 현재 거주 환경 구역 */
await p.evaluate(()=>{UI.cc.step=2;render()});ok(await p.evaluate(()=>[...document.querySelectorAll('.lk-sec')].some(e=>e.textContent==='현재 거주 환경')&&!!document.querySelector('[data-chitem="bg|BI_HOOD"]')),'현재 거주 환경');
await p.click('[data-chitem="bg|BI_HOOD"]');await p.screenshot({path:OUT+'/ccb_bg.png'});
/* 4단계: 성격 요약명만 표시하며 상세 설명은 없음 */
await p.evaluate(()=>{UI.cc.step=3;render()});ok(await p.locator('#pxsum .px-head').count()===1&&await p.locator('#pxsum .px-summary-note').count()===1&&await p.locator('#pxsum dl').count()===0,'성격 요약명과 짧은 설명 표시');await p.screenshot({path:OUT+'/ccb_px.png'});
/* 5단계: 특성 기본 3점 · 최대 5개 */
const tr=await p.evaluate(()=>{const cc=UI.cc;cc.traits=[];const base=traitPoints(cc);const pool=vals('traits').filter(t=>t.pick!==false&&!t.excl);for(const t of pool.slice(0,8))toggleTrait(t.id);return {base,n:cc.traits.length}});
console.log(JSON.stringify(tr));ok(tr.base===3&&tr.n===5,'특성 3점 · 5개');
await p.evaluate(()=>{UI.cc.traits=UI.cc.traits.slice(0,0);autoStep(UI.cc,4)});
await p.evaluate(()=>{gameFromCreation(UI.cc);enterGame('status')});
/* 상태창 탭에 클래스 · 스킬 */
ok(!(await p.locator('#nav [data-go="skills"]').count()),'메뉴에서 클래스 · 스킬 빠짐');
await p.click('[data-sttab="클래스"]');ok(await p.evaluate(()=>!!document.querySelector('[aria-selected="true"][data-sttab="클래스"]')&&document.body.textContent.includes('클래스북')),'클래스 탭');
await p.click('[data-sttab="스킬"]');ok(await p.evaluate(()=>document.body.textContent.includes('숙련')),'스킬 탭');await p.screenshot({path:OUT+'/ccb_skill.png'});
await p.evaluate(()=>{UI.screen='skills';render()});ok(await p.evaluate(()=>UI.screen==='status'),'예전 화면 이름은 상태창으로');
await p.click('[data-sttab="상태"]');await p.click('[data-sttab="스킬"]');
console.log('errs',errs);await b.close()})();
