const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'code',
  description: 'Oh, so we need to add code?',
  handler: () => ({
    message: 'oh, so we need to add code? Kappa',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/code.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/thinking',
  }),
});
