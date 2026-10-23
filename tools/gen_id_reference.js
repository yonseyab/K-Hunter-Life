/* =========================================================
   tools/gen_id_reference.js — 외주용 'ID 참조' 문서 만들기
   지금 데이터에 있는 ID 목록(다른 데이터가 참조할 수 있는 것)을 docs/outsource/ID_참조.md 로 쓴다.
   데이터가 바뀌면 다시 실행: node tools/gen_id_reference.js
   ========================================================= */
const fs = require('fs'), path = require('path');
const { load } = require('./validate_data.js');
const { DB } = load();
const T = t => Object.values(DB[t] || {});
const esc = s => String(s ?? '').replace(/\|/g, '/').replace(/\n/g, ' ');
const table = (title, rows, cols, note) => `## ${title}\n${note ? note + '\n' : ''}\n| ${cols.map(c => c[0]).join(' | ')} |\n|${cols.map(() => '---').join('|')}|\n${rows.map(r => '| ' + cols.map(c => esc(c[1](r))).join(' | ') + ' |').join('\n')}\n`;

const out = [`# ID 참조 (자동 생성)

> \`node tools/gen_id_reference.js\` 로 만든 문서입니다. 손으로 고치지 마세요. 생성 시각: ${new Date().toISOString().slice(0, 16).replace('T', ' ')}
> 외주 데이터에서 **다른 데이터를 가리킬 때는 이 문서에 있는 ID만** 쓰세요. 없는 ID를 쓰면 검증에서 걸립니다.
`];
out.push(table('등급 (RANK_)', T('ranks'), [['ID', r => r.id], ['이름', r => r.name + '급'], ['숫자(1이 최상위)', r => r.lv]]));
out.push(table('지역 (RG_)', T('regions'), [['ID', r => r.id], ['이름', r => r.name], ['게이트 밀도', r => r.gateDensity]]));
out.push(table('기본 스탯 (STAT_)', T('baseStats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('세부 능력 그룹 (ABG_)', T('ablGroups'), [['ID', r => r.id], ['이름', r => r.name], ['묶음', r => r.set]]));
out.push(table('세부 능력 (ABL_) — 판정(check.attr)에 쓰는 값', T('abilities'), [['ID', r => r.id], ['이름', r => r.name], ['그룹', r => r.g], ['묶음', r => r.set]], 'A = 각성자 전용(30) · B = 공통(40) · C = 비각성자 전용(20). 플레이어는 각성자라 A·B 를 가진다. 이벤트 판정은 보통 B 를 쓴다.'));
out.push(table('파티 역할 (ROLE_)', T('roles'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('클래스 (CLS_)', T('classes'), [['ID', r => r.id], ['이름', r => r.name], ['분류', r => r.cat], ['역할', r => r.role], ['스킬 후보', r => (r.pool || []).join(' ')]]));
out.push(table('스킬 (SK_)', T('skills'), [['ID', r => r.id], ['이름', r => r.name], ['범위', r => r.scope], ['종류', r => r.kind], ['분류', r => r.cat || '']]));
out.push(table('아이템 분류 (ITC_)', T('itemCats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('아이템 (IT_)', T('items'), [['ID', r => r.id], ['이름', r => r.name], ['분류', r => r.cat], ['등급', r => r.rank || '—'], ['기준가', r => r.price], ['사용', r => r.use ? JSON.stringify(r.use) : ''], ['부위', r => r.slot || '']]));
out.push(table('착용 부위 (SLOT_)', T('equipSlots'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('몬스터 분류 (MC_)', T('monsterCats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('몬스터 (MON_)', T('monsters'), [['ID', r => r.id], ['이름', r => r.name], ['분류', r => r.cat], ['추정 등급', r => r.rank || '—']]));
out.push(table('몸 부위 (PART_)', T('bodyParts'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('부상 종류 (INJ_)', T('injuryTypes'), [['ID', r => r.id], ['이름', r => r.name]], '심각도 sev: 1 경상 · 2 중상 · 3 중태'));
out.push(table('관계 유형 (REL_)', T('relTypes'), [['ID', r => r.id], ['이름', r => r.name], ['태그', r => r.tag || '']]));
out.push(table('관계 차원 (RD_) — 방향이 있다 (to = 나→상대, from = 상대→나)', T('relDims'), [['ID', r => r.id], ['이름', r => r.name], ['범위', r => (r.range || []).join('~')]]));
out.push(table('관계 상태 (RS_)', T('relStatus'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('성격 축 (PX_) — 1~10', T('ccPersonality'), [['ID', r => r.id], ['1쪽', r => r.a], ['10쪽', r => r.b]]));
out.push(table('특성 분류 (TC_)', T('traitCats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('NPC 목표 (GOAL_)', T('aiGoals'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('NPC 욕구 (NEED_)', T('aiNeeds'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('일반인 직업 (JOB_)', T('aiJobs'), [['ID', r => r.id], ['이름', r => r.name], ['시급', r => r.pay], ['직급', r => (r.ladder || []).join('→')]]));
out.push(table('행동 (ACT_)', T('actions'), [['ID', r => r.id], ['이름', r => r.name], ['분류', r => r.cat], ['장소', r => r.place || '']]));
out.push(table('장소 종류 (PT_)', T('placeTypes'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('길드 (GD_) — 지금은 화면 확인용 샘플', T('guilds'), [['ID', r => r.id], ['이름', r => r.name], ['등급', r => r.rank], ['지역', r => r.region]]));
out.push(table('이름 있는 인물 (HN_ 헌터 · NP_ 일반인) — 샘플', [...T('hunters'), ...T('npcs')], [['ID', r => r.id], ['이름', r => r.name], ['구분', r => r.rank ? DB.ranks[r.rank].name + '급 헌터' : '일반인 · ' + (r.job || '')]]));
out.push(table('발신자 (SYS_ · 메시지 보낸 쪽)', T('senders'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('외형 선택지 묶음 (SC_)', T('lookPools'), [['ID', r => r.id], ['이름', r => r.name], ['종류', r => r.kind], ['선택지 수', r => T('lookOpts').filter(o => o.pool === r.id).length]]));
out.push(table('출신 · 배경 항목 (BI_) → 선택지 묶음 (BGP_)', T('bgItems'), [['항목 ID', r => r.id], ['이름', r => r.name], ['묶음', r => r.pool], ['여러 개', r => r.multi ? `예 (최대 ${r.max || '제한 없음'})` : '아니오'], ['선택지 수', r => T('bgOpts').filter(o => o.pool === r.pool).length]]));
out.push(table('외형 항목 (LK_) — 조건 look · lookNum 의 item', T('ccLook'), [['ID', r => r.id], ['이름', r => r.name], ['선택지 묶음', r => r.pool || '(슬라이더)'], ['성별', r => r.sex || '']]));
out.push(table('외형 선택지 (묶음별) — 조건 look 의 in', T('lookPools'), [['묶음', r => r.id], ['선택지 (ID 이름)', r => T('lookOpts').filter(o => o.pool === r.id).map(o => `${o.id} ${o.name.length > 14 ? o.name.slice(0, 14) + '…' : o.name}`).join(' · ')]]));
out.push(table('출신 · 배경 선택지 (묶음별) — 조건 bg 의 in', T('bgPools'), [['묶음', r => r.id], ['이름', r => r.name || ''], ['선택지 (ID 이름)', r => T('bgOpts').filter(o => o.pool === r.id).map(o => `${o.id} ${o.name}`).join(' · ')]]));
out.push(table('언어 (LANG_) — 조건 lang · basic langMain', T('ccLanguages'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('국적 · 출생지 · 목소리 · 말투 — 조건 basic', [...T('ccNations').map(r => ({...r, k: 'nation'})), ...T('ccBirthplaces').map(r => ({...r, k: 'bplace'})), ...T('ccVoices').map(r => ({...r, k: 'voice'})), ...T('ccSpeech').map(r => ({...r, k: 'speech'}))], [['key', r => r.k], ['ID', r => r.id], ['이름', r => r.name]], '혈액형 blood: A · B · O · AB · 주로 쓰는 손 hand: 오른손 · 왼손 · 양손'));
out.push(table('주거 (HOU_)', T('housing'), [['ID', r => r.id], ['이름', r => r.name], ['월세', r => r.rent]]));
out.push(table('클래스 분류 (CC_)', T('classCats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('성격 요약 세부 항목 (PF_)', T('persFacets'), [['ID', r => r.id], ['이름', r => r.name], ['축', r => (r.axes || []).join(' ')]]));
out.push(`## 지금 쓰인 ID 범위 (새 ID 는 겹치지 않게 — 외주는 배치 코드를 붙인다)\n\n| 테이블 | 행 수 | 마지막 ID |\n|---|---|---|\n${['events', 'crises', 'traits', 'skills', 'classes', 'items', 'sysShop', 'monsters', 'gatePlaces', 'newsPool', 'rumorPool', 'careerMsgs', 'objectives', 'aiJobs', 'persExtra', 'bgOpts', 'lookOpts', 'persCombos', 'persNeutral', 'npcs', 'hunters'].map(t => `| ${t} | ${T(t).length} | ${Object.keys(DB[t] || {}).slice(-1)[0] || '—'} |`).join('\n')}\n`);
/* K-Hunter-Life 새 테이블 (판단 엔진 · 이야기 창 · 감정 · 멈춤) */
out.push(table('의미 태그 (TAG_) — 선택지 tags 에 쓴다 (판단 엔진)', T('mindTags'), [['ID', r => r.id], ['이름', r => r.name], ['재료(가중치)', r => Object.entries(r.w).map(([k, v]) => k + ' ' + v).join(', ')]]));
out.push(table('옛 위기 style → 태그', T('styleTags'), [['style', r => r.id], ['태그', r => r.tags.join(' ')]]));
out.push(table('감정 (EM_) — fx.emo · 조건 emo · storyLines emo:', T('emotions'), [['ID', r => r.id], ['이름', r => r.name], ['반감기(시간)', r => r.half]]));
out.push(table('멈춤 종류 (SK_) — 이벤트 kind', T('stopKinds'), [['ID', r => r.id], ['이름', r => r.name], ['큰 갈림길', r => r.big ? '예' : '']]));
out.push(table('고비 (MS_) — storyLines retro:', T('milestoneTypes'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('국가 상태 (NS_) — ccNations.state', T('nationStates'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('행동 (ACT_) — storyLines act:', T('actions'), [['ID', r => r.id], ['이름', r => r.name], ['분류', r => r.cat], ['장소', r => r.place || '']]));
out.push(table('행동 분류 (ACC_) — storyLines cat:', T('actionCats'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('장소 종류 (PT_) — storyLines small: · 조건 place', T('placeTypes'), [['ID', r => r.id], ['이름', r => r.name]]));
out.push(table('외모 점수 (APS_) — 조건 looks (세 층 원칙)', T('lookScores'), [['ID', r => r.id], ['이름', r => r.name], ['성인만', r => r.adult ? '예' : '']]));
const dir = path.resolve(__dirname, '../docs/outsource'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'ID_참조.md'), out.join('\n'));
console.log('docs/outsource/ID_참조.md 작성', out.join('\n').length, 'bytes');
