import { Button } from '@lwj/design-system';

type AddToCartProps = {
	productId: string;
	productTitle: string;
	quantity: 1;
};

export const AddToCart = (props: AddToCartProps) => {
	const onClick = async (event: any) => {
		event.preventDefault();

		const cartId = decodeURIComponent(
			document.cookie
				.split('; ')
				.find((row) => row.startsWith('lwj-cart-id='))
				?.split('=')[1]
		);

		console.log({
			itemId: props.productId,
			quantity: props.quantity,
			cartId,
		});

		const res = await fetch(
			'http://localhost:8889/.netlify/functions/shopify-add-to-cart',
			{
				method: 'POST',
				body: JSON.stringify({
					itemId: props.productId,
					quantity: props.quantity,
					cartId,
				}),
			}
		);

		if (!res.ok) {
			console.error(res);
			return;
		}

		const data = await res.json();

		console.log({ data });
	};

	return (
		<form class="add-to-cart" onClick={onClick}>
			<input type="hidden" name="itemId" value={props.productId} />

			{/* TODO: make this into a quantity selector */}
			<input type="hidden" name="quantity" value={props.quantity} />

			<Button class="button">
				Add <span class="visually-hidden">{props.productTitle}</span> To Cart
			</Button>
		</form>
	);
};
