import { Component, For, Show } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';
import type { Cart as CartSchema } from '@lwj/types';
import { client } from '../stores/cart';

const API_GET_CART =
	'http://localhost:8889/.netlify/functions/shopify-get-cart';
const API_CHECKOUT =
	'http://localhost:8889/.netlify/functions/shopify-create-checkout';

function getCartIdFromCookies() {
	return decodeURIComponent(
		document.cookie
			.split('; ')
			.find((cookieEntry) => cookieEntry.startsWith('lwj-cart-id='))
			?.split('=')[1] || ''
	);
}

async function getCartById(cartId: string) {
	const res = await fetch(API_GET_CART, {
		method: 'POST',
		body: JSON.stringify({ cartId }),
	}).catch((err) => {
		console.error(err);
	});

	if (!res?.ok) {
		throw new Error('unable to load cart', { cause: res });
	}

	const cart: CartSchema = await res.json();

	return cart;
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
	const cartId = getCartIdFromCookies();
	const cartQuery = createQuery(
		() => ({
			queryKey: ['cart', cartId],
			queryFn: () => getCartById(cartId),
		}),
		() => client
	);

	return (
		<Show when={cartQuery.isFetched} fallback={<p class="empty">loading...</p>}>
			<pre>{JSON.stringify(cartQuery.data, null, 2)}</pre>
			<Show
				when={cartQuery.data && cartQuery.data?.lines?.length > 0}
				fallback={<EmptyState />}
			>
				<ul class="cart-items">
					<For each={cartQuery.data?.lines}>
						{(item) => {
							const cartItem = item.merchandise;
							return (
								<li>
									<p class="cart-item-details">
										<span class="cart-item-name">{cartItem.title}</span>
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
						price: cartQuery.data?.estimatedCost.totalAmount,
					})}
				</p>
				{cartQuery.data?.id && (
					<form action={API_CHECKOUT} method="post">
						<input type="hidden" name="cartId" value={cartQuery.data.id} />
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
