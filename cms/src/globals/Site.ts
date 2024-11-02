import type { GlobalConfig } from 'payload'
import type { Locale } from 'shared/i18n'

const validateTimeFormat = (value: any) => {
  if (value === undefined || !value.match(/^\d{2}:\d{2}$/)) {
    return 'Uhrzeit muss im Format HH:mm sein'
  }
  return true
}

export const Site: GlobalConfig = {
  slug: 'site',
  admin: {
    group: 'Konfiguration',
  },
  label: 'Seiteneinstellungen',
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'reservations',
      label: 'Reservierungsformular',
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'text',
          label: 'Von',
          required: true,
          validate: validateTimeFormat,
        },
        {
          name: 'until',
          type: 'text',
          label: 'Bis',
          required: true,
          validate: validateTimeFormat,
        },
        {
          name: 'mailTemplate',
          type: 'textarea',
          label: 'Email Vorlage',
          defaultValue: ({ locale }: { locale: Locale }): string =>
            ({
              de: 'Liebe/r {name},\n\nvielen Dank für Deine Reservierungsanfrage. Wir werden uns so schnell wie möglich antworten. Du hast folgende Daten übermittelt:\n\nDatum: {date}\nUhrzeit: {time}\nAnzahl Personen: {partySize}\nTel. {phone}\nEmail: {email}\n\nMit freundlichen Grüßen,\n{restaurantName}',
              en: 'Dear {name},\n\nThank you for your reservation request. We will contact you as soon as possible. You submitted the following data:\n\nDate: {date}\nTime: {time}\nParty size: {partySize}\nTel. {phone}\nEmail: {email}\n\nBest regards,\n{restaurantName}',
            })[locale],
          localized: true,
        },
      ],
    },
    {
      name: 'footerContent',
      label: 'Footer Inhalt',
      type: 'richText',
      localized: true,
    },
  ],
}
