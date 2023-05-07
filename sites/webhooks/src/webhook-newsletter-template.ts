import type { Handler } from '@netlify/functions';

import { format, previousThursday, nextThursday } from 'date-fns';
import { blockToHtml, notionApi } from '@lwj/notion-helpers';
import { getNewsletterTemplateMarkup } from './util/mjml';

type Result = {
	properties: {
		entryType: {
			select: {
				name: 'broadcast' | 'featured';
			};
		};
		imageSrc: {
			url: string;
		};
		imageAlt: {
			rich_text: {
				text: {
					content: string;
				};
			}[];
		};
		heading: {
			title: {
				text: {
					content: string;
				};
			}[];
		};
		description: {
			rich_text: {
				text: {
					content: string;
				};
			}[];
		};
		link: {
			url: string;
		};
	};
};

export const handler: Handler = async () => {
	const notionData = await notionApi(
		'/databases/1ad6632d5f9a4e829ea84827532a7993/query',
		{
			filter: {
				and: [
					{
						property: 'date',
						date: {
							on_or_before: format(nextThursday(new Date()), 'yyyy-MM-dd'),
						},
					},
					{
						property: 'date',
						date: {
							after: format(previousThursday(new Date()), 'yyyy-MM-dd'),
						},
					},
				],
			},
		}
	);

	const featuredItems = notionData.results
		.filter((result: Result) => {
			return result.properties.entryType.select.name === 'featured';
		})
		.map((result: Result) => {
			return {
				image: {
					src: result.properties.imageSrc.url,
					alt: result.properties.imageAlt.rich_text[0].text.content,
				},
				heading: result.properties.heading.title[0].text.content,
				description: result.properties.description.rich_text[0].text.content,
				link: result.properties.link.url,
			};
		});

	const lede = notionData.results.find(
		(result: Result) => result.properties.entryType.select.name === 'broadcast'
	);

	const subject = lede.properties.heading.title[0].plain_text;
	const previewText = lede.properties.previewText.rich_text[0].plain_text;
	const pageData = await notionApi(`/blocks/${lede.id}/children`);
	const ledeHtml = blockToHtml(pageData);

	const markup = await getNewsletterTemplateMarkup({
		ledeHtml,
		previewText,
		featuredItems,
	});

	const ckResult = await fetch('https://api.convertkit.com/v3/broadcasts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf8',
		},
		body: JSON.stringify({
			api_secret: process.env.CK_API_SECRET,
			subject,
			content: markup.html,
			email_layout_template: 'API Template',
			public: true,
		}),
	});

	if (!ckResult.ok) {
		console.error(ckResult);
	}

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html; charset=utf8',
		},
		body: markup.html,
	};
};
