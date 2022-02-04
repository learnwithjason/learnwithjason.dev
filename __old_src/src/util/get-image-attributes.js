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

export function getImageAttributes({
  host = {
    guestImage: {
      asset: {
        url:
          'https://cdn.sanity.io/images/vnkupgyb/production/7d8835955821f584df0b89ab72d2d83799139bb7-660x660.jpg',
      },
    },
    name: 'Jason Lengstorf',
    twitter: 'jlengstorf',
  },
  teacher,
  title,
  width,
  height,
  type = 'video',
}) {
  const JasonIsTalkingToHimself =
    host.name === 'Jason Lengstorf' && teacher.name === 'Jason Lengstorf';
  let filename = type === 'scheduled' ? 'episode' : 'video-poster';
  if (JasonIsTalkingToHimself) {
    filename = `${filename}-solo`;
  }

  // do we have a guest host? 👀
  switch (host.twitter) {
    case 'bencodezen':
      filename = `${filename}-ben-hong`;
      break;

    default:
      break;
  }

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
  ].map(([w, h]) => {
    // let's build up a Cloudinary URL!
    let urlParts = [];

    // start with the basics: Cloudinary base URL, dimensions, & quality/format
    urlParts.push(
      'https://res.cloudinary.com/jlengstorf/image/upload',
      `/w_${w},h_${h},c_fill,q_auto,f_auto`,
    );

    // next, if we have a guest, add their photo
    if (!JasonIsTalkingToHimself) {
      urlParts.push(
        `/u_fetch:${toBase64(teacher.image)}`,
        `,w_${Math.round(0.3111111111 * w)},h_${Math.round(0.3111111111 * w)}`,
        `,c_fill,g_north_west,x_${Math.round(0.4622222222 * w)}`,
        `,y_${Math.round(0.116 * h)}`,
      );
    }

    // now let's add the episode title
    urlParts.push(
      `/w_${Math.round(0.3444444444 * w)},c_fit,co_white,g_north_west`,
      `,x_${Math.round(0.04444444444 * w)},y_${Math.round(0.36 * h)}`,
      `,l_text:jwf.otf_${Math.round((w / width) * 21)}_line_spacing_0:`,
      `${cleanText(title)}`,
    );

    // next up, if we have a guest let's add their name
    if (!JasonIsTalkingToHimself) {
      urlParts.push(
        `/l_text:jwf.otf_${Math.round((w / width) * 14)}_center:`,
        `${cleanText(teacher.name)}`,
        `,g_north_west,x_${Math.round(0.4666666667 * w)}`,
        `,y_${Math.round(0.72 * h)},c_fit,co_white`,
        `,w_${Math.round(0.3111111111 * w)},b_rgb:00000001`,
      );
    }

    // the last part for Cloudinary is to set the file name for the poster itself
    urlParts.push(`/lwj/${filename}.jpg`);

    // to finish it off, add the width for srcset
    urlParts.push(` ${w}w`);

    return urlParts.join('');
  });

  // set the default size as the fallback and drop the size off the end
  const [src] = srcSet[1].split(' ');

  const sizes = `(min-width: 1000px) 500px, 90vw`;

  return {
    alt: `${title} (with ${teacher.name})`,
    src,
    srcSet,
    sizes,
  };
}
