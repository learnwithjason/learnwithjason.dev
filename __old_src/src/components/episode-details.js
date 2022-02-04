import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import gsap from 'gsap';
import { IconInfo } from './icon-info.js';
import { EpisodePoster } from './episode-poster.js';
import { ShareButton } from './share-button.js';

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
    <article class="episode-details dark" ref={ref}>
      <div class="episode-poster animate">
        <a href={url}>
          <EpisodePoster title={title} host={host} teacher={teacher} />
        </a>
      </div>
      <div class="episode-info">
        <h3 class="animate">
          <a href={url}>{title}</a>
        </h3>
        <p class="gradient-subheading animate">with {teacher.name}</p>
        <p class="episode-description animate">{description}</p>
        <div class="episode-links">
          <a href={url} class="animate">
            <IconInfo /> Episode Details
            <span class="visually-hidden"> for {title}</span>
          </a>
          <ShareButton
            title={`${title} (with ${teacher.name})`}
            text={description}
            url={url}
            class="animate"
          />
        </div>
      </div>
    </article>
  );
}
