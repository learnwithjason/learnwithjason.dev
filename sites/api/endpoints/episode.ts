import { builder, Handler } from '@netlify/functions';
import { loadEpisodeBySlug } from '@lwj/sanity-helpers';

const handlerFn: Handler = async (event) => {
	const params = new URLSearchParams(event.rawQuery);
	const transcript = params.get('transcript') === 'true';
	const cdn = params.get('cdn') === 'false' ? false : true;
	let [, slug] = event.path
		.replace(/\/(api|.netlify\/functions)\/episode/, '')
		.split('/');

	if (slug.endsWith('.json')) {
		slug = slug.replace('.json', '');
	}

	const { error, data } = await loadEpisodeBySlug({ slug, transcript, cdn });

	if (error) {
		return {
			statusCode: error.statusCode,
			body: error.message,
		};
	}

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf8',
		},
		body: JSON.stringify(data?.result),
	};
};

export const handler = builder(handlerFn);
