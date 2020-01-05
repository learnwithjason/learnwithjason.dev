/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useLayoutEffect } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { alpha } from '@theme-ui/color';
import { Helmet } from 'react-helmet';
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

  /**
   * This code generates an SEO-friendly image for sharing this post using
   * Cloudinary’s transformation APIs. This takes a base image and overlays the
   * title and tags as text, which allows me to skip the step of generating a
   * custom image for every blog post.
   *
   * @see https://cloudinary.com/documentation/image_transformations#adding_text_captions
   */
  const imgUrlBase = 'https://res.cloudinary.com/jlengstorf/image/upload/';
  const imgTransforms = 'w_1280,q_auto,f_auto';
  const sharedTextTransforms = 'w_760,c_fit,co_rgb:232129';
  const titleTextTransforms = `${sharedTextTransforms},g_south_west,x_480,y_300,l_text:futura_64_line_spacing_1.1`;
  const urlEncodedTitle = encodeURIComponent(blogPost.title);
  const tagTextTransforms = `${sharedTextTransforms},g_north_west,x_480,y_460,l_text:futura_48`;
  const urlEncodedTags = encodeURIComponent(
    blogPost.tags.map(tag => `#${tag}`).join(' '),
  );
  const imgInfo = 'v1578185720/lwj/blog-post-card.jpg';
  const seoImage = `${imgUrlBase}/${imgTransforms}/${titleTextTransforms}:${urlEncodedTitle}/${tagTextTransforms}:${urlEncodedTags}/${imgInfo}`;

  return (
    <Layout>
      <Helmet>
        <title>{blogPost.title}</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="image" content={seoImage} />

        {/* OpenGraph tags */}
        <meta
          property="og:url"
          content={`https://learnwithjason.dev${blogPost.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={seoImage} />

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
