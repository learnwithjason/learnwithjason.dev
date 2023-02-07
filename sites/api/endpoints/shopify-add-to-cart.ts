/**
 * Add to Cart API Endpoint
 *
 * * Purpose: Add a single item to the cart
 * @param {string} cartId (Optional)
 * @param {string} itemId - Usually it's the product variant id
 * @param {number} quantity - Minimum 1
 *
 * @returns {object} cart that contains lines of items inside
 * See './utils/createCartWithItem' for the data structure
 *
 * Examples:
 *
 * If a cart does not exist yet,
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cardId: '', // cardId can also be omitted if desired
 *     itemId: 'Z2lkOi8vc2hvcGlmFyaWFudC8zOTc0NDEyMDEyNzY5NA==',
 *     quantity: 4
 *   })
 * })
 * ```
 *
 * Add item to an existing cart
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 'S9Qcm9kdWN0VmFyaWFudC8zOTc0NDEyMDEyNzY5NA',
 *     itemId: 'Z2lkOi8vc2hvcGlmFyaWFudC8zOTc0NDEyMDEyNzY5NA==',
 *     quantity: 4
 *   })
 * })
 * ```
 */

//TODO THIS IS BROKEN FIX IT

import { Handler } from '@netlify/functions';
import { parse } from 'querystring';

import { createCartWithItem } from '../util/createCartWithItem';
import { addItemToCart } from '../util/addItemToCart';

export const handler: Handler = async (event) => {
	const { cartId, itemId, quantity: quantityStr } = parse(event.body || '{}');
	const quantity = Number(quantityStr);

	console.log({ body: event.body, cartId, itemId, quantity });

	if (cartId) {
		console.log('--------------------------------');
		console.log('Adding item to existing cart...');
		console.log('--------------------------------');

		const shopifyResponse = await addItemToCart({
			cartId,
			itemId,
			quantity,
		});

		const cart = {
			...shopifyResponse.cartLinesAdd.cart,
			lines: shopifyResponse.cartLinesAdd.cart.lines.edges.map(
				({ node }: { node: any }) => node
			),
		};

		return {
			statusCode: 200,
			body: JSON.stringify(cart),
		};
	} else {
		console.log('--------------------------------');
		console.log('Creating new cart with item...');
		console.log('--------------------------------');
		const createCartResponse = await createCartWithItem({
			itemId,
			quantity,
		});

		console.log(createCartResponse);

		const cart = {
			...createCartResponse.cartCreate.cart,
			lines: createCartResponse.cartCreate.cart.lines.edges.map(
				({ node }: { node: any }) => node
			),
		};

		// return {
		// 	statusCode: 200,
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(cart),
		// };
		return {
			statusCode: 301,
			headers: {
				Location: 'http://localhost:8888/store',
			},
		};
	}
};
