import type { GlobalConfig } from 'payload/types';
import { t } from '../i18n';

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: (): boolean => true,
  },
  admin: {
    group: t('Site'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'footerContent',
      label: t('Footer Content'),
      type: 'richText',
    },
    {
      name: 'logo',
      label: t('Logo'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: t('Site Icon'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'homePage',
      label: t('Homepage'),
      type: 'relationship',
      relationTo: 'pages',
    },
  ],
};

export default Site;
