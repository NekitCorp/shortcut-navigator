/**
 * In what format is the ID stored in the url.
 */
export const enum UrlParseType {
    /**
     * The ID is in the path part of the url. This is the first number in the array of paths from left to right.
     * @example "/product/123/tab/3/"
     * @prevUrl "/product/122/tab/3/"
     * @nextUrl "/product/124/tab/3/"
     */
    PathFirst = 'path-first',
    /**
     * The ID is in the path part of the url. This is the first number in the array of paths from right to left.
     * @example "/project/PRJ-123/browse/TASK-456/"
     * @prevUrl "/project/PRJ-123/browse/TASK-455/"
     * @nextUrl "/project/PRJ-123/browse/TASK-457/"
     */
    PathLast = 'path-last',
    /**
     * The ID is stored in the `page` query parameter.
     * @example "?page=2"
     * @prevUrl "?page=1"
     * @nextUrl "?page=3"
     */
    QueryPage = 'query-page',
    /**
     * The ID is stored in the `p` query parameter.
     * @example "?p=2"
     * @prevUrl "?p=1"
     * @nextUrl "?p=3"
     */
    QueryP = 'query-p',
    /**
     * The ID is stored in the `start` query parameter.
     * @example "?start=2"
     * @prevUrl "?start=1"
     * @nextUrl "?start=3"
     */
    QueryStart = 'query-start',
}
