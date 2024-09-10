import * as fs from 'fs';
import * as path from 'path';
import parseFunction from '../parse';

describe('parseFunction', () => {
    it('should parse HTML file correctly and generate output.json', async () => {
        
        const htmlFilePath = path.resolve(__dirname, '../../../tests/M/input.html');

        await parseFunction();

        const outputFilePath = path.resolve(__dirname, '../../../tests/M/output.json');
        expect(fs.existsSync(outputFilePath)).toBeTruthy();

        const outputData = fs.readFileSync(outputFilePath, 'utf-8');
        const jsonData = JSON.parse(outputData);

        expect(jsonData).toEqual(
            expect.objectContaining({
                gamers: expect.any(String),
                result: expect.any(String),
                kaficient: expect.any(String)
            })
        );
    });
});
