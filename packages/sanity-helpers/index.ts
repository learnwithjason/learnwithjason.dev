const SANITY_PROJECT_ID = 'vnkupgyb';

interface SanityFetchAllEpisodesProps {
	query: string;
	variables?: never;
	cdn: boolean;
}

interface SanityFetchEpisodeBySlugProps {
	query: string;
	cdn: boolean;
	variables: { slug: string };
}

type SanityFetchProps =
	| SanityFetchAllEpisodesProps
	| SanityFetchEpisodeBySlugProps;

type SanityFetchResponse = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: object;
	};
};

export async function sanityFetch({
	query,
	variables,
	cdn = true,
}: SanityFetchProps): Promise<SanityFetchResponse> {
	const subdomain = cdn === false ? 'api' : 'apicdn';
	const apiUrl = new URL(`https://${SANITY_PROJECT_ID}.${subdomain}.sanity.io`);
	apiUrl.pathname = '/v2021-10-21/data/query/production';
	apiUrl.searchParams.set('query', query);

	if (variables) {
		Object.keys(variables).forEach((key) => {
			if (key === 'slug') {
				apiUrl.searchParams.set(`$${key}`, `"${variables[key]}"`);
			}
		});
	}

	console.log(apiUrl.toString());

	const res = await fetch(apiUrl.toString());

	if (!res.ok) {
		console.error(res);
		return {
			error: {
				statusCode: 500,
				message: 'unable to query data',
			},
		};
	}

	const data = await res.json();

	return { error: false, data };
}

export function loadAllEpisodes({ cdn = true }): Promise<SanityFetchResponse> {
	const query = `
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

	return sanityFetch({ query, cdn });
}

export function loadEpisodeBySlug({
	slug,
	cdn = true,
}: {
	slug: string;
	cdn?: boolean;
}): Promise<SanityFetchResponse> {
	const query = `
    *[_type == "episode" && slug.current == $slug][0] {
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
    }
`;

	return sanityFetch({ query, cdn, variables: { slug } });
}
