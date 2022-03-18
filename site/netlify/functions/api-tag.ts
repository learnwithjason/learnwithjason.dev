import { builder, Handler } from '@netlify/functions';
import { hasuraRequest } from './util/hasura';

const handlerFn: Handler = async (event) => {
  const { path } = event;
  let [, tagName] = path.replace(new RegExp('/api/tag'), '').split('/');

  const tagPromise = hasuraRequest({
    query: `
      query GetTag($tag: String!) {
        tag: allEpisodeTag(where: {slug: {current: {eq: $tag}}}) {
          label
          slug {
            current
          }
          description
        }
      }
    `,
    variables: {
      tag: tagName,
    },
  });

  const tagData = await tagPromise;

  const [tag] = tagData.tag;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tag),
  };
};

export const handler = builder(handlerFn);
