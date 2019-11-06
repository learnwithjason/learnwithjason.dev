/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useEffect, useState } from 'react';
import Image from 'gatsby-image';
import SEO from './seo';

const Event = ({ title, description, guest, date, image, slug, basePath }) => {
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
    <Fragment>
      <SEO
        title={`${title} (with ${guest.map(g => g.name).join()})`}
        description={description}
        image={image.fluid.src}
        author={{ twitter: '@LWJShow' }}
        path={`/${basePath}/${slug}`.replace(/\/+/g, '/')}
      />
      <div
        sx={{
          display: ['block', 'grid'],
          gridTemplateColumns: '3fr 2fr',
          columnGap: 4,
          m: 0,
          mt: 4,
        }}
      >
        <h1 sx={{ gridColumn: '1 / 3' }}>
          {title} (with {guest.map(g => g.name).join()})
        </h1>
        <div>
          <Image fluid={image.fluid} alt={title} />
        </div>
        <div>
          <h2 sx={{ m: 0, mt: [3, 0] }}>Episode Details</h2>
          <ul sx={{ mt: 2 }}>
            <li>{localeDate}</li>
            <li>
              Guest:{' '}
              {guest.map(g => (
                <a
                  href={`https://twitter.com/${g.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={g.twitter}
                >
                  {g.name}
                </a>
              ))}
            </li>
          </ul>
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

      <p
        sx={{
          fontSize: 3,
          fontWeight: 300,
          mx: 'auto',
          mt: 4,
          maxWidth: '54ch',
        }}
      >
        {description}
      </p>
    </Fragment>
  );
};

export default Event;
