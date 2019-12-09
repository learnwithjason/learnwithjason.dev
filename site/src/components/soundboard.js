/** @jsx jsx */
import { jsx } from 'theme-ui';
import axios from 'axios';

const SoundBoard = () => {
  const handleClick = command => event => {
    event.preventDefault();
    axios.post(
      '/api/trigger-sfx',
      JSON.stringify({
        command,
        user: 'LWJ Soundboard',
        channel: 'jlengstorf',
      }),
    );
  };

  return (
    <ul sx={{ listStyle: 'none', p: 0 }}>
      <li sx={{ m: 0 }}>
        <button
          sx={{ variant: 'button', m: 0 }}
          onClick={handleClick('blitzed')}
        >
          !blitzed
        </button>
      </li>
      <li>
        <button
          sx={{ variant: 'button', m: 0 }}
          onClick={handleClick('plzhold')}
        >
          !plzhold
        </button>
      </li>
    </ul>
  );
};

export default SoundBoard;
