import { h, Fragment } from 'preact';
// this path is weird because this template gets moved during the build
import { getEpisodePoster } from './src/utils/get-episode-poster.js';

export default function EpisodeTemplate({ episode }) {
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
    <div class="block episode">
      <h1>{episode.title}</h1>
      <div class="episode-info-wrapper">
        <div class="episode-video">
          <img src={poster} alt={episode.title} />
        </div>
        <div class="episode-description">
          <p class="gradient-underline">
            with{' '}
            {teacher.twitter ? (
              <a href={`https://twitter.com/${teacher.twitter}`}>
                {teacher.name}
              </a>
            ) : (
              teacher.name
            )}
          </p>
          <p>{episode.description}</p>
          <div class="episode-main-links">
            {episode.demo && (
              <a href={episode.demo} class="button">
                Demo
              </a>
            )}
            {episode.repo && (
              <a href={episode.repo} class="button">
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
      <div class="episode-resources">
        <h2 class="gradient-underline">Resources & Links</h2>
        <ul>
          {episode.links.map((link) => (
            <li key={link}>
              <a href={link}>{link}</a>
            </li>
          ))}
        </ul>
      </div>
      <div class="episode-transcript">
        {episode.transcript && (
          <Fragment>
            <h2 class="gradient-underline">Transcript</h2>
            <p>{episode.transcript}</p>
          </Fragment>
        )}
      </div>
    </div>
  );
}
