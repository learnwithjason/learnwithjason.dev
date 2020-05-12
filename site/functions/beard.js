const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(() => ({
  name: 'beard',
  description: 'Grow the beard!',
}));
