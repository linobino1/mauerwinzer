import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import { useCookieConsent } from '~/providers/Cookies'
import { useTranslation } from 'react-i18next'
import Button from '~/components/Button'
import { Collapsible } from '~/components/Collapsible'

export type Type = {
  blockType: 'instagram'
  blockName?: string | null
  apiUrl: string
}

type ApiResponse = {
  posts: any[]
}

export const Instagram: React.FC<Type> = ({ apiUrl }) => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loaded, setLoaded] = useState(false)
  const { consent, resetConsent } = useCookieConsent()
  const { t } = useTranslation()

  useEffect(() => {
    ;(async () => {
      setLoaded(false)
      const data = await fetch(apiUrl).then((res) => res.json())
      setData(data)
      setLoaded(true)
    })()
  }, [apiUrl])

  return consent ? (
    loaded ? (
      <div className={classes.container}>
        {data?.posts.map((item: any) => (
          <div key={item.id} className={classes.item}>
            <div>
              <a href={item.permalink} target="_blank" rel="noreferrer">
                <img src={item.mediaUrl} alt={item.caption} />
              </a>
            </div>
            <Collapsible maxHeight={250}>
              <p className={classes.caption}>{item.caption}</p>
            </Collapsible>
          </div>
        ))}
      </div>
    ) : (
      <div className={classes.container}>
        <div className={classes.loader} />
      </div>
    )
  ) : (
    <div className={classes.noConsent}>
      <p>{t('cookies.noConsent')}</p>
      {consent !== null && <Button onClick={resetConsent}>{t('cookies.resetConsent')}</Button>}
    </div>
  )
}

export default Instagram
