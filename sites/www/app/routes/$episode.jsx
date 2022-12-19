import { useLoaderData, useParams } from '@remix-run/react';
import { marked } from 'marked';
import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';

import { loadFromApi } from '~/util/fetch-api.server.js';
import { getTeacher } from '~/util/get-teacher.js';
import { EpisodePosted } from '~/components/episode-posted.jsx';
import { EpisodeScheduled } from '~/components/episode-scheduled.jsx';
import { WrapperPage } from '~/mdx/wrapper-page.jsx';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export function CatchBoundary() {
	const params = useParams();

	return (
		<WrapperPage title="Not Found" description="">
			<h1>Not Found</h1>
			<p>
				The page you requested doesn’t exist. Try pressing <code>command</code>{' '}
				+ <code>K</code> or clicking search in the top navigation to find what
				you’re looking for.
			</p>
			<p>
				If you want to let us know about this broken link,{' '}
				<a
					href={`https://github.com/learnwithjason/learnwithjason.dev/issues/new?title=Broken+link:+/${params.episode}&body=This+link+resulted+in+a+404:+https://www.learnwithjason.dev/${params.episode}&labels=bug`}
				>
					please open an issue on GitHub
				</a>
				.
			</p>
		</WrapperPage>
	);
}

export const loader = async ({ params }) => {
	const slug = params.episode;

	if (slug.endsWith('.json')) {
		const endpoint = `/api/v2/episode/${slug.replace('.json', '')}`;

		return new Response(`Redirecting to ${endpoint}`, {
			status: 301,
			headers: {
				Location: endpoint,
			},
		});
	}

	const episode = await loadFromApi(`/api/v2/episode/${slug}`);

	if (!episode || !episode.title) {
		throw new Response('Not Found', {
			status: 404,
		});
	}

	const scheduleDescription = `${dayjs(episode.date).format(
		'MMMM D @ h:mm A z'
	)} — ${episode.description}`;

	const transcriptHtml = episode.transcript
		? marked.parse(episode.transcript)
		: false;

	const startDate = dayjs(episode.date).toISOString();
	const endDate = dayjs(episode.date).add(90, 'minutes').toISOString();

	const host = getTeacher(episode.host);
	const teacher = getTeacher(episode.guest);

	return {
		...episode,
		startDate,
		endDate,
		host,
		teacher,
		scheduleDescription,
		transcriptHtml,
	};
};

export function meta({ data: episode }) {
	if (!episode || !episode.title) {
		return;
	}

	const description = `${dayjs(episode.date).format('MMMM D @ h:mm A z')} — ${
		episode.description
	}`;

	const poster = episode.youtubeID
		? `https://www.learnwithjason.dev/${episode.slug}/poster.jpg`
		: `https://www.learnwithjason.dev/${episode.slug}/schedule.jpg`;

	return {
		title: episode.title,
		description,
		image: poster,
		'og:type': 'video.other',
		'og:url': `https://www.learnwithjason.dev/${episode.slug}`,
		'og:description': description,
		'og:image': poster,
		'twitter:dnt': 'on',
		'twitter:card': 'summary_large_image',
		'twitter:creator': '@LWJShow',
		'twitter:title': episode.title,
		'twitter:description': description,
		'twitter:image': poster,
	};
}

export default function EpisodeTemplate() {
	const episode = useLoaderData();

	let includePlaylist = true;
	if (dayjs(episode.startDate).isBefore(dayjs().subtract(100, 'week'))) {
		includePlaylist = false;
	}

	if (episode.youtube.id) {
		return (
			<EpisodePosted
				includePlaylist={includePlaylist}
				episode={episode}
				host={episode.host}
				teacher={episode.teacher}
			/>
		);
	}

	return (
		<EpisodeScheduled
			episode={episode}
			host={episode.host}
			teacher={episode.teacher}
		/>
	);
}
