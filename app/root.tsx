import type { MetaFunction, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import RefreshAuthToken from "./util/refreshAuthToken";
import type { LoaderArgs } from "@remix-run/node";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import type { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "./root.module.css";
import { i18nCookie } from "./cookie";
import type { DynamicLinksFunction } from "remix-utils";
import { DynamicLinks } from "remix-utils";
import { mediaUrl } from "./util/mediaUrl";
import type { Media} from "payload/generated-types";

export const links: LinksFunction = () => {
  return [
    // use css bundling
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }]
      : []),
  ];
};

export async function loader({ request, context: { payload } }: LoaderArgs) {
  let locale = await i18next.getLocale(request);
  const [site, localeCookie] = await Promise.all([
    payload.findGlobal({
      slug: 'site',
      depth: 1,
    }),
    i18nCookie.serialize(locale),
  ]);

  return json({
    site,
    locale,
  }, {
    headers: {
      "Set-Cookie": localeCookie,
    },
  })
}

const dynamicLinks: DynamicLinksFunction<SerializeFrom<typeof loader>> = ({ data }) => {
  return [
    {
      rel: "icon",
      href: mediaUrl((data.site.logo as Media)?.filename as string),
      type: "image/svg",
    },
  ]
}

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
  charset: "utf-8",
  title: data.site.title,
  viewport: "width=device-width,initial-scale=1",
});

export const handle = {
  i18n: "common", // i18n namespace
  dynamicLinks,
};

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export default function App() {
  // Get the locale from the loader
  let { locale } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  // handle locale change
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        <DynamicLinks />
      </head>
      <body className={styles.body}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <RefreshAuthToken />
      </body>
    </html>
  );
}
