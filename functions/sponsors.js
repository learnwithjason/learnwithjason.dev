const { hasuraRequest } = require('./util/hasura');

exports.handler = async () => {
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
      'Access-Control-Allow-Origin': 'https://lwj-scenes-toast.netlify.app',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.sponsors),
  };
};
