import { useMatches } from "@remix-run/react";
import Image from "../Image";
import classes from "./index.module.css";
import type { Media } from "payload/generated-types";

export default function PageFooter() {
  const data = useMatches();
  const page = data.find((x) => x.id === 'routes/__main/$page/index')?.data.page;

  return (
    <div className={classes.pageFooter}>
      { page?.footerImage as Media && (
        <div className={classes.imageFooter}>
          <Image
            className={classes.footerImage}
            image={page.footerImage as Media}
            responsive={[
              { size: 'header-landscape-2560w', screenWidth: 2560, renderedWidth: '95vw' },
              { size: 'header-landscape-1024w', screenWidth: 1024, renderedWidth: '95vw' },
              { size: 'header-square-768w', screenWidth: 768, renderedWidth: '768px' },
              { size: 'header-square-512w', screenWidth: 512, renderedWidth: '512px' },
            ]}
          />
        </div>
      )}
    </div>
  )
}
