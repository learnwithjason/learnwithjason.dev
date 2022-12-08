import { VideoContainer } from './video-container';
import { useEpisode } from '../hooks/use-episode';

export function OneUpVideo({ size = 'monologue' }) {
	const { episode, loading } = useEpisode();

	const host = loading ? { name: '', twitter: '' } : episode?.host;

	return (
		<VideoContainer name={host?.name} twitter={host?.twitter} size={size} />
	);
}
