/** @jsx jsx */
import { jsx } from 'theme-ui';
import VideoPreview from './video-preview';

const VideoList = ({ videos, basePath }) => {
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
      {videos.map((video, index) => (
        <VideoPreview
          key={video.id}
          video={video}
          basePath={basePath}
          latest={index === 0}
        />
      ))}
    </section>
  );
};

export default VideoList;
