import type { CSSProperties } from 'react';
import styles from './video-container.module.css';

export function VideoContainer({
	name = 'Jason Lengstorf',
	twitter = 'jlengstorf',
	size = 'interview',
}) {
	return (
		<figure className={styles.wrapper} data-size={size}>
			<div className={styles.videoWrapper}>
				<div className={styles.video} />
			</div>

			<figcaption className={styles.nameWrapper}>
				<div className={styles.nameCard}>
					<span className={styles.guest}>{name}</span>
				</div>
			</figcaption>
		</figure>
	);
}
