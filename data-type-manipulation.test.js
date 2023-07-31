import { removeHTML, deColonDuration } from "./functions/data-type-manipulation";

describe('removeHTML', () => {
    test('input <a href="http://google.com" target="_blank">Link</a> and get back Link', () => {
        let actual = removeHTML(`<a href="http://google.com" target="_blank">Link</a>`);
        expect(actual).toBe('Link');
    });
    test(`input <p>He can&t hope this will work</p> returns He can't hope this will work</p>`, () => {
        let actual = removeHTML('<p>He can&apos;t hope this will work</p>');
        expect(actual).toBe(`He can't hope this will work`);
    });
    test(`input <p>To see why this code isn&apos;t the best in the world, <a href="https://dummysite.com" target="_blank">click here</a>.</p> to get To see why this code isn't the best in the world, click here.`, () => {
        let actual = removeHTML(`<p>To see why this code isn&apos;t the best in the world, <a href="https://dummysite.com" target="_blank">click here</a>.</p>`);
        expect(actual).toBe(`To see why this code isn't the best in the world, click here.`);
    });
});

describe('decolonize duration', () => {
    test('input 01:22:30 to get 5040', () => {
        let actual = deColonDuration('01:22:30');
        expect(actual).toBe(4920);
    });
    test('input 65:45 to get 3900', () => {
        let actual = deColonDuration('65:45');
        expect(actual).toBe(3900);
    });
    test('input 2:15:25 to get 8100', () => {
        let actual = deColonDuration('2:15:25');
        expect(actual).toBe(8100);
    });
});