const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'thiswillwork',
  description: 'This is it. This is the thing. It’ll work.',
  handler: () => ({
    message: 'PowerUpL jlengsHolyBucket PowerUpR',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/thiswillwork.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/thumbsup',
  }),
});
