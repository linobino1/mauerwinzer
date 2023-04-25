/* eslint-disable no-case-declarations */
import React from 'react';
import Blocks from '~/components/Blocks';
import type { LoaderArgs, MetaFunction} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/PageHeader';
import i18next from "~/i18next.server";
import PageFooter from '~/components/PageFooter';
import { action as rootAction } from '../../../root';
import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { Response } from '@remix-run/node';
import classes from './index.module.css';
import { mediaUrl } from '~/util/mediaUrl';


export const loader = async ({ request, params, context: { payload }}: LoaderArgs) => {
  const locale = await i18next.getLocale(request);
  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params?.page,
      },
    },
    locale,
  });
  if (!res.docs.length) {
    throw new Response('Page not found', { status: 404 })
  }
  return {
    page: res.docs[0],
  }
}

// not sure why root action is not automatically triggered...
export const action = rootAction;

// meta tags overrides
export const meta: MetaFunction = ({ data, parentsData }) => {
  const image = data.page?.meta?.ogImage || parentsData.root?.site?.meta?.ogImage;
  // merge additional meta tags from page and site
  const additionalMetaTags: Record<string, string> = {};
  [
    ...(parentsData.root?.site?.meta?.additionalMetaTags || []),
    ...(data.page?.meta?.additionalMetaTags || []),
  ].forEach((tag) => {
    additionalMetaTags[tag.key as string] = tag.value;
  });
  return data && {
    title: data.page?.title || parentsData.root?.site?.title,
    description: data.page?.meta?.description || parentsData?.root?.site?.meta?.description,
    keywords: `${data.page?.meta?.keywords || ''} ${parentsData?.root?.site?.meta?.keywords || ''}`.trim(),
    "og:title": data.page?.meta.ogTitle || parentsData.root?.site?.meta.ogTitle,
    "og:description": data.page?.meta.ogDescription || parentsData.root?.site?.meta.ogDescription,
    "og:image": mediaUrl(image?.sizes['landscape-1280w']?.filename as string),
    ...additionalMetaTags,
  }
};


export const PageComponent: React.FC = () => {
  const { page } = useLoaderData<typeof loader>();
  
  return (
    <>
      <PageHeader />
      <main>
        <Blocks
          layout={page?.layout}
        />
      </main>
      <PageFooter />
    </>
  );
};

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={classes.error}>
        <h1>
          {error.status} {error.data}
        </h1>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default PageComponent;