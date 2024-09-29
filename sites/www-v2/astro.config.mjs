import { defineConfig, envField } from 'astro/config';
import clerk from '@clerk/astro';
import netlify from '@astrojs/netlify';
import { imageService } from '@unpic/astro/service';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.learnwithjason.dev',
	output: 'server',
	integrations: [
		clerk({
			afterSignInUrl: '/dashboard',
			afterSignUpUrl: '/dashboard',
		}),
		mdx(),
		react(),
	],
	image: {
		domains: ['img.clerk.com'],
		service: imageService(),
	},
	adapter: netlify(),
	env: {
		schema: {
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
				access: 'public',
				context: 'client',
			}),
			PUBLIC_CLERK_SIGN_IN_URL: envField.string({
				access: 'public',
				context: 'client',
			}),
			PUBLIC_CLERK_SIGN_UP_URL: envField.string({
				access: 'public',
				context: 'client',
			}),
			CLERK_SECRET_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			STRIPE_SECRET_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			STRIPE_WEBHOOK_SECRET: envField.string({
				access: 'secret',
				context: 'server',
			}),
			TIER_SILVER_PRICE_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			TIER_GOLD_PRICE_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			TIER_PLATINUM_PRICE_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			MUX_JWT_SIGNING_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			MUX_JWT_PRIVATE_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			MUX_TOKEN_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			MUX_TOKEN_SECRET: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CLOUDINARY_CLOUD_NAME: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CLOUDINARY_API_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CLOUDINARY_API_SECRET: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CONVERTKIT_API_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			CONVERTKIT_SECRET_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
			SANITY_SECRET_TOKEN: envField.string({
				access: 'secret',
				context: 'server',
			}),
			YOUTUBE_CHANNEL_ID: envField.string({
				access: 'secret',
				context: 'server',
			}),
			GOOGLE_CLOUD_API_KEY: envField.string({
				access: 'secret',
				context: 'server',
			}),
		},
	},
});
