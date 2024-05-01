import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import expressiveCode from 'astro-expressive-code';
import theme from './config/shiki/theme-night-owl.json';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.learnwithjason.dev',
	integrations: [
		expressiveCode({
			themes: [theme],
		}),
		mdx(),
		react({
			include: ['**/*.react.tsx', '**/components/search/*'],
		}),
		solid({
			include: ['**/*.solid.tsx', '**/@lwj/design-system/*'],
		}),
		sentry({
			dsn: 'https://dc6e7609562b40abb3583d9fe9d3f5d0@o530194.ingest.us.sentry.io/4505558193930240',
		}),
	],
});
