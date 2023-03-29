import type { Block } from "payload/types";

export const EntryContent: Block = {
  slug: 'entryContent',
  fields: [
    {
      name: 'content',
      type: 'richText'
    },
  ],
}

export default EntryContent;