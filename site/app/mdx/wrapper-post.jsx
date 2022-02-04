import { Fragment, useEffect, useRef, useState } from 'react';
import { OptInForm } from '../components/opt-in-form.jsx';

export function WrapperPost({ meta, children }) {
  const [headings, setHeadings] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const post = ref.current;

    const headingElements = post.querySelectorAll('.post-content h2');
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
      <article className="post" ref={ref}>
        <header>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </header>
        <aside className="table-of-contents">
          <div className="toc-sticky-container">
            <h2
              className="gradient-subheading gradient-underline"
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
        <div className="post-content">{children}</div>
        <OptInForm />
      </article>
    </Fragment>
  );
}
