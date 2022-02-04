import { h } from 'preact';
import { lazy, Suspense } from 'preact/compat';

export function LivePlayer() {
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) return null;

  const ReactTwitchEmbedVideo = lazy(() =>
    import('/web_modules/react-twitch-embed-video.js'),
  );

  return (
    <Suspense fallback={<p>loading...</p>}>
      <ReactTwitchEmbedVideo
        channel="jlengstorf"
        parent={['www.learnwithjason.dev']}
      />
      <iframe
        title="Live captions by White Coat Captioning"
        src="https://www.streamtext.net/player?event=LearnWithJason&chat=off&header=off&footer=off&bgc=010a10&fgc=ffffff&indicator=off&content-style=font-family:mallory,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:18px;"
        frameBorder="0"
        class="live-captions"
      />
      <p class="live-captions-credits">
        Live captioning by{' '}
        <a href="https://whitecoatcaptioning.com/">White Coat Captioning</a>
      </p>
    </Suspense>
  );
}
