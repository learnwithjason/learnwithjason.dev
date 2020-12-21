import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import { products } from '../data/products.js';

const stripePromise = loadStripe(process.env.TOAST_STRIPE_PUBLISHABLE_KEY);

function format({ amount, currency }) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format((amount / 100).toFixed(2));
}

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
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/store.css" />
      </Helmet>
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

            const formattedPrice = format({
              amount: product.amount,
              currency: product.currency,
            });

            return (
              <div class="product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>
                  {product.description}{' '}
                  {product.dimensions && `(dimensions: ${product.dimensions})`}
                </p>
                <p class="price">{formattedPrice}</p>
                <button onClick={addToCart}>Add To Cart</button>
              </div>
            );
          })}
        </div>
        <aside class="cart">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p class="empty">
              your cart is empty! maybe boop it with a sticker or two?
            </p>
          ) : (
            <ul class="cart-items">
              {cart.map((item) => {
                const cartItem = products.find((p) => p.id === item.price);

                return (
                  <li key={cartItem.id}>
                    <span class="cart-item-name">{cartItem.name}</span> &times;{' '}
                    <span class="cart-item-quantity">{item.quantity}</span>
                  </li>
                );
              })}
              <li class="subtotal">
                {format({
                  amount: cart.reduce((total, item) => {
                    const { amount } = products.find(
                      (p) => p.id === item.price,
                    );

                    return (total += amount * item.quantity);
                  }, 0),
                  currency: 'usd',
                })}
              </li>
              <button onClick={handleSubmit}>Check Out</button>
            </ul>
          )}
        </aside>
      </section>
    </Fragment>
  );
}
