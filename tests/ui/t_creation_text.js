/* 새 헌터 선택지: 짧은 의상 이름 · 설명 보존/검색 · 긴 옵션과 선택값의 실제 줄바꿈. */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try{
  const p=await b.newPage({viewport:{width:1366,height:900}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  await p.evaluate(async()=>{await packsLoad();UI.cc=newCC();autoAll(UI.cc);UI.mode='create';UI.cc.step=1;UI.cc.lkSel='LK_OUTFIT';document.querySelector('#root').innerHTML='';render()});
  const outfit=await p.evaluate(()=>vals('lookOpts').filter(o=>o.pool==='SC_OUTFIT').map(o=>({id:o.id,name:o.name,desc:o.desc})));
  assert.equal(outfit.length,60);assert(outfit.every(o=>o.name.length<=26&&o.name.endsWith('선호')));
  assert.equal(outfit.filter(o=>o.desc).length,50);
  assert.match(await p.locator('[data-chopt="lk|LO_LA0109"]').getAttribute('title'),/타이트하고 몸매가 드러나는/);
  await p.click('[data-chopt="lk|LO_LA0109"]');
  assert.equal(await p.evaluate(()=>UI.cc.look.LK_OUTFIT),'LO_LA0109');
  assert.equal(await p.locator('#lkcur').innerText(),'몸의 선이 드러나는 옷 선호');
  await p.fill('[data-chq="lk"]','몸매가 드러나는');
  assert.equal(await p.locator('[data-chopt="lk|LO_LA0109"]').count(),1);
  await p.fill('[data-chq="lk"]','');
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-outfit-labels.png'),fullPage:true});
  const problems=[];
  for(const width of [1366,768,400,320]){
   await p.setViewportSize({width,height:900});
   problems.push(...await p.evaluate(width=>{
    const failures=[];
    for(const sex of ['여','남']){
     UI.cc.sex=sex;
     for(const [ns,step] of [['bi',0],['lk',1],['bg',2]]){
      UI.cc.step=step;
      for(const item of CH[ns].items(UI.cc)){
       if(item.slider||item.text)continue;
       UI.cc[ns+'Sel']=item.id;UI.cc[ns+'Q']='';UI.cc[ns+'G']='';render();
       const labels=[...document.querySelectorAll('.choice-label')];
       for(const label of labels){const st=getComputedStyle(label);if(st.whiteSpace==='nowrap'||st.textOverflow==='ellipsis'||label.scrollWidth>label.clientWidth+1||label.scrollHeight>label.clientHeight+1){failures.push(`${width}/${sex}/${ns}/${item.id}: ${label.textContent}`);break;}}
       if(document.documentElement.scrollWidth>innerWidth+1)failures.push(`${width}/${sex}/${ns}/${item.id}: page overflow`);
      }
     }
    }return failures;
   },width));
  }
  assert.deepEqual(problems,[]);
  // Long background choices and the selected summary must remain readable in all three locations.
  await p.setViewportSize({width:1366,height:900});
  const longest=await p.evaluate(()=>{
   const cc=UI.cc;cc.step=2;const candidates=CH.bg.items(cc).filter(it=>!it.slider&&!it.text).flatMap(it=>CH.bg.opts(it,cc).map(o=>({item:it.id,id:o.id,name:o.name}))).sort((a,b)=>b.name.length-a.name.length),o=candidates[0];
   cc.bgSel=o.item;cc.bgQ='';cc.bgG='';render();return o;
  });
  assert(longest.name.length>15);
  await p.click(`[data-chopt="bg|${longest.id}"]`);
  for(const selector of ['#bgcur .tx',`[data-chitem="bg|${longest.item}"] .tx`]){
   const text=await p.locator(selector).innerText();assert(text.includes(longest.name));
   assert(await p.locator(selector).evaluate(el=>getComputedStyle(el).whiteSpace!=='nowrap'&&el.scrollWidth<=el.clientWidth+1&&el.scrollHeight<=el.clientHeight+1));
  }
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-creation-long-options.png'),fullPage:true});
  assert.deepEqual(errs,[]);console.log('60 concise outfit labels / 50 original descriptions / search / selection / all basic-look-background categories both sexes at 320–1366px / selected summary passed; errs []');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
