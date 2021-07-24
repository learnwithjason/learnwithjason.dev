import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Helmet } from 'react-helmet';

function format(item, quantity = 1) {
  return parseFloat(item.priceV2.amount * quantity).toLocaleString('en-us', {
    style: 'currency',
    currency: item.priceV2.currencyCode,
  });
}

function Cart({ cart, emptyCart }) {
  if (!cart) {
    return <p class="empty">loading...</p>;
  }

  if (cart && !cart.lines) {
    return (
      <p class="empty">
        your cart is empty! maybe boop it with a sticker or two?
      </p>
    );
  }

  if (cart && cart.lines.length > 0) {
    return (
      <Fragment>
        <ul class="cart-items">
          {cart.lines.map((item) => {
            const cartItem = item.merchandise;

            return (
              <li key={item.id}>
                <p class="cart-item-details">
                  <span class="cart-item-name">{cartItem.product.title}</span>
                  <span class="cart-item-subtotal">
                    {format(cartItem, item.quantity)}
                  </span>
                </p>
                <p class="cart-item-quantity">
                  <span class="cart-item-count">Qty. {item.quantity}</span>
                  <span class="cart-item-unit-price">
                    {format(cartItem)} each
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
        <p class="subtotal">
          {format({
            priceV2: cart.estimatedCost.totalAmount,
          })}
        </p>
        {cart.id && (
          <form action="/api/create-checkout" method="POST">
            <input type="hidden" name="cartId" value={cart.id} />
            <button>Check Out</button>
          </form>
        )}
        <p class="empty-cart">
          <button onClick={emptyCart}>empty cart</button>
        </p>
      </Fragment>
    );
  }
}

export default function Store({ products }) {
  const [cart, setCart] = useState(false);

  async function loadCart() {
    const cartId = window.localStorage.getItem('lwj-cart-id');

    if (!cartId) {
      setCart({});
      return;
    }

    const cartData = await fetch(`${window.location.origin}/api/get-cart`, {
      method: 'POST',
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());

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

    const response = await fetch(`${window.location.origin}/api/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartId: cartId || '',
        itemId: form.get('productId'),
        quantity: parseInt(form.get('quantity')),
      }),
    });

    const cart = await response.json();
    window.localStorage.setItem('lwj-cart-id', cart.id);

    setCart(cart);
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/store.css" />
      </Helmet>
      <section class="block store">
        <div class="products">
          {products.map((product) => {
            const formattedPrice = format(product.variants[0]);

            const image = product.images[0].src;
            const imageAlt = product.images[0].altText || product.title;

            return (
              <div class="product" key={product.id}>
                <img
                  src={image}
                  alt={imageAlt}
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p class="price">
                  <span>{formattedPrice}</span>{' '}
                  <span class="tag">free shipping!</span>
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
        <aside class="cart">
          <h3>Your Cart</h3>
          <Cart cart={cart} emptyCart={emptyCart} />
        </aside>
      </section>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </Fragment>
  );
}
