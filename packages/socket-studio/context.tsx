import type { ReactElement } from 'react';
import {
	createClient,
	Provider,
	dedupExchange,
	cacheExchange,
	fetchExchange,
	subscriptionExchange,
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const SOCKET_STUDIO_URL = 'https://api.socket.studio/graphql';

function createSocketStudioClient() {
	const isClient = typeof window !== undefined;

	const wsUrl = SOCKET_STUDIO_URL.replace(/^http/, 'ws');
	const subscriptionClient = isClient
		? new SubscriptionClient(wsUrl, { reconnect: true })
		: false;

	const exchanges = [dedupExchange, cacheExchange, fetchExchange];

	if (subscriptionClient) {
		exchanges.push(
			subscriptionExchange({
				forwardSubscription(operation) {
					return subscriptionClient.request(operation);
				},
			})
		);
	}

	return createClient({ url: SOCKET_STUDIO_URL, exchanges });
}

export function SocketStudioProvider({ children }: { children: ReactElement }) {
	const client = createSocketStudioClient();

	return <Provider value={client}>{children}</Provider>;
}
