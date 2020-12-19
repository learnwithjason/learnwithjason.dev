import { h, Fragment } from 'preact';
import { EpisodeList } from '../components/episode-list.js';

export default function Episodes({ episodes }) {
  return (
    <Fragment>
      <header class="block hero">
        <h1>Episodes</h1>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
