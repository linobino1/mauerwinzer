import type { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
}

export default Content
