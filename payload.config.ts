import { buildConfig } from 'payload/config';
import path from 'path';
import i18n from './i18n';
import Media from './cms/collections/Media';
import Navigations from './cms/collections/Navigations';
import Pages from './cms/collections/Pages';
import Users from './cms/collections/Users';
import Site from './cms/globals/Site';
import Menu from './cms/globals/Menu';
import en from './public/locales/en/backend.json';
import de from './public/locales/de/backend.json';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  i18n: {
    ...i18n,
    resources: {
      de: {
        common: de,
      },
      en: {
        common: en,
      },
    },
  },
  graphQL: {
    disable: true,
  },
  collections: [
    // Site
    Pages,
    Media,
    Navigations,
    Users,
  ],
  globals: [
    Site,
    Menu,
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
