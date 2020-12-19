import { h } from 'preact';
import { useState } from 'preact/hooks';
import { loadStripe } from '@stripe/stripe-js';
import { products } from '../data/products.js';

const stripePromise = loadStripe(process.env.TOAST_STRIPE_PUBLISHABLE_KEY);

export default function Store() {
  const [cart, setCart] = useState([]);

  async function handleSubmit() {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
      }),
    }).then((res) => res.json());

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <section class="block store">
      <div class="products">
        {products.map((product) => {
          function addToCart() {
            const isInCart = cart.some(({ price }) => price === product.id);

            const newCart = isInCart
              ? cart.map((item) => {
                  if (item.price !== product.id) {
                    return item;
                  }

                  return {
                    price: item.price,
                    quantity: item.quantity + 1,
                  };
                })
              : [...cart, { price: product.id, quantity: 1 }];

            setCart(newCart);
          }

          return (
            <div class="product" key={product.id}>
              <h2>{product.name}</h2>
              <button onClick={addToCart}>Add To Cart</button>
            </div>
          );
        })}
      </div>
      <div class="cart">
        <p>TODO show cart</p>
        <pre>{JSON.stringify(cart, null, 2)}</pre>
        <button onClick={handleSubmit}>Check Out</button>
      </div>
    </section>
  );
}
