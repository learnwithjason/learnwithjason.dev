import { Handler, builder } from '@netlify/functions';

const GROQ_QUERY = `
  *[_type == "episode" && hidden == false && date < now() && defined(youtubeID)] {
    title,
    slug,
    date,
    demo,
    repo,
    description,
    youtubeID,
    links,
    guest[]-> {
      ...(guestImage {
          ...(asset-> {
            "image": url
          })
      }),
      name,
      twitter,
    },
    host-> {
      ...(guestImage {
          ...(asset-> {
            "image": url
          })
      }),
      name,
      twitter,
    }
  } | order(date)
`;

const SANITY_PROJECT_ID = 'vnkupgyb';

const loadAllEpisodes: Handler = async (req) => {
	const params = req.queryStringParameters;
	const subdomain = params?.cdn === 'false' ? 'api' : 'apicdn';
	const apiUrl = `https://${SANITY_PROJECT_ID}.${subdomain}.sanity.io/v2021-10-21`;

	const res = await fetch(
		`${apiUrl}/data/query/production?query=${encodeURIComponent(GROQ_QUERY)}`
	);

	if (!res.ok) {
		console.error(res);
		return {
			statusCode: 500,
			body: 'unable to query data',
		};
	}

	const data = await res.json();

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf8',
		},
		body: JSON.stringify(data.result, null, 2),
	};
};

export const handler = builder(loadAllEpisodes);
