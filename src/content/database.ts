import { UrlType } from "./type";

// TODO: TS string literals
type Hostname = string;

export const DATABASE: Record<Hostname, UrlType> = {
    "ya.ru": UrlType.QueryP0,
    "www.ozon.ru": UrlType.QueryPage,
};
