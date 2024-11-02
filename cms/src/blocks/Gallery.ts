import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galerie',
    plural: 'Galerien',
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Bilder',
      labels: {
        singular: 'Bild',
        plural: 'Bilder',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
        },
      ],
    },
  ],
}

export default Gallery
