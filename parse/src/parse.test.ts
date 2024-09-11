import * as fs from 'fs';
import * as path from 'path';
import { parse } from './parse';

const inputHtmlFora1 = fs.readFileSync(path.resolve(__dirname, '../../tests/fora1/input.html'), 'utf-8');
const expectedOutputFora1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/fora1/output.json'), 'utf-8'));

const inputHtmlSetFora1 = fs.readFileSync(path.resolve(__dirname, '../../tests/setFora1/input.html'), 'utf-8');
const expectedOutputSetFora1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/setFora1/output.json'), 'utf-8'));

const inputHtmlFora2 = fs.readFileSync(path.resolve(__dirname, '../../tests/fora2/input.html'), 'utf-8');
const expectedOutputFora2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/fora2/output.json'), 'utf-8'));

const inputHtmlSetFora2 = fs.readFileSync(path.resolve(__dirname, '../../tests/setFora2/input.html'), 'utf-8');
const expectedOutputSetFora2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/setFora2/output.json'), 'utf-8'));

const inputHtmlB = fs.readFileSync(path.resolve(__dirname, '../../tests/B/input.html'), 'utf-8');
const expectedOutputB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/B/output.json'), 'utf-8'));

const inputHtmlSetTotalB = fs.readFileSync(path.resolve(__dirname, '../../tests/setTotalB/input.html'), 'utf-8');
const expectedOutputSetTotalB = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/setTotalB/output.json'), 'utf-8'));

const inputHtmlM = fs.readFileSync(path.resolve(__dirname, '../../tests/M/input.html'), 'utf-8');
const expectedOutputM = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/M/output.json'), 'utf-8'));

const inputHtmlSetTotalM = fs.readFileSync(path.resolve(__dirname, '../../tests/setTotalM/input.html'), 'utf-8');
const expectedOutputSetTotalM = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/setTotalM/output.json'), 'utf-8'));

const inputHtml1 = fs.readFileSync(path.resolve(__dirname, '../../tests/1/input.html'), 'utf-8');
const expectedOutput1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/1/output.json'), 'utf-8'));

const inputHtml2 = fs.readFileSync(path.resolve(__dirname, '../../tests/2/input.html'), 'utf-8');
const expectedOutput2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/2/output.json'), 'utf-8'));

// В каждом тесте только parse и сравнение
test('should correctly parse fora1', () => {
  const parsedResult = parse(inputHtmlFora1);
  expect(parsedResult).toEqual(expectedOutputFora1);
});

test('should correctly parse setFora1', () => {
  const parsedResult = parse(inputHtmlSetFora1);
  expect(parsedResult).toEqual(expectedOutputSetFora1);
});

test('should correctly parse fora2', () => {
  const parsedResult = parse(inputHtmlFora2);
  expect(parsedResult).toEqual(expectedOutputFora2);
});

test('should correctly parse setFora2', () => {
  const parsedResult = parse(inputHtmlSetFora2);
  expect(parsedResult).toEqual(expectedOutputSetFora2);
});

test('should correctly parse B', () => {
  const parsedResult = parse(inputHtmlB);
  expect(parsedResult).toEqual(expectedOutputB);
});

test('should correctly parse setTotalB', () => {
  const parsedResult = parse(inputHtmlSetTotalB);
  expect(parsedResult).toEqual(expectedOutputSetTotalB);
});

test('should correctly parse M', () => {
  const parsedResult = parse(inputHtmlM);
  expect(parsedResult).toEqual(expectedOutputM);
});

test('should correctly parse setTotalM', () => {
  const parsedResult = parse(inputHtmlSetTotalM);
  expect(parsedResult).toEqual(expectedOutputSetTotalM);
});

test('should correctly parse 1', () => {
  const parsedResult = parse(inputHtml1);
  expect(parsedResult).toEqual(expectedOutput1);
});
test('should correctly parse 2', () => {
    const parsedResult = parse(inputHtml2);
    expect(parsedResult).toEqual(expectedOutput2);
});