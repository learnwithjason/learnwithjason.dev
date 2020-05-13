/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useStreamDetails } from '../hooks/use-stream-details';

const TwitchButton = ({ username }) => {
  const { live } = useStreamDetails(username);

  return live ? (
    <a
      href={`https://twitch.tv/${username}`}
      sx={{
        variant: 'video-blog.header.link',
        bg: 'white',
        textTransform: 'uppercase',
        '&&': {
          color: 'blue.7',
        },
        '::before': {
          bg: 'magenta.3',
          borderRadius: '50%',
          content: '""',
          display: live ? 'inline-block' : 'none',
          height: '10px',
          my: '6px',
          mr: 2,
          verticalAlign: 'top',
          width: '10px',
        },
        ':hover, :focus': {
          '::before': {
            bg: 'yellow.6',
          },
        },
      }}
    >
      Live Now!
    </a>
  ) : null;
};

export default TwitchButton;
