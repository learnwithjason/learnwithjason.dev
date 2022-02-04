import { Fragment, useEffect, useState } from 'react';
import { useLoaderData } from 'remix';

import styles from '../styles/store.css';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.learnwithjason.dev';

export const loader = async () => {
  const products = await fetch(`${API_URL}/api/products`).then((res) =>
    res.json(),
  );

  return products;
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function format(item, quantity = 1) {
  return parseFloat(item.priceV2.amount * quantity).toLocaleString('en-us', {
    style: 'currency',
    currency: item.priceV2.currencyCode,
  });
}

function Cart({ cart, emptyCart }) {
  if (!cart) {
    return <p className="empty">loading...</p>;
  }

  if (cart && !cart.lines) {
    return (
      <p className="empty">
        your cart is empty! maybe boop it with a sticker or two?
      </p>
    );
  }

  if (cart && cart.lines.length > 0) {
    return (
      <Fragment>
        <ul className="cart-items">
          {cart.lines.map((item) => {
            const cartItem = item.merchandise;

            return (
              <li key={item.id}>
                <p className="cart-item-details">
                  <span className="cart-item-name">
                    {cartItem.product.title}
                  </span>
                  <span className="cart-item-subtotal">
                    {format(cartItem, item.quantity)}
                  </span>
                </p>
                <p className="cart-item-quantity">
                  <span className="cart-item-count">Qty. {item.quantity}</span>
                  <span className="cart-item-unit-price">
                    {format(cartItem)} each
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
        <p className="subtotal">
          {format({
            priceV2: cart.estimatedCost.totalAmount,
          })}
        </p>
        {cart.id && (
          <form action="/api/store/create-checkout" method="POST">
            <input type="hidden" name="cartId" value={cart.id} />
            <button>Check Out</button>
          </form>
        )}
        <p className="empty-cart">
          <button onClick={emptyCart}>empty cart</button>
        </p>
      </Fragment>
    );
  }
}

export default function Store() {
  const products = useLoaderData();
  const [cart, setCart] = useState(false);

  async function loadCart() {
    const cartId = window.localStorage.getItem('lwj-cart-id');

    if (!cartId) {
      setCart({});
      return;
    }

    const cartData = await fetch(
      `${window.location.origin}/api/store/get-cart`,
      {
        method: 'POST',
        body: JSON.stringify({ cartId }),
      },
    ).then((res) => res.json());

    if (cartData.lines) {
      setCart(cartData);
    }
  }

  function emptyCart() {
    setCart({});
    window.localStorage.removeItem('lwj-cart-id');
  }

  async function handleAddToCart(event) {
    event.preventDefault();

    const cartId = window.localStorage.getItem('lwj-cart-id');

    const form = new FormData(event.target);

    const response = await fetch(
      `${window.location.origin}/api/store/add-to-cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: cartId || '',
          itemId: form.get('productId'),
          quantity: parseInt(form.get('quantity')),
        }),
      },
    );

    const cart = await response.json();
    window.localStorage.setItem('lwj-cart-id', cart.id);

    setCart(cart);
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Fragment>
      <section className="block store">
        <div className="products">
          {products.map((product) => {
            const formattedPrice = format(product.variants[0]);

            const image = product.images[0].src;
            const imageAlt = product.images[0].altText || product.title;

            return (
              <div className="product" key={product.id}>
                <img
                  src={image}
                  alt={imageAlt}
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p className="price">
                  <span>{formattedPrice}</span>{' '}
                  <span className="tag">free shipping!</span>
                </p>
                <form onSubmit={handleAddToCart}>
                  <input
                    type="hidden"
                    name="productId"
                    value={product.variants[0].id}
                  />
                  {/* TODO: make this into a quantity selector */}
                  <input type="hidden" name="quantity" value={1} />
                  <button aria-label={`Add To Cart`}>
                    Add <span className="visually-hidden">{product.title}</span>{' '}
                    To Cart
                  </button>
                </form>
              </div>
            );
          })}
        </div>
        <aside className="cart">
          <h3>Your Cart</h3>
          <Cart cart={cart} emptyCart={emptyCart} />
        </aside>
      </section>
    </Fragment>
  );
}
