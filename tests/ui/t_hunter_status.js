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
    const before=await p.evaluate(()=>({stats:{...G.player.stats},points:G.player.statPts,hp:vitals(G.player).hp,mp:vitals(G.player).mp}));
    await p.click('[data-hs-adjust="STAT_BODY|1"]');await p.click('[data-hs-adjust="STAT_MANA|1"]');
    assert.deepEqual(await p.evaluate(()=>({stats:G.player.stats,points:G.player.statPts})),{stats:before.stats,points:5});
    assert.equal(await p.locator('[data-hs-remaining]').innerText(),'3');
    assert.equal(+(await p.locator('[data-hs-preview="최대 HP"]').getAttribute('data-after')),before.hp+10);
    assert.equal(+(await p.locator('[data-hs-preview="최대 MP"]').getAttribute('data-after')),before.mp+10);
    assert.deepEqual(await p.evaluate(()=>{const r=HUNTER_STATUS.preview();return r.after}),await p.evaluate(()=>vitals({...G.player,stats:{...G.player.stats,STAT_BODY:G.player.stats.STAT_BODY+1,STAT_MANA:G.player.stats.STAT_MANA+1}})));
    await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-hunter-status.png'),fullPage:true});
    await p.click('[data-hs-tab="classSkills"]');
    await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-hunter-status-details.png'),fullPage:true});
    await p.click('[data-hs-tab="base"]');
    await p.click('[data-hs-adjust="STAT_BODY|-1"]');assert.equal(await p.locator('[data-hs-remaining]').innerText(),'4');
    await p.click('[data-hs-reset]');assert.equal(await p.locator('[data-hs-remaining]').innerText(),'5');assert(await p.locator('[data-hs-apply]').isDisabled());
    for(let i=0;i<5;i++)await p.click('[data-hs-adjust="STAT_BODY|1"]');
    assert.equal(await p.locator('[data-hs-remaining]').innerText(),'0');
    assert.equal(await p.locator('[data-hs-adjust$="|1"]:not(:disabled)').count(),0);
    await p.evaluate(()=>document.querySelector('[data-hs-adjust="STAT_MANA|1"]').click());
    assert.equal(await p.locator('[data-hs-added="STAT_MANA"]').innerText(),'+0');
    await p.click('[data-hs-apply]');
    assert.equal(await p.evaluate(()=>G.player.stats.STAT_BODY),before.stats.STAT_BODY+5);
    assert.equal(await p.evaluate(()=>G.player.statPts),0);assert(await p.locator('[data-hs-apply]').isDisabled());
    await p.evaluate(()=>document.querySelector('[data-hs-apply]').click());
    assert.equal(await p.evaluate(()=>G.player.stats.STAT_BODY),before.stats.STAT_BODY+5);
    // A pending allocation is not saved; switching to another hunter resets it.
    await p.evaluate(()=>{G.player.statPts=2;render()});await p.click('[data-hs-adjust="STAT_MIND|1"]');
    const mind=await p.evaluate(()=>G.player.stats.STAT_MIND);
    await p.evaluate(()=>{saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=JSON.parse(JSON.stringify(s.data));enterGame();UI.screen='homeHunter';UI.homeTabs.hunter='status';render()});
    assert.equal(await p.evaluate(()=>G.player.stats.STAT_MIND),mind);
    assert.equal(await p.locator('[data-hs-added="STAT_MIND"]').innerText(),'+0');
    assert.equal(await p.evaluate(()=>G.player.stats.STAT_BODY),before.stats.STAT_BODY+5);
    // If live growth changes the base, an old Apply click cannot spend stale points.
    await p.click('[data-hs-adjust="STAT_MIND|1"]');
    await p.evaluate(()=>G.player.statPts=1);await p.click('[data-hs-apply]');
    assert.equal(await p.evaluate(()=>G.player.stats.STAT_MIND),mind);
    assert.equal(await p.evaluate(()=>G.player.statPts),1);
    assert.match(await p.locator('#hs-message').innerText(),/초기화/);
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
    assert.deepEqual(errs,[]);console.log('hunter status / pure preview / point limits / apply / stale data / save / mobile passed; errs []');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
