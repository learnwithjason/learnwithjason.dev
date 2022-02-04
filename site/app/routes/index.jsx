import { useLoaderData } from 'remix';

import { SectionFeaturedEpisodes } from '../components/section-featured-episodes.jsx';
import { SectionSponsors } from '../components/section-sponsors.jsx';
import { SectionTopics } from '../components/section-topics.jsx';
import { SectionHero } from '../components/section-hero.jsx';
import { SectionNextEpisode } from '../components/section-next-episode.jsx';
import { loadAllEpisodes } from '../util/load-all-episodes.server.js';

export const loader = async () => {
  const episodes = await loadAllEpisodes();

  const schedule = await fetch(
    'https://www.learnwithjason.dev/api/schedule',
  ).then((res) => res.json());

  const featured = await fetch(
    'https://www.learnwithjason.dev/api/episodes/featured',
  ).then((res) => res.json());

  const sponsors = await fetch(
    `https://www.learnwithjason.dev/api/sponsors`,
  ).then((res) => res.json());

  return { episodes, schedule, featured, sponsors };
};

export default function Index() {
  const { episodes, schedule, featured, sponsors } = useLoaderData();

  return (
    <>
      <SectionHero />
      <SectionNextEpisode
        nextEpisode={schedule[0]}
        nextNextEpisode={schedule[1]}
      />
      <SectionSponsors sponsors={sponsors} />
      <SectionFeaturedEpisodes episodes={featured} />
      <SectionTopics episodes={episodes} />
    </>
  );
}
