import type { GlobalConfig } from 'payload/types';
import { _t, t } from '../i18n';
import { fixedT } from '../i18n';

export const Site: GlobalConfig = {
  slug: 'site',
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
      name: 'reservations',
      label: t('Reservations'),
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'text',
          label: t('From'),
          required: true,
          validate: (value: string) => {
            if (!value.match(/^\d{2}:\d{2}$/)) {
              return _t('Time must be in the format HH:mm');
            }
            return true;
          }
        },
        {
          name: 'until',
          type: 'text',
          label: t('Until'),
          required: true,
          validate: (value: string) => {
            if (!value.match(/^\d{2}:\d{2}$/)) {
              return _t('Time must be in the format HH:mm');
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
