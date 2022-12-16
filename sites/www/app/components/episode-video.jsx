import { useState } from 'react';
import { EpisodePoster } from './episode-poster.jsx';
import { getTeacher } from '../util/get-teacher.js';

export function EpisodeVideo({ episode, includePlaylist = true }) {
	const [playing, setPlaying] = useState(false);

	const host = getTeacher(episode.host);
	const teacher = getTeacher(episode.guest);

	const url = new URL('https://www.youtube-nocookie.com/');

	url.pathname = `/embed/${episode.youtube.id}`;

	// apparently YT breaks playlists after 200 videos, so bail if we're above that limit
	if (includePlaylist) {
		url.searchParams.set('listType', 'playlist');
		url.searchParams.set('list', 'PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx');
	}

	url.searchParams.set('autoplay', '1');
	url.searchParams.set('rel', '0');

	return (
		<div className="episode-video">
			{playing ? (
				<div className="responsive-video-container">
					<iframe
						width="560"
						height="315"
						src={url}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			) : (
				<button onClick={() => setPlaying(true)} aria-label="play video">
					<EpisodePoster title={episode.title} host={host} teacher={teacher} />
				</button>
			)}
		</div>
	);
}
