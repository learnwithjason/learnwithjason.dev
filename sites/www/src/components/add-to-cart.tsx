import { Button } from '@lwj/design-system';
import { createMutation } from '@tanstack/solid-query';
import { client } from '../stores/cart';

type AddToCartProps = {
	productId: string;
	productTitle: string;
	quantity: 1;
};
// TODO fix this type
async function addItemToCart({ itemId, quantity }: any) {
	const cookieValue = decodeURIComponent(
		document.cookie
			.split('; ')
			.find((row) => row.startsWith('lwj-cart-id='))
			?.split('=')[1] || ''
	);

	const args: { itemId: string; quantity: number; cartId?: string } = {
		itemId: props.productId,
		quantity: props.quantity,
	};

	if (cookieValue.startsWith('gid://')) {
		args.cartId = cookieValue;
	}

	console.log(args);

	const res = await fetch(
		'http://localhost:8889/.netlify/functions/shopify-add-to-cart',
		{
			method: 'POST',
			body: JSON.stringify(args),
		}
	);

	if (!res.ok) {
		console.error(res);
		return;
	}

	const data = await res.json();
}

export const AddToCart = (props: AddToCartProps) => {
	const onSubmit = async (event: any) => {
		event.preventDefault();

		const cookieValue = decodeURIComponent(
			document.cookie
				.split('; ')
				.find((row) => row.startsWith('lwj-cart-id='))
				?.split('=')[1] || ''
		);

		const args: { itemId: string; quantity: number; cartId?: string } = {
			itemId: props.productId,
			quantity: props.quantity,
		};

		if (cookieValue.startsWith('gid://')) {
			args.cartId = cookieValue;
		}

		console.log(args);

		const res = await fetch(
			'http://localhost:8889/.netlify/functions/shopify-add-to-cart',
			{
				method: 'POST',
				body: JSON.stringify(args),
			}
		);

		if (!res.ok) {
			console.error(res);
			return;
		}

		const data = await res.json();

		console.log({ data });

		document.cookie = `lwj-cart-id=${data.id}; SameSite=None; Secure`;
		// window.location.reload();
	};

	return (
		<form class="add-to-cart" onSubmit={onSubmit}>
			<input type="hidden" name="itemId" value={props.productId} />

			{/* TODO: make this into a quantity selector */}
			<input type="hidden" name="quantity" value={props.quantity} />

			<Button class="button">
				Add <span class="visually-hidden">{props.productTitle}</span> To Cart
			</Button>
		</form>
	);
};
