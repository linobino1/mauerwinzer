import type {
  MetaFunction,
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { Media } from "payload/generated-types";
import transport, { connectedEmailAddresses, from } from "email";
import { replaceMulti } from "./util/stringInterpolation";
import environment from "./util/environment";
import classes from "./root.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookies, { CookieConsentProvider } from "./providers/Cookies";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({
  request,
  context: { payload },
}: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  const [site, navigations] = await Promise.all([
    payload.findGlobal({
      slug: "site",
      depth: 1,
      locale,
    }),
    payload.find({
      collection: "navigations",
      depth: 12,
      locale,
    }),
  ]);

  return json({
    site,
    navigations,
    locale,
    publicKeys: {
      PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
      HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
      CDN_CGI_IMAGE_URL: environment().CDN_CGI_IMAGE_URL,
      USE_CLOUDFLARE_IMAGE_TRANSFORMATIONS:
        process.env.USE_CLOUDFLARE_IMAGE_TRANSFORMATIONS,
    },
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.site.title,
    },
    {
      name: "description",
      content: data?.site.meta?.description,
    },
    {
      name: "keywords",
      content: data?.site.meta?.keywords,
    },
    {
      property: "og:title",
      content: data?.site.meta?.ogTitle,
    },
    {
      property: "og:description",
      content: data?.site.meta?.ogDescription,
    },
    {
      property: "og:image",
      content: (data?.site.meta?.ogImage as Media)?.url,
    },
  ];
};

export function useChangeLanguage(locale: string) {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
    document.cookie = `i18n=${locale}; path=/; samesite=strict`;
  }, [locale, i18n]);
}

const validateCaptcha = async (token: string): Promise<boolean> => {
  if (environment().NODE_ENV === "development") {
    console.log("Captcha validation skipped in development mode");
    return true;
  }
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: environment().HCAPTCHA_SECRET_KEY,
        sitekey: environment().HCAPTCHA_SITE_KEY,
        response: token,
      }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (error) {
    return false;
  }
};

/**
 * form handler for modal forms (reservation)
 */
export const action: ActionFunction = async ({
  request,
  context: { payload },
}) => {
  const data = await request.formData();
  const t = await i18next.getFixedT(request);
  const locale = await i18next.getLocale(request);

  let res: {
    success?: boolean;
    message?: string;
    errors: {
      message: string;
      field?: string;
    }[];
  } = {
    errors: [],
  };

  switch (data.get("action")) {
    case "reservation":
      // validate captcha
      if (!(await validateCaptcha(data.get("h-captcha-response") as string))) {
        res.errors.push({
          message: t("please confirm the captcha"),
          field: "hCaptcha",
        });
      }

      // validate required fields
      const required = ["name", "email", "date", "time"];
      for (const field of required) {
        if (!data.get(field)) {
          res.errors.push({
            message: t("field is required"),
            field,
          });
        }
      }
      // validate email, date, time on client side only

      // send email
      if (!res.errors.length) {
        try {
          const site = await payload.findGlobal({
            slug: "site",
            depth: 1,
            locale,
          });
          await transport?.sendMail({
            from,
            to: data.get("email") as string,
            bcc: connectedEmailAddresses,
            subject: t("New Reservation Request") as string,
            text: replaceMulti(site.reservations.mailTemplate as string, {
              name: data.get("name") as string,
              date: data.get("date") as string,
              time: data.get("time") as string,
              partySize: data.get("partySize") as string,
              phone: data.get("phone") as string,
              email: data.get("email") as string,
              message: data.get("message") as string,
            }),
          });
          res.message = t(
            "Your request has been sent. We will contact you shortly."
          ) as string;
        } catch (err) {
          // TODO: log error
          res.errors.push({
            message: t(
              "Sorry, there was an error sending your request. Please try to contact us directly."
            ),
          });
        }
      } else {
        res.message = t(
          "Please correct the errors below and try again."
        ) as string;
      }

    default:
  }

  res.success = !res.errors.length;
  return res;
};

export default function App() {
  // Get the locale from the loader
  let { locale, publicKeys, site, navigations } =
    useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  // handle locale change
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {site.meta?.additionalMetaTags?.map((tag) => (
          <meta key={tag.key} name={tag.key} content={tag.value} />
        ))}
        <link
          rel="icon"
          href={(site.favicon as Media)?.url as string}
          type={(site.favicon as Media)?.mimeType as string}
        />
      </head>
      <CookieConsentProvider>
        <body className={classes.body}>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(publicKeys)}`,
            }}
          />
          <div className={classes.aboveFooter}>
            <Header site={site} navigations={navigations.docs} />

            <Outlet />
          </div>

          <Footer site={site} navigations={navigations.docs} />
          <ScrollRestoration />
          <Scripts />
          <Cookies />
        </body>
      </CookieConsentProvider>
    </html>
  );
}
