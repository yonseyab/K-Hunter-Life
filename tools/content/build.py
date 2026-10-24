#!/usr/bin/env python3
"""tools/content/build.py — 클래스 · 스킬 · 장비 원고(*_src.py)를 game/data/content/*.js 로 만든다 (2026-10-24).
원고는 이름 · 수치 토큰 · 문장만 담고, ID · 요약 문장(DB 에 나가는 '무엇을 · 누구에게 · 얼마나 · 언제') · 전투 기술(combatMoves)은 여기서 만든다.
실행: python3 tools/content/build.py   (그 뒤 node tools/validate_data.js)
게임 데이터 파일을 직접 고치지 말고 원고를 고친 뒤 다시 만든다.
"""
import os, re, sys
ROOT = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, ROOT)
GAME = os.path.join(ROOT, '..', '..', 'game')
OUT = os.path.join(GAME, 'data', 'content')
from skills_src import SK
from common_src import CM
from classes_src import CL
from gear_src import TYPES, MAT, MATDESC, NAMED

rd = lambda p: open(os.path.join(GAME, p), encoding='utf-8').read()
ABL = dict(re.findall(r"\{id:'(ABL_[ABC]\d+)', set:'[^']+', g:'[^']+', name:'([^']+)'", rd('data/abilities.js')))
ABL.update({'STAT_BODY': '신체', 'STAT_MIND': '정신', 'STAT_MANA': '마력', 'STAT_SENSE': '감각'})
comb = rd('data/combat.js')
ELN = dict(re.findall(r"\{id:'(EL_\w+)',\s*name:'([^']+)'", comb))
SEN = dict(re.findall(r"\{id:'(SE_\w+)',\s*name:'([^']+)'", comb))
ROLEN = {'TANK': '탱커', 'MDPS': '근접 딜러', 'RDPS': '원거리 딜러', 'MAGE': '마법 딜러', 'HEAL': '힐러', 'SUP': '서포터', 'SCOUT': '스카우트'}
CATS = {'MELEE': 'CC_MELEE', 'RANGED': 'CC_RANGED', 'MAGIC': 'CC_MAGIC', 'SUPPORT': 'CC_SUPPORT', 'SPECIAL': 'CC_SPECIAL', 'CRAFT': 'CC_CRAFT'}
DOM = {'C': 'SD_COMBAT', 'E': 'SD_EXPLORE', 'L': 'SD_LIFE', 'S': 'SD_SOCIAL'}
STATN = {'hp': '체력', 'atk': '공격', 'mag': '마공', 'def': '방어', 'res': '마법 저항', 'spd': '공격 간격', 'acc': '명중', 'eva': '회피', 'crit': '치명'}
TGTN = {'enemy': '적 하나', 'enemies': '적 여럿', 'ally': '아군 하나', 'allies': '아군 모두', 'self': '자신'}
WHENN = {'allyLow': '아군 HP가 55% 아래일 때 쓴다', 'selfLow': '자기 HP가 40% 아래일 때 쓴다', 'crowd': '적이 셋 이상일 때 쓴다', 'notTarget': '적이 다른 사람을 노릴 때 쓴다', 'start': '싸움 첫머리에 쓴다'}


def jsv(v):
    if v is None: return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return str(int(v)) if float(v).is_integer() else str(round(v, 3))
    if isinstance(v, str): return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"
    if isinstance(v, list): return '[' + ', '.join(jsv(x) for x in v) + ']'
    if isinstance(v, dict): return '{' + ', '.join(f'{k}:{jsv(x)}' for k, x in v.items()) + '}'
    raise TypeError(v)
def row(o, keep=()): return '  {' + ', '.join(f'{k}:{jsv(v)}' for k, v in o.items() if k in keep or v not in (None, '', [], {})) + '},'
def num(v): return str(int(v)) if float(v).is_integer() else f'{v:g}'
def josa(w, a, b):
    c = ord(w[-1]) - 0xAC00
    return a if 0 <= c <= 11171 and c % 28 else b


def parse(spec):
    """수치 토큰 → {move, cstat, checks}"""
    m = {'se': [], 'buffs': []}; cstat = {}; checks = {}
    for t in spec.split():
        if t.startswith('cstat:'):
            for p in t[6:].split(','): k, v = p.split('='); cstat[k] = float(v)
        elif t.startswith('chk:'):
            for p in t[4:].split(','): k, v = p.split('='); checks['ABL_' + k if not k.startswith('STAT') else k] = int(v)
        elif t.startswith('se:'):
            n, c, d = t[3:].split(':')[0].split('.')[0], '0.' + t[3:].split(':')[0].split('.')[1], float(t[3:].split(':')[1])
            m['se'].append({'se': 'SE_' + n, 'chance': float(c), 'dur': d})
        elif t.startswith('buff:'): _, n, d = t.split(':'); m['buffs'].append({'se': 'SE_' + n, 'chance': 1, 'dur': float(d)})
        elif t.startswith('el:'): m['el'] = 'EL_' + t[3:]
        elif t.startswith('tgt:'): m['target'] = t[4:]
        elif t.startswith('when:'): m['when'] = t[5:]
        elif t in ('debuff', 'taunt'): m[t] = True
        else:
            r = re.match(r'^(atk|mag|heal|hits|area|cd|mp|crit|drain)([\d.]+)$', t)
            if not r: raise ValueError('토큰 ' + t)
            k, v = r.group(1), float(r.group(2))
            if k in ('atk', 'mag'): m['stat'] = k; m['power'] = v
            else: m[k] = v
    return m, cstat, checks


def move_of(m):
    if m.get('taunt'): kind = 'taunt'
    elif m.get('heal'): kind = 'heal'
    elif m.get('debuff'): kind = 'debuff'
    elif m.get('power'): kind = 'attack'
    else: kind = 'buff'
    tgt = m.get('target') or ('enemies' if m.get('area', 1) > 1 else 'enemy') if kind in ('attack', 'debuff') else m.get('target') or ('ally' if kind == 'heal' else 'self')
    if kind == 'taunt': ses = [{'se': 'SE_TAUNT', 'chance': 1, 'dur': 6}]
    else: ses = m['se'] + m['buffs']
    o = {'kind': kind, 'target': tgt}
    if m.get('power') is not None and kind in ('attack', 'debuff'): o['stat'] = m.get('stat', 'atk'); o['power'] = m['power']
    if kind == 'debuff' and 'power' not in o: o['power'] = 0
    if m.get('hits', 1) > 1: o['hits'] = int(m['hits'])
    if m.get('area', 1) > 1: o['area'] = int(m['area'])
    if m.get('heal'): o['heal'] = m['heal']
    for k in ('cd', 'mp', 'crit', 'drain'):
        if m.get(k): o[k] = m[k] if k == 'drain' else int(m[k]) if float(m[k]).is_integer() else m[k]
    if m.get('el'): o['el'] = m['el']
    if ses: o['se'] = ses
    if m.get('when'): o['when'] = m['when']
    return o


def describe(mv, cstat, checks, dom):
    """DB 에 나가는 요약: 무엇을 · 누구에게 · 얼마나 · 언제"""
    out = []
    if mv:
        k = mv['kind']; t = TGTN[mv['target']] + (f"(최대 {mv['area']})" if mv['target'] == 'enemies' else '')
        if k == 'attack' or (k == 'debuff' and mv.get('power')):
            s = f"{t}에게 {'마공' if mv.get('stat') == 'mag' else '공격'} ×{num(mv['power'])}{' × ' + str(mv['hits']) + '번' if mv.get('hits') else ''} 피해"
            if mv.get('el'): s += f" ({ELN[mv['el']]} 속성)"
            out.append(s + '.')
        if k == 'heal': out.append(f"{t}의 HP를 마공 ×{num(mv['heal'])}만큼 회복한다.")
        if mv.get('crit'): out.append(f"이 기술은 치명 확률 +{num(mv['crit'])}%.")
        if mv.get('drain'): out.append(f"준 피해의 {int(mv['drain'] * 100)}%만큼 자기 HP를 회복한다.")
        for e in mv.get('se', []):
            nm = SEN[e['se']]; who = '' if k in ('attack', 'debuff') else ('자신에게 ' if mv['target'] == 'self' else t + '에게 ')
            out.append(f"{who}{'' if e['chance'] >= 1 else str(int(round(e['chance'] * 100))) + '% 확률로 '}{nm} {num(e['dur'])}초.")
        c = [f"재사용 {num(mv['cd'])}초" if mv.get('cd') else '', f"마력 {num(mv['mp'])}" if mv.get('mp') else '']
        c = ' · '.join(x for x in c if x)
        if mv.get('when'): out.append(WHENN[mv['when']] + (f' ({c})' if c else '') + '.')
        elif c: out.append(c + '.')
    if cstat:
        out.append('늘 켜짐: ' + ' · '.join(f"{STATN[k]} {'+' + num(v) if k in ('acc', 'eva', 'crit') else '×' + num(v)}" for k, v in cstat.items()) + '.')
    if checks:
        where = '공략 중 판정' if 'SD_EXPLORE' in dom else '공략 밖 판정'
        out.append(f"{where}: " + ' · '.join(f"{ABL[k]} +{v}" for k, v in checks.items()) + '.')
    return ' '.join(out)


def main():
    skills, moves, by_name = [], [], {}
    def add_skill(name, kind, dom, spec, use, scope, cat=None):
        if name in by_name: raise ValueError('스킬 이름 중복 ' + name)
        m, cstat, checks = parse(spec)
        doms = [DOM[c] for c in dom]
        mv = move_of(m) if kind == 'A' and 'C' in dom else None
        if mv and 'SD_COMBAT' not in doms: doms.insert(0, 'SD_COMBAT')
        if cstat and 'SD_COMBAT' not in doms: doms.insert(0, 'SD_COMBAT')
        sid = f"SK_K{len(skills) + 1:03d}" if scope == 'class' else f"SK_K{500 + sum(1 for s in skills if s['scope'] == 'common') + 1:03d}"
        o = {'id': sid, 'name': name, 'scope': scope, 'kind': '액티브' if kind == 'A' else '패시브', 'cat': cat, 'domains': doms}
        if mv:
            mid = f"CM_K{len(moves) + 1:03d}"; mvrow = {'id': mid, 'name': name, **mv, 'lines': {'use': [use]} if use else None, 'src': 'claude'}
            moves.append(mvrow); o['move'] = mid
        if cstat: o['cstat'] = cstat
        if checks: o['checks'] = checks
        o['desc'] = describe(mv, cstat, checks, doms)
        o['lines'] = {'use': [use]} if use else None
        o['src'] = 'claude'
        skills.append(o); by_name[name] = o
    for s in SK: add_skill(*s, scope='class')
    for cat, *rest in CM: add_skill(*rest, scope='common', cat='SKC_' + cat)

    classes = []; used = {}
    for i, c in enumerate(CL):
        name, en, cat, role, sub, rar, rng, el, st, keys, pool, passive, learn, desc, lore = c
        cid = f'CLS_K{i + 1:03d}'
        def sid(n):
            if n not in by_name: raise ValueError(f'{name}: 스킬 없음 {n}')
            used.setdefault(n, []).append(cid); return by_name[n]['id']
        assert len(pool) == 6 and len(learn) == 3, name
        sv = [int(x) for x in st.split()]
        classes.append({'id': cid, 'name': name, 'en': en, 'cat': CATS[cat], 'tier': 1, 'rarity': rar, 'role': 'ROLE_' + role,
                        'roles': ['ROLE_' + role] + (['ROLE_' + sub] if sub else []), 'range': rng, 'el': 'EL_' + el if el else None, 'pick': 2,
                        'pool': [sid(n) for n in pool], 'passive': [sid(passive)], 'learn': [{'skill': sid(n), 'lv': lv} for n, lv in zip(learn, (10, 25, 45))],
                        'stats': {k: v for k, v in zip(['STAT_BODY', 'STAT_MIND', 'STAT_MANA', 'STAT_SENSE'], sv) if v}, 'keys': ['ABL_' + k for k in keys.split()],
                        'desc': desc, 'lore': lore, 'src': 'claude'})
    if [c for c in classes if by_name and False]: pass
    for s in skills:
        if s['scope'] == 'class': s['classes'] = sorted(set(used.get(s['name'], [])))
    orphan = [s['name'] for s in skills if s['scope'] == 'class' and not s.get('classes')]

    # ── 장비 ──
    GB = {1: 1, 2: 2, 3: 4, 4: 7, 5: 11, 6: 16}; PRICE = {1: 150000, 2: 600000, 3: 3000000, 4: 15000000, 5: 80000000, 6: None}
    SLOT = {'WEAPON': 'SLOT_WEAPON', 'SUB': 'SLOT_SUB', 'TOP': 'SLOT_TOP', 'BOTTOM': 'SLOT_BOTTOM', 'PIECE': 'SLOT_TOP', 'HAND': 'SLOT_HAND', 'NECK': 'SLOT_NECK', 'EAR': 'SLOT_EAR', 'SPECIAL': 'SLOT_SPECIAL'}
    PMUL = {'WEAPON': 1, 'SUB': 0.6, 'TOP': 0.6, 'BOTTOM': 0.4, 'PIECE': 1, 'HAND': 0.7, 'NECK': 0.7, 'EAR': 0.7, 'SPECIAL': 0.8}
    def statof(base, g, mul=1.0):
        b = GB[g]; o = {}
        for k, v in base.items():
            f = {'atk': 3, 'mag': 3, 'def': 2.5, 'res': 2.5, 'acc': 1, 'eva': 1, 'crit': 0.5}[k]
            o[k] = max(1, round(b * f * v * mul))
        return o
    gtypes, items = [], []
    for ti, (tn, en, sl, hands, rng, base, mat, tdesc) in enumerate(TYPES):
        gid = f'GTY_K{ti + 1:02d}'
        cat = 'ITC_WEAPON' if sl == 'WEAPON' else 'ITC_ARMOR' if sl in ('SUB', 'TOP', 'BOTTOM', 'PIECE') and tn != '마도서' else 'ITC_ACCESSORY'
        gtypes.append({'id': gid, 'name': tn, 'en': en, 'slot': SLOT[sl], 'hands': hands, 'range': rng or None, 'cat': cat, 'base': base, 'desc': tdesc})
        def item(name, g, desc, el=None, mul=1.0, named=False):
            it = {'id': f'IT_K{len(items) + 1:04d}', 'name': name, 'cat': cat, 'grade': f'IG_{g}', 'rarity': min(g, 5), 'slot': SLOT[sl], 'gtype': gid,
                  'twoHand': True if sl == 'WEAPON' and hands == 2 else None, 'onePiece': True if sl == 'PIECE' else None, 'special': True if sl == 'SPECIAL' else None,
                  'wtype' if sl in ('WEAPON', 'SUB') else 'atype': tn, 'range': rng or None, 'stat': statof(base, g, mul), 'el': 'EL_' + el if el else None,
                  'price': PRICE[g] and round(PRICE[g] * PMUL[sl] * (1.5 if named else 1) / 10000) * 10000, 'desc': desc, 'tags': [tn] + (['이름 있는 장비'] if named else []), 'src': 'claude'}
            items.append(it)
        for g in range(1, 6):
            for mname in MAT[mat][g - 1]:
                item(f'{mname} {tn}', g, f'{tdesc} {MATDESC[g]}')
        for (g, t2, nm, d, el) in NAMED:
            if t2 == tn: item(nm, g, d, el, 1.15, True)
    head = lambda w: f"/* game/data/content/{w} — tools/content/build.py 가 원고(tools/content/*_src.py)로 만든다. 직접 고치지 말고 원고를 고친 뒤 다시 만든다. */\n"
    def write(fn, parts):
        with open(os.path.join(OUT, fn), 'w', encoding='utf-8') as fp:
            fp.write(head(fn) + ''.join(f"def('{t}', [\n" + '\n'.join(rows) + "\n]);\n" for t, rows in parts))
    os.makedirs(OUT, exist_ok=True)
    write('k_moves.js', [('combatMoves', [row(m) for m in moves])])
    write('k_skills.js', [('skills', [row(s) for s in skills])])
    write('k_classes.js', [('classes', [row(c) for c in classes])])
    write('k_gear.js', [('gearTypes', [row(t) for t in gtypes]), ('items', [row(i, keep=('price',)) for i in items])])
    nc = sum(1 for s in skills if s['scope'] == 'class')
    print(f'클래스 {len(classes)} · 클래스 스킬 {nc} · 공용 스킬 {len(skills) - nc} · 전투 기술 {len(moves)} · 장비 갈래 {len(gtypes)} · 장비 {len(items)}')
    if orphan: print('어느 클래스에도 안 쓰인 스킬:', ', '.join(orphan))


if __name__ == '__main__':
    main()
