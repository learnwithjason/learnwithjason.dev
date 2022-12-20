import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { IconInfo } from './icon-info.jsx';
import { EpisodePoster } from './episode-poster.jsx';
import { ShareButton } from './share-button.jsx';

export function EpisodeDetails({ title, host, teacher, description, url }) {
  const ref = useRef();

  useEffect(() => {
    const details = ref.current;

    // reset the animation in case folks click fast
    gsap.set(details.querySelectorAll('.animate'), {
      left: 0,
      opacity: 1,
    });

    // fly things in for a little bit of extra character
    gsap.from(details.querySelectorAll('.animate'), {
      duration: 0.75,
      left: '150px',
      opacity: 0,
      stagger: 0.05,
      ease: 'back.inOut(1)',
    });
  }, [title]);

  return (
    <article className="episode-details dark" ref={ref}>
      <div className="episode-poster animate">
        <a href={url}>
          <EpisodePoster title={title} host={host} teacher={teacher} />
        </a>
      </div>
      <div className="episode-info">
        <h3 className="animate">
          <a href={url}>{title}</a>
        </h3>
        <p className="gradient-subheading animate">with {teacher.name}</p>
        <p className="episode-description animate">{description}</p>
        <div className="episode-links">
          <a href={url} className="animate">
            <IconInfo /> Episode Details
            <span className="visually-hidden"> for {title}</span>
          </a>
          <ShareButton
            title={`${title} (with ${teacher.name})`}
            text={description}
            url={url}
            className="animate"
          />
        </div>
      </div>
    </article>
  );
}
