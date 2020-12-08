import { h } from 'preact';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(RelativeTime);

export function SectionNextEpisode({ episode }) {
  return (
    <section class="block">
      <h2>TODO: Next Episode in {dayjs().to(episode.date)}</h2>
      <p>{JSON.stringify(episode, null, 2)}</p>
    </section>
  );
}
