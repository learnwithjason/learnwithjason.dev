const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'adult',
  description: 'Additional oversight required.',
  handler: () => ({
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/adult-supervision.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/raise-hand',
    duration: 10,
  }),
});
