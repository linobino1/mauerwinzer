import type { AccessArgs } from 'payload'

import type { User } from '../payload-types'

export const isLoggedIn = ({ req: { user } }: AccessArgs<User>): boolean => {
  return !!user
}
