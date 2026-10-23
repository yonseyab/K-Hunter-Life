/* 내 헌터 상태창: 실제 포인트와 미리보기 분리 · 계산식 일치 · 적용 · 저장 · 반응형 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
    p.on('pageerror',e=>errs.push(e.stack));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();G.player.statPts=5;G.player.traits=['TR_B0001','TR_B0003'];});
    await p.click('#nav [data-home-tab="hunter|status"]');
    assert.equal(await p.locator('#hunterStatus').count(),1);
    assert(!/세부 능력|ABL_|STAT_|잠재력/.test(await p.locator('#hunterStatus').innerText()));
    assert.equal(await p.locator('#hs-class,#hs-skills,#hs-traits').count(),0);
    await p.click('[data-hs-tab="classSkills"]');
    assert.match(await p.locator('#hs-class').innerText(),/궁수/);
    assert.match(await p.locator('#hs-skills').innerText(),/조준/);
    assert.match(await p.locator('#hs-skills').innerText(),/짐 꾸리기/);
    const cls=await p.locator('#hs-class').boundingBox(),sk=await p.locator('#hs-skills').boundingBox();assert(cls.y+cls.height<=sk.y);
    await p.click('[data-hs-tab="traits"]');
    assert.match(await p.locator('#hs-traits').innerText(),/정의감/);
    assert.match(await p.locator('#hs-traits').innerText(),/튼튼한 몸/);
    await p.click('[data-hs-tab="base"]');
    /* 2026-10-24: 성좌(플레이어)는 스탯을 분배하지 않는다 — 분배 칸 · 버튼 없음 */
    assert.equal(await p.locator('#hs-allocation,[data-hs-adjust],[data-hs-apply],[data-hstatus-scroll]').count(),0);
    assert.equal(await p.locator('#hunterStatus details[data-sw2more]').count(),0);  /* 내 헌터 상태창은 접지 않는다 */
    await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-hunter-status.png'),fullPage:true});
    await p.evaluate(()=>{G.player.traits=[];G.player.skills=[];render()});
    await p.click('[data-hs-tab="traits"]');
    assert.match(await p.locator('#hs-traits').innerText(),/보유 특성 없음/);
    await p.click('[data-hs-tab="classSkills"]');
    assert.match(await p.locator('#hs-skills').innerText(),/보유 스킬 없음/);
    for(const width of [1024,768,400,320]) {
      await p.setViewportSize({width,height:850});await p.evaluate(()=>render());
      assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'document overflow '+width);
      assert(await p.evaluate(()=>document.querySelector('#main').scrollWidth<=document.querySelector('#main').clientWidth+1),'main overflow '+width);
    }
    assert.deepEqual(errs,[]);console.log('hunter status / no allocation / tabs / mobile passed; errs []');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
