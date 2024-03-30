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
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { i18nCookie } from "./cookie";
import type { Media } from "payload/generated-types";
import transport, { connectedEmailAddresses, from } from "email";
import { replaceMulti } from "./util/stringInterpolation";
import environment from "./util/environment";
import CookieConsent from "react-cookie-consent";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import classes from "./root.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [
    // use css bundling
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export async function loader({
  request,
  context: { payload },
}: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  const [site, navigations, localeCookie] = await Promise.all([
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
    i18nCookie.serialize(locale),
  ]);

  return json(
    {
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
    },
    {
      headers: {
        "Set-Cookie": localeCookie,
      },
    }
  );
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

// export const metaOLD: MetaFunction<typeof loader> = ({ data }) => {
//   const additionalMetaTags: Record<string, string> = {};
//   data.site.meta?.additionalMetaTags?.forEach((tag) => {
//     additionalMetaTags[tag.key as string] = tag.value;
//   });

//   return {
//     title: data.site.title,
//     description: data.site.meta?.description,
//     keywords: data.site.meta?.keywords,
//     "og:title": data.site.meta?.ogTitle,
//     "og:description": data.site.meta?.ogDescription,
//     "og:image": (data.site.meta?.ogImage as Media)?.url,
//     ...additionalMetaTags,
//   };
// };

export const handle = {
  i18n: "common", // i18n namespace
};

export function useChangeLanguage(locale: string) {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
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

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  // display info about the error in development
  return environment().NODE_ENV === "development" ? (
    error instanceof Error ? (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    ) : (
      <pre>{"Unknown Error"}</pre>
    )
  ) : (
    <h1>Something went wrong</h1>
  );
}

export default function App() {
  // Get the locale from the loader
  let { locale, publicKeys, site, navigations } =
    useLoaderData<typeof loader>();
  let { t, i18n } = useTranslation();

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
      <body className={classes.body}>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(publicKeys)}`,
          }}
        />
        <ModalProvider transTime={200} zIndex={200}>
          <div className={classes.aboveFooter}>
            <Header
              site={site}
              navigations={navigations.docs}
              content={undefined}
            />

            <Outlet />
          </div>

          <Footer site={site} navigations={navigations.docs} />
          <ModalContainer />
        </ModalProvider>
        <ScrollRestoration />
        <Scripts />
        <div className={classes.cookiesWrapper}>
          <CookieConsent
            location="bottom"
            buttonText={t("Accept")}
            declineButtonText={t("Decline")}
            enableDeclineButton
            containerClasses={classes.cookies}
            buttonWrapperClasses={classes.cookieButtons}
            buttonClasses={classes.cookieButtonAccept}
            declineButtonClasses={classes.cookieButtonDecline}
            contentClasses={classes.cookieContent}
          >
            {t("CookieBannerText")}
          </CookieConsent>
        </div>
      </body>
    </html>
  );
}
