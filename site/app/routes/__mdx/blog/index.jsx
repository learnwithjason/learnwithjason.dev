import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import fm from 'front-matter';
import { useLoaderData } from 'remix';
import { IconArrow } from '~/components/icon-arrow.jsx';

export const loader = () => {
  const blogBasePath = join(process.cwd(), 'app', 'routes', '__mdx', 'blog');
  const dirEntries = readdirSync(blogBasePath, { withFileTypes: true });
  const dirs = dirEntries.filter((entry) => entry.isDirectory());
  const files = dirEntries.filter((entry) => entry.isFile());

  const subFiles = dirs
    .map((dir) => {
      const subDirEntries = readdirSync(join(blogBasePath, dir.name), {
        withFileTypes: true,
      })
        .filter((e) => e.isFile())
        .map((e) => ({ name: join(dir.name, e.name) }));

      return subDirEntries;
    })
    .flat();

  const entries = [...files, ...subFiles].map((entry) => {
    if (entry.name === 'index.jsx') {
      return;
    }

    const fileContents = readFileSync(join(blogBasePath, entry.name), {
      encoding: 'utf-8',
    });

    const { attributes } = fm(fileContents);

    return {
      date: attributes.date,
      slug: entry.name.replace('.mdx', ''),
      title: attributes.meta.title,
      description: attributes.meta.description,
    };
  });

  return entries.filter(Boolean).sort((a, b) => b.date - a.date);
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
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p>{post.description}</p>
            <a href={`/blog/${post.slug}`} className="read-more">
              read this post <IconArrow />
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
