import { useLoaderData } from 'remix';
import { SectionFeaturedEpisodes } from '~/components/section-featured-episodes';
import { SectionSponsors } from '~/components/section-sponsors';
import { SectionTopics } from '~/components/section-topics';

import { SectionHero } from '../components/section-hero';
import { SectionNextEpisode } from '../components/section-next-episode';

async function loadAllEpisodes() {
  const [episodes1, episodes2, episodes3, episodes4, episodes5, episodes6] =
    await Promise.all([
      fetch('https://www.learnwithjason.dev/api/episodes/page/1').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/2').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/3').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/4').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/5').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/6').then((res) =>
        res.json(),
      ),
    ]);

  const episodes = [
    ...episodes1,
    ...episodes2,
    ...episodes3,
    ...episodes4,
    ...episodes5,
    ...episodes6,
  ].filter((e) => e.youtubeID !== null);

  return episodes;
}

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
