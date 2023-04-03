import getEnv from "./getEnv"

export const mediaUrl = (filename: string): string => (
  `${getEnv().PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${filename}`
)
