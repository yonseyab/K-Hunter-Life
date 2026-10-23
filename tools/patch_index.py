# -*- coding: utf-8 -*-
"""옛 prototype/index.html 을 새 버전(K-Hunter-Life) 구조로 고치는 1회용 패치 (2026-10-23).
실행: python3 tools/patch_index.py  — game/index.html 을 고친다. 기록용으로 저장소에 둔다."""
import re, sys, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / 'game' / 'index.html'
s = P.read_text(encoding='utf-8')
n_fail = 0
def rep(old, new, count=1, regex=False):
    global s, n_fail
    if regex:
        s2, k = re.subn(old, new, s, count=count, flags=re.S)
    else:
        k = s.count(old)
        s2 = s.replace(old, new, count if count else -1)
    if k == 0:
        n_fail += 1; print('NOT FOUND:', (old if isinstance(old, str) else old)[:90]); return
    s = s2

# 1. 제목 · 로고
rep('<title>헌터 라이프</title>', '<title>K-Hunter-Life</title>\n<link rel="stylesheet" href="life.css">')
rep('<b>헌터 라이프</b><span>HUNTER LIFE · UI 시안</span>', '<b>헌터 라이프</b><span>K-HUNTER-LIFE</span>')
rep('데이터는 모두 예시입니다.<br>v0.0.5 프로토타입', '콘텐츠는 기본분입니다.<br>v0.1.0 새 버전')

# 2. 데이터 스크립트 목록
for f in ['skills.js', 'dev_traits_sample.js', 'hunters.js', 'npcs.js', 'gates.js', 'events.js', 'scenario_demo.js', 'assets.js']:
    s = re.sub(r'<script src="data/%s"></script>[^\n]*\n' % re.escape(f), '', s)
rep('<script src="data/ext/_list.js"></script>',
    '<script src="data/system.js"></script><!-- 새 버전 시스템 테이블 (판단 · 감정 · 멈춤 · 규모) -->\n'
    '<script src="data/base/b_hunters.js"></script><!-- Claude 최소 재료 (배치 B) -->\n'
    '<script src="data/base/b_content.js"></script>\n'
    '<script src="data/base/b_story.js"></script>\n'
    '<script src="data/ext/_list.js"></script>')
rep('<script src="engine/status_ui.js"></script>',
    '<script src="engine/status_ui.js"></script>\n'
    '<script src="engine/scale.js"></script>\n<script src="engine/mind.js"></script>\n<script src="engine/story.js"></script>\n'
    '<script src="engine/play.js"></script>\n<script src="engine/life.js"></script>\n<script src="engine/life_ui.js"></script>')

# 3. 저장 키 · 버전 (옛 저장과 호환하지 않음)
rep("store.get('hl.settings',{})", "store.get('khl.settings',{})")
rep("store.set('hl.settings',SETTINGS)", "store.set('khl.settings',SETTINGS)")
rep("const SAVE_KEY='hl.saves.v1';", "const SAVE_KEY='khl.saves.v1';")
rep("filter(s=>(s.data?.v||1)>=2)", "filter(s=>(s.data?.v||1)>=3)")
rep("G={v:2, scenario:scId,", "G={v:3, scenario:scId,")
rep("G={v:2, scenario:'NEW',", "G={v:3, scenario:'NEW',")

# 4. 옛 ID → 새 ID
rep("gateSel:'GT_0001',", "gateSel:null,")
rep("UI = {mode:'title', panel:null, screen:'home',", "UI = {mode:'title', panel:null, screen:'life',")
rep("?.[1]||'IT_0011'", "?.[1]||'IT_B0001'")
rep("{from:'HN_0001',t:'환영해요!',tm:'08:13'}", "...guildMembers(h.guild).filter(m=>m.id!==g.master&&m.id!==h.id).slice(0,1).map(m=>({from:m.id,t:'환영해요!',tm:'08:13'}))")
rep("gameFromScenario('SC_DEMO')", "gameFromScenario('SC_BDEMO')", count=0)
rep("const PREF_DEF={autoSell:'off',gateNote:{mode:'fit',", "const PREF_DEF={play:{stop:'big',kinds:{},autoDecide:true,predict:'some',policyVsChar:0.4,detail:'detail',teller:'on',speed:1,pace:'balance'},autoSell:'off',gateNote:{mode:'off',")
rep("autoRaid:{on:'off',policy:'balanced',grade:'fit',km:20,perDay:1,", "autoRaid:{on:'on',policy:'balanced',grade:'fit',km:20,perDay:1,")

# 5. 이벤트: 수동 이벤트 제외 · 이야기꾼
rep("  if(ev.on) return false;  /* 세계 사건 이벤트는 processHappen 에서만 */", "  if(ev.on||ev.manual) return false;  /* 세계 사건 이벤트는 processHappen 에서만, manual 은 엔진이 직접 */")
rep("function maybeEvent(hours){const p=1-Math.pow(1-DB.balance.BAL_TIME.eventPerHour,hours);", "function maybeEvent(hours){const p=1-Math.pow(1-DB.balance.BAL_TIME.eventPerHour*(typeof TELLER!=='undefined'&&G?TELLER.mul('big'):1),hours);")

# 6. runTime: 실시간 재생 중에는 이벤트를 EVT 로 넘기고, 행동 · 이동을 이야기 창에
rep("let st=G.time,dur=end-now;if(a){const mv=travelTo(placeFor(a),dur);if(mv){lines.push(`${hhmm(st)} 이동 ${durTxt(mv)} → ${placeName(locOf())}`);dur-=mv;st=G.time}}",
    "let st=G.time,dur=end-now;if(a){const mv=travelTo(placeFor(a),dur);if(mv){lines.push(`${hhmm(st)} 이동 ${durTxt(mv)} → ${placeName(locOf())}`);if(UI.playRunning){STORY.move(mv,placeName(locOf()));STORY.smallTick(mv/60,true)}dur-=mv;st=G.time}}")
rep("if(dur>0){ups.push(...perform(dur>=15?a:null,dur));worldTickAcc(dur)}",
    "if(dur>0){if(UI.playRunning&&a&&dur>=15)STORY.act(a,dur);const u=perform(dur>=15?a:null,dur);ups.push(...u);if(UI.playRunning&&u.length)STORY.add('up',u.join(', ').replace(/<[^>]+>/g,''),2);worldTickAcc(dur)}")
rep("if((hv.ev.ch!=='alert'||!UI.routineRunning)&&(UI.routineRunning||G.stopOn.event||mode==='event')){",
    "if(UI.playRunning){const s9=PLAY.onEvent();if(s9){stop=s9;break}}else if((hv.ev.ch!=='alert'||!UI.routineRunning)&&(UI.routineRunning||G.stopOn.event||mode==='event')){")
rep("if(ev){lines.push(`${hhmm(G.time)} ${ev.ch==='alert'?'새 알림':'새 메시지'}: ${ev.subj}`);if((ev.ch!=='alert'||!UI.routineRunning)&&(UI.routineRunning||G.stopOn.event||mode==='event')){",
    "if(ev){lines.push(`${hhmm(G.time)} ${ev.ch==='alert'?'새 알림':'새 메시지'}: ${ev.subj}`);if(UI.playRunning){const s9=PLAY.onEvent();if(s9){stop=s9;break}}else if((ev.ch!=='alert'||!UI.routineRunning)&&(UI.routineRunning||G.stopOn.event||mode==='event')){")
rep("if(G.stopOn.lowEnergy&&e0>=B.lowEnergy&&G.cond.energy<B.lowEnergy){", "if(!UI.playRunning&&G.stopOn.lowEnergy&&e0>=B.lowEnergy&&G.cond.energy<B.lowEnergy){")
rep("checkGates();if(opt.span)return {stop};runDone(start,stop,ups,lines)}", "checkGates();if(G.retirePending&&!raidActive())LIFE.retireNow();if(opt.span)return {stop};runDone(start,stop,ups,lines)}")

# 7. 세계 진행: 고비 감시 · 하루 집계 · 개별 게이트 수
rep("resolveBids();dayTick();SIM.tick();GOALS.check();const hf=processHappen();if(hf)UI._hapEv=hf}",
    "resolveBids();dayTick();SIM.tick();GOALS.check();const hf=processHappen();if(hf)UI._hapEv=hf;if(typeof LIFE!=='undefined')LIFE.watch()}")
rep("npcGuildSign();loveDay();rankCheck();", "npcGuildSign();loveDay();rankCheck();SCALE.day(G.lastDay);SCALE.tidyUsed();")
rep("for(let k=0;k<hours;k++){\n    for(let n=W.spawnPerHour;n>0;n--)if(r()<Math.min(1,n))spawnGate(r);}",
    "for(let k=0;k<hours;k++){const n=SCALE.poisson(SCALE.localPerHour());for(let i=0;i<n;i++)spawnGate(r,SCALE.pickLocal(r));}")
rep("if(A.length>W.arcKeep)A.length=W.arcKeep;  /* 지난 게이트 기록 (클리어 모아보기) */delete G.genGates[g.id];",
    "if(A.length>W.arcKeep)A.length=W.arcKeep;  /* 지난 게이트 기록 (클리어 모아보기) */SCALE.release(g);delete G.genGates[g.id];")

# 8. 게이트 생성: 지역 · 등급은 SCALE (인구 비례 · 전체 등급 분포)
rep("function spawnGate(r){const W=DB.balance.BAL_WORLD,regs=vals('gatePlacePool').filter(p=>poolHas(p.id)&&DB.regions[p.region]),gis=vals('gateInteriors');\n  if(!regs.length)return null; /* 장소 목록을 아직 불러오는 중 (시작 직후 잠깐) */\n  const reg=wpick(regs.map(p=>({region:p.region,w:(DB.regions[p.region].gateDensity||1)*nearW(p.region)}))),lv=wpick(W.rankWeights.map(([l,w])=>({l,w}))).l;",
    "function spawnGate(r,region){const W=DB.balance.BAL_WORLD,regs=vals('gatePlacePool').filter(p=>poolHas(p.id)&&DB.regions[p.region]),gis=vals('gateInteriors');\n  if(!regs.length)return null; /* 장소 목록을 아직 불러오는 중 (시작 직후 잠깐) */\n  if(region){const pp=placePoolOf(region);if(pp&&!poolHas(pp.id))return null}\n  const reg=region?{region}:wpick(regs.map(p=>({region:p.region,w:(DB.regions[p.region].gateDensity||1)*nearW(p.region)}))),lv=SCALE.pickRankLv(r);")
rep("if(kmBetween(G.player.region,g.region)<=W.newsKm||lv<=W.newsRankLv)newsAdd(", "if(lv<=W.newsRankLv)newsAdd(")

# 9. 효과: 감정 · 은퇴
rep("  if(fx.flag){G.flags=G.flags||{};G.flags[fx.flag]=G.day}",
    "  if(fx.emo&&typeof EMO!=='undefined')Object.entries(fx.emo).forEach(([k,v])=>EMO.add(k,v));\n  if(fx.retire){G.retirePending=true;out.push('은퇴')}\n  if(fx.flag){G.flags=G.flags||{};G.flags[fx.flag]=G.day}")

# 10. 조건 키 추가 (세 층 원칙 · 감정 · 자기 인식 · 성인 · 장소)
rep("    case 'money': return G.money>=q.min;", "    case 'money': return (q.min==null||G.money>=q.min)&&(q.max==null||G.money<=q.max);\n"
    "    case 'looks': {const h=q.who==='tgt'?(tgt&&P(tgt)):G.player;if(!h)return false;return inRange(looksOf(h)[q.aspect],q)}\n"
    "    case 'emo': return typeof EMO!=='undefined'&&inRange(EMO.val(q.id),q);\n"
    "    case 'self': return typeof SELF!=='undefined'&&inRange(SELF.get()[q.aspect],q);\n"
    "    case 'adult': {const A=DB.balance.BAL_REL.adultAge;return (G.player.age||0)>=A&&(!tgt||((P(tgt)?.age)||0)>=A)}\n"
    "    case 'place': return q.in.includes(locOf().pt);")

# 11. 이벤트 선택지: 조건이 맞는 것만 보이고, 결과는 EVT 로 (이야기 창에 남는다)
rep("${ev.choices.map((c,i)=>`<button class=\"choice\" data-choice=\"${i}\"><div>${esc(c.t)}</div><div class=\"ck\">${checkText(c)}</div></button>`).join('')}",
    "${ev.choices.map((c,i)=>EVT.okChoice(c,m.who)?`<button class=\"choice\" data-choice=\"${i}\"><div>${esc(c.t)}</div><div class=\"ck\">${checkText(c)}</div></button>`:'').join('')}")
rep("${ev.choices.map((c,i)=>`<button class=\"choice\" data-reply=\"${i}\"><div>${esc(c.t)}</div><div class=\"ck\">${checkText(c)}</div></button>`).join('')}",
    "${ev.choices.map((c,i)=>EVT.okChoice(c,th.event?.tgt)?`<button class=\"choice\" data-reply=\"${i}\"><div>${esc(c.t)}</div><div class=\"ck\">${checkText(c)}</div></button>`:'').join('')}")
rep("if(d.choice!=null){const m=G.alerts.includes(UI.alert)?UI.alert:G.alerts[0],ev=DB.events[m.ev],c=ev.choices[+d.choice],{ok,line}=judge(c),f=applyFx(ok?c.okFx:c.ngFx,m.who||undefined);m.unread=false;\n    m.resolved=`${line}<b>${esc(c.t)}</b><div style=\"margin-top:4px\">${esc(ok?c.ok:c.ng)}</div>${fxChips(f)}`;render();return}",
    "if(d.choice!=null){const m=G.alerts.includes(UI.alert)?UI.alert:G.alerts[0],ev=DB.events[m.ev];EVT.resolve({type:'alert',m,ev,tgt:m.who||null},+d.choice,'me');G.pendingPick=false;render();return}")
rep("if(d.reply!=null){const th=G.threads.find(t=>t.with===UI.thWith),ev=DB.events[th.event.id],c=ev.choices[+d.reply],{ok,line}=judge(c),f=applyFx(ok?c.okFx:c.ngFx,th.event.tgt);\n    th.msgs.push({from:'ME',t:c.t,tm:hhmm(G.time)});th.msgs.push({sys:`${line}${esc(ok?c.ok:c.ng)}${fxChips(f)}`});th.event.resolved=true;render();return}",
    "if(d.reply!=null){const th=G.threads.find(t=>t.with===UI.thWith),ev=DB.events[th.event.id];EVT.resolve({type:'thread',th,ev,tgt:th.event.tgt},+d.reply,'me');G.pendingPick=false;render();return}")
rep("  th.event={id, tgt, resolved:false}; th.unread+=ev.lines.length;", "  th.event={id, tgt, resolved:false, t:nowAbs()}; th.unread+=ev.lines.length;")

# 12. 공략 끝 · 게임 끝
rep("  UI.raidResult={ok,wall:R.wall||[],gid:g.id,t:R.t,kills:R.kills,coins:R.coins||0,dmg:R.dmg,stones:R.stones,pay,got,exp,lvl,lv0,inj:R.inj.slice(),ev:ev?ev.subj:null,hp:G.cond.hp,energy:G.cond.energy};\n  UI.screen='raidresult';render()}",
    "  UI.raidResult={ok,wall:R.wall||[],gid:g.id,t:R.t,kills:R.kills,coins:R.coins||0,dmg:R.dmg,stones:R.stones,pay,got,exp,lvl,lv0,inj:R.inj.slice(),ev:ev?ev.subj:null,hp:G.cond.hp,energy:G.cond.energy};\n  PLAY.afterRaid(R,UI.raidResult);if(UI.playRaid)return;UI.screen='raidresult';render()}")
rep("function endGame(cause,kind){clearInterval(UI._rt);const R=UI.raid;", "function endGame(cause,kind){clearInterval(UI._rt);PLAY.pause();const R=UI.raid;")
rep("G.dead={cause,day:Math.floor(ab/1440),time:ab%1440,gid:R?.gid||null,kind:kind||'death'};G.pendingDeath=null;G.inGate=null;",
    "G.dead={cause,day:Math.floor(ab/1440),time:ab%1440,gid:R?.gid||null,kind:kind||'death'};G.pendingDeath=null;G.inGate=null;LIFE.finish(G.dead.kind,cause);")

# 13. 메뉴 네 묶음 · 첫 화면 = 인생
rep("""const NAV = [
  ['', [['home','홈','⌂']]],
  ['단말기', [['alerts','알림','◆']]],
  ['상태창', [['status','상태창','▣'],['shop','시스템 상점','◇']]],  /* 클래스 · 스킬은 상태창 안 탭 (사용자 결정 2026-10-23) */
  ['나', [['goals','일과','★'],['acts','할 수 있는 일','➤'],['inventory','소지품','▥'],['relations','관계','♡'],['finance','재정','₩'],['auction','경매장','⚖']]],
  ['헌터 활동', [['gates','게이트','◎'],['party','파티','⚔'],['raidteam','공격대','⛨'],['guild','길드','⚑']]],
  ['DB', [['db','DB','⌕']]],
];""", """/* 메뉴 네 묶음 (REBUILD_PLAN 2장 화면, 사용자: "일단 해 보는 걸로") */
const NAV = [
  ['이야기', [['life','인생','▶'],['bio','일대기','✎'],['alerts','알림','◆'],['messenger','메신저','✉']]],
  ['내 헌터', [['status','상태창','▣'],['relations','관계','♡'],['inventory','소지품','▥'],['finance','재정','₩'],['goals','일과 · 목표','★']]],
  ['세계', [['gates','게이트','◎'],['world','전국 현황','◍'],['guild','길드','⚑'],['db','DB','⌕'],['auction','경매장','⚖']]],
  ['관리', [['home','대시보드','⌂'],['acts','할 수 있는 일','➤'],['party','파티','⚔'],['raidteam','공격대','⛨'],['shop','시스템 상점','◇'],['archive','기록관','❖'],['settings','설정','⚙']]],
];""")
rep("if(!V[UI.screen]||(UI.screen==='raid'&&!UI.raid)||(UI.screen==='raidresult'&&!UI.raidResult)||(UI.screen==='raidprep'&&!UI.prep)) UI.screen='home';",
    "if(!V[UI.screen]||(UI.screen==='raid'&&!UI.raid)||(UI.screen==='raidresult'&&!UI.raidResult)||(UI.screen==='raidprep'&&!UI.prep)) UI.screen='life';")
rep("  if(UI.screen==='acts') mountMap();", "  if(UI.screen==='acts') mountMap();\n  if(typeof LIFEUI!=='undefined') LIFEUI.after();")
rep("function enterGame(screen='home'){ensureTime();", "function enterGame(screen='life'){ensureTime();if(typeof LIFEUI!=='undefined')LIFEUI.enter();")
rep("function goTitle(){clearInterval(UI._rt);", "function goTitle(){clearInterval(UI._rt);PLAY.pause();")

# 14. 상단: '계속' 대신 재생 · 배속 (LIFEUI.controls)
rep("<div class=\"advwrap\" style=\"${raidActive()||G.dead?'display:none':''}\"><button class=\"go\" id=\"go\" data-advance=\"next\">계속 ▸<small>${esc(nxt)}</small></button><button class=\"advmore\" data-advmenu=\"1\" aria-expanded=\"${!!UI.advMenu}\" aria-label=\"진행 방식 고르기\">▾</button></div>",
    "${raidActive()||G.dead?'':LIFEUI.controls()}")
rep("<div class=\"clock\"><div class=\"d\">${dt.y}년 ${dt.m}월 ${dt.d}일 (${dt.w}) <span class=\"num\">${hhmm(G.time)}</span></div><div class=\"s\">${esc(cur)}</div></div>",
    "<div class=\"clock\"><div class=\"d\" id=\"clockD\">${dt.y}년 ${dt.m}월 ${dt.d}일 (${dt.w}) <span class=\"num\">${hhmm(G.time)}</span></div><div class=\"s\" id=\"clockS\">${esc(cur)}</div></div>")

P.write_text(s, encoding='utf-8')
print('patched, misses:', n_fail)
sys.exit(1 if n_fail else 0)
