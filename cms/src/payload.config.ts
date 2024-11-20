import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { de } from 'payload/i18n/de'
import path from 'path'
import { slateEditor } from '@payloadcms/richtext-slate'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Navigations } from './collections/Navigations'
import { Site } from './globals/Site'
import { Menu } from './globals/Menu'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { ZeptomailTransport } from 'nodemailer-zeptomail-transport'
import { createTransport } from 'nodemailer'
import { env } from './util/env'
import { defaultLocale, locales } from 'shared/i18n'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  serverURL: env.BACKEND_URL,
  // content localization
  localization: {
    locales: [...locales],
    defaultLocale: defaultLocale,
  },
  // admin panel localization
  i18n: {
    supportedLanguages: {
      de,
    },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: '@',
    },
  },
  cors: {
    origins: [env.FRONTEND_URL],
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  // The email adapter is used to send password reset emails
  ...(process.env.ZEPTOMAIL_API_KEY
    ? {
        email: nodemailerAdapter({
          transport: createTransport(
            new ZeptomailTransport({
              apiKey: process.env.ZEPTOMAIL_API_KEY!,
              region: 'eu',
            }),
          ),
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS!,
          defaultFromName: process.env.EMAIL_FROM_NAME!,
        }),
      }
    : {}),
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  collections: [Pages, Media, Navigations, Users],
  globals: [Site, Menu],
  plugins: [
    seoPlugin({
      globals: ['site'],
      uploadsCollection: 'media',
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'additionalMetaTags',
          label: 'Zusätzliche Meta-Tags',
          labels: {
            singular: 'Meta-Tag',
            plural: 'Meta-Tags',
          },
          type: 'array',
          fields: [
            {
              name: 'key',
              label: 'Key',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              label: 'Value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    }),
    s3Storage({
      enabled: process.env.S3_ENABLED === 'true',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        region: process.env.S3_REGION,
      },
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: {
          disablePayloadAccessControl: true, // serve files directly from S3
          generateFileURL: (file) => {
            return `${process.env.MEDIA_URL}/${file.filename}`
          },
        },
      },
    }),
  ],
})
