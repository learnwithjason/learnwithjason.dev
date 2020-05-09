import { useEffect, useState } from 'react';
import axios from 'axios';

export const useStreamDetails = (username) => {
  const [loading, setLoading] = useState(true);
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
        result.data.data.forEach((stream) => {
          if (stream.type === 'live') {
            setLive(true);
          }
        });
      }

      setLoading(false);
    }

    checkLiveStatus();
  }, [username]);

  return [loading, live];
};
