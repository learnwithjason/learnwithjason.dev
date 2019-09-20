const path = require('path');
const Debug = require('debug');

const debug = Debug('gatsby-theme-video-blog');

exports.onPreBootstrap = () => {
  debug(`==================================
    welcome, traveler!
    my code-slinging compadre
    hope you find the bug
==================================`);
};

const slugify = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  debug('creating VideoEpisode and VideoGuest schema types');

  actions.createTypes([
    schema.buildObjectType({
      name: 'VideoEpisode',
      interfaces: ['Node'],
      fields: {
        id: { type: 'ID!' },
        date: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        slug: {
          type: 'String!',
          resolve: source => source.slug.current || slugify(source.title),
        },
        youtubeID: { type: 'String!' },
        title: { type: 'String!' },
        demo: { type: 'String' },
        repo: { type: 'String' },
        links: { type: '[String!]!' },
        image: {
          type: 'SanityImageAsset!',
          resolve: async (source, _args) => {
            const imageNode = await getNode(source.imageRef);

            return imageNode;
          },
        },
        guest: {
          type: '[VideoGuest!]',
          extensions: {
            link: { by: 'sanityRef' },
          },
        },
        description: { type: 'String!' },
        body: {
          type: 'String!',
          resolve: async (source, args, context, info) => {
            // We don’t want to have to query childMdx, so we pass through the
            // body value here as a shortcut. Adapted from https://git.io/fjp1p
            const type = info.schema.getType('Mdx');
            const mdxNode = context.nodeModel.getNodeById({
              id: source.children[0],
            });
            const resolver = type.getFields()['body'].resolve;
            const result = await resolver(mdxNode, args, context, {
              fieldName: 'body',
            });

            return result;
          },
        },
      },
    }),
    `
      type VideoGuest implements Node @dontInfer {
        id: ID!
        name: String!
        twitter: String!

        # This is only here to allow linking between nodes easily.
        sanityRef: String!
      }
    `,
  ]);
};

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // We only want to make changes when we find these kinds of nodes.
  const allowedTypes = ['SanityEpisode', 'SanityGuest'];
  if (!allowedTypes.includes(node.internal.type)) {
    return;
  }

  debug(`Oh dang, this ${node.internal.type} node is my kind of node.`);

  const nodePicker = {
    SanityEpisode: {
      type: 'VideoEpisode',
      createNode: async ({
        _id,
        date,
        demo,
        description,
        guest = [],
        image,
        links,
        repo,
        slug,
        title,
        transcript = '',
        youtubeID,
      }) => {
        debug(`Creating a new VideoEpisode from ${_id}`);

        return {
          id: createNodeId(`VideoEpisode-${_id}`),
          parent: _id,
          slug: slug.current,
          imageRef: image.asset._ref,
          guest: guest.map(g => g._ref),
          rawBody: transcript,
          date,
          youtubeID,
          title,
          demo,
          repo,
          links,
          description,
        };
      },
    },
    SanityGuest: {
      type: 'VideoGuest',
      createNode: node => {
        debug(`Creating a new VideoEpisode from ${node._id}`);

        return {
          id: createNodeId(`VideoGuest-${node._id}`),
          sanityRef: node.id,
          parent: node._id,
          name: node.name,
          twitter: node.twitter,
        };
      },
    },
  };

  const { type, createNode } = nodePicker[node.internal.type];
  const newNode = await createNode(node);

  debug('We’re doing it! We’re creating a new node!');

  /*
   * To get `gatsby-plugin-mdx` to process the Markdown files from Sanity, we
   * need to tell Gatsby that the episode nodes are Markdown and send the
   * Markdown content as content to be processed as MDX.
   *
   * For more info, check out Chris’s post:
   * https://www.christopherbiscardi.com/post/creating-mdx-nodes-from-raw-strings/
   */
  const extraInternals =
    type === 'VideoEpisode'
      ? { content: newNode.rawBody, mediaType: 'text/markdown' }
      : {};

  await actions.createNode({
    ...newNode,
    internal: {
      type,
      contentDigest: createContentDigest(newNode),
      ...extraInternals,
    },
  });
};

exports.createPages = async (
  { actions, graphql, reporter },
  { basePath = '/' },
) => {
  const result = await graphql(`
    {
      allVideoEpisode {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('Error loading videos', JSON.stringify(result.errors));
  }

  result.data.allVideoEpisode.nodes.forEach(({ slug }) => {
    debug(`creating a page for ${slug}`);
    actions.createPage({
      path: path.join(basePath, slug),
      component: require.resolve('./src/templates/video-template.js'),
      context: { slug, basePath },
    });
  });

  debug(`create a video blog listing at ${basePath}`);

  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/video-list-template.js'),
    context: { basePath },
  });
};
