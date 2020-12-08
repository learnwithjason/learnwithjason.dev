import { h } from 'preact';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime.js';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { TeacherPhoto } from './teacher-photo.js';
import { IconArrow } from './icon-arrow.js';
import { IconCalendar } from './icon-calendar.js';
import { IconInfo } from './icon-info.js';
import { IconShare } from './icon-share.js';

dayjs.extend(RelativeTime);
dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function SectionNextEpisode({ episode }) {
  const [guest] = episode.guest;

  return (
    <section class="block">
      <h2>The next episode is in {dayjs().to(episode.date)}!</h2>
      <div class="next-episode-wrapper">
        <div class="next-episode">
          <TeacherPhoto
            imageURL={guest.guestImage.asset.url}
            alt={guest.name}
          />
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
            Never miss an episode! Add the <em>Learn With Jason</em> schedule to
            your Google Calendar:
          </p>
          <div class="links">
            <a href="#google-calendar">
              <IconCalendar /> Add the Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
