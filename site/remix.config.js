const cloudinary = require('rehype-local-image-to-cloudinary');
// const headings = require('rehype-autolink-headings').default;
const prism = require('remark-prism');

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'netlify/functions/server/build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
  mdx: {
    remarkPlugins: [prism],
    // rehypePlugins: [cloudinary],
  },
};
