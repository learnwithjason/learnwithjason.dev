import { h } from 'preact';
import { useState } from 'preact/hooks';
import { TeacherPhoto } from './teacher-photo.js';
import { EpisodeDetails } from './episode-details.js';

export function SectionFeaturedEpisodes({ episodes }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEpisode = episodes[currentIndex];

  return (
    <section class="block featured">
      <h2>Learn from brilliant teachers, including:</h2>
      <nav class="teacher-photos">
        {episodes.map((episode, index) => {
          const isActive = currentIndex === index;
          const zIndex = 10 - Math.abs(currentIndex - index);
          const handleClick = (event) => {
            event.preventDefault();
            setCurrentIndex(index);
          };

          const [teacher] = episode.guest;

          return (
            <a
              key={`episode-${index}`}
              href={`/${episode.url}`}
              onClick={handleClick}
              class={isActive ? 'active' : ''}
              style={{ zIndex }}
            >
              <TeacherPhoto
                imageURL={`${teacher.guestImage.asset.url}?w=200&h=200&fit=crop&auto=format`}
                active={isActive}
                animate
              />
            </a>
          );
        })}
      </nav>

      <EpisodeDetails
        title={currentEpisode.title}
        teacher={currentEpisode.guest[0].name}
        teacherImage={currentEpisode.guest[0].guestImage.asset.url}
        description={currentEpisode.description}
        url={`/${currentEpisode.slug.current}`}
      />
    </section>
  );
}
