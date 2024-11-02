import type { Media } from '@/payload-types'
import React from 'react'
import { getMediaUrl } from '~/util/media/getMediaUrl'
import { getOptimizedImageUrl } from '~/util/media/getOptimizedImageUrl'
import { useEnv } from '~/util/useEnv'

/**
 * srcSet can either be used natively or by passing an array of  { options: cloudflare transformation options, width: css width }
 * e.g. { options: { width: 400, quality: 80 }, width: "500w" }
 */
export interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  media?: Media
  srcSet?: { options: object; size: string }[] | string
}

export const Image: React.FC<Props> = ({ media, srcSet, src, alt, width, height, ...props }) => {
  const env = useEnv()

  if (!media) return null

  // use src and alt from image if provided
  src ||= getMediaUrl(media, env)
  alt ||= media?.alt || undefined
  width ||= media?.width || undefined
  height ||= media?.height || undefined

  // transform srcSet array to string
  if (typeof srcSet === 'object' && env?.CDN_CGI_IMAGE_URL) {
    srcSet = srcSet
      .map((item) => {
        return `${getOptimizedImageUrl(src as string, env, item.options)} ${item.size}`
      })
      .join(', ')
  } else {
    srcSet = undefined
  }

  return <img {...props} src={src} alt={alt} width={width} height={height} srcSet={srcSet} />
}

export default Image
