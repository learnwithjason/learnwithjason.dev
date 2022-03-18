import { useState } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from 'remix';

import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';
import { Search } from './components/search/index.jsx';
import { loadFromApi } from './util/fetch-api.server.js';

import styles from './styles/main.css';
import search from './styles/search.css';

export function meta() {
  return {
    title: 'Learn With Jason — learn something new in 90 minutes!',
    'msapplication-TileColor': '#201d29',
    'theme-color': '#ffffff',
    description:
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og-2022.jpg',
    'og:type': 'website',
    'og:url': 'https://www.learnwithjason.dev/',
    'og:description':
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    'og:image':
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og-2022.jpg',
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@LWJShow',
    'twitter:title': 'Learn With Jason — learn something new in 90 minutes!',
    'twitter:description':
      'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday & Thursday. Join live and learn with us!',
    'twitter:image':
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og-2022.jpg',
  };
}

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: search },
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: 'Episodes RSS Feed',
      href: '/episodes.xml',
    },
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
    { rel: 'preconnect', href: 'https://MU9BHW5MNS-dsn.algolia.net' },
  ];
}

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  const schedulePromise = loadFromApi('/api/schedule');
  const episodesPromise = loadFromApi('/api/episodes');

  return {
    schedule: (await schedulePromise).slice(0, 3),
    episodes: (await episodesPromise).slice(0, 3),
    search: search !== null,
  };
};

export default function App() {
  const matches = useMatches();
  const { schedule, episodes, search } = useLoaderData();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(search);

  function toggleSearchModal(isOpen) {
    setIsSearchModalOpen(isOpen);

    document.body.style.overflow = isOpen ? 'hidden' : '';

    const searchParams = new URLSearchParams(window.location.search);

    if (!isOpen && searchParams.get('search') !== null) {
      searchParams.delete('search');

      history.pushState(
        null,
        '',
        [window.location.pathname, searchParams.toString()]
          .filter(Boolean)
          .join('?'),
      );
    }
  }

  let wrapperClass = '';
  if (matches.some(({ pathname }) => pathname === '/blog/')) {
    wrapperClass = 'post-listing-container';
  } else if (matches.some(({ pathname }) => pathname === '/blog')) {
    wrapperClass = 'post-container';
  }

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
        <Header onOpenSearch={() => toggleSearchModal(true)} />
        <main id="content" className={wrapperClass}>
          <Outlet />
        </main>
        <Footer />
        <Search
          data={{ schedule, episodes }}
          isOpen={isSearchModalOpen}
          onToggle={toggleSearchModal}
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
