/** @jsx jsx */
import { jsx } from 'theme-ui';
import { loadStripe } from '@stripe/stripe-js';
import inventory from '../../functions/data/products.json';

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const Products = () => {
  const format = (amount, currency) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format((amount / 100).toFixed(2));

  const handleSubmit = async (event) => {
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
    }).then((res) => res.json());

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
        mt: 5,
        '@media (min-width: 360px)': {
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (min-width: 500px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
      }}
    >
      {inventory.map((product) => (
        <div key={product.sku} sx={{ mt: 3 }}>
          <img
            sx={{
              width: '100%',
            }}
            src={product.image}
            alt={product.name}
          />
          <h2 sx={{ fontSize: 3 }}>{product.name}</h2>
          <p sx={{ fontSize: 1 }}>{product.description}</p>
          <p
            sx={{
              fontSize: 3,
              fontWeight: 700,
              m: 0,
              mb: 2,
              textAlign: 'right',
            }}
          >
            {format(product.amount, product.currency)}
          </p>
          <form
            onSubmit={handleSubmit}
            sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'auto 50px' }}
          >
            <label
              htmlFor="quantity"
              sx={{ fontSize: 1, fontWeight: 600, p: 2, textAlign: 'right' }}
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              defaultValue={1}
              min="1"
              max="10"
              sx={{
                border: '1px solid',
                borderColor: 'primary',
                borderRadius: 2,
                fontSize: 1,
                p: 2,
              }}
            />
            <input type="hidden" name="sku" value={product.sku} />
            <button
              sx={{
                bg: 'primary',
                border: 'none',
                borderRadius: 2,
                color: 'nav',
                fontFamily: 'heading',
                fontSize: 2,
                fontWeight: 800,
                gridColumn: '1 / 3',
                p: 2,
                textShadow: `
                  0.05em 0.05em #4F4F4F99,
                  0.05em -0.05em #4F4F4F99,
                  -0.05em 0.05em #4F4F4F99,
                  -0.05em -0.05em #4F4F4F99
                `,
                textTransform: 'uppercase',
              }}
            >
              Buy Now
            </button>
          </form>
        </div>
      ))}
    </section>
  );
};

export default Products;
