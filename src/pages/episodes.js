import { h, Fragment } from 'preact';
import { EpisodeList } from '../components/episode-list.js';

export default function Episodes({ episodes }) {
  return (
    <Fragment>
      <header class="block hero">
        <h1>All Episodes</h1>
        <p>
          Browse all {episodes.length} episodes of <em>Learn With Jason</em>.
        </p>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
