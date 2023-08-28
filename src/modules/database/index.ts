import { UrlParseType } from '../url-manager/types';

export const DATABASE: Record<Hostname, HostnameOptions> = {
    'amazon.com': { firstPageNumber: 1, pageDelta: 1, type: UrlParseType.QueryPage },
    'google.com': { firstPageNumber: 0, pageDelta: 10, type: UrlParseType.QueryStart },
    'ozon.ru': { firstPageNumber: 1, pageDelta: 1, type: UrlParseType.QueryPage },
    'ya.ru': { firstPageNumber: 0, pageDelta: 1, type: UrlParseType.QueryP },
    'yandex.ru': { firstPageNumber: 0, pageDelta: 1, type: UrlParseType.QueryP },
};
