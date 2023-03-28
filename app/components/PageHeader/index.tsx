import { useMatches } from "@remix-run/react";
import Image from "../Image";
import Navigation from "../Navigation";
import classes from "./index.module.css";
import type { Media } from "payload/generated-types";

export default function PageHeader() {
  const data = useMatches();
  const navigations = data.find((x) => x.id === 'routes/__main')?.data.navigations;
  const page = data.find((x) => x.id === 'routes/__main/$page/index')?.data.page;

  return (
    <header className={classes.pageHeader}>
      { page?.image as Media && (
        <div className={classes.imageHeader}>
          <Image
            className={classes.headerImage}
            image={page.image as Media}
          />
          <div className={classes.imageHeaderOverlay}>
            <button
              type="button"
              className={classes.backButton}
              onClick={() => window.history.back()}
              aria-label="back"
            />
            <Navigation
              navigation={navigations?.find((x: any) => x.type === 'socialMedia')}
              className={classes.navSocial}
            />
          </div>
        </div>
      )}
      { page?.title && (
        <h1 className={classes.titleHeader}>
          {page.title}
        </h1>
      )}
    </header>
  )
}
