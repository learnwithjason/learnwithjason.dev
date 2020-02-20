require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Learn With Jason — live coding with friends!',
    description: `
      Join Jason Lengstorf as he pair programs with 
      brilliant folks from the community to build 
      something live in about 90 minutes.
    `,
    baseUrl: 'https://learnwithjason.dev',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    '@jlengstorf/gatsby-theme-code-blog',
    {
      resolve: 'gatsby-theme-video-blog',
      options: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Learn With Jason',
        short_name: 'LWJ',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#D459AB',
        display: 'standalone',
        icon: 'static/images/learn-with-jason-icon.png',
      },
    },
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // should this be configurable by the end-user?
              maxWidth: 1380,
              linkImagesToOriginal: false,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-smartypants` },
        ],
        remarkPlugins: [require(`remark-slug`)],
      },
    },
    {
      resolve: 'gatsby-plugin-webmention',
      options: {
        username: 'www.learnwithjason.dev',
        identity: {
          github: 'jlengstorf',
          twitter: 'jlengstorf',
        },
        mentions: true,
        pingbacks: true,
        domain: 'www.learnwithjason.dev',
        token: process.env.WEBMENTION_API_KEY,
      },
    },
  ],
};
