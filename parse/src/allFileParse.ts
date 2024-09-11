// НЕОБЯЗАТЕЛЬНЯ просто парсит все сразу для копипаста

import * as fs from 'fs';
import * as path from 'path';
import parseFora1 from './parsService/fora1ParseService';
import parseFora2 from './parsService/fora2ParseServce';
import parseB from './parsService/BParsingService';
import parseM from './parsService/MParsServise';
import parseWIN1 from './parsService/win1';
import parseWIN2 from './parsService/win2';

const parsers = [
  { parseFunction: parseFora1, inputFiles: ['fora1', 'setFora1'] },
  { parseFunction: parseFora2, inputFiles: ['fora2', 'setFora2'] },
  { parseFunction: parseB, inputFiles: ['B', 'setTotalB'] },
  { parseFunction: parseM, inputFiles: ['M', 'setTotalM'] },
  { parseFunction: parseWIN1, inputFiles: ['1'] },
  { parseFunction: parseWIN2, inputFiles: ['2'] },
];

export default function runAllParsers() {
  parsers.forEach(({ parseFunction, inputFiles }) => {
    inputFiles.forEach(fileType => {
      const htmlPath = path.resolve(__dirname, `../../tests/${fileType}/input.html`);
      fs.readFile(htmlPath, 'utf-8', (err, html) => {
        if (err) {
          console.error(`Ошибка чтения файла ${htmlPath}:`, err);
          return;
        }
        const result = parseFunction(html);
        console.log(`Результат парсинга для ${fileType}:`, JSON.stringify(result, null, 2));
      });
    });
  });
}

runAllParsers();
