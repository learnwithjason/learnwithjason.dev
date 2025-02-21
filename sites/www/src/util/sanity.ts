import { createClient } from '@sanity/client';
import groq from 'groq';

const client = createClient({
	projectId: 'vnkupgyb',
	dataset: 'develop',
	apiVersion: '2024-08-10',
	perspective: 'published',
	useCdn: true,
});

const getLatestEpisodeQuery = groq`
  *[_type=="series" && slug.current == "learn-with-jason"] {
    "latestEpisode": *[_type=="episode" && hidden != true && slug != null] {
      title,
      'slug': slug.current,
      description,
      "guest": people[name != "Jason Lengstorf"][0]-> {
        name
      },
      publish_date,
      "youtube_id": video.youtube_id
    } | order(publish_date desc)[0]
  } | order(publish_date desc)[0]
`;

const getNextEpisodeQuery = groq`
  *[_type=="series" && slug.current == "learn-with-jason"] {
    "nextEpisode": *[dateTime(@->publish_date) > dateTime(now()) && !defined(@->video.youtube_id) && !defined(@->video.mux_video) && @->hidden != true] {
      title,
      'slug': slug.current,
      description,
      "guest": people[name != "Jason Lengstorf"][0]-> {
        name
      },
      publish_date,
      "youtube_id": video.youtube_id
    } | order(publish_date desc)[0]
  } | order(publish_date desc)[0]
`;

export async function getLatestEpisode() {
	const result = await client.fetch(
		getLatestEpisodeQuery,
		{},
		{ useCdn: true },
	);

	return result.latestEpisode;
}

export async function getNextEpisode() {
	const result = await client.fetch(
		getNextEpisodeQuery,
		{},
		{
			useCdn: true,
		},
	);

	return result.nextEpisode;
}
