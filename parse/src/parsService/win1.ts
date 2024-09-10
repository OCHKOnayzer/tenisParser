import * as cheerio from 'cheerio';

type ResultType = 'win' | 'total' | 'handicap';

interface Result {
    type: ResultType;
    player: number;
    period: string;
}

interface ParsedResult {
    name1: string;
    name2: string;
    result: Result;
    rate: string;
}

function parseWIN1(html: string): ParsedResult {
    const $ = cheerio.load(html);
    const targetElement = $('.data-cell--WgI9q');

    let name1 = '';
    let name2 = '';
    let rate = '';
    let result: Result = {
        type: 'total',
        player: 0,
        period: 'match',
    };

    // Извлечение имен игроков
    const eventName = targetElement.find('.group--hAXBT._event-name--jqpbC').text().trim();
    const playerNames = eventName.split(/–|-/).map(name => name.trim());
    if (playerNames.length === 2) {
        name1 = playerNames[0];
        name2 = playerNames[1];
    } else {
        const firstSpanText = targetElement.find('.svg-resource--QrfQ8.icon--Pvtyh').next().text().trim();
        name1 = firstSpanText;
    }

    // Извлечение результата
    const findMath = targetElement.find('.group--hAXBT._event-name--jqpbC').next();
    let resultText = findMath ? findMath.text().trim() : '';

    resultText = resultText.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

    result = {
        type: 'win',
        player: 1,
        period: 'match',
    };

    // Извлечение коэффициента
    const thirdDiv = targetElement.find('div').eq(2);

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

export default parseWIN1;
