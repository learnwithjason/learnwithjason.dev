import { h } from 'preact';
// this path is weird because this template gets moved during the build
import { EpisodePreview } from './src/components/episode-preview.js';
import { IconCalendar } from './src/components/icon-calendar.js';
import { ShareButton } from './src/components/share-button.js';

export default function EpisodeTemplate({ episode }) {
  console.log({ host: episode.host });
  return (
    <div class="block episode">
      <EpisodePreview episode={episode} hideLinks>
        <div class="episode-links">
          <a href="/calendar">
            <IconCalendar /> Add on Google Calendar
          </a>
          <ShareButton
            title={episode.title}
            text={episode.description}
            url={`/${episode.slug.current}`}
            class="animate"
          />
        </div>
      </EpisodePreview>
    </div>
  );
}
