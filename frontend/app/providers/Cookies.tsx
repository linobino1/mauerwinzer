import { Link } from '@remix-run/react'
import { useEffect, useState, createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'
import Button from '~/components/Button'
import classes from './index.module.css'
import { useTranslation } from 'react-i18next'

export type CookieConsent = boolean | null

export type CookieConsentContext = {
  consent: CookieConsent
  setConsent: (consent: CookieConsent) => void
  resetConsent: () => void
}

export const CookieContext = createContext<CookieConsentContext>({
  consent: null,
  setConsent: () => {},
  resetConsent: () => {},
})

export const useCookieConsent = () => useContext(CookieContext)

export const CookieConsentProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState<boolean | null>(false)
  const [cookies, setCookie] = useCookies(['cookie-consent'])

  useEffect(() => {
    if (cookies['cookie-consent'] === true) {
      setState(true)
    } else if (cookies['cookie-consent'] === false) {
      setState(false)
    } else {
      setState(null)
    }
  }, [cookies, state])

  return (
    <CookieContext.Provider
      value={{
        consent: state,
        setConsent: (consent) => {
          setCookie('cookie-consent', consent, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 year
          })
          setState(consent)
        },
        resetConsent: () => {
          setCookie('cookie-consent', null, {
            path: '/',
          })
          setState(null)
        },
      }}
    >
      {children}
    </CookieContext.Provider>
  )
}

const Cookies = () => {
  const { t } = useTranslation()
  const { consent, setConsent } = useCookieConsent()
  const onAccept = () => {
    setConsent(true)
  }
  const onDecline = () => {
    setConsent(false)
  }

  return consent === null ? (
    <div className={classes.container}>
      <p className="text-sm">{t('cookies.banner')}</p>
      <div className={classes.buttons}>
        <Button onClick={onDecline} className={classes.decline}>
          {t('Decline')}
        </Button>
        <Button onClick={onAccept} className={classes.accept}>
          {t('Accept')}
        </Button>
      </div>
    </div>
  ) : null
}

export default Cookies
