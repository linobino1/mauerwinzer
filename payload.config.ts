import { buildConfig } from "payload/config";
import path from "path";
import { options } from "./app/i18n";
import Media from "./cms/collections/Media";
import Navigations from "./cms/collections/Navigations";
import Pages from "./cms/collections/Pages";
import Users from "./cms/collections/Users";
import Site from "./cms/globals/Site";
import Menu from "./cms/globals/Menu";
import en from "./public/locales/en/backend.json";
import de from "./public/locales/de/backend.json";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { viteBundler } from "@payloadcms/bundler-vite";

export default buildConfig({
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/app",
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
    vite: (incomingViteConfig) => ({
      ...incomingViteConfig,
      build: {
        ...incomingViteConfig.build,
        emptyOutDir: false,
      },
    }),
  },
  editor: slateEditor({}),
  plugins: [
    cloudStorage({
      enabled: process.env.S3_ENABLED === "true",
      collections: {
        media: {
          disablePayloadAccessControl: true, // serve files directly from S3
          generateFileURL: (file) => {
            return `${process.env.MEDIA_URL}/${file.filename}`;
          },
          adapter: s3Adapter({
            bucket: process.env.S3_BUCKET || "",
            config: {
              endpoint: process.env.S3_ENDPOINT || undefined,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || "",
                secretAccessKey: process.env.S3_SECRET_KEY || "",
              },
              region: process.env.S3_REGION || "",
            },
          }),
        },
      },
    }),
  ],
  // this is for the translation of the admin panel
  i18n: {
    supportedLngs: ["en", "de"],
    fallbackLng: "en",
    ns: ["backend"],
    resources: {
      en: {
        backend: en,
      },
      de: {
        backend: de,
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
  globals: [Site, Menu],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
  // here we stay consistent with the i18n config of remix since this affects
  // the public frontend
  localization: {
    defaultLocale: options.fallbackLng,
    locales: options.supportedLngs,
    fallback: true,
  },
});
