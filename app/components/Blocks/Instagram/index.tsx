import React from 'react';
import classes from './index.module.css';


export type Type = {
  blockType: 'instagram'
  blockName?: string
}

export const Instagram: React.FC<Type> = () => {
  return (
    <div className={classes.container}>
      <h1>instagram</h1>
    </div>
  )
};

export default Instagram;