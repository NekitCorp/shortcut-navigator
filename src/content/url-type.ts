import { DATABASE } from './database';
import { UrlType } from './type';

// TODO: tests

// less = more priority
// 1 = top priority
const URL_TYPE_PRIORITY: Record<UrlType, number> = {
    [UrlType.PathFirst]: 1,
    [UrlType.PathLast]: 2,
    [UrlType.QueryPage]: 3,
    [UrlType.QueryP0]: 4,
};

export type ProcessUrlResult =
    | {
          valid: false;
      }
    | {
          nextUrl: string;
          prevUrl: string;
          valid: true;
      };

export type ProcessUrlFunction = (url: string, strict: boolean) => ProcessUrlResult;

const processPathFirstUrlType: ProcessUrlFunction = (url) => {
    const { origin, search, pathname } = new URL(url);
    const regExp = /\d+$/;
    const paths = pathname.split('/');
    const index = paths.findIndex((path) => regExp.test(path));

    if (index === -1) {
        return { valid: false };
    }

    const idPath = paths[index];
    const id = Number(idPath.match(regExp)?.[0]);

    paths[index] = idPath.replace(regExp, (id - 1).toString());

    const prevUrl = origin + paths.join('/') + search;

    paths[index] = idPath.replace(regExp, (id + 1).toString());

    const nextUrl = origin + paths.join('/') + search;

    return {
        nextUrl,
        prevUrl,
        valid: true,
    };
};

// TODO: DRY
const processPathLastUrlType: ProcessUrlFunction = (url) => {
    const { origin, search, pathname } = new URL(url);
    const regExp = /\d+$/;
    const paths = pathname.split('/');
    const index = paths.findLastIndex((path) => regExp.test(path));

    if (index === -1) {
        return { valid: false };
    }

    const idPath = paths[index];
    const id = Number(idPath.match(regExp)?.[0]);

    paths[index] = idPath.replace(regExp, (id - 1).toString());

    const prevUrl = origin + paths.join('/') + search;

    paths[index] = idPath.replace(regExp, (id + 1).toString());

    const nextUrl = origin + paths.join('/') + search;

    return {
        nextUrl,
        prevUrl,
        valid: true,
    };
};

const processQueryUrlType =
    (key: string, firstPageNumber: number = 1): ProcessUrlFunction =>
    (url: string, strict: boolean): ProcessUrlResult => {
        const { origin, search, pathname } = new URL(url);
        const params = new URLSearchParams(search);
        const regExp = /^\d+$/;
        const idParam = params.get(key);

        // TODO: description
        // Param may not exist – this is a valid case.
        // But if it exists then it must be a number.
        if (strict && idParam === null) {
            return { valid: false };
        }

        if (idParam !== null && !regExp.test(idParam)) {
            return { valid: false };
        }

        const id = idParam === null ? firstPageNumber : Number(idParam);

        params.set(key, (id - 1).toString());

        const prevUrl = origin + pathname + '?' + params.toString();

        params.set(key, (id + 1).toString());

        const nextUrl = origin + pathname + '?' + params.toString();

        return {
            nextUrl,
            prevUrl,
            valid: true,
        };
    };

export const processUrlByType: Record<UrlType, ProcessUrlFunction> = {
    [UrlType.PathFirst]: processPathFirstUrlType,
    [UrlType.PathLast]: processPathLastUrlType,
    [UrlType.QueryPage]: processQueryUrlType('page'),
    [UrlType.QueryP0]: processQueryUrlType('p', 0),
};

export function perseUrl(
    url: string,
    logger: ILogger,
): { prevUrl: string; nextUrl: string } | null {
    const { hostname } = new URL(url);

    if (DATABASE[hostname]) {
        const type = DATABASE[hostname];

        logger.log(`Hostname "${hostname}" found in database: "${type}".`);

        const result = processUrlByType[type](url, false);

        if (result.valid) {
            return result;
        } else {
            logger.log(
                `The type value "${type}" in the database for the hostname "${hostname}" is not valid. Recalculating type...`,
            );
        }
    }

    // TODO: use database first
    // logger.log(`Hostname "${hostname}" found in database: "${idType}".`);

    const types = Object.keys(URL_TYPE_PRIORITY).sort(
        (a, b) => URL_TYPE_PRIORITY[a as UrlType] - URL_TYPE_PRIORITY[b as UrlType],
    ) as UrlType[];

    for (const type of types) {
        const result = processUrlByType[type](url, true);

        if (result.valid) {
            logger.log(`Hostname "${hostname}" not found in database. Computed type: "${type}".`);
            return result;
        }
    }

    return null;
}
