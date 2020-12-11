const { hasuraRequest } = require('./util/hasura');

exports.handler = async (event) => {
  const { limit = 999, featured = false } = event.queryStringParameters;

  const data = await hasuraRequest({
    query: `
      query GetEpisodes ($date: DateTime!, $limit: Int!) {
        episodes: allEpisode(
          where: {
            date: {lte: $date}, 
            youtubeID: {neq: ""}, 
            hidden: {neq: true}
            ${featured ? ', featured: { eq: true }' : ''}
          }, 
          sort: {date: DESC},
          limit: $limit
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
          demo
          repo
          links
          youtubeID
          tags {
            value
          }
          transcript
        }
      }
    `,
    variables: {
      date: new Date().toISOString(),
      limit: parseInt(limit),
    },
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.episodes),
  };
};
