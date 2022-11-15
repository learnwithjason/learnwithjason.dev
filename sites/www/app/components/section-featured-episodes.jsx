import { useState } from 'react';
import { TeacherPhoto } from './teacher-photo.jsx';
import { EpisodeDetails } from './episode-details.jsx';
import { getTeacher } from '../util/get-teacher.js';

export function SectionFeaturedEpisodes({ episodes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEpisode = episodes[currentIndex];
  const currentHost = getTeacher([currentEpisode.host]);
  const currentTeacher = getTeacher(currentEpisode.guest);

  return (
    <section className="block featured">
      <h2>Learn from brilliant teachers, including:</h2>
      <nav className="teacher-photos">
        {episodes.map((episode, index) => {
          const isActive = currentIndex === index;
          const zIndex = 10 - Math.abs(currentIndex - index);
          const handleClick = (event) => {
            event.preventDefault();
            setCurrentIndex(index);
          };

          const teacher = getTeacher(episode.guest);

          return (
            <a
              key={episode._id}
              href={`/${episode.slug.current}`}
              onClick={handleClick}
              className={isActive ? 'active' : ''}
              style={{ zIndex }}
            >
              <TeacherPhoto
                key={`photo-${episode._id}`}
                imageURL={`${teacher.image}`}
                active={isActive}
                width={100}
                animate
              />
              <span className="visually-hidden">
                {episode.title} (with {teacher.name})
              </span>
            </a>
          );
        })}
      </nav>

      <EpisodeDetails
        title={currentEpisode.title}
        host={currentHost}
        teacher={currentTeacher}
        description={currentEpisode.description}
        url={`/${currentEpisode.slug.current}`}
      />
    </section>
  );
}
