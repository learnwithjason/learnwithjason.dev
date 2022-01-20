import { useLoaderData } from 'remix';

import { SectionHero } from '../components/section-hero';
import { SectionNextEpisode } from '../components/section-next-episode';

export const loader = async () => {
  const schedule = await fetch(
    'https://www.learnwithjason.dev/api/schedule',
  ).then((res) => res.json());

  return schedule;
};

export default function Index() {
  const schedule = useLoaderData();

  return (
    <>
      <SectionHero />
      <SectionNextEpisode
        nextEpisode={schedule[0]}
        nextNextEpisode={schedule[1]}
      />
    </>
  );
}
