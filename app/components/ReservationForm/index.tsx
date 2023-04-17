import React, { Suspense } from 'react';
import classes from './index.module.css';
import { useLocation, useNavigate } from '@remix-run/react';
import { Form } from '~/components/Form';
import Button from '~/components/Button';
import { t } from 'i18next';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export type Props = {
  from: Date
  until: Date
  hCaptchaSiteKey?: string
}

export const ReservationForm: React.FC<Props> = ({
  from, until, hCaptchaSiteKey,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Form
      method='post'
      action={`${location.pathname}${location.search}`}
      className={classes.form}
    >
      <input
        type='hidden'
        name='action'
        value='reservation'
        required={true}
      />
      <input
        type='date'
        name='date'
        aria-label={t('Date') as string}
        defaultValue={new Date().toISOString().split('T')[0]}
        min={new Date().toISOString().split('T')[0]}
        required={true}
      />
      <input
        type='time'
        name='time'
        aria-label={t('Time') as string}
        min={from?.toTimeString().slice(0, 5)}
        max={until?.toTimeString().slice(0, 5)}
        defaultValue={'19:00'}
        required={true}
      />
      <input
        type='text'
        name='partySize'
        aria-label={t('Party Size') as string}
        defaultValue={'2'}
        required={true}
      />
      <input
        type='text'
        name='name'
        aria-label={t('Name') as string}
        defaultValue={'John Doe'}
        required={true}
      />
      <input
        type='tel'
        name='phone'
        aria-label={t('Phone') as string}
        defaultValue={'+1 555 555 5555'}
        required={true}
      />
      <input
        type='email'
        name='email'
        defaultValue={'leo.hilsheimer@gmeila.com'}
        aria-label={t('Email') as string}
      />
      <textarea
        name='message'
        aria-label={t('Message') as string}
      />
      { false && (
        <Suspense>
          <div
            className="h-captcha"
            data-sitekey={hCaptchaSiteKey}
          />
        </Suspense>
      )}
      { hCaptchaSiteKey && (
        <div
          data-name='hCaptcha'
          data-type='hCaptcha'
        >
          <HCaptcha sitekey={hCaptchaSiteKey} />
        </div>
      )}
      <Button
        className={classes.submit}
        layout='submit'
        type='submit'
      >{t('Send')}</Button>
      <Button
        className={classes.cancel}
        layout='cancel'
        type='button'
        onClick={() => navigate('?modal=false', { preventScrollReset: true })}
      >{t('Cancel')}</Button>
    </Form>
  )
};

export default ReservationForm;