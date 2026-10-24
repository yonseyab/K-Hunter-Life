#!/usr/bin/env python3
"""tools/content/build.py — 클래스 · 스킬 원고(src/*.txt)를 게임 데이터(game/data/content/*.js)로 만든다.
원고는 사람이 쓰는 문장(이름 · 설명 · 버릇 · 전투 문장)만 담고, 수치(비용 · 재사용 · 등급 · AI …)는 여기 규칙으로 채운다.
실행: python3 tools/content/build.py   (그 뒤 node tools/validate_data.js)

원고 형식 ─ 클래스 (src/class_*.txt)
  @ 이름 | 영문 | 분류(MELEE·RANGED·MAGIC·SUPPORT·SPECIAL·CRAFT) | 역할들(TANK,MDPS…, 첫째가 대표) | 희귀도 1~5 | 거리 melee·near·far | 힘 stamina·mp | 속성(EL_… 또는 -) | 무기 갈래들 | 방어구 갈래들
  alias: 가, 나          desc: 한 줄          lore: 2~3문장
  jobs: 가 / 나 / 다      habits: 가 / 나 / 다
  awaken: 가 / 나        levelup: 가 / 나     idle: 가 / 나
  keys: A04 A01 …       stats: 신체 정신 마력 감각      social: fame pay demand      gear: WEAPON ARMOR …
  스킬: #P(각성 후보 6) · #S(기본 패시브 1) · #L10 · #L25 · #L45 (레벨 습득 3)
  #P 이름 | 영문 | A·P | 대상 | 거리 | 효과 토큰들
     d: 설명   l: 한 줄 이야기   u: 쓰는 문장 / 쓰는 문장   h: 명중   m: 빗나감   c: 치명   f: 실패   s: 부작용
원고 형식 ─ 공용 스킬 (src/common_*.txt)
  #C 묶음(SURVIVE…) 이름 | 영문 | A·P | 대상 | 거리 | 효과 토큰들   (+ 같은 d: l: u: …)
효과 토큰: atk1.2 heal0.8 shield0.6 hits3 area3 se:SE_BLEED@0.5:2 el:EL_FIRE buff:def=1.2,atk=1.1 cleanse:SE_POISON,SE_BURN
          move:dash stance toggle daily mp stamina acc+1 crit+2 scale:STAT_MIND sense debuff util def
"""
import re, json, os, glob, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_gear

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, '..', '..', 'game', 'data', 'content')
CAT = {'MELEE': 'CC_MELEE', 'RANGED': 'CC_RANGED', 'MAGIC': 'CC_MAGIC', 'SUPPORT': 'CC_SUPPORT', 'SPECIAL': 'CC_SPECIAL', 'CRAFT': 'CC_CRAFT'}
ROLE = lambda r: 'ROLE_' + r
STATS = ['STAT_BODY', 'STAT_MIND', 'STAT_MANA', 'STAT_SENSE']
ROLEFX = {'TANK': (45, 8, 1.3, .8), 'MDPS': (36, 10, 1.15, .85), 'RDPS': (30, 12, 1.0, .9), 'MAGE': (24, 22, .85, 1.3),
          'HEAL': (28, 20, .9, 1.2), 'SUP': (28, 18, .95, 1.15), 'SCOUT': (30, 12, 1.0, .95)}
MASTERY = {'CC_MELEE': ['손에 익지 않음', '몸이 기억함', '숨 쉬듯', '경지'], 'CC_RANGED': ['흔들림', '안정', '정밀', '백발백중'],
           'CC_MAGIC': ['불안정', '제어', '정교', '자재'], 'CC_SUPPORT': ['서툶', '익숙함', '능숙함', '자연스러움'],
           'CC_SPECIAL': ['어설픔', '감 잡음', '능숙함', '그림자 같음'], 'CC_CRAFT': ['견습', '숙련', '장인', '명장'], 'common': ['초보', '익숙함', '능숙함', '몸에 밴']}
COMMON_CAT = {'SURVIVE': 'SKC_SURVIVE', 'COMBAT': 'SKC_COMBAT', 'SENSE': 'SKC_SENSE', 'HEAL': 'SKC_HEAL', 'MOVE': 'SKC_MOVE', 'MIND': 'SKC_MIND', 'SOCIAL': 'SKC_SOCIAL', 'LIFE': 'SKC_LIFE'}
COMMON_SCALE = {'SKC_SURVIVE': ('STAT_BODY', 'ABL_B35'), 'SKC_COMBAT': ('STAT_BODY', 'ABL_A06'), 'SKC_SENSE': ('STAT_SENSE', 'ABL_A24'), 'SKC_HEAL': ('STAT_MIND', 'ABL_B37'),
                'SKC_MOVE': ('STAT_BODY', 'ABL_A03'), 'SKC_MIND': ('STAT_MIND', 'ABL_B14'), 'SKC_SOCIAL': ('STAT_MIND', 'ABL_B15'), 'SKC_LIFE': ('STAT_MIND', 'ABL_B38')}
TAGK = {'atk': '공격', 'heal': '회복', 'shield': '보호막', 'def': '방어', 'buff': '강화', 'debuff': '약화', 'move': '이동', 'sense': '감지', 'util': '보조', 'daily': '생활'}
SLOT = {'P': (1, 10), 'S': (1, 10), 'L10': (2, 15), 'L25': (3, 15), 'L45': (4, 20)}


def js(v):
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return (str(int(v)) if float(v).is_integer() else str(round(v, 3)))
    if isinstance(v, str): return "'" + v.replace('\\', '\\\\').replace("'", "\\'") + "'"
    if isinstance(v, list): return '[' + ', '.join(js(x) for x in v) + ']'
    if isinstance(v, dict): return '{' + ', '.join(f'{k}:{js(x)}' for k, x in v.items()) + '}'
    raise TypeError(v)


def row(o): return '  {' + ', '.join(f'{k}:{js(v)}' for k, v in o.items() if v not in (None, '', [], {})) + '},'


def split(v): return [x.strip() for x in v.split('/') if x.strip()]


def parse_effects(tokens):
    e = {'types': [], 'power': 0, 'se': [], 'cleanse': []}
    for t in tokens:
        m = re.match(r'^(atk|heal|shield)([\d.]+)$', t)
        if m: e['types'].append(m.group(1)); e[m.group(1)] = float(m.group(2)); continue
        m = re.match(r'^(hits|area|count)(\d+)$', t)
        if m: e[m.group(1)] = int(m.group(2)); continue
        m = re.match(r'^se:(SE_\w+)@([\d.]+)(?::(\d+))?$', t)
        if m: x = {'se': m.group(1), 'chance': float(m.group(2))}; e['se'].append(x | ({'turns': int(m.group(3))} if m.group(3) else {})); continue
        m = re.match(r'^el:(EL_\w+)$', t)
        if m: e['el'] = m.group(1); continue
        m = re.match(r'^buff:(.+)$', t)
        if m: e['buff'] = {k: float(v) for k, v in (p.split('=') for p in m.group(1).split(','))}; e['types'].append('buff'); continue
        m = re.match(r'^cleanse:(.+)$', t)
        if m: e['cleanse'] = m.group(1).split(','); continue
        m = re.match(r'^move:(\w+)$', t)
        if m: e['move'] = m.group(1); e['types'].append('move'); continue
        m = re.match(r'^(acc|crit)([+-]\d+)$', t)
        if m: e[m.group(1)] = int(m.group(2)); continue
        m = re.match(r'^scale:(\w+)$', t)
        if m: e['scale'] = m.group(1); continue
        if t in ('stance', 'toggle', 'daily'): e[t] = True; e['types'].append('daily') if t == 'daily' else None; continue
        if t in ('mp', 'stamina'): e['res'] = t; continue
        if t in ('sense', 'debuff', 'util', 'def'): e['types'].append(t); continue
        raise ValueError('효과 토큰 모름: ' + t)
    if e['se'] and not any(x in e['types'] for x in ('atk',)) and 'debuff' not in e['types'] and any(not s['se'].startswith('SE_B_') for s in e['se']): pass
    return e


def parse(path):
    """원고 → [{kind:'class'|'common', head, fields, skills:[…]}]"""
    blocks, cur, sk = [], None, None
    for raw in open(path, encoding='utf-8'):
        line = raw.rstrip('\n')
        if not line.strip() or line.lstrip().startswith('//'): continue
        if line.startswith('@'):
            cur = {'kind': 'class', 'head': [x.strip() for x in line[1:].split('|')], 'f': {}, 'skills': []}; blocks.append(cur); sk = None; continue
        m = re.match(r'^#(P|S|L10|L25|L45|C)\s+(.*)$', line)
        if m:
            slot, rest = m.group(1), m.group(2)
            if slot == 'C':
                ccat, rest = rest.split(None, 1)
                cur = {'kind': 'common', 'cat': COMMON_CAT[ccat], 'skills': []}; blocks.append(cur)
            parts = [x.strip() for x in rest.split('|')]
            sk = {'slot': slot, 'name': parts[0], 'en': parts[1], 'ap': parts[2], 'target': parts[3], 'range': parts[4], 'fx': parse_effects(parts[5].split() if len(parts) > 5 else []), 'f': {}}
            cur['skills'].append(sk); continue
        m = re.match(r'^\s*(\w+):\s?(.*)$', line)
        if not m: raise ValueError(f'{path}: 읽을 수 없는 줄: {line}')
        k, v = m.group(1), m.group(2).strip()
        (sk['f'] if sk is not None else cur['f'])[k] = v
    return blocks


def skill_row(s, sid, owner, scope):
    """owner: 클래스 dict(클래스 스킬) 또는 None(공용)"""
    fx, f, ap = s['fx'], s['f'], s['ap']
    active = ap == 'A'
    cat = owner['cat'] if owner else 'common'
    tier, maxLv = SLOT.get(s['slot'], (1, 10))
    res = fx.get('res') or (owner['resource'] if owner else 'stamina')
    power = fx.get('atk', 0)
    area = fx.get('area', 3 if s['target'] in ('enemies', 'allies', 'area') else 1)
    types = fx['types'] or (['util'])
    o = {'id': sid, 'name': s['name'], 'en': s['en'], 'scope': scope, 'kind': '액티브' if active else '패시브'}
    if owner: o['cls'] = owner['id']
    else: o['cat'] = s['cat']
    o['grade'] = tier; o['rarity'] = min(5, (owner['rarity'] if owner else 1) + (tier - 1 if s['slot'].startswith('L') else 0)); o['tier'] = tier
    o['desc'] = f['d']; o['lore'] = f.get('l', '')
    o['target'] = s['target']; o['range'] = s['range']; o['area'] = area; o['hits'] = fx.get('hits', 1); o['count'] = fx.get('count', area if s['target'] in ('enemies', 'allies', 'area') else 1)
    if active:
        cd = 2 + round(power * 1.5) + (1 if area > 1 else 0) + (tier - 1) + (1 if 'heal' in types or 'shield' in types else 0)
        amount = round((8 if res == 'stamina' else 10) + power * (8 if res == 'stamina' else 12) + (area - 1) * 3 + (tier - 1) * 4 + fx.get('heal', 0) * 10 + fx.get('shield', 0) * 8)
        o['cost'] = {res: amount, 'cd': cd}
    o['power'] = power
    if power:
        o['kind2'] = 'AK_MAGIC' if (res == 'mp' and (fx.get('el') or cat in ('CC_MAGIC', 'CC_SUPPORT', 'CC_SPECIAL'))) else ('AK_RANGED' if s['range'] == 'far' else 'AK_MELEE')
    if fx.get('el'): o['el'] = fx['el']
    if owner:
        o['scale'] = fx.get('scale') or owner['topStat']; o['scale2'] = owner['keys'][0]
    else:
        sc = COMMON_SCALE[s['cat']]; o['scale'] = fx.get('scale') or sc[0]; o['scale2'] = sc[1]
    o['acc'] = fx.get('acc', 0); o['crit'] = fx.get('crit', 0)
    if 'heal' in fx: o['heal'] = fx['heal']
    if 'shield' in fx: o['shield'] = fx['shield']
    if fx['se']: o['se'] = fx['se']
    if fx['cleanse']: o['cleanse'] = fx['cleanse']
    if fx.get('buff'): o['buff'] = fx['buff'] | {'turns': 3}
    if fx.get('move'): o['move'] = fx['move']
    if fx.get('stance'): o['stance'] = True
    if fx.get('toggle'): o['toggle'] = True
    o['maxLv'] = maxLv
    if active: o['growth'] = {'power': 0.05, 'cd': -0.05} if power else ({'power': 0.04} if ('heal' in fx or 'shield' in fx) else {'cost': -0.1})
    o['mastery'] = MASTERY[cat]
    if s['slot'].startswith('L'): o['req'] = {'lv': int(s['slot'][1:])}
    ai = {}
    if active:
        if 'heal' in fx or 'cleanse' in fx and fx['cleanse']: ai['allyHurt'] = True
        if 'shield' in fx or 'def' in types: ai['hpBelow'] = 0.5
        if fx.get('move') == 'retreat': ai['hpBelow'] = 0.3
        if area > 1 and power: ai['enemies'] = 3
        if 'buff' in types or 'sense' in types: ai['opener'] = True
        if 'debuff' in types: ai['boss'] = True
        if not ai: ai['enemies'] = 1
    if ai: o['ai'] = ai
    tags = [TAGK[t] for t in dict.fromkeys(types) if t in TAGK]
    if fx.get('el'): tags.append(ELNAME.get(fx['el'], ''))
    o['tags'] = [t for t in tags if t]
    o['risk'] = min(5, 1 + (power >= 1.5) + (area > 1 and power > 0) + (fx.get('move') == 'dash') + (tier >= 4))
    if f.get('s'): o['side'] = split(f['s'])
    if fx.get('daily'): o['daily'] = True
    lines = {}
    if f.get('u'): lines['use'] = split(f['u'])
    for k, n in (('h', 'hit'), ('m', 'miss'), ('c', 'crit'), ('f', 'fail')):
        if f.get(k): lines[n] = split(f[k])
    o['lines'] = lines
    o['src'] = 'claude'
    return o


ELNAME = {}


def main():
    global ELNAME
    comb = open(os.path.join(OUT, 'k_combat.js'), encoding='utf-8').read()
    ELNAME = dict(re.findall(r"id:'(EL_\w+)', name:'([^']+)'", comb))
    classes, skills, commons = [], [], []
    ci, si = 0, 0
    for path in sorted(glob.glob(os.path.join(ROOT, 'src', 'class_*.txt'))):
        for b in parse(path):
            h = b['head']; ci += 1; f = b['f']
            name, en, cat, roles, rarity, rng, res, el, weapons, armors = h
            roles = [ROLE(r) for r in roles.split(',')]
            st = [int(x) for x in f['stats'].split()]
            stats = {STATS[i]: v for i, v in enumerate(st) if v}
            top = STATS[max(range(4), key=lambda i: st[i])]
            keys = ['ABL_' + k for k in f['keys'].split()]
            cid = f'CLS_K{ci:02d}'
            c = {'id': cid, 'cat': CAT[cat], 'rarity': int(rarity), 'resource': res, 'topStat': top, 'keys': keys}
            pool, passive, learn = [], [], []
            for s in b['skills']:
                si += 1; sid = f'SK_K{si:04d}'
                skills.append(skill_row(s, sid, c, 'class'))
                if s['slot'] == 'P': pool.append(sid)
                elif s['slot'] == 'S': passive.append(sid)
                else: learn.append({'skill': sid, 'lv': int(s['slot'][1:])})
            assert len(pool) == 6 and len(passive) == 1 and len(learn) == 3, (name, len(pool), len(passive), len(learn))
            # 연계: 공격 스킬은 같은 클래스의 다른 성격 액티브 하나와 잇는다
            mine = skills[-10:]
            for s in mine:
                if s['kind'] != '액티브': continue
                other = next((x for x in mine if x is not s and x['kind'] == '액티브' and (x['power'] > 0) != (s['power'] > 0)), None)
                if other: s['combo'] = [other['id']]
            rf = ROLEFX[roles[0][5:]]
            fame, pay, demand = f['social'].split()
            classes.append({'id': cid, 'name': name, 'alias': [x.strip() for x in f.get('alias', '').split(',') if x.strip()], 'en': en, 'cat': CAT[cat], 'tier': 1, 'rarity': int(rarity),
                            'desc': f['desc'], 'lore': f['lore'], 'role': roles[0], 'roles': roles, 'range': rng, 'resource': res, 'el': None if el == '-' else el,
                            'pick': 2, 'pool': pool, 'passive': passive, 'learn': learn, 'stats': stats, 'keys': keys, 'growth': {'hp': rf[0], 'mp': rf[1]}, 'hpMul': rf[2], 'mpMul': rf[3],
                            'statReq': {top: 11 + int(rarity)}, 'ablReq': {keys[0]: 7 + int(rarity)}, 'gear': ['ITC_' + g for g in f['gear'].split()],
                            'weapons': [x.strip() for x in weapons.split(',') if x.strip()], 'armors': [x.strip() for x in armors.split(',') if x.strip()],
                            'fame': fame, 'pay': float(pay), 'demand': int(demand), 'jobs': split(f['jobs']), 'habits': [x if x.endswith(('.','!','?')) else x+'.' for x in split(f['habits'])],
                            'lines': {'awaken': split(f['awaken']), 'levelUp': split(f['levelup']), 'idle': split(f['idle'])}, 'src': 'claude'})
    ki = 1000
    for path in sorted(glob.glob(os.path.join(ROOT, 'src', 'common_*.txt'))):
        for b in parse(path):
            for s in b['skills']:
                ki += 1; s['cat'] = b['cat']
                commons.append(skill_row(s, f'SK_K{ki:04d}', None, 'common'))
    # 장비: 클래스의 무기 · 방어구 이름을 장비 갈래(gearTypes)로 맞춘다
    gtypes, gitems, galias = build_gear.build()
    for c in classes:
        gt = []
        for key in ('weapons', 'armors'):
            names = []
            for w in c[key]:
                t = galias.get(w)
                if not t: print('  장비 갈래 없음:', c['name'], w); continue
                if t['name'] not in names: names.append(t['name'])
                if t['id'] not in gt: gt.append(t['id'])
            c[key] = names
        c['gearTypes'] = gt
        for t in gtypes:
            if t['id'] in gt: t.setdefault('classes', []).append(c['id'])
    head = lambda what: f"/* game/data/content/{what} — tools/content/build.py 가 원고(tools/content/src)로 만든다. 직접 고치지 말고 원고를 고친 뒤 다시 만든다. */\n"
    with open(os.path.join(OUT, 'k_classes.js'), 'w', encoding='utf-8') as fp:
        fp.write(head('k_classes.js') + "def('classes', [\n" + '\n'.join(row(c) for c in classes) + "\n]);\n")
    with open(os.path.join(OUT, 'k_skills.js'), 'w', encoding='utf-8') as fp:
        fp.write(head('k_skills.js') + "def('skills', [\n" + '\n'.join(row(s) for s in skills) + "\n]);\n")
    with open(os.path.join(OUT, 'k_common.js'), 'w', encoding='utf-8') as fp:
        fp.write(head('k_common.js') + "def('skills', [\n" + '\n'.join(row(s) for s in commons) + "\n]);\n")
    with open(os.path.join(OUT, 'k_gear.js'), 'w', encoding='utf-8') as fp:
        fp.write(head('k_gear.js') + "def('gearTypes', [\n" + '\n'.join(row({k: v for k, v in t.items()}) for t in gtypes) + "\n]);\n"
                 + "def('items', [\n" + '\n'.join(row(i) if i['price'] is not None else row(i)[:-2] + ', price:null},' for i in gitems) + "\n]);\n")
    print(f'장비 갈래 {len(gtypes)} · 장비 {len(gitems)}')
    print(f'클래스 {len(classes)} · 클래스 스킬 {len(skills)} · 공용 스킬 {len(commons)}')


if __name__ == '__main__':
    main()
