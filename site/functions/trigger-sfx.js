const axios = require('axios');

exports.handler = async event => {
  const command = JSON.parse(event.body);
  const result = await axios.post(
    `${process.env.CHATBOT_API_URI}/commands/trigger`,
    command,
    {
      auth: {
        username: 'apikey',
        password: process.env.CHATBOT_API_KEY,
      },
    },
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  };
};
