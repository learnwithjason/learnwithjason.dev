import { Fragment } from 'react';
import { useLoaderData } from 'remix';
import getShareImage from '@jlengstorf/get-share-image';

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
  // TODO make this a util and add to posts
  const title = data.topic?.label ?? `Topic: ${data.topicSlug}`;
  const description = data.topic?.description ?? false;

  const tags = {};

  tags.title = title;
  tags['twitter:title'] = title;

  tags['og:url'] = `https://www.learnwithjason.dev/topic/${data.topicSlug}`;

  const image = getShareImage({
    title,
    tagline: `Get expert guidance on ${data.topic.label} from professional engineers.`,
    cloudName: 'jlengstorf',
    imagePublicID: 'lwj/post-share-2022',
    titleFont: 'jwf.otf',
    titleFontSize: 55,
    taglineFont: 'jwf-book.otf',
    taglineFontSize: 42,
    textColor: 'ffffff',
    textLeftOffset: 392,
    titleBottomOffset: 385,
    taglineTopOffset: 320,
    textAreaWidth: 813,
  });

  tags.image = image;
  tags['og:image'] = image;
  tags['twitter:image'] = image;

  if (description) {
    tags.description = description;
    tags['twitter:description'] = description;
    tags['og:description'] = description;
  }

  return tags;
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
