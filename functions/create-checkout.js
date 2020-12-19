const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { getShippingCountries, getPaymentMethods } = require('./util/stripe');

exports.handler = async (event) => {
  const { items } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:8888/store?status=success',
    cancel_url: 'http://localhost:8888/store?status=cancel',
    payment_method_types: getPaymentMethods(),
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: getShippingCountries(),
    },
    line_items: items,
    mode: 'payment',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  };
};
