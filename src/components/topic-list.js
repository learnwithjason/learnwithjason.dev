import { h } from 'preact';
import { TeacherPhoto } from './teacher-photo.js';
import { IconArrow } from './icon-arrow.js';

export function TopicList({ topic, title, episodes }) {
  return (
    <div class="topic-list-container">
      <h3 class="gradient-underline">{title}</h3>
      <ul class="topic-list">
        {episodes.map((episode) => {
          const teacher = episode.guest?.[0] || { name: 'Jason Lengstorf' };
          const image =
            teacher?.guestImage?.asset.url ||
            'https://lengstorf.com/images/jason-lengstorf.jpg';

          return (
            <li key={episode._id} class="topic-episode">
              <div class="teacher-photo">
                <TeacherPhoto imageURL={image} alt={teacher.name} />
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
