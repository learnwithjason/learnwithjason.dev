import type { RequestInit } from 'node-fetch';
import { Client, collectPaginatedAPI } from '@notionhq/client';
import fetch from 'node-fetch';

const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_TOKEN,
});

export async function getUserByEmail(email: string) {
	const users = await collectPaginatedAPI(notion.users.list, {
		page_size: 100,
	});

	const user = users.find((u) => {
		if (u.type !== 'person') {
			return false;
		}

		return u.person.email === email;
	});

	console.log(user);

	return user;
}

export type TitleProperty = {
	title: [{ text: { content: string } }];
};

export type RichTextProperty = {
	rich_text: [
		{
			type: 'text';
			text: { content: string };
		}
	];
};

export type DateProperty = {
	date: {
		start: string;
		time_zone: string;
	};
};

export type PeopleProperty = {
	people: [{ id: string }];
};

export type SelectProperty = {
	select: { name: string };
};

export type UrlProperty = {
	type: 'url';
	url: string;
};

export type RequestEntry = {
	Name: TitleProperty;
	'Submitted By'?: PeopleProperty;
	'Needed By'?: DateProperty;
	'How big is the risk to Netlify if we don’t do this?'?: SelectProperty;
};

type ParagraphBlock = {
	type: 'paragraph';
	paragraph: RichTextProperty;
};

type ImageBlock = {
	type: string;
	image: {
		type: 'external';
		external: {
			url: string;
		};
	};
};

export async function notionApi(endpoint: string, body?: object) {
	const options: RequestInit = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Notion-Version': '2022-06-28',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NOTION_INTEGRATION_TOKEN}`,
		},
	};

	if (body) {
		options.method = 'POST';
		options.body = JSON.stringify(body);
	}

	return await fetch(`https://api.notion.com/v1${endpoint}`, options).then(
		(res) => res.json()
	);
}

export const properties = {
	title(title: string): TitleProperty {
		return {
			title: [
				{
					text: {
						content: title,
					},
				},
			],
		};
	},
	richText(content: string): RichTextProperty {
		return {
			rich_text: [
				{
					type: 'text',
					text: { content },
				},
			],
		};
	},
	date(date: string): DateProperty {
		return {
			date: {
				start: date,
				time_zone: 'America/Los_Angeles',
			},
		};
	},
	select(optionName: string): SelectProperty {
		return {
			select: {
				name: optionName,
			},
		};
	},
	url(url: string): UrlProperty {
		return {
			type: 'url',
			url,
		};
	},
};

export const blocks = {
	paragraph(content: string): ParagraphBlock {
		return {
			type: 'paragraph',
			paragraph: properties.richText(content),
		};
	},
	image(imageUrl: string): ImageBlock {
		return {
			type: 'image',
			image: {
				type: 'external',
				external: {
					url: imageUrl,
				},
			},
		};
	},
};
