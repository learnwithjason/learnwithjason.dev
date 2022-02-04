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
import { postToShopify } from './util/postToShopify';

export const handler: Handler = async (event) => {
  const { cartId } = JSON.parse(event.body);

  try {
    console.log('--------------------------------');
    console.log('Retrieving existing cart...');
    console.log('--------------------------------');
    const shopifyResponse = await postToShopify({
      query: `
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
                       priceV2 {
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
      lines: shopifyResponse.cart.lines.edges.map(({ node }) => node),
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    };
  } catch (error) {
    console.log(error);
  }
};
