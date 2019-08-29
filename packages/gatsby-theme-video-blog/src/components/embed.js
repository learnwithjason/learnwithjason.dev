/** @jsx jsx */
import { jsx } from 'theme-ui';

const Embed = ({ embed }) => {
  // TODO this may only work with YouTube — make it more generic
  const [, width, height] = embed.match(/width="(\d+)".*height="(\d+)"/);

  return (
    <div
      sx={{
        position: 'relative',
        '::before': {
          content: '""',
          display: 'block',
          pb: `calc(100% / ${width / height})`,
        },
        iframe: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        },
      }}
      dangerouslySetInnerHTML={{ __html: embed }}
    />
  );
};

export default Embed;
