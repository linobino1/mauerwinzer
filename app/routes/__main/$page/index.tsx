/* eslint-disable no-case-declarations */
import React from 'react';
import Blocks from '~/components/Blocks';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import PageHeader from '~/components/PageHeader';
import i18next from "~/i18next.server";
import PageFooter from '~/components/PageFooter';
import { action as rootAction } from '../../../root';

export const loader = async ({ request, params, context: { payload }}: LoaderArgs) => {
  const locale = await i18next.getLocale(request);
  const res = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.page,
      },
    },
    locale,
  });
  return {
    page: res.docs[0],
  }
}

// not sure why root action is not automatically triggered...
export const action = rootAction;

export const meta: MetaFunction = ({ data, parentsData }) => ({
  charset: "utf-8",
  title: data.page?.title || parentsData.root?.site?.title,
  description: data.page?.meta?.description || parentsData.root?.site?.meta?.description,
  keywords: `${data.page?.meta?.keywords || ''} ${parentsData.root?.site?.meta?.keywords || ''}`.trim(),
  viewport: "width=device-width,initial-scale=1",
});

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

export default PageComponent;