/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TwitchButton = ({ username, colorMode }) => {
  const [live, setLive] = useState(false);

  useEffect(() => {
    async function checkLiveStatus() {
      const result = await axios({
        method: 'GET',
        url: 'https://api.twitch.tv/helix/streams',
        headers: {
          'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID,
        },
        params: {
          user_login: username,
        },
      });

      if (result.data && result.data.data) {
        result.data.data.forEach(stream => {
          if (stream.type === 'live') {
            setLive(true);
          }
        });
      }
    }

    checkLiveStatus();
  }, [username]);

  return live ? (
    <a
      href={`https://twitch.tv/${username}`}
      sx={{
        variant: 'video-blog.header.link',
        '::before': {
          bg: 'white',
          borderRadius: '50%',
          content: '""',
          display: live ? 'inline-block' : 'none',
          height: '10px',
          my: 1,
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
      Watch Live Now!
    </a>
  ) : null;
};

export default TwitchButton;
