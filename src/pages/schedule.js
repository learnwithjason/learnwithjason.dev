import { h, Fragment } from 'preact';
import { IconArrow } from '../components/icon-arrow.js';
import { IconCalendar } from '../components/icon-calendar.js';
import { EpisodePreview } from '../components/episode-preview.js';

export default function Schedule({ schedule }) {
  return (
    <Fragment>
      <header class="block hero">
        <h1>Schedule</h1>
        <p>
          Here's who we'll be learning from next on <em>Learn With Jason</em>!
        </p>
        <p>
          Make sure to never miss an episode by adding the Google Calendar and
          subscribing on Twitch!
        </p>
        <div class="hero-buttons">
          <a href="/calendar" class="button">
            <IconCalendar /> Add on Google Calendar
          </a>
          <a href="https://twitch.tv/jlengstorf" class="button">
            Follow on Twitch <IconArrow />
          </a>
        </div>
      </header>
      <section class="block episode-previews">
        {schedule.map((episode) => (
          <EpisodePreview key={episode.slug} episode={episode} />
        ))}
      </section>
    </Fragment>
  );
}
