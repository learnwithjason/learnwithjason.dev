import { postToShopify } from './postToShopify';

export const addItemToCart = async ({ cartId, itemId, quantity }) => {
	try {
		const shopifyResponse = postToShopify({
			query: `
        mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
            }
          }
        }
      `,
			variables: {
				cartId,
				lines: [
					{
						merchandiseId: itemId,
						quantity,
					},
				],
			},
		});

		return shopifyResponse;
	} catch (error) {
		console.log(error);
	}
};
