import React, { useEffect } from "react";
import type {
  Media,
  Site,
  Navigation as NavigationType,
} from "payload/generated-types";
import { Navigation } from "../Navigation";
import { Link, useLocation } from "@remix-run/react";
import { Image } from "~/components/Image";
import classes from "./index.module.css";
import Button from "../Button";
import LanguageSwitch from "../LanguageSwitch";
import { useTranslation } from "react-i18next";
import { Modal, useModal } from "@faceless-ui/modal";
import ReservationForm from "../ReservationForm";
import { Hamburger } from "./Hamburger";

type Props = {
  site: Site;
  navigations: NavigationType[];
  content?: React.ReactNode;
};

const Header: React.FC<Props> = ({ site, navigations }) => {
  const { t } = useTranslation();
  const { openModal, closeModal, oneModalIsOpen, closeAllModals, isModalOpen } =
    useModal();
  const location = useLocation();

  useEffect(() => {
    closeModal("menu");
  }, [location, closeModal]);

  return (
    <>
      <header className={classes.mobile}>
        <Button
          className={classes.hamburger}
          onClick={() =>
            oneModalIsOpen ? closeAllModals() : openModal("menu")
          }
        >
          <Hamburger collapsed={isModalOpen("menu")} />
        </Button>
      </header>
      <header className={classes.main}>
        <Navigation
          navigation={navigations.find((x) => x.type === "main")}
          className={classes.main}
        />
        <Link to="/" style={{ display: "contents" }}>
          {(site.logo as Media) && (
            <Image
              className={classes.logo}
              image={site.logo as Media}
              responsive={false}
              width={350}
              height={125}
            />
          )}
        </Link>
        <nav className={classes.secondary}>
          <LanguageSwitch />
          <Button
            layout="big"
            className={classes.reservationButton}
            onClick={() => openModal("reservation")}
          >
            {t("Reserve a Table")}
          </Button>
        </nav>
      </header>
      <Modal slug="menu" className={`${classes.modal} ${classes.mobileMenu}`}>
        <Button
          className={classes.reservationButton}
          layout="big"
          onClick={() => openModal("reservation")}
        >
          {t("Reserve a Table")}
        </Button>
        <Navigation
          navigation={navigations.find((x) => x.type === "mobile")}
          className={classes.mobile}
        />
      </Modal>
      <Modal slug="reservation" className={classes.modal}>
        <ReservationForm site={site} />
      </Modal>
    </>
  );
};

export default Header;
