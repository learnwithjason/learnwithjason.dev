import { Handler } from '@netlify/functions';
import { hasuraRequest } from './util/hasura';

export const handler: Handler = async () => {
  const data = await hasuraRequest({
    query: `
      query GetSponsors {
        sponsors(where: {active: {_eq: true}}) {
          name
          image
          imageWidth
          imageHeight
          url
        }
      }    
    `,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.sponsors),
  };
};
