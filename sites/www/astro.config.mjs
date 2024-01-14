import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import solid from '@astrojs/solid-js';
import expressiveCode from 'astro-expressive-code';
import theme from './config/shiki/theme-night-owl.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.learnwithjason.dev',
	integrations: [
		expressiveCode({
			themes: [theme],
		}),
		mdx(),
		react({ include: ['**/components/search/*'] }),
		solid({ include: ['**/*.solid.tsx', '**/@lwj/design-system/*'] }),
	],
});
