declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string,
      CORS: 'true' | 'false',
      X_POWERED_BY: 'true' | 'false',
      DEV_DELAY: string,
      INFO: 'true' | 'false',
      JWT_KEY: string,
      [key: string]: string | undefined
    }
  }
}

export {}