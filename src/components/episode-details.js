import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import gsap from 'gsap';
import { IconShare } from './icon-share.js';
import { IconInfo } from './icon-info.js';

export function EpisodeDetails({
  title,
  teacher,
  teacherImage,
  description,
  url,
}) {
  const ref = useRef();
  const teacherImageURL = teacherImage + '?w=280&h=280&fit=crop&auto=format';
  function toBase64(str) {
    const encoded =
      typeof btoa === 'function'
        ? btoa(str)
        : Buffer.from(str).toString('base64');

    return encoded.replace(/\//g, '_');
  }

  const poster = [
    'https://res.cloudinary.com/jlengstorf/image/upload',
    '/w_900,h_500,c_fill,q_auto,f_auto',
    `/u_fetch:${toBase64(
      teacherImageURL,
    )},w_280,h_280,c_fill,g_north_west,x_416,y_58`,
    `/w_340,c_fit,co_white,g_north_west,x_40,y_180,l_text:jwf.otf_36_line_spacing_0:${encodeURIComponent(
      encodeURIComponent(title),
    )}`,
    `/l_text:jwf.otf_24_center:${encodeURIComponent(
      teacher,
    )},x_420,y_360,c_fit,co_white,g_north_west,w_280,b_rgb:00000001/lwj/episode.png`,
  ].join('');

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
    <article class="episode-details" ref={ref}>
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
