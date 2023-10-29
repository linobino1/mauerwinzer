import React from 'react';
import classes from './index.module.css';
import { Image } from '~/components/Image';
import type { Media } from 'payload/generated-types';

export type Type = {
  blockType: 'gallery'
  blockName?: string
  images?: { image?: string | Media | undefined; id?: string | undefined; }[]
}

export const Gallery: React.FC<Type> = ({ images }) => {
  return images ? (
    <div className={classes.container}>
      { images.filter((image) => image as Media).map((item, index) => (
        <Image
          key={index}
          className={classes.image}
          image={item.image as Media}
        />
      ))}
    </div>
  ) : (<></>)
};

export default Gallery;