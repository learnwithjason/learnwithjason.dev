const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'youmatter',
  description: 'Your code is not garbage.',
  handler: () => ({
    audio:
      'https://res.cloudinary.com/lindakatcodes/video/upload/v1617164414/lwj-commands/YourCodeHasValue.mp3',
    image:
      'https://res.cloudinary.com/lindakatcodes/image/upload/v1617163385/lwj-commands/YourCodeIsNotGarbage-Gif.gif',
    duration: 3,
  }),
});