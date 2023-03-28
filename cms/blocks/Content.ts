import type { Block } from "payload/types";

export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'content',
      type: 'richText'
    },
  ],
}

export default Content;