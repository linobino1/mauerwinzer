import React from 'react';
import classes from './index.module.css';
import { Image as ImageComponent } from '~/components/Image';
import type { Media } from 'payload/generated-types';

export type Type = {
  blockType: 'image'
  blockName?: string
  image?: Media | string
}

export const Image: React.FC<Type> = ({ image }) => {
  return image as Media ? (
    <div className={classes.container}>
      <ImageComponent
        image={image as Media}
      />
    </div>
  ) : (<></>)
};

export default Image;