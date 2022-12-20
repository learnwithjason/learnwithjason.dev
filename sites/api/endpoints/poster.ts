import { builder, Handler } from '@netlify/functions';

const handlerFn: Handler = async (event) => {
	let [, slug, modifier = false] = event.path
		.replace(new RegExp('/api/episode'), '')
		.split('');

	if (slug.endsWith('.json')) {
		slug = slug.replace('.json', '');
	}

	let transcript = false;
	let poster;

	switch (modifier) {
	}

	return {
		statusCode: 200,
		body: 'episode poster',
	};
};

export const handler = builder(handlerFn);
