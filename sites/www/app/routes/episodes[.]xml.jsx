import { createXML } from '~/util/create-xml.server.ts';
import { loadFromApi } from '~/util/fetch-api.server.js';

export const loader = async () => {
	const episodes = (await loadFromApi('/api/v2/episodes')).slice(0, 20);

	const rssFeed = createXML({
		title: 'Learn With Jason Episodes',
		description:
			'Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday &amp; Thursday. Join live and learn with us!',
		siteUrl: 'https://www.learnwithjason.dev',
		feedPath: '/episodes.xml',
		items: episodes.map((episode) => ({
			title: episode.title,
			pubDate: episode.date,
			description: episode.description,
			link: `https://www.learnwithjason.dev/${episode.slug}`,
			content: `
        <ul>
          <li>
            <a href="https://youtu.be/${
							episode.youtube.id
						}?list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx">Watch on YouTube</a>
          </li>${
						episode.links.demo
							? `
          <li>
            <a href="${episode.links.demo}">Demo</a>
          </li>
          `
							: ''
					}${
				episode.links.repo
					? `
          <li>
            <a href="${episode.links.repo}">Repo</a>
          </li>
          `
					: ''
			}
        </ul>
        <h2>Links</h2>
        <ul>
          ${episode.links.resources
						.map(
							(link) => `
          <li><a href="${link}">${link}</a></li>`
						)
						.join('')}
        </ul>
      `,
		})),
	});

	return new Response(rssFeed, {
		headers: {
			'X-Boop': 'boop',
			'Content-Type': 'application/xml',
		},
	});
};
