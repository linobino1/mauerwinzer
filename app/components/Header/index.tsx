import React, { useEffect, useState } from "react";
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
import ReservationForm from "../ReservationForm";
import { Hamburger } from "./Hamburger";
import Modal from "../Modal";

type Props = {
  site: Site;
  navigations: NavigationType[];
};

const Header: React.FC<Props> = ({ site, navigations }) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setModal(null);
    document.body.style.overflow = "auto";
  }, [location]);

  // modals
  const [modal, setModal] = useState<"menu" | "reservation" | null>(null);
  const toggleModal = (slug: "menu" | "reservation" | "closeAll") => {
    let newState = slug === "closeAll" || slug === modal ? null : slug;
    if (newState === null) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    setModal(newState);
  };

  return (
    <>
      <header className={classes.mobile}>
        <Button
          className={classes.hamburger}
          onClick={() => toggleModal("menu")}
        >
          <Hamburger collapsed={modal !== null} />
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
              media={site.logo as Media}
              width={350}
              height={125}
              sizes="350px"
              srcSet={[
                {
                  options: { width: 350 },
                  size: "350w",
                },
              ]}
            />
          )}
        </Link>
        <nav className={classes.secondary}>
          <LanguageSwitch />
          <Button
            layout="big"
            className={classes.reservationButton}
            onClick={() => toggleModal("reservation")}
          >
            {t("Reserve a Table")}
          </Button>
        </nav>
      </header>
      <div className={classes.modalHost}>
        <Modal show={modal === "menu"} className={classes.mobileMenu}>
          <Button
            className={classes.reservationButton}
            layout="big"
            onClick={() => toggleModal("reservation")}
          >
            {t("Reserve a Table")}
          </Button>
          <Navigation
            navigation={navigations.find((x) => x.type === "mobile")}
            className={classes.mobile}
          />
        </Modal>
        <Modal show={modal === "reservation"}>
          <header>
            <Button
              onClick={() => toggleModal("closeAll")}
              layout="symbol"
              symbol="close"
            />
          </header>
          <ReservationForm site={site} />
        </Modal>
      </div>
    </>
  );
};

export default Header;
