exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allBlogPost {
        nodes {
          tags
        }
      }
    }
  `);

  const allTags = new Set();
  result.data.allBlogPost.nodes.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });

  allTags.forEach(async tag => {
    actions.createPage({
      path: `blog/tag/${tag}`,
      component: require.resolve('./src/templates/tags-query.js'),
      context: {
        tag: [tag],
      },
    });
  });
};
