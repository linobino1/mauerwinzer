import React from 'react';
import classes from './index.module.css';
import type { Page } from 'payload/generated-types';
import Button from '~/components/Button';
import { useNavigate } from '@remix-run/react';


export type Type = {
  blockType: 'callToAction'
  blockName?: string
  items: {
    title: string
    type: 'internal' | 'external'
    page?: Page | string
    url?: string
    newTab?: boolean
  }[]
}

export const CallToAction: React.FC<Type> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      { items.map((item) => {
        const path = item.type === 'internal' ? `/${(item.page as Page).slug}` : item.url as string;

        return (
          <Button
            key={item.title + item.page}
            layout="big"
            onClick={
              item.newTab 
                ? () => window.open(path, '_blank')
                : () => navigate(path)
            }
          >{item.title}</Button>
        )})} 
    </div>
  )
};

export default CallToAction;