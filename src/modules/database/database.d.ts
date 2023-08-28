/**
 * The domain of the URL.
 * Can be obtained from `window.location.hostname`.
 * Does not contain a `www` subdomain.
 * @example "google.com"
 * @example "amazon.com"
 */
type Hostname = string;

/**
 * Saved options to lookup an ID in a url for a specific hostname.
 */
type HostnameOptions = {
    /**
     * The value from which pagination on the page starts.
     * @default 1
     * @example 0
     */
    firstPageNumber: number;
    /**
     * Paginator difference between pages.
     * @default 1
     * @example 10
     */
    pageDelta: number;
    /**
     * Url type.
     */
    type: import('../url-manager/types').UrlParseType;
};
