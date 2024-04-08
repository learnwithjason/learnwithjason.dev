import * as Sentry from '@sentry/astro';

Sentry.init({
	dsn: 'https://dc6e7609562b40abb3583d9fe9d3f5d0@o530194.ingest.us.sentry.io/4505558193930240',
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	integrations: [
		Sentry.feedbackIntegration({
			// Additional SDK configuration goes in here, for example:
			colorScheme: 'system',
		}),
	],
});
