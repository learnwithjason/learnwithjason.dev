import type { Handler } from '@netlify/functions';
import { parse } from 'querystring';
import { postToShopify } from '../util/postToShopify';

export const handler: Handler = async (event) => {
	const { cartId } = parse(event.body ?? '');

	try {
		const response = await postToShopify({
			query: `
        query checkoutURL($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
          }
        }
      `,
			variables: {
				cartId,
			},
		});

		if (!response.cart.checkoutUrl) {
			throw new Error('No checkout URL returned');
		}

		return {
			statusCode: 301,
			headers: {
				Location: response.cart.checkoutUrl,
			},
			body: 'Redirecting to checkout...',
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
