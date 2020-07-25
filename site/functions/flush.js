const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'flush',
  description: 'clear the boops',
  handler: ({ author }) => {
    if (!author || !author.roles.includes('BROADCASTER')) {
      return;
    }

    return {
      message: `BUH-BYE`,
    };
  },
});
