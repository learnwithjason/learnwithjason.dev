import { h, Fragment } from 'preact';

// we have to import from where the template is used (e.g. /topic/<tag>) and
// not where this file is. this is confusing, but will be improved when
// we're not using fs to pass components to setDataForSlug
import { EpisodeList } from '../src/components/episode-list.js';
import { topics } from '../src/data/topics.js';

export default function EpisodeTemplate({ topic, episodes }) {
  const topicInfo = topics.find((t) => t.tag === topic);
  const title = topicInfo?.title || topic;

  return (
    <Fragment>
      <header class="block hero">
        <h1>{title}</h1>
      </header>
      <EpisodeList episodes={episodes} />
    </Fragment>
  );
}
