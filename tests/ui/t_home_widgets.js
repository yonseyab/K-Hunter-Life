const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    const people=await p.evaluate(async()=>{
      await packsLoad();gameFromScenario('SC_BDEMO');enterGame();
      G.player.traits=['TR_B0001','TR_B0003'];
      G.ledger=[['3/14','식비',-10000],['3/14','공략 수입',250000],['3/14','교통비',-2000],['3/14','예전 거래',1000]];
      const people=vals('hunters').filter(h=>h.id!==G.player.id).slice(0,11).map(h=>h.id);
      for(const id of people)if(!relOf(id))G.relations.push({...clone(G.relations[0]),id});
      prefs().play.homePeople=[];render();return people;
    });
    assert.equal(people.length,11);
    const money=p.locator('[data-life-widget="WG_MONEY"]'),favorites=p.locator('[data-life-widget="WG_PEOPLE"]');
    assert.equal(await money.locator('[data-home-ledger]').count(),3);
    assert.match(await money.innerText(),/−₩10,000/);assert.match(await money.innerText(),/\+₩250,000/);
    assert(!/예전 거래/.test(await money.innerText()));
    const money3=(await money.boundingBox()).height;
    await p.evaluate(()=>{G.ledger=G.ledger.slice(0,1);PLAY.ui()});
    assert((await money.boundingBox()).height<money3,'money shrinks with fewer entries');
    assert.match(await favorites.innerText(),/즐겨찾기한 인물/);
    assert.equal(await favorites.locator('[data-home-person]').count(),0);
    assert.match(await p.locator('[data-status-traits]').innerText(),/정의감.*튼튼한 몸/);
    assert.match(await p.locator('[data-status-skills]').innerText(),/조준.*관통 사격/);
    assert.equal(await p.locator('#lifeSide [data-sttab="스킬"],#lifeSide [data-hstatus-scroll="skills"]').count(),0);
    await p.click('[data-life-widget-edit]');
    for(const id of people.slice(0,10)) {
      await p.selectOption('[data-life-person-pick]',id);await p.click('[data-life-person-add]');
      if(id===people[0])await p.evaluate(()=>window.onePersonHeight=document.querySelector('[data-life-widget="WG_PEOPLE"]').getBoundingClientRect().height);
    }
    assert.equal(await favorites.locator('[data-home-person]').count(),10);
    assert(await p.locator('[data-life-person-add]').isDisabled());
    assert(await p.evaluate(()=>document.querySelector('[data-life-widget="WG_PEOPLE"]').getBoundingClientRect().height>onePersonHeight));
    assert.deepEqual(await favorites.locator('[data-home-person]').evaluateAll(L=>L.map(el=>el.dataset.homePerson)),people.slice(0,10));
    await p.click(`[data-life-person-remove="${people[0]}"]`);
    assert.equal(await favorites.locator('[data-home-person]').count(),9);
    await p.selectOption('[data-life-person-pick]',people[10]);await p.click('[data-life-person-add]');
    const saved=await p.evaluate(()=>{saveGame('slot1');const s=store.get(SAVE_KEY,[]).find(x=>x.slot==='slot1');G=clone(s.data);enterGame();return prefs().play.homePeople});
    assert.deepEqual(saved,[...people.slice(1,10),people[10]]);
    assert.deepEqual(await favorites.locator('[data-home-person]').evaluateAll(L=>L.map(el=>el.dataset.homePerson)),saved);
    // Selected acquaintances must survive periodic relationship cleanup.
    assert(await p.evaluate(()=>{const r=relOf(prefs().play.homePeople[0]);r.rel='REL_ACQ';r.status='RS_NONE';r.to={};G.mem=[];LIFE.tidyRelations();return !!relOf(prefs().play.homePeople[0])}));
    await p.evaluate(()=>{G.ledger=[['3/14','식비',-10000],['3/14','공략 수입',250000],['3/14','교통비',-2000]];UI.lifeWidgetEdit=false;render()});
    await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-home-widgets.png'),fullPage:true});
    for(const width of [768,400,320]) {
      await p.setViewportSize({width,height:900});await p.evaluate(()=>render());
      assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);
      assert(await p.evaluate(()=>document.querySelector('#main').scrollWidth<=document.querySelector('#main').clientWidth+1),'main overflow '+width);
    }
    assert.deepEqual(errs,[]);console.log('home text status / ledger / favorite selection and cap / adaptive height / save / responsive passed; errs []');
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
