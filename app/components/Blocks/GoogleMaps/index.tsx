import React from 'react';
import classes from './index.module.css';

export type Type = {
  blockType: 'googleMaps'
  blockName?: string
  title?: string
  src: string
}

export const GoogleMaps: React.FC<Type> = ({
  title, src,
}) => {
  return (
    <div className={classes.container}>
      { title && (<h2>{title}</h2>) }
      <iframe
        title='Google Maps'
        src={src}
        width="800"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
      />
      
    </div>
  )
};

export default GoogleMaps;