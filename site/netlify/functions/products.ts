/**
 * API Endpoint
 *
 * Purpose: Fetch first 100 products of the store
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product-list', {
 *   method: 'POST'
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */
import { Handler, builder } from '@netlify/functions';
import { postToShopify } from './util/postToShopify';

export const handler: Handler = builder(async () => {
  try {
    console.log('--------------------------------');
    console.log('Retrieving product list...');
    console.log('--------------------------------');
    const shopifyResponse = await postToShopify({
      query: `
        query getProductList {
          products(sortKey: PRICE, first: 100, reverse: true) {
            edges {
              node {
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
          }
        }
      `,
    });

    // clean up the product list to remove some of the GraphQL noise
    const products = shopifyResponse.products.edges.map((product) => {
      return {
        ...product.node,
        images: product.node.images.edges.map((image) => image.node),
        variants: product.node.variants.edges.map((variant) => variant.node),
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
  }
});
