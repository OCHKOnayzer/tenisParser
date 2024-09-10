import parseFora1 from './parsService/fora1ParseService';
import parseFora2 from './parsService/fora2ParseServce';
import parseB from './parsService/BParsingService';
import parseM from './parsService/MParsServise';
import parseWIN1 from './parsService/win1';
import parseWIN2 from './parsService/win2';

type ParserType = 'fora1' | 'fora2' | 'B'| 'M' | '1'| '2'|'setFora1' | 'setFora2' | 'setTotalB' | 'setTotalM';

function parseFunction(html: string, type: ParserType) {
    switch (type) {
        case 'fora1':
            return parseFora1(html);
        case 'fora2':
            return parseFora2(html);
        case 'B':
            return parseB(html);
        case 'M':
            return parseM(html);
        case '1': 
            return parseWIN1(html);
        case '2': 
            return parseWIN2(html);
        case 'setFora1':
            return parseFora1(html);
        case 'setFora2':  
            return parseFora2(html);
        case 'setTotalB':  
            return parseB(html);
        case 'setTotalM':  
            return parseM(html);
        default:
            throw new Error(`Unsupported parser type: ${type}`);
    }
}

export default parseFunction;
