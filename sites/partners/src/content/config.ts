import { defineCollection, z } from 'astro:content';

export const collections = {
	services: defineCollection({
		type: 'content',
		schema: z.object({
			heading: z.object({
				part1: z.object({
					text: z.string(),
					size: z.string(),
				}),
				part2: z.object({
					text: z.string(),
					size: z.string(),
				}),
			}),
			examples: z
				.object({
					highlighted: z.string(),
					playlist: z.string().url(),
				})
				.optional(),
			buttonText: z.string().default('Learn More'),
		}),
	}),
};
