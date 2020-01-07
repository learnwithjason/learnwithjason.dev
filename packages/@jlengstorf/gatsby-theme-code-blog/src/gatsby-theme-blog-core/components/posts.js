/** @jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';
import { Link } from 'gatsby';
import Layout from '../../components/layout';

export default ({ data }) => {
  const posts = data.allBlogPost.edges.map(({ node }) => node);

  return (
    <Layout>
      {posts.map(post => (
        <article
          key={post.id}
          sx={{
            mt: 5,
            ':first-of-type': {
              mt: 0,
            },
          }}
        >
          <h2
            sx={{
              fontSize: 3,
              m: 0,
              '@media (min-width: 750px)': {
                fontSize: 4,
              },
            }}
          >
            <Link
              to={post.slug}
              sx={{
                '&&': { color: 'heading' },
                textDecoration: 'none',
                ':hover,:focus': { textDecoration: 'underline' },
              }}
            >
              {post.title}
            </Link>
          </h2>
          <p sx={{ mt: 2 }}>{post.excerpt}</p>
          <div
            sx={{
              display: 'flex',
              fontSize: 1,
              justifyContent: 'space-between',
            }}
          >
            <ul
              sx={{
                margin: 0,
                padding: 0,
                display: 'flex',
                listStyle: 'none',
                justifyContent: 'flex-start',
              }}
            >
              {post.tags.map(tag => (
                <li
                  key={`${post.id}-${tag}`}
                  sx={{
                    my: 0,
                    mr: 2,
                  }}
                >
                  <Link
                    to={`/blog/tag/${tag}`}
                    sx={{
                      border: '1px solid',
                      borderColor: alpha('muted', 0.5),
                      borderRadius: 2,
                      '&&': { color: 'muted' },
                      fontSize: 1,
                      fontWeight: 'bold',
                      px: 2,
                      py: 1,
                      textDecoration: 'none',
                      '::before': {
                        content: '"#"',
                      },
                      ':hover,:focus': {
                        bg: 'muted',
                        color: 'background',
                      },
                    }}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to={post.slug}>read this post &rarr;</Link>
          </div>
        </article>
      ))}
    </Layout>
  );
};
