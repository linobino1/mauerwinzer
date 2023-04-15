import type { CollectionConfig } from 'payload/types';
import { Content } from '../blocks/Content';
import { Image } from '../blocks/Image';
import { PostsList } from '../blocks/PostsList';
import { t } from '../i18n';
import { slugField } from '../util/slugField';
import { Meta } from './Meta';
import { Gallery } from '../blocks/Gallery';

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: t('Page'),
    plural: t('Pages'),
  },
  admin: {
    group: t('Site'),
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
      localized: true,
      required: true,
    },
    slugField('title'),
    {
      name: 'image',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'footerImage',
      label: t('Header Image Bottom'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      label: t('Content'),
      type: 'blocks',
      minRows: 1,
      blocks: [
        Content,
        PostsList,
        Image,
        Gallery,
      ],
    },
    Meta,
  ],
};

export default Pages;
