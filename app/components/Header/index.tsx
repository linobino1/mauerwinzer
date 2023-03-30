/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import type {
  Media,
} from "payload/generated-types";
import { Navigation } from '../Navigation';
import { Link } from '@remix-run/react';
import { Image } from '~/components/Image';
import type { Site, Navigation as NavigationType } from 'payload/generated-types';
import classes from './index.module.css';
import Button from '../Button';

type Props = {
  site: Site
  navigations: NavigationType[]
  content?: React.ReactNode
};

const Header: React.FC<Props> = ({
  site, navigations, content,
}) => {
  const [menuVisible, setMenuVisible] = React.useState<boolean>();
  const menuOpen = () => {
    setMenuVisible(true);
  };

  const menuClose = () => {
    setMenuVisible(false);
  };

  return (
    <header>
      <div className={classes.mainHeader}>
        <div className={`${classes.navMainContainer} ${menuVisible && classes.visible}`}>
          <button
            onClick={menuClose}
            type="button"
            className={classes.menuClose}
          />
          <Navigation
            navigation={navigations.find((x) => x.type === 'main')}
            className={classes.navMain}
          />
        </div>
        <Link to="/" className={classes.logoContainer}>
          {site.logo as Media && (
            <Image
              className={classes.logo}
              image={site.logo as Media}
              width={350}
              height={125}
            />
          )}
        </Link>
        <button
          onClick={menuOpen}
          type="button"
          className={classes.menuOpen}
        />
        <Button
          className={classes.reservationButton}
          layout='big'
          label='Tisch reservieren'
        />
      </div>
      {content}
    </header>
  );
};

export default Header;
