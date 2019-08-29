module.exports = options => ({
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
    // 'gatsby-interface-video',
    // {
    //   resolve: 'gatsby-source-video-youtube',
    //   options,
    // },
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: 'content/videos',
    //     name: 'videos',
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-mdx',
    //   options: {},
    // },
    'gatsby-plugin-theme-ui',
  ],
});
