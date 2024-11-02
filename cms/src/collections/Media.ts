import type { CollectionConfig } from 'payload'
import { publicReadOnly } from '@/access/publicReadOnly'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  labels: {
    singular: 'Upload',
    plural: 'Uploads',
  },
  admin: {
    group: 'Uploads',
  },
  access: publicReadOnly,
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
}
