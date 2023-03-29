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
        name: 'card',
        width: 640,
        height: 480,
      },
      {
        name: 'feature',
        width: 1024,
        height: 576,
      },
      {
        name: 'header_1024w',
        width: 1024,
        height: 576,
      },
      {
        name: 'header_2560w',
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
