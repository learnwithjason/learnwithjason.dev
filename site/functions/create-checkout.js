const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const inventory = require('./data/products.json');

exports.handler = async ({ body }) => {
  const { sku, quantity } = JSON.parse(body);
  const product = inventory.find((p) => p.sku === sku);
  const validatedQuantity = quantity > 0 && quantity <= 10 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      // Unsupported country codes:
      // AS, CX, CC, CU, HM, IR, KP, MH, FM, NF, MP, PW, SD, SY, UM, VI
      //
      // if you don’t see your country listed, please add it as long as it’s
      // not in the unsupported countries list
      // (sorry, that’s Stripe policy, not mine)
      // country codes: https://www.nationsonline.org/oneworld/country_code_list.htm
      allowed_countries: [
        'US',
        'CA',
        'MX',
        'IE',
        'GB',
        'DE',
        'JP',
        'FR',
        'HR',
        'DK',
        'NO',
        'SE',
        'FI',
        'AU',
      ],
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
