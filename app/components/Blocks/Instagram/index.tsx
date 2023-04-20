import React from 'react';
import classes from './index.module.css';


export type Type = {
  blockType: 'instagram'
  blockName?: string
  beholdId: string
}

export const Instagram: React.FC<Type> = ({ beholdId }) => {
  return (
    <div className={classes.container}>
      <figure data-behold-id={beholdId}></figure>
      <script src="https://w.behold.so/widget.js" type="module"></script>
    </div>
  )
};

export default Instagram;