import { h } from 'preact';
import { EpisodeVideo } from '../components/episode-video.js';
import { IconInfo } from '../components/icon-info.js';
import { IconShare } from '../components/icon-share.js';

export function EpisodeList({ episodes }) {
  return (
    <section class="block episodes">
      {episodes.map((episode) => (
        <div class="episode-listing">
          <EpisodeVideo key={episode.slug.current} episode={episode} />
          <h2>{episode.title}</h2>
          <p>{episode.description}</p>
          <div class="episode-links top-gradient-border">
            <a href={`/${episode.slug.current}`} class="animate">
              <IconInfo /> Links, Resources, and Transcript
            </a>
            <a href="#share" class="animate">
              <IconShare /> Share
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
