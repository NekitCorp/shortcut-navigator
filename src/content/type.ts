export const enum UrlType {
    /**
     * -> "/product/123/tab/3/", id = 123
     */
    PathFirst = 'path-first',
    /**
     * "/project/PRJ-123/browse/TASK-456/" <-, id = 456
     */
    PathLast = 'path-last',
    /**
     * "?page=12", id = 12
     */
    QueryPage = 'query-page',
    /**
     * "?p=3", id = 3
     */
    QueryP = 'query-p',
    /**
     * "?start=3", id = 3
     */
    QueryStart = 'query-start',
}
