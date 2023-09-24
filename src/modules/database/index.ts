import { UrlParseType } from '../url-manager/types';
import { withAllDomains } from './domains';

export const DATABASE: Record<Hostname, HostnameOptions> = {
    ...withAllDomains('amazon', { firstPageNumber: 1, pageDelta: 1, type: UrlParseType.QueryPage }),
    ...withAllDomains('google', {
        firstPageNumber: 0,
        pageDelta: 10,
        type: UrlParseType.QueryStart,
    }),
    ...withAllDomains('ya', { firstPageNumber: 0, pageDelta: 1, type: UrlParseType.QueryP }),
    ...withAllDomains('yandex', { firstPageNumber: 0, pageDelta: 1, type: UrlParseType.QueryP }),
    'ozon.ru': { firstPageNumber: 1, pageDelta: 1, type: UrlParseType.QueryPage },
};
