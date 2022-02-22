import { format } from 'date-fns';
import { loadAllEpisodes } from '../util/load-all-episodes.server.js';

export const loader = async () => {
  const episodes = (await loadAllEpisodes()).slice(0, 20);

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
>
  <channel>
    <title>Learn With Jason Episodes</title>
    <description>Learn With Jason is live, hands-on learning with brilliant teachers from the web community every Tuesday &amp; Thursday. Join live and learn with us!</description>
    <link>https://www.learnwithjason.dev/</link>
    <atom:link href="https://www.learnwithjason.dev/episodes.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <sy:updatePeriod>weekly</sy:updatePeriod>

    ${episodes
      .map(
        (episode) => `
    <item>
      <title>${episode.title.replace(/&/g, '&amp;')}</title>
      <pubDate>${format(
        new Date(episode.date),
        'eee, d E yyyy H:mm:ss XX',
      )}</pubDate>
      <description><![CDATA[<p>${episode.description.replace(
        /&/g,
        '&amp;',
      )}</p>]]></description>
      <content:encoded><![CDATA[
        <ul>
          <li>
            <a href="https://youtu.be/${
              episode.youtubeID
            }?list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx">Watch on YouTube</a>
          </li>
          <li>
            <a href="${episode.demo}">Demo</a>
          </li>
          <li>
            <a href="${episode.repo}">Repo</a>
          </li>
        </ul>
        <h2>Links</h2>
        <ul>
          ${episode.links
            .map(
              (link) => `
          <li><a href="${link}">${link}</a></li>`,
            )
            .join('')}
        </ul>
      ]]></content:encoded>
      <link>https://www.learnwithjason.dev/${episode.slug.current}</link>
      <guid isPermaLink="true">https://www.learnwithjason.dev/${
        episode.slug.current
      }</guid>
    </item>
    `,
      )
      .join('')}
  </channel>
</rss>
  `,
    {
      headers: {
        'X-Boop': 'boop',
        'Content-Type': 'application/xml',
      },
    },
  );
};
