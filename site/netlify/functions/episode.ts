import fetch from 'node-fetch';
import { builder, Handler } from '@netlify/functions';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { hasuraRequest } from './util/hasura';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}

const handlerFn: Handler = async (event) => {
  const path = event.path;
  let [, slug, modifier = false] = path
    .replace(new RegExp('/api/episode'), '')
    .split('/');

  if (slug.endsWith('.json')) {
    slug = slug.replace('.json', '');
  }

  let transcript = false;
  let poster;
  let showDate = false;
  let starting = false;

  switch (modifier) {
    case 'transcript':
      transcript = true;
      break;

    case false:
      break;

    case 'schedule.jpg':
      showDate = true;
      poster = modifier;
      break;

    case 'starting-soon.jpg':
      // fall through to the next case intentionally
      starting = true;
      poster = modifier;
      break;

    default:
      poster = modifier;
      break;
  }

  const data = await hasuraRequest({
    query: `
      query GetEpisodes ($slug: String!) {
        episode: allEpisode(
          where: {
            slug: { current: { eq: $slug } }
          }
        ) {
          _id
          title
          slug {
            current
          }
          description
          guest {
            guestImage {
              asset {
                url
              }
            }
            name
            twitter
          }
          host {
            guestImage {
              asset {
                url
              }
            }
            name
            twitter
          }
          date
          demo
          repo
          links
          youtubeID
          tags {
            value
          }
          ${transcript ? 'transcript' : ''}
        }
      }
    `,
    variables: {
      slug,
    },
  });

  const [episode] = data.episode;

  if (!episode) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Unable to load data for episode ${slug}`,
      }),
    };
  }

  const host = episode?.host || { name: 'Jason Lengstorf' };
  const [guest] = episode.guest || [{ name: 'Jason Lengstorf' }];
  const isSolo =
    guest.name === 'Jason Lengstorf' && host.name === 'Jason Lengstorf';

  const thumb = !isSolo
    ? Buffer.from(guest.guestImage.asset.url)
        .toString('base64')
        .replace(/\//g, '_')
    : false;

  const width = 500;
  const w = 1280;
  const h = 720;

  const startingSoonText = starting
    ? [
        `/w_${Math.round(0.3444444444 * w)},`,
        `c_fit,co_white,g_north_west,`,
        `x_${Math.round(0.04444444444 * w)},`,
        `y_${Math.round(0.32 * h)},`,
        `l_text:jwf-book.otf_${Math.round((w / width) * 18)}_line_spacing_0:`,
        `STARTING SOON!`,
      ].join('')
    : false;

  const dateText = showDate
    ? [
        `/w_${Math.round(0.3444444444 * w)},`,
        `c_fit,co_white,g_north_west,`,
        `x_${Math.round(0.04444444444 * w)},`,
        `y_${Math.round(0.34 * h)},`,
        `l_text:jwf-book.otf_${Math.round((w / width) * 10)}_line_spacing_0:`,
        encodeURIComponent(
          dayjs(episode.date).format('dddd, MMM D @ h:mm A z'),
        ).replace('%2C', '%252C'),
      ].join('')
    : false;

  let filename = 'episode';

  if (episode.host && episode.host.twitter === 'bencodezen') {
    filename = 'episode-ben-hong';
  }

  if (!thumb) {
    filename = 'episode-solo';
  }

  const posterUrl = [
    `https://res.cloudinary.com/jlengstorf/image/upload`,
    `/w_${w},h_${h},c_fill,q_auto,f_auto`,
    thumb ? `/u_fetch:${thumb},w_${Math.round(0.3111111111 * w)},` : false,
    thumb ? `h_${Math.round(0.3111111111 * w)},` : false,
    thumb ? `c_fill,g_north_west,` : false,
    thumb ? `x_${Math.round(0.4622222222 * w)},` : false,
    thumb ? `y_${Math.round(0.116 * h)}` : false,
    dateText,
    startingSoonText,
    `/w_${Math.round(0.3444444444 * w)},`,
    `c_fit,co_white,g_north_west,`,
    `x_${Math.round(0.04444444444 * w)},`,
    `y_${Math.round((starting || dateText ? 0.42 : 0.36) * h)},`,
    `l_text:jwf.otf_${Math.round((w / width) * 21)}_line_spacing_0:`,
    `${cleanText(episode.title)}`,
    thumb ? `/l_text:jwf.otf_${Math.round((w / width) * 14)}_center:` : false,
    thumb ? `${cleanText(guest.name)},` : false,
    thumb ? `g_north_west,x_${Math.round(0.4666666667 * w)},` : false,
    thumb ? `y_${Math.round(0.72 * h)},c_fit,co_white,` : false,
    thumb ? `w_${Math.round(0.3111111111 * w)},b_rgb:00000001` : false,
    `/lwj/${filename}.jpg`,
  ]
    .filter(Boolean)
    .join('');

  if (poster) {
    const response = await fetch(posterUrl).then((res) => res.arrayBuffer());
    const imageBuffer = Buffer.from(response);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `filename="${episode.slug.current}.jpg"`,
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...episode,
      host: episode.host || { name: 'Jason Lengstorf' },
      guest: episode.guest || [{ name: 'Jason Lengstorf' }],
      poster: posterUrl,
    }),
  };
};

export const handler = builder(handlerFn);
