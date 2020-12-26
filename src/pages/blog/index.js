import { h, Fragment } from 'preact';
import { IconArrow } from '../../components/icon-arrow.js';

export default function Blog({ posts }) {
  return (
    <Fragment>
      <header class="block hero">
        <h1>Blog Posts</h1>
        <p>
          Tutorials, quick tips, and other helpful resources for learning more
          about code!
        </p>
      </header>
      <section class="block post-previews">
        {posts.map((post) => (
          <article>
            <h2>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p>{post.description}</p>
            <p>
              <a href={`/blog/${post.slug}`}>
                read this post <IconArrow />
              </a>
            </p>
          </article>
        ))}
      </section>
    </Fragment>
  );
}
