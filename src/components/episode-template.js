import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
// this path is weird because this template gets moved during the build
import { getEpisodePoster } from './src/utils/get-episode-poster.js';

export default function EpisodeTemplate({ episode }) {
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
    <div class="block episode">
      <h1>{episode.title}</h1>
      <div class="episode-info-wrapper">
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
              <img src={poster} alt={episode.title} />
            </button>
          )}
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
            <div dangerouslySetInnerHTML={{ __html: episode.transcriptHtml }} />
          </Fragment>
        )}
      </div>
    </div>
  );
}
