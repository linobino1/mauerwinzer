import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { Content } from '../blocks/Content'
import { Image } from '../blocks/Image'
import { Gallery } from '../blocks/Gallery'
import { Instagram } from '../blocks/Instagram'
import { CallToAction } from '../blocks/CallToAction'
import { GoogleMaps } from '../blocks/GoogleMaps'
import { publicReadOnly } from '@/access/publicReadOnly'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Seite',
    plural: 'Seiten',
  },
  admin: {
    group: 'Inhalte',
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  defaultSort: '-updatedAt',
  access: publicReadOnly,
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      localized: true,
      required: true,
    },
    slugField('title'),
    {
      name: 'image',
      label: 'Titelbild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'footerImage',
      label: 'Titelbild im Footer',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      label: 'Inhalt',
      type: 'blocks',
      minRows: 1,
      blocks: [Content, Image, Gallery, Instagram, CallToAction, GoogleMaps],
    },
  ],
}
