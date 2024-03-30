import React from "react";
import classes from "./index.module.css";
import type { Page } from "payload/generated-types";
import Button from "~/components/Button";
import { useNavigate } from "@remix-run/react";

export type CallToActionProps = {
  blockType: "callToAction";
  blockName?: string | null;
  items?:
    | {
        title: string;
        type: "internal" | "external";
        page?: Page | string | null;
        url?: string | null;
        newTab?: boolean | null;
      }[]
    | null;
};

export const CallToAction: React.FC<CallToActionProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      {items?.map((item) => {
        const path =
          item.type === "internal"
            ? `/${(item.page as Page).slug}`
            : (item.url as string);

        return (
          <Button
            key={item.title + item.page}
            layout="big"
            onClick={
              item.newTab
                ? () => window.open(path, "_blank")
                : () => navigate(path)
            }
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
};

export default CallToAction;
