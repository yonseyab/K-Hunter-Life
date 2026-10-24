/* tools/fill 시험 (2026-10-24): 종류마다 주문서 → 무작위 글로 채우기 → 검사 통과 → 반영(게임 검사 통과) → 겹침 막힘 → undo
   실행: node tests/tools/t_fill.js  (game 폴더 사본에서 돈다 — 진짜 게임은 안 바뀜) */
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process'), assert = require('assert/strict');
const REPO = path.resolve(__dirname, '../..'), TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'khlfill-'));
fs.cpSync(path.join(REPO, 'game'), path.join(TMP, 'game'), { recursive: true });
const env = { ...process.env, KHL_GAME: path.join(TMP, 'game'), KHL_FILL: path.join(TMP, 'fill') };
const run = (...a) => { try { return { ok: true, out: cp.execFileSync('node', [path.join(REPO, 'tools/fill/fill.js'), ...a], { env, encoding: 'utf8' }) }; } catch (e) { return { ok: false, out: (e.stdout || '') + (e.stderr || '') }; } };
const KINDS = require(path.join(REPO, 'tools/fill/kinds.js'));
const SY = '가나다라마바사아자차카타파하고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후기니디리미비시이지치키티피히'.split('');
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const word = n => Array.from({ length: n }, () => SY[Math.floor(rnd() * SY.length)]).join('');
const sentence = () => `${word(3)} ${word(2)} ${word(4)} ${word(3)}`;
function fillText(kind, key, sub) {
  const all = [...kind.fields, ...Object.values(kind.group || {}).flat()], f = all.find(x => x.k === (sub || key));
  const need = (f.needPh || []).map(p => p === 'item' ? '{item}{을}' : `{${p}}`).join(' ');
  switch (f.lint) {
    case 'name': return word(4);
    case 'short': return `${need} ${word(3)} ${word(3)}`.trim();
    case 'head': return `${word(3)} ${word(4)} ${word(2)} ${word(3)}`;
    case 'chat': return `${word(3)} ${word(3)} ${word(2)}`;
    case 'desc': return `${sentence()} ${word(3)}다.`;
    default: return `${need} ${sentence()}다.`.trim();
  }
}
for (const id of Object.keys(KINDS)) {
  const kind = KINDS[id], o = run('order', id, '--n', '4'); assert(o.ok, id + ' order: ' + o.out);
  const file = o.out.match(/주문서: (\S+)/)[1].replace(/^fill\//, '');
  const src = fs.readFileSync(path.join(TMP, 'fill', file), 'utf8');
  const filled = src.replace(/^((\w+)(?:\.(\w+))?): $/gm, (m, k, a, b) => a === 'by' ? 'by: 시험' : `${k}: ${fillText(kind, b ? b : a, b)}`);
  const ans = path.join(TMP, id + '_ans.md'); fs.writeFileSync(ans, filled);
  const c = run('check', ans); assert(c.ok && /걸림 0/.test(c.out), id + ' check:\n' + c.out);
  const a = run('apply', ans); assert(a.ok && /게임 검사 통과/.test(a.out), id + ' apply:\n' + a.out);
  const again = run('check', ans); assert(/통과 0/.test(again.out), id + ' 다시 넣으면 겹침으로 막혀야 함:\n' + again.out);
  console.log('✓', id);
}
const b = run('batches'); assert.equal((b.out.match(/^\d\d · /gm) || []).length, Object.keys(KINDS).length);
assert(run('undo', '1').ok); assert(!fs.existsSync(path.join(TMP, 'game/data/ext/fill_01_story.js')));
assert(!fs.readFileSync(path.join(TMP, 'game/data/ext/_list.js'), 'utf8').includes('fill_01_story.js'));
fs.rmSync(TMP, { recursive: true, force: true });
console.log('fill tool: order / check / apply / dup block / undo passed');
