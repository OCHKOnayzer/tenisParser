import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

type ResultType = 'win' | 'total' | 'handicap';

interface Result {
    type: ResultType;
    player: number;
    period: string;
    over?: boolean;
    under?: boolean;
    count?: number;
}

interface ParsedResult {
    name1: string;
    name2: string;
    result: Result;
    rate: string;
}

export function parse(html: string): ParsedResult {
    const $ = cheerio.load(html);
    const targetElement = $('.data-cell--WgI9q');

    const firstDiv = targetElement.find('div').eq(0);
    const secondDiv = targetElement.find('div').eq(1);
    const thirdDiv = targetElement.find('div').eq(2);

    let name1 = '';
    let name2 = '';
    let rate = '';
    let result: Result = {
        type: 'handicap',
        player: 2,
        period: 'match',
    };

    const eventType = $('.coupon-cart-bet--FVlIe').text().toLowerCase();
    result.period = eventType.includes('сет') ? 'set' : 'match';

    const seb = $('.group--hAXBT').eq(1).text()

    const textSeb = seb.includes('Поб')

    let number = 0

   if(textSeb){ 
    const match = seb.match(/Поб\s*(\d+)/i);

    if (match) {
        number = parseInt(match[1], 10);
        console.log(number);
    } 
   }

    const playerNames = firstDiv.find('span');

    if (playerNames.length > 1) {
        name1 = playerNames.eq(0).text().trim();
        name2 = playerNames.eq(1).text().trim();
    } else {
        const combinedNames = firstDiv.text().trim();
        const nameParts = combinedNames.split(/–|-/).map(name => name.trim());

        if (nameParts.length === 2) {
            name1 = nameParts[0];
            name2 = nameParts[1];
        } else {
            firstDiv.contents().each(function () {
                if (this.nodeType === 3) {
                    const text = $(this).text().trim();
                    if (name1 === '') {
                        name1 = text;
                    } else {
                        name2 = text;
                    }
                }
            });
        }
    }

    if (name1 === '' || name2 === '') {
        const allText = firstDiv.text().trim();
        const nameParts = allText.split(/–|-/).map(name => name.trim());
        name1 = nameParts[0] || '';
        name2 = nameParts[1] || '';
    }

    name1 = name1.replace(/\s*\([^)]*\)/g, '').trim();
    name2 = name2.replace(/\s*\([^)]*\)/g, '').trim();

    if (name2.includes('(')) { 
        name2 = name2.replace('(', '').trim();
    }

    const resultText = $('.data-cell--WgI9q').text().toLowerCase();
    const match = resultText.match(/Поб(?:еда)?\s*(\d+)/);
    if (match) {
        console.log('hello world')
        result.player = parseInt(match[1], 10);
    }

    const searchPob = firstDiv.find('.group--hAXBT')

    if(searchPob.length > 0){ 
      console.log('hello world')
    }

    if (secondDiv) {
        const findMath = secondDiv.find('span').eq(1);
        let resultText = findMath ? findMath.text().trim() : '';
        resultText = resultText.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

        if (resultText.includes('>')) {
            result = {
                type: 'total',
                player: 0,
                period: result.period,
                over: true,
            };
        } else if (resultText.includes('<')) {
            result = {
                type: 'total',
                player: 0,
                period: result.period,
                under: true,
            };
        } else  if(textSeb){ 
          result = {
            type: 'win',
            player: number,
            period: 'match',
        };
        }
        else {
            result = {
                type: 'handicap',
                player: 1,
                period: result.period,
                over: true,
            };
        }

        const parameterSpan = firstDiv.find('.parameter--h05r6');
        const findParametr = secondDiv.find('.parameter--h05r6');
        let countText: string = '';
        
        if (parameterSpan.length > 0) {
            countText = parameterSpan.text().trim();
        } else if (findParametr.length > 0) {
            countText = findParametr.text().trim();
        }

        if (countText) {
            if (countText.includes('+')) {
                result.player = 1;
            } else if (countText.includes('-')) {
                result.player = 2;
            }
            result.count = parseFloat(countText.match(/[\d,.]+/)?.[0] || '0');
        }
    }

    if (thirdDiv) {
        rate = thirdDiv.find('span').eq(1).text().trim();
    }

    return {
        name1,
        name2,
        result,
        rate
    };
}

function parseHtmlFile(filePath: string) {
    fs.readFile(filePath, 'utf-8', (err, html) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const parsedResult = parse(html);

        // console.log(JSON.stringify(parsedResult, null, 2));
    });
}

const inputFilePath = path.join(__dirname, '../../tests/fora2/input.html');
parseHtmlFile(inputFilePath);