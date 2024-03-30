import React from "react";
import classes from "./index.module.css";
import { Image as ImageComponent } from "~/components/Image";
import type { Media } from "payload/generated-types";

export type Type = {
  blockType: "image";
  blockName?: string | null;
  image?: Media | string | null;
};

export const Image: React.FC<Type> = ({ image }) => {
  return (image as Media) ? (
    <div className={classes.container}>
      <ImageComponent
        media={image as Media}
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
  ) : (
    <></>
  );
};

export default Image;
