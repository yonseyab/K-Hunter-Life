/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 길드 운영 2차: 배분율 제안 영입 · 계약 · 사기 · 맡기기 · 길드 수입 · 길드 입찰 · 계약 만료 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('guild');leaveGuild();UI.guildTab='길드 창설';G.money=80000000;G.rep=30;G.time=600;G.stopOn.event=false;G.stopOn.lowEnergy=false;render()});
await p.fill('#gname','새벽빛 길드');await p.click('[data-guildfound]');
await p.click('[data-recshare="12"]');
console.log('recruit',await p.evaluate(()=>{const out=[];for(const id of ['HN_B0008','HN_B0010','HN_B0013']){G.time=600;let r='';for(let k=0;k<6&&!H(id).guild;k++)r=recruitTry(id,12);out.push(r.slice(0,40))}return out.join(' | ')}));
console.log('contracts',await p.evaluate(()=>JSON.stringify(G.myGuild.mem)));
/* 열린 게이트 하나를 맡기고 2주 */
console.log('delegate',await p.evaluate(()=>{const g=vals('gates').find(x=>gateSt(x.id).status==='open'&&!x.owner&&!x.bid&&DB.ranks[x.rank].lv>=16);if(!g)return 'no gate';gateSt(g.id).delegate=true;const f0=G.myGuild.funds;runTime('week');runTime('week');return `${g.name} ${gateSt(g.id).status} by ${gateSt(g.id).by||'-'} · funds ${f0}→${G.myGuild.funds} · raids ${JSON.stringify(Object.values(G.myGuild.mem).map(m=>m.raids))}`}));
await p.evaluate(()=>{UI.screen='squad';UI.guildTab='영입 · 관리';render()});await p.screenshot({path:OUT+'/guild2.png'});
/* 배분율 조정 → 사기 */
const id0=await p.evaluate(()=>Object.keys(G.myGuild.mem)[0]);
if(id0){const m0=await p.evaluate(id=>G.myGuild.mem[id].morale,id0);await p.click(`[data-gshare="${id0}|1"]`);console.log('share up',m0,'→',await p.evaluate(id=>[G.myGuild.mem[id].share,G.myGuild.mem[id].morale],id0))}
/* 사기 바닥 + 월초 → 이적 / 계약 만료(사기 높음) → 재계약 */
console.log('leave/renew',await p.evaluate(()=>{const ids=Object.keys(G.myGuild.mem);if(ids.length<2)return 'few';G.myGuild.mem[ids[0]].morale=0;DB.balance.BAL_GUILD.leaveChance=1;let d=G.day;while(new Date(2026,2,9+d).getDate()!==1)d++;G.myGuild.funds=1e8;guildMonth(d);
  G.myGuild.mem[ids[1]].morale=90;G.myGuild.mem[ids[1]].until=G.day;guildDaily(G.day);return [H(ids[0]).guild,H(ids[1]).guild,G.alerts.slice(0,2).map(a=>a.subj).join(' / ')]}));
/* 길드 자금으로 입찰 */
console.log('guild bid',await p.evaluate(()=>{const g=DB.gates.GT_0003,st0=gateSt(g.id);st0.winner=null;st0.bidDone=false;st0.status='open';st0.breakAt=nowAbs()+5000;st0.myBid=0;G.myGuild.funds=50000000;const f0=G.myGuild.funds;placeBid(g.id,10000000,true);const st=gateSt(g.id);st.bidEnd=nowAbs()-1;resolveBids();return `${g.name} winner=${st.winner} funds ${f0}→${G.myGuild.funds} permit=${hasPermit(g)}`}));
console.log('errs',errs);await b.close()})();
