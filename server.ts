import express from "express";
import compression from "compression";
import morgan from "morgan";
import sourceMapSupport from "source-map-support";
import payload from "payload";
import invariant from "tiny-invariant";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals, type ServerBuild } from "@remix-run/node";
import { sender, transport } from "./email";
import type { Media, Menu } from "payload/generated-types";

// patch in Remix runtime globals
installGlobals();
require("dotenv").config();
sourceMapSupport.install();

async function start() {
  const app = express();

  const vite =
    process.env.NODE_ENV === "production"
      ? undefined
      : // @ts-ignore
        await import("vite").then(({ createServer }) =>
          createServer({
            server: {
              middlewareMode: true,
            },
          })
        );

  // Start Payload CMS
  invariant(process.env.PAYLOAD_SECRET, "PAYLOAD_SECRET is required");

  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    email: {
      fromName: sender.name,
      fromAddress: sender.address,
      transport,
    },
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.use(payload.authenticate);

  // Express Server setup
  app.use(compression());

  // http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
  app.disable("x-powered-by");

  // Everything else (like favicon.ico) is cached for an hour. You may want to be
  // more aggressive with this caching.
  app.use(express.static("public", { maxAge: "1h" }));

  app.use(morgan("tiny"));

  // robots.txt
  app.get("/robots.txt", function (req, res) {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow:");
  });

  // custom menu route
  app.get("/menu-(inhouse|takeaway|food)", async (req, res) => {
    // @ts-expect-error
    const payload: Payload = req.payload;
    const menu = await payload.findGlobal({
      slug: "menu",
    });

    switch (req.path) {
      case "/menu-takeaway":
        return res.redirect(
          ((menu as Menu)?.menuTakeAway as Media).url as string
        );
      case "/menu-inhouse":
        return res.redirect(
          ((menu as Menu)?.menuInHouse as Media).url as string
        );
      case "/menu-food":
        return res.redirect(((menu as Menu)?.menuFood as Media).url as string);
      default:
        return res.status(400).send("Bad request");
    }
  });

  // handle Remix asset requests
  if (vite) {
    app.use(vite.middlewares);
  } else {
    app.use(
      "/assets",
      express.static("build/client/assets", { immutable: true, maxAge: "1y" })
    );
  }

  app.use(express.static("build/client", { maxAge: "1h" }));

  // handle Remix SSR requests
  app.all(
    "*",
    createRequestHandler({
      // @ts-ignore
      build: vite
        ? () =>
            vite.ssrLoadModule(
              "virtual:remix/server-build"
            ) as Promise<ServerBuild>
        : // @ts-ignore
          await import("./build/server/index.js"),
      getLoadContext(req, res) {
        return {
          payload: req.payload,
          user: req?.user,
          res,
        };
      },
    })
  );

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log("Express server listening on http://localhost:" + port)
  );
}

start();
