require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
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
      },
    },
  ],
};
