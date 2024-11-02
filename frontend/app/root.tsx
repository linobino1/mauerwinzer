import type { LoaderFunctionArgs } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import 'virtual:uno.css'
import classes from './root.module.css'
import type { Media } from '@/payload-types'
import Cookies, { CookieConsentProvider } from './providers/Cookies'
import { useEffect } from 'react'
import { getPayload } from './util/getPayload.server'
import i18next from './i18next.server'
import { useTranslation } from 'react-i18next'
import { envClient } from './env.server'
import Header from './components/Header'
import Footer from './components/Footer'
import { localizeTo } from './util/i18n/localizeTo'
import { returnLanguageIfSupported } from './util/i18n/returnLanguageIfSupported'
import { getOptimizedImageUrl } from './util/media/getOptimizedImageUrl'
import { i18nCookie } from './cookies'

export async function loader({ request }: LoaderFunctionArgs) {
  const payload = await getPayload()
  const url = new URL(request.url)

  // get the locale from the URL
  const locale = returnLanguageIfSupported(url.pathname.split('/')[1])

  // redirect unlocalized routes to the user's preferred language
  if (!locale) {
    const lang = await i18next.getLocale(request)
    const to = localizeTo(url.pathname, lang) as string
    throw redirect(to)
  }

  const [site, navigations, localeCookie] = await Promise.all([
    payload.findGlobal({
      slug: 'site',
      depth: 1,
      locale,
    }),
    payload.find({
      collection: 'navigations',
      depth: 1,
      locale,
    }),
    i18nCookie.serialize(locale),
  ])

  return {
    env: envClient,
    site,
    navigations,
    locale,
    localeCookie,
  }
}

export default function App() {
  const { locale, localeCookie, site, navigations, env } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  // persist the locale in a cookie
  useEffect(() => {
    document.cookie = localeCookie
  }, [localeCookie])

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {site.meta && (
          <>
            <meta name="description" content={site.meta.description ?? ''} />
            <meta name="og:description" content={site.meta.description ?? ''} />
            {site.meta.image && (
              <meta
                name="og:image"
                content={getOptimizedImageUrl(site.meta.image, env, { width: 1200 })}
              />
            )}
            {site.meta.additionalMetaTags?.map((tag) => (
              <meta key={tag.key} name={tag.key} content={tag.value} />
            ))}
          </>
        )}
        <link
          rel="icon"
          href={(site.favicon as Media)?.url as string}
          type={(site.favicon as Media)?.mimeType as string}
        />
      </head>
      <CookieConsentProvider>
        <body className={'font-sans'}>
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
  )
}
