import { h, Fragment } from 'preact';
// import paths are weird because this template gets moved during the build
import { getTeacher } from './src/util/get-teacher.js';
import { EpisodeVideo } from './src/components/episode-video.js';

export default function EpisodeTemplate({ episode }) {
  const teacher = getTeacher(episode.guest);

  return (
    <div class="block episode">
      <div class="episode-info-wrapper">
        <EpisodeVideo episode={episode} />
        <div class="episode-description">
          <h1>{episode.title}</h1>
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
