import { env } from './env'

export const generatePreviewURL = (relativePath: string) => {
  return `${env.FRONTEND_URL}${relativePath}?preview=true`
}
