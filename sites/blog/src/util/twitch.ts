import type { Episode } from '@lwj/types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export function isSoloEpisode(episode: Episode) {
	return episode.guest.name === 'Jason Lengstorf';
}

export function getEpisodeTimeDetails(episode: Episode) {
	const tz = dayjs.tz.guess();

	const isSolo = isSoloEpisode(episode);
	const duration = isSolo ? 180 : 90;

	const start = dayjs(episode.date).tz(tz);
	// const start = dayjs('2023-06-17T11:22:00').tz(tz);
	const end = start.add(duration, 'minutes').tz(tz);

	return { start, end, duration };
}

export function getEpisodeLiveStatus({
	episode,
	currentTime,
}: {
	episode: Episode;
	currentTime: dayjs.Dayjs;
}) {
	const { start, end } = getEpisodeTimeDetails(episode);

	if (start.isAfter(currentTime)) {
		return 'FUTURE';
	}

	if (start.isBefore(currentTime) && end.isAfter(currentTime)) {
		return 'LIVE';
	}

	return 'ENDED';
}
