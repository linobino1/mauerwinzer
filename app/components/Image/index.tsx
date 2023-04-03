import type { Media } from "payload/generated-types"
import React from "react"
import { mediaUrl } from "~/util/mediaUrl"

export type ImageResponsive = {
  size: keyof Required<Media>['sizes']
  screenWidth: number
  renderedWidth: string
}

export type Props = {
  image: Media
  responsive?: ImageResponsive[]
  width?: number
  height?: number
  className?: string
  fill?: boolean
}

export const Image: React.FC<Props> = ({
  width, height, className, image, responsive,
}) => {
  let srcSet: string[] = []
  let sizes: string[] = [];
  responsive?.forEach((item) => {
    if (image.sizes === undefined || image.sizes[item.size] === undefined) {
      return undefined;
    }
    srcSet.push(
      `${mediaUrl(image.sizes[item.size]?.filename as string)} ${image.sizes[item.size]?.width}w`
    );
    sizes.push(
      `(max-width: ${item.screenWidth}px) ${item.renderedWidth}`
    );
  });

  return (
    <img
      src={mediaUrl(image.filename as string)}
      alt={image.alt}
      width={width}
      height={height}
      className={className}
      srcSet={srcSet.join(', ')}
      sizes={sizes.join(', ')}
    />
  )
}

export default Image;
