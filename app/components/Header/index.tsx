/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import type {
  Media,
} from "payload/generated-types";
import { Navigation } from '../Navigation';
import { UserStatus } from '../UserStatus';
import { Link } from '@remix-run/react';
import { Image } from '~/components/Image';
import type { Site, Navigation as NavigationType } from 'payload/generated-types';
import classes from './index.module.css';

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
    <header className={classes.header}>
      <div className={classes.mainHeader}>
        <Link to="/">
          {site.logo as Media && (
            <Image
              className={classes.mainLogo}
              image={site.logo as Media}
              width={200}
              height={50}
            />
          )}
        </Link>
        <button
          onClick={menuOpen}
          type="button"
          className={classes.menuOpen}
        />
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
        <UserStatus />
      </div>
      {content}
    </header>
  );
};

export default Header;
