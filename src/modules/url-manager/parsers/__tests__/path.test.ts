import { describe, expect, it } from 'vitest';
import { parsePathFirstUrl, parsePathLastUrl } from '../path';

describe('Path parser tests', () => {
    it('parsePathFirstUrl test', () => {
        expect(
            parsePathFirstUrl('https://example.com/product/123/tab/3/', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: true,
            prevUrl: 'https://example.com/product/122/tab/3/',
            nextUrl: 'https://example.com/product/124/tab/3/',
        });
    });

    it('parsePathLastUrl test', () => {
        expect(
            parsePathLastUrl('https://example.com/product/123/tab/3/', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: true,
            prevUrl: 'https://example.com/product/123/tab/2/',
            nextUrl: 'https://example.com/product/123/tab/4/',
        });
    });

    it('parsePath valid numbers test', () => {
        const options = { firstPageNumber: 1, pageDelta: 1, strict: true };

        expect(parsePathFirstUrl('https://example.com/TASK-123', options)).toStrictEqual({
            valid: true,
            prevUrl: 'https://example.com/TASK-122',
            nextUrl: 'https://example.com/TASK-124',
        });

        expect(
            parsePathFirstUrl('https://example.com/123-qwe/qwe123qwe/456', options),
        ).toStrictEqual({
            valid: true,
            prevUrl: 'https://example.com/123-qwe/qwe123qwe/455',
            nextUrl: 'https://example.com/123-qwe/qwe123qwe/457',
        });
    });

    it('parsePath boundary test', () => {
        expect(
            parsePathFirstUrl('https://example.com/1', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: true,
            prevUrl: null,
            nextUrl: 'https://example.com/2',
        });
    });
});
