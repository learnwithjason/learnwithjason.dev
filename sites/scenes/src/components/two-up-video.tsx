import { VideoContainer } from '../components/video-container';
import { useEpisode } from '../hooks/use-episode';

export function TwoUpVideo({ size = 'interview' }) {
	const { episode, loading } = useEpisode();

	const host = loading ? { name: '', twitter: '' } : episode?.host;
	const guest = loading ? { name: '', twitter: '' } : episode?.guest;

	return (
		<>
			<VideoContainer name={host?.name} twitter={host?.twitter} size={size} />
			<VideoContainer name={guest?.name} twitter={guest?.twitter} size={size} />
		</>
	);
}
