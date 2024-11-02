import { Link } from '@remix-run/react'
import { useEffect, useState, createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'

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
  const { consent, setConsent } = useCookieConsent()
  const onAccept = () => {
    setConsent(true)
  }
  const onDecline = () => {
    setConsent(false)
  }

  return consent === null ? (
    <div className="border-1 fixed bottom-4 left-4 right-4 mx-auto w-full max-w-[96vw] rounded-md bg-white p-4 shadow-lg lg:max-w-[1024px]">
      <p className="text-sm">
        Wir verwenden Cookies, um Ihnen ein optimales Webseiten Erlebnis zu bieten. Lesen Sie mehr
        in unserer{' '}
        <Link to={'/datenschutz'} prefetch="intent" target="_blank" className="underline">
          Datenschutzerklärung
        </Link>
        .{' '}
      </p>
      <div className="font-altsans mt-4 flex justify-end gap-4 text-white underline">
        <button onClick={onDecline} className="rounded-sm bg-red-500 px-4 py-2 hover:bg-red-600">
          Ablehnen
        </button>
        <button onClick={onAccept} className="bg-key-500 hover:bg-key-600 rounded-sm px-4 py-2">
          Akzeptieren
        </button>
      </div>
    </div>
  ) : null
}

export default Cookies
