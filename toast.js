import { sourceMdx } from '@toastdotdev/mdx';
import fetch from 'node-fetch';
import fs from 'fs';

export const sourceData = async ({ setDataForSlug }) => {
  await sourceMdx({
    setDataForSlug,
    directory: './content',
    slugPrefix: '/',
  });

  const schedulePromise = fetch(
    'https://lwj2021.netlify.app/api/schedule',
  ).then((res) => res.json());

  const featuredPromise = fetch(
    'https://lwj2021.netlify.app/api/episodes?featured=true',
  ).then((res) => res.json());

  const allEpisodesPromise = fetch(
    'https://lwj2021.netlify.app/api/episodes',
  ).then((res) => res.json());

  const sponsorsPromise = fetch(
    `https://lwj2021.netlify.app/api/sponsors`,
  ).then((res) => res.json());

  const [schedule, featuredEpisodes, episodes, sponsors] = await Promise.all([
    schedulePromise,
    featuredPromise,
    allEpisodesPromise,
    sponsorsPromise,
  ]);

  await setDataForSlug('/', {
    data: {
      sponsors,
      featuredEpisodes,
      episodes: episodes.map((episode) => ({
        _id: episode._id,
        title: episode.title,
        slug: episode.slug,
        guest: episode.guest,
        tags: episode.tags,
      })),
      schedule,
    },
  });

  const episodeComponent = fs.readFileSync(
    './src/components/episode-template.js',
    'utf-8',
  );

  episodes.map((episode) => {
    if (!episode.youtubeID) {
      return;
    }

    setDataForSlug(`/${episode.slug.current}`, {
      component: {
        mode: 'source',
        value: episodeComponent,
      },
      data: {
        episode,
      },
    });
  });
};
