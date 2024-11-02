import { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: {
    singular: 'Reservierung',
    plural: 'Reservierungen',
  },
  fields: [
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'DD.MM.YYYY',
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'time',
      label: 'Uhrzeit',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'HH:mm',
          pickerAppearance: 'timeOnly',
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-Mail',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'partySize',
      label: 'Anzahl Gäste',
      type: 'number',
    },
    {
      name: 'message',
      label: 'Nachricht',
      type: 'textarea',
    },
  ],
}
