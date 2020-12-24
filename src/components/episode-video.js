// this is for episodes that have already happened and the videos are posted
import { h } from 'preact';
import { useState } from 'preact/hooks';
// this path is weird because this template gets moved during the build
import { getEpisodePoster } from '../utils/get-episode-poster.js';

export function EpisodeVideo({ episode }) {
  const [playing, setPlaying] = useState(false);

  const teacher = episode.guest?.[0] || { name: 'Jason Lengstorf' };
  const teacherImage =
    teacher?.guestImage?.asset.url ||
    'https://lengstorf.com/images/jason-lengstorf.jpg';

  const poster = getEpisodePoster({
    title: episode.title,
    teacher: teacher.name,
    teacherImage,
  });

  return (
    <div class="episode-video">
      {playing ? (
        <div class="responsive-video-container">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${episode.youtubeID}?listType=playlist&list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx&autoplay=1&rel=0`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      ) : (
        <button onClick={() => setPlaying(true)} aria-label="play video">
          <img
            src={poster}
            alt={episode.title}
            width={900}
            height={500}
            loading="lazy"
          />
        </button>
      )}
    </div>
  );
}
