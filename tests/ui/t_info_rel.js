/* 2026-10-24: 정보 탭(기본 스탯 4개 · 사진 칸) · 관계 눈금 · 성좌 모를 때 선물 안배 · 설정 사진 주문서 · 커마 오른쪽 칸 없음 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:900}}),errs=[],out=process.env.OUT||os.tmpdir();
    p.on('pageerror',e=>errs.push(e.stack));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();});
    await p.click('#nav [data-home-tab="hunter|profile"]');
    assert.equal(await p.locator('.hi-band .hi-fact.st').count(),4);
    assert.match(await p.locator('.hi-band').innerText(),/신체[\s\S]*정신[\s\S]*마력[\s\S]*감각/);
    assert.equal(await p.locator('.hi-band .hi-por').count(),0);
    assert.equal(await p.locator('.hi-cols .hi-photo .por').count(),1);
    await p.screenshot({path:path.join(out,'khl-info.png'),fullPage:true});
    /* 관계: 눈금 10칸, '꽤' 없음 */
    await p.evaluate(()=>{const r=(G.relations||[])[0];if(r){ensureRel(r);r.to.RD_TRUST=60;r.to.RD_RESPECT=50;r.to.RD_LIKE=-30;UI.hrelSel=r.id;}});
    await p.click('[data-home-tab="hunter|relations"]');
    const txt=await p.locator('.hr').innerText();
    assert(!/꽤/.test(txt),'꽤 남음');
    if(await p.locator('.hr-detail .hr-tick').count()){assert.equal(await p.locator('.hr-detail .hr-tick').first().locator('i').count(),10);assert.match(txt,/믿는다|인정한다/);}
    await p.screenshot({path:path.join(out,'khl-rel.png'),fullPage:true});
    /* 성좌를 모를 때 선물 */
    const g=await p.evaluate(()=>{G.starKnown=false;const it=vals('items').find(i=>i.cat==='ITC_CONSUME');STAR.gift(it.id,1,'shop');return {c:G.starGifts[0].cover,s:(G.story||[]).slice(-3).map(x=>x.s).join('|')}});
    assert(g.c&&!/성좌|어디선가/.test(g.c),'cover '+g.c);
    /* 설정 사진 주문서 */
    await p.evaluate(()=>{UI.screen='settings';UI.settingsTab='헌터 관리';render()});
    await p.click('[data-kimgp]');
    const pr=await p.locator('.kimgp').inputValue();
    assert.match(pr,/흰색 배경/);assert.match(pr,/실사/);assert.match(pr,/키: \d+cm/);
    console.log(pr.split('\n').slice(0,8).join('\n'));
    /* 커마 오른쪽 칸 없음 */
    await p.evaluate(()=>{UI.cc=newCC();UI.mode='create';UI.cc.step=0;$('#root').innerHTML='';render()});
    assert.equal(await p.locator('.cc-side').count(),0);assert.equal(await p.locator('.cc-noside').count(),1);
    await p.screenshot({path:path.join(out,'khl-cc.png')});
    assert.deepEqual(errs,[]);console.log('info / rel / gift cover / prompt passed;',g.c);
  } finally {await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
