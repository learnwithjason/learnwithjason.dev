import { useState } from 'react';
import { useQuery, useSubscription as useSubscriptionUrql } from 'urql';

export function useTwitchChannelInfo(channel: string) {
	if (!channel) {
		throw new Error('useTwitchChannelInfo requires a channel to be set');
	}

	const [result] = useQuery({
		query: `
      query TwitchChannelInfo ($channel: String!) {
        channel(username: $channel) {
          username
          status
          stream {
            title
            startTime
          }
        }
      }
    `,
		variables: { channel },
	});

	return result;
}

interface Message {
	time: string;
	emotes: {
		name: string;
		locations: number[][];
	};
	images: {
		large: string;
	};
	message: string;
	author: {
		username: string;
		roles: string[];
	};
}

interface ChatMessage extends Message {
	html: string;
}

interface Command extends Message {
	command: string;
	args: string[];
	handler: {
		message: string;
		audio: string;
		image: string;
		duration: number;
	};
}

interface Event extends Message {
	type: string;
	details: string;
}

export function useTwitchChat(channel: string) {
	const [chat, setChat] = useState<ChatMessage[]>([]);
	const [events, setEvents] = useState<Event[]>([]);
	const [commands, setCommands] = useState<Command[]>([]);
	const [currentCommand, setCurrentCommand] = useState<Command>();

	if (!channel) {
		throw new Error('useTwitchChat requires a channel to be set');
	}

	const useSubscription =
		typeof window !== 'undefined' ? useSubscriptionUrql : () => [{}];

	useSubscription(
		{
			query: `
        subscription TwitchMessages ($channel: String!) {
          message(channel: $channel) {
            time
            emotes {
              name
              locations
              images {
                large
              }
            }
            ... on TwitchChatCommand {
              command
              args
              handler {
                message
                audio
                image
                duration
              }
            }
            ... on TwitchChatMessage {
              html
            }

            ... on TwitchChatEvent {
              type
              details
            }
            message
            author {
              username
              roles
            }
          }
        }
      `,
			variables: { channel },
		},
		(_, response) => {
			console.log({ response });
			if (response.message.command) {
				setCommands([...commands, response.message]);
				setCurrentCommand(response.message);
			} else if (response.message.type) {
				setEvents([...events, response.message]);
			} else {
				setChat([...chat, response.message]);
			}
		}
	);

	return { chat, commands, events, currentCommand };
}
