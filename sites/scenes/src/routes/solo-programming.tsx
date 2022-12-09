import { Bubble } from '@lwj/design-system/components/bubble';
import { OneUpVideo } from '../components/one-up-video';
import styles from './solo-programming.module.css';

export function SoloProgramming() {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.screen} />
				<div className={styles.videos}>
					<OneUpVideo size="sidebar-solo" />
				</div>
			</div>
		</>
	);
}
