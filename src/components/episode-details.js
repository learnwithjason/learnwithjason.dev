import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import gsap from 'gsap';
import { IconShare } from './icon-share.js';
import { IconInfo } from './icon-info.js';
import { getEpisodePoster } from '../utils/get-episode-poster.js';

export function EpisodeDetails({
  title,
  teacher,
  teacherImage,
  description,
  url,
}) {
  const ref = useRef();
  const poster = getEpisodePoster({ title, teacher, teacherImage });

  useEffect(() => {
    const details = ref.current;

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
        <img src={poster} alt={`${title} (with ${teacher})`} />
      </div>
      <div class="episode-info">
        <h3 class="animate">{title}</h3>
        <p class="gradient-subheading animate">with {teacher}</p>
        <p class="episode-description animate">{description}</p>
        <div class="episode-links">
          <a href={url} class="animate">
            <IconInfo /> Episode Details
          </a>
          <a href="#share" class="animate">
            <IconShare /> Share
          </a>
        </div>
      </div>
    </article>
  );
}
