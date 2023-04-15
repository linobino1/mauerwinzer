import { useMatches } from "@remix-run/react";
import Image from "../Image";
import classes from "./index.module.css";
import type { Media } from "payload/generated-types";

export default function PageHeader() {
  const data = useMatches();
  const page = data.find((x) => x.id === 'routes/__main/$page/index')?.data.page;

  return (
    <header className={classes.pageHeader}>
      { page?.image as Media && (
        <div className={classes.imageHeader}>
          <Image
            className={classes.headerImage}
            image={page.image as Media}
            responsive={[
              { size: 'landscape-2560w', screenWidth: 2560, renderedWidth: '95vw' },
              { size: 'landscape-1280w', screenWidth: 1024, renderedWidth: '95vw' },
              { size: 'square-768w', screenWidth: 768, renderedWidth: '768px' },
              { size: 'square-512w', screenWidth: 512, renderedWidth: '512px' },
            ]}
          />
        </div>
      )}
    </header>
  )
}
