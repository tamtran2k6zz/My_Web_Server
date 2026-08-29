import json

with open('parsed_bai4_debug.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

with open('scratch/answers_formatted.txt', 'w', encoding='utf-8') as out:
    for i, q in enumerate(questions):
        out.write(f"=== Q{i+1} ===\n")
        out.write(f"{q['text']}\n")
        for opt in q['options']:
            flags = []
            if opt['has_underline']: flags.append('UNDERLINE')
            if opt['has_highlight']: flags.append('HIGHLIGHT')
            if opt['has_color']: flags.append('COLOR')
            if opt['has_bold']: flags.append('BOLD')
            flag_str = f" [{', '.join(flags)}]" if flags else ""
            out.write(f"  {opt['text']}{flag_str}\n")
        out.write("\n")

print("Wrote answers_formatted.txt successfully")
