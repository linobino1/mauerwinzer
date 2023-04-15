import type { Block } from "payload/types";
import { t } from '../i18n';

export const Gallery: Block = {
  slug: 'gallery',
  labels: {
    singular: t('Gallery'),
    plural: t('Gallerie'),
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      label: t('Images'),
      labels: {
        singular: t('Image'),
        plural: t('Images'),
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: t('Image'),
        },
      ],
    },
  ],
}

export default Gallery;