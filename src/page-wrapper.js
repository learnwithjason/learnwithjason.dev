import { h } from 'preact';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/preact';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

const components = {
  codeblock: (props) => (
    <div dangerouslySetInnerHTML={{ __html: props.children }} />
  ),
};
export default function PageWrapper(props) {
  return (
    <MDXProvider components={components}>
      <Helmet>
        <html lang="en" />

        <link
          rel="preload"
          href="/fonts/jwf-book.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/jwf-bookitalic.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/jwf-bold.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/jwf-bolditalic.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/jwf-ultra.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link
          rel="preload"
          href="/fonts/jwf-ultraitalic.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <svg class="svg-defs">
        <defs>
          <linearGradient
            id="lwj-gradient"
            x1="0"
            x2="100%"
            y1="100%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#D459AB" />
            <stop offset=".5" stop-color="#FFDF37" />
            <stop offset="1" stop-color="#A6FFFA" />
            <stop offset="1" stop-color="#A6FFFA" />
            <stop offset="1" stop-color="#A6FFFA" />
          </linearGradient>
        </defs>
      </svg>
      <Header />
      <main class={props.meta ? 'content' : ''}>{props.children}</main>
      <Footer />
    </MDXProvider>
  );
}
