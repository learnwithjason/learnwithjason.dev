module.exports = {
  siteMetadata: {
    title: 'Learn With Jason',
    author: 'Jason Lengstorf',
    description: 'TKTK',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-theme-blog-core',
      options: {
        basePath: '/blog',
        mdx: false,
      },
    },
  ],
};
