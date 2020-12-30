const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'potato-salad',
  description: 'Show me potato salad!',
  handler: () => ({
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/potato-salad.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/show-me',
  }),
});
