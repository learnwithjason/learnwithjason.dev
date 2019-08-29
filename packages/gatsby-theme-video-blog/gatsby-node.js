exports.createPages = async ({ actions, graphql, reporter }) => {
  // const result = await graphql(`
  //   {
  //     allVideo {
  //       nodes {
  //         id
  //         videoID
  //       }
  //     }
  //   }
  // `);

  // if (result.errors) {
  //   reporter.panic(result.errors);
  // }

  // result.data.allVideo.nodes.forEach(({ id, videoID }) => {
  //   actions.createPage({
  //     path: videoID,
  //     component: require.resolve('./src/templates/video-template.js'),
  //     context: { video: id },
  //   });
  // });

  actions.createPage({
    path: '/',
    component: require.resolve('./src/templates/video-list-template.js'),
  });
};
