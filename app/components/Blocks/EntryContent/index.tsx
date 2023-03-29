import React from 'react';
import RichText from '~/components/RichText';
import classes from './index.module.css';

export type Type = {
  blockType: 'entryContent'
  blockName?: string
  content?: unknown
}

export const EntryContent: React.FC<Type> = ({ content }) => (
  <div className={classes.container}>
    <RichText
      content={content}
    />
  </div>
);

export default EntryContent;