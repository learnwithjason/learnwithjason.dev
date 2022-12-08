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
					<span className={styles.twitter}>
						<svg
							className={styles.twitterLogo}
							width="29"
							height="22"
							viewBox="0 0 29 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.2644 5.47684C25.2809 5.71553 25.2809 5.95421 25.2809 6.1951C25.2809 13.5349 19.6932 22 9.47599 22V21.9956C6.45778 22 3.50227 21.1355 0.961426 19.5054C1.4003 19.5582 1.84137 19.5846 2.28354 19.5857C4.78479 19.5879 7.21453 18.7486 9.18231 17.2032C6.80536 17.1581 4.72099 15.6083 3.99283 13.3457C4.82548 13.5063 5.68343 13.4733 6.50068 13.2501C3.90924 12.7265 2.04486 10.4496 2.04486 7.8054C2.04486 7.7812 2.04486 7.7581 2.04486 7.735C2.81701 8.16507 3.68155 8.40376 4.5659 8.43016C2.12515 6.79896 1.3728 3.55196 2.84671 1.01332C5.66693 4.48361 9.82797 6.59327 14.2948 6.81656C13.8471 4.88728 14.4587 2.86561 15.9018 1.50939C18.139 -0.593674 21.6577 -0.485881 23.7608 1.75028C25.0048 1.50499 26.1971 1.04852 27.2883 0.401763C26.8736 1.68758 26.0057 2.77981 24.8464 3.47387C25.9475 3.34408 27.0232 3.0493 28.0362 2.59942C27.2905 3.71695 26.3511 4.69039 25.2644 5.47684Z"
								fill="currentColor"
							/>
						</svg>
						@{twitter}
					</span>
				</div>
			</figcaption>
		</figure>
	);
}
