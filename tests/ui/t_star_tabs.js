/* 2026-10-24: 성좌 탭 (내 정보 · 상점 · 경매장 · 업적) · 상태창 장비 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:900}}),errs=[],out=process.env.OUT||os.tmpdir();
    p.on('pageerror',e=>errs.push(e.stack));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{localStorage.clear();await packsLoad();gameFromScenario('SC_BDEMO');enterGame();
      STARACC.create(0,{name:'시험 성좌',trait:'STT_WATCH',domain:'SDM_FIRE',color:'#e0b341',sigil:'✶'});STARACC.attach(0);G.coin=5000;});
    /* 내 정보 · 잠재력 엿보기 */
    await p.click('#nav [data-home-tab="trade|starinfo"]');
    assert.match(await p.locator('.su').innerText(),/시험 성좌[\s\S]*잠재력 엿보기[\s\S]*지난 헌터들/);
    await p.click('[data-speek="1"]');
    assert.match(await p.locator('.su-pot').innerText(),/레벨 한계 \(대략\)/);
    await p.click('[data-speek="2"]');
    assert.match(await p.locator('.su-pot').innerText(),/세부 능력 합계 상한/);
    assert.equal(await p.evaluate(()=>G.coin),5000-300-1500);
    await p.screenshot({path:path.join(out,'khl-starinfo.png'),fullPage:true});
    /* 상점: 진열 · 구매 → 가방 */
    await p.click('[data-home-tab="trade|shop"]');
    const n=await p.locator('.su-item').count();assert(n>=15,'진열 '+n);
    await p.click('[data-sucat="W"]');
    assert(await p.evaluate(()=>[...document.querySelectorAll('.su-item')].length>0));
    const before=await p.evaluate(()=>({c:G.coin,g:(G.starGifts||[]).length}));
    await p.click('.su-item >> nth=0');await p.click('[data-subuy]');
    const after=await p.evaluate(()=>({c:G.coin,g:(G.starGifts||[]).length}));
    assert(after.c<before.c&&after.g===before.g+1,'구매');
    await p.screenshot({path:path.join(out,'khl-shop.png'),fullPage:true});
    /* 진열은 다음 날 바뀐다 */
    const seq=await p.evaluate(()=>{const s=G.shopStock.seq;G.day++;STAR.shopList();return [s,G.shopStock.seq]});assert.equal(seq[1],seq[0]+1);
    /* 경매장 */
    await p.click('[data-home-tab="trade|auction"]');
    assert.match(await p.locator('.su').innerText(),/성좌 경매장/);
    /* 업적: 진행 · 달성 · 숨은 ??? */
    await p.click('[data-home-tab="trade|achieve"]');
    assert.equal(await p.locator('.su-ach').count(),await p.evaluate(()=>vals('achievements').length));
    assert.match(await p.locator('.su').innerText(),/\?\?\?/);
    await p.evaluate(()=>{G.stats=G.stats||{};G.stats.raids=1;STARACC.checkAch();render()});
    assert.match(await p.locator('.su-grid.ach').innerText(),/✓ 첫 게이트/);
    await p.screenshot({path:path.join(out,'khl-ach.png'),fullPage:true});
    /* 지난 헌터: 이야기가 끝나면 남는다 */
    await p.evaluate(()=>{G.dead={kind:'retire',cause:'',day:G.day};STARACC.sync();});
    assert.equal(await p.evaluate(()=>STARACC.cur().past.length),1);
    await p.evaluate(()=>{G.dead=null});
    /* 상태창 › 장비 */
    await p.click('[data-home-tab="hunter|status"]');await p.click('[data-hs-tab="gear"]');
    assert.equal(await p.locator('.hs-gslot').count(),8);
    assert.match(await p.locator('#hs-gear').innerText(),/장비로 더해지는 값/);
    await p.screenshot({path:path.join(out,'khl-gear.png'),fullPage:true});
    for(const width of [768,400]){await p.setViewportSize({width,height:850});await p.evaluate(()=>render());assert(await p.evaluate(()=>document.querySelector('#main').scrollWidth<=document.querySelector('#main').clientWidth+1),'overflow '+width)}
    assert.deepEqual(errs,[]);console.log('star tabs / shop / peek / ach / past / gear passed');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
