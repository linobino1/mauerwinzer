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
  auth: {
    tokenExpiration: 1 * 60 * 60, // 1 hour
    cookies: {
     secure: false,
     sameSite: 'strict',
    },
    verify: {
      generateEmailSubject: () => 'please verify your email address',
      generateEmailHTML: ({ user, token }) => {
        const url = `http://localhost:3000/auth/verify-email?token=${token}`;
        return `
          <!doctype html>
          <html>
            <body>
              <p>Hello, ${user.name}!</p>
              <p>Click below to verify your email address.</p>
              <p>
                <a href="${url}">${url}</a>
              </p>
            </body>
          </html>
        `;
      }
    },
    forgotPassword: {
      generateEmailSubject: () => 'reset your password',
      generateEmailHTML: (args) => {
        const token = args?.token;
        const user = args?.user as User;

        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `http://localhost:3000/auth/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <p>Hello, ${user.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `;
      }
    },
  },
  admin: {
    group: t('Site'),
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: () => true,
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
