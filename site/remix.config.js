const path = require('path');

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
    const [rehypeSlug] = await Promise.all([
      import('rehype-slug').then((mod) => mod.default),
    ]);

    console.log(rehypeSlug);

    return {
      remarkPlugins: [
        [
          require('remark-prism'),
          {
            plugins: ['prismjs/plugins/diff-highlight/prism-diff-highlight'],
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          require('rehype-local-image-to-cloudinary'),
          {
            baseDir: path.join(__dirname, 'public'),
            uploadFolder: 'lwj',
          },
        ],
      ],
    };
  },
};
