import type { CollectionConfig } from 'payload/types';
import { t } from '../i18n';

export const Navigations: CollectionConfig = {
  slug: 'navigations',
  admin: {
    group: t('Site'),
    useAsTitle: 'type',
    defaultColumns: ['type'],
  },
  access: {
    read: (): boolean => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Main Navigation',
          value: 'main',
        },
        {
          label: 'Mobile Navigation',
          value: 'mobile',
        },
        {
          label: 'Footer Navigation',
          value: 'footer',
        },
        {
          label: 'Social Media',
          value: 'socialMedia',
        },
      ],
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: ({ data }: { data: any}): string => data.name,
        },
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            {
              label: 'Internal Link',
              value: 'internal',
            },
            {
              label: 'External Link',
              value: 'external',
            },
            {
              label: 'Subnavigation',
              value: 'subnavigation',
            },
            {
              label: 'Language Switch',
              value: 'language',
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type !== 'language',
          },
        },
        // internal link
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'internal',
          },
        },
        // external link
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        // subnavigation
        {
          name: 'subnavigation',
          type: 'relationship',
          relationTo: 'navigations',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'subnavigation',
          },
        },
      ],
    },
  ],
};

export default Navigations;
