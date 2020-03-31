const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async ({ headers, body }) => {
  const sig = headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return {
      statusCode: 400,
      body: `WebHook error: ${error.message}`,
    };
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log(session);
  }

  // TODO read out the shipping address
  // TODO read out the line items

  // TODO send email

  return {
    statusCode: 200,
    body: 'todo',
  };
};
