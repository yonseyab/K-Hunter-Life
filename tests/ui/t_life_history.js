const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try {
  const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();G.day=22;G.time=600;G.story=[];delete G.storyArchive;for(let i=0;i<1205;i++)STORY.add('act','3월 기록 '+i,3);render()});
  assert.equal(await p.evaluate(()=>G.story.length),1205,'900-line deletion is gone');
  assert(await p.locator('#story .sl').count()<=500);
  await p.evaluate(async()=>{G.day=23;STORY.add('day','4월의 시작',1);PLAY.ui();await LIFE_LOG.flush();saveGame('slot1')});
  assert.equal(await p.evaluate(()=>G.story.length),1);
  assert(!/3월 기록/.test(await p.locator('#story').innerText()));
  assert.match(await p.locator('#lifeMonthLabel').innerText(),/4월/);
  assert.equal(await p.evaluate(async()=>(await LIFE_LOG.readMonth('2026-03')).length),1205);
  assert.equal(await p.evaluate(()=>Object.keys(G.storyArchive.pending).length),0);
  assert.equal(await p.evaluate(()=>LIFE_LOG.dayRows(22).length),1205,'month boundary keeps the previous day available to daily summaries');
  // Rewind snapshots reference immutable chunks: future additions cannot leak into an old save.
  await p.evaluate(async()=>{STORY.add('sys','다른 분기의 과거 기록',1,{t:22*1440+700});await LIFE_LOG.flush()});
  assert.equal(await p.evaluate(async()=>(await LIFE_LOG.readMonth('2026-03')).length),1206);
  await p.reload();await p.evaluate(async()=>{await packsLoad();loadGame('slot1');enterGame()});
  assert.equal(await p.evaluate(async()=>(await LIFE_LOG.readMonth('2026-03')).length),1205);
  // If archive writes fail, raw text remains in the actual save until a successful retry.
  const failed=await p.evaluate(async()=>{
    const put=IDBObjectStore.prototype.put,simSave=SIM.save;IDBObjectStore.prototype.put=function(){throw new Error('test quota')};SIM.save=()=>true;
    G.day=53;STORY.add('day','5월의 시작',1);const ok=await LIFE_LOG.flush();saveGame('slot3');
    const snapshot=store.get(SAVE_KEY,[]).find(s=>s.slot==='slot3').data,rows=await LIFE_LOG.readMonth('2026-04',snapshot);
    IDBObjectStore.prototype.put=put;SIM.save=simSave;return {ok,pending:Object.keys(snapshot.storyArchive.pending).length,text:rows.map(r=>r.s)};
  });
  assert.equal(failed.ok,false);assert(failed.pending>0);assert(failed.text.includes('4월의 시작'));
  await p.evaluate(async()=>{loadGame('slot3');enterGame();await LIFE_LOG.flush()});
  assert.equal(await p.evaluate(()=>Object.keys(G.storyArchive.pending).length),0);
  assert.equal(await p.evaluate(async()=>(await LIFE_LOG.readMonth('2026-04'))[0].s),'4월의 시작');
  // 101 calendar years / 1201 months. The main save contains a compact month index, not all raw text.
  const scale=await p.evaluate(async()=>{
    const day=(y,m,d=14)=>Math.round((Date.UTC(y,m-1,d)-Date.UTC(2026,2,9))/86400000);
    G.story=[];delete G.storyArchive;G.day=day(2126,3);G.time=600;
    for(let y=2026;y<=2126;y++)for(let m=1;m<=12;m++)if((y>2026||m>=3)&&(y<2126||m<=3)){
      G.story.push({t:day(y,m)*1440+600,k:'event',s:`${y}년 ${m}월의 사건`,lv:1},{t:day(y,m)*1440+601,k:'act',s:`${y}년 ${m}월의 일상`,lv:3});
    }
    for(let i=0;i<1205;i++)G.story.push({t:day(2026,3)*1440+610+i,k:'act',s:'옛 훈련 기록 '+i,lv:3});
    G.story.push({t:day(2026,3)*1440+609,k:'choice',s:'백년 전 약속을 기억한다.',lv:1});
    const total=G.story.length;LIFE_LOG.rotate();await LIFE_LOG.flush();UI.homeTabs.story='bio';UI.screen='life';render();saveGame('slot2');
    return {months:LIFE_LOG.index().length,total,active:G.story.length,indexBytes:JSON.stringify(G.storyArchive).length};
  });
  assert.equal(scale.months,1201);assert.equal(scale.active,2);assert(scale.indexBytes<600000);
  await p.click('[data-history-open]');
  const modal=p.locator('#lifeHistoryModal');assert(await modal.evaluate(el=>el.matches(':modal')));
  await p.selectOption('[data-history-year]','2026');await p.selectOption('[data-history-month]','03');
  await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.equal(await p.locator('[data-history-row]').count(),100);
  assert.match(await p.locator('.history-pager').innerText(),/1 \/ 13페이지/);
  await p.click('[data-history-page="1"]');await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.match(await p.locator('.history-pager').innerText(),/2 \/ 13페이지/);
  await p.fill('[data-history-query]','백년 전 약속');
  await p.waitForFunction(()=>document.querySelectorAll('[data-history-row]').length===1&&!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.match(await p.locator('.history-output').innerText(),/백년 전 약속/);
  await p.locator('[data-history-all]').check();
  await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'),{},{timeout:60000});
  assert.equal(await p.locator('[data-history-row]').count(),1);
  await p.click('[data-history-jump]');await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.equal(await p.locator('[data-history-all]').isChecked(),false);
  assert.equal(await p.locator('[data-history-query]').inputValue(),'');
  assert(await p.locator('[data-history-day]').inputValue());
  await p.selectOption('[data-history-kind]','event');await p.locator('[data-history-all]').check();
  await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  const first=await p.locator('[data-history-row]').first().innerText();assert.equal(await p.locator('[data-history-row]').count(),100);
  await p.click('[data-history-page="1"]');await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.notEqual(await p.locator('[data-history-row]').first().innerText(),first);
  await p.click('[data-history-page="-1"]');await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
  assert.equal(await p.locator('[data-history-row]').first().innerText(),first);
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-life-history.png'),fullPage:true});
  // A second query cancels an in-flight century search; old results cannot overwrite it.
  await p.fill('[data-history-query]','백년 전 약속');await p.waitForTimeout(240);await p.fill('[data-history-query]','존재하지 않는 문장');
  await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy')&&document.querySelector('.history-output').textContent.includes('조건에 맞는 기록이 없어'),{},{timeout:60000});
  assert.equal(await p.locator('[data-history-row]').count(),0);
  await p.keyboard.press('Escape');assert.equal(await modal.count(),0);
  // Actual reload, not just a cloned in-memory game.
  await p.reload();await p.evaluate(async()=>{await packsLoad();loadGame('slot2');enterGame();UI.homeTabs.story='bio';render()});
  assert.equal(await p.evaluate(()=>LIFE_LOG.index().length),1201);
  assert.equal(await p.evaluate(async()=>(await LIFE_LOG.readMonth('2026-03')).length),1208);
  for(const width of [768,400,320]){
    await p.setViewportSize({width,height:800});await p.click('[data-history-open]');
    await p.waitForFunction(()=>!document.querySelector('.history-output').hasAttribute('aria-busy'));
    assert(await modal.evaluate(el=>el.scrollWidth<=el.clientWidth+1),'modal overflow '+width);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'page overflow '+width);
    await p.click('[data-history-close]');
  }
  // Missing browser data must show an error instead of falsely claiming the month is empty.
  await p.evaluate(()=>{window.originalMonth=G.storyArchive.months['2026-03'];G.storyArchive.months['2026-03']={...originalMonth,keys:['missing-test-record']};HISTORY_UI.open('2026-03')});
  await p.waitForFunction(()=>document.querySelector('.history-status').textContent.includes('기록을 불러오지 못했어'));
  assert.equal(await p.locator('[data-history-retry]').count(),1);await p.click('[data-history-close]');
  await p.evaluate(()=>G.storyArchive.months['2026-03']=originalMonth);
  assert.deepEqual(errs,[]);console.log('monthly rotation / 900+ preservation / IDB reload / rewind isolation / write failure recovery / 1201 months / pagination / cross-century search / cancellation / mobile passed; errs []');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
