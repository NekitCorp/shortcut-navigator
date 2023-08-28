import { describe, expect, it } from 'vitest';
import { parseQueryPUrl, parseQueryPageUrl, parseQueryStartUrl } from '../query';

describe('Query parser tests', () => {
    it('parseQueryPageUrl test', () => {
        expect(
            parseQueryPageUrl(
                'https://www.ozon.ru/category/klaviatury-15741/?category_was_predicted=true&deny_category_prediction=true&from_global=true&page=4&tf_state=fsafas-J2-j-fs',
                { firstPageNumber: 1, pageDelta: 1, strict: true },
            ),
        ).toStrictEqual({
            valid: true,
            prevUrl:
                'https://www.ozon.ru/category/klaviatury-15741/?category_was_predicted=true&deny_category_prediction=true&from_global=true&page=3&tf_state=fsafas-J2-j-fs',
            nextUrl:
                'https://www.ozon.ru/category/klaviatury-15741/?category_was_predicted=true&deny_category_prediction=true&from_global=true&page=5&tf_state=fsafas-J2-j-fs',
        });
    });

    it('parseQueryPUrl test', () => {
        expect(
            parseQueryPUrl('https://ya.ru/search/?text=keyboard&lr=10547&p=2', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: true,
            prevUrl: 'https://ya.ru/search/?text=keyboard&lr=10547&p=1',
            nextUrl: 'https://ya.ru/search/?text=keyboard&lr=10547&p=3',
        });
    });

    it('parseQueryStartUrl test', () => {
        expect(
            parseQueryStartUrl(
                'https://www.google.com/search?q=keyboard&newwindow=1&sca_esv=524244592&sxsrf=ABstfuwu5GpI-E8xu1NmSCpLj29322292024&ei=GK_s_W4-EP4PGUwAw&start=50&sa=N&ved=hUKESwj_nJOWyP-AAxV13TgGHefds4BcMDegQIAxAM&biw=1212&bih=714&dpr=2',
                {
                    firstPageNumber: 0,
                    pageDelta: 10,
                    strict: true,
                },
            ),
        ).toStrictEqual({
            valid: true,
            prevUrl:
                'https://www.google.com/search?q=keyboard&newwindow=1&sca_esv=524244592&sxsrf=ABstfuwu5GpI-E8xu1NmSCpLj29322292024&ei=GK_s_W4-EP4PGUwAw&start=40&sa=N&ved=hUKESwj_nJOWyP-AAxV13TgGHefds4BcMDegQIAxAM&biw=1212&bih=714&dpr=2',
            nextUrl:
                'https://www.google.com/search?q=keyboard&newwindow=1&sca_esv=524244592&sxsrf=ABstfuwu5GpI-E8xu1NmSCpLj29322292024&ei=GK_s_W4-EP4PGUwAw&start=60&sa=N&ved=hUKESwj_nJOWyP-AAxV13TgGHefds4BcMDegQIAxAM&biw=1212&bih=714&dpr=2',
        });
    });

    it('parseQuery strict, not found', () => {
        expect(
            parseQueryPageUrl('https://example.com/?start=1&p=2&test=test', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: false,
        });
    });

    it('parseQuery not strict, not found', () => {
        expect(
            parseQueryPageUrl('https://example.com/?start=1&p=2&test=test', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: false,
            }),
        ).toStrictEqual({
            valid: true,
            nextUrl: 'https://example.com/?start=1&p=2&test=test&page=2',
            prevUrl: null,
        });
    });

    it('parseQuery param not number', () => {
        const options = { firstPageNumber: 1, pageDelta: 1, strict: false };

        expect(parseQueryPageUrl('https://example.com/?page=', options)).toStrictEqual({
            valid: false,
        });
        expect(parseQueryPageUrl('https://example.com/?page=q123', options)).toStrictEqual({
            valid: false,
        });
        expect(parseQueryPageUrl('https://example.com/?page=123q', options)).toStrictEqual({
            valid: false,
        });
        expect(parseQueryPageUrl('https://example.com/?page=1q3', options)).toStrictEqual({
            valid: false,
        });
        expect(parseQueryPageUrl('https://example.com/?page=1.3', options)).toStrictEqual({
            valid: false,
        });
        expect(parseQueryPageUrl('https://example.com/?page=1,3', options)).toStrictEqual({
            valid: false,
        });
    });

    it('parseQuery boundary test', () => {
        expect(
            parseQueryPageUrl('https://example.com/?page=1', {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            }),
        ).toStrictEqual({
            valid: true,
            prevUrl: null,
            nextUrl: 'https://example.com/?page=2',
        });
    });
});
