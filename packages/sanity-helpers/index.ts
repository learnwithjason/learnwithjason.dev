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

const COMMON_EPISODE_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  "uri": "https://www.learnwithjason.dev/" + slug.current,
  date,
  description,
  guest[0]-> {
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
  },
  "tags": coalesce(episodeTags[]-> {
    label,
    "slug": slug.current,
    "uri": "https://www.learnwithjason.dev/topic/" + slug.current
  }, []),
`;

const PUBLISHED_EPISODE_FIELDS = `
  ${COMMON_EPISODE_FIELDS}
  "youtube": {
    "uri": "https://youtu.be/" + youtubeID,
    "id": youtubeID,
  },
  "links": {
    demo,
    repo,
    "resources": links
  },
`;

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
	return sanityFetch({
		query: `
      *[_type == "episode" && hidden == false && date < now() && defined(youtubeID)] {
        ${PUBLISHED_EPISODE_FIELDS}
      } | order(date desc)
    `,
		cdn,
	});
}

export function loadFeaturedEpisodes({
	cdn = true,
}): Promise<SanityFetchResponse> {
	return sanityFetch({
		query: `
    *[_type == "episode" && hidden == false && date < now() && defined(youtubeID) && featured == true][0..7] {
        ${PUBLISHED_EPISODE_FIELDS}
      } | order(date desc)
    `,
		cdn,
	});
}

export function loadEpisodeBySlug({
	slug,
	transcript = false,
	cdn = true,
}: {
	slug: string;
	transcript?: boolean;
	cdn?: boolean;
}): Promise<SanityFetchResponse> {
	return sanityFetch({
		query: `
      *[_type == "episode" && slug.current == $slug][0] {
        ${PUBLISHED_EPISODE_FIELDS}
        ${transcript ? 'transcript' : ''}
      }
    `,
		cdn,
		variables: { slug },
	});
}

export function loadSchedule({ cdn = true }: { cdn?: boolean }) {
	return sanityFetch({
		query: `
      *[_type == "episode" && hidden == false && date > now()] {
        ${COMMON_EPISODE_FIELDS}
      } | order(date asc)
    `,
		cdn,
	});
}

export function loadTagBySlug({
	slug,
	cdn = true,
}: {
	slug: string;
	cdn?: boolean;
}) {
	return sanityFetch({
		query: `
      *[_type == "episodeTag" && slug.current == $slug] {
        _id,
        label,
        "slug": slug.current,
        "uri": "https://www.learnwithjason.dev/topic/" + slug.current,
        "episodes": *[_type == "episode" && hidden == false && date < now() && defined(youtubeID) && references(^._id)] {
          ${COMMON_EPISODE_FIELDS}
        }
      }
    `,
		variables: { slug },
		cdn,
	});
}
