import { createSitemap } from '~/util/create-sitemap.server';
import { loadFromApi } from '~/util/fetch-api.server';
import { loadAllEpisodes } from '~/util/load-all-episodes.server';
import { loadMdx } from '~/util/load-mdx.server';

export const loader = async () => {
  const episodes = await loadAllEpisodes();
  const schedule = await loadFromApi('/api/schedule');
  const posts = await loadMdx();

  const pageUrls = [
    '/',
    '/about',
    '/blog',
    '/episodes',
    '/schedule',
    '/store',
    '/newsletter',
    '/code-of-conduct',
  ].map((url) => ({ url: `https://www.learnwithjason.dev${url}` }));

  const episodeUrls = episodes.map((episode) => ({
    url: `https://www.learnwithjason.dev/${episode.slug.current}`,
    video: {
      title: episode.title,
      description: episode.description,
      youtubeID: episode.youtubeID,
      publication_date: new Date(episode.date).toISOString(),
    },
  }));

  const scheduleUrls = schedule.map((episode) => ({
    url: `https://www.learnwithjason.dev/${episode.slug.current}`,
  }));

  const postUrls = posts.map((post) => ({
    url: `https://www.learnwithjason.dev/blog/${post.slug}`,
  }));

  const urls = [...pageUrls, ...episodeUrls, ...scheduleUrls, ...postUrls];

  const sitemap = createSitemap(urls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
