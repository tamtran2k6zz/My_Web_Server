import json

# Read Bai 4 clean
with open('parsed_bai4_debug.json', 'r', encoding='utf-8') as f:
    bai4_raw = json.load(f)

bai4_processed = []
for i, q in enumerate(bai4_raw):
    q_text = q['text'].strip()
    is_multi = '(chọn 2 đáp án' in q_text.lower() or '(hãy chọn 2 đáp án' in q_text.lower() or '(chọn nhiều' in q_text.lower()
    
    options = []
    correct_indices = []
    
    for opt_idx, opt in enumerate(q['options']):
        opt_text = opt['text'].strip()
        options.append(opt_text)
        if opt['has_color'] or opt['has_underline'] or opt['has_highlight'] or (opt['has_bold'] and not any(o['has_color'] for o in q['options'])):
            correct_indices.append(opt_idx)
            
    if is_multi:
        ans = [chr(65 + idx) for idx in correct_indices]
        q_type = 'multiple'
    else:
        ans = chr(65 + correct_indices[0]) if correct_indices else 'A'
        q_type = 'single'
        
    bai4_processed.append({
        'article': 'Bài 4',
        'text': q_text,
        'options': options,
        'answer': ans,
        'type': q_type
    })

# Read existing questions from questions.js (Part 1, Part 2, Part 3)
with open('questions.js', 'r', encoding='utf-8') as f:
    old_code = f.read()

# Let's extract Part 1, 2, 3 and the 12 new questions
# We can read questions.js with python / node
