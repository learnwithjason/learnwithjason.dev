import { useLoaderData, Link } from 'remix';
import { loadMdx } from '~/util/load-mdx.server.js';
import { IconArrow } from '~/components/icon-arrow.jsx';

export const loader = () => {
  const posts = loadMdx();

  return posts;
};

export const meta = () => {
  return {
    title: 'Posts About Modern Web Development — Learn With Jason',
    description: `
      Jason shares his experience on his blog to help you build a better web.
    `,
  };
};

export default function BlogIndex() {
  const posts = useLoaderData();

  return (
    <>
      <header className="block hero">
        <h1>Blog Posts</h1>
        <p>
          Tutorials, quick tips, and other helpful resources for learning more
          about code!
        </p>
      </header>
      <section className="block post-previews">
        {posts.map((post) => (
          <article className="post-preview" key={post.slug}>
            <h2>
              <Link rel="prefetch" to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p>{post.description}</p>
            <Link
              rel="prefetch"
              to={`/blog/${post.slug}`}
              className="read-more"
            >
              read this post <IconArrow />
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
