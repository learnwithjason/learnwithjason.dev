import { useEffect, useState } from 'react';

export const useStreamDetails = (username) => {
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    async function checkLiveStatus() {
      const result = await fetch('/api/get-twitch-stream-data', {
        method: 'POST',
        body: JSON.stringify({
          user_login: username,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));

      if (result && result.data) {
        result.data.forEach((stream) => {
          if (stream.type === 'live') {
            setLive(true);
            setData(stream);
          }
        });
      }

      setLoading(false);
    }

    if (!loading) return;

    checkLiveStatus();
  }, [username, data, loading]);

  return { loading, live, data };
};
