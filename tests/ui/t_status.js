const assert=require('assert/strict'),path=require('path');
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});try{
  const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});
  await p.evaluate(()=>{gameFromScenario('SC_BDEMO');G.coin=123456;G.player.statPts=5;enterGame('status')});
  for(const tab of ['상태','성장','공개 설정']){
    await p.click(`[data-sttab="${tab}"]`);
    const fits=await p.evaluate(()=>{const m=document.querySelector('#main');return m.scrollHeight<=m.clientHeight+1&&document.documentElement.scrollWidth<=innerWidth});
    assert.equal(fits,true,tab+' should fit 1366×768');
    assert.equal(await p.locator('[data-retire]').count(),0);
    await p.screenshot({path:path.join(process.env.OUT||require('os').tmpdir(),'hunter-status-'+(['상태','성장','공개 설정'].indexOf(tab))+'.png')});
  }
  await p.click('[data-sttab="상태"]');
  assert.match(await p.locator('[data-status-coin]').innerText(),/123,456/);
  assert.equal(await p.locator('[data-statpt]').count(),0);
  assert.equal(await p.locator('.sw2-sk').count(),0);
  await p.click('[data-statusdetail="injuries"]');assert.match(await p.locator('[role="dialog"]').innerText(),/현재 부상이 없습니다/);await p.click('[aria-label="닫기"]');
  await p.evaluate(()=>{addInjury('PART_TORSO','INJ_CUT',1);render()});await p.click('[data-statusdetail="injuries"]');assert.match(await p.locator('[role="dialog"]').innerText(),/남은 회복 시간/);await p.click('[aria-label="닫기"]');
  await p.click('[data-sttab="성장"]');const before=await p.evaluate(()=>G.player.stats.STAT_BODY);await p.click('[data-statpt="STAT_BODY"]');assert.equal(await p.evaluate(()=>G.player.stats.STAT_BODY),before+1);assert.equal(await p.evaluate(()=>G.player.statPts),4);
  await p.click('[data-sttab="공개 설정"]');const pub=await p.evaluate(()=>G.statusPublic.stats);await p.click('[data-pubtog="stats"]');assert.equal(await p.evaluate(()=>G.statusPublic.stats),!pub);
  await p.click('[data-statusdetail="public"]');assert.equal(await p.locator('[role="dialog"] [data-status-coin]').count(),0);await p.click('[aria-label="닫기"]');
  await p.evaluate(()=>{const skill=G.player.skills[0];G.player.skills=Array.from({length:1000},()=>skill);UI.stTab='상태';render()});assert.equal(await p.locator('.sw2-sk').count(),0);assert.equal(await p.evaluate(()=>{const m=document.querySelector('#main');return m.scrollHeight<=m.clientHeight+1}),true);
  await p.click('.tools [data-go="settings"]');await p.click('[data-settingstab="헌터 관리"]');assert.equal(await p.locator('[data-retire]').count(),1);
  await p.click('[data-retire]');assert.equal(await p.evaluate(()=>!!G.dead),false);await p.click('[data-retire]');assert.equal(await p.evaluate(()=>G.dead.kind),'retire');
  assert.deepEqual(errs,[]);console.log('status layout / tabs / coin / stats / privacy / retirement passed; errs',errs);
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
