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
import { serialize } from 'cookie';

import { createCartWithItem } from '../util/createCartWithItem';
import { addItemToCart } from '../util/addItemToCart';

export const handler: Handler = async (event) => {
	console.log('hello?');
	const {
		itemId,
		quantity: quantityStr,
		cartId,
	} = JSON.parse(event.body || '{}');

	const quantity = Number(quantityStr);
	const headers: any = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Content-Type': 'application/json; charset=utf8',
	};

	let cart;
	if (cartId) {
		const res = await addItemToCart({
			cartId,
			itemId,
			quantity,
		});

		cart = res.cartLinesAdd.cart;
	} else {
		const res = await createCartWithItem({
			itemId,
			quantity,
		});

		cart = res.cartCreate.cart;

		const cartCookie = serialize('lwj-cart-id', cart.id, {
			secure: true,
			sameSite: 'none',
			path: '/',
			maxAge: 1000 * 60 * 60 * 24 * 14,
		});

		headers['Set-Cookie'] = cartCookie;
	}

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify(cart),
	};
};
