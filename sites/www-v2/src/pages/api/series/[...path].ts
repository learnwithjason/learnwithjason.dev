import type { APIRoute } from 'astro';
import {
	selectSeries,
	selectSeriesBySlug,
	selectCollectionBySlug,
	selectEpisodeBySlug,
} from '../../../../db/interface';

export const GET: APIRoute = async ({ params }) => {
	const { path } = params;
	const [seriesSlug, collectionSlug, episodeSlug] = (path?.split('/') ??
		'') as Array<string | undefined>;

	if (!seriesSlug) {
		const data = await selectSeries();
		return new Response(JSON.stringify(data), { status: 200 });
	}

	let type: 'series' | 'collection' | 'episode' = 'series';

	if (!episodeSlug && collectionSlug) {
		type = 'collection';
	} else if (episodeSlug && collectionSlug) {
		type = 'episode';
	}

	let data;
	switch (type) {
		case 'series':
			data = await selectSeriesBySlug(seriesSlug);
			break;

		case 'collection':
			data = await selectCollectionBySlug(seriesSlug, collectionSlug!);
			break;

		case 'episode':
			data = await selectEpisodeBySlug(
				seriesSlug,
				collectionSlug!,
				episodeSlug!,
			);
			break;

		default:
			console.log(`Unknown type "${type}"`);
			return new Response(null, { status: 400 });
	}

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
