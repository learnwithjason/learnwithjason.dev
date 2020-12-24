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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.sponsors),
  };
};
