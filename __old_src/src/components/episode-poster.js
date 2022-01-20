import { h } from 'preact';
import { getImageAttributes } from '../util/get-image-attributes.js';

export function EpisodePoster({
  title,
  host,
  teacher,
  width = 500,
  height = 278,
}) {
  const { alt, src, srcSet, sizes } = getImageAttributes({
    host,
    teacher,
    title,
    width,
    height,
  });

  return (
    <img
      key={src}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
