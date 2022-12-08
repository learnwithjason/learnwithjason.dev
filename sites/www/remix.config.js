const path = require("path");

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
  mdx: async () => {
    const rehypeSlug = await import('rehype-slug');
    const remarkPrism = await import('remark-prism');
    const rehypeCloudinary = await import('rehype-local-image-to-cloudinary');

    return {
      remarkPlugins: [
        [
          remarkPrism.default,
          {
            plugins: ['prismjs/plugins/diff-highlight/prism-diff-highlight'],
          },
        ],
      ],
      rehypePlugins: [
        [
          rehypeSlug.default,
          [
            rehypeCloudinary.default,
            {
              baseDir: path.join(__dirname, 'public'),
              uploadFolder: 'lwj',
            },
          ],
        ],
      ],
    };
  },
};
