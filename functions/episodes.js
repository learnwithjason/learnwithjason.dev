const { builder } = require('@netlify/functions');
const { hasuraRequest } = require('./util/hasura');

const handler = async (event) => {
  const { path } = event;
  const [, , , type = 'page', page = 1, hasTranscript = false] = path.split(
    '/',
  );

  const limit = 50;
  const offset = (page - 1) * 50;
  const featured = type === 'featured';
  const transcript = !!hasTranscript;

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
  
  const publishedEpisodes = data.episodes.filter(e => e.youtubeID !== null);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(publishedEpisodes),
  };
};

exports.handler = builder(handler);
