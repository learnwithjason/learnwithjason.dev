/** @jsx jsx */
import { jsx } from 'theme-ui';
import YouTube from 'react-youtube';

const Video = ({ youtubeID, playlist }) => (
  <div
    sx={{
      '.video-blog-embed-wrapper': {
        height: 0,
        mx: '-5vw',
        pb: `calc(9 / 16 * (100% + 5vw))`,
        position: 'relative',
        width: 'calc(100% + 10vw)',
      },
    }}
  >
    <YouTube
      videoId={youtubeID}
      containerClassName="video-blog-embed-wrapper"
      sx={{
        backgroundColor: 'background',
        backgroundImage: t => `
          linear-gradient(
            ${t.colors.background},
            ${t.colors.secondary},
            ${t.colors.background}
          )
        `,
        border: '1px solid',
        borderColor: 'background',
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
      }}
      opts={{
        playerVars: {
          modestbranding: 1,
          list: playlist,
          rel: 0,
          color: 'white',
        },
      }}
    />
  </div>
);

export default Video;
