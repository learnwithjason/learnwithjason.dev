const { builderFunction: builder } = require('@netlify/functions');
const { hasuraRequest } = require('./util/hasura');

const handler = async (event) => {
  const {
    limit = 999,
    offset = 0,
    featured = false,
    transcript = false,
  } = event.queryStringParameters;

  const data = await hasuraRequest({
    query: `
      query GetEpisodes ($date: DateTime!, $limit: Int!, $offset: Int!) {
        episodes: allEpisode(
          where: {
            date: {lte: $date}, 
            youtubeID: {neq: ""}, 
            hidden: {neq: true}
            ${featured ? ', featured: { eq: true }' : ''}
          }, 
          sort: {date: DESC},
          limit: $limit,
          offset: $offset
        ) {
          _id
          title
          slug {
            current
          }
          description
          guest {
            guestImage {
              asset {
                url
              }
            }
            name
            twitter
          }
          host {
            guestImage {
              asset {
                url
              }
            }
            name
            twitter
          }
          demo
          repo
          links
          youtubeID
          tags {
            value
          }
          ${transcript ? 'transcript' : ''}
        }
      }
    `,
    variables: {
      date: new Date().toISOString(),
      limit: parseInt(limit),
      offset: parseInt(offset),
    },
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.episodes),
  };
};

exports.handler = builder(handler);
