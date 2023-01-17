import { builder, Handler } from '@netlify/functions';

const sponsors = [
	{
		name: 'Netlify',
		image:
			'https://res.cloudinary.com/jlengstorf/image/upload/v1607223004/lwj/sponsors/netlify.svg',
		imageWidth: 115,
		imageHeight: 36,
		url: 'https://lwj.dev/netlify',
	},
	{
		name: 'Nx',
		image:
			'https://res.cloudinary.com/jlengstorf/image/upload/v1643133201/lwj/sponsors/nx.svg',
		imageWidth: 38,
		imageHeight: 36,
		url: 'https://nx.dev/?utm_source=Learn+with+Jason&utm_medium=link&utm_id=LWJ+2022+H1',
	},
	{
		name: 'New Relic',
		image:
			'https://res.cloudinary.com/jlengstorf/image/upload/lwj/sponsors/nr.svg',
		imageWidth: 117,
		imageHeight: 23,
		url: 'https://newrelic.com/',
	},
	{
		name: 'Pluralsight',
		image:
			'https://res.cloudinary.com/jlengstorf/image/upload/v1673920307/lwj/sponsors/pluralsight.svg',
		imageWidth: 165,
		imageHeight: 35,
		url: 'https://lwj.dev/pluralsight',
	},
];

const handlerFn: Handler = async () => {
	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json; charset=utf8',
		},
		body: JSON.stringify(sponsors),
	};
};

export const handler = builder(handlerFn);
