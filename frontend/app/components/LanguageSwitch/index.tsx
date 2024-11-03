import { Link, useLocation } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { type Locale, locales } from 'shared/i18n'
import { getLocalizedPathnames } from '~/util/i18n/getHreflangLinks'
import classes from './index.module.css'

const nativeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
}

export type Props = {
  className?: string
}

export default function LanguageSwitch({ className }: Props) {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const pathnames = getLocalizedPathnames(pathname)

  return (
    <div className={`${classes.container} ${className}`}>
      {locales.map((lang) => (
        <Link
          key={lang}
          to={pathnames[lang] as string}
          rel="alternate"
          hrefLang={lang}
          onClick={() => i18n.changeLanguage(lang)}
          preventScrollReset
          reloadDocument
          className={`${classes.language} ${i18n.language === lang && classes.active}`}
        >
          <span className="md:sr-only">
            {nativeNames[lang]}
            &nbsp;
          </span>
          <span className="max-md:hidden">{lang}</span>
        </Link>
      ))}
    </div>
  )
}
