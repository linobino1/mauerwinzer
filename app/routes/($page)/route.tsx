/* eslint-disable no-case-declarations */
import React from "react";
import Blocks from "~/components/Blocks";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import PageHeader from "~/components/PageHeader";
import i18next from "~/i18next.server";
import PageFooter from "~/components/PageFooter";
import { action as rootAction } from "../../root";
import classes from "./index.module.css";
import type { Media, Site } from "payload/generated-types";
import getOptimizedImageUrl from "~/util/getOptimizedImageUrl";
import { routeHeaders } from "~/util/routeHeaders";

export const headers = routeHeaders;

export const loader = async ({
  request,
  params,
  context: { payload },
}: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);
  const res = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: params?.page || "home",
      },
    },
    locale,
  });
  if (!res.docs.length) {
    throw new Response("Page not found", { status: 404 });
  }
  return {
    page: res.docs[0],
  };
};

// not sure why root action is not automatically triggered...
export const action = rootAction;

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const site = (matches.find((match) => match.id === "root")?.data as any)
    .site as Site;
  const image = (data?.page?.meta?.ogImage || site.meta?.ogImage) as
    | Media
    | undefined;

  return [
    {
      title: data?.page?.title ?? site.title,
    },
    {
      name: "description",
      content: data?.page?.meta?.description ?? site.meta?.description,
    },
    {
      name: "keywords",
      content: `${data?.page?.meta?.keywords} ${site.meta?.keywords}`,
    },
    {
      property: "og:title",
      content: data?.page?.meta?.ogTitle ?? site.meta?.ogTitle,
    },
    {
      property: "og:description",
      content: data?.page?.meta?.ogDescription ?? site.meta?.ogDescription,
    },
    {
      property: "og:image",
      content: getOptimizedImageUrl(image?.url || "", { width: 1200 }),
    },
  ];
};

export const PageComponent: React.FC = () => {
  const { page } = useLoaderData<typeof loader>();

  return page ? (
    <>
      <PageHeader page={page} />
      <main>
        <Blocks layout={page.layout} />
      </main>
      <PageFooter page={page} />
    </>
  ) : null;
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
