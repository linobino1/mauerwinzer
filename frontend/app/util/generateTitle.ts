import { siteTitle } from 'shared/siteTitle'

export const generateTitle = (pageTitle?: string | null) => {
  if (pageTitle === siteTitle) return pageTitle
  return pageTitle ? `${pageTitle} · ${siteTitle}` : siteTitle
}
