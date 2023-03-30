import { buildConfig } from 'payload/config';
import path from 'path';
import i18n from './i18n';
import Media from './cms/collections/Media';
import Navigations from './cms/collections/Navigations';
import Posts from './cms/collections/Posts';
import Pages from './cms/collections/Pages';
import Users from './cms/collections/Users';
import Site from './cms/globals/Site';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  i18n: {
    ...i18n,
  },
  graphQL: {
    disable: true,
  },
  collections: [
    // Site
    Users,
    Pages,
    Media,
    Navigations,

    // Blog
    Posts,
  ],
  globals: [
    Site,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'cms/payload-types.ts'),
  },
  localization: {
    defaultLocale: i18n.fallbackLng,
    locales: i18n.supportedLngs,
    fallback: true,
  },
});
