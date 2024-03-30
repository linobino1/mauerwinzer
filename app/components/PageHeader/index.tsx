import Image from "../Image";
import classes from "./index.module.css";
import type { Media, Page } from "payload/generated-types";

export interface PageHeaderProps {
  page: Page;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ page }) => {
  return (
    <header className={classes.pageHeader}>
      {(page?.image as Media) && (
        <div className={classes.imageHeader}>
          <Image
            className={classes.headerImage}
            media={page.image as Media}
            sizes="(max-width: 1000px) 130vw, 100vw"
            srcSet={[
              {
                options: { width: 2560 },
                size: "2560w",
              },
              {
                options: { width: 1920 },
                size: "1920w",
              },
              {
                options: { width: 1280 },
                size: "1280w",
              },
              {
                options: { width: 960 },
                size: "960w",
              },
              {
                options: { width: 640 },
                size: "640w",
              },
            ]}
          />
        </div>
      )}
    </header>
  );
};

export default PageHeader;
