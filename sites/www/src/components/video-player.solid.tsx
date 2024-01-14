import type { Episode } from '@lwj/types';
import { createSignal, mergeProps } from 'solid-js';
import { Poster } from './poster.solid';

type VideoPlayerProps = {
	episode: Episode;
	includePlaylist?: boolean;
	width?: number;
	height?: number;
};

export const VideoPlayer = (rawProps: VideoPlayerProps) => {
	const props = mergeProps(
		{ includePlaylist: true, width: 500, height: 280 },
		rawProps
	);
	const [playing, setPlaying] = createSignal(false);

	const url = new URL('https://www.youtube-nocookie.com/');
	url.pathname = `/embed/${props.episode.youtube.id}`;

	// TODO figure out if this can be done reliably — for now skip the playlist
	// apparently YT breaks playlists after 200 videos, so bail if we're above that limit
	// if (props.includePlaylist) {
	// 	url.searchParams.set('listType', 'playlist');
	// 	url.searchParams.set('list', 'PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx');
	// }

	url.searchParams.set('autoplay', '1');
	url.searchParams.set('rel', '0');

	return (
		<div class="episode-video">
			<div class="embed-container">
				{playing() ? (
					<iframe
						title={props.episode.title}
						width={props.width}
						height={props.height}
						src={url.toString()}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				) : (
					<button onClick={() => setPlaying(true)} aria-label="play video">
						<Poster
							slug={props.episode.slug}
							title={props.episode.title}
							guest={props.episode.guest}
							height={props.height}
							width={props.width}
						/>
					</button>
				)}
			</div>
		</div>
	);
};
