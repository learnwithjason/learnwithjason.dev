import type { Episode } from '@lwj/types';

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
interface SanityFetchEpisodeByTopicProps {
	query: string;
	cdn: boolean;
	variables: { topic: string };
}

type SanityFetchProps =
	| SanityFetchAllEpisodesProps
	| SanityFetchEpisodeByTopicProps
	| SanityFetchEpisodeBySlugProps;

type SanityFetchResponseEpisodeSingle = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: Episode;
	};
};

type SanityFetchResponseEpisodeList = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: Episode[];
	};
};

type SanityFetchResponseEpisodeTranscript = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: {
			transcript: string;
		};
	};
};

type SanityFetchResponseTag = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: {
			details: {
				description: string;
				label: string;
				slug: string;
				uri: string;
			};
			episodes: Episode[];
		};
	};
};

type SanityFetchResponseTags = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: {
			_id: string;
			label: string;
			slug: string;
		}[];
	};
};

type SanityFetchResponseRelatedEpisodes = {
	error: false | { statusCode: number; message: string };
	data?: {
		result: {
			related: (Episode & { count: number })[];
		};
	};
};

type SanityFetchResponse =
	| SanityFetchResponseEpisodeList
	| SanityFetchResponseEpisodeSingle
	| SanityFetchResponseEpisodeTranscript
	| SanityFetchResponseTag
	| SanityFetchResponseTags;

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
			if (['slug', 'topic'].includes(key)) {
				// @ts-ignore I can’t be bothered to deal with the keyof stuff; this is fine
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

export function loadAllEpisodes({
	includeRelatedEpisodes = false,
	includeTranscript = false,
	cdn = true,
} = {}): Promise<SanityFetchResponseEpisodeList> {
	return sanityFetch({
		query: `
      *[_type == "episode" && hidden == false && date < now() && defined(youtubeID)] {
        ${PUBLISHED_EPISODE_FIELDS}
        ${
					includeRelatedEpisodes
						? `
              "related": *[_type == "episode" && slug.current != ^.slug.current && references(^.episodeTags[]->._id)] {
                title,
                "slug": slug.current,
                "uri": "https://www.learnwithjason.dev/" + slug.current,
                guest[0]-> {
                  ...(guestImage {
                    ...(asset-> {
                      "image": url
                    })
                  }),
                  name,
                  twitter,
                },
                "count": count((episodeTags[]->slug.current)[@ in ^.^.episodeTags[]->.slug.current]),
              } | order(count desc)[0..3],
            `
						: ''
				}
        ${includeTranscript ? 'transcript,' : ''}
      } | order(date desc)
    `,
		cdn,
	}) as Promise<SanityFetchResponseEpisodeList>;
}

export function loadFeaturedEpisodes({
	cdn = true,
}): Promise<SanityFetchResponseEpisodeList> {
	return sanityFetch({
		query: `
      *[_type == "episode" && hidden == false && date < now() && defined(youtubeID) && featured == true][0..7] {
          ${PUBLISHED_EPISODE_FIELDS}
        } | order(date desc)
    `,
		cdn,
	}) as Promise<SanityFetchResponseEpisodeList>;
}

export function loadEpisodesByTopic({
	topic,
	cdn = true,
}: {
	topic: string;
	cdn?: boolean;
}): Promise<SanityFetchResponseTag> {
	if (!topic) {
		return Promise.resolve({
			error: {
				statusCode: 400,
				message: 'Topic is required',
			},
		});
	}

	return sanityFetch({
		query: `
      *[_type == "episodeTag" && slug.current == $topic][0] {
        "details": {
          label,
          description,
          "slug": slug.current,
          "uri": "https://www.learnwithjason.dev/topic/" + slug.current,
        },
        "episodes": *[_type == "episode" && references(^._id) && hidden == false && defined(youtubeID)] {
          ${PUBLISHED_EPISODE_FIELDS}
        } | order(date desc),
      }
    `,
		variables: {
			topic,
		},
		cdn,
	}) as Promise<SanityFetchResponseTag>;
}

export function loadEpisodeBySlug({
	slug,
	transcript = false,
	cdn = true,
}: {
	slug: string;
	transcript?: boolean;
	cdn?: boolean;
}): Promise<SanityFetchResponseEpisodeSingle> {
	return sanityFetch({
		query: `
      *[_type == "episode" && slug.current == $slug][0] {
        ${PUBLISHED_EPISODE_FIELDS}
        ${transcript ? 'transcript' : ''}
      }
    `,
		cdn,
		variables: { slug },
	}) as Promise<SanityFetchResponseEpisodeSingle>;
}

export function getRelatedEpisodes({
	slug,
	cdn = true,
}: {
	slug: string;
	cdn?: boolean;
}): Promise<SanityFetchResponseRelatedEpisodes> {
	return sanityFetch({
		query: `
      *[_type == "episode" && slug.current == $slug][0] {
        "related": *[_type == "episode" && slug.current != ^.slug.current && references(^.episodeTags[]->._id)] {
          title,
          "slug": slug.current,
          "uri": "https://www.learnwithjason.dev/" + slug.current,
          guest[0]-> {
            ...(guestImage {
              ...(asset-> {
                "image": url
              })
            }),
            name,
            twitter,
          },
          "count": count((episodeTags[]->slug.current)[@ in ^.^.episodeTags[]->.slug.current]),
        } | order(count desc)[0..3]
      }
    `,
		variables: { slug },
		cdn,
	}) as Promise<SanityFetchResponseRelatedEpisodes>;
}

export function getEpisodeTranscript({
	slug,
	cdn = true,
}: {
	slug: string;
	cdn?: boolean;
}): Promise<SanityFetchResponseEpisodeTranscript> {
	return sanityFetch({
		query: `
      *[_type == "episode" && slug.current == $slug][0] {
        transcript
      }
    `,
		variables: { slug },
		cdn,
	}) as Promise<SanityFetchResponseEpisodeTranscript>;
}

export function loadSchedule({
	cdn = true,
}: { cdn?: boolean } = {}): Promise<SanityFetchResponseEpisodeList> {
	// load episodes that start after 3 hours before now
	// (so we don’t miss in-progress episodes)
	return sanityFetch({
		query: `
      *[_type == "episode" && hidden == false && dateTime(date) > dateTime(now()) - 60 * 60 * 3] {
        ${COMMON_EPISODE_FIELDS}
      } | order(date asc)
    `,
		cdn,
	}) as Promise<SanityFetchResponseEpisodeList>;
}

export async function loadAllTags({ cdn = true }: { cdn?: boolean } = {}) {
	return sanityFetch({
		query: `
      *[_type == "episodeTag"] {
        _id,
        label,
        "slug": slug.current,
      }
    `,
		cdn,
	}) as Promise<SanityFetchResponseTags>;
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
