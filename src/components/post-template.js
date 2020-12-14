import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Helmet } from 'react-helmet';

export function PostTemplate({ meta, children }) {
  const [headings, setHeadings] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const post = ref.current;

    const headingElements = post.querySelectorAll('h2');

    setHeadings(
      Array.from(headingElements)
        .filter((h2) => h2.id !== 'table-of-contents')
        .map((h2) => ({
          label: h2.innerText,
          href: `#${h2.id}`,
        })),
    );
  }, [ref]);

  return (
    <Fragment>
      <Helmet>
        <link
          rel="stylesheet"
          href="/web_modules/prism-theme-night-owl/build/style.css"
        />
        <link rel="stylesheet" href="/styles/post.css" />
      </Helmet>
      <article class="post" ref={ref}>
        <header>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </header>
        <aside class="table-of-contents">
          <div class="toc-sticky-container">
            <h2 class="gradient-underline" id="table-of-contents">
              Table of Contents
            </h2>
            <ol>
              {headings.map((heading) => (
                <li key={`heading-${heading.href}`}>
                  <a href={heading.href}>{heading.label}</a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div class="post-content">{children}</div>
      </article>
    </Fragment>
  );
}
