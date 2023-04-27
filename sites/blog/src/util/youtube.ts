import Parser from 'rss-parser';

const parser = new Parser({
	customFields: {
		item: ['media:group', 'yt:videoId'],
	},
});

type LoadPlaylistProps = {
	playlistId: string;
};

export async function loadYouTubePlaylist({ playlistId }: LoadPlaylistProps) {
	const feed = await parser.parseURL(
		`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
	);

	return feed.items.map((item) => {
		return {
			title: item.title,
			thumbnail: `https://res.cloudinary.com/jlengstorf/image/fetch/f_auto,q_auto,w_400/https://img.youtube.com/vi/${item['yt:videoId']}/maxresdefault.jpg`,
			url: item.link,
		};
	});
}
