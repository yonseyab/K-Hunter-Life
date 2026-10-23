/* 등록된 데이터에서 인덱스를 만든다. 후보 수에 상한을 두지 않으며 화면만 페이지로 자른다. */
const ROUTINE_CATALOG = (() => {
  let revision = -1, actions = [], objectives = [], byGoal = new Map(), general = [], searches = new Map();
  function ensure() {
    if (revision === window.HL_CONTENT_REV) return;
    revision = window.HL_CONTENT_REV; byGoal = new Map(); general = []; searches.clear();
    actions = Object.values(DB.actions).map(row => ({row, text: `${row.id} ${row.name} ${row.desc || ''}`.toLowerCase()}));
    objectives = Object.values(DB.objectives).map(row => ({row, text: `${row.id} ${row.name} ${row.desc || ''}`.toLowerCase()}));
    for (const {row:a} of actions) {
      if (!a.ai || a.hidden || !(a.show || []).includes('schedule')) continue;
      const goals = Object.keys(a.ai.goal || {}).filter(k => a.ai.goal[k] > 0);
      if (a.energy > 0 || a.stress < 0 || a.heal || !goals.length) general.push(a);
      for (const id of goals) { if (!byGoal.has(id)) byGoal.set(id, []); byGoal.get(id).push(a); }
    }
  }
  function candidates(focus) {
    ensure();
    if (!focus.length) return actions.map(x=>x.row).filter(a=>a.ai&&!a.hidden&&(a.show||[]).includes('schedule'));
    const found = new Map(general.map(a=>[a.id,a]));
    for (const id of focus) for (const a of byGoal.get(id) || []) found.set(a.id,a);
    return [...found.values()];
  }
  function page(kind, query = '', at = 0) {
    ensure(); const size = DB.balance.BAL_ROUTINE.pageSize, q = query.trim().toLowerCase(), key = kind+'|'+q;
    let list = searches.get(key);
    if (!list) { list = (kind === 'objectives' ? objectives : actions).filter(x=>(kind!=='schedule'||(x.row.show||[]).includes('schedule'))&&(!q||x.text.includes(q))).map(x=>x.row); if(searches.size>=8)searches.delete(searches.keys().next().value); searches.set(key,list); }
    const pages=Math.max(1,Math.ceil(list.length/size)), index=Math.max(0,Math.min(pages-1,at|0));
    return {rows:list.slice(index*size,(index+1)*size),total:list.length,index,pages};
  }
  function restriction(a, day=G.day) {
    const ai=a.ai||{}, p=G.player;
    if(a.hidden||a.special||a.target||a.onGate||a.onGuild||a.onSell)return '대상 선택이나 직접 결정이 필요한 행동';
    if(!(a.show||[]).includes('schedule')||!a.ai)return '자동 일과용 행동 정보가 없음';
    if(ai.awake&&p.awake===false)return '각성자만 가능';
    if(ai.job&&!p.jobPay)return '직업이 없음';
    if(ai.nojob&&p.jobPay)return '직장이 없는 사람만 가능';
    if(ai.guild&&!p.guild)return '길드 소속이 필요';
    if(ai.civ&&p.awake!==false)return '비각성자용 행동';
    if(ai.rankMin&&p.awake!==false&&DB.ranks[p.rank].lv<ai.rankMin)return '현재 등급은 이 활동의 대상이 아님';
    if(ai.weekdays&&wd(day)>=5)return '평일에만 가능';
    if(ai.injured&&!G.injuries.length)return '치료할 부상이 없음';
    return null;
  }
  // 기존 목표 측정 방식과 실제 행동 효과를 연결한다. ai.goal은 방향, 이 값은 직접 기여 여부다.
  function contributes(a,o) {
    switch(o.measure){
      case 'money': return (a.pay||0)>0 || (a.payJob&&G.player.jobPay>0);
      case 'rank': case 'trainHours': return !!a.train?.length;
      case 'social': return a.cat==='ACC_SOCIAL'&&Math.max(...a.durs)>=60;
      case 'stressBelow': return (a.stress||0)<0;
      default: return false;
    }
  }
  return { candidates, page, restriction, contributes, invalidate:()=>{revision=-1}, get revision(){ensure();return revision;} };
})();
