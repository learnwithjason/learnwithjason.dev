import { h } from 'preact';
import { TopicList } from './topic-list.js';

const topics = [
  { title: 'Let’s Learn! Intro Sessions', tag: 'lets-learn' },
  { title: 'Animation on the Web', tag: 'animation' },
  { title: 'Design and User Experience', tag: 'design' },
  { title: 'Serverless Functions', tag: 'serverless' },
];

export function SectionTopics({ episodes }) {
  return (
    <section class="block">
      <h2>What do you want to learn today?</h2>
      <div class="topics">
        {topics.map((topic) => {
          const topicEpisodes = episodes
            .filter((episode) =>
              episode.tags?.some((tag) => tag.value === topic.tag),
            )
            .slice(0, 5);

          return <TopicList title={topic.title} episodes={topicEpisodes} />;
        })}
      </div>
    </section>
  );
}
