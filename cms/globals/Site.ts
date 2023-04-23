import type { GlobalConfig } from 'payload/types';
import { t, fixedT } from '../i18n';
import { metaField } from '../fields/meta';

export const Site: GlobalConfig = {
  slug: 'site',
  admin: {
    group: t('Config'),
  },
  label: t('Site Config'),
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'logo',
      label: t('Logo'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'reservations',
      label: t('Reservations'),
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'text',
          label: t('From'),
          required: true,
          validate: (value: string, { t }) => {
            if (!value.match(/^\d{2}:\d{2}$/)) {
              return t('required format: {{format}}', { format: 'HH:mm' });
            }
            return true;
          }
        },
        {
          name: 'until',
          type: 'text',
          label: t('Until'),
          required: true,
          validate: (value: string, { t }) => {
            if (!value.match(/^\d{2}:\d{2}$/)) {
              return t('required format: {{format}}', { format: 'HH:mm' });
            }
            return true;
          }
        },
        {
          name: 'mailTemplate',
          type: 'textarea',
          label: t('Reservation Request Mail'),
          defaultValue: ({ locale }: { locale: string}): string => fixedT('DefaultReservationRequestMail', locale),
          localized: true,
        }
      ],
    },
    {
      name: 'footerContent',
      label: t('Footer Content'),
      type: 'richText',
      localized: true,
    },
    {
      name: 'homePage',
      label: t('Home'),
      type: 'relationship',
      relationTo: 'pages',
    },
    metaField(t('Global Meta')),
  ],
};

export default Site;
