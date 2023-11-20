import React from "react";
import classes from "./index.module.css";
import { Form } from "~/components/Form";
import Button from "~/components/Button";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTranslation } from "react-i18next";
import { useLocale } from "remix-i18next";
import type { Site } from "payload/generated-types";
import environment from "~/util/environment";
import { useModal } from "@faceless-ui/modal";

export type Props = {
  site: Site;
};

export const ReservationForm: React.FC<Props> = ({ site }) => {
  const modal = useModal();
  const { t } = useTranslation();
  const locale = useLocale();

  const from = new Date(site.reservations.from).toTimeString().slice(0, 5);
  const until = new Date(site.reservations.until).toTimeString().slice(0, 5);

  return (
    <Form method="post" className={classes.form}>
      <h3>{t("Reserve a table")}</h3>
      <input type="hidden" name="action" value="reservation" required={true} />
      <input
        type="date"
        name="date"
        aria-label={t("Date") as string}
        defaultValue={new Date().toISOString().split("T")[0]}
        min={new Date().toISOString().split("T")[0]}
        required={true}
      />
      <input
        type="time"
        name="time"
        aria-label={t("Time") as string}
        min={from}
        max={until}
        defaultValue={"19:00"}
        required={true}
      />
      <input
        type="text"
        name="partySize"
        aria-label={t("Party Size") as string}
        defaultValue={"2"}
        required={true}
      />
      <input
        type="text"
        name="name"
        aria-label={t("Name") as string}
        required={true}
      />
      <input
        type="email"
        name="email"
        required={true}
        aria-label={t("Email") as string}
      />
      <input type="tel" name="phone" aria-label={t("Phone") as string} />
      <textarea name="message" aria-label={t("Message") as string} />
      <div data-name="hCaptcha" data-type="hCaptcha">
        <HCaptcha
          sitekey={environment().HCAPTCHA_SITE_KEY}
          languageOverride={locale}
        />
      </div>
      <Button className={classes.submit} layout="submit" type="submit">
        {t("Send")}
      </Button>
    </Form>
  );
};

export default ReservationForm;
