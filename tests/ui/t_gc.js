/* 승격 인물 정리 (SIM.gc): 목록에 보이느라 승격만 된 배경 인구를 다시 집계로 돌려 세이브 크기를 줄인다. 엮인 사람(관계 등)은 남긴다 · 다시 승격하면 같은 사람 · 거래 내역 접기 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForFunction(()=>typeof DB!=='undefined');
const r=await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame();
  const L=SIM.freeNear(G.player.region,DB.ranks[G.player.rank].lv,8);const ids=L.map(h=>h.id);const before=Object.fromEntries(L.map(h=>[h.id,{name:h.name,level:h.level,rank:h.rank,guild:h.guild}]));
  const keep=ids[0];ensureAcq(keep);
  const n0=SIM.gc();  /* 막 승격된 사람은 남긴다 */
  L.forEach(h=>h.promoAt=G.day-5);G.ai[ids[1]].money=1234000;
  const n1=SIM.gc();const gone=ids.filter(id=>!G.genHunters[id]);
  const row=SIM.popRow(+ids[1].slice(3));const again=H(ids[1]);
  return {n0,n1,keepStill:!!G.genHunters[keep],gone:gone.length,total:ids.length,rowPromoted:row.promoted,same:again&&again.name===before[ids[1]].name&&again.level===before[ids[1]].level&&again.rank===before[ids[1]].rank&&again.guild===before[ids[1]].guild,money:G.ai[ids[1]].money}});
console.log(JSON.stringify(r));
ok(r.n0===0,'막 승격된 사람 유지');ok(r.keepStill,'관계 있는 사람 유지');ok(r.gone===r.total-1&&r.n1===r.total-1,'나머지 정리');ok(r.same,'다시 승격하면 같은 사람');ok(r.money===1234000,'돈 되돌려 받음');
const r2=await p.evaluate(()=>{G.ledger=[];for(let i=0;i<500;i++)G.ledger.push(['1/1','x',i%2?1000:-500]);const inc=250*1000,exp=250*500;ledgerTidy();UI.screen='finance';render();const t=document.querySelector('#main').innerText;
  return {n:G.ledger.length,sum:G.ledgerSum,okInc:t.includes(won(inc)),okExp:t.includes(won(-exp))}});
console.log(JSON.stringify(r2));ok(r2.n===300&&r2.okInc&&r2.okExp,'거래 내역 접기');
console.log('errs',errs);await b.close()})();
