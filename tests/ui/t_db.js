/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame()});
const nav=await p.evaluate(()=>[...document.querySelectorAll('#nav [data-go]')].map(b=>b.dataset.go));console.log(nav.join(','));
for(const k of nav){await p.click(`#nav [data-go="${k}"]`);await p.waitForTimeout(60);}
for(const k of ['status','inventory']){await p.click(`#nav [data-go="${k}"]`);await p.screenshot({path:OUT+`/d_${k}.png`});}
await p.click('#nav [data-go="status"]');await p.click('[data-sttab="공개 설정"]');await p.click('[data-pubtog="stats"]');await p.click('#nav [data-go="db"]');
for(const t of ['PEOPLE','MONSTER','IT:ITC_WEAPON','IT:ITC_ARMOR','IT:ITC_ACCESSORY','ITEM','CLASS','SKILL']){await p.click(`[data-dbtab="${t}"]`);const n=await p.locator('#dbcount').innerText();
  if(await p.locator('[data-dbf]').count()>1)await p.locator('[data-dbf]').nth(1).click();const n2=await p.locator('#dbcount').innerText();console.log(t,n,n2);}
await p.click('[data-dbtab="SKILL"]');const q=p.locator('[data-dbq]');await q.click();await p.keyboard.type('화염');await p.waitForTimeout(100);
console.log('search 화염',await p.locator('#dbcount').innerText(), await q.inputValue(), await p.evaluate(()=>document.activeElement.dataset.dbq));
await p.locator('#dblist tr[data-dbsel]').first().click();await p.screenshot({path:''+OUT+'/d_db.png'});console.log('modal',await p.evaluate(()=>!!document.querySelector('#iv .ivp')));await p.evaluate(()=>closeItem());
await p.click('[data-dbtab="PEOPLE"]');await p.locator('[data-dbq]').fill('');await p.evaluate(()=>{UI.dbQ='';render()});
await p.locator('#dblist tr[data-dbsel="HN_B0009"]').click();console.log('screen',await p.evaluate(()=>UI.screen+' '+document.querySelector('#nav [aria-current]')?.dataset.go));
await p.evaluate(()=>{UI.screen='db';UI.dbTab='PEOPLE';render()});await p.locator('#dblist tr[data-dbsel="NP_B0001"]').click();console.log((await p.locator('#iv .ivp').innerText()).slice(0,80).replace(/\n/g,'|'));await p.evaluate(()=>closeItem());
await p.setViewportSize({width:400,height:850});
for(const k of ['status','skills','inventory','db']){await p.evaluate(k=>{UI.screen=k;render()},k);console.log(k,await p.evaluate(()=>document.documentElement.scrollWidth));}
await p.screenshot({path:''+OUT+'/d_m_db.png'});
// new game
await p.setViewportSize({width:1500,height:950});
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame('status')});await p.screenshot({path:''+OUT+'/d_new_status.png'});
await p.evaluate(()=>{UI.screen='inventory';render()});await p.evaluate(()=>{UI.screen='skills';render()});
console.log('errs',errs);await b.close()})();
