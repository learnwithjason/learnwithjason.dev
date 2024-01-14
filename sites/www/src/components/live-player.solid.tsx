import type { Episode } from '@lwj/types';

import { createSignal, onCleanup, ParentComponent, Show } from 'solid-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Aside } from './aside.solid';
import { LiveTwitchEmbed } from './live-twitch-embed.solid';
import {
	getEpisodeLiveStatus,
	getEpisodeTimeDetails,
	isSoloEpisode,
} from '../util/twitch';

import styles from './live-player.module.css';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const EpisodeDetails: ParentComponent<{ isSolo: boolean; isOver?: boolean }> = (
	props
) => {
	return (
		<Aside>
			<p>
				<Show when={!props.isSolo}>
					{props.children} The recording will be uploaded to YouTube and
					embedded on this page once it’s ready (usually by Monday). You can
					bookmark this page and check back later, or{' '}
					<a href="/newsletter">subscribe to the newsletter</a> to be notified
					when it’s live.
				</Show>

				<Show when={props.isSolo}>
					<Show
						when={props.isOver}
						fallback={<strong>Can’t catch this session live?</strong>}
					>
						<>
							<strong>Did you miss this session?</strong>
						</>
					</Show>{' '}
					Jason goes live every Tuesday, so mark your calendar and catch him
					next time! These working sessions aren’t uploaded in full, but you can
					watch{' '}
					<a href="https://www.youtube.com/playlist?list=PLz8Iz-Fnk_eSBam1bi1NRGK5zTKvmo9Vd">
						the best moments on YouTube
					</a>
					.
				</Show>
			</p>
		</Aside>
	);
};

type LivePlayerProps = {
	episode: Episode;
	duration: number;
};

type EpisodeStatus = 'FUTURE' | 'LIVE' | 'ENDED';

export const LivePlayer: ParentComponent<LivePlayerProps> = (props) => {
	// For testing, use a hard-coded date for the now variable
	// const [now, setNow] = createSignal(
	// 	dayjs('2023-06-22T11:00:00').tz('America/Los_Angeles', true)
	// );
	const [now, setNow] = createSignal(dayjs());
	const [status, setStatus] = createSignal<EpisodeStatus>('FUTURE');
	const { start, end } = getEpisodeTimeDetails(props.episode);

	const timeUpdate = setInterval(() => {
		setNow(dayjs());
		setStatus(
			getEpisodeLiveStatus({ episode: props.episode, currentTime: now() })
		);
	}, 1000);
	onCleanup(() => clearInterval(timeUpdate));

	const isSolo = isSoloEpisode(props.episode);

	return (
		<div class={styles.playerWrap}>
			<Show when={status() === 'FUTURE'}>
				<h2 class={styles.headingLarge}>
					This episode airs {now().to(start)}!
				</h2>
				<div>{props.children}</div>
				<p class={styles.watchDetails}>
					You can watch it <a href="https://twitch.tv/jlengstorf">on Twitch</a>{' '}
					or in an embedded player that will appear on this page while the
					episode is live.{' '}
					<span
						title="Add to Calendar"
						class="addeventatc"
						data-styling="none"
						style={{
							color: 'var(--color-pink-text)',
							'text-decoration': 'underline',
						}}
					>
						Add it to your calendar
						<span class="start">{start.format('YYYY-MM-DD HH:mm')}</span>
						<span class="end">{end.format('YYYY-MM-DD HH:mm')}</span>
						<span class="timezone">{dayjs.tz.guess()}</span>
						<span class="title">{props.episode.title}</span>
						<span class="description">{props.episode.description}</span>
						<span class="location">https://twitch.tv/jlengstorf</span>
					</span>{' '}
					and join live to ask questions and hang out with the wonderful folks
					in the chat!
				</p>
				<EpisodeDetails isSolo={isSolo}>
					<strong>Can’t watch it live? Don’t worry!</strong> This episode will
					be recorded.
				</EpisodeDetails>
			</Show>

			<Show when={status() === 'LIVE'}>
				<h2 class={styles.headingLarge}>
					{isSolo ? 'Jason' : 'This episode'} is live right now!
				</h2>
				<details>
					<summary>Show episode details</summary>

					<div class={styles.details}>
						<div>{props.children}</div>
						<p class={styles.captions}>
							Captions are written by an actual human from{' '}
							<a href="https://whitecoatcaptioning.com/">
								White Coat Captioning
							</a>
						</p>
					</div>
				</details>
				<LiveTwitchEmbed />
				<EpisodeDetails isSolo={isSolo}>
					<strong>Can’t watch right now? Don’t worry!</strong> This episode is
					being recorded.
				</EpisodeDetails>
			</Show>

			<Show when={status() === 'ENDED'}>
				<div>{props.children}</div>
				<h2 class={styles.heading}>This episode aired {end.from(now())}.</h2>
				<p>We’re working on the recording now and it’ll be posted here soon.</p>
				<EpisodeDetails isSolo={isSolo} isOver={true}>
					<strong>Did you miss this episode live? Don’t worry!</strong> This
					episode was recorded.
				</EpisodeDetails>
			</Show>
		</div>
	);
};
