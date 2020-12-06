import { h } from 'preact';
import { IconTwitch } from '../components/icon-twitch.js';
import { IconYouTube } from '../components/icon-youtube.js';
import { IconTwitter } from '../components/icon-twitter.js';

export function SectionHero() {
  return (
    <section class="block hero">
      <svg viewBox="0 0 800 180" class="hero-heading">
        <defs>
          <g id="text-group">
            <text x="50%" y="80">
              learn something
            </text>
            <text x="50%" y="150">
              new in 90 minutes.
            </text>
          </g>
        </defs>

        <rect id="o-filler" x="360" y="58" width="8" height="8" />
        <rect id="o-filler2" x="378" y="120" width="7" height="8"></rect>
        <use id="gradient-stroke" href="#text-group" />
        <use id="text" href="#text-group" />
      </svg>
      <p>
        <strong>
          <em>Learn With Jason</em>
        </strong>{' '}
        is live, hands-on learning with brilliant teachers from the web
        community every Tuesday & Thursday.
      </p>
      <ul class="links">
        <li>
          <a
            href="https://twitch.tv/jlengstorf"
            aria-label="Learn With Jason on Twitch"
          >
            <IconTwitch />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A"
            aria-label="Jason Lengstorf on YouTube"
          >
            <IconYouTube />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/LWJShow"
            aria-label="Learn With Jason on Twitter"
          >
            <IconTwitter />
          </a>
        </li>
      </ul>
    </section>
  );
}
