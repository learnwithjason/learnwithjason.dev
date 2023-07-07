import rss from '@astrojs/rss';
import type { AstroConfig } from 'astro';
import { loadAllEpisodes } from '@lwj/sanity-helpers';

export async function get(context: AstroConfig) {
	const res = await loadAllEpisodes({ cdn: true });
	const episodes = res.data?.result ?? [];

	if (!context.site) {
		throw new Error('Setting a `site` in astro.config.mjs is required for RSS');
	}

	return rss({
		xmlns: { media: 'http://search.yahoo.com/mrss/' },
		title: 'Learn With Jason Episodes RSS Feed',
		description:
			'Learn from the web’s leading experts. Build something new. Grow your career. Let’s do it together.',
		site: context.site,
		items: episodes.map((post) => {
			return {
				title: `${post.title} (with ${post.guest.name})`,
				pubDate: new Date(post.date),
				description: post.description,
				link: `/${post.slug}`,
				content: post.description,
				customData: `
          <media:group>
            <media:title>${post.title} (with ${post.guest.name})</media:title>
            <media:content url="https://www.youtube.com/v/${post.youtube.id}?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
            <media:thumbnail url="https://i2.ytimg.com/vi/${post.youtube.id}/hqdefault.jpg" width="480" height="360"/>
            <media:description>${post.description}</media:description>
          </media:group>
        `,
			};
		}),
	});
}
