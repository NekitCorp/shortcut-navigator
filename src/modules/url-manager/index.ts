// TODO: tests

import { DATABASE } from '../database';
import {
    parsePathFirstUrl,
    parsePathLastUrl,
    parseQueryPUrl,
    parseQueryPageUrl,
    parseQueryStartUrl,
} from './parsers';
import { UrlParseType } from './types';

/**
 * Less = more priority.
 * `1` = top priority.
 */
const URL_PARSE_TYPE_PRIORITY_MAP: Record<UrlParseType, number> = {
    [UrlParseType.PathFirst]: 1,
    [UrlParseType.PathLast]: 2,
    [UrlParseType.QueryPage]: 3,
    [UrlParseType.QueryStart]: 4,
    [UrlParseType.QueryP]: 5,
};

const URL_PARSE_TYPE_PRIORITY = Object.keys(URL_PARSE_TYPE_PRIORITY_MAP).sort(
    (a, b) =>
        URL_PARSE_TYPE_PRIORITY_MAP[a as UrlParseType] -
        URL_PARSE_TYPE_PRIORITY_MAP[b as UrlParseType],
) as UrlParseType[];

const parseUrlByType: Record<UrlParseType, ParseUrlFunction> = {
    [UrlParseType.PathFirst]: parsePathFirstUrl,
    [UrlParseType.PathLast]: parsePathLastUrl,
    [UrlParseType.QueryP]: parseQueryPUrl,
    [UrlParseType.QueryPage]: parseQueryPageUrl,
    [UrlParseType.QueryStart]: parseQueryStartUrl,
};

export class UrlManager {
    constructor(private logger: ILogger) {}

    perseUrl(url: string): { prevUrl: string; nextUrl: string } | null {
        const { hostname } = new URL(url);

        // Trying to find in the database...

        const hostnameOptions = DATABASE[this.prepareHostnameForDatabase(hostname)];

        if (hostnameOptions) {
            const { firstPageNumber, pageDelta, type } = hostnameOptions;

            this.logger.log(`Hostname "${hostname}" found in database: "${type}".`);

            const result = parseUrlByType[type](url, {
                firstPageNumber,
                pageDelta,
                strict: false,
            });

            if (result.valid) {
                return result;
            }

            this.logger.log(
                `The type value "${type}" in the database for the hostname "${hostname}" is not valid. ` +
                    'Recalculating type...',
            );
        }

        // Otherwise, trying to parse the url by type depending on the priority...

        for (const type of URL_PARSE_TYPE_PRIORITY) {
            const result = parseUrlByType[type](url, {
                firstPageNumber: 1,
                pageDelta: 1,
                strict: true,
            });

            if (result.valid) {
                this.logger.log(
                    `Hostname "${hostname}" not found in database. Computed type: "${type}".`,
                );
                return result;
            }
        }

        return null;
    }

    private prepareHostnameForDatabase(hostname: string): string {
        if (hostname.startsWith('www.')) {
            hostname = hostname.slice(4);
        }

        return hostname;
    }
}
