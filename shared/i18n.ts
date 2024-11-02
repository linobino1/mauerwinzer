export const locales = ['de', 'en'] as const
export const defaultLocale = 'en'

export type Locale = (typeof locales)[number]
