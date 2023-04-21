import type { GlobalConfig } from 'payload/types';
import { t } from '../i18n';

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: t('Menu'),
  admin: {
    group: t('Contents'),
  },
  fields: [
    {
      name: 'menuInHouse',
      label: t('Menu In House'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'menuTakeAway',
      label: t('Menu Take Away'),
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Menu;
