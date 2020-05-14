const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async ({ headers, body }) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      endpointSecret,
    );

    if (event.type !== 'checkout.session.completed') {
      return;
    }

    const order = event.data.object;

    const {
      line1,
      line2,
      city,
      state,
      postal_code,
      country,
    } = order.shipping.address;

    const items = order.display_items;

    const msg = {
      to: process.env.FULFILLMENT_EMAIL_ADDRESS,
      from: 'support@learnwithjason.dev',
      subject: 'New order from the Learn With Jason store!',
      text: `
Items:
${items.map((item) => `- (${item.quantity}) ${item.custom.name}`).join('\n')}

Shipping Address:
${order.shipping.name}
${line1}${line2 !== null ? '\n' + line2 : ''}
${city}, ${state} ${postal_code}
${country}
`,
    };

    await mail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: `WebHook error: ${error.message}`,
    };
  }
};
