import React from 'react'
import { Navigation } from '../Navigation'
import RichText from '../RichText'
import type { Navigation as NavigationType, Site } from '@/payload-types'
import classes from './index.module.css'
import Button from '../Button'
import { useTranslation } from 'react-i18next'

export type Props = {
  site: Site
  navigations: NavigationType[]
}

export const Footer: React.FC<Props> = ({ site, navigations }) => {
  const { t } = useTranslation()
  return (
    <footer className={classes.footer}>
      <Navigation
        navigation={navigations.find((x) => x.type === 'footer')}
        className={classes.navFooter}
      />
      <div className={classes.copyright}>{`© ${new Date().getFullYear()} Mauerwinzer GbR`}</div>
      <Navigation
        navigation={navigations.find((x) => x.type === 'socialMedia')}
        className={classes.navSocial}
      />
      <RichText content={site.footerContent} className={classes.footerContent} />
      <div className={classes.buttons}>
        <a href="/menu-inhouse" target="_blank">
          <Button layout="big" color="white">
            {t('Wine Menu')}
          </Button>
        </a>
        <a href="/menu-food" target="_blank">
          <Button layout="big" color="white">
            {t('Food Menu')}
          </Button>
        </a>
        <a href="/menu-takeaway" target="_blank">
          <Button layout="big" color="white">
            {t('Wine Menu take-away')}
          </Button>
        </a>
      </div>
    </footer>
  )
}

export default Footer
