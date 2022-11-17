export function isLink(item) {
  return item.hasOwnProperty('label') && item.hasOwnProperty('url');
}
