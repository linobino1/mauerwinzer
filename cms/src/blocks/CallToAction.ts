import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call To Action Block',
    plural: 'Call To Action Blocks',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
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
          ],
          required: true,
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
          name: 'newTab',
          type: 'checkbox',
          label: 'In neuem Tab öffnen',
          defaultValue: false,
        },
      ],
    },
  ],
}

export default CallToAction
