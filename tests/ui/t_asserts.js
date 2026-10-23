/* 세 층 원칙 검사 도구 (브라우저 없이): asserts 가 req 에 없으면 오류 · 외모 단정 문장에 asserts 가 없으면 오류 · 새 테이블 규칙 */
require('../../game/engine/validate.js');const V=globalThis.VALIDATE,errs=[];const ok=(c,m)=>{if(!c)errs.push('단언 실패: '+m)};
const DB={lookScores:{APS_FACE:{id:'APS_FACE'}},emotions:{EM_JOY:{}},stopKinds:{SK_SOCIAL:{}},mindTags:{TAG_KIND:{}},placeTypes:{PT_CAFE:{}},actions:{},actionCats:{},milestoneTypes:{},ccPersonality:{},bgItems:{},ccLook:{}};
const rule=t=>V.RULES.find(r=>r[0]===t)[1];
const good={id:'SL_X1',on:'react:looksHi',lv:2,text:'{who}이(가) 돌아본다.',req:[{k:'looks',aspect:'APS_FACE',min:15}],asserts:[{k:'looks',aspect:'APS_FACE',min:15}]};
const weak={...good,req:[{k:'looks',aspect:'APS_FACE',min:12}]};          /* 조건이 더 넓으면 12점인 사람도 '잘생겼다' 반응을 받는다 → 오류 */
const none={...good,req:[]};
const words={id:'SL_X2',on:'meet',lv:2,text:'{who}이(가) 잘생겼다고 말한다.'};
const words2={...words,noAssert:true};
ok(rule('storyLines')(good,DB).length===0,'맞는 asserts 통과 '+rule('storyLines')(good,DB));
ok(rule('storyLines')(weak,DB).some(e=>/req 에 없음/.test(e)),'넓은 조건 → 오류');
ok(rule('storyLines')(none,DB).some(e=>/req 에 없음/.test(e)),'조건 없음 → 오류');
ok(rule('storyLines')(words,DB).some(e=>/asserts 가 없음/.test(e)),'외모 단정 문장 asserts 없음 → 오류');
ok(rule('storyLines')(words2,DB).length===0,'noAssert 예외');
ok(rule('storyLines')({id:'x',on:'bad',text:'a'},DB).some(e=>/on 값/.test(e)),'on 형식');
ok(V.implies({k:'looks',aspect:'APS_FACE',min:16},{k:'looks',aspect:'APS_FACE',min:15})===true,'더 좁은 조건은 함의');
ok(V.implies({k:'looks',aspect:'APS_FACE',min:16,max:20},{k:'looks',aspect:'APS_FACE',max:10})===false,'반대 범위는 함의 아님');
const ev={id:'EV_X',ch:'alert',from:'SYS_LIFE',subj:'s',body:'b',kind:'SK_BAD',req:[],choices:[{t:'a',ok:'o',tags:['TAG_NOPE']}]};
const ee=rule('events')(ev,DB);ok(ee.some(e=>/kind/.test(e))&&ee.some(e=>/태그 TAG_NOPE/.test(e)),'이벤트 kind · 태그 검사 '+ee);
const r=require('../../tools/validate_data.js').validate();ok(r.errs.length===0,'실제 데이터 문제 없음 '+r.errs.slice(0,3));
console.log(`파일 ${r.stats.files} · 테이블 ${r.stats.tables} · 행 ${r.stats.rows}`);console.log('errs',JSON.stringify(errs));
