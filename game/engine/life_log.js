/* 월별 원문 보관. 완료된 달은 IndexedDB의 불변 묶음으로, 세이브에는 묶음 목록만 보관한다.
   쓰기 완료 전에는 원문을 pending에 남겨 저장/불러오기 중에도 기록을 잃지 않는다. */
const LIFE_LOG=(()=>{
  let connection=null;
  const seen=new WeakMap(),writing=new WeakMap(),recent=new WeakMap();
  const monthOfDay=day=>{const d=dateOf(day);return `${d.y}-${String(d.m).padStart(2,'0')}`;};
  const monthOf=row=>monthOfDay(Math.floor(row.t/1440));
  function state(g=G){return g.storyArchive||(g.storyArchive={v:1,months:{},pending:{}});}
  function database(){
    if(connection)return connection;
    connection=new Promise((resolve,reject)=>{
      const q=indexedDB.open('khl-life-log',1);
      q.onupgradeneeded=()=>q.result.createObjectStore('months');
      q.onsuccess=()=>{const db=q.result;db.onversionchange=()=>{db.close();connection=null;};resolve(db);};
      q.onerror=()=>{connection=null;reject(q.error);};
    }).catch(e=>{connection=null;throw e;});return connection;
  }
  function archive(rows,g){
    if(!rows.length)return;
    const A=state(g),groups={};
    rows.forEach(row=>(groups[monthOf(row)]||(groups[monthOf(row)]=[])).push(row));
    for(const [month,items] of Object.entries(groups)){
      const id=crypto.randomUUID(),meta=A.months[month]||(A.months[month]={keys:[],count:0,kinds:{}});
      A.pending[id]=items;meta.keys.push(id);meta.count+=items.length;
      for(const row of items)meta.kinds[row.k]=(meta.kinds[row.k]||0)+1;
    }
  }
  function rotate(g=G){
    if(!g)return;const current=monthOfDay(g.day),rows=g.story||(g.story=[]),old=seen.get(g);
    if(old?.month===current&&old.rows===rows)return;
    const keep=[],past=[];for(const row of rows)(monthOf(row)===current?keep:past).push(row);
    if(past.length){recent.set(g,past.filter(row=>Math.floor(row.t/1440)===g.day-1));archive(past,g);g.story=keep;}
    seen.set(g,{month:current,rows:g.story});
    if(Object.keys(state(g).pending).length)void flush(g);
  }
  function add(row,g=G){rotate(g);if(monthOf(row)===monthOfDay(g.day))g.story.push(row);else{archive([row],g);void flush(g);}}
  async function flush(g=G){
    const A=state(g);if(writing.has(A))return writing.get(A);if(!Object.keys(A.pending).length)return true;
    const run=(async()=>{
      try{
        while(Object.keys(A.pending).length){
          const entries=Object.entries(A.pending),db=await database();
          await new Promise((resolve,reject)=>{const tx=db.transaction('months','readwrite');for(const [id,rows] of entries)tx.objectStore('months').put(rows,id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('보관 중단'));});
          for(const [id,rows] of entries)if(A.pending[id]===rows)delete A.pending[id];
        }
        delete A.error;return true;
      }catch(e){A.error='기록 보관을 완료하지 못했어. 원문은 세이브에 유지돼.';return false;}
      finally{writing.delete(A);}
    })();writing.set(A,run);return run;
  }
  function index(g=G){
    rotate(g);const A=state(g),map={};
    for(const [month,m] of Object.entries(A.months))map[month]={month,count:m.count,kinds:{...m.kinds}};
    for(const row of g.story||[]){const key=monthOf(row),m=map[key]||(map[key]={month:key,count:0,kinds:{}});m.count++;m.kinds[row.k]=(m.kinds[row.k]||0)+1;}
    return Object.values(map).sort((a,b)=>a.month.localeCompare(b.month));
  }
  async function readMonth(month,g=G){
    const A=state(g),keys=[...new Set(A.months[month]?.keys||[])],parts=new Map(),missing=[];
    for(const id of keys)if(A.pending[id])parts.set(id,A.pending[id]);else missing.push(id);
    if(missing.length){
      const db=await database();
      await new Promise((resolve,reject)=>{
        const tx=db.transaction('months','readonly');let error=null;
        for(const id of missing){const q=tx.objectStore('months').get(id);q.onsuccess=()=>{if(!Array.isArray(q.result))error=new Error('보관된 기록을 찾을 수 없어.');else parts.set(id,q.result);};}
        tx.oncomplete=()=>error?reject(error):resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);
      });
    }
    return keys.flatMap(id=>parts.get(id)).concat((g.story||[]).filter(row=>monthOf(row)===month)).sort((a,b)=>a.t-b.t);
  }
  function dayRows(day,g=G){return (g.story||[]).concat(recent.get(g)||[]).filter(row=>Math.floor(row.t/1440)===day);}
  return {state,rotate,add,flush,index,readMonth,monthOf,monthOfDay,dayRows};
})();
