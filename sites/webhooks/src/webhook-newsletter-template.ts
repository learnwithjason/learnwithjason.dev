import type { Handler } from '@netlify/functions';

import { format, nextThursday } from 'date-fns';
import { notionApi } from '@lwj/notion-helpers';
import { getNewsletterTemplateMarkup } from './util/mjml';

type Result = {
  properties: {
    imageSrc: {
      url: string;
    };
    imageAlt: {
      rich_text: {
        text: {
          content: string;
        }
      }[];
    };
    heading: {
      title: {
        text: {
          content: string;
        }
      }[];
    };
    description: {
      rich_text: {
        text: {
          content: string;
        }
      }[];
    };
  };
  url: string;
}

export const handler: Handler = async () => {
  const featuredData = await notionApi('/databases/1ad6632d5f9a4e829ea84827532a7993/query', {
    "filter": {
      "and": [
        {
          "property": "date",
          "date": {
            "on_or_before": format(nextThursday(new Date()), 'yyyy-MM-dd'),
          },
        },
        {
          "property": "entryType",
          "select": {
            "equals": "featured"
          }
        }
      ]
    }
  });

  const featuredItems = featuredData.results.map((result: Result) => {
    return {
      image: {
        src: result.properties.imageSrc.url,
        alt: result.properties.imageAlt.rich_text[0].text.content,
      },
      heading: result.properties.heading.title[0].text.content,
      description: result.properties.description.rich_text[0].text.content,
      link: result.url,
    }
  });

  const broadcastData = await notionApi('/databases/1ad6632d5f9a4e829ea84827532a7993/query', {
    "filter": {
      "and": [
        {
          "property": "date",
          "date": {
            "on_or_before": format(nextThursday(new Date()), 'yyyy-MM-dd'),
          },
        },
        {
          "property": "entryType",
          "select": {
            "equals": "broadcast"
          }
        }
      ]
    }
  });

  // TODO load the page from Notion, get the subject line and rich text data, place that into the MJML, and send the whole shebang to ConvertKit

  console.log(broadcastData);

  const markup = await getNewsletterTemplateMarkup({featuredItems});

  const ckOptions = {
    content: markup.html,
    email_layout_template: "API Template",
    public: true,
  }

  return {
		statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf8"
    },
		body: markup.html,
	};
}
