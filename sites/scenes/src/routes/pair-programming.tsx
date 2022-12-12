import { TwoUpVideo } from '../components/two-up-video';
import styles from './pair-programming.module.css';

export function PairProgramming() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.screen} />
			<div className={styles.videos}>
				<TwoUpVideo size="sidebar" />
			</div>
		</div>
	);
}
