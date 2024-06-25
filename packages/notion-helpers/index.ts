import { Client, collectPaginatedAPI } from '@notionhq/client';

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

export type RichTextBlock = {
	type: 'text';
	text: { content: string; link?: { url: string } };
	annotations?: {
		bold?: boolean;
		italic?: boolean;
		strikethrough?: boolean;
		underline?: boolean;
		code?: boolean;
		color?: string;
	};
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
	paragraph: { rich_text: RichTextBlock[] };
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

interface Block {
	object: 'block';
	id: string;
	has_children: boolean;
}

interface Paragraph extends Block {
	type: 'paragraph';
	paragraph: { rich_text: RichTextBlock[] };
}

interface BulletedListItem extends Block {
	type: 'bulleted_list_item';
	bulleted_list_item: { rich_text: RichTextBlock[] };
}

interface ImageItem extends Block {
	type: 'image';
	image: {
		type: 'file';
		file: {
			url: string;
		};
	};
}

type NotionBlock = Paragraph | BulletedListItem | ImageItem;

type BlockChildren = {
	results: NotionBlock[];
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

	const res = await fetch(`https://api.notion.com/v1${endpoint}`, options);

	return res.json();
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
	richText(content: string): { rich_text: RichTextBlock[] } {
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

function getRichTextAnnotations(richTextBlock: RichTextBlock) {
	const annotations = richTextBlock.annotations!;
	let annotationStart = '';
	let annotationEnd = '';

	const annotationTypes = {
		bold: 'strong',
		italic: 'em',
		strikethrough: 'del',
		underline: '',
		code: 'code',
		color: '',
	};

	Object.keys(annotationTypes).forEach((annotationType) => {
		const type = annotationType as keyof typeof annotationTypes;

		if (
			['underline', 'color'].includes(annotationType) &&
			annotations[type] === true
		) {
			console.log(`TODO: implement ${annotationType} annotation support`);
			return;
		}

		if (annotations[type] === true) {
			const tag = annotationTypes[type];

			annotationStart = `${annotationStart}<${tag}>`;
			annotationEnd = `</${tag}>${annotationEnd}`;
		}
	});

	return { start: annotationStart, end: annotationEnd };
}

function getRichTextLink(richTextBlock: RichTextBlock) {
	if (!richTextBlock.text.link) {
		return { start: '', end: '' };
	}

	return { start: `<a href="${richTextBlock.text.link.url}">`, end: '</a>' };
}

export const blockToHtml = (notionBlocks: BlockChildren) => {
	const blocks = notionBlocks.results;
	let html = '';
	let previousTag = 'p'; // to open/close lists we need to track this

	blocks.forEach((block) => {
		if (block.object !== 'block') {
			return '';
		}

		let tag = 'span';
		let richTextBlocks;

		switch (block.type) {
			case 'paragraph':
				tag = 'p';
				richTextBlocks = block[block.type].rich_text;
				break;

			case 'bulleted_list_item':
				tag = 'li';
				richTextBlocks = block[block.type].rich_text;
				break;

			case 'image':
				tag = 'img';
				richTextBlocks = block[block.type].file.url;

			default:
				console.log('Unsupported block:');
				console.log(block);
				return;
		}

		if (!richTextBlocks) {
			console.error('No rich text found');
			console.log(block);
			return;
		}

		if (tag === 'li' && previousTag !== 'li') {
			html += '<ul>';
		}

		if (tag !== 'li' && previousTag === 'li') {
			html += '</ul>';
		}

		html += `<${tag}>`;

		richTextBlocks.forEach((richText) => {
			const annotations = getRichTextAnnotations(richText);
			const text = richText.text.content.replace('\n', '<br />\n');
			const link = getRichTextLink(richText);

			html += `${annotations.start}${link.start}${text}${link.end}${annotations.end}`;

			previousTag = tag;
		});

		html += `</${tag}>`;
	});

	if (previousTag === 'li') {
		html += '</ul>';
	}

	return html;
};
