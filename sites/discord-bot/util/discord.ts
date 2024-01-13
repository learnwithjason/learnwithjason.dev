import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { verifyKey } from 'discord-interactions';

const DISCORD_CLIENT_PUBLIC_KEY =
	'3e8b5021b63143ace2be88b6dcf5a5e1d400f42de1d5cdea4013494cfe0473a4';

type DiscordInteractionsResponse = {
	type: number;
	data: object;
};

type ComponentInputProperties = {
	custom_id: string;
	label: string;
	style?: 1 | 2;
	min_length?: number;
	max_length?: number;
	required?: boolean;
	placeholder?: string | undefined;
};

type VerifyRequestResponse = {
	valid: boolean;
	errorResponse?: HandlerResponse;
};

export function verifyRequest(event: HandlerEvent): VerifyRequestResponse {
	const signature = event.headers['x-signature-ed25519'] ?? '';
	const timestamp = event.headers['x-signature-timestamp'] ?? '';

	const isValidRequest = verifyKey(
		event.body as string,
		signature,
		timestamp,
		DISCORD_CLIENT_PUBLIC_KEY
	);

	return isValidRequest
		? { valid: true }
		: {
				valid: false,
				errorResponse: {
					statusCode: 401,
					body: 'Bad request signature',
				},
		  };
}

export async function discordApi(
	endpoint: string,
	body: DiscordInteractionsResponse
) {
	return fetch(`https://discord.com/api/v10/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}

export const components = {
	input({
		custom_id,
		label,
		style = 1,
		min_length = 1,
		max_length = 250,
		required = true,
		placeholder,
	}: ComponentInputProperties) {
		return {
			type: 1,
			components: [
				{
					type: 4,
					custom_id,
					label,
					style,
					min_length,
					max_length,
					required,
					placeholder,
				},
			],
		};
	},
};
