const { hasuraRequest } = require('./util/hasura');

exports.handler = async (event) => {
  const path = event.path;
  const slug = path.replace(new RegExp('/api/episode/'), '');
  const { transcript = false } = event.queryStringParameters;

  const data = await hasuraRequest({
    query: `
      query GetEpisodes ($slug: String!) {
        episode: allEpisode(
          where: {
            slug: { current: { eq: $slug } }
          }
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
          ${transcript ? 'transcript' : ''}
        }
      }
    `,
    variables: {
      slug,
    },
  });

  const [episode] = data.episode;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(episode),
  };
};
