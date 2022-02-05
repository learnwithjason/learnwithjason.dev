import { Fragment } from 'react';
import { useLoaderData, Link } from 'remix';

import { loadFromApi } from '~/util/fetch-api.server.js';
import { IconArrow } from '~/components/icon-arrow.jsx';
import { IconCalendar } from '~/components/icon-calendar.jsx';
import { EpisodePreview } from '~/components/episode-preview.jsx';

export const loader = async () => {
  const schedule = await loadFromApi('/api/schedule');

  return schedule;
};

export const meta = () => {
  return {
    title: 'Upcoming Learn With Jason Episodes',
    description:
      'See what we’ll be learning next on Learn With Jason. Add the calendar to make sure you never miss an episode!',
  };
};

export default function Schedule() {
  const schedule = useLoaderData();

  return (
    <Fragment>
      <header className="block hero">
        <h1>Schedule</h1>
        <p>
          Here's who we'll be learning from next on <em>Learn With Jason</em>!
        </p>
        <p>
          Make sure to never miss an episode by adding the Google Calendar and
          subscribing on Twitch!
        </p>
        <div className="hero-buttons">
          <Link prefetch="intent" to="/calendar" className="button">
            <IconCalendar /> Add on Google Calendar
          </Link>
          <a href="https://twitch.tv/jlengstorf" className="button">
            Follow on Twitch <IconArrow />
          </a>
        </div>
      </header>
      <section className="block episode-previews">
        {schedule
          .filter((ep) => !ep.youtubeID)
          .map((episode) => (
            <EpisodePreview key={episode.slug.current} episode={episode} />
          ))}
      </section>
    </Fragment>
  );
}
