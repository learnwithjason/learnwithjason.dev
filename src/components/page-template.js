/** @jsx h */
import { h, Fragment } from 'preact';
import { Helmet } from 'react-helmet';

export function PageTemplate({ title, description, children }) {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/post.css" />
      </Helmet>
      <header class="block hero">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
      <section class="block">
        <div class="post-content">{children}</div>
      </section>
    </Fragment>
  );
}
