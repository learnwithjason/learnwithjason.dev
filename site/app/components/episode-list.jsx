import { useEffect, useState } from 'react';
import { EpisodeVideo } from './episode-video.jsx';
import { IconInfo } from './icon-info.jsx';
import { ShareButton } from './share-button.jsx';

export function EpisodeList({ episodes }) {
  const [activeEpisodes, setActiveEpisodes] = useState(episodes.slice(0, 20));

  useEffect(() => {
    setActiveEpisodes(episodes);
  }, [episodes]);

  return (
    <section className="block episodes">
      {activeEpisodes.map((episode, i) => (
        <div className="episode-listing" key={episode.slug.current}>
          <EpisodeVideo
            key={episode.slug.current}
            episode={episode}
            count={i + 1}
          />
          <h2>
            <a href={`/${episode.slug.current}`}>{episode.title}</a>
          </h2>
          <p>{episode.description}</p>
          <div className="episode-links top-gradient-border">
            <a href={`/${episode.slug.current}`} className="animate">
              <IconInfo /> Links, Resources, and Transcript
              <span className="visually-hidden"> for {episode.title}</span>
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
