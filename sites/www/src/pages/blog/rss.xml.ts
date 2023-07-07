import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function get(context: AstroConfig) {
	const blog = await getCollection('blog');

	if (!context.site) {
		throw new Error('Setting a `site` in astro.config.mjs is required for RSS');
	}

	return rss({
		title: 'Learn With Jason Blog RSS Feed',
		description:
			'Articles and tutorials about web dev, career growth, and more.',
		site: context.site,
		items: blog
			.sort(
				(a, b) =>
					new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
			)
			.map((post) => {
				return {
					title: post.data.meta.title,
					pubDate: post.data.date,
					description: post.data.meta.description,
					link: `/blog/${post.slug}`,
					content: sanitizeHtml(
						`<p>${post.data.meta.description}</p><p><a href="${context.site}/blog/${post.slug}/">Read the full post on lwj.dev</a>`
					),
				};
			}),
	});
}
