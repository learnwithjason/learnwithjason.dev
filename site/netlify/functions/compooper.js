const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'compooper',
  description: 'C’mon lil’ compooper!',
  handler: () => ({
    message: 'C’mon lil’ compooper!',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1590110036/lwj-sfx/compooper.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/please',
  }),
});
