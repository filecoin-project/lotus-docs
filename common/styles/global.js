import { injectGlobal } from 'react-emotion';

import * as Constants from '~/common/constants';

/* prettier-ignore */
export default () => injectGlobal`
  @font-face {
    font-family: 'body';
    src: url('/static/SansSerif-Regular.woff2') format('woff');
  }

  @font-face {
    font-family: 'medium';
    src: url('/static/SansSerif-Medium.woff2') format('woff');
  }

  @font-face {
    font-family: 'mono';
    src: url('/static/SFMono-Medium.woff') format('woff');
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html, body {
    background: ${Constants.theme.pageBackground};
    color: ${Constants.theme.pageText};
    font-size: 16px;
    font-family: 'body', -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica,
    ubuntu, roboto, noto, segoe ui, arial, sans-serif;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    strong {
      font-family: "medium";
      font-weight: 400;
    }
  }
`;
