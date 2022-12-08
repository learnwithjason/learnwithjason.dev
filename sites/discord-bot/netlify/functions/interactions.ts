import type { Handler, HandlerResponse } from '@netlify/functions';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import fetch from 'node-fetch';
import { components, discordApi, verifyRequest } from '../../util/discord';

export const handler: Handler = async (event) => {
	// make sure the request is legitimate
	const { valid, errorResponse } = verifyRequest(event);

	if (!valid) {
		return errorResponse as HandlerResponse;
	}

	// set up the base for a successful response
	const response: HandlerResponse = {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = JSON.parse(event.body as string);

		switch (data.type) {
			case InteractionType.PING:
				response.body = JSON.stringify({ type: InteractionResponseType.PONG });
				break;

			case InteractionType.APPLICATION_COMMAND:
				await discordApi(`/interactions/${data.id}/${data.token}/callback`, {
					type: InteractionResponseType.APPLICATION_MODAL,
					data: {
						custom_id: 'socket-studio_request_form',
						title: 'Request a guest for LWJ',
						components: [
							components.input({
								custom_id: 'name',
								label: 'Name',
							}),
							components.input({
								custom_id: 'twitter',
								label: 'Twitter URL',
								placeholder: 'https://twitter.com/LWJShow',
							}),
						],
					},
				});

				response.body = JSON.stringify({ message: 'responded to a command' });
				break;

			case InteractionType.APPLICATION_MODAL_SUBMIT:
				console.log(JSON.stringify(JSON.parse(event.body as string), null, 2));
				response.body = JSON.stringify({
					type: 4,
					data: {
						// an empty data object means nothing happens
					},
				});
		}
	} catch (error) {
		console.log('--- START ERROR ---');
		console.log(error);
		console.log('---  END ERROR  ---');

		response.body = JSON.stringify({
			message: 'no idea what you were trying to do, but we don’t support that',
		});
	}

	return response;
};
