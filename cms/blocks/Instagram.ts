import type { Block } from "payload/types";

export const Instagram: Block = {
  slug: 'instagram',
  fields: [
    {
      name: 'beholdId',
      type: 'text',
      required: true,
    }
  ],
}

export default Instagram;