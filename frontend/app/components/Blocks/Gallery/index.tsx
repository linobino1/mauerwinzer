import React from 'react'
import classes from './index.module.css'
import { Image } from '~/components/Image'
import type { Media } from '@/payload-types'

export type Type = {
  blockType: 'gallery'
  blockName?: string | null
  images?: { image?: string | Media | null; id?: string | null }[] | null
}

export const Gallery: React.FC<Type> = ({ images }) => {
  return images ? (
    <div className={classes.container}>
      {images
        .filter((image) => image as Media)
        .map((item, index) => (
          <Image
            key={index}
            className={classes.image}
            media={item.image as Media}
            sizes="(min-width: 768px) 50vw, 100vw"
            srcSet={[
              {
                options: { width: 2560 },
                size: '2560w',
              },
              {
                options: { width: 1920 },
                size: '1920w',
              },
              {
                options: { width: 1280 },
                size: '1280w',
              },
              {
                options: { width: 960 },
                size: '960w',
              },
              {
                options: { width: 640 },
                size: '640w',
              },
            ]}
          />
        ))}
    </div>
  ) : (
    <></>
  )
}

export default Gallery
