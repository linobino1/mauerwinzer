import type { CollectionConfig } from "payload/types";
import { t } from "../i18n";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: t("Media"),
    plural: t("Media"),
  },
  admin: {
    group: t("Media"),
  },
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  fields: [
    {
      name: "alt",
      label: "Alt Text",
      type: "text",
      required: true,
    },
  ],
};

export default Media;
