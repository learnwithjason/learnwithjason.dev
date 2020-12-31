import { h } from 'preact';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { TeacherPhoto } from './teacher-photo.js';
import { IconInfo } from './icon-info.js';
import { ShareButton } from './share-button.js';
import { getTeacher } from '../util/get-teacher.js';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function EpisodePreview({ episode, hideLinks = false, children }) {
  const teacher = getTeacher(episode.guest);

  return (
    <div class="episode-preview">
      <div class="episode-preview-teacher">
        <div class="episode-preview-photo">
          <TeacherPhoto
            imageURL={teacher.image}
            alt={teacher.name}
            width={150}
          />
        </div>
        <p>{teacher.name}</p>
      </div>
      <div class="episode-preview-details">
        <p class="gradient-subheading">
          {dayjs(episode.date).format('dddd, MMMM D @ h:mm A z')}
        </p>
        <h3>
          {!hideLinks ? (
            <a href={`/${episode.slug.current}`}>{episode.title}</a>
          ) : (
            episode.title
          )}
        </h3>
        <p class="episode-description">{episode.description}</p>
        {children
          ? children
          : !hideLinks && (
              <div class="episode-links">
                <a href={`/${episode.slug.current}`}>
                  <IconInfo /> Episode Details
		          <span class="visually-hidden"> for {episode.title}</span>
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
