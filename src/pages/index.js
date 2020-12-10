import { h, Fragment } from 'preact';
import { SectionFeaturedEpisodes } from '../components/section-featured-episodes.js';
import { SectionHero } from '../components/section-hero.js';
import { SectionNextEpisode } from '../components/section-next-episode.js';
import { SectionSponsors } from '../components/section-sponsors.js';
import { SectionTopics } from '../components/section-topics.js';

export default ({ featuredEpisodes, episodes, sponsors, schedule }) => (
  <Fragment>
    <SectionHero />
    <SectionNextEpisode
      nextEpisode={schedule[0]}
      nextNextEpisode={schedule[1]}
    />
    <SectionFeaturedEpisodes episodes={featuredEpisodes} />
    <SectionSponsors sponsors={sponsors} />
    <SectionTopics episodes={episodes} />
  </Fragment>
);
