require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-twitch-embed-video/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
