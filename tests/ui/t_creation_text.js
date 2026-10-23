/* 새 헌터 선택지: 긴 옵션과 선택값의 실제 줄바꿈 (옛 외주 의상 문구 검사는 데이터와 함께 삭제, 2026-10-24) */
const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try{
  const p=await b.newPage({viewport:{width:1366,height:900}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  await p.evaluate(async()=>{await packsLoad();UI.cc=newCC();autoAll(UI.cc);UI.mode='create';UI.cc.step=1;UI.cc.lkSel='LK_OUTFIT';document.querySelector('#root').innerHTML='';render()});
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
   const cc=UI.cc;cc.step=2;const candidates=CH.bg.items(cc).filter(it=>!it.slider&&!it.text&&!it.multi).flatMap(it=>CH.bg.opts(it,cc).map(o=>({item:it.id,id:o.id,name:o.name}))).sort((a,b)=>b.name.length-a.name.length),o=candidates[0];
   cc.bgSel=o.item;cc.bgQ='';cc.bgG='';render();return o;
  });
  await p.click(`[data-chopt="bg|${longest.id}"]`);
  for(const selector of ['#bgcur .tx',`[data-chitem="bg|${longest.item}"] .tx`]){
   const text=await p.locator(selector).innerText();assert(text.includes(longest.name));
   assert(await p.locator(selector).evaluate(el=>getComputedStyle(el).whiteSpace!=='nowrap'&&el.scrollWidth<=el.clientWidth+1&&el.scrollHeight<=el.clientHeight+1));
  }
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-creation-long-options.png'),fullPage:true});
  assert.deepEqual(errs,[]);console.log('all basic-look-background categories both sexes at 320–1366px / selected summary passed; errs []');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
