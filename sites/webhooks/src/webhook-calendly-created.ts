import type { Handler, HandlerEvent } from '@netlify/functions';
import {
	blocks,
	notionApi,
	properties,
	TitleProperty,
	DateProperty,
	RichTextProperty,
	UrlProperty,
} from '@lwj/notion-helpers';
import { createHmac } from 'crypto';
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

function validateCalendlySignature(event: HandlerEvent) {
	if (process.env.CONTEXT === 'dev') {
		console.log('skipping webhook signature verification');
		return true;
	}

	const calendlySignature = event.headers['calendly-webhook-signature'] ?? '';
	const { t, signature } = calendlySignature.split(',').reduce(
		(acc: { t: string; signature: string }, currentValue: string) => {
			const [key, value] = currentValue.split('=');

			if (key === 't') {
				acc.t = value;
			}

			if (key === 'v1') {
				acc.signature = value;
			}

			return acc;
		},
		{
			t: '',
			signature: '',
		}
	);

	if (!t || !signature) {
		console.error('No webhook timestamp or signature found.');
		return false;
	}

	const data = t + '.' + event.body;
	const expectedSignature = createHmac(
		'sha256',
		process.env.CALENDLY_WEBHOOK_SIGNING_KEY as string
	)
		.update(data, 'utf8')
		.digest('hex');

	console.log({
		t,
		data,
		signature,
		key: process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
		expectedSignature,
	});

	if (expectedSignature !== signature) {
		console.error('Invalid webhook signature');
		return false;
	}

	const threeMinutes = 180000;
	const tolerance = threeMinutes;
	const timestampMilliseconds = Number(t) * 1000;

	if (timestampMilliseconds < Date.now() - tolerance) {
		console.error('Webhook timestamp is too old to be valid.');
		return false;
	}

	// if we get here, the signature is valid
	return true;
}

export const handler: Handler = async (event) => {
	console.log(event.queryStringParameters);
	// console.log(JSON.stringify(event.headers, null, 2));
	if (!validateCalendlySignature(event)) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Invalid signature' }),
		};
	}

	const body: CalendlyWebhookEventCreatedPayload = JSON.parse(
		event.body || '{}'
	);

	const payload = body.payload;

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
		parent: { database_id: process.env.NOTION_LIVESTREAMS_DB },
		properties: props,
		children,
	});

	if (notionRes.object === 'error') {
		return {
			statusCode: notionRes.status,
			body: JSON.stringify(notionRes),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'ok' }),
	};
};
