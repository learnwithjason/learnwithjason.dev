import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useGradientHover } from '../hooks/use-gradient-hover.js';

export function IconYouTube() {
  const ref = useRef();

  useGradientHover(ref);

  return (
    <svg
      ref={ref}
      class="hero-social"
      width="51"
      height="35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="icon-youtube"
          d="M20.848 25V10l12.99 7.5-12.99 7.5zM49.802 5.465a6.262 6.262 0 00-4.42-4.42C41.482 0 25.846 0 25.846 0S10.213 0 6.314 1.045a6.262 6.262 0 00-4.42 4.42C.847 9.365.847 17.5.847 17.5s0 8.136 1.044 12.035a6.262 6.262 0 004.42 4.42C10.213 35 25.849 35 25.849 35s15.635 0 19.534-1.045a6.261 6.261 0 004.42-4.42c1.046-3.9 1.046-12.035 1.046-12.035s0-8.135-1.045-12.035z"
        />
      </defs>
      <use class="off" href="#icon-youtube" fill="#B1ACB9" opacity="0" />
      <use
        class="on"
        href="#icon-youtube"
        fill="url(#lwj-gradient)"
        opacity="0"
      />
    </svg>
  );
}
