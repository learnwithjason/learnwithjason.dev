const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(() => ({
  name: 'behold',
  description: 'Behold! My Bucket.',
  audio:
    'https://res.cloudinary.com/burtonmedia/video/upload/v1588264596/Behold_My_Bucket_zqw7ft.mp3',
  image:
    'https://res.cloudinary.com/burtonmedia/image/upload/v1588264755/Behold_My_Bucket_th2mya.gif',
  duration: 3,
}));
