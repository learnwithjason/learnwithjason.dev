const qs = require('querystring');
const { hasuraRequest } = require('./util/hasura');

exports.handler = async (event) => {
  const { limit = 999 } = event.queryStringParameters;
  const date = new Date();
  date.setHours(date.getHours() + 3);

  const data = await hasuraRequest({
    query: `
      query GetSchedule ($date: DateTime!, $limit: Int!) {
        schedule: allEpisode(
          where: {
            date: {gt: $date}, 
            youtubeID: {neq: ""}, 
            hidden: {neq: true}
          }, 
          sort: {date: ASC},
          limit: $limit
        ) {
          _id
          title
          date
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
        }
      }
    `,
    variables: {
      date: date.toISOString(),
      limit: parseInt(limit),
    },
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.schedule),
  };
};
