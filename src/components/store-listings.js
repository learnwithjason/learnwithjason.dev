import { h } from 'preact';

export function StoreListings() {
  return (
    <section class="block">
      <p>TODO show products</p>

      <p>Number of items: {cartCount}</p>
      <p>Total: {totalPrice}</p>
      <button onClick={redirectToCheckout}>Check Out</button>
    </section>
  );
}
