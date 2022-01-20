import { h } from 'preact';
import { TopicList } from './topic-list.js';
import { topics } from '../data/topics.js';

export function SectionTopics({ episodes }) {
  return (
    <section class="block">
      <h2>What do you want to learn today?</h2>
      <div class="topics">
        {topics.map((topic) => {
          const topicEpisodes = episodes
            .filter((episode) => {
              const hasTag = episode.tags?.some(
                (tag) => tag.value === topic.tag,
              );
              const hasVideo = episode.youtubeID;

              return hasTag && hasVideo;
            })
            .slice(0, 5);

          return (
            <TopicList
              topic={topic.tag}
              title={topic.title}
              episodes={topicEpisodes}
            />
          );
        })}
      </div>
    </section>
  );
}
