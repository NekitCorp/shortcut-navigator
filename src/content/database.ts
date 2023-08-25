import { UrlType } from './type';

// TODO: TS string literals
type Hostname = string;
// TODO: description
type Options = {
    firstPageNumber: number;
    increment: number;
    type: UrlType;
};

export const DATABASE: Record<Hostname, Options> = {
    'www.ozon.ru': { firstPageNumber: 1, increment: 1, type: UrlType.QueryPage },
    'ya.ru': { firstPageNumber: 0, increment: 1, type: UrlType.QueryP },
    'yandex.ru': { firstPageNumber: 0, increment: 1, type: UrlType.QueryP },
    'www.google.com': { firstPageNumber: 0, increment: 10, type: UrlType.QueryStart },
};
