const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler(({ author, arguments }) => {
  if (
    !author ||
    !author.roles.includes('SUBSCRIBER') ||
    !author.roles.includes('BROADCASTER')
  ) {
    return;
  }

  const soTarget = arguments.find((part) => part.startsWith('@'));
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
