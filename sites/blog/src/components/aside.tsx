import styles from './aside.module.css';

export function Aside({ children }) {
	return (
		<aside className={styles.aside}>
			<div className={styles.icon}>
				<svg
					width="23"
					height="19"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M.405 15.91C-.46 17.24.495 19 2.082 19h18.63c1.586 0 2.54-1.76 1.676-3.09L13.073 1.58a2 2 0 00-3.353 0L.405 15.91zm2.18.317a.5.5 0 00.418.773H19.79a.5.5 0 00.42-.773L11.815 3.315a.5.5 0 00-.839 0L2.584 16.227z"
						fill="#C10B7E"
					/>
					<path
						d="M9.397 7v.291l1.287 5.038h1.452l1.26-5.038V7h-4zm2.013 9c.466 0 .863-.152 1.192-.456.329-.303.493-.67.493-1.101 0-.43-.164-.797-.493-1.101a1.693 1.693 0 00-1.192-.456c-.465 0-.863.152-1.191.456-.33.304-.494.67-.494 1.101 0 .43.165.798.494 1.101.328.304.726.456 1.191.456z"
						fill="#C10B7E"
					/>
				</svg>
			</div>
			<div className={styles.content}>{children}</div>
		</aside>
	);
}
