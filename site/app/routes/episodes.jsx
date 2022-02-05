import { Fragment } from 'react';
import { useLoaderData } from 'remix';

import { EpisodeList } from '~/components/episode-list.jsx';
import { IconArrow } from '~/components/icon-arrow.jsx';
import { getTeacher } from '~/util/get-teacher.js';
import { loadAllEpisodes } from '~/util/load-all-episodes.server.js';

export const loader = async () => {
  const episodes = await loadAllEpisodes();

  return episodes.map((episode) => {
    const host = getTeacher([episode.host]);
    const teacher = getTeacher(episode.guest);

    return { ...episode, host, teacher };
  });
};

export default function Episodes() {
  const episodes = useLoaderData();

  return (
    <Fragment>
      <header className="block hero">
        <h1>All Episodes</h1>
        <p>
          Browse all {episodes.length} episodes of <em>Learn With Jason</em>.
          Show your support and get notified of new episodes by subscribing on
          YouTube!
        </p>
        <div className="hero-buttons">
          <a
            href="https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A"
            className="button"
          >
            Subscribe on YouTube <IconArrow />
          </a>
        </div>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
