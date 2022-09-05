const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'yaml',
  description: 'Badgers? Mushrooms? Nah.',
  handler: () => ({
    message: 'YAML YAML YAML YAML JSON JSON',
    audio:
      'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/lwj-sfx/yaml-yaml-yaml.mp3',
    image:
      'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_400/v1573512575/lwj-sfx/yaml-json',
    duration: 3,
  }),
});
