const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(() => ({
  name: 'oofda',
  message:
    'riPepperonis riPepperonis riPepperonis riPepperonis riPepperonis riPepperonis',
  description: 'Well. That was exciting.',
  audio:
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/oofda.mp3',
  image:
    'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/fly-by',
}));
