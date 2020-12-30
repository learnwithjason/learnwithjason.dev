const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'plzhold',
  description:
    'For when the computers aren’t keeping up with our need for constant stimulation.',
  handler: () => ({
    message: 'SeriousSloth compiling...',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/elevator-music.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/waiting',
    duration: 10,
  }),
});
