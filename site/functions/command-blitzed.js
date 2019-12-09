const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(({ extra: { channel } }) => ({
  name: 'blitzed',
  message: 'KAPOW YOU GOT BLITZED! MorphinTime',
  description:
    'Every hero needs a catchphrase. Sometimes everyday doofers need them, too.',
  sfx:
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/blitzed.mp3',
  gif:
    'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/victory',
  channel,
}));
