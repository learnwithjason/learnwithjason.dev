import { TeacherPhoto } from './teacher-photo.jsx';
import { IconArrow } from './icon-arrow.jsx';
import { getTeacher } from '../util/get-teacher.js';

export function TopicList({ topic, title, episodes }) {
  return (
    <div className="topic-list-container">
      <h3 className="gradient-underline">{title}</h3>
      <ul className="topic-list">
        {episodes.map((episode) => {
          const teacher = getTeacher(episode.guest);

          return (
            <li key={episode._id} className="topic-episode">
              <div className="teacher-photo">
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
      <div className="topic-links">
        <a href={`/topic/${topic}`}>
          see more <span className="visually-hidden">from {title}</span>
          <IconArrow />
        </a>
      </div>
    </div>
  );
}
