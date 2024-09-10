import parseWIN2 from '../parsService/win2'; // Обновите путь к вашему модулю

describe('parseWIN2', () => {
    test('should handle HTML with incorrect formatting gracefully', () => {
        const html = `
            <div class="data-cell--WgI9q">
                <div>
                    <span>Player1 Player2</span>
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
                <div>
                    <span></span> <!-- Или пустой span -->
                </div>
            </div>
        `;
        const result = parseWIN2(html);
        expect(result).toEqual({
            name1: '',
            name2: '',
            rate: '',
            result: {
                type: 'win',
                player: 2,
                period: 'match',
            },
        });
    });
});
