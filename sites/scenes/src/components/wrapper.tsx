import type { ReactElement } from 'react';
import { Logo } from '@lwj/design-system';
import { MessageRotator } from './message-rotator';
import styles from './wrapper.module.css';

export function Wrapper({ children }: { children: ReactElement }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>{children}</div>
			<div className={styles.lowerThird}>
				<div className={styles.logoWrapper}>
					<Logo className={styles.logo} />
				</div>
				<div className={styles.episodeDetails}>
					<MessageRotator />
				</div>
				<div className={styles.chatWrapper}>chat</div>
			</div>
		</div>
	);
}
