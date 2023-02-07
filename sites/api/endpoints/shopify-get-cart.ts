/**
 * API Endpoint
 *
 * * Purpose: Get items from an existing cart
 * @param {string} cartId
 *
 * Example:
 *```
 * fetch('/.netlify/functions/get-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({ cartId: '12345' })
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */

import { Handler } from '@netlify/functions';
import { postToShopify } from '../util/postToShopify';

export const handler: Handler = async (event) => {
	const { cartId } = JSON.parse(event.body ?? '{}');

	try {
		if (!cartId) {
			throw new Error('no cart ID provided');
		}

		console.log('--------------------------------');
		console.log('Retrieving existing cart...');
		console.log('--------------------------------');
		const shopifyResponse = await postToShopify({
			query: /* GraphQL */ `
				query getCart($cartId: ID!) {
					cart(id: $cartId) {
						id
						lines(first: 10) {
							edges {
								node {
									id
									quantity
									merchandise {
										... on ProductVariant {
											id
											title
											price {
												amount
												currencyCode
											}
											product {
												title
												handle
												images(first: 1) {
													edges {
														node {
															src
															altText
														}
													}
												}
											}
										}
									}
								}
							}
						}
						estimatedCost {
							totalAmount {
								amount
								currencyCode
							}
							subtotalAmount {
								amount
								currencyCode
							}
							totalTaxAmount {
								amount
								currencyCode
							}
							totalDutyAmount {
								amount
								currencyCode
							}
						}
					}
				}
			`,
			variables: {
				cartId,
			},
		});

		if (!shopifyResponse.cart) {
			return {
				statusCode: 200,
				body: JSON.stringify({}),
			};
		}

		// clean up some GraphQL noise to make the cart easier to use
		const cart = {
			...shopifyResponse.cart,
			lines: shopifyResponse.cart.lines.edges.map(({ node }: any) => node),
		};

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Content-Type': 'application/json; charset=utf8',
			},
			body: JSON.stringify(cart),
		};
	} catch (error: any) {
		console.log(error.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: { message: error.message } }),
		};
	}
};
