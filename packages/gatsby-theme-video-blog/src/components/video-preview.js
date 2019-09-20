/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { transparentize } from 'polished';

const VideoPreview = ({ video, basePath, latest = false }) => {
  const link = `/${basePath}/${video.slug}`.replace(/\/+/, '/');

  return (
    <div
      key={video.id}
      sx={{
        mt: [4, 0],
        border: '1px solid',
        borderColor: 'transparent',
        variant: 'video-blog.preview',
        '&:first-of-type': {
          backgroundColor: 'blue.5',
          backgroundImage: t => `
            linear-gradient(
              20deg,
              ${transparentize(1, t.colors.teal[2])} 40%,
              ${transparentize(0, t.colors.teal[2])} 98%
            ),
            linear-gradient(
              290deg,
              ${t.colors.magenta[4]},
              ${t.colors.blue[5]}
            )
          `,
          borderColor: 'secondary',
          borderLeftWidth: [0, 0, 1],
          borderRadius: [0, 0, 2],
          borderRightWidth: [0, 0, 1],
          color: 'blue.0',
          gridColumn: '1 / 3',
          gridRow: '1 / 3',
          mb: [4, 4, 0],
          ml: ['-5vw', '-5vw', -20],
          mr: ['-5vw', '-5vw', 0],
          mt: [0, 0, -20],
          p: ['5vw', '5vw', 20],
          variant: 'video-blog.latest-video',
          a: {
            color: 'white',
          },
        },
      }}
    >
      {latest && (
        <h2
          sx={{
            color: 'white',
            textShadow: t =>
              `1px 1px 0 ${transparentize(0.2, t.colors.blue[6])}`,
            fontSize: 2,
            letterSpacing: 'caps',
            m: 0,
            mb: 2,
            textTransform: 'uppercase',
            variant: 'video-blog.latest-heading',
          }}
        >
          Latest Video
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
              borderColor: latest ? 'purple.3' : 'blue.1',
              borderRadius: 2,
              display: 'block',
              maxWidth: '100%',
            }}
          />
        </Link>
      </div>
      <div sx={{ mt: 0, variant: 'video-blog.preview-text' }}>
        <h2
          sx={{
            color: latest ? 'white' : 'heading',
            fontSize: 3,
            m: 0,
            mt: latest ? 3 : 1,
            textShadow: t =>
              latest
                ? `2px 2px 0 ${transparentize(0.2, t.colors.blue[6])}`
                : 'none',
            variant: 'video-blog.preview-heading',
          }}
        >
          {video.title} (with{' '}
          {(video.guest || []).map(({ name }) => name).join(', ')})
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
