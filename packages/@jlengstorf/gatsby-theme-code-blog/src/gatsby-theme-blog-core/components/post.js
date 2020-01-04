/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useLayoutEffect } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { alpha } from '@theme-ui/color';
import Layout from '../../components/layout';

const EndLink = ({ post, label, area }) => (
  <div
    sx={{
      gridArea: area,
      py: 3,
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      '&:last-of-type': {
        textAlign: 'right',
      },
    }}
  >
    <p sx={{ m: 0 }}>
      {label}{' '}
      <Link
        to={post.slug}
        sx={{
          display: 'block',
          fontSize: 1,
          letterSpacing: 0,
          textTransform: 'none',
        }}
      >
        {post.title}
      </Link>
    </p>
  </div>
);

const Post = ({ data: { blogPost, previous, next } }) => {
  // this handles a bug with hiding placeholder images
  // see https://github.com/gatsbyjs/gatsby/issues/20408
  useLayoutEffect(() => {
    const wrappers = document.querySelectorAll('.gatsby-resp-image-wrapper');

    wrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      const placeholder = wrapper.querySelector('span');

      img.addEventListener('load', () => (placeholder.style.opacity = 0));
    });
  }, []);

  return (
    <Layout>
      <header>
        <h1
          sx={{
            color: 'heading',
            fontSize: 4,
            lineHeight: 'heading',
            mt: 4,
            '@media (min-width: 750px)': {
              fontSize: 6,
            },
          }}
        >
          {blogPost.title}
        </h1>
      </header>
      <div
        sx={{
          '.gatsby-resp-image-wrapper': {
            mx: '-5vw !important',
          },
        }}
      >
        <MDXRenderer>{blogPost.body}</MDXRenderer>
      </div>
      {(previous || next) && (
        <div
          sx={{
            alignItems: 'flex-start',
            borderTop: '1px solid',
            borderTopColor: alpha('muted', 0.5),
            display: 'grid',
            gridGap: '10%',
            gridTemplate: '"prev next" 45% / 45%',
            height: 185,
            mt: 2,
            pt: 2,
            '@media (min-width: 750px)': {
              gridGap: '20%',
              gridTemplate: '"prev next" 40% / 40%',
            },
          }}
        >
          {previous && (
            <EndLink post={previous} label="previous post" area="prev" />
          )}
          {next && <EndLink post={next} label="next post" area="next" />}
        </div>
      )}
    </Layout>
  );
};

export default Post;
