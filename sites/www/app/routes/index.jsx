import { useLoaderData } from '@remix-run/react';

import { SectionFeaturedEpisodes } from '~/components/section-featured-episodes.jsx';
import { SectionSponsors } from '~/components/section-sponsors.jsx';
import { SectionTopics } from '~/components/section-topics.jsx';
import { SectionHero } from '~/components/section-hero.jsx';
import { SectionNextEpisode } from '~/components/section-next-episode.jsx';
import { loadFromApi } from '~/util/fetch-api.server.js';

export const loader = async () => {
	// we don't `await` on these until below so they can all be fetched in parallel
	const episodesPromise = loadFromApi('/api/v2/episodes');
	const schedulePromise = loadFromApi('/api/v2/schedule');
	// const featuredPromise = loadFromApi('/api/episodes/featured');
	// const sponsorsPromise = loadFromApi('/api/v2/sponsors');

	return {
		// episodes: await episodesPromise,
		schedule: await schedulePromise,
		// featured: await featuredPromise,
		// sponsors: await sponsorsPromise,
	};
};

export default function Index() {
	const {
		// episodes,
		schedule,
		// featured, sponsors
	} = useLoaderData();

	return (
		<>
			<SectionHero />
			<SectionNextEpisode
				nextEpisode={schedule[0]}
				nextNextEpisode={schedule[1]}
			/>
			{/* <SectionSponsors sponsors={sponsors} />
			<SectionFeaturedEpisodes episodes={featured} />
			<SectionTopics episodes={episodes} /> */}
		</>
	);
}
