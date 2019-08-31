require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const axios = require('axios');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      originalID: String!
      title: String!
      slug: String!
      start: Date! @dateformat
      end: Date! @dateformat
      description: String!
      image: File!
    }
  `);
};

exports.createResolvers = ({ createResolvers }) => {
  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  createResolvers({
    Event: {
      slug: source => slugify(source.title),
    },
  });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter,
}) => {
  /*
   * This is an undocumented API that the Twitch team probably doesn’t want me
   * to use, so let’s just keep this between us, yeah? #SnitchesGetStitches
   */
  const response = await axios({
    method: 'GET',
    baseURL: 'https://api.twitch.tv/v5',
    url: `/channels/${process.env.TWITCH_USER_ID}/events`,
    headers: {
      'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID,
    },
  }).catch(error => {
    reporter.panic('Error loading Twitch events', JSON.stringify(error));
  });

  const events = response.data.events.map(async event => {
    const id = createNodeId(`TwitchEvent-${event._id}`);
    const imageURL = event.cover_image_url
      .replace(/{width}/, 1280)
      .replace(/{height}/, 720);

    const imageNode = await createRemoteFileNode({
      url: imageURL,
      parentNodeId: id,
      store,
      cache,
      createNode: actions.createNode,
      createNodeId,
    });

    const node = {
      id,
      originalID: event._id,
      start: event.start_time,
      end: event.end_time,
      title: event.title,
      description: event.description,
      image: imageNode,
    };

    return actions.createNode({
      ...node,
      internal: {
        type: 'Event',
        contentDigest: createContentDigest(node),
      },
    });
  });

  return Promise.all(events);
};
