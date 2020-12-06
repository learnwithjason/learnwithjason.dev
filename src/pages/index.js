import { h, Fragment } from 'preact';
import { SectionFeaturedEpisodes } from '../components/section-featured-episodes.js';
import { SectionHero } from '../components/section-hero.js';
import { SectionNextEpisode } from '../components/section-next-episode.js';

export default () => (
  <Fragment>
    <SectionHero />
    <SectionNextEpisode />
    <SectionFeaturedEpisodes />
  </Fragment>
);
