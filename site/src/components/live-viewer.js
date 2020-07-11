/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { Link } from 'gatsby';
import Heading from './heading';
import { useStreamDetails } from '../hooks/use-stream-details';

const CHANNEL_NAME = 'jlengstorf';

export const LiveViewer = () => {
  const { loading, live } = useStreamDetails(CHANNEL_NAME);

  if (loading) return null;

  if (!live) {
    return (
      <div
        sx={{
          margin: '0 auto',
          maxWidth: '540px',
          width: '90vw',
          table: {
            width: 'calc(100% + 10vw)',
            mx: '-5vw',
            'th,td': {
              ':first-of-type': {
                width: 120,
              },
            },
          },
        }}
      >
        <Heading>Offline.</Heading>
        <p sx={{ textAlign: 'center' }}>
          Check <Link to="/schedule">the schedule</Link> to find out when we go
          live next!
        </p>
      </div>
    );
  }

  return (
    <Fragment>
      <div
        sx={{
          '#twitch-embed': {
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '51%',
          },
          iframe: {
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
        }}
      >
        <ReactTwitchEmbedVideo
          channel={CHANNEL_NAME}
          parent={['www.learnwithjason.dev']}
        />
      </div>
      <iframe
        title="Live captions by White Coat Captioning"
        src="https://www.streamtext.net/player?event=LearnWithJason&chat=off&header=off&footer=off&bgc=010a10&fgc=ffffff&indicator=off&content-style=font-family:mallory,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:18px;"
        frameBorder="0"
        sx={{
          marginTop: 4,
          height: 360,
          width: '100%',
        }}
      />
      <p sx={{ textAlign: 'center' }}>
        Live captioning by{' '}
        <a href="https://whitecoatcaptioning.com/">White Coat Captioning</a>
      </p>
      <p
        sx={{
          mt: 4,
          textAlign: 'center',
        }}
      >
        Live captioning made possible by{' '}
        <a href="https://www.netlify.com?utm_source=learnwithjason&utm_medium=captions-jl&utm_campaign=devex">
          Netlify
        </a>
        , <a href="https://fauna.com">Fauna</a>,{' '}
        <a href="https://sanity.io">Sanity</a>, and{' '}
        <a href="https://auth0.com">Auth0</a>.
      </p>
    </Fragment>
  );
};
