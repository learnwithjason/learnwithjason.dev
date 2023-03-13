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
import { serialize } from 'cookie';
import { CartSchema } from '@lwj/types/schema';
import { postToShopify } from '../util/postToShopify';

export const handler: Handler = async (event) => {
	const { cartId } = JSON.parse(event.body || '');
	let cart: { id?: string } = {};
	const headers: any = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json; charset=utf8',
	};

	try {
		if (!cartId) {
			throw new Error('no cart ID provided');
		}

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
			throw new Error('No valid cart returned from Shopify');
		}

		// clean up some GraphQL noise to make the cart easier to use
		cart = CartSchema.parse({
			...shopifyResponse.cart,
			lines: shopifyResponse.cart.lines.edges.map(({ node }: any) => {
				return {
					id: node.id,
					quantity: node.quantity,
					merchandise: {
						id: node.id,
						title: node.merchandise.product.title,
						slug: node.merchandise.product.handle,
						price: node.merchandise.price,
						images: node.merchandise.product.images.edges.map(
							({ node }: { node: any }) => {
								return {
									src: node.src,
									alt: node.altText,
								};
							}
						),
					},
				};
			}),
		});

		const cartCookie = serialize('lwj-cart-id', cart.id!, {
			secure: true,
			path: '/',
			maxAge: 1000 * 60 * 60 * 24 * 14,
		});

		headers['Set-Cookie'] = cartCookie;
	} catch (error: any) {
		console.log(error.message);
	}

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify(cart),
	};
};
