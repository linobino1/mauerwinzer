declare global {
  interface AppEnvironment {
    NODE_ENV: string;
    PAYLOAD_PUBLIC_SERVER_URL: string;
    HCAPTCHA_SITE_KEY: string;
    HCAPTCHA_SECRET_KEY: string;
    S3_ENABLED: string;
    S3_REGION: string;
    S3_ENDPOINT: string;
    S3_BUCKET: string;
    S3_BUCKET_ENDPOINT: string;
    S3_ACCESS_KEY: string;
    S3_SECRET_KEY: string;
    MEDIA_URL: string;
    CDN_CGI_IMAGE_URL: string;
    USE_CLOUDFLARE_IMAGE_TRANSFORMATIONS: string;
  }
  interface Window {
    ENV: AppEnvironment;
  }
  namespace NodeJS {
    interface ProcessEnv extends AppEnvironment {}
  }
}

export {};
