type ParseUrlResult =
    | {
          valid: false;
      }
    | {
          nextUrl: string | null;
          prevUrl: string | null;
          valid: true;
      };

type ParseUrlFunction = (
    /** Parsed url. */
    url: string,
    /** Parsed options. */
    options: {
        firstPageNumber: HostnameOptions['firstPageNumber'];
        pageDelta: HostnameOptions['pageDelta'];
        /**
         * ID must be exist. Parameter may not exist in cases (strict = false)
         * where we know for sure that this site uses such a parameter
         * (we got this knowledge from the database)
         * and it is not displayed on the first page.
         */
        strict: boolean;
    },
) => ParseUrlResult;
