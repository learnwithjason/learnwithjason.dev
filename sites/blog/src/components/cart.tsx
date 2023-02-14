import { Component, createResource, createSignal, For, Show } from 'solid-js';

const API_GET_CART =
	'http://localhost:8889/.netlify/functions/shopify-get-cart';
const API_CHECKOUT =
	'http://localhost:8889/.netlify/functions/shopify-create-checkout';

async function getCart() {
	const cartId = decodeURIComponent(
		document.cookie
			.split('; ')
			.find((row) => row.startsWith('lwj-cart-id='))
			?.split('=')[1] || ''
	);

	const res = await fetch(API_GET_CART, {
		method: 'POST',
		body: JSON.stringify({ cartId }),
	});

	if (!res.ok) {
		throw new Error('unable to load cart');
	}

	return res.json();
}

function format(item: any, quantity = 1) {
	return (parseFloat(item.price.amount) * quantity).toLocaleString('en-us', {
		style: 'currency',
		currency: item.price.currencyCode,
	});
}

const EmptyState: Component = () => {
	return (
		<p class="empty">
			your cart is empty! maybe boop it with a sticker or two?
		</p>
	);
};

export const Cart: Component = () => {
	const [cart] = createResource(getCart);

	return (
		<Show when={!cart.loading} fallback={<p class="empty">loading...</p>}>
			<Show when={cart()?.lines?.length > 0} fallback={<EmptyState />}>
				<ul class="cart-items">
					<For each={cart().lines}>
						{(item) => {
							const cartItem = item.merchandise;
							return (
								<li>
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
						}}
					</For>
				</ul>
				<p class="subtotal">
					{format({
						price: cart().estimatedCost.totalAmount,
					})}
				</p>
				{cart().id && (
					<form action={API_CHECKOUT} method="post">
						<input type="hidden" name="cartId" value={cart().id} />
						<button>Check Out</button>
					</form>
				)}
				<p class="empty-cart">
					<button onClick={() => {}}>empty cart</button>
				</p>
			</Show>
		</Show>
	);
};
