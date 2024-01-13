import type { Handler, HandlerResponse } from '@netlify/functions';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { components, discordApi, verifyRequest } from '../../util/discord';

function handleSlashCommand(command: string) {
	let message = {
		type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
		data: {
			content: '',
		},
	};

	switch (command) {
		case 'boop':
			message.data.content = 'Boop!';
			break;

		case 'wifi':
			message.data.content = 'wifi';
			break;

		default:
			message.data.content = `I don’t know how to handle ${command}`;
	}

	return message;
}

export const handler: Handler = async (event) => {
	// make sure the request is legitimate
	const { valid, errorResponse } = verifyRequest(event);

	if (!valid) {
		console.error({ errorResponse });
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
				const message = handleSlashCommand(data.data.name);
				await discordApi(
					`/interactions/${data.id}/${data.token}/callback`,
					message
				);

				response.body = JSON.stringify({ message: 'responded to a command' });
				break;

			default:
				response.body = JSON.stringify({
					message: `unknown command ${data.data.name}`,
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
