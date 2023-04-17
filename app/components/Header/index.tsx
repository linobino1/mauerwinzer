/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import type { Media } from "payload/generated-types";
import { Navigation } from '../Navigation';
import { Link, useNavigate } from '@remix-run/react';
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
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (menuVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
  }, [menuVisible]);

  return (
    <header>
      <div className={classes.mainHeader}>
        <div className={`${classes.navMainContainer} ${menuVisible && classes.visible}`}>
          <div className={classes.menuHeader}>
            <button
              onClick={menuClose}
              type="button"
              className={classes.menuClose}
            />
          </div>
          <div className={classes.menuBody}>
            <Navigation
              navigation={navigations.find((x) => x.type === 'main')}
              className={classes.navMain}
            />
            <Button
              className={classes.reservationButton}
              layout="big"
              label={site.headerButton.label}
              onClick={() => navigate('?modal=reservation', { preventScrollReset: true })}
              data-mobile-only="true"
            />
          </div>
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
          layout="big"
          label={site.headerButton.label}
          onClick={() => navigate('?modal=reservation', { preventScrollReset: true })}
        />
      </div>
      {content}
    </header>
  );
};

export default Header;
