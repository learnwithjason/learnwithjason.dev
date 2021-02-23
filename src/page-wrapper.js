import { h, Fragment } from 'preact';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/preact';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';
import { PostTemplate } from './components/post-template.js';
import { PageTemplate } from './components/page-template.js';

Sentry.init({
  dsn:
    'https://52fddedd5d784c1e94b484097d35a589@o530194.ingest.sentry.io/5649362',
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const components = {
  codeblock: (props) => {
    const className = props.className ?? 'language-text';

    return (
      <pre
        class={`${
          className.includes('-diff-') ? 'diff-highlight' : ''
        } ${className}`}
      >
        <code dangerouslySetInnerHTML={{ __html: props.children }} />
      </pre>
    );
  },
};

export default function PageWrapper(props) {
  const {
    title = 'Learn With Jason — learn something new in 90 minutes!',
    description = 'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    image = 'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
    url = 'https://www.learnwithjason.dev',
  } = props?.meta ?? {};

  const Component = props?.meta?.type === 'post' ? PostTemplate : Fragment;

  let wrapperClass = '';
  if (props.meta?.type === 'post') {
    wrapperClass = 'post-container';
  }

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

        <title>{title}</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c10b7e" />
        <meta name="msapplication-TileColor" content="#201d29" />
        <meta name="theme-color" content="#ffffff"></meta>

        <meta name="description" content={description} />
        <meta name="image" content={image} />

        <meta property="og:type" content={props.meta ? 'article' : 'website'} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:dnt" content="on" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@LWJShow" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="stylesheet" href="/styles/index.css" />

        {/* TODO why doesn't this render? */}
        <noscript>{`
          <link rel="stylesheet" href="/styles/no-js.css" />
        `}</noscript>
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
      <main id="content" class={wrapperClass}>
        {props.meta?.type === 'page' ? (
          <PageTemplate {...props.meta}>{props.children}</PageTemplate>
        ) : (
          <Component {...props}>{props.children}</Component>
        )}
      </main>
      <Footer />
    </MDXProvider>
  );
}
