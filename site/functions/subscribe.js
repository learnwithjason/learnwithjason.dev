const qs = require('querystring');
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const formId = process.env.CK_FORM_ID;
  const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
  const { firstName, email } = qs.parse(event.body);

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_API_KEY,
        first_name: firstName,
        email,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });

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
