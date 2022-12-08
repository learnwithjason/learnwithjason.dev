const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'nope',
  description: 'That’s just not something I’m willing to do.',
  handler: () => ({
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/not-willing.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/drinking-coffee',
    duration: 3,
  }),
});
