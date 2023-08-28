import { UrlParseType } from '../types';

function parsePath(type: UrlParseType): ParseUrlFunction {
    return (url: string, { pageDelta }): ParseUrlResult => {
        const { origin, search, pathname } = new URL(url);

        const regExp = /\d+$/;
        const paths = pathname.split('/');

        let index: number;
        switch (type) {
            case UrlParseType.PathFirst:
                index = paths.findIndex((path) => regExp.test(path));
                break;
            case UrlParseType.PathLast:
                index = paths.findLastIndex((path) => regExp.test(path));
                break;
            default:
                throw new Error(`Unrecognized url parse type for path: ${type}.`);
        }

        // Number in paths not found.
        if (index === -1) {
            return { valid: false };
        }

        const idPath = paths[index];
        const id = Number(idPath.match(regExp)?.[0]);

        paths[index] = idPath.replace(regExp, (id - pageDelta).toString());

        const prevUrl = origin + paths.join('/') + search;

        paths[index] = idPath.replace(regExp, (id + pageDelta).toString());

        const nextUrl = origin + paths.join('/') + search;

        return {
            nextUrl,
            prevUrl,
            valid: true,
        };
    };
}

export const parsePathFirstUrl: ParseUrlFunction = parsePath(UrlParseType.PathFirst);
export const parsePathLastUrl: ParseUrlFunction = parsePath(UrlParseType.PathLast);
