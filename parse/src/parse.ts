import * as fs from 'fs';
import * as path from 'path';
import parseFunction from './parseFunction';

type ParseType = 'fora1' | 'fora2' | 'B' | 'M' | '1' | '2' |'setFora1'|'setFora2'| 'setTotalB' | 'setTotalM';

function parseFile(type: ParseType) {
    const htmlPath: string = path.resolve(__dirname, `../../tests/${type}/input.html`);

    fs.readFile(htmlPath, 'utf-8', (err, html) => {
        if (err) {
            console.error('Ошибка чтения файла:', err);
            return;
        }

        const result = parseFunction(html, type);
        console.log('Результат парсинга:', JSON.stringify(result, null, 2));
    });
}

parseFile('2');
