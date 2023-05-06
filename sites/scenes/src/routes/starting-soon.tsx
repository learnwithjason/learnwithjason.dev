import { useEpisode } from '../hooks/use-episode';
import styles from './starting-soon.module.css';

export function StartingSoon() {
	const { episode, loading } = useEpisode();

	return loading ? null : (
		<div className={styles.wrapper}>
			<img
				className={styles.image}
				src={`https://www.learnwithjason.dev/${episode?.slug}/poster.jpg`}
				alt={episode?.title}
			/>
		</div>
	);
}
