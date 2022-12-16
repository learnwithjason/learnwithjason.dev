import { MouseEventHandler } from 'react';
import { Logo } from './logo';
import { SearchIcon } from './search/icons/search-icon';
import styles from './header.module.css';

type HeaderProps = {
	onOpenSearch?: MouseEventHandler<HTMLButtonElement>;
};

export function Header({ onOpenSearch = () => {} }: HeaderProps) {
	return (
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
				<button
					className={`aa-OpenButton ${styles.search}`}
					onClick={onOpenSearch}
				>
					<SearchIcon />
					<span className="visually-hidden">Open search</span>
				</button>
			</nav>
		</header>
	);
}
