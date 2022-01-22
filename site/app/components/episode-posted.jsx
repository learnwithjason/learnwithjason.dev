import { Fragment } from 'react';
import { EpisodeVideo } from '../components/episode-video.jsx';

export function EpisodePosted({ episode, teacher, count = 1 }) {
  return (
    <div className="block episode">
      <div className="episode-info-wrapper">
        <EpisodeVideo episode={episode} count={count} />
        <div className="episode-description">
          <h1>{episode.title}</h1>
          <p className="gradient-underline">
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
          <div className="episode-main-links">
            {episode.demo && (
              <a href={episode.demo} className="button">
                Demo
              </a>
            )}
            {episode.repo && (
              <a href={episode.repo} className="button">
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
      {episode.links.length > 0 && (
        <div className="episode-resources">
          <h2 className="gradient-underline">Resources & Links</h2>
          <ul>
            {episode.links?.map((link) => (
              <li key={link}>
                <a href={link}>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="episode-transcript">
        {episode.transcript && (
          <Fragment>
            <h2 className="gradient-underline">Transcript</h2>
            <div dangerouslySetInnerHTML={{ __html: episode.transcriptHtml }} />
          </Fragment>
        )}
      </div>
    </div>
  );
}
