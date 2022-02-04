import { h, Fragment } from 'preact';
import { Helmet } from 'react-helmet';
import { IconArrow } from '../components/icon-arrow.js';

export default function Blog({ posts }) {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/post.css" />
      </Helmet>
      <header class="block hero">
        <h1>Blog Posts</h1>
        <p>
          Tutorials, quick tips, and other helpful resources for learning more
          about code!
        </p>
      </header>
      <section class="block post-previews">
        {posts.map((post) => (
          <article class="post-preview">
            <h2>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p>{post.description}</p>
            <a href={`/blog/${post.slug}`} class="read-more">
              read this post <IconArrow />
            </a>
          </article>
        ))}
      </section>
    </Fragment>
  );
}
