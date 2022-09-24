import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import {
	blocks,
	notionApi,
	properties,
	RequestEntry,
} from '@lwj/notion-helpers';

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

export const handler: Handler = async () => {
	const { payload } = calendlyWebhookPayload;

	const eventData = await fetch(payload.event, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
		},
	}).then((res) => res.json());

	console.log(eventData);

	// const props: RequestEntry = {
	//   Name: properties.title(name),
	// }

	return {
		statusCode: 200,
		body: 'ok',
	};
};
