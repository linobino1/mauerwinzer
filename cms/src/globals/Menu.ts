import type { GlobalConfig } from 'payload'

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menü',
  admin: {
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'menuInHouse',
      label: 'Weinkarte',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'menuTakeAway',
      label: 'Weinkarte (Take Away)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'menuFood',
      label: 'Speisekarte',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
