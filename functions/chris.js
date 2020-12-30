const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'chris',
  handler: ({ author }) => ({
    message:
      author.username !== 'chrisbiscardi'
        ? 'LISTEN TO CHRIS! Chris is always right chrisb24PartyCorgi chrisb24PartyCorgi'
        : 'jlengsHolyBucket Yes, you’re Chris. jlengsHolyBucket',
  }),
});
