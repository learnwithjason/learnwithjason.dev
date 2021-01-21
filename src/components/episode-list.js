import { h } from 'preact';
import { EpisodeVideo } from '../components/episode-video.js';
import { IconInfo } from '../components/icon-info.js';
import { ShareButton } from '../components/share-button.js';

export function EpisodeList({ episodes }) {
  return (
    <section class="block episodes">
      {episodes.map((episode) => (
        <div class="episode-listing">
          <EpisodeVideo key={episode.slug.current} episode={episode} />
          <h2>
            <a href={`/${episode.slug.current}`}>{episode.title}</a>
          </h2>
          <p>{episode.description}</p>
          <div class="episode-links top-gradient-border">
            <a href={`/${episode.slug.current}`} class="animate">
              <IconInfo /> Links, Resources, and Transcript
	          <span class="visually-hidden"> for {episode.title}</span>
            </a>
            <ShareButton
              title={episode.title}
              description={episode.description}
              url={`/${episode.slug.current}`}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
