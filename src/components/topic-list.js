import { h } from 'preact';
import { TeacherPhoto } from './teacher-photo.js';
import { IconArrow } from './icon-arrow.js';
import { getTeacher } from '../util/get-teacher.js';

export function TopicList({ topic, title, episodes }) {
  return (
    <div class="topic-list-container">
      <h3 class="gradient-underline">{title}</h3>
      <ul class="topic-list">
        {episodes.map((episode) => {
          const teacher = getTeacher(episode.guest);

          return (
            <li key={episode._id} class="topic-episode">
              <div class="teacher-photo">
                <TeacherPhoto
                  imageURL={teacher.image}
                  alt={teacher.name}
                  width={50}
                />
              </div>
              <a href={`/${episode.slug.current}`}>{episode.title}</a>
            </li>
          );
        })}
      </ul>
      <div class="topic-links">
        <a href={`/topic/${topic}`}>
          see more <IconArrow />
        </a>
      </div>
    </div>
  );
}
