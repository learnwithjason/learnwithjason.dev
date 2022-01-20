import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

import { Header } from './components/header.jsx';

import styles from './styles/main.css';

export function meta() {
  return {
    title: 'Learn With Jason — learn something new in 90 minutes!',
    'msapplication-TileColor': '#201d29',
    'theme-color': '#ffffff',
    description:
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
    'og:type': 'website',
    'og:url': 'https://www.learnwithjason.dev/',
    'og:description':
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    'og:image':
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@LWJShow',
    'twitter:title': 'Learn With Jason — learn something new in 90 minutes!',
    'twitter:description':
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    'twitter:image':
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
  };
}

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preload',
      href: '/fonts/jwf-book.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      href: '/fonts/jwf-bookitalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      href: '/fonts/jwf-bold.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      href: '/fonts/jwf-bolditalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      href: '/fonts/jwf-ultra.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    {
      rel: 'preload',
      href: '/fonts/jwf-ultraitalic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'true',
    },
    { rel: 'preconnect', href: 'https://res.cloudinary.com' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#c10b7e' },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <svg className="svg-defs">
          <defs>
            <linearGradient
              id="lwj-gradient"
              x1="0"
              x2="100%"
              y1="100%"
              y2="100%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#D459AB" />
              <stop offset=".5" stopColor="#FFDF37" />
              <stop offset="1" stopColor="#A6FFFA" />
              <stop offset="1" stopColor="#A6FFFA" />
              <stop offset="1" stopColor="#A6FFFA" />
            </linearGradient>
          </defs>
        </svg>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
