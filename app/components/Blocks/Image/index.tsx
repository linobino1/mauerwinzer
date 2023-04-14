import React from 'react';
import classes from './index.module.css';
import { Image as ImageComponent } from '~/components/Image';
import type { Media } from 'payload/generated-types';

export type Type = {
  blockType: 'image'
  blockName?: string
  image?: Media
}

export const Image: React.FC<Type> = ({ image }) => {
  return image ? (
    <div className={classes.container}>
      <ImageComponent
        image={image as Media}
        responsive={[
          { size: 'header-landscape-2560w', screenWidth: 2560, renderedWidth: '95vw' },
          { size: 'header-landscape-1024w', screenWidth: 1024, renderedWidth: '95vw' },
          { size: 'header-square-768w', screenWidth: 768, renderedWidth: '768px' },
          { size: 'header-square-512w', screenWidth: 512, renderedWidth: '512px' },
        ]}
      />
    </div>
  ) : (<></>)
};

export default Image;