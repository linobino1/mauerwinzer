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
        responsive={[
          { size: 'landscape-2560w', screenWidth: 2560, renderedWidth: '95vw' },
          { size: 'landscape-1280w', screenWidth: 1024, renderedWidth: '95vw' },
          { size: 'square-768w', screenWidth: 768, renderedWidth: '768px' },
          { size: 'square-512w', screenWidth: 512, renderedWidth: '512px' },
        ]}
      />
    </div>
  ) : (<></>)
};

export default Image;