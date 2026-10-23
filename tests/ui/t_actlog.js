/* 활동 기록 위젯 (WG_LOG): 시간 진행 · 행동 결과가 쌓이고 홈에서 바로 갱신 · 오른쪽 아래 팝업은 설정을 켰을 때만 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForFunction(()=>typeof DB!=='undefined');
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame('home');SETTINGS.actToast=false});
ok(await p.evaluate(()=>G.layout.some(w=>w.id==='WG_LOG')),'새 게임 기본 배치에 활동 기록');
await p.evaluate(()=>{G.stopOn={};runTime('1h')});
const r1=await p.evaluate(()=>({n:(G.actLog||[]).length,toast:!document.querySelector('#toast').hidden,w:document.body.innerText.includes('진행 →')}));console.log(JSON.stringify(r1));
ok(r1.n>0&&!r1.toast&&r1.w,'진행 → 위젯 · 팝업 없음');
await p.evaluate(()=>{G.time=600;doNow('ACT_REST',60);render()});
const r2=await p.evaluate(()=>({top:G.actLog[0].s,home:document.querySelector('.actlog')?.innerText.split('\n').slice(0,3)}));console.log(JSON.stringify(r2));ok(r2.home&&r2.home.join(' ').includes('휴식'),'행동 결과 위젯');
await p.evaluate(()=>{SETTINGS.actToast=true;runTime('1h')});ok(await p.evaluate(()=>!document.querySelector('#toast').hidden),'설정 켜면 팝업');
await p.screenshot({path:OUT+'/actlog.png'});
await p.evaluate(()=>{SETTINGS.actToast=false;for(let i=0;i<300;i++)actLog('line','x'+i)});ok(await p.evaluate(()=>G.actLog.length===ACTLOG_KEEP),'개수 제한');
console.log('errs',errs);await b.close()})();
