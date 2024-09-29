import { CONVERTKIT_SECRET_KEY } from 'astro:env/server';

const ck_api = new URL('https://api.convertkit.com');

ck_api.searchParams.set('api_secret', CONVERTKIT_SECRET_KEY);

export async function addSubscriber(first_name: string, email: string) {
	/** @see https://app.convertkit.com/forms/designers/1269192/edit */
	ck_api.pathname = '/v3/forms/1269192/subscribe';

	const response = await fetch(ck_api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			api_key: CONVERTKIT_SECRET_KEY,
			first_name,
			email,
		}),
	});

	if (!response.ok) {
		console.error(response);
		throw new Error('Error creating a subscriber');
	}

	const data = await response.json();

	if (!data.subscriber || !data.subscriber.id) {
		console.error(data);
		throw new Error('Failed to create subscriber.');
	}

	return data.subscriber;
}

export async function getSubscriberByEmail(email: string) {
	ck_api.pathname = '/v3/subscribers';
	ck_api.searchParams.set('email_address', email);

	const res = await fetch(ck_api);

	if (!res.ok) {
		console.error(res.statusText);
		throw new Error('error loading subscriber');
	}

	const data = await res.json();

	return data.subscribers.at(0);
}
