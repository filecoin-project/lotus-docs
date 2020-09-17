import express from 'express';
import next from 'next';
import BodyParser from 'body-parser';
import compression from 'compression';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  if (!dev) {
    server.use(compression());
  }

  server.use('/public', express.static('public'));
  server.use(BodyParser.json());
  server.use(
    BodyParser.urlencoded({
      extended: false,
    })
  );

  server.get('/cn+:slug', async (req, res) => {
    //req.params.language = 'cn';
    //return app.render(req, res, '/');
    return res.redirect(req.params.slug.replace(/^\+/, ''));
  });

  server.get('/en+:slug', async (req, res) => {
    //req.params.language = 'en';
    //return app.render(req, res, '/');
    return res.redirect(req.params.slug.replace(/^\+/, ''));
  });

  server.get('/:slug', async (req, res) => {
    req.params.language = 'en';
    return app.render(req, res, '/');
  });

  server.get('*', async (req, res) => {
    return nextRequestHandler(req, res, req.url);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`http://localhost:${port}`);
  });
});
