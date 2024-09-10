import * as fs from 'fs';
import * as cheerio from 'cheerio';
import * as path from 'path';

function parseFunction(): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.readFile('../tests/M/input.html', 'utf-8', (err, html) => {
            if (err) {
                reject(err);
                return;
            }
            
            const $ = cheerio.load(html);
            const targetElement = $('.data-cell--WgI9q');
        
            const firstDiv = targetElement.find('div').eq(0);
            const secondDiv = targetElement.find('div').eq(1);
            const thirdDiv = targetElement.find('div').eq(2);
        
            const playerNames = firstDiv.find('span');
            let secondSpanText: string;
        
            if (playerNames.length > 0) {
                let text = '';
                firstDiv.contents().each(function () {
                    if (this.nodeType === 3) {
                        text += $(this).text().trim() + ' ';
                    } else if (this.nodeType === 1 && $(this).is('span') && $(this).find('svg').length === 0) {
                        text += $(this).text().trim() + ' ';
                    }
                });
                secondSpanText = text.trim();
            } else {
                secondSpanText = firstDiv.contents().filter(function () {
                    return this.nodeType === 3;
                }).text().trim();
            }
        
            const findParametrs = secondDiv.find('.parameter--h05r6');
            const findMath = secondDiv.find('span').eq(1);
        
            let textContent: string;
        
            if (findParametrs.length > 0) { 
                textContent = findMath.text().trim();
                if (textContent.includes('&gt;') || textContent.includes('&lt;')) {
                    textContent = textContent
                        .replace(/&gt;/g, '>')
                        .replace(/&lt;/g, '<');
                }
            } else { 
                textContent = secondDiv.contents().filter(function () {
                    return this.nodeType === 3; 
                }).text().trim();
            }
        
            let kefchik: string = '';
            kefchik = thirdDiv.find('span').eq(1).text().trim();
        
            const result = {
                gamers: secondSpanText,
                result: textContent,
                kaficient: kefchik
            };
        
            const outputDir = '../tests/M';
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }
        
            const outputFilePath = path.join(outputDir, 'output.json');
        
            fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });
}
parseFunction()
export default parseFunction;
