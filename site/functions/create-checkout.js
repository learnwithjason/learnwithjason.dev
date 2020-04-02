const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const inventory = require('./data/products.json');

exports.handler = async ({ body }) => {
  const { sku, quantity } = JSON.parse(body);
  const product = inventory.find(p => p.sku === sku);
  const validatedQuantity = quantity > 0 && quantity <= 10 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [
      {
        name: product.name,
        description: product.description,
        images: [product.image],
        amount: product.amount,
        currency: product.currency,
        quantity: validatedQuantity,
      },
      {
        name: 'Shipping and Handling',
        description: 'Flat rate shipping anywhere in the world.',
        images: [],
        amount: 350,
        currency: 'USD',
        quantity: 1,
      },
    ],
    success_url: 'https://www.learnwithjason.dev/purchased',
    cancel_url: 'https://www.learnwithjason.dev/store',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  };
};
