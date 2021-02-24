import { parsePadding } from '../utils';

test('parsePadding', () => {
    const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
    expect(parsePadding()).toEqual(defaultPadding);
    expect(parsePadding('')).toEqual(defaultPadding);
    expect(parsePadding('abcd')).toEqual(defaultPadding);
    expect(parsePadding('10')).toEqual({ top: 10, right: 10, bottom: 10, left: 10 });
    expect(parsePadding('10 20')).toEqual({ top: 10, right: 20, bottom: 10, left: 20 });
    expect(parsePadding('10 20 30')).toEqual({ top: 10, right: 20, bottom: 30, left: 20 });
    expect(parsePadding('10 20 30 40')).toEqual({ top: 10, right: 20, bottom: 30, left: 40 });
    expect(parsePadding('  10px 20  30  40px 50 ')).toEqual({ top: 10, right: 20, bottom: 30, left: 40 });
});
