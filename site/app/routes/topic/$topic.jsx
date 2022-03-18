import { Fragment } from 'react';
import { useLoaderData } from 'remix';

import { EpisodeList } from '~/components/episode-list.jsx';
import { loadFromApi } from '~/util/fetch-api.server';
import { getTeacher } from '~/util/get-teacher.js';
import { loadAllEpisodes } from '~/util/load-all-episodes.server.js';

export const loader = async ({ params }) => {
  const { topic } = params;
  const topicData = await loadFromApi(`/api/tag/${topic}`);
  const episodes = await loadAllEpisodes();

  return {
    topicSlug: topic,
    topic: topicData,
    episodes: episodes
      .filter((ep) =>
        (ep.tags ?? []).some(
          (tag) => tag.slug.toLowerCase() === topic.toLowerCase(),
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
    title: data.topic?.label ?? `Topic: ${data.topicSlug}`,
  };
};

export default function Episodes() {
  const { topic, topicSlug, episodes } = useLoaderData();

  return (
    <Fragment>
      <header className="block hero">
        <h1>{topic?.label ?? `Posts tagged with “${topicSlug}”`}</h1>
        {topic?.description ? <p>{topic.description}</p> : null}
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
