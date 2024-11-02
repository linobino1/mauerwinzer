import type { Locale } from 'shared/i18n'
import { ActionFunction } from '@remix-run/node'
import { env } from '~/env.server'
import i18next from '~/i18next.server'
import { getPayload } from '~/util/getPayload.server'
import { replaceMulti } from '~/util/replaceMulti'

const validateCaptcha = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY ?? '',
        sitekey: env.TURNSTILE_SITE_KEY ?? '',
        response: token,
      }),
    })
    const data = await res.json()
    return !!data.success
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * form handler for modal forms (reservation)
 */
export const action: ActionFunction = async ({ request }) => {
  const [payload, t, locale, data] = await Promise.all([
    getPayload(),
    i18next.getFixedT(request),
    i18next.getLocale(request),
    request.formData(),
  ])

  const res: {
    success: boolean
    message: string
    errors: {
      message: string
      field?: string
    }[]
  } = {
    success: false,
    message: '',
    errors: [],
  }

  switch (data.get('action')) {
    case 'reservation':
      // validate captcha
      if (!(await validateCaptcha(data.get('cf-turnstile-response') as string))) {
        res.errors.push({
          message: t('please confirm the captcha'),
          field: 'captcha',
        })
      }

      // validate required fields
      const required = ['name', 'email', 'date', 'time']
      for (const field of required) {
        if (!data.get(field)) {
          res.errors.push({
            message: t('field is required'),
            field,
          })
        }
      }
      // validate email, date, time on client side only

      // send email
      if (!res.errors.length) {
        try {
          const site = await payload.findGlobal({
            slug: 'site',
            depth: 1,
            locale: locale as Locale,
          })
          await payload.sendEmail({
            from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`,
            to: data.get('email') as string,
            bcc: env.CONNECTED_EMAIL_ADDRESSES?.split(',').map((email) => email.trim()),
            subject: t('New Reservation Request') as string,
            text: replaceMulti(site.reservations.mailTemplate as string, {
              name: data.get('name') as string,
              date: data.get('date') as string,
              time: data.get('time') as string,
              partySize: data.get('partySize') as string,
              phone: data.get('phone') as string,
              email: data.get('email') as string,
              message: data.get('message') as string,
            }),
          })
          res.message = t('Your request has been sent. We will contact you shortly.') as string
        } catch (err) {
          console.error(err)
          res.errors.push({
            message: t(
              'Sorry, there was an error sending your request. Please try to contact us directly.',
            ),
          })
        }
      } else {
        res.message = t('Please correct the errors below and try again.') as string
      }
  }

  res.success = !res.errors.length
  return res
}
