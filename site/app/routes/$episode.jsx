import { useLoaderData } from 'remix';
import { marked } from 'marked';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { getTeacher } from '../util/get-teacher.js';
import { EpisodePosted } from '../components/episode-posted.jsx';
import { EpisodeScheduled } from '../components/episode-scheduled.jsx';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.learnwithjason.dev';

export const loader = async ({ params }) => {
  const slug = params.episode;
  const episode = await fetch(`${API_URL}/api/episode/${slug}/transcript`).then(
    (res) => res.json(),
  );

  const scheduleDescription = `${dayjs(episode.date).format(
    'MMMM D @ h:mm A z',
  )} — ${episode.description}`;

  const transcriptHtml = episode.transcript
    ? marked.parse(episode.transcript)
    : false;

  const startDate = dayjs(episode.date).toISOString();
  const endDate = dayjs(episode.date).add(90, 'minutes').toISOString();

  const host = getTeacher([episode.host]);
  const teacher = getTeacher(episode.guest);

  return {
    ...episode,
    startDate,
    endDate,
    host,
    teacher,
    scheduleDescription,
    transcriptHtml,
  };
};

export function meta({ data: episode }) {
  const description = `${dayjs(episode.date).format('MMMM D @ h:mm A z')} — ${
    episode.description
  }`;

  return {
    title: episode.title,
    description,
    image: episode.poster,
    'og:type': 'video.other',
    'og:url': `https://www.learnwithjason.dev/${episode.slug.current}`,
    'og:description': description,
    'og:image': episode.poster,
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@LWJShow',
    'twitter:title': episode.title,
    'twitter:description': description,
    'twitter:image': episode.poster,
  };
}

export default function EpisodeTemplate() {
  const episode = useLoaderData();

  if (episode.youtubeID) {
    return (
      <EpisodePosted
        episode={episode}
        host={episode.host}
        teacher={episode.teacher}
      />
    );
  }

  return (
    <EpisodeScheduled
      episode={episode}
      host={episode.host}
      teacher={episode.teacher}
    />
  );
}
