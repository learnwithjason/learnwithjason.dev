import { sourceMdx, fetchMdxFromDisk, processMdx } from '@toastdotdev/mdx';
import fetch from 'node-fetch';
import fs from 'fs';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export const sourceData = async ({ setDataForSlug }) => {
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
    sourceMdx({
      setDataForSlug,
      directory: './content/pages',
      slugPrefix: '/',
    }),
    sourceMdx({
      setDataForSlug,
      directory: './content/blog',
      slugPrefix: '/blog',
    }),
  ]);

  const markdownPromises = episodes.map(async (episode) => {
    return new Promise((resolve, reject) => {
      if (!episode.transcript) {
        resolve(episode);
      }

      unified()
        .use(remarkParse)
        .use(remark2rehype)
        .use(rehypeStringify)
        .process(episode.transcript, (err, file) => {
          if (err) {
            reject(err);
          }

          resolve({
            ...episode,
            transcriptHtml: String(file),
          });
        });
    });
  });

  const episodeComponent = fs.readFileSync(
    './src/components/episode-template.js',
    'utf-8',
  );

  const episodesWithMarkdown = await Promise.all([
    ...markdownPromises,
    setDataForSlug('/', {
      data: {
        sponsors,
        featuredEpisodes,
        episodes: episodes.map((episode) => ({
          _id: episode._id,
          title: episode.title,
          slug: episode.slug,
          guest: episode.guest,
          tags: episode.tags,
          youtubeID: episode.youtubeID,
        })),
        schedule,
      },
    }),
    setDataForSlug('/schedule', {
      data: {
        schedule,
      },
    }),
  ]);

  await Promise.all(
    episodesWithMarkdown.map((episode) => {
      if (!episode.youtubeID) {
        return Promise.resolve();
      }

      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: episodeComponent,
        },
        data: {
          episode,
        },
      });
    }),
  );
};
