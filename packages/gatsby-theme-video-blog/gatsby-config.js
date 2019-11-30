const isProd = process.env.NODE_ENV === 'production';

module.exports = ({ projectId, dataset, token }) => ({
  siteMetadata: {
    title: 'Learn With Jason — live coding with friends!',
    description: `
      Join Jason Lengstorf as he pair programs with 
      brilliant folks from the community to build 
      something live in about 90 minutes.
    `,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        token,
        overlayDrafts: false,
        watchMode: !isProd,
      },
    },
  ],
});
