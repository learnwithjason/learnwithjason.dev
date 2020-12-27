import { h } from 'preact';
// this path is weird because this template gets moved during the build
import { EpisodePreview } from './src/components/episode-preview.js';

export default function EpisodeTemplate({ episode }) {
  return (
    <div class="block episode">
      <EpisodePreview episode={episode} hideLinks />
    </div>
  );
}
