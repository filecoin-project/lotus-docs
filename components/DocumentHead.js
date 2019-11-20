import * as React from 'react';
import Head from 'next/head';

const getScript = () => {
  return `
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "url": "https://docs.lotu.sh"
    }
  `.replace(/\n/g, '');
};

const getAnalyticsScript = id => {
  return `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${id}', {cookieDomain: 'auto', siteSpeedSampleRate: 100});
ga('send', 'pageview');
`.replace(/\n/g, '');
};

export const GoogleScript = props => {
  let markup = { __html: getAnalyticsScript(props.id) };
  return <script dangerouslySetInnerHTML={markup} />;
};

export const JSONLD = () => {
  let markup = { __html: getScript() };
  return <script type="application/ld+json" dangerouslySetInnerHTML={markup} />;
};

export default props => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="sourceApp" content="mobileWeb" />
      <title>莲 — {props.title}</title>
      <meta name="description" content={props.description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@minefilecoin" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content="/static/logo-512.png" />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lotus" />
      <meta property="og:image" content="/static/logo-512.png" />
      <meta property="og:image:url" content="/static/logo-512.png" />
      <meta property="og:image:secure_url" content="/static/logo-512.png" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/static/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/static/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/static/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/static/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/static/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/static/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/static/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/static/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/static/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <JSONLD />
      <GoogleScript id="UA-154346500-1" />
    </Head>
  );
};
