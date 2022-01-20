import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';

import { TeacherPhoto } from './teacher-photo.jsx';
import { IconInfo } from './icon-info.jsx';
import { ShareButton } from './share-button.jsx';
import { getTeacher } from '../util/get-teacher.js';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function EpisodePreview({ episode, hideLinks = false, children }) {
  const host = getTeacher([episode.host]);
  const teacher = getTeacher(episode.guest);

  return (
    <div className="episode-preview">
      <div className="episode-preview-teacher">
        <div className="episode-preview-photo">
          <TeacherPhoto
            imageURL={teacher.image}
            alt={teacher.name}
            width={150}
          />
        </div>
        <p>{teacher.name}</p>
      </div>
      <div className="episode-preview-details">
        <p className="gradient-subheading">
          {dayjs(episode.date).format('dddd, MMMM D @ h:mm A z')}
        </p>
        <h3>
          {!hideLinks ? (
            <a href={`/${episode.slug.current}`}>{episode.title}</a>
          ) : (
            episode.title
          )}
        </h3>
        <p className="episode-description">{episode.description}</p>
        {host && host.name !== 'Jason Lengstorf' && (
          <p className="episode-description">
            With special guest host{' '}
            <a href={`https://twitter.com/${episode.host.twitter}`}>
              {episode.host.name}
            </a>
            !
          </p>
        )}
        {children
          ? children
          : !hideLinks && (
              <div className="episode-links">
                <a href={`/${episode.slug.current}`}>
                  <IconInfo /> Episode Details
                  <span className="visually-hidden"> for {episode.title}</span>
                </a>
                <ShareButton
                  title={episode.title}
                  text={episode.description}
                  url={`/${episode.slug.current}`}
                />
              </div>
            )}
      </div>
    </div>
  );
}
