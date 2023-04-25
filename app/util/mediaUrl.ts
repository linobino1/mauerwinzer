import environment from "./environment"

export const mediaUrl = (filename: string): string => (
  // relative path works too, but has some caveats, e.g. the og:image tag needs an absolute path
  // `/media/${filename}`
  `${environment().PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${filename}`
)
