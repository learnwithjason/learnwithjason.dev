const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'shave',
  description: 'Shave the beard!',
  handler: () => ({}),
});
