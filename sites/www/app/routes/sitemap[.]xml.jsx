import { createSitemap } from '~/util/create-sitemap.server';
import { loadFromApi } from '~/util/fetch-api.server';

export const loader = async () => {
	const episodes = await loadFromApi('/api/v2/episodes');
	const schedule = await loadFromApi('/api/v2/schedule');

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
		url: `https://www.learnwithjason.dev/${episode.slug}`,
		video: {
			title: episode.title,
			description: episode.description,
			youtubeID: episode.youtube.id,
			publication_date: new Date(episode.date).toISOString(),
		},
	}));

	const scheduleUrls = schedule.map((episode) => ({
		url: `https://www.learnwithjason.dev/${episode.slug}`,
	}));

	const urls = [...pageUrls, ...episodeUrls, ...scheduleUrls];

	const sitemap = createSitemap(urls);

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
		},
	});
};
