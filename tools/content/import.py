#!/usr/bin/env python3
"""tools/content/import.py — 외주 결과(JSON, docs/outsource/class_skill_brief.md 형식)를 검사하고 게임 데이터로 바꾼다.
입력: tools/content/inbox/classes_*.json · common_*.json (받은 파일 그대로)
출력: game/data/content/k_classes.js · k_skills.js · k_common.js · k_moves.js  (직접 고치지 말고 입력을 고친 뒤 다시 실행)
      검사 보고: 화면 + tools/content/report.md (외주에 돌려줄 수정 요청)
실행: python3 tools/content/import.py   (그 뒤 node tools/validate_data.js)
ID: 계열 순서 MEL 0 · RAN 1 · MAG 2 · SUP 3 · SPE 4 · CRA 5 → 클래스 CLS_K01~60, 스킬 SK_K0001~0600 (클래스 번호 × 10 + 스킬 번호), 공용 SK_K1001~,
    전투 기술 CM_K + 스킬 번호
"""
import json, os, glob, re
from collections import Counter

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, '..', '..', 'game', 'data', 'content')
CATS = {'MEL': ('CC_MELEE', 0), 'RAN': ('CC_RANGED', 1), 'MAG': ('CC_MAGIC', 2), 'SUP': ('CC_SUPPORT', 3), 'SPE': ('CC_SPECIAL', 4), 'CRA': ('CC_CRAFT', 5)}
ROLES = ['ROLE_TANK', 'ROLE_MDPS', 'ROLE_RDPS', 'ROLE_MAGE', 'ROLE_HEAL', 'ROLE_SUP', 'ROLE_SCOUT']
ELS = ['EL_FIRE', 'EL_ICE', 'EL_BOLT', 'EL_EARTH', 'EL_WIND', 'EL_WATER', 'EL_LIGHT', 'EL_DARK', 'EL_POISON']
SES = ['SE_STUN', 'SE_BLEED', 'SE_BURN', 'SE_POISON', 'SE_SLOW', 'SE_WEAK', 'SE_BREAK', 'SE_GUARD', 'SE_TAUNT', 'SE_MIGHT', 'SE_HASTE', 'SE_REGEN']
DOMS = ['SD_COMBAT', 'SD_EXPLORE', 'SD_LIFE', 'SD_SOCIAL']
SKC = ['SKC_SURVIVE', 'SKC_COMBAT', 'SKC_SENSE', 'SKC_HEAL', 'SKC_MOVE', 'SKC_MIND', 'SKC_SOCIAL', 'SKC_LIFE']
ABL = {f'ABL_A{i:02d}' for i in range(1, 31)} | {f'ABL_B{i:02d}' for i in range(1, 41)} | {'STAT_BODY', 'STAT_MIND', 'STAT_MANA', 'STAT_SENSE'}
ABLN = {}
WHEN = [None, 'allyLow', 'selfLow', 'crowd', 'notTarget', 'start', 'always']

errs, warns = [], []
CLAMP = {}
E = lambda where, msg: errs.append(f'{where}: {msg}')
W = lambda where, msg: warns.append(f'{where}: {msg}')


def cap(r): return min(1.3, 1 + 0.08 * (max(1, r) - 1))


def rng(where, name, v, lo, hi, r=1, common=False):
    if v is None: return
    top = hi * cap(r) * (0.85 if common else 1)
    low = lo * (0.6 if common else 1)
    if v < low - 1e-9 or v > top + 1e-9: E(where, f'{name} {v} — 범위 {lo}~{round(top, 2)} 밖 (게임에는 {round(min(max(v, low), top), 2)}로 넣음)'); CLAMP[(where, name)] = round(min(max(v, low), top), 3)


def check_combat(where, c, r, common):
    k, t = c.get('kind'), c.get('target')
    if k not in ['attack', 'heal', 'buff', 'debuff', 'taunt']: E(where, f'combat.kind {k}')
    if t not in ['enemy', 'enemies', 'ally', 'allies', 'self']: E(where, f'combat.target {t}')
    if c.get('stat') not in [None, 'atk', 'mag']: E(where, f"combat.stat {c.get('stat')}")
    if c.get('el') not in [None] + ELS: E(where, f"combat.el {c.get('el')}")
    if c.get('when') not in WHEN: E(where, f"combat.when {c.get('when')}")
    for s in c.get('se') or []:
        if s.get('se') not in SES: E(where, f"se {s.get('se')} 목록 밖")
        if not (0 < (s.get('chance') or 0) <= 1): E(where, f"se chance {s.get('chance')}")
        if not (1 <= (s.get('dur') or 0) <= 12): W(where, f"se dur {s.get('dur')} (4~12 권장)")
    p, h, a, cd, mp = c.get('power') or 0, c.get('hits') or 1, c.get('area') or 1, c.get('cd') or 0, c.get('mp') or 0
    if k == 'attack':
        if t == 'enemies':
            rng(where, 'power(범위)', p, 0.7, 1.2 if a > 3 else 1.0, r, common); rng(where, 'cd', cd, 10, 16); rng(where, 'mp', mp, 14, 30)
            if c.get('when') != 'crowd': W(where, "범위 공격인데 when 이 crowd 가 아님")
        elif h > 1:
            rng(where, 'power(한 번)', p, 0.5, 0.9, r, common); rng(where, 'hits', h, 2, 4)
            if p * h > 2.6 * cap(r) + 1e-9: E(where, f'다타 합계 {round(p * h, 2)} > {round(2.6 * cap(r), 2)}')
            rng(where, 'cd', cd, 6, 12); rng(where, 'mp', mp, 8, 16)
        else: rng(where, 'power', p, 1.4, 2.4, r, common); rng(where, 'cd', cd, 5, 12); rng(where, 'mp', mp, 6, 16)
    elif k == 'heal':
        hl = c.get('heal') or 0
        if t == 'allies': rng(where, 'heal(모두)', hl, 0.6, 1.0, r, common); rng(where, 'cd', cd, 14, 22); rng(where, 'mp', mp, 22, 32)
        else: rng(where, 'heal', hl, 1.2, 1.9, r, common); rng(where, 'cd', cd, 4, 8); rng(where, 'mp', mp, 10, 18)
        if c.get('when') != 'allyLow': W(where, 'heal 인데 when 이 allyLow 가 아님')
    else:
        if not c.get('se'): E(where, f'{k} 는 se 가 필요')
        rng(where, 'cd', cd, 10, 25); rng(where, 'mp', mp, 0, 24)
        if k == 'debuff' and p: rng(where, 'power(약화)', p, 0, 1.2, r, common)
    if c.get('drain'): rng(where, 'drain', c['drain'], 0.2, 0.6)
    if c.get('crit'): rng(where, 'crit', c['crit'], 10, 40)


def check_skill(sk, r, common, keyset):
    w = sk.get('key', '?')
    if sk.get('kind') not in ['액티브', '패시브']: E(w, f"kind {sk.get('kind')}")
    d = sk.get('domains') or []
    if not d or any(x not in DOMS for x in d): E(w, f'domains {d}')
    if common and sk.get('cat') not in SKC: E(w, f"공용 cat {sk.get('cat')}")
    c, cs, ch = sk.get('combat'), sk.get('cstat'), sk.get('checks')
    if c and sk['kind'] == '패시브': E(w, '패시브인데 combat 이 있음 (cstat 으로)')
    if c: check_combat(w, c, r, common)
    if (c or cs) and 'SD_COMBAT' not in d: E(w, 'combat · cstat 이 있는데 domains 에 SD_COMBAT 없음')
    if 'SD_COMBAT' in d and not (c or cs): E(w, 'SD_COMBAT 인데 combat · cstat 둘 다 없음')
    if any(x in d for x in DOMS[1:]) and not ch: E(w, f'{[x for x in d if x != "SD_COMBAT"]} 인데 checks 없음')
    if cs:
        if len(cs) > 2: W(w, f'cstat 칸 {len(cs)}개 (2개까지)')
        for k2, v in cs.items():
            if k2 in ['hp', 'atk', 'mag', 'def', 'res']: rng(w, f'cstat.{k2}', v, 1.04, 1.15, r, common)
            elif k2 == 'spd': rng(w, 'cstat.spd', v, 0.9, 0.97)
            elif k2 in ['acc', 'eva']: rng(w, f'cstat.{k2}', v, 2, 8, r, common)
            elif k2 == 'crit': rng(w, 'cstat.crit', v, 2, 6, r, common)
            else: E(w, f'cstat 칸 {k2}')
    if ch:
        if len(ch) > 3: W(w, f'checks {len(ch)}개 (3개까지)')
        for a, v in ch.items():
            if a not in ABL: E(w, f'checks {a} 목록 밖')
            if not (1 <= v <= 4): E(w, f'checks {a} {v} (1~4)')
    sm = sk.get('summary') or ''
    if len(sm) < 25: W(w, f'summary 가 짧음: "{sm}"')
    nums = [str(x).rstrip('0').rstrip('.') for x in ([c.get('power'), c.get('heal')] if c else []) + list((cs or {}).values()) + list((ch or {}).values()) if x]
    nums += [str(round(abs(v - 1) * 100)) for k2, v in (cs or {}).items() if k2 in ['hp', 'atk', 'mag', 'def', 'res', 'spd']]
    if ch and not re.search(r'[+＋]\s*\d', sm):  # 판정 보정 숫자를 문장 끝에 붙인다
        sk['summary'] = sm.rstrip() + ' (' + ' · '.join(f'{ABLN.get(a, a)} +{v}' for a, v in ch.items()) + ')'; sm = sk['summary']
    if nums and not any(n in sm for n in nums): W(w, f'summary 에 수치가 안 보임: "{sm}"')
    for (wh, nm), v in list(CLAMP.items()):  # 범위 밖 값은 범위 끝으로 (보고서에도 남는다)
        if wh != w: continue
        if nm.startswith('cstat.'): sk['cstat'][nm[6:]] = v
        elif c is not None: c[re.sub(r'\(.*\)', '', nm)] = v
    keyset[sk['key']] = sk


def jsv(v):
    if isinstance(v, bool): return 'true' if v else 'false'
    if v is None: return 'null'
    if isinstance(v, (int, float)): return str(int(v)) if float(v).is_integer() else repr(round(v, 3))
    if isinstance(v, str): return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"
    if isinstance(v, list): return '[' + ', '.join(jsv(x) for x in v) + ']'
    if isinstance(v, dict): return '{' + ', '.join(f'{k}:{jsv(x)}' for k, x in v.items()) + '}'
    raise TypeError(v)


def row(o): return '  {' + ', '.join(f'{k}:{jsv(v)}' for k, v in o.items() if v not in (None, '', [], {})) + '},'


def dot(s): return s if s.endswith(('.', '!', '?', '…')) else s + '.'


def main():
    src = open(os.path.join(ROOT, '..', '..', 'game', 'data', 'abilities.js'), encoding='utf-8').read()
    ABLN.update(dict(re.findall(r"id:'(ABL_[AB]\d+)'[^}]*?name:'([^']+)'", src))); ABLN.update({'STAT_BODY': '신체', 'STAT_MIND': '정신', 'STAT_MANA': '마력', 'STAT_SENSE': '감각'})
    classes, skills, commons, moves, names = [], [], [], [], Counter()
    keyset, got = {}, []
    for path in sorted(glob.glob(os.path.join(ROOT, 'inbox', 'classes_*.json'))):
        d = json.load(open(path, encoding='utf-8')); got.append(os.path.basename(path))
        cls = d.get('classes') or []; sks = {s['key']: s for s in d.get('skills') or []}
        if len(cls) != 10: E(os.path.basename(path), f'클래스 {len(cls)}개 (10개)')
        if len(sks) != len(cls) * 10: E(os.path.basename(path), f'스킬 {len(sks)}개 ({len(cls) * 10}개)')
        for c in cls:
            k = c['key']; pre, n = k[:3], int(k[3:]); cat, ci = CATS[pre]; idx = ci * 10 + n; cid = f'CLS_K{idx:02d}'
            r = c.get('rarity') or 1; names[c['name']] += 1
            if c.get('role') not in ROLES: E(k, f"role {c.get('role')}")
            if any(x not in ROLES for x in c.get('roles') or []): E(k, f"roles {c.get('roles')}")
            if c.get('el') not in [None] + ELS: E(k, f"el {c.get('el')}")
            if c.get('range') not in ['melee', 'near', 'far']: E(k, f"range {c.get('range')}")
            if any(a not in ABL for a in c.get('keys') or []): E(k, f"keys {c.get('keys')}")
            if not (4 <= sum((c.get('stats') or {}).values()) <= 6): W(k, f"stats 합 {sum((c.get('stats') or {}).values())} (4~6)")
            mine = [f'{k}-{i:02d}' for i in range(1, 11)]
            want = c.get('pool', []) + c.get('passive', []) + [x['skill'] for x in c.get('learn', [])]
            if sorted(want) != mine: E(k, f'pool · passive · learn 이 {k}-01~10 과 안 맞음')
            ss = [sks.get(x) for x in mine]
            if None in ss: E(k, '스킬 키 빠짐'); continue
            for s in ss: names[s['name']] += 1; check_skill(s, r, False, keyset)
            cb = [s for s in ss if 'SD_COMBAT' in s['domains']]
            if len(cb) < 6: W(k, f'전투 스킬 {len(cb)}개 (6개 이상)')
            if len([s for s in cb if s.get('combat')]) < 4: W(k, '전투 액티브 4개 미만')
            if not any(s.get('cstat') for s in ss): W(k, '전투 패시브(cstat) 없음')
            if not any(x in s['domains'] for s in ss for x in DOMS[1:]): W(k, '탐색 · 생활 · 사회 스킬 없음')
            sid = lambda key: f'SK_K{(idx - 1) * 10 + int(key[-2:]):04d}'
            for s in ss:
                i = sid(s['key']); mv = None
                if s.get('combat'):
                    cm = dict(s['combat']); mv = 'CM_K' + i[4:]
                    moves.append({'id': mv, 'name': s['name'], 'kind': cm['kind'], 'target': cm['target'], 'stat': cm.get('stat') or ('mag' if cm['kind'] == 'heal' else None),
                                  'power': cm.get('power') or (0 if cm['kind'] in ['attack', 'debuff'] else None), 'hits': cm.get('hits') if (cm.get('hits') or 1) > 1 else None,
                                  'area': cm.get('area') if cm['target'] == 'enemies' else None, 'heal': cm.get('heal') or None, 'cd': cm.get('cd'), 'mp': cm.get('mp') or None,
                                  'crit': cm.get('crit') or None, 'drain': cm.get('drain') or None, 'el': cm.get('el'), 'se': [{'se': x['se'], 'chance': x['chance'], 'dur': x['dur']} for x in cm.get('se') or []],
                                  'when': cm.get('when'), 'lines': {'use': (s.get('lines') or {}).get('use') or []}, 'src': 'skill'})
                skills.append({'id': i, 'name': s['name'], 'en': s.get('en'), 'scope': 'class', 'kind': s['kind'], 'cls': cid, 'rarity': r, 'domains': s['domains'],
                               'desc': s.get('summary'), 'summary': s.get('summary'), 'lore': s.get('lore'), 'move': mv, 'cstat': s.get('cstat'), 'checks': s.get('checks'),
                               'lines': {'use': (s.get('lines') or {}).get('use') or []}, 'src': 'gpt'})
            classes.append({'id': cid, 'name': c['name'], 'en': c.get('en'), 'cat': cat, 'tier': 1, 'rarity': r, 'role': c['role'], 'roles': c.get('roles'), 'range': c.get('range'), 'el': c.get('el'),
                            'summary': c.get('summary'), 'desc': c.get('desc'), 'lore': c.get('lore'), 'pick': 2, 'pool': [sid(x) for x in c['pool']], 'passive': [sid(x) for x in c['passive']],
                            'learn': [{'skill': sid(x['skill']), 'lv': x['lv']} for x in c['learn']], 'stats': {k2: v for k2, v in (c.get('stats') or {}).items() if v},
                            'keys': c.get('keys'), 'jobs': c.get('jobs'), 'habits': [dot(x) for x in c.get('habits') or []],
                            'lines': {'awaken': c['lines'].get('awaken'), 'levelUp': c['lines'].get('levelUp'), 'idle': c['lines'].get('idle')}, 'src': 'gpt'})
    for path in sorted(glob.glob(os.path.join(ROOT, 'inbox', 'common_*.json'))):
        d = json.load(open(path, encoding='utf-8')); got.append(os.path.basename(path))
        for s in d.get('skills') or []:
            names[s['name']] += 1; check_skill(s, 1, True, keyset); n = int(s['key'][3:]); i = f'SK_K{1000 + n:04d}'; mv = None
            if s.get('combat'):
                cm = s['combat']; mv = 'CM_K' + i[4:]
                moves.append({'id': mv, 'name': s['name'], 'kind': cm['kind'], 'target': cm['target'], 'stat': cm.get('stat') or ('mag' if cm['kind'] == 'heal' else None), 'power': cm.get('power') or (0 if cm['kind'] in ['attack', 'debuff'] else None),
                              'hits': cm.get('hits') if (cm.get('hits') or 1) > 1 else None, 'area': cm.get('area') if cm['target'] == 'enemies' else None, 'heal': cm.get('heal') or None, 'cd': cm.get('cd'), 'mp': cm.get('mp') or None,
                              'crit': cm.get('crit') or None, 'drain': cm.get('drain') or None, 'el': cm.get('el'), 'se': cm.get('se') or [], 'when': cm.get('when'), 'lines': {'use': (s.get('lines') or {}).get('use') or []}, 'src': 'skill'})
            commons.append({'id': i, 'name': s['name'], 'en': s.get('en'), 'scope': 'common', 'kind': s['kind'], 'cat': s.get('cat'), 'domains': s['domains'], 'desc': s.get('summary'), 'summary': s.get('summary'),
                            'lore': s.get('lore'), 'move': mv, 'cstat': s.get('cstat'), 'checks': s.get('checks'), 'lines': {'use': (s.get('lines') or {}).get('use') or []}, 'src': 'gpt'})
    for n, k in names.items():
        if k > 1: E('이름', f'"{n}" {k}번')
    head = lambda f: f'/* game/data/content/{f} — tools/content/import.py 가 외주 결과(tools/content/inbox)로 만든다. 직접 고치지 말 것. */\n'
    os.makedirs(OUT, exist_ok=True)
    for f, t, L in [('k_moves.js', 'combatMoves', moves), ('k_classes.js', 'classes', classes), ('k_skills.js', 'skills', skills), ('k_common.js', 'skills', commons)]:
        p = os.path.join(OUT, f)
        if L: open(p, 'w', encoding='utf-8').write(head(f) + f"def('{t}', [\n" + '\n'.join(row(x) for x in L) + '\n]);\n')
        elif os.path.exists(p): os.remove(p)
    rep = [f'# 외주 결과 검사 ({", ".join(got)})', f'클래스 {len(classes)} · 클래스 스킬 {len(skills)} · 공용 {len(commons)} · 전투 기술 {len(moves)}', '',
           f'## 고쳐야 함 ({len(errs)})', *[f'- {x}' for x in errs], '', f'## 확인 권장 ({len(warns)})', *[f'- {x}' for x in warns]]
    if len(classes) == 60:
        rc = Counter(c['role'] for c in classes); rr = Counter(c['rarity'] for c in classes)
        rep += ['', f'역할 분포 {dict(rc)}', f'희귀도 분포 {dict(rr)}']
    open(os.path.join(ROOT, 'report.md'), 'w', encoding='utf-8').write('\n'.join(rep) + '\n')
    print('\n'.join(rep[:4])); print(f'확인 권장 {len(warns)}건 → tools/content/report.md')


if __name__ == '__main__':
    main()
