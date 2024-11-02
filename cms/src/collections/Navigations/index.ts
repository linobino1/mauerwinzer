import type { CollectionConfig } from 'payload'
import { publicReadOnly } from '@/access/publicReadOnly'
import { updateRelativeUrl } from './hooks/updateRelativeUrl'

export const Navigations: CollectionConfig = {
  slug: 'navigations',
  admin: {
    group: 'Konfiguration',
    useAsTitle: 'type',
    defaultColumns: ['type'],
  },
  labels: {
    singular: 'Menü',
    plural: 'Menüs',
  },
  access: publicReadOnly,
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
      label: 'Einträge',
      type: 'array',
      minRows: 1,
      admin: {
        components: {
          // TODO: custom component
          // RowLabel: ({ data }: { data: any }): string => data.name,
        },
      },
      fields: [
        {
          name: 'type',
          label: 'Art',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            {
              label: 'Interner Link',
              value: 'internal',
            },
            {
              label: 'Externer Link',
              value: 'external',
            },
            {
              label: 'Untermenü',
              value: 'subnavigation',
            },
            {
              label: 'Sprachwahlschalter',
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
          label: 'Seite',
          type: 'relationship',
          relationTo: 'pages',
          maxDepth: 0,
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'internal',
          },
        },
        {
          name: 'relativeUrl',
          type: 'text',
          hooks: {
            beforeChange: [updateRelativeUrl],
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
          label: 'Untermenü',
          type: 'relationship',
          relationTo: 'navigations',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'subnavigation',
          },
        },
        {
          name: 'newTab',
          label: 'In neuem Tab öffnen',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
