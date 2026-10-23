/* 데이터 검증 (브라우저 없이): tools/validate_data.js — 중복 ID · 없는 ID 참조 · 테이블 규칙 */
const r=require('../../tools/validate_data.js').validate();
console.log(`파일 ${r.stats.files} · 테이블 ${r.stats.tables} · 행 ${r.stats.rows}`);
console.log('errs',JSON.stringify(r.errs));
