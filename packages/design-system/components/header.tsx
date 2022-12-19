import { useState } from 'react';
import { Logo } from './logo';
// @ts-ignore
// import { Search } from './search/index.js';
// import { SearchIcon } from './search/icons/search-icon';
import styles from './header.module.css';

type HeaderProps = {
	episodes: object[];
	schedule: object[];
};

export function Header({ episodes, schedule }: HeaderProps) {
	const [searchState, setSearchState] = useState<'open' | 'closed'>('closed');

	return (
		<>
			<header className={styles.header}>
				<a href="#content" className="visually-hidden">
					skip to content
				</a>

				<div className={styles.logo}>
					<a href="/" rel="home">
						<Logo />
						<span className="visually-hidden">Home</span>
					</a>
				</div>

				<nav>
					<a href="/episodes/">episodes</a>
					<a href="/schedule/">schedule</a>
					{/* <a href="/">courses</a> */}
					<a href="/store/">store</a>
					<a href="/blog/">blog</a>
					<a href="/about/">about</a>
					{/* <button
						className={`aa-OpenButton ${styles.search}`}
						onClick={() => setSearchState('open')}
					>
						<SearchIcon />
						⌘+K
						<span className="visually-hidden">Open search</span>
					</button> */}
				</nav>
			</header>
			{/* <Search
				episodes={episodes}
				schedule={schedule}
				searchState={searchState}
				setSearchState={setSearchState}
			/> */}
		</>
	);
}
