import parseFora2 from '../parsService/fora2ParseServce';

describe('parseFora2', () => {
    test('should parse HTML with player names in spans and correct result and rate', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div><span>Player1</span><span>Player2</span></div>
                <div class="parameter--h05r6"><span>2.5</span></div>
                <div><span>Rate Info</span></div>
            </div>
            <div class="coupon-cart-bet--FVlIe">Match</div>
        `;
        const result = parseFora2(html);
        expect(result).toHaveProperty('name1');
        expect(result).toHaveProperty('name2');
        expect(result).toHaveProperty('rate');
        expect(result).toHaveProperty('result');
    });

    test('should parse HTML with player names separated by dash and correct result and rate', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>Player1 - Player2</div>
                <div class="parameter--h05r6"><span>3.0</span></div>
                <div><span>Rate Info</span></div>
            </div>
            <div class="coupon-cart-bet--FVlIe">Set</div>
        `;
        const result = parseFora2(html);
        expect(result).toHaveProperty('name1');
        expect(result).toHaveProperty('name2');
        expect(result).toHaveProperty('rate');
        expect(result).toHaveProperty('result');
    });

    test('should parse HTML with player names combined in text node and correct result and rate', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>Player1 Player2</div>
                <div class="parameter--h05r6"><span>4.5</span></div>
                <div><span>Rate Info</span></div>
            </div>
            <div class="coupon-cart-bet--FVlIe">Match</div>
        `;
        const result = parseFora2(html);
        expect(result).toHaveProperty('name1');
        expect(result).toHaveProperty('name2');
        expect(result).toHaveProperty('rate');
        expect(result).toHaveProperty('result');
    });
});
