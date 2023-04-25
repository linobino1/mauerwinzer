import type { Field } from 'payload/types';
import { t } from '../i18n';

export const metaField = (label: Record<string, string>): Field => ({
  name: 'meta',
  label,
  type: 'group',
  fields: [
    {
      name: 'description',
      label: t('Description'),
      localized: true,
      type: 'textarea',
      admin: {
        description: '150-160 characters',
      },
    },
    {
      name: 'keywords',
      label: t('Keywords'),
      type: 'text',
    },
    {
      name: 'ogTitle',
      label: 'og:title',
      type: 'text',
      localized: true,
    },
    {
      name: 'ogDescription',
      label: 'og:description',
      type: 'textarea',
      localized: true,
      admin: {
        description: '<65 characters',
      },
    },
    {
      name: 'ogImage',
      label: 'og:image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'additionalMetaTags',
      label: t('Additional Meta Tags'),
      type: 'array',
      fields: [
        {
          name: 'key',
          label: t('Key'),
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: t('Value'),
          type: 'text',
          required: true,
        },
      ], 
    }
  ],
});
