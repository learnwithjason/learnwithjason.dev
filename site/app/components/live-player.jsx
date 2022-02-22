import { useEffect } from 'react';

export function LivePlayer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.twitch.tv/embed/v1.js';

    script.onload = () => {
      if (!Twitch) {
        return;
      }

      new Twitch.Embed('twitch-embed', {
        channel: 'jlengstorf',
        parent: ['www.learnwithjason.dev'],
        width: '100%',
        height: '400px',
        theme: 'light',
      });
    };

    document.querySelector('body').appendChild(script);
  }, []);

  return (
    <>
      <div id="twitch-embed" />
      <iframe
        title="Live captions by White Coat Captioning"
        src="https://www.streamtext.net/player?event=LearnWithJason&chat=off&header=off&footer=off&bgc=010a10&fgc=ffffff&indicator=off&content-style=font-family:mallory,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:18px;"
        frameBorder="0"
        className="live-captions"
      />
      <p className="live-captions-credits">
        Live captioning by{' '}
        <a href="https://whitecoatcaptioning.com/">White Coat Captioning</a>
      </p>
    </>
  );
}
