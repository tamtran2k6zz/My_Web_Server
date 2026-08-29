import json

# Load parsed bai4
with open('parsed_bai4_debug.json', 'r', encoding='utf-8') as f:
    bai4_raw = json.load(f)

bai4_processed = []

for i, q in enumerate(bai4_raw):
    q_text = q['text'].strip()
    # Check if multiple choice or single choice
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

print(f"Processed {len(bai4_processed)} questions for Bai 4")
for q in bai4_processed:
    print(f"[{q['type']}] {q['text'][:40]}... -> {q['answer']}")

with open('scratch/bai4_clean.json', 'w', encoding='utf-8') as f:
    json.dump(bai4_processed, f, ensure_ascii=False, indent=2)
