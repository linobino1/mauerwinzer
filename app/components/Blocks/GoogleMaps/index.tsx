import React from "react";
import classes from "./index.module.css";
import { useCookieConsent } from "~/providers/Cookies";
import { useTranslation } from "react-i18next";
import Button from "~/components/Button";

export type Type = {
  blockType: "googleMaps";
  blockName?: string | null;
  title?: string | null;
  src: string;
};

export const GoogleMaps: React.FC<Type> = ({ title, src }) => {
  const { consent, resetConsent } = useCookieConsent();
  const { t } = useTranslation();

  return consent ? (
    <div className={classes.container}>
      {title && <h2>{title}</h2>}
      <iframe
        title="Google Maps"
        src={src}
        width="800"
        height="600"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  ) : (
    <div className={classes.noConsent}>
      <p>{t("cookies.noConsent")}</p>
      {consent !== null && (
        <Button onClick={resetConsent}>{t("cookies.resetConsent")}</Button>
      )}
    </div>
  );
};

export default GoogleMaps;
