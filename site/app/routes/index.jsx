import { useLoaderData, json } from 'remix';

import { SectionFeaturedEpisodes } from '../components/section-featured-episodes.jsx';
import { SectionSponsors } from '../components/section-sponsors.jsx';
import { SectionTopics } from '../components/section-topics.jsx';
import { SectionHero } from '../components/section-hero.jsx';
import { SectionNextEpisode } from '../components/section-next-episode.jsx';
import { loadAllEpisodes } from '../util/load-all-episodes.server.js';

export const loader = async () => {
  let [episodes, schedule, featured, sponsors] = await Promise.all([
    loadAllEpisodes(),
    ...[
      'https://www.learnwithjason.dev/api/schedule',
      'https://www.learnwithjason.dev/api/episodes/featured',
      'https://www.learnwithjason.dev/api/sponsors',
    ].map((url) => fetch(url).then((res) => res.json())),
  ]);

  return json({ episodes, schedule, featured, sponsors });
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
