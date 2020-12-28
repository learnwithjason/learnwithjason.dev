import { sourceMdx, fetchMdxFromDisk, compileMdx } from '@toastdotdev/mdx';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeLink from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@toastdotdev/mdx/rehype-prism-mdx.js';
import remarkPluckMeta from '@toastdotdev/mdx/remark-pluck-meta.js';
import cloudinary from 'rehype-local-image-to-cloudinary';
import upload from 'rehype-local-image-to-cloudinary/upload.js';
import getImageUrl from 'rehype-local-image-to-cloudinary/build-url.js';

async function createBlogPages({ setDataForSlug }) {
  try {
    const files = await fetchMdxFromDisk({ directory: './content/blog' });

    const allPostMeta = await Promise.all(
      files.map(async ({ filename, file: content }) => {
        const { content: compiledMdx, data } = await compileMdx(content, {
          filepath: filename,
          remarkPlugins: [
            [
              remarkPluckMeta,
              {
                exportNames: ['meta'],
              },
            ],
          ],
          rehypePlugins: [
            rehypePrism,
            rehypeSlug,
            [
              rehypeLink,
              {
                properties: {
                  className: 'heading-link-anchor',
                  // style: "position: absolute; right: calc(100% + 5px);",
                },
                content: {
                  type: 'element',
                  tagName: 'heading-link-icon',
                  properties: { className: ['heading-link-icon'] },
                  children: [],
                  // children: [parsedCorgi]
                },
              },
            ],
            [
              cloudinary,
              {
                baseDir: path.dirname(filename),
                uploadFolder: 'lwj',
              },
            ],
          ],
        });

        let cloudinaryUrl;
        if (data.exports.meta?.image) {
          const cloudinaryName = await upload({
            imagePath: path.join(
              path.dirname(filename),
              data.exports.meta.image,
            ),
            uploadFolder: 'lwj',
          });

          cloudinaryUrl = getImageUrl({
            fileName: cloudinaryName,
            uploadFolder: 'lwj',
            transformations: 'f_auto,q_auto,w_1600,h_900,c_fill',
          });
        }

        await setDataForSlug(`/blog/${data.exports.meta.slug}`, {
          component: {
            mode: 'source',
            value: compiledMdx,
          },
          data: { meta: data.exports.meta, image: cloudinaryUrl },
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
        topic,
        episodes: filteredEpisodes,
      },
    });
  });

  await Promise.all(
    schedule.map((episode) => {
      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: scheduledEpisodeComponent,
        },
        data: { episode },
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
        schedule,
      },
    }),
  ]);

  await Promise.all(
    episodesWithMarkdown.map((episode) => {
      if (!episode.youtubeID) {
        return Promise.resolve();
      }

      return setDataForSlug(`/${episode.slug.current}`, {
        component: {
          mode: 'source',
          value: episodeComponent,
        },
        data: {
          episode,
        },
      });
    }),
  );
};
