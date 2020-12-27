import { h } from 'preact';

export function Figure({
  caption,
  credit,
  creditLink,
  creditType = 'Credit',
  children,
}) {
  return (
    <figure class="post-figure">
      {children}
      {(caption || credit) && (
        <figcaption>
          {caption}
          {credit && (
            <small>
              {creditType}:{' '}
              {creditLink ? (
                <a href={creditLink}>{credit}</a>
              ) : (
                <span>{credit}</span>
              )}
            </small>
          )}
        </figcaption>
      )}
    </figure>
  );
}
