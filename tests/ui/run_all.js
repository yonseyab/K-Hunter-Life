/* 모든 UI 테스트를 차례로 실행하고, 페이지 오류(pageerror)가 있었는지 요약한다.
   실행: node tests/ui/run_all.js   (Playwright 필요: npm i -D playwright, 또는 전역 설치 후 NODE_PATH 지정)
   환경 변수: CHROMIUM=브라우저 실행 파일 경로(선택) · OUT=스크린숏 저장 폴더(기본 임시 폴더) */
const {execFileSync}=require('child_process'),fs=require('fs'),path=require('path');
const files=fs.readdirSync(__dirname).filter(f=>/^t_.*\.js$/.test(f)).sort();let fail=0;
for(const f of files){let out='';try{out=execFileSync(process.execPath,[path.join(__dirname,f)],{encoding:'utf8',timeout:600000,env:process.env})}catch(e){out=(e.stdout||'')+(e.stderr||'');}
  const ok=/errs \[\]/.test(out);if(!ok)fail++;console.log(`${ok?'OK  ':'FAIL'} ${f}`);if(!ok)console.log(out.split('\n').slice(-12).join('\n'))}
console.log(`\n${files.length-fail}/${files.length} 통과`);process.exit(fail?1:0);
