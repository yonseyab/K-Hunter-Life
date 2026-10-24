/* 실제 인생 홈: 상태창 위치 · 간결한 상단 · 사이드바 · 위젯 저장 · 기존 기능 보존 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch()});
    assert.deepEqual(await p.locator('#nav [data-go]').evaluateAll(L=>L.map(x=>x.dataset.go)),['life','homeHunter','homeTrade','homeDb']);
    await p.evaluate(()=>{SETTINGS.dev=true;render()});
    assert.equal(await p.locator('#nav button').count(),13);
    assert.deepEqual(await p.locator('#nav .nav-subtabs').nth(0).locator('button').allTextContents(),['인생','일대기']);
    assert.deepEqual(await p.locator('#nav .nav-subtabs').nth(1).locator('button').allTextContents(),['정보','상태창','관계']);
    for(const [group,screen,items] of [['story','life',[['life','인생'],['bio','일대기']]],['hunter','homeHunter',[['profile','정보'],['status','상태창'],['relations','관계']]],['trade','homeTrade',[['starinfo','내 정보'],['shop','상점'],['auction','성좌 경매장'],['achieve','업적']]]]) {
      for(const [id,label] of items) {
        await p.evaluate(()=>{UI.screen='homeDb';render()});
        await p.click(`#nav [data-home-tab="${group}|${id}"]`);
        assert.equal(await p.evaluate(()=>UI.screen),screen);
        assert.equal(await p.getByRole('tab',{name:label,exact:true}).getAttribute('aria-selected'),'true');
        assert.equal(await p.locator(`#nav [data-home-tab="${group}|${id}"]`).getAttribute('aria-current'),'page');
      }
    }
    const groups=[['life','이야기',['인생','일대기']],['homeHunter','내 헌터',['정보','상태창','관계']],['homeDb','DB',['인물','게이트','몬스터','장비','장소','기타','클래스','스킬']],['homeTrade','성좌',['내 정보','상점','성좌 경매장','업적']]];
    for(const [screen,label,names] of groups) {
      await p.click(`#nav [data-go="${screen}"]`);
      assert.deepEqual(await p.locator(`[role="tablist"][aria-label="${label}"] [role="tab"]`).allTextContents(),names);
      for(const name of names) {
        await p.getByRole('tab',{name,exact:true}).click();
        assert.equal(await p.getByRole('tab',{name,exact:true}).getAttribute('aria-selected'),'true');
        assert.equal(await p.locator('#nav button').count(),13);
        if(name!=='인생'&&name!=='일대기'&&!(screen==='homeHunter'&&['상태창','관계'].includes(name))&&screen!=='homeTrade')assert.equal(await p.getByRole('tabpanel').innerHTML(),'','unimplemented tabs have no content UI');
      }
    }
    await p.click('#nav [data-go="life"]');await p.getByRole('tab',{name:'인생',exact:true}).click();
    await p.getByRole('tab',{name:'인생',exact:true}).focus();await p.keyboard.press('ArrowRight');
    assert.equal(await p.getByRole('tab',{name:'일대기',exact:true}).getAttribute('aria-selected'),'true');
    await p.getByRole('tab',{name:'인생',exact:true}).click();
    assert(await p.evaluate(()=>['status','bio','relations','inventory','goals','guild','db','auction','archive','settings'].every(s=>typeof V[s]==='function')));
    const status=await p.locator('#lifeSide').boundingBox(),story=await p.locator('#story').boundingBox(),widget=await p.locator('.life-widget').first().boundingBox();
    assert(story.width>740,'central story uses wide 16:9 layout: '+story.width);
    assert(status.x>=story.x+story.width&&status.width>=300,'status in right panel');
    const logTime=await p.locator('#story .sl:has(.tag) .tm').first().boundingBox(),logTag=await p.locator('#story .sl .tag').first().boundingBox();
    assert(logTag.x-logTime.x-logTime.width<=7,'timestamp and news tag are close');
    assert(status.height<400,JSON.stringify(status));
    assert(Math.abs(status.y-story.y)<1,'status and story top alignment');
    assert(widget.y>=status.y+status.height,'widgets follow status on right');
    assert(widget.height<status.height,'widget follows its contents instead of status height');
    const footer=await p.locator('.home-status-footer').boundingBox(),loc=await p.locator('[data-life-location]').boundingBox();
    assert(loc.x>status.x+status.width/2&&loc.y>=footer.y,'location in lower right of status');
    assert.equal(await p.locator('#clockS,.egauge,.crumb,.life .h-row,[data-kdetail]').count(),0);
    assert(!/지금:|자유 시간|먹는 중/.test(await p.locator('#top').innerText()));
    assert(await p.evaluate(()=>{const L=[...document.querySelectorAll('#top .tools button,#top .pbtn')];return L.every(el=>Math.abs(el.getBoundingClientRect().height-30)<1&&getComputedStyle(el).letterSpacing==='normal')}));
    await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-home-desktop.png'),fullPage:true});
    // Live values and location update without rebuilding the story log.
    await p.evaluate(()=>{window.homeFirstLine=document.querySelector('#story').firstElementChild;G.loc={region:G.player.region,pt:'PT_TRAIN'};G.coin=81;PLAY.ui()});
    assert((await p.locator('[data-life-location]').innerText()).includes('훈련'));
    assert.match(await p.locator('#topCoin').innerText(),/81/);assert.equal(await p.locator('[data-status-coin]').count(),0);
    assert.equal(await p.locator('#lifeSide details[data-sw2more]:not([open])').count(),1);await p.click('#lifeSide [data-sw2more] summary');await p.waitForFunction(()=>UI.swOpen===true,null,{timeout:3000});
    assert(await p.evaluate(()=>homeFirstLine===document.querySelector('#story').firstElementChild));
    await p.click('[data-life-widget-edit]');await p.locator('[data-life-widget-toggle="WG_COND"]').check();
    assert.equal(await p.locator('[data-life-widget="WG_COND"]').count(),1);
    await p.click('[data-life-widget-move="WG_COND|-1"]');
    const saved=await p.evaluate(()=>{saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1'),ids=prefs().play.homeWidgets.slice();G=JSON.parse(JSON.stringify(s.data));enterGame();return ids});
    assert.deepEqual(await p.locator('[data-life-widget]').evaluateAll(L=>L.map(x=>x.dataset.lifeWidget)),saved);
    await p.click('#lifeBar [data-home-tab="trade|shop"]');assert.equal(await p.evaluate(()=>UI.screen+'|'+UI.homeTabs.trade),'homeTrade|shop');
    await p.click('#nav [data-go="life"]');
    assert.match(await p.locator('#lifeSide [data-status-skills]').innerText(),/조준/);
    assert.equal(await p.locator('#lifeSide [data-sttab="스킬"],#lifeSide [data-hstatus-scroll="skills"]').count(),0);
    for(const width of [1024,768,400,320]) {
      await p.setViewportSize({width,height:900});await p.evaluate(()=>{UI.screen='life';render()});
      assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow '+width);
      assert(await p.evaluate(()=>document.querySelector('.main').scrollWidth<=document.querySelector('.main').clientWidth+1),'main overflow '+width);
      assert.equal(await p.locator('[data-life-location]').count(),1);
      if(width===400)await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-home-mobile.png'),fullPage:true});
    }
    assert.deepEqual(errs,[]);console.log('home / live status / sidebar / widget persistence / responsive layout passed; errs []');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
