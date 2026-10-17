"""Import the user's DOCX answer key as supplied; do not reinterpret its answers."""
import argparse
import hashlib
import io
import json
from pathlib import Path
import re
import unicodedata
import xml.etree.ElementTree as ET
import zipfile

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
W = '{' + NS['w'] + '}'


def clean(text):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFC', text)).strip()


def paragraph(element):
    text, red = [], []
    for run in element.findall('.//w:r', NS):
        value = ''.join(node.text or '' for node in run.findall('.//w:t', NS))
        text.append(value)
        color = run.find('w:rPr/w:color', NS)
        if color is not None and color.get(W + 'val', '').upper() == 'FF0000':
            red.append(value)
    return {'text': clean(''.join(text)), 'red': clean(''.join(red))}


def read_questions(blob):
    with zipfile.ZipFile(io.BytesIO(blob)) as doc:
        root = ET.fromstring(doc.read('word/document.xml'))
    questions, current = [], None
    for element in root.find('w:body', NS):
        if element.tag == W + 'p':
            value = paragraph(element)
            # Some Word questions put the stem and all four options in one paragraph.
            if all(re.search(letter + r'\.\s', value['text']) for letter in 'ABCD'):
                positions, cursor = [], 0
                for letter in 'ABCD':
                    match = re.search(letter + r'\.\s', value['text'][cursor:])
                    position = cursor + match.start()
                    positions.append(position)
                    cursor = position + 2
                positions.append(len(value['text']))
                segments = [value['text'][:positions[0]]] + [value['text'][positions[i]:positions[i + 1]] for i in range(4)]
                values = [{'text': clean(part), 'red': clean(part) if clean(part) and clean(part) in value['red'] else ''} for part in segments if clean(part)]
            else:
                values = [value]
            for value in values:
                if re.match(r'^Câu\s*\d+\s*:', value['text']):
                    current = {'paragraphs': [], 'tables': []}
                    questions.append(current)
                if current is not None and value['text']:
                    current['paragraphs'].append(value)
        elif element.tag == W + 'tbl' and current is not None:
            current['tables'].append([
                [[paragraph(p) for p in cell.findall('w:p', NS)] for cell in row.findall('w:tc', NS)]
                for row in element.findall('w:tr', NS)
            ])
    return questions


def convert(article, raw):
    paragraphs = raw['paragraphs']
    result = {'article': article, 'text': clean(re.sub(r'Sinh viên chọn.*$', '', paragraphs[0]['text']))}
    if raw['tables']:
        assert len(raw['tables']) == 1, result
        rows = raw['tables'][0]
        assert all(len(row) == 2 for row in rows), result
        categorical = not any(p['red'] for cell in rows[0] for p in cell)
        options, targets, answer = [], [], {}
        if categorical:
            targets = [clean(' '.join(p['text'] for p in cell)) for cell in rows[0]]
            for index in range(2):
                answer[str(index)] = []
                for row in rows[1:]:
                    for p in row[index]:
                        if p['text']:
                            assert p['red'] == p['text'], (result, p)
                            answer[str(index)].append(str(len(options)))
                            options.append(p['text'])
        else:
            for index, row in enumerate(rows):
                target = clean(' '.join(p['text'] for p in row[0]))
                targets.append(re.sub(r'^\d+[.)]\s*', '', target))
                value = clean(' '.join(p['text'] for p in row[1] if p['text']))
                red = clean(' '.join(p['red'] for p in row[1] if p['red']))
                assert value and value == red, (result, row)
                answer[str(index)] = [str(len(options))]
                options.append(value)
        assert len(options) == len(set(options)), result
        return {**result, 'options': options, 'targets': targets, 'answer': answer, 'type': 'dragdrop'}
    choices = [p for p in paragraphs[1:] if re.match(r'^[A-D]\.', p['text'])]
    if choices:
        assert len(choices) >= 2, result
        answers = [p['text'][0] for p in choices if p['red']]
        assert answers, result
        assert [p['text'][0] for p in choices] == list('ABCD')[:len(choices)], result
        instructions = ' '.join(p['text'] for p in paragraphs if 'Sinh viên chọn' in p['text'])
        multiple = bool(instructions) or len(answers) > 1
        if multiple:
            count = re.search(r'chọn\s*(\d+)', instructions)
            if count:
                assert int(count[1]) == len(answers), result
            result['text'] += f' (Chọn {len(answers)} đáp án đúng)'
        return {**result, 'options': [p['text'] for p in choices], 'answer': answers if multiple else answers[0], 'type': 'multiple' if multiple else 'single'}
    statements, answers = [], []
    for p in paragraphs[1:]:
        if re.match(r'^\d+[.)]\s*', p['text']):
            statement = re.sub(r'^\d+[.)]\s*', '', p['text'])
            if p['red'] in ('Đúng', 'Sai') and statement.endswith(p['red']):
                statement = statement[:-len(p['red'])].strip()
                answers.append(p['red'])
            statements.append(statement)
        elif p['red'] in ('Đúng', 'Sai'):
            answers.append(p['red'])
        else:
            raise ValueError(f'Unexpected paragraph: {result}: {p}')
    assert statements and len(statements) == len(answers), result
    return {**result, 'options': statements, 'answer': answers, 'type': 'truefalse'}


def fingerprint(question):
    canonical = json.dumps(question, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(canonical.encode('utf8')).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('zip_path', type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    imported, documents = [], []
    with zipfile.ZipFile(args.zip_path) as archive:
        for name in sorted(archive.namelist()):
            if not name.endswith('.docx') or name.split('/')[-1].startswith('~$'):
                continue
            number = int(re.search(r'Bài\s*(\d+)', name)[1])
            blob = archive.read(name)
            group = [convert(f'Bài {number}', raw) for raw in read_questions(blob)]
            assert [int(re.match(r'Câu\s*(\d+)', q['text'])[1]) for q in group] == list(range(1, len(group) + 1))
            imported.extend(group)
            documents.append({'file': name, 'sha256': hashlib.sha256(blob).hexdigest(), 'questions': len(group)})
    assert len(imported) == 225 and len(documents) == 6
    source_path = root / 'questions.js'
    source = source_path.read_text(encoding='utf8')
    old = json.loads(re.sub(r'(?m)^\s*//.*$', '', source[source.index('['):source.rindex(']') + 1]))
    assert len(old) == len(imported)
    changes = []
    for previous, question in zip(old, imported):
        assert previous['article'] == question['article']
        if previous != question:
            changes.append(f"{question['article']} / {question['text'].split(':')[0]}")
    # Replace only the data bank; application features and supplementary questions stay intact.
    lines = ['export const questions = [']
    for index, question in enumerate(imported):
        if index == 0 or question['article'] != imported[index - 1]['article']:
            lines.append(f"  // ==================== {question['article'].upper()} ====================")
        encoded = json.dumps(question, ensure_ascii=False, indent=2)
        encoded = re.sub(r'("answer": )\[\n(.*?)\n  \]', lambda m: m[1] + '[' + ' '.join(line.strip() for line in m[2].splitlines()) + ']', encoded, flags=re.S)
        encoded = re.sub(r'("\d+": )\[\n(.*?)\n    \]', lambda m: m[1] + '[' + ' '.join(line.strip() for line in m[2].splitlines()) + ']', encoded, flags=re.S)
        lines.append('  ' + encoded.replace('\n', '\n  ') + (',' if index < len(imported) - 1 else ''))
    lines.append('];')
    source_path.write_text('\n'.join(lines) + '\n', encoding='utf8')
    manifest = {'source': args.zip_path.name, 'zipSha256': hashlib.sha256(args.zip_path.read_bytes()).hexdigest(), 'documents': documents,
                'questions': [{'article': q['article'], 'number': int(re.match(r'Câu\s*(\d+)', q['text'])[1]), 'sha256': fingerprint(q)} for q in imported]}
    fixture = root / 'fixtures' / 'cnxh-zip-answer-key.json'
    fixture.parent.mkdir(exist_ok=True)
    fixture.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(json.dumps({'questions': len(imported), 'changed': len(changes), 'source': str(args.zip_path)}, ensure_ascii=False))


if __name__ == '__main__':
    main()
