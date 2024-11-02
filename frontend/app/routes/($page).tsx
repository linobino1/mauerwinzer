import React from 'react'
import type { Locale } from 'shared/i18n'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import Blocks from '~/components/Blocks'
import { useLoaderData, isRouteErrorResponse, useRouteError } from '@remix-run/react'
import PageHeader from '~/components/PageHeader'
import PageFooter from '~/components/PageFooter'
import { getPayload } from '~/util/getPayload.server'
import { generateMetadata } from '~/util/generateMetadata'
import { getEnvFromMatches } from '~/util/getEnvFromMatches'

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <h1 className="min-h-lg flex items-center justify-center">
      {isRouteErrorResponse(error) ? `${error.status} ${error.data}` : 'Unknown Error'}
    </h1>
  )
}

export const loader = async ({ params: { lang: locale, page: pageSlug } }: LoaderFunctionArgs) => {
  // the custom routes config will pass the locale as the page slug if there is only one route segment
  if (!locale && pageSlug) {
    locale = pageSlug
    pageSlug = 'home'
  }
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: pageSlug,
      },
    },
    locale: locale as Locale,
  })
  if (!res.docs.length) {
    throw new Response('Page not found', { status: 404 })
  }
  return {
    page: res.docs[0],
  }
}

export const meta: MetaFunction<typeof loader> = ({ data, matches }) =>
  generateMetadata({
    title: data?.page.title,
    env: getEnvFromMatches(matches),
  })

export default function Page() {
  const { page } = useLoaderData<typeof loader>()

  return page ? (
    <>
      <PageHeader page={page} />
      <main>
        <Blocks layout={page.layout} />
      </main>
      <PageFooter page={page} />
    </>
  ) : null
}
