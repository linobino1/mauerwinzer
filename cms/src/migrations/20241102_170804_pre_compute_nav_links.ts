import { MigrateUpArgs } from '@payloadcms/db-mongodb'

// run hooks on all navigations to precompute the links
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await Promise.all(
    (
      await payload.find({
        collection: 'navigations',
        where: { id: { exists: true } },
        limit: 9999999,
      })
    ).docs.map(async (doc) => {
      try {
        await payload.update({
          collection: 'navigations',
          id: doc.id,
          data: {},
        })
      } catch (error) {
        console.error('Error updating doc', doc.id, 'title' in doc ? doc.title : '')
        console.error(error)
      }
    }),
  )
}

export async function down(): Promise<void> {
  // Migration code
}
