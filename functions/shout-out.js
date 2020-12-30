const createHandler = require('@stream-blitz/create-handler');

exports.handler = createHandler({
  name: 'so',
  description: 'Send a shout-out to someone in chat! `!so @username`',
  handler: ({ author, args }) => {
    if (
      !author ||
      !author.roles.includes('SUBSCRIBER') ||
      !author.roles.includes('BROADCASTER')
    ) {
      return;
    }

    const soTarget = args.find((part) => part.startsWith('@'));
    if (!soTarget) {
      return;
    }

    const twitchLink = `https://twitch.tv/${soTarget.replace('@', '')}`;

    return {
      message: `▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ Please check out ${soTarget} at ${twitchLink} jlengsStreamBlitz jlengsHolyBucket jlengsBOOP ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,
    };
  },
});
