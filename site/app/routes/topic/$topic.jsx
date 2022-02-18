import { Fragment } from 'react';
import { useLoaderData, useParams } from 'remix';

import { EpisodeList } from '~/components/episode-list.jsx';
import { IconArrow } from '~/components/icon-arrow.jsx';
import { getTeacher } from '~/util/get-teacher.js';
import { loadAllEpisodes } from '~/util/load-all-episodes.server.js';

export const topicDescriptions = [
  { title: 'Let’s Learn! Intro Sessions', tag: 'lets-learn' },
  { title: 'Animation on the Web', tag: 'animation' },
  { title: 'Design and User Experience', tag: 'design' },
  { title: 'Serverless Functions', tag: 'serverless' },
];

export const loader = async ({ params }) => {
  console.log({ params });
  const { topic } = params;
  const topicInfo = topicDescriptions.find((t) => t.tag === topic);
  const episodes = await loadAllEpisodes();

  return {
    topicSlug: topic,
    topic: topicInfo,
    episodes: episodes
      .filter((ep) =>
        (ep.tags ?? []).some(
          (tag) => tag.value.toLowerCase() === topic.toLowerCase(),
        ),
      )
      .map((episode) => {
        const host = getTeacher([episode.host]);
        const teacher = getTeacher(episode.guest);

        return { ...episode, host, teacher };
      }),
  };
};

export const meta = ({ data }) => {
  return {
    title: data.topic?.title ?? `Topic: ${data.topicSlug}`,
  };
};

export default function Episodes() {
  const { topic, topicSlug, episodes } = useLoaderData();

  return (
    <Fragment>
      <header className="block hero">
        <h1>{topic?.title ?? `Posts tagged with “${topicSlug}”`}</h1>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
