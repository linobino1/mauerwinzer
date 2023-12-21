import type { GlobalConfig } from "payload/types";
import { t } from "../i18n";

export const Menu: GlobalConfig = {
  slug: "menu",
  label: t("Menu"),
  admin: {
    group: t("Contents"),
  },
  fields: [
    {
      name: "menuInHouse",
      label: t("Wine Menu in-house"),
      type: "upload",
      relationTo: "media",
    },
    {
      name: "menuTakeAway",
      label: t("Wine Menu take-away"),
      type: "upload",
      relationTo: "media",
    },
    {
      name: "menuFood",
      label: t("Food Menu"),
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default Menu;
