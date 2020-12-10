import { h } from 'preact';
// this path is weird because this template gets moved during the build
import { getEpisodePoster } from './src/utils/get-episode-poster.js';

export default function EpisodeTemplate({ episode }) {
  const teacher = episode.guest?.[0] || 'Jason Lengstorf';
  const teacherImage =
    teacher?.guestImage?.asset.url ||
    'https://lengstorf.com/images/jason-lengstorf.jpg';
  const poster = getEpisodePoster({
    title: episode.title,
    teacher: teacher.name,
    teacherImage,
  });

  return (
    <div class="block episode">
      <h1>{episode.title}</h1>
      <div class="episode-info-wrapper">
        <div class="episode-video">
          <img src={poster} alt={episode.title} />
        </div>
      </div>
      <p>{JSON.stringify(episode, null, 2)}</p>
    </div>
  );
}
