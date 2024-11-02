import Image from '../Image'
import classes from './index.module.css'
import type { Media, Page } from '@/payload-types'

export interface PageFooterProps {
  page: Page
}

export const PageFooter: React.FC<PageFooterProps> = ({ page }) => {
  return (
    <div className={classes.pageFooter}>
      {(page?.footerImage as Media) && (
        <div className={classes.imageFooter}>
          <Image className={classes.footerImage} media={page.footerImage as Media} />
        </div>
      )}
    </div>
  )
}

export default PageFooter
