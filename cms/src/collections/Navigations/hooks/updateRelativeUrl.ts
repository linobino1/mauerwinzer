import { FieldHook } from 'payload'

export const updateRelativeUrl: FieldHook = async ({ siblingData: data, req: { payload } }) => {
  if (data?.type !== 'internal') return undefined
  try {
    const doc = await payload.findByID({
      collection: 'pages',
      id: data.page,
      depth: 0,
    })

    return `/${doc?.slug || ''}`
  } catch {
    return undefined
  }
}
