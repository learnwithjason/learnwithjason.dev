import { Handler, builder } from '@netlify/functions';
import { loadSchedule } from '@lwj/sanity-helpers';

const handlerFn: Handler = async (event) => {
	const params = new URLSearchParams(event.rawQuery);
	const cdn = params.get('cdn') === 'false' ? false : true;
	const { error, data } = await loadSchedule({ cdn });

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
