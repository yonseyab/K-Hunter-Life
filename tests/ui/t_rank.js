/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 레벨업 → 스탯 포인트 5 분배 · HP/MP 증가 · 상태창 자동 등급 갱신 · 은퇴 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('status')});
console.log('demo qualify',await p.evaluate(()=>JSON.stringify([G.player.rank,rankQualify(G.player)])));
console.log('npc qualify',await p.evaluate(()=>vals('hunters').map(h=>DB.ranks[h.rank].lv+'→'+rankQualify(h).lv).join(' ')));
const v0=await p.evaluate(()=>vitals(G.player));
console.log('lvup',await p.evaluate(()=>{const h=G.player;h.walls=[10,20,30];return addExp(expNeed(h.level)+1).join(' / ')}),JSON.stringify(v0),'→',JSON.stringify(await p.evaluate(()=>vitals(G.player))));
await p.evaluate(()=>render());await p.screenshot({path:OUT+'/rank_status.png'});
await p.click('[data-sttab="성장"]');
for(let i=0;i<5;i++)await p.click('[data-statpt="STAT_BODY"]');
console.log('pts',await p.evaluate(()=>[G.player.statPts,G.player.stats.STAT_BODY]));
/* 스탯 · 능력을 크게 올리면 등급 갱신 알림 */
console.log('rankup',await p.evaluate(()=>{const h=G.player;Object.keys(h.stats).forEach(k=>h.stats[k]+=30);Object.keys(h.abl).forEach(k=>h.abl[k]=Math.min(20,h.abl[k]+3));const r=rankCheck();return [r.join(),h.rank,G.alerts[0].subj]}));
await p.evaluate(()=>{UI.screen='settings';UI.settingsTab='헌터 관리';render()});await p.click('[data-retire]');await p.click('[data-retire]');
console.log('retired',await p.evaluate(()=>[UI.screen,G.dead.kind]));await p.screenshot({path:OUT+'/retire.png'});
console.log('errs',errs);await b.close()})();
