/* DB 화면: 8개 탭 · 검색 · 정렬 · 분류 칩(기준 바꾸기 · 숨기기 · 저장) · 상세 · 다른 탭으로 건너가기 */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict');
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM});
  try {
    const p=await b.newPage({viewport:{width:1366,height:768}}),errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
    await p.evaluate(async()=>{await packsLoad();gameFromScenario('SC_BDEMO');enterGame();await poolPrefetch()});
    await p.click('#nav [data-go="homeDb"]');
    await p.getByRole('tab',{name:'게이트',exact:true}).click();
    assert.match(await p.locator('#dbx-list').innerText(),/아직 열린 게이트가 없습니다/);
    await p.evaluate(()=>{const r=rng('dbtest');for(let i=0;i<6;i++)spawnGate(r);render()});
    const out=process.env.OUT||'/tmp';
    for(const [tab,label] of [['people','인물'],['gates','게이트'],['monsters','몬스터'],['equipment','장비'],['places','장소'],['other','기타'],['classes','클래스'],['skills','스킬']]){
      await p.getByRole('tab',{name:label,exact:true}).click();
      const n=await p.locator('#dbx-list tbody tr[data-dbx-sel]').count();
      assert.ok(n>0,tab+' 목록 비어 있음');
      if(n) assert.ok((await p.locator('#dbx-det .dbx-h').count())===1,tab+' 상세 없음');
      if(process.env.SHOT) await p.screenshot({path:`${out}/db_${tab}.png`});
    }
    /* 장비: 검색 · 칩 · 정렬 */
    await p.getByRole('tab',{name:'장비',exact:true}).click();
    await p.fill('[data-dbx-q]','단검');await p.waitForTimeout(200);
    assert.match(await p.locator('#dbx-list').innerText(),/협회 지급 단검/);
    await p.fill('[data-dbx-q]','');await p.waitForTimeout(200);
    await p.click('[data-dbx-chip="방어구"]');
    assert.ok(!/협회 지급 단검/.test(await p.locator('#dbx-list').innerText()));
    await p.click('[data-dbx-sort="price"]');
    assert.deepEqual(await p.evaluate(()=>SETTINGS.dbView.equipment.s),['price',1]);
    /* 분류 기준을 갈래로, 칩 하나 숨기기 → 설정에 저장 */
    await p.click('[data-dbx-edit]');
    await p.selectOption('[data-dbx-group]','slot');
    await p.locator('[data-dbx-show="무기"]').uncheck();
    assert.equal(await p.locator('[data-dbx-chip="무기"]').count(),0);
    assert.deepEqual(await p.evaluate(()=>[SETTINGS.dbView.equipment.g,SETTINGS.dbView.equipment.hide]),['slot',['무기']]);
    assert.ok(/dbView/.test(await p.evaluate(()=>localStorage.getItem('khl.settings'))));
    await p.click('[data-dbx-reset]');
    assert.equal(await p.evaluate(()=>SETTINGS.dbView.equipment?.g||'cat'),'cat');
    /* 클래스 → 스킬로 건너가기 */
    await p.getByRole('tab',{name:'클래스',exact:true}).click();
    await p.click('#dbx-list tr[data-dbx-sel="CLS_B01"]');
    await p.click('#dbx-det [data-dbx-go="skills|SK_B0001"]');
    assert.equal(await p.getByRole('tab',{name:'스킬',exact:true}).getAttribute('aria-selected'),'true');
    assert.match(await p.locator('#dbx-det').innerText(),/방패 밀치기/);
    /* 인물: 나 */
    await p.getByRole('tab',{name:'인물',exact:true}).click();
    assert.match(await p.locator('#dbx-list').innerText(),/나/);
    assert.deepEqual(errs,[]);
    console.log('ok t_db');
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
