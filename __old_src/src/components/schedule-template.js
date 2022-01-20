import { h, Fragment } from 'preact';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
// this path is weird because this template gets moved during the build
import { EpisodePreview } from './src/components/episode-preview.js';
import { IconCalendar } from './src/components/icon-calendar.js';
import { ShareButton } from './src/components/share-button.js';
import { getTeacher } from './src/util/get-teacher.js';
import { getImageAttributes } from './src/util/get-image-attributes.js';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export default function EpisodeTemplate({ episode }) {
  const host = getTeacher([episode.host]);
  const teacher = getTeacher(episode.guest);
  const description = `${dayjs(episode.date).format('MMMM D @ h:mm A z')} — ${
    episode.description
  }`;

  const { src } = getImageAttributes({
    host,
    teacher,
    title: episode.title,
    width: 500,
    height: 278,
  });

  return (
    <Fragment>
      <Helmet>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {`
        {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "${episode.title} — Learn With Jason",
          "startDate": "${dayjs(episode.date).toISOString()}",
          "endDate": "${dayjs(episode.date).add(90, 'minutes').toISOString()}",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": "https://twitch.tv/jlengstorf"
            },
          "image": [
            "${src}",
            "${teacher.image}"
          ],
          "description": "${episode.description}",
          "performer": [
            {
              "@type": "Person",
              "name": "${host.name}"
            },
            {
              "@type": "Person",
              "name": "${teacher.name}"
            }
          ],
          "organizer": {
            "@type": "Organization",
            "name": "Learn With Jason",
            "url": "https://www.learnwithjason.dev"
          }
        }`}
        </script>
      </Helmet>
      <div class="block episode">
        <EpisodePreview episode={episode} hideLinks>
          <p>
            <a href="https://twitch.tv/jlengstorf" class="button">
              Watch on Twitch
            </a>
          </p>
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
    </Fragment>
  );
}
