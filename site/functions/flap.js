const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(() => ({
  name: 'flap',
  description: 'Flappy Jason',
}));
