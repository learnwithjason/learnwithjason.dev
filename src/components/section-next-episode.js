import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime.js';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { LivePlayer } from './live-player.js';
import { TeacherPhoto } from './teacher-photo.js';
import { IconArrow } from './icon-arrow.js';
import { IconCalendar } from './icon-calendar.js';
import { IconInfo } from './icon-info.js';
import { IconShare } from './icon-share.js';

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

  const isLive = dayjs(episode.date).isBefore(dayjs());

  const [guest] = episode.guest;

  return (
    <section class="block">
      {isLive ? (
        <div>
          <h2>Jason is live with {guest.name} right now!</h2>
          <LivePlayer />
        </div>
      ) : (
        <Fragment>
          <h2>The next episode is {dayjs().to(episode.date)}!</h2>
          <div class="next-episode-wrapper">
            <div class="next-episode">
              <div class="next-episode-teacher">
                <div class="next-episode-photo">
                  <TeacherPhoto
                    imageURL={guest.guestImage.asset.url}
                    alt={guest.name}
                  />
                </div>
                <p>{guest.name}</p>
              </div>
              <div class="next-episode-details">
                <p class="gradient-subheading">
                  {dayjs(episode.date).format('dddd, MMMM D @ h:mm A z')}
                </p>
                <h3>{episode.title}</h3>
                <p class="episode-description">{episode.description}</p>
                <div class="episode-links">
                  <a href={`/${episode.slug.current}`}>
                    <IconInfo /> Episode Details
                  </a>
                  <a href="#share">
                    <IconShare /> Share
                  </a>
                </div>
              </div>
            </div>
            <div class="schedule-links">
              <a href="/schedule" class="button">
                see all upcoming episodes <IconArrow />
              </a>
              <p>
                Never miss an episode! Add the <em>Learn With Jason</em>{' '}
                schedule to your Google Calendar:
              </p>
              <div class="links">
                <a href="#google-calendar">
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
