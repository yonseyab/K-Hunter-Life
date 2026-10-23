/* UI 스모크 테스트 — tests/ui/README.md 참고 */
const path=require('path');const APP='file://'+path.resolve(__dirname,'../../game/index.html');const OUT=process.env.OUT||require('os').tmpdir();
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||undefined});
const errs=[];const p=await (await b.newContext({viewport:{width:1500,height:950}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto(''+APP+'');await p.addScriptTag({path:require('path').join(__dirname,'fixture.js')});await p.waitForTimeout(300);
await p.evaluate(()=>{const c=newCC();autoAll(c);gameFromCreation(c);enterGame('squad');G.time=600;render()});
await p.screenshot({path:''+OUT+'/gd_list.png'});
await p.click('[data-guildsel="GD_B02"]');await p.locator('[data-actdo="ACT_GUILD_VISIT"][data-acttgt="GD_B02"]').click();console.log((await p.locator('#toast').innerText()).replace(/\n/g,' '));
await p.click('[data-guildsel="GD_B05"]');await p.locator('[data-actdo="ACT_GUILD_VISIT"][data-acttgt="GD_B05"]').click();console.log((await p.locator('#toast').innerText()).replace(/\n/g,' '));
await p.screenshot({path:''+OUT+'/gd_offer.png'});
await p.click('[data-offer="0|neg"]');console.log((await p.locator('#toast').innerText()));
const has=await p.locator('[data-offer="0|ok"]').count();if(has){await p.click('[data-offer="0|ok"]');}
console.log('guild',await p.evaluate(()=>G.player.guild+' '+JSON.stringify(G.player.contract)+' rels '+G.relations.length));
await p.screenshot({path:''+OUT+'/gd_in.png'});
if(has){await p.click('[data-guildleave]');await p.click('[data-guildleave]');console.log('left',await p.evaluate(()=>G.player.guild))}
await p.setViewportSize({width:400,height:850});await p.evaluate(()=>{UI.screen='squad';render()});console.log('w',await p.evaluate(()=>document.documentElement.scrollWidth));
console.log('errs',errs);await b.close()})();
