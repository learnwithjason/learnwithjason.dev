/**
 * Remove Item From Cart API Endpoint
 *
 * * Purpose: Remove a single item from the cart
 * @param {string} cartId
 * @param {string} lineId - Not the item or variant id
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/remove-from-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 'S9Qcm9kdWN0VmFyaWFudC8zOTc0NDEyMDEyNzY5NA',
 *     lineId: 'RIJC3mn0c862e2fc3314ba5971bf22d73d7accb'
 *   })
 * })
 * ```
 */

const { removeItemFromCart } = require('./util/removeItemFromCart');

exports.handler = async (event) => {
  const { cartId, lineId } = JSON.parse(event.body);

  try {
    console.log('--------------------------------');
    console.log('Removing item from cart...');
    console.log('--------------------------------');
    const shopifyResponse = await removeItemFromCart({
      cartId,
      lineId,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shopifyResponse.cartLinesRemove.cart),
    };
  } catch (error) {
    console.log(error);
  }
};
