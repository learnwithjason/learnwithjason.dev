const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(({ user, message, flags, extra }) => {
  console.log(({ user, message, flags, extra });
  
  // only broadcasters or mods can shoutout
  if (!flags.broadcaster && !flags.mod) {
    return;
  }

  const parts = message.split(' ');
  const soTarget = parts.find(part => part.startsWith('@'));
  if (!soTarget) {
    return;
  }

  const twitchLink = `https://twitch.tv/${soTarget.replace('@', '')}`;

  return {
    name: 'so',
    message: `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ Please check out ${soTarget} at ${twitchLink} jlengsHolyBucket jlengsBeardy ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
    description: 'Send a shout-out to someone in chat! `!so @username`',
  };
});
