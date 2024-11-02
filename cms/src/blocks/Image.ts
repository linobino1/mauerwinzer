import type { Block } from 'payload'

export const Image: Block = {
  slug: 'image',
  labels: {
    singular: 'Bild (Vollbreite)',
    plural: 'Bilder (Vollbreite)',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Image
