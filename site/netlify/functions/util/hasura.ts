import fetch from 'node-fetch';

type FetchResult = {
  data?: any;
  errors?: any;
};

export const hasuraRequest = async function ({
  query,
  variables = {},
}: {
  query: string;
  variables?: object;
}) {
  const result: FetchResult = await fetch(process.env.HASURA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

  if (!result || !result.data) {
    console.error(result);
    return [];
  }

  return result.data;
};
