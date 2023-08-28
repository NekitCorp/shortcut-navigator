function parseQuery(key: string): ParseUrlFunction {
    return (url: string, { firstPageNumber, pageDelta, strict }): ParseUrlResult => {
        const { origin, search, pathname } = new URL(url);

        const params = new URLSearchParams(search);
        const regExp = /^\d+$/;
        const idParam = params.get(key);

        if (strict && idParam === null) {
            return { valid: false };
        }

        if (idParam !== null && !regExp.test(idParam)) {
            return { valid: false };
        }

        const id = idParam === null ? firstPageNumber : Number(idParam);

        params.set(key, (id - pageDelta).toString());

        const prevUrl = id <= firstPageNumber ? null : origin + pathname + '?' + params.toString();

        params.set(key, (id + pageDelta).toString());

        const nextUrl = origin + pathname + '?' + params.toString();

        return {
            nextUrl,
            prevUrl,
            valid: true,
        };
    };
}

export const parseQueryPageUrl: ParseUrlFunction = parseQuery('page');
export const parseQueryPUrl: ParseUrlFunction = parseQuery('p');
export const parseQueryStartUrl: ParseUrlFunction = parseQuery('start');
