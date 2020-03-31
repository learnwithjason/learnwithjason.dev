/** @jsx jsx */
import { jsx } from 'theme-ui';
import { loadStripe } from '@stripe/stripe-js';

// TODO make this load from a single source of truth
const inventory = [
  {
    sku: 'LWJ001',
    name: 'Bearded Party Corgi',
    description: 'It’s a party corgi, but with a beard!',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300/v1585672435/lwj/store/bearded-corgi.png',
    amount: 300,
    currency: 'USD',
  },
  {
    sku: 'LWJ002',
    name: 'BOOP',
    description: 'Do you wanna get booped on the brain?',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300/v1585672435/lwj/store/boop.png',
    amount: 300,
    currency: 'USD',
  },
  {
    sku: 'LWJ003',
    name: 'Play Until It Pays',
    description:
      'Keep having fun until you figure out how make a living doing it.',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300/v1585672435/lwj/store/play-until-it-pays.png',
    amount: 300,
    currency: 'USD',
  },
  {
    sku: 'LWJ004',
    name: 'BEEP BOOP',
    description: 'Boop, but in Morse code.',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_300/v1585672435/lwj/store/beep-boop.png',
    amount: 300,
    currency: 'USD',
  },
];

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const Products = () => {
  const format = (amount, currency) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format((amount / 100).toFixed(2));

  const handleSubmit = async event => {
    event.preventDefault();
    const form = new FormData(event.target);

    const data = {
      sku: form.get('sku'),
      quantity: Number(form.get('quantity')),
    };

    // TODO send to serverless function
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json());

    console.log(response);

    // TODO get the session ID and redirect to checkout
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <section
      sx={{
        display: 'flex',
        gridTemplateColumns: 'repeat(4, 1fr)',
        mt: 5,
      }}
    >
      {inventory.map(product => (
        <div key={product.sku}>
          <img sx={{ width: '100%' }} src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{format(product.amount, product.currency)}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
            />
            <input type="hidden" name="sku" value={product.sku} />
            <button>BUY NOW</button>
          </form>
        </div>
      ))}
    </section>
  );
};

export default Products;
