const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'haxxors',
  description: 'Should we focus up?',
  handler: () => ({
    message: 'What were we doing again?',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/haxxors.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/disappointed',
  }),
});
