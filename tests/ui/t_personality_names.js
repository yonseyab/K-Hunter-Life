const {chromium}=require('playwright'),path=require('path'),assert=require('assert/strict'),os=require('os');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM});
 try{
  const p=await b.newPage({viewport:{width:1500,height:950}}),errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(__dirname,'../../game/index.html'));
  const checks=await p.evaluate(()=>{
   const axes=vals('ccPersonality'),names=[],random=Math.random;
   Math.random=()=>{throw new Error('표시용 요약은 난수를 쓰면 안 됨')};
   try{
    for(let mask=0;mask<256;mask++){const v=Object.fromEntries(axes.map((a,i)=>[a.id,mask&(1<<i)?9:2]));const before=JSON.stringify(v),name=persHeadline(v);if(before!==JSON.stringify(v))throw new Error('성격 값 변경');if(persHeadline(v)!==name)throw new Error('요약 불안정');names.push(name);}
    const base=Object.fromEntries(axes.map(a=>[a.id,2])),baseName=persHeadline(base),flips=axes.map(a=>persHeadline({...base,[a.id]:9})!==baseName);
    const example={PX_EXTRO:9,PX_SELF:2,PX_COMPET:2,PX_DEPEND:2,PX_PRAG:9,PX_ADVEN:9,PX_PESSI:2,PX_EXPRESS:9};
    return {unique:new Set(names).size,names,flips,example:persHeadline(example),empty:persHeadline({}),neutral:persHeadline(Object.fromEntries(axes.map(a=>[a.id,5]))),partial:persHeadline({PX_EXTRO:9}),deleted:['persExtra','persCombos','persNeutral','persFacets'].every(t=>!DB[t]),sliders:axes.every(a=>a.levels.length===10),noDetails:axes.every(a=>!('balanced'in a)&&Object.values(a.poles).every(p=>Object.keys(p).sort().join(',')==='adj,noun'))};
   }finally{Math.random=random;}
  });
  assert.equal(checks.unique,256);assert(checks.flips.every(Boolean),'all eight axes affect the summary');assert.equal(checks.example,'활달한 조력자');assert.equal(checks.empty,'미정');assert.equal(checks.neutral,'균형 잡힌 조율자');assert(checks.partial);assert(checks.deleted&&checks.noDetails&&checks.sliders);
  await p.evaluate(async()=>{await packsLoad();UI.cc=newCC();autoAll(UI.cc);UI.mode='create';UI.cc.step=3;UI.cc.pers={PX_EXTRO:9,PX_SELF:2,PX_COMPET:2,PX_DEPEND:2,PX_PRAG:9,PX_ADVEN:9,PX_PESSI:2,PX_EXPRESS:9};document.querySelector('#root').innerHTML='';render();window.personalitySlider=document.querySelector('[data-ccpers="PX_EXPRESS"]')});
  assert.equal(await p.locator('#pxsum .px-head').innerText(),'활달한 조력자');
  assert.equal(await p.locator('#pxsum .px-summary-note').count(),1);
  const note=await p.locator('#pxsum .px-summary-note').innerText();assert(note.includes('먼저 다가가'));assert(note.length<=110);assert.equal(await p.locator('#pxsum dl,#pxsum dt,#pxsum dd').count(),0);
  await p.locator('[data-ccpers="PX_EXPRESS"]').evaluate(el=>{el.value=2;el.dispatchEvent(new Event('input',{bubbles:true}))});
  assert.equal(await p.locator('#pxsum .px-head').innerText(),'낙천적인 조력자');assert.notEqual(await p.locator('#pxsum .px-summary-note').innerText(),note);
  assert(await p.evaluate(()=>personalitySlider===document.querySelector('[data-ccpers="PX_EXPRESS"]')),'drag keeps the slider node');
  assert.equal(await p.locator('.px-ex').count(),8,'slider examples remain');
  await p.screenshot({path:path.join(process.env.OUT||os.tmpdir(),'khl-personality-name.png'),fullPage:true});
  await p.evaluate(()=>{UI.cc.step=7;render()});assert.equal(await p.locator('.px-sum .px-summary-note').count(),1);assert.equal(await p.locator('.px-sum dl').count(),0);assert.equal(await p.locator('.px-sum .px-head').innerText(),'낙천적인 조력자');
  for(const width of [768,400,320]){await p.setViewportSize({width,height:900});await p.evaluate(()=>{UI.cc.step=3;render()});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);}
  const stored=await p.evaluate(()=>{const expected=persHeadline(UI.cc.pers),h=buildHunter(UI.cc);return {expected,actual:h.personality}});assert.equal(stored.actual,stored.expected);
  assert.deepEqual(errs,[]);console.log('256 deterministic summary names / every axis / no data mutation or RNG / short summary restored without detailed lists / slider updates and drag / confirmation / responsive passed; errs []');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
