import type { CSSProperties } from 'react';
import styles from './bubble.module.css';

export function Bubble({ left = 10, top = 10, diameter = 40 }) {
	return (
		<div
			className={styles.outer}
			style={
				{
					left,
					top,
					width: diameter,
					'--animation-delay': `-${Math.round(Math.random() * 10)}s`,
				} as CSSProperties
			}
		>
			<div className={styles.inner} />
		</div>
	);
}
