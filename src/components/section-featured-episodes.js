import { h } from 'preact';
import { useState } from 'preact/hooks';
import { TeacherPhoto } from './teacher-photo.js';
import { EpisodeDetails } from './episode-details.js';

export function SectionFeaturedEpisodes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const episodes = [
    {
      url: '#episode',
      imageURL: 'https://github.com/sdras.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/philhawksworth.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/cassidoo.png',
      title: 'Dev Improv: Tell Us What To Build!',
      teacher: 'Cassidy Williams',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'What happens when Cassidy and Jason take suggestions from chat and try to build something on the fly? Chaos, probably. Come join in on the fun!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/tzmanics.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/lindsaylevine.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/bencodezen.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/sxywu.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/dayhaysoos.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
    {
      url: '#episode',
      imageURL: 'https://github.com/Ekwuno.png',
      title: 'Make Animations Feel Pro',
      teacher: 'Sarah Drasner',
      poster:
        'https://res.cloudinary.com/jlengstorf/image/upload/v1607215811/lwj/video-poster-temp.jpg',
      description:
        'When it comes to animation, there are a few tips & tricks that take them from “neat” to “HOLY WOW” animation master Sarah Drasner teaches us how to take our animations to the next level!',
      url: '#episode-link',
    },
  ];

  const currentEpisode = episodes[currentIndex];

  return (
    <section class="block featured">
      <h2>Look at all these brilliant teachers!</h2>
      <nav class="teacher-photos">
        {episodes.map((episode, index) => {
          const isActive = currentIndex === index;
          const zIndex = 10 - Math.abs(currentIndex - index);
          const handleClick = (event) => {
            event.preventDefault();
            setCurrentIndex(index);
          };

          return (
            <a
              key={`episode-${index}`}
              href={episode.url}
              onClick={handleClick}
              class={isActive ? 'active' : ''}
              style={{ zIndex }}
            >
              <TeacherPhoto imageURL={episode.imageURL} active={isActive} />
            </a>
          );
        })}
      </nav>

      <EpisodeDetails
        title={currentEpisode.title}
        teacher={currentEpisode.teacher}
        poster={currentEpisode.poster}
        description={currentEpisode.description}
        url={currentEpisode.url}
      />
    </section>
  );
}
