import express from "express";
import next from "next";
import BodyParser from "body-parser";
import compression from "compression";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));
  server.use(BodyParser.json());
  server.use(
    BodyParser.urlencoded({
      extended: false
    })
  );

  server.get("/:slug", async (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("*", async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`http://localhost:${port}`);
  });
});
