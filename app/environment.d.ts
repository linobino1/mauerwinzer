declare global {
  interface ENV {
    NODE_ENV: string
    PAYLOAD_PUBLIC_SERVER_URL: string
  }
  interface Window {
    ENV: {
      NODE_ENV: string
      PAYLOAD_PUBLIC_SERVER_URL: string
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_PUBLIC_SERVER_URL: string
    }
  }
}

export {}