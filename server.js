import express from 'express';
import next from 'next';
import BodyParser from 'body-parser';
import compression from 'compression';
import LibraryEnglish from '~/.data.json';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 1337;
const app = next({ dev, quiet: false });
const nextRequestHandler = app.getRequestHandler();

function recSlugs(slugs, posts) {
  for (let i = 0; i < posts.length; i++) {
    slugs[posts[i].slug] = true
    if (posts[i].posts != null && posts[i].posts.length > 0) {
      recSlugs(slugs, posts[i].posts)
    }
  }
}

app.prepare().then(() => {
  var slugs = {}
  recSlugs(slugs, LibraryEnglish.posts)

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

    // Render pages in the library
    if (slugs['en'+req.params.slug] === true) {
      req.params.language = 'en';
      return app.render(req, res, '/');
    } else {
      return res.redirect(req.params.slug.replace(/^\+/, ''));
    }
  });

  // server.get('/:slug', async (req, res) => {
  //   req.params.language = 'en';
  //   return app.render(req, res, '/');
  // });

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
