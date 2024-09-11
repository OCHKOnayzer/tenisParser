import * as fs from 'fs';
import * as path from 'path';
import parseFora1 from './parsService/fora1ParseService';
import parseFora2 from './parsService/fora2ParseServce';
import parseB from './parsService/BParsingService';
import parseM from './parsService/MParsServise';
import parseWIN1 from './parsService/win1';
import parseWIN2 from './parsService/win2';

const parserMap: Record<string, (html: string) => any> = {
  fora1: parseFora1,
  setFora1: parseFora1,
  fora2: parseFora2,
  setFora2: parseFora2,
  B: parseB,
  setTotalB: parseB,
  M: parseM,
  setTotalM: parseM,
  '1': parseWIN1,
  '2': parseWIN2
};

function runSingleParser(type: string) {
  const parseFunction = parserMap[type];
  if (!parseFunction) {
    console.error(`Парсер для типа ${type} не найден.`);
    return;
  }

  const htmlPath = path.resolve(__dirname, `../../tests/${type}/input.html`);
  fs.readFile(htmlPath, 'utf-8', (err, html) => {
    if (err) {
      console.error(`Ошибка чтения файла ${htmlPath}:`, err);
      return;
    }
    const result = parseFunction(html); // функция так же принимает только html
    console.log(`Результат парсинга для ${type}:`, JSON.stringify(result, null, 2));
  });
}

runSingleParser('1');
