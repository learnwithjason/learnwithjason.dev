import { Outlet } from 'react-router-dom';
import { Logo } from '@lwj/design-system';
import { TwitchChat } from '@socket-studio/react';

import { MessageRotator } from './message-rotator';
import { useEpisode } from '../hooks/use-episode';

import styles from './layout.module.css';

export function Layout() {
	const { episode, loading } = useEpisode();

	const heading = loading ? 'Loading...' : episode?.title;

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Outlet />
			</div>
			<div className={styles.lowerThird}>
				<div className={styles.logoWrapper}>
					<Logo className={styles.logo} />
				</div>
				<div className={styles.episodeDetails}>
					<div className={styles.detailsWrapper}>
						<h1 className={styles.heading}>{heading}</h1>
						<MessageRotator />
					</div>
				</div>
				<div className={styles.chatWrapper}>
					<TwitchChat username="jlengstorf" />
				</div>
			</div>
		</div>
	);
}
