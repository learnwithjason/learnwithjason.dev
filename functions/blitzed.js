const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'blitzed',
  description:
    'Every hero needs a catchphrase. Sometimes a doofus needs one, too.',
  handler: () => ({
    message: 'KAPOW YOU GOT BLITZED! MorphinTime',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/blitzed.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/victory',
  }),
});
