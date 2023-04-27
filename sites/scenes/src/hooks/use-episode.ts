import { useEffect, useState } from 'react';

export type Episode = {
	title: string;
	slug: string;
	guest: {
		name: string;
		twitter: string;
	};
	host: {
		name: string;
		twitter: string;
	};
};

export function useEpisode() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [episode, setEpisode] = useState<Episode | undefined>();

	useEffect(() => {
		async function loadEpisode() {
			if (!loading || episode) return;

			const nextEpisode = await fetch(
				'https://www.learnwithjason.dev/api/v2/schedule'
			)
				.then((res) => res.json())
				.then((episodes) => {
					return episodes.filter((e: any) => new Date(e.date) >= new Date());
				})
				.then((episodes) => episodes[0])
				.catch((err) => {
					setError(err);
					setLoading(false);
				});

			setLoading(false);
			setEpisode({
				title: nextEpisode.title,
				slug: nextEpisode.slug,
				guest: {
					name: nextEpisode.guest.name,
					twitter: nextEpisode.guest.twitter,
				},
				host: {
					name: nextEpisode.host.name,
					twitter: nextEpisode.host.twitter,
				},
			});
		}

		loadEpisode();
	}, []);

	return { episode, loading, error };
}
