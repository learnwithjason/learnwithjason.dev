// import { useState } from 'react';
import { ReactNode } from 'react';
import { Logo } from './logo';
// @ts-ignore
// import { Search } from './search/index.js';
// import { SearchIcon } from './search/icons/search-icon';
import styles from './header.module.css';

type HeaderProps = {
	children: ReactNode;
};

export function Header({ children }: HeaderProps) {
	return (
		<>
			<header className={styles.header}>
				<a href="#content" className="visually-hidden">
					skip to content
				</a>

				<div className={styles.logo}>
					<a href="/" rel="home">
						<Logo />
						<span className="visually-hidden">home</span>
					</a>
				</div>

				{children}
			</header>
		</>
	);
}
