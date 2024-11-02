import React from 'react'
import classes from './index.module.css'
import type { Page } from '@/payload-types'
import Button from '~/components/Button'

export type CallToActionProps = {
  blockType: 'callToAction'
  blockName?: string | null
  items?:
    | {
        title: string
        type: 'internal' | 'external'
        page?: Page | string | null
        url?: string | null
        newTab?: boolean | null
      }[]
    | null
}

export const CallToAction: React.FC<CallToActionProps> = ({ items }) => {
  return (
    <div className={classes.container}>
      {items?.map((item, index) => {
        const path =
          item.type === 'internal' ? `/${(item.page as Page).slug}` : (item.url as string)

        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href={path} target={item.newTab ? '_blank' : undefined} key={index}>
            <Button layout="big">{item.title}</Button>
          </a>
        )
      })}
    </div>
  )
}

export default CallToAction
