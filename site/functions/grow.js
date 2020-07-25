const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'grow',
  description: 'Grow the beard!',
  handler: () => ({}),
});
