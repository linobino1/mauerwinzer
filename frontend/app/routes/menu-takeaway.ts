import { Media } from '@/payload-types'
import { LoaderFunction, redirect } from '@remix-run/node'
import { getPayload } from '~/util/getPayload.server'

export const loader: LoaderFunction = async () => {
  const payload = await getPayload()
  const menu = await payload.findGlobal({
    slug: 'menu',
    depth: 1,
  })
  const url = (menu.menuTakeAway as Media).url

  if (!url) {
    throw new Response('Not found', { status: 404 })
  }

  return redirect(url)
}
