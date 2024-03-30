import React, { useEffect } from "react";
import classes from "./index.module.css";
import { getCookieConsentValue } from "react-cookie-consent";

export type Type = {
  blockType: "googleMaps";
  blockName?: string | null;
  title?: string | null;
  src: string;
};

export const GoogleMaps: React.FC<Type> = ({ title, src }) => {
  const [consent, setConsent] = React.useState(false);
  useEffect(() => {
    setConsent(!!getCookieConsentValue());
  }, []);
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
    <>
      {/* TODO: we could show a preview here asking the user to consent to cookies */}
    </>
  );
};

export default GoogleMaps;
