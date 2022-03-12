import { Fragment } from 'react';
import { Link } from 'remix';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime.js';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';

import { LivePlayer } from './live-player.jsx';
import { EpisodePreview } from './episode-preview.jsx';
import { IconArrow } from './icon-arrow.jsx';
import { IconCalendar } from './icon-calendar.jsx';
import { getTeacher } from '../util/get-teacher.js';

dayjs.extend(RelativeTime);
dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function SectionNextEpisode({ nextEpisode, nextNextEpisode }) {
  // show the current episode until it's over
  const date = dayjs().subtract(90, 'minutes');
  const episode = date.isBefore(dayjs(nextEpisode.date))
    ? nextEpisode
    : nextNextEpisode;

  const teacher = getTeacher(episode.guest);

  const isLive = dayjs(episode.date).isBefore(dayjs());

  return (
    <section className="block">
      {isLive ? (
        <div>
          <h2>
            Jason is live{' '}
            {teacher.name !== 'Jason Lengstorf' ? `with ${teacher.name}` : ''}{' '}
            right now!
          </h2>
          <LivePlayer />
        </div>
      ) : (
        <Fragment>
          <h2>The next episode is {dayjs().to(episode.date)}!</h2>
          <div className="next-episode-wrapper">
            <EpisodePreview episode={episode} />
            <div className="schedule-links">
              <Link prefetch="intent" to="/schedule" className="button">
                see all upcoming episodes <IconArrow />
              </Link>
              <p>
                Never miss an episode! Add the <em>Learn With Jason</em>{' '}
                schedule to your Google Calendar:
              </p>
              <div className="links">
                <a href="/calendar">
                  <IconCalendar /> Add the Calendar
                </a>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
}
