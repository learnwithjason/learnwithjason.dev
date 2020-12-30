const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'boop',
  description: 'Welcome new subscribers with this command. Spam that boop!',
  handler: () => ({
    message:
      'CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat jlengsBOOP CorgiDerp PartyHat',
  }),
});
