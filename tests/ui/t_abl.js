/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const ctx=await b.newContext({viewport:{width:1500,height:950}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 성좌 흐름: 업적 해금이 없으면 능력치는 굴리기만, 있으면(pickStats · pickPotential) 옛 직접 조정 화면 */
await p.evaluate(()=>{localStorage.removeItem('khl.stars.v1');STARACC.create(0,{name:'시험',trait:'STT_WATCH',reason:'SRS_STORY',domain:'SDM_NIGHT',color:'SCL_GOLD',sigil:'SSG_1',start:'SST_1',known:'SKN_NO'});render()});
await p.click('[data-titlestars]');await p.click('[data-starhunter="0"]');await p.click('[data-intro="skip"]');
await p.click('[data-ccstep="6"]');console.log('roll only',await p.locator('[data-abedit]').count()===0&&await p.locator('[data-abgen="real"]').count()===1);
await p.click('[data-ccstep="5"]');console.log('class result',await p.locator('#clslist').count()===0);
await p.evaluate(()=>{const a=STARACC.load();a.slots[0].unlocks={pickStats:true,pickPotential:true,pickClass:true};localStorage.setItem('khl.stars.v1',JSON.stringify(a));UI.cc.ab=null;render()});
// go to step 6 directly
await p.click('[data-ccstep="6"]');await p.waitForTimeout(100);
console.log('empty:',await p.locator('#ccmain .panel').first().innerText());
await p.click('[data-abgen="real"]');await p.waitForTimeout(100);
console.log('tot:',await p.locator('#abtot').innerText());
await p.screenshot({path:''+OUT+'/s_ab1.png'});
await p.click('[data-abgen="rand"]');console.log('rand tot:',await p.locator('#abtot').innerText());
await p.click('[data-abedit]');
const inp=p.locator('[data-abv="ABL_A01"]');await inp.fill('20');await inp.press('Tab');
const st=p.locator('[data-abs="STAT_BODY"]');await st.fill('99');await st.press('Tab');console.log('stat clamped',await st.inputValue(),await p.locator('#abhp').innerText());
await p.locator('[data-abp="cap"]').fill('100');await p.locator('[data-abp="cap"]').press('Tab');
console.log('over:',await p.locator('#abtot').innerText());
await p.screenshot({path:''+OUT+'/s_ab2.png'});
// auto all and confirm
await p.click('[data-ccauto="all"]');await p.click('[data-ccstep="7"]');await p.waitForTimeout(100);
console.log('start enabled',await p.locator('[data-ccstartask]').isEnabled());
await p.screenshot({path:''+OUT+'/s_ab3.png',fullPage:false});
await p.click('[data-ccstartask]');await p.click('[data-ccstart]');await p.waitForTimeout(200);
await p.click('[data-go="profile"]').catch(()=>p.evaluate(()=>{UI.screen='profile';UI.profileId=G.player.id;render()}));
await p.evaluate(()=>{UI.screen='profile';UI.profileId=G.player.id;UI.profTab='개요';render()});await p.waitForTimeout(100);
await p.screenshot({path:''+OUT+'/s_ab4.png'});
for(const v of ['ABS_B','ETC','ABS_A']){await p.click(`[data-attrview="${v}"]`);}
await p.evaluate(()=>{UI.profTab='성장';render()});console.log('growth:',(await p.locator('#main').innerText()).slice(0,300).replace(/\n/g,' | '));
// other hunter unscouted & scouted
await p.evaluate(()=>{UI.profTab='개요';UI.profileId='HN_B0009';render()});await p.screenshot({path:''+OUT+'/s_ab5.png'});
await p.evaluate(()=>{KNOW.report(H('HN_B0009'));render()});await p.screenshot({path:''+OUT+'/s_ab6.png'});
await p.evaluate(()=>{UI.screen='homeDb';render()});
// demo scenario
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');UI.screen='profile';UI.profileId=G.player.id;render()});
await p.screenshot({path:''+OUT+'/s_ab7.png'});
// mobile
await p.setViewportSize({width:400,height:850});await p.evaluate(()=>render());
console.log('hscroll',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.evaluate(()=>{UI.mode='create';UI.cc=newCC();UI.cc.step=6;UI.cc.ab=genStart('real',Math.random);UI.cc.abEdit=true;render()});
console.log('hscroll cc',await p.evaluate(()=>document.documentElement.scrollWidth));
await p.screenshot({path:''+OUT+'/s_ab8.png'});
// autoall 30x
const okc=await p.evaluate(()=>{let ok=0;for(let i=0;i<30;i++){const c=newCC();autoAll(c);if([0,1,2,3,5,6].every(s=>!ccMissing(c,s))&&!abOver(c)&&clsReady(c))ok++}return ok});console.log('auto ok',okc);
console.log('errs',errs);await b.close()})();
