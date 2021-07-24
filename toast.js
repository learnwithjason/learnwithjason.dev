import { sourceMdx, processMdx, fetchMdxFromDisk } from '@toastdotdev/mdx';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import cloudinary from 'rehype-local-image-to-cloudinary';
import upload from 'rehype-local-image-to-cloudinary/upload.js';
import getImageUrl from 'rehype-local-image-to-cloudinary/build-url.js';
import getShareImage from '@jlengstorf/get-share-image';
import { getImageAttributes } from './src/util/get-image-attributes.js';
import { getTeacher } from './src/util/get-teacher.js';

async function createBlogPages({ setDataForSlug }) {
  try {
    const files = await fetchMdxFromDisk({ directory: './content/blog' });

    const allPostMeta = await Promise.all(
      files.map(async ({ filename: filepath, file: content }) => {
        const { content: compiledMdx, data } = await processMdx(content, {
          filepath,
          rehypePlugins: [
            process.env.CLOUDINARY_API_KEY && [
              cloudinary,
              {
                baseDir: path.dirname(filepath),
                uploadFolder: 'lwj',
              },
            ],
          ],
        });

        let cloudinaryUrl;
        if (process.env.CLOUDINARY_API_KEY && data.exports.meta?.image) {
          const cloudinaryName = await upload({
            imagePath: path.join(
              path.dirname(filepath),
              data.exports.meta.image,
            ),
            uploadFolder: 'lwj',
          });

          cloudinaryUrl = getImageUrl({
            fileName: cloudinaryName,
            uploadFolder: 'lwj',
            transformations: 'f_auto,q_auto,w_1600,h_900,c_fill',
          });
        } else {
          const title =
            data.exports.meta.share?.title ?? data.exports.meta.title;
          const tagline =
            data.exports.meta.share?.text ?? data.exports.meta.description;

          cloudinaryUrl = getShareImage({
            title,
            tagline,
            cloudName: 'jlengstorf',
            imagePublicID: 'lwj/post-share',
            titleFont: 'jwf.otf',
            titleFontSize: 55,
            taglineFont: 'jwf-book.otf',
            taglineFontSize: 42,
            textColor: 'ffffff',
            textLeftOffset: 392,
            titleBottomOffset: 385,
            taglineTopOffset: 320,
            textAreaWidth: 813,
          });
        }

        await setDataForSlug(`/blog/${data.exports.meta.slug}`, {
          component: {
            mode: 'source',
            value: compiledMdx,
          },
          data: {
            meta: {
              ...data.exports.meta,
              image: cloudinaryUrl,
              type: 'post',
            },
          },
        });

        return {
          ...data.exports.meta,
          image: cloudinaryUrl,
        };
      }),
    );

    const posts = allPostMeta.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();

      return db - da;
    });

    await setDataForSlug('/blog', {
      data: { posts },
    });
  } catch (err) {
    console.error(err);
  }
}

export const sourceData = async ({ setDataForSlug }) => {
  const schedulePromise = fetch(
    'https://www.learnwithjason.dev/api/schedule',
  ).then((res) => res.json());

  const featuredPromise = fetch(
    'https://www.learnwithjason.dev/api/episodes/featured',
  ).then((res) => res.json());

  const episodesPromise1 = fetch(
    'https://www.learnwithjason.dev/api/episodes/page/1/transcript',
  ).then((res) => res.json());

  const episodesPromise2 = fetch(
    'https://www.learnwithjason.dev/api/episodes/page/2/transcript',
  ).then((res) => res.json());

  const episodesPromise3 = fetch(
    'https://www.learnwithjason.dev/api/episodes/page/3/transcript',
  ).then((res) => res.json());

  const episodesPromise4 = fetch(
    'https://www.learnwithjason.dev/api/episodes/page/4/transcript',
  ).then((res) => res.json());

  const episodesPromise5 = fetch(
    'https://www.learnwithjason.dev/api/episodes/page/5/transcript',
  ).then((res) => res.json());

  const sponsorsPromise = fetch(
    `https://www.learnwithjason.dev/api/sponsors`,
  ).then((res) => res.json());

  // const productsPromise = fetch(
  //   `https://www.learnwithjason.dev/api/products`,
  // ).then((res) => res.json());
  const productsPromise = Promise.resolve([
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDk2MTU5ODQ4NDk=',
      handle: 'rainbow-corgi-toy',
      description:
        'Tell the rainbow corgi why your code doesn’t work; it listens. Give the rainbow corgi snuggs; it comforts. Take the rainbow corgi in the bath; it protecc.',
      title: 'Rainbow Corgi Toy',
      totalInventory: 1000,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk4MDkwMzEwNDcyMQ==',
          title: 'Default Title',
          quantityAvailable: 1000,
          priceV2: { amount: '19.99', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '19.99', currencyCode: 'USD' },
        minVariantPrice: { amount: '19.99', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-toy.jpg?v=1627169322',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNzQ4NjQwODE=',
      handle: '8-sticker-pack-save-50',
      description: 'One each of all available stickers — holy buckets!',
      title: '8 Sticker Pack (Save 50%!)',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDk1MzEyNDA0OQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '16.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '16.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '16.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/sticker-pack-v2.png?v=1627085191',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNjQ0MTEwODk=',
      handle: 'stream-blitz-sticker',
      description:
        'Have more fun on Twitch with Stream Blitz! (dimensions: 1.82”w x 2”)',
      title: 'Stream Blitz Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkyMTg5NjE0NQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/stream-blitz.png?v=1627084862',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNjIzNDY3MDU=',
      handle: 'lwj-logo-sticker',
      description: 'Boop crew membership badge. (dimensions: 1.75”w x 2”)',
      title: 'LWJ Logo Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkxNzIxMDMyMQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/learn-with-jason.png?v=1627084783',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNjE3MjQxMTM=',
      handle: 'beep-boop-sticker',
      description:
        'Boop, but beepier because it’s Morse code. (dimensions: 2” x 1.75”)',
      title: 'BEEP BOOP Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkxNTgwMTI5Nw==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/beep-boop.png?v=1627084741',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNjAyMTY3ODU=',
      handle: 'play-until-it-pays-sticker',
      description:
        'Make it because it’s fun. The rest will follow. (dimensions: 2” x 1.75”)',
      title: 'Play Until It Pays Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkxMjY4ODMzNw==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/play-until-it-pays.png?v=1627084678',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNTkxMzU0NDE=',
      handle: 'boop-sticker',
      description:
        'Do you wanna get booped on the brain? (dimensions: 2” x 1.82”)',
      title: 'BOOP Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkxMDE2NTIwMQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/boop.png?v=1627084638',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNTc3NTkxODU=',
      handle: 'corgi-pal-sticker',
      description:
        'Add a corgi pal to your collection! (dimensions: 1.59”h x 2”)',
      title: 'Corgi Pal Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkwNzg3MTQ0MQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-pal.png?v=1627084571',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNTY3NDMzNzc=',
      handle: 'rubber-corgi-sticker',
      description:
        'This rubber corgi will listen to your problems. (dimensions: 1.92”h x 2”)',
      title: 'Rubber Corgi Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDkwNDIwMTQyNQ==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/rubber-corgi.png?v=1627084500',
          altText: null,
        },
      ],
    },
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MDgzNTQxODc0NzM=',
      handle: 'bearded-corgi-sticker',
      description:
        'It’s a party corgi, but with a beard! (dimensions: 1.5”h x 1.59”)',
      title: 'Bearded Corgi Sticker',
      totalInventory: 100,
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTk3NDg5OTc0NDk3Nw==',
          title: 'Default Title',
          quantityAvailable: 100,
          priceV2: { amount: '4.0', currencyCode: 'USD' },
        },
      ],
      priceRange: {
        maxVariantPrice: { amount: '4.0', currencyCode: 'USD' },
        minVariantPrice: { amount: '4.0', currencyCode: 'USD' },
      },
      images: [
        {
          src: 'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/bearded-corgi.png?v=1627084354',
          altText: null,
        },
      ],
    },
  ]);

  createBlogPages({ setDataForSlug });

  const [
    schedule,
    featuredEpisodes,
    episodes1,
    episodes2,
    episodes3,
    episodes4,
    episodes5,
    sponsors,
    products,
  ] = await Promise.all([
    schedulePromise,
    featuredPromise,
    episodesPromise1,
    episodesPromise2,
    episodesPromise3,
    episodesPromise4,
    episodesPromise5,
    sponsorsPromise,
    productsPromise,
    sourceMdx({
      setDataForSlug,
      directory: './content/pages',
      slugPrefix: '/',
    }),
  ]);

  const episodes = [
    ...episodes1,
    ...episodes2,
    ...episodes3,
    ...episodes4,
    ...episodes5,
  ];

  console.log({
    totalEpisodes: episodes.length,
  });

  const markdownPromises = episodes.map(async (episode) => {
    return new Promise((resolve, reject) => {
      if (!episode.transcript) {
        resolve(episode);
      }

      unified()
        .use(remarkParse)
        .use(remark2rehype)
        .use(rehypeStringify)
        .process(episode.transcript, (err, file) => {
          if (err) {
            reject(err);
          }

          resolve({
            ...episode,
            transcriptHtml: String(file),
          });
        });
    });
  });

  const episodeComponent = fs.readFileSync(
    './src/components/episode-template.js',
    'utf-8',
  );

  const scheduledEpisodeComponent = fs.readFileSync(
    './src/components/schedule-template.js',
    'utf-8',
  );

  const topicComponent = fs.readFileSync(
    './src/components/episodes-template.js',
    'utf-8',
  );

  const topics = episodes.reduce((topics, episode) => {
    if (episode.tags) {
      episode.tags.forEach((topic) => {
        const count = topics.get(topic.value) ?? 1;
        topics.set(topic.value, count + 1);
      });
    }

    return topics;
  }, new Map());

  const topicPromises = [...topics].map(([topic]) => {
    const filteredEpisodes = episodes.filter((e) =>
      e.tags?.some((t) => t.value === topic),
    );

    return setDataForSlug(`/topic/${topic}`, {
      component: {
        mode: 'source',
        value: topicComponent,
      },
      data: {
        meta: {
          title: `${topic} Episodes · Learn With Jason`,
          // description: 'TODO',
          // image: 'TODO',
          url: `https://www.learnwithjason.dev/topic/${topic}`,
        },
        topic,
        episodes: filteredEpisodes,
      },
    });
  });

  await Promise.all(
    schedule.map((episode) => {
      const host = getTeacher([episode.host]);
      const teacher = getTeacher(episode.guest);

      const { srcSet } = getImageAttributes({
        host,
        teacher,
        title: episode.title,
        width: 500,
        height: 278,
        type: 'scheduled',
      });
      const [image] = srcSet.slice(-1)[0].split(' ');

      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: scheduledEpisodeComponent,
        },
        data: {
          meta: {
            title: `${episode.title} · Learn With Jason`,
            description: episode.description,
            image,
            url: `https://www.learnwithjason.dev/${episode.slug.current}`,
          },
          episode,
        },
      });
    }),
  );

  const episodesWithMarkdown = await Promise.all([
    ...markdownPromises,
    ...topicPromises,
    setDataForSlug('/', {
      data: {
        sponsors,
        featuredEpisodes,
        episodes: episodes.map((episode) => ({
          _id: episode._id,
          title: episode.title,
          slug: episode.slug,
          guest: episode.guest,
          tags: episode.tags,
          youtubeID: episode.youtubeID,
        })),
        schedule,
      },
    }),
    setDataForSlug('/episodes', {
      data: {
        meta: {
          title: `Browse all ${episodes.length} episodes of Learn With Jason!`,
          description:
            'Watch past episodes of Learn With Jason and learn something new in 90 minutes!',
          image:
            'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
          url: 'https://www.learnwithjason.dev/episodes',
        },
        episodes: episodes.map((episode) => {
          const host = getTeacher([episode.host]);

          return {
            _id: episode._id,
            title: episode.title,
            description: episode.description,
            slug: episode.slug,
            host,
            guest: episode.guest,
            youtubeID: episode.youtubeID,
          };
        }),
      },
    }),
    setDataForSlug('/schedule', {
      data: {
        meta: {
          title: 'Upcoming Learn With Jason Episodes',
          description:
            'See upcoming episodes of Learn With Jason and add the LWJ calendar to your Google Calendar — never miss an episode!',
          image:
            'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1607755791/lwj/learnwithjason-og.jpg',
          url: 'https://www.learnwithjason.dev/schedule',
        },
        schedule,
      },
    }),
  ]);

  await Promise.all(
    episodesWithMarkdown.map((episode) => {
      if (!episode.youtubeID) {
        return Promise.resolve();
      }

      const host = getTeacher([episode.host]);
      const teacher = getTeacher(episode.guest);

      const { srcSet } = getImageAttributes({
        host,
        teacher,
        title: episode.title,
        width: 500,
        height: 278,
      });

      const [image] = srcSet.slice(-1)[0].split(' ');

      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: episodeComponent,
        },
        data: {
          meta: {
            title: `${episode.title} · Learn With Jason`,
            description: episode.description,
            image,
            url: `https://www.learnwithjason.dev/${episode.slug.current}`,
          },
          episode,
        },
      });
    }),
    setDataForSlug('/store', {
      data: {
        products,
      },
    }),
  );
};
