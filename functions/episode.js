const fetch = require('node-fetch');
const { builder } = require('@netlify/functions');
const { hasuraRequest } = require('./util/hasura');

function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}

const handler = async (event) => {
  const path = event.path;
  const [, slug, poster = false] = path
    .replace(new RegExp('/api/episode'), '')
    .split('/');

  const { transcript = false } = event.queryStringParameters;

  const starting = poster === 'starting-soon.jpg';

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

  const [guest] = episode.guest || [];

  const thumb = Buffer.from(guest.guestImage.asset.url)
    .toString('base64')
    .replace(/\//g, '_');

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
    : '';

  const filename =
    episode.host?.twitter === 'bencodezen' ? 'episode-ben-hong' : 'episode';

  const posterUrl = [
    `https://res.cloudinary.com/jlengstorf/image/upload`,
    `/w_${w},h_${h},c_fill,q_auto,f_auto/`,
    `u_fetch:${thumb},w_${Math.round(0.3111111111 * w)},`,
    `h_${Math.round(0.3111111111 * w)},`,
    `c_fill,g_north_west,`,
    `x_${Math.round(0.4622222222 * w)},`,
    `y_${Math.round(0.116 * h)}`,
    startingSoonText,
    `/w_${Math.round(0.3444444444 * w)},`,
    `c_fit,co_white,g_north_west,`,
    `x_${Math.round(0.04444444444 * w)},`,
    `y_${Math.round((starting ? 0.42 : 0.36) * h)},`,
    `l_text:jwf.otf_${Math.round((w / width) * 21)}_line_spacing_0:`,
    `${cleanText(episode.title)}`,
    `/l_text:jwf.otf_${Math.round((w / width) * 14)}_center:`,
    `${cleanText(guest.name)},`,
    `g_north_west,x_${Math.round(0.4666666667 * w)},`,
    `y_${Math.round(0.72 * h)},c_fit,co_white,`,
    `w_${Math.round(0.3111111111 * w)},b_rgb:00000001`,
    `/lwj/${filename}.jpg`,
  ].join('');

  if (poster) {
    const response = await fetch(posterUrl).then((res) => res.arrayBuffer());
    const imageBuffer = Buffer.from(response);

    return {
      statusCode: 302,
      headers: {
        'Content-Type': 'image/jpeg',
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
    body: JSON.stringify({ ...episode, poster: posterUrl }),
  };
};

exports.handler = builder(handler);
