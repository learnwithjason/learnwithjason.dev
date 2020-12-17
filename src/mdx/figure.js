import { h } from 'preact';

export function Figure({ caption, children }) {
  return (
    <figure class="post-figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
