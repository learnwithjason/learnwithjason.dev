const qs = require('querystring');
const axios = require('axios');

exports.handler = async event => {
  const formId = process.env.CK_FORM_ID;
  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const { firstName, email } = qs.parse(event.body);

  try {
    const result = await axios.post(url, {
      api_key: process.env.CK_API_KEY,
      first_name: firstName,
      email,
    });

    if (result.error) {
      throw new Error(result.error);
    }

    return {
      statusCode: 301,
      headers: {
        Location: '/success/',
      },
      // body is unused in 3xx codes, but required in all function responses
      body: 'redirecting...',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
