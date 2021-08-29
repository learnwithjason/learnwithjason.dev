// "snowpack": {
//   "exclude": [
//     "bin/**/*",
//     "public/**/*",
//     "toast.js",
//     "studio/**/*"
//   ],
// },
export const specs = [
  'gsap',
  'preact/hooks',
  'preact',
  'react-helmet',
  'react-twitch-embed-video',
  '@sentry/react',
  '@sentry/tracing',
  'algoliasearch',
  'algoliasearch/lite.js',
  '@algolia/autocomplete-js',
  '@mdx-js/preact',
];

export const options = {
  alias: {
    react: 'preact/compat',
  },
};
