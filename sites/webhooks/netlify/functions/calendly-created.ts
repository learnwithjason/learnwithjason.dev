import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import {
	blocks,
	notionApi,
	properties,
	TitleProperty,
	DateProperty,
	RichTextProperty,
	UrlProperty,
} from '@lwj/notion-helpers';
import { formatInTimeZone } from 'date-fns-tz';

type CalendlyWebhookEventCreatedPayload = {
	event: 'invitee.created';
	payload: {
		event: string;
		name: string;
		questions_and_answers: [
			{
				position: number;
				question: string;
				answer: string;
			}
		];
	};
};

type CalendlyScheduledEvent = {
	resource: {
		start_time: string;
		end_time: string;
	};
};

type RequestEntry = {
	Name: TitleProperty;
	Date: DateProperty;
	Tweet?: RichTextProperty;
	'Photo URL'?: UrlProperty;
	'Twitter Profile'?: UrlProperty;
};

export const handler: Handler = async (event) => {
	const { payload }: CalendlyWebhookEventCreatedPayload = JSON.parse(
		event.body || '{}'
	);

	const eventData = (await fetch(payload.event, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
		},
	}).then((res) => res.json())) as CalendlyScheduledEvent;

	const date = new Date(eventData.resource.start_time);
	date.setMinutes(30);

	const photoUrl = payload.questions_and_answers.find(
		(q) => q.position === 0
	)?.answer;

	const props: RequestEntry = {
		Name: properties.title(payload.name),
		Date: properties.date(
			formatInTimeZone(date, 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm")
		),
	};

	const children: object[] = [];

	if (photoUrl) {
		props['Photo URL'] = properties.url(photoUrl);
		children.push(blocks.image(photoUrl));
	}

	const notionRes = await notionApi('/pages', {
		parent: { database_id: '3b2fb85c445e411581f5098da4b7b012' },
		properties: props,
		children,
	});

	console.log(notionRes);

	return {
		statusCode: 200,
		body: 'ok',
	};
};
