import createHandler from '@stream-blitz/create-handler';

export const handler = createHandler({
  name: 'snappi',
  description: 'That is nice and snappy, it makkes me happy',
  handler: () => ({
    audio:
      'https://res.cloudinary.com/aodhan/video/upload/v1662784292/UntitledAudio_bxn05a.mp4',
    image:
      'https://res.cloudinary.com/aodhan/video/upload/v1662784509/Untitled_Audioless_bhqotm.mp4',
    duration: 3,
  }),
});
