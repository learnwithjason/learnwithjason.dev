import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import theme from './config/shiki/theme-night-owl.json';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.learnwithjason.dev',
	integrations: [mdx(), react()],
	markdown: {
		shikiConfig: {
			theme,
		},
	},
});
