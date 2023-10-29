import type { Block } from "payload/types";
import { t } from '../i18n';

export const CallToAction: Block = {
  slug: 'callToAction',
  labels: {
    singular: t('Call To Action'),
    plural: t('Call To Action Blocks'),
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
          label: t('Open in new tab'),
          defaultValue: false,
        },
      ],
    },
  ],
}

export default CallToAction;