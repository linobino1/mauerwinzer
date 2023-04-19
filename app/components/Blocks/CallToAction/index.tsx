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
    page: Page | string
    newTab?: boolean
  }[]
}

export const CallToAction: React.FC<Type> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      { items.map((item) => (
        <Button
          key={item.title + item.page}
          layout="big"
          onClick={
            item.newTab 
              ? () => window.open((item.page as Page).slug, '_blank')
              : () => navigate(`/${(item.page as Page).slug}`, { })
          }
        >{item.title}</Button>
      ))} 
    </div>
  )
};

export default CallToAction;