/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import YouTube from 'react-youtube';
import SEO from './seo';

const Video = ({
  title,
  slug,
  description,
  guest,
  demo,
  repo,
  links,
  body,
  image,
  youtubeID,
}) => {
  if (guest === null) {
    guest = [];
  }

  return (
    <article
      sx={{
        mt: 5,
        variant: 'video-blog.video',
        '.video-blog-embed-wrapper': {
          height: '0',
          pb: `${(9 / 16) * 100}%`,
          position: 'relative',
          width: '100%',
        },
      }}
    >
      <SEO
        title={`${title} (with ${guest.map(g => g.name).join()})`}
        description={description}
        image={image.fluid.src}
        author={{ twitter: '@jlengstorf' }}
        path={`/${slug}`}
      />
      <YouTube
        videoId={youtubeID}
        containerClassName="video-blog-embed-wrapper"
        sx={{
          backgroundColor: 'background',
          backgroundImage: t => `
          linear-gradient(
            ${t.colors.background},
            ${t.colors.secondary},
            ${t.colors.background}
          )
        `,
          border: '1px solid',
          borderColor: 'background',
          height: '100%',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          width: '100%',
        }}
        opts={{
          playerVars: {
            modestbranding: 1,
            list: 'PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx',
            rel: 0,
            color: 'white',
          },
        }}
      />
      <h1 sx={{ fontSize: 4 }}>{title}</h1>

      <p>{description}</p>

      <ul>
        {guest.length > 0 && (
          <li>
            <strong>Guest{guest.length > 1 ? 's' : ''}:</strong>{' '}
            {guest.map(({ name, twitter }) => (
              <a key={twitter} href={`https://twitter.com/${twitter}`}>
                {name}
              </a>
            ))}
          </li>
        )}
        {demo && (
          <li>
            <strong>Demo:</strong> <a href={demo}>{demo}</a>
          </li>
        )}
        {repo && (
          <li>
            <strong>Repo:</strong> <a href={repo}>{repo}</a>
          </li>
        )}
      </ul>

      <h2>Links & Resources</h2>
      <ul>
        {links.map(link => (
          <li key={link}>
            <a href={link}>{link}</a>
          </li>
        ))}
      </ul>

      <details>
        <summary>Read the transcript</summary>
        {body && <MDXRenderer>{body}</MDXRenderer>}
      </details>
    </article>
  );
};

export default Video;
