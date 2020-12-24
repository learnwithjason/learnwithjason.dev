import { h } from 'preact';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { TeacherPhoto } from './teacher-photo.js';
import { IconInfo } from './icon-info.js';
import { IconShare } from './icon-share.js';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function EpisodePreview({ episode }) {
  const [teacher = { name: 'Jason Lengstorf' }] = episode.guest;
  const teacherImage =
    teacher?.guestImage?.asset.url ||
    'https://lengstorf.com/images/jason-lengstorf.jpg';

  return (
    <div class="episode-preview">
      <div class="episode-preview-teacher">
        <div class="episode-preview-photo">
          <TeacherPhoto
            imageURL={teacherImage}
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
        <h3>{episode.title}</h3>
        <p class="episode-description">{episode.description}</p>
        <div class="episode-links">
          <a href={`/${episode.slug.current}`}>
            <IconInfo /> Episode Details
          </a>
          <a href="#share">
            <IconShare /> Share
          </a>
        </div>
      </div>
    </div>
  );
}
