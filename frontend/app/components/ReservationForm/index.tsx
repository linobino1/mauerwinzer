import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Button from '~/components/Button'
import { useTranslation } from 'react-i18next'
import type { Site } from '@/payload-types'
import { useEnv } from '~/util/useEnv'
import Turnstile from 'react-turnstile'
import { useFetcher } from '@remix-run/react'
import type { action } from '~/routes/api.reservation'
import Input from './elements/Input'
import Label from './elements/Label'
import Textarea from './elements/Textarea'

export type Props = {
  site: Site
  active?: boolean
}

export const ReservationForm: React.FC<Props> = ({ site, active = false }) => {
  const { t } = useTranslation()
  const env = useEnv()

  const fetcher = useFetcher<typeof action>()

  const from = new Date(site.reservations.from).toTimeString().slice(0, 5)
  const until = new Date(site.reservations.until).toTimeString().slice(0, 5)

  const [captchaState, setCaptchaState] = useState<'checking' | 'verified' | 'error'>('checking')

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div>
      <h3 className={classes.heading}>{t('Reserve a table')}</h3>
      {fetcher.data?.success ? (
        <p className={classes.success}>
          {t('Your request has been sent. We will contact you shortly.')}
        </p>
      ) : (
        <fetcher.Form method="post" className={classes.form} action="/api/reservation">
          <input type="hidden" name="action" value="reservation" required={true} />
          <Label htmlFor="date" required>
            {t('Date')}
          </Label>
          <Input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            min={new Date().toISOString().split('T')[0]}
            required={true}
          />
          <Label htmlFor="time" required>
            {t('Time')}
          </Label>
          <Input
            type="time"
            name="time"
            min={from}
            max={until}
            defaultValue={'19:00'}
            required={true}
          />
          <Label htmlFor="partySize" required>
            {t('Party Size')}
          </Label>
          <Input type="text" name="partySize" defaultValue={'2'} required={true} />
          <Label htmlFor="name" required>
            {t('Name')}
          </Label>
          <Input type="text" name="name" required={true} />
          <Label htmlFor="email" required>
            {t('Email')}
          </Label>
          <Input type="email" name="email" required={true} />
          <Label htmlFor="phone">{t('Phone')}</Label>
          <Input type="tel" name="phone" />
          <Label htmlFor="message">{t('Message')}</Label>
          <Textarea name="message" />
          {active && isClient && (
            <Turnstile
              sitekey={env?.TURNSTILE_SITE_KEY ?? ''}
              execution="render"
              onVerify={() => setCaptchaState('verified')}
              onError={() => setCaptchaState('error')}
              className="mb-4"
              theme="light"
            />
          )}
          <Button
            className={classes.submit}
            layout="submit"
            type="submit"
            disabled={captchaState !== 'verified'}
          >
            {t('Send')}
          </Button>
        </fetcher.Form>
      )}
    </div>
  )
}

export default ReservationForm
