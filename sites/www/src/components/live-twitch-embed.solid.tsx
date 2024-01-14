import { createEffect } from 'solid-js';

export const LiveTwitchEmbed = () => {
	createEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://embed.twitch.tv/embed/v1.js';

		script.onload = () => {
			// @ts-ignore Twitch is globally defined by the above embed script
			if (!Twitch) {
				return;
			}

			// @ts-ignore
			new Twitch.Embed('twitch-embed', {
				channel: 'jlengstorf',
				parent: ['www.learnwithjason.dev'],
				width: '100%',
				height: 600,
				theme: 'light',
			});
		};

		setTimeout(() => document.querySelector('body')?.appendChild(script), 100);
	});

	return <div id="twitch-embed" style={{ 'margin-top': '1rem' }} />;
};
