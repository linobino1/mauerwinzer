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
          <Image
            className={classes.footerImage}
            media={page.footerImage as Media}
            sizes="100vw"
            srcSet={[
              {
                options: { width: 2560 },
                size: '2560w',
              },
              {
                options: { width: 1920 },
                size: '1920w',
              },
              {
                options: { width: 1280 },
                size: '1280w',
              },
              {
                options: { width: 960 },
                size: '960w',
              },
              {
                options: { width: 640 },
                size: '640w',
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}

export default PageFooter
