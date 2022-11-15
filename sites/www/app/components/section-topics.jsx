import { TopicList } from './topic-list.jsx';

const topics = [
  { title: 'Let’s Learn! Intro Sessions', tag: 'lets-learn' },
  { title: 'Animation on the Web', tag: 'animation' },
  { title: 'Design and User Experience', tag: 'design' },
  { title: 'Serverless Functions', tag: 'serverless' },
];

export function SectionTopics({ episodes }) {
  return (
    <section className="block">
      <h2>What do you want to learn today?</h2>
      <div className="topics">
        {topics.map((topic) => {
          const topicEpisodes = episodes
            .filter((episode) => {
              const hasTag = episode.tags?.some(
                (tag) => tag.slug === topic.tag,
              );
              const hasVideo = episode.youtubeID;

              return hasTag && hasVideo;
            })
            .slice(0, 5);

          return (
            <TopicList
              key={topic.tag}
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
