import type { CollectionConfig } from 'payload/types';
import { t } from '../i18n';
import type { User } from "payload/generated-types";

export enum RolesEnum {
  admin = 'admin',
  moderator = 'moderator',
  insider = 'insider',
}

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: t('User'),
    plural: t('Users'),
  },
  auth: true,
  admin: {
    group: t('Site'),
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    // allow authenticated users
    read: ({ req: { user } }) => !!user,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: t('Role'),
      type: 'select',
      defaultValue: RolesEnum.insider,
      options: [
        {
          label: t('Admin'),
          value: RolesEnum.admin,
        },
        {
          label: t('Moderator'),
          value: RolesEnum.moderator,
        },
        {
          label: t('Insider'),
          value: RolesEnum.insider,
        },
      ],
    },
  ],
  timestamps: true,
};

export default Users;
