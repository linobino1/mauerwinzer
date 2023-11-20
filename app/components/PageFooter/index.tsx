import { useMatches } from "@remix-run/react";
import Image from "../Image";
import classes from "./index.module.css";
import type { Media } from "payload/generated-types";

export default function PageFooter() {
  const data = useMatches();
  const page = data.find((x) => x.id === "routes/__main/$page/index")?.data
    .page;

  return (
    <div className={classes.pageFooter}>
      {(page?.footerImage as Media) && (
        <div className={classes.imageFooter}>
          <Image
            className={classes.footerImage}
            image={page.footerImage as Media}
          />
        </div>
      )}
    </div>
  );
}
