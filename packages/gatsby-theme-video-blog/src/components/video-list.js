/** @jsx jsx */
import { jsx } from 'theme-ui';
import VideoPreview from './video-preview';

const VideoList = ({ videos }) => {
  return (
    <section
      sx={{
        display: ['block', 'grid'],
        gridTemplateColumns: ['none', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
        gridGap: 15,
        width: '100%',
        variant: 'video-blog.list',
      }}
    >
      {/* {videos.map(video => (
        <VideoPreview video={video} />
      ))} */}
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title: 'Build Your Own Meme Website',
          guest: ['Sara Vieira'],
          description:
            'How does Gatsby load data from other platforms and sources? And how do we actually use that data once it’s loaded? On this episode, Brittney Ball (https://twitter.com/Brii_toe_knee) pairs with Jason to create a source plugin and build a site using its data.',
        }}
        latest
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
      <VideoPreview
        video={{
          id: 1235,
          image:
            'https://static-cdn.jtvnw.net/twitch-event-images-v2/c4b7b421-7efc-4b0f-a9ba-82b8b8b7b01d-640x360',
          title:
            'Build Your Own Meme Website (With Sara Vieira) — Learn With Jason',
          description: 'This is a video description!',
        }}
      />
    </section>
  );
};

export default VideoList;
