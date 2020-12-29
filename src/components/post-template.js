import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import { OptInForm } from './opt-in-form.js';

export function PostTemplate({ meta, children }) {
  const [headings, setHeadings] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const post = ref.current;

    const headingElements = post.querySelectorAll('h2');
    const callback = ([entry]) => {
      const activeHeading = entry.target;
      const links = Array.from(
        document.querySelectorAll('.table-of-contents a'),
      );

      links.forEach((link) => {
        const [, href] = link.href.split('#');

        if (entry.isIntersecting && href === activeHeading.id) {
          links.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: [1.0] });

    setHeadings(
      Array.from(headingElements)
        .filter((h2) => h2.id !== 'table-of-contents')
        .map((h2) => {
          observer.observe(h2);

          return {
            label: h2.innerText,
            href: `#${h2.id}`,
          };
        }),
    );

    return () => {
      Array.from(headingElements).map((h2) => {
        observer.unobserve(h2);
      });
    };
  }, [ref]);

  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/theme.css" />
        <link rel="stylesheet" href="/styles/post.css" />
      </Helmet>
      <article class="post" ref={ref}>
        <header>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </header>
        <aside class="table-of-contents">
          <div class="toc-sticky-container">
            <h2
              class="gradient-subheading gradient-underline"
              id="table-of-contents"
            >
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
        <OptInForm />
      </article>
    </Fragment>
  );
}
