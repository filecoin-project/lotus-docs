# Lotus docs 

This repository contains the documentation, build scripts, and issue tracking for the Lotus project. If you'd just like to read the Lotus docs, head to [lotus.filecoin.io](https://lotus.filecoin.io).

## Get involved

We would **love ❤️ your help** to improve existing items or make new ones even better!

### Issues

If you find something wrong within this repository, please raise an [issue here →](https://github.com/filecoin-project/lotus-docs/issues). 

If you are attempting to close an issue, great! Thanks for the help! Please leave a comment within the issue requesting to be assigned to that issue **before** submitting a pull request. This minimizes the chance of multiple different contributors duplicating work by submitting pull requests for the same issue. If you submit a pull request to an issue _without_ first being assigned to it, that pull request may not be accepted.

### Suggestions

Everyone has an opinion when it comes to docs, and **that's a good thing**! Having folks from different backgrounds add to a discussion empowers everyone within that discussion. So if you've got something to add or would like to bring up a topic for discussion about the Lotus Docs project, please do so! [Just create an issue using the `kind/discussion` tag!](https://github.com/filecoin-project/lotus-docs/labels/kind%2Fdiscussion).

#### Pull requests welcome

Feel free to submit pull requests with any changes you'd like to see! If you're simply changing a typo or editing out a styling bug, you can add `ciskip` to the title of your pull request to stop Filecorgi from running.

## Project set up

If you want to build this site locally, run the following:

1. Clone this repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus-docs.git
   ```

1. Move into the `lotus-docs` folder and install the NPM dependencies:

   ```shell
   cd lotus-docs
   npm install
   ```

1. Boot up the application in _developer mode_:

   ```shell
   npm start
   ```

1. Open [localhost:1313](http://localhost:1313/) in your browser.
1. Close the local server with `CTRL` + `c`.
1. To restart the local server, run `npm start` from within the `lotus-docs` folder.
1. Run `npm run build` to publish the site. The project will be built and saved to the `public` folder.

## License

Dual-licensed by Protocol Labs under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) and [MIT](http://opensource.org/licenses/MIT) terms, as explained in the [Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack/):
