import { sourceMdx } from '@toastdotdev/mdx';
import fetch from 'node-fetch';

export const sourceData = async ({ setDataForSlug }) => {
  await sourceMdx({
    setDataForSlug,
    directory: './content',
    slugPrefix: '/',
  });

  const featuredPromise = fetch(
    'https://lwj2021.netlify.app/api/episodes?featured=true',
  ).then((res) => res.json());

  const sponsorsPromise = fetch(
    `https://lwj2021.netlify.app/api/sponsors`,
  ).then((res) => res.json());

  const [featuredEpisodes, sponsors] = await Promise.all([
    featuredPromise,
    sponsorsPromise,
  ]);

  await setDataForSlug('/', {
    data: { sponsors, featuredEpisodes },
  });
};
