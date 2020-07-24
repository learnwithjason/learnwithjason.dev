const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(({ author }) => {
  if (!author || !author.roles.includes('BROADCASTER')) {
    return;
  }

  return {
    name: 'flush',
    message: `BUH-BYE`,
    description: 'clear the boops',
  };
});
