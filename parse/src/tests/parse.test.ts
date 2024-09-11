import * as fs from 'fs';
import * as path from 'path';
import parseFora1 from '../parsService/fora1ParseService';
import parseFora2 from '../parsService/fora2ParseServce';
import parseB from '../parsService/BParsingService';
import parseM from '../parsService/MParsServise';
import parseWIN1 from '../parsService/win1';
import parseWIN2 from '../parsService/win2';

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

function testFunction(parserType: string) {
  const parseFunction = parserMap[parserType];
  if (!parseFunction) {
    throw new Error(`Парсер для ${parserType} не найден.`);
  }

  const htmlPath = path.resolve(__dirname, `../../../tests/${parserType}/input.html`);
  const outputFilePath = path.resolve(__dirname, `../../../tests/${parserType}/output.json`);

  console.log(`HTML Path: ${htmlPath}`);
  console.log(`Output Path: ${outputFilePath}`);

  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  const expectedResult = JSON.parse(fs.readFileSync(outputFilePath, 'utf-8'));

  const result = parseFunction(html);// функция принимает только html

  expect(result).toEqual(expectedResult);
}

test('should correctly parse fora1', () => {
    testFunction('fora1');
});

test('should correctly parse setFora1', () => {
    testFunction('setFora1');
});

test('should correctly parse fora2', () => {
    testFunction('fora2');
});

test('should correctly parse setFora2', () => {
    testFunction('setFora2');
});

test('should correctly parse B', () => {
    testFunction('B');
});

test('should correctly parse setTotalB', () => {
    testFunction('setTotalB');
});

test('should correctly parse M', () => {
    testFunction('M');
});

test('should correctly parse setTotalM', () => {
    testFunction('setTotalM');
});

test('should correctly parse 1', () => {
    testFunction('1');
});

test('should correctly parse 2', () => {
    testFunction('2');
});