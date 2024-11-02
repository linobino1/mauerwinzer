import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.string().default('development'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  BACKEND_URL: z.string().default('http://localhost:3000'),
  DATABASE_URI: z.string(),
  PAYLOAD_SECRET: z.string(),
  S3_ENABLED: z.string().default('false'),
  S3_ENDPOINT: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  MEDIA_URL: z.string().default('http://localhost:3000'),
  CDN_CGI_IMAGE_URL: z.string().optional(),
  TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  CONNECTED_EMAIL_ADDRESSES: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().optional(),
  EMAIL_FROM_NAME: z.string().optional(),
  ZEPTOMAIL_API_KEY: z.string().optional(),
})

const clientSchema = schema.pick({
  NODE_ENV: true,
  FRONTEND_URL: true,
  BACKEND_URL: true,
  MEDIA_URL: true,
  CDN_CGI_IMAGE_URL: true,
  TURNSTILE_SITE_KEY: true,
})

export const env = schema.parse(process.env)

export const envClient = clientSchema.parse(process.env)

// types
export type Environment = z.infer<typeof schema>
export type ClientEnvironment = z.infer<typeof clientSchema>
