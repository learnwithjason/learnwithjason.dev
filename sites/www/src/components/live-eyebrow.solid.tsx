import type { Episode } from '@lwj/types';

import { Show, createSignal, onCleanup } from 'solid-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getEpisodeLiveStatus, getEpisodeTimeDetails } from '../util/twitch';

import styles from './live-eyebrow.module.css';

dayjs.extend(utc);
dayjs.extend(timezone);

export const LiveEyebrow = (props: { schedule: Episode[] }) => {
	const [now, setNow] = createSignal(dayjs());
	const details = props.schedule
		.map((episode) => {
			return {
				episode,
				...getEpisodeTimeDetails(episode),
				status: getEpisodeLiveStatus({ episode, currentTime: now() }),
			};
		})
		.find((ep) => ep.status !== 'ENDED');

	const timeUpdate = setInterval(() => setNow(dayjs()), 1000);
	onCleanup(() => clearInterval(timeUpdate));

	if (!details?.episode || details.status !== 'LIVE') {
		return null;
	}

	const [nextEpisode] = createSignal<Episode>(details.episode);
	const [status] = createSignal<'LIVE' | 'FUTURE'>(details.status);

	return (
		<Show when={status() === 'LIVE'}>
			<div class={styles.eyebrow}>
				<span class={styles.lede}>
					“{nextEpisode().title}” is live right now!
				</span>{' '}
				<a href="https://twitch.tv/jlengstorf" class={styles.link}>
					Watch Live
				</a>
			</div>
		</Show>
	);
};
