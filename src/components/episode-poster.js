import { h } from 'preact';

function toBase64(str) {
  const encoded =
    typeof btoa === 'function'
      ? btoa(str)
      : Buffer.from(str).toString('base64');

  return encoded.replace(/\//g, '_');
}

function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}

function getImageAttributes({
  teacherImage,
  teacherName,
  title,
  width,
  height,
}) {
  const transformations = [
    `/u_fetch:${toBase64(teacherImage)}`,
    `,w_280,h_280,c_fill,g_north_west,x_416,y_58`,
    `/w_310,c_fit,co_white,g_north_west,x_40,y_180,`,
    `l_text:jwf.otf_38_line_spacing_0:${cleanText(title)}`,
    `/l_text:jwf.otf_24_center:${cleanText(teacherName)}`,
    `,g_north_west,x_420,y_360,c_fit,co_white,w_280,b_rgb:00000001`,
  ];

  /*
   * hooooly shit this is kind of a nightmare but here’s what’s going on:
   *
   * 1. we create an array of sizes ranging from half the size of the original
   *    up to 3× the size
   * 2. to create the Cloudinary transformations, we have to do a bunch of math
   *    to figure out what the correct widths, heights, and coordinates are for
   *    each width (it occurs to me that there are probably easier ways to do
   *    this, but that's a yak shave for another day)
   * 3. I’m using an array mostly to make this a bit easier to look at with all
   *    the string interpolation. there's no other reason than preference
   */
  const srcSet = [
    [width * 0.5, height * 0.5],
    [width, height],
    [width * 1.5, height * 1.5],
    [width * 2, height * 2],
    [width * 3, height * 3],
  ].map(([w, h]) =>
    [
      'https://res.cloudinary.com/jlengstorf/image/upload',
      `/w_${w},h_${h},c_fill,q_auto,f_auto`,
      `/u_fetch:${toBase64(teacherImage)}`,
      `,w_${Math.round(0.3111111111 * w)},h_${Math.round(0.3111111111 * w)}`,
      `,c_fill,g_north_west,x_${Math.round(0.4622222222 * w)}`,
      `,y_${Math.round(0.116 * h)}`,
      `/w_${Math.round(0.3444444444 * w)},c_fit,co_white,g_north_west`,
      `,x_${Math.round(0.04444444444 * w)},y_${Math.round(0.36 * h)}`,
      `,l_text:jwf.otf_${Math.round((w / width) * 21)}_line_spacing_0:`,
      `${cleanText(title)}`,
      `/l_text:jwf.otf_${Math.round((w / width) * 14)}_center:`,
      `${cleanText(teacherName)}`,
      `,g_north_west,x_${Math.round(0.4666666667 * w)}`,
      `,y_${Math.round(0.72 * h)},c_fit,co_white`,
      `,w_${Math.round(0.3111111111 * w)},b_rgb:00000001`,
      `/lwj/video-poster.jpg`,
      ` ${w}w`,
    ].join(''),
  );

  // set the default size as the fallback and drop the size off the end
  const [src] = srcSet[1].split(' ');

  const sizes = `(min-width: 1000px) 500px, 90vw`;

  return {
    alt: `${title} (with ${teacherName})`,
    src,
    srcSet,
    sizes,
  };
}

export function EpisodePoster({
  title,
  teacherName,
  teacherImage,
  width = 500,
  height = 278,
}) {
  const { alt, src, srcSet, sizes } = getImageAttributes({
    teacherImage,
    teacherName,
    title,
    width,
    height,
  });

  return (
    <img
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
