import { sourceMdx } from '@toastdotdev/mdx';
import fetch from 'node-fetch';

export const sourceData = async ({ setDataForSlug }) => {
  await sourceMdx({
    setDataForSlug,
    directory: './content',
    slugPrefix: '/',
  });

  const sponsors = await fetch(
    `https://lwj2021.netlify.app/api/sponsors`,
  ).then((res) => res.json());

  await setDataForSlug('/', {
    data: { sponsors },
  });
};
