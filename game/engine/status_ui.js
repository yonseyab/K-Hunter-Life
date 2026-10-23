/* 상태창의 표시만 담당한다. 성장·등급·공개·은퇴 규칙은 기존 함수를 사용한다. */
const swBar=(cur,max,color)=>`<div class="stw-bar"><i style="width:${clamp(max?cur/max*100:0)}%;background:${color}"></i></div>`;
function statusWindowHTML(h,home=false,options={}){
  const cls=DB.classes[h.cls],vt=vitals(h),c=G.cond,need=expNeed(h.level),ex=Math.min(h.exp||0,need);
  const cell=(key,value)=>`<div class="sw2-c"><div class="k">${key}</div><div class="v">${value}</div></div>`;
  const meter=(key,value,max,color)=>`<div class="sw2-c"><div class="k">${key}</div><div class="sw2-m"><b class="num">${value.toLocaleString()}</b><span class="num"> / ${max.toLocaleString()}</span></div>${swBar(value,max,color)}</div>`;
  const inside=raidActive();
  return `<div class="sw2${home?' home-status':''}${inside?' in-gate':''}" role="region" aria-label="상태창">
    <div class="sw2-h"><span class="sw2-title" title="${inside?esc(DB.gates[UI.raid.gid]?.name||''):''}">STATUS${inside?' — 게이트 안 · 외부 연락 및 다른 행동 불가':''}</span><span style="letter-spacing:normal" aria-label="보유 코인" data-status-coin="${G.coin??0}">코인 ${coinTxt(G.coin??0)}</span></div>
    <div class="sw2-g r1" style="grid-template-columns:1.4fr .7fr 1.2fr .9fr">${cell('이름',esc(h.name))}${cell('레벨',`Lv.${h.level}`)}${cell('클래스',cls?esc(cls.name):'—')}${cell('등급',`${rkBadge(h.rank)} ${DB.ranks[h.rank].name}급`)}</div>
    <div class="sw2-g r2" style="grid-template-columns:repeat(3,minmax(0,1fr))">${meter('HP',Math.round(vt.hp*(c.hp??100)/100),vt.hp,'#5cc48a')}${meter('MP',Math.round(vt.mp*(c.mp??100)/100),vt.mp,'#4fa8e0')}${meter('EXP',ex,need,'#e0a341')}</div>
    <div class="sw2-sec"><span>기본 스탯</span>${h.statPts?`<button class="btn sm" ${options.hunter?'data-hstatus-scroll="allocation"':'data-sttab="성장"'}>분배할 포인트 ${h.statPts}</button>`:''}</div>
    <div class="sw2-g r3" style="grid-template-columns:repeat(4,minmax(0,1fr))">${vals('baseStats').map(st=>`<div class="sw2-c sw2-st" title="${esc(st.desc)}"><div class="k">${st.name}</div><div class="v num">${h.stats[st.id]}</div></div>`).join('')}</div>
    <div class="sw2-summary" data-status-skills><span class="k">스킬</span><span>${[...new Set((h.skills||[]).map(([id])=>DB.skills[id]?.name||'알 수 없는 스킬'))].map(esc).join(' · ')||'없음'}</span></div>
    <div class="sw2-summary" data-status-traits><span class="k">특성</span><span>${(h.traits||[]).map(id=>esc(DB.traits[id]?.name||'알 수 없는 특성')).join(' · ')||'없음'}</span></div>
    <div class="row${home?' home-status-footer':''}" style="padding:10px;gap:8px;flex-wrap:wrap"><button class="btn sm" data-statusdetail="injuries">부상 ${(G.injuries||[]).length}곳</button>${h.level%DB.balance.BAL_GROWTH.wallEvery===0?'<span class="chip w">성장의 벽</span>':''}${home?`<span class="home-status-location" data-life-location>${esc(placeName(locOf()))}</span>`:''}</div>
  </div>`;
}
function growthStatusHTML(){
  const h=G.player,need=expNeed(h.level),q=rankQualify(h),next=DB.ranks[h.rank].lv-1,wall=h.level%DB.balance.BAL_GROWTH.wallEvery===0;
  return `<div class="grid g2" style="max-width:1000px;align-items:start">
    <div class="panel"><div class="ph">레벨 성장 <span>Lv.${h.level}</span></div><div class="pb" style="display:grid;gap:12px">
      <div class="row" style="justify-content:space-between"><span>다음 레벨 경험치</span><b class="num">${Math.floor(h.exp||0).toLocaleString()} / ${need.toLocaleString()}</b></div>${swBar(h.exp||0,need,'#e0a341')}
      <div class="${wall?'warn':'muted'}">${h.level>=100?'최고 레벨에 도달했습니다.':wall?'성장의 벽 구간입니다. 경험치를 채운 뒤 돌파가 필요합니다.':'훈련과 활동으로 성장하며, 레벨업 때 스탯 포인트를 얻습니다.'}</div>
      <div class="row" style="justify-content:space-between"><b>스탯 포인트</b><b class="num">${h.statPts||0}</b></div>
      ${vals('baseStats').map(st=>`<div class="row" style="justify-content:space-between"><span>${st.name}</span><span class="row"><b class="num">${h.stats[st.id]}</b><button class="btn sm" data-statpt="${st.id}" aria-label="${st.name} +1" ${h.statPts?'':'disabled'}>+1</button></span></div>`).join('')}
    </div></div>
    <div class="panel"><div class="ph">등급 성장 <span>${DB.ranks[h.rank].name}급</span></div><div class="pb" style="display:grid;gap:12px">
      ${next<1?'<b>최고 등급입니다.</b>':`<b>다음 등급 ${next}급</b><div class="row" style="justify-content:space-between"><span>기본 스탯 합계</span><b class="num">${q.st} / ${rankNeed(next).st}</b></div>${swBar(q.st,rankNeed(next).st,'#4fa8e0')}<div class="row" style="justify-content:space-between"><span>세부 능력 평균</span><b class="num">${q.avg.toFixed(1)} / ${rankNeed(next).abl.toFixed(1)}</b></div>${swBar(q.avg,rankNeed(next).abl,'#4fa8e0')}`}
      <div class="muted">조건을 만족하면 기존 등급 판정 규칙에 따라 자동으로 갱신됩니다.</div><button class="btn sm" data-hunter="${h.id}">내 정보창에서 세부 능력 보기</button>
    </div></div></div>`;
}
function publicStatusSettingsHTML(){
  const pub=G.statusPublic||(G.statusPublic=clone(DB.ccRules.RULE_START.statusPublic));
  const keys=[['level','레벨'],['cls','클래스'],['rank','헌터 등급'],['vit','HP · MP'],['exp','EXP'],['stats','기본 스탯'],['skills','스킬']];
  return `<div class="panel" style="max-width:760px"><div class="ph">공개할 항목 <button class="btn sm" data-statusdetail="public">공개 상태창 미리보기</button></div><div class="tw"><table><tbody>${keys.map(([key,name])=>`<tr><td>${name}</td><td class="muted">${pub[key]?'다른 사람에게 보임':'나만 보임'}</td><td class="r"><button class="pub" data-pubtog="${key}" aria-pressed="${!!pub[key]}">${pub[key]?'공개':'비공개'}</button></td></tr>`).join('')}</tbody></table></div><div class="pb muted">공개한 정보는 조작할 수 없습니다. 코인은 본인에게만 표시됩니다.</div></div>`;
}
V.status=()=>{
  const h=G.player,tabs=['상태','성장','클래스','스킬','공개 설정'],tab=tabs.includes(UI.stTab)?UI.stTab:(UI.stTab==='정보 · 공개 설정'?'공개 설정':'상태'),cnt={클래스:h.cls?esc(DB.classes[h.cls]?.name||''):'',스킬:h.skills.length+'개'};
  return `<div class="h-row"><div><h1 class="h1">상태창</h1><div class="sub">현재 상태 · 성장 · 클래스 · 스킬 · 공개 범위를 탭으로 확인합니다.</div></div></div><div class="tabs" role="tablist" aria-label="상태창 메뉴">${tabs.map((t,i)=>`<button role="tab" id="status-tab-${i}" aria-controls="status-content" aria-selected="${tab===t}" data-sttab="${t}">${t}${cnt[t]?` <span class="dim">${cnt[t]}</span>`:''}</button>`).join('')}</div><div id="status-content" role="tabpanel" aria-labelledby="status-tab-${tabs.indexOf(tab)}">${tab==='상태'?`<div style="max-width:1000px">${statusWindowHTML(G.player)}</div>`:tab==='성장'?growthStatusHTML():tab==='클래스'||tab==='스킬'?(UI.skTab=tab,V.skills(true)):publicStatusSettingsHTML()}</div>`;
};
function statusDetail(kind){
  if(kind==='public'){showInfo(`<h2>공개 상태창 미리보기</h2>${pubStatusHTML(G.player)}`);return;}
  showInfo(`<h2>부상 상세</h2>${(G.injuries||[]).map(j=>`<div class="panel pb" style="margin-bottom:8px"><b>${esc(injTxt(j))}</b><div class="muted">${DB.injurySev['SEV_'+j.sev].name} · 남은 회복 시간 ${durTxt(Math.max(0,j.until-nowAbs()))}</div></div>`).join('')||'<p class="muted">현재 부상이 없습니다.</p>'}`);
}
V.settings=()=>{
  const tab=['헌터 관리','게임 설정'].includes(UI.settingsTab)?UI.settingsTab:'환경설정';
  return `<div class="h-row"><h1 class="h1">설정</h1></div><div class="tabs" role="tablist">${['환경설정','게임 설정','헌터 관리'].map(t=>`<button role="tab" aria-selected="${tab===t}" data-settingstab="${t}">${t}</button>`).join('')}</div><div style="max-width:760px">${tab==='환경설정'?`<div class="panel">${settingsOptionsHTML()}</div>`:tab==='게임 설정'?`<div class="panel"><div class="ph">게임 설정 · ${esc(G.player.name)} <span class="dim" style="font-weight:400">이 헌터의 저장에 함께 저장됩니다</span></div>${prefsHTML()}</div>`:`<div class="panel"><div class="ph">헌터 관리 · ${esc(G.player.name)}</div><div class="pb"><p>은퇴하면 이 헌터의 이야기가 끝나고, 저장은 은퇴 기록으로 남습니다.</p><button class="btn ${UI.retireArm?'club':''}" data-retire="1" ${raidActive()||G.dead?'disabled':''}>${UI.retireArm?'정말 은퇴하기 (다시 누르기)':'은퇴하기'}</button>${raidActive()?'<p class="muted">게이트 공략 중에는 은퇴할 수 없습니다.</p>':''}</div></div>`}</div>`;
};

function settingsOptionsHTML(){return `<div class="pb grid" style="gap:14px">
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>이벤트 발동 조건 표시</b><div class="sub">개발용. 이벤트가 어떤 데이터로 발동했는지 보여줍니다.</div></div><button class="tgl" aria-pressed="${SETTINGS.showTrig}" data-set="showTrig" aria-label="이벤트 발동 조건 표시"></button></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>개발자 보기</b><div class="sub">숨은 값(잠재력 · 상대의 감정 · 게이트 내부 · 다른 헌터 능력치)을 그대로 보여 줍니다. 밸런스 확인용.</div></div><button class="tgl" aria-pressed="${!!SETTINGS.dev}" data-set="dev" aria-label="개발자 보기"></button></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>행동 결과 팝업</b><div class="sub">시간을 진행하거나 행동을 하면 오른쪽 아래에 결과를 잠깐 띄웁니다. 꺼도 홈의 '활동 기록' 위젯에 계속 쌓입니다.</div></div><button class="tgl" aria-pressed="${!!SETTINGS.actToast}" data-set="actToast" aria-label="행동 결과 팝업"></button></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>자동 저장</b><div class="sub">하루가 지날 때와 게이트 공략이 끝날 때 헌터별 자동 저장 칸에 저장합니다 (최근 ${AUTO_KEEP}명까지).</div></div><button class="tgl" aria-pressed="${SETTINGS.autosave!==false}" data-set="autosave" aria-label="자동 저장"></button></div>
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><b>새 게임 인트로</b><div class="sub">새로 시작할 때 세계를 소개하는 짧은 인트로를 보여 줍니다.</div></div><button class="tgl" aria-pressed="${SETTINGS.intro!==false}" data-set="intro" aria-label="새 게임 인트로"></button></div>
      <div class="field"><label for="st-fs">글자 크기</label><select id="st-fs" data-setsel="fontSize">${[12,13,14,15].map(v=>`<option value="${v}" ${SETTINGS.fontSize==v?'selected':''}>${v}px${v===13?' (기본)':''}</option>`).join('')}</select></div>
      <div class="field"><label for="st-rs">게이트 공략 기본 속도</label><select id="st-rs" data-setsel="raidSpeed">${[1,2,4].map(v=>`<option value="${v}" ${SETTINGS.raidSpeed==v?'selected':''}>×${v}</option>`).join('')}</select></div>
      <div class="field"><label for="st-ts">텍스트 표시 속도</label><select id="st-ts" data-setsel="textSpeed">${['느림','보통','빠름','즉시'].map(v=>`<option ${SETTINGS.textSpeed===v?'selected':''}>${v}</option>`).join('')}</select></div>
      <div class="field"><label for="st-vol">효과음 (준비 중)</label><input type="range" id="st-vol" disabled value="70"></div>
      <div class="field"><label for="st-bgm">배경음 (준비 중)</label><input type="range" id="st-bgm" disabled value="50"></div></div>`;}
