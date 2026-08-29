import json

with open('docx_analysis_bai4.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

questions = []
cur_q = None

for item in data:
    text = item['text']
    runs = item['runs']
    if text.startswith('Câu ') or text.startswith('CÂU '):
        if cur_q:
            questions.append(cur_q)
        cur_q = {
            'text': text,
            'options': [],
            'correct': []
        }
    elif cur_q is not None:
        has_underline = any(r.get('u') for r in runs)
        has_highlight = any(r.get('highlight') for r in runs)
        has_color = any(r.get('color') and r.get('color') not in ('000000', 'auto', '333333', '222222') for r in runs)
        has_bold = any(r.get('bold') for r in runs)
        
        # Check if text is underlined or colored or highlighted or bold
        # Let's inspect details
        cur_q['options'].append({
            'text': text,
            'has_underline': has_underline,
            'has_highlight': has_highlight,
            'has_color': has_color,
            'has_bold': has_bold,
            'details': [(r['text'], r['bold'], r['u'], r['color'], r['highlight']) for r in runs]
        })

if cur_q:
    questions.append(cur_q)

with open('parsed_bai4_debug.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f'Total questions: {len(questions)}')
