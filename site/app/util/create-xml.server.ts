import { format } from 'date-fns';

type FeedItem = {
  title: string;
  pubDate: string;
  description: string;
  content: string;
  link: string;
};

type CreateXMLOptions = {
  title: string;
  description: string;
  siteUrl: string;
  feedPath?: string;
  updatePeriod?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  items: FeedItem[];
};

function createFeedItems(items: FeedItem[]) {
  return items
    .map(
      (item) => `
  <item>
    <title>${item.title.replace(/&/g, '&amp;')}</title>
    <pubDate>${format(
      new Date(item.pubDate),
      'eee, d E yyyy H:mm:ss XX',
    )}</pubDate>
    <description><![CDATA[<p>${item.description.replace(
      /&/g,
      '&amp;',
    )}</p>]]></description>
    <content:encoded><![CDATA[${item.content.replace(
      /&/g,
      '&amp;',
    )}]]></content:encoded>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.link}</guid>
  </item>
  `,
    )
    .join('');
}

export const createXML = ({
  title,
  description,
  siteUrl,
  feedPath = '/feed.xml',
  updatePeriod = 'weekly',
  items,
}: CreateXMLOptions) => {
  const itemLink = new URL(siteUrl);
  itemLink.pathname = feedPath;

  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  >
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${siteUrl}</link>
      <atom:link href="${itemLink}" rel="self" type="application/rss+xml" />
      <language>en-us</language>
      <sy:updatePeriod>${updatePeriod}</sy:updatePeriod>

      ${createFeedItems(items)}
    </channel>
  </rss>
`;
};
