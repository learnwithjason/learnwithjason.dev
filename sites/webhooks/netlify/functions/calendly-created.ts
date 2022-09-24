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

const calendlyWebhookPayload = {
	created_at: '2022-09-24T07:54:37.000000Z',
	created_by: 'https://api.calendly.com/users/FCFHDEAYWC32PECZ',
	event: 'invitee.created',
	payload: {
		cancel_url:
			'https://calendly.com/cancellations/e7a7885d-90e2-49f0-af20-1c7bed55ac1a',
		created_at: '2022-09-24T07:54:36.940982Z',
		email: 'jason@lengstorf.com',
		event:
			'https://api.calendly.com/scheduled_events/1522b9a3-fd16-4df7-b86e-25b0665dcf3a',
		first_name: null,
		last_name: null,
		name: 'Jason Lengstorf',
		new_invitee: null,
		no_show: null,
		old_invitee: null,
		payment: null,
		questions_and_answers: [
			{
				answer:
					'https://res.cloudinary.com/jlengstorf/image/upload/w_800,h_800,c_fill,g_faces,q_auto,f_auto/press/jason-lengstorf-ac-alley3.jpg',
				position: 0,
				question:
					'Please link to a headshot to use for the episode art (real photos if possible, please).',
			},
			{
				answer: 'cool stuff',
				position: 1,
				question:
					"What will you teach during the livestream? (I'll use this to create the title/description for the episode — let me know if you want to brainstorm together!)",
			},
			{
				answer: 'Yes',
				position: 2,
				question:
					'Would your marketing team be willing to promote the livestream? (No guarantees needed; just wondering if we can cross-promote.)',
			},
		],
		reconfirmation: null,
		reschedule_url:
			'https://calendly.com/reschedulings/e7a7885d-90e2-49f0-af20-1c7bed55ac1a',
		rescheduled: false,
		routing_form_submission: null,
		status: 'active',
		text_reminder_number: null,
		timezone: 'Pacific/Honolulu',
		tracking: {
			utm_campaign: null,
			utm_source: null,
			utm_medium: null,
			utm_content: null,
			utm_term: null,
			salesforce_uuid: null,
		},
		updated_at: '2022-09-24T07:54:36.940982Z',
		uri: 'https://api.calendly.com/scheduled_events/1522b9a3-fd16-4df7-b86e-25b0665dcf3a/invitees/e7a7885d-90e2-49f0-af20-1c7bed55ac1a',
	},
};

export const handler: Handler = async (event) => {
	const { payload } = calendlyWebhookPayload;

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
