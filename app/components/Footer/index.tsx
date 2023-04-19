import React from 'react';
import { Navigation } from '../Navigation';
import RichText from '../RichText';
import type { Navigation as NavigationType, Site } from 'payload/generated-types';
import classes from './index.module.css';
import Button from '../Button';

export type Props = {
  site: Site
  navigations: NavigationType[]
}

export const Footer: React.FC<Props> = ({
  site, navigations,
}) => {
  return (
    <footer className={classes.footer}>
      <Navigation
        navigation={navigations.find((x) => x.type === 'footer')}
        className={classes.navFooter}
      />
      <div className={classes.copyright}>© 2023 Mauerwinzer GbR</div>
      <Navigation
        navigation={navigations.find((x) => x.type === 'socialMedia')}
        className={classes.navSocial}
      />
      <RichText content={site.footerContent} className={classes.footerContent} />
      <Button
        className={classes.newsletterButton}
        layout="big"
        color="white"
      >{'Newsletter abonnieren'}</Button>
    </footer>
  )
};

export default Footer;
