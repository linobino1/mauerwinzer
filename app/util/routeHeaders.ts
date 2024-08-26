import type { HeadersFunction } from "@remix-run/node";

/**
 * use the Content-Language from the root loader, and set a Cache-Control header
 */
export const routeHeaders: HeadersFunction = ({ parentHeaders }) => {
  const headers = new Headers();

  if (parentHeaders.get("Content-Language")) {
    headers.set("Content-Language", parentHeaders.get("Content-Language")!);
  }

  headers.set(
    "Cache-Control",
    "max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
  );
  return headers;
};
