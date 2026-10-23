/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(APP);await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
/* 길드 설립 → 영입 → 운영비 → 저장 왕복 → 방출 → 해산 */
await p.evaluate(()=>{gameFromScenario('SC_BDEMO');enterGame('guild');leaveGuild();UI.guildTab='길드 창설';G.money=60000000;G.rep=30;G.time=600;render()});
await p.fill('#gname','새벽빛 길드');await p.click('[data-guildfound]');
console.log('found',await p.evaluate(()=>[isMaster(),G.player.guild,DB.guilds[G.player.guild].name,G.money,G.player.contract.share]));
await p.screenshot({path:OUT+'/myguild.png'});
const free=await p.evaluate(()=>allHunters().filter(h=>!h.guild&&h.id!==G.player.id).map(h=>h.id));console.log('free',free);
let tries=0;while(tries<6&&await p.evaluate(()=>guildMembers(G.player.guild).length)<2){await p.evaluate(()=>{G.time=600});await p.evaluate(()=>render());const btn=p.locator('[data-actdo="ACT_RECRUIT"]').first();if(!(await btn.count()))break;await btn.click();tries++;console.log((await p.locator('#toast').innerText()).replace(/\n/g,' ').slice(0,160))}
console.log('members',await p.evaluate(()=>guildMembers(G.player.guild).map(m=>m.name+'/'+m.rank)));
console.log('month',await p.evaluate(()=>{G.myGuild.funds=1000000;const m0=G.money;let d=G.day;while(new Date(2026,2,9+d).getDate()!==1)d++;guildMonth(d);return [G.myGuild.funds,G.money-m0,G.alerts[0].subj]}));
console.log('roundtrip',await p.evaluate(()=>{saveGame('slot3');const id=G.player.guild;loadGame('slot3');ensureTime();return [!!DB.guilds[id],guildMembers(id).length]}));
const mid=await p.evaluate(()=>guildMembers(G.player.guild).find(m=>m.id!==G.player.id)?.id);
if(mid){await p.evaluate(()=>{UI.screen='squad';UI.guildTab='영입 · 관리';render()});await p.click(`[data-release="${mid}"]`);await p.click(`[data-release="${mid}"]`);console.log('released',await p.evaluate(id=>H(id).guild,mid))}
await p.click('[data-guildleave]');await p.click('[data-guildleave]');
console.log('disband',await p.evaluate(()=>[G.player.guild,G.myGuild,Object.keys(DB.guilds).filter(k=>k.startsWith('GD_P')).length]));
console.log('errs',errs);await b.close()})();
