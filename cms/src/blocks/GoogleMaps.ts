import type { Block } from 'payload'

export const GoogleMaps: Block = {
  slug: 'googleMaps',
  labels: {
    singular: 'Google Maps',
    plural: 'Google Maps',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      localized: true,
      required: false,
    },
    {
      name: 'src',
      label: 'Google Maps Embed API link',
      type: 'text',
      required: true,
      admin: {
        description: 'Copy the iframe src from the embed code you get at Google Maps',
      },
    },
  ],
}

export default GoogleMaps
