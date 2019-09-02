/** @jsx jsx */
import { jsx } from 'theme-ui';
import Image from 'gatsby-image';

const Event = ({ event }) => {
  const title = event.title.replace(' — Learn With Jason', '');

  return (
    <div
      sx={{
        display: ['block', 'grid'],
        gridTemplateColumns: '3fr 2fr',
        columnGap: 4,
        m: 0,
        mt: 4,
      }}
    >
      <p
        sx={{
          m: 0,
          mb: 2,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: 'caps',
          gridColumn: '1 / 3',
        }}
      >
        {new Date(event.start).toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        })}
      </p>
      <div>
        <Image fluid={event.image.sharp.fluid} alt={title} />
      </div>
      <div>
        <h2 sx={{ m: 0, mt: [3, 0] }}>{title}</h2>
        <p sx={{ m: 0, mt: 2 }}>{event.description}</p>
        <p sx={{ m: 0, mt: 2 }}>
          <a href={`https://twitch.tv/events/${event.originalID}`}>
            View on Twitch &rarr;
          </a>
        </p>
      </div>
    </div>
  );
};

const Events = ({ events }) => (
  <div>
    {events.map(event => (
      <Event key={event.id} event={event} />
    ))}
  </div>
);

export default Events;
