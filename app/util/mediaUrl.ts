export const mediaUrl = (filename: string): string => (
  `${process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'}/media/${filename}`
)
