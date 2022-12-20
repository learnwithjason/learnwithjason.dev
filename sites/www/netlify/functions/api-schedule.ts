import { builder, Handler } from '@netlify/functions';
import { hasuraRequest } from './util/hasura';

const handlerFn: Handler = async (event) => {
  const { limit = 999 } = event.queryStringParameters;
  const [, , , withBuffer] = event.path.split('/');
  const date = new Date();

  if (Boolean(withBuffer)) {
    date.setHours(date.getHours() - 72);
  } else {
    date.setMinutes(date.getMinutes() - 70);
  }

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
          youtubeID
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
      limit: limit,
    },
  });

  const schedule = data.schedule.filter((ep) => !ep.youtubeID);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule),
  };
};

export const handler = builder(handlerFn);
