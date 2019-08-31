require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content',
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-theme-video-blog',
      options: {},
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
        ],
      },
    },
  ],
};
