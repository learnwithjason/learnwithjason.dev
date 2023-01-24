/**
 * Get Product API Endpoint
 *
 * * Purpose: Retrieve data on a specific product
 * @param {string} itemHandle - kebab-cased-product-name
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product', {
 *   method: 'POST',
 *   body: JSON.stringify({ itemHandle: 'my-product' })
 * })
 * ```
 */

import { Handler } from '@netlify/functions';
import { postToShopify } from '../util/postToShopify';

export const handler: Handler = async (event) => {
	const { itemHandle } = JSON.parse(event.body ?? '{}');

	try {
		if (!itemHandle) {
			throw new Error('no item handle provided');
		}

		console.log('--------------------------------');
		console.log('Retrieving product details...');
		console.log('--------------------------------');
		const shopifyResponse = await postToShopify({
			query: `
        query getProduct($handle: String!) {
          productByHandle(handle: $handle) {
            id
            handle
            description
            title
            totalInventory
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
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
      `,
			variables: {
				handle: itemHandle,
			},
		});

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json; charset=utf8',
			},
			body: JSON.stringify(shopifyResponse),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error }),
		};
	}
};
