import * as cheerio from 'cheerio';

type ResultType = 'win' | 'total' | 'handicap';

interface Result {
    type: ResultType;
    player: number;
    period: string;
    over?: boolean;
    count?: number;
}

interface ParsedResult {
    name1: string;
    name2: string;
    result: Result;
    rate: string;
}

function parseFora2(html: string): ParsedResult {
    const $ = cheerio.load(html);
    const targetElement = $('.data-cell--WgI9q');

    const firstDiv = targetElement.find('div').eq(0);
    const secondDiv = targetElement.find('div').eq(1);
    const thirdDiv = targetElement.find('div').eq(2);

    let name1 = '';
    let name2 = '';

    const playerNames = firstDiv.find('span');

    const FindCount = firstDiv.find('.parameter--h05r6')

    let count = FindCount.text().trim().replace('-', '')

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

    name1 = name1.replace(/\s*\([^)]*\)/g, '').trim();
    name2 = name2.replace(/\s*\([^)]*\)/g, '').trim();

    let result: Result = {
        type: 'handicap',
        player: 2,
        period: 'match',
        over: true
    };

    // Определение типа события (match/set)
    const eventType = $('.coupon-cart-bet--FVlIe').text().toLowerCase();

    if (eventType.includes('сет')) {
        result.period = 'set';
    } else{
        result.period = 'match';
    }


    let rate = '';

    if (secondDiv) {
        const findMath = secondDiv.find('span').eq(1);
        let resultText = findMath ? findMath.text().trim() : '';

        resultText = resultText.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

        result = {
            type: 'handicap',
            player: 2,
            period: result.period,
            over:false,
            count:parseFloat(count)
        };
    }

    if (thirdDiv) {
        rate = thirdDiv.find('span').eq(1).text().trim();
    }

    const names = name2.split('–').map(name => name.trim());
    if (names.length === 2) {
        name1 = names[0];
        name2 = names[1];
    } else {
        name1 = '';
        name2 = name2;
    }

    return {
        name1,
        name2,
        result,
        rate
    };
}

export default parseFora2;
