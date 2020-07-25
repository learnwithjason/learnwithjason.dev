const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'holybuckets',
  description: 'It worked! Celebrate!',
  handler: () => ({
    message: 'PogChamp jlengsHolyBucket holy buckets! did that just work?!',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/holy-buckets.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/victory',
  }),
});
