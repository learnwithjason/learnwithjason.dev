/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect, useState } from 'react';
import Image from 'gatsby-image';

const Event = ({ title, description, guest, date, image, basePath, slug }) => {
  const [calendarLink, setCalendarLink] = useState(false);

  if (typeof guest !== 'object') {
    guest = [];
  }

  const localeDate = new Date(date).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  });

  useEffect(() => {
    const startTS = Date.parse(date); // get a Unix timestamp (milliseconds)
    const endTS = startTS + 1000 * 60 * 90; // add 90 minutes
    const start = new Date(startTS)
      .toISOString()
      .replace('.000', '')
      .replace(/\W/g, '');
    const end = new Date(endTS)
      .toISOString()
      .replace('.000', '')
      .replace(/\W/g, '');
    const link = new URL('https://www.google.com/calendar/render');
    link.searchParams.set('action', 'TEMPLATE');
    link.searchParams.set('text', title);
    link.searchParams.set('details', description);
    link.searchParams.set('location', 'https://twitch.tv/jlengstorf');
    link.searchParams.set('dates', `${start}/${end}`);
    link.searchParams.set('ctz', `America/Los_Angeles`);

    setCalendarLink(link.toString());
  }, [date, title, description]);

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
        {localeDate}
      </p>
      <div>
        <Image fluid={image.fluid} alt={title} />
      </div>
      <div>
        <h2 sx={{ m: 0, mt: [3, 0] }}>{title}</h2>
        <p
          sx={{
            fontSize: 0,
            letterSpacing: '0.1em',
            mt: 0,
            textTransform: 'uppercase',
          }}
        >
          Guest:{' '}
          {guest.map(g => (
            <a
              href={`https://twitter.com/${g.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {g.name}
            </a>
          ))}
        </p>
        <p sx={{ m: 0, mt: 2 }}>{description}</p>
        {calendarLink && (
          <a
            href={calendarLink}
            sx={{ variant: 'button' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Add to Google Calendar
          </a>
        )}
      </div>
    </div>
  );
};

const EventList = ({ videos, basePath }) => {
  return (
    <div>
      {videos.map(video => (
        <Event
          key={video.id}
          title={video.title}
          description={video.description}
          date={video.date}
          image={video.image}
          slug={video.slug}
          guest={video.guest}
          basePath={basePath}
        />
      ))}
    </div>
  );
};

export default EventList;
