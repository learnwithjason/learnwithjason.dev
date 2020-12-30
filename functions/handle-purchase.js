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

    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const items = lineItems.data;

    const {
      line1,
      line2,
      city,
      state,
      postal_code,
      country,
    } = session.shipping.address;

    const msg = {
      to: process.env.FULFILLMENT_EMAIL_ADDRESS,
      from: 'support@learnwithjason.dev',
      subject: `New order from the Learn With Jason store!`,
      text: `
Items:
${items.map((item) => `- ${item.quantity} × ${item.description}`).join('\n')}

Shipping Address:
${session.shipping.name}
${line1}${line2 !== null ? '\n' + line2 : ''}
${city}, ${state} ${postal_code}
${country}

Order ID: ${session.id}
`,
    };

    await mail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: `WebHook error: ${error.message}`,
    };
  }
};
