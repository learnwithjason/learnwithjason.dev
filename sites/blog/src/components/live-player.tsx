import type { Episode } from '@lwj/types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createEffect } from 'solid-js';
import { Aside } from './aside';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

type LivePlayerProps = {
	episode: Episode;
	duration: number;
};

export const LivePlayer = (props: LivePlayerProps) => {
	// For testing, use a hard-coded date for the now variable
	// const now = dayjs('2023-05-24T10:00:00').tz('America/Los_Angeles', true);
	const now = dayjs();

	const tz = dayjs.tz.guess();
	const start = dayjs(props.episode.date).tz(tz);
	const end = start.add(props.duration, 'minutes').tz(tz);

	const isSolo = props.episode.guest.name === 'Jason Lengstorf';

	const state = {
		BEFORE: start.isAfter(now),
		LIVE: start.isBefore(now) && end.isAfter(now),
		OVER: end.isBefore(now),
	};

	console.log(now);

	createEffect(() => {
		if (!state.LIVE) {
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://embed.twitch.tv/embed/v1.js';

		script.onload = () => {
			// @ts-ignore Twitch is globally defined by the above embed script
			if (!Twitch) {
				return;
			}

			// @ts-ignore
			new Twitch.Embed('twitch-embed', {
				channel: 'jlengstorf',
				parent: ['www.learnwithjason.dev'],
				width: '100%',
				height: 600,
				theme: 'light',
			});
		};

		document.querySelector('body')?.appendChild(script);
	});

	return (
		<div style={{ 'margin-block-start': '2rem' }}>
			{state.BEFORE ? (
				<>
					<h3>This episode airs in {dayjs().to(start)}!</h3>
					<p>
						You can watch it{' '}
						<a href="https://twitch.tv/jlengstorf">on Twitch</a> or in an
						embedded player that will appear on this page while the episode is
						live.{' '}
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
							<span class="timezone">{tz}</span>
							<span class="title">{props.episode.title}</span>
							<span class="description">{props.episode.description}</span>
							<span class="location">https://twitch.tv/jlengstorf</span>
						</span>{' '}
						and join live to ask questions and hang out with the wonderful folks
						in the chat!
					</p>
				</>
			) : null}

			{state.LIVE ? (
				<>
					<h3>{isSolo ? 'Jason' : 'This episode'} is live right now!</h3>
					<div id="twitch-embed" />
					<p class="live-captions-credits">
						Live captioning by{' '}
						<a href="https://whitecoatcaptioning.com/">White Coat Captioning</a>
					</p>
				</>
			) : null}

			{state.OVER && !isSolo ? (
				<>
					<h3>This episode aired {dayjs().from(end)}.</h3>
					<p>
						We’re working on the recording now and it’ll be posted here soon.
					</p>
				</>
			) : null}

			{!isSolo ? (
				<Aside>
					{state.BEFORE ? (
						<>
							<strong>Can’t watch it live? Don’t worry!</strong> This episode
							will be recorded.
						</>
					) : null}
					{state.LIVE ? (
						<>
							<strong>Can’t watch right now? Don’t worry!</strong> This episode
							is being recorded.
						</>
					) : null}
					{state.OVER ? (
						<>
							<strong>Did you miss this episode live? Don’t worry!</strong> This
							episode was recorded.
						</>
					) : null}{' '}
					The recording will be uploaded to YouTube and embedded on this page
					once it’s ready (usually by Monday). You can bookmark this page and
					check back later, or{' '}
					<a href="/newsletter">subscribe to the newsletter</a> to be notified
					when it’s live.
				</Aside>
			) : (
				<Aside>
					{state.OVER ? (
						<>
							<strong>Did you miss this session?</strong>
						</>
					) : (
						<>
							<strong>Can’t catch this session live?</strong>
						</>
					)}{' '}
					Jason goes live every Tuesday, so mark your calendar and catch him
					next time! These working sessions aren’t uploaded in full, but you can
					watch{' '}
					<a href="https://www.youtube.com/playlist?list=PLz8Iz-Fnk_eSBam1bi1NRGK5zTKvmo9Vd">
						the best moments on YouTube
					</a>
					.
				</Aside>
			)}
		</div>
	);
};
