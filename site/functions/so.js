const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(({ message, flags: { broadcaster, mod } }) => {
  // only broadcasters or mods can shoutout
  if (!broadcaster && !mod) {
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
