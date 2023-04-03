import type { CollectionConfig } from 'payload/types';
import { t } from '../i18n';
import path from 'path';

export const staticDir = path.resolve(__dirname, '../../media');
export const staticURL = '/media';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: t('Media'),
    plural: t('Media'),
  },
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  upload: {
    adminThumbnail: 'card',
    staticDir,
    staticURL,
    imageSizes: [
      {
        name: 'header-square-512w',
        width: 512,
        height: 512,
      },
      {
        name: 'header-square-768w',
        width: 768,
        height: 768,
      },
      {
        name: 'header-landscape-1024w',
        width: 1024,
        height: 682,
      },
      {
        name: 'header-landscape-2560w',
        width: 2560,
        height: 1280,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
