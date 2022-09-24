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
	'Photo URL': UrlProperty;
	'Twitter Profile': UrlProperty;
};

const calendlyWebhookPayload = {
	created_at: '2020-11-23T17:51:19.000000Z',
	created_by: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
	event: 'invitee.created',
	payload: {
		cancel_url: 'https://calendly.com/cancellations/AAAAAAAAAAAAAAAA',
		created_at: '2020-11-23T17:51:18.327602Z',
		email: 'test@example.com',
		event:
			'https://api.calendly.com/scheduled_events/870a7328-b812-4441-b202-3b4a5f96c36b',
		name: 'John Doe',
		new_invitee: null,
		old_invitee: null,
		questions_and_answers: [],
		reschedule_url: 'https://calendly.com/reschedulings/AAAAAAAAAAAAAAAA',
		rescheduled: false,
		status: 'active',
		text_reminder_number: null,
		timezone: 'America/New_York',
		tracking: {
			utm_campaign: null,
			utm_source: null,
			utm_medium: null,
			utm_content: null,
			utm_term: null,
			salesforce_uuid: null,
		},
		updated_at: '2020-11-23T17:51:18.341657Z',
		uri: 'https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA',
		canceled: false,
	},
};

export const handler: Handler = async (event) => {
	console.log(JSON.stringify(JSON.parse(event.body as string), null, 2));
	const { payload } = calendlyWebhookPayload;

	const eventData = (await fetch(payload.event, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
		},
	}).then((res) => res.json())) as CalendlyScheduledEvent;

	const date = new Date(eventData.resource.start_time);
	date.setMinutes(30);

	const props: RequestEntry = {
		Name: properties.title(payload.name),
		Date: properties.date(
			formatInTimeZone(date, 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm")
		),
		'Photo URL': properties.url(
			'https://cdn.sanity.io/images/vnkupgyb/production/4f8fcea24d339216a668df6f5dda24df1b02a959-400x400.jpg'
		),
		'Twitter Profile': properties.url('https://twitter.com/ryanflorence'),
	};

	const children: object[] = [
		blocks.image(
			'https://cdn.sanity.io/images/vnkupgyb/production/4f8fcea24d339216a668df6f5dda24df1b02a959-400x400.jpg'
		),
	];

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
