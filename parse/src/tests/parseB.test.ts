import parseB from '../parsService/BParsingService';

describe('parseB', () => {
    test('should correctly parse HTML with two player names', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1</span>
                    <span>Player2</span>
                </div>
                <div>
                    <span class="parameter--h05r6">2</span>
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseB(html);
        expect(result).toEqual({
            name1: 'Player1',
            name2: 'Player2',
            rate: '',
            result: {
                count: 0, 
                over: true,
                period: 'match',
                player: 0,
                type: 'total',
            },
        });
    });

    test('should correctly parse HTML with names separated by a dash', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1 - Player2</span>
                </div>
                <div>
                    <span class="parameter--h05r6">3.5</span>
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseB(html);
        expect(result).toEqual({
            name1: 'Player1',
            name2: 'Player2',
            rate: '',
            result: {
                count: 0, 
                over: true,
                period: 'match',
                player: 0,
                type: 'total',
            },
        });
    });

    test('should correctly parse HTML with additional text nodes for names', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1</span>
                    <span>some text</span>
                    <span>Player2</span>
                </div>
                <div>
                    <span class="parameter--h05r6">2.25</span>
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseB(html);
        expect(result).toEqual({
            name1: 'Player1',
            name2: 'some text', 
            rate: '', 
            result: {
                count: 0, 
                over: true,
                period: 'match',
                player: 0,
                type: 'total',
            },
        });
    });

    test('should handle HTML with incorrect formatting gracefully', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1 Player2</span>
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseB(html);
        expect(result).toEqual({
            name1: '', 
            name2: '', 
            rate: '', 
            result: {
                count: 0, 
                over: true,
                period: 'match',
                player: 0,
                type: 'total',
            },
        });
    });

    test('should handle HTML with different result formats', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1</span>
                    <span>Player2</span>
                </div>
                <div>
                    <span class="parameter--h05r6">4.5</span>
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseB(html);
        expect(result).toEqual({
            name1: 'Player1',
            name2: 'Player2',
            rate: '', 
            result: {
                count: 0,
                over: true,
                period: 'match',
                player: 0,
                type: 'total',
            },
        });
    });
});
