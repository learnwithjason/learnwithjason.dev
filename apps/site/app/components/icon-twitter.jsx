import { useRef } from 'react';
import { useGradientHover } from '../hooks/use-gradient-hover.js';

export function IconTwitter() {
  const ref = useRef();

  useGradientHover(ref);
  return (
    <svg
      ref={ref}
      className="hero-social"
      width="50"
      height="41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path
          id="icon-twitter"
          d="M15.724 40.628c18.868 0 29.188-15.632 29.188-29.188 0-.444 0-.886-.03-1.326A20.872 20.872 0 0050 4.804a20.475 20.475 0 01-5.892 1.614 10.294 10.294 0 004.51-5.674 20.558 20.558 0 01-6.514 2.49 10.268 10.268 0 00-17.482 9.356A29.124 29.124 0 013.48 1.872a10.266 10.266 0 003.176 13.694A10.183 10.183 0 012 14.282v.13a10.262 10.262 0 008.23 10.056c-1.51.412-3.095.472-4.632.176a10.27 10.27 0 009.584 7.124A20.583 20.583 0 010 36.02a29.042 29.042 0 0015.724 4.6"
        />
      </defs>

      <use className="off" href="#icon-twitter" fill="#B1ACB9" opacity="0" />
      <use
        className="on"
        href="#icon-twitter"
        fill="url(#lwj-gradient)"
        opacity="0"
      />
    </svg>
  );
}
