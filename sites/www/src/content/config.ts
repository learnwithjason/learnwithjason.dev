import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		date: z.date(),
		updated: z.date(),
		meta: z.object({
			title: z.string(),
			description: z.string(),
		}),
		share: z.object({
			title: z.string(),
			image: z.string().url().optional(),
			text: z.string(),
		}),
		tags: z.array(z.string()),
	}),
});

const newsletter = defineCollection({
	type: 'content',
	schema: z.object({
		date: z.date(),
		subject: z.string(),
		preview: z.string(),
	}),
});

export const collections = {
	blog,
	newsletter,
};
