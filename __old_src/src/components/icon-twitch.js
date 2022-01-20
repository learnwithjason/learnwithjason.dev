import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { useGradientHover } from '../hooks/use-gradient-hover.js';

export function IconTwitch() {
  const ref = useRef();

  useGradientHover(ref);
  return (
    <svg
      ref={ref}
      class="hero-social"
      width="43"
      height="50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="icon-twitch">
          <path d="M8.927 0L0 8.929V41.07h10.712V50l8.927-8.929h7.14L42.849 25V0H8.927zm30.35 23.214l-7.141 7.143h-7.142l-6.248 6.25v-6.25h-8.034V3.571h28.565v19.643z" />
          <path d="M24.131 9.826h-3.61v10.695h3.61V9.826zM33.957 9.826h-3.61v10.695h3.61V9.826z" />
        </g>
      </defs>

      <use class="off" href="#icon-twitch" fill="#B1ACB9" opacity="0" />
      <use
        class="on"
        href="#icon-twitch"
        fill="url(#lwj-gradient)"
        opacity="0"
      />
    </svg>
  );
}
