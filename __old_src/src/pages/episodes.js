import { h, Fragment } from 'preact';
import { EpisodeList } from '../components/episode-list.js';
import { IconArrow } from '../components/icon-arrow.js';

export default function Episodes({ episodes }) {
  return (
    <Fragment>
      <header class="block hero">
        <h1>All Episodes</h1>
        <p>
          Browse all {episodes.length} episodes of <em>Learn With Jason</em>.
          Show your support and get notified of new episodes by subscribing on
          YouTube!
        </p>
        <div class="hero-buttons">
          <a
            href="https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A"
            class="button"
          >
            Subscribe on YouTube <IconArrow />
          </a>
        </div>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
