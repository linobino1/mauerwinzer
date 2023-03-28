import type { Media } from "payload/generated-types"
import React from "react"
import { mediaUrl } from "~/util/mediaUrl"

export type ImageResponsive = {
  // size: { width: number, height: number }
  size: keyof Media['sizes']
  maxWidth: string
}

export type Props = {
  image: Media
  responsive?: ImageResponsive[]
  width?: number
  height?: number
  className?: string
  fill?: boolean
}

// export const imageUrl = (image: Media, width: number, height: number): string => mediaUrl(`${image.sizes.card.}`)
export const Image: React.FC<Props> = ({
  width, height, className, image, responsive,
}) => {
  let srcset, sizes;
  if (responsive) {
    srcset = responsive.map((item) => (
      `${mediaUrl(image.sizes[item.size].filename as string)} ${image.sizes[item.size].width}w`
    )).join(', ');
    sizes = responsive.map((item) => (
      `${item.maxWidth} ${image.sizes[item.size].width}px`
    )).join(', ');
  }
  return (
    <img
      src={mediaUrl(image.filename as string)}
      alt={image.alt}
      width={width}
      height={height}
      className={className}
      srcSet={srcset}
      sizes={sizes}
    />
  )
}

export default Image;
