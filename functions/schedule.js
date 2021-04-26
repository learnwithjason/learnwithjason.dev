const { builder } = require('@netlify/functions');
const { hasuraRequest } = require('./util/hasura');

const handler = async (event) => {
  const { limit = 999 } = event.queryStringParameters;
  const date = new Date();
  date.setHours(date.getHours() - 2);

  const data = await hasuraRequest({
    query: `
      query GetSchedule ($date: DateTime!, $limit: Int!) {
        schedule: allEpisode(
          where: {
            date: {gte: $date}, 
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
          host {
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.schedule),
  };
};

exports.handler = builder(handler);
