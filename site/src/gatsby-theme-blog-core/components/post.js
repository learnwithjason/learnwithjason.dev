/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useLayoutEffect } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { alpha } from '@theme-ui/color';
import { Helmet } from 'react-helmet';
import getShareImage from '@jlengstorf/get-share-image';
import Layout from '@jlengstorf/gatsby-theme-code-blog/src/components/layout';
import Form from '../../components/form';

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

  const socialImage = getShareImage({
    title: blogPost.title,
    tagline: blogPost.tags.map(tag => `#${tag}`).join(' '),
    cloudName: 'jlengstorf',
    imagePublicID: 'lwj/blog-post-card',
    titleFont: 'lwj-title.otf',
    titleExtraConfig: '_line_spacing_-10',
    taglineFont: 'lwj-tagline.otf',
    textColor: '232129',
  });

  return (
    <Layout>
      <Helmet>
        <title>{blogPost.title}</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="image" content={socialImage} />

        {/* OpenGraph tags */}
        <meta
          property="og:url"
          content={`https://learnwithjason.dev${blogPost.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={socialImage} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LWJShow" />
        <meta name="twitter:creator" content="@jlengstorf" />
      </Helmet>
      <header>
        <h1
          sx={{
            color: 'heading',
            fontSize: 4,
            lineHeight: 'heading',
            mt: 6,
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
          code: {
            bg: 'background',
            border: '1px solid',
            borderColor: alpha('text', 0.25),
            borderRadius: 4,
            p: '2px 5px',
          },
        }}
      >
        <MDXRenderer>{blogPost.body}</MDXRenderer>
      </div>
      <Form />
      {(previous || next) && (
        <div
          sx={{
            alignItems: 'flex-start',
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
