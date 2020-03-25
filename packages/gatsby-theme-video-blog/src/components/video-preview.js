/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const VideoPreview = ({ video, basePath, latest = false }) => {
  const link = `/${basePath}/${video.slug}`.replace(/\/+/, '/');
  const guests = (video.guest || []).map(({ name }) => name);
  const hasGuest = guests.length > 0;

  return (
    <div
      key={video.id}
      sx={{
        mt: [4, 0],
        border: '1px solid',
        borderColor: 'transparent',
        variant: 'video-blog.preview',
        '&:first-of-type': {
          backgroundColor: 'background',
          gridColumn: '1 / 3',
          gridRow: '1 / 3',
          mb: [4, 4, 0],
          ml: ['-5vw', '-5vw', -20],
          mr: ['-5vw', '-5vw', 0],
          mt: [0, 0, -45],
          p: ['5vw', '5vw', 20],
          variant: 'video-blog.latest-video',
        },
      }}
    >
      {latest && (
        <h2
          sx={{
            color: 'heading',
            fontSize: 2,
            letterSpacing: 'caps',
            m: 0,
            mb: 2,
            textTransform: 'uppercase',
            variant: 'video-blog.latest-heading',
          }}
        >
          Latest Episode
        </h2>
      )}
      <div sx={{ variant: 'video-blog.preview-image' }}>
        <Link
          to={link}
          sx={{
            display: 'block',
            ':active, :focus': {
              '&&': { outline: 'none' },
              borderRadius: 2,
              boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
            },
            variant: 'video-blog.preview-image-link',
          }}
        >
          <Image
            fluid={video.image.fluid}
            alt={video.title}
            sx={{
              border: '1px solid',
              borderColor: 'blue.1',
              borderRadius: 2,
              display: 'block',
              maxWidth: '100%',
            }}
          />
        </Link>
      </div>
      <div
        sx={{
          mt: 0,
          variant: 'video-blog.preview-text',
        }}
      >
        <h2
          sx={{
            color: 'heading',
            fontSize: latest ? 4 : 3,
            m: 0,
            mt: latest ? 3 : 1,
            variant: 'video-blog.preview-heading',
          }}
        >
          {video.title}
          {hasGuest && ` (with ${guests.join()})`}
        </h2>
        {latest && (
          <div
            sx={{ m: 0, mt: 2, variant: 'video-blog.preview-excerpt' }}
            dangerouslySetInnerHTML={{
              __html: video.description.replace(/(\n\n.*)$/gs, ''),
            }}
          />
        )}
        <Link
          to={link}
          sx={{
            color: latest ? 'white' : 'text',
            display: 'block',
            m: 0,
            mt: 2,
            variant: 'video-blog.preview-link',
          }}
        >
          Watch this video &rarr;
        </Link>
      </div>
    </div>
  );
};

export default VideoPreview;
