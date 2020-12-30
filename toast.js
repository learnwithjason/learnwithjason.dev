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

async function createBlogPages({ setDataForSlug }) {
  try {
    const files = await fetchMdxFromDisk({ directory: './content/blog' });

    const allPostMeta = await Promise.all(
      files.map(async ({ filename: filepath, file: content }) => {
        const { content: compiledMdx, data } = await processMdx(content, {
          filepath,
          rehypePlugins: [
            [
              cloudinary,
              {
                baseDir: path.dirname(filepath),
                uploadFolder: 'lwj',
              },
            ],
          ],
        });

        let cloudinaryUrl;
        if (data.exports.meta?.image) {
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
    'https://lwj2021.netlify.app/api/schedule',
  ).then((res) => res.json());

  const featuredPromise = fetch(
    'https://lwj2021.netlify.app/api/episodes?featured=true',
  ).then((res) => res.json());

  const allEpisodesPromise = fetch(
    'https://lwj2021.netlify.app/api/episodes',
  ).then((res) => res.json());

  const sponsorsPromise = fetch(
    `https://lwj2021.netlify.app/api/sponsors`,
  ).then((res) => res.json());

  createBlogPages({ setDataForSlug });

  const [schedule, featuredEpisodes, episodes, sponsors] = await Promise.all([
    schedulePromise,
    featuredPromise,
    allEpisodesPromise,
    sponsorsPromise,
    sourceMdx({
      setDataForSlug,
      directory: './content/pages',
      slugPrefix: '/',
    }),
  ]);

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
      const [teacher = { name: 'Jason Lengstorf' }] = episode.guest ?? [];
      const teacherImage =
        teacher?.guestImage?.asset.url ||
        'https://lengstorf.com/images/jason-lengstorf.jpg';

      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: scheduledEpisodeComponent,
        },
        data: {
          meta: {
            title: `${episode.title} · Learn With Jason`,
            description: episode.description,
            image: getImageAttributes({
              teacherImage,
              teacherName: teacher.name,
              title: episode.title,
              width: 900,
              height: 500,
            }).src,
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
        episodes: episodes.map((episode) => ({
          _id: episode._id,
          title: episode.title,
          description: episode.description,
          slug: episode.slug,
          guest: episode.guest,
        })),
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

      const [teacher = { name: 'Jason Lengstorf' }] = episode.guest ?? [];
      const teacherImage =
        teacher?.guestImage?.asset.url ||
        'https://lengstorf.com/images/jason-lengstorf.jpg';

      const { srcSet } = getImageAttributes({
        teacherImage,
        teacherName: teacher.name,
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
  );
};
